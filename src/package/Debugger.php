<?php
/**
 * Bundle diagnostics
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
    public function __construct( Loco_package_Bundle $bundle ){
        
        $this->messages = array();
        $this->counts = array(
            'success' => 0,
            'warning' => 0,
            'debug'   => 0,
            'info'    => 0,
        );
        
        // config storage type
        switch( $bundle->isConfigured() ){
        case 'db':
            $this->info("Custom configuration saved in database");
            break;
        case 'meta':
            $this->good("Configuration auto-detected from file headers");
            break;
        case 'file':
            $this->good("Official configuration provided by author");
            break;
        case '':
            $this->warn("Cannot auto-detect configuration");
            break;
        default:
            throw new Exception('Unexpected isConfigured() return value');
        }

        $base = $bundle->getDirectoryPath();

        // naive self declarations
        $native = $bundle->getHeaderInfo();
        if( $value = $native->TextDomain ){
            $this->good('Primary text domain declared by author as "%s"', $value);
        }
        else {
            $this->warn("Author doesn't define the TextDomain header");
        }
        if( $value = $native->DomainPath ){
            $this->good('Primary domain path declared by author as "%s"', $value );
        }
        else if( is_dir($base.'/languages') ){
            $this->info('DomainPath declaration is missing, but default "languages" folder is found');
        }
        else {
            $this->warn("Author doesn't define the DomainPath header");
        }
        
        $domains = array();
        
        // show each known subset
        if( $n = count($bundle) ){
            /* @var $project Loco_package_Project */
            foreach( $bundle as $project ){
                $domain = (string) $project->getDomain();
                $domains[$domain] = true;
                // POT    
                if( $potfile = $project->getPot() ){
                    if( $potfile->exists() ){
                        $this->good('Template file for "%s" exists at "%s"', $domain, $potfile->getRelativePath($base) );
                    }
                    else {
                        $this->warn('Template file for "%s" does not exist (%s)', $domain, $potfile->getRelativePath($base) );
                    }
                }
                else {
                    $this->warn('No template file configured for "%s"', $domain );
                    if( $potfile = $project->guessPot() ){
                        $this->devel('Possible template for "%s" found: "%s"', $domain, $potfile->getRelativePath($base) );
                    }
                }
            }
        }
        else {
            $default = $bundle->createDefault();
            $domain = (string) $default->getDomain();
            $this->devel( 'Suggested text domain: "%s"', $domain );
        }
        
        // files picked up with no context as to what they're for
        if( $bundle->isTheme() || ( $bundle->isPlugin() && ! $bundle->isSingleFile() ) ){
            $unknown = $bundle->invert();
            if( $n = count($unknown) ){
                // $this->warn("%u unknown subset[s] found", $n );
                /* @var $project Loco_package_Project */
                foreach( $unknown as $project ){
                    $domain = (string) $project->getDomain();
                    // $domains[$domain] = true;
                    // should only have one target due the way the inverter groups results
                    /* @var $dir Loco_fs_Directory */
                    foreach( $project->getConfiguredTargets() as $dir ){
                        $this->warn('Unconfigured files found in "%s", possible domain name: "%s"', $dir->getRelativePath($base), $domain );
                    }
                }
            }
        }
        
        // source code extraction across entire directory
        $tmp = clone $bundle;
        $tmp->exchangeArray( array() );
        $extr = new Loco_gettext_Extraction( $tmp );
        $extr->addProject( $tmp->createDefault() );
        if( $total = $extr->getTotal() ){
            $counts = $extr->getDomainCounts();
            //$this->good("%u string[s] can be extracted from source code for %s", $total, $this->implodeKeys($counts) );
            foreach( array_intersect_key($counts, $domains) as $domain => $count ){
                $str = _n( '%u string extracted from source code for "%s"', '%u strings extracted from source code for "%s"', $count, 'loco' );
                $this->good( $str, $count, $domain );
            }
            // with extracted strings we can check for domain mismaches
            if( $missing = array_diff_key($domains, $counts) ){
                $num = count($missing);
                $str = _n( 'Configured domain has no extractable strings', '%u configured domains have no extractable strings', $num, 'loco' );
                $this->warn( $str.': %2$s', $num, $this->implodeKeys($missing) );
            }
            if( $extra = array_diff_key($counts,$domains) ){
                $this->info('%u unconfigured domain[s] found in source code: %s', count($extra), $this->implodeKeys($extra) );
                // extracted domains could prove that declared domain is wrong
                if( $missing ){
                    foreach( array_keys($extra) as $name ){
                        $flat = preg_replace('/[^a-z0-9]/','', strtolower($name) );
                        foreach( array_keys($missing) as $decl ){
                            if( preg_replace('/[^a-z0-9]/','', strtolower($decl) ) === $flat ){
                                $this->devel('"%s" might be a mistake. Should it be "%s"?', $decl, $name );
                            }
                        }
                    }
                }
            }
                            
        }
        else {
            $this->warn("No strings can be extracted from source code");
        }
        
    }



    /**
     * @return ArrayIterator
     */
    public function getIterator(){
        return new ArrayIterator( $this->messages );
    }


    /**
     * Add a success notice
     * @return Loco_package_Debugger
     */
    private function good(){
        $text = call_user_func_array('sprintf', func_get_args() );
        return $this->add( new Loco_error_Success($text) );
    }


    /**
     * Add a warning notice
     * @return Loco_package_Debugger
     */
    private function warn(){
        $text = call_user_func_array('sprintf', func_get_args() );
        return $this->add( new Loco_error_Warning($text) );
    }


    /**
     * Add an information notice (not good, or bad)
     * @return Loco_package_Debugger
     */
    private function info(){
        $text = call_user_func_array('sprintf', func_get_args() );
        return $this->add( new Loco_error_Notice($text) );
    }


    /**
     * Add a developer notice. probably something helpful for fixing a problem
     * @return Loco_package_Debugger
     */
    private function devel(){
        $text = call_user_func_array('sprintf', func_get_args() );
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
     * Dump all messages - suitable for cli
     * @codeCoverageIgnore
     */
    public function dump(){
        /* @var $notice Loco_error_Exception */
        foreach( $this as $notice ){
            printf("[%s] %s\n", $notice->getType(), $notice->getMessage() );
        }
    }

 
    public function countWarnings(){
        return $this->counts['warning'];
    }


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
    
    private function implodeKeys( array $assoc ){
        return $this->implodeNames( array_keys($assoc) );
    }


     
}