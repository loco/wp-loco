<?php
/*
 * Debug snippet: dumps current argument scope 
 * Use from controller by returning $this->view('debug/dump',..)
 */

?><dl class="debug"><?php
/* @var Traversable $params */
foreach( $params as $prop => $value ): if( '_' !== substr($prop,0,1) ):?> 
    <dt><?php echo esc_html($prop)?></dt>
    <dd><?php echo esc_html( json_encode($value,JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) )?></dd><?php
endif; endforeach?> 
</dl>
