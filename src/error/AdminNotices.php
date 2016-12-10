<?php

class Loco_error_AdminNotices extends Loco_hooks_Hookable {
    
    /**
     * @var Loco_error_AdminNotices
     */
    private static $singleton;

    /**
     * @var array
     */
    private $errors = array();

    /**
     * Inline messages are handled by our own template views
     * @var bool
     */
    private $inline = false;


    /**
     * @return Loco_error_AdminNotices
     */
    public static function get(){
        self::$singleton or self::$singleton = new Loco_error_AdminNotices;
        return self::$singleton;
    } 


    
    /**
     * @return Loco_error_Exception
     */
    public static function add( Loco_error_Exception $error ){
        $notices = self::get();
        $notices->errors[] = $error;
        // do late flush if we missed the boat
        if( did_action('loco_admin_init') ){
            $notices->on_loco_admin_init();
        }
        if( did_action('admin_notices') ){
            $notices->on_admin_notices();
        }
        // if exception wasn't thrown we have to do some work to establish where it was invoked
        if( __FILE__ === $error->getFile() ){
            $stack = debug_backtrace();
            $error->setCallee( $stack[1] );
        }
        // Log everything of debug verbosity level or lower if enabled
        if( $error->getLevel() < Loco_error_Exception::LEVEL_INFO ){
            if( loco_debugging() && ini_get('error_log') ){
                $file = new Loco_fs_File( $error->getRealFile() );
                $path = $file->getRelativePath( loco_plugin_root() );
                error_log( sprintf('[Loco.%s] "%s" in %s:%u', $error->getType(), $error->getMessage(), $path, $error->getRealLine() ), 0 );
            }
        }
        return $error;
    }


    /**
     * Raise a success message
     * @return Loco_error_Success
     */
    public static function success( $message ){
        return self::add( new Loco_error_Success($message) );
    }


    /**
     * Raise a warning message
     * @return Loco_error_Warning
     */
    public static function warn( $message ){
        return self::add( new Loco_error_Warning($message) );
    }


    /**
     * Raise a generic info message
     * @return Loco_error_Notice
     */
    public static function info( $message ){
        return self::add( new Loco_error_Notice($message) );
    }


    /**
     * Raise a debug notice, if debug is enabled
     * @return Loco_error_Debug
     */
    public static function debug( $message ){
        $notice = new Loco_error_Debug($message);
        loco_debugging() and self::add( $notice );
        return $notice;
    }


    /**
     * Destroy and return buffer
     * @return array
     */
    public static function destroy(){
        if( $notices = self::$singleton ){
            $buffer = $notices->errors;
            $notices->errors = array();
            self::$singleton = null;
            return $buffer;
        }
        return array();
    }



    /**
     * Destroy and return all serialized notices, suitable for ajax response 
     * @return array
     */
    public static function destroyAjax(){
        $data = array();
        /* @var $notice Loco_error_Exception */
        foreach( self::destroy() as $notice ){
            $data[] = $notice->jsonSerialize();
        }
        return $data;
    }

    
    /**
     * @return void
     */
    private function flush(){
        if( $this->errors ){
            $html = array();
            /* $var $error Loco_error_Exception */
            foreach( $this->errors as $error ){
                $html[] = sprintf (
                    '<div class="notice notice-%s loco-notice%s"><p><strong class="has-icon">%s:</strong> <span>%s</span></p></div>',
                    $error->getType(),
                    $this->inline ? ' inline' : '',
                    esc_html( $error->getTitle() ),
                    esc_html( $error->getMessage() )
                );
            }
            $this->errors = array();
            echo implode("\n", $html),"\n";
        }
    }



    /**
     * admin_notices action handler.
     */
    public function on_admin_notices(){
        if( ! $this->inline ){
            $this->flush();
        }
    }


    /**
     * loco_admin_notices callback.
     * Unlike WordPress "admin_notices" this fires from within template layout at the point we want them, hence they are marked as "inline"
     */
    public function on_loco_admin_notices(){
        $this->inline = true;
        $this->flush();
    }


    /**
     * loco_admin_init callback
     * When we know a Loco admin controller will render the page we will control the point at which notices are printed
     */
    public function on_loco_admin_init(){
        $this->inline = true;
    }



    /**
     * @internal
     * Make sure we always see notices if hooks didn't fire
     */
    public function __destruct(){
        $this->inline = false;
        if( ! loco_doing_ajax() ){
            $this->flush();
        }
    }

}
