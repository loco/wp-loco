<?php
/**
 * Controller to edit PO file header values and sync settings
 */
class Loco_admin_file_HeadController extends Loco_admin_file_BaseController {


    /**
     * {@inheritdoc}
     */
    public function init(){
        parent::init();
        $file = $this->get('file');
        /* @var Loco_fs_File $file */
        if( $file->exists() && ! $file->isDirectory() ){
            // nonce action will be specific to file for extra security
            $path = $file->getPath();
            $action = 'head:'.$path;
            // set up view now in case of late failure
            $fields = new Loco_mvc_HiddenFields( [] );
            $fields->setNonce( $action );
            $fields['auth'] = 'update';
            $fields['path'] = $this->get('path');
            $this->set('hidden',$fields );
            // attempt update if valid nonce posted back
            while( $this->checkNonce($action) ) {
                $data = Loco_gettext_Data::load($file);
                // check some headers prior ro updating
                $head = $data->getHeaders();
                $plurals = $head['Plural-Forms'];
                // in advanced mode we will set all headers from form as-is.
                $post = Loco_mvc_PostParams::get();
                if( $post->has('headers') ){
                    $raw = (array) $post->headers;
                    $head = new LocoPoHeaders($raw);
                    $data->setHeaders($head);
                    // modifying character encoding is not currently supported
                    if( 'UTF-8' !== $head->getCharset() ){
                        Loco_error_AdminNotices::warn('Loco Translate only supports UTF-8 encoded files');
                        $head['Content-Type'] = 'text/plain; charset=UTF-8';
                    }
                }
                // in basic mode we save PO sync settings only
                else if( 'po' !== $file->extension() ){
                    throw new Exception( 'Sync settings apply to PO files only' );
                }
                else if( ! $post->has('conf') ){
                    throw new Exception( 'Unexpected post data' );
                }
                else {
                    $conf = new Loco_gettext_SyncOptions($head);
                    $raw = (array) $post->conf;
                    $conf->setTemplate( $raw['template'] );
                    $mode = isset($raw['mode']) ? $raw['mode'] : 'pot';
                    if( isset($raw['json']) ){
                        $mode .= ',json';
                    }
                    $conf->setSyncMode($mode);
                }
                // Validate and remove redundant headers
                $conf = new Loco_gettext_SyncOptions($head);
                $head = $conf->getHeaders();
                // Render PO without modifying sort order
                if( $file instanceof Loco_fs_LocaleFile && $file->getLocale()->isValid() ){
                    $compiler = new Loco_gettext_Compiler($file);
                    $compiler->writePo($data);
                    // If we save the PO we should recompile MO, but only actually required if plural forms have changed
                    if( $head['Plural-Forms'] !== $plurals ){
                        $compiler->writeMo($data);
                    }
                }
                // else save just the actual file. Probably .pot, or wrongly named .po file.
                else {
                    $api = new Loco_api_WordPressFileSystem;
                    $api->authorizeUpdate($file);
                    $file->putContents( $data->msgcat() );
                }
                // flash message for display after redirect
                try {
                    Loco_data_Session::get()->flash('success',sprintf( __('%s file saved','loco-translate'), strtoupper($file->extension()) ));
                    Loco_data_Session::close();
                }
                catch( Exception $e ){
                    // tolerate session failure
                }
                if( wp_redirect($_SERVER['REQUEST_URI']) ){
                    exit;
                }
                break;
            }
            
        }

        $bundle = $this->getBundle();
        $this->set('title', 'Configure '.$file->basename().' &lsaquo; '.$bundle->getName() );
    }




    /**
     * {@inheritdoc}
     */
    public function render(){

        $file = $this->get('file');
        $fail = $this->getFileError($file);
        if( is_string($fail) && '' !== $fail ){
            return $fail;
        }
        
        // parse PO header
        $head = Loco_gettext_Data::head($file);
        $this->set('head',$head);

        // Remote file system required if file is not directly writable
        $this->prepareFsConnect( 'update', $this->get('path') );
        $this->enqueueScript('head');

        // set simpler title for breadcrumb
        $this->set('title', $file->basename() );
        
        // localized files only can have sync settings
        $localized = $file instanceof Loco_fs_LocaleFile && $file->getLocale()->isValid();

        // Advanced mode shows all headers in one form
        if( $this->get('advanced') || ! $localized ){
            return $this->view('admin/file/head');
        }
        
        // link to advanced mode and display sync settings form (PO only)
        $this->set('advanced', $_SERVER['REQUEST_URI'].'&advanced=1' );
        
        $conf = new Loco_gettext_SyncOptions($head);
        $this->set('conf', $conf );
        
        // perform some basic validation of sync mode
        if( $conf->hasTemplate() ){
            $potfile = $conf->getTemplate();
        }
        else {
            $potfile = new Loco_fs_LocaleFile( (string) $this->getProject()->getPot() );
        }
        if( $conf->mergeMsgstr() && 'po' !== $potfile->extension() ){
            Loco_error_AdminNotices::warn('Copying translations requires template is a PO file');
        }
        if( $conf->mergeJson() && ! $potfile->getLocale()->isValid() ){
            Loco_error_AdminNotices::warn('Merging JSON files requires template has a localized file path');
        }

        // may or may not already have a custom template with a known locale
        $this->set('potName','--');
        if( $conf->hasTemplate() ){
            $file = $conf->getTemplate();
            $file->normalize( $this->getBundle()->getDirectoryPath() );
            if( ! $file->exists() ){
                Loco_error_AdminNotices::warn('Configured template does not currently exist');
            }
            $this->set('potName', $file->basename() );
        }
        // force basic POT mode for unconfigured templates
        else if( '' === $conf->getSyncMode() ){
            $conf->setSyncMode('pot');
        }

        return $this->view('admin/file/conf');
    }
    
}
