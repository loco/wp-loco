<?php
/**
 * Bundle is not set up at all
 */
$this->extend('../setup');
$this->start('header');
?> 

    <div class="notice inline notice-info">
        <h3 class="has-">
            Set up this bundle for translation
        </h3>
        <p>
            If the following options don't work, try asking the author to make their bundle compatible with Loco Translate.
        </p>
        <p>
            <?php echo $credit;?> 
        </p>
    </div>