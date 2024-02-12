<?php
/**
 * Initialize a new POT template file
 */
$this->extend('../layout');
$help = apply_filters('loco_external','https://localise.biz/wordpress/plugin/manual/templates');
?> 

    <div class="panel">
        <h2><?php $params->e('subhead')?></h2>
        <p>
            <?php esc_html_e('Source files to scan:','loco-translate')?> 
            <strong><?php $scan->n('count')?></strong>
            <span>(<?php 
            // Translators: Where %s is the size of a file
            $scan->f( 'size', __('%s on disk','loco-translate') );?>, <?php
            // Translators: Where %s is the size of a file
            $scan->f( 'largest', __('largest is %s','loco-translate') )?>)</span>
        </p><?php
        if( $n = $scan->skip ):?> 
        <p>
            <em><?php 
            // Translators: (1) Number of files excluded (2) the maximum size of file that was included
            self::e( _n('Excludes %1$s file over %2$s','Excludes %1$s files over %2$s',$n,'loco-translate'), $n, $scan->large )?>.
            <a class="icon icon-help" href="<?php echo esc_url(apply_filters('loco_external','https://localise.biz/wordpress/plugin/faqs/skipped-files'))?>" target="_blank"><span class="screen-reader-text">Help</span></a>
            </em>
        </p><?php
        endif?> 
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
                <a href="<?php echo esc_url($help)?>" class="button button-large button-link" target="_blank"><?php 
                    esc_html_e('About templates','loco-translate')?></a>
            </p>

        </form>
    </div>
