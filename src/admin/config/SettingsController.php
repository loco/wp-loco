<?php
/**
 *  Site-wide Loco options (plugin settings)
 */
class Loco_admin_config_SettingsController extends Loco_admin_config_BaseController {

    /**
     * Populate permission settings from posted checkboxes.
     * @param array[] $checked Enabled capabilities indexed by role. e.g ['administrator'=>['loco_admin'=>true]]
     */    
    public static function grant( array $checked ):void {
        $user = wp_get_current_user();
        if( ! $user instanceof WP_User || ! $user->has_cap('manage_options') ){
            throw new Loco_error_Exception('Current user must have manage_options capability');
        }
        $perms = new Loco_data_Permissions;
        $roles = $perms->getRoles();
        // reshape role/capability map, accounting for unchecked checkboxes
        $grant = [];
        $revoke = [];
        foreach( $roles as $name => $role ){
            $apply = $checked[$name]??[];
            foreach( $perms as $cap ){
                if( $apply[$cap]??false ){
                    $role->has_cap($cap) or $grant[$cap][] = $name;
                }
                else {
                    $role->has_cap($cap) && $revoke[$cap][] = $name;
                }
            }
        }
        if( $revoke ){
            // Before we revoke, protect against locking out the current user, already known to have access.
            // here we see if the user will still have at least one role providing loco_admin after revocation.
            // TODO it would be preferable just to do $user->has_cap() after revocation, but that would require a rebuild and a rollback.
            if( ! Loco_data_Permissions::isSuperAdmin($user) ){
                $cap = 'loco_admin';
                $old = array_filter( $user->roles, [__CLASS__,'role_has_loco_admin'] );
                $new = array_diff( $old, $revoke[$cap]??[] );
                if( ! $new ){
                    Loco_error_AdminNotices::debug( sprintf('Revoking %s from [%s] would lock current user out of the plugin',$cap,implode(',',$old)) );
                    throw new Loco_error_Exception('Refusing to revoke your own access');
                }
            }
            // OK to revoke our capability set
            foreach( $revoke as $cap => $names ){
                foreach( $names as $name ){
                    $roles[$name]->remove_cap($cap);
                }
            }
        }
        // Grant our capability set to new roles selected
        foreach( $grant as $cap => $names ){
            foreach( $names as $name ){
                $roles[$name]->add_cap($cap);
            }
        }
    }


    /**
     * Callback function used for array_filter()
     */
    private static function role_has_loco_admin( string $name ):bool {
        $role = get_role($name);
        return $role && $role->has_cap('loco_admin');
    }



    /**
     * {@inheritdoc}
     */
    public function init(){
        parent::init();
        
        // set current plugin options and defaults for placeholders
        $opts = Loco_data_Settings::get();
        $this->set( 'opts', $opts );
        $this->set( 'dflt', Loco_data_Settings::create() );
        
        // roles and capabilities
        $perms = new Loco_data_Permissions;

        // handle save action 
        $nonce = $this->setNonce('save-config');
        try {
            if( $this->checkNonce($nonce->action) ){
                $post = Loco_mvc_PostParams::get();
                if( $post->has('opts') ){
                    $opts->populate( $post->opts )->persist();
                    self::grant( $post->getArrayProp('caps') );
                    // updates complete
                    Loco_error_AdminNotices::success( __('Settings saved','loco-translate') );
                    // remove saved params from session if persistent options unset
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
        // faux protected role for multi-site super admin
        if( is_multisite() ){
            $caps[''] = new Loco_mvc_ViewParams( [
                'label' => __('Super Admin','loco-translate'),
                'name' => 'dummy-admin-cap',
                'attrs' => 'checked disabled'
            ] );
        }
        foreach( $perms->getRoles() as $name => $role ){
            $attrs = [];
            // revocation from the "administrator" role is not possible, assuming it provides super admin status.
            // Loco_hooks_AdminHooks::filter_user_has_cap => Loco_data_Permissions::isSuperAdmin
            if( $name === 'administrator' && ! is_multisite() && $role->has_cap('delete_users') ){
                $attrs[] = 'disabled checked';
            }
            if( $role->has_cap('loco_admin') ){
                $attrs[] = 'checked';
            }
            $caps[$name] = new Loco_mvc_ViewParams( [
                'value' => '1',
                'label' => $perms->getRoleName($name),
                'name' => 'caps['.$name.'][loco_admin]',
                'attrs' => implode(' ',$attrs),
            ] );
        }
        // We *could* avoid lazy creating the "translator" role until ticked. We can show an unticked dummy here.
        /*foreach( ['translator'] as $name ){
            if( ! $caps->has('translator') ){
                $caps[$name] = new Loco_mvc_ViewParams( [
                    'value' => '1',
                    'label' => $perms->getRoleName($name),
                    'name' => 'caps['.$name.'][loco_admin]',
                    'attrs' => '',
                ] );
            }
        }*/
        // allow/deny warning levels
        $this->set('verbose', new Loco_mvc_ViewParams( [
            0 => __('Allow','loco-translate'),
            1 => __('Allow (with warning)','loco-translate'),
            2 => __('Disallow','loco-translate'),
        ] ) );
    }



    /**
     * {@inheritdoc}
     */
    public function render(){
        
        $title = __('Plugin settings','loco-translate');
        $breadcrumb = new Loco_admin_Navigation;
        $breadcrumb->add( $title );
        
        return $this->view('admin/config/settings', compact('breadcrumb') ); 
    }
    
}
