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
     * @var bool
     */
    private $dirty;

    /**
     * Commit serialized data to WordPress storage
     * @return mixed
     */
    abstract public function persist();


    /**
     * {@inheritdoc}
     */
    public function __construct( array $data = array() ){
        $this->setFlags( ArrayObject::ARRAY_AS_PROPS );
        parent::__construct( $data );
        $this->dirty = (bool) $data;
    }


    /**
     * Check if object's properties have change since last clean
     * @return bool
     */
    public function isDirty(){
        return $this->dirty;
    }


    /**
     * Make not dirty
     * @return Loco_data_Serializable
     */
    protected function clean(){
        $this->dirty = false;
        return $this;
    }



    /**
     * Call persist method only if has changed since last clean
     * @return Loco_data_Serializable
     */
    public function persistIfDirty(){
        if( $this->isDirty() ){
            $params = func_get_args();
            call_user_func_array( array($this,'persist'), $params );
        }
        return $this;
    }



    /**
     * @override so we can set dirty flag
     */
    public function offsetSet( $prop, $value ){
        if( ! isset($this[$prop]) || $value !== $this[$prop] ){
            parent::offsetSet( $prop, $value );
            $this->dirty = true;
        }
    }


    /**
     * @override so we can set dirty flag
     */
    public function offsetUnset( $prop ){
        if( isset($this[$prop]) ){
            parent::offsetUnset($prop);
            $this->dirty = true;
        }
    }


    /**
     * @return Loco_data_Serializable
     */
    public function setVersion( $version ){
        if( $version !== $this->v ){
            $this->v = $version;
            $this->dirty = true;
        }
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
        
        // because object is being restored, probably from disk. this make it clean now
        $this->dirty = false;

        return $this;
    }    

    
}