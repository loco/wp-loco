<?php
/**
 * pre-xgettext function. Initializes a new PO file for a given locale
 */
class Loco_admin_init_InitPotController extends Loco_admin_bundle_BaseController {
    
    
    /**
     * {@inheritdoc}
     */
    public function init(){
        parent::init();
        $this->enqueueStyle('poinit');
        //
        $bundle = $this->getBundle();
        $this->set('title', __('New template','loco').' &lsaquo; '.$bundle );
    }
    
    
    /**
     * {@inheritdoc}
     *
    protected function prepareNavigation(){
        parent::prepareNavigation();
        $tabs = $this->get('tabs');
        $tabs->add( __('New POT','loco'), '', true );
    }*/
    
    
    
    /**
     * {@inheritdoc}
     */
    public function render(){
        
        $breadcrumb = $this->prepareNavigation();
        $bundle = $this->getBundle();
        $project = $this->getProject();

        $slug = $project->getSlug();
        $domain = (string) $project->getDomain();
        $this->set('domain', $domain );
        
        // Establish default POT path whether it exists or not
        $pot = $project->getPot();
        while( ! $pot ){
            $name = ( $slug ? $slug : $domain ).'.pot';
            /* @var $dir Loco_fs_Directory */
            foreach( $project->getConfiguredTargets() as $dir ){
                $pot = new Loco_fs_File( $dir->getPath().'/'.$name );
                break 2;
            }
            // unlikely to have no configured targets, but possible ... so default to standard
            $pot = new Loco_fs_File( $bundle->getDirectoryPath().'/languages/'.$name );
            break;
        }
        
        // POT should actually not exist at this stage. It should be edited instead.
        if( $pot->exists() ){
            throw new Loco_error_Exception( __('Template file already exists','loco') );
        }
        
        
        // Just warn if POT writing will fail when saved, but still show screen
        $dir = $pot->getParent();
        
        // Do initial string extraction for displaying stats for all domains
        $ext = new Loco_gettext_Extraction( $bundle );
        $counts = $ext->addProject($project)->getDomainCounts();
        $total = isset($counts[$domain]) ? $counts[$domain] : 0;
        
        // this count deliberately doesn't include meta fields - they will be added on creation
        $this->set('total', $total );
        if( $total ){
            $this->set('found', sprintf( _n('One translatable string found in source code','%s translatable strings found in source code',$total,'loco'), number_format($total) ) );
        }

        // file metadata
        $this->set('pot', Loco_mvc_FileParams::create( $pot ) );
        $this->set('dir', Loco_mvc_FileParams::create( $dir ) );
        
        $title = __('New template file','loco');
        $subhead = sprintf( __('New translations template for "%s"','loco'), $project );
        $this->set('subhead', $subhead );
        
        // navigate up to bundle listing page 
        $breadcrumb->add( $title );
        $this->set( 'breadcrumb', $breadcrumb );
        
        // ajax service takes the target directory path
        $content_dir = loco_constant('WP_CONTENT_DIR');
        $target_path = $pot->getParent()->getRelativePath($content_dir);

        // hidden fields to pass through to Ajax endpoint
        $this->set('hidden', new Loco_mvc_ViewParams( array(
            'action' => 'loco_json',
            'route' => 'xgettext',
            'loco-nonce' => $this->setNonce('xgettext')->value,
            'type' => $bundle->getType(),
            'bundle' => $bundle->getHandle(),
            'domain' => $project->getId(),
            'path' => $target_path,
        ) ) );

        // File system connect required if location not writable
        if( ! $pot->creatable() ){
            $path = $pot->getRelativePath($content_dir);
            $this->prepareFsConnect('create', $path );
        }
        
        $this->enqueueScript('potinit');
        return $this->view( 'admin/init/init-pot' );
    }

    
    
    
}