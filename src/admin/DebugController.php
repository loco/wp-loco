<?php
/**
 * @codeCoverageIgnore
 * @noinspection PhpUnused
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
        // get a better default locale than en_US
        $locale = get_locale();
        if( 'en_US' === $locale ){
            foreach( get_available_languages() as $locale ){
                if( 'en_US' !== $locale ){
                    break;
                }
            }
        }
        $params = [
            'domain' => '',
            'locale' => '',
            'msgid' => '',
            'msgctxt' => '',
            'msgid_plural' => '',
            'n' => '',
            'unhook' => '',
            'loader' => '',
            'loadpath' => '',
            'jspath' => '',
        ];
        $defaults = [
            'n' => '1',
            'domain' => 'default',
            'locale' => $locale,
        ];
        foreach( array_intersect_key(stripslashes_deep($_GET),$params) as $k => $value ){
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
        // redact any path information outside of WordPress root, and shorten any common locations
        $message = str_replace( [LOCO_LANG_DIR,WP_LANG_DIR,WP_CONTENT_DIR,ABSPATH], ['{loco_lang_dir}','{wp_lang_dir}','{wp_content_dir}','{abspath}'], $message );
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
     * `load_script_textdomain_relative_path` filter callback
     */
    public function filter_load_script_textdomain_relative_path( $relative/*, $src*/ ){
        if( preg_match('!pub/js/(?:min|src)/dummy.js!', $relative )){
            $form = $this->get('form');
            $path = $form['jspath'];
            error_log( json_encode(func_get_args(),JSON_UNESCAPED_SLASHES).' -> '.$path );
            $this->log( '~ filter:load_script_textdomain_relative_path: %s => %s', $relative, $path );
            return $path;
        }
        return $relative;
    }


    /**
     * `pre_load_script_translations` filter callback
     * @noinspection PhpUnusedParameterInspection
     */
    public function filter_pre_load_script_translations( $translations, $file, $handle /*, $domain*/ ){
        if( 'loco-translate-dummy' === $handle && ! is_null($translations) ){
            $this->log('~ filter:pre_load_script_translations: Short-circuited with %s value', gettype($translations) );
        }
        return $translations;
    }


    /**
     * `load_script_translation_file` filter callback.
     */
    public function filter_load_script_translation_file( $file, $handle/* ,$domain*/ ){
        if( 'loco-translate-dummy' === $handle ){
            error_log( json_encode(func_get_args(),JSON_UNESCAPED_SLASHES) );
            // if file is not found, this will fire again with file=false
            $this->log('~ filter:load_script_translation_file: %s', var_export($file,true) );
        }
        return $file;
    }


    /**
     * `load_script_translations` filter callback
     * @noinspection PhpUnusedParameterInspection
     */
    public function filter_load_script_translations( $translations, $file, $handle, $domain ){
        if( 'loco-translate-dummy' === $handle ){
            // just log it if the value isn't JSON.
            if( ! is_string($translations) || '' === $translations || '{' !== $translations[0] ) {
                $this->log( '~ filter:load_script_translations: %s', var_export($translations,true) );
            }
        }
        return $translations;
    }


    /**
     * `[n]gettext[_with_context]` filter callback
     */
    public function temp_filter_gettext(){
        $i = func_num_args() - 1;
        $args = func_get_args();
        $translation = $args[0];
        if( $args[$i] === $this->domain ){
            $args = array_slice($args,1,--$i);
            $opts = JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE;
            $this->log('~ filter:gettext: %s =>%s', json_encode($args,$opts), json_encode($translation,$opts) );
        }
        return $translation;
    }



    /**
     * @return null|Loco_package_Bundle
     */
    private function getBundleByDomain( $domain, $type ){
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
                    $this->log('Have %s bundle => %s', $bundle->getType(), $bundle->getName() );
                    return $bundle;
                }
            }
        }
        $message = 'No '.$type.' known with text domain '.$domain;
        Loco_error_AdminNotices::warn($message);
        $this->log('! '.$message);
        return null;
    }


    /**
     * Look up a source key in given messages, returning source if untranslated, and null if not found.
     * @return string|null 
     */
    private function findKey( $findKey, $pluralIndex, Loco_gettext_Data $messages ){
        /* @var LocoPoMessage $m */
        foreach( $messages as $m ){
            if( $m->getKey() === $findKey ){
                $values = $m->exportSerial();
                if( array_key_exists($pluralIndex,$values) && '' !== $values[$pluralIndex] ){
                    return $values[$pluralIndex];
                }
                $values = $m->exportSerial('source');
                if( $pluralIndex ){
                    if( array_key_exists(1,$values) && '' !== $values[1] ){
                        return $values[1];
                    }
                    $this->log('! message is singular, defaulting to msgid');
                }
                return $values[0];
            }
        }
        return null;
    }


    /**
     * Prepare text domain for MO file lookup
     * @return void
     */
    private function preloadDomain( $domain, $type, $path ){
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
            $this->log('No loader, is_textdomain_loaded() => %s', var_export(is_textdomain_loaded($domain),true) );
            return;
        }
            
        $this->log('Unloading text domain for %s loader', $type );
        $returned = unload_textdomain( $domain );
        $callee = 'unload_textdomain';
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
            $callee = 'load_plugin_textdomain';
        }
        else if( 'theme' === $type || 'child' === $type ){
            // Note that absent path argument will use current theme, and not necessarily whatever $domain is
            if( $file && ( ! $file->isAbsolute() || ! $file->isDirectory() ) ){
                throw new InvalidArgumentException('Path argment must reference the theme directory');
            }
            $this->log('Calling load_theme_textdomain with $path=%s',$path);
            $returned = load_theme_textdomain( $domain, $path );
            $callee = 'load_theme_textdomain';
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
            $callee = 'load_textdomain';
        }
        $this->log('> %s returned %s', $callee, var_export($returned,true) );
    }



    /**
     * Preload domain for a script, then forcing retrieval of JSON.
     * @return Loco_gettext_Data
     */
    private function preloadScript( $path, $domain, Loco_package_Bundle $bundle = null ){
        $this->log('Have script argument => %s', $path );
        if( preg_match('/^[0-9a-f]{32}$/',$path) ){
            throw new Loco_error_Exception('Enter the script path, not the hash');
        }
        // normalize file reference if bundle is known. Warning already raised if not.
        // simulator will allow non-existent js. We can still find translations even if it's absent.
        $jsfile = new Loco_fs_File($path);
        if( $bundle ){
            $basepath = $bundle->getDirectoryPath();
            if( $jsfile->isAbsolute() ) {
                $path = $jsfile->getRelativePath($basepath);
                $this->get('form')['jspath'] = $path;
            }
            else {
                $jsfile->normalize($basepath);
            }
            if( ! $jsfile->exists() ){
                $this->log( '! Script not found. load_script_textdomain may fail');
            }
        }
        // log hashable path for comparison with what WordPress computes:
        if( '.min.js' === substr($path,-7) ) {
            $path = substr($path,0,-7).'.js';
        }
        else if('.js' !== substr($path,-3) ){
            Loco_error_AdminNotices::debug("Script path didn't end with .js");
        }
        $hash = md5($path);
        $this->log('> md5(%s) => %s', var_export($path,true), $hash );
        // filters will point our debug script to the actual script we're simulating
        $handle = $this->enqueueScript('dummy');
        if( ! wp_set_script_translations($handle,$domain) ){
            throw new Loco_error_Exception('wp_set_script_translations returned false');
        }
        // load_script_textdomain won't fire until footer, so grab JSON directly
        $this->log('Calling load_script_textdomain( %s )', trim(json_encode([$handle,$domain],JSON_UNESCAPED_SLASHES),'[]') );
        $json = load_script_textdomain($handle,$domain);
        $this->dequeueScript('dummy');
        if( is_string($json) && '' !== $json ){
            $this->log('> Parsing %u bytes of JSON...', strlen($json) );
            return Loco_gettext_Data::fromJson($json);
        }
        throw new Loco_error_Exception('load_script_textdomain returned '.var_export($json,true) );
    }        



    /**
     * Run the string lookup and render result screen, unless an error is thrown.
     * @return string
     */
    private function renderResult( Loco_mvc_ViewParams $form ){
        $msgid = $form['msgid'];
        $msgctxt = $form['msgctxt'];
        // singular form by default
        $msgid_plural = $form['msgid_plural'];
        $quantity = ctype_digit($form['n']) ? (int) $form['n'] : 1;
        $pluralIndex = 0;
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
                // these filters are all used by Loco_hooks_LoadHelper, and will need re-hooking afterwards:
                'theme_locale','plugin_locale','unload_textdomain','load_textdomain','load_script_translation_file','load_script_translations',
                // these filters also affect text domain loading / file reading:
                'pre_load_textdomain','override_load_textdomain','load_textdomain_mofile','translation_file_format','load_translation_file', 'override_unload_textdomain',
                // script translation hooks:
                'load_script_textdomain_relative_path','pre_load_script_translations','load_script_translation_file','load_script_translations',
                // these filters affect translation fetching via __, _n, _x and _nx:
                'gettext','ngettext','gettext_with_context','ngettext_with_context'
            ] );
           new Loco_hooks_LoadHelper;
        }
        // Ensuring our forced locale requires no other filters be allowed to run.
        // We're doing this whether "unhook" is set or not, otherwise determine_locale won't work.
        remove_all_filters('pre_determine_locale');
        $this->reHook();
        $this->locale = (string) $locale;
        $this->log('Have locale: %s', $this->locale );
        $actual = determine_locale();
        if( $actual !== $this->locale ){
            $this->log('determine_locale() => %s', $actual );
            Loco_error_AdminNotices::warn( sprintf('Locale %s is overriding %s', $actual, $this->locale) );
        }

        // Perform preloading according to user choice, and optional path argument.
        $type = $form['loader'];
        $bundle = $this->getBundleByDomain($domain,$type);
        $this->preloadDomain( $domain, $type, $form['loadpath'] );

        // Create source message for string query
        $message = new LocoPoMessage(['source'=>$msgid,'context'=>$msgctxt,'target'=>'']);
        $this->log('Query: %s', LocoPo::pair('msgid',$msgid) );
        if( '' !== $msgid_plural ){
            $this->log('     | %s (n=%u)', LocoPo::pair('msgid_plural',$msgid_plural), $quantity );
            $message->offsetSet('plurals', [new LocoPoMessage(['source'=>$msgid_plural,'target'=>''])] );
        }
        $findKey = $message->getKey();

        // Perform runtime translation request via WordPress
        if( '' === $msgctxt ){
            if( '' === $msgid_plural ) {
                $callee = '__';
                $params = [ $msgid, $domain ];
                $this->addHook('gettext', 'temp_filter_gettext', 3, 99 );
            }
            else {
                $callee = '_n';
                $params = [ $msgid, $msgid_plural, $quantity, $domain ];
                $this->addHook('ngettext', 'temp_filter_gettext', 5, 99 );
            }
        }
        else {
            $this->log('     | %s', LocoPo::pair('msgctxt',$msgctxt) );
            if( '' === $msgid_plural ){
                $callee = '_x';
                $params = [ $msgid, $msgctxt, $domain ];
                $this->addHook('gettext_with_context', 'temp_filter_gettext', 4, 99 );
            }
            else {
                $callee = '_nx';
                $params = [ $msgid, $msgid_plural, $quantity, $msgctxt, $domain ];
                $this->addHook('ngettext_with_context', 'temp_filter_gettext', 6, 99 );
            }
        }
        //
        $this->log('Calling %s( %s )', $callee, trim( json_encode($params,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE), '[]') );
        $msgstr = call_user_func_array($callee,$params);
        $this->log("====>| %s", LocoPo::pair('msgstr',$msgstr,0) );

        // Post check for text domain auto-load failure
        $loaded = get_translations_for_domain($domain);
        if( ! is_textdomain_loaded($domain) ){
            $this->log('! Text domain not loaded after %s() call completed', $callee );
            $this->log('? get_translations_for_domain => %s', is_object($loaded)?get_class($loaded):var_export($loaded,true));
        }
        // Establish retrospectively if a non-zero plural index was used.
        if( '' !== $msgid_plural ){
            $tmp = get_translations_for_domain($domain);
            if( $tmp && method_exists($tmp,'select_plural_form') ){
                $pluralIndex = $tmp->select_plural_form($quantity);
                if( 0 !== $pluralIndex ){
                    $this->log('Plural form [%d] was queried', $pluralIndex );
                }
            }
            else {
                $this->log('FIXME: can\'t select_plural_form from %s', is_object($tmp)?get_class($tmp):var_export($tmp,true));
            }
        }

        // Simulate JavaScript translation if script path is set. This will be used as a secondary result.
        $path = $form['jspath'];
        if( is_string($path) && '' !== $path ) {
            try {
                $data = $this->preloadScript( $path, $domain, $bundle );
                // TODO
                if( '' !== $msgid_plural && 0 === $pluralIndex ){
                    $header = $data->getHeaders()->offsetGet('pluralForms');
                    $this->log('TODO plural form from JED header => %s', $header );
                }
                $msgstr = $this->findKey( $findKey, $pluralIndex, $data );
                if( is_null($msgstr) ){
                    $this->log('! No match in JSON');
                }
                else {
                    $this->log("====>| %s", LocoPo::pair('msgstr',$msgstr,0) );
                }
                // Override primary translation result for script translation
                $callee = 'load_script_textdomain';
            }
            catch( Exception $e ){
                $this->log('! %s', $e->getMessage() );
                Loco_error_AdminNotices::warn('Script translation failed. Falling back to PHP translation');
            }
        }

        // Establish translation success, assuming that source being returned is equivalent to an absent translation
        $fallback = $pluralIndex ? $msgid_plural : $msgid;
        $translated = is_string($msgstr) && '' !== $msgstr && $msgstr !== $fallback;
        $this->log('Translated result state => %s', $translated?'true':'false');

        // We're done with our temporary hooks now.
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
                $pofiles->add( new Loco_fs_LocaleFile( sprintf('%s/%s-%s.po',$root,$domain,$locale) ) );
            }
        }
        $grouped = [];
        $matches = [];
        $searched = 0;
        $matched  = 0;
        $this->log('Searching %u possible locations for string versions', $pofiles->count() );
        /* @var Loco_fs_File $pofile */
        foreach( $pofiles as $pofile ){
            // initialize translation set for this PO and its siblings
            $dir = new Loco_fs_LocaleDirectory( $pofile->dirname() );
            $type = $dir->getTypeId();
            $args = [ 'type' => $dir->getTypeLabel($type) ];
            // as long as we know the bundle and the PO file exists, we can link to the editor.
            // bear in mind that domain may not be unique to one set of translations (core) so ...
            // TODO how can we easily identify the exact project, file name?
            if( $bundle && $pofile->exists() ){
                $route = strtolower($bundle->getType()).'-file-edit';
                $args['href'] = Loco_mvc_AdminRouter::generate( $route, [
                    'bundle' => $bundle->getHandle(),
                    'domain' => $domain, // <- needs slug!
                    'path' => $pofile->getRelativePath(WP_CONTENT_DIR),
                ] );
            }
            $groupIdx = count($grouped);
            $grouped[] = new Loco_mvc_FileParams( $args, $pofile );
            // even if PO file is missing, we can search the MO, JSON etc..
            $siblings = new Loco_fs_Siblings($pofile);
            $siblings->setDomain($domain);
            foreach( $siblings->expand() as $file ){
                try {
                    if( ! preg_match('!^(?:pot?|mo|json|l10n\\.php)$!', $file->fullExtension() ) || ! $file->exists() ){
                        continue;
                    }
                    $searched++;
                    $value = $this->findKey( $findKey, $pluralIndex, Loco_gettext_Data::load($file) );
                    if( is_string($value) ){
                        $matched++;
                        $args = [ 'msgstr' => $value ];
                        $matches[$groupIdx][] = new Loco_mvc_FileParams($args,$file);
                        $this->log('> found in %s => %s', $file, var_export($value,true) );
                    }
                }
                catch( Exception $e ){
                    Loco_error_Debug::trace( '%s in %s', $e->getMessage(), $file );
                }
            }
        }

        // display result if translation occurred, or if we found the string in at least one file, even if empty
        $this->log('> %u matches in %u locations; %u files searched', $matched, count($grouped), $searched );
        if( $matches || $translated ){
            $result = new Loco_mvc_ViewParams( $form->getArrayCopy() );
            $result['translated'] = $translated;
            $result['msgstr'] = $msgstr;
            $result['callee'] = $callee;
            $result['grouped'] = $grouped;
            $result['matches'] = $matches;
            $result['searched'] = $searched;
            $result['calleeDoc'] = 'https://developer.wordpress.org/reference/functions/'.$callee.'/';
            return $this->view( 'admin/debug/debug-result', ['result'=>$result]);
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
            $key = array_rand($bundles);
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
        $pofile = $files ? $files[ array_rand($files) ] : null;
        $locale = $pofile instanceof Loco_fs_LocaleFile ? (string) $pofile->getLocale() : '';
        // Get a random source string from the code... avoiding full extraction.. pluck a PHP file...
        class_exists('Loco_gettext_Data');
        $message = new LocoPoMessage(['source'=>'']);
        $extractor = loco_wp_extractor();
        $extractor->setDomain($domain);
        /* @var Loco_fs_File[] $files */
        $files = $project->getSourceFinder()->group('php')->export()->getArrayCopy();
        while( $files ){
            $key = array_rand($files);
            $file = $files[$key];
            $strings = ( new LocoExtracted )->extractSource( $extractor, $file->getContents() )->export();
            if( $strings ){
                $message = new LocoPoMessage( $strings[ array_rand($strings) ] );
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
        $title = __('String debugger','loco-translate');
        $this->set('breadcrumb', Loco_admin_Navigation::createSimple($title) );

        try {
            // Process form if (at least) "msgid" is set
            $form = $this->get('form');
            if( '' !== $form['msgid'] ){
                return $this->renderResult($form);
            }
            // Pluck a random string for testing
            else if( array_key_exists('randomize',$_GET) ){
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
