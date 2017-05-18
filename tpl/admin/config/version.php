<?php
/**
 * Plugin version information
 */
$this->extend('../layout');


    if( $params->has('update') ):?> 
    <div class="notice inline notice-warning">
        <h3 class="has-icon">
            <?php self::e( __('Version %s','loco-translate'), $version )?> 
        </h3>
        <p>
            <?php esc_html_e( __('A newer version of Loco Translate is available for download','loco-translate') )?>.
        </p>
        <p class="submit">
            <a class="button button-primary" href="<?php echo $update_href?>"><?php self::e(__('Upgrade to %s','loco-translate'), $update )?></a>
            <a class="button button-link has-icon icon-ext" href="https://wordpress.org/plugins/loco-translate/installation/" target="_blank"><?php esc_html_e( __('Install manually','loco-translate') )?></a>
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
    endif;?> 
    
    
    <form action="" method="post" enctype="application/x-www-form-urlencoded" class="notice inline notice-generic">
        <h3>
            Downgrade to 1.5.6
        </h3>
        <p>
            Maintenance for the 1.x branch has stopped and there will be no further releases.
        </p>
        <p>
            You can run Loco Translate in legacy mode for the time being, but this feature will be removed in the next major release.
        </p>
        <p class="submit">
            <input type="submit" value="Enable legacy version" class="button" />
            <input type="hidden" name="<?php $nonce->e('name')?>" value="<?php $nonce->e('value')?>" />
        </p>
    </form>
    