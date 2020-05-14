/**
 * Script for bundle configuration screen
 */
!function( window, document, $ ){

    
    // utility for scrolling
    function elementTop( el, ancestor ){
        var y = el.offsetTop;
        while( ( el = el.offsetParent ) && el !== ancestor ){
            y += el.offsetTop;
        } 
        return y;    
    }


    // form duplicator for adding another project
    function addProject(){
        
        var $divs = $('#loco-conf > div'),
            $copy = $divs.eq(0).clone(),
            index = $divs.length,
            id = 'loco-conf-'+index,
            ns = '['+index+']'
        ;

        function clearField( i, input ){
            var name = input.name.replace('[0]',ns);
            $(input).attr('name', name ).val('');
        }
            
        $copy.attr('id', 'loco-conf-'+index );
        $copy.find('input').each( clearField );
        $copy.find('textarea').each( clearField );
        //$copy.find('div.notice').remove();
        
        // TODO translations of this:
        $copy.find('h2').eq(0).html('New set <span>(untitled)</span>');
        
        $copy.insertBefore('#loco-form-foot');
        
        createClickRemove( $copy.find('a.icon-del'), index );

        // scroll to $copy 
        $copy.hide().slideDown( 500 );
        $('html, body').animate( { scrollTop: elementTop($copy[0]) }, 500 );
    }


    function createClickRemove( $el, index ){
        return $el.click( function(event){
            event.preventDefault();
            delProject( index );
            return false;
        } );
    }
    
    
    // remove whole set from form
    function delProject( index ){
        var $div = $('#loco-conf-'+index),
            $fld = $div.find('input[name="conf['+index+'][removed]"]')
        ;
        // setting removed flag saves having to re-index all sets. back end will ignore it.
        $fld.val('1');
        $div.slideUp( 500, function(){ $(this).hide().find('table').remove(); } );
    }


    // enable project removal from initial blocks
    $('#loco-conf > div').each( function( index, div ){
        createClickRemove( $(div).find('a.icon-del'), index );
    } );

    // enable project addition via button in footer
    $('#loco-add-butt').attr('disabled',false).click( function(event){
        event.preventDefault();
        addProject();
        return false;
    } );


}( window, document, jQuery );