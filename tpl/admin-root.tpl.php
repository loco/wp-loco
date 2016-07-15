<?php
/**
 * Root admin screen - lists available themes and plugins
 */
$nav = array (
    __('Packages','loco-translate') => array(),
    __('Settings','loco-translate') => array( 'href' => LocoAdmin::uri( array(), 'settings' ), 'icon' => 'admin-settings' ),
); 
?> 

<div class="wrap loco-admin loco-lists"><?php 

    // show upgrade notice if available
    if( isset($update) ):?> 
    <div class="loco-message updated inline loco-warning">
        <p>
            <strong>
                <?php Loco::h( __('New version available','loco-translate') )?>:
            </strong>
            <a href="http://wordpress.org/extend/plugins/<?php echo Loco::NS?>">
                <?php Loco::h( __('Upgrade to version %s of Loco Translate','loco-translate'), $update )?>
            </a>
        </p>
    </div><?php
    else:?> 
    <div class="notice inline notice-info">
        <h3>Version 2.0 is nearly here</h3>
        <p>
            We've been working on a completely new version of Loco Translate. 
            If you'd like early access, please <a href="https://localise.biz/help/wordpress/translate-plugin/developers" target="_blank">help us test it</a>.
        </p>
    </div><?php
    endif; 
    
    // main tabbed navigation
    Loco::render('admin-nav', compact('nav') )?> 
    
    <h3 class="title">
        <?php Loco::h( __('Select a plugin or theme to translate','loco-translate') )?> 
    </h3><?php 
    
    
    // Theme packages
    //
    if( $themes ):?> 
    <div class="icon32 icon-appearance"><br /></div>
    <h2 class="dashicons-admin-appearance">
        <?php Loco::h( _x('Themes','Package list header','loco-translate') )?> 
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
        <?php Loco::h( _x('Plugins','Package list header','loco-translate') )?> 
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
        <?php Loco::h( _x('Core','Package list header','loco-translate') )?> 
    </h2>
    <div class="loco-list loco-list-core">
        <?php Loco::render( 'admin-list', array('items'=>$core) ) ?> 
    </div><?php 
    endif?> 

</div>
