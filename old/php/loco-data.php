<?php
/**
 * Admin ajax include that returns compiled-in data
 * Included by loco-ajax.php during Ajax action
 */
 
    DOING_AJAX or die();

    // default is single locale response
    if( isset($locale) ){
        loco_require('loco-locales');
        $data = loco_locale_resolve($locale);
        return array (
            'locales' => array (
                $locale => $data->export(),
            ),
        );
    }
    
    
    throw new Exception( __('Invalid data posted to server','loco-legacy'), 422 );
