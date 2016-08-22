<?php
/**
 * 
 */
class Loco_api_WordPressTranslations {
    
    /**
     * @var array
     */    
    private $installed;

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
     * Check if a given locale is installed
     * @return bool
     */
    public function isInstalled( $locale ){
        if( ! isset($this->installed) ){
            // wp-includes/l10n.php should always be included at runtime
            $this->installed = array( 'en_US' => 1 ) + array_flip( get_available_languages() );
        }
        return array_key_exists( (string) $locale, $this->installed );
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
