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
        $this->set( 'title', __('Version','loco') );
        // handle legacy degradation
        $nonce = $this->setNonce('downgrade');
        try {
            if( $this->checkNonce($nonce->action) ){
                update_option('loco-branch', '1', true );
                $legacy = add_query_arg( array('page'=>'loco-translate'), admin_url('admin.php') );
                wp_redirect( $legacy );
            }
        }
        catch( Loco_error_Exception $e ){
            Loco_error_AdminNotices::add($e);
        }
        
    }


    /**
     * {@inheritdoc}
     */
    public function render(){
        
        $title = __('Plugin settings','loco');
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
                if( 1 === $diff ){
                    // current version is lower than latest
                    $this->setUpdate( $new );
                }
                /*else {
                    // current version is a future release (dev branch probably)
                }*/
            }
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