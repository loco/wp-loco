<?php
/**
 * Generic exception that we know has come from the Loco plugin
 */
class Loco_error_Exception extends Exception implements JsonSerializable {
    
    
    /**
     * Get view template for rendering error to HTML.
     * @return string path relative to root tpl directory
     */
    public function getTemplate(){
        return 'admin/errors/generic';
    }    


    /**
     * Get notice level short code as a string
     * @return string
     */
    public function getType(){
        return 'error';
    }


    /**
     * Get localized notice level name
     * @return string
     */
    public function getTitle(){
        return __('Error','loco');
    }


    /**
     * @return array
     */
    public function jsonSerialize(){
        return array (
            'code' => $this->getCode(),
            'type' => $this->getType(),
            'class' => get_class($this),
            'title' => $this->getTitle(),
            'message' => $this->getMessage(),
            //'file' => str_replace( ABSPATH, '', $this->getFile() ),
            //'line' => $this->getLine(),
        );
    }    


    /**
     * Convert generic exception to one of ours
     * @return Loco_error_Exception
     */
    public static function convert( Exception $e ){
        if( $e instanceof Loco_error_Exception ){
            return $e;
        }
        return new Loco_error_Exception( $e->getMessage(), $e->getCode(), $e );
    }    
    
}