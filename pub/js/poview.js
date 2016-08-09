/**
 * Script for PO/POT source view screen
 */
!function( window, document, $ ){
    
    var loco = window.locoScope,
        conf = window.locoConf,
        
        $modal;
    
    // enable file reference links to open modal to ajax service
    $('ol.msgcat').click( function(event){
        var link = event.target;
        if( link.hasAttribute('href') ){
            event.preventDefault();
            var postdata = $.extend( { ref:link.textContent, path:conf.popath }, conf.project||{} );
            loco.ajax.post( 'fsReference', postdata, onRefSource, onRefError );
            return false;
        }
    } );
    // http://api.jqueryui.com/dialog/
    function getModal(){
        return $modal || ( $modal = $('<div id="loco-po-ref"></div>').dialog( {
            'dialogClass'   : 'loco-modal',
            //'minWidth'      : 640,
            'modal'         : true,
            'autoOpen'      : false,
            'closeOnEscape' : true,
            resizable       : false,
            position        : { my: "bottom", at: "center", of: window }
        } ) );
    }
    // when reference pulling fails
    function onRefError( xhr, error, message ){
        $error = $('<p></p>').text( message );
        getModal().html('').dialog('option','title','Error').append($error).dialog('open');
    }
    // display reference source when received via ajax response
    function onRefSource( result ){
        var code = result && result.code;
        if( ! code ){
            return;
        }
        var i = -1,
            length = code.length,
            target = result.line - result.start,
            $ol = $('<ol></ol>').attr('class',result.type).attr('start', String(result.start||1) ), $li
        ;
        while( ++i < length ){
            $li = $('<li></li>').html( code[i] ).appendTo($ol);
            if( i === target ){
                $li.attr('class','highlighted');
            }
        }
        //hljs.highlightBlock( $pre[0] );
        getModal().html('').dialog('option','title', result.path+':'+result.line).append($ol).dialog('open');
    }


}( window, document, jQuery );