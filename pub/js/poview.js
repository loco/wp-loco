/**
 * Script for PO/POT source view screen
 */
!function( window, document, $ ){
    
    var loco = window.locoScope,
        conf = window.locoConf,
        view = document.getElementById('loco-po'),
        $modal;

    // OK to show view now. mat have taken long to render
    $(view).removeClass('loading');

    // resize function fits scrollable viewport, accounting for headroom and touching bottom of screen.
    var resize = function(){
        function top( el, ancestor ){
            var y = el.offsetTop||0;
            while( ( el = el.offsetParent ) && el !== ancestor ){
                y += el.offsetTop||0;
            } 
            return y;    
        }
        var fixHeight,
            maxHeight = view.clientHeight - 2
        ;
        return function(){
            var topBanner = top( view, document.body ),
                winHeight = window.innerHeight,
                setHeight = winHeight - topBanner - 20
            ;
            if( fixHeight !== setHeight ){
                if( setHeight < maxHeight ){
                    view.style.height = String(setHeight)+'px';
                }
                else {
                    view.style.height = '';
                }
                fixHeight = setHeight;
            }
        };
    }();    

    resize();
    $(window).resize( resize );

    
    // enable file reference links to open modal to ajax service
    $('ol.msgcat').click( function(event){
        var link = event.target;
        if( link.hasAttribute('href') ){
            event.preventDefault();
            getModal().html('<div class="loading"></div>').dialog('option','title','Loading..').off('dialogopen').dialog('open').on('dialogopen',onModalOpen);
            var postdata = $.extend( { ref:link.textContent, path:conf.popath }, conf.project||{} );
            loco.ajax.post( 'fsReference', postdata, onRefSource, onRefError );
            return false;
        }
    } );
    // http://api.jqueryui.com/dialog/
    function getModal(){
        return $modal || ( $modal = $('<div id="loco-po-ref"></div>').dialog( {
            dialogClass   : 'loco-modal',
            modal         : true,
            autoOpen      : false,
            closeOnEscape : true,
            resizable     : false,
            height        : 500
        } ) );
    }
    // when reference pulling fails (e.g. file not found, or line nonexistant)
    function onRefError( xhr, error, message ){
        $error = $('<p></p>').text( message );
        getModal().dialog('close').html('').dialog('option','title','Error').append($error).dialog('open');
    }
    // display reference source when received via ajax response
    function onRefSource( result ){
        var code = result && result.code;
        if( ! code ){
            return;
        }
        var i = -1,
            length = code.length,
            $ol = $('<ol></ol>').attr('class',result.type);
        while( ++i < length ){
            $('<li></li>').html( code[i] ).appendTo($ol);
        }
        // Highlight referenced line
        $ol.find('li').eq( result.line - 1 ).attr('class','highlighted');
        // TODO enable highlight toggling of other lines via click/drag etc..
        getModal().dialog('close').html('').dialog('option','title', result.path+':'+result.line).append($ol).dialog('open');
    }
    
    // scroll to first highlighted line of code once modal open
    function onModalOpen( event, ui ){
        var div = event.target,
            line = $(div).find('li.highlighted')[0],
            yAbs = line.offsetTop,                      // <- position of line relative to container
            yVis = Math.floor( div.clientHeight / 2 ),  // <- target position of line relative to view port
            yAdj = Math.max( 0, yAbs - yVis )           // scroll required to move line to visual position
        ;
        div.scrollTop = yAdj;
    }
    
}( window, document, jQuery );