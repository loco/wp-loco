<?php
/**
 *  Plugin config check (system diagnostics)
 */
class Loco_admin_config_DebugController extends Loco_admin_config_BaseController {


    /**
     * {@inheritdoc}
     */
    public function init(){
        parent::init();
        $this->set( 'title', __('Debug','loco-translate') );
    }

    
    /**
     * @internal
     */
    private function memory_size( $raw ){
        $bytes = wp_convert_hr_to_bytes($raw);
        $value = Loco_mvc_FileParams::renderBytes($bytes);
        return $value;//.' ('.number_format($bytes).')';
    }
    
    
    /**
     * @internal
     */
    private function rel_path( $path, $default = '' ){
        if( is_string($path) && $path && '/' === $path[0] ){
            $file = new Loco_fs_File( $path );
            $path = $file->getRelativePath(ABSPATH);
        }
        else if( ! $path ){
            $path = '(none)';
        }
        return $path;
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
            'PHP' => phpversion().' ('.PHP_SAPI.')',
            'Server' => isset($_SERVER['SERVER_SOFTWARE']) ? $_SERVER['SERVER_SOFTWARE'] : ( function_exists('apache_get_version') ? apache_get_version() : '' ),
        ) );
        // we want to know about modules in case there are security mods installed known to break functionality
        if( function_exists('apache_get_modules') && ( $mods = preg_grep('/^mod_/',apache_get_modules() ) ) ){
            $versions['Server'] .= ' + '.implode(', ',$mods);
        }
        
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
            'PHP max_execution_time' => ini_get('max_execution_time') ?: '0',
        ) );
        
        // Ajaxing:
        $this->enqueueScript('debug');
        $this->set( 'js', new Loco_mvc_ViewParams( array (
            'nonces' => array( 'ping' => wp_create_nonce('ping') ),
        ) ) );
        
        // File system access
        $dir = new Loco_fs_Directory( loco_constant('LOCO_LANG_DIR') ) ;
        $ctx = new Loco_fs_FileWriter( $dir );
        $fsp = Loco_data_Settings::get()->fs_protect;
        $fs = new Loco_mvc_PostParams( array(
            'langdir' => $this->rel_path( $dir->getPath() ),
            'writable' => $ctx->writable(),
            'disabled' => $ctx->disabled(),
            'fs_protect' => 1 === $fsp ? 'Warn' : ( $fsp ? 'Block' : 'Off' ),
        ) );
        
        // Debug and error log settings
        $debug = new Loco_mvc_PostParams( array(
            'WP_DEBUG' => loco_constant('WP_DEBUG') ? 'On' : 'Off',
            'WP_DEBUG_LOG' => loco_constant('WP_DEBUG_LOG') ? 'On' : 'Off',
            'WP_DEBUG_DISPLAY' => loco_constant('WP_DEBUG_DISPLAY') ? 'On' : 'Off',
            'PHP display_errors' => ini_get('display_errors')  ? 'On' : 'Off',
            'PHP log_errors' => ini_get('log_errors')  ? 'On' : 'Off',
            'PHP error_log' => $this->rel_path( ini_get('error_log') ),
        ) );
        
        // alert to known system setting problems
        if( get_magic_quotes_gpc() ){
            Loco_error_AdminNotices::add( new Loco_error_Debug('You have "magic_quotes_gpc" enabled. We recommend you disable this in PHP') );
        }
        if( get_magic_quotes_runtime() ){
            Loco_error_AdminNotices::add( new Loco_error_Debug('You have "magic_quotes_runtime" enabled. We recommend you disable this in PHP') );
        }
        
        return $this->view('admin/config/debug', compact('breadcrumb','versions','encoding','memory','fs','debug') ); 
    }
    
}