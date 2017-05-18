<?php
/**
 * PO/MO download script
 */
try {
    
    if( 'POST' !== $_SERVER['REQUEST_METHOD'] ){
        throw new Exception( 'Method not permitted', 405 );
    }

    // no errors ruining response please
    if( false === ini_set( 'display_errors', 0 ) ){
        error_reporting(0);
    }

    if( ! function_exists('current_user_can') || ! class_exists('LocoAdmin') ){
        throw new Exception('WordPress not bootstrapped');
    }
    
    if( ! current_user_can(Loco::admin_capablity()) ){
        throw new Exception( __('User does not have permission to manage translations','loco-legacy'), 403 );
    }

    if( empty($po) ){
        throw new Exception( 'Empty source data', 422 );
    }
    
    if( empty($path) ){
        $name = 'messages.po';
        $ext = 'po';
    }
    else {
        $name = basename($path);
        $ext = strtolower( pathinfo( $name, PATHINFO_EXTENSION ) );
    }
    
    
    // Undo magic quotes if enabled
    if( get_magic_quotes_gpc() ){
        $po = stripslashes( $po );
    }
    
    
    // Simple post-through for PO and POT
    if( 'mo' !== $ext ){
        header('Content-Type: application/x-gettext; charset=UTF-8', true );        
        header('Content-Length: '.strlen($po), true );
        header('Content-Disposition: attachment; filename='.$name, true );
        echo $po;
        exit(0);
    }


    // Attempt to compile MO direct to file via shell
    if( $msgfmt = LocoAdmin::msgfmt_command() ){
        try {
            loco_require('build/shell-compiled');
            define( 'WHICH_MSGFMT', $msgfmt );
            // use temp file if possible, due to stdin size restrictions
            if( $popath = tempnam( sys_get_temp_dir(), 'loco-' ) ){
                register_shutdown_function( 'unlink', $popath );
                file_put_contents( $popath, $po );
                $mopath = loco_compile_mo_file( $popath, $mopath );
                register_shutdown_function( 'unlink', $mopath );
                $mo = file_get_contents( $mopath );
            }
            else {
                $mo = loco_compile_mo( $po );
            }
        }
        catch( Exception $Ex ){
            error_log( $Ex->getMessage(), 0 );
        }
        if( ! $mo ){
            throw new Exception( sprintf( __('Failed to compile MO file with %s, check your settings','loco-legacy'), WHICH_MSGFMT ) );
        }
    }

    // Fall back to in-built MO compiler - requires PO is parsed too
    else {
        $mo = LocoAdmin::msgfmt_native($po);
    }

    // exit with binary MO    
    header('Content-Type: application/x-gettext-translation; charset=UTF-8', true );        
    header('Content-Length: '.strlen($mo), true );
    header('Content-Disposition: attachment; filename='.$name, true );
    echo $mo;
    exit(0);
    
     
}  
catch( Exception $Ex ){
    require dirname(__FILE__).'/loco-fatal.php';
}
