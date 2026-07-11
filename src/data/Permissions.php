<?php
/**
 * Abstraction of WordPress roles and capabilities and how they apply to Loco.
 */
class Loco_data_Permissions implements IteratorAggregate {

    /**
     * Loco capabilities applicable to roles able to access our Loco admin screens
     */
    private static array $caps = ['loco_admin'];


    /**
     * Lazy create the "translator" role, but grants nothing.
     */
    public static function ensureTranslator():WP_Role {
        $role = get_role('translator');
        if( ! $role instanceof WP_Role ){
            $role = add_role('translator', _x( 'Translator', 'User role', 'loco-translate' ), ['read']);
        }
        return $role;
    }


    /**
     * Test if a given user has implied (irrevocable) `loco_admin` capability.
     */
    public static function isSuperAdmin( WP_User $user ):bool {
        // is_super_admin() checks for "delete_users" capability, but that could include custom roles that a *real* admin must control.
        // Here we check the user is also assigned the built-in "administrator" role, and that this role is what makes them super.
        return is_super_admin($user->ID) && ( is_multisite() || ( in_array('administrator',$user->roles,true) && get_role('administrator')->has_cap('delete_users') ) );
    }
    
    
    /**
     * @inheritdoc 
     * @return ArrayIterator<int,string>
     */
    public function getIterator():Traversable{
        return new ArrayIterator(self::$caps);
    }


    /**
     * Get all WordPress roles indexed by short name.
     * @return array<string,WP_Role>
     */
    public function getRoles():array {
        $roles = wp_roles();
        return $roles->role_objects;
    }


    /**
     * Completely remove all Loco permissions, as if uninstalling
     */
    public function remove():void {
        $roles = $this->getRoles();
        foreach( $roles as $role ){
            foreach( $this as $cap ){
                $role->has_cap($cap) && $role->remove_cap($cap);
            }
        }
        // we'll only remove our custom role if it has no capabilities other than "read".
        // this avoids breaking other plugins that may use it / had added it before Loco was installed.
        $role = $roles['translator']??null;
        if( $role instanceof WP_Role ){
            if( ! $role->capabilities || ['read'] === array_keys($role->capabilities) ){
                remove_role('translator');
            }
        }
    }


    /**
     * Get translated WordPress role name
     */
    public function getRoleName( string $id ):string {
        if( 'translator' === $id ){
            $label = _x( 'Translator', 'User role', 'loco-translate' );
        }
        else {
            $names = wp_roles()->role_names;
            $label = isset($names[$id]) ? translate_user_role( $names[$id] ) : $id;
        }
        return $label;
    }

}
