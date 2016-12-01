<?php
/**
 * Developer notice
 */
class Loco_error_Debug extends Loco_error_Exception {
    
    /**
     * {@inheritdoc}
     */
    public function getType(){
        return 'debug';
    }


    /**
     * {@inheritdoc}
     */
    public function getTitle(){
        return __('Debug','loco');
    }


    /**
     * {@inheritdoc}
     */
    public function getLevel(){
        return Loco_error_Exception::LEVEL_DEBUG;
    }

}