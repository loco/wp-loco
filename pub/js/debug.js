!function( window, document, navigator, $ ){
    
    
    
    var form = document.getElementById('loco-debug');
    
    
    function setFieldValue( name, value ){
        name = 'loco['+name+']';
        form[name].value = value;
    }
    
    
    
    setFieldValue( 'ua', navigator.userAgent || navigator.appVersion );
    
    
    
    



}( window, document, navigator, window.jQuery );