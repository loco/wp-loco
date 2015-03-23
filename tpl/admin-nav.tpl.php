<?php
/**
 * main nav on tabbed admin pages
 */
?>

    <h2 class="nav-tab-wrapper"><?php 
        foreach( $nav as $label => $attrs ):
            $href = $icon = '';
            extract( $attrs );
            if( $icon ){
                $icon = ' dashicons-before dashicons-'.$icon;
            }
            if( $href ):?>     
            <a href="<?php echo Loco::html($href)?>" class="nav-tab<?php echo $icon?>">
                <?php echo Loco::html($label)?> 
            </a><?php 
            else:?> 
            <a href="#" class="nav-tab nav-tab-active<?php echo $icon?>">
                <?php Loco::h($label)?> 
            </a><?php 
            endif;
        endforeach?> 

        <a href="https://localise.biz/about/gettext?<?php Loco::h( Loco::utm_query('nav') )?>" class="nav-tab nav-tab-loco" target="_blank">
            <?php Loco::h(Loco::__('Powered by'))?> 
            <?php Loco::h(Loco::__('Loco, Translation Management'))?> 
        </a>
    </h2>
    
    <!--[if lt IE 9]><?php
    LocoAdmin::warning( __( $ignore = 'Your browser is out of date!').' '.Loco::html( Loco::__('Loco may not work as expected') ) );
    ?><![endif]-->
