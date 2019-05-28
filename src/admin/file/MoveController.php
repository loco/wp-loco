<?php
/**
 * Translation set relocation tool.
 * Moves PO/MO pair and all related files to a new location
 */
class Loco_admin_file_MoveController extends Loco_admin_file_BaseController {

    
    /**
     * {@inheritdoc}
     */
    public function init(){
        parent::init();
        $file = $this->get('file');
        /* @var Loco_fs_File $file */
        if( $file->exists() && ! $file->isDirectory() ){
            $files = new Loco_fs_Siblings($file);
            // currently only supporting localized file relocation
            if( 'po' !== $files->getSource()->extension() ){
                throw new Loco_error_Exception('Invalid file type for moving a translation set');
            }
            // nonce action will be specific to file for extra security
            $path = $file->getPath();
            $action = 'move:'.$path;
            // set up view now in case of late failure
            $fields = new Loco_mvc_HiddenFields( array() );
            $fields->setNonce( $action );
            $fields['auth'] = 'move';
            $fields['path'] = $this->get('path');
            $this->set( 'hidden', $fields );
            // attempt move if valid nonce posted back
            while( $this->checkNonce($action) ){
                // Chosen location should be valid as a posted "dest" parameter
                if( ! Loco_mvc_PostParams::get()->has('dest') ){
                    Loco_error_AdminNotices::err('No destination posted');
                    break;
                }
                // buffer all files to move to preempt write failures
                $movable = array();
                // PO files give base name remapping, depending on text domain presence
                // this can only be one of three things: (en -> en) or (foo-en -> en) or (en -> foo-en)
                $template = new Loco_fs_LocaleFile( Loco_mvc_PostParams::get()->dest );
                $target_base = $template->filename();
                $source_snip = strlen($file->filename());
                $target_dir = $template->getParent()->normalize(loco_constant('WP_CONTENT_DIR'));
                $api = new Loco_api_WordPressFileSystem;
                foreach( $files->expand() as $source ){
                    $suffix = substr($source->basename(),$source_snip);
                    $target = new Loco_fs_File( $target_dir.'/'.$target_base.$suffix );
                    if( ! $api->authorizeMove($source,$target) ) {
                        Loco_error_AdminNotices::err('Failed to authorize relocation of '.$source->basename() );
                        break 2;
                    }
                    $movable[] = array($source,$target);
                }
                // commit moves. If any fail we'll have separated the files, which is bad
                $count = 0;
                $total = count($movable);
                foreach( $movable as $pair ){
                    try {
                        $pair[0]->move( $pair[1] );
                        $count++;
                    }
                    catch( Loco_error_Exception $e ){
                        Loco_error_AdminNotices::add($e);
                    }
                }
                // flash messages for display after redirect
                try {
                    if( $count ) {
                        Loco_data_Session::get()->flash( 'success', sprintf( _n( 'File moved', '%u files moved', $total, 'loco-translate' ), $total ) );
                    }
                    if( $total > $count ){
                        $diff = $total - $count;
                        Loco_data_Session::get()->flash( 'error', sprintf( _n( 'One file could not be moved', '%u files could not be moved', $diff, 'loco-translate' ), $diff ) );
                    }
                    Loco_data_Session::close();
                }
                catch( Exception $e ){
                    // tolerate session failure
                }
                // redirect to bundle overview
                $href = Loco_mvc_AdminRouter::generate( $this->get('type').'-view', array( 'bundle' => $this->get('bundle') ) );
                if( wp_redirect($href) ){
                    exit;
                }
                break;
            }
        }
        // set page title before render sets inline title
        $bundle = $this->getBundle();
        $this->set('title', sprintf( __('Move %s','loco-translate'), $file->basename() ).' &lsaquo; '.$bundle->getName() );
    }


    /**
     * {@inheritdoc}
     */
    public function render(){
        $file = $this->get('file');
        if( $fail = $this->getFileError($file) ){
            return $fail;
        }
        // relocation requires knowing text domain and locale
        $project = $this->getProject();
        $files = new Loco_fs_Siblings($file);
        $file = new Loco_fs_LocaleFile( $files->getSource() );
        $locale = $file->getLocale();
        if( ! $locale || ! $locale->isValid() ){
            throw new Loco_error_Exception('Only able to relocation localized files');
        }
        // set info for existing file location
        $content_dir = loco_constant('WP_CONTENT_DIR');
        $parent = new Loco_fs_LocaleDirectory( $file->dirname() );
        $typeId = $parent->getTypeId();
        $this->set('current', new Loco_mvc_ViewParams(array(
            'path' => $parent->getRelativePath($content_dir),
            'type' => $parent->getTypeLabel($typeId),
        )) );
        // establish valid locations for translation set, which may include current:
        $current = $file->getRelativePath($content_dir);
        $filechoice = $project->initLocaleFiles($locale);
        // start with current location so always first in list
        $locations = array();
        $locations[$typeId] = new Loco_mvc_ViewParams( array(
            'label' => $parent->getTypeLabel($typeId),
            'paths' => array( new Loco_mvc_ViewParams( array(
                'path' => $current,
                'active' => true,
            ) ) )
        ) );
        /* @var Loco_fs_File $pofile */
        foreach( $filechoice as $pofile ){
            $relpath = $pofile->getRelativePath($content_dir);
            if( $current === $relpath ){
                continue;
            }
            // initialize location type (system, etc..)
            $parent = new Loco_fs_LocaleDirectory( $pofile->dirname() );
            $typeId = $parent->getTypeId();
            if( ! isset($locations[$typeId]) ){
                $locations[$typeId] = new Loco_mvc_ViewParams( array(
                    'label' => $parent->getTypeLabel($typeId),
                    'paths' => array(),
                ) );
            }
            $choice = new Loco_mvc_ViewParams( array(
                'path' => $relpath,
            ) );
            $locations[$typeId]['paths'][] = $choice;
        }

        $this->set('files',$files->expand() );
        $this->set('locations', $locations );
        $this->set('title', sprintf( __('Move %s','loco-translate'), $file->basename() ) );
        
        // moving files will require deletion permission on current file location
        // plus write permission on target location, but we don't know what that is yet.
        $fields = $this->prepareFsConnect('move','');
        $fields['dest'] = '';
        
        $this->enqueueScript('move');
        return $this->view('admin/file/move-po');
    }

}