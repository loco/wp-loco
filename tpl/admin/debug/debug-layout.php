<?php

/* @var Loco_mvc_View $this */
$this->extend('../layout');
?> 
    <style>
        code.po {
            font-weight: bold;
        }
        #loco-log textarea {
            width: 100%;
            font-size: 12px;
        }
    </style>
<?php

/* @var Loco_mvc_View $params */
/* @var string $header */
$params->has('header') and print $header;


/* @var ArrayIterator|null $log */
if( $params->has('log') ):?> 
    <div class="panel" id="loco-log">
        <h3>
            Trace log:
        </h3>
        <p>
            If you're asking for help on the WordPress forum, please post the full text below.
        </p>
        <form action="#">
            <textarea spellcheck="false" class="code" name="l" rows="<?=$log->count()?>"><?php echo $params->escape( implode("\n",iterator_to_array($log) ) );?></textarea>
        </form>
    </div><?php
endif;


/* @var string $form */
echo $form;
