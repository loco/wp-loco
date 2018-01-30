<?php
/**
 * PO source view
 */
$this->extend('view');
$this->start('source');
?> 
    <h3>
        <a href="<?php $locale->e('href')?>" class="has-lang">
            <span class="<?php $locale->e('icon')?>" lang="<?php $locale->e('lang')?>"><code><?php $locale->e('code')?></code></span>
            <span><?php $locale->e('name')?></span>
        </a>
        <span class="loco-meta">
            <span><?php echo esc_html_x('Updated','Modified time','loco-translate')?>:</span>
            <span id="loco-po-modified"><?php $params->date('modified')?></span>
            &ndash;
            <span id="loco-po-status"><?php self::e( $meta->getProgressSummary() )?></span>
        </span>
    </h3>
    
    <?php
    echo $this->render('msgcat');
