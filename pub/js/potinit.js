/**
 * Script for POT file initializing page
 */
!function( window, document, $ ){
    
    var loco = window.locoScope,
        fsHook = document.getElementById('loco-fs'),
        elForm = document.getElementById('loco-potinit')
    ;


    // enable disable form submission
    
    /*function setFormDisabled( disabled ){
        $(elForm).find('button.button-primary').each( function( i, button ){
            button.disabled = disabled;
        } );
    }*/

    
    // Submit form to Ajax end point when ..erm.. submitted
    
    function onXgettextSuccess( data ){
        var href = data && data.redirect;
        if( href ){
            location.assign( href );
        }
    }
    
    function process( event ){
        event.preventDefault();
        loco.ajax.submit( event.target, onXgettextSuccess );
        return false;
    }
    
    
    $(elForm)
        .submit( process );

    //setFormDisabled( false );
    
    if( fsHook ){
        loco.fs.init(fsHook).setForm( elForm );
    }
    

}( window, document, jQuery );