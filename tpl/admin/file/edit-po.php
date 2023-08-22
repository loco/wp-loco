<?php
/**
 * PO file editor
 */
$this->extend('editor');
$this->start('header');
?> 

    <form action="<?php $params->e('dlAction')?>" method="post" target="_blank" id="loco-download" class="aux wp-core-ui">
        <fieldset>
            <button class="button button-link has-icon icon-download" data-loco="source" disabled title="<?php $ui->e('download')?> <?php $params->e('filetype')?>">
                <span><?php $params->e('filetype')?></span>
            </button><?php
            if( $locale && 'MO' !== $params->filetype ):?>
            <button class="button button-link has-icon icon-download" data-loco="binary" disabled title="<?php $ui->e('download')?> MO">
                <span>MO</span>
            </button><?php
            endif?> 
        </fieldset>
        <?php
        $dlFields->_e();?> 
    </form><?php

echo $this->render('../common/inc-po-header');
