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

function add_filter(){
    // noop    
}

function apply_filters( $value ){
    return $value;
}

function get_locale(){
    return 'en_US';
}

function __($t){
    return $t;
}

define('WP_DEBUG', true );

require __DIR__.'/../../loco.php';

loco_require( 'loco-boot','loco-locales','build/gettext-compiled','build/shell-compiled' );