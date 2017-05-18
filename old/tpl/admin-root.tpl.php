<?php
/**
 * Root admin screen - lists available themes and plugins
 */
$nav = array (
    __('Packages','loco-legacy') => array(),
    __('Settings','loco-legacy') => array( 'href' => LocoAdmin::uri( array(), 'settings' ), 'icon' => 'admin-settings' ),
); 
?> 

<div class="wrap loco-admin loco-lists"><?php 

    // main tabbed navigation
    Loco::render('admin-nav', compact('nav') )?> 
    
    <h3 class="title">
        <?php Loco::h( __('Select a plugin or theme to translate','loco-legacy') )?> 
    </h3><?php 
    
    
    // Theme packages
    //
    if( $themes ):?> 
    <div class="icon32 icon-appearance"><br /></div>
    <h2 class="dashicons-admin-appearance">
        <?php Loco::h( _x('Themes','Package list header','loco-legacy') )?> 
    </h2>
    <div class="loco-list loco-list-themes">
        <?php Loco::render( 'admin-list', array('items'=>$themes) ) ?> 
    </div><?php 
    endif;
    

    // Plugin packages
    //
    if( $plugins ):?> 
    <div class="icon32 icon-plugins"><br /></div>
    <h2 class="dashicons-admin-plugins">
        <?php Loco::h( _x('Plugins','Package list header','loco-legacy') )?> 
    </h2>
    <div class="loco-list loco-list-plugins">
        <?php Loco::render( 'admin-list', array('items'=>$plugins) ) ?> 
    </div><?php 
    endif;
    
    
    // Core packages
    //
    if( $core ):?> 
    <div class="icon32 icon-generic"><br /></div>
    <h2 class="dashicons-wordpress">
        <?php Loco::h( _x('Core','Package list header','loco-legacy') )?> 
    </h2>
    <div class="loco-list loco-list-core">
        <?php Loco::render( 'admin-list', array('items'=>$core) ) ?> 
    </div><?php 
    endif?> 

</div>
