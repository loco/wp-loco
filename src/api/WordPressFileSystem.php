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
     * @var string
     */
    private $form = '';

    /**
     * Flag indicating whether file system is disconnected
     * @var bool
     */
    private $connected = false;

    
    /**
     * Get HTML form rendered by request_filesystem_credentials
     * @return string
     */
    public function getForm(){
        return $this->form;
    }    

    
    /**
     * Authorize for the creation of a file that does not exist
     * @return bool
     */
    public function authorizeCreate( Loco_fs_File $file ){
        if( $file->exists() ){
            throw new InvalidArgumentException('File already exists, try authorizeUpdate');
        }
        $file->getWriteContext()->connect( $this->getFileSystem(), $this->disconnected );
        if( $file->creatable() ){
            return true;
        }
        return $this->authorize( $file );
    }
    
    
    /**
     * Authorize for the update of a file that does exist
     * @return bool
     */
    public function authorizeUpdate( Loco_fs_File $file ){
        if( ! $file->exists() ){
            throw new InvalidArgumentException("File doesn't exist, try authorizeCreate");
        }
        $file->getWriteContext()->connect( $this->getFileSystem(), $this->disconnected );
        if( $file->writable() ){
            return true;
        }
        return $this->authorize( $file );
    }
    
    
    /**
     * Authorize for the removal of an existing
     * @return bool
     */
    public function authorizeDelete( Loco_fs_File $file ){
        if( ! $file->exists() ){
            throw new InvalidArgumentException("Can't delete a file that doesn't exist");
        }
        $file->getWriteContext()->connect( $this->getFileSystem(), $this->disconnected );
        if( $file->deletable() ){
            return true;
        }
        return $this->authorize( $file );
    }



    /**
     * Wraps `request_filesystem_credentials` negotiation to obtain a remote connection and buffer WordPress form outout
     * Call before output started, because buffers.
     */
    private function authorize( Loco_fs_File $file ){
    
        $this->fs = null;
        $this->form = '';
        $this->disconnected = true;
        
        // deliberately circumventing call to `get_filesystem_method`
        // risk of WordPress version compatibility issues, but only sane way to force a remote connection
        $post = Loco_mvc_PostParams::get();
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
        
        // the only params we'll pass into form will be our own nonce
        $extra = array( 'loco-nonce' );
        
        // capture WordPress output during negotiation.
        $buffer = Loco_output_Buffer::start();

        if( $creds = request_filesystem_credentials( '', $type, false, $context, $extra ) ){
            // credentials passed through, should allow connect if they are correct
            // lazy construct the file system from current credentials if possible
            // in typical WordPress style, after success the object will be held in a global.
            if( WP_Filesystem( $creds, $context ) ){
                $this->fs = $GLOBALS['wp_filesystem'];
                // hook new file system into write context (specifying that connect has already been performed)
                $this->disconnected = false;
                $file->getWriteContext()->connect( $this->fs, false );
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
var_dump( compact('type','creds') );
        // now have unauthorized remote connection
        $this->form = (string) $buffer->close();
        return false;
    }



    /**
     * Get currently configured filesystem API
     * @return WP_Filesystem_Direct
     */
    public function getFileSystem(){
        if( ! $this->fs ){
            $this->fs = new WP_Filesystem_Direct( null );
            $this->disconnected = false;
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