<?php
/**
 * Tokenizer extension required.
 * Warning should also appear in the usual notices location. This page is just for information.
 */
$this->extend('../layout');
?> 

    <div class="notice inline notice-info">
        <h3 class="has-icon">
            <?php esc_html_e('About the Tokenizer','loco-translate')?> 
        </h3>
        <p>
            <?php
            echo wp_kses(
                // Translators: change "en" in the URL to your language if it's available at https://www.php.net/docs.php
                __('Loco requires the <a href="http://php.net/manual/en/book.tokenizer.php" target="_blank">Tokenizer extension</a> to scan PHP source code for translatable strings','loco-translate'), 
                ['a'=>['href'=>true,'target'=>true]], ['http','https']
            );?>.
        </p>
        <p><?php
            $help = apply_filters('loco_external','https://localise.biz/wordpress/plugin/manual/templates');
            echo wp_kses(
                // Translators: %s is a URL. Keep the <a> tag intact
                sprintf( __('You can still translate any bundle that has a <a href="%s" target="_blank">template</a>','loco-translate'), $help ),
                ['a'=>['href'=>true,'target'=>true]], ['https']
            );?>.
        </p>
    </div>
