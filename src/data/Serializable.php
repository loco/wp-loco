<?php
/**
 * Generic array-like object that may be serialized as an array and committed into WordPress data stores.
 */
abstract class Loco_data_Serializable extends ArrayObject {

    /**
     * Object/schema version (not plugin version) can be used for validation and migrations
     * @var string|int|float
     */
    private $v = 0;

    /**
     * Time object was last persisted
     * @var int
     */
    private $t = 0;

    /**
     * @var bool
     */
    private $dirty;

    /**
     * Whether persisting on object destruction
     * @var bool
     */
    private $lazy = false;

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
     * @internal 
     */
    final public function __destruct(){
        if( $this->lazy ){
            $this->persistIfDirty();
        }
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
     * @return self
     */
    protected function clean(){
        $this->dirty = false;
        return $this;
    }


    /**
     * Force dirtiness for next check
     * @return static
     */
    protected function touch(){
        $this->dirty = true;
        return $this;
    }


    /**
     * Enable lazy persistence on object destruction, if dirty
     * @return static
     */
    public function persistLazily(){
        $this->lazy = true;
        return $this;
    }


    /**
     * Call persist method only if has changed since last clean
     * @return static
     */
    public function persistIfDirty(){
        if( $this->isDirty() ){
            $this->persist();
        }
        return $this;
    }


    /**
     * {@inheritdoc}
     * override so we can set dirty flag
     */
    #[ReturnTypeWillChange]
    public function offsetSet( $prop, $value ){
        if( ! isset($this[$prop]) || $value !== $this[$prop] ){
            parent::offsetSet( $prop, $value );
            $this->dirty = true;
        }
    }


    /**
     * {@inheritdoc}
     * override so we can set dirty flag
     */
    #[ReturnTypeWillChange]
    public function offsetUnset( $prop ){
        if( isset($this[$prop]) ){
            parent::offsetUnset($prop);
            $this->dirty = true;
        }
    }


    /**
     * @param string|int|float
     * @return self
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
     * @return int
     */
    public function getTimestamp(){
        return $this->t;
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
            't' => time(),
        );
    }


    /**
     * Restore object state from array as returned from getSerializable
     * @param array
     * @return self
     */    
    protected function setUnserialized( $data ){

        if( ! is_array($data) || ! isset($data['d']) ) {
            throw new InvalidArgumentException('Unexpected data');
        }
        
        if( get_class($this) !== $data['c'] ){
            throw new InvalidArgumentException('Unexpected class name');
        }

        // ok to populate ArrayObject
        $this->exchangeArray( $data['d'] );

        // setting version as it was in database
        $this->setVersion( $data['v'] );

        // timestamp may not be present in old objects
        $this->t = isset($data['t']) ? $data['t'] : 0;

        // object is being restored, probably from disk so start with clean state
        $this->dirty = false;
        
        return $this;
    }


    /**
     * @param string
     * @param mixed
     * @param mixed[]
     * @return mixed
     */
    protected static function cast( $prop, $value, array $defaults ){
        if( ! array_key_exists($prop,$defaults) ){
            throw new InvalidArgumentException('Invalid option, '.$prop );
        }
        $default = $defaults[$prop];
        // cast to same type as default
        if( is_bool($default) ){
            $value = (bool) $value;
        }
        else if( is_int($default) ){
            $value = (int) $value;
        }
        else if( is_array($default) ){
            if( ! is_array($value) ){
                $value = preg_split( '/[\\s,]+/', trim($value), -1, PREG_SPLIT_NO_EMPTY );
            }
        }
        else {
            $value = (string) $value;
        }
        return $value;
    }

}