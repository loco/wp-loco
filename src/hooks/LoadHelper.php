<?php
/**
 * Text Domain loading helper.
 * Ensures custom translations can be loaded from `wp-content/languages/loco`.
 * This functionality is optional. You can disable the plugin if you're not loading MO or JSON files from languages/loco
 * 
 * @noinspection PhpUnused
 * @noinspection PhpUnusedParameterInspection
 * @noinspection PhpMissingParamTypeInspection
 * @noinspection PhpMissingReturnTypeInspection
 */
class Loco_hooks_LoadHelper extends Loco_hooks_Hookable {

    /**
     * Cache of custom locations passed from load_plugin_textdomain and load_theme_textdomain
     * @var string[]
     */
    private $custom = [];

    /**
     * Deferred JSON files under our custom directory, indexed by script handle
     * @var string[]
     */
    private $json = [];

    /**
     * Recursion lock, contains the current mofile being processed indexed by the domain
     * @var string[]
     */
    private $lock = [];

    /**
     * The current MO file being loaded during the initial call to load_textdomain
     */
    private $mofile = '';

    /**
     * The current domain being loaded during the initial call to load_textdomain
     */
    private $domain = '';

    /**
     * Registry of text domains we've seen, whether loaded or not. This will catch early JIT problem.
     */
    private $seen = [];

    /**
     * {@inheritDoc}
     */
    public function __construct(){
        parent::__construct();
        // Text domains loaded prematurely won't be customizable, even if NOOP_Translations
        global $l10n, $l10n_unloaded;
        if( $l10n && is_array($l10n) ){
            $unloaded = [];
            foreach( array_keys($l10n) as $domain ){
                if( $domain && is_string($domain) && 'default' !== $domain && apply_filters('loco_unload_early_textdomain',true,$domain) ){
                    unload_textdomain($domain) and $unloaded[] = $domain;
                    unset($l10n_unloaded[$domain]);
                }
            }
            // debug all text domains unloaded, excluding NOOP_Translations for less noise.
            if( $unloaded && loco_debugging() ){
                $n = count($unloaded);
                Loco_error_Debug::trace('Unloaded %u premature text domain%s (%s)', $n, 1===$n?'':'s', implode(',',$unloaded) );
            }
        }
    }


    /**
     * Filter callback for `pre_get_language_files_from_path`
     * Called from {@see WP_Textdomain_Registry::get_language_files_from_path}
     *
     * @param null|array $files we're not going to modify this.
     * @param string $path either WP_LANG_DIR/plugins/', WP_LANG_DIR/themes/ or a user-defined location
     */
    public function filter_pre_get_language_files_from_path( $files, $path = '' ) {
        if( is_string($path) && ! array_key_exists($path,$this->custom) ){
            $len = strlen( loco_constant('WP_LANG_DIR') );
            $rel = substr($path,$len);
            if( '/' !== $rel && '/plugins/' !== $rel && '/themes/' !== $rel ){
                $this->resolveType($path);
            }
        }
        return $files;
    }


    /**
     * Filter callback for `lang_dir_for_domain`
     * Called from {@see WP_Textdomain_Registry::get} after path is obtained from {@see WP_Textdomain_Registry::get_path_from_lang_dir}
     * @param false|string $path
     * @param string $domain
     * @param string $locale
     * @return false|string
     */
    public function filter_lang_dir_for_domain( $path, $domain, $locale ){
        // If path is false it means no system or author files were found. This will stop WordPress trying to load anything.
        // Usually this occurs during true JIT loading, where an author path would not be set by e.g. load_plugin_textdomain.
        if( false === $path ){
            // Avoid WordPress bailing on domain load by letting it know about our custom path now
            $base = rtrim( loco_constant('LOCO_LANG_DIR'), '/' );
            foreach( ['/plugins/','/themes/'] as $type ){
                if( self::try_readable($base.$type.$domain.'-'.$locale.'.mo') ){
                    $path = $base.$type;
                    // Caveat: if load_%_textdomain is called later on with a custom (author) path, it will be ignored.
                    break;
                }
            }
        }
        return $path;
    }


    /**
     * Triggers a new round of load_translation_file attempts.
     */
    public function on_load_textdomain( $domain, $mofile ){
        if( isset($this->lock[$domain]) ){
            // may be recursion for our custom file
            if( $this->lock[$domain] === $mofile ){
                return;
            }
            // else a new file, so release the lock
            unset($this->lock[$domain]);
        }
        // flag whether the original MO file (or a valid sibling) exists for this load.
        // we could check this during filter_load_translation_file but this saves doing it multiple times
        $this->mofile = self::try_readable($mofile);
        // Setting the domain just in case someone is applying filters manually in a strange order
        $this->domain = $domain;
        // If load_textdomain was called directly with a custom file we'll have missed it
        if( 'default' !== $domain ){
            $path = dirname($mofile).'/';
            if( ! array_key_exists($path,$this->custom) ){
                $this->resolveType($path);
            }
        }
        $this->seen[$domain] = true;
    }


    /**
     * Filter callback for `load_translation_file`
     * Called from {@see load_textdomain} multiple times for each file format in preference order.
     */
    public function filter_load_translation_file( $file, $domain, $locale ){
        // domain mismatch would be unexpected during normal execution, but anyone could apply filters.
        if( $domain !== $this->domain ){
            return $file;
        }
        // skip recursion for our own custom file:
        if( isset($this->lock[$domain]) ){
            return $file;
        }
        // loading a custom file directly is fine, although above lock will prevent in normal situations
        $path = dirname($file).'/';
        $custom = trailingslashit( loco_constant('LOCO_LANG_DIR') );
        if( $path === $custom || str_starts_with($file,$custom) ){
            return $file;
        }
        // map system file to custom location if possible. e.g. languages/foo => languages/loco/foo
        // this will account for most installed translations which have been customized.
        $system = trailingslashit( loco_constant('WP_LANG_DIR') );
        if( str_starts_with($file,$system) ){
            $mapped = substr_replace($file,$custom,0,strlen($system) );
        }
        // custom path may be author location, meaning it's under plugin or theme directories
        else if( array_key_exists($path,$this->custom) ){
            $ext = explode( '.', basename($file), 2 )[1];
            $mapped = $custom.$this->custom[$path].'/'.$domain.'-'.$locale.'.'.$ext;
        }
        // otherwise we'll assume the custom path is not intended to be further customized.
        else {
            return $file;
        }
        // When the original file isn't found, calls to load_textdomain will return false and overwrite our custom file.
        // Here we'll simply return our mapped version, whether it exists or not. WordPress will treat is as the original.
        if( '' === $this->mofile ){
            return $mapped;
        }
        // We know that the original file will eventually be found (even if via a second file attempt)
        // This requires a recursive call to load_textdomain for our custom file, WordPress will handle if it exists.
        $mapped = self::to_mopath($mapped);
        $this->lock[$domain] = $mapped;
        load_textdomain( $domain, $mapped, $locale );
        /*/ Sanity check that original file does exist, and it's the one we're expecting:
        if( '' === self::try_readable($file) || self::to_mopath($file) !== $this->mofile ){
            throw new LogicException;
        }*/
        // Return original file, which we've established does exist, or if it doesn't another extension might
        return $file;
    }


    /**
     * Resolve a custom directory path to either a theme or a plugin
     * @param string $path directory path with trailing slash
     */
    private function resolveType( string $path ):void {
        // no point trying to resolve a relative path, this likely stems from bad call to load_textdomain
        if( ! Loco_fs_File::is_abs($path) ){
            return;
        }
        // custom location is likely to be inside a theme or plugin, but could be anywhere
        if( Loco_fs_Locations::getPlugins()->check($path) ){
            $this->custom[$path] = 'plugins';
        }
        else if( Loco_fs_Locations::getThemes()->check($path) ){
            $this->custom[$path] = 'themes';
        }
        // folder could be plugin-specific, e.g. languages/woocommerce,
        // but this won't be merged with custom because it IS custom.
    }


    /**
     * Fix any file extension to use .mo
     */
    private static function to_mopath( string $path ):string {
        if( str_ends_with($path,'.mo') ){
            return $path;
        }
        // path should only be a .l10n.php file, but could be something custom
        return dirname($path).'/'.explode('.', basename($path),2)[0].'.mo';
    }


    /**
     * Check .mo or .php file is readable, and return the .mo file if so.
     * Note that load_textdomain expects a .mo file, even if it ends up using .l10n.php
     */
    private static function try_readable( string $path ):string {
        $mofile = self::to_mopath($path);
        if( is_readable($mofile) || is_readable(substr($path,0,-2).'l10n.php') ){
            return $mofile;
        }
        return '';
    }
    
    
    
    // JSON //


    /**
     * `load_script_translation_file` filter callback
     * Alternative method to merging in `pre_load_script_translations`
     * @param string $path candidate JSON file (false on final attempt)
     * @param string $handle
     */
    public function filter_load_script_translation_file( $path = '', $handle = '' ) {
        // currently handle-based JSONs for author-provided translations will never map.
        if( is_string($path) && preg_match('/^-[a-f0-9]{32}\\.json$/',substr($path,-38) ) ){
            $system = loco_constant('WP_LANG_DIR').'/';
            $custom = loco_constant('LOCO_LANG_DIR').'/';
            if( str_starts_with($path,$system) ){
                $mapped = substr_replace($path,$custom,0,strlen($system) );
                // Defer merge until either JSON is resolved or final attempt passes an empty path.
                if( is_readable($mapped) ){
                    $this->json[$handle] = $mapped;
                }
            }
        }
        // If we return an unreadable file, load_script_translations will not fire.
        // However, we need to allow WordPress to try all files. Last attempt will have empty path
        else if( false === $path && array_key_exists($handle,$this->json) ){
            $path = $this->json[$handle];
            unset( $this->json[$handle] );
        }
        return $path;
    }


    /**
     * `load_script_translations` filter callback.
     * Merges custom translations on top of installed ones, as late as possible.
     *
     * @param string $json contents of JSON file that WordPress has read
     * @param string $path path relating to given JSON (not used here)
     * @param string $handle script handle for registered merge
     * @return string final JSON translations
     */
    public function filter_load_script_translations( $json = '', $path = '', $handle = '' ) {
        if( array_key_exists($handle,$this->json) ){
            $path = $this->json[$handle];
            unset( $this->json[$handle] );
            if( is_string($json) && '' !== $json ){
                $json = self::mergeJson( $json, file_get_contents($path) );
            }
            else {
                $json = file_get_contents($path);
            }
        }
        return $json;
    }


    /**
     * Merge two JSON translation files such that custom strings override
     * @param string $json Original/fallback JSON
     * @param string $custom Custom JSON (must exclude empty keys)
     * @return string Merged JSON
     */
    private static function mergeJson( string $json, string $custom ):string {
        $fallbackJed = json_decode($json,true);
        $overrideJed = json_decode($custom,true);
        if( self::jedValid($fallbackJed) && self::jedValid($overrideJed) ){
            // Original key is probably "messages" instead of domain, but this could change at any time.
            // Although custom file should have domain key, there's no guarantee JSON wasn't overwritten or key changed.
            $overrideMessages = current($overrideJed['locale_data']);
            $fallbackMessages = current($fallbackJed['locale_data']);
            // We could merge headers, but custom file should be correct
            // $overrideMessages[''] += $fallbackMessages[''];
            // Continuing to use "messages" here as per WordPress. Good backward compatibility is likely.
            // Note that our custom JED is sparse (exported with empty keys absent). This is essential for + operator.
            $overrideJed['locale_data'] =  [
                'messages' => $overrideMessages + $fallbackMessages,
            ];
            // Note that envelope will be the custom one. No functional difference but demonstrates that merge worked.
            $overrideJed['merged'] = true;
            $json = json_encode($overrideJed);
        }
        // Handle situations where one or neither JSON strings are valid
        else if( self::jedValid($overrideJed) ){
            $json = $custom;
        }
        else if( ! self::jedValid($fallbackJed) ){
            $json = '';
        }
        return $json;
    }


    /**
     * Test if unserialized JSON is a valid JED structure
     * @param mixed $jed
     */
    private static function jedValid( $jed ):bool {
        return is_array($jed) && array_key_exists('locale_data',$jed) && is_array($jed['locale_data']) && $jed['locale_data'];
    }
    
    
    // Debug //



    /**
     * Alert to the early JIT loading issue for any text domain queried before we've seen it be loaded.
     */
    private function handle_unseen_textdomain( $domain ){
        if( ! array_key_exists($domain,$this->seen) ){
            $this->seen[$domain] = true;
            do_action('loco_unseen_textdomain',$domain);
        }
    }


    /**
     * `gettext` filter callback. Enabled only in Debug mode.
     */
    public function debug_gettext( $translation = '', $text = '', $domain = '' ){
        $this->handle_unseen_textdomain($domain?:'default');
        return $translation;
    }


    /**
     * `ngettext` filter callback. Enabled only in Debug mode.
     */
    public function debug_ngettext( $translation = '', $single = '', $plural = '', $number = 0, $domain = '' ){
        $this->handle_unseen_textdomain($domain?:'default');
        return $translation;
    }


    /**
     * `gettext_with_context` filter callback. Enabled only in Debug mode.
     */
    public function debug_gettext_with_context( $translation = '', $text = '', $context = '', $domain = '' ){
        $this->handle_unseen_textdomain($domain?:'default');
        return $translation;
    }


    /**
     * `ngettext_with_context` filter callback. Enabled only in Debug mode.
     */
    public function debug_ngettext_with_context( $translation = '', $single = '', $plural = '', $number = 0, $context = '', $domain = '' ){
        $this->handle_unseen_textdomain($domain?:'default');
        return $translation;
    }
    

}
