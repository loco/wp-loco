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


    if( $params->has('potfile') ):
    if( $potfile->synced ):?> 
    <div class="notice inline notice-success">
        <h3 class="has-icon">
            In sync with template
        </h3>
        <p>
            PO file has the same source strings as "<?php $potfile->e('name')?>"
        </p>
    </div><?php

    else:?> 
    <div class="notice inline notice-debug">
        <h3 class="has-icon">
            Out of sync with template
        </h3>
        <p>
            PO file has different source strings to "<?php $potfile->e('name')?>". Try running Sync before making any changes.
        </p>
    </div><?php
    endif;
    
    /*if( $params->has('altpot') ):?> 
    <div class="notice inline notice-debug">
        <h3 class="has-icon">
            Alternative template file
        </h3>
    </div><?php
    endif;*/
    
    else:?> 
    <div class="notice inline notice-debug">
        <h3 class="has-icon">
            Missing template
        </h3>
        <p>
            These translations are not linked to a POT file. Sync operations will extract strings directly from source code.
        </p>
    </div><?php
    endif;
    