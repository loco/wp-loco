<?php
/*
 * Modal for when no APIs are configured.
 */

/* @var Loco_mvc_ViewParams $help */
/* @var Loco_mvc_ViewParams $prof */

?><div id="loco-auto" class="loco-alert" title="<?php esc_html_e('No translation APIs configured','loco-translate');?>">
    <p>
        <?php esc_html_e('Add automatic translation services in the plugin settings.','loco-translate')?> 
    </p>
    <nav>
        <a href="<?php $this->route('config-apis')->e('href')?>" class="button button-link has-icon icon-cog"><?php
            esc_html_e('Settings','loco-translate');
        ?></a>
        <a href="<?php $help->e('href')?>" class="button button-link has-icon icon-help" target="_blank"><?php
            $help->e('text');
        ?></a>
        <a href="<?php $prof->e('href')?>" class="button button-link has-icon icon-group" target="_blank"><?php
            $prof->e('text');
       ?></a>
    </nav>
</div>