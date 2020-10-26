<?php
/**
 * Generic upload template for installing a file into a translation set.
 */
$this->extend('../layout');
/* @var Loco_mvc_ViewParams $params */
?> 

<form action="" method="post" enctype="multipart/form-data" id="loco-main"><?php
    /* @var Loco_mvc_HiddenFields $hidden */
    $hidden->_e();?> 

    <div class="notice inline notice-generic">
        <h2>
            <?php self::e( __('Choose a location','loco-translate') );?> 
        </h2>
        <table class="form-table">
            <tbody class="loco-paths"><?php
                /* @var Loco_mvc_ViewParams[] $locations */
                foreach( $locations as $typeId => $location ):?> 
                <tr class="compact">
                    <td>
                        <p class="description"><?php $location->e('label')?>:</p>
                    </td>
                    <td><?php
                    /* @var Loco_mvc_ViewParams $choice */
                    /* @var Loco_mvc_FileParams $parent */
                    foreach( $location['paths'] as $choice ):
                        $parent = $choice['parent'];?> 
                        <p>
                            <label>
                                <input type="radio" name="dir" value="<?php $parent->e('relpath')?>" />
                                <code class="path"><?php $parent->e('relpath')?>/<?php echo $choice->holder?></code>
                            </label>
                        </p><?php
                    endforeach?> 
                    </td>
                </tr><?php
                endforeach?> 
            </tbody>
        </table>
    </div>
    <div class="notice inline notice-info">
        <h2>
            Upload PO file
        </h2>
        <p>
            Your file must be named as shown above where <code>{locale}</code> is the language code, e.g. <code><?php $params->e('locale')?></code>.
        </p>
        <p>
            <input type="file" name="f" />
        </p>
        <p class="submit">
            <button type="submit" class="button button-large button-primary has-icon icon-upload" disabled><?php esc_html_e('Upload','loco-translate')?></button>
        </p>
    </div>
</form>

