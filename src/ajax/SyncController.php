<?php
/**
 * Ajax "sync" route.
 * Performs the basic in-editor sync functiokn from the old 1.x version. 
 * TODO replace with proper interactive merge functionality.
 */
class Loco_ajax_SyncController extends Loco_mvc_AjaxController {
    
    
    /**
     * {@inheritdoc}
     */
    public function render(){
        
        $post = $this->validate();
        
        $bundle = Loco_package_Bundle::fromId( $post->bundle );
        $project = $bundle->getProjectById( $post->domain );
        
        $file = new Loco_fs_File( $post->path );
        $file->normalize( loco_constant('WP_CONTENT_DIR') );        
        
        
        // sync with POT if there is one and we're syncing to a PO
        if( 'po' === $post->type && ( $potfile = $project->getPot() ) && $potfile->exists() ){
            $this->set('pot', $potfile->basename() );
            $data = Loco_gettext_Data::load($potfile);
        }
        // else sync with source code
        else {
            $this->set('pot', '' );
            $domain = (string) $project->getDomain();
            $extr = new Loco_gettext_Extraction($bundle);
            $data = $extr->addProject($project)->getTemplate($domain);
        }

        $this->set( 'po', $data->jsonSerialize() );
        
        return parent::render();
    }
    
    
}