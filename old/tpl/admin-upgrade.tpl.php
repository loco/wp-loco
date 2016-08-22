<div class="wrap loco-admin">
    
    <h3>
        Start using Loco Translate 2
    </h3>
    <p>
        <strong>Version 1 of Loco Translate is no longer maintained.</strong> 
    </p>
    <p>
        Version 2 is a complete rebuild. <a href="https://localise.biz/help/wordpress/translate-plugin/changelog" target="_blank">See what's changed here</a>.<br />
        Because it's a major version increase, we're making the upgrade optional for the time being.
    </p>
    
    <form action"" method="post" enctype="application/x-www-form-urlencoded">
        <p class="submit">
            <input type="submit" class="button button-primary" value="Enable the new version" />
            <a class="button button-secondary" href="<?php echo esc_url($home)?>">Keep using the old version</a>
        </p>
        <input type="hidden" name="loco-nonce" value="<?php echo esc_html($nonce)?>" />
    </form>

    <small>
        This upgrade will not modify any files. You can change back to version 1 later if you need to.
    </small>
    
</div>