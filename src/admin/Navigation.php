<?php
/**
 * Generic navigation helper.
 */
class Loco_admin_Navigation extends ArrayIterator {

    
    public function add( string $name, ?string $href = null, ?bool $active = false ):self {
        $this[] = new Loco_mvc_ViewParams( compact('name','href','active') );
        return $this;
    }


    /**
     * Create a breadcrumb trail for a given view below a bundle
     */
    public static function createBreadcrumb( Loco_package_Bundle $bundle ):self {
        $nav = new Loco_admin_Navigation;

        // root link depends on bundle type
        $type = strtolower( $bundle->getType() );
        if( 'core' !== $type ){
            $link = new Loco_mvc_ViewParams( [
                'href' => Loco_mvc_AdminRouter::generate($type),
            ] );
            if( 'theme' === $type ){
                $link['name'] = __('Themes','loco-translate');
            }
            else {
                $link['name'] = __('Plugins','loco-translate');
            }
            $nav[] = $link;
        }
        
        // Add actual bundle page, href may be unset to show as current page if needed
        $nav->add (
            $bundle->getName(),
            Loco_mvc_AdminRouter::generate( $type.'-view', [ 'bundle' => $bundle->getHandle() ] )
        );
        
        // client code will add current page
        return $nav;
    }


    /**
     * Create a basic breadcrumb comprising title only
     */
    public static function createSimple( string $name ):self {
        $nav = new Loco_admin_Navigation;
        $nav->add($name);
        return $nav;
    }


}