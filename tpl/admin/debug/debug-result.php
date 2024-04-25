<?php
/* @var Loco_mvc_View $this */

$this->extend('debug-form');
$this->start('header');

/* @var Loco_mvc_ViewParams $result */

// Translation may be equal to source, even if source string is found in PO
if( $result->msgstr === $result->msgid ):?> 
    <div class="panel panel-warning">
        <h3 class="has-icon">String found, but not translated</h3>
        <p>See below for source string matches.</p>
    </div><?php

// This is the result of the runtime translation request
else:?> 
    <div class="panel panel-success">
        <h3>Translation result:</h3>
        <p><code class="po"><?php $result->e('msgstr')?></code></p>
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
        endforeach?> 
    </div><?php
endforeach;
