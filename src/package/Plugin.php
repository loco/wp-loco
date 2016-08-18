<?php
/**
 * Represents a bundle of type "plugin"
 */
class Loco_package_Plugin extends Loco_package_Bundle {


    /**
     * {@inheritdoc}
     */
    public function getSystemTargets(){
        return array ( 
            rtrim( loco_constant('LOCO_LANG_DIR'), '/' ).'/plugins',
            rtrim( loco_constant('WP_LANG_DIR'),'/' ).'/plugins',
        );
    }


    /**
     * {@inheritdoc}
     */
    public function isPlugin(){
        return true;
    }


    /**
     * {@inheritdoc}
     */
    public function getType(){
        return 'Plugin';
    }


    /**
     * {@inheritdoc}
     */
    public function getSlug(){
        // TODO establish "official" slug somehow
        // Fallback to first handle component
        $slug = explode( '/', parent::getSlug(), 2 );
        return current( $slug );
    }


    /**
     * Maintaining our own cache of full paths to available plugins, because get_mu_plugins doesn't get cached by WP
     * @return array
     */    
    public static function get_plugins(){
        $cached = wp_cache_get('plugins','loco');
        if( ! is_array($cached) ){
            $cached = array();
            // regular plugins + mu plugins:
            $search = array (
                'WP_PLUGIN_DIR' => 'get_plugins',
                'WPMU_PLUGIN_DIR' => 'get_mu_plugins',
            );
            foreach( $search as $base => $getter ){
                if( $list = call_user_func($getter) ){
                    foreach( $list as $handle => $data ){
                        if( isset($cached[$handle]) ){
                            Loco_error_AdminNotices::debug( sprintf('plugin conflict on %s', $handle) );
                            continue;
                        }
                        $data['basedir'] = $base;
                        $cached[$handle] = $data;
                    }
                }
            }
            uasort( $cached, '_sort_uname_callback' );
            wp_cache_set('plugins', $cached, 'loco');
        }
        return $cached;
    }


    /**
     * {@inheritdoc}
     */
    public function getHeaderInfo(){
        $handle = $this->getHandle();
        $cached = self::get_plugins();
        if( isset($cached[$handle]) ){
            $data = $cached[$handle];
        }
        else if( $path = $this->getBootstrapPath() ){
            $data = get_plugin_data( $path, false, false );
        }
        else {
            $data = array();
        }
        return new Loco_package_Header( $data );
    }


    /**
     * {@inheritdoc}
     */
    public function getMetaTranslatable(){
        return array (
            'Name'        => 'Name of the plugin',
            'Description' => 'Description of the plugin',
            'PluginURI'   => 'URI of the plugin',
            'Author'      => 'Author of the plugin',
            'AuthorURI'   => 'Author URI of the plugin',
            // 'Tags'        => 'Tags of the plugin',
        );
    }

    
    /**
     * {@inheritdoc}
     */
    public function setHandle( $slug ){
        // plugin handles are relative paths from plugin directory to bootstrap file
        // so plugin is single file if its handle has no directory prefix
        if( basename($slug) === $slug ){
            $this->solo = true;
        }
        else {
            $this->solo = false;
        }

        return parent::setHandle( $slug );
    }



    /**
     * {@inheritdoc}
     */
    public function setDirectoryPath( $path ){
        parent::setDirectoryPath($path);
        // plugin bootstrap file can be inferred from base directory + handle
        if( ! $this->getBootstrapPath() ){
            $file = new Loco_fs_File( basename( $this->getHandle() ) );
            $file->normalize( $path );
            $this->setBootstrapPath( $file->getPath() );
        }

        return $this;
    }


    /**
     * Create plugin bundle definition from WordPress plugin data 
     * 
     * @param string plugin handle relative to plugin directory
     * @return Loco_package_Plugin
     */
    public static function create( $handle ){
        $cached = self::get_plugins();
        // permit internal tests to pass absolute path
        if( '/' === $handle{0} && file_exists($handle) ){
            $path = $handle;
            $handle = plugin_basename( $path );
            $data = get_plugin_data( $path, false, false );
        }
        // else plugin must be registered with WordPress
        else if( isset($cached[$handle]) ){
            $data = $cached[$handle];
            // lazy resolve of boot path
            $file = new Loco_fs_File( $handle );
            $file->normalize( loco_constant($data['basedir']) );
            $path = $file->getPath();
        }
        // else plugin is not known to WordPress
        else {
            $data = array();
        }
        
        // plugin only valid id Name key is present in raw data
        if( empty($data['Name']) ){
            throw new Loco_error_Exception( sprintf('Plugin not found: %s',$handle) );
        }
        
        // handle and name is enough data to construct empty bundle
        $bundle = new Loco_package_Plugin( $handle, $data['Name'] );

        // plugin may not declare its own Text Domain
        if( empty($data['TextDomain']) ){
            // We may have intercepted domain loading information from listener
            $listener = Loco_package_Listener::singleton();
            if( $domain = $listener->getDomain($handle) ){
                $data['TextDomain'] = $domain;
                if( empty($data['DomainPath']) ){
                    $data['DomainPath'] = $listener->getDomainPath($domain);
                }
            }
        }
        
        // do initial configuration of bundle from metadata
        $bundle->configure( dirname($path), $data );
        
        return $bundle;
    }
    
    
    
    
}