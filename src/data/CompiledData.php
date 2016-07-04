<?php
/**
 * Static, read-only caching of data held in serialized files.
 * Used for pre-built arrays of information such as plural forms.
 */
class Loco_data_CompiledData implements ArrayAccess {
    
    /**
     * @var array
     */
    private static $reg;
    
    /**
     * @var string
     */
    private $name;
    
    /**
     * @var array
     */
    private $data;

    
    /**
     * @return Loco_data_CompiledData
     */
    public static function get( $name ){
        if( ! isset(self::$reg[$name]) ){
            self::$reg[$name] = new Loco_data_CompiledData($name);
        }
        return self::$reg[$name];
    }
    

    private function __construct( $name ){
        $path = 'lib/compiled/'.$name.'.php';
        $this->data = loco_include( $path );
        $this->name = $name;
    }


    public function destroy(){
        unset( self::$reg[$this->name], $this->data );
    }


    public function offsetGet( $k ){
        return isset($this->data[$k]) ? $this->data[$k] : null;
    }
    
    
    public function offsetExists( $k ){
        return isset($this->data[$k]);
    }


    public function offsetUnset( $k ){
        throw new RuntimeException('Read only');
    }
    
    
    public function offsetSet( $k, $v ){
        throw new RuntimeException('Read only');
    }
    
}