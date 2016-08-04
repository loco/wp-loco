<?php
/**
 * Generic array-like object that may be serialized as an array and committed into WordPress data stores.
 */
abstract class Loco_data_Serializable extends ArrayObject {

    
    /**
     * Object version, can be used for validation and migrations.
     * @var string|int|float
     */
    private $v = 0;

    /**
     * Commit serialized data to WordPress storage
     * @return mixed
     */
    abstract public function persist();


    /**
     * Alias property getter through ArrayObject implementation 
     */
    public function __get( $prop ){
        return $this[$prop];
    }


    /**
     * Alias property setter through ArrayObject implementation 
     */
    public function __set( $prop, $value ){
        $this[$prop] = $value;
    }


    /**
     * @return Loco_data_Serializable
     */
    public function setVersion( $version ){
        $this->v = $version;
        return $this;
    }


    /**
     * @return string|int|float
     */
    public function getVersion(){
        return $this->v;
    }



    /**
     * Get serializable data for storage
     * @return array
     */
    protected function getSerializable(){
        return array (
            'c' => get_class($this),
            'v' => $this->getVersion(),
            'd' => $this->getArrayCopy(),
        );
    }



    /**
     * Restore object state from array as returned from getSerializable
     * @return Loco_data_Serializable
     */    
    protected function setUnserialized( $data ){

        if( ! is_array($data) || ! isset($data['d']) ) {
            throw new InvalidArgumentException('Unexpected data');
        }
        
        if( get_class($this) !== $data['c'] ){
            throw new InvalidArgumentException('Unexpected class name');
        }
        
        $this->setVersion( $data['v'] );

        // ok to populate ArrayObject
        $this->exchangeArray( $data['d'] );

        return $this;
    }    

    
}