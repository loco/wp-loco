/**
 * Script for bundle setup page
 * TODO translations
 */
!function( window, document, $ ){
    
    
    /**
     * Look up bundle configuration on remote server
     */
    function find( vendor, slug, version ){

        function onFailure(){
            if( timer ){
                destroy();
                onTimeout();
            }
        };
    
        function onResponse( data, status, obj ){
            if( timer ){
                destroy();
                var match = data && data.exact,
                    status = data && data.status
                ;
                if( match ){
                    setJson( match );
                }
                else if( 404 === status ){
                    unsetJson("Sorry, we don't know a bundle by this name");
                }
                else {
                    loco.notices.debug( data.error || 'Unknown server error' );
                    onTimeout();
                }
            }
        };
        
        function onTimeout(){
            unsetJson('Failed to contact remote API');
            timer = null;
        }
        
        function destroy(){
            if( timer ){
                clearTimeout( timer );
                timer = null;
            }
        }
        
        var timer = setTimeout( onTimeout, 3000 );
        
        unsetJson('');

        $.ajax( {
            url: conf.apiUrl+'/'+vendor+'/'+slug+'.jsonp?version='+encodeURIComponent(version),
            dataType: 'jsonp',
            success: onResponse,
            error: onFailure,
            cache: true
        } );
        
        return {
            abort: destroy
        };
    }

    
    function setJson( json ){
        elForm['json-content'].value = json;
        $('#loco-remote-empty').hide();
        //$('#loco-remote-query').hide();
        $('#loco-remote-found').show();
    }
    
    
    function unsetJson( message ){
        elForm['json-content'].value = '';
        //$('#loco-remote-query').show();
        $('#loco-remote-empty').show().find('span').text( message );
        $('#loco-remote-found').hide().removeClass('jshide');
    }
    

    function onFindClick( event ){
        event.preventDefault();
        finder && finder.abort();
        finder = find( elForm.vendor.value, elForm.slug.value, elForm.version.value );
        return false;
    }
    
    function onCancelClick( event ){
        event.preventDefault();
        unsetJson('');
        return false;
    }
    
    function setVendors( list ){
        var i = -1,
            value, label,
            length = list.length,
            $select = $(elForm.vendor).html('')
        ;
        while( ++i < length ){
            value = list[i][0];
            label = list[i][1];
            $select.append( $('<option></option>').attr('value',value).text(label) );
        }            
    }

    
    var loco = window.locoScope,
        conf = window.locoConf,
        
        finder,
        elForm = document.getElementById('loco-remote'),
        $findButt = $(elForm).find('button[type="button"]').click( onFindClick ),
        $resetButt = $(elForm).find('input[type="reset"]').click( onCancelClick );
   
   // pull vendor list
   $.ajax( {
        url: conf.apiUrl+'/vendors.jsonp',
        dataType: 'jsonp',
        success: setVendors,
        cache: true
    } );
   

}( window, document, jQuery );