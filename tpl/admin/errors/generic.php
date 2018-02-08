<?php
/*
 * Generic admin page error template
 * @var $error Loco_error_Exception
 */

$this->extend('../layout'); 
?> 

    <h1><?php echo esc_html( $error->getTitle() )?></h1>

    <div class="notice inline notice-error">
        <h3 class="has-icon">
            <?php self::e( $error->getMessage() )?> 
        </h3><?php
        if( $params->has('file') && $file->line ):?> 
        <p>
            <code class="path"><?php $file->e('relpath')?>#<?php $file->e('line')?></code>
        </p><?php
        endif?> 
    </div>
