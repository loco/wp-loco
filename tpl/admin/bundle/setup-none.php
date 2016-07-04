<?php
/**
 * Bundle setup prompt
 */
$this->extend('setup');
$this->start('header');
?> 

    <div class="notice inline notice-warning">
        <h3 class="has-icon">
            Configuration required
        </h3>
        <p>
            To make this bundle fully compatible with Loco, we need to save some settings to make sense of it.
        </p>
    </div>
    
    <form action="" method="post" enctype="application/x-www-form-urlencoded" class="notice inline notice-generic">
        <h3>
            Automatic setup
        </h3>
        <p>
            We can make some guesses about how this bundle is set up, but we can't guarantee they'll be right.
        </p>
        <p>
            <input type="submit" class="button button-primary" name="auto-setup" value="Try auto-configure" />
        </p>
        <?php $auto->_e()?> 
    </form>
