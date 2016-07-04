<?php
/**
 * Generic warning
 */
class Loco_error_Warning extends Loco_error_Exception {
    
    /**
     * {@inheritdoc}
     */
    public function getType(){
        return 'warning';
    }


    /**
     * {@inheritdoc}
     */
    public function getTitle(){
        return __('Warning','loco');
    }

}