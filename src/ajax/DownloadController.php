<?php
/**
 * Ajax "download" route, for outputting raw gettext file contents.
 */
class Loco_ajax_DownloadController extends Loco_ajax_common_BundleController {

    /**
     * {@inheritdoc}
     */
    public function allowedParams():array {
        return parent::allowedParams() + [
            'path' => '',
        ];
    }


    /**
     * Build language pack from PO source text posted from the editor.
     * Path is provided only for file naming. No files are read from disk.
     */
    private function renderArchive( string $path ):string {

        $zipfile = new Loco_fs_File($path);
        $pofile = new Loco_fs_DummyFile( '/fake/'.$zipfile->filename().'.po');

        // Resolving script refs requires configured project
        $bundle = $this->getBundle();
        $project = $this->getProject($bundle);
        
        // Create a temporary file for zip, which must work on disk, not in memory
        $path = wp_tempnam();
        if( ! $path || ! file_exists($path) ){
            throw new Loco_error_Exception('Failed to create temporary file for zip archive');
        }
        register_shutdown_function('unlink',$path);
        
        // initialize zip
        // TODO PHP 8.4 Using empty file as ZipArchive is deprecated
        loco_check_extension('zip');
        $z = new ZipArchive;
        $z->open( $path, ZipArchive::CREATE);
        $z->setArchiveComment( $bundle->getName() );
        
        // compile from posted source
        $post = Loco_mvc_PostParams::get();
        $raw = $post->source;
        if( ! is_string($raw) || '' === $raw ) {
            throw new Loco_error_Exception('No source posted');
        }
        $data = Loco_gettext_Data::fromSource($raw);
        $compiler = new Loco_gettext_Compiler($pofile);
        
        /* @var Loco_fs_DummyFile $file */
        foreach( $compiler->writeAll($data,$project) as $file ){
            $z->addFromString( $file->basename(), $file->getContents() );
        }
        $z->close();
        
        return file_get_contents($path);
    }


    /**
     * {@inheritdoc}
     */
    public function render(){
        $post = $this->validate();
        $path = $this->get('path');

        // Download options are source, archive or binary.
        // The UI now replaces separate po/mo downloads with a single .zip, but requires the ZipArchive extension is installed.
        if( '.zip' === substr($path,-4) ){
            return $this->renderArchive($path);
        }

        // Non-zip downloads are for direct .po/pot downloads (source), plus .mo (binary) - edge case when no source.
        $file = new Loco_fs_File($path);
        $file->normalize( loco_constant('WP_CONTENT_DIR') );
        $ext = Loco_gettext_Data::ext($file);
        
        // posted source must be clean and must parse as whatever the file extension claims to be
        // this is not a disk read, and can only echo back the submitted data.
        $raw = $post->source;
        if( is_string($raw) && '' !== $raw ){
            // compile source if target is MO, because the editor never posts binary data
            if( 'mo' === $ext ) {
                $raw = Loco_gettext_Data::fromSource($raw)->msgfmt();
            }
            // likewise for .l10n.php output, if both PO and MO are missing
            else if( 'php' === $ext && class_exists('WP_Translation_File_PHP',false) ){
                $raw = Loco_gettext_PhpCache::render( Loco_gettext_Data::fromSource($raw) );
            }
        }
        // If no source is posted, the file can be output directly if it exists and is permitted. 
        else if( ! $file->exists() ){
            throw new Loco_error_Exception('File not found and no source posted');
        }
        // This is reached via the file info tab, not the editor.
        // Supported options are only those renderable via Loco_admin_file_InfoController
        else if( ! in_array($ext,['po','mo','pot']) ){
            throw new Loco_error_Exception('Unsupported file type');
        }
        else {
            $raw = $file->getContents();
        }

        // Observe UTF-8 BOM setting for PO and POT only
        if( 'po' === $ext || 'pot' === $ext ){
            $has_bom = "\xEF\xBB\xBF" === substr($raw,0,3);
            $use_bom = (bool) Loco_data_Settings::get()->po_utf8_bom;
            // only alter valid UTF-8. Deferring detection overhead until required 
            if( $has_bom !== $use_bom && preg_match('//u',$raw) ){
                if( $use_bom ){
                    $raw = "\xEF\xBB\xBF".$raw; // prepend
                }
                else {
                    $raw = substr($raw,3); // strip bom
                }
            }
        }

        return $raw;
    }

}
