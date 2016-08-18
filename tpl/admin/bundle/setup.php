<?php
/**
 * Bundle setup layout.
 * See setup/*.php for header definitions
 */
$this->extend('../layout');
echo $header;

?> 
    <div class="notice inline notice-generic">
        <h3 class="has-icon">
            Author details
        </h3>
        <p>
            If you have trouble translating this bundle, consider asking the author for help.
        </p>
        <p>
            <?php echo $credit?> 
        </p>
    </div>
