<?php
/**
 * Base controller for global plugin configuration screens 
 */
abstract class Loco_admin_config_BaseController extends Loco_mvc_AdminController {


    /**
     * {@inheritdoc}
     */
    public function init(){
        parent::init();
        // navigate between config view siblings, but only if privileged user
        if( current_user_can('manage_options') ){
            $tabs = new Loco_admin_Navigation;
            $this->set( 'tabs', $tabs );
            $actions =  [
                ''  => __('Site options','loco-translate'),
                'user' => __('User options','loco-translate'),
                'apis' => __('API keys','loco-translate'),
                'version' => __('Version','loco-translate'),
                'debug' => __('Debug','loco-translate'),
            ];
            $suffix = (string) $this->get('action');
            foreach( $actions as $action => $name ){
                $href = Loco_mvc_AdminRouter::generate( 'config-'.$action, $_GET );
                $tabs->add( $name, $href, $action === $suffix );
            }
        }
    }
    


    /**
     * {@inheritdoc}
     */
    public function getHelpTabs(){
        return  [
            __('Overview','loco-translate') => $this->viewSnippet('tab-config'),
            __('API keys','loco-translate') => $this->viewSnippet('tab-config-apis'),
        ];
    }
    
    
}