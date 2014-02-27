<?php
/**
 * Handle exception with fatal exit
 */
$status  = $Ex->getCode() or $status = 500;
$message = $Ex->getMessage();


if( ( isset($_SERVER['HTTP_X_REQUESTED_WITH']) && 'XMLHttpRequest' === $_SERVER['HTTP_X_REQUESTED_WITH'] ) ){
    $type = 'application/json; charset=UTF-8';
    $body = json_encode( compact('status','message') );
}
else {
    $type = 'text/html; charset=UTF-8';
    $body = '<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8" />
            <title>Error '.$status.'</title>
        </head>
        <body>
            <h1>'.htmlspecialchars($message, ENT_COMPAT, 'UTF-8').'</h1>
        </body>    
    </html>
    ';
}


header( sprintf('HTTP/1.0 %u %s', $status, $message ), true, $status );
header('Content-Type: '.$type, true, $status );
header('Content-Length: '.strlen($body), true, $status );

echo $body;
exit(0);