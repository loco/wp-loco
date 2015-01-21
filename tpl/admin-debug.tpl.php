<?php
/**
 * Debug / Diagnostics screen - helps resolve commin issues and submit full report to Loco
 * @var WP_Theme $theme
 * @var LocoPackage $package
 */
$nav = array (
    Loco::__('Packages') => LocoAdmin::uri(),
    Loco::__('Settings') => LocoAdmin::uri( array(), 'settings' ),
    Loco::__('Diagnostics') => '',
); 
?>

<div class="wrap loco-admin loco-debug">
    

    <?php Loco::render('admin-nav', compact('nav') )?> 
    
    <form action="" method="post" id="loco-debug">

        <h2>
            <?php Loco::h( Loco::__('Localization Diagnostics') )?> 
        </h2>
    
        <h3 class="title">
            <?php Loco::h( Loco::__('Submit diagnostic report') )?> 
        </h3>
        
        <table class="form-table">
            <tbody>
                <!-- Personal details -->
                <tr valign="top">
                    <th scope="row"><?php Loco::h( Loco::__('Your details') )?></th>
                    <td>
                        <fieldset>
                            <p>
                                <label for="loco--name">Name:</label>
                                <input type="text" name="loco[user][name]" id="loco--name" value="<?php Loco::h( $user->get('display_name') )?>" size="40" />
                            </p>
                            <p>
                                <label for="loco--email">Email:</label>
                                <input type="text" name="loco[user][email]" id="loco--email" value="<?php Loco::h( $user->get('user_email') )?>" size="40" />
                            </p>
                        </fieldset>
                    </td>
                </tr>
                <!-- Current theme -->
                <tr valign="top">
                    <th scope="row"><?php Loco::h( Loco::__('Active theme') )?></th>
                    <td>
                        <fieldset>
                            <p>
                                <label for="loco--theme">Name:</label>
                                <input type="text" name="loco[theme][name]" id="loco--theme" value="<?php Loco::h( $theme->get('Name') )?>" size="20" readonly />
                            </p>
                            <p>
                                <label for="loco--theme-locale">Language:</label>
                                <input type="text" name="loco[theme][locale]" id="loco--theme-domain" value="<?php Loco::h( $theme_locale )?>" size="10" readonly />
                            </p>
                            <p>
                                <label for="loco--theme-domain">Text Domain:</label>
                                <input type="text" name="loco[theme][domain]" id="loco--theme-domain" value="<?php Loco::h( $package->get_domain() )?>" size="15" readonly />
                               (<input type="text" name="loco[theme][domain]" id="loco--theme-domain" value="<?php Loco::h( $theme->get('Domain') )?>" size="15" readonly />)
                            </p>
                            <p>
                                <label for="loco--theme-dir">Directory:</label>
                                <input type="text" name="loco[theme][dir]" id="loco--theme-dir" value="<?php Loco::h( $package->lang_dir() )?>" size="70" readonly />
                            </p>
                        </fieldset>
                    </td>
                </tr>
                <!-- Wordpress -->
                <tr>
                    <th scope="row"><?php Loco::h( Loco::__('About WordPress') )?></th>
                    <td>
                        <fieldset>
                            <p>
                                <label for="loco--wp">Version:</label>
                                <input type="text" name="loco[wp][version]" id="loco--wp" value="<?php Loco::h($wp_version)?>" size="10" readonly />
                            </p>
                            <p>
                                <label for="loco--wp-locale">Language:</label>
                                <input type="text" name="loco[wp][locale]" id="loco--wp-locale" value="<?php Loco::h(get_locale())?>" size="10" readonly />
                            </p>
                            <p>
                                <label for="loco--wp-lang">WPLANG:</label>
                                <input type="text" name="loco[wp][wplang]" id="loco--wp-lang" value="<?php Loco::h(defined('WPLANG')?WPLANG:'')?>" size="10" readonly />
                            </p>
                            <p>
                                <label for="loco--wp-plugins">Plugins:</label>
                                <input type="text" name="loco[wp][plugins]" id="loco--wp-plugins" value="<?php Loco::h( json_encode($plugins) ) ?>" size="70" readonly />
                            </p>
                        </fieldset>
                    </td>
                </tr>
                <!-- PHP -->
                <tr valign="top">
                    <th scope="row"><?php Loco::h( Loco::__('About PHP') )?></th>
                    <td>
                        <fieldset>
                            <p>
                                <label for="loco--php">Version:</label>
                                <input type="text" name="loco[php][version]" id="loco--php" value="<?php Loco::h(PHP_VERSION)?>" size="10" readonly />
                            </p>
                            <p>
                                <label for="loco--php-mb">mbstring:</label>
                                <input type="text" name="loco[php][mbstring]" id="loco--php-mb" value="<?php Loco::h( implode(', ',mb_list_encodings()))?>" size="10" readonly />
                            </p>
                            <p>
                                <label for="loco--php-iconv">iconv:</label>
                                <input type="text" name="loco[php][iconv]" id="loco--php-iconv" value="<?php Loco::h(extension_loaded('iconv')?ICONV_VERSION:'No')?>" size="10" readonly />
                            </p>
                            <p>
                                <label for="loco--php-ext">Extensions:</label>
                                <input type="text" name="loco[php][ext]" id="loco--php-ext" value="<?php Loco::h(implode(', ',get_loaded_extensions()))?>" size="70" readonly />
                            </p>
                        </fieldset>
                    </td>
                </tr>
                <!-- Loco data -->
                <tr valign="top">
                    <th scope="row"><?php Loco::h( Loco::__('About Loco Translate') )?></th>
                    <td>
                        <fieldset>
                            <p>
                                <label for="loco--version">Version:</label>
                                <input type="text" name="loco[self][version]" id="loco--version" value="<?php Loco::h(Loco::VERSION)?>" size="10" readonly />
                            </p>
                            <p>
                                <label for="loco--caching">Caching:</label>
                                <input type="text" name="loco[self][caching]" id="loco--caching" value="<?php Loco::h($caching)?>" size="10" readonly />
                            </p>
                            <p>
                                <label for="loco--settings">Settings:</label>
                                <input type="text" name="loco[self][settings]" id="loco--settings" value="<?php Loco::h(json_encode($config))?>" size="70" readonly />
                            </p>
                        </fieldset>                                
                    </td>
                </tr>
                <!-- Client-side data -->
                <tr valign="top">
                    <th scope="row"><?php Loco::h( Loco::__('Your browser') )?></th>
                    <td>
                        <label for="loco--ua">User Agent:</label>
                        <input type="text" name="loco[ua]" id="loco--ua" value="" size="70  " readonly />
                    </td>
                </tr>
            </tbody>
        </table>

        <p class="submit">
            <a class="button-primary" href="#todo"><?php Loco::h( Loco::__('SEND') )?></a>
            <a class="button" href="<?php Loco::h( LocoAdmin::uri() )?>"><?php Loco::h( Loco::__('Back') )?></a>
            <a class="button" href="http://wordpress.org/support/plugin/<?php echo Loco::NS?>" target="_blank"><?php Loco::h( Loco::__('Get help') )?></a>
        </p>
    
    </form>
            
</div>