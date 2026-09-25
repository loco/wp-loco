<?php
/**
 * JSON source view
 */
$this->extend('view');
$this->start('source');

/* @var Loco_mvc_ViewParams $params */
/* @var string $json */

echo $this->render('../common/inc-po-header');?>


<div class="panel" id="loco-po" style="white-space: pre-wrap;"><?php echo $params->escape($json)?></div>
