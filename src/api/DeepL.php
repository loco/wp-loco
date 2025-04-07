<?php
/**
 * DeepL back end client, because CORS 
 */
abstract class Loco_api_DeepL extends Loco_api_Client {

    /**
     * @param string[][] $items input messages with keys, "source", "context" and "notes"
     *
     * @return string[] Translated strings
     * @throws Loco_error_Exception
     */
    public static function process( array $items, Loco_Locale $locale, array $config ): array {
        
        $api_key = $config['key'];
        if( ! is_string($api_key) || '' === $api_key ){
            throw new Loco_error_Exception('API key required');
        }
        
        // target language requires mapping to DeepL supported value
        // https://developers.deepl.com/docs/getting-started/supported-languages#target-languages
        $targetLang = strtoupper($locale->lang);
        if( $locale->region ){
            $variants = [ 
                'EN-GB' => 'EN-GB', 
                'EN-US' => 'EN-US', 
                'PT-PT' => 'PT-PT', 
                'PT-BR' => 'PT-BR',
                'ZH-CN' => 'ZH-HANS',
                'ZH-SG' => 'ZH-HANS',
                'ZH-TW' => 'ZH-HANT',
                'ZH-HK' => 'ZH-HANT',
            ];
            $tag = $targetLang.'-'.strtoupper($locale->region);
            if( array_key_exists($tag,$variants) ){
                $targetLang = $variants[$tag];
            }
        }
        
        // DeepL supported formality
        $tones = [
            'formal' => 'prefer_more',
            'informal' => 'prefer_less',
            '' => 'default',
        ];
        $formality = $tones[ $locale->getFormality() ] ?? $tones[''];

        // source language may be overridden by `loco_api_provider_source` hook
        $sourceLang = 'EN';
        $tag = Loco_mvc_PostParams::get()['source'];
        if( is_string($tag) && '' !== $tag ){
            $source = Loco_Locale::parse($tag);
            if( $source->isValid() ){
                $sourceLang  = strtoupper($source->lang);
            }
        }
        
        // Unwind all posted sources
        // TODO perform placeholder protection here, as per Loco platform.
        $sources = [];
        foreach( $items as $item ){
            $sources[] = $item['source'];
        }

        // context can only be set per request, for all text values posted,
        if( 1 === count($items) ){
            $context = trim( implode(' ', [ $items[0]['context']??'', $items[0]['notes']??'' ] ) );
            // Detect key verification call here and perform a zero cost /v2/usage request
            if( '' === $context && 'OK' === $sources[0] && 'FR' === $targetLang ){
                return self::fetch_usage($api_key) ? ['OK'] : [];
            }
        }
        else {
            $context = '';
        }

        // make request and parse JSON result 
        $result = wp_remote_request( self::baseUrl($api_key).'/v2/translate', self::init_request_arguments( $config, [
            'source_lang' => apply_filters('loco_deepl_source_lang',$sourceLang),
            'target_lang' => apply_filters('loco_deepl_target_lang',$targetLang, $locale),
            'formality' => apply_filters('loco_deepl_formality',$formality, $locale),
            'preserve_formatting' => '1',
            'context' => $context,
            'text' => $sources,
        ] ) );

        $data = parent::decodeResponse($result);
        $status = $result['response']['code'];
        if( 200 !== $status ){
            $message = $data['message'] ?? 'Unknown error';
            throw new Loco_error_Exception( sprintf('DeepL returned status %u: %s',$status,$message) );
        }

        // 200 OK:
        $targets = [];
        $translations = $data['translations']??[];
        foreach( $translations as $translation ){
            $targets[] = $translation['text'];
        }
        return $targets;
    }


    private static function init_request_arguments( array $config, array $data ):array {
        return [
            'method' => 'POST',
            'redirection' => 0,
            'user-agent' => parent::getUserAgent(),
            'reject_unsafe_urls' => false,
            'headers' => [
                'Content-Type' => 'application/x-www-form-urlencoded',
                'Authorization' => 'DeepL-Auth-Key '.$config['key'],
            ],
            'body' => self::encode_request_body($data),
        ];
    }


    /**
     * DeepL requires arrays to be specified as repeated arguments 
     * e.g. text=foo&text=bar&text=baz
     */
    private static function encode_request_body( array $data ): string {
        $pairs = [];
        foreach( $data as $key => $mixed ){
            if( is_array($mixed) ){
                foreach( $mixed as $scalar ){
                    $pairs[] = $key.'='.urlencode($scalar);
                }
            }
            else {
                $pairs[] = $key.'='.urlencode($mixed);
            }
        }
        return implode('&',$pairs);
    }


    private static function fetch_usage( string $key ):array {
        $data = parent::decodeResponse( wp_remote_request( self::baseUrl($key).'/v2/usage', [
            'redirection' => 0,
            'user-agent' => parent::getUserAgent(),
            'reject_unsafe_urls' => false,
            'headers' => [
                'Authorization' => 'DeepL-Auth-Key '.$key,
            ],
        ] ) );
        if( array_key_exists('character_limit',$data) ){
            return $data;
        }
        $message = $data['message'] ?? 'Failed to get usage';
        throw new Loco_error_Exception( 'DeepL: '.$message);
    }


    private static function baseUrl( string $key ):string {
        $url = 'https://api';
        if( str_ends_with($key,':fx') ){
            $url .= '-free';
        }
        return $url . '.deepl.com';
    }

}
