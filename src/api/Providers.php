<?php
/**
 * Third party API helpers
 */
abstract class Loco_api_Providers {


    /**
     * Export API credentials for all supported APIs
     * @return array[]
     */
    public static function export():array {
        $apis = [];
        foreach( self::builtin() as $a ){
            $hook = 'loco_api_provider_'.$a['id'];
            $apis[] = apply_filters($hook, $a );
        }
        return apply_filters( 'loco_api_providers', $apis );
    }
    
    
    /**
     * @return array[]
     */
    public static function builtin():array {
        $settings = Loco_data_Settings::get();
        return  [
             [
                'id' => 'deepl',
                'name' => 'DeepL Translator',
                'key' => $settings->offsetGet('deepl_api_key'),
                'url' => 'https://www.deepl.com/translator',
            ],[
                'id' => 'google',
                'name' => 'Google Translate',
                'key' => $settings->offsetGet('google_api_key'),
                'url' => 'https://translate.google.com/',
            ],[
                'id' => 'microsoft',
                'name' => 'Microsoft Translator',
                'key' => $settings->offsetGet('microsoft_api_key'),
                'region' => $settings->offsetGet('microsoft_api_region'),
                'url' => 'https://aka.ms/MicrosoftTranslatorAttribution',
            ],[
                'id' => 'lecto',
                'name' => 'Lecto AI',
                'key' => $settings->offsetGet('lecto_api_key'),
                'url' => 'https://lecto.ai/?ref=loco',
            ],[
                'id' => 'openai',
                'name' => 'OpenAI',
                'key' => $settings->offsetGet('openai_api_key'),
                'model' => $settings->offsetGet('openai_api_model'),
                'prompt' => $settings->offsetGet('openai_api_prompt'),
                'url' => 'https://openai.com/policies/usage-policies/',
            ]
        ];
    }
    
    
    /**
     * Get only configured APIs, and sort them fairly
     * @return array[]
     */
    public static function configured():array {
        return self::sort( array_filter( self::export(), [__CLASS__,'filterConfigured'] ) );
    }


    /**
     * @internal
     * @param $api string[]
     */
    private static function filterConfigured( array $api ):bool {
        return array_key_exists('key',$api) && is_string($api['key']) && '' !== $api['key'];
    }


    /**
     * @internal
     * @param string[] $a
     * @param string[] $b
     * @return int
     */
    private static function compareNames( array $a, array $b ):int {
        return strcasecmp($a['name'],$b['name']);
    }
    
    
    /**
     * Sort providers alphabetically
     * @param array[] $apis
     */
    public static function sort( array $apis ):array {
        usort( $apis, [__CLASS__,'compareNames'] );
        return $apis;
    }

}
