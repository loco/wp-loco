<?php
/**
 * Test LocoAdmin::resolve_file_domain 
 */
class ResolveFileDomainTest extends PHPUnit_Framework_TestCase {
    
    
    public function testDomainOnlySeparatesFromFileExtension(){
        $domain = LocoAdmin::resolve_file_domain( '/foo.pot' );
        $this->assertEquals( 'foo', $domain );
    }
    
    public function testFullLocaleSeparatesFromDomainByHyphen(){
        $domain = LocoAdmin::resolve_file_domain( '/foo-en_GB.po' );
        $this->assertEquals( 'foo', $domain );
    }

    public function testFullLocaleWithLongLanguageSeparatesFromDomainByHyphen(){
        $domain = LocoAdmin::resolve_file_domain( '/foo-rup_MK.po' );
        $this->assertEquals( 'foo', $domain );
    }
    
    public function testLanguageCodeSeparatesFromDomainByHyphen(){ 
        $domain = LocoAdmin::resolve_file_domain( '/foo-en.po' );
        $this->assertEquals( 'foo', $domain );
    }
    
    public function testValidLanguageCodeNotUsedAsDomain(){
        $domain = LocoAdmin::resolve_file_domain( '/fr_FR.po' );
        $this->assertSame( '', $domain );
    }

    public function testInvalidLanguageCodeNotUsedAsDomain(){
        $domain = LocoAdmin::resolve_file_domain( '/en_EN.po' );
        $this->assertSame( '', $domain );
    }

    public function testValidLanguageCodeNotUsedAsDomainWhenPot(){
        $domain = LocoAdmin::resolve_file_domain( '/fr_FR.pot' );
        $this->assertSame( '', $domain );
    }

    public function testInvalidLanguageCodeNotUsedAsDomainWhenPot(){
        $domain = LocoAdmin::resolve_file_domain( '/en_EN.pot' );
        $this->assertSame( '', $domain );
    }
    
}