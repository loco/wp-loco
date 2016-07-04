<?php
/**
 * File info for a binary MO where the PO file is missing
 */
$this->extend('info');
$this->start('header');
?> 

    <div class="notice inline notice-info">
        <h3>
            <span class="<?php $locale->e('icon')?>" lang="<?php $locale->e('lang')?>"> </span>
            <span><?php $locale->e('name')?></span>
            <code><?php $locale->e('code')?></code>
            <span>&mdash; compiled</span>
        </h3>
        <dl>
            <dt>File modified:</dt>
            <dd><?php $file->date('mtime')?></dd>

            <dt>Last translation:</dt>
            <dd><?php $params->e('author')?> &mdash; <date><?php $params->date('potime')?></date></dd>
            
            <dt>Compiled translations:</dt>
            <dd>
                <?php echo esc_html( $meta->getTotalSummary() )?> 
            </dd>
        </dl>
    </div>
   
    <?php
    if( ! $sibling->existant ):?> 
    <div class="notice inline notice-warning">
        <h3 class="has-icon">
            PO file missing
        </h3>
        <p>
            We can't find the original PO file from which this file was compiled.
        </p>
    </div><?php
    endif;