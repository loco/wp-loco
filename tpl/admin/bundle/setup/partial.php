<?php
/**
 * Bundle is set up from self-declared metadata, but has some missing bits
 */
$this->extend('../setup');
$this->start('header');
?> 

    <div class="notice inline notice-warning">
        <h3 class="has-icon icon-info">
            Bundle partially configured
        </h3>
        <p>
            This bundle's configuration has been automatically detected, but isn't fully complete.
        </p>
        <p>
            If you run into problems, try asking the author to make their bundle fully compatible with Loco.
            <a href="https://localise.biz/wordpress/plugin/authors" target="_blank" class="has-icon icon-help"><span>Help for authors</span></a>
        </p>
        <p>
            <?php echo $credit;?> 
        </p>
    </div>
    