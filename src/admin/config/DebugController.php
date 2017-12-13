<?php
/**
 *  Plugin config check (system diagnostics)
 */
class Loco_admin_config_DebugController extends Loco_admin_config_BaseController {

    
    private function memory_size( $raw ){
        $bytes = wp_convert_hr_to_bytes($raw);
        $value = Loco_mvc_FileParams::renderBytes($bytes);
        return $value;//.' ('.number_format($bytes).')';
    }


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
            'WP_MEMORY_LIMIT' => $this->memory_size( loco_constant('WP_MEMORY_LIMIT') ),
            'WP_MAX_MEMORY_LIMIT' => $this->memory_size( loco_constant('WP_MAX_MEMORY_LIMIT') ),
            'PHP memory_limit' => $this->memory_size( ini_get('memory_limit') ),
            'PHP post_max_size' => $this->memory_size( ini_get('post_max_size') ),
            //'PHP upload_max_filesize' => $this->memory_size( ini_get('upload_max_filesize') ),
        ) );
        
        // ajaxing:
        $this->enqueueScript('debug');
        $this->set( 'js', new Loco_mvc_ViewParams( array (
            'nonces' => array( 'ping' => wp_create_nonce('ping') ),
        ) ) );
        
        // File system access
        $dir = new Loco_fs_Directory( loco_constant('LOCO_LANG_DIR') ) ;
        $ctx = new Loco_fs_FileWriter( $dir );
        $fs = new Loco_mvc_PostParams( array(
            'langdir' => $dir->getRelativePath( loco_constant('ABSPATH') ),
            'writable' => $ctx->writable(),
            'disabled' => $ctx->disabled(),
            'protected' => 'TODO' /*Loco_data_Settings::get()->fs_protect*/
        ) );
        
        
        // alert to known system setting problems
        if( get_magic_quotes_gpc() ){
            Loco_error_AdminNotices::add( new Loco_error_Debug('You have "magic_quotes_gpc" enabled. We recommend you disable this in PHP') );
        }
        if( get_magic_quotes_runtime() ){
            Loco_error_AdminNotices::add( new Loco_error_Debug('You have "magic_quotes_runtime" enabled. We recommend you disable this in PHP') );
        }
        
        return $this->view('admin/config/debug', compact('breadcrumb','versions','encoding','memory','fs') ); 
    }
    
}