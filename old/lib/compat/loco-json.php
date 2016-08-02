<?php
/**
 * Polyfiller for missing PHP json extension.
 * Simply avoids fatal errors. Doesn't attempt to really replace the functionality
 */

 
function loco_compat_json_encode( $value ){
    return '{"error":{"code":-1,"message":"json extension is not installed"}}';
}

if( ! extension_loaded('json_encode') && WP_DEBUG && ( ! defined('DOING_AJAX') || ! DOING_AJAX ) ){
    LocoAdmin::warning( sprintf( __('PHP extension "%s" is not installed. If you experience problems you should install it','loco-translate'), 'json_encode' ) );
}

if( ! function_exists('json_encode') ){
    function json_encode( $value = '' ){
        return loco_compat_json_encode( $value );
    }
}
