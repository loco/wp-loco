<?php
/**
 * For buffering accidental output caused by themes and other plugins.
 * TODO log junk output?
 * TODO collect raised notices?
 */
class Loco_output_Buffer {

    
    /**
     * The previous output buffering level before we started buffering
     * @var int usually 0 unless another buffer was opened before this one.
     */    
    private $ob_level;

    /**
     * Content buffered while our buffer was buffering
     * @var string
     */    
    private $output = '';


    /**
     * @return string
     */    
    public function __toString(){
         return $this->output;
    }

    
    /**
     * @return Loco_output_Buffer
     */
    public static function start(){
        $buffer = new Loco_output_Buffer;
        return $buffer->open();
    }


    /**
     * @internal
     * Ensure buffers closed if something terminates before we close gracefully
     */
    public function __destruct(){
        if( is_int($this->ob_level) ){
            $this->close();
        }
    }



    /**
     * @return Loco_mvc_Buffer
     */
    public function open(){
        // Check if output has been generated before we've had a chance to buffer it
        if( headers_sent($file,$line) ){
            $file = str_replace( trailingslashit( loco_constant('ABSPATH') ), '', $file );
            $message = sprintf( __('Loco interrupted by output from %s:%u','loco'), $file, $line );
            // @codeCoverageIgnoreStart
            // There's no way to handle junk output once it's flushed. exit unpleasantly unless in test
            if( ! defined('LOCO_TEST') ){
                throw new Loco_error_Exception( $message );
            }
            // @codeCoverageIgnoreEnd
        }
        $this->ob_level = ob_get_level();
        ob_start();
        return $this;
    }



    /**
     * @return Loco_mvc_Buffer
     */
    public function close(){
        // close all output buffers including our own so we are guaranteed a clean exit
        $last = 0;
        $this->output = '';
        while( $level = ob_get_level() ){
            // avoid "impossible" infinite loop
            // @codeCoverageIgnoreStart
            if( $level === $last ){
                throw new Exception('Failed to close output buffer');
            }
            // @codeCoverageIgnoreEnd
            // avoid closing buffers opened before our own
            if( $level <= $this->ob_level ){
                break;
            }
            $this->output .= ob_get_contents();
            ob_end_clean();
            $last = $level;
        }
        
        $this->ob_level = null;
        return $this;
    }
    
} 