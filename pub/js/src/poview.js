/**
 * Script for PO/POT source view screen
 */
!function( window, document, $ ){
    
    var conf = window.locoConf,
        loco = window.locoScope,
        refs = loco.po.ref.init(loco,conf),
        view = document.getElementById('loco-po')
    ;

    // index messages and enable text filter
    ! function( view, dict ){
        var min, max,
            texts = [],
            blocks = [],
            valid = true,
            filtered = false,
            items = $(view).find('li')
        ;
        function flush(){
            if( texts.length ){
                blocks.push( [min,max] );
                dict.push( texts );
                texts = [];
            }
            min = null;
        }
        items.each( function( i, li ){
            var text, $li = $(li);
            // empty line indicates end of message
            if( $li.find('span.po-none').length ) {
                flush();
            }
            // context indexable if po-text present
            else {
                max = i;
                if( null == min ){
                    min = i;
                }
                if( text = $li.find('.po-text').text() ){
                    texts = texts.concat( text.replace(/\\[ntvfab\\"]/g, ' ').split(' ') );
                }
            }
        } );
        flush();
        // indexing done, enable filtering
        // TODO for filtering to perform well, we must perform off-screen buffering of redundant <li> nodes
        // TODO found text highlighting. (more complex than first thought)
        function ol( start ){
            return $('<ol class="msgcat"></ol>').attr('start',start).appendTo(view);
        }
        function filter(s){
            var i, block, found = dict.find(s), f = -1, length = found.length, $ol;
            $('ol',view).remove();
            if( length ){
                while( ++f < length ){
                    block = blocks[ found[f] ];
                    i = block[0];
                    $ol = ol( i+1 );
                    for( ; i <= block[1]; i++ ){
                       $ol.append( items[i]/*.cloneNode(true)*/ );
                    }
                }
                validate(true);
            }
            else {
                validate(false);
                // translators: When text filtering reduces to an empty view
                ol(0).append( $('<li></li>').text( loco.l10n._('Nothing matches the text filter') ) );
            }
            filtered = true;
            resize();
        };
        function unfilter(){
            if( filtered ){
                validate(true);
                filtered = false;
                $('ol',view).remove();
                ol(1).append( items );
                resize();
            }
        }
        function validate( bool ){
            if( valid !== bool ){
                $('#loco-content')[ bool ? 'removeClass' : 'addClass' ]('loco-invalid');
                valid = bool;
            }
        }
        loco.watchtext( $(view.parentNode).find('form.loco-filter')[0].q, function(q){
            q ? filter(q) : unfilter();
        } );

    }( view, loco.fulltext.init() );
    


    // OK to show view now. may have taken a while to render and index
    $(view).removeClass('loco-loading');


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
    $(view).click( function onLinkClick( event ){
        var el = event.target;
        if( el.hasAttribute('href') ){
            event.preventDefault();
            refs.load( el.textContent );
            return false;
        }
    } );

    
}( window, document, jQuery );