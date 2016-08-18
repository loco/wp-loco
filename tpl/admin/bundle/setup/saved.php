<?php
/**
 * Bundle is saved in database, but can be reset 
 */
$this->extend('../setup');
$this->start('header');
?> 

    <div class="notice inline notice-info">
        <h3 class="has-icon">
            Bundle configuration saved
        </h3>
        <p>
            This bundle's configuration is saved in the WordPress database.
        </p>
        <form action="" method="post" enctype="application/x-www-form-urlencoded">
            <p class="submit">
                <input type="submit" name="reset-setup" class="button button-danger" value="Reset config" />
                <a href="<?php $tabs[2]->e('href')?>" class="button button-link has-icon icon-wrench"><?php esc_html_e('Edit config','loco')?></a>
            </p>
            <?php $reset->_e()?> 
        </form>
    </div>
