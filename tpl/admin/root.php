<?php
/**
 * Root admin screen
 */

$this->extend('layout');

?> 

    <h1>
        <?php $params->e('title');?> 
    </h1>
    
    <div class="notice inline notice-info">
        <h3 class="has-icon">
            DEVELOPMENT VERSION
        </h3>
        <p>
            Thanks for trying out this early preview.
            This plugin is in active development, so expect bugs and missing features.
        </p>
    </div>
        
    <div>
        <h2>
            <?php esc_attr_e('Active theme:','loco')?> 
        </h2><?php
        echo $this->render('list/inc-table', array( 'bundles' => array($theme), 'type' => 'theme' ) )?> 
        <p>
            <a href="<?php $this->route('theme')->e('href')?>">See all themes</a>
        </p>
    </div>

    <?php if( $plugins ):?> 
    <div>
        <h2>
            <?php esc_attr_e('Active plugins:','loco')?> 
        </h2>
        <p>
            These plugins have recently loaded translation files into the admin area:
        </p><?php
        echo $this->render('list/inc-table', array( 'bundles' => $plugins, 'type' => 'plugin' ) )?> 
        <p>
            <a href="<?php $this->route('plugin')->e('href')?>">See all plugins</a>
        </p>
    </div><?php
    endif;
