<?php
/*
 * Modal for batch translate of PO file currently in editor
 */

/* @var Loco_mvc_ViewParams $help */
/* @var Loco_mvc_ViewParams $prof */
/* @var array[] $apis */

?><div id="loco-auto" class="loco-batch" title="<?php esc_html_e('Auto-translate this file','loco-translate');?>">
    <form action="#">
        <fieldset>
            <select name="api" id="auto-api"><?php
                foreach( $apis as $a ): $api = new Loco_mvc_ViewParams($a);?> 
                <option value="<?php $api->e('id')?>"><?php $api->e('name')?></option><?php 
                endforeach?> 
            </select>
        </fieldset>
        <fieldset>
            <p>
                <label for="auto-existing">
                    <input type="checkbox" id="auto-existing" name="existing" />
                    <?php esc_html_e('Overwrite existing translations','loco-translate')?> 
                </label>
            </p>
            <p>
                <label for="auto-fuzzy">
                    <input type="checkbox" id="auto-fuzzy" name="fuzzy" />
                    <?php esc_html_e('Mark new translations as Fuzzy','loco-translate')?> 
                </label>
            </p>
            <blockquote id="loco-job-progress">
                Initializing...
            </blockquote>
            <p>
                <button type="submit" class="button button-primary has-icon icon-translate">
                    <span><?php esc_html_e('Translate','loco-translate')?></span>
                </button>
                <a href="<?php $help->e('href')?>" class="button button-link has-icon icon-help" target="_blank"><?php
                    $help->e('text');
                ?></a>
                <a href="<?php $prof->e('href')?>" class="button button-link has-icon icon-group" target="_blank"><?php
                    $prof->e('text');
               ?></a>
            </p>
        </fieldset>
    </form>
</div>