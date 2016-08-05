<?php
/**
 * Text Domain loading helper.
 * Allows MO files to be loaded in a custom order from alternative locations.
 * 
 * This functionality is entirely optional. Disable the plugin if you don't want it.
 */
class Loco_hooks_LoadHelper extends Loco_hooks_Hookable {
    
    /**
     * @var array [ $subdir, $domain, $locale ]
     */
    private $context;

    /**
     * @var bool
     */    
    private $lock;


    /**
     * `theme_locale` filter callback.
     * Signals the beginning of a "load_theme_textdomain" process
     */    
    public function filter_theme_locale( $locale, $domain ){
        $this->context = array( 'themes', $domain, $locale );
        return $locale;
    }



    /**
     * `plugin_locale` filter callback.
     * Signals the beginning of a "load_plugin_textdomain" process
     */    
    public function filter_plugin_locale( $locale, $domain ){
        $this->context = array( 'plugins', $domain, $locale );
        return $locale;
    }



    /**
     * Hook allows us to interupt the text domain loading process and change the order files are attempted
     * @return bool whether to stop WordPress loading the passed file
     */
    public function filter_override_load_textdomain( $plugin_override, $domain, $mopath ){
        // avoid recursion when we are in our own loading loop
        if( $this->lock ){
            return false;
        }
        // if some other process has modified override, we should honour it
        if( $plugin_override ){
            return true;
        }
        // roots
        $wp_lang_dir = trailingslashit( loco_constant('WP_LANG_DIR') );
        $lc_lang_dir = trailingslashit( loco_constant('LOCO_LANG_DIR') );

        // if context is set, then theme or plugin initialized loading process
        if( is_array($this->context) ){
            list( $subdir, $_domain, $locale ) = $this->context;
            $this->context = null;
            // It shouldn't be possible to catch a different domain after setting context, but we'd better bail just in case
            if( $_domain !== $domain ){
                return false;
            }
            // ensure official translations loaded first, but let custom strings override auto-updates
            $order = array (
                $mopath,
                $lc_lang_dir.$subdir.'/'.$domain.'-'.$locale.'.mo',
                $wp_lang_dir.$subdir.'/'.$domain.'-'.$locale.'.mo',
            );
        }

        // else load_textdomain must have been called directly.
        else {
            $snip = strlen($wp_lang_dir);
            // direct file loads should be under WP_LANG_DIR
            if( substr( dirname($mopath).'/', 0, $snip ) === $wp_lang_dir ){
                $order = array (
                    substr_replace( $mopath, $lc_lang_dir, 0, $snip ),
                    $mopath,
                );
            }
            // else no way to map files from WP_LANG_DIR to LOCO_LANG_DIR
            else {
                $order = array( $mopath );
            }
        }
        
        // permit themes/plugins to modify the default loading order
        $order = apply_filters( 'loco_load_textdomain_order', $order, $domain );

        // recursively call load_textdomain with a lock on this process
        // the first file that exists should be loaded, unless something else interferes with the mofile path
        $this->lock = true;
        foreach( $order as $mopath ){
            if( load_textdomain( $domain, $mopath ) ){
                break;
            }
        }

        // release lock and terminiate previous loading thread
        $this->lock = false;
        return true;
    }



}