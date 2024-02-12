<?php
/**
 * Show bundle diagnostics
 */
$this->extend('../layout');

/* @var Loco_mvc_ViewParams $meta */
?> 
    <p>
        <?php esc_html_e('This information is for developers to find problems in the bundle setup','loco-translate')?>.
    </p>
    <p data-vendor="<?php $meta->e('vendor')?>">
        <?php echo $meta->author?> 
    </p><?php

    /* @var $notices Loco_mvc_ViewParams[] */
    foreach( $notices as $notice ):?> 
    <div class="<?php $notice->e('style')?>">
        <p>
            <strong class="has-icon"> </strong> 
            <?php $notice->e('body')?> 
        </p>
    </div><?php
    endforeach;

    /* @var Loco_mvc_ViewParams $params */
    if( $params->has('xml') ):?> 
    <div class="panel">
        <h4>Current configuration as XML:</h4>
        <pre><?php $params->e('xml')?></pre>
    </div><?php
    endif?> 