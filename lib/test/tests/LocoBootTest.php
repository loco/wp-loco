<?php
/**
 * Top level class tests
 * @group core
 */
class LocoBootTest extends PHPUnit_Framework_TestCase {
    
    
    private function parsePluginHeader(){
        static $header;
        if( ! isset($header) ){
            $block = '';
            foreach( token_get_all(file_get_contents(__DIR__.'/../../../loco.php') ) as $tok ){
                if( is_array($tok) && T_COMMENT === $tok[0] && '*' === $tok[1]{1} ){
                    $block = trim($tok[1]," \n\r/*");
                    break;
                }
            }
            $header = array();
            foreach( preg_split('/(?:\r\n|\n|\r)/', $block, -1, PREG_SPLIT_NO_EMPTY) as $line ){
                list( $key, $val ) = explode( ':', $line, 2 );
                $header[ trim($key) ] = trim( $val );
            }
        }
        return $header;
    }
    
    
    
    public function testVersionMatchesPluginHeader(){
        $this->assertInternalType('string', Loco::VERSION );
        $header = $this->parsePluginHeader();
        $this->assertEquals( Loco::VERSION, $header['Version'], 'Version number mismatch' );
    }
    
    
    
    public function testNamespaceMatchesTextDomain(){
        $this->assertInternalType('string', Loco::NS );
        $header = $this->parsePluginHeader();
        $this->assertEquals( Loco::NS, $header['Text Domain'], 'Text domain mismatch' );
    }
    
    
    public function testDefaultAdminCapabilityIsManageOptions(){
        $this->assertSame( 'manage_options', Loco::admin_capablity() );
    }
    
}




