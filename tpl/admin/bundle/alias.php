<?php
/**
 * Special case for viewing Hello Dolly plugin
 * TODO implement package aliasing in a generic fashion as part of bundle configuration.
 */
$this->extend('../layout');
?> 
    
    <div class="notice inline notice-info">
        <h3 class="has-icon">
            <?php esc_attr_e('"Hello Dolly" is part of the WordPress core','loco')?> 
        </h3>
        <p>
            <?php esc_html_e("This plugin doesn't have its own translation files, but its metadata can be translated in the core Admin bundle", 'loco')?>.
        </p>
        <p>
            <a href="<?php $params->e('redirect')?>"><?php esc_html_e('Go to WordPress Core','loco')?></a>
        </p>
    </div>
