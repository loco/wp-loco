<?php
/**
 * Ajax "save" route, for saving editor contents to disk
 */
class Loco_ajax_SaveController extends Loco_ajax_common_BundleController {

    /**
     * {@inheritdoc}
     */
    public function render(){
        
        $post = $this->validate();
        
        // path parameter must not be empty
        $path = $post->path;
        if( ! $path ){
            throw new InvalidArgumentException('Path parameter required');
        }
        
        // locale must be posted to indicate whether PO or POT
        $locale = $post->locale;
        if( is_null($locale) ){
            throw new InvalidArgumentException('Locale parameter required');
        }

        $pofile = new Loco_fs_LocaleFile( $path );
        $pofile->normalize( loco_constant('WP_CONTENT_DIR') );

        // ensure we only deal with PO/POT source files.
        // posting of MO file paths is permitted when PO is missing, but we're about to fix that
        $ext = $pofile->extension();
        if( 'mo' === $ext ){
            $pofile = $pofile->cloneExtension('po');
        }
        else if( 'pot' === $ext ){
            $locale = '';
        }
        else if( 'po' !== $ext ){
            throw new Loco_error_Exception('Invalid file path');
        }
        
        // Prepare compiler for all save operations. PO/MO/JSON, or just POT
        $compiler = new Loco_gettext_Compiler($pofile);

        // data posted may be either 'multipart/form-data' (recommended for large files)
        if( isset($_FILES['po']) ){
            $data = Loco_gettext_Data::fromSource( Loco_data_Upload::src('po') );
        }
        // else 'application/x-www-form-urlencoded' by default
        else {
            $data = Loco_gettext_Data::fromSource( $post->data );
        }
        
        // WordPress-ize some headers that differ from that sent from JavaScript
        if( $locale ){
            $head = $data->getHeaders();
            $head['Language'] = strtr( $locale, '-', '_' );
        }

        // commit PO file directly to disk
        $bytes = $compiler->writePo($data);
        $mtime = $pofile->modified();

        // start success data with bytes written and timestamp
        $this->set('locale', $locale );
        $this->set('pobytes', $bytes );
        $this->set('poname', $pofile->basename() );
        $this->set('modified', $mtime);
        $this->set('datetime', Loco_mvc_ViewParams::date_i18n($mtime) );

        // add bundle to recent items on file creation
        // editor permitted to save files not in a bundle, so catching failures
        try {
            $bundle = $this->getBundle();
            Loco_data_RecentItems::get()->pushBundle($bundle)->persist();
        }
        catch( Exception $e ){
            $bundle = null;
        }

        // Compile MO and JSON files if PO is localised and not POT (template)
        if( $locale ){
            $mobytes = $compiler->writeMo($data);
            $numjson = 0;
            // Project required for JSON writes
             if( $bundle ){
                $project = $this->getProject($bundle);
                $jsons = $compiler->writeJson($project,$data);
                $numjson = $jsons->count();
            }
            $this->set( 'mobytes', $mobytes );
            $this->set( 'numjson', $numjson );
        }

        // Final summary depending on whether MO and JSON compiled
        $compiler->getSummary();
        return parent::render();
    }
    
    
}