<?php
/**
 * Text Domain loading helper.
 * Ensures custom translations can be loaded from `wp-content/languages/loco`.
 * This functionality is optional. You can disable the plugin if you're not loading MO files from languages/loco
 */
class Loco_hooks_LoadHelper extends Loco_hooks_Hookable {
    
    /**
     * @var array [ $subdir, $domain, $locale ]
     */
    private $context;

    /**
     * @var array
     */    
    private $lock = array();


    /**
     * `theme_locale` filter callback.
     * Signals the beginning of a "load_theme_textdomain" process
     */    
    public function filter_theme_locale( $locale, $domain = '' ){
        $this->context = array( 'themes', $domain, $locale );
        unset( $this->lock[$domain] );
        return $locale;
    }



    /**
     * `plugin_locale` filter callback.
     * Signals the beginning of a "load_plugin_textdomain" process
     */
    public function filter_plugin_locale( $locale, $domain = '' ){
        $this->context = array( 'plugins', $domain, $locale );
        unset( $this->lock[$domain] );
        return $locale;
    }


    /**
     * `unload_textdomain` action callback.
     * Lets us release lock so that custom file may be loaded again (hopefully for another locale)
     */
    public function on_unload_textdomain( $domain ){
        unset( $this->lock[$domain] );
    }



    /**
     * `load_textdomain` action callback.
     * Lets us load our custom translations before WordPress loads what it was going to anyway.
     * We're deliberately not stopping WordPress loading $mopath, if it exists it will be merged on top of our custom strings.
     * @return void
     */
    public function on_load_textdomain( $domain, $mopath ){
        // avoid recursion when we've already handled this domain
        if( $this->lock && isset($this->lock[$domain]) ){
            return;
        }
        // language roots
        $wp_lang_dir = trailingslashit( loco_constant('WP_LANG_DIR') );
        $lc_lang_dir = trailingslashit( loco_constant('LOCO_LANG_DIR') );

        // if context is set, then a theme or plugin initialized the loading process properly
        if( is_array($this->context) ){
            list( $subdir, $_domain, $locale ) = $this->context;
            $this->context = null;
            // It shouldn't be possible to catch a different domain after setting context, but we'd better bail just in case
            if( $_domain !== $domain ){
                return;
            }
            $mopath = $lc_lang_dir.$subdir.'/'.$domain.'-'.$locale.'.mo';
        }

        // else load_textdomain must have been called directly to bypass locale filters
        else {
            $snip = strlen($wp_lang_dir);
            // direct file loads must be under WP_LANG_DIR if we are to map them
            if( substr( dirname($mopath).'/', 0, $snip ) === $wp_lang_dir ){
                $mopath = substr_replace( $mopath, $lc_lang_dir, 0, $snip );
            }
            // else no way to map files from WP_LANG_DIR to LOCO_LANG_DIR
            else {
                return;
            }
        }
        
        // Load our custom translations avoiding recursion back into this hook
        $this->lock[$domain] = true;
        load_textdomain( $domain, $mopath );
    }

}