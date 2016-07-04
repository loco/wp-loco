<?php
/**
 * Ajax "download" route, for outputing raw gettext file contents.
 */
class Loco_ajax_DownloadController extends Loco_mvc_AjaxController {

    /**
     * {@inheritdoc}
     */
    public function render(){

        $post = $this->validate();

        // we need a path, but it may not need to exist
        $file = new Loco_fs_File( $this->get('path') );
        $file->normalize( loco_constant( 'WP_CONTENT_DIR') );
        $is_binary = 'mo' === strtolower( $file->extension() );

        // posted source must be clean and must parse as whatever the file extension claims to be
        if( $raw = $post->source ){
            // compile source if imaginary target is MO
            if( $is_binary ) {
                $po = new Loco_gettext_Data( loco_parse_po($raw) );
                $raw = $po->msgfmt();
            }
        }
        // else file can be output directly if it exists
        else if( $file->exists() ){
            $raw = $file->getContents();
            $do_compile = false;
        }
        /*/ else if PO exists but MO doesn't, we can compile it on the fly
        else if( ! $is_binary ){

        }*/
        else {
            throw new Loco_error_Exception('File not found and no source posted');
        }
        
        return $raw;
    }
    
    
}