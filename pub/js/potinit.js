/**
 * Script for POT file initializing page
 */
!function( window, document, $ ){
    
    var loco = window.locoScope,
        fsHook = document.getElementById('loco-fs'),
        elForm = document.getElementById('loco-potinit')
    ;


    // enable disable form submission
    
    function setFormDisabled( disabled ){
        $(elForm).find('input[type="submit"]').each( function( i, button ){
            button.disabled = disabled;
        } );
    }

    
    // Submit form to Ajax end point when ..erm.. submitted
    
    function onXgettextSuccess( data ){
        var href = data && data.redirect;
        if( href ){
            // TODO show success panel and hide form instead of redirect?
            // loco.notices.success('YES');
            location.assign( href );
        }
    }
    
    function process( event ){
        event.preventDefault();
        loco.ajax.submit( event.target, onXgettextSuccess );
        // TODO some kind of loader. extracting can take a long time in Core bundles and big plugins.
        return false;
    }
    
    
    $(elForm)
        .submit( process );

    setFormDisabled( false );
    
    if( fsHook ){
        loco.fs.init(fsHook).setForm( elForm );
    }
    

}( window, document, jQuery );