<?php
/**
 * Abstracts WordPress filesystem connection.
 * https://codex.wordpress.org/Filesystem_API
 */
class Loco_api_WordPressFileSystem {
    
    /**
     * @var WP_Filesystem_Direct
     */
    private $fs;
    
    /**
     * Credentials form HTML echoed from request_filesystem_credentials
     * @var string
     */
    private $form = '';

    /**
     * Credentials posted into the API
     * @var array
     */
    private $creds_in = array();

    /**
     * Credentials returned from the API
     * @var array
     */
    private $creds_out = array();

    
    /**
     * Get HTML form rendered by request_filesystem_credentials
     * @return string
     */
    public function getForm(){
        return $this->form;
    }    

    
    /**
     * Authorize for the creation of a file that does not exist
     * @return bool whether file system is authorized NOT necessarily whether file is creatable
     */
    public function authorizeCreate( Loco_fs_File $file ){
        if( $file->exists() ){
            throw new Loco_error_WriteException( sprintf( __('%s already exists in this folder','loco'), $file->basename() ) );
        }
        return $file->creatable() || $this->authorize($file);
    }
    
    
    /**
     * Authorize for the update of a file that does exist
     * @return bool whether file system is authorized NOT necessarily whether file is updatable
     */
    public function authorizeUpdate( Loco_fs_File $file ){
        if( ! $file->exists() ){
            throw new Loco_error_WriteException("File doesn't exist, try authorizeCreate");
        }
        return $file->writable() || $this->authorize($file);
    }
    
    
    /**
     * Authorize for the removal of an existing file
     * @return bool whether file system is authorized NOT necessarily whether file is removable
     */
    public function authorizeDelete( Loco_fs_File $file ){
        if( ! $file->exists() ){
            throw new Loco_error_WriteException("Can't delete a file that doesn't exist");
        }
        return $file->deletable() || $this->authorize($file);
    }


    /**
     * Authorizes update or create, depending on whether file exists
     * @return bool whether file system is authorized
     */
    public function authorizeWrite( Loco_fs_File $file ){
        return ( $file->exists() ? $file->writable() : $file->creatable() ) || $this->authorize($file);
    }
    
    

    /**
     * Authorize connection for any operations, regardless of whether direct file system is available.
     * @return bool whether file system is authorized
     */    
    public function authorizeConnect( Loco_fs_File $file ){
        return $this->authorize($file);
    }
    


    /**
     * Wraps `request_filesystem_credentials` negotiation to obtain a remote connection and buffer WordPress form outout
     * Call before output started, because buffers.
     */
    private function authorize( Loco_fs_File $file ){
    
        $this->fs = null;
        $this->form = '';
        $this->creds_out = array();
        
        // observe settings held temporarily in session
        try {
            $session = Loco_data_Session::get();
            if( isset($session['loco-fs']) ){
                $creds = $session['loco-fs'];
                if( $this->tryCredentials($creds,$file) ){
                    $this->creds_in = array();
                    return true;
                }
            }
        }
        catch( Exception $e ){
            // tollerate session failure
        }

        $post = Loco_mvc_PostParams::get();
        $dflt = array( 'hostname' => '', 'username' => '', 'password' => '', 'public_key' => '', 'private_key' => '', 'connection_type' => '');
        $this->creds_in = array_intersect_key( $post->getArrayCopy(), $dflt );
        
        // deliberately circumventing call to `get_filesystem_method`
        // risk of WordPress version compatibility issues, but only sane way to force a remote connection
        // @codeCoverageIgnoreStart
        if( defined('FS_METHOD') && FS_METHOD ){
            $type = FS_METHOD;
            // forcing direct access means request_filesystem_credentials will never give us a form :( 
            if( 'direct' === $type ){
                return false;
            }
        }
        else if( 'ssh' === $post->connection_type && extension_loaded('ssh2') && function_exists('stream_get_contents') ){
            $type = 'ssh2';
        }
        else if( extension_loaded('ftp') ){
            $type = 'ftpext';
        }
        else if( extension_loaded('sockets') || function_exists('fsockopen') ){
            $type = 'ftpsockets';
        }
        // @codeCoverageIgnoreEnd
        else {
            $type = '';
        }
        
        // context is nonsense here as the system doesn't know what operation we're performing
        // testing directory write-permission when we're updating a file, for example.
        $context = '/ignore/this';
        
        $type = apply_filters( 'filesystem_method', $type, $post->getArrayCopy(), $context, true );
        
        // the only params we'll pass into form will be those used by the ajax fsConnect end point
        $extra = array( 'loco-nonce', 'path', 'auth' );
        
        // capture WordPress output during negotiation.
        $buffer = Loco_output_Buffer::start();

        if( $creds = request_filesystem_credentials( '', $type, false, $context, $extra ) ){
            // credentials passed through, should allow connect if they are correct
            if( $this->tryCredentials( $creds?$creds:array(), $file ) ){
                $this->persistCredentials();
                return true;
            }
            // else there must be an error with the credentials
            $error = true;
            // pull more useful connection error for display in form
            if( isset($GLOBALS['wp_filesystem']) ){
                $fs = $GLOBALS['wp_filesystem'];
                $GLOBALS['wp_filesystem'] = null;
                if( $fs && $fs->errors && $fs->errors->get_error_code() ){
                    $error = $fs->errors;
                }
            }
            // annoyingly WordPress moves the error notice above the navigation tabs :-/
            request_filesystem_credentials( '', $type, $error, $context, $extra );
        }

        // now have unauthorized remote connection
        $this->form = (string) $buffer->close();
        return false;
    }



    /**
     * @internal
     * @return bool when credentials connected ok
     */
    private function tryCredentials( array $creds, Loco_fs_File $file ){
        // lazy construct the file system from current credentials if possible
        // in typical WordPress style, after success the object will be held in a global.
        if( WP_Filesystem( $creds, '/ignore/this/' ) ){
            $this->fs = $GLOBALS['wp_filesystem'];
            // hook new file system into write context (specifying that connect has already been performed)
            $file->getWriteContext()->connect( $this->fs, false );
            //
            $this->creds_out = $creds;
            return true;
        }
        return false;
    }



    /**
     * Set current credentials in session if settings allow
     * @return bool whether creds persisted
     */
    private function persistCredentials(){
        try {
            $settings = Loco_data_Settings::get();
            if( $settings['fs_persist'] ){
                $session = Loco_data_Session::get();
                $session['loco-fs'] = $this->creds_out;
                $session->persist();
                return true;
            }
        }
        catch( Exception $e ){
            // tollerate session failure
            Loco_error_AdminNotices::debug( $e->getMessage() );
        }
        return false;
    }    



    /**
     * Get working credentials that resulted in connection
     * @return array
     */
    public function getOutputCredentials(){
        return $this->creds_out;
    }
    
    
    
    /**
     * Get input credentials from original post.
     * this is not the same as getCredentials. It is designed for replay only, regardless of success
     * Note that input to request_filesystem_credentials is not the same as the output (specifically how hostname:port is handled)
     */
    public function getInputCredentials(){
        return $this->creds_in;
    }



    /**
     * Get currently configured filesystem API
     * @return WP_Filesystem_Direct
     */
    public function getFileSystem(){
        if( ! $this->fs ){
            $this->fs = new WP_Filesystem_Direct( null );
        }
        return $this->fs;     
    }



    /**
     * Check if filesystem access is direct
     * @return bool
     */
    public function isDirect(){
        return 'direct' === $this->getFileSystem()->method;
    }


}