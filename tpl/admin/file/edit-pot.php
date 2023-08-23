<?php
/**
 * POT file editor
 */
$this->extend('editor');
$this->start('header');
?>

    <form action="<?php $params->e('dlAction')?>" method="post" target="_blank" id="loco-download" class="aux wp-core-ui">
        <fieldset>
            <button class="button button-link has-icon icon-download" data-loco="source" disabled title="<?php $ui->e('download')?>">
                <span>POT</span>
            </button>
        </fieldset>
        <?php
        $dlFields->_e();?> 
    </form>

    <h3 class="has-lang">
        <span><?php esc_html_e('Template file','loco-translate')?>:</span>
        <span class="loco-meta">
            <span><?php echo esc_html_x('Updated','Modified time','loco-translate')?>:</span>
            <span id="loco-po-modified"><?php $params->date('modified')?></span>
            &ndash;
            <span id="loco-po-status"></span>
        </span>
    </h3>


    <div id="loco-auto" title="Error">
        <p>Template files cannot be translated</p>
    </div>
