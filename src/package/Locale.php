<?php
/**
 * Provides iteration over all installed files for a given language and matches them to bundles
 */
class Loco_package_Locale {

    /**
     * @var array
     */
    private $match;

    /**
     * @var array
     */
    private $bundles;

    /**
     * Maps file paths to projects in which they were found
     * @var ArrayObject
     */
    private $index;


    /**
     * Construct with locale to filter on
     * @param Loco_Locale|null
     */
    public function __construct( Loco_locale $locale = null ){
        $this->index =  new ArrayObject;
        $this->match = [];
        if( $locale ){
            $this->addLocale( $locale );
        }
    }


    /**
     * Add another locale to search on
     * @param Loco_Locale
     * @return Loco_package_Locale
     */
    public function addLocale( Loco_Locale $locale ){
        if( $locale->isValid() ){
            $sufx = (string) $locale.'.po';
            $this->match[$sufx] = - strlen($sufx);
        }
        return $this;
    }


    /**
     * @param Loco_fs_File
     * @return Loco_package_Project|null
     */
    public function getProject( Loco_fs_File $file ){
        $path = $file->getPath();
        if( isset($this->index[$path]) ){
            return $this->index[$path];
        }
        return null;
    }


    /**
     * @return Loco_package_Bundle[]
     */
    public function getBundles(){
        $bundles = $this->bundles;
        if( ! $bundles ){
            $bundles = [ Loco_package_Core::create() ];
            $bundles = array_merge( $bundles, Loco_package_Plugin::getAll() );
            $bundles = array_merge( $bundles, Loco_package_Theme::getAll() );
            $this->bundles = $bundles;
        }
        return $bundles;
    }


    /**
     * @return loco_fs_FileList
     */
    public function findLocaleFiles(){
        $index = $this->index;
        $suffixes = $this->match;
        $list = new Loco_fs_FileList;
        foreach( $this->getBundles() as $bundle ){
            /* @var Loco_package_Project $project */
            foreach( $bundle as $project ){
                /* @var $file Loco_fs_File */
                foreach( $project->findLocaleFiles('po') as $file ){
                    $path = $file->getPath();
                    foreach( $suffixes as $sufx => $snip ){
                        if( substr($path,$snip) === $sufx ){
                            $list->add( $file );
                            $index[$path] = $project;
                            break;
                        }
                    }
                }
            }
        }
        return $list;
    }


    /**
     * @return loco_fs_FileList
     */
    public function findTemplateFiles(){
        $index = $this->index;
        $list = new Loco_fs_FileList;
        foreach( $this->getBundles() as $bundle ){
            /* @var $project Loco_package_Project */
            foreach( $bundle as $project ){
                $file = $project->getPot();
                if( $file && $file->exists() ){
                    $list->add( $file );
                    $path = $file->getPath();
                    $index[$path] = $project;
                }
            }
        }
        return $list;
    }

}
