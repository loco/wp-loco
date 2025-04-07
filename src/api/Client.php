<?php
/**
 * Generic API client base class
 */
abstract class Loco_api_Client {

    /**
     * @param array|WP_Error $result
     * @return array
     */
    public static function decodeResponse( $result ):array {
        if( $result instanceof WP_Error ){
            foreach( $result->get_error_messages() as $message ){
                throw new Loco_error_Exception($message);
            }
        }
        // always decode response if server says it's JSON
        if( 'application/json' === substr($result['headers']['Content-Type'],0,16) ){
            $data = json_decode( $result['body'], true );
            if( is_array($data) ){
                return $data;
            }
            throw new Loco_error_Exception('Failed to decode JSON response');
        }
        if( 200 === $result['response']['code'] ){
            throw new Loco_error_Exception('Expected JSON Content-Type for 200 response');
        }
        // else this may be a valid error response
        return [];
    }
    
    
    
    public static function getUserAgent():string {
        return apply_filters( 'loco_api_user_agent', sprintf('Loco Translate/%s; wp-%s', loco_plugin_version(), $GLOBALS['wp_version'] ) );
    }
    
    
    
}
