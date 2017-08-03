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
        
        // check for auto-update availabilty
        if( $updates = get_site_transient('update_plugins') ){
            $key = loco_plugin_self();
            if( isset($updates->checked[$key]) && isset($updates->response[$key]) ){
                $old = $updates->checked[$key];
                $new = $updates->response[$key]->new_version;
                $diff = version_compare( $new, $old );
                // if current version is lower than latest, prompt update
                if( 1 === $diff ){
                    $this->setUpdate( $new );
                }
            }
        }

        // notify if running a development snapshot, but only if ahead of latest stable
        if( '-dev' === substr($version,-4) ){
            $this->set( 'devel', true );
        }

        // $this->setUpdate('2.0.1-debug');
        return $this->view('admin/config/version', compact('breadcrumb','version') ); 
    }



    /**
     * @internal
     */
    private function setUpdate( $version ){
        $action = 'upgrade-plugin_'.loco_plugin_self();
        $link = admin_url( 'update.php?action=upgrade-plugin&plugin='.rawurlencode(loco_plugin_self()) );

        $this->set('update', $version );
        $this->set('update_href', wp_nonce_url( $link, $action ) );
    }

    
}