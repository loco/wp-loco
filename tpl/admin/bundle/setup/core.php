<?php
/**
 * Bundle is set up internally
 */
$this->extend('../../layout');

?>

    <div class="notice inline notice-info">
        <h3 class="has-icon icon-info">
            Bundle auto-configured
        </h3>
        <p>
            This bundle's configuration is built into Loco, but you can customize it if you need.
        </p>
        <p class="submit">
            <a class="button button-link has-icon icon-cog" href="<?php $tabs[2]->e('href')?>">Customize</a>
        </p>
    </div>
    