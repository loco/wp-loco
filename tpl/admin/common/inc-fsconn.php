<?php
/**
 * Include standard file system connect dialog
 */
 
    $help = esc_url( apply_filters('loco_external','https://localise.biz/wordpress/plugin/manual/filesystem') );

    if( $fsFields->has('connection_type') ):?> 
    <form id="loco-fs" class="notice notice-info jshide">
        <p>
            <span><?php esc_html_e('Connected to remote file system','loco-translate')?> (<?php $fsFields->e('connection_type')?>)</span>
        </p>
        <?php $fsFields->_e();?> 
    </form><?php
    else:?> 


    <form id="loco-fs" class="notice inline notice-locked jshide">
        <p>
            <strong class="has-icon"><?php
            switch( $fsFields->auth ): 
            case 'all':
                esc_html_e('Write protected','loco-translate');
                break;
            case 'create':
                esc_html_e('Folder is protected','loco-translate');
                break;
            default:
                esc_html_e('File is protected','loco-translate');
            endswitch;?></strong>:
            
            <span>
                <?php esc_html_e('To modify the file system, click "Connect" and authenticate with the server','loco-translate')?>.
            </span>
            <a class="button button-small" href="<?php echo $help?>" target="_blank"> ? </a>
            <button type="button" class="button button-small button-primary"><?php esc_html_e('Connect','loco-translate')?></button>
        </p>
        <?php $fsFields->_e();?> 
    </form><?php
    endif;
