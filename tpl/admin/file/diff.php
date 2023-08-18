<?php
/**
 * File revisions and rollback UI
 */
$this->extend('../layout');
$dfmt = _x( 'j M @ H:i', 'revision date short format', 'default' );
/* @var Loco_mvc_ViewParams $master */
?> 

    <div class="revisions loading" id="loco-ui">
        <form class="revisions-control-frame" action="" method="post" enctype="application/x-www-form-urlencoded">
            <div class="loco-clearfix">
                <div class="revisions-previous jshide">
                    <button type="button" class="button" disabled><?php echo esc_attr_x('Previous','Button label for a previous revision','loco-translate'); ?></button>
                </div>
                <div class="revisions-next jshide">
                    <button type="button" class="button" disabled><?php echo esc_attr_x('Next','Button label for a next revision','loco-translate');?></button>
                </div>
            </div>
            <div class="revisions-meta loco-clearfix">
                <div class="diff-meta diff-right">
                    <span>Current revision saved <?php $master->e('reltime')?></span><br />
                    <time><?php $master->date('mtime',$dfmt)?></time><br />
                    <button type="button" class="button disabled" disabled>Restore</button>
                </div><?php
                /* @var Loco_mvc_FileParams[] $files */
                foreach( $files as $i => $file ):?> 
                <div class="diff-meta jshide">
                    <span><?php $file->e('name')?></span><br />
                    <time><?php $file->date('potime',$dfmt)?></time><br />
                    <button type="submit" class="button button-primary" name="backup" value="<?php $file->e('relpath')?>"><?php esc_html_e('Restore','loco-translate')?></button>
                    <button type="submit" class="button button-danger" name="delete" value="<?php $file->e('relpath')?>"><?php esc_html_e('Delete','loco-translate')?></button>
                </div><?php
                endforeach?> 
            </div><?php
            /* @var Loco_mvc_HiddenFields $hidden */
            $hidden->_e();?> 
        </form>
        <div class="revisions-diff-frame jsonly">
            <div class="revisions-diff">
                <div class="loading-indicator"><span class="spinner"></span></div>
                <div class="diff"></div>
             </div>
        </div>
    </div>
