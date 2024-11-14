<?php
/**
 * Text Domain loading helper.
 * Ensures custom translations can be loaded from `wp-content/languages/loco`.
 * This functionality is optional. You can disable the plugin if you're not loading MO or JSON files from languages/loco
 * 
 * @noinspection PhpUnusedParameterInspection
 * @noinspection DuplicatedCode
 * @noinspection PhpUnused
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
     * Filter callback for `pre_get_language_files_from_path`
     * Called from {@see WP_Textdomain_Registry::get_language_files_from_path}
     * Path will be either WP_LANG_DIR/plugins', WP_LANG_DIR/themes or a user-defined location
     */
    public function filter_pre_get_language_files_from_path( $files, $path ){
        $len = strlen( loco_constant('WP_LANG_DIR') );
        $rel = substr($path,$len);
        if( '/' !== $rel && '/plugins/' !== $rel && '/themes/' !== $rel ){
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
        return $files;
    }


    /**
     * Filter callback for `lang_dir_for_domain`
     * Called from {@see WP_Textdomain_Registry::get} after path is obtained from {@see WP_Textdomain_Registry::get_path_from_lang_dir}
     */
    public function filter_lang_dir_for_domain( $path, $domain, $locale ){
        // If path is false it means no system or author files were found. This will stop WordPress trying to load anything.
        // Usually this occurs during true JIT loading, where an author path would not be set by e.g. load_plugin_textdomain.
        if( false === $path ){
            $base = loco_constant('LOCO_LANG_DIR');
            foreach( ['/plugins/','/themes/'] as $type ){
                if( self::try_readable($base.$type.$domain.'-'.$locale.'.mo') ){
                    $path = $base.$type;
                    break;
                }
            }
        }
        return $path;
    }


    /**
     * Filter callback for `load_translation_file`
     * Called from {@see load_textdomain}
     */
    public function filter_load_translation_file( $file, $domain, $locale ){
        // loading a custom file directly is fine
        $path = dirname($file).'/';
        $custom = loco_constant('LOCO_LANG_DIR').'/';
        if( $path === $custom || str_starts_with($file,$custom) ){
            return $file;
        }
        // map system file to custom location if possible. e.g. languages/foo => languages/loco/foo
        // this will account for most installed translations which have been customized.
        $system = loco_constant('WP_LANG_DIR').'/';
        if( str_starts_with($file,$system) ){
            $mapped = substr_replace($file,$custom,0,strlen($system) );
        }
        // custom path may be author location, meaning it's under plugin or theme directories
        else if( array_key_exists($path,$this->custom) ){
            $ext = explode('.', basename($file), 2 )[1];
            $mapped = $custom.$this->custom[$path].'/'.$domain.'-'.$locale.'.'.$ext;
        }
        else {
            return $file;
        }
        // recursion is fine due to first clause in this function
        $mapped = self::try_readable($mapped);
        if( $mapped ){
            load_textdomain( $domain, $mapped, $locale );
        }
        return $file;
    }


    private static function try_readable( $path ){
        if( is_readable($path) ){
            return $path;
        }
        // fall back to .mo if .l10n.php doesn't exist, and vise versa.
        $ext = substr($path,-3);
        if( '.mo' === $ext ){
            $path = substr($path,0,-2).'l10n.php';
        }
        else {
            $path = substr($path,0,-8).'mo';
        }
        if( is_readable($path) ){
            return $path;
        }
        return '';
    }
    
    
    
    // JSON //


    /**
     * `load_script_translation_file` filter callback
     * Alternative method to merging in `pre_load_script_translations`
     * @param string|false $path candidate JSON file (false on final attempt)
     * @param string $handle
     * @return string
     */
    public function filter_load_script_translation_file( $path = '', $handle = '' ){
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
     * @param array[] $jed
     * @return bool
     */
    private static function jedValid( $jed ){
        return is_array($jed) && array_key_exists('locale_data',$jed) && is_array($jed['locale_data']) && $jed['locale_data'];
    }
    

}
