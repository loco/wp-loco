<?php
/**
 * Bundle overview.
 * First tier bundle view showing resources across all projects
 */
class Loco_admin_bundle_ViewController extends Loco_admin_bundle_BaseController {
    
    
    /**
     * {@inheritdoc}
     */
    public function init(){
        parent::init();
        $bundle = $this->getBundle();
        $this->set('title', $bundle->getName() );
        $this->enqueueStyle('bundle');
    }


    /**
     * {@inheritdoc}
     */
    public function getHelpTabs(){
        return array (
            __('Overview','default') => $this->view('tab-bundle-view'),
        );
    }


    /**
     * Generate a link for a specific file resource within a project
     * @return string
     */
    private function getResourceLink( $page, Loco_package_Project $project, Loco_gettext_Metadata $meta, array $args = array() ){
        $args['path'] = $meta->getPath(false);
        return $this->getProjectLink( $page, $project, $args );
    }


    /**
     * Generate a link for a project, but without being for a specific file
     * @return string
     */
    private function getProjectLink( $page, Loco_package_Project $project, array $args = array() ){
        $args['bundle'] = $this->get('bundle');
        $args['domain'] = $project->getId();
        return $this->getLink( $page, $args );
    }



    /**
     * Generate a link for the same type of bundle as this one
     * @return string
     */
    private function getLink( $page, array $args ){
        $route = strtolower( $this->get('type') ).'-'.$page;
        return Loco_mvc_AdminRouter::generate( $route, $args );
    }



    /**
     * Initialize view parameters for a project
     * @return Loco_mvc_ViewParams
     */
    private function createProjectParams( Loco_package_Project $project ){
        $name = $project->getName();
        $domain = $project->getDomain()->getName();
        $slug = $project->getSlug();
        $p = new Loco_mvc_ViewParams( array (
            'id' => $project->getId(),
            'name' => $name,
            'slug' => $slug,
            'domain' => $domain,
            'short' => ! $slug || $project->isDomainDefault() ? $domain : $domain.'→'.$slug,
        ) );

        // POT template file
        $file = $project->getPot();
        if( $file && $file->exists() ){
            $meta = Loco_gettext_Metadata::load($file)->persist( 0, true );
            $p['pot'] = new Loco_mvc_ViewParams( array(
                // POT info
                'name' => $file->basename(),
                'time' => $file->modified(),
                // POT links
                'info' => $this->getResourceLink('file-info', $project, $meta ),
                'edit' => $this->getResourceLink('file-edit', $project, $meta ),
            ) );
        }
        
        return $p;
    }



    
    /**
     * Initialize view parameters for all localised resources in a project.
     * @return array collection of entries corresponding to available PO/MO pair.
     */
    private function createProjectPairs( Loco_package_Project $project, Loco_fs_LocaleFileList $po, Loco_fs_LocaleFileList $mo ){

        // populate official locale names for all found, or default to our own
        $api = new Loco_api_WordPressTranslations;
        $locales = $po->getLocales() + $mo->getLocales();
        /* @var $locale Loco_Locale */
        foreach( $locales as $tag => $locale ){
            $locale->fetchName($api) or $locale->buildName() or $locale->setName($tag);
        }
        
        // avoid listing PO that is configured as template
        $pot = $project->getPot();
        
        // collate as unique [PO,MO] pairs
        $pairs = array();
        /* @var $pofile Loco_fs_LocaleFile */
        foreach( $po as $pofile ){
            if( $pot && $pofile->equal($pot) ){
                continue;
            }
            $pair = array( $pofile, null );
            $mofile = $pofile->cloneExtension('mo');
            if( $mofile->exists() ){
                $pair[1] = $mofile;
            }
            $pairs[] = $pair;
        }
        /* @var $mofile Loco_fs_LocaleFile */
        foreach( $mo as $mofile ){
            $pofile = $mofile->cloneExtension('po');
            if( $pot && $pofile->equal($pot) ){
                continue;
            }
            if( ! $pofile->exists() ){
                $pairs[] = array( null, $mofile );
            }
        }
        
        
        // build view data for each pairing
        $sets = array();
        foreach( $pairs as $pair ){
            
            // favour PO file if it exists
            list( $pofile, $mofile ) = $pair;
            $file = $pofile or $file = $mofile;
            
            $tag = $file->getSuffix();
            $locale = $locales[$tag];
            $meta = Loco_gettext_Metadata::load($file)->persist( 0, true );

            // Establish whether translations are official or otherwise
            $dir = new Loco_fs_LocaleDirectory( $file->dirname() );
                
            $data = array (
                // locale info
                'lcode' => $tag,
                'lname' => $locale->getName(),
                'lattr' => 'class="'.$locale->getIcon().'" lang="'.$locale->lang.'"',
                // file info
                'meta' => $meta,
                'name' => $file->basename(),
                'time' => $file->modified(),
                'todo' => $meta->countIncomplete(),
                'total' => $meta->getTotal(),
                // author / contrib
                'store' => $dir->getTypeLabel( $dir->getTypeId() ),
                // links
                'info' => $this->getResourceLink('file-info', $project, $meta ),
                'edit' => $this->getResourceLink('file-edit', $project, $meta ),
                'delete' => $this->getResourceLink('file-delete', $project, $meta ),
                'copy' => $this->getProjectLink('msginit', $project, array( 'source' => $meta->getPath(false) ) ),
            );

            $sets[] = new Loco_mvc_ViewParams( $data );
        }

        // TODO sorting of sets
        return $sets;
    }
    
    
    
    /**
     * Prepare view parameters for all projects in a bundle
     * @return array<Loco_mvc_ViewParams>
     */
    private function createBundleListing( Loco_package_Bundle $bundle ){
        $projects = array();
        /* @var $project Loco_package_Project */
        foreach( $bundle as $project ){
            $p = $this->createProjectParams($project);
            $po = $project->findLocaleFiles('po');
            $mo = $project->findLocaleFiles('mo');
            $p['po'] = $this->createProjectPairs( $project, $po, $mo );
            // always offer msginit even if we find out later we can't extract any strings
            $p['nav'][] = new Loco_mvc_ViewParams( array( 
                'href' => $this->getProjectLink('msginit', $project ),
                'name' => __('New language','loco'),
                'icon' => 'add',
            ) );
            // offer template editing if permitted
            if( ! $project->isPotLocked() ){
                $pot = $project->getPot();
                if( $pot && $pot->exists() ){
                    $meta = Loco_gettext_Metadata::load($pot)->persist( 0, true );
                    $p['nav'][] = new Loco_mvc_ViewParams( array( 
                        'href' => $this->getResourceLink('file-edit', $project, $meta ),
                        'name' => __('Edit template','loco'),
                        'icon' => 'pencil',
                    ) );
                }
                // else offer creation of new Template
                else {
                    $p['nav'][] = new Loco_mvc_ViewParams( array( 
                        'href' => $this->getProjectLink('xgettext', $project ),
                        'name' => __('Create template','loco'),
                        'icon' => 'add',
                    ) );
                }
            }
            $projects[] = $p;
        }
        
        return $projects;
    }



    /**
     * {@inheritdoc}
     */
    public function render(){

        $this->prepareNavigation();
        $bundle = $this->getBundle();
        
        // bundle may not be fully configured
        $configured = $bundle->isConfigured();

        // Hello Dolly is an exception. don't show unless configured deliberately 
        if( ! $configured && 'hello.php' === $bundle->getHandle() && 'Hello Dolly' === $bundle->getName() ){
            $this->set( 'redirect', Loco_mvc_AdminRouter::generate('core-view') );
            return $this->view('admin/bundle/alias');
        }

        // Collect all configured projects
        $projects = $this->createBundleListing( $bundle );
        $this->set( 'projects', $projects );
        
        // show error page if no projects could be extracted at all
        if( ! count($projects) ){
            $this->set('name', $bundle->getName() );
            return $this->view( 'admin/bundle/incompat' );
        }
        
        // sniff additional unknown files if bundle is a theme or directory-based plugin that's been auto-detected
        else if( 'meta' === $configured ){
            /*/ warn if bundle's default project has no template
            $project = $bundle->getDefaultProject();
            if( ! $project || ! $project->getPot() ){
                $configured = false;
            }*/
            if( $bundle->isTheme() || ( $bundle->isPlugin() && ! $bundle->isSingleFile() ) ){ 
                $bundle = $bundle->invert();
                if( count($bundle) ){
                    $configured = false;
                }
            }
        }
        
        $this->set( 'warning', ! $configured );

        return $this->view( 'admin/bundle/view' );
    }

    
}