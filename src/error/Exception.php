<?php
/**
 * Generic exception that we know has come from the Loco plugin
 */
class Loco_error_Exception extends Exception implements JsonSerializable {

    const LEVEL_ERROR   = 0;
    const LEVEL_WARNING = 1;
    const LEVEL_DEBUG   = 2;
    const LEVEL_NOLOG   = 3;


    /**
     * Override file in which exception was thrown
     * @var string
     */
    private $_file;

    /**
     * Override line number from where exception was thrown
     * @var int
     */
    private $_line;

    /**
     * Links to help docs etc.. to show along side error message
     * @var array
     */
    private $links = array();


    /**
     * {@inheritdoc}
     */
    public function getRealFile(){
        $file = $this->_file or $file = parent::getFile();
        return $file;
    }


    /**
     * {@inheritdoc}
     */
    public function getRealLine(){
        $line = $this->_line or $line = parent::getLine();
        return $line;
    }



    /**
     * @internal
     * @return Loco_error_Exception
     */
    public function setCallee( array $callee ){
        $this->_file = $callee['file'];
        $this->_line = $callee['line'];
        return $this;
    }



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
     * Get verbosity level
     * @return int
     */
    public function getLevel(){
        return self::LEVEL_ERROR;
    }


    /**
     * Get localized notice level name
     * @return string
     */
    public function getTitle(){
        return __('Error','loco-translate');
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
     * Push navigation links into error. Use for help pages etc..
     * @return Loco_error_Exception
     */
    public function addLink( $href, $text ){
        $this->links[] = sprintf('<a href="%s">%s</a>', esc_url($href), esc_html($text) );
        return $this;
    }


    /**
     * @return array
     */
     public function getLinks(){
         return $this->links;
     }



    /**
     * Convert generic exception to one of ours
     * @return Loco_error_Exception
     */
    public static function convert( Exception $e ){
        if( $e instanceof Loco_error_Exception ){
            return $e;
        }
        $me = new Loco_error_Exception( $e->getMessage(), $e->getCode(), $e );
        $me->_file = $e->getFile();
        $me->_line = $e->getLine();
        return $me;
    }    
    
}