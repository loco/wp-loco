<?php
/**
 * Ajax "xgettext" route, for initializing new template file from source code
 */
class Loco_ajax_XgettextController extends Loco_ajax_common_BundleController {


    /**
     * {@inheritdoc}
     */
    public function render(){

        $this->validate();
        $bundle = $this->getBundle();
        $project = $this->getProject( $bundle );
        
        // target location may not be next to POT file at all
        $base = loco_constant('WP_CONTENT_DIR');
        $target = new Loco_fs_Directory( $this->get('path') );
        $target->normalize( $base );
        if( $target->exists() && ! $target->isDirectory() ){
            throw new Loco_error_Exception('Target is not a directory');
        }

        // POT file shouldn't exist currently
        $path = sprintf('%s/%s.pot', $target, $project->getSlug() );
        $potfile = new Loco_fs_File( $path );
        $api = new Loco_api_WordPressFileSystem;
        $api->authorizeCreate($potfile);
        
        // Do extraction and grab only given domain's strings
        $ext = new Loco_gettext_Extraction( $bundle );
        $domain = $project->getDomain()->getName();
        $data = $ext->addProject($project)->includeMeta()->getTemplate( $domain );
        
        // additional headers to set in new POT file
        $headers = array (
            'Project-Id-Version' => $project->getName(),
        );
        
        $potsize = $potfile->putContents( (string) $data );
        
        // set response data
        $this->set( 'debug', array (
            'potname' => $potfile->basename(),
            'potsize' => $potsize,
        ) );
        
        // front end will redirect to the bundle view
        // TODO append project fragment #<slug> ?
        $type = strtolower( $bundle->getType() );
        $this->set( 'redirect', Loco_mvc_AdminRouter::generate( sprintf('%s-view',$type), array (
            'bundle' => $bundle->getHandle(),
        ) ) );
        
        return parent::render();
    }
    
    
}