<?php
/**
 * 
 */
$this->extend('../layout');
?> 
    <div class="notice inline notice-warning">
        <h3 class="has-icon">
            Translations template missing
        </h3><?php
        if( $params->has('pot') ):?> 
        <p>
            This bundle's template file doesn't exist yet. We recommend you create it before adding languages.
        </p><?php
        else:?> 
        <p>
            This bundle doesn't define a POT template file.
        </p><?php
        endif?> 
        <p>
            Loco can sync directly with source code, but this isn't recommended and might be slow.
        </p>
        <p>
            <a href="<?php $ext->e('link')?>" class="button button-link has-icon icon-add"><?php $ext->e('text')?></a>
            <a href="<?php $skip->e('link')?>" class="button button-link has-icon icon-next"><?php $skip->e('text')?></a>
            <a class="button button-link has-icon icon-help" href="https://localise.biz/wordpress/plugin/manual/templates" target="_blank"><?php esc_html_e('About templates','loco')?></a>
        </p>
    </div>
    
