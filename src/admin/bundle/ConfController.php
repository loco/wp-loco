<?php
/**
 * Bundle configuration page
 */
class Loco_admin_bundle_ConfController extends Loco_admin_bundle_BaseController {

    /**
     * {@inheritdoc}
     */
    public function init(){
        parent::init();
        $this->enqueueStyle('config');
        $this->enqueueScript('config');
        $bundle = $this->getBundle();
        // translators: where %s is a plugin or theme
        $this->set( 'title', sprintf( __('Configure %s','loco'),$bundle->getName() ) );

        $post = Loco_mvc_PostParams::get();
        // always set a nonce for current bundle
        $nonce = $this->setNonce( $this->get('_route').'-'.$this->get('bundle') );
        $this->set('nonce', $nonce );
        try {
            // Save configuration if posted
            if( $post->has('conf') ){
                if( ! $post->name ){
                    $post->name = $bundle->getName();
                }
                $this->checkNonce( $nonce->action );
                $model = new Loco_config_FormModel;
                $model->loadForm( $post );
                // configure bundle from model in full
                $bundle->clear();
                $reader = new Loco_config_BundleReader( $bundle );
                $reader->loadModel( $model );
                $this->saveBundle();
            }
            // Delete configuration if posted
            else if( $post->has('unconf') ){
                $this->resetBundle();
            }
        }
        catch( Exception $e ){
            Loco_error_AdminNotices::warn( $e->getMessage() );
        }

    }

    

    /**
     * {@inheritdoc}
     */
    public function getHelpTabs(){
        return array (
            __('Advanced tab','loco') => $this->view('tab-bundle-conf'),
        );
    }
    
    
    /**
     * {@inheritdoc}
     */
    public function render() {

        $bundle = $this->getBundle();
        $base = $bundle->getDirectoryPath();

        // parent themes are inherited into bundle, we don't want them in the child theme config
        if( $bundle->isTheme() && ( $parent = $bundle->getParentTheme() ) ){
            $this->set( 'parent', new Loco_mvc_ViewParams( array(
                'name' => $parent->getName(),
                'href' => Loco_mvc_AdminRouter::generate('theme-conf', array( 'bundle' => $parent->getSlug() ) + $_GET ),
            ) ) );
        }

        // render postdata straight back to form if sent
        $data = Loco_mvc_PostParams::get();
        // else build initial data from current bundle state 
        if( ! $data->has('conf') ){
            if( 0 === count($bundle) ){
                $bundle->createDefault('');
            }
            $writer = new Loco_config_BundleWriter($bundle);
            $data = $writer->toForm();
            // removed parent bundle configs, as they are inherited
            /* @var Loco_package_Project $project */
            foreach( $bundle as $i => $project ){
                if( isset($parent) && $parent->hasProject($project) ){
                    $data['conf'][$i]['removed'] = true;
                }
            }
        }

        // build config blocks for form
        $i = 0;
        $conf = array();
        foreach( $data['conf'] as $raw ){
            if( empty($raw['removed']) ){
                $slug = $raw['slug'];
                $domain = $raw['domain'] or $domain = 'untitled';
                $raw['prefix'] = sprintf('conf[%u]', $i++ );
                $raw['short'] = ! $slug || ( $slug === $domain ) ? $domain : $domain.'→'.$slug;
                $conf[] = new Loco_mvc_ViewParams( $raw );
            }
        }
        
        // bundle level configs
        $name = $bundle->getName();
        $excl = $data['exclude'];
        
        
        // access to type of configuration that's currently saved
        $this->set('saved', $bundle->isConfigured() );
        
        // link to author if there are config problems
        $info = $bundle->getHeaderInfo();
        $this->set('author', $info->getAuthorLink() );
        
        // link for downloading current configuration XML file
        $args = array ( 
            'path' => 'loco.xml', 
            'action' => 'loco_download', 
            'bundle' => $bundle->getHandle(), 
            'type' => $bundle->getType()  
        );
        $this->set( 'xmlUrl', Loco_mvc_AjaxRouter::generate( 'DownloadConf', $args ) );
        
        $this->prepareNavigation()->add( __('Advanced configuration','loco') );
        return $this->view('admin/bundle/conf', compact('conf','base','name','excl') );
    }    
    
    
} 