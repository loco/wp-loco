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
        return __('Debug','loco-translate');
    }


    /**
     * {@inheritdoc}
     */
    public function getLevel(){
        return Loco_error_Exception::LEVEL_DEBUG;
    }


    /**
     * {@inheritDoc}
     */
    public function logCli(){
        WP_CLI::debug( $this->getMessage(), 'loco' );
    }
    
    
    /**
     * Log debugging message to file without raising admin notice
     * @codeCoverageIgnore
     */
    public static function trace( ...$args ){
        $message = array_shift($args);
        if( $args ){
            $message = vsprintf($message,$args);
        }
        $debug = new Loco_error_Debug($message);
        $debug->setCallee(1);
        $debug->log();
    }

}