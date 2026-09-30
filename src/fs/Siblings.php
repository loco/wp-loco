<?php
/**
 * Manages a POT or PO/MO pair and its on-disk dependants
 */
class Loco_fs_Siblings {

    private Loco_fs_File $po;

    private ?Loco_fs_File $mo = null;

    private ?Loco_fs_File $php = null;

    private string $td = '';


    /**
     * @param Loco_fs_File $file Master file, either PO/MO or POT
     */
    public function __construct( Loco_fs_File $file ){
        $ext = $file->extension();
        if( 'pot' === $ext ){
            $this->po = $file;
        }
        else if( 'po' === $ext ){
            $this->po = $file;
            $this->mo = $file->cloneExtension('mo');
        }
        else if( 'mo' === $ext ){
            $this->mo = $file;
            $this->po = $file->cloneExtension('po');
        }
        else {
            throw new InvalidArgumentException('Unexpected file extension: '.$ext);
        }
        if( $this->mo && class_exists('WP_Translation_Controller') ){
            $this->php = $this->mo->cloneExtension('l10n.php');
        }
    }


    /**
     * Set text domain explicitly, required if unknown from PO/POT file name
     */
    public function setDomain( string $domain ):void {
        $this->td = $domain ?: 'default';
    }


    /**
     * Get all dependant files (including primary po) that actually exist on disk
     * @return Loco_fs_File[]
     */
    public function expand():array {
        $siblings = [];
        // Source and binary pair
        foreach( [ $this->po, $this->mo, $this->php ] as $file ){
            if( $file && $file->exists() ){
                $siblings[] = $file;
            }
        }
        // PO revisions / backup files:
        $revs = new Loco_fs_Revisions( $this->po );
        foreach( $revs->getPaths() as $path ){
            $siblings[] = new Loco_fs_File( $path );
        }
        // JSON exports, unless in POT mode:
        if( $this->mo ){
            $siblings = array_merge($siblings,$this->getJsons($this->td));
        }
        /*/ Note that the beta "performant-translations" plugin originally used .mo.php instead of .l10n.php
        if( $this->mo && class_exists('Performant_Translations') ){
            $file = $this->mo->cloneExtension('mo.php');
            if( $file->exists() ){
                $siblings[] = $file;
            }
        }*/
        return $siblings;
    }


    public function getSource():Loco_fs_File {
        return $this->po;
    }


    public function getBinary():?Loco_fs_File {
        return $this->mo;
    }


    public function getCache():? Loco_fs_File {
        return $this->php;
    }

    
    /**
     * @param string $prefix Prefix required in case not present in PO file name
     * @return Loco_fs_File[]
     */
    public function getJsons( string $prefix ):array {
        $list = new Loco_fs_FileList;
        $name = $this->po->filename();
        $finder = new Loco_fs_FileFinder( $this->po->dirname() );
        // Handle problem that PO file has no text domain prefix
        if( $prefix && 'default' !== $prefix && preg_match('/^[a-z]{2,3}(?:_[a-z\\d_]+)?$/i',$name) ){
            $name = $prefix.'-'.$name;
        }
        // match .json files with same name as .po, suffixed with md5 hash.
        // note that JSON files are localised, so won't be found if PO has no locale suffix.
        $regex = '/^'.preg_quote($name,'/').'-[0-9a-f]{32}$/';
        /* @var Loco_fs_File $file */
        foreach( $finder->group('json')->exportGroups() as $files ) {
            foreach( $files as $file ){
                $match = $file->filename();
                if( $match === $name || preg_match($regex,$match) ) {
                    $list->add($file);
                }
            }
        }
        // append single json using our filter
        $path = apply_filters('loco_compile_single_json', '', $this->po->getPath() );
        if( is_string($path) && '' !== $path && file_exists($path) ){
            $list->add( new Loco_fs_File($path) );
        }

        return $list->getArrayCopy();
    }

}
