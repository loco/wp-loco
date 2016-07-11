/**
 * Script for file delete operation
 */
!function( window, document, $ ){
    
    var fsHook = document.getElementById('loco-fs'),
        elForm = document.getElementById('loco-del');
    
    if( fsHook && elForm ){
        window.locoScope.fs
            .init( fsHook )
            .setForm( elForm );
    }

}( window, document, jQuery );