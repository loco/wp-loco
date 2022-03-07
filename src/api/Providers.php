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
        return  [
             [
                'id' => 'deepl',
                'name' => 'DeepL Translator',
                'key' => $settings->offsetGet('deepl_api_key'),
                'url' => $settings->offsetGet('deepl_api_url'),
            ],
             [
                'id' => 'google',
                'name' => 'Google Translate',
                'key' => $settings->offsetGet('google_api_key'),
            ],
             [
                'id' => 'microsoft',
                'name' => 'Microsoft Translator',
                'key' => $settings->offsetGet('microsoft_api_key'),
                'region' => $settings->offsetGet('microsoft_api_region'),
            ],
             [
                'id' => 'lecto',
                'name' => 'Lecto AI',
                'key' => $settings->offsetGet('lecto_api_key'),
            ],
        ];
    }
    
    
    /**
     * Get only configured APIs, and sort them fairly
     * @return array[]
     */
    public static function configured(){
        return self::sort( array_filter( self::export(), [__CLASS__,'filterConfigured'] ) );
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
     * @return int
     */
    private static function compareNames( array $a, array $b ){
        return strcasecmp($a['name'],$b['name']);
    }
    
    
    /**
     * Sort providers alphabetically
     * @param array
     * @return array
     */
    public static function sort( array $apis ){
        usort( $apis, [__CLASS__,'compareNames'] );
        return $apis;
    }

}
