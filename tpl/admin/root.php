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
            This is an early release of our completely rebuilt plugin. 
            You can switch to <a href="<?php $params->e('rollback')?>"> version 1</a> if you want to keep using the old plugin.
        </p>
    </div><?php

    if( $recent ):?> 
    <div>
        <h2>
            <?php esc_attr_e('Recently updated:','loco')?> 
        </h2>
        <p>
            <?php esc_html_e("Translations have been recently modified in the following bundles",'loco')?>:
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
            <a href="<?php $this->route('theme')->e('href')?>" class="button button-link has-raquo"><?php esc_html_e('See all themes','loco')?></a>
        </p>
    </div>


    <?php if( $plugins ):?> 
    <div>
        <h2>
            <?php esc_attr_e('Running plugins:','loco')?> 
        </h2>
        <p>
            <?php esc_html_e('These plugins have recently loaded translation files into the admin area','loco')?>:
        </p><?php
        echo $this->render('list/inc-table', array( 'bundles' => $plugins ) )?> 
        <p>
            <a href="<?php $this->route('plugin')->e('href')?>" class="button button-link has-raquo"><?php esc_html_e('See all plugins','loco')?></a>
        </p>
    </div><?php
    endif;
