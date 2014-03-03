<?php
/**
 * Unit tests for compiled Loco utils.
 * $ php -c /etc -f /path/to/phpunit.phar - --colors path/to/test.php
 */
require __DIR__.'/gettext-compiled.php';
require __DIR__.'/locales-compiled.php';
require __DIR__.'/shell-compiled.php';
require __DIR__.'/../loco-locales.php';


class LocoTest extends PHPUnit_Framework_TestCase {
    
    /**
     * Test PO parser.
     */    
    public function testParsePO(){
        $popath = __DIR__.'/../../languages/loco-translate-de_DE.po';
        $this->assertFileExists( $popath );
        $posrc = file_get_contents($popath);
        $po = loco_parse_po( $posrc );
        // test header as guaranteed first string
        $head = $po[0];
        $this->assertEquals( '', $head['source'] );
        $head = loco_parse_po_headers( $head['target'] );
        /* @var $head LocoArray */
        $this->assertEquals( 'Loco Translate', $head->__get('Project-Id-Version'), 'Failed to extract Project-Id-Version' );
        $this->assertEquals( 'German', $head->language, 'Failed to extract Language header' );
        return $po;
    }


    /**
     * Test native MO writer
     * @depends testParsePO
     */
    public function testNativeMsgfmt( array $po ){
        $bin = loco_msgfmt( $po );
        $this->assertStringStartsWith( "\xDE\x12\x04\x95\0\0\0\0", $bin, 'Bad magic number encoding' );
        $this->assertStringEndsWith( "\0", $bin, 'Bad mo file ending' );
    }
    
    
    
    /**
     * Test shell msgfmt MO writer
     */
    public function testShellMsgfmt(){
        // test finding of executable
        $cmd = loco_find_executable('msgfmt');
        $this->assertStringEndsWith('/msgfmt', $cmd );
        define( 'WHICH_MSGFMT', $cmd );
        // test shell compile via temp file
        $popath = realpath( __DIR__.'/../../languages/loco-translate-de_DE.po' );
        $mopath = tempnam( sys_get_temp_dir(), 'loco-mo-' );
        register_shutdown_function('unlink', $mopath );
        $this->assertEquals( $mopath, loco_compile_mo_file( $popath, $mopath ), 'Failed to compile MO' );
        $bin = file_get_contents( $mopath );
        $this->assertStringEndsWith( "\0", $bin, 'Bad mo file ending' );
    }    
    

    
    /**
     * Test locale data
     */
    public function testLocales(){
        $locale = loco_locale_resolve( '--fr_FR' );
        $this->assertEquals('French', $locale->get_name(), 'Failed to parse language code fr_FR' );
        // object equality
        $other = LocoLocale::init('fr','');
        $this->assertTrue( $locale->equal_to($other), $locale.' is not the same locale as '.$other );
        // plurals
        $data = $locale->export();
        $this->assertEquals( 2, (int) $data['nplurals'] );
        // preg matching
        $pattern = '/'.$locale->preg().'/';
        $this->assertTrue( (bool) preg_match($pattern, '--fr_FR' ) );
    }
    
    
    
    /**
     * Test plural forms
     */
    public function testPluralForms(){
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

}


