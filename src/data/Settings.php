<?php
/**
 * Global plugin settings stored in a single WordPress site option.
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
    private static $defaults = array (
        // current plugin version installed
        'version' => '',
        // whether to compile hash table into MO files
        'gen_hash' => false,
        // whether to include Fuzzy strings in MO files
        'use_fuzzy' => true,
        // number of backups to keep of Gettext files
        'num_backups' => 1,
        // alternative names for POT files in priority order
        'pot_alias' => array( 'default.po', 'en_US.po', 'en.po' ),
        // alternative file extensions for PHP files
        'php_alias' => array( 'php' ),
        // whether to remember file system credentials in session
        'fs_persist' => false,
        // skip PHP source files this size or larger
        'max_php_size' => '100K',
        // whether to prepend PO and POT files with UTF-8 byte order mark
        'po_utf8_bom' => false,
        /*/ Legacy options from 1.x branch:
        // whether to use external msgfmt command (1), or internal (default)
        'use_msgfmt' => false,
        // which external msgfmt command to use
        'which_msgfmt' => '',
        // whether to enable core package translation
        'enable_core' => false,*/
    );


    
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
     * @override
     */
    public function offsetSet( $prop, $value ){
        if( ! isset(self::$defaults[$prop]) ){
            throw new InvalidArgumentException('Invalid option, '.$prop );
        }
        $default = self::$defaults[$prop];
        // cast to same type as default
        if( is_bool($default) ){
            $value = (bool) $value;
        }
        else if( is_int($default) ){
            $value = (int) $value;
        }
        else if( is_array($default) ){
            if( ! is_array($value) ){
                // TODO use a standard CSV split for array values?
                $value = preg_split( '/[\s,]+/', trim($value), -1, PREG_SPLIT_NO_EMPTY );
            }
        }
        else {
            $value = (string) $value;
        }
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
        if( $data = get_option('loco_settings') ){
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
     * @return bool whether upgrade has occured
     */
    public function migrate(){
        $existed = (bool) get_option('loco_settings');
        // Populate new format from legacy 1.x options, but only on first run
        if( ! $existed ){
            $this->gen_hash = get_option('loco-translate-gen_hash','0');
            $this->use_fuzzy = get_option('loco-translate-use_fuzzy', '1' );
            $this->num_backups = get_option('loco-translate-num_backups','1');
            $this->persist();
        }
        // currently the only upgrade could be 1.x => 2.0
        // deliberately keeping the old options due to legacy switching feature
        return ! $existed;
    }
    


    /**
     * Populate all settings from raw postdata. 
     * @return Loco_data_Settings
     */
    public function populate( array $data ){
        // set all keys present in array
        foreach( $data as $prop => $value ){
            try {
                $this->offsetSet( $prop, $value );
            }
            catch( InvalidArgumentException $e ){
                // skipping invalid key
            }
        }
        // set missing boolean keys as false, because checkboxes
        if( $missing = array_diff_key(self::$defaults,$data) ){
            foreach( $missing as $prop => $default ){
                if( is_bool($default) ){
                    parent::offsetSet( $prop, false );
                }
                
            }
        }
        // enforce missing values that must have default
        foreach( array('php_alias','max_php_size') as $prop ){
            if( isset($data[$prop]) && '' === $data[$prop] ){
                parent::offsetSet( $prop, self::$defaults[$prop] );
            }
        }

        return $this;
    }

}
