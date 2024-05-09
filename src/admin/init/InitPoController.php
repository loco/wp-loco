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
        $this->set('title', __('New language','loco-translate').' &lsaquo; '.$bundle );
    }


    /**
     * {@inheritdoc}
     */
    public function getHelpTabs(){
        return  [
            __('Overview') => $this->viewSnippet('tab-init-po'),
        ];
    }


    /**
     * Sort to the left the best option for saving new translation files.
     * This favours custom locations, with system secondary. No other locations will be pre-selected. 
     * @param Loco_mvc_ViewParams[] $choices
     * @return Loco_mvc_ViewParams|null
     */
    private function sortPreferred( array $choices ){
        usort( $choices, [__CLASS__,'_onSortPreferred'] );
        foreach( $choices as $choice ){
            if( $choice['disabled'] || $choice['copying'] || $choice['exists']){
                continue;
            }
            // avoid promoting the Author location
            $t = $choice['dirtype'];
            if( 'theme' === $t || 'plugin' === $t){
                continue;
            }
            // pre-select this. It should be a writable custom or system file.
            return $choice;
        }
        return null;
    }


    /**
     * @internal
     * @return int
     */
    public static function _onSortPreferred( Loco_mvc_ViewParams $a, Loco_mvc_ViewParams $b ){
        $x = self::scoreFileChoice($a);
        $y = self::scoreFileChoice($b);
        return $x === $y ? 0 : ( $x > $y ? -1 : 1 );
    }
    
    
    /**
     * Score an individual file choice for sorting preferred
     * @return int
     */
    private static function scoreFileChoice( Loco_mvc_ViewParams $p ){
        $score = 0;
        if( $p['writable'] ){
            $score++;
        }
        if( $p['disabled'] ){
            $score -= 2;
        }
        if( $p['systype'] ){
            $score--;
        }
        return $score;
    }


    /**
     * @internal
     * @param int $a
     * @param int $b
     * @return int
     */
    private static function compareLocationKeys( $a, $b ){
        static $order = ['custom' => 4, 'wplang' => 3, 'theme' => 2, 'plugin' => 2, 'other' => 1 ];
        $x = $order[$a];
        $y = $order[$b];
        return $x === $y ? 0 : ( $x > $y ? -1 : 1 );
    }


    /**
     * {@inheritdoc}
     */
    public function render(){
        
        $breadcrumb = $this->prepareNavigation();
        // "new" tab is confusing when no project-scope navigation
        // $this->get('tabs')->add( __('New PO','loco-translate'), '', true );
        
        // bundle mandatory, but project optional
        $bundle = $this->getBundle();

        try {
            $project = $this->getProject();
            $slug = $project->getSlug();
            $domain = (string) $project->getDomain();
            // translators: %s refers to the slug/handle of a theme or plugin
            $subhead = sprintf( __('Initializing new translations in "%s"','loco-translate'), $slug?:$domain );
        }
        catch( Loco_error_Exception $e ){
            $project = null;
            $subhead = __('Initializing new translations in unknown set','loco-translate');
        }

        $title = __('New language','loco-translate');
        $this->set('subhead', $subhead );
        
        // navigate up to bundle listing page 
        $breadcrumb->add( $title );
        $this->set( 'breadcrumb', $breadcrumb );
        
        // default locale is a placeholder
        $localeTag = '';
        $locale = new Loco_Locale('zxx');
        $content_dir = untrailingslashit( loco_constant('WP_CONTENT_DIR') );
        $extracting = (bool) $this->get('extract');
        $copying = false;
        $sourcedir = '';
        
        // Permit using any provided file a template instead of POT
        if( $potpath = $this->get('path') ){
            $potfile = new Loco_fs_LocaleFile($potpath);
            $potfile->normalize($content_dir);
            if( ! $potfile->exists() ){
                throw new Loco_error_Exception('Forced template argument must exist');
            }
            $copying = true;
            $sourcedir = $potfile->dirname();
            // forced source could be a POT (although UI would normally prevent it)
            if( $potfile->getSuffix() ){
                $locale = $potfile->getLocale();
                if( $locale->isValid() ){
                    $this->set('sourceLocale', $locale );
                    $localeTag = (string) $locale;
                }
            }
        }
        // else project not configured. UI should prevent this by not offering msginit
        else if( ! $project ){
            throw new Loco_error_Exception('Cannot add new language to unconfigured set');
        }
        // else POT file may or may not be known, and may or may not exist
        else {
            $potfile = $project->getPot();
        }

        $locales = [];
        $installed = [];
        $api = new Loco_api_WordPressTranslations;
        $prefs = Loco_data_Preferences::get();
        // pull installed list first, this will include en_US and any non-standard languages installed
        foreach( $api->getInstalledCore() as $tag ){
            $tmp = Loco_Locale::parse($tag);
            if( $tmp->isValid() && $prefs->has_locale($tmp) ){
                $tag = (string) $tmp;
                // We may not have names for these, so just the language tag will show
                $installed[$tag] = new Loco_mvc_ViewParams( [
                    'value' => $tag,
                    'icon'  => $tmp->getIcon(),
                    'label' => $tmp->ensureName($api),
                    'selected' => $tag === $localeTag ? ' selected' : ''
                ] );
            }
        }
        // pull the same list of "available" languages as used in WordPress settings
        foreach( $api->getAvailableCore() as $tag => $tmp ){
            if( ! array_key_exists($tag,$installed) && $prefs->has_locale($tmp) ){
                $locales[$tag] = new Loco_mvc_ViewParams( [
                    'value' => $tag,
                    'icon'  => $tmp->getIcon(),
                    'label' => $tmp->ensureName($api),
                    'selected' => $tag === $localeTag ? ' selected' : ''
                ] );
            }
        }

        // two locale lists built for "installed" and "available" dropdowns. Else populate custom field.
        $this->set('locales', $locales );
        $this->set('installed', $installed );
        if( $localeTag && ! array_key_exists($localeTag,$installed) && ! array_key_exists($localeTag,$locales) ){
            $this->set('custom', $localeTag );
        }

        // Critical that user selects the correct save location:
        if( $project ){
            $filechoice = $project->initLocaleFiles( $locale );
        }
        // without configured project we will only allow save to same location
        else {
            $filechoice = new Loco_fs_FileList;
        }
        
        
        // Define suitable prompts for extracting from source, creating a template, or (preferred) copy an existing PO.
        $prompts = [];
        if( ! $copying ){
            $args = array_intersect_key( $_GET,['bundle'=>'','domain'=>'']);
            // link to extract a new template if none exists
            $prompts['xgettext'] = new Loco_mvc_ViewParams( [ 
                'link' => Loco_mvc_AdminRouter::generate( $this->get('type' ).'-xgettext', $args ),
                'text' => __('Create template','loco-translate'),
            ] );
            // link to direct extraction here, if not already doing
            $prompts['skip'] = new Loco_mvc_ViewParams( [
                'link' => Loco_mvc_AdminRouter::generate( $this->get('_route'), $args + ['extract'=>'1'] ),
                'text' => __('Skip template','loco-translate'),
            ] );
            // link to copy an existing PO file, if there's an installed one
            /* @var Loco_fs_LocaleFile $pofile */
            foreach( $project->findLocaleFiles('po') as $pofile ){
                $dir = new Loco_fs_LocaleDirectory( $pofile->dirname() );
                if( 'wplang' !== $dir->getTypeId() ){
                    continue;
                }
                // we don't know yet what locale the user will select, so pick first PO.
                $args = array_intersect_key( $_GET,['bundle'=>'','domain'=>'']);
                $args['path'] = $pofile->getRelativePath($content_dir);
                $prompts['copy'] = new Loco_mvc_FileParams( [
                    'link' => Loco_mvc_AdminRouter::generate( $this->get('type' ).'-msginit', $args ),
                    'text' => __('Copy PO file','loco-translate'),
                ], $pofile );
                break;
            }
        }


        // show information about POT file if we are initializing from template
        if( $potfile && $potfile->exists() ){
            $meta = Loco_gettext_Metadata::load($potfile);
            $total = $meta->getTotal();
            // translators: 1: Number of strings; 2: Name of POT file; e.g. "100 strings found in file.pot"
            $summary = sprintf( _n('%1$s string found in %2$s','%1$s strings found in %2$s',$total,'loco-translate'), number_format($total), $potfile->basename() );
            $this->set( 'pot', new Loco_mvc_ViewParams( [
                'name' => $potfile->basename(),
                'path' => $meta->getPath(false),
            ] ) );
            // if copying an existing PO file, we can fairly safely establish the correct prefixing
            if( $copying ){
                $prefix = $potfile->getPrefix();
                $poname = $prefix ? sprintf('%s-%s.po',$prefix,$locale) : sprintf('%s.po',$locale);
                $pofile = new Loco_fs_LocaleFile( $poname );
                $pofile->normalize( $potfile->dirname() );
                $filechoice->add( $pofile );
            }
        }
        // else not initializing from template- prompt to copy existing PO file
        else if( array_key_exists('copy',$prompts) && ! $extracting ){
            $this->set('copy', $prompts['copy'] );
            $this->set('skip', $prompts['skip'] );
            $this->set('ext', $prompts['xgettext'] );
            return $this->view('admin/init/init-copy');
        }
        // else prompt to extract from source (advanced).
        else if( 2 > Loco_data_Settings::get()->pot_expected ){
            // if allowing source extraction without warning show brief description of source files
            if( $extracting || 0 === Loco_data_Settings::get()->pot_expected ){
                // Tokenizer required for string extraction
                if( ! loco_check_extension('tokenizer') ){
                    return $this->view('admin/errors/no-tokenizer');
                }
                $nfiles = count( $project->findSourceFiles() );
                // translators: Were %s is number of source files that will be scanned
                $summary = sprintf( _n('%s source file will be scanned for translatable strings','%s source files will be scanned for translatable strings',$nfiles,'loco-translate'), number_format_i18n($nfiles) );
                $extracting = true;
            }
            // else prompt for template creation before continuing
            else {
                // POT could still be defined, it might just not exist yet
                if( $potfile ){
                    $this->set('pot', Loco_mvc_FileParams::create($potfile) );
                }
                // else offer assignment of a new file
                else {
                    $this->set( 'conf', new Loco_mvc_ViewParams( [
                        'link' => Loco_mvc_AdminRouter::generate( $this->get('type').'-conf', array_intersect_key($_GET,['bundle'=>'']) ),
                        'text' => __('Assign template','loco-translate'),
                    ] ) );
                }
                $this->set('ext', $prompts['xgettext'] );
                $this->set('skip', $prompts['skip'] );
                return $this->view('admin/init/init-prompt');
            }
        }
        else {
            throw new Loco_error_Exception('Plugin settings disallow missing templates');
        }
        $this->set( 'summary', $summary );
        
        // group established locations into types (official, etc..)
        // there is no point checking whether any of these file exist, because we don't know what language will be chosen yet.
        $sortable = [];
        $locations = [];
        $fs_failure = null;
        /* @var Loco_fs_LocaleFile $pofile */
        foreach( $filechoice as $pofile ){
            $parent = new Loco_fs_LocaleDirectory( $pofile->dirname() );
            $systype = $parent->getUpdateType();
            $typeId = $parent->getTypeId();
            if( ! isset($locations[$typeId]) ){
                $locations[$typeId] = new Loco_mvc_ViewParams( [
                    'label' => $parent->getTypeLabel( $typeId ),
                    'paths' => [],
                ] );
            }
            // folder may be unwritable (requiring connect to create file) or may be denied under security settings
            try {
                $context = $parent->getWriteContext()->authorize();
                $writable = $context->writable();
                $disabled = false;
            }
            catch( Loco_error_WriteException $e ){
                $fs_failure = $e->getMessage();
                $writable = false;
                $disabled = true;
            }
            $suffix = $pofile->getSuffix().'.po';
            $choice = new Loco_mvc_ViewParams(  [
                'checked' => '',
                'writable' => $writable,
                'disabled' => $disabled,
                'systype' => $systype,
                'dirtype' => $typeId,
                'parent' => Loco_mvc_FileParams::create($parent),
                'hidden' => $pofile->getRelativePath($content_dir),
                'holder' => str_replace( $suffix, '<span>{locale}</span>.po', $pofile->basename() ),
                'copying' => $sourcedir === $parent->getPath(),
                'exists' => $copying && $pofile->exists(),
            ] );
            $sortable[] = $choice;
            $locations[$typeId]['paths'][] = $choice;
        }

        // display locations in runtime preference order
        uksort( $locations, [__CLASS__,'compareLocationKeys'] );
        $this->set( 'locations', $locations );

        // pre-select best option, excluding the current source if copying
        $preferred = $this->sortPreferred( $sortable );
        if( $preferred instanceof ArrayAccess ){
            $preferred['checked'] = 'checked';
        }
        // else show total lock message. probably file mods disallowed
        else if( $fs_failure ){
            $this->set('fsLocked', $fs_failure );
        }
        
        // hidden fields to pass through to Ajax endpoint
        $this->set('hidden', new Loco_mvc_HiddenFields( [
            'action' => 'loco_json',
            'route' => 'msginit',
            'loco-nonce' => $this->setNonce('msginit')->value,
            'type' => $bundle->getType(),
            'bundle' => $bundle->getHandle(),
            'domain' => $project ? $project->getId() : '',
            'source' => $potpath,
        ] ) );
        
        $this->set('help', new Loco_mvc_ViewParams( [
            'href' => apply_filters('loco_external','https://localise.biz/wordpress/plugin/manual/msginit'),
            'text' => __("What's this?",'loco-translate'),
        ] ) );
        
        // add a prompt if there's a better option for creating a new PO
        if( ! $copying ){
            if( array_key_exists('copy',$prompts) ){
                $prompt = $prompts['copy'];
                // translators: %s will be replaced with a PO file name
                $prompt['text'] = sprintf( __('Copy %s instead','loco-translate'), $prompt->__get('name') );
            }
            else {
                $prompt = $prompts['xgettext'];
                $prompt['text'] = __('Create template instead','loco-translate');
            }
            if( $extracting ){
                $prompt['title'] = __("You're creating translations directly from source code",'loco-translate');
                $this->set('prompt',$prompt);
            }
            else if( array_key_exists('copy',$prompts) ){
                $prompt['title'] = __("You're creating translations from a POT file",'loco-translate');
                $this->set('prompt',$prompt);
            }
        }

        // file system prompts will be handled when paths are selected (i.e. we don't have one yet)
        $this->prepareFsConnect( 'create', '' );
        
        $this->enqueueScript('poinit');
        return $this->view('admin/init/init-po');
    }

}
