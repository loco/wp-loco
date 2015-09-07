<?php
/**
 * Admin ajax include that syncs PO or POT file with sources
 */
 
    DOING_AJAX or die();
    
    if( empty($path) || ! isset($name) || empty($type) ){
        throw new Exception( Loco::__('Invalid data posted to server'), 422 );
    }
  
    // path is allowed to not exist yet
    if( '/' !== $path{0} ){
        $path = WP_CONTENT_DIR.'/'.$path;
    }

    // but package must exist so we can get POT or source
    /* @var $package LocoPackage */
    loco_require('loco-packages','loco-locales');
    $package = LocoPackage::get( $name, $type );
    if( ! $package ){
        throw new Exception( sprintf( Loco::__('Package not found called %s'), $name ), 404 );
    }


    while( true ){

        // If file we're syncing is POT, we can only sync from sources
        if( ! LocoAdmin::is_pot($path) ){
               
            // if a POT file exists, sync from that
            $domain = LocoAdmin::resolve_file_domain($path) or $domain = $package->get_domain();
            if( $pot_path = $package->get_pot($domain) ){
                $exp = LocoAdmin::parse_po( $pot_path );
                if( ! $exp || ( 1 === count($exp) && '' === $exp[0]['source'] ) ){
                    // throw new Exception( Loco::__('POT file is empty').' - '.basename($pot_path) );
                    // fall through to try source code
                }
                else {
                    $pot = basename($pot_path);
                    break;
                }
            }
    
        }
    
        // Extract from sources
        if( $exp = LocoAdmin::xgettext( $package, dirname($path) ) ){
            $pot = '';
            break;
        }

        throw new Exception( Loco::__('No strings could be extracted from source code') );
    }
    

    // sync selected headers
    $headers = array();
    if( '' === $exp[0]['source'] ){
        $keep = array('Project-Id-Version','Language-Team','POT-Creation-Date','POT-Revision-Date');
        $head = loco_parse_po_headers( $exp[0]['target'] );
        $headers = array_intersect_key( $head->export(), array_flip($keep) );
        /*/ add prefixed header keys that can't be included above
        foreach( $head as $key => $value ){
            if( 0 === strpos($key, 'X-Poedit-' ) ){
                $headers[$key] = $value;
            }
        }*/
        $exp[0] = array();
    }
        

    // sync ok.
    return compact( 'pot', 'exp', 'headers' );
    
    
