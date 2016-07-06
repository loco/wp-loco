<?php
/**
 * 
 */
class Loco_fs_LocaleDirectory extends Loco_fs_Directory {  

    /**
     * Get location identifier which signifies the type if translation storage 
     * - "plugin": bundled inside a plugin (official/author)
     * - "theme": bundled inside a theme (official/author)
     * - "wplang": under the global languages directory and probably installed by auto-updates
     * - "custom": anywhere else
     * 
     * @return string 
     */
    public function getTypeId(){
        // paths must be compared with trailing slashes so "/foo" doesn't match "/foo-bar"
        $path = trailingslashit( $this->normalize() );
        
        // anything under Loco's protected directory is ours        
        $prefix = trailingslashit( loco_constant('LOCO_LANG_DIR') );
        if( substr($path,0,strlen($prefix) ) === $prefix ){
            return 'loco';
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
        
        // anything else is custom, which includes subdirectories of WP_LANG_DIR etc..
        return 'custom';
    }


    /**
     * Get translated version of getTypeId
     * @return string
     */
    public function getTypeLabel( $id ){
        switch( $id ){
        case 'theme':
        case 'plugin':
            return __('Official','loco');
        case 'wplang':
            return __('Installed','loco');
        case 'loco':
            return 'Loco';
        case 'custom':
            return __('Custom','loco');
        }
        
        throw new InvalidArgumentException('Invalid location type: '.$id );
    }        


}