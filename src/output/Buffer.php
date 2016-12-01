<?php
/**
 * For buffering accidental output caused by themes and other plugins.
 * Also used in template rendering.
 */
class Loco_output_Buffer {
    
    /**
     * The output buffering level opened by this instance
     * @var int usually 1 unless another buffer was opened before this one.
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
        $this->close();
    }



    /**
     * @return Loco_output_Buffer
     */
    public function open(){
        self::check();
        if( ! ob_start() ){
            throw new RuntimeException('Failed to start output buffering');
        }
        $this->ob_level = ob_get_level();
        return $this;
    }



    /**
     * @return Loco_output_Buffer
     */
    public function close(){
        if( is_int($this->ob_level) ){
            // collect output from our nested buffers
            $this->output = self::flush( $this->ob_level );
            $this->ob_level = null;
        }
        return $this;
    }



    /**
     * Check the current script has not produced unbuffered output
     * @throws Loco_error_Exception
     * @return void
     */
    public static function check(){
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
    }



    /**
     * @internal
     * @param int highest buffer to flush
     * @return string
     */
    private static function flush( $min ){
        $last = -1;    
        $output = '';
        while( $level = ob_get_level() ){
            // avoid "impossible" infinite loop
            // @codeCoverageIgnoreStart
            if( $level === $last ){
                throw new Exception('Failed to close output buffer');
            }
            // @codeCoverageIgnoreEnd
            if( $level < $min ){
                break;
            }
            $output .= ob_get_contents();
            ob_get_clean();
            $last = $level;
        }
        return $output;
    }



    /**
     * Destroy all output buffers
     * @return void
     */
    public static function clear(){
        $junk = self::flush(0);
        if( $bytes = strlen($junk) ){
            do_action( 'loco_buffer_cleared', $junk );
            $message = sprintf("Cleared %s of buffered output", Loco_mvc_FileParams::renderBytes($bytes) );
            Loco_error_AdminNotices::debug( $message );
        }
    }

} 