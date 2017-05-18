<?php
/**
 * Root admin screen
 */

$this->extend('layout');
?> 
    
    <div class="notice inline notice-info"><?php
        if( $upgraded ):?> 
        <h3>Welcome to the all new version 2</h3>
        <p>
            You can switch to <a href="<?php $params->e('rollback')?>"> version 1</a> if you want to keep using the old plugin.<br />
        </p><?php
        else:?> 
        <h3><?php esc_attr_e('Welcome to Loco Translate','loco-translate')?></h3><?php
        endif?> 
        <p><?php 
            // translators: 1: help URL, 2: forum URL; Must be HTML encoded 
            printf(
                __('If you have any questions, please try our <a href="%1$s">help pages</a> or ask in the <a href="%2$s">support forum</a>.','loco-translate'),
                esc_url( apply_filters('loco_external','https://localise.biz/wordpress/plugin') ),
                'https://wordpress.org/support/plugin/loco-translate'
            );?> 
        </p>
    </div><?php

    if( $recent ):?> 
    <div>
        <h2>
            <?php esc_attr_e('Recently updated:','loco-translate')?> 
        </h2>
        <p>
            <?php esc_html_e("Translations have been recently modified in the following bundles",'loco-translate')?>:
        </p><?php
        echo $this->render('list/inc-table', array( 'bundles' => $recent ) );?> 
    </div><?php
    endif;?> 
        

    <div>
        <h2>
            <?php esc_attr_e('Active theme:','loco-translate')?> 
        </h2><?php
        echo $this->render('list/inc-table', array( 'bundles' => array($theme) ) )?> 
        <p>
            <a href="<?php $this->route('theme')->e('href')?>" class="button button-link has-raquo"><?php esc_html_e('See all themes','loco-translate')?></a>
        </p>
    </div>


    <?php if( $plugins ):?> 
    <div>
        <h2>
            <?php esc_attr_e('Running plugins:','loco-translate')?> 
        </h2>
        <p>
            <?php esc_html_e('These plugins have recently loaded translation files into the admin area','loco-translate')?>:
        </p><?php
        echo $this->render('list/inc-table', array( 'bundles' => $plugins ) )?> 
        <p>
            <a href="<?php $this->route('plugin')->e('href')?>" class="button button-link has-raquo"><?php esc_html_e('See all plugins','loco-translate')?></a>
        </p>
    </div><?php
    endif;
