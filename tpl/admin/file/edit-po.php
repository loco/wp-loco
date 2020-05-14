<?php
/**
 * PO file editor
 */
$this->extend('editor');
$this->start('header');

echo $this->render('../common/inc-po-header');



/* @var Loco_mvc_ViewParams $js */
// inline modal for auto-translate. Note that modal will be placed outside of #loco.wrap element
// TODO could populate with default user options and/or remember settings
if( $js->apis ):?> 
<div id="loco-auto" class="loco-batch" title="<?php esc_html_e('Auto-translate this file','loco-translate');?>">
    <form action="#">
        <fieldset>
            <select name="api"><?php foreach( $js->apis as $api ):?> 
                <option value="<?php self::e($api['id'])?>"><?php self::e($api['name'])?></option><?php 
                endforeach?> 
            </select>
        </fieldset>
        <fieldset>
            <p>
                <label for="auto-existing">
                    <input type="checkbox" id="auto-existing" name="existing" />
                    Overwrite existing translations
                </label>
            </p>
            <p>
                <label for="auto-fuzzy">
                    <input type="checkbox" id="auto-fuzzy" name="fuzzy" />
                    Mark new translations as Fuzzy
                </label>
            </p>
            <blockquote id="loco-job-progress">
                Initializing...
            </blockquote>
            <p>
                <button type="submit" class="button button-primary has-icon icon-translate">
                    <span>Translate</span>
                </button>
            </p>
        </fieldset>
    </form>
</div><?php



// inline modal for when no APIs are configured.
else:?> 
<div id="loco-auto" class="loco-alert" title="<?php esc_html_e('No translation APIs configured','loco-translate');?>">
    <p>
        <?php esc_html_e('Add automatic translation services in the plugin settings.','loco-translate')?>
    </p>
    <nav>
        <a href="<?php $this->route('config-apis')->e('href')?>" class="has-icon icon-cog"><?php
            esc_html_e('Settings','loco-translate');
        ?></a>
        <a href="#" class="has-icon icon-help"><?php
            esc_html_e('Help','loco-translate');
         ?></a>
    </nav>
</div><?php
endif;
