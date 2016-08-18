<?php
/**
 * Bundle is configured by official author
 */
$this->extend('../setup');
$this->start('header');
?> 

    <div class="notice inline notice-success">
        <h3 class="has-icon">
            Official configuration
        </h3>
        <p>
            This bundle's configuration is provided by the author.
            You can make changes in the Advanced tab if you need to override it.
        </p>
        <?php echo $this->render('inc-nav')?> 
    </div>
