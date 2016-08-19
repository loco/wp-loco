<?php
/**
 * "auto" config options
 */
$this->extend('../setup');
$this->start('header');


   if( $params->has('jsonFields') ):?> 
    <form action="" method="post" enctype="application/x-www-form-urlencoded" class="notice inline notice-generic" id="loco-remote">
        <h3>
            Check config repository 
        </h3>
        <fieldset id="loco-remote-query">
            <p>
                We have a database of non-standard bundle configurations.
                If we know your bundle, we'll configure it for you automatically.
            </p>
            <p>
                Note that if your bundle is "premium" we probably won't know it. 
            </p>
            <p>
                <select name="vendor">
                    <option value="wordpress">WordPress</option>
                </select>
                <input type="text" name="slug" value="<?php $params->e('vendorSlug')?>" class="regular-text" />
            </p>
        </fieldset>
        <div id="loco-remote-empty">
            <p>
                <button type="button" class="button button-primary">Find config</button>
                <a href="<?php $tabs[1]->e('href')?>" class="button button-link">Cancel</a>
                <span></span>
            </p>
        </div>
        <div id="loco-remote-found" class="jshide">
            <p>
                <input type="submit" class="button button-success" name="json-setup" value="OK, Load this config" />
                <input type="reset" class="button button-link" value="Cancel" />
            </p>
        </div>
        <?php $jsonFields->_e()?> 
    </form><?php
    endif;


    if( $params->has('xmlFields') ):?> 
    <form action="" method="post" enctype="application/x-www-form-urlencoded" class="notice inline notice-generic">
        <h3>
            XML setup
        </h3>
        <p>
            If you've been given a configuration file by a developer, paste the XML code here. 
        </p>
        <fieldset>
            <textarea name="xml-content" class="large-text" rows="3" wrap="virtual"></textarea>
        </fieldset>
        <p>
            <input type="submit" class="button button-primary" name="xml-setup" value="Load config" />
            <a href="<?php $tabs[1]->e('href')?>" class="button button-link">Cancel</a>
        </p>
        <?php $xmlFields->_e()?> 
    </form><?php
    endif;


    if( $params->has('autoFields') ):?> 
    <form action="" method="post" enctype="application/x-www-form-urlencoded" class="notice inline notice-generic">
        <h3>
            Auto setup
        </h3>
        <p>
            We can make some guesses about how this bundle is set up, but we can't guarantee they'll be right.
        </p>
        <p>
            This is not recommended unless you're a developer able to make manual changes afterwards.
        </p>
        <p>
            <input type="submit" class="button button-primary" name="auto-setup" value="Guess config" />
        </p>
        <?php $autoFields->_e()?> 
    </form><?php
    endif;

    