<?php
/**
 * Third party API helpers
 */
abstract class Loco_api_Providers {

    const VENDOR_OPENAI = 'openai';
    const VENDOR_GOOGLE = 'gemini';
    const VENDOR_OROUTE = 'openrouter';
    
    /*private static array $vendors = [
        self::VENDOR_OPENAI => 'OpenAI',
        self::VENDOR_GOOGLE => 'Gemini',
        self::VENDOR_OROUTE => 'OpenRouter',
    ];*/
    
    /*public static function vendorName( string $id ): string{
        return self::$vendors[$id] ?? 'Unknown Vendor';
    }*/


    /**
     * Export unredcted API credentials for all supported APIs
     * @return array[]
     */
    public static function export():array {
        return apply_filters( 'loco_api_providers', self::builtin() );
    }


    /**
     * Get redacted API configs for all supported APIs.
     * This only exports authentication keys when a CORS client is required.
     */
    public static function redacted():array {
        $apis = [];
        foreach( self::builtin() as $a ){
            if( ! array_key_exists('cors',$a) ){
                $authed = (bool) $a['key'];
                $a = array_intersect_key( $a, ['id'=>'','name'=>'','url'=>''] );
                // dummy key must be present, so we know the api is available.
                $a['key'] = $authed ? 'REDACTED' : '';
            }
            $apis[] = $a;
        }
        return apply_filters( 'loco_api_providers', $apis );
    }


    /**
     * @return array[]
     */
    public static function builtin():array {
        $settings = Loco_data_Settings::get();
        return  [
             apply_filters('loco_api_provider_deepl', [
                'id' => 'deepl',
                'name' => 'DeepL Translator',
                'key' => $settings->offsetGet('deepl_api_key'),
                'url' => 'https://www.deepl.com/translator',
            ] ),
            apply_filters('loco_api_provider_google', [
                'id' => 'google',
                'cors' => true,
                'name' => 'Google Translate',
                'key' => $settings->offsetGet('google_api_key'),
                'url' => 'https://translate.google.com/',
            ] ), 
            apply_filters('loco_api_provider_microsoft', [
                'id' => 'microsoft',
                'cors' => true,
                'name' => 'Microsoft Translator',
                'key' => $settings->offsetGet('microsoft_api_key'),
                'region' => $settings->offsetGet('microsoft_api_region'),
                'url' => 'https://aka.ms/MicrosoftTranslatorAttribution',
            ] ),
            apply_filters('loco_api_provider_lecto', [
                'id' => 'lecto',
                'cors' => true,
                'name' => 'Lecto AI',
                'key' => $settings->offsetGet('lecto_api_key'),
                'url' => 'https://lecto.ai/?ref=loco',
            ] ),
            apply_filters('loco_api_provider_openai', [
                'id' => 'openai',
                'name' => 'OpenAI',
                'key' => $settings->offsetGet('openai_api_key'),
                'model' => $settings->offsetGet('openai_api_model'),
                'prompt' => $settings->offsetGet('openai_api_prompt'),
                'url' => 'https://openai.com/policies/usage-policies/',
            ] ),
        ];
    }
    
    
    /**
     * Get only configured APIs (redacted) and sort them fairly.
     * @return array[]
     */
    public static function configured():array {
        return self::sort( array_filter( self::redacted(), [__CLASS__,'filterConfigured'] ) );
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
