<?php
/**
 * 
 */
class Loco_error_ParseException extends Loco_error_Exception {

    public function setContext( $line, $column, $source ){
        $this->line = $line;
        $this->column = $column;
        // get line of source code where error is and construct a ____^ thingy to show error on next line
        $lines = preg_split( '/\\R/', $source );
        $this->context = $lines[ $line - 1 ] ."\n". str_repeat(' ', max(0,$column-2) ).'^';
        // wrap initial message with context data
        $this->message = sprintf("Error at line %u, column %u: %s", $this->line, $this->column, $this->message );
    }

}