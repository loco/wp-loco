<?php
/**
 * Confirmation form for moving localized files to a new location.
 */
$this->extend('../layout');

/* @var Loco_mvc_ViewParams $current */
/* @var Loco_mvc_ViewParams[] $locations */
?>

<form action="" method="post" enctype="application/x-www-form-urlencoded" id="loco-move"><?php
    /* @var Loco_mvc_HiddenFields $hidden */
    $hidden->_e();?> 
    <div class="notice inline notice-generic">
        <h2>
            Choose a new location for these translations
        </h2>
        <table class="form-table">
            <tbody class="loco-paths"><?php
                foreach( $locations as $typeId => $location ):?> 
                <tr class="compact">
                    <td>
                        <p class="description"><?php $location->e('label')?>:</p>
                    </td>
                    <td><?php
                        /* @var Loco_mvc_FileParams $choice */
                        foreach( $location['paths'] as $choice ):?> 
                        <p><?php
                            if( $choice->active ):?> 
                            <label>
                                <input type="radio" name="dest" value="" disabled checked /><?php
                            else:?> 
                            <label>
                                <input type="radio" name="dest" value="<?php $choice->e('path')?>" /><?php
                            endif?>
                                <code class="path"><?php $choice->e('path')?></code>
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
            Confirm relocation
        </h2>
        <p>
            The following files will be moved/renamed to the new location:<?php
            /* @var Loco_fs_File[] $files */
            foreach( $files as $file ):
            echo '<div>',$params->escape( $file->basename() ),'</div>';
            endforeach?> 
        </p>
        <p class="submit">
            <button type="submit" class="button button-primary" disabled><?php esc_html_e('Move files','loco-translate')?></button>
        </p>
    </div>
</form>

