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
    private $nplurals = 2;
    private $pluraleq = '(n != 1)';

    private function __construct( $lc, $cc ){
        $lc and $this->lang = $lc;
        $cc and $this->region = $cc;
    }

    private function __import( $lc, $cc, array $raw ){
        $this->lang = $lc;
        $this->region = $cc;
        list( $this->label, $this->nplurals, $this->pluraleq ) = $raw;
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
        // pre-compiled locale data
        static $plurals = array ( '(n != 1)', 'n == 1 ? 0 : 1', '(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2)', '(n==1) ? 0 : (n>=2 && n<=4) ? 1 : 2', '(n%10==1 && n%100!=11 ? 0 : n != 0 ? 1 : 2)', '(n%10==1 && n%100!=11 ? 0 : n%10>=2 && (n%100<10 or n%100>=20) ? 1 : 2)', '(n==1 ? 0 : n==0 || ( n%100>1 && n%100<11) ? 1 : (n%100>10 && n%100<20 ) ? 2 : 3)', '(n==1 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2)', '(n==1 ? 0 : (n==0 || (n%100 > 0 && n%100 < 20)) ? 1 : 2)', '(n%100==1 ? 1 : n%100==2 ? 2 : n%100==3 || n%100==4 ? 3 : 0)', 0, '(n > 1)', '(n%10!=1 || n%100==11)', 'n==0 ? 0 : n==1 ? 1 : n==2 ? 2 : n%100>=3 && n%100<=10 ? 3 : n%100>=11 ? 4 : 5', '(n>1)', '(n==1) ? 0 : (n==2) ? 1 : (n != 8 && n != 11) ? 2 : 3', 'n==1 ? 0 : n==2 ? 1 : n<7 ? 2 : n<11 ? 3 : 4', 'n!=0', '(n!=1)', 'n != 1', ), 
               $locales = array ( 'en' => array ( 'GB' => array ( 'English (UK)', 2, 0, ), 'IE' => array ( 'English (Ireland)', 2, 0, ), 'US' => array ( 'English (USA)', 2, 0, ), 'CA' => array ( 'English (Canada)', 2, 0, ), 'AU' => array ( 'English (Australia)', 2, 0, ), 'NZ' => array ( 'English (New Zealand)', 2, 0, ), 'HK' => array ( 'English (Hong Kong)', 2, 0, ), 'SG' => array ( 'English (Singapore)', 2, 0, ), 'AE' => array ( 'English (United Arab Emirates)', 2, 0, ), 'ZA' => array ( 'English (South Africa)', 2, 0, ), 'IN' => array ( 'English (India)', 2, 0, ), ), 'fr' => array ( 'FR' => array ( 'French', 2, 1, ), 'CH' => array ( 'French (Switzerland)', 2, 1, ), 'BE' => array ( 'French (Belgium)', 2, 1, ), 'HT' => array ( 'French (Haiti)', 2, 1, ), 'CA' => array ( 'French (Canada)', 2, 1, ), ), 'it' => array ( 'IT' => array ( 'Italian', 2, 0, ), 'CH' => array ( 'Italian (Switzerland)', 2, 0, ), ), 'de' => array ( 'DE' => array ( 'German', 2, 0, ), 'CH' => array ( 'German (Switzerland)', 2, 0, ), 'AT' => array ( 'German (Austria)', 2, 0, ), ), 'es' => array ( 'ES' => array ( 'Spanish', 2, 0, ), 'MX' => array ( 'Spanish (Mexico)', 2, 0, ), 'AR' => array ( 'Spanish (Argentina)', 2, 0, ), 'BO' => array ( 'Spanish (Bolivia)', 2, 0, ), 'CL' => array ( 'Spanish (Chile)', 2, 0, ), 'CO' => array ( 'Spanish (Colombia)', 2, 0, ), 'CR' => array ( 'Spanish (Costa Rica)', 2, 0, ), 'CU' => array ( 'Spanish (Cuba)', 2, 0, ), 'DO' => array ( 'Spanish (Dominican Republic)', 2, 0, ), 'EC' => array ( 'Spanish (Ecuador)', 2, 0, ), 'SV' => array ( 'Spanish (El Salvador)', 2, 0, ), 'GT' => array ( 'Spanish (Guatemala)', 2, 0, ), 'HN' => array ( 'Spanish (Honduras)', 2, 0, ), 'NI' => array ( 'Spanish (Nicaragua)', 2, 0, ), 'PA' => array ( 'Spanish (Panama)', 2, 0, ), 'PY' => array ( 'Spanish (Paraguay)', 2, 0, ), 'PE' => array ( 'Spanish (Peru)', 2, 0, ), 'UY' => array ( 'Spanish (Uruguay)', 2, 0, ), 'VE' => array ( 'Spanish (Venezuela)', 2, 0, ), ), 'pt' => array ( 'PT' => array ( 'Portuguese', 2, 0, ), 'BR' => array ( 'Portuguese (Brazil)', 2, 0, ), ), 'ru' => array ( 'RU' => array ( 'Russian', 3, 2, ), 'UA' => array ( 'Russian (Ukraine)', 3, 2, ), ), 'sv' => array ( 'SE' => array ( 'Swedish', 2, 0, ), ), 'no' => array ( 'NO' => array ( 'Norwegian', 2, 0, ), ), 'da' => array ( 'DK' => array ( 'Danish', 2, 0, ), ), 'fi' => array ( 'FI' => array ( 'Finnish', 2, 1, ), ), 'bg' => array ( 'BG' => array ( 'Bulgarian', 2, 0, ), ), 'cs' => array ( 'CZ' => array ( 'Czech', 3, 3, ), ), 'et' => array ( 'EE' => array ( 'Estonian', 2, 0, ), ), 'el' => array ( 'GR' => array ( 'Greek', 2, 0, ), 'CY' => array ( 'Greek (Cyprus)', 2, 0, ), ), 'hu' => array ( 'HU' => array ( 'Hungarian', 2, 0, ), ), 'lv' => array ( 'LV' => array ( 'Latvian', 3, 4, ), ), 'lt' => array ( 'LT' => array ( 'Lithuanian', 3, 5, ), ), 'lb' => array ( 'LU' => array ( 'Luxembourgish', 2, 0, ), ), 'mt' => array ( 'MT' => array ( 'Maltese', 4, 6, ), ), 'nl' => array ( 'NL' => array ( 'Dutch', 2, 0, ), 'BE' => array ( 'Dutch (Belgium)', 2, 0, ), ), 'pl' => array ( 'PL' => array ( 'Polish', 3, 7, ), ), 'ro' => array ( 'RO' => array ( 'Romanian', 3, 8, ), ), 'sk' => array ( 'SK' => array ( 'Slovak', 3, 3, ), ), 'sl' => array ( 'SI' => array ( 'Slovenian', 4, 9, ), ), 'ht' => array ( 'HT' => array ( 'Haitian Creole', 2, 1, ), ), 'gn' => array ( 'PY' => array ( 'Guarani (Paraguay)', 2, 1, ), ), 'ja' => array ( 'JP' => array ( 'Japanese', 1, 10, ), ), 'zh' => array ( 'CN' => array ( 'Chinese', 2, 11, ), 'HK' => array ( 'Chinese (Hong Kong)', 2, 11, ), 'TW' => array ( 'Chinese (Taiwan)', 2, 11, ), ), 'af' => array ( 'ZA' => array ( 'Afrikaans (South Africa)', 2, 0, ), ), 'hr' => array ( 'HR' => array ( 'Croatian', 3, 2, ), ), 'is' => array ( 'IS' => array ( 'Icelandic', 2, 12, ), ), 'he' => array ( 'IL' => array ( 'Hebrew (Israel)', 2, 0, ), ), 'ar' => array ( 'IL' => array ( 'Arabic (Israel)', 6, 13, ), 'AE' => array ( 'Arabic (United Arab Emirates)', 6, 13, ), ), 'hi' => array ( 'IN' => array ( 'Hindi (India)', 2, 0, ), ), 'sr' => array ( 'RS' => array ( 'Serbian', 3, 2, ), ), 'tr' => array ( 'TR' => array ( 'Turkish', 2, 14, ), ), 'ko' => array ( 'KR' => array ( 'Korean', 1, 10, ), ), 'cy' => array ( 'GB' => array ( 'Welsh', 4, 15, ), ), 'ms' => array ( 'MY' => array ( 'Malay (Malaysia)', 1, 10, ), ), 'az' => array ( 'TR' => array ( 'Azerbaijani (Turkey)', 2, 0, ), ), 'bn' => array ( 'BD' => array ( 'Bengali (Bangladesh)', 2, 0, ), ), 'bs' => array ( 'BA' => array ( 'Bosnian (Bosnia & Herzegovina)', 3, 2, ), ), 'fa' => array ( 'AF' => array ( 'Persian (Afghanistan)', 2, 1, ), 'IR' => array ( 'Persian (Iran)', 2, 1, ), ), 'fo' => array ( 'FO' => array ( 'Faroese (Faroe Islands)', 2, 1, ), 'DK' => array ( 'Faroese (Denmark)', 2, 1, ), ), 'ga' => array ( 'IE' => array ( 'Irish (Ireland)', 5, 16, ), ), 'gl' => array ( 'ES' => array ( 'Galician (Spain)', 2, 0, ), ), 'hy' => array ( 'AM' => array ( 'Armenian', 2, 0, ), ), 'id' => array ( 'ID' => array ( 'Indonesian', 1, 10, ), ), 'jv' => array ( 'ID' => array ( 'Javanese (Indonesia)', 2, 17, ), ), 'ka' => array ( 'GE' => array ( 'Georgian', 1, 10, ), ), 'kk' => array ( 'KZ' => array ( 'Kazakh', 1, 10, ), ), 'kn' => array ( 'IN' => array ( 'Kannada (India)', 2, 18, ), ), 'li' => array ( 'NL' => array ( 'Limburgish (Netherlands)', 2, 1, ), ), 'lo' => array ( 'LA' => array ( 'Lao (Laos)', 1, 10, ), ), 'mg' => array ( 'MG' => array ( 'Malagasy (Madagascar)', 2, 11, ), ), 'my' => array ( 'MM' => array ( 'Burmese (Myanmar)', 1, 10, ), ), 'nb' => array ( 'NO' => array ( 'Bokmål', 2, 0, ), ), 'nn' => array ( 'NO' => array ( 'Nynorsk', 2, 0, ), ), 'ne' => array ( 'NP' => array ( 'Nepali', 2, 0, ), ), 'os' => array ( 'TR' => array ( 'Ossetian (Turkey)', 2, 1, ), 'RU' => array ( 'Ossetian (Russia)', 2, 1, ), 'GE' => array ( 'Ossetian (Georgia)', 2, 1, ), ), 'pa' => array ( 'IN' => array ( 'Punjabi (India)', 2, 0, ), ), 'uk' => array ( 'UA' => array ( 'Ukrainian (Ukraine)', 3, 2, ), ), 'sa' => array ( 'IN' => array ( 'Sanskrit (India)', 2, 1, ), ), 'sd' => array ( 'PK' => array ( 'Sindhi (Pakistan)', 2, 0, ), ), 'si' => array ( 'LK' => array ( 'Sinhala (Sri Lanka)', 2, 0, ), ), 'so' => array ( 'SO' => array ( 'Somali', 2, 19, ), ), 'sq' => array ( 'AL' => array ( 'Albanian (Albania)', 2, 0, ), ), 'sc' => array ( 'IT' => array ( 'Sardinian (Italy)', 2, 1, ), ), 'su' => array ( 'ID' => array ( 'Sundanese (Indonesia)', 1, 10, ), ), 'sw' => array ( 'KE' => array ( 'Swahili (Kenya)', 2, 0, ), 'UG' => array ( 'Swahili (Uganda)', 2, 0, ), 'TZ' => array ( 'Swahili (Tanzania)', 2, 0, ), 'KM' => array ( 'Swahili (Comoros)', 2, 0, ), ), 'ta' => array ( 'IN' => array ( 'Tamil (India)', 2, 0, ), 'LK' => array ( 'Tamil (Sri Lanka)', 2, 0, ), ), 'te' => array ( 'IN' => array ( 'Telugu (India)', 2, 0, ), ), 'th' => array ( 'TW' => array ( 'Thai (Taiwan)', 1, 10, ), ), 'tg' => array ( 'TJ' => array ( 'Tajik (Tajikistan)', 2, 11, ), ), 'ug' => array ( 'CN' => array ( 'Uyghur (China)', 1, 10, ), ), 'ur' => array ( 'IN' => array ( 'Urdu (India)', 2, 0, ), 'PK' => array ( 'Urdu (Pakistan)', 2, 0, ), ), 'uz' => array ( 'UZ' => array ( 'Uzbek (Uzbekistan)', 2, 11, ), ), 'vi' => array ( 'VN' => array ( 'Vietnamese', 1, 10, ), ), );
        // end pre-compiled locale data
        $locale = new LocoLocale( $lc, $cc );
        if( isset($locales[$lc]) ){
            if( ! $cc ){
                $cc = key( $locales[$lc] );
            }
            if( isset($locales[$lc][$cc]) ){
                // get raw locale format: [ name, nplurals, plural ] e.g: [ 'English (UK)', 2, 0 ]
                $raw = $locales[$lc][$cc]; 
                // swap plural equation index with reusable value
                $raw[2] = $plurals[ $raw[2] ];
                // construct locale object from raw data
                $locale->__import( $lc, $cc, $raw );
            }
        }
        return $locale;
    }

}

 






 