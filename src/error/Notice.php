<?php
/**
 * Generic, non-critical notice
 */
class Loco_error_Notice extends Loco_error_Exception {
    
    /**
     * {@inheritdoc}
     */
    public function getType(){
        return 'info';
    }


    /**
     * {@inheritdoc}
     */
    public function getTitle(){
        return __('Notice','loco-translate');
    }


    /**
     * {@inheritdoc}
     */
    public function getLevel(){
        return Loco_error_Exception::LEVEL_INFO;
    }

}