<?php
/**
 * Intitialize a new POT template file
 */
 
$this->extend('../layout');
?> 

    <div class="notice inline notice-generic">
        <h2><?php $params->e('subhead')?></h2>
        <p>
            <?php esc_html_e('Source files to scan:','loco-translate')?> 
            <strong><?php $scan->n('count')?></strong>
            <span>(<?php 
            // Translators: Where %s is the size of a file
            $scan->f( 'size', __('%s on disk','loco-translate') )?>)</span><?php
            // Translators: Where %2$s is the size of a file
            if( $n = $scan->skip ):?> 
            <em><?php self::e( _n('Excludes one file over %2$s','Excludes %s files over %2$s',$n,'loco-translate'), $n, $scan->large )?>.</em><?php
            endif?> 
        </p>
        <p>
            <?php esc_html_e('Strings will be extracted to:','loco-translate')?> 
            <code class="path"><?php $pot->e('relpath')?></code>
        </p>
        <form action="" method="post" enctype="application/x-www-form-urlencoded" id="loco-potinit"><?php
            
            foreach( $hidden as $name => $value ):?> 
            <input type="hidden" name="<?php echo $name?>" value="<?php $hidden->e($name)?>" /><?php
            endforeach;?> 
        
            <p class="submit">
                <button type="submit" class="button button-large button-primary" disabled><?php esc_html_e('Create template','loco-translate')?></button>
            </p>

        </form>
    </div>
