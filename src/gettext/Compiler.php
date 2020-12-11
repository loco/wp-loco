<?php
/**
 * Utility for compiling PO data to MO AND JSON files
 */
class Loco_gettext_Compiler {

    /**
     * @var Loco_api_WordPressFileSystem
     */
    private $fs;

    /**
     * @var Loco_fs_Siblings
     */
    private $files;

    /**
     * @var Loco_mvc_ViewParams
     */
    private $progress;

    /**
     * Construct with primary file (PO) being saved
     * @param Loco_fs_LocaleFile Localised PO file which may or may not exist yet
     */
    public function __construct( Loco_fs_LocaleFile $pofile ){
        $this->fs = new Loco_api_WordPressFileSystem;
        $this->files = new Loco_fs_Siblings($pofile);
        $this->progress = new Loco_mvc_ViewParams( array(
            'pobytes' => 0,
            'mobytes' => 0,
            'numjson' => 0,
        ) );
    }


    /**
     * @param Loco_gettext_Data
     * @param Loco_package_Project|null
     * @return self
     */
    public function writeAll( Loco_gettext_Data $po, Loco_package_Project $project = null ){
        $this->writePo($po);
        $this->writeMo($po);
        if( $project ){
            $this->writeJson($project,$po);
        }
        return $this;
    }


    /**
     * @param Loco_gettext_Data PO data
     * @return int bytes written to PO file
     * @throws Loco_error_WriteException
     */
    public function writePo( Loco_gettext_Data $po ){
        $file = $this->files->getSource();
        // Perform PO file backup before overwriting an existing PO
        if( $file->exists() ){
            $backups = new Loco_fs_Revisions($file);
            $backup = $backups->rotate($this->fs);
            // debug backup creation only under cli or ajax. too noisy printing on screen
            if( $backup && ( loco_doing_ajax() || 'cli' === PHP_SAPI ) && $backup->exists() ){
                Loco_error_AdminNotices::debug( sprintf('Wrote backup: %s -> %s',$file->basename(),$backup->basename() ) );
            }
        }
        $this->fs->authorizeSave($file);
        $bytes = $file->putContents( $po->msgcat() );
        $this->progress['pobytes'] = $bytes;
        return $bytes;
    }


    /**
     * @param Loco_gettext_Data PO data
     * @return int bytes written to MO file
     */
    public function writeMo( Loco_gettext_Data $po ){
        try {
            $file = $this->files->getBinary();
            $this->fs->authorizeSave($file);
            $bytes = $file->putContents( $po->msgfmt() );
            $this->progress['mobytes'] = $bytes;
        }
        catch( Exception $e ){
            Loco_error_AdminNotices::debug( $e->getMessage() );
            Loco_error_AdminNotices::warn( __('PO file saved, but MO file compilation failed','loco-translate') );
            $bytes = 0;
        }
        return $bytes;
    }


    /**
     * @param Loco_package_Project Translation set, required to resolve script paths
     * @param Loco_gettext_Data PO data to export
     * @return Loco_fs_FileList All json files created
     */
    public function writeJson( Loco_package_Project $project, Loco_gettext_Data $po ){
        $jsons = new Loco_fs_FileList;
        $pofile = $this->files->getSource();
        $base_dir = $project->getBundle()->getDirectoryPath();
        $domain = $project->getDomain()->getName();
        /* @var Loco_gettext_Data $fragment */
        foreach( $po->exportRefs('\\.js') as $ref => $fragment ){
            // Reference could be source js, or minified version.
            // Some build systems may differ, but WordPress only supports this. See WP-CLI MakeJsonCommand.
            if( substr($ref,-7) === '.min.js' ) {
                $min = $ref;
                $src = substr($ref,-7).'.js';
            }
            else {
                $src = $ref;
                $min = substr($ref,0,-3).'.min.js';
            }
            // Try both script paths to check whether deployed script actually exists
            $jsonfile = null;
            foreach( array($min,$src) as $relative ){
                $file = new Loco_fs_File($relative);
                $file->normalize($base_dir);
                if( $file->exists() ){
                    // Hook into load_script_textdomain_relative_path like load_script_textdomain() does.
                    $url = $project->getBundle()->getDirectoryUrl().$relative;
                    $relative = apply_filters( 'load_script_textdomain_relative_path', $relative, $url );
                    if( ! is_string($relative) || '' === $relative ){
                        continue;
                    }
                    // Hashable reference is always finally unminified, as per load_script_textdomain()
                    if( substr($relative,-7) === '.min.js' ) {
                        $relative = substr($relative,0,-7).'.js';
                    }
                    $name = $pofile->filename().'-'.md5($relative).'.json';
                    $jsonfile = $pofile->cloneBasename($name);
                    $jsons->add( $jsonfile );
                    break;
                }
            }
            // if neither exists in the bundle, this is a source path that will never be resolved at runtime
            if( is_null($jsonfile) ){
                Loco_error_AdminNotices::debug( sprintf('Skipping JSON for %s; script not found in bundle',$ref) );
                continue;
            }
            // ok to write JED fragment to hashed JSON file
            try {
                $this->fs->authorizeSave($jsonfile);
                $jsonfile->putContents( $fragment->msgjed($domain,$ref) );
            }
            catch( Loco_error_WriteException $e ){
                Loco_error_AdminNotices::debug( $e->getMessage() );
                Loco_error_AdminNotices::warn( sprintf(__('JSON compilation failed for %s','loco-translate'),$ref));
            }
        }
        // clean up redundant JSONs including if no JSONs were compiled
        if( Loco_data_Settings::get()->jed_clean ){
            foreach( $this->files->getJsons() as $path ){
                $jsonfile = new Loco_fs_File($path);
                if( ! $jsons->has($jsonfile) ){
                    try {
                        $jsonfile->unlink();
                    }
                    catch( Loco_error_WriteException $e ){
                        Loco_error_AdminNotices::debug('Unable to remove redundant JSON: '.$e->getMessage() );
                    }
                }
            }
        }
        $this->progress['numjson'] = $jsons->count();
        return $jsons;
    }


    /**
     * Fetch compilation summary and raise most relevant success message
     * @return Loco_mvc_ViewParams
     */
    public function getSummary(){
        $pofile = $this->files->getSource();
        // Avoid calling this unless the initial PO save was successful
        if( ! $this->progress['pobytes'] || ! $pofile->exists() ){
            throw new LogicException('PO not saved');
        }
        // Summary for localised file includes MO+JSONs
        $mobytes = $this->progress['mobytes'];
        $numjson = $this->progress['numjson'];
        if( $mobytes && $numjson ){
            Loco_error_AdminNotices::success( __('PO file saved and MO/JSON files compiled','loco-translate') );
        }
        else if( $mobytes ){
            Loco_error_AdminNotices::success( __('PO file saved and MO file compiled','loco-translate') );
        }
        else {
            // translators: Where %s is either PO or POT
            Loco_error_AdminNotices::success( sprintf(__('%s file saved','loco-translate'),strtoupper($pofile->extension())) );
        }
        return $this->progress;
    }

}
