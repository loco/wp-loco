<?php
/**
 * File info for a template file (POT)
 */
$this->extend('info');
$this->start('header');
?> 

    <div class="notice inline notice-info">
        <h3><?php esc_html_e('Template file','loco')?></h3>
        <dl>
            <dt>File modified:</dt>
            <dd><?php $file->date('mtime')?></dd>

            <dt>Last extracted:</dt>
            <dd><date><?php $params->date('potime')?></date></dd>
            
            <dt>Source text:</dt>
            <dd><?php echo esc_html( $meta->getTotalSummary() )?></dd>
        </dl>
   </div>
    
    <?php 
    if( 'POT' !== $file->type && ! $params->isTemplate ):?> 
    <div class="notice inline notice-warning">
        <h3 class="has-icon">
            Weird file name
        </h3>
        <p>
            <?php printf("%s files should have a language code at the end of their names.",$file->type)?>
        </p>
        <p>
            The author may intend this file to be used as a template, but templates should have the extension <strong>.pot</strong>
        </p>
    </div><?php
    endif; 