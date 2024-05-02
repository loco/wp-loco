<?php
/* @var Loco_mvc_View $this */

$this->extend('debug-form');
$this->start('header');

/* @var Loco_mvc_ViewParams $result */
if( $result->translated ):?> 
    <div class="panel panel-success">
        <h3 class="has-icon">Translation result:</h3>
        <p><code class="po"><?php $result->e('msgstr')?></code></p>
        <p>
            This is the translation value returned from the 
            <a href="<?php $result->e('calleeDoc')?>" target="_blank"><code><?php $result->e('callee')?></code></a> function.
        </p>
    </div><?php

else:?> 
    <div class="panel panel-warning">
        <h3 class="has-icon">String found, but no translation returned</h3>
        <p>
            The <a href="<?php $result->e('calleeDoc')?>" target="_blank"><code><?php $result->e('callee')?></code></a> function
            returned the same value as the source string. Either the string isn't translated, or the required translation file wasn't loaded. 
        </p>
        <p>
            See below for the exact string matches we found in your translation files.
        </p>
    </div><?php
endif;


/* @var Loco_mvc_ViewParams[] $matched */
foreach( $result->matches as $g => $matched ):
    /* @var Loco_mvc_FileParams $group */
    $group = $result->grouped[$g];?> 
    <div class="panel panel-info">
        <h3>
            <?php $group->e('type');?> translations:
        </h3><?php
        foreach( $matched as $file ):?> 
        <p>
            <span class="icon icon-file"> </span>
            <code class="path"><?php $file->e('relpath') ?></code> &rarr; <code class="po"><?php $file->e('msgstr');?></code>
        </p><?php
        endforeach;
        if( $group->has('href') ):?> 
        <p>
            <span class="icon icon-pencil"> </span>
            <a href="<?php $group->e('href')?>">Edit PO</a>
        </p><?php
        endif;?> 
    </div><?php
endforeach;
