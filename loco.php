<?php
/*
Plugin Name: Loco Translate (LEGACY)
Plugin URI: https://github.com/loco/wp-loco/tree/1.x
Description: Translate WordPress plugins and themes directly in your browser (deprecated 1.x branch)
Author: Tim Whitlock
Version: 1.5.6
Author URI: https://localise.biz/
Text Domain: loco-translate
Domain Path: /languages/
*/


/**
 * Avoid conflict with version 2.0
 */
if( function_exists('loco_include') ){
    return;
}


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



// Initialize admin screen
if( function_exists('is_admin') && is_admin() ){
    loco_require('loco-boot','loco-admin');
}
