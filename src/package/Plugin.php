<?php
/**
 * Represents a bundle of type "plugin"
 */
class Loco_package_Plugin extends Loco_package_Bundle {


    /**
     * {@inheritdoc}
     */
    public function getSystemTargets(): array {
        return  [ 
            trailingslashit( loco_constant('LOCO_LANG_DIR') ).'plugins',
            trailingslashit( loco_constant('WP_LANG_DIR') ).'plugins',
        ];
    }


    /**
     * {@inheritdoc}
     */
    public function isPlugin(): bool {
        return true;
    }


    /**
     * {@inheritdoc}
     */
    public function getType(): string {
        return 'Plugin';
    }


    /**
     * {@inheritDoc}
     */
    public function getDirectoryUrl(): string {
        return plugins_url('/',$this->getHandle());
    }


    /**
     * {@inheritdoc}
     */
    public function getSlug(): string {
        // Fallback to first handle component
        return explode( '/', parent::getSlug(), 2 )[0];
    }


    /**
     * @return Loco_package_Plugin[]
     */
    public static function getAll(): array {
        $plugins = [];
        foreach( self::get_plugins() as $handle => $data ){
            try {
                $plugins[] = Loco_package_Plugin::create($handle);
            }
            catch( Exception $e ){
                // @codeCoverageIgnore
            }
        }
        return $plugins;
    }


    /**
     * Maintaining our own cache of full paths to available plugins, because get_mu_plugins doesn't get cached by WP
     * @return array[]
     */    
    public static function get_plugins(): array {
        $cached = wp_cache_get('plugins','loco');
        if( ! is_array($cached) ){
            $cached = [];
            // regular plugins + mu plugins:
            $search =  [
                'WP_PLUGIN_DIR' => 'get_plugins',
                'WPMU_PLUGIN_DIR' => 'get_mu_plugins',
            ];
            foreach( $search as $const => $getter ){
                if( $list = call_user_func($getter) ){
                    $base = loco_constant($const);
                    foreach( $list as $handle => $data ){
                        if( isset($cached[$handle]) ){
                            Loco_error_AdminNotices::debug( sprintf('Plugin conflict on %s', $handle) );
                            continue;
                        }
                        // WordPress 4.6 introduced TextDomain header fallback @37562 see https://core.trac.wordpress.org/changeset/37562/
                        // if we don't force the original text domain header we can't know if a bundle is misconfigured. This leads to silent errors.
                        // this has a performance overhead, and also results in "unconfigured" messages that users may not have had in previous releases.
                        /*/ TODO perhaps implement a plugin setting that forces original headers
                        $file = new Loco_fs_File($base.'/'.$handle);
                        if( $file->exists() ){
                            $map = array( 'TextDomain' => 'Text Domain' );
                            $raw = get_file_data( $file->getPath(), $map, 'plugin' );
                            $data['TextDomain'] = $raw['TextDomain'];
                        }*/
                        // set resolved base directory before caching our copy of plugin data
                        $data['basedir'] = $base;
                        $cached[$handle] = $data;
                    }
                }
            }
            $cached = apply_filters('loco_plugins_data', $cached );
            uasort( $cached, '_sort_uname_callback' );
            // Intended as in-memory cache so adding short expiry for object caching plugins that may persist it.
            // All actions that invoke `wp_clean_plugins_cache` should purge this. See Loco_hooks_AdminHooks
            wp_cache_set('plugins', $cached, 'loco', 3600 );
        }
        return $cached;
    }


    /**
     * Get raw plugin data from WordPress registry, plus additional "basedir" field for resolving handle to actual file.
     * @param string $handle Relative file path used as handle e.g. loco-translate/loco.php
     */
    public static function get_plugin( string $handle ): ?array {
        // plugin must be registered with WordPress
        $search = self::get_plugins();
        $data = $search[$handle] ?? null;
        // else plugin is not known to WordPress
        if( is_null($data) ){
            $data = apply_filters( 'loco_missing_plugin', [], $handle );
        }
        // plugin not valid if name absent from raw data
        if( empty($data['Name']) ){
            return null;
        }
        // basedir is added by our get_plugins function, but filtered arrays could be broken
        if( ! array_key_exists('basedir',$data) ){
            Loco_error_AdminNotices::debug( sprintf('"basedir" property required to resolve %s',$handle) );
            return null;
        }

        return $data;
    }


    /**
     * {@inheritdoc}
     */
    public function getHeaderInfo(): Loco_package_Header {
        $handle = $this->getHandle();
        $data = self::get_plugin($handle);
        if( ! is_array($data) ){
            // permitting direct file access if file exists (tests)
            $path = $this->getBootstrapPath();
            if( $path && file_exists($path) ){
                $data = get_plugin_data( $path, false, false );
            }
            else {
                $data = [];
            }
        }
        return new Loco_package_Header( $data );
    }


    /**
     * {@inheritdoc}
     */
    public function getMetaTranslatable(): array {
        return  [
            'Name'        => 'Name of the plugin',
            'Description' => 'Description of the plugin',
            'PluginURI'   => 'URI of the plugin',
            'Author'      => 'Author of the plugin',
            'AuthorURI'   => 'Author URI of the plugin',
            // 'Tags'        => 'Tags of the plugin',
        ];
    }


    /**
     * {@inheritdoc}
     */
    public function setHandle( string $handle ): Loco_package_Bundle {
        // plugin handles are relative paths from plugin directory to bootstrap file
        // so plugin is single file if its handle has no directory prefix
        if( basename($handle) === $handle ){
            $this->solo = true;
        }
        else {
            $this->solo = false;
        }

        return parent::setHandle($handle);
    }


    /**
     * {@inheritdoc}
     */
    public function setDirectoryPath( string $path ): Loco_package_Bundle {
        parent::setDirectoryPath($path);
        // plugin bootstrap file can be inferred from base directory + handle
        // e.g. if base is "/path/to/foo" and handle is "foo/bar.php" we can derive "/path/to/foo/bar.php"
        if( ! $this->getBootstrapPath() ){
            $handle = $this->getHandle();
            if( '' !== $handle ) {
                $file = new Loco_fs_File( basename($handle) );
                $file->normalize( $path );
                $this->setBootstrapPath( $file->getPath() );
            }
        }
        return $this;
    }


    /**
     * Create plugin bundle definition from WordPress plugin data.
     * 
     * @param string $handle plugin handle relative to plugin directory
     * @return Loco_package_Plugin
     */
    public static function create( string $handle ): Loco_package_Plugin {

        // plugin must be registered with at least a name and "basedir"
        $data = self::get_plugin($handle);
        if( ! $data ){
            // translators: %s refers to the handle of a plugin, e.g. "loco-translate/loco.php"
            throw new Loco_error_Exception( sprintf( __('Plugin not found: %s','loco-translate'),$handle) );
        }

        // lazy resolve of base directory from "basedir" property that we added
        $file = new Loco_fs_File( $handle );
        $file->normalize( $data['basedir'] );
        $base = $file->dirname();
        
        // handle and name is enough data to construct empty bundle
        $bundle = new Loco_package_Plugin( $handle, $data['Name'] );

        // check if listener heard the real text domain, but only use when none declared
        // This will no longer happen since WP 4.6 header fallback, but we could warn about it
        $listener = Loco_package_Listener::singleton();
        if( $domain = $listener->getDomain($handle) ){
            if( empty($data['TextDomain']) ){
                $data['TextDomain'] = $domain;
                if( empty($data['DomainPath']) ){
                    $data['DomainPath'] = $listener->getDomainPath($domain);
                }
            }
            // ideally would only warn on certain pages, but unsure where to place this logic other than here
            // TODO possibly allow bundle to hold errors/warnings as part of its config. 
            else if( $data['TextDomain'] !== $domain ){
                Loco_error_AdminNotices::debug( sprintf("Plugin loaded text domain '%s' but WordPress knows it as '%s'",$domain, $data['TextDomain']) );
            }
        }
        
        // do initial configuration of bundle from metadata
        $bundle->configure( $base, $data );
        
        return $bundle;
    }


    /**
     * {@inheritDoc}
     */
    public static function fromFile( Loco_fs_File $file ): ?Loco_package_Bundle {
        $find = $file->getPath();
        foreach( self::get_plugins() as $handle => $data ){
            $boot = new Loco_fs_File( $handle );
            $boot->normalize( $data['basedir'] );
            // single file plugins can only match if given file is the plugin file itself.
            if( basename($handle) === $handle ){
                if( $boot->getPath() === $find ){
                    return self::create($handle);
                }
            }
            // else check file is under plugin root.
            else {
                $base = $boot->dirname();
                $path = $base.substr( $find, strlen($base) );
                if( $path === $find ){
                    return self::create($handle);
                }
            }
        }
        return null;
    }
    
}
