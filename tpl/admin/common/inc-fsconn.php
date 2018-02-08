<?php
/**
 * Include standard file system connect dialog
 */

    $help = esc_url( apply_filters('loco_external','https://localise.biz/wordpress/plugin/manual/filesystem') );

    // Total file lock prevents any kind of update, regardless of connection
    if( $params->has('fsLocked') ):?> 
    <div class="has-nav notice inline notice-locked">
        <p>
            <strong class="has-icon"><?php esc_html_e('Locked','loco-translate')?>:</strong>
            <span><?php $params->e('fsLocked')?>.</span>
        </p>
        <nav>
            <a href="<?php echo $help?>#wp" target="_blank"><?php esc_html_e('Documentation','loco-translate')?></a>
            <span>|</span>
            <a href="<?php $this->route('config')->e('href')?>#loco--fs-protect"><?php esc_html_e('Settings','loco-translate')?></a>
        </nav>
    </div><?php
 
 
    // else render remote connection form
    else:
        
    if( $params->has('fsWarning') ):?> 
    <div id="loco-fs-warn" class="has-nav notice inline notice-info jshide">
        <p>
            <strong class="has-icon"><?php esc_html_e('Notice','loco-translate')?>:</strong>
            <span><?php echo esc_html($fsWarning)?>.</span>
        </p>
        <nav>
            <a href="<?php echo $help?>#wp" target="_blank"><?php esc_html_e('Documentation','loco-translate')?></a>
            <span>|</span>
            <a href="<?php $this->route('config')->e('href')?>#loco--fs-protect"><?php esc_html_e('Settings','loco-translate')?></a>
        </nav>
    </div><?php
    endif?> 
        
    <form id="loco-fs" class="has-nav notice inline notice-locked jshide">
        <p>
            <strong class="has-icon"><?php
                // Translators: When a file or folder cannot be modified due to filesystem permissions
                esc_html_e('Write protected','loco-translate')?>:
            </strong>
            <span><?php
                $params->e('fsPrompt')?>.
            </span>
            <span><?php 
                esc_html_e('Click "Connect" to authenticate with the server','loco-translate')?>.</span>
        </p><?php
        // remote connect button required when not pre-authed
        if( ! $fsFields->has('connection_type') ):?> 
        <nav>
            <button type="button" class="button button-small button-primary"><?php esc_html_e('Connect','loco-translate')?></button>
            <a class="button button-small" href="<?php echo $help?>#remote" target="_blank"> ? </a>
        </nav><?php
        // else form will remain hidden
        endif;
        $fsFields->_e();?> 
    </form><?php
    endif;
