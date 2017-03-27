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
        loco.notices.warning("This page has a problem rendering UTF-8").stick();
    }
    
    // show custom endpoint if set in global
    if( window.ajaxurl ){
        $('#loco-ajax-url').text( window.ajaxurl );
    }
    
    // check UTF-8 passes to Ajax and back without a problem
    loco.ajax.post( 'ping', {echo:'\u039F\u039A \u2713'},
        function( data, status, xhr ){
            $('#loco-ajax-check').text( data.ping||'FAILED' );
        },
        function( xhr, error, message ){
            var text = $('<pre>'+xhr.responseText+'</pre>').text();
            $('#loco-ajax-check').text( text||'FAILED' );
        }
    );
        


}( window.locoScope, window.jQuery );