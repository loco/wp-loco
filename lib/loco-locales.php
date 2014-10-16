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
    private $plurals = array('one','other');
    private $nplurals = 2;
    private $pluraleq = 'n != 1';

    private function __construct( $lc, $cc ){
        $lc and $this->lang = strtolower($lc);
        $cc and $this->region = strtoupper($cc);
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
        $cc = $this->region or $cc = self::default_region($this->lang) or $cc = 'zz';
        return 'flag flag-'.strtolower($cc);
    }
    
    public function get_name(){
        return empty($this->label) ? Loco::__('Unknown language') : $this->label;
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
        extract( self::data() );
        if( ! $cc ){
            if( self::is_regionless($lc) ){
                // Wordpress expects this locale to be regionless
            }
            else {
                $cc = self::default_region($lc);
            }
        }
        $label = '';
        $locale = new LocoLocale( $lc, $cc );
        // get locale name from our own list
        if( isset($locales[$lc]) ){
            $names = self::get_names();
            if( ! $cc && isset($names[$lc]) ){
                $locale->label = $names[$lc];
            }
            else if( isset($locales[$lc][$cc]) ){
                $locale->label = $locales[$lc][$cc];
            }
        }
        // get plural rules from iso 639 language and set label if common locale wasn't known
        if( isset($langs[$lc]) ){
            list( $label, $pluraleq, $plurals ) = $langs[$lc];
            $locale->pluraleq = $pluraleq;
            $locale->plurals = $plurals;
            $locale->nplurals = count( $plurals );
        }
        // get country just for label if not already applied from common locale combo
        if( ! $locale->label ){
            if( $cc ){
                if( isset($regions[$cc]) ){
                    $label = $label ? $label.' ('.$regions[$cc].')' : $regions[$cc];
                }
                else {
                    $label = $label ? $label.' ('.$cc.')' : '';
                }
            }
            $locale->label = $label;
        }
        return $locale;
    }



    /**
     * @return array
     */
    private static function data(){
        static $data;
        if( ! isset($data) ){
            // this must be the first include of this file to ensure it returns
            $data = loco_require('build/locales-compiled');
        }
        return $data;
    }
    
    
    
    /**
     * Get names of all common locales indexed by xx_YY code
     * @return array
     */
    public static function get_names(){
        static $names = array();
        if( ! $names ){
            $data = self::data();
            foreach( $data['locales'] as $lc => $regions ){
                $no_cc = self::is_regionless($lc);
                foreach( $regions as $cc => $label ){
                    if( 'ZZ' === $cc ){
                        $names[$lc] = $label;
                    }
                    else if( $cc === $no_cc ){
                        // already have as regionless
                    }
                    else {
                        $names[$lc.'_'.$cc] = $label;
                    }
                }
            }
            asort($names,SORT_ASC|SORT_NATURAL);
        }
        return $names;
    }
    
    
    
    /**
     * Test whether a language code is considered regionless by Wordpress core. 
     * example: Thai is not "th_TH" but only "th"
     */
    public static function is_regionless( $lc ){
        $data = self::data();
        if( ! isset($data['locales'][$lc]['ZZ']) ){
            return false;
        }
        // return the default region for this language if there was to be one
        return key($data['locales'][$lc]);
    }
    
    
    /**
     * Alias to loco_language_country
     */
    private static function default_region( $lang ){
        self::data(); // <- ensure lazy load of libs
        return loco_language_country( $lang );
    }     
    
}

 






 