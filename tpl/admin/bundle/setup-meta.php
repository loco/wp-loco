<?php
/**
 * Bundle is set up from self-declared metadata
 */
$this->extend('setup');
$this->start('header');
?>

    <div class="notice inline notice-info">
        <h3 class="has-icon icon-info">
            Bundle auto-configured
        </h3>
        <p>
            This bundle's configuration has been automatically detected, but you can customize it if you need.
        </p>
        <p>
            <a class="button button-link has-icon icon-cog" href="<?php $tabs[2]->e('href')?>">Customize</a>
        </p>
    </div>
    