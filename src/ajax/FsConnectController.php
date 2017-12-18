<?php
/**
 * Ajax service that provides remote server authentication for file system *write* operations
 */
class Loco_ajax_FsConnectController extends Loco_mvc_AjaxController {
    
    /**
     * @var Loco_api_WordPressFileSystem 
     */
    private $api;
    
    
    /**
     * @return bool
     */
    private function authorizeDelete( Loco_fs_File $file ){
        $files = new Loco_fs_Siblings($file);
        // require remote authentication if at least one dependant file is not deletable directly
        foreach( $files->expand() as $file ){
            if( ! $this->api->authorizeDelete($file) ){
                return false;
            }
        }
        // else no dependants failed deltable test
        return true;
    }



    /**
     * @return bool
     */
    private function authorizeCreate( Loco_fs_File $file ){
        return $this->api->authorizeCreate($file);
    }



    /**
     * @return bool
     */
    private function authorizeUpdate( Loco_fs_File $file ){
        if( ! $this->api->authorizeUpdate($file) ){
            return false;
        }
        // if backups are enabled, we need to be able to create new files too (i.e. update parent directory)
        if( Loco_data_Settings::get()->num_backups && ! $this->api->authorizeCopy($file) ){
            return false;
        }
        // updating file may also recompile binary, which may or may not exist
        $files = new Loco_fs_Siblings( $file );
        if( $file = $files->getBinary() ){
            return $this->api->authorizeSave($file);
        }
        // else no dependants to update
        return true;
    }



    /**
     * {@inheritdoc}
     */
    public function render(){
        
        $post = $this->validate();

        $func = 'authorize'.ucfirst($post->auth);
        $auth = array( $this, $func );
        if( ! is_callable($auth) ){
            throw new Loco_error_Exception('Unexpected file operation');
        }
        
        $file = new Loco_fs_File( $post->path );
        $base = loco_constant('WP_CONTENT_DIR');
        $file->normalize($base);
        
        $this->api = new Loco_api_WordPressFileSystem;
        
        try {
            if( call_user_func( $auth, $file ) ){
                $this->set( 'authed', true );
                $this->set( 'valid', $this->api->getOutputCredentials() );
                $this->set( 'creds', $this->api->getInputCredentials() );
                $this->set( 'method', $this->api->getFileSystem()->method );
                $this->set( 'success', __('Connected to remote file system','loco-translate') );
            }
            else if( $html = $this->api->getForm() ){
                $this->set( 'authed', false );
                $this->set( 'prompt', $html );
            }
            else {
                throw new Loco_error_Exception('Failed to get credentials form');
            }
        }
        catch( Loco_error_WriteException $e ){
            $this->set('authed', false );
            $this->set('reason', $e->getMessage() );
        }

        return parent::render();
    }


}