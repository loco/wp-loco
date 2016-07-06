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
        else if( $post->has('paste-setup') && $this->checkNonce( 'paste-'.$action) ){
            $bundle->clear();
            $model = new Loco_config_XMLModel;
            $model->loadXml( trim( $post['xml-content'] ) );
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
        $configured = $bundle->isConfigured();
        
        if( 'db' === $configured ){
            // form for resetting config
            $fields = new Loco_mvc_HiddenFields();
            $fields->setNonce( 'reset-'.$action );
            $this->set( 'reset', $fields );
            return $this->view('admin/bundle/setup-saved');
        }

        if( 'internal' === $configured ){
            return $this->view('admin/bundle/setup-core');
        }

        if( 'file' === $configured ){
            return $this->view('admin/bundle/setup-author');
        }
        
        // form to invoke full auto-configuration into database
        $fields = new Loco_mvc_HiddenFields();
        $fields->setNonce( 'auto-'.$action );
        $this->set( 'auto', $fields );
        
        // form to paste XML config
        $fields = new Loco_mvc_HiddenFields();
        $fields->setNonce( 'paste-'.$action );
        $this->set( 'paste', $fields );

        // sniff additional unknown files if bundle is a theme or directory-based plugin that's been auto-detected
        while( 'meta' === $configured ){
            if( $bundle->isTheme() || ( $bundle->isPlugin() && ! $bundle->isSingleFile() ) ){ 
                if( count($bundle->invert() ) ){
                    break;
                }
            }
            return $this->view('admin/bundle/setup-meta');
        }
                
        return $this->view('admin/bundle/setup-none');
        
    }
    
}