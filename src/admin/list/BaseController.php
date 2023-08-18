<?php
/**
 * Common controller for listing of all bundle types
 */
abstract class Loco_admin_list_BaseController extends Loco_mvc_AdminController {
    
    private $bundles = [];


    /**
     * Build renderable bundle variables
     * @param Loco_package_Bundle
     * @return Loco_mvc_ViewParams
     */
    protected function bundleParam( Loco_package_Bundle $bundle ){
        $handle = $bundle->getHandle();
        $default = $bundle->getDefaultProject();
        return new Loco_mvc_ViewParams(  [
            'id'   => $bundle->getId(),
            'name' => $bundle->getName(),
            'dflt' => $default ? $default->getDomain() : '--',
            'size' => count( $bundle ),
            'save' => $bundle->isConfigured(),
            'type' => $type = strtolower( $bundle->getType() ),
            'view' => Loco_mvc_AdminRouter::generate( $type.'-view', [ 'bundle' => $handle ] ),
            'time' => $bundle->getLastUpdated(),
        ] );
    }
    

    /**
     * Add bundle to enabled or disabled list, depending on whether it is configured
     * @param Loco_package_Bundle
     */
    protected function addBundle( Loco_package_Bundle $bundle ){
        $this->bundles[] = $this->bundleParam($bundle);
    }
    

    /**
     * {@inheritdoc}
     */
    public function getHelpTabs(){
        return  [
            __('Overview','loco-translate') => $this->viewSnippet('tab-list-bundles'),
        ];
    }


    /**
     * {@inheritdoc}
     */
    public function render(){

        // breadcrumb is just the root
        $here = new Loco_admin_Navigation(  [
            new Loco_mvc_ViewParams( [ 'name' => $this->get('title') ] ),
        ] );
        
        /*/ tab between the types of bundles
        $types = array (
            '' => __('Home','loco-translate'),
            'theme'  => __('Themes','loco-translate'),
            'plugin' => __('Plugins','loco-translate'),
        );
        $current = $this->get('_route');
        $tabs = new Loco_admin_Navigation;
        foreach( $types as $type => $name ){
            $href = Loco_mvc_AdminRouter::generate($type);
            $tabs->add( $name, $href, $type === $current );
        }
        */
        
        return $this->view( 'admin/list/bundles',  [
            'bundles' => $this->bundles,
            'breadcrumb' => $here,
        ] );
    }

    
}