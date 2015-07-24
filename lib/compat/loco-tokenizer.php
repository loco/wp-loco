<?php
/**
 * Polyfiller for missing PHP tokenizer extension.
 * Simply avoids fatal errors. Doesn't attempt to really replace the functionality
 */

function loco_compat_token_get_all(){
    return array();
}
 
if( ! extension_loaded('tokenizer') && WP_DEBUG && ( ! defined('DOING_AJAX') || ! DOING_AJAX ) ){
    LocoAdmin::warning( sprintf( Loco::__('PHP extension "%s" is not installed. If you experience problems you should install it'), 'tokenizer' ) );
}

if( ! function_exists('token_get_all') ){
    function token_get_all(){
        return loco_compat_token_get_all();
    }
}
