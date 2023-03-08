<?php
/**
 * Static, read-only caching of data held in serialized files.
 * Used for pre-built arrays of information such as plural forms.
 */
class Loco_data_CompiledData implements ArrayAccess, Countable, IteratorAggregate {
    
    /**
     * @var array
     */
    private static $reg = [];
    
    /**
     * @var string
     */
    private $name;
    
    /**
     * @var array
     */
    private $data;

    
    /**
     * @param string $name
     * @return self
     */
    public static function get( $name ){
        if( ! isset(self::$reg[$name]) ){
            self::$reg[$name] = new Loco_data_CompiledData($name);
        }
        return self::$reg[$name];
    }


    /**
     * Remove all cached data from memory
     * @return void
     */
    public static function flush(){
        self::$reg = [];
    }
    

    private function __construct( $name ){
        $path = 'lib/data/'.$name.'.php';
        $this->data = loco_include( $path );
        $this->name = $name;
    }


    public function destroy(){
        unset( self::$reg[$this->name], $this->data );
    }


    #[ReturnTypeWillChange]
    public function offsetGet( $k ){
        return isset($this->data[$k]) ? $this->data[$k] : null;
    }


    #[ReturnTypeWillChange]
    public function offsetExists( $k ){
        return isset($this->data[$k]);
    }


    #[ReturnTypeWillChange]
    public function offsetUnset( $k ){
        throw new RuntimeException('Read only');
    }


    #[ReturnTypeWillChange]
    public function offsetSet( $k, $v ){
        throw new RuntimeException('Read only');
    }

    #[ReturnTypeWillChange]
    public function count(){
        return count($this->data);
    }
    
    /**
     * Implements IteratorAggregate::getIterator
     * @return ArrayIterator
     */
    #[ReturnTypeWillChange]
    public function getIterator(){
        return new ArrayIterator( $this->data );
    }

}