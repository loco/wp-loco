<div class="wrap loco-admin">
    
    <h3>
        Start using Loco Translate 2
    </h3>
    <p>
        <strong>Version 1 of Loco Translate is no longer maintained.</strong> 
    </p>
    <p>
        Version 2 is a complete rebuild.
        <a href="https://localise.biz/help/wordpress/translate-plugin/changelog" target="_blank">See what's changed here</a>.<br />
    </p>
    <p>
        Note that the next major release of Loco Translate will <strong>no longer include</strong> the legacy plugin.<br />
        It will be available only via manual installation from the <a href="https://github.com/loco/wp-loco/tree/1.x">Git archive</a>.
    </p>
    <form action"" method="post" enctype="application/x-www-form-urlencoded">
        <p class="submit">
            <input type="submit" class="button button-primary" value="Enable the new version" />
            <a class="button button-secondary" href="<?php echo esc_url($home)?>">Cancel</a>
        </p>
        <input type="hidden" name="loco-nonce" value="<?php echo esc_html($nonce)?>" />
    </form>

    <small>
        This upgrade will not modify any files
    </small>
    
</div>