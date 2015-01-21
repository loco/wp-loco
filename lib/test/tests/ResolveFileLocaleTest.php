<?php
/**
 * Test LocoAdmin::resolve_file_locale function
 * @group locales
 */
class ResolveFileLocaleTest extends PHPUnit_Framework_TestCase {
    
    public function testLanguageCodeSepartesFromDomainAfterHyphen(){
        $locale = LocoAdmin::resolve_file_locale('/test-ja.po');
        $this->assertEquals( 'ja', $locale->get_code() );
    }

    public function testFullLocaleSeparatesFromDomainAfterHyphen(){
        $locale = LocoAdmin::resolve_file_locale('/test-ja_jp.po');
        $this->assertEquals( 'ja_JP', $locale->get_code() );
    }

    public function testLanguageCodeExpandsToDefaultRegionAfterHyphen(){
        $locale = LocoAdmin::resolve_file_locale('/test-en.po');
        $this->assertEquals( 'en_US', $locale->get_code() );
    }
    
    
    public function testThreeCharacterLanguageCodeSeparates(){
        $locale = LocoAdmin::resolve_file_locale('/bel.po');
        $this->assertEquals( 'bel', $locale->get_code() );
    }

    public function testThreeCharacterLanguageCodeWithRegionSeparates(){
        $locale = LocoAdmin::resolve_file_locale('/rup-mk.po');
        $this->assertEquals( 'rup_MK', $locale->get_code() );
    }
    

    public function testUnknownTwoCharacterLanguageIgnored(){
        $locale = LocoAdmin::resolve_file_locale('/xx-th.po');
        // If "xx" was treated as a language this would give invalid locale "xx_TH".
        $this->assertEquals( 'th', $locale->get_code(), '"xx" is not a valid language, but "th" is' );
    }

    public function testUnknownThreeCharacterLanguageIgnored(){
        $locale = LocoAdmin::resolve_file_locale('/foo-th.po');
        // If "foo" was treated as a language this would give invalid locale "foo_TH".
        $this->assertEquals( 'th', $locale->get_code(), '"foo" is not a valid langauge, but "th" is' );
    }
    
    
}