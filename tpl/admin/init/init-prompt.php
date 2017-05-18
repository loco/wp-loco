<?php
/**
 * Notice before creating a PO that there is no POT
 */
$this->extend('../layout');

$help = apply_filters('loco_external','https://localise.biz/wordpress/plugin/manual/templates');

?> 
    <div class="notice inline notice-warning">
        <h3 class="has-icon">
            <?php esc_html_e('Template missing','loco-translate')?> 
        </h3><?php
        if( $params->has('pot') ):?> 
        <p>
            <?php esc_html_e("This bundle's template file doesn't exist yet. We recommend you create it before adding languages",'loco-translate')?>.
        </p><?php
        else:?> 
        <p>
            <?php esc_html_e("This bundle doesn't define a translations template file",'loco-translate')?>.
        </p><?php
        endif?> 
        <p>
            <?php esc_html_e("Loco can sync directly with the source code, but this can be slow if there are many files",'loco-translate')?>.
        </p>
        <p>
            <a href="<?php $ext->e('link')?>" class="button button-link has-icon icon-add"><?php $ext->e('text')?></a>
            <a href="<?php $skip->e('link')?>" class="button button-link has-icon icon-next"><?php $skip->e('text')?></a>
            <a class="button button-link has-icon icon-help" href="<?php echo esc_url($help)?>" target="_blank"><?php esc_html_e('About templates','loco-translate')?></a>
        </p>
    </div>
