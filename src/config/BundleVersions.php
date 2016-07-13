<?php
/**
 * Examines multiple configurations returned from the remote configiration API and establishes the most appropriate version 
 */
class Loco_config_BundleVersions {
    
    /**
     * One or more configuration objects
     * @var array<array>
     */
    private $confs = array();
    

    /**
     * @return Loco_config_BundleVersions
     */
    public function loadJson( $json ){
        $confs = json_decode( $json, true );
        if( ! is_array($confs) ){
            throw new InvalidArgumentException('Invalid JSON');
        }
        foreach( $confs as $conf ){
            $this->addConf($conf);
        }
        return $this; 
    }
    


    /**
     * @return Loco_config_BundleVersions
     */
    public function addConf( array $conf ){
        $this->confs[] = $conf;
        return $this;
    }



    /**
     * @return Loco_package_Bundle
     */
    public function configure( Loco_package_Bundle $bundle ){
        $info = $bundle->getHeaderInfo();
        $vers = $info->Version or $vers = '0';
        $data = null;
        // loaded configs should be of form {vers:"",data:[] } in ascending order of minimum version
        foreach( $this->confs as $conf ){
            $minv = $conf['vers'];
            // if target version exceeds this minimum, use it until a greater one overrides
            if( version_compare( $vers, $minv, '>=' ) ){
                $data = $conf['data'];
            }
            // else target version is below minimum, so no point continuing
            else {
                break;
            }
        }
        if( is_null($data) ){
            throw new Loco_error_Exception( sprintf('No config suitable for version %s',$vers) );
        }
        
        $bundle->clear();
        $reader = new Loco_config_BundleReader( $bundle );
        $reader->loadArray( $data );
        
        return $bundle;
    }
    
    
}