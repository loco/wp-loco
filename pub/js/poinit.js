/**
 * Script for PO file initializing page
 */
!function( window, document, $ ){
    
    var path,
        loco = window.locoScope,
        fsHook = document.getElementById('loco-fs'),
        elForm = document.getElementById('loco-poinit'),
        fsConn = fsHook && loco.fs.init( fsHook )
    ;


    /**
     * Abstract selection of twin mode (Select/Custom) locale input
     */ 
    var localeSelector = function( elForm ){
        function isSelectMode(){
            return elMode[0].checked;
        }
        function setSelectMode(){
            elMode[0].checked = true;
            redrawMode( true );
        }
        function setCustomMode(){
            if( ! elCode.value ){
                elCode.value = getValue();
            }
            elMode[1].checked = true;
            //elOpts.selectedIndex = 0;
            redrawMode( false );
        }
        function getValue(){
            var data = $( isSelectMode() ? elOpts : elCode ).serializeArray();
            return data[0] && data[0].value || '';
        }
        function getLocale(){
            var value = getValue();
            return value ? loco.locale.parse(value) : loco.locale.clone( {lang:'zxx'} );
        }
        function onModeChange(){
            redrawMode( isSelectMode() );
            return true;
        }
        function redrawMode( selectMode ){
            elCode.disabled = selectMode;
            elOpts.disabled = ! selectMode;
            fsCode.className = selectMode ? 'disabled' : 'active';
            fsOpts.className = selectMode ? 'active' : 'disabled';
            validate();
        }

        var elOpts = elForm['select-locale'],
            elCode = elForm['custom-locale'],
            elMode = elForm['use-selector'],
            fsOpts = $(elOpts).focus( setSelectMode ).closest('fieldset').click( setSelectMode )[0],
            fsCode = $(elCode).focus( setCustomMode ).closest('fieldset').click( setCustomMode )[0];
            
        $(elMode).change( onModeChange );
        onModeChange();
        loco.watchtext( elCode, function(v){ $(elCode.form).triggerHandler('change'); } );

        return {
            val: getLocale
        };

    }( elForm );



    /**
     * Abstract selection of target directory
     */
    var pathSelector = function(){
        var elOpts = elForm['select-path'];
        function getIndex(){
            var pairs = $(elOpts).serializeArray(), pair = pairs[0];
            return pair && pair.value || null;
        }
        function getSelected( name ){
            var index = getIndex();
            return index && elForm[name+'['+index+']'];
        }
        function getValue(){
            var elField = getSelected('path');
            return elField && elField.value;
        }
        function getLabel(){
            var elField = getSelected('path');
            return elField && $(elField.parentNode).find('code.path').text();
        }
        /*$(elForm['path[0]']).focus( function(){
            elOpts[0].checked = true;
        } );*/
        return {
            val: getValue,
            txt: getLabel
        };
    }( elForm );

    
    
    // enable disable form submission
    
    function setFormDisabled( disabled ){
        $(elForm).find('button.button-primary').each( function( i, button ){
            button.disabled = disabled;
        } );
    }
    
    
    // Recalculate form submission when any data changes
    
    function validate(){
        var locale = localeSelector && localeSelector.val(),
            hasloc = locale && locale.isValid() && 'zxx' !== locale.lang,
            hasdir = pathSelector && pathSelector.val(),
            valid  = hasloc && hasdir
        ;
        redrawLocale( locale );
        // disabled until back end validates file path
        setFormDisabled( true );
        // check calculated path against back end 
        if( valid ){
            var newPath = pathSelector.txt();
            if( newPath !== path ){
                path = newPath;
                fsHook.path.value = path;
                fsConn.listen(onFsConnect).connect();
            }
            else {
                setFormDisabled( false );
            }
            // connection back end won't warn about system files, so we'll toggle notice here
            // actually no need as user will be warned when they go through to the edit screen
            // $('#loco-fs-info')[ pathSelector.typ() ? 'removeClass' : 'addClass' ]('jshide');
        }
    }
    
    
    // callback after file system connect has returned
    function onFsConnect( valid ){
        setFormDisabled( ! valid );
    }
    
    
    // show locale in all file paths (or place holder if empty)
    
    function redrawLocale( locale ){
        var $form = $(elForm),
            loctag = locale && locale.toString('_') || '',
            suffix = loctag ? ( 'zxx' === loctag ? '<locale>' : loctag ) : '<invalid>'
        ;
        $form.find('code.path span').each( function( i, el ){
            el.textContent = suffix;
        } );
        $form.find('span.lang').each( function( i, icon ){
            setLocaleIcon( icon, locale );
        } );
    }
    
    

    function setLocaleIcon( icon, locale ){
        if( locale && 'zxx' !== locale.lang ){
            icon.setAttribute('lang',locale.lang);
            icon.setAttribute('class',locale.getIcon());
        }
        else {
            icon.setAttribute('lang','');
            icon.setAttribute('class','lang nolang');
        }
    }
    
    
    // Submit form to Ajax end point when ..erm.. submitted
    
    function onMsginitSuccess( data ){
        var href = data && data.redirect;
        if( href ){
            // TODO show success panel and hide form instead of redirect?
            // loco.notices.success('YES');
            location.assign( href );
        }
    }
    
    function process( event ){
        event.preventDefault();
        fsConn.applyCreds( elForm );
        loco.ajax.submit( event.target, onMsginitSuccess );
        // TODO some kind of loader?
        return false;
    }
    
    
    $(elForm)
        .change( validate )
        .submit( process );

    redrawLocale( localeSelector.val() );
    

}( window, document, jQuery );