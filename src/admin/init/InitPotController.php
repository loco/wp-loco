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
        $this->set('writable', $dir->writable() );
        //$mode = new Loco_fs_FileMode( $dir->mode() );
        
        // Do initial string extraction for displaying stats for all domains
        $ext = new Loco_gettext_Extraction( $bundle );
        $counts = $ext->addProject($project)->getDomainCounts();
        $total = isset($counts[$domain]) ? $counts[$domain] : 0;

        // index all domains incase we find one not configured
        // $domains = $bundle->getDomains();
        // count strings found across any other domains referenced
        /*/ TODO use this to indentify if extracted domain name is incorrect
        $other = 0;
        $ndomains = 0;
        foreach( $counts as $d => $n ){
            if( $d !== $domain ){
                $ndomains++;
                $other += $n;
            }
        }*/
        
        $this->set('total', $total );
        if( $total ){
            // TODO don't include translatable headers in count, as they're not really in source code.
            $this->set('found', sprintf( _n('One translatable string found in source code','%s translatable strings found in source code',$total,'loco'), number_format($total) ) );
        }
        /*if( $other ){
            $this->set('other', sprintf( '%s string(s) found in %s other domain(s)', number_format($other), number_format($ndomains) ) );
        }*/

        // file metadata
        $this->set('pot', Loco_mvc_FileParams::create( $pot ) );
        $this->set('dir', Loco_mvc_FileParams::create( $dir ) );
        
        $title = __('New template file','loco');
        $subhead = sprintf( __('New translations template for "%s"','loco'), $project );
        $this->set('subhead', $subhead );
        
        // navigate up to bundle listing page 
        $breadcrumb->add( $title );
        $this->set( 'breadcrumb', $breadcrumb );

        // hidden fields to pass through to Ajax endpoint
        $this->set('hidden', new Loco_mvc_ViewParams( array(
            'action' => 'loco_json',
            'route' => 'xgettext',
            'loco-nonce' => $this->setNonce('xgettext')->value,
            'type' => $bundle->getType(),
            'bundle' => $bundle->getSlug(),
            'domain' => $project->getId(),
            'slug' => $slug,
            'path' => $pot->getParent()->getRelativePath( loco_constant('WP_CONTENT_DIR') ),
        ) ) );
        
        
        $this->enqueueScript('potinit');
        return $this->view( 'admin/init/init-pot', array() );
    }

    
    
    
}