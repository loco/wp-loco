<?php
/**
 * Ajax "save" route, for saving editor contents to disk
 */
class Loco_ajax_SaveController extends Loco_mvc_AjaxController {
    
    
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
        
        // data posted must be valid
        $data = Loco_gettext_Data::fromSource( $post->data );
        
        // avoid total failure when some things don't work
        $errors = array();
        
        // backup existing file BEFORE overwriting
        if( $pofile->exists() ){
            if( $num_backups = Loco_data_Settings::get()->num_backups ){
                try {
                    $backups = new Loco_fs_Revisions( $pofile );
                    $backups->create();
                    $backups->prune($num_backups);
                }
                catch( Exception $e ){
                    $message = __('Failed to create backup file in "%s". Check the folder is writable or disable backups','loco');
                    $errors[] = sprintf( $message, $pofile->getParent()->basename() );
                }
            }
        }
                
        // commit file directly to disk
        $bytes = $pofile->putContents( $data );
        $mtime = $pofile->modified();
        
        // start success data with bytes written and timestamp
        $this->set('locale', $locale );
        $this->set('pobytes', $bytes );
        $this->set('poname', $pofile->basename() );
        $this->set('modified', $mtime);
        $this->set('datetime', Loco_mvc_ViewParams::date_i18n($mtime) );
        
        // compile MO file unless saving template
        if( $locale ){
            try {
                $data = $data->msgfmt();
                $mofile = $pofile->cloneExtension('mo');
                $bytes = $mofile->putContents( $data );
                $this->set( 'mobytes', $bytes );
            }
            catch( Exception $e ){
                $errors[] = $e->getMessage();
                $this->set( 'mobytes', 0 );
            }
        }

        return parent::render();
    }
    
    
}