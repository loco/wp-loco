<?php
/**
 * @group compat
 */
class CompatText extends PHPUnit_Framework_TestCase {


    public function testDummyDetectEncodingAlwaysUtf8(){
        $this->assertSame( 'UTF-8', loco_compat_mb_detect_encoding( 'whatever', array(), true ) );
    }


    public function testDummyIconvReturnsInput(){
        $this->assertSame( 'OK', loco_compat_iconv('anything','whatever','OK') );
    }


    public function testDummyJsonEncodeReturnsError(){
        $json = loco_compat_json_encode('anything');
        $data = json_decode( $json, true );
        $this->assertSame( array('error'=>array('code'=>-1,'message'=>'json extension is not installed')), $data );
    }


    public function testDummyTokenizerReturnsEmptyArray(){
        $tokens = loco_compat_token_get_all('anything');
        $this->assertSame( array(), $tokens );
    }

}