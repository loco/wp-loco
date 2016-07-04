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
            rtrim( loco_constant('WP_LANG_DIR'),'/' ).'/plugins',
            rtrim( loco_constant('LOCO_LANG_DIR'), '/' ).'/plugins',
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
     * Maintaining our own cache of available plugins, because get_mu_plugins doesn't get cached by WP
     * @return array
     */    
    public static function get_plugins(){
        $cached = wp_cache_get('plugins','loco');
        if( ! is_array($cached) ){
            $cached = get_plugins() + get_mu_plugins();
            uasort( $cached, '_sort_uname_callback' );
            wp_cache_set('plugins', $cached, 'loco');
        }
        return $cached;
    }        


    /**
     * {@inheritdoc}
     */
    public function getHeaderInfo(){
        $handle = $this->getSlug();
        // a real plugin should be known and registered with WordPress
        $cached = self::get_plugins();
        if( isset($cached[$handle]) ){
            $data = $cached[$handle];
        }
        // else get directly from primary file
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
            'Tags'        => 'Tags of the plugin',
        );
    }



    /**
     * {@inheritdoc}
     */
    public function setSlug( $slug ){
        // plugin handles are relative paths from WP_PLUGIN_DIR to bootstrap file
        // plugin is single file if its handle has no directory prefix
        if( basename($slug) === $slug ){
            $this->solo = true;
        }
        else {
            $this->solo = false;
        }
        // may be able to set directory path if file exists in expected location
        if( ! $this->hasDirectoryPath() ){
            $file = new Loco_fs_File( $slug );
            $file->normalize( loco_constant('WP_PLUGIN_DIR') );
            if( $file->exists() ){
                $this->setDirectoryPath( $file->dirname() );
            }
        }
        // may be able to set bootstrap file if root directory is set
        if( ! $this->getBootstrapPath() && $this->hasDirectoryPath() ){
            $file = new Loco_fs_File( $slug );
            $root = $this->getDirectoryPath();
            if( ! $this->solo ){
                $root = dirname($root);
            }
            $file->normalize( $root );
            if( $file->exists() ){
                $this->setBootstrapPath( $file->getPath() );
            }
        }
        return parent::setSlug( $slug );
    }


    
    /**
     * Create plugin bundle definition from WordPress plugin data 
     * 
     * @param string full path to plugin file
     * @return Loco_package_Plugin
     */
    public static function create( $path ){
        
        // relative path should hopefully be relative to something known
        if( '/' !== $path{0} ){
            $path = trailingslashit( loco_constant('WP_PLUGIN_DIR') ).$path;
        }

        $base = dirname($path);
        $handle = plugin_basename( $path );
        
        // plugin may be known and registered with WordPress
        $cached = self::get_plugins();
        if( isset($cached[$handle]) ){
            $data = $cached[$handle];
        }
        // else may be something we're testing from another location
        else if( file_exists($path) ){
            $data = get_plugin_data( $path, false, false );
        }
        
        $name = isset($data['Name']) ? $data['Name'] : null;
        if( is_null($name) || '' === $name ){
            throw new Loco_error_Exception( 'Plugin not found: '.$handle );
        }

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

        $bundle = new Loco_package_Plugin( $handle, $name );
        $bundle->boot = $path;
        
        $bundle->configure( $base, $data );
        
        
        /*if( ! $bundle->isConfigured() ){
            // Hello Dolly header translations are part of the Core "admin" project in the "default" domain
            if( 'hello.php' === $bundle->getSlug() && 'Hello Dolly' === $bundle->getName() ){
                $project = $bundle->createDefault('default');
                $project->setSlug('admin');
            }
        }*/
        
        return $bundle;
    }
    
    
    
    
}