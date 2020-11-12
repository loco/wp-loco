<?php
/**
 * List all bundles of type "theme"
 * Route: loco-theme
 */
class Loco_admin_list_ThemesController extends Loco_admin_list_BaseController {

    


    public function render(){

        $this->set('type', 'theme' );
        $this->set('title', __( 'Translate themes', 'loco-translate' ) );
        
        foreach( Loco_package_Theme::getAll() as $bundle ){
            $this->addBundle( $bundle );
        }

        return parent::render();
    }

    
}