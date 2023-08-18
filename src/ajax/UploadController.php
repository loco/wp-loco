<?php
/**
 * Ajax "upload" route, for putting translation files to the server
 */
class Loco_ajax_UploadController extends Loco_ajax_common_BundleController {

    /**
     * {@inheritdoc}
     */
    public function render(){
        $post = $this->validate();
        $href = $this->process( $post );
        //
        $this->set('redirect',$href);
        return parent::render();
    }


    /**
     * Upload processor shared with standard postback controller
     * @param Loco_mvc_ViewParams $post script input
     * @return string redirect to file edit
     */
    public function process( Loco_mvc_ViewParams $post ){
        $bundle = $this->getBundle();
        $project = $this->getProject( $bundle );
        // Chosen folder location should be valid as a posted "dir" parameter
        if( ! $post->has('dir') ){
            throw new Loco_error_Exception('No destination posted');
        }
        $base = loco_constant('WP_CONTENT_DIR');
        $parent = new Loco_fs_Directory($post->dir);
        $parent->normalize($base);
        // Loco_error_AdminNotices::debug('Destination set to '.$parent->getPath() );
        // Ensure file uploaded ok
        if( ! isset($_FILES['f']) ){
            throw new Loco_error_Exception('No file posted');
        }
        $upload = new Loco_data_Upload($_FILES['f']);
        // Uploaded file will have a temporary name, so real name extension come from _FILES metadata
        $name = $upload->getOriginalName();
        $ext = strtolower( pathinfo($name,PATHINFO_EXTENSION) );
        // Loco_error_AdminNotices::debug('Have upload: '.$name.' @ '.$upload->getPath() );
        switch( $ext ){
            case 'po':
            case 'mo':
                $pomo = Loco_gettext_Data::load($upload,$ext);
                break;
            default:
                throw new Loco_error_Exception('Only PO/MO uploads supported');
        }
        // PO/MO data is valid.
        // get real file name and establish if a locale can be extracted, otherwise get from headers
        $dummy = new Loco_fs_LocaleFile($name);
        $locale = $dummy->getLocale();
        if( ! $locale->isValid() ){
            $value = $pomo->getHeaders()->offsetGet('Language');
            $locale = Loco_Locale::parse($value);
            if( ! $locale->isValid() ){
                throw new Loco_error_Exception('Unable to detect language from '.$name );
            }
        }
        // Fail if user presents a wrongly named file. This is to avoid mixing up text domains.
        $pofile = $project->initLocaleFile($parent,$locale);
        if( $pofile->filename() !== $dummy->filename() ){
            throw new Loco_error_Exception( sprintf('File must be named %s', $pofile->filename().'.'.$ext ) );
        }
        // Avoid processing if uploaded PO file is identical to existing one
        if( $pofile->exists() && $pofile->md5() === $upload->md5() ){
            throw new Loco_error_Exception( __('Your file is identical to the existing one','loco-translate') );
        }
        // recompile all files including uploaded one
        $compiler = new Loco_gettext_Compiler($pofile);
        $compiler->writeAll($pomo,$project);

        // push recent items on file creation
        Loco_data_RecentItems::get()->pushBundle($bundle)->persist();

        // Redirect to edit this PO. Sync may be required and we're not doing automatically here.
        $type = strtolower( $this->get('type') );
        return Loco_mvc_AdminRouter::generate( sprintf('%s-file-edit',$type), [
            'path' => $pofile->getRelativePath($base),
            'bundle' => $bundle->getHandle(),
            'domain' => $project->getId(),
        ] );
    }
}