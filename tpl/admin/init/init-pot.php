<?php
/**
 * Intitialize a new POT template file
 */
 
$this->extend('../layout');


    if( ! $writable ):?> 
    <div class="notice inline notice-warning">
        <p>
            <strong class="has-icon"><?php esc_html_e('Location not writable','loco')?>:</strong>
            Ensure the "<?php $dir->e('name')?>" directory exists and is writable by the web server.
        </p>
    </div><?php
    endif; 


    if( ! $total ):?> 
    <div class="notice inline notice-warning">
        <p>
            <strong class="has-icon"><?php esc_html_e('No translatable strings','loco')?>:</strong>
            We can't find any strings for the "<?php echo $params->e('domain')?>" domain.
        </p>
    </div><?php
    endif;?> 


    <div class="notice inline notice-generic">
        <h2><?php $params->e('subhead')?></h2>
        <p>
            <?php $params->e('found')?>
        </p>
        <p>
            A new template file will be created at the following location: 
        </p>
        <p>
            <code class="path"><?php $pot->e('relpath')?></code>
        </p>
        <form action="" method="post" enctype="application/x-www-form-urlencoded" id="loco-potinit"><?php
            
            foreach( $hidden as $name => $value ):?> 
            <input type="hidden" name="<?php echo $name?>" value="<?php $hidden->e($name)?>" /><?php
            endforeach;?> 
        
            <p class="submit">
                <input type="submit" value="<?php esc_html_e('Create template file','loco')?>" class="button button-large button-primary" disabled />
            </p>
        </form>
    </div>