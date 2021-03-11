<?php
/**
 * Plugin version information
 */
$this->extend('../layout');

    // Loco Translate version:
    if( $params->has('update') ):?> 
    <div class="notice inline notice-warning">
        <h3 class="has-icon">
            <?php self::e( __('Version %s','loco-translate'), $version )?> 
        </h3>
        <p>
            <?php esc_html_e('A newer version of Loco Translate is available for download','loco-translate')?>.
        </p>
        <p class="submit">
            <a class="button button-primary" href="<?php echo $update_href?>" target="_blank"><?php self::e(__('Upgrade to %s','loco-translate'), 'v'.$update )?></a>
            <a class="button button-link has-icon icon-ext" href="https://wordpress.org/plugins/loco-translate/installation/" target="_blank"><?php esc_html_e('Install manually','loco-translate')?></a>
        </p>
    </div><?php

    elseif( $params->has('devel') ):?> 
    <div class="notice inline notice-debug">
        <h3 class="has-icon">
            <?php self::e( __('Version %s','loco-translate'), $version )?> 
        </h3>
        <p>
            <?php esc_html_e("You're running a development snapshot of Loco Translate",'loco-translate')?> 
        </p>
    </div><?php

    else:?> 
    <div class="notice inline notice-success">
        <h3 class="has-icon">
            <?php self::e( __('Version %s','loco-translate'), $version)?> 
        </h3>
        <p>
            <?php esc_html_e("You're running the latest version of Loco Translate",'loco-translate')?> 
        </p>
    </div><?php
    endif;
    
    
    // PHP version (warnings only)
    if( $params->has('phpupdate') ):?> 
    <div class="notice inline notice-warning">
        <h3 class="has-icon"><?php 
            // translators: Where %s is the full version number of PHP
            self::e( __('PHP %s','loco-translate'), $phpversion )?> 
        </h3>
        <p><?php 
            // translators: (1) Name of software, e.g. "WordPress" (2) Version number, e.g. "5.6"
            self::e( __('Your version of %1$s is very old. We recommend you upgrade to at least v%2$s, but preferably to the latest stable version.','loco-translate'),'PHP',$phpupdate)?> 
        </p>
        <p class="submit">
            <a class="button button-primary" href="https://www.php.net/releases/#<?php echo $phpupdate?>" target="_blank">PHP <?php echo $phpupdate?></a>
            <a class="button" href="https://www.php.net/downloads.php#v7" target="_blank">PHP 7</a>
            <a class="button" href="https://www.php.net/downloads.php#v8" target="_blank">PHP 8</a>
        </p>
    </div><?php
    endif;


    // WordPress version (warnings only)
    if( $params->has('wpupdate') ):?>
        <div class="notice inline notice-warning">
        <h3 class="has-icon"><?php
            // translators: Where %s is the full version number of WordPress
            self::e( __('WordPress %s','loco-translate'), $wpversion )?> 
        </h3>
        <p><?php
            self::e( __('Your version of %1$s is very old. We recommend you upgrade to at least v%2$s, but preferably to the latest stable version.','loco-translate'),'WordPress',$wpupdate)?> 
        </p>
        <p class="submit">
            <a class="button button-primary" href="<?php echo esc_url($wpupdate_href)?>"><?php esc_html_e('Update Now','default')?></a>
            <a class="button-link has-icon icon-ext" target="_blank" href="https://wordpress.org/download/releases/"><?php esc_html_e( __('Install manually','loco-translate') )?></a>
        </p>
        </div><?php
    endif;
