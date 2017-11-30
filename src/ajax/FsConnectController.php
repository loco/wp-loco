<?php
/**
 * Ajax service that provides remote server authentication for file system *write* operations
 */
class Loco_ajax_FsConnectController extends Loco_mvc_AjaxController {


    /**
     * {@inheritdoc}
     */
    public function render(){
        
        $post = $this->validate();

        $api = new Loco_api_WordPressFileSystem;
        $func = 'authorize'.ucfirst($post->auth);
        $auth = array( $api, $func );
        if( ! is_callable($auth) ){
            throw new Loco_error_Exception('Unexpected file operation');
        }
        
        $file = new Loco_fs_File( $post->path );
        $base = loco_constant('WP_CONTENT_DIR');
        $file->normalize($base);
        
        try {
            $file->getWriteContext()->authorize();
            //
            if( call_user_func( $auth, $file ) ){
                $this->set( 'authed', true );
                $this->set( 'valid', $api->getOutputCredentials() );
                $this->set( 'creds', $api->getInputCredentials() );
                $this->set( 'method', $api->getFileSystem()->method );
                $this->set( 'success', __('Connected to remote file system','loco-translate') );
            }
            else {
                $this->set( 'authed', false );
                $this->set( 'prompt', $api->getForm() );
            }
            
        }
        catch( Loco_error_WriteException $e ){
            $this->set('authed', false );
            $this->set('reason', $e->getMessage() );
        }
        
        return parent::render();
    }


}