<?php
/**
 * Polyfiller for missing PHP mbstring extension.
 * Simply avoids fatal errors. Doesn't attempt to really replace the functionality
 */

 
function loco_compat_mb_detect_encoding( $str, array $encoding_list, $strict ){
    return 'UTF-8';    
}

if( ! extension_loaded('mbstring') && WP_DEBUG && ( ! defined('DOING_AJAX') || ! DOING_AJAX ) ){
    LocoAdmin::warning( sprintf( __('PHP extension "%s" is not installed. If you experience problems you should install it','loco-legacy'), 'mbstring' ) );
}

if( ! function_exists('mb_detect_encoding') ){
    function mb_detect_encoding( $str = '', array $encoding_list = array(), $strict = false ){
        return loco_compat_mb_detect_encoding( $str, $encoding_list, $strict );
    }
}

if( ! function_exists('mb_list_encodings') ){
    function mb_list_encodings(){
        return array('none');
    }
}
