<?php
/**
 * Base layout for all admin pages 
 */
?><div class="wrap" id="loco"><?php 

    if( $this->has('breadcrumb') ):?> 
    <h1>
        <ul><?php
            /* @var $item Loco_pages_ViewParams */
            foreach( $breadcrumb as $item ):?> 
            <li><?php
                if( $item->href ):?> 
                <a href="<?php $item->e('href')?>">
                    <?php $item->e('name')?> 
                </a><?php
                else:?> 
                <span>
                    <?php $item->e('name')?> 
                </span><?php
                endif?> 
            </li><?php
            endforeach?> 
        </ul>
    </h1><?php
    elseif( $this->has('title') ):?> 
    <h1>
        <?php $params->e('title')?> 
    </h1><?php
    endif;

    
    if( $this->has('tabs') ):?> 
    <h2 class="nav-tab-wrapper"><?php
        /* @var $back Loco_pages_ViewParams *
        if( $back && $back->href ):?> 
        <a href="<?php $back->e('href')?>" class="nav-tab" title="<?php $back->e('name')?>" rel="up">
            <span class="icon icon-back"></span>
        </a><?php
        endif;*/
        /* @var $item Loco_pages_ViewParams */
        foreach( $tabs as $item ):?> 
        <a href="<?php $item->e('href')?>" class="nav-tab<?php echo $item->active?' nav-tab-active':''?>">
            <?php $item->e('name')?> 
        </a><?php
        endforeach;?> 
    </h2><?php
    endif?> 


    <div id="loco-notices"><?php 
        // flush message buffer
        do_action('loco_admin_notices');
        // standard file system dialogues
        if( $params->has('fsFields') ):
            echo $this->render('common/inc-fsconn');
        endif;?> 
    </div>


    <div id="loco-content">
    <?php echo $this->_content;?> 
    </div>

</div>


<?php if( $this->has('js') ):?> 
<script>
/*<![CDATA[*/
var locoConf = <?php echo $js->exportJson()?>;
/*]]>*/
</script><?php
endif;
