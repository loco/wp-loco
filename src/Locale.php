<?php
/**
 * Represents a WordPress locale
 * 
 * @property string $lang
 * @property string $region
 * @property string $variant
 */
class Loco_Locale implements JsonSerializable {

    /**
     * Language subtags
     * @var string[]
     */
    private array $tag;

    /**
     * Cached composite tag 
     */
    private ?string $_tag = null;

    /**
     * Cached icon css class
     */
    private ?string $icon = null;

    /**
     * Name in English
     */
    private string $name = '';
    
    /**
     * Name in language of self
     */
    private ?string $_name = null;

    /**
     * Plural equation expressed in terms of "n"
     */
    private string $pluraleq;
    
    /**
     * Cache of plural forms mapped optionally to CLDR mnemonic tags 
     */
    private ?array $plurals = null;
    
    /**
     * Validity cache
     */
    private ?bool $valid = null;

    /**
     * @param string $tag Full language tag
     */
    public static function parse( string $tag ):self {
        $locale = new Loco_Locale('');
        try {
            $locale->setSubtags( loco_parse_wp_locale($tag) );
        }
        catch( Exception $e ){
            // isValid should return false
        }
        do_action( 'loco_parse_locale', $locale, $tag );
        return $locale;
    }



    /**
     * Construct from subtags NOT from composite tag. See self::parse
     * Note that this skips normalization and validation steps
     */
    public function __construct( string $lang = '', string $region = '', string $variant = '' ){
        if( 1 == func_num_args() && isset($lang[3]) ){
            throw new BadMethodCallException('Did you mean Loco_Locale::parse('.var_export($lang,1).') ?');
        }
        $this->tag = compact('lang','region','variant');
    }


    /**
     * Allow read access to subtags
     * @internal 
     * @param string $t subtag
     * @return string
     */
    public function __get( $t ){
        return $this->tag[ $t ] ?? '';
    }


    /**
     * Allow write access to subtags
     * @internal
     * @param string $t subtag, e.g. "lang"
     * @param string $s subtag value, e.g. "en"
     * @return void
     */
    public function __set( $t, $s ){
        if( isset($this->tag[$t]) ){
            $this->tag[$t] = $s;
            $this->setSubtags( $this->tag );
        }
    }


    /**
     * Set subtags as produced from loco_parse_wp_locale
     * @param string[] $tag
     */
    public function setSubtags( array $tag ):self {
        $this->valid = false;
        $default = [ 'lang' => '', 'region' => '', 'variant' => '' ];
        // disallow setting of unsupported tags
        if( $bad = array_diff_key($tag, $default) ){
            throw new Loco_error_LocaleException('Unsupported subtags: '.implode(',',$bad) );
        }
        $tag += $default;
        // language tag is minimum requirement
        if( ! $tag['lang'] ){
            throw new Loco_error_LocaleException('Locale must have a language');
        }
        // no UN codes in WordPress
        if( preg_match('/^\\d+$/',$tag['region']) ){
            throw new Loco_error_LocaleException('Numeric regions not supported');
        }
        // non-standard variant code. e.g. formal/informal
        if( is_array($tag['variant']) ){
            $tag['variant'] = implode('_',$tag['variant']);
        }
        // normalize case
        $tag['lang'] = strtolower($tag['lang']);
        $tag['region'] = strtoupper($tag['region']);
        $tag['variant'] = strtolower($tag['variant']);
        // set subtags and invalidate cache of language tag
        $this->tag = $tag;
        $this->_tag = null;
        $this->icon = null;
        $this->valid = true;

        return $this;
    }


    /**
     * Ensure correct casing of subtags
     */
    public function normalize():self {
       try {
           $this->setSubtags( $this->tag );
       }
       catch( Loco_error_LocaleException $e ){
           $this->_tag = '';
           $this->icon = null;
           $this->name = 'Invalid locale';
           $this->_name = null;
       }
       return $this;
    }


    /**
     * @return string
     */    
    public function __toString(){
        $str = $this->_tag;
        if( is_null($str) ){
            $str = implode('_',array_filter($this->tag));
            $this->_tag = $str;
        }
        return $str;
    }


    /**
     * @param bool $translate whether to get name in current display language
     */    
    public function getName( bool $translate = true ):?string{
        $name = $this->name;
        // use canonical native name only when current language matches
        // deliberately not matching whole tag such that fr_CA would show native name of fr_FR
        if( $translate ){
            $locale = self::parse( function_exists('get_user_locale') ? get_user_locale() : get_locale() );
            if( $this->lang === $locale->lang && $this->_name ){
                $name = $this->_name;
            }
            /*/ Note that no dynamic translation of English name is performed, but can be filtered with loco_parse_locale
            else {
                $name = __($name,'loco-translate-languages');
            }*/
        }
        if( is_string($name) && '' !== $name ){
            return $name;
        }
        return null;
    }


    /**
     * Get canonical native name as defined by WordPress
    */    
    public function getNativeName():?string {
        $name = $this->_name;
        if( is_string($name) && '' !== $name ){
            return $name;
        }
        return null;
    }


    /**
     * Get CSS class for locale icon
     */    
    public function getIcon(): ?string {
        $icon = $this->icon;
        if( is_null($icon) ){
            $tag = [];
            if( ! $this->tag['lang'] ){
                $tag[] = 'lang lang-zxx';
            }
            foreach( $this->tag as $class => $code ){
                if( $code ){
                    $tag[] = $class.' '.$class.'-'.$code;
                }
            }
            $icon = strtolower( implode(' ',$tag) );
            $this->icon = $icon;
        }
        return $icon;
    }


    /**
     * Force custom icon, or reset. Used in tests.
     */
    public function setIcon( string $css ):self {
        $this->icon = $css ?: null;
        return $this;
    }


    /**
     * Set custom locale name, and optional translation
     */
    public function setName( string $english_name, string $native_name = '' ):self {
        $this->name = apply_filters('loco_locale_name', $english_name, $native_name );
        $this->_name = $native_name ?: null;
        return $this;
    }


    /**
     * Test whether locale is valid
     */    
    public function isValid():bool {
        if( is_null($this->valid) ){
            $this->normalize();
        }
        return $this->valid;
    }


    /**
     * Resolve this locale's "official" name from WordPress's translation api
     * @return string English name currently set
     */    
    public function fetchName( Loco_api_WordPressTranslations $api ): ?string {
        $tag = (string) $this;
        // pull from WordPress translations API if network allowed
        $locale = $api->getLocale($tag);
        if( $locale ){
            $this->setName( $locale->getName(false), $locale->getNativeName() );
        }
        return $this->getName(false);
    }


    /**
     * Resolve this locale's name from compiled Loco data
     * @return string English name currently set
     */
    public function buildName(): ?string {
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
            $this->setName( __('Invalid locale','loco-translate') );
        }
        return $this->getName();
    }


    /**
     * Ensure locale has a label, even if it has to fall back to language code or error
     */
    public function ensureName( Loco_api_WordPressTranslations $api ):string {
        $name = $this->getName();
        if( ! $name ){
            $name = $this->fetchName($api);
            // failing that, build own name from components
            if( ! $name ){
                $name = $this->buildName();
                // last resort, use tag as name
                if( ! $name ){
                    $name = (string) $this;
                    $this->setName( $name );
                }
            }
        }
        return $name;
    }


    #[ReturnTypeWillChange]
    public function jsonSerialize():array{
        $a = $this->tag;
        $a['label'] = $this->getName();
        // plural data expected by editor
        $p = $this->getPluralData();
        $a['pluraleq'] = $p[0];
        $a['nplurals'] = count($p[1]);
        $a['plurals'] = $this->getPluralForms();
        // tone setting may be used by some external translation providers
        $a['tone'] = $this->getFormality();
        return $a;
    }


    private function getPluralData():array {
        if( is_null($this->plurals) ){
            $lc = strtolower($this->lang);
            $db = Loco_data_CompiledData::get('plurals');
            $id = $lc && isset($db[$lc]) ? $db[$lc] : 0;
            list( $this->pluraleq, $this->plurals ) = $db[''][$id];
        }
        return [ $this->pluraleq, $this->plurals ];
    }


    /**
     * Get translated plural form labels
     * @return string[]
     */
    public function getPluralForms(): array {
        list( , $plurals ) = $this->getPluralData();
        $nplurals = count($plurals);
        // Languages with no plural forms, where n always yields 0. The UI doesn't show a label for this.
        if( 1 === $nplurals ){
            return [ 'All' ];
        }
        // Germanic plurals can show singular/plural as per source string text boxes
        // Note that french style plurals include n=0 under the "Single", but we will show "Single (0,1)"
        if( 2 === $nplurals ){
            $l10n = [ 
                'one' => _x('Single','Editor','loco-translate'), 
                'other' => _x('Plural',"Editor",'loco-translate'),
            ];
        }
        // else translate all implemented plural forms and show sample numbers if useful:
        // for meaning of categories, see http://cldr.unicode.org/index/cldr-spec/plural-rules
        else {
            $l10n = [
                // Translators: Plural category for zero quantity
                'zero' => _x('Zero','Plural category','loco-translate'),
                // Translators: Plural category for singular quantity
                'one' => _x('One','Plural category','loco-translate'),
                // Translators: Plural category used in some multi-plural languages
                'two' => _x('Two','Plural category','loco-translate'),
                // Translators: Plural category used in some multi-plural languages
                'few' => _x('Few','Plural category','loco-translate'),
                // Translators: Plural category used in some multi-plural languages
                'many' => _x('Many','Plural category','loco-translate'),
                // Translators: General plural category not covered by other forms
                'other' => _x('Other','Plural category','loco-translate'),
            ];
        }
        // process labels to be shown in editor tab, appending sample values of `n` if useful
        $labels = [];
        foreach( $plurals as $sample => $tag ){
            if( is_int($sample) ){
                $sample = sprintf('%u',$sample);
            }
            // if CLDR tag is to be used we'll need to translate it
            if( array_key_exists($tag,$l10n) ){
                $name = $l10n[$tag];
            }
            else {
                $name = $tag;
            }
            // show just samples if no name
            if( '' === $name ){
                $labels[] = $sample;
            }
            // show just name if label is numeric, or samples are redundant
            else if(
                preg_match('/\\d/',$name)  ||
                ( 'one' === $tag && '1' === $sample ) ||
                ( 'two' === $tag && '2' === $sample ) ||
                ( 'zero' === $tag && '0' === $sample ) ||
                ( 'other' === $tag && 2 === $nplurals )
            ){
                $labels[] = $name;
            }
            // else both - most common for standard CLDR forms
            else {
                $labels[] = sprintf('%s (%s)', $name, $sample );
            }
        }
        return $labels;
    }


    /**
     * Get PO style Plural-Forms header value comprising number of forms and integer equation for n
     */
    public function getPluralFormsHeader(): string {
        list( $equation, $forms ) = $this->getPluralData();
        return sprintf('nplurals=%u; plural=%s;', count($forms), $equation );
    }


    /**
     * Apply PO style Plural-Forms header.
     * @param string $str header value e.g. "nplurals=2; plural=n != 1;"
     * @return void
     */
    public function setPluralFormsHeader( string $str ){
        if( ! preg_match('#^nplurals=(\\d);\\s*plural=([-+/*%!=<>|&?:()n\\d ]+);?$#', $str, $match ) ){
            throw new InvalidArgumentException('Invalid Plural-Forms header, '.json_encode($str) );
        }
        $nplurals = (int) $match[1];
        $pluraleq = trim( $match[2],' ');
        // single form requires no further inspection
        if( 2 > $nplurals ){
            $this->pluraleq = '0';
            $this->plurals = ['other'];
            return;
        }
        // Override new equation in all cases
        $previous = $this->getPluralData()[0];
        $this->pluraleq = $pluraleq;
        // quit asap if plural forms being set aren't changing anything
        if( $nplurals === count($this->plurals) && self::hashPlural($previous) === self::hashPlural($pluraleq) ){
            return;
        }
        // compile sample keys as per built-in CLDR rule for this language
        $keys = [];
        $formula = new Plural_Forms($pluraleq);
        $ns = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,20,21,22,30,31,32,100,101,102,103,104,111,200,201,202,301,302];
        for( $i = 0; $i < $nplurals; $i++ ){
            $sample = [];
            $suffix = '';
            foreach( $ns as $j => $n ){
                if( is_null($n) || $formula->execute($n) !== $i ){
                    continue;
                }
                $ns[$j] = null;
                if( array_key_exists(2,$sample) ){
                    $suffix = "\xE2\x80\xA6";
                    break;
                }
                else {
                    $sample[] = $n;
                }
            }
            $keys[] = implode(',',$sample).$suffix;
        }
        // cast to string for comparison due to PHP forcing integer keys in this->plurals
        $expect = implode('|',$keys);
        $actual = implode('|',array_keys($this->plurals));
        // use mnemonic tags only if they match the default (CLDR) tags for the current language
        if( $expect !== $actual ){
            // exception when two forms only and the first accepts n=1 and second n=2
            if( 2 === $nplurals && 0 === $formula->execute(1) && 1 === $formula->execute(2) ){
                $tags = ['one','other'];
            }
            // blanking CLDR tags means only samples will be used as labels
            else {
                $tags = array_fill(0,$nplurals,'');
                // Translators: Shown when a PO file's Plural-Forms header has a different formula from the Unicode CLDR rules
                Loco_error_AdminNotices::info( __('Plural forms differ from Loco Translate\'s built in rules for this language','loco-translate') );
            }
            // set new plural forms
            $this->plurals = array_combine($keys,$tags);
        }
    }


    /**
     * Crude normalizer for a plural equation such that similar formulae can be compared.
     * @param string $str original plural equation
     * @return string signature for comparison
     */
    private static function hashPlural( string $str ):string {
        return trim( str_replace([' ','<>'],['','!='],$str), '()' );
    }


    /**
     * Get formality setting, whether implied or explicit.
     * @return string either "", "formal" or "informal"
     */
    public function getFormality():string {
        $value = '';
        $tag = $this->__toString();
        $variant = $this->variant;
        if( '' === $variant ){
            // if a formal variant exists, tone may be implied informal
            $d = Loco_data_CompiledData::get('locales');
            if( $d->offsetExists($tag.'_formal') ){
                if( ! $d->offsetExists($tag.'_informal') ) {
                    $value = 'informal';
                }
            }
            // if an informal variant exists, tone may be implied formal
            else if( $d->offsetExists($tag.'_informal') ){
                if( ! $d->offsetExists($tag.'_formal') ) {
                    $value = 'formal';
                }
            }
        }
        else if( 'formal' === $variant || 'informal' === $variant ){
            $value = $variant;
        }
        return apply_filters('loco_locale_formality',$value,$tag);
    }

}



// Depends on compiled library
if( ! function_exists('loco_parse_wp_locale') ){
    loco_require_lib('compiled/locales.php');
}

