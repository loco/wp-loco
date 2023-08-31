<?php
/**
 * 
 */
class Loco_admin_bundle_SetupController extends Loco_admin_bundle_BaseController {

    /**
     * {@inheritdoc}
     */
    public function init(){
        parent::init();
        $bundle = $this->getBundle();
        
        // translators: where %s is a plugin or theme
        $this->set( 'title', sprintf( __('Set up %s','loco-translate'),$bundle->getName() ) );
    }



    /**
     * {@inheritdoc}
     */
    public function getHelpTabs(){
        return  [
            __('Setup tab','loco-translate') => $this->viewSnippet('tab-bundle-setup'),
        ];
    }


    /**
     * {@inheritdoc}
     */
    public function render(){

        $this->prepareNavigation()->add( __('Bundle setup','loco-translate') );
        $bundle = $this->getBundle();
        $action = 'setup:'.$bundle->getId();
 
        // execute auto-configure if posted
        $post = Loco_mvc_PostParams::get();
        if( $post->has('auto-setup') && $this->checkNonce( 'auto-'.$action) ){
            if( 0 === count($bundle) ){
                $bundle->createDefault();
            }
            foreach( $bundle as $project ){
                if( ! $project->getPot() && ( $file = $project->guessPot() ) ){
                    $project->setPot( $file );
                }
            }
            // forcefully add every additional project into bundle
            foreach( $bundle->invert() as $project ){
                if( ! $project->getPot() && ( $file = $project->guessPot() ) ){
                    $project->setPot( $file );
                }
                $bundle[] = $project;
            }
            $this->saveBundle();
            $bundle = $this->getBundle();
            $this->set('auto', null );
        }
        // execute XML-based config if posted
        else if( $post->has('xml-setup') && $this->checkNonce( 'xml-'.$action) ){
            $bundle->clear();
            $model = new Loco_config_XMLModel;
            $model->loadXml( trim( $post['xml-content'] ) );
            $reader = new Loco_config_BundleReader($bundle);
            $reader->loadModel( $model );
            $this->saveBundle();
            $bundle = $this->getBundle();
            $this->set('xml', null );
        }
        // execute JSON-based config if posted
        else if( $post->has('json-setup') && $this->checkNonce( 'json-'.$action) ){
            $bundle->clear();
            $model = new Loco_config_ArrayModel;
            $model->loadJson( trim( $post['json-content'] ) );
            $reader = new Loco_config_BundleReader($bundle);
            $reader->loadModel( $model );
            $this->saveBundle();
            $bundle = $this->getBundle();
            $this->set('json', null );
        }
        // execute reset if posted
        else if( $post->has('reset-setup') && $this->checkNonce( 'reset-'.$action) ){
            $this->resetBundle();
            $bundle = $this->getBundle();
        }

        // bundle author links
        $info = $bundle->getHeaderInfo();
        $this->set( 'credit', $info->getAuthorCredit() );

        // render according to current configuration method (save type)
        $configured = $this->get('force') or $configured = $bundle->isConfigured();

        $notices = new ArrayIterator;
        $this->set('notices', $notices );
        
        // collect configuration warnings
        foreach( $bundle as $project ){
            $potfile = $project->getPot();
            if( ! $potfile ){
                $notices[] = sprintf('No translation template for the "%s" text domain', $project->getSlug() );
            }
        }
        // if extra files found consider incomplete
        if( $bundle->isTheme() || ( $bundle->isPlugin() && ! $bundle->isSingleFile() ) ){
            $unknown = Loco_package_Inverter::export($bundle);
            $n = 0;
            foreach( $unknown as $ext => $files ){
                $n += count($files);
            }
            if( $n ){
                // translators: %s is a quantity of files which were found, but whose context is unknown
                $notices[] = sprintf( _n("%s file can't be matched to a known set of strings","%s files can't be matched to a known set of strings",$n,'loco-translate'), number_format_i18n($n) );
            }
        }
        
        // display setup options if at least one option specified
        $doconf = false;

        // enable form to invoke auto-configuration
        if( $this->get('auto') ){
            $fields = new Loco_mvc_HiddenFields();
            $fields->setNonce( 'auto-'.$action );
            $this->set('autoFields', $fields );
            $doconf = true;
        }
        
        // enable form to paste XML config
        if( $this->get('xml') ){
            $fields = new Loco_mvc_HiddenFields();
            $fields->setNonce( 'xml-'.$action );
            $this->set('xmlFields', $fields );
            $doconf = true;
        }
        
        /*/ JSON config via remote lookup has been scrapped
        if( $this->get('json') ){
            $fields = new Loco_mvc_HiddenFields( [
                'json-content' => '',
                'version' => $info->Version,
            ] );
            $fields->setNonce( 'json-'.$action );
            $this->set('jsonFields', $fields );
            
            // other information for looking up bundle via api
            $this->set('vendorSlug', $bundle->getSlug() );
            
            // remote config is done via JavaScript
            $this->enqueueScript('setup');
            $apiBase = apply_filters( 'loco_api_url', 'https://localise.biz/api' );
            $this->set('js', new Loco_mvc_ViewParams( [
                'apiUrl' => $apiBase.'/wp/'.strtolower( $bundle->getType() ),
            ] ) );
            $doconf = true;
        }*/
        
        
        // display configurator if configuring
        if( $doconf ){
            return $this->view( 'admin/bundle/setup/conf' );
        }

        // Add some debugging information on all screens except config
        // this used to be accessed via the Debug tab, which is removed
        if( loco_debugging() && count($bundle) ){
            $this->set('debug', $this->getDebug($bundle) );
        }

        // set configurator links back to self with required option ...
        if( ! $configured || ! count($bundle) ){
            return $this->view( 'admin/bundle/setup/none' );
        }

        if( 'db' === $configured ){
            // form for resetting config
            $fields = new Loco_mvc_HiddenFields();
            $fields->setNonce( 'reset-'.$action );
            $this->set( 'reset', $fields );
            return $this->view('admin/bundle/setup/saved');
        }

        if( 'internal' === $configured ){
            return $this->view('admin/bundle/setup/core');
        }

        if( 'file' === $configured ){
            return $this->view('admin/bundle/setup/author');
        }
        
        if( count($notices) ){
            return $this->view('admin/bundle/setup/partial');
        }
        
        return $this->view('admin/bundle/setup/meta');
    }



    /**
     * @return Loco_mvc_ViewParams
     */
    private function getDebug( Loco_package_Bundle $bundle ){
        $debug = new Loco_mvc_ViewParams;

        // XML config
        $writer = new Loco_config_BundleWriter($bundle);
        $debug['xml'] = $writer->toXml();
        
        // general notes, followed by related warnings
        $notes = [];
        $warns = [];
        
        // show auto-detected settings, either assumed (by wp) or declared (by author)
        if( 'meta' === $bundle->isConfigured() ){
            // Text Domain:
            $native = $bundle->getHeaderInfo();
            $domain = $native->TextDomain;
            if( $domain ){
                // Translators: %s will be replaced with a text domain, e.g. "loco-translate"
                $notes[] = sprintf( __('WordPress says the primary text domain is "%s"','loco-translate'), $domain );
                // WordPress 4.6 changes mean this header could be a fallback and not actually declared by the author
                if( $bundle->isPlugin() ) {
                    $map = [ 'TextDomain' => 'Text Domain' ];
                    $raw = get_file_data( $bundle->getBootstrapPath(), $map, 'plugin' );
                    if( ! isset($raw['TextDomain']) || '' === $raw['TextDomain'] ) {
                        // Translators: This warning is shown when a text domain has defaulted to same as the folder name (or slug)
                        $warns[] = __("This plugin doesn't declare a text domain. It's assumed to be the same as the slug, but this could be wrong",'loco-translate');
                    }
                }
                // Warn if WordPress-assumed text domain is not configured. plugin/theme headers won't be translated
                $domains = $bundle->getDomains();
                if ( ! isset($domains[$domain ]) && ! isset($domains['*']) ) {
                    $warns[] = __("This text domain is not in Loco Translate's bundle configuration",'loco-translate');
                }
            }
            else {
                $warns[] = __("This bundle does't declare a text domain; try configuring it in the Advanced tab",'loco-translate');
            }
            // Domain Path:
            $path = $native->DomainPath;
            if( $path ){
                // Translators: %s will be replaced with a relative path like "/languages"
                $notes[] = sprintf( __('The domain path is declared by the author as "%s"','loco-translate'), $path );
            }
            else {
                $guess = new Loco_fs_Directory( $bundle->getDirectoryPath().'/languages' );
                if( $guess->readable() ){
                    $notes[] = __('The default "languages" domain path has been detected','loco-translate');
                }
                else {
                    $warns[] = __("This bundle doesn't declare a domain path. Add one via the Advanced tab if needed",'loco-translate');
                }
            }
        }

        $debug['notices'] = [ 'info' => $notes, 'warning' => $warns ];
        return $debug;
    }
    
}