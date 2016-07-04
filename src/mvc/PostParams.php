<?php
/**
 * Postdata wrapper
 */
class Loco_mvc_PostParams extends Loco_mvc_ViewParams {
    
    /**
     * @var Loco_mvc_PostParams
     */
    private static $singleton;


    /**
     * Get actual postdata, not hacked postdata WordPress ruined with wp_magic_quotes
     * @return Loco_mvc_PostParams
     */
    public static function get(){
        if( ! self::$singleton ){
            self::$singleton = self::create();
        }
        return self::$singleton;
    }



    /**
     * @return void
     */
    public static function destroy(){
        self::$singleton = null;
    }



    /**
     * Construct clean postdata from current HTTP request
     * @return Loco_mvc_PostParams
     */
     public static function create(){
        $post = array();
        // preferred way is to parse original data
        // note that input can only be fetched once
        if( $raw = file_get_contents('php://input') ){
            parse_str( $raw, $post );
        }
        else if( isset($_SERVER['HTTP_RAW_POST_DATA']) ){
            parse_str( $_SERVER['HTTP_RAW_POST_DATA'], $post );
        }
        // else fall back to undoing WordPress 'magic'
        else {
            $post = stripslashes_deep( $_POST );
        }

        return new Loco_mvc_PostParams( $post );
    }



    /**
     * Construct postdata from a series of value pairs.
     * This is used in tests to simulate how a form is serialized and posted
     * 
     * @return Loco_mvc_PostParams
     */
    public static function fromSerial( array $serial ){
        $pairs = array();
        foreach( $serial as $pair ){
            $pairs[] = rawurlencode($pair[0]).'='.rawurlencode($pair[1]);
        }
        parse_str( implode('&',$pairs), $parsed );
        return new Loco_mvc_PostParams( $parsed );
    }



    /**
     * Collapse nested array down to series of scalar forms
     * @return array
     */
    public function getSerial(){
        $serial = array();
        $query = http_build_query( $this->getArrayCopy(), false, '&' );
        foreach( explode('&',$query) as $str ){
            $serial[] = array_map( 'urldecode', explode( '=', $str, 2 ) );
        }
        return $serial;
    }

}