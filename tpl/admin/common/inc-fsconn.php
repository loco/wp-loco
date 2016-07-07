<?php
/**
 * Include standard file system connect dialog
 */
?> 

    <form id="loco-fs" class="notice inline notice-locked jshide">
        <p>
            <strong class="has-icon"><?php
            switch( $fsFields->auth ): 
            case 'create':
                esc_html_e('Folder is protected','loco');
                break;
            default:
                esc_html_e('File is protected','loco');
            endswitch;?></strong>:
            
            <span>To modify the file system, click "Connect" and authenticate with the server.</span>
            <button type="button" class="button button-small button-primary"><?php esc_html_e('Connect','loco')?></button>
        </p>
        <?php $fsFields->_e();?> 
    </form>