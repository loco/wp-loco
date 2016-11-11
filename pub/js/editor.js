/**
 * Script for PO file editor pages
 */
!function( window, $ ){
    
    var loco = window.locoScope,
        conf = window.locoConf,
        
        syncParams = null,
        saveParams = null,
        
        // UI translation
        translator = loco.l10n,
        sprintf = loco.string.sprintf,

        // PO file data
        locale = conf.locale,
        messages = loco.po.init( locale ),
        template = ! locale,
        
        // form containing action buttons
        elForm = document.getElementById('loco-actions'),
        filePath = conf.popath,
        syncPath = conf.potpath,
        
        // file system connect when file is locked
        elFilesys = document.getElementById('loco-fs'),
        fsConnect = elFilesys && loco.fs.init( elFilesys ),
        
        // prevent all write operations if readonly mode
        readonly = conf.readonly,
        editable = ! readonly,
        
        // Editor components
        editor,
        saveButton,
        innerDiv = document.getElementById('loco-editor-inner')
    ;



    /**
     * 
     */
    function doSyncAction( callback ){
        function onSuccess( result ){
             var info = [],
                 doc = messages,
                 exp = result.po,
                 src = result.pot,
                 pot = loco.po.init().load( exp ),
                 done = doc.merge( pot ),
                 nadd = done.add.length,
                 ndel = done.del.length,
                 t = translator;
             // reload even if unchanged, cos indexes could be off
             editor.load( doc );
             // Show summary 
             if( nadd || ndel ){
                 if( src ){
                    // Translators: Where %s is the name of the POT template file. Message appears after sync
                    info.push( sprintf( t._('Merged from %s'), src ) );
                 }   
                 else {        
                    // Translators: Message appears after sync operation     
                    info.push( t._('Merged from source code') );
                 }
                 // Translators: Summary of new strings after running in-editor Sync
                 nadd && info.push( sprintf( t._n('1 new string added','%s new strings added', nadd ), nadd ) );
                 // Translators: Summary of existing strings that no longer exist after running in-editor Sync
                 ndel && info.push( sprintf( t._n('1 obsolete string removed','%s obsolete strings removed', ndel ), ndel ) );
                 // editor thinks it's saved, but we want the UI to appear otherwise
                 $(innerDiv).trigger('poUnsaved',[]);
                 updateStatus();
                 // debug info in lieu of proper merge confirmation:
                 window.console && debugMerge( console, done );
             }
             else if( src ){
                 // Translators: Message appears after sync operation when nothing has changed. %s refers to a POT file.
                 info.push( sprintf( t._('Already up to date with %s'), src ) );
             }
             else {
                 // Translators: Message appears after sync operation when nothing has changed
                 info.push( t._('Already up to date with source code') );
             }
             loco.notices.success( info.join('. ') );
             $(innerDiv).trigger('poMerge',[result]);
             // done sync
             callback && callback();
        }
        loco.ajax.post( 'sync', syncParams, onSuccess, callback );
    }



    function debugMerge( console, result ){
         var i = -1;
         while( ++i < result.add.length ){
             console.log(' + '+result.add[i].source() );
         }
         i = -1;
         while( ++i < result.del.length ){
             console.log(' - '+result.del[i].source() );
         }        
    }


    /**
     * Post full editor contents to "posave" endpoint
     */    
    function doSaveAction( callback ){
        function onSuccess( result ){
            callback && callback();
            editor.save( true );
            // Update saved time update
            $('#loco-po-modified').text( result.datetime||'[datetime error]' );
        }
        saveParams.locale = String( messages.locale() || '' );
        if( fsConnect ){
            fsConnect.applyCreds( saveParams );
        }
        // adding PO source last for easier debugging in network inspector
        saveParams.data = String( messages );
        loco.ajax.post( 'save', saveParams, onSuccess, callback );
    }
    

    function saveIfDirty(){
        editor.dirty && doSaveAction();
    }
    
    

    function onUnloadWarning(){
        // Translators: Warning appears when user tries to refresh or navigate away when editor work is unsaved
        return translator._("Your changes will be lost if you continue without saving");
    }
    


    function registerSaveButton( button ){
        saveButton = button;
        // enables and disable according to save/unsave events
        editor
            .on('poUnsaved', function(){
                enable();
                $(button).addClass( 'button-primary loco-flagged' );
            } )
            .on('poSave', function(){
                disable();
                $(button).removeClass( 'button-primary loco-flagged' );
            } )
        ;
        function disable(){
            button.disabled = true;
        }
        function enable(){
            button.disabled = false;
        }        
        function think(){
            disable();
            $(button).addClass('loading');
        }
        function unthink(){
            enable();
            $(button).removeClass('loading');
        }
        saveParams = $.extend( { path: filePath }, conf.project||{} );

        $(button).click( function(event){
            event.preventDefault();
            think();
            doSaveAction( unthink );
            return false;
        } );
        return true;
    };
    
    
    
    function registerSyncButton( button ){
        var project = conf.project;
        if( project ){
            function disable(){
                button.disabled = true;
            }
            function enable(){
                button.disabled = false;
            }
            function think(){
                disable();
                $(button).addClass('loading');
            }
            function unthink(){
                enable();
                $(button).removeClass('loading');
            }
            // Only permit sync when document is saved
            editor
                .on('poUnsaved', function(){
                    disable();
                } )
                .on('poSave', function(){
                    enable();
                } )
            ;
            // params for sync end point
            syncParams = {
                bundle: project.bundle,
                domain: project.domain,
                type: template ? 'pot' : 'po',
                sync: syncPath||''
            };
            // enable syncing on button click
            $(button)
                .click( function(event){
                    event.preventDefault();
                    think();
                    doSyncAction( unthink );
                    return false;
                } )
                //.attr('title', syncPath ? sprintf( translator._('Update from %s'), syncPath ) : translator._('Update from source code') )
            ;
            enable();
        }
        return true;
    }
    


    function registerFuzzyButton( button ){
        var toggled = false, 
            enabled = false
        ;
        function redraw( message, state ){
            // fuzziness only makes sense when top-level string is translated
            var allowed = message && message.translated(0) || false;
            if( enabled !== allowed ){
                button.disabled = ! allowed;
                enabled = allowed;
            }
            // toggle on/off according to new fuzziness
            if( state !== toggled ){
                $(button)[ state ? 'addClass' : 'removeClass' ]('inverted');
                toggled = state;
            }
        }
        // state changes depending on whether an asset is selected and is fuzzy
        editor
            .on('poSelected', function( event, message ){
                redraw( message, message && message.fuzzy() || false );
            } )
            .on( 'poEmpty', function( event, blank, message, pluralIndex ){
                if( 0 === pluralIndex && blank === enabled ){
                    redraw( message, toggled );
                }
            } )
            .on( 'poFuzzy', function( event, message, newState ){
                redraw( message, newState );
            } )
        ;
        // click toggles current state
        $(button).click( function( event ){
            event.preventDefault();
            editor.fuzzy( ! editor.fuzzy() );
            return false;
        } );
        return true;
    };



    function registerRevertButton( button ){
        // No need for revert when document is saved
        editor
            .on('poUnsaved', function(){
                button.disabled = false;
            } )
            .on('poSave', function(){
                button.disabled = true;
            } )
        ;
        // handling unsaved state prompt with onbeforeunload, see below
        $(button).click( function( event ){
            event.preventDefault();
            location.reload();
            return false;
        } );
        return true;
    };



    function registerInvisiblesButton( button ){
        var $button = $(button);
        button.disabled = false;
        editor.on('poInvs', function( event, state ){
            $button[ state ? 'addClass' : 'removeClass' ]('inverted');
        });
        $button.click( function( event ){
            event.preventDefault();
            editor.setInvs( ! editor.getInvs() );
            return false;
        } );
        locoScope.tooltip.init($button);
        return true;
    }



    function registerCodeviewButton( button ){
         var $button = $(button);
         button.disabled = false;
         $button.click( function(event){
            event.preventDefault();
            var state = ! editor.getMono();
            editor.setMono( state );
            $button[ state ? 'addClass' : 'removeClass' ]('inverted');
            return false;
        } );
        locoScope.tooltip.init($button);
        return true;
    };



    function registerAddButton( button ){
        button.disabled = false;
        $(button).click( function( event ){
            event.preventDefault();
            // Need a placeholder guaranteed to be unique for new items
            var i = 1, baseid, msgid, regex = /(\d+)$/;
            msgid = baseid = 'New message';
            while( messages.get( msgid ) ){
                i = regex.exec(msgid) ? Math.max(i,RegExp.$1) : i;
                msgid = baseid+' '+( ++i );
            }
            editor.add( msgid );
            return false;
        } );
        return true;
    };



    function registerDelButton( button ){
        button.disabled = false;
        $(button).click( function(event){
            event.preventDefault();
            editor.del();
            return false;
        } );
        return true;
    };



    function registerDownloadButton( button, id ){
        button.disabled = false;
        $(button).click( function( event ){
            var form = button.form,
                path = filePath;
            // swap out path
            if( 'binary' === id ){
                path = path.replace(/\.po$/,'.mo');
            }
            form.path.value = path;
            form.source.value = messages.toString();
            // allow form to submit
            return true;
        } );
        return true;
    }

    
    // event handler that stops dead
    function noop( event ){
        event.preventDefault();
        return false;
    }


    /*/ dummy function for enabling buttons that do nothing (or do something inherently)
    function registerNoopButton( button ){
        return true;
    }*/
    

    
    /**
     * Update status message above editor.
     * This is dynamic version of PHP Loco_gettext_Metadata::getProgressSummary
     * TODO implement progress bar, not just text.
     */
    function updateStatus(){
        var t = translator,
            stats = editor.stats(),
            total = stats.t,
            fuzzy = stats.f,
            empty = stats.u,
            // Translators: Shows total string count at top of editor
            stext = sprintf( t._n('1 string','%s strings',total), total ),
            extra = [];
        if( locale ){
            // Translators: Shows percentage translated at top of editor
            stext = sprintf( t._('%s%% translated'), stats.p.replace('%','') ) +', '+ stext;
            // Translators: Shows number of fuzzy strings at top of editor
            fuzzy && extra.push( sprintf( t._('%s fuzzy'), fuzzy ) );
            // Translators: Shows number of untranslated strings at top of editor
            empty && extra.push( sprintf( t._('%s untranslated'), empty ) );
            if( extra.length ){
                stext += ' ('+extra.join(', ')+')';
            }
        }
        $('#loco-po-status').text( stext );
    }
    
    
    
    /**
     * Enable text filtering
     */
    function initSearchFilter( elSearch ){
        editor.searchable( loco.fulltext.init() );
        // prep search text field
        elSearch.disabled = false;
        elSearch.value = '';
        function showValidFilter( numFound ){
            $(elSearch.parentNode)[ numFound || null == numFound ? 'removeClass' : 'addClass' ]('invalid');
        }
        var listener = loco.watchtext( elSearch, function( value ){
            var numFound = editor.filter( value, true  );
            showValidFilter( numFound );
        } );
        editor
            .on( 'poFilter', function( event, value, numFound ){
                listener.val( value||'' );
                showValidFilter( numFound );
            } )
            .on( 'poMerge', function( event, result ){
                var value = listener.val();
                value && editor.filter( value );
            } )
        ;
    }    
    
    
    
    // resize function fits editor to screen, accounting for headroom and touching bottom of screen.
    var resize = function(){
        function top( el, ancestor ){
            var y = el.offsetTop||0;
            while( ( el = el.offsetParent ) && el !== ancestor ){
                y += el.offsetTop||0;
            } 
            return y;    
        }
        var fixHeight,
            minHeight = parseInt($(innerDiv).css('min-height')||0)
        ;
        return function(){
            var padBottom = 20,
                topBanner = top( innerDiv, document.body ),
                winHeight = window.innerHeight,
                setHeight = Math.max( minHeight, winHeight - topBanner - padBottom )
            ;
            if( fixHeight !== setHeight ){
                innerDiv.style.height = String(setHeight)+'px';
                fixHeight = setHeight;
            }
        };
    }();    

    // ensure outer resize is handled before editor's internal resize
    resize();
    $(window).resize( resize );

    // initialize editor    
    innerDiv.innerHTML = '';
    editor = loco.po.ed
        .init( innerDiv )
        .localise( translator )
    ;
    loco.po.kbd
        .init( editor )
        .add( 'save', saveIfDirty )
        .enable('copy','clear','enter','next','prev','fuzzy','save','invis')
    ;

    // initialize toolbar button actions
    var buttons = {
        // help: registerNoopButton,
        save: editable && registerSaveButton,
        sync: editable && registerSyncButton,
        revert: registerRevertButton,
        // editor mode togglers
        invs: registerInvisiblesButton,
        code: registerCodeviewButton,
        // downloads / post-throughs
        source: registerDownloadButton,
        binary: template ? null : registerDownloadButton
    };
    // POT only
    if( template ){
        buttons.add = editable && registerAddButton;
        buttons.del = editable && registerDelButton;
    }
    // PO only
    else {
        buttons.fuzzy = registerFuzzyButton;
    };
    $('#loco-toolbar').find('button').each( function(i,el){
        var id = el.getAttribute('data-loco'), register = buttons[id];
        register && register(el,id) || $(el).hide();
    } );
    
    // disable submit on dummy form
    $(elForm).submit( noop );

    // enable text filtering
    initSearchFilter( document.getElementById('loco-search') );    

    // editor event behaviours
    editor
        .on('poUnsaved', function(){
            window.onbeforeunload = onUnloadWarning;
        } )
        .on('poSave', function(){
            updateStatus();
            window.onbeforeunload = null;
        } )
        .on( 'poUpdate', updateStatus );
    ;
    
    // load raw message data
    messages.load( conf.podata );
    
    // ready to render editor
    editor.load( messages );
    
    // enable template mode when no target locale 
    editor.targetLocale || editor.unlock();

    // ok, editor ready
    updateStatus();

    // clean up
    delete window.locoConf;
    conf = buttons = null;


}( window, jQuery );