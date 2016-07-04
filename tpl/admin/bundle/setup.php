<?php
/**
 * Bundle setup prompt
 */
$this->extend('../layout');
echo $header;
?> 
    
  
    <form action="" method="post" enctype="application/x-www-form-urlencoded" class="notice inline notice-generic">
        <h3>
            Paste XML
        </h3>
        <p>
            If you've been given a configuration on the support forum, paste it here. 
        </p>
        <fieldset>
            <textarea name="xml-content" class="large-text" rows="3" wrap="virtual"></textarea>
        </fieldset>
        <p>
            <input type="submit" class="button button-primary" name="paste-setup" value="Load XML config" />
        </p>
        <?php $paste->_e()?> 
    </form>



    <div class="notice inline notice-generic">
        <h3>
            Ask the author
        </h3>
        <p>
            If you have trouble getting this bundle to work, try asking the author to make it compatible with Loco.
            <a href="https://localise.biz/help/wordpress/translate-plugin/authors" target="_blank" class="has-icon icon-help"><span>Help for authors</span></a>
        </p>
        <p>
            <?php echo $credit;?> 
        </p>
    </div>