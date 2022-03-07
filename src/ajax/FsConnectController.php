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
     * @param Loco_fs_File existing file path (must exist)
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
        // else no dependants failed deletable test
        return true;
    }
    
    
    /**
     * @param Loco_fs_File file being moved (must exist)
     * @param Loco_fs_File target path (should not exist)
     * @return bool
     */
    private function authorizeMove( Loco_fs_File $source, Loco_fs_File $target = null ){
        return $this->api->authorizeMove($source,$target);
    }


    /**
     * @param Loco_fs_File new file path (should not exist)
     * @return bool
     */
    private function authorizeCreate( Loco_fs_File $file ){
        return $this->api->authorizeCreate($file);
    }


    /**
     * @param Loco_fs_File file path to update (should exist)
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
        // updating file will also recompile binary, which may or may not exist
        $files = new Loco_fs_Siblings($file);
        $mofile = $files->getBinary();
        if( $mofile && ! $this->api->authorizeSave($mofile) ){
            return false;
        }
        // else no dependants to update
        return true;
    }


    /**
     * @param Loco_fs_File path which may exist (update it) or may not (create it)
     * @return bool
     */
    private function authorizeUpload( Loco_fs_File $file ){
        if( $file->exists() ){
            return $this->api->authorizeUpdate($file);
        }
        else {
            return $this->api->authorizeCreate($file);
        }
    }


    /**
     * {@inheritdoc}
     */
    public function render(){
        // establish operation being authorized (create,delete,etc..)
        $post = $this->validate();
        $type = $post->auth;
        $func = 'authorize'.ucfirst($type);
        $auth = [ $this, $func ];
        if( ! is_callable($auth) ){
            throw new Loco_error_Exception('Unexpected file operation');
        }
        // all auth methods require at least one file argument
        $file = new Loco_fs_File( $post->path );
        $base = loco_constant('WP_CONTENT_DIR');
        $file->normalize($base);
        $args = [$file];
        // some auth methods also require a destination/target (move,copy,etc..)
        if( $dest = $post->dest ){
            $file = new Loco_fs_File($dest);
            $file->normalize($base);
            $args[] = $file;
        }
        // call auth method and respond with status and prompt HTML if connect required
        try {
            $this->api = new Loco_api_WordPressFileSystem;
            if( call_user_func_array($auth,$args) ){
                $this->set( 'authed', true );
                $this->set( 'valid', $this->api->getOutputCredentials() );
                $this->set( 'creds', $this->api->getInputCredentials() );
                $this->set( 'method', $this->api->getFileSystem()->method );
                $this->set( 'success', __('Connected to remote file system','loco-translate') );
                // warning when writing to this location is risky (overwrites during wp update)
                if( Loco_data_Settings::get()->fs_protect && $file->getUpdateType() ){
                    if( 'create' === $type ){
                        $message = __('This file may be overwritten or deleted when you update WordPress','loco-translate');
                    }
                    else if( 'delete' === $type ){
                        $message = __('This directory is managed by WordPress, be careful what you delete','loco-translate');
                    }
                    else if( 'move' === $type ){
                        $message = __('This directory is managed by WordPress. Removed files may be restored during updates','loco-translate');
                    }
                    else {
                        $message = __('Changes to this file may be overwritten or deleted when you update WordPress','loco-translate');
                    }
                    $this->set('warning',$message);
                }
            }
            else {
                $this->set( 'authed', false );
                // HTML form should be set when authorization failed
                $html = $this->api->getForm();
                if( '' === $html || ! is_string($html) ){
                    // this is the only non-error case where form will not be set.
                    if( 'direct' === loco_constant('FS_METHOD') ){
                        $html = 'Remote connections are prevented by your WordPress configuration. Direct access only.';
                    }
                    // else an unknown error occurred when fetching output from request_filesystem_credentials
                    else {
                        $html = 'Failed to get credentials form';
                    }
                    // displaying error after clicking "connect" to avoid unnecessary warnings when operation may not be required
                    $html = '<form><h2>Connection problem</h2><p>'.$html.'.</p></form>';
                }
                $this->set( 'prompt', $html );
                // supporting text based on file operation type explains why auth is required
                if( 'create' === $type ){
                    $message = __('Creating this file requires permission','loco-translate');
                }
                else if( 'delete' === $type ){
                    $message = __('Deleting this file requires permission','loco-translate');
                }
                else if( 'move' === $type ){
                    $message = __('This move operation requires permission','loco-translate');
                }
                else {
                    $message = __('Saving this file requires permission','loco-translate');
                }
                // message is printed before default text, so needs delimiting.
                $this->set('message',$message.'.');
            }
        }
        catch( Loco_error_WriteException $e ){
            $this->set('authed', false );
            $this->set('reason', $e->getMessage() );
        }

        return parent::render();
    }


}