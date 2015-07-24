<?php
/**
 * Polyfiller for versions of PHP below 5.4.
 * Cannot fix use of [array,literals] but can fudge some built in classes and interfaces
 */

 
/**
 * < 5.4
 */ 
if( ! interface_exists('JsonSerializable') ){
    interface JsonSerializable {
        public function jsonSerialize();
    }
}


/**
 * <= 5.0.5
 */
if( ! interface_exists('Countable') ){
    interface Countable {
        public function count();
    }
}

