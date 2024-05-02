<?php
/* @var Loco_mvc_View $this */
$this->extend('debug-layout');
$this->start('form');

// Translators: This file is intentionally in English only.

/* @var Loco_mvc_ViewParams $form */
/* @var Loco_mvc_ViewParams $default */
?> 
    <form action="" method="get" enctype="application/x-www-form-urlencoded">
        <input type="hidden" name="page" value="loco-debug" />
        <table class="form-table">
            <tbody>
                <tr>
                    <th scope="row">
                        <label for="debug-msgid">Source string</label><br />
                    </th>
                    <td>
                        <textarea required class="regular-text" name="msgid" rows="4" id="debug-msgid" placeholder="e.g. %s comment"><?php $form->e('msgid')?></textarea>
                        <p class="description">
                            Enter the original string <strong>exactly</strong>. This field is mandatory.
                        </p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="debug-msgctxt">Context</label>
                    </th>
                    <td>
                        <input type="text" class="regular-text" name="msgctxt" id="debug-msgctxt" value="<?php $form->e('msgctxt')?>" placeholder="e.g. Comments title" />
                        <p class="description">
                            Context is optional. It's used to disambiguate duplicate strings. If in doubt, leave blank.
                        </p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="debug-plural">Plural form</label>
                    </th>
                    <td>
                        <input type="text" class="regular-text" name="msgid_plural" id="debug-plural" value="<?php $form->e('msgid_plural')?>" placeholder="e.g. %s comments" />
                        <label for="debug-n">n=</label>
                        <input type="number" min="0" name="n" id="debug-n" value="<?php $form->e('n')?>" placeholder="<?php $default->e('n')?>" />
                        <p class="description">
                            Plural form is optional, and will only work if the string has been pluralized.
                        </p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="debug-domain">Text domain</label>
                    </th>
                    <td>
                        <input type="text" class="regular-text" name="domain" id="debug-domain" value="<?php $form->e('domain')?>" placeholder="<?php $default->e('domain')?>"/>
                        <p class="description">Leaving empty will use the WordPress core (default) text domain.</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="debug-locale">Language</label>
                    </th>
                    <td>
                        <input type="text" class="regular-text" name="locale" id="debug-locale" value="<?php $form->e('locale')?>" placeholder="<?php $default->e('locale')?>" />
                        <p class="description">Enter a valid locale code. Your translation files must be suffixed exactly with this value.</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="debug-loader">Loader</label>
                    </th>
                    <td>
                        <select name="loader" id="debug-loader"><?php $value = $form['loader'];?> 
                            <option value="">
                                Auto (recommended)
                            </option>
                            <option value="plugin"<?php $value==='plugin' and print(' selected')?>>
                                load_plugin_textdomain
                            </option>
                            <option value="theme"<?php $value==='theme' and print(' selected')?>>
                                load_theme_textdomain
                            </option>
                            <option value="custom"<?php $value==='custom' and print(' selected')?>>
                                load_textdomain
                            </option>
                            <option value="none"<?php $value==='none' and print(' selected')?>>
                                None
                            </option>
                        </select>
                        <label for="debug-loadpath">path: </label>
                        <input type="text" class="regular-text code" name="loadpath" id="debug-loadpath" value="<?php $form->e('loadpath')?>" placeholder="" />
                        <p class="description">
                            See the WordPress documentation for correct usage of the path argument.
                        </p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="debug-jspath">Script path</label>
                    </th>
                    <td>
                        <input type="text" class="regular-text code" name="jspath" id="debug-jspath" value="<?php $form->e('jspath')?>" placeholder="" />
                        <p class="description">
                            Simulate <a href="https://developer.wordpress.org/reference/functions/wp_set_script_translations/" tabindex="-1">wp_set_script_translations</a>
                            with a relative script path, e.g. <code>blocks/example.js</code>.
                        </p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        Options
                    </th>
                    <td>
                        <label>
                            <input type="checkbox" name="unhook" value="1"<?php $form->unhook and print(' checked')?> />
                            Unhook filters before test. This may help isolate translation from other plugins.
                        </label>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="submit">
            <input type="submit" class="button-primary" value="Translate" />
            <a class="button button-link" href="?page=loco-debug&randomize">Lucky dip</a>
        </p>
    </form>

