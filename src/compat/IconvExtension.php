<?php
/**
 * Placeholder for missing PHP "iconv" extension.
 * Just avoids fatal errors. Does not actually replace functionality.
 * 
 * If this library is missing any strings detected as being something other than UTF-8 will be passed though the noop iconv function.
 * This will result in no conversion at all and failures will almost certainly occur.
 * 
 * SCRAPPED
 * iconv conversions now using mb_convert_encoding
 * @codeCoverageIgnore
 */
abstract class Loco_compat_IconvExtension {
    
    public static function iconv( $in_charset = '', $out_charset = '', $str = '' ){
        return $str;
    }
    
}


// @codeCoverageIgnoreStart

if( ! function_exists('iconv') ){
    function iconv( $in_charset = '', $out_charset = '', $str = '' ){
        return Loco_compat_Iconv::iconv( $in_charset, $out_charset, $str );
    }
}
