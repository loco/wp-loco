<?php

loco_require_lib('compiled/gettext.php');

/**
 * String extraction from source code.
 */
class Loco_gettext_Extraction {

    /**
     * @var Loco_package_Bundle
     */    
    private $bundle;

    /**
     * @var LocoExtracted
     */
    private $extracted;

    /**
     * Extra strings to be pushed into domains
     * @var array
     */
    private $extras = [];

    /**
     * List of files skipped due to memory limit
     * @var Loco_fs_FileList|null
     */
    private $skipped;

    /**
     * Size in bytes of largest file encountered
     * @var int
     */
    private $maxbytes = 0;


    /**
     * Initialize extractor for a given bundle
     */
    public function __construct( Loco_package_Bundle $bundle ){
        loco_check_extension('ctype');
        if( ! loco_check_extension('tokenizer') ){
            throw new Loco_error_Exception('String extraction not available without required extension');
        }
        $this->bundle = $bundle;
        $this->extracted = new LocoExtracted;
        $this->extracted->setDomain('default');
        $default = $bundle->getDefaultProject();
        if( $default instanceof Loco_package_Project ){
            $domain = $default->getDomain()->getName();
            // wildcard stands in for empty text domain, meaning unspecified or dynamic domains will be included.
            // note that strings intended to be in "default" domain must specify explicitly, or be included here too.
            if( '*' === $domain ){
                $domain = '';
                $this->extracted->setDomain('');
            }
            // pull bundle's default metadata. these are translations that may not be encountered in files
            $extras = [];
            $header = $bundle->getHeaderInfo();
            foreach( $bundle->getMetaTranslatable() as $prop => $notes ){
                $text = $header->__get($prop);
                if( is_string($text) && '' !== $text ){
                    $extras[] = ['source'=>$text, 'notes'=>$notes ];
                }
            }
            if( $extras ){
                $this->extras[$domain] = $extras;
            }
        }
    }


    /**
     * @return self
     */
    public function addProject( Loco_package_Project $project ){
        $base = $this->bundle->getDirectoryPath();
        $domain = (string) $project->getDomain();
        // skip files larger than configured maximum
        $opts = Loco_data_Settings::get();
        $max = wp_convert_hr_to_bytes( $opts->max_php_size );
        // *attempt* to raise memory limit to WP_MAX_MEMORY_LIMIT
        if( function_exists('wp_raise_memory_limit') ){
            wp_raise_memory_limit('loco');
        }
        /* @var Loco_fs_File $file */
        foreach( $project->findSourceFiles() as $file ){
            $type = $opts->ext2type( $file->extension() );
            $fileref = $file->getRelativePath($base);
            try {
                $extr = loco_wp_extractor($type);
                if( 'php' === $type || 'twig' === $type) {
                    // skip large files for PHP, because token_get_all is hungry
                    if( 0 !== $max ){
                        $size = $file->size();
                        $this->maxbytes = max( $this->maxbytes, $size );
                        if( $size > $max ){
                            $list = $this->skipped or $list = ( $this->skipped = new Loco_fs_FileList() );
                            $list->add( $file );
                            continue;
                        }
                    }
                    // extract headers from theme files (templates and patterns)
                    if( $project->getBundle()->isTheme() ){
                        $extr->headerize(  [
                            'Template Name' => ['notes'=>'Name of the template'],
                        ], $domain );
                        if( preg_match('!^patterns/!', $fileref) ){
                            $extr->headerize([
                                'Title' => ['context'=>'Pattern title'],
                                'Description' => ['context'=>'Pattern description'],
                            ], $domain );
                        }
                    }
                }
                // normally missing domains are treated as "default", but we'll make an exception for theme.json.
                else if( 'json' === $type && $project->getBundle()->isTheme() ){
                    $extr->setDomain($domain);
                }
                $this->extracted->extractSource( $extr, $file->getContents(), $fileref );
            }
            catch( Exception $e ){
                Loco_error_AdminNotices::debug('Error extracting '.$fileref.': '.$e->getMessage() );
            }
        }
        return $this;
    }
    
    
    private function includeBlock( Loco_fs_File $file, $domain ) {
        $def = json_decode( $file->getContents(), true );
        if( ! is_array($def) || ! array_key_exists('$schema',$def) ){
            return;
        }
        // adding dummy line number for well-formed file reference, not currently pulling line number.
        $ref = $file->getRelativePath( $this->bundle->getDirectoryPath() ).':1';
        foreach(['title','description','keywords'] as $key ){
            if( ! array_key_exists($key,$def) ) {
                continue;
            }
            $msgctxt = 'block '.rtrim($key,'s');
            foreach( (array) $def[$key] as $msgid ){
                if( is_string($msgid) && '' !== $msgid ){
                    $str = new Loco_gettext_String($msgid,$msgctxt);
                    $str->addFileReferences($ref);
                    $this->addString($str,$domain);
                }
            }
        }
    }


    /**
     * Add metadata strings deferred from construction. Note this will alter domain counts
     * @return self
     */
    public function includeMeta(){
        foreach( $this->extras as $domain => $extras ){
            foreach( $extras as $entry ){
                $this->extracted->pushEntry($entry,$domain);
            }
        }
        $this->extras = [];
        return $this;
    }


    /**
     * Add a custom source string constructed from `new Loco_gettext_String(msgid,[msgctxt])`
     * @param Loco_gettext_String $string
     * @param string $domain Optional text domain, if not current bundle's default
     * @return void
     */
    public function addString( Loco_gettext_String $string, $domain = '' ){
        if( ! $domain ) {
            $default = $this->bundle->getDefaultProject();
            $domain = (string) ( $default ? $default->getDomain() :  $this->extracted->getDomain() );
        }
        $index = $this->extracted->pushEntry( $string->exportSingular(), $domain );
        if( $string->hasPlural() ){
            $this->extracted->pushPlural( $string->exportPlural(), $index );
        }
    }


    /**
     * Get number of unique strings across all domains extracted (excluding additional metadata)
     * @return array { default: x, myDomain: y }
     */
    public function getDomainCounts(){
        return $this->extracted->getDomainCounts();
    }


    /**
     * Pull extracted data into POT, filtering out any unwanted domains 
     * @param string $domain
     * @return Loco_gettext_Data
     */
    public function getTemplate( $domain ){
        do_action('loco_extracted_template', $this, $domain );
        $data = new Loco_gettext_Data( $this->extracted->filter($domain) );
        return $data->templatize( $domain );
    }


    /**
     * Get total number of strings extracted from all domains, excluding additional metadata
     * @return int
     */
    public function getTotal(){
        return $this->extracted->count();
    }


    /**
     * Get list of files skipped, or null if none were skipped
     * @return Loco_fs_FileList|null
     */
    public function getSkipped(){
        return $this->skipped;
    }


    /**
     * Get size in bytes of largest file encountered, even if skipped.
     * This is the value required of the max_php_size plugin setting to extract all files
     * @return int
     */
    public function getMaxPhpSize(){
        return $this->maxbytes;
    }

}
