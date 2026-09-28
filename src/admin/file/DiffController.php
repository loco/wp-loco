<?php
/**
 * File revisions and rollback
 */
class Loco_admin_file_DiffController extends Loco_admin_file_BaseController {

    private string $error;
    
    /**
     * {@inheritdoc}
     */
    public function init(){
        parent::init();
        $this->enqueueStyle('podiff');
        $pofile = $this->get('file');
        $this->error = $this->getFileError($pofile);

        if( '' === $this->error ){
            // nonce action will be specific to file for extra security
            $path = $pofile->getPath();
            $action = 'restore:'.$path;
            // set up view now in case of late failure
            $fields = new Loco_mvc_HiddenFields( [] );
            $fields->setNonce($action);
            $this->set( 'hidden', $fields );
            // attempt rollback if valid nonce posted back with backup path
            if( $this->checkNonce($action) ){
                try {
                    $post = Loco_mvc_PostParams::get();
                    if( $post->has('backup') ){
                        $path = $post->backup;
                        $restore = true;
                    }
                    else if( $post->has('delete') ){
                        $path = $post->delete;
                        $restore = false;
                    }
                    else {
                        throw new Loco_error_Exception('Nothing selected');
                    }
                    $target = new Loco_fs_File( $path );
                    // The backup file path must be validated against the original, or postdata has been hacked.
                    // The original has already been validated, so as long as the directory matches, this is safe. 
                    $target->normalize( loco_constant('WP_CONTENT_DIR') );
                    if( $target->dirname() !== $pofile->dirname() ){
                        throw new Loco_error_Exception('Illegal backup path');
                    }
                    // Validate the file name of the backup path to prevent destruction of a non-backup target.
                    ( new Loco_fs_Revisions($pofile) )->getTimestamp($path);
                    // Restore: recompiles a backup to become the current version.
                    // Note that restoration appends history by backing up the current file, as opposed to a hard revert.
                    if( $restore ){
                        $data = Loco_gettext_Data::fromSource( $target->getContents() );
                        $compiler = new Loco_gettext_Compiler($pofile);
                        $compiler->writeAll( $data, $this->getOptionalProject() );
                        Loco_error_AdminNotices::success( __('File restored','loco-translate') );
                    }
                    // Delete an old backup from revision list
                    else {
                        $api = new Loco_api_WordPressFileSystem;
                        $api->authorizeDelete( $target );
                        $target->unlink();
                        Loco_error_AdminNotices::success( __('File deleted','loco-translate') );
                    }
                }
                catch( Loco_error_Exception $e ){
                    Loco_error_AdminNotices::add( $e );
                }
            }
        }
        
        $bundle = $this->getBundle();
        // translators: %s is a file name to be rolled back to a previous version.
        $this->set('title', sprintf( __('Restore %s','loco-translate'), $pofile->basename() ).' &lsaquo; '.$bundle->getName() );
    }



    /**
     * {@inheritdoc}
     */
    public function render(){
        if( '' !== $this->error ){
            return $this->error;
        }
        $file = $this->get('file');
        $info = Loco_mvc_FileParams::create($file);
        $info['mtime'] = $file->modified();
        $this->set( 'master', $info );
        // translators: Page title where %s refers to a file name
        $this->setFileTitle( $file, __('Restore %s','loco-translate') );
        
        $enabled = Loco_data_Settings::get()->num_backups;
        $this->set( 'enabled', $enabled );

        $files = [];
        $wp_content = loco_constant('WP_CONTENT_DIR');
        $paths = [ $file->getRelativePath($wp_content) ];
        
        $podate = 'pot' === $file->extension() ? 'POT-Creation-Date' : 'PO-Revision-Date'; 
        $backups = new Loco_fs_Revisions($file);

        foreach( $backups->getPaths() as $path ){
            $tmp = new Loco_fs_File( $path );
            $info = Loco_mvc_FileParams::create($tmp);
            // time file was snapshotted is actually the time the next version was updated
            // $info['mtime'] = $backups->getTimestamp($path);
            // pull "real" update time, meaning when the revision was last updated as current version
            try {
                $head = Loco_gettext_Data::head($tmp);
                $value = $head->trimmed($podate);
                if( '' !== $value ){
                    $info['potime'] = Loco_gettext_Data::parseDate($value);
                }
                else {
                    throw new Loco_error_Exception('Backup has no '.$podate.' field');
                }
            }
            catch( Exception $e ){
                Loco_error_AdminNotices::debug( $e->getMessage() );
                continue;
            }
            $paths[] = $tmp->getRelativePath($wp_content);
            $files[] = $info;
        }

        // no backups = no restore
        if( ! $files ){
            return $this->view('admin/errors/no-backups');
        }

        /*/ warn if current backup settings aren't enough to restore without losing older revisions
        $min = count($files) + 1;
        if( $enabled < $min ){
            $notice = Loco_error_AdminNotices::info('We recommend enabling more backups before restoring');
            $notice->addLink( apply_filters('loco_external','https://localise.biz/wordpress/plugin/manual/settings#po'), __('Documentation','loco-translate') )
                   ->addLink( Loco_mvc_AdminRouter::generate('config').'#loco--num-backups', __('Settings') );
        }*/

        // restore permissions required are create and delete on current location
        $this->prepareFsConnect( 'update', $this->get('path') );
        
        // prepare revision arguments for JavaScript
        $this->set( 'js', new Loco_mvc_ViewParams( [
            'paths' => $paths,
            'nonces' =>  [
                'diff' => wp_create_nonce('diff'),
            ]
        ] ) );
       
        $this->enqueueScript('podiff');
        return $this->view('admin/file/diff', compact('files','backups') );
    }

            
}
