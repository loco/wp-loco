<?php
/**
 * Test built locale libs.
 * 
 * @group locales
 * @group built
 */
class LocalesTest extends PHPUnit_Framework_TestCase {
    
    
    public function testGetAllLocales(){
        $map = LocoLocale::get_names();
        $this->assertCount( 137, $map );
        return $map;
    }
    
    
    /**
     * @depends testGetAllLocales
     */    
    public function testRegionlessLocalesInNames( array $map ){
        $this->assertArrayHasKey( 'th', $map );
    }
    
    
    public function testKnownLocaleResolves(){
        $locale = loco_locale_resolve('en_GB');
        $this->assertInstanceOf('LocoLocale', $locale );
        $this->assertEquals( 'English (UK)', $locale->get_name() );
        $this->assertEquals( 'en_GB', $locale->get_code() );
        // assert plurals
        $data = $locale->export();
        $this->assertEquals( 2, $data['nplurals'] );
    }    
    
    
    public function testLanguageResolvesToDefaultRegion(){
        $locale = loco_locale_resolve('fr');
        $this->assertEquals( 'French', $locale->get_name() );
        $this->assertEquals( 'fr_FR', $locale->get_code() );
    }
    
    
    public function testRegionlessLanguageResolvesToLanguageOnly(){
        $locale = loco_locale_resolve('th');
        $this->assertEquals( 'Thai', $locale->get_name() );
        $this->assertEquals( 'th', $locale->get_code() );
    }
    
    public function testRegionlessLocaleHasFlag(){
        $locale = LocoLocale::init('th', null );
        $this->assertEquals( 'flag flag-th', $locale->icon_class() );        
    }
    
    
    public function testUnknownLocaleWithValidLanguageAndRegionAllowed(){
        $locale = loco_locale_resolve('pl_CY');
        $this->assertInstanceOf('LocoLocale', $locale );
        $this->assertEquals( 'pl_CY', $locale->get_code() );
        $this->assertEquals( 'Polish (Cyprus)', $locale->get_name() );
    }
    
    
    public function testUnkownRegionWithValidLanguageAllowed(){
        $locale = loco_locale_resolve('en_FF');
        $this->assertInstanceOf('LocoLocale', $locale );
        $this->assertEquals( 'en_FF', $locale->get_code() );
        $this->assertEquals( 'English (FF)', $locale->get_name() );
    }
    
    
    public function testUnknownLanguageWithValidRegionAllowed(){
        $locale = loco_locale_resolve('zz_GB');
        $this->assertInstanceOf('LocoLocale', $locale );
        $this->assertEquals( 'zz_GB', $locale->get_code() );
        $this->assertEquals( 'United Kingdom', $locale->get_name() );
    }
    
    
    public function testUnknownAndUnknownRegionAllowed(){
        $locale = loco_locale_resolve('zz_ZZ');
        $this->assertInstanceOf('LocoLocale', $locale );
        $this->assertEquals( 'zz_ZZ', $locale->get_code() );
        $this->assertEquals( 'Unknown language', $locale->get_name() );
    }
    
    
    
    public function testPrefixedLocaleResolve(){
        $locale = loco_locale_resolve( '--en_GB' );
        $this->assertInstanceOf('LocoLocale', $locale );
        $this->assertEquals( 'English (UK)', $locale->get_name() );
        $this->assertEquals( 'en_GB', $locale->get_code() );
        return $locale;
    }
    
    
    public function testLocaleEquality(){    
        $locale = LocoLocale::init('en','GB');
        $other = LocoLocale::init('en','');
        $this->assertTrue( $locale->equal_to($other), $locale.' is not the same locale as '.$other );
    }
    
    
    public function testLocaleGrep(){
        $locale = LocoLocale::init('en','GB');
        $pattern = '/'.$locale->preg().'/';
        $this->assertTrue( (bool) preg_match($pattern, '--en_GB' ) );
    }
    
    
    public function testPluralFormCounts(){
        // English - two forms
        $locale = LocoLocale::init('en','GB');
        extract( $locale->export() );
        $this->assertEquals( 2, $nplurals );
        // Chinese - one form
        $locale = LocoLocale::init('zh','TW');
        extract( $locale->export() );
        $this->assertEquals( 1, $nplurals );
        // Polish - three forms
        $locale = LocoLocale::init('pl','PL');
        extract( $locale->export() );
        $this->assertEquals( 3, $nplurals );
        // Arabic - six forms
        $locale = LocoLocale::init('ar','AE');
        extract( $locale->export() );
        $this->assertEquals( 6, $nplurals );
    }    
    

    public function testPluralFormArrays(){
        // English - two forms
        $locale = LocoLocale::init('en','GB');
        extract( $locale->export() );
        $this->assertCount( 2, $plurals );
        // Chinese - one form
        $locale = LocoLocale::init('zh','TW');
        extract( $locale->export() );
        $this->assertCount( 1, $plurals );
        // Polish - three forms
        $locale = LocoLocale::init('pl','PL');
        extract( $locale->export() );
        $this->assertCount( 3, $plurals );
        // Arabic - six forms
        $locale = LocoLocale::init('ar','AE');
        extract( $locale->export() );
        $this->assertCount( 6, $plurals );
    }
    
    
    
    
}