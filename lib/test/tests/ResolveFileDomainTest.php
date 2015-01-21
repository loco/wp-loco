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
    
}