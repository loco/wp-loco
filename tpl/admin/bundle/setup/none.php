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
            If the following options don't work, try asking the author to make their bundle translatable with Loco.
            <a href="https://localise.biz/help/wordpress/translate-plugin/authors" target="_blank" class="has-icon icon-help"><span>Help for authors</span></a>
        </p>
        <p>
            <?php echo $credit;?> 
        </p>
    </div>