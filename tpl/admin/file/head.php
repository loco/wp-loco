<?php
/**
 * PO/POT headers form
 */
$this->extend('../layout');
?>

<div class="panel">
    <h3>
        <?php esc_html_e('Edit file headers','loco-translate');?> 
    </h3>

    <form action="" method="post" enctype="application/x-www-form-urlencoded" id="loco-main"><?php
        /* @var Loco_mvc_HiddenFields $hidden */
        $hidden->_e();?> 
    
        <table class="form-table">
            <tbody><?php
            /* @var LocoPoHeaders $head */
            foreach( $head as $key => $value ): if( preg_match('/^[-A-Za-z]+$/',$key) ):?> 
            <tr>
                <th scope="row">
                    <label for="loco-header-<?php echo $key?>"><?php echo $key?></label>
                </th>
                <td>
                    <input type="text" name="headers[<?php echo $key?>]" value="<?php self::e($value) ?>" size="100" id="loco-header-<?php echo $key?>" />
                </td>
            </tr><?php
            endif; endforeach;?> 
            </tbody>
        </table>
    
        <p class="submit">
            <button type="submit" class="button button-primary" disabled><?php esc_html_e('Save','loco-translate')?></button>
        </p>

    </form>

</div>