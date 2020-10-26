<?php
/**
 * Third party API helpers
 */
abstract class Loco_api_Providers {


    /**
     * Export API credentials for all supported APIs
     * @return array[]
     */
    public static function export(){
        return apply_filters( 'loco_api_providers', self::builtin() );
    }
    
    
    /**
     * @return array[]
     */
    public static function builtin(){
        $settings = Loco_data_Settings::get();
        return array (
            array (
                'id' => 'deepl',
                'name' => 'DeepL Translator',
                'key' => $settings->offsetGet('deepl_api_key'),
            ),
            array (
                'id' => 'google',
                'name' => 'Google Translate',
                'key' => $settings->offsetGet('google_api_key'),
            ),
            array (
                'id' => 'microsoft',
                'name' => 'Microsoft Translator',
                'key' => $settings->offsetGet('microsoft_api_key'),
                'region' => $settings->offsetGet('microsoft_api_region'),
            ),
            array (
                'id' => 'yandex',
                'name' => 'Yandex.Translate',
                'key' => $settings->offsetGet('yandex_api_key'),
            ),
        );
    }
    
    
    /**
     * Get only configured APIs, and sort them fairly
     * @return array[]
     */
    public static function configured(){
        $apis = array_filter( self::export(), array(__CLASS__,'filterConfigured') );
        usort( $apis, array(__CLASS__,'compareNames') );
        return $apis;
    }


    /**
     * @internal
     * @param string[]
     * @return bool
     */
    private static function filterConfigured( array $api ){
        return array_key_exists('key',$api) && is_string($api['key']) && '' !== $api['key'];
    }


    /**
     * @internal
     * @param string[]
     * @param string[]
     * @return bool
     */
    private static function compareNames( array $a, array $b ){
        return strcasecmp($a['name'],$b['name']);
    }

}
