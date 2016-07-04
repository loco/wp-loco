<?php
/**
 * Common functions for all Ajax actions that operate on a bundle 
 */
abstract class Loco_ajax_common_BundleController extends Loco_mvc_AjaxController {
    

    /**
     * @return Loco_package_Bundle
     */
    protected function getBundle(){
        $type = $this->get('type');
        $handle = $this->get('bundle');
        return Loco_package_Bundle::createType( $type, $handle );
    }



    /**
     * @return Loco_package_Project
     */
    protected function getProject( Loco_package_Bundle $bundle ){
        $project = $bundle->getProjectById( $this->get('domain') );
        if( ! $project ){
            throw new Loco_error_Exception('Failed to find translation project');
        }
        return $project;
    }
    
}