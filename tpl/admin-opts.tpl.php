<?php
/**
 * Admin options screen - changes loco plugin settings
 */
$nav = array (
    Loco::__('Packages') => LocoAdmin::uri(),
    Loco::__('Settings') => '',
); 
?>

<div class="wrap loco-admin loco-settings">
    
    <?php Loco::render('admin-nav', compact('nav') )?> 
    
    <div>&nbsp;</div>
    <div class="icon32 icon-settings"><br /></div>
    <h2>
        <?php Loco::h( Loco::__('Configure Loco Translate') )?> 
    </h2>
    
    <?php isset($success) and LocoAdmin::success( $success )?> 

    <form action="" method="post">
        <table class="form-table">
            <tbody>
                <tr valign="top">
                    <th scope="row"><?php Loco::h( Loco::__('Compiling MO files') )?></th>
                    <td>
                        <fieldset>
                            <legend class="screen-reader-text">
                                <span><?php Loco::h( Loco::__('Compiling MO files') )?></span>
                            </legend>
                            <p>
                                <label for="loco--use-msgfmt-0">
                                    <input type="radio" name="loco[use_msgfmt]" value="0" id="loco--use-msgfmt-0"<?php echo $use_msgfmt ? '' : ' checked';?> />
                                    <?php Loco::h( Loco::__('Use built-in MO compiler.') )?>
                                </label>
                            </p>
                            <p>
                                <label for="loco--use-msgfmt-1">
                                    <input type="radio" name="loco[use_msgfmt]" value="1" id="loco--use-msgfmt-1"<?php echo $use_msgfmt ? ' checked' : '';?> />
                                    <?php Loco::h( Loco::__('Use external command:') )?> 
                                </label>
                                <ul>
                                    <li>
                                        <input type="text" size="32" name="loco[which_msgfmt]" id="loco--which_msgfmt" value="<?php Loco::h($which_msgfmt)?>"
                                        placeholder="<?php Loco::h( Loco::__('Enter path to msgfmt on server') ) ?>" />
                                    </li>
                                </ul>
                            </p>
                            <p>
                                <label for="loco--gen-hash">
                                    <input type="checkbox" name="loco[gen_hash]" value="1" id="loco--gen-hash"<?php echo $gen_hash ? ' checked' : '';?> />
                                    <?php Loco::h( Loco::__('Generate hash tables') )?> 
                                </label>
                            </p>
                        </fieldset>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><?php Loco::h( Loco::__('Backing up PO files') )?></th>
                    <td>
                        <fieldset>
                            <legend class="screen-reader-text">
                                <span><?php Loco::h( Loco::__('Backing up PO files') )?></span>
                            </legend>
                            <p>
                                <label for="loco--num-backups">
                                    <?php Loco::h( Loco::__('Number of backups to keep of each file:') )?> 
                                </label>
                                <input type="number" min="0" max="99" size="2" name="loco[num_backups]" id="loco--num_backups" value="<?php printf('%u',$num_backups)?>" />
                            </p>
                        </fieldset>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><?php Loco::h( Loco::__('Experimental features') )?></th>
                    <td>
                        <fieldset>
                            <legend class="screen-reader-text">
                                <span><?php Loco::h( Loco::__('Experimental features') )?></span>
                            </legend>
                            <p>
                                <label for="loco--enable-core">
                                    <input type="checkbox" name="loco[enable_core]" value="1" id="loco--enable-core"<?php echo $enable_core ? ' checked' : '';?> />
                                    <?php Loco::h( Loco::__('Enable Wordpress core translations') )?> 
                                </label>
                            </p>
                        </fieldset>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="submit">
            <input type="submit" class="button-primary" value="<?php Loco::h( Loco::__('Save settings') )?>" />
            <a class="button" href="http://wordpress.org/support/plugin/<?php echo Loco::NS?>" target="_blank"><?php Loco::h( Loco::__('Get help') )?></a>
        </p>
    </form>
    
</div>