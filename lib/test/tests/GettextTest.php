<?php
/**
 * Test built gettext libs.
 * 
 * @group gettext
 * @group built
 */
class GettextTest extends PHPUnit_Framework_TestCase {


    public function testParsePO(){
        $popath = __DIR__.'/../../../languages/loco-translate-de_DE.po';
        $this->assertFileExists( $popath );
        $posrc = file_get_contents($popath);
        $po = loco_parse_po( $posrc );
        // test header as guaranteed first string
        $head = $po[0];
        $this->assertEquals( '', $head['source'] );
        $head = loco_parse_po_headers( $head['target'] );
        /* @var $head LocoHeaders */
        $this->assertEquals( 'Loco Translate', $head->__get('Project-Id-Version'), 'Failed to extract Project-Id-Version' );
        $this->assertEquals( 'German', $head->language, 'Failed to extract Language header' );
        return $po;
    }


    /**
     * Test native MO writer
     */
    public function testNativeMsgfmt(){
        $po = array(
            array( 'source' => '', 'target' => 'Project-Id-Version: Test' ),
            array( 'source' => '__Foo__', 'target' => '__Bar__' ),
        );
        $bin = loco_msgfmt( $po );
        $this->assertStringStartsWith( "\xDE\x12\x04\x95\0\0\0\0", $bin, 'Bad magic number encoding' );
        $this->assertStringEndsWith( "\0", $bin, 'Bad mo file ending' );
        $this->assertContains( '__Foo__', $bin );
        $this->assertContains( '__Bar__', $bin );
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
        $popath = realpath( __DIR__.'/../../../languages/loco-translate-de_DE.po' );
        $mopath = tempnam( sys_get_temp_dir(), 'loco-mo-' );
        register_shutdown_function('unlink', $mopath );
        $this->assertEquals( $mopath, loco_compile_mo_file( $popath, $mopath ), 'Failed to compile MO' );
        $bin = file_get_contents( $mopath );
        $this->assertStringEndsWith( "\0", $bin, 'Bad mo file ending' );
    }
    
    
    
    /**
     * Test xgettext style tring extraction
     */
    public function testLocoPHPExtractor(){
        $source = file_get_contents( __DIR__.'/../../../pub/js/lang/dummy.php' );
        $tokens = token_get_all($source);
        $extractor = new LocoPHPExtractor;
        $export = $extractor->extract( $tokens, 'test.php' );
        // should have got 18 messages, 2 of which pluralized
        $this->assertCount( 20, $export );
        // check first message on line 8, "Unknown error"
        $this->assertEquals( 'Unknown error', $export[0]['source'] );
        // reference should be intact with line number
        $this->assertContains('test.php:8', $export[0]['refs'] );
        // first message should not have included the file header comment not intended to go with it
        $this->assertEmpty( $export[0]['notes'], 'Comment block should not have been extracted' );
        // third item should auto-detect its php-format flag
        $this->assertEquals( 'php', $export[3]['format'] );
    }


}



