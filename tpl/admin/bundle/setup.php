<?php
/**
 * Bundle setup layout.
 * See setup/*.php for header definitions
 */
$this->extend('../layout');

    echo $header;
    /* @var Loco_mvc_ViewParams $params */


    /* @var Loco_mvc_ViewParams[] $debug */
    if( $params->has('debug') && $debug ):

    foreach( $debug['notices'] as $type => $notes ): if($notes):?> 
    <div class="panel panel-<?php echo $params->escape($type)?>"><?php
        foreach( $notes as $text ):?> 
        <p>
            <strong class="has-icon"> </strong>
            <?php echo $params->escape($text);?>.
        </p><?php
        endforeach?> 
    </div><?php
    endif; endforeach?> 

    <div class="panel">
        <h4><?php esc_html_e('Current configuration as XML','loco-translate')?>:</h4>
        <pre><?php $debug->e('xml')?></pre>
    </div><?php
    endif;

    /* @var string $credit */
    if( $params->has('credit') ):?> 
    <div class="panel">
        <h3 class="has-icon">
            <?php esc_html_e('Author details','loco-translate')?> 
        </h3>
        <p>
            <?php esc_html_e('If you have trouble translating this bundle, consider asking the author for help','loco-translate')?>.
        </p>
        <p>
            <?php echo $credit?> 
        </p>
    </div><?php
    endif;
