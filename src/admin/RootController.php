<?php
/**
 * Highest level Loco admin screen.
 */
class Loco_admin_RootController extends Loco_admin_list_BaseController {

    
    /**
     * Render main entry home screen
     */
    public function render(){
        
        // translators: home screen title where %s is the version number
        $this->set('title', sprintf( __('Loco Translate %s','loco'), loco_plugin_version() ) );
        
        // Show currently active theme on home page
        $theme = Loco_package_Theme::create(null);
        $this->set('theme', $this->bundleParam($theme) );
        
        // Show plugins that have currently loaded translations
        $bundles = array();
        foreach( Loco_package_Listener::singleton()->getPlugins() as $bundle ){
            try {
                $bundles[] = $this->bundleParam($bundle);
            }
            catch( Exception $e ){
                // bundle should exist if we heard it. reduce to debug notice
                Loco_error_AdminNotices::debug( $e->getMessage() );
            }
        }
        $this->set('plugins', $bundles );
        

        // Show recently "used' bundles
        $bundles = array();
        $recent = Loco_data_RecentItems::get();
        foreach( $recent->getBundles() as $id ){
            try {
                $bundle = Loco_package_Bundle::fromId($id);
                $bundles[] = $this->bundleParam($bundle);
            }
            catch( Exception $e ){
                // possible that bundle ID changed since being saved in recent items list
            }
        }
        $this->set('recent', $bundles );
        

        // TODO favourites/starred
        
        return $this->view('admin/root');
    }


}