<?php
/**
 * Abstracts WordPress filesystem connection.
 * https://codex.wordpress.org/Filesystem_API
 */
class Loco_api_WordPressFileSystem {
    
    /**
     * Currently authenticated file system connection
     * @var WP_Filesystem_Direct
     */
    private $fs;
    
    /**
     * Whether global file modifications have already passed check
     * @var bool
     */
    private $fs_allowed;
    
    /**
     * Credentials form HTML echoed from request_filesystem_credentials
     * @var string
     */
    private $form = '';

    /**
     * Credentials posted into the API
     * @var array
     */
    private $creds_in = [];

    /**
     * Credentials returned from the API
     * @var array
     */
    private $creds_out = [];


    /**
     * Create direct filesystem accessor
     * @return WP_Filesystem_Direct
     */
    public static function direct(){
        // Emulate WP_Filesystem to avoid FS_METHOD and filters overriding "direct" type
        if( ! class_exists('WP_Filesystem_Direct',false) ){
            require_once ABSPATH.'wp-admin/includes/class-wp-filesystem-base.php';
            require_once ABSPATH.'wp-admin/includes/class-wp-filesystem-direct.php';
        }
        return new WP_Filesystem_Direct(null);
    }


    /**
     * Get HTML form rendered by request_filesystem_credentials
     * @return string
     */
    public function getForm(){
        return $this->form;
    }


    /**
     * Pre-auth checks for superficial file system denials and disconnects any active remotes
     * @param Loco_fs_File $file the file you wish to modify
     * @throws Loco_error_WriteException
     * @return void
     */
    public function preAuthorize( Loco_fs_File $file ){
        if( ! $this->fs_allowed ){
            $file->getWriteContext()->authorize();
            $this->fs_allowed = true;
        }
        // Disconnecting remote file system ensures the auth functions always start with direct file access
        $file->getWriteContext()->disconnect();
    }


    /**
     * Authorize for the creation of a file that does not exist
     * @param Loco_fs_File $file
     * @return bool whether file system is authorized NOT necessarily whether file is creatable
     */
    public function authorizeCreate( Loco_fs_File $file ){
        $this->preAuthorize($file);
        if( $file->exists() ){
            // translators: %s refers to the name of a new file to be created, but which already existed
            throw new Loco_error_WriteException( sprintf( __('%s already exists in this folder','loco-translate'), $file->basename() ) );
        }
        return $file->creatable() || $this->authorize($file);
    }


    /**
     * Authorize for the update of a file that does exist
     * @param Loco_fs_File $file
     * @return bool whether file system is authorized NOT necessarily whether file is updatable
     */
    public function authorizeUpdate( Loco_fs_File $file ){
        $this->preAuthorize($file);
        if( ! $file->exists() ){
            throw new Loco_error_WriteException("File doesn't exist, try authorizeCreate");
        }
        return $file->writable() || $this->authorize($file);
    }


    /**
     * Authorize for update or creation, depending on whether file exists
     * @param Loco_fs_File $file
     * @return bool
     */
    public function authorizeSave( Loco_fs_File $file ){
        $this->preAuthorize($file);
        return ( $file->exists() ? $file->writable() : $file->creatable() ) || $this->authorize($file);
    }


    /**
     * Authorize for copy (to same directory), meaning source file must exist and directory be writable
     * @param Loco_fs_File $file
     * @return bool
     */
    public function authorizeCopy( Loco_fs_File $file ){
        $this->preAuthorize($file);
        if( ! $file->exists() ){
            throw new Loco_error_WriteException("Can't copy a file that doesn't exist");
        }
        return $file->creatable() || $this->authorize($file);
    }


    /**
     * Authorize for move (to another path if given).
     * @param Loco_fs_File $source file being moved (must exist)
     * @param Loco_fs_File|null $target target path (should not exist)
     */
    public function authorizeMove( Loco_fs_File $source, ?Loco_fs_File $target = null ):bool {
        // source is in charge of its own deletion
        $result = $this->authorizeDelete($source);
        // target is in charge of copying original which it must also be able to read.
        if( $target && ! $this->authorizeCreate($target) ){
            $result = false;
        }
        // value returned will be false if at least one file requires we add credentials
        return $result;
    }
    
    
    /**
     * Authorize for the removal of an existing file
     * @param Loco_fs_File $file
     * @return bool whether file system is authorized NOT necessarily whether file is removable
     */
    public function authorizeDelete( Loco_fs_File $file ){
        $this->preAuthorize($file);
        if( ! $file->exists() ){
            throw new Loco_error_WriteException("Can't delete a file that doesn't exist");
        }
        return $file->deletable() || $this->authorize($file);
    }


    /**
     * Connect file to credentials in posted data. Used when established in advance what connection is needed
     * @param Loco_fs_File $file
     * @return bool whether file system is authorized
     */    
    public function authorizeConnect( Loco_fs_File $file ){
        $this->preAuthorize($file);
        // front end may have posted that "direct" connection will work
        $post = Loco_mvc_PostParams::get();
        if( 'direct' === $post->connection_type ){
            return true;
        }
        return $this->authorize($file);
    }


    /**
     * Wraps `request_filesystem_credentials` negotiation to obtain a remote connection and buffer WordPress form output
     * Call before output started, because buffers.
     * @param Loco_fs_File $file
     * @return bool
     */
    private function authorize( Loco_fs_File $file ){
        // may already have authorized successfully
        if( $this->fs instanceof WP_Filesystem_Base ){
            $file->getWriteContext()->connect( $this->fs, false );
            return true;
        }
        
        // may have already failed authorization
        if( $this->form ){
            return false;
        }
        
        // network access may be disabled
        if( ! apply_filters('loco_allow_remote', true ) ){
            throw new Loco_error_WriteException('Remote connection required, but network access is disabled');
        }
    
        // else begin new auth
        $this->fs = null;
        $this->form = '';
        $this->creds_out = [];
        
        // observe settings held temporarily in session
        try {
            $session = Loco_data_Session::get();
            if( isset($session['loco-fs']) ){
                $creds = $session['loco-fs'];
                if( is_array($creds) && $this->tryCredentials($creds,$file) ){
                    $this->creds_in = [];
                    return true;
                }
            }
        }
        catch( Exception $e ){
            // tolerate session failure
        }

        $post = Loco_mvc_PostParams::get();
        $dflt = [ 'hostname' => '', 'username' => '', 'password' => '', 'public_key' => '', 'private_key' => '', 'connection_type' => '', '_fs_nonce' => '' ];
        $this->creds_in = array_intersect_key( $post->getArrayCopy(), $dflt );
        
        // deliberately circumventing call to `get_filesystem_method`
        // risk of WordPress version compatibility issues, but only sane way to force a remote connection
        // @codeCoverageIgnoreStart
        if( defined('FS_METHOD') && FS_METHOD ){
            $type = FS_METHOD;
            // forcing direct access means request_filesystem_credentials will never give us a form :( 
            if( 'direct' === $type ){
                Loco_error_AdminNotices::debug('Cannot connect remotely when FS_METHOD is "direct"');
                return false;
            }
        }
        // direct filesystem is OK if the front end already posted it
        else if( 'direct' === $post->connection_type ){
            return true;
        }
        // else perform same logic as request_filesystem_credentials does to establish type
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
        $extra = [ 'loco-nonce', 'path', 'auth', 'dest' ];
        
        // capture WordPress output during negotiation.
        $buffer = Loco_output_Buffer::start();

        $creds = request_filesystem_credentials( '', $type, false, $context, $extra );
        if( is_array($creds) ){
            // credentials passed through, should allow to connect if they are correct
            if( $this->tryCredentials($creds,$file) ){
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

        // should now have unauthorized remote connection form
        $this->form = (string) $buffer->close();
        if( '' === $this->form ){
            Loco_error_AdminNotices::debug('Unknown error capturing output from request_filesystem_credentials');
        }
        return false;
    }


    /**
     * @param array $creds credentials returned from request_filesystem_credentials
     * @param Loco_fs_File $file file to authorize write context
     * @return bool when credentials connected ok
     */
    private function tryCredentials( array $creds, Loco_fs_File $file ){
        // lazy construct the file system from current credentials if possible
        // in typical WordPress style, after success the object will be held in a global.
        if( WP_Filesystem( $creds, '/ignore/this/' ) ){
            $this->fs = $GLOBALS['wp_filesystem'];
            // hook new file system into write context (specifying that connect has already been performed)
            $file->getWriteContext()->connect( $this->fs, false );
            $this->creds_out = $creds;
            return true;
        }
        return false;
    }


    /**
     * Set current credentials in session if settings allow
     * @return bool whether credentials persisted
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
            // tolerate session failure
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
            return self::direct();
        }
        return $this->fs;     
    }


    /**
     * Check if a file is subject to WordPress automatic updates
     * @param Loco_fs_File $file
     * @return bool
     */
    public function isAutoUpdatable( Loco_fs_File $file ){
        // all paths safe from auto-updates if auto-updates are completely disabled
        if( $this->isAutoUpdateDenied() ){
            return false;
        }
        // Auto-updates aren't denied, so ascertain location "type" and run through the same filters as WP_Automatic_Updater::should_update()
        $type = $file->getUpdateType();
        if( '' !== $type ){
            // Since 5.5.0: "{type}_s_auto_update_enabled" filters auto-update status for themes and plugins
            // admins must also enable auto-updates on plugins and themes individually, but not checking that here. 
            if( function_exists('wp_is_auto_update_enabled_for_type') && ('plugin'===$type||'theme'===$type) ){
                $enabled = (bool) apply_filters( "{$type}s_auto_update_enabled", true );
                if( $enabled ){
                    // resolve given file to plugin/theme handle, so we can check if it's been enabled
                    $bundle = Loco_package_Bundle::fromFile($file);
                    if( $bundle instanceof Loco_package_Bundle ){
                        $handle = $bundle->getHandle();
                        $option = (array) get_site_option( "auto_update_{$type}s", [] );
                        // var_dump( compact('handle','option') );
                        if( ! in_array($handle,$option,true) ){
                            $enabled = false;
                        }
                    }
                }
                return $enabled;
            }
            // WordPress updater will have {item} from remote API data which we don't have here.
            $item = new stdClass;
            $item->new_files = false;
            $item->autoupdate = true;
            $item->disable_autoupdate = false;
            return apply_filters( 'auto_update_'.$type, true, $item );
        }
        // else safe (not auto-updatable)
        return false;
    }


    /**
     * Check if system is configured to deny auto-updates
     * @return bool
     */
    public function isAutoUpdateDenied(){
        // WordPress >= 4.8 can disable auto updates completely with "automatic_updater" context
        if( function_exists('wp_is_file_mod_allowed') && ! wp_is_file_mod_allowed('automatic_updater') ){
            return true;
        }
        // else simply observe AUTOMATIC_UPDATER_DISABLED constant
        if( apply_filters( 'automatic_updater_disabled', loco_constant('AUTOMATIC_UPDATER_DISABLED') ) ) {
            return true;
        }
        // else nothing explicitly denying updates
        return false;
    }

}