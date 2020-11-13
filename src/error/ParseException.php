<?php
/**
 * Exception thrown when parsing fails
 */
class Loco_error_ParseException extends Loco_error_Exception {

    /**
     * @var string[]
     */
    private $context;

    /**
     * @param int line number
     * @param int column number
     * @param string source in which to identify line and column
     * @return self
     */
    public function setContext( $line, $column, $source ){
        $this->context = array();
        $lines = preg_split( '/\\r?\\n/', $source, $line+1 );
        $offset = $line - 1;
        if( isset($lines[$offset]) ){
            $this->context[] = $lines[$offset];
            $this->context[] = str_repeat(' ', max(0,$column-1) ).'^';
        }
        $this->message = sprintf("Error at line %u, column %u: %s", $line, $column, $this->message );
        return $this;
    }


    /**
     * @param int zero-based offset to failure point
     * @param string source in which to identify line and column
     * @return self
     */
    public function setOffsetContext( $offset, $source ){
        $lines = preg_split( '/\\r?\\n/', substr($source,0,$offset) );
        $line = count($lines);
        $column = 1 + strlen( end($lines) );
        return $this->setContext( $line, $column, $source );
    }


    /**
     * @return string
     */
    public function getContext(){
        return is_array($this->context) ? implode("\n",$this->context) : '';
    }

}
