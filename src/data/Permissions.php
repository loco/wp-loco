<?php
/**
 * Abstraction of WordPress roles and capabilities and how they apply to Loco
 * - Currently only one capability exists, proving full access "loco_admin"
 * - Any user with "manage_options" permission automatically inherits this permission
 * - A single custom role is added called "translator"
 */
class Loco_data_Permissions {
    
    
    /**
     * Polyfill for wp_roles which requires WP >= 4.3
     */
    private static function wp_roles(){
        global $wp_roles;
        if( ! isset($wp_roles) ){
            get_role('ping');
        }
        return $wp_roles;
    }


    /**
     * @return array<WP_Role>
     */
    public function getRoles(){
        $roles = self::wp_roles();
        // lazy create "translator" role
        if( ! $roles->get_role('translator') ){
            $roles->add_role( 'translator', 'Translator', array( 'loco_admin' => true ) );
        }
        return $roles->role_objects;
    }


    /**
     * Completely remove all Loco permissions, as if uninstalling
     * @return Loco_data_Permissions
     */
    public function remove(){
        /* @var $role WP_Role */
        foreach( $this->getRoles() as $role ){
            $role->remove_cap('loco_admin');
        }
        // we'll only remove our custom role if it has no capabilities 
        // this avoids breaking other plugins that use it, or added it.
        if( $role = get_role('translator') ){
            if( ! $role->capabilities ){
                remove_role('translator');
            }
        }
        return $this;
    }


    /**
     * Reset to default: roles include no Loco capabilities unless they have manage_options or are custom "translator" role
     * @return Loco_data_Permissions
     */
    public function reset(){
        /* @var $role WP_Role */
        foreach( $this->getRoles() as $role ){
            if( $role->has_cap('manage_options') || 'translator' === $role->name ){
                $role->add_cap('loco_admin');
            }
            else {
                $role->remove_cap('loco_admin');
            }
        }
        return $this;
    }


    /**
     * Get translated WordPress role name
     */
    public function getRoleName( $id ){
        if( 'translator' === $id ){
            $label = _x( 'Translator', 'User role', 'loco' );
        }
        else {
            $names = self::wp_roles()->role_names;
            $label = isset($names[$id]) ? translate_user_role( $names[$id] ) : $id;
        }
        return $label;
    }
    


    /**
     * Populate permission settings from posted checkboxes
     * @return Loco_data_Permissions
     */
    public function populate( array $caps ){
        // drop all permissions before adding (cos checkboxes)
        $this->reset();
        $roles = $this->getRoles();
        foreach( $caps as $id => $checked ){
            if( isset($roles[$id]) ){
                $role = $roles[$id];
                foreach( array('loco_admin') as $cap ){
                    if( ! empty($checked[$cap]) && ! $role->has_cap($cap) ){
                        $role->add_cap($cap);
                    }
                } 
            }
        }
        return $this;
    }
    
} 