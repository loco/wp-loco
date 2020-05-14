/**
 * Script for PO/POT file diff renderer and roll back function
 */
!function( window, document, $ ){
    
    var xhr,
        cache = [],
        conf = window.locoConf,
        loco = window.locoScope,
        revOffset = 0,
        maxOffset = conf.paths.length - 2,
        elRoot = document.getElementById('loco-ui'),
        fsHook = document.getElementById('loco-fs'),
        elForm = elRoot.getElementsByTagName('form').item(0),
        buttons = elRoot.getElementsByTagName('button'),
        $metas = $(elRoot).find('div.diff-meta'),
        prevBut = buttons.item(0),
        nextBut = buttons.item(1)
    ;
    
    if( fsHook && elForm ){
        loco.fs
            .init( fsHook )
            .setForm( elForm );
    }
    
    
    function showLoading(){
        return $(elRoot).addClass('loading');
    }
    

    function hideLoading(){
        return $(elRoot).removeClass('loading');
    }
    
    
    function setContent( src ){
        return $(elRoot).find('div.diff').html( src );
    }
    

    function setError( message ){
        hideLoading();
        return $('<p class="error"></p>').text( message ).appendTo( setContent('') );
    }
    
    
    // applying line numbers in JS is easier than hacking HTML on the back end, because dom is parsed
    function applyLineNumbers( i, tbody ){
        var i, cells,
            rows = tbody.getElementsByTagName('tr'),
            nrow = rows.length,
            data = tbody.getAttribute('data-diff').split(/\D+/),
            xmin = data[0], xmax = data[1], 
            ymin = data[2], ymax = data[3]
        ;
        /*function lpad( n, max ){
            var str = String( n ),
                len = String(max).length;
            while( str.length < len ){
                str = '\xA0'+str;
            }
            return str;
        }*/
        function apply( td, num, max ){
            if( num <= max ){
                $('<span></span>').text( String(num) ).prependTo( td );
            }
        }
        for( i = 0; i < nrow; i++ ){
            cells = rows[i].getElementsByTagName('td');
            apply( cells[0], xmin++, xmax );
            apply( cells[2], ymin++, ymax );
        }
    }
    
    
    
    function loadDiff( offset ){
        if( xhr ){
            xhr.abort();
        }
        // use in-code cache
        var src = cache[offset];
        if( null != src ){
            setContent( src );
            hideLoading();
            return;
        }
        // remote load required
        setContent('');
        showLoading();
        xhr = loco.ajax.post( 'diff', 
            {
                lhs: conf.paths[offset],
                rhs: conf.paths[offset+1]
            }, 
            function( r, state, _xhr ){
                if( _xhr === xhr ){
                    if( src = r && r.html ){
                        cache[offset] = src;
                        setContent( src ).find('tbody').each( applyLineNumbers );
                        hideLoading();
                    }
                    else {
                        setError( r && r.error || 'Unknown error' );
                    }
                }
            }, 
            function( _xhr, error, message ){
                if( _xhr === xhr ){
                    xhr = null;
                    // ajax utilty should have extracted meaningful error
                    setError('Failed to generate diff');
                }
            }
        );
    }
    

    /**
     * Go to next revision (newer)
     */
    function goNext( event ){
        event.preventDefault();
        go( revOffset - 1 );
        return false;
    }


    /**
     * Go to previous revision (older)
     */
    function goPrev( event ){
        event.preventDefault();
        go( revOffset + 1 );
        return false;
    }


    function go( offset ){
        if( offset >=0 && offset <= maxOffset ){
            revOffset = offset;
            loadDiff( offset );
            redraw();
        }
    }


    function redraw(){
        var i = revOffset, j = i + 1;
        // lock navigation to available range
        prevBut.disabled = i >= maxOffset;
        nextBut.disabled = i <= 0;
        //
        $metas.addClass('jshide').removeClass('diff-meta-current');
        $metas.eq(i).removeClass('jshide').addClass('diff-meta-current');
        $metas.eq(j).removeClass('jshide');
    }
    
    // enable navigation if there is something to navigate to
    if( maxOffset ){
        $(prevBut).click( goPrev ).parent().removeClass('jshide');
        $(nextBut).click( goNext ).parent().removeClass('jshide');
    }
    
    // load default diff, which is current version compared to most recent backup
    go( 0 );
    

}( window, document, jQuery );