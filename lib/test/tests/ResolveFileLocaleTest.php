<?php
/**
 * Test LocoAdmin::resolve_file_locale function
 */
class ResolveFileLocaleTest extends PHPUnit_Framework_TestCase {
    
    public function testLanguageCodeSepartesFromDomainAfterHyphen(){
        $locale = LocoAdmin::resolve_file_locale('/foo-ja.po');
        $this->assertEquals( 'ja', $locale->get_code() );
    }

    public function testFullLocaleSeparatesFromDomainAfterHyphen(){
        $locale = LocoAdmin::resolve_file_locale('/foo-ja_jp.po');
        $this->assertEquals( 'ja_JP', $locale->get_code() );
    }

    public function testLanguageCodeExpandsToDefaultRegionAfterHyphen(){
        $locale = LocoAdmin::resolve_file_locale('/foo-en.po');
        $this->assertEquals( 'en_GB', $locale->get_code() );
    }
}