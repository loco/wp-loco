<?php
/**
 * Test case extending the WordPress base
 */
abstract class Loco_test_WordPressTestCase extends WP_UnitTestCase {
    
    private $locale = 'en_US';

    private $redirect;
    
    private $fs_method;
    
    private $fs_allow = true;
    
    private $cookies_set;
    
    
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
        Loco_data_Session::destroy();
        Loco_data_RecentItems::destroy();
        self::dropOptions();
    }

    
    public static function tearDownAfterClass(){
        parent::tearDownAfterClass();
        Loco_data_Settings::clear();
        Loco_data_Session::destroy();
        Loco_data_RecentItems::destroy();
        wp_cache_flush();
        self::dropOptions();
    }

    
    public function setUp(){
        parent::setUp();
        Loco_mvc_PostParams::destroy();
        Loco_error_AdminNotices::destroy();
        Loco_package_Listener::destroy();
        wp_cache_flush();
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
            'HTTP_USER_AGENT' => 'Loco/'.get_class($this),
        );
        // tests should always dictate the file system method, which defaults to direct
        add_filter('filesystem_method', array($this,'filter_fs_method') );
        add_filter('loco_constant_DISALLOW_FILE_MODS', array($this,'filter_fs_allow') );
        // capture cookies so we can test what is set 
        add_filter('loco_setcookie', array($this,'captureCookie'), 10, 1 );
        $this->cookies_set = array();
    }


    /**
     * {@inheritdoc}
     */
    public function clean_up_global_scope(){
        parent::clean_up_global_scope();
        $_COOKIE = array();
        $_REQUEST = array();
    }


    /**
     * Capture cookie and prevent actual http sending
     */
    public function captureCookie( Loco_data_Cookie $cookie ){
        $this->cookies_set[ $cookie->getName() ] = $cookie;
        return false;
    }


    /**
     * @return Loco_data_Cookie
     */
    public function assertCookieSet( $name, $message = '' ){
        $this->assertArrayHasKey( $name, $this->cookies_set, $message );
        $cookie = $this->cookies_set[ $name ];
        $this->assertInstanceOf( 'Loco_data_Cookie', $cookie, $message );
        return $cookie;
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
     * @internal
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
     * @return Loco_test_WordPressTestCase
     */
    public function disable_file_mods(){
        $this->fs_allow = false;
        return $this;
    } 


    /**
     * @internal
     */
    public function filter_fs_allow(){
        return ! $this->fs_allow;
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
        // simulate wp_set_auth_cookie. Can't actually set cookie cos headers
       $_COOKIE[LOGGED_IN_COOKIE] = wp_generate_auth_cookie( $user->ID, time()+60, 'logged_in' );
       $debug = array( 'name' => $this->getName(), 'token' => wp_get_session_token() ,'uid' => $user->ID );
       // forcing new session instance
       new Loco_data_Session;
   }
   

   protected function logout(){
       Loco_data_Session::destroy();
       wp_destroy_current_session();
       unset( $_COOKIE[LOGGED_IN_COOKIE] );
       wp_set_current_user( 0 );
       $GLOBALS['current_user'] = null;
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
        $_SERVER['REQUEST_METHOD'] = 'POST';
        Loco_mvc_PostParams::destroy();
    }


    public function addPostArray( array $post ){
        $this->setPostArray( $post + $_POST );
    }


    public function setGetArray( array $get ){
        $_GET = $get;
        $_REQUEST = array_merge( $_GET, $_POST, $_COOKIE );
        $_SERVER['REQUEST_METHOD'] = 'GET';
    }


    public function addGetArray( array $get ){
        $this->setGetArray( $get + $_GET );
    }
    

    
}