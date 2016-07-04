/**
 * Script for PO file initializing page
 */
!function( window, document, $ ){
    
    var loco = window.locoScope,
        //conf = window.locoConf,
        elForm = document.getElementById('loco-poinit');
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
            return value ? loco.locale.parse(value) : loco.locale.cast( {lang:'zxx'} );
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
        function getValue(){
            var pairs = $(elOpts).serializeArray(), pair = pairs[0],
                index = pair && pair.value || null,
                elTxt = index && elForm['path['+index+']'];
            return elTxt && elTxt.value;
        }
        /*$(elForm['path[0]']).focus( function(){
            elOpts[0].checked = true;
        } );*/
        return {
            val: getValue
        };
    }( elForm );

    
    
    // enable disable form submission
    
    function setFormDisabled( disabled ){
        $(elForm).find('input[type="submit"]').each( function( i, button ){
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
        // $('tbody.disableable')[ hasloc ? 'removeClass' : 'addClass' ]('disabled');
        // TODO validate via back end
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
        loco.ajax.submit( event.target, onMsginitSuccess );
        // TODO some kind of loader?
        return false;
    }
    
    
    $(elForm)
        .change( validate )
        .submit( process );

    redrawLocale( localeSelector.val() );
    

}( window, document, jQuery );