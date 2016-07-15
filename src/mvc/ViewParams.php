<?php
/**
 * 
 */
class Loco_mvc_ViewParams extends ArrayObject implements JsonSerializable {
    
    
    /**
     * Default escape function for view type is HTML
     */
    public function escape( $s ){
        return htmlspecialchars( $s, ENT_COMPAT, 'UTF-8' );
    }    
    

    /**
     * format integer as string date, including time according to user settings
     */
     public static function date_i18n( $u, $f = null ){
        static $tf, $df;
        if( is_null($f) ){
            if( ! $tf ){
                $tf = get_option('time_format') or $tf = 'g:i A';
                $df = get_option('date_format') or $df= 'M jS Y'; 
            }
            $f = $df.' '.$tf;
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
     * @return void
     */
    public function e( $p ){
        echo $this->escape( $this->__get($p) );
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
        echo number_format( $this->__get($p), $dp );
        return '';
    }


    /**
     * Print a property that holds a printf string with given arguments
     *
    public function f( $f, $p ){
        $args = func_get_args();
        $args[1] = $this->__get($p);
        $s = call_user_func_array('sprintf', $args );
        echo $this->escape($s);
        return '';
    }*/



    /**
     * @return array
     */
    public function jsonSerialize(){
        return $this->getArrayCopy();
    }
    
    
    /**
     * Fetch whole object as JSON
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