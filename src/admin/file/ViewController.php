<?php
/**
 * File view / source formatted view.
 */
class Loco_admin_file_ViewController extends Loco_admin_file_BaseController {


    /**
     * {@inheritdoc}
     */
    public function init(){
        parent::init();
        $this->enqueueStyle('poview');
        //
        $file = $this->get('file');
        $bundle = $this->getBundle();
        $this->set( 'title', 'Source of '.$file->basename().' &lsaquo; '.$bundle->getName() );
    }


    /**
     * {@inheritdoc}
     */
    public function getHelpTabs(){
        return  [
            __('Overview') => $this->viewSnippet('tab-file-view'),
        ];
    }
    
    
    private function getUtf8Source( Loco_fs_File $file, LocoPoHeaders $head ){
        $src = $file->getContents();
        try {
            $src = loco_remove_bom( $src, $cs );
            if( '' === $cs ){
                $cs = $head->getCharset();
            }
            if( '' !== $cs ){
                $src = loco_convert_utf8($src,$cs,false);
            }
        }
        catch ( Exception $e ){
            Loco_error_AdminNotices::debug( $e->getMessage() );
        }
        return $src;
    }
    
    
    
    /**
     * {@inheritdoc}
     */
    public function render(){
        
        // file must exist for editing
        /* @var Loco_fs_File $file */
        $file = $this->get('file');
        $this->setFileTitle($file);
        $type = strtolower( $file->extension() );

        if( $fail = $this->getFileError($file) ){
            return $fail; 
        }

        // Establish if file belongs to a configured project
        $bundle = null;
        $project = null;
        try {
            $bundle = $this->getBundle();
            $project = $this->getProject();
        }
        catch( Exception $e ){
            Loco_error_AdminNotices::debug( $e->getMessage() );
        }    
            
        // Parse data before rendering, so we know it's a valid Gettext format
        try {
            $this->set('modified', $file->modified() );
            $data = Loco_gettext_Data::load( $file );
        }
        catch( Loco_error_ParseException $e ){
            Loco_error_AdminNotices::add( Loco_error_Exception::convert($e) );
            $data = Loco_gettext_Data::dummy();
        }

        $this->set( 'meta', Loco_gettext_Metadata::create($file, $data) );

        // binary MO will be hex-formatted in template
        if( 'mo' === $type ){
            $this->set('bin', $file->getContents() );
            return $this->view('admin/file/view-mo' );
        }
        
        // l10n.php files are unlikely to be encountered without a po or mo, but still..
        if( 'php'=== $type ){
            return $this->view('admin/file/view-php', ['phps'=>$file->getContents()] );
        }
        
        // else is a PO or POT file 
        $this->enqueueScript('poview');//->enqueueScript('min/highlight');
        $lines = preg_split('/\\n|\\r\\n?/', $this->getUtf8Source( $file, $data->getHeaders() ) );
        $this->set( 'lines', $lines );
        
        // ajax parameters required for pulling reference sources
        $this->set('js', new Loco_mvc_ViewParams(  [
            'popath' => $this->get('path'),
            'nonces' => [
                'fsReference' => wp_create_nonce('fsReference'),
            ],
            'project' => $bundle ?  [
                'bundle' => $bundle->getId(),
                'domain' => $project ? $project->getId() : '',
            ] : null,
        ] ) );
        
        // treat as PO if file name has locale
        if( $this->getLocale() ){
            return $this->view('admin/file/view-po' );
        }

        // else view as POT
        return $this->view('admin/file/view-pot' );
    }

}