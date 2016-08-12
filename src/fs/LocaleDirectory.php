<?php
/**
 * 
 */
class Loco_fs_LocaleDirectory extends Loco_fs_Directory {  

    /**
     * Get location identifier which signifies the type if translation storage.
     * 
     * - "plugin": bundled inside a plugin (official/author)
     * - "theme":  bundled inside a theme (official/author)
     * - "wplang": under the global languages directory and probably installed by auto-updates
     * - "custom": Loco protected directory
     * - "other":  anywhere else
     * 
     * @return string 
     */
    public function getTypeId(){
        // paths must be compared with trailing slashes so "/foo" doesn't match "/foo-bar"
        $path = trailingslashit( $this->normalize() );
        
        // anything under Loco's protected directory is our location for custom overrides
        $prefix = trailingslashit( loco_constant('LOCO_LANG_DIR') );
        if( substr($path,0,strlen($prefix) ) === $prefix ){
            return 'custom';
        }

        // standard subdirectories of WP_LANG_DIR are under WordPress auto-update control
        $prefix = trailingslashit( loco_constant('WP_LANG_DIR') );
        if( substr($path,0,strlen($prefix) ) === $prefix ){
            if( $path === $prefix || $path === $prefix.'plugins/' || $path === $prefix.'themes/' ){
                return 'wplang';
            }
        }
        else {
            // anything under a registered theme directory is bundled
            $dirs = Loco_fs_Locations::getThemes();
            if( $dirs->check($path) ){
                return 'theme';
            }
            // anything under a registered plugin directory is bundled
            $dirs = Loco_fs_Locations::getPlugins();
            if( $dirs->check($path) ){
                return 'plugin';
            }
        }
        
        // anything else, which includes subdirectories of WP_LANG_DIR etc..
        return 'other';
    }


    /**
     * Get translated version of getTypeId
     * @return string
     */
    public function getTypeLabel( $id ){
        switch( $id ){
        case 'theme':
        case 'plugin':
            return __('Author','loco');
        case 'wplang':
            return __('System','loco');
        case 'custom':
            return __('Custom','loco');
        case 'other':
            return __('Other','loco');
        }
        
        throw new InvalidArgumentException('Invalid location type: '.$id );
    }        


}