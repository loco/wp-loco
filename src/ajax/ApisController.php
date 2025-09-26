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
            $modal->set( 'help', new Loco_mvc_ViewParams(  [
                'text' => __('Help','loco-translate'),
                'href' => apply_filters('loco_external','https://localise.biz/wordpress/plugin/manual/providers'),
            ] ) );
            $modal->set('prof', new Loco_mvc_ViewParams(  [
                'text' => __('Need a human?','loco-translate'),
                'href' => apply_filters('loco_external','https://localise.biz/wordpress/translation?l='.$locale),
            ] ) );
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
        $config = null;
        foreach( Loco_api_Providers::export() as $candidate ){
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

        // Check if hook is registered
        // This is effectively a filter whereby the returned array should be a translation of the input array
        $action = 'loco_api_translate_'.$hook;
        if( has_filter($action) ){
            $targets = apply_filters( $action, [], $sources, $locale, $config );
        }
        // Use built-in translation vendors if the unique hook isn't registered.
        else {
            $vendor = $config['vendor'] ?? $hook;
            if( 'deepl' === $vendor ){
                $targets = Loco_api_DeepL::process( $sources, $locale, $config );
            }
            else if( Loco_api_ChatGpt::supports($vendor) ){
                $targets = Loco_api_ChatGpt::process( $sources, $locale, $config+['vendor'=>$hook] );
            }
            else {
                throw new Loco_error_Exception('API not hooked. Use `add_filter('.var_export($action,1).',...)`');
            }
        }

        // a mid-batch failure that doesn't through an exception might throw the count off 
        if( count($targets) !== count($sources) ){
            $name = $config['name'] ?? $hook;
            Loco_error_AdminNotices::warn( sprintf('%s: Got %u translations for %u source strings', $name, count($targets), count($sources) ) );
        }
    
        // Response data doesn't need anything except the translations
        $this->set('targets',$targets);

        return parent::render();
    }

}
