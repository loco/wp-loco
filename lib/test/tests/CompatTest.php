<?php
/**
 * @group compat
 */
class CompatText extends PHPUnit_Framework_TestCase {
    
    
    
    public function testDummyDetectEncodingAlwaysUtf8(){
        $this->assertSame( 'UTF-8', loco__mb_detect_encoding( 'whatever', array(), true ) );
    }


    public function testDummyIconvReturnsInput(){
        $this->assertSame( 'OK', loco__iconv('anything','whatever','OK') );
    }
    
    
    
}