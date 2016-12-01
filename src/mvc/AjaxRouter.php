<?php
/**
 * Handles execution of Ajax actions and rendering of JSON
 */
class Loco_mvc_AjaxRouter extends Loco_hooks_Hookable {
    
    /**
     * Current ajax controller
     * @var Loco_mvc_AjaxController
     */
    private $ctrl;

    /**
     * @var Loco_output_Buffer
     */    
    private $buffer;



    /**
     * Generate a GET request URL containing required routing parameters
     * @return string
     */
    public static function generate( $route, array $args = array() ){
        // validate route autoload if debugging
        if( loco_debugging() ){
            class_exists( self::routeToClass($route) );
        }
        $args += array (
            'route' => $route,
            'action' => 'loco_ajax',
            'loco-nonce' => wp_create_nonce($route),
        );
        return admin_url('admin-ajax.php','relative').'?'.http_build_query($args,null,'&');
    }




    public function __construct(){
        $this->buffer = Loco_output_Buffer::start();
        parent::__construct();
    }



    /**
     * "init" action callback.
     * early-ish hook that ensures controllers can initialize
     */
    public function on_init(){
        try {
            $class = self::routeToClass( $_REQUEST['route'] );
            // autoloader will throw error if controller class doesn't exist
            $this->ctrl = new $class;
            $this->ctrl->_init( $_REQUEST );
            // 
            do_action('loco_controller_init', $this->ctrl );
        }
        catch( Loco_error_Exception $e ){
            $this->ctrl = null;
            // throw $e; // <- debug
        }
    }


    
    /**
     * @return string
     */
    private static function routeToClass( $route ){
        $route = explode( '-', $route );
        // convert route to class name, e.g. "foo-bar" => "Loco_ajax_foo_BarController"
        $key = count($route) - 1;
        $route[$key] = ucfirst( $route[$key] );
        return 'Loco_ajax_'.implode('_',$route).'Controller';
    }



    /**
     * Common ajax hook for all Loco admin JSON requests 
     * @codeCoverageIgnore
     */
    public function on_wp_ajax_loco_json(){
        $json = $this->renderAjax();
        // avoid outputing junk in JSON stream
        Loco_output_Buffer::clear();
        Loco_output_Buffer::check();
        // output stream is clear, we can flush JSON
        header('Content-Length: '.strlen($json), true );
        header('Content-Type: application/json; charset=UTF-8', true );
        // avoid hijacking of exit via wp_die_ajax_handler. Tests call renderAjax directly.
        echo $json;
        exit(0);
    }



    /**
     * Additional ajax hook for download actions that won't be JSON
     * @codeCoverageIgnore
     */
    public function on_wp_ajax_loco_download(){
        $data = $this->renderDownload();
        if( is_string($data) ){
            $path = ( $this->ctrl ? $this->ctrl->get('path') : '' ) or $path = 'error.json';
            $file = new Loco_fs_File( $path );
            $ext = $file->extension();
        }
        else if( $data instanceof Exception ){
            $data = sprintf('%s in %s:%u', $data->getMessage(), basename($data->getFile()), $data->getLine() );
            $ext = null;
        }
        else {
            $data = (string) $data;
            $ext = null;
        }
        // set content type header appropriate for supported file extensions
        if( ! headers_sent() ){
            $mimes = array(
                'mo'   => 'application/x-gettext-translation',
                'po'   => 'application/x-gettext',
                'pot'  => 'application/x-gettext',
                'xml'  => 'text/xml',
                'json' => 'application/json',
            );
            if( $ext && isset($mimes[$ext]) ){
                header('Content-Type: '.$mimes[$ext].'; charset=UTF-8', true );
                header('Content-Disposition: attachment; filename='.$file->basename(), true );
            }
            else {
                header('Content-Type: text/plain; charset=UTF-8', true );
            }
            header('Content-Length: '.strlen($data), true );
        }
        // avoid hijacking of exit via wp_die_ajax_handler. Tests call renderDownload directly.
        echo $data;
        exit(0);
    }



    /**
     * Execute ajax controller to render JSON response body
     * @return string
     */
    public function renderAjax(){
        try {
            // respond with deferred failure from initAjax
            if( ! $this->ctrl ){
                $route = isset($_REQUEST['route']) ? $_REQUEST['route'] : '';
                throw new Loco_error_Exception( sprintf( __('Ajax route not found: "%s"','loco'), $route ) );
            }
            // else execute controller to get json output
            $json = $this->ctrl->render();
            if( is_null($json) || ! isset($json{0})  ){
                throw new Loco_error_Exception( __('Ajax controller returned empty JSON','loco') );
            }
        }
        catch( Loco_error_Exception $e ){
            $json = json_encode( array( 'error' => $e->jsonSerialize(), 'notices' => Loco_error_AdminNotices::destroyAjax() ) );
        }
        catch( Exception $e ){
            $e = new Loco_error_Exception( $e->getMessage(), $e->getCode() );
            $json = json_encode( array( 'error' => $e->jsonSerialize(), 'notices' => Loco_error_AdminNotices::destroyAjax() ) );
        }
        if( $this->buffer ){
            $this->buffer->close();
            $this->buffer = null;
        }
        return $json;
    }



    /**
     * Execute ajax controller to render something other than JSON
     * @return string|Exception
     */
    public function renderDownload(){
        try {
            // respond with deferred failure from initAjax
            if( ! $this->ctrl ){
                throw new Loco_error_Exception( __('Download action not found','loco') );
            }
            // else execute controller to get raw output
            $data = $this->ctrl->render();
            if( is_null($data) || ! isset($data{0})  ){
                throw new Loco_error_Exception( __('Download controller returned empty output','loco') );
            }
        }
        catch( Exception $e ){
            $data = $e;
        }
        if( $this->buffer ){
            $this->buffer->close();
            $this->buffer = null;
        }
        return $data;
    }

}