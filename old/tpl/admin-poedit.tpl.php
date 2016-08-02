<?php
/**
 * PO file editor screen
 */
$nav = array (
    __('Packages','loco-translate') => array( 'href' => LocoAdmin::uri() ),
    __('Settings','loco-translate') => array( 'href' => LocoAdmin::uri( array(), 'settings' ), 'icon' => 'admin-settings' ),
    //
    $name => array( 'icon' => 'POT' === $type ? 'edit' : 'translation' ),
);  

$phpbase = Loco::html( Loco::baseurl() ).'/php';
$argpair = $package->get_query();

// whether to show file switcher
$pofiles = $package->get_gettext_files();
$modified or $pofiles[] = $path;

?> 
<div class="wrap loco-admin loco-edit"><?php 

    // Main navigation
    Loco::render('admin-nav', compact('nav') )?> 
    
    <h3 class="title"><?php 

        // print flag or template indicator
        if( $locale ):?> 
        <span class="<?php echo $locale->icon_class()?>"></span> <?php 
        Loco::h( $locale->get_name() )?>:<?php
        else:
        Loco::h( __('Template file','loco-translate') )?>: <?php
        endif;
        
        // print switcher if more than one file available
        if( 1 < count($pofiles) ):?> 
        <form action="#" class="loco-switcher">
            <select onchange="void function(u){ u && location.assign(u) }( this.options[this.options.selectedIndex].value);">
                <option value="">
                    <?php Loco::h(_x('Switch to...','Dropdown label','loco-translate'))?> 
                </option><?php
                // drop down of files in package
                $poname = str_replace( '.mo', '.po', basename( $path ) );
                foreach( $pofiles as $_path ):
                    $label = str_replace( '.mo', '.po', basename($_path) );
                    $url = LocoAdmin::edit_uri( $package, $_path );
                ?> 
                <option value="<?php Loco::h($url)?>" <?php $poname === $label and print('selected')?>>
                    <?php Loco::h($label)?> 
                </option><?php
                endforeach?> 
            </select>
        </form><?php
        endif?> 
        
        <span class="loco-meta">
            <?php Loco::h( _x('Updated','Modified time','loco-translate') )?>:
            <span id="loco-po-modified">
            <?php if( $modified ):?> 
                 <?php Loco::h($modified)?>
            <?php else:?> 
                <em><?php Loco::h( __('never','loco-translate') )?></em>
            <?php endif?> 
            </span>
            &mdash;
            <span id="loco-po-status">
                <!-- js will load status -->
            </span>
        </span>
    </h3>
    
    
    <?php foreach( $warnings as $text ): LocoAdmin::warning($text); endforeach?> 
    
    
    <div id="loco-poedit">
        
        <nav id="loco-nav" class="wp-core-ui">
            <form action="<?php echo $phpbase?>/loco-fail.php" method="post" id="loco-poedit-save">
                <input type="hidden" name="po" value="" />
                <input type="hidden" name="path" value="<?php Loco::h($path)?>" />
                <input type="hidden" name="action" value="loco-posave" /><?php
                foreach( $argpair as $k => $v ):?> 
                <input type="hidden" name="<?php Loco::h($k)?>" value="<?php Loco::h($v)?>" /><?php
                endforeach?> 
                <button class="button loco-save" data-loco="save" type="submit" disabled>
                    <span><?php Loco::h( _x('Save','Editor button','loco-translate') )?></span>
                </button>
            </form>
            <form action="<?php echo $phpbase?>/loco-fail.php" method="post">
                <input type="hidden" name="po" value="" />
                <input type="hidden" name="action" value="loco-download" />
                <input type="hidden" name="path" value="<?php Loco::h($path)?>" />
                <button class="button loco-download" data-loco="download_po" type="submit" disabled title="<?php Loco::h( _x('Download','Editor button','loco-translate') )?> PO">
                    <span><?php echo $locale ? 'PO' : 'POT' ?></span>
                </button>
            </form><?php
            if( $locale ):?> 
            <form action="<?php echo $phpbase?>/loco-fail.php" method="post">
                <input type="hidden" name="po" value="" />
                <input type="hidden" name="action" value="loco-download" />
                <input type="hidden" name="path" value="<?php Loco::h( preg_replace('/\.po$/','.mo',$path) )?>" />
                <button class="button loco-download" data-loco="download_mo" type="submit" disabled title="<?php Loco::h( _x('Download','Editor button','loco-translate') )?> MO">
                    <span>MO</span>
                </button>
            </form><?php 
            endif?> 
            <form action="<?php echo $phpbase?>/loco-fail.php" method="post">
                <input type="hidden" name="path" value="<?php Loco::h($path)?>" />
                <input type="hidden" name="action" value="loco-posync" /><?php
                foreach( $argpair as $k => $v ):?> 
                <input type="hidden" name="<?php Loco::h($k)?>" value="<?php Loco::h($v)?>" /><?php
                endforeach?> 
                <button class="button loco-sync" data-loco="sync" disabled>
                    <span><?php Loco::h( _x('Sync','Editor button','loco-translate') )?></span>
                </button>
            </form>
            <form action="<?php echo $phpbase?>/loco-fail.php" method="get">
                <button class="button loco-revert" data-loco="revert" disabled>
                    <span><?php Loco::h( _x('Revert','Editor button','loco-translate') )?></span>
                </button>
            </form>
            <form action="<?php echo $phpbase?>/loco-fail.php">
                <button class="button loco-add" data-loco="add" disabled>
                    <span><?php Loco::h( _x('Add','Editor button','loco-translate') )?></span>
                </button>
            </form>
            <form action="<?php echo $phpbase?>/loco-fail.php">
                <button class="button loco-del" data-loco="del" disabled>
                    <span><?php Loco::h( _x('Del','Editor button','loco-translate') )?></span>
                </button>
            </form>
            <form action="<?php echo $phpbase?>/loco-fail.php">
                <button class="button loco-fuzzy" data-loco="fuzzy" disabled>
                    <span><?php Loco::h( _x('Fuzzy','Editor button','loco-translate') )?></span>
                </button>
            </form>
            <form action="<?php echo $phpbase?>/loco-fail.php" id="loco-filter">
                <div class="loco-clearable">
                    <input type="text" maxlength="100" name="q" id="loco-search" placeholder="<?php Loco::h(__('Filter translations','loco-translate'))?>" autocomplete="off" disabled />
                </div>
            </form>
            <form action="https://localise.biz/help/wordpress/translate-plugin/support" target="_blank" class="loco-right">
                <button class="button loco-help" data-loco="help" type="submit">
                    <span><?php Loco::h( _x('Help','Editor button','loco-translate') )?></span>
                </button>
            </form>
        </nav>
    
        <div id="loco-poedit-inner" class="loco-editor loading">
            <span>Loading..</span>
        </div>
    
    </div>
    
    
    <script>
        loco = window.loco || {};
        loco.conf = <?php echo json_encode( compact('po','pot','headers') + array(
            'locale' => $locale ? $locale->export() : null,
        ) )?>;
    </script>
    
</div>