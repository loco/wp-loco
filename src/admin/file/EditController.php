<?php
/**
 * PO editor view
 */
class Loco_admin_file_EditController extends Loco_admin_file_BaseController {


    /**
     * {@inheritdoc}
     */
    public function init(){
        parent::init();
        $this->enqueueStyle('editor');
        //
        $file = $this->get('file');
        $bundle = $this->getBundle();
        // translators: %1$s is the file name, %2$s is the bundle name
        $this->set('title', sprintf( __('Editing %1$s in %2$s','loco'), $file->basename(), $bundle ) );
    }



    /**
     * {@inheritdoc}
     */
    public function render(){
        
        // file must exist for editing
        $file = $this->get('file');
        if( $fail = $this->getFileError($file) ){
            return $fail; 
        }
        
        // editor will be rendered
        $this->enqueueScript('editor');
        
        // Parse file data into JavaScript for editor
        try {
            $this->set('modified', $file->modified() );
            $data = Loco_gettext_Data::load( $file );
        }
        catch( Loco_error_Exception $e ){
            Loco_error_AdminNotices::add($e);
            $data = Loco_gettext_Data::dummy();
        }
        catch( Exception $e ){
            Loco_error_AdminNotices::add( Loco_error_Exception::convert($e) );
            $data = Loco_gettext_Data::dummy();
        }

        // Pre-populate PO headers with data that JavaScript doesn't have access to
        if( $locale = $this->get('locale') ){
            $data->localize( $locale );
        }

        
        // Establish if file belongs to a configured project
        try {
            $bundle = $this->getBundle();
            $project = $this->getProject();
            // ensure template always treated as POT even if using a PO as template
            if( $locale && ( $pot = $project->getPot() ) && $pot->equal($file) ){
                $locale = null;
            }
        }
        // Fine if not, this just means sync isn't possible.
        catch( Loco_error_Exception $e ){
            $project = null;
        }

        
        $this->set( 'js', new Loco_mvc_ViewParams( array(
            'podata' => $data->jsonSerialize(),
            'locale' => $locale ? $locale->jsonSerialize() : null,
            'popath' => $this->get('path'),
            'project' => $project ? array (
                'bundle' => $bundle->getId(),
                'domain' => $project->getId(),
            ) : null,
            'nonces' => array (
                'save' => wp_create_nonce('save'),
                'sync' => wp_create_nonce('sync'),
            ),
        ) ) );
        
        $this->set( 'ui', new Loco_mvc_ViewParams( array(
             'add'      => _x('Add','Editor button','loco'),
             'del'      => _x('Remove','Editor button','loco'),
             'help'     => _x('Help','Editor button','loco'),
             'save'     => _x('Save','Editor button','loco'),
             'sync'     => _x('Sync','Editor button','loco'),
             'revert'   => _x('Revert','Editor button','loco'),
             'fuzzy'    => _x('Fuzzy','Editor button','loco'),
             'download' => _x('Download','Editor button','loco'),
             'filter'   => __('Filter translations','loco'),
        ) ) );

        // Download form params
        $hidden = new Loco_mvc_HiddenFields( array(
            'path'   => '',
            'source' => '',
            'route'  => 'download',
            'action' => 'loco_download',
        ) );
        $this->set( 'dlFields', $hidden->setNonce('download') );
        $this->set( 'dlAction', admin_url('admin-ajax.php','relative') );
        
        // set simpler title for breadcrumb
        $this->set('title', $file->basename() );
        
        // ok to render editor as either po or pot
        $tpl = $locale ? 'po' : 'pot';
        return $this->view( 'admin/file/edit-'.$tpl, array() );
    }
    
    
    
    
}