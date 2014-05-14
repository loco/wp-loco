<?php
/**
 * Unit test bootstrapper.
 * This is nothing close to an accurate simulation of Wordpress environment, it's just for testing utils.
 * @usage phpunit --bootstrap bootstrap.php .
 */
 
function is_admin(){
    return false;
} 

function esc_html( $text ){
    return htmlspecialchars( $text, ENT_COMPAT, 'UTF-8' );
}

function add_action(){
    // noop    
}

require __DIR__.'/../../loco.php';

loco_require( 'loco-locales','build/gettext-compiled', 'build/locales-compiled', 'build/shell-compiled' );