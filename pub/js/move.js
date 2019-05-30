/**
 * Script for file move operation
 */
!function( window, document, $ ){

    var fsConn,
        destPath,
        fsHook = document.getElementById('loco-fs'),
        elForm = document.getElementById('loco-move'),
        origPath = elForm.path.value
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
        var field = event.target||{}, value;
        if( 'dest' === field.name && ( field.checked || 'text' === field.type ) ){
            value = field.value;
            if( value && value !== destPath ){
                destPath = value;
                setFormDisabled(true);
                // check chosen target permissions
                if( origPath !== value ){
                    fsHook.dest.value = value;
                    fsConn.connect();
                }
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
        $(elForm).change(validate).submit(process);
    }

}( window, document, jQuery );
