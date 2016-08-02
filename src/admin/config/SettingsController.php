<?php
/**
 *  Site-wide Loco options (plugin settings)
 */
class Loco_admin_config_SettingsController extends Loco_admin_config_BaseController {


    /**
     * {@inheritdoc}
     */
    public function init(){
        parent::init();
        
        // plugin settings
        $opts = Loco_data_Settings::get();
        $this->set( 'opts', $opts );
        
        // roles and capabilities
        $perms = new Loco_data_Permissions;

        // handle save action 
        $nonce = $this->setNonce('save-config');
        try {
            if( $this->checkNonce($nonce->action) ){
                $post = Loco_mvc_PostParams::get();
                if( $post->has('opts') ){
                    $opts->populate( $post->opts )->persist();
                    $perms->populate( $post->has('caps') ? $post->caps : array() );
                    // done update
                    Loco_error_AdminNotices::success( __('Settings saved','loco') );
                    // remove saved params if persistant options unset
                    if( ! $opts['fs_persist'] ){
                        $session = Loco_data_Session::get();
                        if( isset($session['loco-fs']) ){
                            unset( $session['loco-fs'] );
                            $session->persist();
                        }
                    }
                }
            }
        }
        catch( Loco_error_Exception $e ){
            Loco_error_AdminNotices::add($e);
        }

        $this->set('caps', $caps = new Loco_mvc_ViewParams );
        /* @var $role WP_Role */
        foreach( $perms->getRoles() as $id => $role ){
            $caps[$id] = new Loco_mvc_ViewParams( array(
                'value' => '1',
                'label' => $perms->getRoleName($id),
                'name' => 'caps['.$id.'][loco_admin]',
                'attrs'  => $role->has_cap('manage_options') ? 'checked disabled ' : ( $role->has_cap('loco_admin') ? 'checked ' : '' ),
            ) );
        }
        
        
        
    }



    /**
     * {@inheritdoc}
     */
    public function render(){
        
        $title = __('Plugin settings','loco');
        $breadcrumb = new Loco_admin_Navigation;
        $breadcrumb->add( $title );
        
        return $this->view('admin/config/settings', compact('breadcrumb') ); 
    }
    
}
