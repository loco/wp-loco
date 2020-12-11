<?php
/**
 * Global settings screen. (plugin options)
 */

$this->extend('../layout');
$help_url = esc_html( apply_filters('loco_external','https://localise.biz/wordpress/plugin/manual/settings') );

/* @var Loco_data_Settings $opts */
/* @var Loco_data_Settings $dflt */
/* @var Loco_mvc_ViewParams $nonce */
/* @var Loco_mvc_ViewParams $verbose */
?> 

    <form action="" method="post" enctype="application/x-www-form-urlencoded">
        <input type="hidden" name="<?php $nonce->e('name')?>" value="<?php $nonce->e('value')?>" />
        <table class="form-table">
            <tbody>
                <tr>
                    <th scope="row">
                        <?php esc_html_e('Extracting strings','loco-translate')?> 
                        <a class="icon only-icon icon-help" href="<?php echo $help_url?>#xgettext" target="_blank"><span>(?)</span></a>
                    </th>
                    <td>
                        <fieldset>
                            <legend class="screen-reader-text">
                                <span><?php esc_html_e('Extracting strings','loco-translate')?></span>
                            </legend>
                            <p>
                                <label for="loco--max_php_size">
                                    <?php esc_html_e('Skip PHP files larger than:','loco-translate')?> 
                                </label>
                                <input type="text" size="5" name="opts[max_php_size]" id="loco--max_php_size" value="<?php echo esc_attr( $opts->max_php_size)?>" placeholder="<?php echo esc_attr($dflt->max_php_size)?>" />
                            </p>
                            <p>
                                <label for="loco--php_alias">
                                    <?php esc_html_e('Scan PHP files with extensions:','loco-translate')?>
                                </label>
                                <input type="text" size="15" name="opts[php_alias]" id="loco--php_alias" value="<?php echo esc_attr( implode(' ',$opts->php_alias) )?>" placeholder="<?php echo esc_attr(implode(' ',$dflt->php_alias))?>" />
                            </p>
                            <p>
                                <label for="loco--jsx_alias">
                                    <?php esc_html_e('Scan JavaScript files with extensions:','loco-translate')?>
                                </label>
                                <input type="text" size="15" name="opts[jsx_alias]" id="loco--jsx_alias" value="<?php echo esc_attr( implode(' ',$opts->jsx_alias) )?>" placeholder="<?php echo esc_attr(implode(' ',$dflt->jsx_alias))?>" />
                            </p>
                        </fieldset>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <?php esc_html_e('Saving PO/POT files','loco-translate')?> 
                        <a class="icon only-icon icon-help" href="<?php echo $help_url?>#po" target="_blank"><span>(?)</span></a>
                    </th>
                    <td>
                        <fieldset>
                            <legend class="screen-reader-text">
                                <span><?php esc_html_e('Saving PO/POT files','loco-translate')?></span>
                            </legend>
                            <p>
                                <label for="loco--num-backups">
                                    <?php esc_html_e('Number of backups to keep of each file:','loco-translate')?> 
                                </label>
                                <input type="number" min="0" max="99" size="2" name="opts[num_backups]" id="loco--num-backups" value="<?php printf('%u',$opts->num_backups)?>" />
                            </p>
                            <p>
                                <label for="loco--po-width">
                                    <?php esc_html_e('Maximum line length (zero disables wrapping)','loco-translate')?> 
                                </label>
                                <input type="number" min="0" max="999" size="2" name="opts[po_width]" id="loco--po-width" value="<?php printf('%u',$opts->po_width)?>" />
                            </p>
                            <p>
                                <label for="loco--po-utf8-bom">
                                    <input type="checkbox" name="opts[po_utf8_bom]" value="1" id="loco--po-utf8-bom"<?php echo $opts->po_utf8_bom?' checked':''?> />
                                    <?php esc_html_e('Add UTF-8 byte order mark','loco-translate')?> (<?php esc_html_e('Not recommended','loco-translate')?>)
                                </label>
                            </p>
                            <p>
                                <label for="loco--ajax-files">
                                    <input type="checkbox" name="opts[ajax_files]" value="1" id="loco--ajax-files"<?php echo $opts->ajax_files?' checked':''?> />
                                    <?php esc_html_e('Enable Ajax file uploads','loco-translate')?> (<?php esc_html_e('Recommended','loco-translate')?>)
                                </label>
                            </p>
                        </fieldset>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <?php esc_html_e('Syncing PO files','loco-translate')?> 
                        <a class="icon only-icon icon-help" href="<?php echo $help_url?>#sync" target="_blank"><span>(?)</span></a>
                    </th>
                    <td>
                        <fieldset>
                            <legend class="screen-reader-text">
                                <span><?php esc_html_e('Syncing PO files','loco-translate')?></span>
                            </legend>
                            <p>
                                <label for="loco--fuzziness">
                                    <?php esc_html_e('Fuzzy matching tolerance','loco-translate')?>:
                                </label>
                                <input type="text" size="5" maxlength="3" name="opts[fuzziness]" id="loco--fuzziness" value="<?php echo esc_attr( $opts->fuzziness)?>" placeholder="0-100" />
                                <span>%</span>
                            </p>
                            <p>
                                <label for="loco--pot-expected">
                                    <?php // translators: Indicates that POT files are optional, which is not recommended
                                    esc_html_e('Sync with source when template missing','loco-translate')?>:
                                </label>
                                <select name="opts[pot_expected]" id="loco--pot-expected">
                                    <option value="0"><?php $verbose->e(0)?></option>
                                    <option value="1"<?php echo 1 === $opts->pot_expected?' selected':''?>><?php $verbose->e(1)?></option>
                                    <option value="2"<?php echo 2 === $opts->pot_expected?' selected':''?>><?php $verbose->e(2)?></option>
                                </select>
                            </p>
                        </fieldset>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <?php esc_html_e('Compiling MO files','loco-translate')?> 
                        <a class="icon only-icon icon-help" href="<?php echo $help_url?>#mo" target="_blank"><span>(?)</span></a>
                    </th>
                    <td>
                        <fieldset>
                            <legend class="screen-reader-text">
                                <span><?php esc_html_e('Compiling MO files','loco-translate')?></span>
                            </legend>
                            <p>
                                <label for="loco--gen-hash">
                                    <input type="checkbox" name="opts[gen_hash]" value="1" id="loco--gen-hash"<?php echo $opts->gen_hash?' checked':''?> />
                                    <?php esc_html_e('Generate hash tables','loco-translate')?>
                                </label>
                            </p>
                            <p>
                                <label for="loco--use-fuzzy">
                                    <input type="checkbox" name="opts[use_fuzzy]" value="1" id="loco--use-fuzzy"<?php echo $opts->use_fuzzy?' checked':''?> />
                                    <?php esc_html_e('Include Fuzzy strings','loco-translate')?>
                                </label>
                            </p>
                        </fieldset>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <?php esc_html_e('Compiling JSON files','loco-translate')?>
                        <a class="icon only-icon icon-help" href="<?php echo $help_url?>#json" target="_blank"><span>(?)</span></a>
                    </th>
                    <td>
                        <fieldset>
                            <legend class="screen-reader-text">
                                <span><?php esc_html_e('Compiling JSON files','loco-translate')?></span>
                            </legend>
                            <p>
                                <label for="loco--jed-pretty">
                                    <input type="checkbox" name="opts[jed_pretty]" value="1" id="loco--jed-pretty"<?php echo $opts->jed_pretty?' checked':''?> />
                                    <?php esc_html_e('Pretty formatting','loco-translate')?>
                                </label>
                            </p>
                            <p>
                                <label for="loco--jed-clean">
                                    <input type="checkbox" name="opts[jed_clean]" value="1" id="loco--jed-clean"<?php echo $opts->jed_clean?' checked':''?> />
                                    <?php esc_html_e('Delete redundant files','loco-translate')?>
                                </label>
                            </p>
                        </fieldset>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <?php esc_html_e('File system access','loco-translate')?> 
                        <a class="icon only-icon icon-help" href="<?php echo $help_url?>#fs" target="_blank"><span>(?)</span></a>
                    </th>
                    <td>
                        <fieldset>
                            <legend class="screen-reader-text">
                                <span><?php esc_html_e('File system access','loco-translate')?></span>
                            </legend>
                            <p>
                                <label for="loco--fs-persist">
                                    <input type="checkbox" name="opts[fs_persist]" value="1" id="loco--fs-persist"<?php echo $opts->fs_persist?' checked':''?> />
                                    <?php esc_html_e('Save credentials in session','loco-translate')?> 
                                    (<?php esc_html_e('Not recommended','loco-translate')?>) 
                                </label>
                            </p>
                            <p>
                                <label for="loco--fs-protect">
                                    <?php esc_html_e('Modification of installed files','loco-translate');?>:
                                </label>
                                <select name="opts[fs_protect]" id="loco--fs-protect">
                                    <option value="0"><?php $verbose->e(0)?></option>
                                    <option value="1"<?php echo 1 === $opts->fs_protect?' selected':''?>><?php $verbose->e(1)?></option>
                                    <option value="2"<?php echo 2 === $opts->fs_protect?' selected':''?>><?php $verbose->e(2)?></option>
                                </select>
                            </p>
                            <p>
                                <label for="loco--pot-protect">
                                    <?php esc_html_e('Editing of POT (template) files','loco-translate');?>:
                                </label>
                                <select name="opts[pot_protect]" id="loco--pot-protect">
                                    <option value="0"><?php $verbose->e(0)?></option>
                                    <option value="1"<?php echo 1 === $opts->pot_protect?' selected':''?>><?php $verbose->e(1)?></option>
                                    <option value="2"<?php echo 2 === $opts->pot_protect?' selected':''?>><?php $verbose->e(2)?></option>
                                </select>
                            </p>
                        </fieldset>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <?php esc_html_e('Grant access to roles','loco-translate')?> 
                        <a class="icon only-icon icon-help" href="<?php echo $help_url?>#roles" target="_blank"><span>(?)</span></a>
                    </th>
                    <td>
                        <fieldset>
                            <legend class="screen-reader-text">
                                <span><?php esc_html_e('Allow full access to these roles','loco-translate')?></span>
                            </legend><?php 
                            /* @var Loco_mvc_ViewParams[] $caps */
                            foreach( $caps as $cap ):?> 
                            <p>
                                <label>
                                    <input type="checkbox" name="<?php $cap->e('name')?>" value="<?php $cap->e('label')?>" <?php echo $cap->attrs?> />
                                    <?php $cap->e('label')?> 
                                </label>
                            </p><?php
                            endforeach;?> 
                        </fieldset>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="submit">
            <input type="submit" class="button-primary" value="<?php esc_html_e('Save settings','loco-translate')?>" />
            <a class="button button-link" href="<?php echo $help_url?>" target="_blank"><?php esc_html_e('Documentation','loco-translate')?></a>
        </p>
    </form>
