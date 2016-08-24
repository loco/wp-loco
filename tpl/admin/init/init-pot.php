<?php
/**
 * Intitialize a new POT template file
 */
 
$this->extend('../layout');
?> 

    <div class="notice inline notice-generic">
        <h2><?php $params->e('subhead')?></h2>
        <p>
            <?php esc_html_e('Source files to scan:','loco')?> 
            <strong><?php $scan->n('count')?></strong>
            <span>(<?php $scan->e('size')?> on disk)</span><?php
            if( $n = $scan->skip ):?> 
            <em><?php echo esc_html( sprintf( _n('Excludes one file over %2$s','Excludes %s files over %s',$n,'loco'), $n, $scan->large ) );?>.</em><?php
            endif?> 
        </p>
        <p>
            <?php esc_html_e('Strings will be extracted to:','loco')?> 
            <code class="path"><?php $pot->e('relpath')?></code>
        </p>
        <form action="" method="post" enctype="application/x-www-form-urlencoded" id="loco-potinit"><?php
            
            foreach( $hidden as $name => $value ):?> 
            <input type="hidden" name="<?php echo $name?>" value="<?php $hidden->e($name)?>" /><?php
            endforeach;?> 
        
            <p class="submit">
                <button type="submit" class="button button-large button-primary" disabled><?php esc_html_e('Create template','loco')?></button>
            </p>

        </form>
    </div>
