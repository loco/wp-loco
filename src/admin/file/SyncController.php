<?php
/**
 * File sync page view.
 * Shows summary of merge and performs merge as confirmed by user
 */
class Loco_admin_file_SyncController extends Loco_admin_file_BaseController {
    
    
    
    /**
     * {@inheritdoc}
     */
    public function render(){
        
        // file must exist for editing
        $targetfile = $this->get('file');
        if( $fail = $this->getFileError($targetfile) ){
            return $fail; 
        }
        
        $project = $this->getProject();
        $potfile = $project->getPot();

        // if file has a locale then we're syncing with either POT or source code
        if( $locale = $this->get('locale') ){
            $tpl = 'admin/file/sync-po';
            // POT > PO
            if( $potfile && $potfile->exists() ){
                $title = __('Updating translations from template','loco');
            }
            // Source > PO
            else {
                $title = __('Updating translations from source code','loco');
            }
        }
        // else if target file isn't the configured POT file we have an error
        else if( ! $potfile || ! $potfile->equal($targetfile) ){
            throw new Loco_error_Exception('Cannot sync non-existant POT file source code');
        }
        // else, OK to do Source > POT
        else {
            $title = __('Updating template from source code','loco');
            $tpl = 'admin/file/sync-pot';
        } 
        
        
        // generic file info
        $this->set( 'title', $title );
        $this->set( 'modified', $targetfile->modified() );
        
     
     
        return $this->view( $tpl );   
    }
    
    
}