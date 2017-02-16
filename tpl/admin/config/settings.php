<?php
/**
 * Global settings screen. (plugin options)
 */

$this->extend('../layout');
?> 

    <form action="" method="post" enctype="application/x-www-form-urlencoded">
        <table class="form-table">
            <tbody>
                <tr>
                    <th scope="row"><?php esc_html_e('Compiling MO files','loco')?></th>
                    <td>
                        <fieldset>
                            <legend class="screen-reader-text">
                                <span><?php esc_html_e('Compiling MO files','loco')?></span>
                            </legend>
                            <p>
                                <label for="loco--gen-hash">
                                    <input type="checkbox" name="opts[gen_hash]" value="1" id="loco--gen-hash"<?php echo $opts->gen_hash?' checked':''?> />
                                    <?php esc_html_e('Generate hash tables','loco')?> 
                                </label>
                            </p>
                            <p>
                                <label for="loco--use-fuzzy">
                                    <input type="checkbox" name="opts[use_fuzzy]" value="1" id="loco--use-fuzzy"<?php echo $opts->use_fuzzy?' checked':''?> />
                                    <?php esc_html_e('Include Fuzzy strings','loco')?> 
                                </label>
                            </p>
                        </fieldset>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Extracting strings','loco')?></th>
                    <td>
                        <fieldset>
                            <legend class="screen-reader-text">
                                <span><?php esc_html_e('Extracting strings','loco')?></span>
                            </legend>
                            <p>
                                <label for="loco--max_php_size">
                                    <?php esc_html_e('Skip PHP files larger than:','loco')?> 
                                </label>
                                <input type="text" size="5" name="opts[max_php_size]" id="loco--max_php_size" value="<?php echo esc_attr( $opts->max_php_size)?>" placeholder="<?php echo esc_attr($dflt->max_php_size)?>" />
                            </p>
                            <p>
                                <label for="loco--php_alias">
                                    <?php esc_html_e('Scan PHP files with extensions:','loco')?> 
                                </label>
                                <input type="text" size="15" name="opts[php_alias]" id="loco--php_alias" value="<?php echo esc_attr( implode(' ',$opts->php_alias) )?>" placeholder="<?php echo esc_attr(implode(' ',$dflt->php_alias))?>" />
                            </p>
                        </fieldset>
                    </td>
                </tr>                
                <!--tr>
                    <th scope="row"><?php esc_html_e('POT template files','loco')?></th>
                    <td>
                        <fieldset>
                            <p>
                                <label for="loco--pot_alias">
                                    <?php esc_html_e('Look for non-standard names:','loco')?> 
                                </label>
                                <input type="text"  size="40" name="opts[pot_alias]" id="loco--pot_alias" value="<?php echo esc_attr( implode(' ',$opts->pot_alias) )?>" />
                            </p>
                        </fieldset>
                    </td>
                </tr-->
                <tr>
                    <th scope="row"><?php esc_html_e('Backing up PO files','loco')?></th>
                    <td>
                        <fieldset>
                            <legend class="screen-reader-text">
                                <span><?php esc_html_e('Backing up PO files','loco')?></span>
                            </legend>
                            <p>
                                <label for="loco--num-backups">
                                    <?php esc_html_e('Number of backups to keep of each file:','loco')?> 
                                </label>
                                <input type="number" min="0" max="99" size="2" name="opts[num_backups]" id="loco--num_backups" value="<?php printf('%u',$opts->num_backups)?>" />
                            </p>
                        </fieldset>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('File system credentials','loco')?></th>
                    <td>
                        <fieldset>
                            <legend class="screen-reader-text">
                                <span><?php esc_html_e('File system credentials','loco')?></span>
                            </legend>
                            <p>
                                <label for="loco--fs-persist">
                                    <input type="checkbox" name="opts[fs_persist]" value="1" id="loco--fs-persist"<?php echo $opts->fs_persist?' checked':''?> />
                                    <?php esc_html_e('Remember in session','loco')?> 
                                </label>
                            </p>
                            <span class="description">
                                <a href="<?php echo esc_url(apply_filters('loco_external','https://localise.biz/wordpress/plugin/manual/filesystem#remote'))?>" target="_blank"><?php 
                                    esc_html_e('See security notes','loco')?></a>
                            </span>
                        </fieldset>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Grant access to roles','loco')?></th>
                    <td>
                        <fieldset>
                            <legend class="screen-reader-text">
                                <span><?php esc_html_e('Allow full access to these roles','loco')?></span>
                            </legend><?php 
                            /* @var $cap Loco_mvc_ViewParams */
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
            <input type="submit" class="button-primary" value="<?php esc_html_e('Save settings','loco')?>" />
            <input type="hidden" name="<?php $nonce->e('name')?>" value="<?php $nonce->e('value')?>" />
        </p>
    </form>
