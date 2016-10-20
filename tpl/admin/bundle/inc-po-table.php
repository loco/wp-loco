<?php
/**
 * Table of localised file pairs in a project
 */
    if( $pairs ):?> 

        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th data-sort-type="s">
                        <?php esc_html_e('Language','loco')?> 
                    </th>
                    <th colspan="2" data-sort-type="n">
                        <?php esc_html_e('Translation progress','loco')?> 
                    </th>
                    <th data-sort-type="n">
                        <?php esc_html_e('Pending','loco')?> 
                    </th>
                    <th data-sort-type="s">
                        <?php esc_html_e('File info','loco')?> 
                    </th>
                    <th data-sort-type="n">
                        <?php esc_html_e('Last modified','loco')?> 
                    </th>
                    <th data-sort-type="s">
                        <?php esc_html_e('Folder','loco')?> 
                    </th>
                </tr>
            </thead>
            <tbody><?php
                /* @var $po Loco_pages_ViewParams */
                foreach( $pairs as $po ): $ispo = (bool) $po->lcode;?> 
                <tr>
                    <td class="has-row-actions" data-sort-value="<?php $po->e('lname')?>">
                        <a href="<?php $po->e('edit')?>" class="row-title"><?php
                            if( $ispo ):?> 
                            <span <?php echo $po->lattr?>><code><?php $po->e('lcode')?></code></span>
                            <span><?php $po->e('lname')?></span><?php
                            else:?> 
                            <span class="icon icon-file"></span>
                            <span><?php
                            esc_html_e('English','loco')?> (<?php esc_html_e('Template','loco')?>)</span><?php
                            endif?> 
                        </a><?php
                        if( $domain ):?> 
                        <nav class="row-actions">
                            <span class="edit">
                                <a href="<?php $po->e('edit')?>"><?php esc_html_e('Edit','loco')?></a> |
                            </span>
                            <span class="_edit">
                                <a href="<?php $po->e('copy')?>"><?php esc_html_e('Copy','loco')?></a> |
                            </span>
                            <span class="trash">
                                <a href="<?php $po->e('delete')?>"><?php esc_html_e('Delete','loco')?></a> | 
                            </span>
                            <span class="_edit">
                                <a href="<?php $po->e('info')?>"><?php esc_html_e('Info','loco')?></a>
                            </span>
                        </nav><?php
                        endif?> 
                    </td><?php

                    if( $ispo ):?> 
                    <td data-sort-value="<?php echo $po->meta->getPercent()?>">
                        <?php $po->meta->printProgress()?> 
                    </td>
                    <td title="of <?php $po->n('total')?>">
                        <?php echo $po->meta->getPercent()?>%
                    </td>
                    <td data-sort-value="<?php $po->f('todo','%u')?>">
                        <?php $po->n('todo')?> 
                    </td><?php

                    else:?> 
                    <td data-sort-value="-1">
                        -- <!-- no progress for template -->
                    </td>
                    <td>
                        <!-- no percentage for template -->
                    </td>
                    <td data-sort-value="-1">
                        -- <!-- no pendingfor template -->
                    </td><?php
                    endif?> 

                    <td data-sort-value="<?php $po->e('name')?>">
                         <a href="<?php $po->e('info')?>"><?php $po->e('name')?></a>
                    </td>
                    <td data-sort-value="<?php $po->f('time','%u')?>">
                        <time datetime="<?php $po->date('time','Y-m-d H:i:s')?>"><?php $po->date('time')?></time>
                    </td>
                    <td>
                        <?php $po->e('store')?> 
                    </td>
                </tr><?php
                endforeach;?> 
            </tbody>
        </table><?php
    else:?> 
        <table class="wp-list-table widefat fixed striped">
            <tr>
                <td><?php self::e( __('No translations found for "%s"','loco'), $domain )?></td>
            </tr>
        </table><?php    
    endif;
