<?php
/**
 * Test case extending the WordPress base
 */
abstract class Loco_test_WordPressTestCase extends WP_UnitTestCase {
    
    private $locale = 'en_US';

    private $redirect;
    
    private $fs_method;
    
    
    /**
     * Drop all Loco data from the options table (including transients)
     */
    protected static function dropOptions(){
        global $wpdb;
        $query = $wpdb->prepare( "SELECT option_name FROM $wpdb->options WHERE option_name LIKE '%s'", array('loco_%','_transient_loco_%','_transient_timeout_loco_%') );
        if( $results = $wpdb->get_results($query,ARRAY_N) ){
            foreach( $results as $row ){
                list( $option_name ) = $row;
                delete_option( $option_name );
            }
        }
    }

    
    public static function setUpBeforeClass(){
        parent::setUpBeforeClass();
        Loco_data_Settings::clear();
        self::dropOptions();
    }

    
    public static function tearDownAfterClass(){
        parent::tearDownAfterClass();
        self::dropOptions();
    }

    
    public function setUp(){
        parent::setUp();
        Loco_mvc_PostParams::destroy();
        Loco_error_AdminNotices::destroy();
        Loco_package_Listener::destroy();
        // text domains should be unloaded at start of all tests
        $GLOBALS['l10n'] = array();
        // ensure test themes are registered and WordPress's cache is valid
        register_theme_directory( LOCO_TEST_DATA_ROOT.'/themes' );
        $sniff = get_theme_roots();
        if( ! isset($sniff['empty-theme']) ){
            delete_site_transient( 'theme_roots' );
        }
        // avoid WordPress missing index notices
        $GLOBALS['_SERVER'] += array (
            'HTTP_HOST' => 'localhost',
            'SERVER_PROTOCOL' => 'HTTP/1.0',
        );
        // tests should always dictate the file system method, which defaults to direct
        add_filter('filesystem_method', array($this,'filter_fs_method') );
    }



    /**
     * Invoke admin page controller without full hook set up
     */
    public static function renderPage(){
        $router = new Loco_mvc_AdminRouter;
        $router->on_admin_menu();
        $screen = get_current_screen();
        $action = isset($_GET['action']) ? $_GET['action'] : null;
        $router->initPage( $screen, $action );
        return get_echo( array($router,'renderPage') );
    }



    /**
     * Invoke Ajkax controller without full hook set up.
     * @return string JSON
     */
    protected function renderAjax(){
        $router = new Loco_mvc_AjaxRouter;
        $router->on_init();
        return $router->renderAjax();
    }



    /**
     * @return string
     */
    public function filter_fs_method( $method = '' ){
        return is_null($this->fs_method) ? $method : $this->fs_method;
    }
    
    
    /**
     * @return Loco_test_WordPressTestCase
     */
    public function set_fs_method( $method ){
        $GLOBALS['wp_filesystem'] = null;
        $this->fs_method = $method;
        $ping = class_exists('Loco_test_DummyFtpConnect');
        return $this;
    }
    

    
    /**
     * Remove files created under tmp
     */
    protected function clearTmp(){
        $root = new Loco_fs_Directory( LOCO_TEST_DATA_ROOT.'/tmp' );
        $dir = new Loco_fs_FileFinder( $root );
        $dir->setRecursive( true );
        $dirs = array();
        /* @var $file Loco_fs_File */
        foreach( $dir as $file ){
            $dirs[ $file->dirname() ] = true;
            $file->unlink();
        }
        // Be warned only directories found above will be removed
        foreach( array_keys($dirs) as $path ){
            $dir = new Loco_fs_Directory($path);
            while( $dir->exists() && ! $dir->equal($root) ){
                $dir->unlink();
                $dir = $dir->getParent();
            }
        }
    }

    

   protected function login( $role = 'administrator' ){
        $user = self::factory()->user->create( array( 'role' => $role ) );
        if( $user instanceof WP_Error ){
            foreach( $user->get_error_messages() as $message ){
                trigger_error( $message );
            }
            throw new Exception('Failed to login');
        }
        // setting user required to have proper user object
        $user = wp_set_current_user( $user );
        // simulate default permissions used in admin menu hookage
        if( $user->has_cap('manage_options') ){
            $user->add_cap('loco_admin');
        }
   }
   

   protected function logout(){
       wp_set_current_user( 0 );
       unset( $GLOBALS['current_user'] );
   }


    /**
     * Switch loco_debugging on
     */
    protected function enable_debug(){
        add_filter('loco_debug', '__return_true' );
    }


    /**
     * Switch loco_debugging off
     */
    protected function disable_debug(){
        add_filter('loco_debug', '__return_false' );
    }


    /**
     * Temporarily enable the "en_GB_debug" test locale
     */    
    protected function enable_debug_locale(){
         return $this->enable_locale('en_GB_debug');
    }



    /**
     * Temporarily enable a specific locale
     */    
    protected function enable_locale( $locale ){
         $this->locale = $locale;
         add_filter('locale', array($this,'_filter_locale') );
    }


    /**
     * @internal
     */
    public function _filter_locale(){
        return $this->locale;
    }


    /**
     * Temporarily set test data root to content directory 
     */
    public function enable_test_content_dir(){
        add_filter('loco_constant_WP_CONTENT_DIR', array($this,'_filter_wp_content_dir'), 10, 0 );
    }


    /**
     * @internal
     */
    public function _filter_wp_content_dir(){
        return LOCO_TEST_DATA_ROOT;
    }



    public function capture_redirects(){
        add_filter('wp_redirect', array($this,'filter_wp_redirect'), 10, 2 ); 
    }
    
    

    public function filter_wp_redirect( $location, $status ){
        $this->redirect = func_get_args();
        return false;
    }


    public function assertRedirected( $status = 302, $message = 'Failed to redirect' ){
        $raw = $this->redirect;
        $this->assertInternalType('array', $raw, $message );
        $this->assertSame( $status, $raw[1], $message );
        return $raw[0];
    } 
    


    public function setPostArray( array $post ){
        $_POST = $post;
        $_REQUEST = array_merge( $_GET, $_POST, $_COOKIE );
        Loco_mvc_PostParams::destroy();
    }


    public function addPostArray( array $post ){
        $this->setPostArray( $post + $_POST );
    }


    public function setGetArray( array $get ){
        $_GET = $get;
        $_REQUEST = array_merge( $_GET, $_POST, $_COOKIE );
    }


    public function addGetArray( array $get ){
        $this->setGetArray( $get + $_GET );
    }
    

    
}