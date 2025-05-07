<?php
/**
 * Captures text domains being loaded at runtime and establishes what bundles they belong to.
 * Note that since WordPress 6.7 all text domains are loaded JIT, so we won't see them unless they're used.
 */
class Loco_package_Listener extends Loco_hooks_Hookable {

    /**
     * Global availability of a single listener
     * @var self
     */
    private static $singleton;

    /**
     * Buffer of captured text domain loads before they're resolved
     * @var array[]
     */
    private $buffer; 

    /**
     * Resolved plugin bundles, indexed by slug (relative file path)
     * @var Loco_package_Plugin[]
     */
    private $plugins;

    /**
     * Map of all established bundle's and their *primary* text domain
     * @var array { slug: domain }
     */
    private $domains;

    /**
     * Map of all text domains and their official directory location
     * @var array { domain: path }
     */
    private $domainPaths;

    /**
     * Map of all known plugin handles indexed by their relative containing directory
     * @var array { dirname: handle }
     */
    private $pluginHandles;


    /**
     * Get singleton listener or create new if not already exists
     * @return Loco_package_Listener
     */
    public static function singleton(){
        $active = self::$singleton or $active = self::create();
        return $active;
    }


    /**
     * @internal
     */
    public static function destroy(){
        if( $active = self::$singleton ){
            $active->unhook();
            self::$singleton = null;
        }
    } 


    /**
     * Create a singleton listener that we can query from anywhere
     * @return Loco_package_Listener
     */
    public static function create(){
        self::destroy();
        self::$singleton = new Loco_package_Listener;
        return self::$singleton->clear();
    }



    /**
     * @return Loco_package_Listener
     */
    public function clear(){
        $this->buffer = [];
        $this->plugins = [];
        $this->domains = [];
        $this->domainPaths = [];
        $this->pluginHandles = null;
        return $this;
    }



    /**
     * Early hook listening for active bundles loading their own text domains.
     * @noinspection PhpUnused
     */
    public function on_load_textdomain( $domain, $mofile ){
        if( '' === $domain || 'default' === $domain ){
            return;
        }
        $this->buffer[$domain][] = $mofile;
    }



    /**
     * Get primary Text Domain that's uniquely assigned to a bundle.
     * @param string $handle theme or plugin relative path
     */
    public function getDomain( string $handle ){
        $this->flush();
        return $this->domains[$handle]??'';
    }



    /**
     * Get the default directory path where captured files of a given domain are held 
     * @param string $domain TextDomain
     * @return string relative path
     */
    public function getDomainPath( string $domain ):string {
        $this->flush();
        return $this->domainPaths[$domain]??'';
    }


    /**
     * Trim containing directory from a path, so "languages/foo/bar" -> "foo/bar", or "languages" -> ""
     */
    private static function subdir( string $path ):string {
        $bits = explode('/',$path,2);
        return $bits[1] ?? '';
    }


    /**
     * Trim subdirectories from a path so "languages/foo/bar" -> "languages"
     */
    private static function topdir( $path ){
        return explode('/',$path,2)[0];
    }
    


    /**
     * Resolve any path under a plugin directory to a plugin bundle.
     * @param string $path relative plugin path, e.g. "loco-translate/languages/foo.po"
     * @return void
     */
    private function resolvePluginFromPath( string $path, $domain, $slug ){
        // cache all root directory names
        if( ! $this->pluginHandles ){
            $this->pluginHandles = [];
            foreach( Loco_package_Plugin::get_plugins() as $handle => $data ){
                $this->pluginHandles[ dirname($handle) ] = $handle;
                // set default text domain because additional domains could be discovered before the canonical one
                if( isset($data['TextDomain']) && '' !== $data['TextDomain'] ){
                    $this->domains[$handle] = $data['TextDomain'];
                }
            }
        }
        // check root directory name exists in indexed plugin roots
        $name = self::topdir($path);
        if( array_key_exists($name, $this->pluginHandles) ) {
            $handle = $this->pluginHandles[ $name ];
        }
        else {
            return;
        }
        // set this as default domain if not already cached
        if( ! isset($this->domains[$handle]) ){
            $this->domains[$handle] = $domain;
        }
        if( $slug !== $domain ){
            $this->domains[$slug] = $domain;
        }
        // plugin bundle may already exist
        if( isset($this->plugins[$handle]) ){
            $bundle = $this->plugins[$handle];
        }
        // create default project for plugin bundle (not necessarily the current text domain)
        else {
            $bundle = Loco_package_Plugin::create($handle);
            $this->plugins[$handle] = $bundle;
        }
        // add current domain as translation project if not already set
        // this avoids extra domains getting set before the default one
        if( ! $bundle->getProject($slug) ){
            $project = new Loco_package_Project( $bundle, new Loco_package_TextDomain($domain), $slug );
            $bundle->addProject( $project );
        }
    }


    /**
     * @return void
     */
    private function resolvePluginFromSlug( $slug, $domain ){
        // if we're lucky the plugin's directory will match. But we don't know the file name
        foreach( Loco_fs_Locations::getPlugins()->apply($slug) as $path ){
            if( is_dir($path) ){
                $this->resolvePluginFromPath( basename($path).'/dummy.ext', $domain, $slug );
                break;
            }
        }
    }


    /**
     * @return bool
     */
    private function resolveThemeFromPath( $path, $root, $domain ){
        $handle = self::topdir($path);
        $theme = new WP_Theme( $handle, $root );
        if( ! $theme->exists() ){
            return false;
        }
        // theme may have officially declared text domain
        if( $default = $theme->get('TextDomain') ){
            $this->domains[$handle] = $default;
        }
        // else set current domain as default if not already set
        else if ( ! isset($this->domains[$handle]) ){
            $this->domains[$handle] = $domain;
        }
        if( ! isset($this->domainPaths[$domain]) ){
            $this->domainPaths[$domain] = self::subdir($path);
        }
        // theme configuration may use domains and domain paths set above
        // return Loco_package_Theme::createFromTheme($theme);
        return true;
    }


    /**
     * @return void
     */
    private function resolveThemeFromSlug( $slug, $domain ){
        // if we're lucky the theme's directory will match the domain. But we don't know the file name
        foreach( Loco_fs_Locations::getThemes()->apply($slug) as $path ){
            if( is_dir($path) ){
                $this->resolveThemeFromPath( $slug, dirname($path), $domain );
                break;
            }
        }
    }


    /**
     * @return void
     */
    private function resolve( $path, $domain ){
        $file = new Loco_fs_LocaleFile( $path );
        // ignore suffix-only files when locale is invalid as locale code would be taken wrongly as slug, e.g. if you tried to load "english.po"
        if( $file->hasPrefixOnly() ){
            return;
        }
        $dir = dirname($path);
        // theme author: (no file prefix)
        $split = Loco_fs_Locations::getThemes()->split($dir);
        if( $split ){
            [$root,$rel] = $split;
            if( $this->resolveThemeFromPath($rel,$root,$domain) ){
                return;
            }
            // try plugins, as they may be held in themes
        }
        // file prefix is probably the Text Domain, but we can't guarantee it
        $slug = $file->getPrefix()?:$domain;
        // plugin author:
        if( $rel = Loco_fs_Locations::getPlugins()->rel($path) ){
            $this->domainPaths[$domain] = self::subdir( dirname($rel) );
            $this->resolvePluginFromPath($rel,$domain,$slug);
        }
        // Language domain locations
        else if( Loco_fs_Locations::getLangs()->check($path) ){
            // immediate parent will be either plugins or themes, else the root (default domain)
            $type = basename( dirname($path) );
            if( 'plugins' === $type ){
                $this->resolvePluginFromSlug($slug,$domain);
            }
            else if( 'themes' === $type ){
                $this->resolveThemeFromSlug($slug,$domain);
            }
        }
    }


    /**
     * @internal
     * Resolve all currently buffered text domain paths
     */    
    private function flush(){
        if( $this->buffer ){
            $buffer = $this->buffer;
            $this->buffer = [];
            foreach( $buffer as $domain => $paths ){
                foreach( $paths as $path ){
                    try {
                        if( $this->resolve($path,$domain) ){
                            continue 2;
                        }
                    }
                    catch( Loco_error_Exception $e ){
                        // silent errors for non-critical function
                    }
                }
            }
        }
    }


    /**
     * @return array 
     */
    public function getPlugins(){
        $this->flush();
        return $this->plugins;
    }

    
}