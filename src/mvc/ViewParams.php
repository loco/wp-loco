<?php
/**
 * 
 */
class Loco_mvc_ViewParams extends ArrayObject implements JsonSerializable {
    
    
    /**
     * Default escape function for view type is HTML
     * @return string
     */
    public function escape( $text ){
        return htmlspecialchars( $text, ENT_COMPAT, 'UTF-8' );
    }



    /**
     * format integer as string date, including time according to user settings
     */
     public static function date_i18n( $u, $f = null ){
        static $tf, $df, $tz;
        if( is_null($f) ){
            if( ! $tf ){
                $tf = get_option('time_format') or $tf = 'g:i A';
                $df = get_option('date_format') or $df= 'M jS Y'; 
            }
            $f = $df.' '.$tf;
        }
        // Fix Wordpress's broken timezone implementation
        if( is_null($tz) ){
            $tz = date_default_timezone_get() or $tz = 'UTC';
            $wp = get_option('timezone_string') or $wp = $tz;
            if( $tz !== $wp ){
                date_default_timezone_set( $wp );
            }
        }
        return date_i18n( $f, $u );
    }


    /**
     * @internal
     * @return mixed
     */
    public function __get( $p ){
        return isset($this[$p]) ? $this[$p] : null;
    }


    /**
     * @return bool
     */
    public function has( $p ){
        return isset($this[$p]);
    }


    /**
     * Print escaped property value
     * @param string property key
     * @param mixed optional arguments to substitute into value
     * @return void
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
     */ 
    public function date( $p, $f = null ){
        if( $u = $this->__get($p) ){
            $s = self::date_i18n( $u, $f );
        }
        else {
            $s = '';
        }
        echo $this->escape($s);
        return '';
    }


    /**
     * Print property as a string-formatted number
     */
    public function n( $p, $dp = null ){
        // number_format_i18n is pre-escaped for HTML
        echo number_format_i18n( $this->__get($p), $dp );
        return '';
    }


    /**
     * Print property with passed formatting string
     * e.g. $params->f('name', 'My name is %s' );
     */
    public function f( $p, $f = '%s' ){
        echo $this->escape( sprintf( $f, $this->__get($p) ) );
        return '';
    }


    /**
     * @return array
     */
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



    // The following are all aliases for WordPress output functions in formatting.php
    

    /*public function html( $p ){
        return esc_html( $this->__get($p) );
    }*/

    /*public function attr( $p ){
        return esc_attr( $this->__get($p) );
    }*/


    
    
}