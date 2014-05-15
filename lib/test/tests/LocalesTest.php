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
        $this->assertCount( 130, $map );
    }
    
    
    public function testSimpleLocaleResolve(){
        $locale = loco_locale_resolve('en_GB');
        $this->assertInstanceOf('LocoLocale', $locale );
        $this->assertEquals( 'English (UK)', $locale->get_name() );
        $this->assertEquals( 'en_GB', $locale->get_code() );
        // assert plurals
        $data = $locale->export();
        $this->assertEquals( 2, (int) $data['nplurals'] );
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