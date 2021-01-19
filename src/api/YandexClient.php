<?php
/**
 * Yandex Translation API v2 
 */
class Loco_api_YandexClient {

    /**
     * @var string
     */
    private $auth;

    /**
     * @var string
     */
    private $format;
    
    
    public function __construct( array $config ){
        if( 'html'=== $config['type'] ){
            $this->format = 'HTML';
        }
        else {
            $this->format = 'PLAIN_TEXT';
        }
        $this->auth = 'Api-Key '.$config['key'];
    }


    /**
     * https://cloud.yandex.com/docs/translate/api-ref/Translation/translate
     * @param string[]
     * @param Loco_Locale already verified/mapped in front end
     * @return string[]
     */
    public function translate( array $sources, Loco_Locale $locale ){
        $json = json_encode( array (
            'sourceLanguageCode' => 'en',
            'targetLanguageCode' => (string) $locale,
            'format' => $this->format,
            'texts' => $sources,
        ) );
        $response = wp_remote_post('https://translate.api.cloud.yandex.net/translate/v2/translate',array(
            'body' => $json,
            'headers' => array (
                'user-agent' => 'Loco Translate/'.loco_plugin_version().'; WordPress/'.$GLOBALS['wp_version'],
                'content-type' => 'application/json',
                'content-length' => strlen($json),
                'authorization' => $this->auth,
            ),
        ));
        if( $response instanceof WP_Error ){
            $message = 'Unknown error';
            foreach( $response->get_error_messages() as $message ){
                Loco_error_AdminNotices::debug('Yandex error: '.$message);
            }
            throw new Loco_error_Exception( $message );
        }
        if( ! is_array($response) ){
            throw new Loco_error_Exception('Expected array response from WordPress HTTP API');
        }
        // parse response and error accordingly
        $json = $response['body'];
        $data = json_decode($json,true);
        if( 200 !== $response['response']['code'] ){
            Loco_error_AdminNotices::debug( 'Yandex error response: '.$json );
            if( is_array($data) && array_key_exists('message',$data) ){
                $message = $data['message'];
            }
            else {
                $message = $response['response']['message'];
            }
            throw new Loco_error_Exception('Yandex.Translate: Error '.$response['response']['code'].': '.$message);
        }
        // should have json response like {translations:[ {text:''},...]}
        $targets = array();
        foreach( $sources as $i => $text ){
            if( isset($data['translations'][$i]) ){
                $text = $data['translations'][$i]['text'];
            }
            $targets[$i] = $text;
        }
        return $targets;
    }


    /**
     *  
     */
    private function parseError(){
        
    }
    
    
    
    
}