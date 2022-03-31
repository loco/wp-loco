<?php
/**
 * Placeholder for missing PHP "mbstring" extension.
 * Just avoids fatal errors. Does not actually replace functionality.
 * 
 * If the mbstring library is missing any PO files that aren't UTF-8 encoded will result in parsing failures.
 */
abstract class Loco_compat_MbstringExtension {
    
    public static function mb_detect_encoding( $str, array $encoding_list = null, $strict = null ){
        return ! $str || preg_match('//u',$str)
         ? 'UTF-8' 
         : 'ISO-8859-1'
         ;
    }

    public static function mb_list_encodings(){
        return ['UTF-8','ISO-8859-1'];
    }

    public static function mb_strlen( $str, $encoding = null ){
        static $warned = false;
        if( ! $warned && preg_match('/[\\x80-\\xFF]/',$str) ){
            trigger_error('Character counts will be wrong without mbstring extension',E_USER_WARNING);
            $warned = true;
        }
        return strlen($str);
    }

    public static function mb_convert_encoding( $str, $to_encoding, $from_encoding ){
        if( $to_encoding !== $from_encoding && '' !== $str ){
            // loco_convert_utf8 no longer uses mb_convert_encoding for UTF8->latin1
            if( '' === $from_encoding || 'ISO-8859-1' === $from_encoding || 'cp1252' === $from_encoding ){
                if( '' === $to_encoding || 'UTF-8' === $to_encoding || 'US-ASCII' === $to_encoding ){
                    if( function_exists('loco_fix_utf8') ) {
                        return loco_fix_utf8( $str );
                    }
                }
            }
            trigger_error('Unable to convert from '.$from_encoding.' to '.$to_encoding.' without mbstring', E_USER_NOTICE );
        }
        return $str;
    }
    
    public static function mb_strtolower( $str ){
        return strtolower($str);
    }

}


// @codeCoverageIgnoreStart

if( ! function_exists('mb_detect_encoding') ){
    function mb_detect_encoding( $str = '', array $encoding_list = [], $strict = false ){
        return Loco_compat_MbstringExtension::mb_detect_encoding( $str, $encoding_list, $strict );
    }
}

if( ! function_exists('mb_list_encodings') ){
    function mb_list_encodings(){
        return Loco_compat_MbstringExtension::mb_list_encodings();
    }
}

if( ! function_exists('mb_strlen') ){
    function mb_strlen( $str, $encoding = null ){
        return Loco_compat_MbstringExtension::mb_strlen( $str, $encoding );
    }
}

if( ! function_exists('mb_convert_encoding') ){
    function mb_convert_encoding( $str, $to_encoding, $from_encoding = null ){
        return Loco_compat_MbstringExtension::mb_convert_encoding( $str, $to_encoding, $from_encoding );
    }
}

if( ! function_exists('mb_encoding_aliases') ){
    function mb_encoding_aliases(){
        return false;
    }
}

if( ! function_exists('mb_strtolower') ){
    function mb_strtolower( $str ){
        return Loco_compat_MbstringExtension::mb_strtolower($str);
    }
}
