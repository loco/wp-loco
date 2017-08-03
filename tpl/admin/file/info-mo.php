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
            <span>&mdash; <?php esc_html_e('compiled','loco-translate')?></span>
        </h3>
        <dl>
            <dt><?php esc_html_e('File modified','loco-translate')?>:</dt>
            <dd><?php $file->date('mtime')?></dd>

            <dt><?php esc_html_e('Last translation','loco-translate')?>:</dt>
            <dd><?php $params->e('author')?> &mdash; <date><?php $params->date('potime')?></date></dd>
            
            <dt><?php esc_html_e('Compiled translations','loco-translate')?>:</dt>
            <dd>
                <?php echo esc_html( $meta->getTotalSummary() )?> 
            </dd>
        </dl>
    </div>
   
    <?php
    if( ! $sibling->existent ):?> 
    <div class="notice inline notice-warning">
        <h3 class="has-icon">
            <?php esc_html_e('PO file missing','loco-translate')?> 
        </h3>
        <p>
            <?php esc_html_e("We can't find the original PO file from which this was compiled",'loco-translate')?>.
        </p>
    </div><?php
    endif;