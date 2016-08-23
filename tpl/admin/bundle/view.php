<?php
/**
 * Bundle overview
 */
$this->extend('../layout');

/* @var $p Loco_mvc_ViewParams */
if( $projects ):
foreach( $projects as $p ): ?> 
    <div class="loco-project" id="loco-<?php $p->e('id')?>"><?php
        
        // display package name, and slug if it differs.
        if( $p->name === $p->short ):?> 
        <h2><?php $p->e('name')?></h2><?php
        else:?> 
        <h2><?php $p->e('name')?> <span>(<?php $p->e('short')?>)</span></h2><?php
        endif;
        
        echo $this->render('inc-po-links', array( 'nav' => $p->nav ) );
        echo $this->render('inc-po-table', array( 'pairs' => $p->po, 'domain' => $p->domain ) );
        ?> 
                
    </div><?php
endforeach;
if( $unknown ):?> 
    <div class="loco-project">
        <div class="notice inline notice-info">
            <h2><?php esc_html_e('Additional files found','loco')?></h2>
            <p>
                This bundle is only partially configured, so we don't know what the following files are for.<br />
                Click the <a href="<?php $tabs[1]->e('href')?>">setup</a> tab to complete the bundle configuration.
            </p>
        </div>
        <?php echo $this->render('inc-po-table', array( 'pairs' => $unknown, 'domain' => null ) )?> 
    </div><?php
endif;
   
 

// showing fully incompatible message if the additional files section won't be shown
else://if( ! $unknown ):?> 
<div class="loco-project">
    <div class="notice inline notice-error">
        <h2><?php $params->e('name')?> <span>(unconfigured)</span></h2>
        <p>
            This bundle isn't automatically compatible and requires configuring before you can use all the functions of Loco Translate.<br />
            Click the <a href="<?php $tabs[1]->e('href')?>">setup</a> tab to complete the bundle configuration.
        </p>
    </div>
</div><?php
if( $unknown ):?> 
    <div class="loco-project">
        <?php echo $this->render('inc-po-table', array( 'pairs' => $unknown, 'domain' => null ) )?> 
    </div><?php
endif;
endif;


// show unknown files for restricted editing functionality
