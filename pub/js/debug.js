/**
 * Run Javascript diagnostics
 */
!function( loco, $ ){

    // check tick symbol is readable by JavaScript as UTF-8
    // E2\x9C\x93 => 0x2713
    var span = $('#loco-utf8-check'),
        tick = span[0].textContent
    ;
    if( 1 !== tick.length || 0x2713 !== tick.charCodeAt(0) ){
        loco.notices.warn("This page has a problem rendering UTF-8").stick();
    }
    
    // show custom endpoint if set in global
    if( window.ajaxurl ){
        $('#loco-ajax-url').text( window.ajaxurl );
    }
    
    
    
    // check UTF-8 passes to Ajax and back without a problem

    function onAjaxTestPass( data, status, xhr ){
        if( data && data.ping ){
            $('#loco-ajax-check').text( data.ping );
        }
        else {
            onAjaxTestFail( xhr, status, data && data.error && data.error.message );
        }
    }
    
    function onAjaxTestFail( xhr, error, message ){
        if( 'success' !== error ){
            message = loco.ajax.parse( loco.ajax.strip( xhr.responseText ) );
        }
        $('#loco-ajax-check').text( 'FAILED: '+message ).addClass('loco-danger');
    }
    
    loco.ajax.post( 'ping', {echo:'\u039F\u039A \u2713'}, onAjaxTestPass, onAjaxTestFail );
        


}( window.locoScope, window.jQuery );