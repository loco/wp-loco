<?php
/**
 * 
 */
class Loco_api_WordPressTranslations {

    /**
     * Cache of data returned from get_available_languages (not cached by WP)
     * @var array
     */    
    private $installed;

    /**
     * Hash map of installed languages indexed by tag
     * @var array
     */
    private $installed_hash;


    /**
     * Wrap wp_get_available_translations
     * @return array
     */
    public function getAvailableCore(){
        if( ! function_exists('wp_get_available_translations') ){
            require_once ABSPATH.'wp-admin/includes/translation-install.php';
        }
        // WordPress will raise Warning if offline
        return wp_get_available_translations();
    }


    /**
     * Wrap get_available_languages
     * @return array
     */
    public function getInstalledCore(){
        // wp-includes/l10n.php should always be included at runtime
        if( ! is_array($this->installed) ){
            $this->installed = get_available_languages();
        }
        return $this->installed;
    }


    /**
     * @return array
     */
    private function getInstalledHash(){
        if( ! is_array($this->installed_hash) ){
            $this->installed_hash = array( 'en_US' => 1 ) + array_flip( $this->getInstalledCore() );
        }
        return $this->installed_hash;
    }


    /**
     * Check if a given locale is installed
     * @return bool
     */
    public function isInstalled( $locale ){
        return array_key_exists( (string) $locale, $this->getInstalledHash() );
    }


    /**
     * Get WordPress locale data by strictly well-formed language tag
     * @return array
     */
    public function getLocaleData( $tag ){
        $all = $this->getAvailableCore();
        return isset($all[$tag]) ? $all[$tag] : null;
    }



    /**
     * Get and populate a Locale object from a valid language tag
     * @return Loco_Locale
     */
    public function getLocale( $tag ){
        $obj = Loco_Locale::parse($tag);
        if( $obj->isValid() ){
            $obj->fetchName( $this );
        }
        return $obj;
    }
     
}
