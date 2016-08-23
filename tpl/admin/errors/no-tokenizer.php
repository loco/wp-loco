<?php
/**
 * Tokenizer extension required.
 * Warning should appear above in normal location. This page is just for information.
 */
$this->extend('../layout');

?> 

    <div class="notice inline notice-info">
        <h3 class="has-icon">
            <?php esc_html_e('About the Tokenizer','loco')?> 
        </h3>
        <p>
            Loco requires the <a href="http://php.net/manual/en/book.tokenizer.php" target="_blank">Tokenizer extension</a> to scan PHP source code for translatable strings.
        </p>
        <p>
            The string extraction function is not available without it, but you can still translate any bundle that has a <a href="https://localise.biz/wordpress/plugin/manual/templates" target="_blank">template</a>.
        </p>
    </div>