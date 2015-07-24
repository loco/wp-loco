<?php
/**
 * @group compat
 */
class PhpVersionTest extends PHPUnit_Framework_TestCase {
    
    
    /*public function testPhp54BracketSyntax(){
        $ok = [];
    }*/
    
    public function testPhpIsAtLeast53(){
        $this->assertTrue( version_compare( phpversion(), '5.4', '>=' ) );
    }
    
    
}