<?php
/**
 * Handles various file locations
 */
class Loco_fs_Locations extends ArrayObject {

    /**
     * Singleton of WordPress root directory
     */    
    private static ?self $wproot = null;

    /**
     * Singleton of wp-content directory
     */    
    private static ?self $conts = null;

    /**
     * Singleton of global languages directories
     */    
    private static ?self $langs = null;

    /**
     * Singleton of registered theme paths
     */    
    private static ?self $theme = null;

    /**
     * Singleton of registered plugin locations
     */
    private static ?self $plugin = null;

    /**
     * Singleton of the configured base directory ceiling (read + write) from settings
     */
    private static ?self $jails = null;

    /**
     * Singleton of the configured writeable directories jail from settings
     */
    private static ?self $writes = null;


    /**
     * Clear static caches
     */
    public static function clear(): void {
        self::$wproot = null;
        self::$conts = null;
        self::$langs = null;
        self::$theme = null;
        self::$plugin = null;
        self::$jails = null;
        self::$writes = null;
    }


    /**
     * Get a locations collection containing only the WordPress installation directory 
     */
    public static function getRoot():self {
        if( ! self::$wproot ){
            self::$wproot = new Loco_fs_Locations( [
                loco_constant('ABSPATH'),
            ] );
        }
        return self::$wproot;
    }


    /**
     * Get a locations collection containing the most likely WordPress content directory
     */
    public static function getContent():self{
        if( ! self::$conts ){
            self::$conts = new Loco_fs_Locations( [
                loco_constant('WP_CONTENT_DIR'),  // <- defined WP_CONTENT_DIR
                trailingslashit(ABSPATH).'wp-content', // <- default /wp-content
            ] );
        }
        return self::$conts;
    }


    /**
     * @deprecated Use getLang
     */
    public static function getGlobal():self {
        return self::getLangs();
    }


    /**
     * Get a Loco_fs_Locations collection containing the WordPress global languages directory
     */
    public static function getLangs():self{
        if( ! self::$langs ){
            self::$langs = new Loco_fs_Locations( [
                loco_constant('WP_LANG_DIR'),
            ] );
        }
        return self::$langs;
    }


    /**
     * Get a locations collection containing all directories that may contain themes 
     */
    public static function getThemes():self{
        if( ! self::$theme ){
            $roots = $GLOBALS['wp_theme_directories'] ?? [];
            if( ! $roots ){
                $roots[] = trailingslashit( loco_constant('WP_CONTENT_DIR') ).'themes';
            }
            self::$theme = new Loco_fs_Locations( $roots );
        }
        return self::$theme;
    }


    /**
     * Get a locations collection containing all directories that may contain plugins
     */
    public static function getPlugins():self{
        if( ! self::$plugin ){
            self::$plugin = new Loco_fs_Locations( [
                loco_constant('WPMU_PLUGIN_DIR'),
                loco_constant('WP_PLUGIN_DIR'),
            ] );
        }
        return self::$plugin;
    }


    /**
     * Parse a line-break separated directory setting into a locations collection.
     * Absolute paths are used as-is; relative paths are resolved against ABSPATH.
     */
    private static function parseSetting( string $value ):self {
        $paths = [];
        $abspath = loco_constant('ABSPATH');
        foreach( explode("\n", $value) as $line ){
            $line = trim($line);
            if( '' === $line ){
                continue;
            }
            // Absolute paths (including the filesystem root "/") are used as-is; relative paths resolve against ABSPATH.
            $paths[] = Loco_fs_File::abs($line) ?: (new Loco_fs_File($line))->normalize($abspath);
        }
        return new Loco_fs_Locations( $paths );
    }


    /**
     * Get the base directory ceiling from the fs_basedir plugin setting. This is the absolute
     * boundary for both reading and writing. An empty setting resolves to "." (the WordPress root),
     * so the ceiling is never empty. Absolute paths are used as-is; relative paths resolve against ABSPATH.
     */
    public static function getBaseDirs():self{
        if( ! self::$jails ){
            $roots = self::parseSetting( Loco_data_Settings::get()->fs_basedir );
            // empty setting means "." which resolves to ABSPATH
            if( 0 === $roots->count() ){
                $roots = self::parseSetting('.');
            }
            self::$jails = $roots;
        }
        return self::$jails;
    }


    /**
     * Get the writeable directories jail from the fs_writedir plugin setting. Writes are additionally
     * confined to these directories, within the fs_basedir ceiling. An empty setting imposes no
     * restriction beyond the ceiling. Absolute paths are used as-is; relative paths resolve against ABSPATH.
     */
    public static function getWriteDirs():self{
        if( ! self::$writes ){
            self::$writes = self::parseSetting( Loco_data_Settings::get()->fs_writedir );
        }
        return self::$writes;
    }


    /**
     * Check whether a path may be READ, i.e. whether it lies within the fs_basedir ceiling.
     */
    public static function permittedRead( string $path ):bool {
        return self::getBaseDirs()->check($path);
    }


    /**
     * Check whether a path may be WRITTEN: it must be readable (within the fs_basedir ceiling) AND
     * permitted by the fs_writedir jail. An empty jail imposes no restriction beyond the ceiling.
     */
    public static function permittedWrite( string $path ):bool {
        if( ! self::permittedRead($path) ){
            return false;
        }
        $jail = self::getWriteDirs();
        return 0 === $jail->count() || $jail->check($path);
    }


    /**
     * Create instance from list of locations
     */
    public function __construct( array $paths ){
        parent::__construct();
        foreach( $paths as $path ){
            $this->add( $path );
        }
    }


    /**
     * @param string $path normalized absolute path
     * @return Loco_fs_Locations
     */ 
    public function add( string $path ): self {
        foreach( $this->expand($path) as $path ){
            // path must have trailing slash, otherwise "/plugins/foobar" would match "/plugins/foo/"
            $this->offsetSet( $path, strlen($path) );
        }
        return $this;
    }


    /**
     * Check if a given path begins with any of the registered ones
     * @param string $path absolute path
     * @return bool whether path matched
     */    
    public function check( string $path ): bool {
        foreach( $this->expand($path) as $path ){
            foreach( $this as $prefix => $length ){
                if( $prefix === $path || substr($path,0,$length) === $prefix ){
                    return true;
                }
            }
        }
        return false;
    }
    
    
    /**
     * Match location and return the relative subpath.
     * Note that exact match is returned as "." indicating self
     * @param string $path
     * @return string|null
     */
    public function rel( string $path ): ?string {
        foreach( $this->expand($path) as $path ){
            foreach( $this as $prefix => $length ){
                if( $prefix === $path ){
                    return '.';
                }
                if( substr($path,0,$length) === $prefix ){
                    return untrailingslashit( substr($path,$length) );
                }
            }
        }
        return null;
    }


    /**
     * Like rel() but returns base directory also
     * @return string[]
     */
    public function split( string $path ): ?array {
        foreach( $this->expand($path) as $path ){
            foreach( $this as $prefix => $length ){
                if( $prefix === $path ){
                    return [$prefix,'.'];
                }
                if( substr($path,0,$length) === $prefix ){
                    return [ $prefix, untrailingslashit( substr($path,$length) ) ];
                }
            }
        }
        return null;
    }


    /**
     * @param string $rel Relative 
     * @return string[]
     */
    public function expand( string $rel ):array {
        if( '' === $rel ){
            //Loco_error_AdminNotices::debug('Expanding empty path to empty array');
            return [];
        }
        $path = Loco_fs_File::abs($rel);
        if( '' === $path ){
            //throw new InvalidArgumentException('Failed on abs('.var_export($rel,true).')');
            return [];
        }
        $paths = [ trailingslashit($path) ];
        // add the real path if differs. Note that under some PHP versions this may trigger E_WARNING
        $real = realpath($path);
        if( $real && $real !== $path ){
            $paths[] = trailingslashit($real);
        }
        return $paths;
    }


    /**
     * @return string[]
     */
    public function apply( string $suffix = '' ): array {
        $paths = [];
        foreach( $this->getArrayCopy() as $prefix => $length ){
            $paths[] = $prefix.$suffix;
        }
        return $paths;
    }

    
    public function __toString(): string {
        $paths = [];
        foreach( $this->getArrayCopy() as $prefix => $length ){
            $paths[] = rtrim($prefix,'/');
        }
        return implode(':',$paths);
    }
    

}
