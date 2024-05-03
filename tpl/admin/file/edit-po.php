<?php
/**
 * PO file editor
 */
$this->extend('editor');
$this->start('header');

/* @var Loco_mvc_ViewParams $params */
?> 

    <form action="<?php $params->e('dlAction')?>" method="post" target="_blank" id="loco-download" class="aux wp-core-ui">
        <fieldset><?php

            // first download button is a direct download of the current file (.po, .pot, and potentially .mo)
            /* @var Loco_mvc_ViewParams $ui */?> 
            <button class="button button-link has-icon icon-download" data-loco="source" disabled title="<?php $ui->e('download')?> <?php $params->e('filetype')?>">
                <span><?php $params->e('filetype')?></span>
            </button><?php

            // second button is language pack if zip is available and project is configured
            /* @var Loco_Locale $locale */
            /* @var Loco_mvc_HiddenFields $dlFields */
            if( $locale && class_exists('ZipArchive',false) && $dlFields->has('domain') ):?> 
            <button class="button button-link has-icon icon-zip" data-loco="archive" disabled title="<?php $ui->e('download')?> Zip">
                <span>ZIP</span>
            </button><?php

            // else legacy MO file
            elseif( $locale ):?> 
            <button class="button button-link has-icon icon-download" data-loco="binary" disabled title="<?php $ui->e('download')?> MO">
                <span>MO</span>
            </button><?php            
            endif?> 
        </fieldset><?php

        $dlFields->_e();?> 
    </form><?php

echo $this->render('../common/inc-po-header');
