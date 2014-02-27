/**
 * Dummy translations, simply echos back as if translations all missing
 */
loco = window.loco||{}, loco.t = function(){
    
    // calc numeric index of a plural form (0-1)
    function pluralIndex( n ){
        return Number( n != 1 );
    }
    
    // expose public t() function
    return function( msgid1, msgid2, n ){
        if( null == n ){
             return msgid1||'';
        }
        // plural operation
        n = pluralIndex( n );
        return n ? msgid2 || msgid1 : msgid1 || '';
    };
    
}();
