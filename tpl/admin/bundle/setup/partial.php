<?php
/**
 * Bundle is set up from self-declared metadata, but has some missing bits
 */
$this->extend('../setup');
$this->start('header');
?> 

    <div class="notice inline notice-warning">
        <h3 class="has-icon icon-info">
            Partially configured bundle
        </h3>
        <p>
            This bundle's configuration has been automatically detected, but isn't fully complete.
        </p>
        <?php echo $this->render('inc-nav')?> 
    </div>
    