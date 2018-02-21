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
        $poexists = $pofile->exists();

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
        $api = new Loco_api_WordPressFileSystem;

        // data posted must be valid
        $data = Loco_gettext_Data::fromSource( $post->data );
        
        // WordPress-ize some headers that differ from JavaScript libs
        if( $locale ){
            $head = $data->getHeaders();
            $head['Language'] = strtr( $locale, '-', '_' );
        }
        
        // backup existing file before overwriting, but still allow if backups fails
        $num_backups = Loco_data_Settings::get()->num_backups;
        if( $num_backups && $poexists ){
            try {
                $api->authorizeCopy( $pofile );
                $backups = new Loco_fs_Revisions( $pofile );
                $backups->create();
                $backups->prune($num_backups);
            }
            catch( Exception $e ){
                Loco_error_AdminNotices::debug( $e->getMessage() );
                $message = __('Failed to create backup file in "%s". Check file permissions or disable backups','loco-translate');
                Loco_error_AdminNotices::warn( sprintf( $message, $pofile->getParent()->basename() ) );
            }
        }

        // commit file directly to disk
        $api->authorizeSave( $pofile );
        $bytes = $pofile->putContents( $data->msgcat() );
        $mtime = $pofile->modified();

        // add bundle to recent items on file creation
        try {
            $bundle = $this->getBundle();
            Loco_data_RecentItems::get()->pushBundle( $bundle )->persist();
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
        $success = $locale ? __('PO file saved','loco-translate') : __('POT file saved','loco-translate');
        
        // Compile MO file unless saving template
        if( $locale ){
            try {
                $mofile = $pofile->cloneExtension('mo');
                $api->authorizeSave( $mofile );
                $bytes = $mofile->putContents( $data->msgfmt() );
                $this->set( 'mobytes', $bytes );
                Loco_error_AdminNotices::success( __('PO file saved and MO file compiled','loco-translate') );
            }
            catch( Exception $e ){
                Loco_error_AdminNotices::debug( $e->getMessage() );
                Loco_error_AdminNotices::warn( __('PO file saved, but MO file compilation failed','loco-translate') );
                $this->set( 'mobytes', 0 );
            }
        }
        else {
            Loco_error_AdminNotices::success( __('POT file saved','loco-translate') );
        }

        return parent::render();
    }
    
    
}