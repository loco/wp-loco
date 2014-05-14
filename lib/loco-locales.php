<?php
/**
 * Loco locale utilities
 */



/**
 * Match locale to code at end of string.
 * @param string e.g. "something-fr_FR"
 * @return LocoLocale
 */
function loco_locale_resolve( $s ){
    $lc = '';
    $cc = '';
    if( preg_match('/(?:^|\W)([a-z]{2})(?:(?:-|_)([a-z]{2}))?$/i', $s, $r ) ){
        $lc = strtolower($r[1]);
        if( isset($r[2]) ){
            $cc = strtoupper($r[2]);
        }
    }
    return LocoLocale::init( $lc, $cc );
}



/**
 * Locale object
 */ 
final class LocoLocale {

    private $lang;
    private $region;
    private $label;
    private $plurals = array('Single','Other');
    private $nplurals = 2;
    private $pluraleq = '(n != 1)';

    private function __construct( $lc, $cc ){
        $lc and $this->lang = $lc;
        $cc and $this->region = $cc;
    }

    public function export(){
        return get_object_vars($this);
    }
    
    public function __toString(){
        $str = $this->get_name();
        if( $code = $this->get_code() ){
            $str = $code.', '.$str;
        }
        return $str;
    }
    
    public function get_code(){
        return $this->lang && $this->region ? $this->lang.'_'.$this->region : ( $this->lang ? $this->lang : '' ) ;
    }
    
    public function icon_class(){
        return 'flag flag-'.strtolower($this->region);
    }
    
    public function get_name(){
        return is_null($this->label) ? Loco::__('Unknown language') : $this->label;
    }
    
    public function equal_to( LocoLocale $locale ){
        return $this->get_code() === $locale->get_code();
    }
    
    public function preg( $delimiter = '/' ){
        $lc = preg_quote( $this->lang, $delimiter );
        $cc = preg_quote( $this->region, $delimiter );
        return $lc.'(?:[\-_]'.$cc.')?';
    }
    
    
    /**
     * @return LocoLocale
     */
    public static function init( $lc, $cc ){
        $locales = self::data();
        $locale = new LocoLocale( $lc, $cc );
        if( isset($locales[$lc]) ){
            if( ! $cc ){
                $cc = loco_language_country($lc) or
                $cc = key( $locales[$lc] );
            }
            if( isset($locales[$lc][$cc]) ){
                $locale->lang = $lc;
                $locale->region = $cc;
                list( $locale->label, $locale->pluraleq, $plurals ) = $locales[$lc][$cc];
                $locale->plurals = $plurals;
                $locale->nplurals = count( $plurals );
            }
        }
        return $locale;
    }
    

    /**
     * @return array
     */
    private static function data(){
        static $locales;
        if( ! isset($locales) ){
            // this must be the first include of this file so it returns
            $locales = loco_require('build/locales-compiled');
        }
        return $locales;
    }
    
    
    /**
     * 
     */
    public static function get_names(){
        $names = array();
        foreach( self::data() as $lc => $regions ){
            foreach( $regions as $cc => $data ){
                $names[$lc.'_'.$cc] = $data[0];
            }
        }
        return $names;
    }    
    
}

 






 