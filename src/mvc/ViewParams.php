<?php
/**
 * 
 */
class Loco_mvc_ViewParams extends ArrayObject implements JsonSerializable {
    
    /**
     * Default escape function for view type is HTML
     * @param string
     * @return string
     */
    public function escape( $text ){
        return htmlspecialchars( (string) $text, ENT_COMPAT, 'UTF-8' );
    }


    /**
     * format integer as string date, including time according to user settings
     * @param int unix timestamp
     * @param string|null date format
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
     * @internal
     * @param string property name
     * @return mixed
     */
    public function __get( $p ){
        return isset($this[$p]) ? $this[$p] : null;
    }


    /**
     * @param string property name
     * @return bool
     */
    public function has( $p ){
        return isset($this[$p]);
    }


    /**
     * Print escaped property value
     * @param string property key
     * @param mixed optional arguments to substitute into value
     * @return string empty string
     */
    public function e( $p ){
        $text = $this->__get($p);
        if( 1 < func_num_args() ){
            $args = func_get_args();
            $text = call_user_func_array( 'sprintf', $args );
        }
        echo $this->escape( $text );
        return '';
    }

    
    
    /**
     * Print property as string date, including time
     * @param string property name
     * @param string date format
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
     * @param string property name
     * @param int optional decimal places
     * @return string empty string
     */
    public function n( $p, $dp = null ){
        // number_format_i18n is pre-escaped for HTML
        echo number_format_i18n( $this->__get($p), $dp );
        return '';
    }


    /**
     * Print property with passed formatting string
     * e.g. $params->f('name', 'My name is %s' );
     * @param string property name
     * @param string formatting string
     * @return string empty string
     */
    public function f( $p, $f = '%s' ){
        echo $this->escape( sprintf( $f, $this->__get($p) ) );
        return '';
    }


    /**
     * Print property value for JavaScript
     * @param string property name
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
     * @param ArrayObject
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
     * @param callable
     * @return Loco_mvc_ViewParams
     */
    public function sort( $callback ){
        $raw = $this->getArrayCopy();
        uasort( $raw, $callback );
        $this->exchangeArray( $raw );
        return $this;
    }

}