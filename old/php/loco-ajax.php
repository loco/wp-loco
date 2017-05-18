<?php
/**
 * Admin ajax action wrapper
 */
try {
        
    // no errors ruining json response please
    if( false === ini_set( 'display_errors', 0 ) ){
        error_reporting(0);
    }

    if( ! function_exists('current_user_can') || ! class_exists('LocoAdmin') ){
        throw new Exception('Ajax action only');
    }
    
    if( ! current_user_can(Loco::admin_capablity()) ){
        throw new Exception( __('User does not have permission to manage translations','loco-legacy'), 403 );
    }
    
    $incphp = isset($action) ? dirname(__FILE__).'/'.$action.'.php' : '';
    if( ! $incphp || ! file_exists($incphp) ){
        throw new Exception('Bad Ajax action');
    }


    // Ajax action can only exit 200
    try {
        $response = include $incphp;
    }
    catch( Exception $Ex ){
        $response = array( 'error' => array (
            'code'    => $Ex->getCode(),
            'message' => $Ex->getMessage(),
        ) );
    }    
    
        
    if( ! is_array($response) ){
        throw new Exception('Ajax action did not return a response');
    }
    
    // json ok
    $body = json_encode( $response );
    header('Content-Type: application/json; charset=UTF-8', true );
    header('Content-Length: '.strlen($body), true );
    echo $body;
    exit(0);
        
    
}
catch( Exception $Ex ){
    require dirname(__FILE__).'/loco-fatal.php';
}