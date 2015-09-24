<?php
/*
Plugin Name: Loco Translate
Plugin URI: http://wordpress.org/extend/plugins/loco-translate
Description: Translate WordPress plugins and themes directly in your browser
Author: Tim Whitlock
Version: 1.5.5
Author URI: https://localise.biz/help/wordpress/translate-plugin
Text Domain: loco-translate
Domain Path: /languages/
*/



/** 
 * Include a component from lib subdirectory
 * @param string $subpath e.g. "loco-admin"
 * @return mixed value from last included file
 */
function loco_require(){
    static $dir;
    isset($dir) or $dir = dirname(__FILE__);    
    $ret = '';
    foreach( func_get_args() as $subpath ){
        $ret = require_once $dir.'/lib/'.$subpath.'.php';
    }
    return $ret;
} 



// Inialize admin screen
if( is_admin() ){
    loco_require('loco-boot','loco-admin');
}

// else fire up theme functionality for admins
else {
    add_action( 'after_setup_theme', 'loco_after_setup_theme' );
    function loco_after_setup_theme(){
        if( is_user_logged_in() ){
            loco_require('loco-boot');
            //if( current_user_can( Loco::admin_capablity() ) ){
            // TODO font end functionality
            //}
        }
    }
}
