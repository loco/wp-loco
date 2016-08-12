<?php
/**
 * Include standard file system connect dialog
 */


    if( $fsFields->has('connection_type') ):?> 
    <form id="loco-fs" class="notice notice-info jshide">
        <p>
            <span>Remote file system connected (<?php $fsFields->e('connection_type')?>)</span>
        </p>
        <?php $fsFields->_e();?> 
    </form><?php
    else:?> 


    <form id="loco-fs" class="notice inline notice-locked jshide">
        <p>
            <strong class="has-icon"><?php
            switch( $fsFields->auth ): 
            case 'all':
                esc_html_e('Write protected','loco');
                break;
            case 'create':
                esc_html_e('Folder is protected','loco');
                break;
            default:
                esc_html_e('File is protected','loco');
            endswitch;?></strong>:
            
            <span>
                <?php esc_html_e('To modify the file system, click "Connect" and authenticate with the server','loco')?> 
            </span>
            <a class="button button-small" href="https://localise.biz/help/wordpress/translate-plugin/manual/filesystem"> ? </a>
            <button type="button" class="button button-small button-primary"><?php esc_html_e('Connect','loco')?></button>
        </p>
        <?php $fsFields->_e();?> 
    </form><?php
    endif;
