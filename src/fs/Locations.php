<?php
/**
 * Handles various file locations
 */
class Loco_fs_Locations extends ArrayObject {
    
    /**
     * Singleton of global languages directories
     * @var Loco_fs_Locations
     */    
    private static $langs;
    

    /**
     * Singleton of registered theme paths
     * @var Loco_fs_Locations
     */    
    private static $theme;
    

    /**
     * Singleton of registered plugin locations
     * @var Loco_fs_Locations
     */    
    private static $plugin;


    /**
     * Clear static caches.
     */
    public static function clear(){
        self::$langs = null;
        self::$theme = null;
        self::$plugin = null;
    }



    /**
     * @return Loco_fs_Locations 
     */
    public static function getGlobal(){
        if( ! self::$langs ){
            self::$langs = new Loco_fs_Locations( array(
                loco_constant('WP_LANG_DIR'),
            ) );
        }
        return self::$langs;
    }



    /**
     * @return Loco_fs_Locations 
     */
    public static function getThemes(){
        if( ! self::$theme ){
            $roots = isset($GLOBALS['wp_theme_directories']) ? $GLOBALS['wp_theme_directories'] : array();
            if( ! $roots ){
                $roots[] = trailingslashit( loco_constant('WP_CONTENT_DIR') ).'themes';
            }
            self::$theme = new Loco_fs_Locations( $roots );
        }
        return self::$theme;
    }



    /**
     * @return Loco_fs_Locations 
     */
    public static function getPlugins(){
        if( ! self::$plugin ){
            self::$plugin = new Loco_fs_Locations( array(
                loco_constant('WP_PLUGIN_DIR'),
            ) );
        }
        return self::$plugin;
    }




    
    /**
     * @internal
     */
    public function __construct( array $paths ){
        $cache = array();
        foreach( $paths as $i => $path ){
            // path should be normalized absolute path and be compared only with others of the same
            $path = Loco_fs_File::abs($path);
            if( ! $path ){
                throw new InvalidArgumentException('Location must be absolute path');
            }
            // path must have trailing slash, otherwise "/plugins/foobar" would match "/plugins/foo/"
            $path = trailingslashit($path);
            $cache[$path] = strlen($path);
        }
        parent::__construct( $cache );
    }
    
    
    /**
     * Check if a given path begins with any of the registered ones
     * @param string absolute path
     * @return bool whether path matched
     */    
    public function check( $path ){
        $path = Loco_fs_File::abs($path);
        foreach( $this as $prefix => $length ){
            if( substr($path,0,$length) === $prefix ){
                return true;
            }
        }
        return false;
    }
    
    
}