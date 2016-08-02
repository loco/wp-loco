<?php
/**
 * msginit locale selection screen
 */
$nav = array (
    __('Packages','loco-translate') => array( 'href' => LocoAdmin::uri() ),
    __('Settings','loco-translate') => array( 'href' => LocoAdmin::uri( array(), 'settings' ), 'icon' => 'admin-settings' ),
    //
    $title => array( 'icon' => 'welcome-add-page' ),
);  

/* @var $package LocoPackage */
$argpair = $package->get_query();

?>
<div class="wrap loco-admin loco-init"><?php 

    // Main navigation
    Loco::render('admin-nav', compact('nav') )?> 
    
    <h2><?php 
        Loco::h( __('Initialize new translations in %s','loco-translate'), $domain )?> 
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
                    <?php Loco::h( __('Select from common languages','loco-translate') )?> 
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
                &ndash;
                <?php Loco::h( _x('or enter any language code','Form label','loco-translate') )?>:
                <br />
            </label>
            <input type="text" maxlength="6" size="8" pattern="^[a-zA-Z]{2,3}([\-_][a-zA-Z]{2})?$" name="custom-locale" for="f-loco-locale" placeholder="xx_XX" />
            <span class="icon flag"></span>
        </p><?php
        
        // provide location choice if package and global dirs are both writable
        if( $pdir_ok && $gdir_ok ):?> 
        <p>
            <label>
                <input type="radio" name="gforce" value="0"<?php print( $is_global ? '' : ' checked')?><?php print( $pdir_ok ? '' : ' disabled')?> />
                <?php echo sprintf( _x('create in <code>%s</code>','Form label','loco-translate' ), LocoAdmin::trim_path($pdir) )?> 
            </label>
            <br />
            <label>
                <input type="radio" name="gforce" value="1"<?php print( $is_global ? ' checked' : '') ?><?php print( $gdir_ok ? '' : ' disabled')?> />
                <?php Loco::h( _x('create in global languages directory','Form label','loco-translate') )?> 
                <code><?php Loco::h(LocoAdmin::trim_path($gdir))?>/</code>
            </label>
        </p><?php
        endif?> 

        <p class="submit">
            <input type="submit" value="<?php Loco::h( _x('Start translating','Submit button','loco-translate') )?>" class="button button-primary button-large" disabled />
        </p>
    </form>
    
    
</div> 
