<?php
/**
 * Bundle is set up internally
 */
$this->extend('../../layout');
?> 

    <div class="notice inline notice-success">
        <h3 class="has-icon">
            Bundle auto-configured
        </h3>
        <p>
            This bundle's configuration is built into Loco, but you can customize it if you need.
        </p>
        <p class="submit">
            <a href="<?php $tabs[2]->e('href')?>" class="button button-link has-icon icon-wrench"><?php esc_html_e('Advanced configuration','loco')?></a>
        </p>
    </div>
    