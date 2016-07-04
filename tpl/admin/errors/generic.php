<?php
/*
 * Generic admin page error template
 * @var $error Loco_error_Exception
 */

$this->extend('../layout'); 
 
?> 

    <h1>
        <?php echo esc_html( $error->getTitle() )?> 
    </h1>

    <div class="notice inline notice-error">
        <h3 class="has-icon">
            <?php echo esc_html( $error->getMessage() )?> 
        </h3>
    </div>