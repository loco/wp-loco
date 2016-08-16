<?php
/**
 * Ajax "sync" route.
 * Performs the basic in-editor sync function from the old 1.x version. 
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
        $base = loco_constant('WP_CONTENT_DIR');
        $file->normalize( $base );        
        
        // POT file always synced with source code (even if a PO being used as POT)
        if( 'pot' === $post->type ){
            $potfile = null;
        }
        // allow post data to force a template file path
        else if( $path = $post->sync ){
            $potfile = new Loco_fs_File($path);
            $potfile->normalize( $base );
        }
        // else use project-configured template if one is defined
        else {
            $potfile = $project->getPot();
        } 
        
        // sync with POT if it exists
        if( $potfile && $potfile->exists() ){
            $this->set('pot', $potfile->basename() );
            $data = Loco_gettext_Data::load($potfile);
        }
        // else sync with source code
        else {
            $this->set('pot', '' );
            $domain = (string) $project->getDomain();
            $extr = new Loco_gettext_Extraction($bundle);
            $data = $extr->addProject($project)->includeMeta()->getTemplate($domain);
        }

        $this->set( 'po', $data->jsonSerialize() );
        
        return parent::render();
    }
    
    
}