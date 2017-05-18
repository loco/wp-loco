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
            __('Overview','default') => $this->viewSnippet('tab-bundle-view'),
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
            $meta = Loco_gettext_Metadata::load($file)->persistIfDirty( 0, true );
            $p['pot'] = new Loco_mvc_ViewParams( array(
                // POT info
                'name' => $file->basename(),
                'time' => $file->modified(),
                // POT links
                'info' => $this->getResourceLink('file-info', $project, $meta ),
                'edit' => $this->getResourceLink('file-edit', $project, $meta ),
            ) );
        }
        
        // PO/MO files
        $po = $project->findLocaleFiles('po');
        $mo = $project->findLocaleFiles('mo');
        $p['po'] = $this->createProjectPairs( $project, $po, $mo );

        // also pull invalid files so everything is available to the UI
        $mo = $project->findNotLocaleFiles('mo');
        $po = $project->findNotLocaleFiles('po')->augment( $project->findNotLocaleFiles('pot') );
        $p['_po'] = $this->createProjectPairs( $project, $po, $mo );

        // always offer msginit even if we find out later we can't extract any strings
        $p['nav'][] = new Loco_mvc_ViewParams( array( 
            'href' => $this->getProjectLink('msginit', $project ),
            'name' => __('New language','loco-translate'),
            'icon' => 'add',
        ) );

        // offer template editing if permitted
        if( ! $project->isPotLocked() ){
            $pot = $project->getPot();
            if( $pot && $pot->exists() ){
                $p['pot'] = $pot;
                $meta = Loco_gettext_Metadata::load($pot)->persistIfDirty( 0, true );
                $p['nav'][] = new Loco_mvc_ViewParams( array( 
                    'href' => $this->getResourceLink('file-edit', $project, $meta ),
                    'name' => __('Edit template','loco-translate'),
                    'icon' => 'pencil',
                ) );
            }
            // else offer creation of new Template
            else {
                $p['nav'][] = new Loco_mvc_ViewParams( array( 
                    'href' => $this->getProjectLink('xgettext', $project ),
                    'name' => __('Create template','loco-translate'),
                    'icon' => 'add',
                ) );
            }
        }
        
        return $p;
    }


    /**
     * Collect PO/MO pairings, ignoring any PO that is in use as a template
     */
    private function createPairs( Loco_fs_FileList $po, Loco_fs_FileList $mo, Loco_fs_File $pot = null ){     
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
        return $pairs;
    }

    
    /**
     * Initialize view parameters for each row representing a localized resource pair
     * @return array collection of entries corresponding to available PO/MO pair.
     */
    private function createProjectPairs( Loco_package_Project $project, Loco_fs_LocaleFileList $po, Loco_fs_LocaleFileList $mo ){
        // populate official locale names for all found, or default to our own
        if( $locales = $po->getLocales() + $mo->getLocales() ){
            $api = new Loco_api_WordPressTranslations;
            /* @var $locale Loco_Locale */
            foreach( $locales as $tag => $locale ){
                $locale->fetchName($api) or $locale->buildName() or $locale->setName($tag);
            }
        }
        // collate as unique [PO,MO] pairs ensuring canonical template excluded
        $pairs = $this->createPairs( $po, $mo, $project->getPot() );
        $rows = array();
        foreach( $pairs as $pair ){
            // favour PO file if it exists
            list( $pofile, $mofile ) = $pair;
            $file = $pofile or $file = $mofile;
            // establish locale, or assume invalid
            $locale = null;
            if( 'pot' !== $file->extension() ){
                $tag = $file->getSuffix();
                if( isset($locales[$tag]) ){
                    $locale = $locales[$tag];
                }
            }
            $rows[] = $this->createFileParams( $project, $file, $locale );
        }

        return $rows;
    }



    /**
     * 
     */
    private function createFileParams( Loco_package_Project $project, Loco_fs_File $file, Loco_Locale $locale = null ){
        // Pull Gettext meta data from cache if possible
        // TODO save write when cached version was used
        $meta = Loco_gettext_Metadata::load($file)->persistIfDirty( 0, true );
        // Establish whether translations are official or otherwise
        $dir = new Loco_fs_LocaleDirectory( $file->dirname() );
        // Retuen data required for PO table row
        return new Loco_mvc_ViewParams( array (
            // locale info
            'lcode' => $locale ? (string) $locale : '',
            'lname' => $locale ? $locale->getName() : '',
            'lattr' => $locale ? 'class="'.$locale->getIcon().'" lang="'.$locale->lang.'"' : '',
            // file info
            'meta' => $meta,
            'name' => $file->basename(),
            'time' => $file->modified(),
            'type' => strtoupper( $file->extension() ),
            'todo' => $meta->countIncomplete(),
            'total' => $meta->getTotal(),
            // author / contrib
            'store' => $dir->getTypeLabel( $dir->getTypeId() ),
            // links
            'info' => $this->getResourceLink('file-info', $project, $meta ),
            'edit' => $this->getResourceLink('file-edit', $project, $meta ),
            'delete' => $this->getResourceLink('file-delete', $project, $meta ),
            'copy' => $this->getProjectLink('msginit', $project, array( 'source' => $meta->getPath(false) ) ),
        ) );
    }


    
    /**
     * Prepare view parameters for all projects in a bundle
     * @return array<Loco_mvc_ViewParams>
     */
    private function createBundleListing( Loco_package_Bundle $bundle ){
        $projects = array();
        /* @var $project Loco_package_Project */
        foreach( $bundle as $project ){
            $projects[] = $this->createProjectParams($project);
        }
        return $projects;
    }



    /**
     * {@inheritdoc}
     */
    public function render(){

        $this->prepareNavigation();
        
        $bundle = $this->getBundle();
        $this->set('name', $bundle->getName() );
        
        // bundle may not be fully configured
        $configured = $bundle->isConfigured();

        // Hello Dolly is an exception. don't show unless configured deliberately 
        if( ! $configured && 'hello.php' === $bundle->getHandle() && 'Hello Dolly' === $bundle->getName() ){
            $this->set( 'redirect', Loco_mvc_AdminRouter::generate('core-view') );
            return $this->view('admin/bundle/alias');
        }

        // Collect all configured projects
        $projects = $this->createBundleListing( $bundle );
        $unknown = array();
        
        // sniff additional unknown files if bundle is a theme or directory-based plugin that's been auto-detected
        if( 'file' === $configured || 'internal' === $configured ){
            // presumed complete
        }
        else if( $bundle->isTheme() || ( $bundle->isPlugin() && ! $bundle->isSingleFile() ) ){
            // TODO This needs absracting into the Loco_package_Inverter class
            $prefixes = array();
            $po = new Loco_fs_LocaleFileList;
            $mo = new Loco_fs_LocaleFileList;
            foreach( Loco_package_Inverter::export($bundle) as $ext => $files ){
                $list = 'mo' === $ext ? $mo : $po;
                foreach( $files as $file ){
                    $file = new Loco_fs_LocaleFile($file);
                    $list->addLocalized( $file );
                    // Only look in system locations if locale is valid and domain/prefix available
                    $locale = $file->getLocale();
                    if( $locale->isValid() && ( $domain = $file->getPrefix() ) ){
                        $prefixes[$domain] = true;
                    }
                }
            }
            // pick up given files in system locations only
            foreach( $prefixes as $domain => $_bool ){
                $dummy = new Loco_package_Project( $bundle, new Loco_package_TextDomain($domain), '' );
                $bundle->addProject( $dummy ); // <- required to configure locations
                $dummy->excludeTargetPath( $bundle->getDirectoryPath() );
                $po->augment( $dummy->findLocaleFiles('po') );
                $mo->augment( $dummy->findLocaleFiles('mo') );
            }
            // a fake project is required to disable functions that require a configured project
            $dummy = new Loco_package_Project( $bundle, new Loco_package_TextDomain(''), '' );
            $unknown = $this->createProjectPairs( $dummy, $po, $mo );
        }
        
        $this->set('projects', $projects );
        $this->set('unknown', $unknown );

        return $this->view( 'admin/bundle/view' );
    }

    
}