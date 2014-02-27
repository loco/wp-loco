

!function( w, d, $ ){
    
    var form = d.getElementById('loco-msginit'),
        sloc = form['common-locale'],
        tloc = form['custom-locale'];
    
    $(sloc).change( function(){
        tloc.value = $(this).val();
        return true;
    } );                
    
    
}( window, document, window.jQuery );