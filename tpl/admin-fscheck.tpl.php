<?php
/**
 * File system check screen - shows permission problems and gives advice on fixing
 * @var LocoPackage $package
 */
$nav = array (
    __('Packages','loco-translate') => array( 'href' => LocoAdmin::uri() ),
    __('Settings','loco-translate') => array( 'href' => LocoAdmin::uri( array(), 'settings' ), 'icon' => 'admin-settings' ),
    // 
    __('File check','loco-translate') => array( 'icon' => 'admin-tools' ),
); 
?>

<div class="wrap loco-admin loco-fscheck">
    
    <?php Loco::render('admin-nav', compact('nav') );?> 
    
    <h2>
        <?php Loco::h( sprintf( __('File system permissions for %s','loco-translate'), $name ) )?> 
    </h2><?php

    /* @var $package LocoPackage */  
    foreach( $package->get_permission_errors() as $path => $error ):?> 
    <ul class="loco-list">
        <li>
            <code><?php Loco::h( LocoAdmin::trim_path($path) )?></code>
        </li><?php
        if( $error ):?>
        <li class="loco-warning">
            <span><?php Loco::h($error)?></span>
        </li><?php
        else:?> 
        <li class="loco-ok">
            <span>OK</span>
        </li><?php
        endif?> 
    </ul><?php 
    endforeach;


    if( $warnings = $package->get_author_warnings() ):?> 
    <h2>
        <?php Loco::h( sprintf( __('Other potential issues with %s','loco-translate'), $name ) ) ?> 
    </h2>
    
    <ul class="loco-list"><?php
        foreach( $warnings as $error ):?> 
        <li class="loco-warning">
            <span><?php Loco::h($error)?></span>
        </li><?php 
        endforeach;?> 
    </ul><?php 
    endif?> 
    
    
    <p class="submit">
        <a class="button-primary" href="<?php Loco::h( LocoAdmin::uri() )?>"><?php Loco::h( __('Back','loco-translate') )?></a>
        <a class="button" href="https://localise.biz/help/wordpress/translate-plugin/support" target="_blank"><?php Loco::h( __('Get help','loco-translate') )?></a>
    </p>

    
    
            
</div>