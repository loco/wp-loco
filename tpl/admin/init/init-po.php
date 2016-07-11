<?php
/**
 * Intitialize a new PO translations file
 */
 
$this->extend('../layout');


    if( $params->has('ext') ):?> 
    <div class="notice inline notice-warning">
        <h3 class="has-icon">No template configured</h3>
        <p>
            Loco can sync directly with source code, but this isn't recommended.
        </p>
        <p>
            <a href="<?php $ext->e('link')?>" class="button button-link has-icon icon-add"><?php $ext->e('text')?></a><?php
            if( $params->has('alt') ):?> 
            <a href="<?php $alt->e('link')?>" class="button button-link has-icon icon-copy"><?php $alt->e('text')?></a><?php
            endif?> 
        </p>
    </div><?php
    endif;?> 


    <div class="notice inline notice-generic">

        <h2><?php $params->e('subhead')?></h2>
        <p><?php $params->e('summary')?></p>

        <form action="" method="post" enctype="application/x-www-form-urlencoded" id="loco-poinit"><?php
    
            foreach( $hidden as $name => $value ):?> 
            <input type="hidden" name="<?php echo $name?>" value="<?php $hidden->e($name)?>" /><?php
            endforeach;?> 
            
            <table class="form-table">
                <tbody class="loco-locales">
                    <tr valign="top">
                        <th scope="row">
                            <label for="loco-select-locale">
                                <?php esc_html_e('Choose a language','loco')?>:
                            </label>
                        </th>
                        <td>
                            <fieldset>
                                <label for="loco-use-selector">
                                    <span><input type="radio" name="use-selector" value="1" checked id="loco-use-selector" /></span>
                                    <?php esc_attr_e('WordPress language','loco')?>:
                                </label>
                                <div>
                                    <span class="lang nolang"></span>
                                    <select id="loco-select-locale" name="select-locale">
                                        <option value=""><?php esc_attr_e('No language selected','loco')?></option><?php
                                        /* @var Loco_mvc_ViewParams $option */
                                        foreach( $locales as $option ):?> 
                                        <option value="<?php $option->e('value')?>" data-icon="<?php $option->e('icon')?>"><?php $option->e('label')?></option><?php
                                        endforeach;?> 
                                    </select>
                                </div>
                            </fieldset>
                            <fieldset class="disabled">
                                <label>
                                    <span><input type="radio" name="use-selector" value="0" /></span>
                                    <?php esc_attr_e('Custom language','loco')?>:
                                </label>
                                <div>
                                    <span class="lang nolang"></span>
                                    <span class="loco-clearable"><input type="text" maxlength="14" name="custom-locale" value="" /></span>
                                </div>
                            </fieldset>
                        </td>
                    </tr>
                </tbody>
                <tbody class="loco-paths">   
                    <tr valign="top">
                        <th scope="row">
                            <label>Choose a location:</label>
                        </th>
                        <td>
                            <p class="description"> </p>
                        </td>
                    </tr><?php
                    $choiceId = 0;
                    /* @var $location Loco_mvc_ViewParams */
                    foreach( $locations as $typeId => $location ):?> 
                    <tr class="compact">
                        <td>
                            <p class="description">
                                <?php $location->e('label')?>:
                            </p>
                        </td>
                        <td><?php
                        /* @var $parent Loco_mvc_FileParams */
                        foreach( $location['paths'] as $choice ): 
                            $parent = $choice['parent']; 
                            $offset = sprintf('%u',++$choiceId);?> 
                            <p>
                                <label>
                                    <input type="radio" name="select-path" value="<?php echo $offset?>" <?php echo $choice->checked?> />
                                    <input type="hidden" name="path[<?php echo $offset?>]" value="<?php $choice->e('hidden')?>" />
                                    <code class="path"><?php $parent->e('relpath')?>/<?php echo $choice->holder?></code>
                                    <?php $choice->locked && print('<!-- no direct fs -->')?> 
                                </label>
                            </p><?php
                        endforeach?> 
                        </td>
                    </tr><?php
                    endforeach;?> 
                </tbody><?php
    
                if( $params->has('sourceLocale') ):?> 
                <tbody>
                    <tr valign="top">
                        <th scope="row">
                            Template options:
                        </th>
                        <td>
                            <p>
                                <label>
                                    <input type="radio" name="strip" value="" checked />
                                    Copy target translations from <?php $params->e('sourceLocale')?> 
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="radio" name="strip" value="1" />
                                    Just copy English source strings
                                </label>
                            </p>
                        </td>
                    </tr>
                </tbody><?php
                endif?> 
            </table>
    
            <p class="submit">
                <input type="submit" value="<?php esc_html_e('Create translations file','loco')?>" class="button button-large button-primary" disabled />
            </p>
    
        </form>

    </div>