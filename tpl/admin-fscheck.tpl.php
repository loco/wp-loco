<?php
/**
 * File system check screen - shows permission problems and gives advice on fixing
 */
$nav = array (
    Loco::__('Packages') => LocoAdmin::uri(),
    Loco::__('Settings') => LocoAdmin::uri( array(), 'settings' ),
    Loco::__('File check') => '',
); 
?>

<div class="wrap loco-admin loco-fscheck">
    
    <?php Loco::render('admin-nav', compact('nav') )?> 
    
    <h3 class="title">
        <?php Loco::h( sprintf( Loco::__('File system permissions for %s'), $name ) )?> 
    </h3><?php

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
    endforeach?> 
    
    
    <p class="submit">
        <a class="button-primary" href="<?php Loco::h( LocoAdmin::uri() )?>"><?php Loco::h( Loco::__('Back') )?></a>
        <a class="button" href="http://wordpress.org/support/plugin/<?php echo Loco::NS?>" target="_blank"><?php Loco::h( Loco::__('Get help') )?></a>
    </p>

    
    
            
</div>