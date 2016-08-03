<?php
/**
 * pre-msginit function. Prepares arguments for creating a new PO language file
 */
class Loco_admin_init_InitPoController extends Loco_admin_bundle_BaseController {
    
    
    /**
     * {@inheritdoc}
     */
    public function init(){
        parent::init();
        $this->enqueueStyle('poinit');
        //
        $bundle = $this->getBundle();
        $this->set('title', __('New language','loco').' &lsaquo; '.$bundle );
    }



    /**
     * {@inheritdoc}
     *
    protected function prepareNavigation(){
        parent::prepareNavigation();
        $tabs = $this->get('tabs');
        $tabs->add( __('New PO','loco'), '', true );
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

        $title = __('New language','loco');
        $subhead = sprintf( __('Initializing new translations in "%s"','loco'), $slug?$slug:$domain );
        $this->set('subhead', $subhead );
        
        // navigate up to bundle listing page 
        $breadcrumb->add( $title );
        $this->set( 'breadcrumb', $breadcrumb );
        
        // list available languages for dropdown list
        $locales = array();
        $api = new Loco_api_WordPressTranslations;
        foreach( $api->getAvailableCore() as $key => $raw ){
            $locale = Loco_Locale::parse($key);
            $locales [] = new Loco_mvc_ViewParams( array(
                'icon' => $locale->getIcon(),
                'value' => (string) $locale,
                'label' => $locale->fetchName($api),
            ) );
        }
        $this->set( 'locales', $locales );

        
        // default locale is a placeholder
        $locale = new Loco_Locale('zxx');
        $content_dir = rtrim( loco_constant('WP_CONTENT_DIR'), '/' );
        $copying = false;
        
        // Permit using any provided file a template instead of POT
        if( $potpath = $this->get('source') ){
            $potfile = new Loco_fs_LocaleFile($potpath);
            $potfile->normalize( $content_dir );
            if( ! $potfile->exists() ){
                throw new Loco_error_Exception('Forced template argument must exist');
            }
            // forced source could be a POT (although UI should prevent it)
            if( $potfile->getSuffix() ){
                $locale = $potfile->getLocale();
                $name = $locale->getName() or $name = (string) $locale;
                $this->set('sourceLocale', $name ); 
                $copying = true;
            }
        }
        // else POT file may or may not be known, and may or may not exist
        else {
            $potfile = $project->getPot();
        }


        // Critical that user selects the correct save location:
        // we can't reliably establish how the file will be loaded by theme/plugin code 
        // TODO do shallow scan of functions.php etc..
        $filechoice = $project->initLocaleFiles( $locale );

        
        // show information about POT file if we are initialializing from template
        if( $potfile && $potfile->exists() ){
            $meta = Loco_gettext_Metadata::load($potfile);
            $total = $meta->getTotal();
            $summary = sprintf( _n('One string found in %2$s','%s strings found in %s',$total,'loco'), number_format($total), $potfile->basename() );
            $this->set( 'pot', new Loco_mvc_ViewParams( array(
                'name' => $potfile->basename(),
                'path' => $meta->getPath(false),
            ) ) );
            // if copying an existing PO file, we can fairly safely establish the correct prefixing
            if( $copying ){
                $poname = ( $prefix = $potfile->getPrefix() ) ? sprintf('%s-%s.po',$prefix,$locale) : sprintf('%s.po',$locale);
                $pofile = new Loco_fs_LocaleFile( $poname );
                $pofile->normalize( $potfile->dirname() );
                $filechoice->add( $pofile );
            }
            /// else if POT is in a folder we don't know about, we may as well add to the choices
            // TODO this means another utilty function in project for prefixing rules on individual location
        }
        // else no template exists, so we prompt to extract from source
        else {
            $this->set( 'ext', new Loco_mvc_ViewParams( array(
                'link' => Loco_mvc_AdminRouter::generate( $this->get('type').'-xgettext', $_GET ),
                'text' => __('Create template','loco'),
            ) ) );
            // if forcing source extraction show brief description of source files
            if( $this->get('extract') ){
                $nfiles = count( $project->findSourceFiles() );
                $summary = sprintf( _n('1 source file will be scanned for translatable strings','%s source files will be scanned for translatable strings',$nfiles,'loco'), number_format_i18n($nfiles) );
            }
            // else prompt for template creation before continuing
            else {
                $this->set( 'skip', new Loco_mvc_ViewParams( array(
                    'link' => Loco_mvc_AdminRouter::generate( $this->get('_route'), $_GET + array( 'extract' => '1' ) ),
                    'text' => __('Skip template','loco'),
                ) ) );
                // POT could still be defined, it might just not exist yet
                if( $potfile ){
                    $this->set('pot', Loco_mvc_FileParams::create($potfile) );
                }
                return $this->view('admin/init/init-prompt');
            }
        }
        $this->set( 'summary', $summary );


        
        // group established locations into types (offical, etc..) 
        // there is no point checking whether any of these file exist, because we don't know what language will be chosen yet.
        $locations = array();
        $preferred = null;
        /* @var $pofile Loco_fs_File */
        foreach( $filechoice as $pofile ){
            $parent = new Loco_fs_LocaleDirectory( $pofile->dirname() );
            $typeId = $parent->getTypeId();
            if( ! isset($locations[$typeId]) ){
                $locations[$typeId] = new Loco_mvc_ViewParams( array(
                    'label' => $parent->getTypeLabel( $typeId ),
                    'paths' => array(),
                ) );
            }
            // lazy build of directory path, suppressing errors
            if( ! $parent->exists() ){
                try {
                    $parent->mkdir();
                }
                catch( Exception $e ){
                    // Loco_error_AdminNotices::warn( $e->getMessage() );
                }
            }
            $params = new Loco_mvc_ViewParams( array (
                'locked' => ! $parent->writable(),
                'parent' => Loco_mvc_FileParams::create( $parent ),
                'hidden' => $pofile->getRelativePath($content_dir),
                'holder' => str_replace( (string) $locale, '<span>&lt;locale&gt;</span>', $pofile->basename() ),
            ) );
            // use first writable (or createable) location as default option
            if( is_null($preferred) && ! $params['locked'] ){
                $preferred = $pofile;
                $params['checked'] = 'checked';
            }
            $locations[$typeId]['paths'][] = $params;
        }
        $this->set( 'locations', $locations );

        
        // hidden fields to pass through to Ajax endpoint
        $this->set('hidden', new Loco_mvc_ViewParams( array(
            'action' => 'loco_json',
            'route' => 'msginit',
            'loco-nonce' => $this->setNonce('msginit')->value,
            'type' => $bundle->getType(),
            'bundle' => $bundle->getHandle(),
            'domain' => $project->getId(),
            'source' => $this->get('source'),
        ) ) );
        
        // file system prompts will be handled when paths are selected (i.e. we don't have one yet)
        $this->prepareFsConnect( 'create', '' );
        
        $this->enqueueScript('poinit');
        return $this->view( 'admin/init/init-po', array() );
    }

    
}