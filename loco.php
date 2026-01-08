<?php
/*
Plugin Name: Loco Translate
Plugin URI: https://wordpress.org/plugins/loco-translate/
Description: Translate themes and plugins directly in WordPress
Author: Tim Whitlock
Version: 2.8.1
Requires at least: 6.6
Requires PHP: 7.4
Tested up to: 6.9
Author URI: https://localise.biz/wordpress/plugin
Text Domain: loco-translate
Domain Path: /languages/
*/

// disallow execution out of context
if( ! function_exists('is_admin') ){
    return;
}


/**
 * Get absolute path to Loco primary plugin file
 */
function loco_plugin_file(): string {
    return __FILE__;
}


/**
 * Get version of this plugin
 */
function loco_plugin_version(): string {
    return '2.8.1';
}


/**
 * Get Loco plugin handle, used by WordPress to identify plugin as a relative path
 * @return string probably "loco-translate/loco.php"
 */
function loco_plugin_self(): string {
    static $handle;
    isset($handle) or $handle = plugin_basename(__FILE__);
    return $handle;
}


/**
 * Get absolute path to plugin root directory
 */
function loco_plugin_root(): string {
    return __DIR__;
}


/**
 * Check whether currently running in debug mode
 */
function loco_debugging(): bool {
    return apply_filters('loco_debug', WP_DEBUG );
}


/**
 * Whether currently processing an Ajax request
 */
function loco_doing_ajax(): bool {
    return defined('DOING_AJAX') && DOING_AJAX;
}


if( ! function_exists('loco_constant') ) {
    /**
     * Evaluate a constant by name
     * @return mixed
     */
    function loco_constant( string $name ) {
        return defined($name) ? constant($name) : null;
    }
}


/**
 * Runtime inclusion of any file under plugin root
 *
 * @param string $relpath PHP file path relative to __DIR__
 * @return mixed return value from included file
 */
function loco_include( string $relpath, bool $strict = false ){
    $path = loco_plugin_root().'/'.$relpath;
    if( file_exists($path) ){
        return include $path;
    }
    if( loco_debugging() && 'cli' !== PHP_SAPI ) {
        error_log( sprintf( '[Loco.debug] Failed on loco_include(%s). !file_exists(%s)', var_export($relpath,true), var_export($path,true) ) );
    }
    if( $strict ){
        if( class_exists('Loco_error_Exception') ){
            throw new Loco_error_Exception('File not found: '.$relpath);
        }
        else {
            throw new Exception('File not found: '.$relpath.'; additionally src/error/Exception.php not loadable');
        }
    }
    return null;
}


/**
 * Require dependant library once only

 * @param string $path PHP file path relative to ./lib
 */
function loco_require_lib( string $path ):void {
    require_once loco_plugin_root().'/lib/'.$path;
}


/**
 * Check PHP extension required by Loco and load polyfill if needed
 */
function loco_check_extension( string $name ): bool {
    static $cache = [];
    if( ! array_key_exists($name,$cache) ) {
        if( extension_loaded($name) ){
            $cache[$name] = true;
        }
        else {
            // translators: %s refers to the name of a missing PHP extension, for example "mbstring".
            Loco_error_AdminNotices::warn( sprintf( __('Loco Translate requires the "%s" PHP extension. Ask your hosting provider to install it','loco-translate'), $name ) );
            class_exists( ucfirst($name).'Extension' ); // <- pings Loco_hooks_AdminHooks::autoload_compat
            $cache[$name] = false;
        }
    }
    return $cache[$name];
}


/**
 * Class autoloader for Loco classes under src directory.
 * e.g. class "Loco_foo_Bar" will be found in "src/foo/Bar.php"
 * 
 * @internal 
 */
function loco_autoload( string $name ):void {
    if( 'Loco_' === substr($name,0,5) ){
        loco_include( 'src/'.strtr( substr($name,5), '_', '/' ).'.php' );
    }
}


/**
 * @deprecated Just call class_exists. This function will be removed in the next version.
 */
function loco_class_exists( string $class ): bool {
    return class_exists($class);
}


// Startup errors will raise notices. Check your error logs if error reporting is quiet
try {
    spl_autoload_register('loco_autoload');

    // provide safe directory for custom translations that won't be deleted during auto-updates
    if ( ! defined( 'LOCO_LANG_DIR' ) ) {
        define( 'LOCO_LANG_DIR', trailingslashit( loco_constant('WP_LANG_DIR') ) . 'loco' );
    }

    // text domain loading helper for custom file locations. Set constant empty to disable
    if( LOCO_LANG_DIR ){
        new Loco_hooks_LoadHelper;
    }

    // initialize hooks for admin screens
    if ( is_admin() ) {
        new Loco_hooks_AdminHooks;
    }
    
    // enable wp cli commands
    if( class_exists('WP_CLI',false) ) {
        WP_CLI::add_command('loco','Loco_cli_Commands');
    }

}
catch( Throwable $e ){
    trigger_error(sprintf('[Loco.fatal] %s in %s:%u',$e->getMessage(), $e->getFile(), $e->getLine() ) );
}
