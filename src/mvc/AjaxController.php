<?php
/**
 * 
 */
abstract class Loco_mvc_AjaxController extends Loco_mvc_Controller {
    
    /**
     * Request arguments injected from Router
     */
    private ArrayObject $input;
    
    /**
     * Data to respond with as JSON
     */
    private ArrayObject $output;


    /**
     * Pre-init call invoked by router
     */    
    final public function _init( array $external, array $internal = [] ):void {
        $this->auth();
        $this->output = new ArrayObject;
        $this->input = new ArrayObject( $internal + $this->filterParams($external) );
        // avoid fatal error if JSON extension is missing
        loco_check_extension('json');
    }


    /**
     * Get posted data and validate nonce in the process
     * @return Loco_mvc_PostParams
     */
    protected function validate(){
        $route = $this->input['route'];
        if( ! $this->checkNonce($route) ){
            throw new Loco_error_Exception( sprintf('Ajax %s action requires postdata with nonce',$route) );
        }
        return Loco_mvc_PostParams::get();
    }


    /**
     * {@inheritdoc}
     */
    public function get( $prop ){
        return isset($this->input[$prop]) ? $this->input[$prop] : null;
    }


    /**
     * {@inheritdoc}
     */
    public function set( $prop, $value ){
        $this->output[$prop] = $value;
        return $this;
    }


    /**
     * @return string JSON
     */
    public function render(){
        $data =  [
            'data' => $this->output->getArrayCopy(),
        ];
        // non-fatal notices deliberately not in "error" key
        $array = Loco_error_AdminNotices::destroy();
        if( $array ){
            $data['notices'] = $array;
        }
        return json_encode( $data );
    }



    /**
     * Pretty json encode if PHP version allows
     *
    protected function json_encode( $data ){
        $opts = 0;
        if( defined('JSON_PRETTY_PRINT') ){
            $opts |= JSON_PRETTY_PRINT;
        }
        if( defined('JSON_UNESCAPED_SLASHES') ){
            $opts |= JSON_UNESCAPED_SLASHES;
        }
        return json_encode( $data, $opts );
    }*/
    
}