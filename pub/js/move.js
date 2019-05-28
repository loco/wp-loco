/**
 * Script for file move operation
 */
!function( window, document, $ ){

    var fsConn,
        destPath,
        fsHook = document.getElementById('loco-fs'),
        elForm = document.getElementById('loco-move')
    ;

    function setFormDisabled( disabled ){
        $(elForm).find('button.button-primary').each( function(i,button){
            button.disabled = disabled;
        } );
    }

    function onFsConnect( valid ){
        setFormDisabled( ! ( valid && destPath ) );
    }
    
    function validate(event){
        var radio = event.target || {};
        if( 'dest' === radio.name && radio.checked ){
            var newPath = radio.value;
            if( newPath && newPath !== destPath ){
                destPath = newPath;
                setFormDisabled(true);
                // check whether chosen target can be moved to
                fsHook.dest.value = newPath;
                fsConn.connect();
            }
        }
    }

    function process( event ){
        if( destPath ){
            return true;
        }
        event.preventDefault();
        return false;
    }
    
    if( fsHook && elForm ){
        fsConn = window.locoScope.fs.init(fsHook).setForm(elForm).listen(onFsConnect);
        elForm.path.value = locoConf.path;
        $(elForm).change(validate).submit(process);
    }

}( window, document, jQuery );
