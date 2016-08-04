<?php
/**
 * List of bundles
 */
?> 
    <table class="wp-list-table widefat fixed striped">
        <thead>
            <th>
                <?php esc_html_e('Bundle name', 'loco')?> 
            </th>
            <th>
                <?php esc_html_e('Text domain','loco')?> 
            </th>
            <th>
                <?php esc_html_e('Last updated','loco')?> 
            </th>
            <th>
                <?php esc_html_e('Subsets','loco')?> 
            </th>
        </thead>
        <tbody><?php
            /* @var $bundle Loco_pages_ViewParams */ 
            foreach( $bundles as $bundle ):?> 
            <tr id="loco-<?php $bundle->e('id')?>">
                <td>
                    <a href="<?php $bundle->e('view')?>"><?php $bundle->e('name')?></a>
                </td>
                <td>
                    <?php $bundle->e('dflt')?> 
                </td>
                <td data-sortable="<?php $bundle->f('time','%u')?>">
                    <?php $bundle->time ? $bundle->date('time') : print '--'?> 
                </td>
                <td data-sortable="<?php $bundle->f('size','%u')?>">
                    <?php $bundle->n('size')?> 
                </td>
            </tr><?php
            endforeach;?> 
        </tbody>
    </table>