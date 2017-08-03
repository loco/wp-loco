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
    endif;?> 


    <div class="notice inline notice-generic">
        <h3>
            Downgrade to 1.5.6
        </h3>
        <p>
            Maintenance and support for the 1.x branch has stopped and there will be no further releases.<br />
            The only way to run the old version of Loco Translate is by installing it manually from the 
            <a href="https://github.com/loco/wp-loco/tree/1.x">Git archive</a>.
        </p>
    </div>
    