<?php
/**
 * Utility for compiling PO data to MO AND JSON files
 */
class Loco_gettext_Compiler {

    /**
     * @var Loco_api_WordPressFileSystem|null
     */
    private $fs;

    /**
     * Target file group, where we're compiling to
     * @var Loco_fs_Siblings
     */
    private $files;

    /**
     * Result when files written
     * @var Loco_fs_FileList
     */
    private $done;
    
    /**
     * @var Loco_mvc_ViewParams
     */
    private $progress;
    

    /**
     * Construct with primary file (PO) being saved
     * @param Loco_fs_File $pofile Localised PO file which may or may not exist yet
     */
    public function __construct( Loco_fs_File $pofile ){
        $this->files = new Loco_fs_Siblings($pofile);
        $this->progress = new Loco_mvc_ViewParams( [
            'pobytes' => 0,
            'mobytes' => 0,
            'numjson' => 0,
            'phbytes' => 0,
        ] );
        // Connect compiler to the file system, if writing to disk for real
        if( ! $pofile instanceof Loco_fs_DummyFile ) {
            $this->fs = new Loco_api_WordPressFileSystem;
        }
        $this->done = new Loco_fs_FileList;
    }


    /**
     * @return Loco_fs_FileList
     */
    public function writeAll( Loco_gettext_Data $po, Loco_package_Project $project = null ){
        $this->writePo($po);
        $this->writeMo($po);
        if( $project ){
            $this->writeJson($project,$po);
        }
        return $this->done;
    }


    /**
     * @return int bytes written to PO file
     * @throws Loco_error_WriteException
     */
    public function writePo( Loco_gettext_Data $po ){
        $file = $this->files->getSource();
        // Perform PO file backup before overwriting an existing PO
        if( $file->exists() && $this->fs ){
            $backups = new Loco_fs_Revisions($file);
            $backup = $backups->rotate($this->fs);
            // debug backup creation only under cli or ajax. too noisy printing on screen
            if( $backup && ( loco_doing_ajax() || 'cli' === PHP_SAPI ) && $backup->exists() ){
                Loco_error_AdminNotices::debug( sprintf('Wrote backup: %s -> %s',$file->basename(),$backup->basename() ) );
            }
        }
        $bytes = $this->writeFile( $file, $po->msgcat() );
        $this->progress['pobytes'] = $bytes;
        return $bytes;
    }


    /**
     * @return int bytes written to MO file
     */
    public function writeMo( Loco_gettext_Data $po ){
        try {
            $mofile = $this->files->getBinary();
            $bytes = $this->writeFile( $mofile, $po->msgfmt() );
        }
        catch( Exception $e ){
            Loco_error_AdminNotices::debug( $e->getMessage() );
            Loco_error_AdminNotices::warn( __('PO file saved, but MO file compilation failed','loco-translate') );
            $bytes = 0;
        }
        $this->progress['mobytes'] = $bytes;
        // write PHP cache, if WordPress >= 6.5
        if( 0 !== $bytes ){
            try {
                $this->progress['phbytes'] = $this->writePhp($po);
            }
            catch( Exception $e ){
                Loco_error_AdminNotices::debug( $e->getMessage() );
            }
        }
        return $bytes;
    }


    /**
     * @return int bytes written to .l10n.php file
     */
    private function writePhp( Loco_gettext_Data $po ){
        $phfile = $this->files->getCache();
        if( $phfile && class_exists('WP_Translation_File_PHP',false) ){
            return $this->writeFile( $phfile, Loco_gettext_PhpCache::render($po) );
        }
        return 0;
    }


    /**
     * @param Loco_package_Project $project Translation set, required to resolve script paths
     * @param Loco_gettext_Data $po PO data to export
     * @return Loco_fs_FileList All json files created
     */
    public function writeJson( Loco_package_Project $project, Loco_gettext_Data $po ){
        $domain = $project->getDomain()->getName();
        $pofile = $this->files->getSource();
        $jsons = new Loco_fs_FileList;
        // Allow plugins to dictate a single JSON file to hold all script translations for a text domain
        // authors will additionally have to filter at runtime on load_script_translation_file
        $path = apply_filters('loco_compile_single_json', '', $pofile->getPath(), $domain );
        if( is_string($path) && '' !== $path ){
            $refs = $po->splitRefs( $this->getJsExtMap() );
            if( array_key_exists('js',$refs) && $refs['js'] instanceof Loco_gettext_Data ){
                $jsonfile = new Loco_fs_File($path);
                $json = $refs['js']->msgjed($domain,'*.js');
                try {
                    if( '' !== $json ){
                        $this->writeFile($jsonfile,$json);
                        $jsons->add($jsonfile);
                    }
                }
                catch( Loco_error_WriteException $e ){
                    Loco_error_AdminNotices::debug( $e->getMessage() );
                    // translators: %s refers to a JSON file which could not be compiled due to an error
                    Loco_error_AdminNotices::warn( sprintf(__('JSON compilation failed for %s','loco-translate'),$jsonfile->basename()) );
                }
            }
        }
        // continue as per default, generating multiple per-script JSON
        else {
            $buffer = [];
            $base_dir = $project->getBundle()->getDirectoryPath();
            $extensions = array_keys( $this->getJsExtMap() );
            $refsGrep = '\\.(?:'.implode('|',$extensions).')';
            /* @var Loco_gettext_Data $fragment */
            foreach( $po->exportRefs($refsGrep) as $ref => $fragment ){
                $use = null;
                // Reference could be a js source file, or a minified version. We'll try .min.js first, then .js
                // Build systems may differ, but WordPress only supports these suffixes. See WP-CLI MakeJsonCommand.
                if( substr($ref,-7) === '.min.js' ) {
                    $paths = [ $ref, substr($ref,-7).'.js' ];
                }
                else {
                    $paths = [ substr($ref,0,-3).'.min.js', $ref ];
                }
                // Try .js and .min.js paths to check whether deployed script actually exists
                foreach( $paths as $path ){
                    // Hook into load_script_textdomain_relative_path like load_script_textdomain() does.
                    $url = $project->getBundle()->getDirectoryUrl().$path;
                    $path = apply_filters( 'load_script_textdomain_relative_path', $path, $url );
                    if( ! is_string($path) || '' === $path ){
                        continue;
                    }
                    // by default ignore js file that is not in deployed code
                    $file = new Loco_fs_File($path);
                    $file->normalize($base_dir);
                    if( apply_filters('loco_compile_script_reference',$file->exists(),$path,$domain) ){
                        $use = $path;
                        break;
                    }
                }
                // if neither exists in the bundle, this is a source path that will never be resolved at runtime
                if( is_null($use) ){
                    Loco_error_AdminNotices::debug( sprintf('Skipping JSON for %s; script not found in bundle',$ref) );
                }
                // add .js strings to buffer for this json and merge if already present
                else if( array_key_exists($use,$buffer) ){
                    $buffer[$use]->concat($fragment);
                }
                else {
                    $buffer[$use] = $fragment;
                }
            }
            if( $buffer ){
                // write all buffered fragments to their computed JSON paths
                foreach( $buffer as $ref => $fragment ) {
                    $json = $fragment->msgjed($domain,$ref);
                    if( '' === $json ){
                        Loco_error_AdminNotices::debug( sprintf('Skipping JSON for %s; no translations',$ref) );
                        continue;
                    }
                    try {
                        $jsonfile = self::cloneJson($pofile,$ref,$domain);
                        $this->writeFile( $jsonfile, $json );
                        $jsons->add($jsonfile);
                    }
                    catch( Loco_error_WriteException $e ){
                        Loco_error_AdminNotices::debug( $e->getMessage() );
                        // phpcs:ignore -- comment already applied to this string elsewhere
                        Loco_error_AdminNotices::warn( sprintf(__('JSON compilation failed for %s','loco-translate'),$ref));
                    }
                }
                $buffer = null;
            }
        }
        // clean up redundant JSONs including if no JSONs were compiled
        if( Loco_data_Settings::get()->jed_clean ){
            foreach( $this->files->getJsons($domain) as $path ){
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
     * Clone localised file as a WordPress script translation file
     * @return Loco_fs_File
     */
    private static function cloneJson( Loco_fs_File $pofile, $ref, $domain ){
        $name = $pofile->filename();
        // Theme author PO files have no text domain, but JSON files must always be prefixed
        if( $domain && 'default' !== $domain && preg_match('/^[a-z]{2,3}(?:_[a-z\\d_]+)?$/i',$name) ){
            $name = $domain.'-'.$name;
        }
        // Hashable reference is always finally unminified, as per load_script_textdomain()
        if( is_string($ref) && '' !== $ref ){
            $name .= '-'.self::hashRef($ref);
        }
        return $pofile->cloneBasename( $name.'.json' );
    }


    /**
     * Hashable reference is always finally unminified, as per load_script_textdomain()
     * @param string $ref script path relative to plugin base
     * @return string
     */
    private static function hashRef( $ref ){
        if( substr($ref,-7) === '.min.js' ) {
            $ref = substr($ref,0,-7).'.js';
        }
        return md5($ref);
    }


    /**
     * Fetch compilation summary and raise most relevant success message
     * @return Loco_mvc_ViewParams
     */
    public function getSummary(){
        $pofile = $this->files->getSource();
        // Avoid calling this unless the initial PO save was successful
        if( ! $this->progress['pobytes'] ){
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
            // translators: Success notice where %s is a file extension, e.g. "PO"
            Loco_error_AdminNotices::success( sprintf(__('%s file saved','loco-translate'),strtoupper($pofile->extension())) );
        }
        return $this->progress;
    }


    /**
     * Get all files written, not including backups.
     * @return Loco_fs_File[]
     */
    public function getFilesWritten(){
        return $this->done->getArrayCopy();
    }


    /**
     * Obtain non-standard JavaScript file extensions.
     * @return string[] where keys are PCRE safe extensions, all mapped to "js"
     */
    private function getJsExtMap(){
        $map = ['js'=>'js','jsx'=>'js'];
        $exts = Loco_data_Settings::get()->jsx_alias;
        if( is_array($exts) && $exts ){
            $exts = array_map( [__CLASS__,'pregQuote'], $exts);
            $map = array_fill_keys($exts,'js') + $map;
        }
        return $map;
    }


    /**
     * @internal
     */
    private static function pregQuote( $value ){
        return preg_quote($value,'/');
    }


    /**
     * @param Loco_fs_File $file
     * @param string $data to write to given file
     * @return int bytes written
     */
    public function writeFile( Loco_fs_File $file, $data ){
        if( $this->fs ) {
            $this->fs->authorizeSave( $file );
        }
        $bytes = $file->putContents($data);
        if( 0 !== $bytes ){
            $this->done->add($file );
        }
        return $bytes;
    }

}
