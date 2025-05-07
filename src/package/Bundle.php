<?php
/**
 * A bundle may use one or more text domains, and may or may not physically house them. 
 * Essentially a bundle "uses" a text domain.
 * Types are "theme", "plugin" and "core" 
 */
abstract class Loco_package_Bundle extends ArrayObject implements JsonSerializable {

    /**
     * Internal handle for targeting in WordPress, e.g. "twentyfifteen" or "loco-translate/loco.php"
     */
    private string $handle;

    /**
     * Short name, e.g. "twentyfifteen" or "loco-translate"
     */
    private string $slug = '';

    /**
     * Friendly name, e.g. "Twenty Fifteen
     */
    private string $name;

    /**
     * Full path to root directory of bundle
     */
    private ?Loco_fs_Directory $root = null;

    /**
     * Directory paths to exclude from all projects
     */
    private Loco_fs_FileList $xpaths;

    /**
     * Full path to PHP bootstrap file
     */
    private ?string $boot = null;

    /**
     * Whether bundle is a single file, as opposed to in its own directory
     */
    protected bool $solo = false;

    /**
     * Method with which bundle has been configured (file|db|meta|internal)
     */
    private string $saved = '';

    /**
     * Get system (i.e. "global") target locations for all projects of this type.
     * These are always append to configs, and always excluded from serialization
     * @return string[] absolute directory paths
     */
    abstract public function getSystemTargets():array;

    /**
     * Get canonical info registered with WordPress, i.e. plugin or theme headers
     */
    abstract public function getHeaderInfo():Loco_package_Header;

    /**
     * Get built-in translatable values mapped to annotation for translators
     */
    abstract public function getMetaTranslatable():array;

    /**
     * Get type of Bundle (title case)
     */
    abstract public function getType():string;

    /**
     * Get absolute URL to bundle root, with trailing slash
     */
    abstract public function getDirectoryUrl():string;


    /**
     * Construct bundle from unique ID containing type and handle
     */
    public static function fromId( string $id ):self {
        $r = explode( '.', $id, 2 );
        return self::createType( $r[0], $r[1]??'' );
    }

    
    /**
     * @throws Loco_error_Exception
     */
    public static function createType( string $type, string $handle ):self {
        $func = [ 'Loco_package_'.ucfirst($type), 'create' ];
        if( is_callable($func) ){
            $bundle = call_user_func( $func, $handle );
        }
        else {
            throw new Loco_error_Exception('Unexpected bundle type: '.$type );
        }  
        return $bundle;
    }


    /**
     * Resolve a file path to a plugin, theme or the core 
     */
    public static function fromFile( Loco_fs_File $file ):?Loco_package_Bundle {
        if( $file->underThemeDirectory() ){
            return Loco_package_Theme::fromFile($file);
        }
        else if( $file->underPluginDirectory() ){
            return Loco_package_Plugin::fromFile($file);
        }
        else if( $file->underWordPressDirectory() && ! $file->underContentDirectory() ){
            return Loco_package_Core::create();
        }
        else {
            return null;
        }
    }


    /**
     * Construct from WordPress handle and friendly name
     * @param string $handle
     * @param string $name
     */
    public function __construct( $handle, $name ){
        parent::__construct();
        $this->setHandle($handle)->setName($name);
        $this->xpaths = new Loco_fs_FileList;
    }


    /**
     * Re-fetch this bundle from its currently saved location
     */
    public function reload():self {
        return call_user_func( [ get_class($this), 'create' ], $this->getSlug() );
    }


    /**
     * Get ID that uniquely identifies bundle by its type and handle
     */
    public function getId():string {
        $type = strtolower( $this->getType() );
        return $type.'.'.$this->getHandle();
    }



    /**
     * @return string
     */
    public function __toString(){
        return $this->name;
    }


    /**
     * Test if this bundle is a theme
     */
    public function isTheme():bool {
        return false;
    }


    /**
     * Get parent bundle if possible. This can only be a theme.
     * @codeCoverageIgnore
     */
    public function getParent():?Loco_package_Theme {
        trigger_error( $this->getType().' bundles cannot have parents. Check isTheme first');
        return null;
    }


    /**
     * Test if this bundle is a plugin
     */
    public function isPlugin():bool {
        return false;
    }


    /**
     * Get handle of bundle unique for its type, e.g. "twentyfifteen" or "loco-translate/loco.php"
     */
    public function getHandle():string {
        return $this->handle;
    }


    /**
     * Attempt to get the vendor-specific slug, which may or may not be the same as the internal handle
     */
    public function getSlug():string {
        // fall back to runtime handle if slug is empty
        return $this->slug ?: $this->getHandle();
    }


    /**
     * Set friendly name of bundle
     */
    public function setName( string $name ):self{
        $this->name = $name;
        return $this;
    }


    /**
     * Set short name of bundle which may or may not match unique handle
     */
    public function setSlug( string $slug ):self {
        $this->slug = $slug;
        return $this;
    }


    /**
     * Set internal handle registered with WordPress for this bundle type
     */
    public function setHandle( string $handle ):self {
        $this->handle = $handle;
        return $this;
    }


    /**
     * Get friendly name of bundle, e.g. "Twenty Fifteen" or "Loco Translate"
     */
    public function getName():string {
        return $this->name;
    }
    
    
    /**
     * Whether bundle root is currently known
     */
    public function hasDirectoryPath():bool {
        return $this->root instanceof Loco_fs_Directory;
    }    


    /**
     * Set root directory for bundle. e.g. theme or plugin directory
     */
    public function setDirectoryPath( string $path ):self {
        $this->root = new Loco_fs_Directory( $path );
        $this->root->normalize();
        return $this;
    }


    /**
     * Get absolute path to root directory for bundle. e.g. theme or plugin directory
     */
    public function getDirectoryPath():string {
        if( $this->root ){
            return $this->root->getPath();
        }
        // without a root directory return WordPress root
        return untrailingslashit(ABSPATH);
    }


    /**
     * @return string[]
     */
    public function getVendorRoots():array {
        $dirs = [];
        $base = $this->getDirectoryPath();
        foreach( ['node_modules','vendor'] as $f ){
            $path = $base.'/'.$f;
            if( Loco_fs_File::is_readable($path) && is_dir($path) ){
                $dirs[] = $path;
            }
        }
        return $dirs;
    }


    /**
     * Get file locations to exclude from all projects in bundle. These are effectively "hidden"
     */
    public function getExcludedLocations():Loco_fs_FileList {
        return $this->xpaths;
    }


    /**
     * Add a path for excluding from all projects
     * @param Loco_fs_File|string $path
     */
    public function excludeLocation( $path ):self {
        $this->xpaths->add( new Loco_fs_File($path) );
        return $this;
    }


    /**
     * Create a file searcher from root location, excluding that which is excluded
     */
    public function getFileFinder():Loco_fs_FileFinder {
        $root = $this->getDirectoryPath();
        /*/ if bundle is symlinked it's resource files won't be matched properly
        if( is_link($root) && ( $real = realpath($root) ) ){
            $root = $real;
        }*/
        $finder = new Loco_fs_FileFinder( $root );
        foreach( $this->xpaths as $path ){
            $finder->exclude( (string) $path );
        }
        return $finder;
    }


    /**
     * Get primary PHP source file containing bundle bootstrap code, if applicable
     */
    public function getBootstrapPath():?string {
        return $this->boot;
    }


    /**
     * Set primary PHP source file containing bundle bootstrap code, if applicable.
     * @param string|Loco_fs_File $path to PHP file
     * @return Loco_package_Bundle
     */
    public function setBootstrapPath( $path ):self {
        $path = (string) $path;
        // sanity check this is a PHP file even if it doesn't exist
        if( '.php' !== substr($path,-4) ){
            throw new Loco_error_Exception('Bootstrap file should end .php, got '.$path );
        }
        $this->boot = $path;
        // base directory can be inferred from bootstrap path
        if( ! $this->hasDirectoryPath() ){
            $this->setDirectoryPath( dirname($path) );
        }
        return $this;
    }


    /**
     * Test whether bundle consists of a single file
     */
    public function isSingleFile():bool {
        return $this->solo;
    }
    
    
    /**
     * Add all projects defined in a TextDomain
     */
    public function addDomain( Loco_package_TextDomain $domain ):self {
        /* @var Loco_package_Project $proj */
        foreach( $domain as $proj ){
            $this->addProject($proj);
        }
        return $this;
    }


    /**
     * Add a translation project to bundle.
     * Note that this always adds without checking uniqueness. Call hasProject first if it could be a duplicate
     */
    public function addProject( Loco_package_Project $project ):self {
        // add global targets
        foreach( $this->getSystemTargets() as $path ){
            $project->addSystemTargetDirectory( $path );
        }
        // add global exclusions affecting source and target locations
        foreach( $this->xpaths as $path ){
            $project->excludeLocation( $path );
        }
        // projects must be unique by Text Domain and "slug" (used to prefix files)
        // however, I am not indexing them here on purpose so domain and slug may be added at any time.
        $this[] = $project;
        return $this;
    }


    /**
     * Export projects grouped by domain
     * @return array[] indexed by Text Domain name
     */
    public function exportGrouped():array {
        $domains = [];
        /* @var $proj Loco_package_Project */
        foreach( $this as $proj ){
            $domain = $proj->getDomain();
            $key = $domain->getName();
            $domains[$key][] = $proj; 
        }
        return $domains;
    }



    /**
     * Create a suitable Text Domain from bundle's name.
     * Note that internal handle may be a directory name differing entirely from the author's intention, hence the configured bundle name is slugged instead
     */
    public function createDomain():Loco_package_TextDomain {
        $slug = sanitize_title( $this->name, $this->slug );
        return new Loco_package_TextDomain( $slug );
    }



    /**
     * Generate default configuration. 
     * Adds a simple one domain, one project config
     * @param string|null $domainName optional Text Domain to use
     */
    public function createDefault( ?string $domainName = null ):Loco_package_Project {
        if( is_null($domainName) ){
            $domain = $this->createDomain();
        }
        else {
            $domain = new Loco_package_TextDomain($domainName);
        }
        $project = $domain->createProject( $this, $this->name );
        if( $this->solo ){
            $project->addSourceFile( $this->getBootstrapPath() );
        }
        else {
            $project->addSourceDirectory( $this->getDirectoryPath() );
        }

        $this->addProject( $project );
        return $project;
    }


    /**
     * Configure from custom saved option
     * @return bool whether configured via database option
     */
    public function configureDb():bool {
        $option = $this->getCustomConfig();
        if( $option instanceof  Loco_config_CustomSaved ){
            $option->configure();
            $this->saved = 'db';
            return true;
        }
        return false;
    }


    /**
     * Configure from XML config
     * @return bool whether configured via static XML file
     */
    public function configureXml():bool {
        $xmlfile = $this->getConfigFile();
        if( $xmlfile instanceof Loco_fs_File ){
            $reader = new Loco_config_BundleReader($this);
            $reader->loadXml( $xmlfile );
            $this->saved = 'file';
            return true;
        }
        return false;
    }


    /**
     * Get XML configuration file used to define this bundle
     */
    public function getConfigFile():?Loco_fs_File {
        $base = $this->getDirectoryPath();
        $file = new Loco_fs_File( $base.'/loco.xml' );
        if( ! $file->exists() || ! loco_check_extension('dom') ){
            return null;
        }
        return $file;
    }


    /**
     * Check whether bundle is manually configured, as opposed to guessed (file|db|meta|internal)
     */    
    public function isConfigured():string {
        return $this->saved;
    }


    /**
     * Do basic configuration from bundle meta data (file headers)
     * @param array $header tags from theme or plugin bootstrap file
     * @return bool whether configured via header tags
     */
    public function configureMeta( array $header ):bool {
        if( isset($header['Name']) ){
            $this->setName( $header['Name'] );
        }
        if( isset($header['TextDomain']) && ( $slug = $header['TextDomain'] ) ){
            $domain = new Loco_package_TextDomain($slug);
            $domain->setCanonical( true );
            // use domain as bundle handle and slug if not set when constructed
            if( ! $this->handle ){
                $this->handle = $slug;
            }
            if( ! $this->getSlug() ){
                $this->setSlug( $slug );
            }
            $project = $domain->createProject( $this, $this->name );
            // May have declared DomainPath
            $base = $this->getDirectoryPath();
            if( isset($header['DomainPath']) && ( $path = trim($header['DomainPath'],'/') ) ){
                $project->addTargetDirectory( $base.'/'.$path );
            }
            // else use standard language path if it exists
            else if( ! $this->solo ){
                if( is_dir($base.'/languages') ) {
                    $project->addTargetDirectory($base.'/languages');
                }
                // else add bundle root by default
                else {
                    $project->addTargetDirectory($base);
                }
            }
            // single file bundles can have only one source file
            if( $this->solo ){
                $project->addSourceFile( $this->getBootstrapPath() );
            }
            // else add bundle root as default source file location
            else {
                $project->addSourceDirectory( $base );
            }
            // automatically block common vendor locations
            foreach( $this->getVendorRoots() as $root ){
                $this->excludeLocation($root);
            }
            // default domain added
            $this->addProject($project);
            $this->saved = 'meta';
            return true;
        }

        return false;
    }


    /**
     * Configure bundle from canonical sources.
     * Source order is "db","file","meta" where meta is the auto-config fallback.
     * No deep scanning is performed at this point
     * @param string[] $header tags from theme or plugin bootstrap file
     */
    public function configure( string $base, array $header ):self {
        $this->setDirectoryPath( $base );
        $this->configureDb() || $this->configureXml() || $this->configureMeta($header);
        do_action('loco_bundle_configured',$this);
        return $this;
    }


    /**
     * Get the custom config saved in WordPress DB for this bundle
     */
    public function getCustomConfig():?Loco_config_CustomSaved {
        $custom = new Loco_config_CustomSaved;
        if( $custom->setBundle($this)->fetch() ){
            return $custom;
        }
        return null;
    }


    /**
     * Inherit another bundle. Used for child themes to display parent translations
     */
    public function inherit( Loco_package_Bundle $parent ):self{
        foreach( $parent as $project ){
            if( ! $this->hasProject($project) ){
                $this->addProject( $project );
            }
        }
        return $this;
    }


    /**
     * Get unique translation project by text domain (and optionally slug)
     * TODO would prefer to avoid iteration, but slug can be changed at any time
     */
    public function getProject( string $domain, ?string $slug = null ):?Loco_package_Project {
        if( is_null($slug) ){
            $slug = $domain;
        }
        /* @var $project Loco_package_Project */
        foreach( $this as $project ){
            if( $project->getSlug() === $slug && $project->getDomain()->getName() === $domain ){
                return $project;
            }
        }
        return null;
    }


    /**
     * Get the primary translation set for this bundle, unless there are zero
     */
    public function getDefaultProject():?Loco_package_Project {
        $i = 0;
        /* @var Loco_package_Project $project */
        foreach( $this as $project ){
            if( $project->isDomainDefault() ){
                return $project;
            }
            $i++;
        }
        // nothing is domain default, but if we only have one, then duh
        if( 1 === $i ){
            return $project;
        }
        return null;
    }

    
    /**
     * Test if project already exists in bundle
     */
    public function hasProject( Loco_package_Project $project ):bool {
        return (bool) $this->getProject( $project->getDomain()->getName(), $project->getSlug() );
    }


    /**
     * @return Loco_package_TextDomain[]
     */
    public function getDomains():array {
        $domains = [];
        /* @var $project Loco_package_Project */
        foreach( $this as $project ){
            if( $domain = $project->getDomain() ){
                $d = (string) $domain;
                if( ! isset($domains[$d]) ){
                    $domains[$d] = $domain;
                }
            }
        }
        return $domains;
    }


    /**
     * Get newest timestamp of all translation files (includes template, but exclude source files)
     */    
    public function getLastUpdated():int {
        // recent items is a convenient cache for checking last modified times
        $t = Loco_data_RecentItems::get()->hasBundle( $this->getId() );
        // else have to scan targets across all projects
        if( 0 === $t ){
            /* @var Loco_package_Project $project */
            foreach( $this as $project ){
                $t = max( $t, $project->getLastUpdated() );
            }
        }
        return $t;
    }


    /**
     * Get project by ID
     * @param string $id identifier of the form <domain>[.<slug>]
     */
    public function getProjectById( string $id ):?Loco_package_Project {
        list( $domain, $slug ) = Loco_package_Project::splitId($id);
        return $this->getProject( $domain, $slug );
    }


    /**
     * Reset bundle configuration, but keep metadata like name and slug.
     * Call this before applying a saved config, otherwise values will just be added on top.
     */
    public function clear():self {
        $this->exchangeArray( [] );
        $this->xpaths = new Loco_fs_FileList;
        $this->saved = '';
        return $this;
    }


    #[ReturnTypeWillChange]
    public function jsonSerialize():array {
        $writer = new Loco_config_BundleWriter( $this );
        return $writer->toArray();
    }


    /**
     * Create a copy of this bundle containing any files found that aren't currently configured
     */
    public function invert():self {
        return Loco_package_Inverter::compile( $this );
    }

}