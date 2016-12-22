<?php
/*
Plugin Name: Loco Translate
Plugin URI: https://wordpress.org/plugins/loco-translate/
Description: Translate themes and plugins directly in WordPress
Author: Tim Whitlock
Version: 2.0.11
Author URI: https://localise.biz/wordpress/plugin
Text Domain: loco
Domain Path: /languages/
*/

// disallow execution out of context
if( ! function_exists('is_admin') ){
    return;
}


// legacy plugin should not be installed at the same time
if( function_exists('loco_require') ){
    return;
}

// run plugin in legacy mode if forced, or if upgraded from 1.x
$loco_branch = get_option('loco-branch', false );
if( '1' === $loco_branch || ( '2' !== $loco_branch && false !== get_option('loco-translate-use_msgfmt',false) ) ){
    if( is_admin() ){
        require dirname(__FILE__).'/old/v1.php';
    }
    return;
}


/**
 * Get absolute path to Loco primary plugin file
 * @return string
 */
function loco_plugin_file(){
    return __FILE__;
}


/**
 * Get version of this plugin
 * @return string
 */
function loco_plugin_version(){
    return '2.0.11';
}


/**
 * Get Loco plugin handle, used by WordPress to identify plugin as a relative path
 * @return string
 */
function loco_plugin_self(){
    static $handle;
    isset($handle) or $handle = plugin_basename(__FILE__);
    return $handle;
}


/**
 * Get absolute path to plugin root directory
 * @return string
 */
function loco_plugin_root(){
    static $root;
    isset($root) or $root = dirname(__FILE__);
    return $root;
}


/**
 * Check whether currently running in debug mode
 * @return bool
 */
function loco_debugging(){
    return apply_filters('loco_debug', WP_DEBUG );
}


/**
 * Whether currently processing an Ajax request
 * @return bool
 */
function loco_doing_ajax(){
    return defined('DOING_AJAX') && DOING_AJAX;
}


/**
 * Evaluate a constant by name
 * @return mixed
 */
function loco_constant( $name ){
    $value = defined($name) ? constant($name) : null;
    // for security reasons values can only be modified in tests
    if( defined('LOCO_TEST') && LOCO_TEST ){
        $value = apply_filters('loco_constant', $value, $name );
        $value = apply_filters('loco_constant_'.$name, $value );
    }
    return $value;
}


/**
 * Abstract inclusion of any file under plugin root
 * @return mixed
 */
function loco_include( $relpath ){
    $path = loco_plugin_root().'/'.$relpath;
    if( ! file_exists($path) ){
        throw new Loco_error_Exception('File not found: '.$path);
    }
    return include $path;
}


/**
 * Require dependant library once only
 * @return void
 */
function loco_require_lib( $path ){
    require_once loco_plugin_root().'/lib/'.$path;
}


/**
 * Check PHP extension required by Loco and load polyfill if needed
 * @return bool
 */
function loco_check_extension( $name ){
    static $cache = array();
    if( ! isset($cache[$name]) ){
        if( extension_loaded($name) ){
            $cache[$name] = true;
        }
        else {
            Loco_error_AdminNotices::warn( sprintf( __('Loco requires the "%s" PHP extension. Ask your hosting provider to install it','loco'), $name ) );
            $class = 'Loco_compat_'.ucfirst($name).'Extension.php';
            $cache[$name] = class_exists( $class );
        }
    }
    return $cache[$name];
}


/**
 * Class autoloader for Loco classes under src directory.
 * e.g. class "Loco_foo_FooBar" wil be found in "src/foo/FooBar.php"
 * Also does autoload for some WordPress classes, e.g. wp-filesystem-base => WP_Filesystem_Base
 * @return void
 */
function loco_autoload( $name ){
    if( 'Loco_' === substr($name,0,5) ){
        loco_include( 'src/'.strtr( substr($name,5), '_', '/' ).'.php' );
    }
    else if( file_exists( $path = loco_plugin_root().'/src/compat/'.$name.'.php') ){
        require $path;
    }
    else if( file_exists( $path = ABSPATH.'wp-admin/includes/class-'.strtr(strtolower($name),'_','-').'.php' ) ){
        require_once $path;
    }
}

spl_autoload_register( 'loco_autoload', false );


// provide safe directory for custom translations that won't be deleted during auto-updates
if( ! defined('LOCO_LANG_DIR') ){
    define( 'LOCO_LANG_DIR', rtrim(loco_constant('WP_LANG_DIR'),'/').'/loco' );
}


// text domain loading helper for custom file locations. disable by setting constant empty
if( LOCO_LANG_DIR ){
    new Loco_hooks_LoadHelper;
}


// initialize hooks for admin screens
if( is_admin() ){
    Loco_hooks_AdminHooks::init();
}
