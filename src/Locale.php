<?php
/**
 * Represents a WordPress locale
 */
class Loco_Locale implements JsonSerializable {
    
    /**
     * @var array
     */
    private $tag;
    
    /**
     * Name in English
     * @var string
     */
    private $name;
    
    /**
     * Name in language of self
     * @var string
     */
    private $_name;

    /**
     * Cache of raw plural data 
     * @var array
     */
    private $plurals;

    
    /**
     * @return Loco_Locale
     */
    public static function parse( $tag ){
        $locale = new Loco_Locale('');
        try {
            $locale->setSubtags( loco_parse_locale($tag) );
        }
        catch( Exception $e ){
            // isValid should return false
        }
        return $locale;
    }
    


    public function __construct( $lang = '', $region = '', $variant = '' ){
        $this->tag = compact('lang','region','variant');
    }



    /**
     * @internal
     * Allow read-only access to subtags
     */
    public function __get( $t ){
        return isset($this->tag[$t]) ? $this->tag[$t] : '';
    }



    /**
     * Set subtags as produced from loco_parse_locale
     * @return Loco_Locale
     */
    public function setSubtags( array $tag ){
        $default = array( 'lang' => '', 'region' => '', 'variant' => '' );
        // disallow setting of unsupported tags
        if( $bad = array_diff_key($tag, $default) ){
            throw new Loco_error_LocaleException('Unsupported subtags: '.implode(',',$bad) );
        }
        $tag += $default;
        // language tag is minimum requirement
        if( ! $tag['lang'] ){
            throw new Loco_error_LocaleException('Locale must have a language');
        }
        // no UN codes in Wordpress
        if( is_numeric($tag['region']) ){
            throw new Loco_error_LocaleException('Numeric regions not supported');
        }
        // single, scalar variant. Only using for Formal german currently.
        if( is_array($tag['variant']) ){
            $tag['variant'] = implode('_',$tag['variant']);
        }
        $this->tag = $tag;

        return $this;
    }     


    /**
     * @return string
     */    
    public function __toString(){
        return implode('_',array_filter($this->tag));
    }


    /**
     * @return string
     */    
    public function getName(){
        return (string) $this->name;
    }


    /**
     * @return string
     */    
    public function getNativeName(){
        return (string) $this->_name;
    }


    /**
     * @return string
     */    
    public function getIcon(){
        $tag = array();
        if( ! $this->tag['lang'] ){
            $tag[] = 'lang lang-zxx';
        }
        foreach( $this->tag as $class => $code ){
            if( $code ){
                $tag[] = $class.' '.$class.'-'.$code;
            }
        }
        return strtolower( implode(' ',$tag) );
    }


    /**
     * @return Loco_Locale
     */    
    public function setName( $english_name, $native_name = '' ){
        $this->name = $english_name;
        $this->_name = $native_name;
        return $this;
    }


    /**
     * Test whether locale is valid
     */    
    public function isValid(){
        return (bool) $this->tag['lang']; // && 'zxx' !== $this->tag['lang'];
    }


    /**
     * @return Loco_Locale
     */
    public function normalize(){
        $this->tag['lang'] = strtolower($this->tag['lang']);
        $this->tag['region'] = strtoupper($this->tag['region']);
        $this->tag['variant'] = strtolower($this->tag['variant']);
        return $this;
    }
    
    
    /**
     * Resolve this locale's "official" name from WordPress's translation api
     * @return string English name currently set
     */    
    public function fetchName( Loco_api_WordPressTranslations $api ){
        $tag = $this->normalize()->__toString();
        if( $raw = $api->getLocaleData($tag) ){
            $this->setName( $raw['english_name'], $raw['native_name'] );
        }
        return $this->name;
    }    



    /**
     * Resolve this locale's name from compiled Loco data
     * @return string English name currently set
     */
    public function buildName(){
        $names = array();
        // should at least have a language or not valid
        if( $this->isValid() ){
            $code = $this->tag['lang'];
            $db = Loco_data_CompiledData::get('languages');
            if( $name = $db[$code] ){
                // if variant is present add only that in brackets (no lookup required)
                if( $code = $this->tag['variant'] ){
                    $name .= ' ('.ucfirst($code).')';
                }
                // else add region in brackets if present
                else if( $code = $this->tag['region'] ){
                    $db = Loco_data_CompiledData::get('regions');
                    if( $extra = $db[$code] ){
                        $name .= ' ('.$extra.')';
                    }
                    else {
                        $name .= ' ('.$code.')';
                    }
                }
                $this->setName( $name );
            }
        }
        else {
            $this->name = __('Invalid locale','loco');
        }
        return $this->name;
    }



    /**
     * @return array
     */
    public function jsonSerialize(){
        $a = $this->tag;
        $a['label'] = $this->name;
        // plural data expected by editor
        $p = $this->getPluralData();
        $a['pluraleq'] = $p[0];
        $a['plurals'] = $p[1];
        $a['nplurals'] = count($p[1]);
        
        return $a;
    }



    /**
     * Get raw plural data
     * @internal
     * @return array
     */
    public function getPluralData(){
        if( ! $this->plurals ){
            $db = Loco_data_CompiledData::get('plurals');
            $lc = $this->lang;
            $id = isset($db[$lc]) ? $db[$lc] : 0;
            $this->plurals = $db[''][$id];
        }
        return $this->plurals;
    }


    /**
     * Get PO style Plural-Forms header value comprising number of forms and integer equation for n
     * @return string
     */
    public function getPluralFormsHeader(){
        list( $equation, $forms ) = $this->getPluralData();
        return sprintf('nplurals=%u; plural=%s;', count($forms), $equation );
    }


    /**
     * @return string
     */
    public function exportJson(){
        return json_encode( $this->jsonSerialize() );
    }

}



// Depends on compiled library
if( ! function_exists('loco_parse_locale') ){
    loco_include('lib/compiled/locales.php');
}

