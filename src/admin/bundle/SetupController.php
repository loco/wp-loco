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
        $this->set( 'title', sprintf( __('Set up %s','loco'),$bundle->getName() ) );
    }



    /**
     * {@inheritdoc}
     */
    public function render(){

        $this->prepareNavigation()->add( __('Setup options','loco') );
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

        if( 'meta' === $configured ){
            while( count($bundle) ){
                // if any projects are without a template path, consider incomplete 
                foreach( $bundle as $project ){
                    if( ! $project->getPot() ){
                        // Loco_error_AdminNotices::debug( sprintf('No POT file configured for %s',$project->getSlug()) );
                        break 2;
                    }
                }
                // if extra files found consider incomplete
                if( $bundle->isTheme() || ( $bundle->isPlugin() && ! $bundle->isSingleFile() ) ){
                    $unknown = $bundle->invert();
                    if( count($unknown) ){
                        // Loco_error_AdminNotices::debug("Bundle contains some files we don't understand");
                        break;
                    }
                }
                // ok meta configuration fully compatible
                return $this->view('admin/bundle/setup/meta');
            }
        }
        
        // form to invoke auto-configuration
        $fields = new Loco_mvc_HiddenFields();
        $fields->setNonce( 'auto-'.$action );
        $this->set('autoFields', $fields );
        
        // form to paste XML config
        $fields = new Loco_mvc_HiddenFields();
        $fields->setNonce( 'xml-'.$action );
        $this->set('xmlFields', $fields );
        
        // form to paste JSON config (via remote lookup)
        $fields = new Loco_mvc_HiddenFields( array(
            'json-content' => '',
            'version' => $info->Version,
        ) );
        $fields->setNonce( 'json-'.$action );
        $this->set('jsonFields', $fields );
        
        // other information for looking up bundle via api
        $this->set('vendorSlug', $bundle->getSlug() );
        
        // remote config is done via JavaScript
        $this->enqueueScript('setup');
        $apiBase = apply_filters( 'loco_api_url', 'https://localise.biz/api' );
        $this->set('js', new Loco_mvc_ViewParams( array(
            'apiUrl' => $apiBase.'/wp/'.strtolower( $bundle->getType() ),
        ) ) );

        
        // render different messaging if bundle is auto-configured, but has issues
        if( $configured ){
            return $this->view('admin/bundle/setup/partial');
        }
        
        // else render full setup options, from scratch.
        return $this->view('admin/bundle/setup/none');
    }
    
}