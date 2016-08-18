<?php
/**
 * Incompatible bundle overview
 */
$this->extend('../layout');
?> 

<div class="notice inline notice-error">
    <p>
        <strong class="has-icon"><?php esc_html_e('Incompatible bundle','loco')?></strong><br />
        <span>This bundle isn't fully configured for translation.</span>
        <span>Enter "<a href="<?php $tabs[1]->e('href')?>">Setup</a>" for more information.</span>
    </p>
</div>


<div class="loco-project">
    <h2><?php $params->e('name')?> <span>(unconfigured)</span></h2>
    <?php echo $this->render('inc-po-table', array( 'pairs' => null ) )?> 
</div>
