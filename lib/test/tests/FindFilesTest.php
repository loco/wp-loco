<?php
/**
 * Test admin class file finding utils.
 * tests require that twentyfourteen theme is in the expected location
 * 
 * @group files
 */
class FileFilesTest extends PHPUnit_Framework_TestCase {
    
    
    
    public function testFindPo(){
        $files = LocoAdmin::find_po( WP_LANG_DIR );
        $this->assertInternalType('array', $files );
        $this->assertArrayHasKey('po', $files );
        $this->assertArrayHasKey('pot', $files );
    }


    public function testFindPot(){
        $files = LocoAdmin::find_pot( WP_CONTENT_DIR.'/themes/twentyfourteen' );
        $this->assertInternalType('array', $files );
        $this->assertContains( WP_CONTENT_DIR.'/themes/twentyfourteen/languages/twentyfourteen.pot', $files );
    }


    public function testFindPhp(){
        $files = LocoAdmin::find_php( WP_CONTENT_DIR.'/themes/twentyfourteen' );
        $this->assertInternalType('array', $files );
        $this->assertContains( WP_CONTENT_DIR.'/themes/twentyfourteen/functions.php', $files );
    }

    
    public function testFindGrouped(){
        $pattern = WP_CONTENT_DIR.'/themes/twentyfourteen/languages/*{.po,.pot}';
        $files = LocoAdmin::find_grouped( $pattern, GLOB_NOSORT|GLOB_BRACE );
        $this->assertStringEndsWith('twentyfourteen.pot', $files['pot'][0] );
    }
    
    
}