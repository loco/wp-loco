<?php
/**
 * 
 */
class Loco_mvc_ViewParams extends ArrayObject implements JsonSerializable {
    
    /**
     * Default escape function for view type is HTML
     * @param string $text
     * @return string
     */
    public function escape( $text ){
        return htmlspecialchars( (string) $text, ENT_COMPAT, 'UTF-8' );
    }


    /**
     * format integer as string date, including time according to user settings
     * @param int $u unix timestamp
     * @param string|null $f date format
     * @return string
     */
     public static function date_i18n( $u, $f = null ){
        static $tf, $df, $tz;
        if( is_null($f) ){
            if( is_null($tf) ){
                $tf = get_option('time_format') or $tf = 'g:i A';
                $df = get_option('date_format') or $df= 'M jS Y'; 
            }
            $f = $df.' '.$tf;
        }
        // date_i18n was replaced with wp_date in WP 5.3
        if( function_exists('wp_date') ){
             return wp_date($f,$u);
        }
        // date_i18n expects timestamp to include offset
        if( is_null($tz) ){
            try {
                $wp = get_option('timezone_string') or $wp = date_default_timezone_get();
                $tz = new DateTimeZone($wp);
            }
            catch( Exception $e ){
                $tz = new DateTimeZone('UTC');
            }
        }
        $d = new DateTime(null,$tz);
        $d->setTimestamp($u);
        return date_i18n( $f, $u + $d->getOffset() );
    }


    /**
     * Wrapper for sprintf so we can handle PHP 8 exceptions
     * @param string $format
     * @return string
     */
    public static function format( $format, array $args ){
        try {
            return vsprintf($format,$args);
        }
        // Note that PHP8 will throw Error (not Exception), PHP 7 will trigger E_WARNING
        catch( Error $e ){
            Loco_error_AdminNotices::warn( $e->getMessage().' in vsprintf('.var_export($format,true).')' );
            return '';
        }
    }


    /**
     * @internal
     * @param string $p property name
     * @return mixed
     */
    public function __get( $p ){
        return $this->offsetExists($p) ? $this->offsetGet($p) : null;
    }


    /**
     * Test if a property exists, even if null
     * @param string $p property name
     * @return bool
     */
    public function has( $p ){
        return $this->offsetExists($p);
    }


    /**
     * Print escaped property value
     * @param string $p property key
     * @return string empty string
     */
    public function e( $p ){
        $text = $this->__get($p);
        echo $this->escape( $text );
        return '';
    }


    /**
     * Print property as string date, including time
     * @param string $p property name
     * @param string $f date format
     * @return string empty string
     */ 
    public function date( $p, $f = null ){
        $u = (int) $this->__get($p);
        if( $u > 0 ){
            echo $this->escape( self::date_i18n($u,$f) );
        }
        return '';
    }


    /**
     * Print property as a string-formatted number
     * @param string $p property name
     * @param int $dp optional decimal places
     * @return string empty string
     */
    public function n( $p, $dp = 0 ){
        // number_format_i18n is pre-escaped for HTML
        echo number_format_i18n( $this->__get($p), $dp );
        return '';
    }


    /**
     * Print property with passed formatting string
     * e.g. $params->f('name', 'My name is %s' );
     * @param string $p property name
     * @param string $f formatting string
     * @return string empty string
     */
    public function f( $p, $f = '%s' ){
        echo $this->escape( self::format( $f, [$this->__get($p)] ) );
        return '';
    }


    /**
     * Print property value for JavaScript
     * @param string $p property name
     * @return string empty string
     */
    public function j( $p ){
        echo json_encode($this->__get($p) );
        return '';
    }


    /**
     * @return array
     */
    #[ReturnTypeWillChange]
    public function jsonSerialize(){
        return $this->getArrayCopy();
    }
    
    
    /**
     * Fetch whole object as JSON
     * @return string
     */
    public function exportJson(){
        return json_encode( $this->jsonSerialize() );
    }
    
    
    /**
     * Merge parameters into ours
     * @return Loco_mvc_ViewParams
     */
    public function concat( ArrayObject $more ){
        foreach( $more as $name => $value ){
            $this[$name] = $value;
        }
        return $this;
    }


    /**
     * Debugging function
     * @codeCoverageIgnore
     */
    public function dump(){
        echo '<pre>',$this->escape( json_encode( $this->getArrayCopy(),JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE ) ),'</pre>';
    }


    /**
     * @param callable $callback
     * @return Loco_mvc_ViewParams
     */
    public function sort( $callback ){
        $raw = $this->getArrayCopy();
        uasort( $raw, $callback );
        $this->exchangeArray( $raw );
        return $this;
    }

}