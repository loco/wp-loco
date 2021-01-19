<?php
/**
 * API keys/settings screen
 */

$this->extend('../layout');
/* @var Loco_mvc_ViewParams $ui */
/* @var Loco_mvc_ViewParams[] $apis */
/* @var Loco_mvc_ViewParams $nonce */
$help = apply_filters('loco_external','https://localise.biz/wordpress/plugin/manual/providers');
?> 

<form action="" method="post" enctype="application/x-www-form-urlencoded">
    <input type="hidden" name="<?php $nonce->e('name')?>" value="<?php $nonce->e('value')?>" />
    <table class="form-table">
        <tbody><?php
            // DEEPL
            $api = $apis['deepl']?> 
            <tr>
                <th scope="row"><?php $api->e('name')?></th>
                <td>
                    <fieldset>
                        <legend class="screen-reader-text">
                            <span><?php $ui->e('api_key')?></span>
                        </legend>
                        <p>
                            <label for="loco--deepl_api_key">
                                <?php $ui->e('api_key')?>:
                            </label>
                            <input type="text" size="50" name="api[deepl][key]" id="loco--deepl_api_key" value="<?php $api->e('key')?>" spellcheck="false" />
                        </p>
                        <p>
                            <span class="description"><a href="https://www.deepl.com/translator" target="_blank" tabindex="-1">https://www.deepl.com/translator</a></span>
                        </p>
                    </fieldset>
                </td>
            </tr><?php
            // GOOGLE
            $api = $apis['google']?> 
            <tr>
                <th scope="row"><?php $api->e('name')?></th>
                <td>
                    <fieldset>
                        <legend class="screen-reader-text">
                            <span><?php $ui->e('api_key')?></span>
                        </legend>
                        <p>
                            <label for="loco--google_api_key">
                                <?php $ui->e('api_key')?>:
                            </label>
                            <input type="text" size="50" name="api[google][key]" id="loco--google_api_key" value="<?php $api->e('key')?>" spellcheck="false" />
                        </p>
                        <p>
                            <span class="description"><a href="https://cloud.google.com/translate/" target="_blank" tabindex="-1">https://cloud.google.com/translate</a></span>
                        </p>
                    </fieldset>
                </td>
            </tr><?php
            // MICROSOFT
            $api = $apis['microsoft']?> 
            <tr>
                <th scope="row"><?php $api->e('name')?></th>
                <td>
                    <fieldset>
                        <legend class="screen-reader-text">
                            <span><?php $ui->e('api_key')?></span>
                        </legend>
                        <p>
                            <label for="loco--microsoft_api_key">
                                <?php $ui->e('api_key')?>:
                            </label>
                            <input type="text" size="50" name="api[microsoft][key]" id="loco--microsoft_api_key" value="<?php $api->e('key')?>" spellcheck="false" />
                        </p>
                        <p>
                            <label for="loco--microsoft_api_region">
                                <?php $ui->e('api_region')?>:
                            </label>
                            <input type="text" size="20" name="api[microsoft][region]" id="loco--microsoft_api_region" value="<?php $api->e('region')?>" spellcheck="false" placeholder="global" />
                        </p>
                        <p>
                            <span class="description"><a href="https://aka.ms/MicrosoftTranslator" target="_blank" tabindex="-1">https://aka.ms/MicrosoftTranslator</a></span>
                        </p>
                    </fieldset>
                </td>
            </tr><?php
            // YANDEX
            $api = $apis['yandex']?> 
            <tr>
                <th scope="row"><?php $api->e('name')?></th>
                <td>
                    <fieldset>
                        <legend class="screen-reader-text">
                            <span><?php $ui->e('api_key')?></span>
                        </legend>
                        <p>
                            <label for="loco--yandex_api_key">
                                <?php $ui->e('api_key')?>:
                            </label>
                            <input type="text" size="90" name="api[yandex][key]" id="loco--yandex_api_key" value="<?php $api->e('key')?>" spellcheck="false" />
                        </p>
                        <p>
                            <span class="description"><a href="https://cloud.yandex.com/services/translate" target="_blank" tabindex="-1">https://cloud.yandex.com/services/translate</a></span>
                        </p>
                    </fieldset>
                </td>
            </tr>
        </tbody>
    </table>

    <div class="notice inline">
        <p>
            <strong class="has-icon"><?php esc_html_e('Important','loco-translate')?>:</strong>
            <span>
                <?php esc_html_e('Third party services are subject to their own terms of use and may incur costs from the provider','loco-translate')?>.
                <a href="<?php self::e($help)?>#legal" target="_blank" tabindex="-1"><?php esc_html_e('See full disclaimer','loco-translate')?></a>.
            </span>
        </p>
    </div>  

    <p class="submit">
        <input type="submit" class="button-primary" value="<?php esc_html_e('Save settings','loco-translate')?>" />
        <a class="button button-link" href="<?php self::e($help)?>" target="_blank"><?php esc_html_e('Documentation','loco-translate')?></a>
    </p>
</form>
