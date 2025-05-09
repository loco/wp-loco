<?php
/**
 * Test case extending the WordPress base
 */
abstract class Loco_test_WordPressTestCase extends WP_UnitTestCase {

    /**
     * @var string
     */
    private $locale = 'en_US';

    /**
     * @var array [ location, status ]
     */
    private $redirect;

    /**
     * @var string
     */
    private $fs_method;

    /**
     * @var bool
     */
    private $fs_allow = true;

    /**
     * @var Loco_data_Cookie[]
     */
    private $cookies_set;

    /**
     * @var Loco_output_Buffer
     */
    private $buffer;
    
    
    /**
     * Drop all Loco data from the options table (including transients)
     * @return void
     */
    protected static function dropOptions(){
        global $wpdb;
        
        $args = ['loco_%','_%_loco_%','%_auto_update_%'];
        $query = $wpdb->prepare( "SELECT option_name FROM $wpdb->options WHERE option_name LIKE '%s' OR option_name LIKE '%s' OR option_name LIKE '%s';", $args );
        if( $results = $wpdb->get_results($query,ARRAY_N) ){
            foreach( $results as $row ){
                list( $option_name ) = $row;
                delete_option( $option_name );
            }
        }
    }

    
    /**
     * @internal
     */
    public static function set_up_before_class(){
        parent::set_up_before_class();
        Loco_data_Settings::clear();
        Loco_data_Session::destroy();
        Loco_data_RecentItems::destroy();
        Loco_data_Preferences::clear();
        self::dropOptions();
        // start with default permissions as if fresh install
        remove_role('translator');
        Loco_data_Permissions::init();
    }

    
    /**
     * @internal
     */
    public static function tear_down_after_class(){
        parent::tear_down_after_class();
        Loco_data_Settings::clear();
        Loco_data_Session::destroy();
        Loco_data_RecentItems::destroy();
        Loco_data_Preferences::clear();
        wp_cache_flush();
        self::dropOptions();
    }

    
    /**
     * {@inheritdoc}
     */
    public function set_up(){
        parent::set_up();
        Loco_mvc_PostParams::destroy();
        Loco_error_AdminNotices::destroy();
        Loco_package_Listener::destroy();
        Loco_fs_Locations::clear();
        wp_cache_flush();
        // text domains should be unloaded at start of all tests, and locale reset
        unset( $GLOBALS['locale'] );
        $GLOBALS['l10n'] = [];
        $GLOBALS['l10n_unloaded'] = [];
        $this->enable_locale('en_US');
        $this->assertSame( 'en_US', get_locale(), 'Ensure test site is English to start');
        $this->assertSame( 'en_US', get_user_locale(),'Ensure test site is English to start');
        // We can't clear the registry, so we have to hack it
        $GLOBALS['wp_textdomain_registry'] = new WP_Textdomain_Registry;
        // Any enqueued scripts should be destroyed
        unset($GLOBALS['wp_scripts']);
        // ensure test themes are registered and WordPress's cache is valid
        register_theme_directory( LOCO_TEST_DATA_ROOT.'/themes' );
        $sniff = get_theme_roots();
        if( ! isset($sniff['empty-theme']) ){
            delete_site_transient( 'theme_roots' );
        }
        remove_all_filters('template');
        remove_all_filters('stylesheet');
        // test plugins require a filter as multiple roots not supported in wp
        remove_all_filters('loco_missing_plugin');
        add_filter( 'loco_missing_plugin', [__CLASS__,'filter_allows_fake_plugins_to_exist'], 10, 2 );
        // avoid WordPress missing index notices
        $GLOBALS['_SERVER'] +=  [
            'HTTP_HOST' => 'localhost',
            'SERVER_PROTOCOL' => 'HTTP/1.0',
            'HTTP_USER_AGENT' => 'Loco/'.get_class($this),
        ];
        // remove all filters before adding
        remove_all_filters('filesystem_method');
        remove_all_filters('loco_constant');
        remove_all_filters('loco_constant_WP_PLUGIN_DIR');
        remove_all_filters('loco_constant_WPMU_PLUGIN_DIR');
        remove_all_filters('loco_constant_DISALLOW_FILE_MODS');
        remove_all_filters('file_mod_allowed');
        remove_all_filters('loco_file_mod_allowed_context');
        remove_all_filters('loco_setcookie');
        remove_all_filters('site_transient_update_core');
        // tests should always dictate the file system method, which defaults to direct
        add_filter('filesystem_method', [$this,'filter_fs_method'] );
        add_filter('loco_constant_DISALLOW_FILE_MODS', [$this,'filter_fs_disallow'] );
        add_filter('file_mod_allowed', [$this,'filter_fs_allow'], 10, 2 ); // <- wp 4.8
        add_filter('loco_file_mod_allowed_context', [$this,'filter_fs_allow_context'],10,2); // <- used with file_mod_allowed
        // capture cookies so we can test what is set 
        add_filter('loco_setcookie', [$this,'captureCookie'], 10, 1 );
        add_filter('site_transient_update_core',[__CLASS__,'filter_site_transient_update_core'], 10, 1 );
        $this->cookies_set = [];
        $this->enable_network();
        //
        if( Loco_error_AdminNotices::destroy() ){
            throw new Exception('Refusing to start test with errors in buffer');
        }
    }
    
    
    public function tear_down(){
        if( $this->buffer ){
            $this->buffer->close();
            $this->buffer = null;
        }
        // ignore all but real error messages after test
        $errors = Loco_error_AdminNotices::get()->filter( Loco_error_Exception::LEVEL_WARNING );
        if( $errors ) {
            Loco_error_AdminNotices::destroy();
            fwrite( STDERR, json_encode($errors,JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) );
            throw new Exception( 'Unflushed admin notices after test' );
        }
        parent::tear_down();
    }


    protected function enable_buffer(){
        if( $this->buffer ){
            $this->buffer->discard();
        }
        $this->buffer = Loco_output_Buffer::start();
    }


    /**
     * {@inheritdoc}
     */
    public function clean_up_global_scope(){
        parent::clean_up_global_scope();
        $_COOKIE = [];
        $_REQUEST = [];
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
     * @return string HTML
     */
    public static function renderPage(){
        $router = new Loco_mvc_AdminRouter;
        $router->on_admin_menu();
        $screen = get_current_screen();
        $action = isset($_GET['action']) ? $_GET['action'] : null;
        $router->initPage( $screen, $action );
        $html = get_echo( [$router,'renderPage'] );
        // ensure further hooks fired as WordPress continues to render admin footer
        do_action('in_admin_footer');
        do_action('admin_footer','');
        get_echo( 'do_action', ['admin_print_footer_scripts'] );
        // Capture late errors flushed on destruct
        // $data = Loco_error_AdminNotices::destroyAjax();
        $html .= get_echo( [Loco_error_AdminNotices::get(),'on_loco_admin_notices'] );
        return $html;
    }



    /**
     * Invoke Ajax controller without full hook set up.
     * @return string JSON
     */
    protected function renderAjax(){
        wp_magic_quotes(); // <- I hate this, but it's what WP does!
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
        class_exists('Loco_test_DummyFtpConnect'); // ping
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
     * Filters wp_is_file_mod_allowed for WP >= 4.8
     * @internal
     */
    public function filter_fs_allow( $bool, $context = '' ){
        if( 'loco_test' === $context ){
            $bool = $this->fs_allow;
        }
        return $bool;
    }


    /**
     * Filters DISALLOW_FILE_MODS for WP < 4.8
     * @internal
     */
    public function filter_fs_disallow(){
        return ! $this->fs_allow;
    }    


    /**
     * Filters context passed to filter_fs_allow
     * @internal
     * @noinspection PhpUnusedParameterInspection
     */
    public function filter_fs_allow_context( $context, ?Loco_fs_File $file = null ){
        return 'loco_test';
    }


    /**
     * Remove files created under tmp
     * @return void
     */
    protected function clearTmp(){
        $root = new Loco_fs_Directory( LOCO_TEST_DATA_ROOT.'/tmp' );
        $dir = new Loco_fs_FileFinder( $root );
        $dir->setRecursive( true );
        $dirs = [];
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


    
    /**
     * Log a mock user into WordPress
     * @return void
     */
    protected function login( $role = 'administrator' ){
        $wpRole = get_role($role);
        if( ! $wpRole ){
            throw new Exception('No such role, '.$role );
        }
        else if( ! $wpRole->capabilities ){
            throw new Exception( $role.' role has no capabilities' );
        }
       
        $user = self::factory()->user->create( [ 'role' => $role ] );
        /*if( $user instanceof WP_Error ){
            foreach( $user->get_error_messages() as $message ){
                trigger_error( $message );
            }
            throw new Exception('Failed to login');
        }*/
        // setting user required to have proper user object
        $user = wp_set_current_user( $user );
        // simulate default permissions used in admin menu hook
        if( $user->has_cap('manage_options') ){
            $user->add_cap('loco_admin');
        }
        // simulate wp_set_auth_cookie. Can't actually set cookie cos headers
        $_COOKIE[LOGGED_IN_COOKIE] = wp_generate_auth_cookie( $user->ID, time()+60, 'logged_in' );
        // $debug = array( 'name' => $this->getName(), 'token' => wp_get_session_token() ,'uid' => $user->ID );
        // forcing new session instance
        new Loco_data_Session;
    }



    /**
     * Log out current WordPress user
     * @return void
     */
    protected function logout(){
        Loco_data_Session::destroy();
        wp_destroy_current_session();
        unset( $_COOKIE[LOGGED_IN_COOKIE] );
        wp_set_current_user( 0 );
        $GLOBALS['current_user'] = null;
    }


    /**
     * Fully unload a text domain
     */
    protected function unload_textdomain( string $domain ):void {
        global $l10n, $l10n_unloaded;
        unload_textdomain( $domain );
        unset($l10n[$domain],$l10n_unloaded[$domain]);
    }



    /**
     * Disallow network access
     * @return void
     */
    protected function disable_network(){
        remove_all_filters('loco_allow_remote');
        add_filter('loco_allow_remote', '__return_false' );
    }


    /**
     * Enable network access
     * @return void
     */
    protected function enable_network(){
        remove_all_filters('loco_allow_remote');
    }


    /**
     * Switch loco_debugging on
     * @return void
     */
    protected function enable_debug(){
        remove_all_filters('loco_debug');
        add_filter('loco_debug', '__return_true' );
    }


    /**
     * Switch loco_debugging off
     * @return void
     */
    protected function disable_debug(){
        remove_all_filters('loco_debug');
        add_filter('loco_debug', '__return_false' );
    }


    /**
     * Temporarily enable the "en_GB_debug" test locale
     * @return void
     */    
    protected function enable_debug_locale(){
         $this->enable_locale('en_GB_debug');
    }


    /**
     * Temporarily enable a specific locale
     * @return void
     */    
    protected function enable_locale( $tag ){
         $locale = Loco_Locale::parse($tag);
         $this->locale = (string) $locale;
         remove_all_filters('locale');
         add_filter('locale', [$this,'_filter_locale'] );
    }


    /**
     * @internal
     */
    public function _filter_locale():string {
        return $this->locale;
    }


    /**
     * Temporarily set test data root to content directory 
     * @return void
     */
    public function enable_test_content_dir(){
        remove_all_filters('loco_constant_WP_CONTENT_DIR');
        add_filter('loco_constant_WP_CONTENT_DIR', [$this,'_filter_wp_content_dir'], 10, 0 );
    }


    /**
     * @internal
     */
    public function _filter_wp_content_dir(){
        return LOCO_TEST_DATA_ROOT;
    }


    /**
     * @internal
     */
    public function capture_redirects(){
        remove_all_filters('wp_redirect');
        add_filter('wp_redirect', [$this,'filter_wp_redirect'], 10, 2 ); 
    }
    
    
    /**
     * @internal
     */
    public function filter_wp_redirect( $location, $status ){
        $this->redirect = func_get_args();
        return false;
    }
    
    
    
    
    protected function activate_test_theme( string $slug ):void {
        $closure = function () use( $slug ){
            return $slug;
        };
        add_filter('stylesheet', $closure,10,0);
        add_filter('template', $closure, 10,0);
       /* add_filter('theme_root',function ($theme_root){
            Loco_error_Debug::trace('? %s',$theme_root);
            return $theme_root;
        },10,1);*/
        /*add_filter('stylesheet_directory', function( $stylesheet_dir, $stylesheet, $theme_root) {
            Loco_error_Debug::trace('%s',$stylesheet_dir);
            Loco_error_Debug::trace('%s',$stylesheet);
            Loco_error_Debug::trace('%s',$theme_root);
            return $stylesheet_dir;
        }, 10, 3 );*/
    }
    
    


    /**
     * @internal 
     */
    public static function filter_allows_fake_plugins_to_exist( array $data, $handle ):array {
        $file = LOCO_TEST_DATA_ROOT.'/plugins/'.$handle;
        if( file_exists($file) && is_file($file) ) {
            $data = get_plugin_data($file,false,false);
            $snip = -strlen($handle);
            $data['basedir'] = substr($file,0,--$snip);
        }
        return $data;
    }
    
    
    public static function filter_enforce_test_plugins_only( string $path ):string {
        return LOCO_TEST_DATA_ROOT.'/'.basename($path);
    }
    
    
    public function enable_test_plugins(){
        wp_cache_delete('plugins','loco');
        add_filter('loco_constant_WP_PLUGIN_DIR',[__CLASS__,'filter_enforce_test_plugins_only']);
        add_filter('loco_constant_WPMU_PLUGIN_DIR',[__CLASS__,'filter_enforce_test_plugins_only']);
    }
    


    /**
     * Fake update prompts to avoid polluting output
     * @internal
     */
    public static function filter_site_transient_update_core( $value ){
        // fwrite( STDERR, json_encode($value) );
        return (object) [ 'updates' => [] ];
    }


    /**
     * @param int $status
     * @param string $message
     * @return string location
     */
    public function assertRedirected( $status = 302, $message = 'Failed to redirect' ){
        $raw = $this->redirect;
        $this->assertIsArray( $raw, $message );
        $this->assertSame( $status, $raw[1], $message );
        return $raw[0];
    } 


    /**
     * Set $_POST
     * @param string[] $post
     * @return void
     */
    public function setPostArray( array $post ){
        $_POST = $post;
        $_REQUEST = array_merge( $_GET, $_POST, $_COOKIE );
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_FILES = [];
        Loco_mvc_PostParams::destroy();
    }


    /**
     * Augment $_POST
     * @param string[] $post
     * @return void
     */
    public function addPostArray( array $post ){
        $this->setPostArray( $post + $_POST );
    }


    /**
     * Set $_GET
     * @param string[] $get
     * @return void
     */
    public function setGetArray( array $get ){
        $_GET = $get;
        $_REQUEST = array_merge( $_GET, $_POST, $_COOKIE );
        $_SERVER['REQUEST_METHOD'] = 'GET';
        $_FILES = [];
    }


    /**
     * Augment $_GET
     * @param string[] $get
     * @return void
     */
    public function addGetArray( array $get ){
        $this->setGetArray( $get + $_GET );
    }
    
    
    /**
     * @param string $key _FILES key
     * @param string $path real file on local system that would be uploaded
     */
    public function addFileUpload( $key, $path ){
        if( 'POST' !== $_SERVER['REQUEST_METHOD'] ){
            throw new LogicException('Set POST method before adding to files collection');
        }
        $src = file_get_contents($path);
        $tmp = tempnam(LOCO_TEST_DATA_ROOT.'/tmp','phpunit');
        $len = file_put_contents( $tmp, $src);
        if( $len !== strlen($src) ){
            throw new Exception('Bad file params');
        }
        $_FILES[$key] =  [
            'error' => 0,
            'tmp_name' => $tmp,
            'name' => basename($path),
        ];
    }


    /*
     * {@inheritDoc}
     *
    public static function assertContains( $needle, $haystack, $message = '' ):void {
        if( is_string($haystack) ){
            trigger_error('Use assertStringContainsString', E_USER_DEPRECATED );
            parent::assertStringContainsString($needle,$haystack,$message);
        }
        else {
            parent::assertContains( $needle, $haystack, $message );
        }
    }*/

}