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
        if( ! loco_check_extension('tokenizer') ){
            throw new Loco_error_Exception('String extraction not available without required extension');
        }
        $this->bundle = $bundle;
        $this->extractor = loco_wp_extractor();
        $this->extras = array();
        if( $default = $bundle->getDefaultProject() ){
            $domain = (string) $default->getDomain();
            // wildcard stands in for empty text domain
            if( '*' === $domain ){
                $domain = '';
                $this->extractor->setDomain('');
            }
            // extract headers from theme PHP files
            if( $bundle->isTheme() ){
                $this->extractor->headerize( array (
                    'Template Name' => 'Name of the template',
                ), $domain );
            }
            // pull bundle's default metadata. these are translations that may not be encountered in files
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
                $this->extras[$domain] = $extras;
            }
        }
    }



    /**
     * @return Loco_gettext_Extraction
     */
    public function addProject( Loco_package_Project $project ){
        $base = $this->bundle->getDirectoryPath();
        // skip files larger than configured maximum
        $opts = Loco_data_Settings::get();
        $max = wp_convert_hr_to_bytes( $opts->max_php_size );
        // *attempt* to raise memory limit to WP_MAX_MEMORY_LIMIT
        if( function_exists('wp_raise_memory_limit') ){
            wp_raise_memory_limit('loco');
        }
        /* @var $file Loco_fs_File */
        foreach( $project->findSourceFiles() as $file ){
            if( $file->size() <= $max ){
                $this->extractor->extractSource( $file->getContents(), $file->getRelativePath($base) );
            }
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