<?php
/**
 * Test case that doesn't need any WordPress bootstrapping
 */
abstract class Loco_test_TestCase extends PHPUnit_Adapter_TestCase {
    
    
    public function tear_down(){
        parent::tear_down();
        Loco_error_AdminNotices::destroy();
    }
    
    
    protected function normalizeHtml( $src ){
            
        $dom = new DOMDocument('1.0','UTF-8');
        $dom->preserveWhitespace = false;
        $dom->formatOutput = false;
        $dom->loadXML( '<?xml version="1.0" encoding="utf-8"?><root>'.$src.'</root>' );
        $dom->normalizeDocument();
        $src = $dom->saveXML();
        
        return trim( preg_replace( '/>\\s+</', '><', $src ) );
    }

    
    public function assertSameHtml( $expect, $actual, $message = '' ){
        $this->assertSame( $this->normalizeHtml($expect), $this->normalizeHtml($actual), $message );
    }


    /**
     * @deprecated 
     */
    public function setExpectedException( $exception, $message = '', $code = null ) {
        //trigger_error('Use expectException('.var_export($exception,true).')', E_USER_DEPRECATED );
        $this->expectException( $exception );

        if ( '' !== $message ) {
            //trigger_error('Use expectExceptionMessage('.var_export($message,true).')', E_USER_DEPRECATED );
            $this->expectExceptionMessage( $message );
        }

        if ( null !== $code ) {
            //trigger_error('Use expectExceptionCode('.var_export($code,true).')', E_USER_DEPRECATED );
            $this->expectExceptionCode( $code );
        }
    }
    
}