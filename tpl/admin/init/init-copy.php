<?php
/**
 * Notice before creating a PO that an existing one can be copied
 */
$this->extend('../layout');
$help = apply_filters('loco_external','https://localise.biz/wordpress/plugin/manual/templates');

/* @var Loco_mvc_ViewParams $params */
/* @var Loco_mvc_ViewParams $ext */
/* @var Loco_mvc_ViewParams $skip */
/* @var Loco_mvc_ViewParams $copy */
?>
    <div class="panel panel-warning">
    <h3 class="has-icon">
        <?php esc_html_e('Template missing','loco-translate')?> 
    </h3>
    <p>
        <?php esc_html_e('You can copy an existing PO file (recommended), or extract directly from source (advanced)','loco-translate')?>.
    </p>
    <p>
        <a href="<?php $copy->e('link')?>" class="button button-link button-primary has-icon icon-copy"><?php $copy->e('text')?></a>
        <a href="<?php $ext->e('link')?>" class="button button-link has-icon icon-add"><?php $ext->e('text')?></a>
        <a href="<?php $skip->e('link')?>" class="button button-link has-icon icon-next"><?php $skip->e('text')?></a>
    </p>
</div>