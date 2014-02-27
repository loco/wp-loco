<?php
/**
 * Script that deliberately fails
 */
try {
    throw new Exception('Unknown error');
}  
catch( Exception $Ex ){
    require dirname(__FILE__).'/loco-fatal.php';
}
