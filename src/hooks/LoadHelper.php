<?php
/**
 * Text Domain loading helper.
 * Ensures custom translations can be loaded from `wp-content/languages/loco`.
 * This functionality is optional. You can disable the plugin if you're not loading MO files from languages/loco
 */
class Loco_hooks_LoadHelper extends Loco_hooks_Hookable {
    
    /**
     * @var string[] [ $subdir, $domain, $locale ]
     */
    private $context;

    /**
     * @var bool[]
     */    
    private $lock;

    /**
     * @var string
     */
    private $base;

    /**
     * @var array[]
     */
    private $map;
    

    /**
     * {@inheritDoc}
     */
    public function __construct(){
        parent::__construct();
        $this->lock = array();
        $this->base = trailingslashit( loco_constant('LOCO_LANG_DIR') );
        // add system locations which have direct equivalent custom/safe locations under LOCO_LANG_DIR
        // not adding theme paths because as long as load_theme_textdomain is used they will be mapped by context.
        $this->add('', loco_constant('WP_LANG_DIR') )
             ->add('plugins/', loco_constant('WP_PLUGIN_DIR') )
             ->add('plugins/', loco_constant('WPMU_PLUGIN_DIR') );
    }


    /**
     * Add a mappable location
     * @param string
     * @param string
     * @return self
     */
    private function add( $subdir, $path ){
        if( $path ){
            $path = trailingslashit($path);
            $this->map[] = array( $subdir, $path, strlen($path) );
        }
        return $this;
    }


    /**
     * Map a file directly from a standard system location to LOCO_LANG_DIR.
     * - this does not check if file exists, only what the path should be.
     * - this does not handle filename differences (so won't work with themes)
     * @param string e.g. {WP_CONTENT_DIR}/languages/plugins/foo or {WP_PLUGIN_DIR}/foo/anything/foo
     * @return string e.g. {WP_CONTENT_DIR}/languages/loco/plugins/foo
     */
    private function resolve( $path ){
        foreach( $this->map as $key => $data ){
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
     * @param string
     * @param string
     * @return string
     */
    public function filter_theme_locale( $locale, $domain = '' ){
        $this->context = array( 'themes/', $domain, $locale );
        unset( $this->lock[$domain] );
        return $locale;
    }


    /**
     * `plugin_locale` filter callback.
     * Signals the beginning of a "load_plugin_textdomain" process
     * @param string 
     * @param string
     * @return string
     */
    public function filter_plugin_locale( $locale, $domain = '' ){
        $this->context = array( 'plugins/', $domain, $locale );
        unset( $this->lock[$domain] );
        return $locale;
    }


    /**
     * `unload_textdomain` action callback.
     * Lets us release lock so that custom file may be loaded again (hopefully for another locale)
     * @param string
     * @return void
     */
    public function on_unload_textdomain( $domain ){
        unset( $this->lock[$domain] );
    }


    /**
     * `load_textdomain` action callback.
     * Lets us load our custom translations before WordPress loads what it was going to anyway.
     * We're deliberately not stopping WordPress loading $mopath, if it exists it will be merged on top of our custom strings.
     * @param string
     * @param string
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


    /**
     * `pre_load_script_translations` filter callback.
     * This allows us to merge custom JSON on top of installed version, but requires decode/encode.
     * Alternative method would be to listen on `script_loader_tag` and splice raw json string.
     * https://developer.wordpress.org/reference/hooks/pre_load_script_translations/
     * @param null
     * @param string|false
     * @param string script handle
     * @param string e.g "default"
     * @return string|null
     */
    public function filter_pre_load_script_translations( $json = null, $path = '', $handle = '', $domain = '' ){
        if( is_null($json) && is_string($path) && preg_match('/^-[a-f0-9]{32}\\.json$/',substr($path,-38) ) ){
            $custom = $this->resolve($path);
            if( $custom && is_readable($custom) ){
                $json = file_get_contents($custom);
                if( is_readable($path) ){
                    // merge in PHP, noting that our JED excludes empty keys
                    $a = json_decode(file_get_contents($path),true);
                    $b = json_decode($json,true);
                    if( is_array($a) && is_array($b) ){
                        // key is probably "messages" instead of domain, but could change in wp-cli/i18n-command
                        $key = key($a['locale_data']);
                        $a['locale_data'][$key] = $b['locale_data'][$domain] + $a['locale_data'][$key];
                        $json = json_encode($a);
                    }
                }
            }
        }
        return $json;
    }


    /*
     * `load_script_translation_file` filter callback
     * Alternative method to merging in `pre_load_script_translations`
     * @param string candidate JSON file
     * @param string
     * @return string
     *
    public function filter_load_script_translation_file( $path = '', $handle = '' ){
        // currently handle-based JSONs, for author-provided translations will never map
        if( is_string($path) && preg_match('/^-[a-f0-9]{32}\\.json$/',substr($path,-38) ) ){
            $custom = $this->resolve($path);
            if( $custom && is_readable($custom) ){
                // WordPress should continue to load original file if it exists. we will merge on top.
                if( is_readable($path) ){
                    $this->merge[$handle] = $custom;
                    return $path;
                }
                // else return our own instead
                return $custom;
            }
        }
        return $path;
    }*/


    /*
     * `script_loader_tag` filter callback
     * @param string candidate JSON file
     * @param string
     * @param string
     * @return string
     *
    public function filter_script_loader_tag( $tag = '', $handle = '', $src = '' ){
        if( array_key_exists($handle,$this->merge) ){
            $json = file_get_contents($this->merge[$handle] );
            unset($this->merge[$handle]);
            // splice custom translations between original ones and the script they're attached to.
            // note that any other modifications to the script via other filters will break this. 
            list( $foo, $bar ) = explode('</script>',$tag,2);
            $tag = $foo."\nconsole.log({$json});</script>".$bar;
        }
        return $tag;
    }*/
    
}
