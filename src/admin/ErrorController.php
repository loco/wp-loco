<?php
/**
 * 
 */
class Loco_admin_ErrorController extends Loco_mvc_AdminController {
    
    
    public function renderError( Exception $e ){
        $this->set('error', Loco_error_Exception::convert($e) );
        return $this->render();
    }


    public function render(){
        $e = $this->get('error');
        if( ! $e ){
            $e = new Loco_error_Exception('Unknown error');
            $this->set('error', $e );
        }
        return $this->view( $e->getTemplate() );
    }
    
}


