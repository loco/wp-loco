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
     * @param Loco_error_Exception
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
            $stack = debug_backtrace(0,2);
            $error->setCallee( $stack[1] );
        }
        // Log messages of minimum priority and up, depending on debug mode
        // note that non-debug level is in line with error_reporting set by WordPress (notices ignored)
        $priority = loco_debugging() ? Loco_error_Exception::LEVEL_DEBUG : Loco_error_Exception::LEVEL_WARNING;
        if( $error->getLevel() <= $priority ){
            $file = new Loco_fs_File( $error->getRealFile() );
            $path = $file->getRelativePath( loco_plugin_root() );
            $text = sprintf('[Loco.%s] "%s" in %s:%u', $error->getType(), $error->getMessage(), $path, $error->getRealLine() );
            // This writes to default PHP log, but note that WP_DEBUG_LOG may have set that to wp-content/debug.log.
            // If no `error_log` is set this will send message to the SAPI, so check your httpd/fast-cgi errors too.
            error_log( $text, 0 );
        }
        return $error;
    }


    /**
     * Raise a success message
     * @param string
     * @return Loco_error_Exception
     */
    public static function success( $message ){
        return self::add( new Loco_error_Success($message) );
    }


    /**
     * Raise a warning message
     * @param string
     * @return Loco_error_Exception
     */
    public static function warn( $message ){
        return self::add( new Loco_error_Warning($message) );
    }


    /**
     * Raise a generic info message
     * @param string
     * @return Loco_error_Exception
     */
    public static function info( $message ){
        return self::add( new Loco_error_Notice($message) );
    }


    /**
     * Raise a debug notice, if debug is enabled
     * @param string
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
            $htmls = array();
            /* $var $error Loco_error_Exception */
            foreach( $this->errors as $error ){
                $html = sprintf (
                    '<p><strong class="has-icon">%s:</strong> <span>%s</span></p>',
                    esc_html( $error->getTitle() ),
                    esc_html( $error->getMessage() )
                );
                $styles = array( 'notice', 'notice-'.$error->getType() );
                if( $this->inline ){
                    $styles[] = 'inline';
                }
                if( $links = $error->getLinks() ){
                    $styles[] = 'has-nav';
                    $html .= '<nav>'.implode( '<span> | </span>', $links ).'</nav>';
                }
                $htmls[] = '<div class="'.implode(' ',$styles).'">'.$html.'</div>';
            }
            $this->errors = array();
            echo implode("\n", $htmls),"\n";
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
