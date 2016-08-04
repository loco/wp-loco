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
        
        // force the use of remote file system when configured from front end
        if( $post->has('connection_type') ){
            $api = new Loco_api_WordPressFileSystem;
            $api->authorizeConnect( $pofile );
        }
        
        // data posted must be valid
        $data = Loco_gettext_Data::fromSource( $post->data );
        
        // backup existing file BEFORE overwriting
        // file system write context will carry through when revisions clone pofile
        if( $num_backups = Loco_data_Settings::get()->num_backups ){
            try {
                $backups = new Loco_fs_Revisions( $pofile );
                $backups->create();
                $backups->prune($num_backups);
            }
            catch( Exception $e ){
                $message = __('Failed to create backup file in "%s". Check file permissions or disable backups','loco');
                Loco_error_AdminNotices::info( sprintf( $message, $pofile->getParent()->basename() ) );
            }
        }
                
        // commit file directly to disk
        $bytes = $pofile->putContents( $data );
        $mtime = $pofile->modified();

        // push recent items on file creation
        try {
            $bundle = $this->getBundle();
            Loco_data_RecentItems::get()->pushBundle( $bundle )->persist();
            // TODO push project and locale file
        }
        catch( Exception $e ){
            // editor permitted to save files not in a bundle, so catching failures
        }
        
        // start success data with bytes written and timestamp
        $this->set('locale', $locale );
        $this->set('pobytes', $bytes );
        $this->set('poname', $pofile->basename() );
        $this->set('modified', $mtime);
        $this->set('datetime', Loco_mvc_ViewParams::date_i18n($mtime) );
        
        // Intial message refers to PO/POT save success
        $success = $locale ? __('PO file saved','loco') : __('POT file saved','loco');
        
        // Compile MO file unless saving template
        if( $locale ){
            try {
                $data = $data->msgfmt();
                $mofile = $pofile->cloneExtension('mo');
                $bytes = $mofile->putContents( $data );
                $this->set( 'mobytes', $bytes );
                Loco_error_AdminNotices::success( __('PO file saved and MO file compiled','loco') );
            }
            catch( Exception $e ){
                Loco_error_AdminNotices::add( $e );
                Loco_error_AdminNotices::info( __('PO file saved, but MO file compilation failed','loco') );
                $this->set( 'mobytes', 0 );
            }
        }
        else {
            Loco_error_AdminNotices::success( __('POT file saved','loco') );
        }

        return parent::render();
    }
    
    
}