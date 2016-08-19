<?php
/**
 * Bundle configuration form
 */
$this->extend('../layout');
?> 

    <form action="" method="post" enctype="application/x-www-form-urlencoded" id="loco-conf"><?php

        /* @var $p Loco_mvc_ViewParams */
        foreach( $conf as $i => $p ): $id = sprintf('loco-conf-%u',$i)?> 
        <div id="<?php echo $id?>">
            
            <a href="#" tabindex="-1" class="has-icon icon-del"><span class="screen-reader-text">remove</span></a>
            <input type="hidden" name="<?php echo $p->prefix?>[removed]" value="" /> 
            
            <?php
            // display package name, and slug if it differs.
            if( $p->name === $p->short ):?> 
            <h2><?php $p->e('name')?></h2><?php
            else:?> 
            <h2><?php $p->e('name')?> <span>(<?php $p->e('short')?>)</span></h2><?php
            endif;?> 
            
            <table class="form-table">
                <tbody>
                    <tr valign="top">
                        <th scope="row"><label for="<?php echo $id?>-name">Project name</label></th>
                        <td>
                            <input type="text" name="<?php echo $p->prefix?>[name]" value="<?php $p->e('name')?>" id="<?php echo $id?>-name" class="regular-text" />
                            <p class="description">Descriptive name for this set of translatable strings</p>
                        </td>
                    </tr>
                    <tr valign="top">
                        <th scope="row"><label for="<?php echo $id?>-domain">Text domain</label></th>
                        <td>
                            <input type="text" name="<?php echo $p->prefix?>[domain]" value="<?php $p->e('domain')?>" id="<?php echo $id?>-domain" class="regular-text" />
                            <p class="description">The namespace into which WordPress will load translated strings</p>
                        </td>
                    </tr>
                    <tr valign="top">
                        <th scope="row"><label for="<?php echo $id?>-slug">File prefix</label></th>
                        <td>
                            <input type="text" name="<?php echo $p->prefix?>[slug]" value="<?php $p->e('slug')?>" id="<?php echo $id?>-slug" class="regular-text" />
                            <p class="description">Usually the same as the text domain, but don't leave blank unless you mean to</p>
                        </td>
                    </tr>
                    <tr valign="top">
                        <th scope="row"><label for="<?php echo $id?>-template">Template file</label></th>
                        <td>
                            <input type="text" name="<?php echo $p->prefix?>[template][path]" id="<?php echo $id?>-template" class="regular-text" value="<?php echo $p->escape( $p->template['path'] )?>" />
                            <label>
                                <input type="checkbox" value="1" name="<?php echo $p->prefix?>[template][locked]" <?php empty($p->template['locked']) || print('checked');?> />
                                Locked
                            </label>
                            <p class="description">Relative path from bundle root to the official POT file</p>
                        </td>
                    </tr>
                    <tr valign="top">
                        <th scope="row"><label for="<?php echo $id?>-target">Domain path</label></th>
                        <td class="twin">
                            <div>
                                <span class="description">Include:</span>
                                <textarea name="<?php echo $p->prefix?>[target][path]" id="<?php echo $id?>-target" rows="2" cols="30" class="large-text"><?php echo $p->escape( $p->target['path'] )?></textarea>
                            </div>
                            <div>
                                <span class="description">Exclude:</span>
                                <textarea name="<?php echo $p->prefix?>[target][exclude][path]" id="<?php echo $id?>-xtarget" rows="2" cols="30" class="large-text"><?php echo $p->escape( $p->target['exclude']['path'] )?></textarea>
                            </div>
                            <p class="description">Folders within the bundle that contain author-supplied translations. (no wildcards)</p>
                        </td>
                    </tr>
                    <tr valign="top">
                        <th scope="row"><label for="<?php echo $id?>-source">Source file paths</label></th>
                        <td class="twin">
                            <div>
                                <span class="description">Include:</span>
                                <textarea name="<?php echo $p->prefix?>[source][path]" id="<?php echo $id?>-source" rows="2" cols="30" class="large-text"><?php echo $p->escape( $p->source['path'] )?></textarea>
                            </div>  
                            <div>
                                <span class="description">Exclude:</span>
                                <textarea name="<?php echo $p->prefix?>[source][exclude][path]" id="<?php echo $id?>-xsource" rows="2" cols="30" class="large-text"><?php echo $p->escape( $p->source['exclude']['path'] )?></textarea>
                            </div>
                           <p class="description">Files and folders within the bundle that contain localized PHP code. (no wildcards)</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div><?php 
        endforeach;?> 
        
        
        <footer id="loco-form-foot">
            <table class="form-table">
                <tbody>
                    <tr valign="top">
                        <th scope="row"><label for="all-excl">Blocked paths:</label></th>
                        <td>
                            <textarea name="exclude[path]" id="all-excl" rows="3" cols="30" class="large-text"><?php echo $params->escape($excl['path'])?></textarea>
                            <p class="description">Folders within the bundle that will never be searched for files. (no wildcards)</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p class="submit" >
                <input type="submit" class="button-primary" value="<?php esc_html_e('Save config','loco')?>" />
                <button type="button" class="button" disabled id="loco-add-butt"><?php esc_html_e('Add set','loco')?></button><?php
                if( $params->parent ):?> 
                <a class="button button-link has-icon icon-cog" href="<?php $parent->e('href')?>">Parent theme</a><?php
                endif?> 
                <a class="button button-link has-icon icon-download" href="<?php $params->e('xmlUrl')?>"><?php esc_html_e('XML','loco')?></a>
            </p>
        </footer>

        <input type="hidden" name="<?php $nonce->e('name')?>" value="<?php $nonce->e('value')?>" />
        <input type="hidden" name="name" value="<?php $params->e('name')?>" />

    </form>


    <?php if( 'db' === $saved ):?> 
    <form action="" method="post" id="loco-reset">
        <p class="submit">
            <input type="submit" name="unconf" class="button button-danger" value="<?php esc_html_e('Reset config','loco')?>" />
            <input type="hidden" name="<?php $nonce->e('name')?>" value="<?php $nonce->e('value')?>" />
        </p>
    </form><?php
    endif;


