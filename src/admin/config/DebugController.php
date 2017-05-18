<?php
/**
 *  Plugin config check (system diagnostics)
 */
class Loco_admin_config_DebugController extends Loco_admin_config_BaseController {


    /**
     * {@inheritdoc}
     */
    public function render(){
        
        $title = __('System diagnostics','loco-translate');
        $breadcrumb = new Loco_admin_Navigation;
        $breadcrumb->add( $title );
        
        // product versions:
        $versions = new Loco_mvc_ViewParams( array (
            'Loco Translate' => loco_plugin_version(),
            'WordPress' => $GLOBALS['wp_version'],
            'PHP' => phpversion(),
        ) );
        
        // utf8 / encoding:
        $encoding = new Loco_mvc_ViewParams( array (
            'OK' => "\xCE\x9F\xCE\x9A",
            'tick' => "\xE2\x9C\x93",
            'json' => json_decode('"\\u039f\\u039a \\u2713"'),
            'mbstring' => loco_check_extension('mbstring'),
        ) );
        
        // PHP / env memory settings:
        $memory = new Loco_mvc_PostParams( array(
            'Memory limit' => ini_get('memory_limit'),
            'WP_MAX_MEMORY_LIMIT' => loco_constant('WP_MAX_MEMORY_LIMIT'),
        ) );
        
        // ajaxing:
        $this->enqueueScript('debug');
        $this->set( 'js', new Loco_mvc_ViewParams( array (
            'nonces' => array( 'ping' => wp_create_nonce('ping') ),
        ) ) );
        
        // alert to known system setting problems
        if( get_magic_quotes_gpc() ){
            Loco_error_AdminNotices::add( new Loco_error_Debug('You have "magic_quotes_gpc" enabled. We recommend you disable this in PHP') );
        }
        if( get_magic_quotes_runtime() ){
            Loco_error_AdminNotices::add( new Loco_error_Debug('You have "magic_quotes_runtime" enabled. We recommend you disable this in PHP') );
        }
        
        return $this->view('admin/config/debug', compact('breadcrumb','versions','encoding','memory') ); 
    }
    
}