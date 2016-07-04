<?php
/**
 * 
 */
class Loco_api_WordPressTranslations {
    
    /**
     * @internal
     */
    private static function wp_depend( $func ){
        if( ! function_exists($func) ){
            require_once ABSPATH.'wp-admin/includes/translation-install.php';
        }
    }



    /**
     * Wrap wp_get_available_translations
     * @return 
     */
    public function getAvailableCore(){
        self::wp_depend('wp_get_available_translations');
        return wp_get_available_translations();
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
