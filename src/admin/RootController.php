<?php
/**
 * Highest level Loco admin screen.
 */
class Loco_admin_RootController extends Loco_admin_list_BaseController {

    /**
     * {@inheritdoc}
     */
    public function getHelpTabs(){
        return array (
            __('Overview','default') => $this->view('tab-home'),
        );
    }

    
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
        // filter in lieu of plugin setting
        $maxlen = apply_filters('loco_num_recent_bundles', 10 );
        foreach( $recent->getBundles(0,$maxlen) as $id ){
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
        
        
        // current locale notice
        $tag = get_locale();
        if( 'en_' !== substr($tag,0,3) ){
            $locale = Loco_Locale::parse($tag);
            $this->set( 'locale', $locale );
        }

        // roll back link
        $this->set( 'rollback', Loco_mvc_AdminRouter::generate('config-version') );

        return $this->view('admin/root');
    }


}