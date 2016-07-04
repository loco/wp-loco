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
        $plugins = array();
        foreach( Loco_package_Listener::singleton()->getPlugins() as $bundle ){
            $plugins[] = $this->bundleParam($bundle);
        }
        
        // TODO favourites/starred
        // TODO recently modified
        
        
        return $this->view('admin/root', array(
            'plugins' => $plugins,
        ) );
    }


}