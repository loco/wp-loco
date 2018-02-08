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
        if( $e ){
            $file = Loco_mvc_FileParams::create( new Loco_fs_File( $e->getRealFile() ) ); 
            $file['line'] = $e->getRealLine();
            $this->set('file', $file );
        }
        else {
            $e = new Loco_error_Exception('Unknown error');
            $this->set('error', $e );
        }

        return $this->view( $e->getTemplate() );
    }
    
}


