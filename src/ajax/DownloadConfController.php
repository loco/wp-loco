<?php
/**
 * Downloads a bundle configuration as XML or Json
 */
class Loco_ajax_DownloadConfController extends Loco_ajax_common_BundleController {
    
    
    /**
     * {@inheritdoc}
     */
    public function render(){
        
        $this->validate();
        $bundle = $this->getBundle();

        $file = new Loco_fs_File( $this->get('path') );

        // Download actual loco.xml file if bundle is configured from it
        if( 'file' === $bundle->isConfigured() && 'xml' === $file->extension() ){
            $file->normalize( $bundle->getDirectoryPath() );
            if( $file->readable() ){
                return $file->getContents(); 
            }
        }
        
        // else render temporary config file
        $writer = new Loco_config_BundleWriter($bundle);
        
        switch( $file->extension() ){
        case 'xml':
            return $writer->toXml();
        case 'json':
            return json_encode( $writer->jsonSerialize() );
        }
        
        // @codeCoverageIgnoreStart
        throw new Loco_error_Exception('Specify either XML or JSON file path');
    }
        
    
}