<?php
/**
 *  API keys/settings screen
 */
class Loco_admin_config_ApisController extends Loco_admin_config_BaseController {

    /**
     * {@inheritdoc}
     */
    public function init(){
        parent::init();
        $this->set( 'title', __('API keys','loco-translate') );

        // Collect configurable API keys bundled with plugin
        $apis = [];
        foreach( Loco_api_Providers::builtin() as $api ){
            $apis[ $api['id'] ] = new Loco_mvc_ViewParams($api);
        }
        // Add any additional API hooks for information only
        $hooked = [];
        foreach( Loco_api_Providers::export() as $api ){
            $id = $api['id'];
            if( ! array_key_exists($id,$apis) ){
                $hooked[ $id ] = new Loco_mvc_ViewParams($api);
            }
        }

        $this->set('apis',$apis);
        $this->set('hooked',$hooked);

        // handle save action
        $nonce = $this->setNonce('save-apis');
        try {
            if( $this->checkNonce($nonce->action) ){
                $post = Loco_mvc_PostParams::get();
                if( $post->has('api') ){
                    // Save only options in post. Avoids overwrite of missing site options
                    $data = [];
                    $filter = [];
                    foreach( $apis as $id => $api ){
                        $fields = $post->api[$id]??null;
                        if( is_array($fields) ){
                            foreach( $fields as $prop => $value ){
                                $apis[$id][$prop] = $value;
                                $prop = $id.'_api_'.$prop;
                                $data[$prop] = $value;
                                $filter[] = $prop;
                            }
                        }
                    }
                    if( $filter ){
                        Loco_data_Settings::get()->populate($data,$filter)->persistIfDirty();
                        Loco_error_AdminNotices::success( __('Settings saved','loco-translate') );
                    }
                }
            }
        }
        catch( Loco_error_Exception $e ){
            Loco_error_AdminNotices::add($e);
        }
    }


    /**
     * {@inheritdoc}
     */
    public function render(){

        $title = __('Plugin settings','loco-translate');
        $breadcrumb = new Loco_admin_Navigation;
        $breadcrumb->add( $title );

        // common ui elements / labels
        $this->set( 'ui', new Loco_mvc_ViewParams( [
            'api_key' => __('API key','loco-translate'),
            'api_url' => __('API URL','loco-translate'),
            'api_region' => __('API region','loco-translate'),
        ] ) );
        
        return $this->view('admin/config/apis', compact('breadcrumb') );
    }

}