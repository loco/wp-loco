<?php
/**
 * Bundled from external repo:
 * @see https://github.com/loco/wp-gpt-translator/
 */
abstract class Loco_api_ChatGpt extends Loco_api_Client{


    /**
     * @param string[][] $items input messages with keys, "source", "context" and "notes"
     * @return string[] Translated strings
     * @throws Loco_error_Exception
     */
    public static function process( array $items, Loco_Locale $locale, array $config ):array {
        $targets =  [];

        // Switch GPT model: See https://platform.openai.com/docs/models/model-endpoint-compatibility
        $model = $config['model']??'';
        if( '' === $model ){
            $model = 'gpt-4o-mini';
        }

        // GPT wants a wordy language name. We'll handle this with our own data.
        $sourceLang = 'English';
        $targetLang = self::wordy_language($locale);

        // source language may be overridden by `loco_api_provider_source` hook
        $tag = Loco_mvc_PostParams::get()['source'];
        if( is_string($tag) && '' !== $tag ){
            $locale = Loco_Locale::parse($tag);
            if( $locale->isValid() ){
                $sourceLang  = self::wordy_language($locale);
            }
        }

        // done with locale data. free up memory.
        Loco_data_CompiledData:flush();

        // Build specific prompt for this batch
        $prompt = 'Translate the `source` properties of the following JSON objects, using the `context` and `notes` properties to identify the meaning';
        // Append more language specific data, like region and formality/tone
        $tone = $locale->getFormality();
        if( '' !== $tone ){
            $prompt.= '. Use the '.$tone.' style';
        }
        // Allow custom prompt via filter for this locale, but protecting our base prompt
        $custom = apply_filters( 'loco_gpt_prompt', $config['prompt'], $locale );
        if( '' !== $custom && is_string($custom) ){
            $prompt .= '. '.$custom;
        }

        // Longer cURL timeout. This API can be slow with many items. 20 seconds and up is not uncommon
        add_filter('http_request_timeout',function(){ return 20; });

        // https://platform.openai.com/docs/api-reference/chat/create
        $result = wp_remote_request( 'https://api.openai.com/v1/chat/completions', self::init_request_arguments( $config, [
            'model' => $model,
            'temperature' => 0,
            // Start with our base prompt, adding user instruction at [1] and data at [2]
            'messages' => [
                [ 'role' => 'system', 'content' => 'You are a helpful assistant that translates from '.$sourceLang.' to '.$targetLang ],
                [ 'role' => 'user', 'content' => rtrim($prompt,':.;, ').':' ],
                [ 'role' => 'user', 'content' => json_encode($items,JSON_UNESCAPED_UNICODE) ],
            ],
            // Define schema for reliable returning of correct data
            // https://openai.com/index/introducing-structured-outputs-in-the-api/
            'response_format' => [
                'type' => 'json_schema',
                'json_schema' => [
                    'name' => 'translations_array',
                    'strict' => true,
                    'schema' => [
                        'type' => 'object',
                        'properties' => [
                            'result' => [
                                'type' => 'array',
                                'items' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'id' => [
                                            'type' => 'number',
                                            'description' => 'Corresponding id from the input object'
                                        ],
                                        'text' => [
                                            'type' => 'string',
                                            'description' => 'Translation text of the corresponding input object',
                                        ]
                                    ],
                                    'required' => ['id','text'],
                                    'additionalProperties' => false,
                                ],
                                'description' => 'Translations of the corresponding input array',
                            ],
                        ],
                        'required' => ['result'],
                        'additionalProperties' => false,
                    ],
                ],
            ],
        ]) );
        // generic response handling
        $data = self::decode_response($result);
        // all responses have form {choices:[...]}
        foreach( $data['choices'] as $choice ){
            $blob = $choice['message'] ?? ['role'=>'null'];
            if( isset($blob['refusal']) ){
                Loco_error_Debug::trace('Refusal: %s', $blob['refusal'] );
                continue;
            }
            if( 'assistant' !== $blob['role'] ){
                Loco_error_Debug::trace('Ignoring %s role message', $blob['role'] );
                continue;
            }
            $content = json_decode( trim($blob['content']), true );
            if( ! is_array($content) || ! array_key_exists('result',$content) ){
                Loco_error_Debug::trace("Content doesn't conform to our schema");
                continue;
            }
            $result = $content['result'];
            if( ! is_array($result) || count($result) !== count($items) ){
                Loco_error_Debug::trace("Result array doesn't match our input array");
                continue;
            }
            $i = -1;
            foreach( $result as $r ){
                $item = $items[++$i];
                $translation = $r['text'];
                // expecting translations back in order, so just sanity checking the ID field
                $gptId = (int) $r['id'];
                $ourId = (int) $item['id'];
                if( $ourId !== $gptId ){
                    Loco_error_Debug::trace('Bad id field at [%u] expected %s, got %s', $i, $ourId, $gptId );
                    $translation = '';
                }
                $targets[$i] = $translation;
            }
        }
        return $targets;
    }


    private static function wordy_language( Loco_Locale $locale ):string {
        $names = Loco_data_CompiledData::get('languages');
        $name = $names[ $locale->lang ];
        // formal, informal etc..
        $tone = $locale->getFormality();
        if( $tone ){
            $name = ucfirst($tone).' '.$name;
        }
        // TODO regional variations, e.g. pt-BR, zh-Hans, etc.. "as spoken in X" ?
        return $name;
    }


    private static function init_request_arguments( array $config, array $data ):array {
        return [
            'method' => 'POST',
            'redirection' => 0,
            'user-agent' => parent::getUserAgent(),
            'reject_unsafe_urls' => false,
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer '.$config['key'],
                'Origin' => $_SERVER['HTTP_ORIGIN'],
                'Referer' => $_SERVER['HTTP_ORIGIN'].'/wp-admin/'
            ],
            'body' => json_encode($data),
        ];
    }


    private static function decode_response( $result ):array {
        $data = parent::decodeResponse($result);
        $status = $result['response']['code'];
        if( 200 !== $status ){
            $message = $data['error']['message'] ?? 'Unknown error';
            throw new Loco_error_Exception( sprintf('OpenAI API returned status %u: %s',$status,$message) );
        }
        // all responses have form {choices:[...]}
        if( ! array_key_exists('choices',$data) || ! is_array($data['choices']) ){
            throw new Loco_error_Exception('OpenAI API returned unexpected data');
        }
        return $data;
    }


}
