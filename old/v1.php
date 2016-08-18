<?php
/**
 * Bundled legacy plugin (v1.5.6).
 * This will be loaded into the admin area if site option "loco-branch" is set to "1"
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
  
loco_require('loco-boot','loco-admin');



function loco_hack_legacy_version_string( array $all ){
    $handle = plugin_basename( dirname( dirname(__FILE__) ).'/loco.php' );
    if( isset($all[$handle]) ){
        $all[$handle]['Version'] = Loco::VERSION;
    }
    return $all;
} 

add_filter('all_plugins', 'loco_hack_legacy_version_string', 11, 1 );