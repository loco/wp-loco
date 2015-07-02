<?php
/**
 * List of either plugins or themes that are translatable
 */
?> 

        <table class="wp-list-table widefat" cellspacing="0">
            <thead>
                <tr>
                    <th scope="col">
                        <?php Loco::h( Loco::_x('Package details','Table header') )?> 
                    </th>
                    <th scope="col">
                        <?php Loco::h( Loco::_x('Translations (PO)','Table header') )?> 
                    </th>    
                    <th scope="col">
                        <?php Loco::h( Loco::_x('Template (POT)','Table header') )?> 
                    </th>    
                    <th scope="col">
                        <?php Loco::h( Loco::_x('File permissions','Table header') )?> 
                    </th>    
                </tr>
            </thead>
            <tbody><?php 
            /* @var $package LocoPackage */
            foreach( $items as $package ): 
                unset($parent);
                extract( $package->meta() );
                $mtime = $package->get_modified();
                $n = count( $po );
                ?> 
                <tr class="inactive">
                    <td>
                        <ul class="loco-details">
                            <li title="<?php Loco::h($domain)?>">
                                <strong><?php Loco::h($package->get_name())?></strong>
                            </li><?php
                            if( isset($parent) ):?> 
                            <li>
                                <?php Loco::h( Loco::__('Extends: %s'), $parent ) ?> 
                            </li><?php 
                            endif?> 
                            <li><?php 
                                Loco::h( Loco::_n( '1 language', '%u languages', $n ), $n )?> 
                            </li><?php 
                            if( $mtime ):?> 
                            <li class="loco-mtime">
                                <small>
                                    <?php Loco::h( Loco::_x('Updated','Modified time') )?> 
                                    <?php Loco::h( LocoAdmin::format_datetime($mtime) )?> 
                                </small>
                            </li><?php
                            endif?> 
                        </ul>
                    </td>
                    <td>
                        <ul>
                            <li class="loco-add">
                                <?php echo LocoAdmin::msginit_link( $package, $domain )?> 
                            </li><?php
                            /* @var $po_locale LocoLocale */
                            foreach( $po as $po_data ):
                                extract( $po_data, EXTR_PREFIX_ALL, 'po' );
                                $code = $po_locale->get_code();
                                $label = $code ? $code.' : '.$po_locale->get_name() : $po_name;
                            ?> 
                            <li class="loco-edit-po">
                                <?php echo LocoAdmin::edit_link( $package, $po_path, $label, $po_locale->icon_class() )?> 
                                <small class="loco-progress" title="<?php echo $po_stats['p']?>">
                                    <?php echo $po_stats['p']?>%
                                </small>
                            </li><?php
                            endforeach;?> 
                        </ul>
                    </td>
                    <td>
                        <ul><?php // show POT files (should be no more than one)
                        if( $pot ):
                            foreach( $pot as $pot_data ):
                                extract( $pot_data, EXTR_PREFIX_ALL, 'pot' );
                            ?> 
                            <li class="loco-edit-pot">
                                <?php echo LocoAdmin::edit_link( $package, $pot_path )?> 
                            </li><?php
                            endforeach;
                         else:?> 
                            <li class="loco-add">
                                <?php echo LocoAdmin::xgettext_link( $package )?> 
                            </li><?php 
                         endif?> 
                        </ul>
                    </td>
                    <td>
                        <ul><?php 
                        try {
                            $package->check_permissions();?> 
                            <li class="loco-ok">
                                <?php echo LocoAdmin::fscheck_link( $package, $domain, Loco::_x('OK','Message label') )?> 
                            </li><?php
                        }
                        catch( Exception $Ex ){?> 
                            <li class="loco-warning">
                                <?php echo LocoAdmin::fscheck_link( $package, $domain, $Ex->getMessage() )?> 
                            </li><?php
                        }?> 
                        </ul>
                    </td>
                </tr><?php 
                endforeach?> 
            </tbody>
        </table>
        