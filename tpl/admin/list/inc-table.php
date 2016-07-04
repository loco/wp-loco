<?php
/**
 * List of bundles
 */
?> 
    <table class="wp-list-table widefat fixed striped">
        <thead>
            <th><?php
            switch( $params->type ): 
                case 'theme':  esc_html_e('Theme name',  'loco'); break;
                case 'plugin': esc_html_e('Plugin name', 'loco'); break;
                default: esc_html_e('Bundle name', 'loco');
            endswitch?> 
            </th>
            <th>
                <?php esc_html_e('Text domain','loco')?> 
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
                <td>
                    <?php $bundle->n('size')?> 
                </td>
            </tr><?php
            endforeach;?> 
        </tbody>
    </table>