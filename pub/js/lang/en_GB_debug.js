/**
 * Debug translations: returns all translations in reverse.
 */
( window.locoScope || ( window.locoScope = {} ) ).t = function(){
    
    // calc numeric index of a plural form (0-1)
    function pluralIndex( n ){
        return Number( n != 1 );
    }
    
    function reverse( a ){
        var b = '', i = a.length;
        while( i-- !== 0 ){
            b += a.charAt(i);
        }
        // protect formatting tokens
        b = b.replace(/([sud])%/g,'%$1');
        // 
        return b;
    }
    
    // expose public t() function
    return function( msgid1, msgid2, n ){
        if( null == n ){
             return reverse( msgid1||'' );
        }
        // plural operation
        n = pluralIndex( n );
        return reverse( n ? msgid2 || msgid1 : msgid1 || '' );
    };
    
}();
