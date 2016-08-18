<?php
/**
 * Bundle is set up fully from self-declared metadata
 */
$this->extend('../setup');
$this->start('header');
?> 

    <div class="notice inline notice-success">
        <h3 class="has-icon">
            Bundle auto-configured
        </h3>
        <p>
            This bundle's configuration has been automatically detected and seems to be fully compatible.
            You can make changes in the Advanced tab if you need to override it.
        </p>
        <?php echo $this->render('inc-nav')?> 
    </div>
    