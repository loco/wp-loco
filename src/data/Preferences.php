<?php
/**
 * Data object persisted as a WordPress user meta entry under the loco_prefs key
 * 
 * @property string $credit Last-Translator credit, defaults to current display name
 * @property string[] $locales List of locales user wants to be restricted to seeing.
 */
class Loco_data_Preferences extends Loco_data_Serializable {

    /**
     * User preference singletons
     * @var array
     */
    private static $current = array();

    /**
     * ID of the currently operational user
     * @var int
     */    
    private $user_id = 0;

    /**
     * Available options and their defaults
     * @var array
     */
    private static $defaults = array (
        'credit' => '',
        'locales' => array(),
    );


    /**
     * Get current user's preferences
     * @return Loco_data_Preferences
     */
    public static function get(){
        $id = get_current_user_id();
        if( ! $id ){
            // allow null return only on command line. All web users must be logged in
            if( 'cli' === PHP_SAPI || defined('LOCO_TEST') ){
                return null;
            }
            throw new Exception( 'No current user' ); // @codeCoverageIgnore
        }
        if( isset(self::$current[$id]) ){
            return self::$current[$id];
        }
        $prefs = self::create($id);
        self::$current[$id] = $prefs;
        $prefs->fetch();
        return $prefs;
    }


    /**
     * Create default settings instance
     * @param int User ID
     * @return Loco_data_Preferences
     */
    public static function create( $id ){
        $prefs = new Loco_data_Preferences( self::$defaults );
        $prefs->user_id = $id;
        return $prefs;
    }


    /**
     * Destroy current user's preferences
     * @return void
     */
    public static function clear(){
        get_current_user_id() && self::get()->remove();
    }


    /**
     * Persist object in WordPress usermeta table
     * @return bool
     */
    public function persist(){
        return update_user_meta( $this->user_id, 'loco_prefs', $this->getSerializable() ) ? true : false;
    }


    /**
     * Retrieve and unserialize this object from WordPress usermeta table
     * @return bool whether object existed in cache
     */
    public function fetch(){
        $data = get_user_meta( $this->user_id, 'loco_prefs', true );
        // See comments in Loco_data_Settings
        if( is_array($data) ){
            $this->setUnserialized($data);
            $copy = new Loco_data_Preferences;
            $this->exchangeArray( $copy->getArrayCopy() + $this->getArrayCopy() );
            $this->clean();
            return true;
        }
        return false;
    }


    /**
     * Delete usermeta entry from WordPress
     * return bool
     */
    public function remove(){
        $id = $this->user_id;
        self::$current[$id] = null;
        return delete_user_meta( $id, 'loco_prefs' );
    }


    /**
     * Populate all settings from raw postdata. 
     * @param array
     * @return Loco_data_Preferences
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
        return $this;
    }


    /**
     * {@inheritdoc}
     */
    public function offsetSet( $prop, $value ){
        $value = parent::cast($prop,$value,self::$defaults);
        parent::offsetSet( $prop, $value );
    }
    

    /**
     * Get default Last-Translator credit
     * @return string
     */
    public function default_credit(){
        $user = wp_get_current_user();
        $name = (string) $user->get('display_name');
        if( $user->get('user_login') === $name ){
            $name = '';
        }
        return $name;
    }
    
    
    /**
     * Check if user wants to know about this locale
     * @param Loco_Locale locale to match in whitelist
     * @return bool
     */
    public function has_locale( Loco_Locale $locale ){
        $haystack = $this->locales;
        if( $haystack ){
            foreach( $haystack as $tag ){
                $tag = strtolower($tag);
                // allow language wildcard. en_GB allowed by "en" 
                if( $locale->lang === $tag ){
                    return true;
                }
                // else normalize whitelist before comparison
                if( Loco_Locale::parse($tag)->__toString() === $locale->__toString() ){
                    return true;
                }
            }
            return false;
        }
        return true;
    }

}