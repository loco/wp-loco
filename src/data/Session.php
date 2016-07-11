<?php
/**
 * Abstracts session data access using WP_Session_Tokens
 */
class Loco_data_Session extends Loco_data_Serializable {
    
    /**
     * @var Loco_data_Session
     */
    private static $instance;
    
    /**
     * Value from wp_get_session_token
     * @var string
     */
    private $token;
    
    /**
     * @var WP_User_Meta_Session_Tokens
     */
    private $manager;


    /**
     * @return Loco_data_Session
     */
    public static function get(){
        if( ! self::$instance ){
            new Loco_data_Session;
        }
        return self::$instance;
    }



    /**
     * Trash data and remove from memory
     */
    public static function destroy(){
        if( self::$instance ){
            try {
                self::$instance->clear();
            }
            catch( Exception $e ){
                // probably no session to destroy
            }
            self::$instance = null;
        }
    }



    final public function __construct( array $raw = array() ){
        parent::__construct( array() );
        $this->token = wp_get_session_token();
        $this->manager = WP_Session_Tokens::get_instance( get_current_user_id() );
        // populate object from stored session data
        $data = $this->getRaw();
        if( isset($data['loco']) ){
            $this->setUnserialized( $data['loco'] );
        }
        // any initial arbitrary data can be merged on top
        foreach( $raw as $prop => $value ){
            $this[$prop] = $value;
        }
        // enforce single instance
        self::$instance = $this;
    }



    /**
     * Get raw session data held by WordPress
     * @return array
     */
    private function getRaw(){
        $data = $this->manager->get( $this->token );
        // session data will exist if WordPress login is valid
        if( ! $data || ! is_array($data) ){
            throw new Loco_error_Exception('Invalid session');
        }

        return $data;
    }



    /**
     * Persist object in WordPress usermeta table
     * @return Loco_data_Session
     */
    public function persist(){
        $data = $this->getRaw();
        $data['loco'] = $this->getSerializable();
        $this->manager->update( $this->token, $data );

        return $this;
    }



    /**
     * Clear object data and remove our key from WordPress usermeta record
     * @return Loco_data_Session
     */
    public function clear(){
        $data = $this->getRaw();
        if( isset($data['loco']) ){
            unset( $data['loco'] );
            $this->exchangeArray( array() );
            $this->manager->update( $this->token, $data );
        }

        return $this;
    }

    
    
}
