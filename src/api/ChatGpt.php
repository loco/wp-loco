<?php
/**
 * Bundled from external repo:
 * @see https://github.com/loco/wp-gpt-translator/
 */
abstract class Loco_api_ChatGpt extends Loco_api_Client
{

    /**
     * @param string[][]   $items   Input messages with keys "id", "source", "context" and "notes".
     * @param Loco_Locale  $locale  The Loco_Locale object (target language).
     * @param array        $config  Configuration array: must contain ['key'] (OpenAI API key)
     *                              and may contain ['model'], ['prompt'], etc.
     * @return string[]            Translated strings in the same order as $items.
     * @throws Loco_error_Exception If the API returns an error or the response is malformed.
     */
    public static function process(array $items, Loco_Locale $locale, array $config): array
    {
        $targets = [];

        // 1) Choose GPT model (fallback to "gpt-4o-mini")
        $model = $config['model'] ?? '';
        if ('' === $model) {
            $model = 'gpt-4o-mini';
        }

        // 2) Determine “wordy” source and target language names
        $sourceLang = 'English';
        $targetLang = self::wordy_language($locale);

        // 2.1) Allow source override via loco_api_provider_source hook
        $tag = Loco_mvc_PostParams::get()['source'] ?? '';
        if (is_string($tag) && '' !== $tag) {
            $overrideLocale = Loco_Locale::parse($tag);
            if ($overrideLocale->isValid()) {
                $sourceLang = self::wordy_language($overrideLocale);
            }
        }

        // 2.2) Free up any cached locale data
        Loco_data_CompiledData::flush();

        // 3) Build the “system / user” chat prompt
        $prompt = 'Translate the `source` properties of the following JSON objects, using the `context` and `notes` properties to identify the meaning';
        $tone   = $locale->getFormality();
        if ('' !== $tone) {
            $prompt .= '. Use the ' . $tone . ' style';
        }
        // 3.1) Append a custom prompt if provided via filter
        $custom = apply_filters('loco_gpt_prompt', $config['prompt'] ?? '', $locale);
        if (is_string($custom) && '' !== $custom) {
            $prompt .= '. ' . $custom;
        }

        // 4) Increase the default HTTP timeout (ChatGPT can be slow with large batches)
        add_filter('http_request_timeout', function () {
            return 20; // 20 seconds
        });

        // 5) Perform the POST request to the ChatGPT API
        $requestArgs = self::init_request_arguments(
            $config,
            [
                'model'           => $model,
                'temperature'     => 0,
                'messages'        => [
                    [
                        'role'    => 'system',
                        'content' => 'You are a helpful assistant that translates from ' . $sourceLang . ' to ' . $targetLang,
                    ],
                    [
                        'role'    => 'user',
                        'content' => rtrim($prompt, ':.;, ') . ':',
                    ],
                    [
                        'role'    => 'user',
                        'content' => json_encode($items, JSON_UNESCAPED_UNICODE),
                    ],
                ],
                // 6) Define a JSON schema so we reliably get back an array of { id, text }
                'response_format' => [
                    'type'        => 'json_schema',
                    'json_schema' => [
                        'name'   => 'translations_array',
                        'strict' => true,
                        'schema' => [
                            'type'                 => 'object',
                            'properties'           => [
                                'result' => [
                                    'type'        => 'array',
                                    'items'       => [
                                        'type'                 => 'object',
                                        'properties'           => [
                                            'id'   => [
                                                'type'        => 'number',
                                                'description' => 'Corresponding id from the input object',
                                            ],
                                            'text' => [
                                                'type'        => 'string',
                                                'description' => 'Translation text of the corresponding input object',
                                            ],
                                        ],
                                        'required'             => ['id', 'text'],
                                        'additionalProperties' => false,
                                    ],
                                    'description' => 'Translations of the corresponding input array',
                                ],
                            ],
                            'required'             => ['result'],
                            'additionalProperties' => false,
                        ],
                    ],
                ],
            ]
        );

        $result = wp_remote_request('https://api.openai.com/v1/chat/completions', $requestArgs);

        // 7) Decode and validate the API response
        $data = self::decode_response($result);

        if (! isset($data['choices']) || ! is_array($data['choices'])) {
            throw new Loco_error_Exception('OpenAI API returned unexpected structure (missing choices).');
        }

        // 8) Loop through each choice → parse the JSON, extract id+text
        foreach ($data['choices'] as $choice) {
            $blob = $choice['message'] ?? ['role' => 'null'];

            if (isset($blob['refusal'])) {
                Loco_error_Debug::trace('Refusal: %s', $blob['refusal']);
                continue;
            }
            if ('assistant' !== ($blob['role'] ?? '')) {
                Loco_error_Debug::trace('Ignoring %s role message', $blob['role'] ?? 'none');
                continue;
            }

            $content = json_decode(trim($blob['content'] ?? ''), true);
            if (! is_array($content) || ! array_key_exists('result', $content)) {
                Loco_error_Debug::trace("Content doesn't conform to our schema: %s", print_r($blob['content'], true));
                continue;
            }

            $resultArray = $content['result'];
            if (! is_array($resultArray) || count($resultArray) !== count($items)) {
                Loco_error_Debug::trace("Result array length mismatch: expected %u, got %u", count($items), count($resultArray));
                continue;
            }

            foreach ($resultArray as $index => $r) {
                // Verificamos que 'id' exista en $r
                if (! isset($r['id']) || ! is_numeric($r['id'])) {
                    Loco_error_Debug::trace('Skipping item[%u]: missing or invalid "id" in response: %s', $index, print_r($r, true));
                    $targets[$index] = '';
                    continue;
                }

                // Verificamos que 'text' exista en $r
                if (! isset($r['text']) || ! is_string($r['text'])) {
                    Loco_error_Debug::trace('Skipping item[%u]: missing or invalid "text" in response: %s', $index, print_r($r, true));
                    $targets[$index] = '';
                    continue;
                }

                $gptId = intval($r['id']);

                // Antes de acceder a $items[$index]['id'], verificamos que esa clave exista
                if (! isset($items[$index]['id']) || ! is_numeric($items[$index]['id'])) {
                    Loco_error_Debug::trace('Skipping item[%u]: input[$index] has no "id" key or is invalid.', $index);
                    $targets[$index] = '';
                    continue;
                }

                $ourId = intval($items[$index]['id']);

                if ($ourId !== $gptId) {
                    Loco_error_Debug::trace('Bad id field at [%u]: expected %u, got %u', $index, $ourId, $gptId);
                    $targets[$index] = '';
                    continue;
                }

                // Todo está bien; guardamos la traducción
                $targets[$index] = $r['text'];
            }
        }

        return $targets;
    }

    /**
     * Convert a Loco_Locale object into a human‐friendly language name
     * (e.g. “Spanish (Spain)”), including formality/tone if specified.
     *
     * @param Loco_Locale $locale
     * @return string
     */
    private static function wordy_language(Loco_Locale $locale): string
    {
        $names = Loco_data_CompiledData::get('languages');
        $name  = $names[$locale->lang] ?? $locale->lang;
        $tone  = $locale->getFormality();
        if ('' !== $tone) {
            $name = ucfirst($tone) . ' ' . $name;
        }
        return $name;
    }

    /**
     * Build the arguments for wp_remote_request() to call OpenAI’s Chat endpoint.
     *
     * @param array $config  Configuration (must contain ['key'] = API key).
     * @param array $data    The payload to send to the Chat API.
     * @return array         Arguments array for wp_remote_request().
     */
    private static function init_request_arguments(array $config, array $data): array
    {
        return [
            'method'             => 'POST',
            'redirection'        => 0,
            'user-agent'         => parent::getUserAgent(),
            'reject_unsafe_urls' => false,
            'headers'            => [
                'Content-Type'  => 'application/json',
                'Authorization' => 'Bearer ' . $config['key'],
                'Origin'        => $_SERVER['HTTP_ORIGIN'] ?? '',
                'Referer'       => ($_SERVER['HTTP_ORIGIN'] ?? '') . '/wp-admin/',
            ],
            'body'               => json_encode($data),
        ];
    }

    /**
     * Decode the API response and throw if there was an HTTP or JSON error.
     *
     * @param array $result The raw result of wp_remote_request().
     * @return array        Parsed JSON data with ['choices'] etc.
     * @throws Loco_error_Exception If HTTP status ≠ 200 or unexpected data.
     */
    private static function decode_response($result): array
    {
        $data   = parent::decodeResponse($result);
        $status = $result['response']['code'] ?? 0;

        if (200 !== $status) {
            $message = $data['error']['message'] ?? 'Unknown error';
            throw new Loco_error_Exception(sprintf('OpenAI API returned status %u: %s', $status, $message));
        }

        if (! isset($data['choices']) || ! is_array($data['choices'])) {
            throw new Loco_error_Exception('OpenAI API returned unexpected data (no choices array).');
        }

        return $data;
    }
}
