<?php
/**
 * Root admin screen
 */

$this->extend('layout');
?> 
    
    <div class="notice inline notice-info">
        <h3 class="has-icon">
            DEVELOPMENT VERSION
        </h3>
        <p>
            Thanks for trying out this early preview.
            This plugin is in active development, so expect bugs and missing features.
        </p>
    </div>

    <?php if( $recent ):?> 
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
