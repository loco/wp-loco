<?php
/**
 * PO file options form
 */
$this->extend('../layout');
/* @var Loco_gettext_SyncOptions $conf */
/* @var Loco_mvc_ViewParams $params */
?> 

<div class="panel">
    <h3>
        <?php esc_html_e('Template options','loco-translate')?> 
    </h3>

    <form action="" method="post" enctype="application/x-www-form-urlencoded" id="loco-main"><?php
        /* @var Loco_mvc_HiddenFields $hidden */
        $hidden->_e();?> 

        <table class="form-table">
            <tbody>
                <tr valign="top" class="compact">
                    <td>
                        <label for="loco-conf-template"><?php esc_html_e('Relative path to template file','loco-translate');?>:</label><br />
                        <input type="text" name="conf[template]" value="<?php self::e( (string) $conf->getTemplate() )?>" size="100" id="loco-conf-template" />
                    </td>
                </tr>
                <tr valign="top" class="compact">
                    <td>
                        <p>
                            <label>
                                <input type="radio" name="conf[mode]" value="po" <?php echo $conf->mergeMsgstr()?'checked ':''?>/>
                                <?php $params->f('potName', __('Copy target translations from "%s"','loco-translate') )?>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="radio" name="conf[mode]" value="pot" <?php echo $conf->mergeMsgstr()?'':'checked '?>/>
                                <?php esc_html_e('Just copy English source strings','loco-translate')?>
                            </label>
                        </p>
                    </td>
                </tr>
                <tr valign="top" class="compact">
                    <td>
                        <p>
                            <label>
                                <input type="checkbox" name="conf[json]" value="1" <?php echo $conf->mergeJson()?'checked ':''?>/>
                                <?php esc_html_e('Merge strings from related JSON files','loco-translate')?>
                            </label>
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>

        <p class="submit">
            <button type="submit" class="button button-primary" disabled><?php esc_html_e('Save','loco-translate')?></button>
            <a href="<?php $params->e('advanced')?>" class="button button-link"><?php esc_html_e('Advanced','loco-translate')?></a>
        </p>

    </form>

</div>