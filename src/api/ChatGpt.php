<?php
/**
 * OpenAI compatible "Chat Completions" auto-translation provider.
 */
abstract class Loco_api_ChatGpt extends Loco_api_Client {

    
    public static function supports( string $vendor ): bool {
        return Loco_api_Providers::VENDOR_GOOGLE === $vendor || Loco_api_Providers::VENDOR_OPENAI === $vendor || Loco_api_Providers::VENDOR_OROUTE === $vendor;
    }
    

    /**
     * @param string[][] $items input messages with keys, "source", "context" and "notes"
     * @return string[] Translated strings
     * @throws Loco_error_Exception
     */
    public static function process( array $items, Loco_Locale $locale, array $config ):array {
        $targets =  [];
        
        // Switch OpenAI compatible provider
        $vendor = $config['vendor'] ?? Loco_api_Providers::VENDOR_OPENAI;
        $endpoint = [
            Loco_api_Providers::VENDOR_OPENAI => 'https://api.openai.com/v1/chat/completions',
            Loco_api_Providers::VENDOR_GOOGLE => 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
            Loco_api_Providers::VENDOR_OROUTE => 'https://openrouter.ai/api/v1/chat/completions',
        ][$vendor];
        
        // Switch default model, if not provided
        $model = $config['model']??'';
        if( '' === $model ){
            $model = [
                Loco_api_Providers::VENDOR_OPENAI => 'gpt-4.1-nano',
                Loco_api_Providers::VENDOR_GOOGLE => 'gemini-2.5-flash-lite',
                Loco_api_Providers::VENDOR_OROUTE => 'openai/gpt-4.1-nano',
            ][$vendor];
        }
        
        // Establish temperature; preferring 0.0, but recent GPT models have minimum 1.0
        // Range is probably 0.0 -> 2.0, but letting vendor validate valid range as it may vary.
        $temperature = $config['temperature'] ?? 0.0;
        if( $temperature < 1.0 && str_starts_with($model,'gpt-5') ){
            $temperature = 1.0;
        }

        // GPT wants a wordy language name. We'll handle this with our own data.
        $sourceTag = 'en_US';
        $sourceLang = 'English';
        $targetTag = (string) $locale;
        $targetLang = self::wordy_language($locale);

        // source language may be overridden by `loco_api_provider_source` hook
        $tag = Loco_mvc_PostParams::get()['source'];
        if( is_string($tag) && '' !== $tag ){
            $locale = Loco_Locale::parse($tag);
            if( $locale->isValid() ){
                $sourceTag = $tag;
                $sourceLang  = self::wordy_language($locale);
            }
        }

        // We're finished with locale data. free up some memory.
        Loco_data_CompiledData::flush();
        
        // Start prompt with assistant identity and immutable translation instructions
        $instructions = [
            'Respond only in '.$targetLang,
        ];
        $tone = $locale->getFormality();
        if( '' !== $tone ){
            $instructions[] = 'Use only the '.$tone.' tone of '.$targetLang;
        }
        $prompt = "# Identity\n\nYou are a translator that translates from ".$sourceLang.' ('.$sourceTag.') to '.$targetLang.' ('.$targetTag.").\n\n"
                . "# Instructions\n\n* ".implode(".\n* ",$instructions ).'.';
        
        // Allow user-defined extended instructions via filter
        $custom = apply_filters( 'loco_gpt_prompt', $config['prompt']??'', $locale );
        if( is_string($custom) ){
            $custom = trim($custom,"\n* ");
            if( '' !== $custom ) {
                $prompt .= "\n\n* ".$custom;
            }
        }

        // Longer cURL timeout. This API can be slow with many items. 20 seconds and up is not uncommon
        add_filter('http_request_timeout', function( $timeout = 20 ){
            return max( $timeout, 20 );
        } );
        
        // The front end is already splitting large jobs into batches, but we need smaller batches here
        $offset = 0;
        $totalItems = count($items);
        while( $offset < $totalItems ){
            $bytes = 0;
            $batch = [];
            // Fill batch with a soft ceiling of ~5KB. This will keep individual response times down, but script execution can still time-out.
            while( $bytes < 5000 && $offset < $totalItems ){
                $item = $items[$offset];
                $meta = array_filter( [$item['context'], $item['notes']] );
                $source = [
                    'id' => $offset,
                    'text' => $item['source'],
                    'context' => implode("\n",$meta),
                ];
                $bytes += strlen( $source['text'].$source['context'] );
                $batch[] = $source;
                $offset++;
            }
            // Send batch
            // https://platform.openai.com/docs/api-reference/chat/create
            $result = wp_remote_request( $endpoint, self::init_request_arguments( $config, [
                'model' => $model,
                'temperature' => $temperature,
                // Start with our base prompt, adding user instruction at [1] and data at [2]
                'messages' => [
                    [ 'role' => 'developer', 'content' => $prompt ],
                    [ 'role' => 'user', 'content' => 'Translate the `text` properties of the following JSON objects, using the `context` property to identify the meaning' ],
                    [ 'role' => 'user', 'content' => json_encode($batch,JSON_UNESCAPED_UNICODE) ],
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
            try {
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
                    if( ! is_array($result) || count($result) !== count($batch) ){
                        Loco_error_Debug::trace("Result array doesn't match our input array");
                        continue;
                    }
                    // expecting translations back in order, but `id` field  must match our input.
                    $i = -1;
                    foreach( $result as $output ){
                        $input = $batch[++$i];
                        $ourId = $input['id'];
                        $translation = $output['text'];
                        $gptId = (int) $output['id'];
                        if( $ourId !== $gptId ){
                            Loco_error_Debug::trace('Bad id field at [%u] expected %s, got %s', $i, $ourId, $gptId );
                            $translation = '';
                        }
                        $targets[$ourId] = $translation;
                    }
                }
                // next batch...
            }
            catch ( Throwable $e ){
                $name = $config['name'] ?? $vendor;
                throw new Loco_error_Exception( $name.': '.$e->getMessage() );
            }
        }
        return $targets;
    }


    private static function wordy_language( Loco_Locale $locale ):string {
        $names = Loco_data_CompiledData::get('languages');
        return $names[ $locale->lang ] ?? $locale->lang;
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
            $message = $data['error']['message'] ?? null;
            if( is_null($message) ){
                // Gemini returns array of errors, instead of single object.
                foreach( $data as $item ){
                    $message = $item['error']['message'] ?? null;
                    if( is_string($message) ){
                        break;
                    }
                }
            }
            throw new Exception( sprintf('API returned status %u: %s',$status,$message??'Unknown error') );
        }
        // all responses have form {choices:[...]}
        if( ! array_key_exists('choices',$data) || ! is_array($data['choices']) ){
            throw new Exception('API returned unexpected data');
        }
        return $data;
    }


}
