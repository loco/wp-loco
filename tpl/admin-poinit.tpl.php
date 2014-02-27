<?php
/**
 * msginit locale selection screen
 */
$nav = array (
    Loco::__('Packages') => LocoAdmin::uri(),
    $title => '',
    Loco::__('Settings') => str_replace( 'tools', 'options-general', LocoAdmin::uri() ),
);  

/* @var $package LocoPackage */
$argpair = $package->get_query();

?>
<div class="wrap loco-admin loco-init"><?php 

    // Main navigation
    Loco::render('admin-nav', compact('nav') )?> 
    
    <h2><?php 
        Loco::h( Loco::__('Initialize new translations in %s'), $domain )?> 
    </h2>
    
    
    <form action="" method="get" class="wp-core-ui" id="loco-msginit">
        <input type="hidden" name="page" value="<?php Loco::h( Loco::NS )?>" />
        <input type="hidden" name="msginit" value="<?php Loco::h( $domain )?>" /><?php
        foreach( $argpair as $k => $v ):?> 
        <input type="hidden" name="<?php Loco::h($k)?>" value="<?php Loco::h($v)?>" /><?php
        endforeach?> 
        <p>
            <select name="common-locale">
                <option value="">
                    <?php Loco::h( Loco::__('Select from common languages') )?> 
                </option><?php
                foreach( $locales as $code => $name ):?> 
                <option value="<?php echo $code?>">
                    <?php Loco::h( $name ) ?> 
                </option><?php 
                endforeach?> 
            </select>
        </p>
        <p>
            <label for="f-loco-locale">
                <?php Loco::h( Loco::_x('or enter any language code','Form label') )?>:
                <br />
            </label>
            <input type="text" maxlength="5" size="5" pattern="^[a-zA-Z]{2}([\-_][a-zA-Z]{2})?$" name="custom-locale" for="f-loco-locale" placeholder="xx_XX" />
        </p>
        <p class="submit">
            <input type="submit" value="<?php Loco::h( Loco::_x('Start translating','Submit button') )?>" class="button button-primary button-large" />
        </p>
    </form>
    
    
</div> 
