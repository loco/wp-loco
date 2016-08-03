<?php
/**
 * Intitialize a new POT template file
 */
 
$this->extend('../layout');

    if( ! $scan->bytes ):?> 
    <div class="notice inline notice-info">
        <p>
            <strong class="has-icon"><?php esc_html_e('No sources','loco')?>:</strong>
            We can't find any source files from which to extract strings.
        </p>
    </div><?php
    endif;?> 


    <div class="notice inline notice-generic">
        <h2><?php $params->e('subhead')?></h2>
        <p>
            <?php esc_html_e('Source files found:','loco')?> 
            <code class="path"><?php $scan->n('count')?></code>
        </p>
        <p>
            <?php esc_html_e('Data size to be scanned:','loco')?> 
            <code class="path"><?php $scan->e('size')?></code>
        </p>
        <p>
            <?php esc_html_e('Template file will be created at:','loco')?> 
            <code class="path"><?php $pot->e('relpath')?></code>
        </p>
        <form action="" method="post" enctype="application/x-www-form-urlencoded" id="loco-potinit"><?php
            
            foreach( $hidden as $name => $value ):?> 
            <input type="hidden" name="<?php echo $name?>" value="<?php $hidden->e($name)?>" /><?php
            endforeach;?> 
        
            <p class="submit">
                <input type="submit" value="<?php esc_html_e('Create template','loco')?>" class="button button-large button-primary" disabled />
                <span id="loco-fs-hook" class="jshide">
                    <button type="button" class="button"><?php esc_html_e('Authorize','loco')?></button>
                </span>
            </p>
        </form>
    </div>