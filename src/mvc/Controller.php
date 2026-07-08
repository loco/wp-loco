<?php
/**
 * 
 */
abstract class Loco_mvc_Controller extends Loco_hooks_Hookable {
    
    /**
     * Execute controller and return renderable output
     * @return string
     */
    abstract public function render();

    /**
     * Get view parameter
     * @return mixed
     */
    abstract public function get( string $prop );

    /**
     * Set view parameter
     * @param mixed $value
     * @return Loco_mvc_Controller
     */
    abstract public function set( string $prop, $value );

    /**
     * Get keyed input parameters that may be passed dynamically to the controller, e.g. via query string.
     */
    public function allowedParams():array {
        return [];
    }
    
    
    final public function filterParams( array $params ):array {
        return array_intersect_key( $params, $this->allowedParams() );
    }


    /**
     * Debugging function validates a controller class and its permitted input parameters
     * Example: Loco_mvc_AdminController::validateClass('Loco_admin_RootController', ['foo'=>'bar'])
     */
    final public static function validateClass( string $class, array $params ):void {
        $base = static::class;
        if( '' === $class ){
            $type = preg_match('/^Loco_mvc_(\\w+)Controller/',$base,$r) ? $r[1] : 'controller';
            throw new Loco_error_Exception('Invalid '.strtolower($type).' route');
        }
        if( ! class_exists($class) ){
            throw new Loco_error_Exception('File not found for '.$class);
        }
        if( ! is_subclass_of($class,$base) ){
            throw new Loco_error_Exception( $class.' must extend '.$base);
        }
        if( $params ){
            $mock = ( new ReflectionClass($class) )->newInstanceWithoutConstructor();
            $diff = array_diff_key( $params, $mock->allowedParams() );
            if( $diff ){
                throw new Loco_error_Exception('Illegal arguments for '.$class.': ['.implode(',',array_keys($diff)).']' );
            }
        }
    }
    


    /**
     * Default authorization check
     * @return Loco_mvc_Controller|void
     */
    public function auth(){
        if( is_user_logged_in() ){
            // default capability check. child classes should override
            if( current_user_can('loco_admin') ){
                return $this;
            }
        }
        $this->exitForbidden();
    }


    /**
     * Emulate permission denied screen as performed in wp-admin/admin.php
     */
    protected function exitForbidden(){
        do_action( 'admin_page_access_denied' );
        wp_die( __( 'You do not have sufficient permissions to access this page.','default' ), 403 );
    } // @codeCoverageIgnore
    



    /**
     * Set a nonce for the current page for when it submits a form
     * @return Loco_mvc_ViewParams
     */
    public function setNonce( $action ){
        $name = 'loco-nonce';
        $value = wp_create_nonce( $action );
        $nonce = new Loco_mvc_ViewParams( compact('name','value','action') );
        $this->set('nonce', $nonce );
        return $nonce;
    }


    /**
     * Check if a valid nonce has been sent in current request.
     * Fails if nonce is invalid, but returns false if not sent so scripts can exit accordingly.
     * @throws Loco_error_Exception
     * @param string $action action for passing to wp_verify_nonce
     * @return bool true if data has been posted and nonce is valid
     */
    public function checkNonce( $action ){
        $posted = false;
        $name = 'loco-nonce';
        if( isset($_REQUEST[$name]) ){
            $value = $_REQUEST[$name];
            if( wp_verify_nonce( $value, $action ) ){
                $posted = true;
            }
            else {
                throw new Loco_error_Exception('Failed security check. Please refresh the page');
            }
        }
        return $posted;
    }


    /**
     * Filter callback for `translations_api'
     * Ensures silent failure of translations_api when network disabled, see $this->getAvailableCore
     */
    public function filter_translations_api( $value = false ){
        if( apply_filters('loco_allow_remote', true ) ){
            return $value;
        }
        // returning error here has the safe effect as returning empty translations list
        return new WP_Error( -1, 'Translations API blocked by loco_allow_remote filter' );
    }
    

    /**
     * Filter callback for `pre_http_request`
     * Ensures fatal error if we failed to handle offline mode earlier.
     */
    public function filter_pre_http_request( $value = false ){
        if( apply_filters('loco_allow_remote', true ) ){
            return $value;
        }
        // little point returning WP_Error error because WordPress will just show "unexpected error" 
        throw new Loco_error_Exception('HTTP request blocked by loco_allow_remote filter' );
    }


    /**
     * number_format_i18n filter callback because our admin screens assume number_format_i18n() returns unescaped text, not HTML.
     * @param string $formatted
     * @return string
     */
    public function filter_number_format_i18n( $formatted = '' ){
        return html_entity_decode($formatted,ENT_NOQUOTES,'UTF-8');
    }

}
