<?php
/**
 * Ajax "download" route, for outputting raw gettext file contents.
 */
class Loco_ajax_DownloadController extends Loco_ajax_common_BundleController {


    /**
     * @return string
     */
    private function renderArchive( $path ){

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
        loco_check_extension('zip');
        $z = new ZipArchive;
        $z->open( $path, ZipArchive::CREATE);
        $z->setArchiveComment( $bundle->getName() );
        
        $post = Loco_mvc_PostParams::get();
        $data = Loco_gettext_Data::fromSource($post->source);
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

        // The UI now replaces .mo with .zip, but requires the ZipArchive extension is installed.
        if( '.zip' === substr($path,-4) ){
            return $this->renderArchive($path);
        }

        // Below is for direct .po/pot downloads, plus legacy .mo/l10n.php
        // mo is only used when zip is not available. php works but not hooked into UI.
        $file = new Loco_fs_File($path);
        $file->normalize( loco_constant('WP_CONTENT_DIR') );
        $ext = Loco_gettext_Data::ext($file);

        // posted source must be clean and must parse as whatever the file extension claims to be
        $raw = $post->source;
        if( is_string($raw) && '' !== $raw ){
            // compile source if target is MO
            if( 'mo' === $ext ) {
                $raw = Loco_gettext_Data::fromSource($raw)->msgfmt();
            }
            // supporting .l10n.php for WordPress >= 6.5
            else if( 'php' === $ext && class_exists('WP_Translation_File_PHP',false) ){
                $raw = Loco_gettext_PhpCache::render( Loco_gettext_Data::fromSource($raw) );
            }
        }
        // else file can be output directly if it exists.
        // note that files on disk will not be parsed or manipulated. they will download strictly as-is
        else if( $file->exists() ){
            $raw = $file->getContents();
        }
        // else we can't do anything except bail
        else {
            throw new Loco_error_Exception('File not found and no source posted');
        }

        // Observe UTF-8 BOM setting for PO and POT only
        if( 'po' === $ext || 'pot' === $ext ){
            $has_bom = "\xEF\xBB\xBF" === substr($raw,0,3);
            $use_bom = (bool) Loco_data_Settings::get()->po_utf8_bom;
            // only alter file if valid UTF-8. Deferring detection overhead until required 
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
