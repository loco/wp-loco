<?php
/**
 * A project is a set of translations within a Text Domain.
 * Often a text domain will have just one set, but this allows domains to be split into multiple POT files.
 */
class Loco_package_Project {
    
    /**
     * Text Domain in which project lives
     */
    private Loco_package_TextDomain $domain;
    
    /**
     * Bundle in which project lives
     */
    private Loco_package_Bundle $bundle;
    
    /**
     * Friendly project name, e.g. "Network Admin"
     */
    private string $name;
    
    /**
     * Short name used for naming files, e.g "admin"
     */
    private string $slug;

    /**
     * Configured domain path[s] not including global search paths
     */
    private Loco_fs_FileList $dpaths;

    /**
     * Additional system domain path[s] added separately from bundle config
     */
    private Loco_fs_FileList $gpaths;

    /**
     * Directory paths to exclude during target scanning
     */
    private Loco_fs_FileList $xdpaths;

    /**
     * Locations where POT, PO and MO files may be saved, including standard global paths
     */
    private ?Loco_fs_FileFinder $target = null;
    
    /**
     * Configured source path[s] not including global search paths
     */
    private Loco_fs_FileList $spaths;
    
    /**
     * File and directory paths to exclude from source file extraction
     */
    private Loco_fs_FileList $xspaths;

    /**
     * Locations where extractable source files may be found
     */
    private ?Loco_fs_FileFinder $source = null;

    /**
     * Explicitly added individual PHP source files
     */
    private Loco_fs_FileList $sfiles;

    /**
     * Paths globally excluded by bundle-level configuration
     */
    private Loco_fs_FileList $xgpaths;

    /**
     * POT template file, ideally named "<name>.pot"
     */
    private ?Loco_fs_File $pot = null;

    /**
     * Whether POT file is protected from end-user update and sync operations.
     */
    private bool $potlock = false;


    /**
     * Construct project from its domain and a descriptive name
     */
    public function __construct( Loco_package_Bundle $bundle, Loco_package_TextDomain $domain, string $name ){
        $this->setName($name);
        $this->bundle = $bundle;
        $this->domain = $domain;
        // take default slug from domain, avoiding wildcard
        $slug = $domain->getName();
        if( '*' === $slug ){
            $slug = '';
        }
        $this->slug = $slug;
        // sources
        $this->sfiles = new Loco_fs_FileList;
        $this->spaths = new Loco_fs_FileList;
        $this->xspaths = new Loco_fs_FileList;
        // targets
        $this->dpaths = new Loco_fs_FileList;
        $this->gpaths = new Loco_fs_FileList;
        $this->xdpaths = new Loco_fs_FileList;
        // global
        $this->xgpaths = new Loco_fs_FileList;
    }


    /**
     * Split project ID into domain and slug.
     * null and "" are meaningfully different. "" means deliberately empty slug, whereas null means default
     * @param string $id <domain>[.<slug>]
     * @return string[] [ <domain>, <slug> ]
     */
    public static function splitId( string $id ):array {
        $r = preg_split('/(?<!\\\\)\\./', $id, 2 );
        $domain = stripcslashes($r[0]);
        $slug = isset($r[1]) ? stripcslashes($r[1]) : $domain;
        return [ $domain, $slug ];
    }


    /**
     * Get ID identifying project uniquely within a bundle
     */
    public function getId():string {
        $slug = $this->getSlug();
        $domain = (string) $this->getDomain();
        if( $slug === $domain ){
            return $slug;
        }
        return addcslashes($domain,'.').'.'.addcslashes($slug,'.');
    }


    /**
     * @return string
     */
    public function __toString(){
        return $this->name;
    }


    /**
     * Set friendly name of project
     */
    public function setName( string $name ):self {
        $this->name = $name;
        return $this;
    }


    /**
     * Set short name of project
     */
    public function setSlug( string $slug ):self {
        $this->slug = $slug;
        return $this;
    }


    /**
     * Get friendly name of project, e.g. "Network Admin"
     */
    public function getName():string {
        return $this->name;
    }


    /**
     * Get short name of project, e.g. "admin"
     */
    public function getSlug():string {
        return $this->slug;
    }

    
    /**
     * Get text domain as stringable object
     */
    public function getDomain():Loco_package_TextDomain {
        return $this->domain;
    }

    
    /**
     * Get the  parent bundle that contains this project
     */
    public function getBundle():Loco_package_Bundle {
        return $this->bundle;
    }


    /**
     * Whether project is the default for its domain.
     */
    public function isDomainDefault():bool {
        $slug = $this->getSlug();
        $name = $this->getDomain()->getName();
        // default if slug matches text domain.
        // else special case for Core "default" domain which has empty slug
        return $slug === $name || ( 'default' === $name && '' === $slug ) || 1 === count($this->bundle);
    }


    /**
     * Add a root path where translation files may live
     * @param string|Loco_fs_File $location
     */
    public function addTargetDirectory( $location ):self {
        $this->target = null;
        $this->dpaths->add( new Loco_fs_Directory($location) );
        return $this;
    }


    /**
     * Add a global search path where translation files may live
     * @param string|Loco_fs_Directory $location
     */
    public function addSystemTargetDirectory( $location ):self {
        $this->target = null;
        $this->gpaths->add( new Loco_fs_Directory($location) );
        return $this;
    }


    /**
     * Get domain paths configured in project
     * @return Loco_fs_FileList<int,Loco_fs_Directory>
     */
    public function getConfiguredTargets():Loco_fs_FileList {
        return $this->dpaths;
    }


    /**
     * Get system paths added to project after configuration
     */
    public function getSystemTargets():Loco_fs_FileList {
        return $this->gpaths;
    }
    
    
    /**
     * Get all target directory roots including global search paths
     */
    public function getDomainTargets():Loco_fs_FileList {
        return $this->getTargetFinder()->getRootDirectories();
    }
    
    
    /**
     * Lazy create all searchable domain paths including global directories
     */
    private function getTargetFinder():Loco_fs_FileFinder {
        if( ! $this->target ){
            $target = new Loco_fs_FileFinder;
            $target->setRecursive(false)->group('pot','po','mo');
            foreach( $this->dpaths as $path ){
                // TODO search need not be recursive if it was the configured DomainPath
                // currently no way to know at this point, so recursing by default.
                $target->addRoot( (string) $path, true );
            }
            foreach( $this->gpaths as $path ){
                $target->addRoot( (string) $path, false );
            }
            $this->excludeTargets( $target );
            $this->target = $target;
        }
        return $this->target;
    }

    
    /**
     * Utility excludes current exclude paths from target finder
     */
    private function excludeTargets( Loco_fs_FileFinder $finder ):void {
        foreach( $this->xdpaths as $file ){
            if( $path = realpath( (string) $file ) ){ 
                $finder->exclude( $path );
            }
        }
        foreach( $this->xgpaths as $file ){
            if( $path = realpath( (string) $file ) ){
                $finder->exclude( $path );
            }
        }
    }


    /**
     * Check if target file or directory is excluded
     */
    private function isTargetExcluded( Loco_fs_File $file ):bool{
        return $this->xgpaths->has($file) || $this->xdpaths->has($file);
    }

    
    /**
     * Add a path for excluding in a recursive target file search
     * @param string|Loco_fs_File $path
     */
    public function excludeTargetPath( $path ):self {
        $this->target = null;
        $this->xdpaths->add( new Loco_fs_File($path) );
        return $this;
    }


    /**
     * Get all paths excluded when searching for targets
     */
    public function getConfiguredTargetsExcluded():Loco_fs_FileList {
        return $this->xdpaths;
    }


    /**
     * Get first valid domain path
     */
    private function getSafeDomainPath():Loco_fs_Directory {
        // use first configured domain path that exists
        foreach( $this->getConfiguredTargets() as $d ){
            if( $d->exists() ){
                return $d;
            }
        }
        // fallback to unconfigured, but possibly existent folders
        $base = $this->getBundle()->getDirectoryPath();
        foreach( ['languages','language','lang','l10n','i18n'] as $d ){
            $d = new Loco_fs_Directory($d);
            $d->normalize($base);
            if( $this->isTargetExcluded($d) ){
                continue;
            }
            if( $d->exists() ){
                return $d;
            }
        }
        // Give up and place in root
        return new Loco_fs_Directory($base);
    }


    /**
     * Lazy create all searchable source paths
     */
    public function getSourceFinder():Loco_fs_FileFinder {
        if( ! $this->source ){
            $source = new Loco_fs_FileFinder;
            $exts = $this->getSourceExtensions();
            $source->setRecursive(true)->filterExtensions($exts);
            /* @var $file Loco_fs_File */
            foreach( $this->spaths as $file ){
                $path = realpath( (string) $file );    
                if( $path && is_dir($path) ){
                    $source->addRoot( $path, true );
                }
            }
            $this->excludeSources( $source );
            $this->source = $source;
        }
        return $this->source;
    }


    /**
     * Get file extension filter for source code files
     */
    public function getSourceExtensions():array {
        // TODO source extensions should be moved from plugin settings to project settings
        $conf = Loco_data_Settings::get();
        $exts = $conf->php_alias;
        $exts = array_merge( $exts, $conf->jsx_alias );
        // ensure we always scan *.php and block.json files
        return array_merge( $exts, ['php','json'] );
    }


    /**
     * Utility excludes current exclude paths from passed target finder
     */
    private function excludeSources( Loco_fs_FileFinder $finder ):void {
        foreach( [$this->xspaths,$this->xgpaths] as $list ){
            foreach( $list as $file ){
                $real = realpath( (string) $file );
                if( is_string($real) && '' !== $real ){
                    $finder->exclude($real);
                }
            }
        }
    }


    /**
     * Add a root path where source files may live under for this project
     * @param string|Loco_fs_File $location
     */
    public function addSourceDirectory( $location ):self {
        $this->source = null;
        $this->spaths->add( new Loco_fs_File($location) );
        return $this;
    }


    /**
     * Add Explicit source file to project config
     * @param string|Loco_fs_File $path
     */
    public function addSourceFile( $path ):self {
        $this->source = null;
        $this->sfiles->add( new Loco_fs_File($path) );
        return $this;
    }


    /**
     * Add a file or directory as a source location
     * @param string|Loco_fs_File $path
     */
    public function addSourceLocation( $path ):self {
        $file = new Loco_fs_File( $path );
        if( $file->isDirectory() ){
            $this->addSourceDirectory( $file );
        }
        else {
            $this->addSourceFile( $file );
        }
        return $this;
    }


    /**
     * Get all source directories and files defined in project
     */
    public function getConfiguredSources():Loco_fs_FileList {
        $dynamic = $this->spaths->getArrayCopy();
        $statics = $this->sfiles->getArrayCopy();
        return new Loco_fs_FileList( array_merge( $dynamic, $statics ) );
    }


    /**
     * Test if bundle has configured source files (even if they're excluded by other rules)
     */
    public function hasSourceFiles():bool {
        return count( $this->sfiles ) || count( $this->spaths );
    }     

    
    /**
     * Add a path for excluding in source file search
     * @param string|Loco_fs_File $path
     */
    public function excludeSourcePath( $path ):self {
        $this->source = null;
        $this->xspaths->add( new Loco_fs_File($path) );
        return $this;
    }


    /**
     * Get all paths excluded when searching for sources
     */
    public function getConfiguredSourcesExcluded():Loco_fs_FileList {
        return $this->xspaths;
    }


    /**
     * Add a globally excluded location affecting sources and targets
     * @param string|Loco_fs_File $path
     */
    public function excludeLocation( $path ):self {
        $this->source = null;
        $this->target = null;
        $this->xgpaths->add( new Loco_fs_File($path) );
        return $this;
    }


    /**
     * Check whether POT file is protected from end-user update and sync operations.
     */
    public function isPotLocked():bool {
        return $this->potlock;
    }


    /**
     * Lock POT file to prevent end-user updates0
     */
    public function setPotLock( bool $locked ):self {
        $this->potlock = $locked;
        return $this;
    }


    /**
     * Get full path to template POT (file) whether it exists or nor
     */
    public function getPot():Loco_fs_File {
        if( ! $this->pot ){
            $slug = $this->getSlug();
            $name = ( $slug ?: $this->getDomain()->getName() ).'.pot';
            if( '.pot' !== $name ){
                // find actual file under configured domain paths
                $targets = $this->getConfiguredTargets()->copy();
                // always permit POT file in the bundle root (i.e. outside domain path)
                if( $this->isDomainDefault() && $this->bundle->hasDirectoryPath() ){
                    $root = $this->bundle->getDirectoryPath();
                    $targets->add( new Loco_fs_Directory($root) );
                    // look in alternative language directories if only root is configured
                    if( 1 === count($targets) ){
                        foreach( ['languages','language','lang','l10n','i18n'] as $d ) {
                            $alt = new Loco_fs_Directory($root.'/'.$d);
                            if( ! $this->isTargetExcluded($alt) ){
                                $targets->add($alt);
                            }
                        }
                     }
                }
                // pot check is for exact name and not recursive
                foreach( $targets as $dir ){
                    $file = new Loco_fs_File($name);
                    $file->normalize( $dir->getPath() );
                    if( $file->exists() && ! $this->isTargetExcluded($file) ){
                        $this->pot = $file;
                        break;
                    }
                }
            }
            // fall back to a directory that exists, but where the POT may not
            if( ! $this->pot ){
                $this->pot = new Loco_fs_File($name);
                $this->pot->normalize( (string) $this->getSafeDomainPath() );
            }
        }
        return $this->pot;
    }


    /**
     * Force the use of a known POT file. This could be a PO file if necessary
     */
    public function setPot( Loco_fs_File $pot ):self {
        $this->pot = $pot;
        return $this;
    }


    /**
     * Take a guess at most likely POT file under target locations
     */
    public function guessPot():?Loco_fs_File {
        $slug = $this->getSlug();
        if( '' === $slug ){
            $slug = (string) $this->getDomain();
            if( '' === $slug ){
                $slug = 'default';
            }
        }
        // search only inside bundle for template
        $finder = new Loco_fs_FileFinder;
        foreach( $this->dpaths as $path ){
            $finder->addRoot( (string) $path, true );
        }
        $this->excludeTargets($finder);
        $files = $finder->group('pot','po','mo')->exportGroups();
        foreach( ['pot','po'] as $ext ){
            /* @var $pot Loco_fs_File */
            foreach( $files[$ext] as $pot ){
                $name = $pot->filename();
                // use exact match on project slug if found
                if( $slug === $name ){
                    return $pot;
                }
                // support unconventional "{slug}-en_US.{ext}"
                foreach( ['-en_US'=>6, '-en'=>3 ] as $tail => $len ){
                    if( $tail === substr($name,-$len) && $slug === substr($name,0,-$len) ){
                        return $pot;
                    }
                }
            }
        }
        // Failed to find correctly named POT file,
        // but if a single POT file is found we'll use it.
        if( 1 === count($files['pot']) ){
            return $files['pot'][0];
        }
        // Either no POT files are found, or multiple are found.
        // if the project is the default in its domain, we can try aliases which may be PO
        if( $this->isDomainDefault() ){
            $options = Loco_data_Settings::get();
            if( $aliases = $options->pot_alias ){
                $found = [];
                /* @var $pot Loco_fs_File */
                foreach( $finder as $pot ){
                    $priority = array_search( $pot->basename(), $aliases, true );
                    if( false !== $priority ){
                        $found[$priority] = $pot;
                    }
                }
                if( $found ){
                    ksort( $found );
                    return current($found);
                }
            }
        }
        // failed to guess POT file
        return null;
    }


    /**
     * Get all extractable PHP source files found under all source paths
     */
    public function findSourceFiles():Loco_fs_FileList {
        $source = $this->getSourceFinder();
        // augment file list from directories unless already done so
        $list = $this->sfiles->copy();
        $crawled = $source->exportGroups();
        foreach( $crawled as $ext => $files ){
            /* @var Loco_fs_File $file */
            foreach( $files as $file ){
                $name = $file->filename();
                // skip "{name}.min.{ext}" but only if "{name}.{ext}" exists
                if( '.min' === substr($name,-4) && file_exists( $file->dirname().'/'.substr($name,0,-4).'.'.$ext ) ){
                    continue;
                }
                // .json source files like block.json theme.json etc..
                if( 'json' === $ext && 'block' !== $name && 'theme' !== $name ){
                    // arbitrarily named theme jsons, like onyx.json (twentytwentyfour)
                    if( ! $this->getBundle()->isTheme() ){
                        continue;
                    }
                    // Skip JED. We will merge these in separately as needed
                    if( preg_match('/-[0-9a-f]{32}]$/',$name ) ){
                        continue;
                    }
                    // Ok, treat as json schema file. May fail later...
                }
                $list->add($file);
            }
        }
        return $list;
    }


    /**
     * Get all translation files matching project prefix across target directories
     * @param string $ext File extension, usually "po" or "mo"
     */
    public function findLocaleFiles( string $ext ):Loco_fs_FileList {
        $finder = $this->getTargetFinder();
        $list = new Loco_fs_LocaleFileList;
        $files = $finder->exportGroups();
        $prefix = $this->getSlug(); 
        $domain = $this->domain->getName();
        $default = $this->isDomainDefault();
        $prefs = Loco_data_Preferences::get();
        /* @var $file Loco_fs_File */
        foreach( $files[$ext] as $file ){
            $file = new Loco_fs_LocaleFile( $file );
            // restrict locale by user preference
            if( $prefs && ! $prefs->has_locale( $file->getLocale() ) ){
                continue;
            }
            // add file if prefix matches and has a suffix. locale will be validated later
            if( $file->getPrefix() === $prefix && $file->getSuffix() ){
                $list->addLocalized( $file );
            }
            // else in some cases a suffix-only file like "el.po" can match
            else if( $default && $file->hasSuffixOnly() ){
                // theme files under their own directory
                if( $file->underThemeDirectory() ){
                    $list->addLocalized( $file );
                }
                // check followed links if they were originally under theme dir
                else if( ( $link = $finder->getFollowed($file) ) && $link->underThemeDirectory() ){
                    $list->addLocalized( $file );
                }
                // WordPress core "default" domain, default project
                else if( 'default' === $domain ){
                    $list->addLocalized( $file );
                }
            }
        }
        return $list;
    }


    /**
     * Find files with extension that are not localized/translation files belonging to this project
     */
    public function findNotLocaleFiles( string $ext ):Loco_fs_FileList {
        $list = new Loco_fs_LocaleFileList;
        $files = $this->getTargetFinder()->exportGroups();
        /* @var $file Loco_fs_LocaleFile */
        foreach( $files[$ext] as $file ){
            $file = new Loco_fs_LocaleFile( $file );
            // add file if it has no locale suffix and is inside the bundle
            if( $file->hasPrefixOnly() && ! $file->underGlobalDirectory() ){
                $list->add( $file );
            }
        }
        return $list;
    }


    /**
     * Initialize choice of PO file paths for a given locale
     */
    public function initLocaleFiles( Loco_Locale $locale ):Loco_fs_FileList {
        $slug = $this->getSlug();
        $domain = $this->domain->getName();
        $default = $this->isDomainDefault();
        $suffix = sprintf( '%s.po', $locale );
        $prefix = $slug ? sprintf('%s-',$slug) : '';
        $choice = new Loco_fs_FileList;
        /* @var Loco_fs_Directory $dir */
        foreach( $this->getConfiguredTargets() as $dir ){
            // theme files under their own directory normally have no file prefix
            if( $default && $dir->underThemeDirectory() ){
                $path = $dir->getPath().'/'.$suffix;
            }
            // all other paths use configured prefix, which may be empty
            else {
                $path = $dir->getPath().'/'.$prefix.$suffix;
            }
            $choice->add( new Loco_fs_LocaleFile($path) );
        }
        if( 'default' === $domain || '*' === $domain ){
            $domain = '';
        }
        /* @var Loco_fs_Directory $dir */
        foreach( $this->getSystemTargets() as $dir ){
            $path = $dir->getPath();
            // themes and plugins under global locations will be loaded by domain, regardless of prefix
            if( ( '/themes' === substr($path,-7) || '/plugins' ===  substr($path,-8) ) && '' !== $domain ){
                $path .= '/'.$domain.'-'.$suffix;
            }
            // all other paths (probably core) use the configured prefix, which may be empty
            else {
                $path .= '/'.$prefix.$suffix;
            }
            $choice->add( new Loco_fs_LocaleFile($path) );
        }

        return $choice;
    }


    /**
     * Initialize a PO file path from required location
     * @throws Loco_error_Exception
     */
    public function initLocaleFile( Loco_fs_Directory $dir, Loco_Locale $locale ):Loco_fs_LocaleFile {
        $choice = $this->initLocaleFiles($locale);
        $pattern = '!^'.preg_quote($dir->getPath(),'!').'/[^/.]+\\.po$!';
        /* @var Loco_fs_LocaleFile $file */
        foreach( $choice as $file ){
            if( preg_match($pattern,$file->getPath()) ){
                return $file;
            }
        }
        throw new Loco_error_Exception('Unexpected file location: '.$dir );
    }


    /**
     * Get newest timestamp of all translation files (includes template, but excludes source files)
     */    
    public function getLastUpdated():int {
        $t = 0;
        $file = $this->getPot();
        if( $file->exists() ){
            $t = $file->modified();
        }
        /* @var Loco_fs_File $file */
        foreach( $this->findLocaleFiles('po') as $file ){
            $t = max( $t, $file->modified() );
        }
        return $t;
    }


    /**
     * @codeCoverageIgnore
     */
    public function __debugInfo():array {
        return [
            'id' => $this->getId(),
            'domain' => (string) $this->getDomain(),
        ];
    }

}