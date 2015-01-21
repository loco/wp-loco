<?php
/**
 * Polyfiller for missing PHP iconv extension.
 * Simply avoids fatal errors. Doesn't attempt to really replace the functionality
 */

 
function loco__iconv( $in_charset, $out_charset, $str ){
    return $str;
}

if( ! extension_loaded('iconv') && WP_DEBUG && ( ! defined('DOING_AJAX') || ! DOING_AJAX ) ){
    LocoAdmin::warning( sprintf( Loco::__('PHP extension "%s" is not installed. If you experience problems you should install it'), 'iconv' ) );
}

if( ! function_exists('iconv') ){
    function iconv( $in_charset = '', $out_charset = '', $str = '' ){
        return loco__iconv( $in_charset, $out_charset, $str );
    }
}


