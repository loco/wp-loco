<?php
/**
 * Warns about missing PHP glob functionality under Solaris
 */

if( ! defined('GLOB_BRACE') && ( ! defined('DOING_AJAX') || ! DOING_AJAX ) ){
    define( 'GLOB_BRACE', 0 );
    LocoAdmin::warning( Loco::__("Loco Translate will not work properly on this server's operating system") );
}
