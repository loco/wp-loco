<?php
/**
 * Bundle overview when completely incompatible.
 */
$this->extend('../layout');
?> 

<div class="notice inline notice-error">
        <h3 class="has-icon">
            Incompatible bundle
        </h3>
        <p>
            This bundle doesn't work automatically with Loco, because it's not set up for translation in a standard way.
        </p>
        <p>
            <a href="<?php $tabs[1]->e('href')?>" class="button button-link has-icon icon-next">Continue to bundle setup</a>
        </p>
        <p>
            <a href="<?php $tabs[2]->e('href')?>" class="button button-link has-icon icon-wrench">Advanced configuration</a>
        </p>
    </p>
</div>