<?php
/**
 * Ajax "apis" route, for handing off Ajax requests to hooked API integrations.
 */
class Loco_ajax_ApisController extends Loco_mvc_AjaxController {

    /**
     * {@inheritdoc}
     */
    public function render(){
        $post = $this->validate();
        
        // Fire an event so translation apis can register their hooks as lazily as possible
        do_action('loco_api_ajax');
        
        // Get request renders API modal contents:
        if( 0 === $post->count() ){
            $apis = Loco_api_Providers::configured();
            $this->set('apis',$apis);
            // modal views for batch-translate and suggest feature
            $modal = new Loco_mvc_View;
            $modal->set('apis',$apis);
            // help buttons
            $locale = $this->get('locale');
            $modal->set( 'help', new Loco_mvc_ViewParams( array (
                'text' => __('Help','loco-translate'),
                'href' => apply_filters('loco_external','https://localise.biz/wordpress/plugin/manual/providers'),
            ) ) );
            $modal->set('prof', new Loco_mvc_ViewParams( array (
                'text' => __('Need a human?','loco-translate'),
                'href' => apply_filters('loco_external','https://localise.biz/wordpress/translation?l='.$locale),
            ) ) );
            // render auto-translate modal or prompt for configuration
            if( $apis ){
                $html = $modal->render('ajax/modal-apis-batch');
            }
            else {
                $html = $modal->render('ajax/modal-apis-empty');
            }
            $this->set('html',$html);
            return parent::render();
        }
        
        // else API client id should be posted to perform operation
        $hook = (string) $post->hook;
        
        // API client must be hooked in using loco_api_providers filter
        // this normally filters on Loco_api_Providers::export() but should do the same with an empty array.
        $config = null;
        foreach( apply_filters('loco_api_providers', Loco_api_Providers::builtin() ) as $candidate ){
            if( is_array($candidate) && array_key_exists('id',$candidate) && $candidate['id'] === $hook ){
                $config = $candidate;
                break;
            }
        }
        if( is_null($config) ){
            throw new Loco_error_Exception('API not registered: '.$hook );
        }
        
        // Get input texts to translate via registered hook. shouldn't be posted if empty.
        $sources = $post->sources;
        if( ! is_array($sources) || ! $sources ){
            throw new Loco_error_Exception('Empty sources posted to '.$hook.' hook');
        }
        
        // The front end sends translations detected as HTML separately. This is to support common external apis.
        $config['type'] = $post->type;
        
        // We need a locale too, which should be valid as it's the same one loaded into the front end.
        $locale = Loco_Locale::parse( (string) $post->locale );
        if( ! $locale->isValid() ){
            throw new Loco_error_Exception('Invalid locale');
        }

        // Check if hook is registered, else sources will be returned as-is
        $action = 'loco_api_translate_'.$hook;
        if( ! has_filter($action) ){
            throw new Loco_error_Exception('API not hooked. Use `add_filter('.var_export($action,1).',...)`');
        }

        // This is effectively a filter whereby the returned array should be a translation of the input array
        // TODO might be useful for translation hooks to know the PO file this comes from 
        $targets = apply_filters( $action, $sources, $locale, $config );
        if( count($targets) !== count($sources) ){
            Loco_error_AdminNotices::warn('Number of translations does not match number of source strings');
        }
    
        // Response data doesn't need anything except the translations
        $this->set('targets',$targets);

        return parent::render();
    }


    /**
     * Built-in Yandex API v2 support.
     * https://cloud.yandex.com/docs/translate/api-ref/
     * 
     * @param string[] input strings
     * @param Loco_Locale target locale for translations
     * @param array our own api configuration
     * @return string[] output strings
     * @throws Loco_error_Exception
     */
    public function filter_loco_api_translate_yandex( array $sources, Loco_Locale $locale, array $config ){
        $client = new Loco_api_YandexClient($config);
        return $client->translate($sources,$locale);
    }

}
