<?php
/**
 * 
 */
class Loco_admin_ErrorController extends Loco_mvc_AdminController {
    
    
    public function renderError( Loco_error_Exception $e ){
        $this->set('error', $e );
        return $this->render();
    }


    public function render(){
        $e = $this->get('error') or $e = new Loco_error_Exception('No error set');
        return $this->view( $e->getTemplate() );
    }
    
}


