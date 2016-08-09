<?php
/**
 * PO source view
 */
$this->extend('view');
$this->start('source');
?> 
    <h3 class="title">
        <span class="<?php echo $locale->getIcon()?>" lang="<?php echo $locale->lang?>"> </span>
        <span><?php $params->e('localeName')?>:</span>
        <span class="loco-meta">
            <span><?php echo esc_html_x('Updated','Modified time','loco')?>:</span>
            <span id="loco-po-modified"><?php $params->date('modified')?></span>
            &ndash;
            <span id="loco-po-status"><?php echo esc_html( $meta->getProgressSummary() )?></span>
        </span>
    </h3>
    
    <?php
    echo $this->render('msgcat');
