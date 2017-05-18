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
            <dt><?php self::e( __('File modified','loco-translate') )?>:</dt>
            <dd><?php $file->date('mtime')?></dd>

            <dt><?php self::e( __('Last translation','loco-translate') )?>:</dt>
            <dd><?php $params->e('author')?> &mdash; <date><?php $params->date('potime')?></date></dd>
            
            <dt><?php self::e( __('Translation progress','loco-translate') )?>:</dt>
            <dd>
                <?php self::e( $meta->getProgressSummary() )?> 
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
            <?php self::e( __('Binary file missing','loco-translate') )?> 
        </h3>
        <p>
            <?php self::e( __("We can't find the binary MO file that belongs with these translations",'loco-translate') )?>.
        </p>
    </div><?php
    endif;


    if( $params->has('potfile') ):
    if( $potfile->synced ):?> 
    <div class="notice inline notice-success">
        <h3 class="has-icon">
            <?php self::e( __('In sync with template','loco-translate') )?> 
        </h3>
        <p>
            <?php // Translators: Where %s is the name of a template file
            self::e( __('PO file has the same source strings as "%s"','loco-translate'), $potfile->name )?>.
        </p>
    </div><?php

    else:?> 
    <div class="notice inline notice-debug">
        <h3 class="has-icon">
            <?php self::e( __('Out of sync with template','loco-translate') )?> 
        </h3>
        <p>
            <?php // Translators: Where %s is the name of a template file
            self::e( __('PO file has different source strings to "%s". Try running Sync before making any changes.','loco-translate'), $potfile->name )?> 
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
            <?php self::e( __('Missing template','loco-translate') )?> 
        </h3>
        <p>
            <?php
            self::e( __('These translations are not linked to a POT file. Sync operations will extract strings directly from source code.','loco-translate') )?> 
        </p>
    </div><?php
    endif;
