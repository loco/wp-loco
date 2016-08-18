<?php
/**
 * Bundle is set up internally
 */
$this->extend('../setup');
$this->start('header');
?> 

    <div class="notice inline notice-info">
        <h3 class="has-icon icon-info">
            Bundle auto-configured
        </h3>
        <p>
            This bundle's configuration is built into Loco, but you can customize it if you need.
        </p>
        <?php echo $this->render('inc-nav')?> 
    </div>
    