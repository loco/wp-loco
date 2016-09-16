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
        return array (
            __('Overview','default') => $this->view('tab-file-view'),
        );
    }


    /**
     * {@inheritdoc}
     */
    public function render(){
        
        // file must exist for editing
        $file = $this->get('file');
        $name = $file->basename();
        $type = strtolower( $file->extension() );
        $this->set('title', $name );

        if( $fail = $this->getFileError($file) ){
            return $fail; 
        }

        // Establish if file belongs to a configured project
        try {
            $bundle = $this->getBundle();
            $project = $this->getProject();
        }
        catch( Exception $e ){
            $project = null;
        }    
            
        // Parse data before rendering, so we know it's a valid Gettext format
        try {
            $this->set('modified', $file->modified() );
            $data = Loco_gettext_Data::load( $file );
            $this->set( 'meta', Loco_gettext_Metadata::create($file, $data) );
        }
        catch( Exception $e ){
            Loco_error_AdminNotices::add( Loco_error_Exception::convert($e) );
        }

        // binary MO will be hex-formated in template
        if( 'mo' === $type ){
            $this->set('bin', $file->getContents() );
            return $this->view('admin/file/view-mo' );
        }
       
        // else is a PO or POT file 
        $this->enqueueScript('poview');//->enqueueScript('min/highlight');
        $lines = preg_split('/\\R/u', loco_ensure_utf8( $file->getContents() ) );
        $this->set( 'lines', $lines );
        
        // ajax parameters required for pulling reference sources
        $this->set('js', new Loco_mvc_ViewParams( array (
            'popath' => $this->get('path'),
            'nonces' => array(
                'fsReference' => wp_create_nonce('fsReference'),
            ),
            'project' => $bundle ? array (
                'bundle' => $bundle->getId(),
                'domain' => $project ? $project->getId() : '',
            ) : null,
        ) ) ); 

        
        // treat as PO if file name has locale
        if( $locale = $this->get('locale') ){
            $lname = $locale->getName() or $lname = (string) $locale;
            $this->set( 'localeName', $lname );
            return $this->view('admin/file/view-po' );
        }

        // else view as POT
        return $this->view('admin/file/view-pot' );
    }

}