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
                foreach( $pairs as $po ):?> 
                <tr>
                    <td class="has-row-actions" data-sort-value="<?php $po->e('lname')?>">
                        <a href="<?php $po->e('edit')?>" class="row-title">
                            <span <?php echo $po->lattr?>><code><?php $po->e('lcode')?></code></span>
                            <span><?php $po->e('lname')?></span>
                        </a>
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
                        </nav>
                    </td>
                    <td data-sort-value="<?php echo $po->meta->getPercent()?>">
                        <?php $po->meta->printProgress()?> 
                    </td>
                    <td title="of <?php $po->n('total')?>">
                        <?php echo $po->meta->getPercent()?>%
                    </td>
                    <td data-sort-value="<?php $po->f('todo','%u')?>">
                        <?php $po->n('todo')?> 
                    </td>
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
                <td><?php esc_attr_e('No translation files found','loco');?></td>
            </tr>
        </table><?php    
    endif;
