<?php
/**
 * @codeCoverageIgnore
 */
class Loco_admin_DebugController extends Loco_mvc_AdminController {

    /**
     * Text domain of debugger, limits when gets logged
     * @var string|null $domain
     */
    private $domain;

    /**
     * Temporarily forced locale
     * @var string|null $locale
     */
    private $locale;

    /**
     * Log lines for final result
     * @var null|ArrayIterator
     */    
    private $output;


    /**
     * {@inheritdoc}
     */
    public function init(){
        parent::init();
        $this->set('title','String Debugger');
        //
        $params = [
            'domain' => '',
            'locale' => '',
            'msgid' => '',
            'msgctxt' => '',
            'msgid_plural' => '',
            'n' => '1',
            'unhook' => '',
            'loader' => '',
            'loadpath' => '',
        ];
        $defaults = [
            'domain' => 'default',
            'locale' => get_locale(),
        ];
        foreach( array_intersect_key($_GET,$params) as $k => $value ){
            if( '' !== $value ){
                $params[$k] = $value;
            }
        }
        $this->set('form', new Loco_mvc_ViewParams($params) );
        $this->set('default', new Loco_mvc_ViewParams($defaults+$params) );
    }


    /**
     * @return void
     */
    private function log( ...$args ){
        $message = array_shift($args);
        if( $args ){
            $message = vsprintf($message,$args);
        }
        if( is_null($this->output) ){
            $this->output = new ArrayIterator;
            $this->set('log', $this->output );
        }
        // redact any path information outside of WordPress root
        $message = str_replace( [WP_LANG_DIR,WP_CONTENT_DIR,ABSPATH], ['{WP_LANG_DIR}','{WP_CONTENT_DIR}','{ABSPATH}'], $message );
        $this->output[] = $message;
    }


    /**
     * `pre_determine_locale` filter callback
     */
    public function filter_pre_determine_locale( $locale = null ){
        if( is_string($this->locale) ) {
            $this->log( '~ filter:pre_determine_locale: %s => %s', $locale ?: 'none', $this->locale );
            $locale = $this->locale;
        }
        return $locale;
    }


    /**
     * `load_textdomain` callback
     */
    public function on_load_textdomain( $domain, $mopath ){
        if( $domain === $this->domain ){
            $this->log('~ action:load_textdomain: %s', $mopath );
        }
    }


    /**
     * `load_textdomain_mofile` callback
     */
    public function filter_load_textdomain_mofile( $mofile, $domain ){
        if( $domain === $this->domain ){
            $this->log('~ filter:load_textdomain_mofile: %s', $mofile );
        }
        return $mofile;
    }


    /**
     * `load_translation_file` filter callback
     */
    public function filter_load_translation_file( $file, $domain ){
        if( $domain === $this->domain ){
            $this->log('~ filter:load_translation_file: %s', $file );
        }
        return $file;
    }


    /**
     * `translation_file_format` filter callback
     * TODO let form option override 'php' as preferred format
     */
    public function filter_translation_file_format( $preferred_format, $domain ){
        if( $domain === $this->domain ){
            $this->log('~ filter:translation_file_format: %s', $preferred_format );
        }
        return $preferred_format;
    }


    /**
     * @internal
     */
    public function temp_filter_gettext( $translation, $text, $domain ){
        if( $domain === $this->domain ){
            $this->log('~ filter:gettext:%s =>%s', LocoPo::pair('',$text,0), LocoPo::pair('',$translation,0) );
        }
        return $translation;
    }


    /**
     * @return null|Loco_package_Bundle
     */
    private static function getBundleByDomain( $domain, $type ){
        if( 'default' === $domain ){
            return Loco_package_Core::create();
        }
        if( 'plugin' === $type ){
            $search = Loco_package_Plugin::getAll();
        }
        else if( 'theme' === $type || 'child' === $type ){
            $type = 'theme';
            $search = Loco_package_Theme::getAll();
        }
        else {
            $type = 'bundle';
            $search = array_merge( Loco_package_Plugin::getAll(), Loco_package_Theme::getAll() );
        }
        /* @var Loco_package_Bundle $bundle */
        foreach( $search as $bundle ){
            /* @var Loco_package_Project $project */
            foreach( $bundle as $project ){
                if( $project->getDomain()->getName() === $domain ){
                    return $bundle;
                }
            }
        }
        Loco_error_AdminNotices::warn('No '.$type.' known with text domain '.$domain );
        return null;
    }



    /**
     * @return string
     */
    private function renderResult( Loco_mvc_ViewParams $form ){
        $msgid = $form['msgid'];
        $msgctxt = $form['msgctxt'];
        $msgid_plural = $form['msgid_plural'];
        $quantity = (int) $form['n'];
        // default domain should be explicit, not empty.
        $domain = $form['domain'];
        if( '' === $domain ){
            $domain = 'default';
        }
        $this->domain = $domain;
        class_exists('Loco_gettext_Data');
        $this->log('Running test for domain => %s', $domain );
        // Look up MO translation via WordPress function
        $default = $this->get('default');
        $tag = $form['locale'] ?: $default['locale'];
        $locale = Loco_Locale::parse($tag);
        if( ! $locale->isValid() ){
            throw new InvalidArgumentException('Invalid locale code ('.$tag.')');
        }
        // unhook all existing filters, including our own
        if( $form['unhook'] ){
            $this->log('Unhooking l10n filters');
            array_map( 'remove_all_filters', [
                // these filters are all used by Loco_hooks_LoadHelper:
                'theme_locale','plugin_locale','unload_textdomain','load_textdomain','load_script_translation_file','load_script_translations',
                // these filters also affect text domain loading / file reading
                'pre_load_textdomain','override_load_textdomain','load_textdomain_mofile','translation_file_format','load_translation_file', 'override_unload_textdomain',
                // these filters affect translation fetching
                'gettext',
            ] );
           new Loco_hooks_LoadHelper;
        }
        // Ensuring our forced locale requires no other filters allowed to run
        // doing this whether "unhook" is set or not, otherwise determine_locale won't work.
        remove_all_filters('pre_determine_locale');
        $this->reHook();
        //
        $this->locale = (string) $locale;
        $this->log('Have locale: %s', $this->locale );
        $actual = determine_locale();
        if( $actual !== $this->locale ){
            $this->log('determine_locale() => %s', $actual );
            Loco_error_AdminNotices::warn( sprintf('Locale %s is overriding %s', $actual, $this->locale) );
        }

        // Perform preloading according to user choice, and optional path argument
        $type = $form['loader'];
        $path = $form['loadpath'];
        $bundle = self::getBundleByDomain($domain,$type);
        // plugin and theme loaders allow missing path argument, custom loader does not
        if( '' === $path ){
            $file = null;
            $path = false;
        }
        // Just-in-time loader takes no path argument
        else if( 'jit' === $type || '' === $type ){
           $file = null;
           Loco_error_AdminNotices::debug('Path argument ignored');
        }
        else {
            $this->log('Have path argument => %s', $path );
            $file = new Loco_fs_File($path);
        }
        // unload text domain for any forced loading method. Else default loaders will run
        if( '' === $type ){
            $this->log('No loader, is_textdomain_loaded() => %b', is_textdomain_loaded($domain) );
        }
        else {
            $this->log('Unloading text domain for %s loader', $type );
            $returned = unload_textdomain( $domain );
            // Bootstrap text domain if a loading function was selected
            if( 'plugin' === $type ){
                if( $file ){
                    if( $file->isAbsolute() ){
                        $path = $file->getRelativePath(WP_PLUGIN_DIR);
                    }
                    else {
                        $file->normalize(WP_PLUGIN_DIR);
                    }
                    if( ! $file->exists() || ! $file->isDirectory() ){
                        throw new InvalidArgumentException('Loader argument must be a directory relative to WP_PLUGIN_DIR');
                    }
                }
                $this->log('Calling load_plugin_textdomain with $plugin_rel_path=%s',$path);
                $returned = load_plugin_textdomain( $domain, false, $path );
            }
            else if( 'theme' === $type || 'child' === $type ){
                // TODO note that absent path argument will use current theme, and not necessarily whatever $domain is
                if( $file && ( ! $file->isAbsolute() || ! $file->isDirectory() ) ){
                    throw new InvalidArgumentException('Path argment must reference the theme directory');
                }
                $this->log('Calling load_theme_textdomain with $path=%s',$path);
                $returned = load_theme_textdomain( $domain, $path );
            }
            // When we called unload_textdomain we passed $reloadable=false on purpose to force memory removal
            // So if we want to allow _load_textdomain_just_in_time, we'll have to hack the reloadable lock.
            else if( 'jit' === $type ){
                $this->log('Removing JIT lock');
                unset( $GLOBALS['l10n_unloaded'][$this->domain] );
            }
            else {
                if( is_null($file) || ! $file->isAbsolute() || ! $file->exists() || $file->isDirectory() ){
                    throw new InvalidArgumentException('Path argument must reference an existent file');
                }
                $this->log('Calling load_theme_textdomain with $mofile=%s',$path);
                $returned = load_textdomain($domain,$path);
            }
            $this->log('> returned %s', $returned?'true':'false');
        }
    
        // Create source message for string query
        $message = new LocoPoMessage(['source'=>$msgid,'context'=>$msgctxt,'target'=>'']);
        $this->log('Query: %s', LocoPo::pair('msgid',$msgid) );
        if( '' !== $msgid_plural ){
            $this->log('     | %s (n=%u)', LocoPo::pair('msgid_plural',$msgid_plural), $quantity );
            $message->offsetSet('plurals', [new LocoPoMessage(['source'=>$msgid_plural,'target'=>''])] );
        }
        // temporary hooks during translation request only
        $this->addHook('gettext', 'temp_filter_gettext', 3, 99 ); //gettext_with_context
        // Perform runtime translation request from MO file
        if( '' === $msgctxt ){
            if( '' === $msgid_plural ) {
                $msgstr = __( $msgid, $domain );
            }
            else {
                $msgstr = _n( $msgid, $msgid_plural, $quantity, $domain );
            }
        }
        else {
            $this->addHook('gettext_with_context', 'temp_filter_gettext', 3, 99 );
            $this->log('     | %s', LocoPo::pair('msgctxt',$msgctxt) );
            if( '' === $msgid_plural ){
                $msgstr = _x( $msgid, $msgctxt, $domain );
            }
            else {
                $msgstr = _nx( $msgid, $msgid_plural, $quantity, $msgctxt, $domain );
            }
        }
        $this->log("====>| %s", LocoPo::pair('msgstr',$msgstr,0) );

        // We're done with our temporary hooks now
        $this->domain = null;
        $this->locale = null;

        // Obtain all possible translations from all known targets (requires bundle)
        $pofiles = new Loco_fs_FileList;
        if( $bundle ){
            foreach( $bundle as $project ) {
                if( $project instanceof Loco_package_Project && $project->getDomain()->getName() === $domain ){
                    $pofiles->augment( $project->initLocaleFiles($locale) );
                }
            }
        }
        // without a configured bundle, we'll have to search all likely locations, but this will exclude author location
        // we may as well add them anyway, in case bundle is misconfigured. Small risk of plugin/theme domain conflicts.
        /* @var Loco_package_Bundle $tmp */
        foreach( [ new Loco_package_Plugin('',''), new Loco_package_Theme('','') ] as $tmp ) {
            foreach( $tmp->getSystemTargets() as $root ){
                $pofiles->add( new Loco_fs_File( sprintf('%s/%s-%s.po',$root,$domain,$locale) ) );
            }
        }
        $grouped = [];
        $matches = [];
        $searched = 0;
        $matched  = 0;
        $findKey = $message->getKey();
        $this->log('Searching %u possible locations for string versions', $pofiles->count() );
        /* @var Loco_fs_File $pofile */
        foreach( $pofiles as $pofile ){
            $dir = new Loco_fs_LocaleDirectory( $pofile->dirname() );
            $type = $dir->getTypeId();
            $groupIdx = count($grouped);
            $args = [ 'type' => $dir->getTypeLabel($type) ];
            $grouped[] = new Loco_mvc_FileParams( $args, $pofile );
            $siblings = new Loco_fs_Siblings($pofile);
            $siblings->setDomain($domain);
            foreach( $siblings->expand() as $file ){
                try {
                    // TODO also parse .l10n.php translation files
                    if( ! preg_match('!^(?:pot?|mo|json)$!', $file->fullExtension() ) || ! $file->exists() ){
                        continue;
                    }
                    $searched++;
                    /* @var LocoPoMessage $m */
                    foreach( Loco_gettext_Data::load($file) as $m ){
                        if( $m->getKey() === $findKey ){
                            // TODO get plural form if posted
                            $value = $m['target'];
                            $args = [ 'msgstr' => $m['target'] ];
                            $matches[$groupIdx][] = new Loco_mvc_FileParams($args,$file);
                            $this->log('> found in %s => %s', $file, var_export($value,true) );
                            $matched++;
                            // next file
                            continue 2;
                        }
                    }
                }
                catch( Exception $e ){
                    Loco_error_Debug::trace( '%s in %s', $e->getMessage(), $file );
                }
            }
        }
        // display result if translation occurred, or if we found the string in at least one file, even if empty
        $this->log('> %u matches in %u locations; %u files searched', $matched, count($grouped), $searched );
        if( $matches || $msgid !== $msgstr ){
            $result = new Loco_mvc_ViewParams( $form->getArrayCopy() );
            $result['msgid'] = $msgid;
            $result['msgstr'] = $msgstr;
            $result['grouped'] = $grouped;
            $result['matches'] = $matches;
            $result['searched'] = $searched;
            return $this->view( 'admin/debug/debug-result', [ 'result' => $result ] );
        }
        // Source string not found in any translation files
        $name = $bundle ? $bundle->getName() : $domain;
        throw new Loco_error_Warning('No `'.$locale.'` translations found for this string in '.$name );
    }



    /**
     * @return void
     */
    private function surpriseMe(){
        $project = null;
        /* @var Loco_package_Bundle[] $bundles */
        $bundles = array_merge( Loco_package_Plugin::getAll(), Loco_package_Theme::getAll(), [ Loco_package_Core::create() ] );
        while( $bundles && is_null($project) ){
            $key = array_rand($bundles,1);
            $project = $bundles[$key]->getDefaultProject();
            unset($bundles[$key]);
        }
        // It should be impossible for project to be null, due to WordPress core always being non-empty
        if( ! $project instanceof Loco_package_Project ){
            throw new LogicException('No translation projects');
        }
        $domain = $project->getDomain()->getName();
        // Pluck a random locale from existing PO translations
        $files = $project->findLocaleFiles('po')->getArrayCopy();
        $pofile = $files ? $files[ array_rand($files,1) ] : null;
        $locale = $pofile instanceof Loco_fs_LocaleFile ? (string) $pofile->getLocale() : '';
        // Get a random source string from the code.. avoiding full extraction.. pluck a PHP file...
        class_exists('Loco_gettext_Data');
        $message = new LocoPoMessage(['source'=>'']);
        $extractor = loco_wp_extractor('php');
        $extractor->setDomain($domain);
        /* @var Loco_fs_File[] $files */
        $files = $project->getSourceFinder()->group('php')->export()->getArrayCopy();
        while( $files ){
            $key = array_rand($files,1);
            $file = $files[$key];
            $strings = ( new LocoExtracted )->extractSource( $extractor, $file->getContents() )->export();
            if( $strings ){
                $message = new LocoPoMessage( $strings[ array_rand($strings,1) ] );
                break;
            }
            // try next source file...
            unset($files[$key]);
        }
        // apply random choice
        $form = $this->get('form');
        $form['domain'] = $domain;
        $form['locale'] = $locale;
        $form['msgid'] = $message->source;
        $form['msgctxt'] = $message->context;
        // random message could be a plural form
        $plurals = $message->plurals;
        if( is_array($plurals) && array_key_exists(0,$plurals) && $plurals[0] instanceof LocoPoMessage ){
            $form['msgid_plural'] = $plurals[0]['source'];
        }
        Loco_error_AdminNotices::info( sprintf('Randomly selected "%s". Click Submit to check a string.', $project->getName() ) );
    }



    /**
     * {@inheritdoc}
     */
    public function render(){
        try {

            // Process form if (at least) "msgid" is set
            $form = $this->get('form');
            if( '' !== $form['msgid'] ){
                return $this->renderResult($form);
            }

            // Pluck a random string for testing
            else if( 'me' === $this->get('surprise') ){
                $this->surpriseMe();
            }
        }
        catch( Loco_error_Exception $e ){
            Loco_error_AdminNotices::add($e);
        }
        catch( Exception $e ){
            Loco_error_AdminNotices::add( Loco_error_Exception::convert($e) );
        }

        return $this->view('admin/debug/debug-form');
    }
    
}
