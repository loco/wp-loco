<?php
/**
 * Bundle overview
 */
$this->extend('../layout');


if( $warning ):?> 
<div class="notice inline notice-warning">
    <p>
        <strong class="has-icon">Compatibility warning:</strong><br />
        <span>This bundle may not automatically work with Loco Translate. <span>Click the Setup or Advanced tabs to configure the bundle fully.</span>
    </p>
</div><?php
endif;


/* @var $p Loco_mvc_ViewParams */
foreach( $projects as $p ): ?> 
    <div class="loco-project" id="loco-<?php $p->e('id')?>"><?php
        
        // display package name, and slug if it differs.
        if( $p->name === $p->short ):?> 
        <h2><?php $p->e('name')?></h2><?php
        else:?> 
        <h2><?php $p->e('name')?> <span>(<?php $p->e('short')?>)</span></h2><?php
        endif;
        
        echo $this->render('inc-po-links', array( 'nav' => $p->nav ) );
        echo $this->render('inc-po-table', array( 'pairs' => $p->po ) );
        ?> 
                
    </div><?php
endforeach;