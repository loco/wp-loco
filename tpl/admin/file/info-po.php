<?php
/**
 * File info for a translation source PO
 */
$this->extend('info');
$this->start('header');
?> 

    <div class="notice inline notice-info">
        <h3>
            <span class="<?php $locale->e('icon')?>" lang="<?php $locale->e('lang')?>"> </span>
            <span><?php $locale->e('name')?></span>
            <code><?php $locale->e('code')?></code>
        </h3>
        <dl>
            <dt>File modified:</dt>
            <dd><?php $file->date('mtime')?></dd>

            <dt>Last translation:</dt>
            <dd><?php $params->e('author')?> &mdash; <date><?php $params->date('potime')?></date></dd>
            
            <dt>Translation progress:</dt>
            <dd>
                <?php echo esc_html( $meta->getProgressSummary() )?>
            </dd>
            <dd>
                <?php $meta->printProgress()?> 
            </dd>
        </dl>
    </div>
 
    <?php
    if( ! $sibling->existant ):?> 
    <div class="notice inline notice-warning">
        <h3 class="has-icon">
            Binary file missing
        </h3>
        <p>
            We can't find the binary MO file that belongs with these translations.
        </p>
    </div><?php
    endif;
