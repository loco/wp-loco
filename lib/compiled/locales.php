<?php
/**
 * Downgraded for PHP 5.6 compatibility. Do not edit.
 * @noinspection ALL
 */
function loco_parse_wp_locale(  $tag ) { if( ! preg_match( '/^([a-z]{2,3})(?:[-_]([a-z]{2}))?(?:[-_]([a-z\\d]{3,8}))?$/i', $tag, $tags ) ){ throw new InvalidArgumentException('Invalid WordPress locale: '.json_encode($tag) ); } $data = [ 'lang' => strtolower( $tags[1] ), ]; if( array_key_exists(2,$tags) && $tags[2] ){ $data['region'] = strtoupper($tags[2]); } if( array_key_exists(3,$tags) && $tags[3] ){ $data['variant'] = strtolower($tags[3]); } return $data; }
