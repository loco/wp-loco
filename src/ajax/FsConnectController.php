<?php
/**
 * Ajax service thaht provides remote server authentication for file system *write* operations
 */
class Loco_ajax_FsConnectController extends Loco_mvc_AjaxController {


    /**
     * {@inheritdoc}
     */
    public function render(){
        
        $post = $this->validate();

        $api = new Loco_api_WordPressFileSystem;
        $func = 'authorize'.ucfirst($post->op);
        $auth = array( $api, $func );
        if( ! is_callable($auth) ){
            throw new Loco_error_Exception('Unexpected file operation');
        }
        
        $file = new Loco_fs_File( $post->path );
        $base = loco_constant('WP_CONTENT_DIR');
        $file->normalize($base);
        
        if( $authed = call_user_func( $auth, $file ) ){
            $this->set( 'authed', true );
        }
        else {
            $this->set( 'authed', false );
            $this->set( 'prompt', $api->getForm() );
        }
        
        return parent::render();
    }


}