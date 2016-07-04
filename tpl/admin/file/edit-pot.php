<?php
/**
 * POT file editor
 */
$this->extend('editor');
$this->start('header');
?>

    <h3 class="title">
        <span class="icon icon-file"></span>
        <span><?php esc_html_e('Template file','loco')?>:</span>
        <span class="loco-meta">
            <span><?php echo esc_html_x('Updated','Modified time','loco')?>:</span>
            <span id="loco-po-modified"><?php $params->date('modified')?></span>
            &ndash;
            <span id="loco-po-status"></span>
        </span>
    </h3>    


