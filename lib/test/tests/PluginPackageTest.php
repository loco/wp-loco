<?php
/**
 * @group package
 */
class PluginPackageTest extends PHPUnit_Framework_TestCase {
    
   
   public function testLocoPluginPackage(){
       $package = LocoPackage::get( 'loco-translate/loco.php', 'plugin' );
       $this->assertInstanceOf( 'LocoPackage', $package );
       $this->assertEquals( 'plugin', $package->get_type() );
       $this->assertEquals( Loco::NS, $package->get_domain() );
       $path = $package->lang_dir();
       $this->assertTrue( is_dir($path), 'Languages directory not found, '.$path );
   }
   
}