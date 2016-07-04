<?php
/**
 * Table of localised file pairs in a project
 */
    if( $pairs ):?> 

        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th>
                        <?php esc_html_e('Language','loco')?> 
                    </th>
                    <th colspan="2">
                        <?php esc_html_e('Translation progress','loco')?> 
                    </th>
                    <th>
                        <?php esc_html_e('Pending','loco')?> 
                    </th>
                    <th>
                        <?php esc_html_e('File info','loco')?> 
                    </th>
                    <th>
                        <?php esc_html_e('Last modified','loco')?> 
                    </th>
                    <th>
                        <?php esc_html_e('Folder','loco')?> 
                    </th>
                </tr>
            </thead>
            <tbody><?php
                /* @var $po Loco_pages_ViewParams */
                foreach( $pairs as $po ):?> 
                <tr>
                    <td class="has-row-actions">
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
                    <td>
                        <?php $po->meta->printProgress()?> 
                    </td>
                    <td title="of <?php $po->n('total')?>">
                        <?php echo $po->meta->getPercent()?>%
                    </td>
                    <td>
                        <?php $po->n('todo')?> 
                    </td>
                    <td>
                         <a href="<?php $po->e('info')?>"><?php $po->e('name')?></a>
                    </td>
                    <td>
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
