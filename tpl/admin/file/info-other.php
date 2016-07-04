<?php
/**
 * File info for a file type we know nothing about
 */
$this->extend('info');
$this->start('header');
?> 

    <div class="notice inline notice-error">
        <h3 class="has-icon">
            Unexpected file type 
        </h3>
        <p>
            <?php $params->e('error')?> 
        </p>
    </div>

