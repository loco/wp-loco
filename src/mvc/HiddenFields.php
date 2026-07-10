<?php
/**
 * 
 */
class Loco_mvc_HiddenFields extends Loco_mvc_ViewParams {
    
    /**
     * @internal
     * Echo all hidden fields to output buffer
     */
    public function _e(){
        foreach( $this as $name => $value ){
            echo '<input type="hidden" name="',$this->escape($name),'" value="',$this->escape($value),'" />';
        }
    }


    /**
     * Add a nonce field 
     * @param string $action action passed to wp_create_nonce
     */
    public function setNonce( string $action ):self {
        $this['loco-nonce'] = wp_create_nonce( $action );
        return $this;
    }


    /**
     * Get the nonce field, assuming set
     */
    public function getNonce():string {
        return $this['loco-nonce'] ?? '';
    }
    

    /**
     * Load postdata fields
     */
    public function addPost( Loco_mvc_PostParams $post ):self {
        foreach( $post->getSerial() as $pair ){
            $this[ $pair[0] ] = $pair[1] ?? '';
        }
        return $this;
    }


    /**
     * Append arguments to a URL
     * @param string $base optional base url
     * @return string full URL with query string
     */
    public function getHref( string $base = '' ):string {
        $query = http_build_query($this->getArrayCopy());
        $sep = false === strpos($base,'?') ? '?' : '&';
        return $base.$sep.$query;
    }

} 
