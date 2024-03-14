<?php
/**
 * Base class for a file resource belonging to a bundle
 * Root > List > Bundle > Resource
 */
abstract class Loco_admin_file_BaseController extends Loco_admin_bundle_BaseController {
    
    /**
     * @var Loco_Locale
     */
    private $locale;


    /**
     * @return Loco_Locale
     */
    protected function getLocale(){
        return $this->locale;
    }


    /**
     * Check file is valid or return error
     * @return string rendered error
     */
    protected function getFileError( Loco_fs_File $file = null ){
        // file must exist for editing
        if( is_null($file) || ! $file->exists() ){
            return $this->view( 'admin/errors/file-missing', [] );
        }
        if( $file->isDirectory() ){
            $this->set('info', Loco_mvc_FileParams::create($file) );
            return $this->view( 'admin/errors/file-isdir', [] );
        }
        // security validations
        try {
            Loco_gettext_Data::ext( $file );
        }
        catch( Exception $e ){
            return $this->view( 'admin/errors/file-sec', [ 'reason' => $e->getMessage() ] );
        }

        return '';
    }


    /**
     * Set template title argument for a file
     * @return void
     */
    protected function setFileTitle( Loco_fs_File $file, $format = '%s' ){
        $name = Loco_mvc_ViewParams::format($format,[$file->basename()]);
        // append folder location for translation files
        if( in_array( $file->extension(), ['po','mo'] ) ){
            $dir = new Loco_fs_LocaleDirectory( $file->dirname() );
            $type = $dir->getTypeLabel( $dir->getTypeId() );
            $name .= ' ('.mb_strtolower($type,'UTF-8').')';
        }
        $this->set('title', $name );
    }


    /**
     * {@inheritdoc}
     */
    public function init(){
        parent::init();

        // views at this level are always related to a file 
        // file is permitted to be missing during this execution.
        $path = $this->get('path');
        if( ! $path ){
            throw new Loco_error_Exception('path argument required');
        }
        $file = new Loco_fs_LocaleFile( $path );
        $file->normalize( loco_constant('WP_CONTENT_DIR') );
        $ext = strtolower( $file->extension() );
        // POT file has no locale
        if( 'pot' === $ext ){
            $locale = null;
            $localised = false;
        }
        // else file may have a locale suffix (unless invalid, such as "default.po")
        else {
            $locale = $file->getLocale();
            $localised = $locale->isValid();
        }
        
        if( $localised ){
            $this->locale = $locale;
            $code = (string) $locale;
            $this->set( 'locale', new Loco_mvc_ViewParams( [
                'code' => $code,
                'lang' => $locale->lang,
                'icon' => $locale->getIcon(),
                'name' => $locale->ensureName( new Loco_api_WordPressTranslations ),
                'href' => Loco_mvc_AdminRouter::generate('lang-view', ['locale'=>$code] ),
            ] ) );
        }
        else {
            $this->set( 'locale', null );
        }

        $this->set('file', $file );
        $this->set('filetype', strtoupper($ext) );
        $this->set('title', $file->basename() );
    
        // navigate up to root from this bundle sub view
        $bundle = $this->getBundle();
        $breadcrumb = Loco_admin_Navigation::createBreadcrumb( $bundle );
        $this->set( 'breadcrumb', $breadcrumb );
        
        // navigate between sub view siblings for this resource
        $tabs = new Loco_admin_Navigation;
        $this->set( 'tabs', $tabs );
        $actions =  [
            'file-edit' => __('Editor','loco-translate'),
            'file-view' => __('Source','loco-translate'),
            'file-info' => __('File info','loco-translate'),
            'file-diff' => __('Restore','loco-translate'),
            'file-move' => $localised ? __('Relocate','loco-translate') : null,
            'file-delete' => __('Delete','loco-translate'),
        ];
 
        $suffix = $this->get('action');
        $prefix = $this->get('type');
        $args = array_intersect_key($_GET,['path'=>1,'bundle'=>1,'domain'=>1]);
        foreach( $actions as $action => $name ){
            if( is_string($name) ){
                $href = Loco_mvc_AdminRouter::generate( $prefix.'-'.$action, $args );
                $tabs->add( $name, $href, $action === $suffix );
            }
        }
        
        // Provide common language creation link if project scope is valid
        $project = $this->getOptionalProject();
        if( $project ){
            $args = [ 'bundle' => $bundle->getHandle(), 'domain' => $project->getId() ];
            $this->set( 'msginit', new Loco_mvc_ViewParams(  [
                'href' => Loco_mvc_AdminRouter::generate( $prefix.'-msginit', $args ),
                'text' => __('New language','loco-translate'),
            ] ) );
        }
    }



    /**
     * {@inheritdoc}
     */
    public function view( $tpl, array $args = [] ){
        
        if( $breadcrumb = $this->get('breadcrumb') ){
            
            // Add project name into breadcrumb if not the same as bundle name
            try {
                $project = $this->getProject();
                if( $project->getName() !== $this->getBundle()->getName() ){
                    $breadcrumb->add( $project->getName() );
                }
            }
            catch( Loco_error_Exception $e ){
                // ignore missing project in breadcrumb
            }
            
            // Always add page title as final breadcrumb element
            $breadcrumb->add( $this->get('title')?:'Untitled' );
        }
        
        return parent::view( $tpl, $args );
    }


}