<?php
/**
 * Editor layout for PO and POT files
 */

$this->extend('../layout');
echo $header;

/* @var Loco_mvc_ViewParams $js */
/* @var Loco_mvc_ViewParams $ui */
/* @var Loco_mvc_ViewParams $params */
/* @var Loco_mvc_ViewParams $locale */
/* @var Loco_mvc_HiddenFields $dlFields */
?>

    <div id="loco-editor">
        <nav class="wp-core-ui">
            <form action="#" id="loco-actions">
                <fieldset>
                    <button class="button has-icon icon-save" data-loco="save" disabled>
                        <span><?php $ui->e('save')?></span>
                    </button>
                    <button class="button has-icon icon-revert" data-loco="revert" disabled>
                        <span><?php $ui->e('revert')?></span>
                    </button>
                    <button class="button has-icon icon-sync" data-loco="sync" disabled>
                        <span><?php $ui->e('sync')?></span>
                    </button>
                </fieldset><?php
                if( $locale ):?> 
                <fieldset>
                    <button class="button has-icon icon-ok" data-loco="lint" disabled>
                        <span><?php $ui->e('lint')?></span>
                    </button>
                    <button class="button has-icon icon-robot" data-loco="auto" disabled>
                        <span><?php $ui->e('auto')?></span>
                    </button>
                </fieldset><?php
                else:?> 
                <fieldset>
                    <button class="button has-icon icon-add" data-loco="add" disabled>
                        <span><?php $ui->e('add')?></span>
                    </button>
                    <button class="button has-icon icon-del" data-loco="del" disabled>
                        <span><?php $ui->e('del')?></span>
                    </button>
                </fieldset><?php
                endif?> 
                <fieldset class="loco-clearable">
                    <input type="text" maxlength="100" name="q" id="loco-search" placeholder="<?php $ui->e('filter')?>" autocomplete="off" disabled />
                </fieldset>
                <fieldset>
                    <button class="button has-icon only-icon icon-pilcrow" data-loco="invs" disabled title="<?php $ui->e('invs')?>">
                        <span><?php $ui->e('invs')?></span>
                    </button>
                    <button class="button has-icon only-icon icon-code" data-loco="code" disabled title="<?php $ui->e('code')?>">
                        <span><?php $ui->e('code')?></span>
                    </button>
                </fieldset>
            </form>
        </nav>

        <div id="loco-editor-inner" class="jsonly">
            <div class="loco-loading"></div>
        </div>
        
    </div>
