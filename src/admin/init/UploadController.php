<?php
/**
 * File upload initializer.
 * Uploads a PO file to the bundle and compiles MO.
 */
class Loco_admin_init_UploadController extends Loco_admin_bundle_BaseController {

    /**
     * {@inheritdoc}
     **/
    public function init() {
        parent::init();
        // Use Ajax controller for standard postback
        if( $this->checkNonce('upload') ){
            try {
                $ctrl = new Loco_ajax_UploadController;
                $ctrl->_init($_POST);
                $href = $ctrl->process( Loco_mvc_PostParams::get() );
                if( wp_redirect($href) ){
                    exit;
                }
            }
            catch( Exception $e ){
                Loco_error_AdminNotices::add( Loco_error_Exception::convert($e) );
            }
        }
        // Set page title before render sets inline title
        $bundle = $this->getBundle();
        $this->set('title', __('Upload','loco-translate').' &lsaquo; '.$bundle->getName() );
    }


    /**
     * {@inheritdoc}
     */
    public function render(){
        // file upload requires a properly configured project
        $bundle = $this->getBundle();
        $project = $this->getProject();
        $fields = new Loco_mvc_HiddenFields( array(
            'path' => '',
            'auth' => 'upload',
            'type' => $bundle->getType(),
            'domain' => $project->getId(),
            'bundle' => $bundle->getHandle(),
        ) );
        $fields->setNonce('upload');
        $this->set('hidden',$fields);
        $this->prepareFsConnect('upload','');
        // standard bundle navigation with link back to overview
        $breadcrumb = $this->prepareNavigation();
        $breadcrumb->add( __('Upload a translation file','loco-translate') );
        $this->set( 'breadcrumb', $breadcrumb );
        // we won't know the locale until the file is uploaded, so use a dummy for location choice
        $locale = new Loco_Locale('zxx');
        $filechoice = $this->getProject()->initLocaleFiles($locale);
        // 
        $locations = array();
        /* @var Loco_fs_LocaleFile $pofile */
        foreach( $filechoice as $pofile ){
            // initialize location type (system, etc..)
            $parent = new Loco_fs_LocaleDirectory( $pofile->dirname() );
            $typeId = $parent->getTypeId();
            if( ! isset($locations[$typeId]) ){
                $locations[$typeId] = new Loco_mvc_ViewParams( array(
                    'label' => $parent->getTypeLabel($typeId),
                    'paths' => array(),
                ) );
            }
            $locations[$typeId]['paths'][] = new Loco_mvc_ViewParams( array(
                'parent' => Loco_mvc_FileParams::create($parent),
                'holder' => str_replace('zxx.po','{locale}</span>.po', $pofile->basename() ),
            ) );
        }
        // we don't know what the specifics will be until a location is chosen and a file is presented.
        $this->set('locale',get_locale());
        $this->set('locations', $locations );
        // file upload will be done via ajax if possible
        $settings = Loco_data_Settings::get();
        $this->set('js',new Loco_mvc_ViewParams( array (
            'multipart' => (bool) $settings->ajax_files,
            'nonces' => array( 'upload' => $fields->getNonce() ),
        ) ) );
        $this->enqueueScript('upload');
        return $this->view('admin/init/upload');
    }

}