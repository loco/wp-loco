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
        $e = $this->get('error') or $e = new Loco_error_Exception('No error set');
        return $this->view( $e->getTemplate() );
    }
    
}


