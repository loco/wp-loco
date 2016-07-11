<?php
/**
 * @codeCoverageIgnore
 */
class Loco_admin_DebugController extends Loco_mvc_AdminController {
    
    
    public function render(){
        
        // debug package listener
        $themes = array();
        /* @var $bundle Loco_package_Bundle */
        foreach( Loco_package_Listener::singleton()->getThemes() as $bundle ){
            $themes[] = array (
                'slug' => $bundle->getSlug(),
                'name' => $bundle->getName(),
                'default' => $bundle->getDefaultProject()->getSlug(),
                'count' => count($bundle),
            );
        }

        $plugins = array();
        /* @var $bundle Loco_package_Bundle */
        foreach( Loco_package_Listener::singleton()->getPlugins() as $bundle ){
            $plugins[] = array (
                'slug' => $bundle->getSlug(),
                'name' => $bundle->getName(),
                'default' => $bundle->getDefaultProject()->getSlug(),
                'count' => count($bundle),
            );
        }
        
        
        // $this->set( 'plugins', Loco_package_Plugin::get_plugins() );
        // $this->set('installed', wp_get_installed_translations('plugins') );
        // $this->set('active', get_option( 'active_plugins', array() ) );
        // $this->set('langs',get_available_languages());

        $plugins = get_plugins();
        $plugin_info = get_site_transient( 'update_plugins' );
        foreach( $plugins as $plugin_file => $plugin_data ){
            if ( isset( $plugin_info->response[$plugin_file] ) ) {
                $plugins[$plugin_file]['____'] = $plugin_info->response[$plugin_file];
            }
        }
        
        
        $token = wp_get_session_token();
        $this->set( 'token', $token );
        $this->set( 'cookie', wp_parse_auth_cookie( $_COOKIE[LOGGED_IN_COOKIE] ) );
        
        
        $manager = WP_User_Meta_Session_Tokens::get_instance( get_current_user_id() );
        $session = $manager->get( $token );
        $this->set( 'session', $session );
        
        
        /*/ try some notices
        Loco_error_AdminNotices::add( new Loco_error_Success('This is a sample success message') );
        Loco_error_AdminNotices::add( new Loco_error_Warning('This is a sample warning') );
        Loco_error_AdminNotices::add( new Loco_error_Exception('This is a sample error') );*/
        
        return $this->view('admin/debug');
        
    }
    
}


