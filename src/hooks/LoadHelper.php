<?php
/**
 * Text Domain loading helper.
 * Ensures custom translations can be loaded from `wp-content/languages/loco`.
 * This functionality is optional. You can disable the plugin if you're not loading MO or JSON files from languages/loco
 */
class Loco_hooks_LoadHelper extends Loco_hooks_Hookable {
    
    /**
     * theme/plugin text domain loading context in progress
     * @var string[] [ $subdir, $domain, $locale ]
     */
    private $context;

    /**
     * Protects against recursive calls to load_textdomain()
     * @var bool[]
     */    
    private $lock;

    /**
     * Custom/safe directory path with trailing slash
     * @var string
     */
    private $base;

    /**
     * Locations that can be mapped to equivalent paths under custom directory
     * @var array[]
     */
    private $map;

    /**
     * Deferred JSON files under our custom directory, indexed by script handle
     * @var string[]
     */
    private $json;
    

    /**
     * {@inheritDoc}
     */
    public function __construct(){
        parent::__construct();
        $this->lock = [];
        $this->json = [];
        $this->base = trailingslashit( loco_constant('LOCO_LANG_DIR') );
        // add system locations which have direct equivalent custom/safe locations under LOCO_LANG_DIR
        // not adding theme paths because as long as load_theme_textdomain is used they will be mapped by context.
        $this->add('', loco_constant('WP_LANG_DIR') )
             ->add('plugins/', loco_constant('WP_PLUGIN_DIR') )
             ->add('plugins/', loco_constant('WPMU_PLUGIN_DIR') );
    }


    /**
     * Add a mappable location
     * @param string $subdir
     * @param string $path
     * @return self
     */
    private function add( $subdir, $path ){
        if( $path ){
            $path = trailingslashit($path);
            $this->map[] = [ $subdir, $path, strlen($path) ];
        }
        return $this;
    }


    /**
     * Map a file directly from a standard system location to LOCO_LANG_DIR.
     * - this does not check if file exists, only what the path should be.
     * - this does not handle filename differences (so won't work with themes)
     * @param string $path e.g. {WP_CONTENT_DIR}/languages/plugins/foo or {WP_PLUGIN_DIR}/foo/anything/foo
     * @return string e.g. {WP_CONTENT_DIR}/languages/loco/plugins/foo
     */
    private function resolve( $path ){
        foreach( $this->map as $data ){
            list($subdir,$prefix,$len) = $data;
            if( substr($path,0,$len) === $prefix ){
                if( '' === $subdir ){
                    return $this->base.substr($path,$len);
                }
                return $this->base.$subdir.basename($path);
            }
        }
        return '';
    }


    /**
     * `theme_locale` filter callback.
     * Signals the beginning of a "load_theme_textdomain" process
     * @param string $locale
     * @param string $domain
     * @return string
     */
    public function filter_theme_locale( $locale, $domain = '' ){
        $this->context = [ 'themes/', $domain, $locale ];
        unset( $this->lock[$domain] );
        return $locale;
    }


    /**
     * `plugin_locale` filter callback.
     * Signals the beginning of a "load_plugin_textdomain" process
     * @param string $locale
     * @param string $domain
     * @return string
     */
    public function filter_plugin_locale( $locale, $domain = '' ){
        $this->context = [ 'plugins/', $domain, $locale ];
        unset( $this->lock[$domain] );
        return $locale;
    }


    /**
     * `unload_textdomain` action callback.
     * Lets us release lock so that custom file may be loaded again (hopefully for another locale)
     * @param string $domain
     * @return void
     */
    public function on_unload_textdomain( $domain ){
        unset( $this->lock[$domain] );
    }


    /**
     * `load_textdomain` action callback.
     * Lets us load our custom translations before WordPress loads what it had already decided to load.
     * We're deliberately not stopping WordPress loading $mopath, if it exists it will be merged on top of our custom strings.
     * @param string $domain
     * @param string $mopath
     * @return void
     */
    public function on_load_textdomain( $domain, $mopath ){
        $key = '';
        // domains may be split into multiple files
        $name = pathinfo( $mopath, PATHINFO_FILENAME );
        if( $lpos = strrpos( $name, '-') ){
            $slug = substr( $name, 0, $lpos );
            if( $slug !== $domain ){
                $key = $slug;
            }
        }
        // avoid recursion when we've already handled this domain/slug
        if( isset($this->lock[$domain][$key]) ){
            return;
        }
        // if context is set, then a theme or plugin initialized the loading process properly
        if( is_array($this->context) ){
            list( $subdir, $_domain, $locale ) = $this->context;
            $this->context = null;
            if( $_domain !== $domain ){
                return;
            }
            $mopath = $this->base.$subdir.$domain.'-'.$locale.'.mo';
        }
        // else load_textdomain must have been called directly, including to load core domain
        else {
            $mopath = $this->resolve($mopath);
            if( '' === $mopath ){
                return;
            }
        }
        // Load our custom translations avoiding recursion back into this hook
        $this->lock[$domain][$key] = true;
        load_textdomain( $domain, $mopath );
    }


    /*
     * `load_script_translation_file` filter callback
     * Alternative method to merging in `pre_load_script_translations`
     * @param string|false candidate JSON file (false on final attempt)
     * @param string
     * @return string
     */
    public function filter_load_script_translation_file( $path = '', $handle = '' ){
        // currently handle-based JSONs for author-provided translations will never map.
        if( is_string($path) && preg_match('/^-[a-f0-9]{32}\\.json$/',substr($path,-38) ) ){
            $custom = $this->resolve($path);
            if( $custom && is_readable($custom) ){
                // Defer until either JSON is resolved or final attempt passes an empty path.
                $this->json[$handle] = $custom;
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
     * @param string $json contents of JSON file that WordPress has read 
     * @param string $path path relating to given JSON (not used here)
     * @param string $handle script handle for registered merge
     * @return string final JSON translations
     * @noinspection PhpUnusedParameterInspection
     */
    public function filter_load_script_translations( $json = '', $path = '', $handle = '' ){
        if( array_key_exists($handle,$this->json) ){
            $path = $this->json[$handle];
            unset( $this->json[$handle] );
            $json = self::mergeJson( $json, file_get_contents($path) );
        }
        return $json;
    }


    /**
     * Merge two JSON translation files such that custom strings override
     * @param string $json Original/fallback JSON
     * @param string $custom Custom JSON (must exclude empty keys)
     * @return string Merged JSON
     */
    private static function mergeJson( $json, $custom ){
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
     * @param array $jed
     * @return bool
     */
    private static function jedValid( $jed ){
        return is_array($jed) &&  array_key_exists('locale_data',$jed) && is_array($jed['locale_data']) && $jed['locale_data'];
    }


    /*
     * Alternative merging method using `script_loader_tag` filter callback.
     * We could load two JSONs via two calls to wp.i18n.setLocaleData BUT WordPress closure makes it difficult/unreliable.
     * @param string candidate JSON file
     * @param string
     * @param string
     * @return string
     *
    public function filter_script_loader_tag( $tag = '', $handle = '', $src = '' ){
        if( array_key_exists($handle,$this->json) ){
            $json = file_get_contents($this->json[$handle] );
            unset($this->json[$handle]);
            // splice custom translations between original ones and the script they're attached to.
            list( $foo, $bar ) = explode('</script>',$tag,2);
            $tag = $foo."\n console.log({$json});</script>".$bar;
        }
        return $tag;
    }*/
    
}
