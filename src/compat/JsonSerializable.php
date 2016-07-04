<?php
// @codeCoverageIgnoreStart

/**
 * Placeholder for missing interface in PHP < 5.4.
 * Can't be invoked automatically, so always do: json_encode( $obj->jsonSerialize() )
 */
if( ! interface_exists('JsonSerializable') ){
    interface JsonSerializable {
        public function jsonSerialize();
    }
}

// @codeCoverageIgnoreEnd

/**
 * Redundant interface so this file will autoload when JsonSerializable is referenced
 */
interface Loco_compat_JsonSerializable extends JsonSerializable {
    
}