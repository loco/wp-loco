<?php

loco_require_lib('compiled/gettext.php');

/**
 * 
 */
class Loco_gettext_Extraction {

    /**
     * @var Loco_package_Bundle
     */    
    private $bundle;

    /**
     * @var LocoPHPExtractor
     */    
    private $extractor;

    /**
     * Extra strings to be pushed into domains
     * @var array
     */
    private $extras;


    public function __construct( Loco_package_Bundle $bundle ){
        $this->bundle = $bundle;
        $this->extractor = loco_wp_extractor();
        $this->extras = array();
        // pull bundle's default metadata. these are translations that may not be encountered in files
        if( $default = $bundle->getDefaultProject() ){
            $extras = array();
            $header = $bundle->getHeaderInfo();
            foreach( $bundle->getMetaTranslatable() as $prop => $notes ){
                if( $source = $header->__get($prop) ){
                    if( is_string($source) ){
                        $extras[] = array( $source, $notes );
                    }
                }
            }
            if( $extras ){
                $domain = (string) $default->getDomain();
                $this->extras[$domain] = $extras;
            }
        }
    }


    /**
     * @return Loco_gettext_Extraction
     */
    public function addProject( Loco_package_Project $project ){
        $base = $this->bundle->getDirectoryPath();
        /* @var $file Loco_fs_File */
        foreach( $project->findSourceFiles() as $file ){
            $tokens = token_get_all( $file->getContents() );
            $this->extractor->extract( $tokens, $file->getRelativePath($base) );
        }
        return $this;
    }



    /**
     * Add metadata strings deferred from construction. Note this will alter domain counts
     * @return Loco_gettext_Extraction
     */
    public function includeMeta(){
        foreach( $this->extras as $domain => $extras ){
            foreach( $extras as $args ){
                $this->extractor->pushMeta( $args[0], $args[1], $domain );
            }
        }
        $this->extras = array();
        return $this;
    }



    /**
     * Get number of unique strings across all domains extracted (excluding additional metadata)
     * @return array { default: x, myDomain: y }
     */
    public function getDomainCounts(){
        return $this->extractor->getDomainCounts();
    }


    /**
     * Pull extracted data into POT, filtering out any unwanted domains 
     * @return Loco_gettext_Data
     */
    public function getTemplate( $domain ){
        $raw = $this->extractor->filter( $domain );
        $data = new Loco_gettext_Data( $raw );
        return $data->templatize();
    }    
    
    
    /**
     * Get total number of strings extracted from all domains, excluding additional metadata
     * @return int
     */
    public function getTotal(){
        return $this->extractor->getTotal();
    }
     
}