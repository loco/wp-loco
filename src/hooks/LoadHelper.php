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
    private $wp_lang_dir;

    /**
     * @var string
     */
    private $lc_lang_dir;

    /**
     * {@inheritDoc}
     */
    public function __construct(){
        parent::__construct();
        $this->lock = array();
        $this->wp_lang_dir = trailingslashit( loco_constant('WP_LANG_DIR') );
        $this->lc_lang_dir = trailingslashit( loco_constant('LOCO_LANG_DIR') );
    }


    /**
     * `theme_locale` filter callback.
     * Signals the beginning of a "load_theme_textdomain" process
     * @param string
     * @param string
     * @return string
     */
    public function filter_theme_locale( $locale, $domain = '' ){
        $this->context = array( 'themes', $domain, $locale );
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
        $this->context = array( 'plugins', $domain, $locale );
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
            $mopath = $this->lc_lang_dir.$subdir.'/'.$domain.'-'.$locale.'.mo';
        }
        // else load_textdomain must have been called directly to bypass locale filters
        else {
            $mopath = $this->map($mopath);
            if( '' === $mopath ){
                return;
            }
        }
        // Load our custom translations avoiding recursion back into this hook
        $this->lock[$domain][$key] = true;
        load_textdomain( $domain, $mopath );
    }


    /**
     * Map a file directly from a standard system location to LOCO_LANG_DIR
     * @param string e.g. {WP_CONTENT_DIR}/languages/plugins/foo
     * @return string e.g. {WP_CONTENT_DIR}/languages/loco/plugins/foo
     */
    private function map( $path ){
        $snip = strlen($this->wp_lang_dir);
        if( substr( dirname($path).'/', 0, $snip ) === $this->wp_lang_dir ){
            return substr_replace( $path, $this->lc_lang_dir, 0, $snip );
        }
        // TODO check plugin/theme folders, accounting for legacy theme naming convention
        return '';
    }
    
    


    /**
     * `load_script_translation_file` filter callback
     * @param string
     * @param string
     * @param string
     * @return string
     *
    public function filter_load_script_translation_file( $file = '', $handle = '', $domain = '' ){
        if( is_string($file) && '' !== $file ){
            
        }
        return $file;
    }*/

}
