/**
 * Script for file delete operation
 */
!function( window, document, $ ){
    
    var fsConnect = window.locoScope.fs.init( document.getElementById('loco-fs') );
    fsConnect.setForm( document.getElementById('loco-del') );

}( window, document, jQuery );