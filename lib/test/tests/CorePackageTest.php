<?php
/**
 * @group package
 * @group core
 */
class CorePackageTest extends PHPUnit_Framework_TestCase {
    
   
   public function testGetCorePackage(){
       $package = LocoPackage::get( 'continents-cities', 'core' );
       $this->assertInstanceOf( 'LocoPackage', $package );
       $this->assertEquals( 'core', $package->get_type() );
       $this->assertEquals( 'Continents & Cities', $package->get_name() );
       $this->assertEquals( 'continents-cities', $package->get_domain() );
       $this->assertEmpty( $package->get_source_dirs() );
   }
   
   
   public function testGetCoreDefaultPackage(){
       $package = LocoPackage::get( '', 'core' );
       $this->assertEquals( 'core', $package->get_type() );
       $this->assertEquals( 'Development', $package->get_name() );
       $this->assertEquals( 'default', $package->get_domain() );
       $this->assertEmpty( $package->get_source_dirs() );
   }



   public function testGetCorePackages(){
       $packages = LocoPackage::get_core_packages();
       $this->assertCount( 5, $packages );
       $this->assertArrayHasKey( '', $packages );
       $this->assertArrayHasKey( 'ms', $packages );
       $this->assertArrayHasKey( 'admin', $packages );
       $this->assertArrayHasKey( 'admin-network', $packages );
       $this->assertArrayHasKey( 'continents-cities', $packages );
   }
   
   
   
    
    
    
}