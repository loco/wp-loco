<?php
/**
 * PO file editor
 */
$this->extend('editor');
$this->start('header');

$lname = $locale->getName() or $lname = (string) $locale;
?>
    
    <h3 class="title">
        <span class="<?php echo $locale->getIcon()?>" lang="<?php echo $locale->lang?>"> </span>
        <span><?php echo esc_html($lname)?>:</span>
        <span class="loco-meta">
            <span><?php echo esc_html_x('Updated','Modified time','loco')?>:</span>
            <span id="loco-po-modified"><?php $params->date('modified')?></span>
            &ndash;
            <span id="loco-po-status"></span>
        </span>
    </h3>
