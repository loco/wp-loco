<?php
/**
 * PHP source view
 */
$this->extend('view');
$this->start('source');

/* @var Loco_mvc_ViewParams $params */
/* @var string $phps */

echo $this->render('../common/inc-po-header');?> 


<div class="panel">
    <?php highlight_string($phps);?> 
</div>
