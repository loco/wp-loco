<?php
/**
 * User preferences screen
 */

$this->extend('../layout');
?> 

    <form action="" method="post" enctype="application/x-www-form-urlencoded">
        <table class="form-table">
            <tbody>
                <tr>
                    <th scope="row"><?php esc_html_e('Translator credit','loco-translate')?></th>
                    <td>
                        <fieldset>
                            <legend class="screen-reader-text">
                                <span><?php esc_html_e('Translator credit','loco-translate')?></span>
                            </legend>
                            <p>
                                <input type="text" size="64" name="opts[credit]" id="loco--credit" value="<?php echo esc_attr($opts->credit)?>" placeholder="<?php echo esc_attr($credit)?>" />
                            </p>
                        </fieldset>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="submit">
            <input type="submit" class="button-primary" value="<?php esc_html_e('Save settings','loco-translate')?>" />
            <input type="hidden" name="<?php $nonce->e('name')?>" value="<?php $nonce->e('value')?>" />
        </p>
    </form>
