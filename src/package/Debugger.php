<?php
/**
 * Bundle diagnostics.
 */
class Loco_package_Debugger implements IteratorAggregate {
    
    /**
     * @var array
     */
    private $messages;

    /**
     * @var array
     */
    private $counts;
    

    /**
     * Run immediately on construct
     */
    public function __construct( Loco_package_Bundle $bundle ) {

        $this->messages = [];
        $this->counts   = [
            'success' => 0,
            'warning' => 0,
            'debug'   => 0,
            'info'    => 0,
        ];

        // config storage type
        switch ( $bundle->isConfigured() ) {
            case 'db':
                $this->info( __( 'Custom configuration saved in database', 'loco-translate' ) );
                break;
            case 'meta':
                $this->good( __( 'Configuration auto-detected from file headers', 'loco-translate' ) );
                break;
            case 'file':
                $this->good( __( 'Official configuration provided by author', 'loco-translate' ) );
                break;
            case 'internal':
                $this->info( __( 'Configuration built-in to Loco', 'loco-translate' ) );
                break;
            case '':
                $this->warn( __( 'Cannot auto-detect configuration', 'loco-translate' ) );
                break;
            default:
                throw new Exception( __( 'Unexpected isConfigured() return value', 'loco-translate' ) );
        }

        $base = $bundle->getDirectoryPath();
        // $this->devel('Bundle root is %s',$base);

        // self-declarations provided by author in file headers
        $native = $bundle->getHeaderInfo();
        if ( $value = $native->TextDomain ) {
            $this->info( sprintf(__('WordPress says primary text domain is "%s"', 'loco-translate'), $value ));
            // WordPress 4.6 changes mean this header could be a fallback and not actually declared by author
            if ( $bundle->isPlugin() ) {
                $map = [ 'TextDomain' => 'Text Domain' ];
                $raw = get_file_data( $bundle->getBootstrapPath(), $map, 'plugin' );
                if ( empty( $raw['TextDomain'] ) ) {
                    $this->warn( __('Author doesn\'t define the TextDomain header, WordPress guessed it', 'loco-translate' ));
                }
            }
            // Warn if WordPress-assumed text domain is not configured. plugin/theme headers won't be translated
            $domains = $bundle->getDomains();
            if ( ! isset( $domains[ $value ] ) && ! isset( $domains['*'] ) ) {
                $this->warn( sprintf(__('Expected text domain "%s" is not configured', 'loco-translate'), $value ));
            }
        } else {
            $this->warn( __('Author doesn\'t define the TextDomain header', 'loco-translate') );
        }
        if ( $value = $native->DomainPath ) {
            $this->good( sprintf(__('Primary domain path declared by author as "%s"', 'loco-translate'), $value ));
        } else if ( is_dir( $base . '/languages' ) ) {
            $this->info( __('Standard "languages" folder found, although DomainPath not declared', 'loco-translate') );
        } else {
            $this->warn( __('Author doesn\'t define the DomainPath header', 'loco-translate') );
        }

        // check validity of single-file plugins
        if ( $bundle->isSingleFile() && ! $bundle->getBootstrapPath() ) {
            $this->warn( __('Plugin is a single file, but bootstrap file is unknown', 'loco-translate'));
        }

        // collecting only configured domains to match against source code
        $domains   = [];
        $templates = [];

        // show each known subset
        if ( $count = count( $bundle ) ) {
            /* @var $project Loco_package_Project */
            foreach ( $bundle as $project ) {
                $id     = $project->getId();
                $domain = (string) $project->getDomain();
                if ( '*' === $domain ) {
                    $this->devel( sprintf(__('Wildcard text domain configured for %s', 'loco-translate'), $project ));
                    $domain = '';
                }
                $domains[ $domain ] = true;
                // Domain path[s] within bundle directory
                $targets = [];
                /* @var $dir Loco_fs_Directory */
                foreach ( $project->getConfiguredTargets() as $dir ) {
                    $targets[] = $dir->getRelativePath( $base );
                }
                if ( $targets ) {
                    $this->info( sprintf(__('%1$s domain path[s] configured for "%2$s" -> %3$s', 'loco-translate'), count( $targets ), $id, json_encode( $targets, JSON_UNESCAPED_SLASHES ) ));
                } else {
                    $this->warn( sprintf(__('No domain paths configured for "%s"', 'loco-translate'), $id ));
                }
                // POT template file  
                if ( $potfile = $project->getPot() ) {
                    if ( $potfile->exists() ) {
                        $this->good( sprintf(__('Template file for "%1$s" exists at "%2$s"', 'loco-translate'), $id, $potfile->getRelativePath( $base ) ));
                        try {
                            $data = Loco_gettext_Data::load( $potfile );
                            $templates[ $domain ][] = $data;
                        } catch ( Exception $e ) {
                            $this->warn( sprintf(__('Template file for "%s" is invalid format', 'loco-translate'), $id ));
                        }
                    } else {
                        $this->warn( sprintf(__('Template file for "%1$s" does not exist (%2$s)', 'loco-translate'), $id, $potfile->getRelativePath( $base ) ));
                    }
                } else {
                    $this->warn( sprintf(__('No template file configured for "%s"', 'loco-translate'), $domain ));
                    if ( $potfile = $project->guessPot() ) {
                        $this->devel( sprintf(__('Possible non-standard name for "%1$s" template at "%2$s"', 'loco-translate'), $id, $potfile->getRelativePath( $base ) ));
                        $project->setPot( $potfile ); // <- adding so that invert ignores it
                    }
                }
            }
            $default = $bundle->getDefaultProject();
            if ( ! $default ) {
                $this->warn( sprintf(__('%u subsets configured, but failed to establish the default/primary', 'loco-translate'), $count ));
            }
        } else {
            $default = $bundle->createDefault();
            $domain  = (string) $default->getDomain();
            $this->devel( sprintf(__('Suggested text domain: "%s"', 'loco-translate'), $domain ));
        }

        // files picked up with no context as to what they're for
        if ( $bundle->isTheme() || ( $bundle->isPlugin() && ! $bundle->isSingleFile() ) ) {
            $unknown = $bundle->invert();
            if ( count( $unknown ) ) {
                /* @var $project Loco_package_Project */
                foreach ( $unknown as $project ) {
                    $domain = (string) $project->getDomain();
                    // should only have one target due the way the inverter groups results
                    /* @var $dir Loco_fs_Directory */
                    foreach ( $project->getConfiguredTargets() as $dir ) {
                        $reldir = $dir->getRelativePath( $base ) ?: '.';
                        $this->warn( sprintf(__('Unconfigured files found in "%1$s", possible domain name: "%2$s"', 'loco-translate'), $reldir, $domain ));
                    }
                }
            }
        }

        // source code extraction across entire bundle
        $extr = new Loco_gettext_Extraction( $bundle );
        foreach ( $bundle as $project ) {
            $extr->addProject( $project );
        }

        // real count excludes additional metadata
        $realCounts = $extr->getDomainCounts();
        $counts = $extr->includeMeta()->getDomainCounts();
        // $this->devel( json_encode(compact('realCounts','counts')) );
        foreach( array_intersect_key($counts, $domains) as $domain => $count ){
            if( isset($realCounts[$domain]) ){
                $count = $counts[$domain];
                $realCount = $realCounts[$domain];
                // translators: 1: Number of strings; 2: Text Domain; e.g. 100 strings extracted from source code for "loco-translate"
                $str = _n( '%1$s string extracted from source code for "%2$s"', '%1$s strings extracted from source code for "%2$s"', $realCount, 'loco-translate' );
                $this->good( $str. __(' (%s including metadata)', 'loco-translate'), number_format($realCount), $domain?:'*', number_format($count) );
            }
            else {
                $this->warn(sprintf(__('No strings extracted from source code for "%s"', 'loco-translate'), $domain?:'*' ));
            }
            // check POT agrees with extracted count, but only if domain has single POT (i.e. not split across files on purpose)
            if( isset($templates[$domain]) && 1 === count($templates[$domain]) ){
                $data = current( $templates[$domain] );
                if( ! $extr->getTemplate($domain)->equalSource($data) ){
                    $meta = Loco_gettext_Metadata::create( new Loco_fs_DummyFile(''), $data );
                    $this->devel(sprintf(__('Template is not in sync with source code (%s in file)', 'loco-translate'), $meta->getTotalSummary() ));
                }
            }
        }
        // with extracted strings we can check for domain mismatches
        if( $missing = array_diff_key($domains, $realCounts) ){
            $num = count($missing);
            $str = _n( 'Configured domain has no extractable strings', '%u configured domains have no extractable strings', $num, 'loco-translate' );
            $this->warn( $str.': %2$s', $num, $this->implodeKeys($missing) );
        }
        if( $extra = array_diff_key($realCounts,$domains) ){
            
            $this->info(sprintf(__('%u unconfigured domain[s] found in source code: %s', 'loco-translate'), count($extra), $this->implodeKeys($extra) ));
            /*/ debug other domains extracted
            foreach( $extra as $name => $count ){
                $this->devel(' > %s (%u)', $name, $count );
            }*/
            // extracted domains could prove that declared domain is wrong
            if( $missing ){
                foreach( array_keys($extra) as $name ){
                    $flat = preg_replace('/[^a-z\\d]/','', strtolower($name) );
                    foreach( array_keys($missing) as $decl ){
                        if( preg_replace('/[^a-z\\d]/','', strtolower($decl) ) === $flat ){
                            $this->devel(sprintf(__('"%1$s" might be a mistake. Should it be "%2$s"?', 'loco-translate'), $decl, $name ));
                        }
                    }
                }
            }
        }
        
    }


    /**
     * @internal
     * Implements IteratorAggregate for looping over messages
     * @return ArrayIterator
     */
    #[ReturnTypeWillChange]
    public function getIterator(){
        return new ArrayIterator( $this->messages );
    }


    /**
     * Add a success notice
     * @return Loco_package_Debugger
     */
    private function good( $text ){
        $args = func_get_args();
        $text = call_user_func_array('sprintf', $args );
        return $this->add( new Loco_error_Success($text) );
    }


    /**
     * Add a warning notice
     * @return Loco_package_Debugger
     */
    private function warn( $text ){
        $args = func_get_args();
        $text = call_user_func_array('sprintf', $args );
        return $this->add( new Loco_error_Warning($text) );
    }


    /**
     * Add an information notice (not good, or bad)
     * @return Loco_package_Debugger
     */
    private function info( $text ){
        $args = func_get_args();
        $text = call_user_func_array('sprintf', $args );
        return $this->add( new Loco_error_Notice($text) );
    }


    /**
     * Add a developer notice. probably something helpful for fixing a problem
     * @return Loco_package_Debugger
     */
    private function devel( $text ){
        $args = func_get_args();
        $text = call_user_func_array('sprintf', $args );
        return $this->add( new Loco_error_Debug($text) );
    }


    /**
     * @return Loco_package_Debugger
     */
    private function add( Loco_error_Exception $error ){
        $this->counts[ $error->getType() ]++;
        $this->messages[] = $error;
        return $this;
    }


    /**
     * Print all diagnostic messages suitable for CLI
     * @codeCoverageIgnore
     */
    public function dump( $prefix = '' ){
        /* @var $notice Loco_error_Exception */
        foreach( $this as $notice ){
            printf("%s[%s] %s\n", $prefix, $notice->getType(), $notice->getMessage() );
        }
    }


    /**
     * Get number of bad things discovered
     * @return int
     */
    public function countWarnings(){
        return $this->counts['warning'];
    }


    /**
     * Utility for printing "x", "y" & "z"
     * @return string
     */
    private function implodeNames( array $names ){
        $last = array_pop($names);
        if( $names ){
            return '"'.implode('", "',$names).'" & "'.$last.'"';
        }
        if( is_string($last) ){
            return '"'.$last.'"';
        }
        return '';
    }
    
    
    /**
     * @internal
     * @return string
     */
    private function implodeKeys( array $assoc ){
        return $this->implodeNames( array_keys($assoc) );
    }


}