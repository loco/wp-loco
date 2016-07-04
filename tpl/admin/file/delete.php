<?php
/**
 * Confirmation form for deleting a file
 */
$this->extend('../layout');

    /*if( $locked ):?> 
    <form action="" method="post" enctype="application/x-www-form-urlencoded" class="notice inline notice-locked">
        <p>
            <strong class="has-icon">Protected:</strong>
            If you can't delete this file directly, try connecting to the remote server:
        </p>
        <p>
            <input type="submit" name="remote" value="Connect" class="button button-small" />
        </p>
    </form><?php
    endif*/?> 


    <form action="" method="post" enctype="application/x-www-form-urlencoded">
        <div class="notice inline notice-danger">
            <h3>
                <span class="has-icon icon-trash"> </span>
                <span><?php esc_html_e('Confirm delete','loco')?></span>
            </h3>
            <p>
                Are you sure you want to <strong>permanently</strong> delete the following file?
            </p>
            <p>
                <code><?php $info->e('relpath')?></code>
            </p><?php
            if( $params->has('deps') ):?> 
            <p>
                <strong><?php $params->e('warn')?></strong><?php
                foreach( $deps as $info ):?> 
                <div><?php $info->e('name')?></div><?php
                endforeach?> 
            </p><?php
            endif?> 
            <p class="submit">
                <input type="submit" class="button button-danger" value="<?php esc_html_e('Delete Permanently','default')?>" />
            </p>
        </div>
        <?php
        /* @var $hidden Loco_mvc_HiddenFields */
        $hidden->_e();?> 
    </form>
