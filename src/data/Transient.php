<?php
/**
 * 
 */
abstract class Loco_data_Transient extends Loco_data_Serializable {

    /**
     * Lifespan to persist object in transient cache on shutdown
     * @var int
     */
    private $lazy;
    
    /**
     * Get short suffix for use as end of cache key.
     * DB allows 191 characters including "_transient_timeout_loco_" prefix, leaving 167 bytes
     * @return string
     */
    abstract public function getKey();


    /**
     * Persist object in WordPress cache
     * @return Loco_data_Transient
     */
    public function persist( $ttl = 0, $immediate = false ){
        if( $immediate ){
            $key = 'loco_'.$this->getKey();
            $data = $this->getSerializable();
            set_transient( $key, $data, $ttl );
            $this->lazy = null;
            $this->clean();
        }
        else {
            $this->lazy = $ttl;
        }

        return $this;
    }


    /**
     * Commit to transient cache on object destruction
     */
    final public function __destruct(){
        if( is_int($this->lazy) ){
            $this->persistIfDirty( $this->lazy, true );
        }
    }



    /**
     * Retrieve and unserialize this object from WordPress transient cache
     * @return bool whether object existed in cache
     */
    public function fetch(){
        $v = $this->getVersion();
        $key = 'loco_'.$this->getKey();
        $data = get_transient( $key );
        try {
            $this->setUnserialized($data);
            return true;
        }
        catch( InvalidArgumentException $e ){
            return false;
        }
    }    

    
}