<?php
/**
 * Global plugin settings stored in a single WordPress site option.
 * 
 * @property string $version Current plugin version installed
 * @property bool $gen_hash Whether to compile hash table into MO files
 * @property bool $use_fuzzy Whether to include Fuzzy strings in MO files
 * @property int $fuzziness Fuzzy matching tolerance level, 0-100
 * @property int $num_backups Number of backups to keep of Gettext files
 * @property array $pot_alias Alternative names for POT files in priority order
 * @property array $php_alias Alternative file extensions for PHP files
 * @property array $jsx_alias Registered extensions for scanning JavaScript/JSX files (disabled by default)
 * @property bool $fs_persist Whether to remember file system credentials in session
 * @property int $fs_protect Prevent modification of files in system folders (0:off, 1:warn, 2:block)
 * @property int $pot_protect Prevent modification of POT files (0:off, 1:warn, 2:block)
 * @property int $pot_expected Whether to allow missing templates and sync to source (0:off, 1:warn, 2:block) 
 * @property string $max_php_size Skip PHP source files this size or larger
 * @property bool $po_utf8_bom Whether to prepend PO and POT files with UTF-8 byte order mark
 * @property string $po_width PO/POT file maximum line width (wrapping) zero to disable
 * @property bool $jed_pretty Whether to pretty print JSON JED files
 * @property bool $jed_clean Whether to clean up redundant JSON files during compilation
 * @property bool $ajax_files Whether to submit PO data as concrete files (requires Blob support in Ajax)
 *
 * @property string $deepl_api_key API key for DeepL Translator
 * @property string $google_api_key API key for Google Translate
 * @property string $lecto_api_key API key for Lecto Translation API
 * @property string $microsoft_api_key API key for Microsoft Translator text API
 * @property string $microsoft_api_region API region for Microsoft Translator text API
 *
 */
class Loco_data_Settings extends Loco_data_Serializable {

    /**
     * Global instance of this plugin's settings
     * @var Loco_data_Settings
     */
    private static $current;


    /**
     * Available options and their defaults
     * @var array
     */
    private static $defaults =  [
        'version' => '',
        'gen_hash' => false,
        'use_fuzzy' => true,
        'fuzziness' => 20,
        'num_backups' => 5,
        'pot_alias' => [ 'default.po', 'en_US.po', 'en.po' ],
        'php_alias' => [ 'php', 'twig' ],
        'jsx_alias' => [],
        'fs_persist' => false,
        'fs_protect' => 1,
        'pot_protect' => 1,
        'pot_expected' => 1,
        'max_php_size' => '100K',
        'po_utf8_bom' => false,
        'po_width' => '79',
        'jed_pretty' => false,
        'jed_clean' => false,
        'ajax_files' => true,
        'deepl_api_key' => '',
        'google_api_key' => '',
        'microsoft_api_key' => '',
        'microsoft_api_region' => 'global',
        'lecto_api_key' => '',
    ];


    /**
     * Create default settings instance
     * @return Loco_data_Settings
     */
    public static function create(){
        $args = self::$defaults;
        $args['version'] = loco_plugin_version();
        return new Loco_data_Settings( $args );
    }


    /**
     * Get currently configured global settings
     * @return Loco_data_Settings
     */
    public static function get(){
        $opts = self::$current;
        if( ! $opts ){
            $opts = self::create();
            $opts->fetch();
            self::$current = $opts;
            // allow hooks to modify settings
            do_action('loco_settings', $opts );
        }
        return $opts;
    }


    /**
     * Destroy current settings
     * @return void
     */
    public static function clear(){
        delete_option('loco_settings');
        self::$current = null;
    }


    /**
     * Destroy current settings and return a fresh one
     * @return Loco_data_Settings
     */
    public static function reset(){
        self::clear();
        return self::$current = self::create();
    }


    /**
     * {@inheritdoc}
     */
    public function offsetSet( $prop, $value ){
        $value = parent::cast($prop,$value,self::$defaults);
        parent::offsetSet( $prop, $value );
    }


    /**
     * Commit current settings to WordPress DB
     * @return bool
     */
    public function persist(){
        $this->version = loco_plugin_version();
        $this->clean();
        return update_option('loco_settings', $this->getSerializable() );
    }


    /**
     * Pull current settings from WordPress DB and merge into this object
     * @return bool whether settings where previously saved
     */
    public function fetch(){
        $data = get_option('loco_settings');
        if( is_array($data) ){
            $copy = new Loco_data_Settings;
            $copy->setUnserialized($data);
            // preserve any defaults not in previously saved data
            // this will occur if we've added options since setting were saved
            $data = $copy->getArrayCopy() + $this->getArrayCopy();
            // could ensure redundant keys are removed, but no need currently
            // $data = array_intersect_key( $data, self::$defaults );
            $this->exchangeArray( $data );
            $this->clean();
            return true;
        }
        return false;
    }


    /**
     * Run migration in case plugin has been upgraded since settings last saved
     * @return bool whether upgrade has occurred
     */
    public function migrate(){
        $updated = false;
        // Always update version number in settings after an upgrade
        $old = $this->version;
        $new = loco_plugin_version();
        if( version_compare($old,$new,'<') ){
            $this->persist();
            $updated = true;
            /*/ feature alerts:
            if( '2.6.' === substr($new,0,4) && '2.6.' !== substr($old,0,4) ){
                Loco_error_AdminNotices::info( __('Loco Translate 2.6 adds ......','loco-translate') )
                   ->addLink( apply_filters('loco_external','https://localise.biz/wordpress/plugin/changelog'), __('Documentation','loco-translate') );
            }*/
        }
        return $updated;
    }


    /**
     * Populate ALL settings from raw postdata.
     * @param array $data Posted setting values
     * @param array|null $filter Optional filter to restrict modifiable values
     * @return Loco_data_Settings
     */
    public function populate( array $data, $filter = null ){
        // set all keys present in posted data
        foreach( $data as $prop => $value ){
            try {
                if( is_null($filter) || in_array($prop,$filter,true) ) {
                    $this->offsetSet( $prop, $value );
                }
            }
            catch( InvalidArgumentException $e ){
                // skipping invalid key
            }
        }
        // set missing boolean keys as false, because unchecked checkboxes won't post anything
        $defaults = self::$defaults;
        if( is_array($filter) ){
            $defaults = array_intersect_key( array_flip($filter) ,$defaults);
        }
        foreach( array_diff_key($defaults,$data) as $prop => $default ){
            if( is_bool($default) ){
                parent::offsetSet( $prop, false );
            }
        }
        // enforce missing values that must have a default, but were passed empty
        foreach( ['php_alias','max_php_size','po_width'] as $prop ){
            if( isset($data[$prop]) && '' === $data[$prop] ){
                parent::offsetSet( $prop, self::$defaults[$prop] );
            }
        }

        return $this;
    }


    /**
     * Map a file extension to registered types, defaults to "php"
     * @param string $ext File extension
     * @return string php, js or twig
     */
    public function ext2type($ext){
        $ext = strtolower($ext);
        $types = array_fill_keys( $this->jsx_alias, 'js' );
        $types['twig'] = 'twig'; // <- temporary hack in lieu of dedicated twig extractor
        return isset($types[$ext]) ? $types[$ext] : 'php';
    }
   
}
