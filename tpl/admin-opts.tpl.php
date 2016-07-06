<?php
/**
 * Admin options screen - changes loco plugin settings
 */
$nav = array (
    __('Packages','loco-translate') => array( 'href' => LocoAdmin::uri() ),
    __('Settings','loco-translate') => array( 'icon' => 'admin-settings' ),
); 
?>

<div class="wrap loco-admin loco-settings">
    
    <?php Loco::render('admin-nav', compact('nav') )?> 
    
    <div>&nbsp;</div>
    <div class="icon32 icon-settings"><br /></div>
    <h2>
        <?php Loco::h( __('Configure Loco Translate','loco-translate') )?> 
    </h2>
    
    <?php isset($success) and LocoAdmin::success( $success )?> 

    <form action="" method="post">
        <table class="form-table">
            <tbody>
                <tr valign="top">
                    <th scope="row"><?php Loco::h( __('Compiling MO files','loco-translate') )?></th>
                    <td>
                        <fieldset>
                            <legend class="screen-reader-text">
                                <span><?php Loco::h( __('Compiling MO files','loco-translate') )?></span>
                            </legend>
                            <p>
                                <label for="loco--use-msgfmt-0">
                                    <input type="radio" name="loco[use_msgfmt]" value="0" id="loco--use-msgfmt-0"<?php echo $use_msgfmt ? '' : ' checked';?> />
                                    <?php Loco::h( __('Use built-in MO compiler.','loco-translate') )?>
                                </label>
                            </p>
                            <p>
                                <label for="loco--use-msgfmt-1">
                                    <input type="radio" name="loco[use_msgfmt]" value="1" id="loco--use-msgfmt-1"<?php echo $use_msgfmt ? ' checked' : '';?> />
                                    <?php Loco::h( __('Use external command:','loco-translate') )?> 
                                </label>
                                <ul>
                                    <li>
                                        <input type="text" size="32" name="loco[which_msgfmt]" id="loco--which_msgfmt" value="<?php Loco::h($which_msgfmt)?>"
                                        placeholder="<?php Loco::h( __('Enter path to msgfmt on server','loco-translate') ) ?>" />
                                    </li>
                                </ul>
                            </p>
                            <p>
                                <label for="loco--gen-hash">
                                    <input type="checkbox" name="loco[gen_hash]" value="1" id="loco--gen-hash"<?php echo $gen_hash ? ' checked' : '';?> />
                                    <?php Loco::h( __('Generate hash tables','loco-translate') )?> 
                                </label>
                            </p>
                            <p>
                                <label for="loco--use-fuzzy">
                                    <input type="checkbox" name="loco[use_fuzzy]" value="1" id="loco--use-fuzzy"<?php echo $use_fuzzy ? ' checked' : '';?> />
                                    <?php Loco::h( __('Include Fuzzy strings','loco-translate') )?> 
                                </label>
                            </p>
                        </fieldset>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><?php Loco::h( __('Backing up PO files','loco-translate') )?></th>
                    <td>
                        <fieldset>
                            <legend class="screen-reader-text">
                                <span><?php Loco::h( __('Backing up PO files','loco-translate') )?></span>
                            </legend>
                            <p>
                                <label for="loco--num-backups">
                                    <?php Loco::h( __('Number of backups to keep of each file:','loco-translate') )?> 
                                </label>
                                <input type="number" min="0" max="99" size="2" name="loco[num_backups]" id="loco--num_backups" value="<?php printf('%u',$num_backups)?>" />
                            </p>
                        </fieldset>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row"><?php Loco::h( __('Experimental features','loco-translate') )?></th>
                    <td>
                        <fieldset>
                            <legend class="screen-reader-text">
                                <span><?php Loco::h( __('Experimental features','loco-translate') )?></span>
                            </legend>
                            <p>
                                <label for="loco--enable-core">
                                    <input type="checkbox" name="loco[enable_core]" value="1" id="loco--enable-core"<?php echo $enable_core ? ' checked' : '';?> />
                                    <?php Loco::h( __('Enable WordPress core translations','loco-translate') )?> 
                                </label>
                            </p>
                        </fieldset>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="submit">
            <input type="submit" class="button-primary" value="<?php Loco::h( __('Save settings','loco-translate') )?>" />
            <a class="button" href="https://localise.biz/help/wordpress/translate-plugin/support" target="_blank"><?php Loco::h( __('Get help','loco-translate') )?></a>
        </p>
    </form>
    
</div>