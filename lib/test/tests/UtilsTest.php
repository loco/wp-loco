<?php
/**
 * Test misc utils
 * 
 * @group utils
 */
class UtilsTest extends PHPUnit_Framework_TestCase {
    
    
    public function test_resolve_file_domain(){
        $domain = LocoAdmin::resolve_file_domain( '/foo.pot' );
        $this->assertEquals( 'foo', $domain );

        $domain = LocoAdmin::resolve_file_domain( '/foo-en_GB.po' );
        $this->assertEquals( 'foo', $domain );
 
        $domain = LocoAdmin::resolve_file_domain( '/foo-en.po' );
        $this->assertEquals( 'foo', $domain );
    }
    

    public function test_resolve_file_locale(){
        $locale = LocoAdmin::resolve_file_locale('/foo-en.po');
        $this->assertEquals( 'en_GB', $locale->get_code() );

        $locale = LocoAdmin::resolve_file_locale('/foo-ja.po');
        $this->assertEquals( 'ja', $locale->get_code() );

        $locale = LocoAdmin::resolve_file_locale('/foo-ja_jp.po');
        $this->assertEquals( 'ja_JP', $locale->get_code() );
    }
    
    
}