<?php
/**
 *  Plugin version / upgrade screen
 */
class Loco_admin_config_VersionController extends Loco_admin_config_BaseController {


    /**
     * {@inheritdoc}
     */
    public function init(){
        parent::init();
        $this->set( 'title', __('Version','loco-translate') );
    }


    /**
     * {@inheritdoc}
     */
    public function render(){
        
        $title = __('Plugin settings','loco-translate');
        $breadcrumb = new Loco_admin_Navigation;
        $breadcrumb->add( $title );
        
        // current plugin version
        $version = loco_plugin_version();
        if( $updates = get_site_transient('update_plugins') ){
            $key = loco_plugin_self();
            if( isset($updates->response[$key]) ){
                $latest = $updates->response[$key]->new_version;
                // if current version is lower than latest, prompt update
                if( version_compare($version,$latest,'<') ){
                    $this->setLocoUpdate($latest);
                }
            }
        }
        // notify if running a development snapshot, but only if ahead of latest stable
        if( '-dev' === substr($version,-4) ){
            $this->set( 'devel', true );
        }
        
        
        // check PHP version, noting that we want to move to minimum version 5.6 as per latest WordPress
        $phpversion = PHP_VERSION;
        if( version_compare($phpversion,'5.6.20','<') ){
            $this->setPhpUpdate('5.6.20');
        }
        
        
        // check WordPress version, noting that v5.2 bumped PHP min version to 5.6.20, as above
        $wpversion = $GLOBALS['wp_version'];
        if( version_compare($wpversion,'5.2','<') ){
            $this->setWpUpdate('5.2');
        }
        
        return $this->view('admin/config/version', compact('breadcrumb','version','phpversion','wpversion') ); 
    }


    /**
     * @param string version
     */
    private function setLocoUpdate( $version ){
        $action = 'upgrade-plugin_'.loco_plugin_self();
        $link = admin_url( 'update.php?action=upgrade-plugin&plugin='.rawurlencode(loco_plugin_self()) );
        $this->set('update', $version );
        $this->set('update_href', wp_nonce_url( $link, $action ) );
    }


    /**
     * @param string minimum recommended version
     */
    private function setPhpUpdate( $version ){
        $this->set('phpupdate',$version);
    }


    /**
     * @param string minimum recommended version
     */
    private function setWpUpdate( $version ){
        $this->set('wpupdate',$version);
        $this->set('wpupdate_href', admin_url('update-core.php') );
    }

    
}