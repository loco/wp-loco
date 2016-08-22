<?php
/**
 * main nav on tabbed admin pages
 */
?> 

    <div class="notice inline notice-info">
        <p>
            <strong>Legacy mode:</strong>
            You're running the old version of Loco Translate.
            <a href="<?php echo esc_url(LocoAdmin::uri(array(),'upgrade'))?>">Start using the all new version 2.</a>
        </p>
    </div>

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
            <?php Loco::h(__('Powered by','loco-translate'))?> 
            <?php Loco::h(__('Loco, Translation Management','loco-translate'))?> 
        </a>
    </h2>
    
    <!--[if lt IE 9]><?php
    LocoAdmin::warning( __( $ignore = 'Your browser is out of date!').' '.Loco::html( __('Loco may not work as expected','loco-translate') ) );
    ?><![endif]-->
