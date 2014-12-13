<?php
/**
 * Test LocoAdmin::uri function
 */
class UriTest extends PHPUnit_Framework_TestCase {
    
    
    public function testDefaultPluginPageUri(){
        $uri = LocoAdmin::uri();
        $this->assertEquals('http://test/wp-admin/admin.php?page=loco-translate', $uri );
    }

    public function testDefaultPageWithParameters(){
        $args = array( 'foo' => 'bar-baz' );
        $uri = LocoAdmin::uri( $args );
        $this->assertEquals('http://test/wp-admin/admin.php?foo=bar-baz&page=loco-translate', $uri );
    }
    
    
}