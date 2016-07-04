<?php
/**
 * Ajax "ping" route, for testing Ajax responses are working.
 */
class Loco_ajax_PingController extends Loco_mvc_AjaxController {
    
    
    /**
     * {@inheritdoc}
     */
    public function render(){
        $this->set( 'ping', 'pong' );
        return parent::render();
    }
    
    
}