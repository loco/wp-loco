<?php
/**
 * Root admin screen
 */

$this->extend('layout');
?> 
    
    <div class="notice inline notice-info">
        <h3 class="has-icon">
            Welcome to the all new version 2
        </h3>
        <p>
            Thanks for using Loco Translate.
            We've completely rebuilt our old plugin from the ground up, so please let us know in the <a href="https://wordpress.org/support/plugin/loco-translate" target="_blank">support forum</a> if you find any bugs.
        </p>
        <p>
            If you get stuck, use the "Help" dropdown at the top of the screen or try our 
            <a href="<?php echo esc_url(apply_filters('loco_external','https://localise.biz/wordpress/plugin'))?>">help pages</a>.
        </p>
    </div><?php

    if( $params->has('locale') ):?> 
    <div class="notice inline notice-generic">
        <p>
            <span class="<?php echo $params->locale->getIcon()?>"> </span>
            Because this version is so new, it's not yet translated into your language. We'll be fixing that in the near future.
        </p>
    </div><?php
    endif;

    if( $recent ):?> 
    <div>
        <h2>
            <?php esc_attr_e('Recently updated:','loco')?> 
        </h2>
        <p>
            You've recently updated files in the following bundles:
        </p><?php
        echo $this->render('list/inc-table', array( 'bundles' => $recent ) );?> 
    </div><?php
    endif;?> 
        

    <div>
        <h2>
            <?php esc_attr_e('Active theme:','loco')?> 
        </h2><?php
        echo $this->render('list/inc-table', array( 'bundles' => array($theme) ) )?> 
        <p>
            <a href="<?php $this->route('theme')->e('href')?>" class="button button-link">See all themes &raquo;</a>
        </p>
    </div>


    <?php if( $plugins ):?> 
    <div>
        <h2>
            <?php esc_attr_e('Running plugins:','loco')?> 
        </h2>
        <p>
            These plugins have recently loaded translation files into the admin area:
        </p><?php
        echo $this->render('list/inc-table', array( 'bundles' => $plugins ) )?> 
        <p>
            <a href="<?php $this->route('plugin')->e('href')?>" class="button button-link">See all plugins &raquo;</a>
        </p>
    </div><?php
    endif;
