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
     * Links to help docs etc.. to show along side error message
     * @var array
     */
    private $links = array();

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
     * {@inheritdoc}
     */
    public function __construct( $message = '', $code = 0, $previous = null ) {
        parent::__construct( $message, $code, $previous );
    }


    /**
     * @return Throwable
     */
    private function getRootException(){
        $current = $this;
        // note that getPrevious is absent in PHP < 5.3
        while( method_exists($current,'getPrevious') && ( $next = $current->getPrevious() ) ){
            $current = $next;
        }
        return $current;
    }


    /**
     * @return string
     */
    public function getRealFile(){
        if( $this->_file ){
            return $this->_file;
        }
        return $this->getRootException()->getFile();
    }


    /**
     * @return int
     */
    public function getRealLine(){
        if( $this->_line ){
            return $this->getLine();
        }
        return $this->getRootException()->getLine();
    }


    /**
     * @return array
     */
    public function getRealTrace(){
        return $this->getRootException()->getTrace();
    }


    /**
     * @param int number of levels up from callee
     * @return Loco_error_Exception
     */
    public function setCallee( $depth = 0 ){
        $stack = debug_backtrace(0);
        $callee = $stack[$depth];
        $this->_file = $callee['file'];
        $this->_line = $callee['line'];
        // TODO could also log the stack trace from $depth upwards, but not required unless being logged or thrown
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
            //'file' => str_replace( ABSPATH, '', $this->getRealFile() ),
            //'line' => $this->getRealLine()
        );
    }


    /**
     * Push navigation links into error. Use for help pages etc..
     * @param string
     * @param string
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
     * @param Exception original error
     * @return Loco_error_Exception
     */
    public static function convert( Exception $e ){
        if( $e instanceof Loco_error_Exception ){
            return $e;
        }
        return new Loco_error_Exception( $e->getMessage(), $e->getCode(), $e );
    }    
    
}