<?php
/**
 * 
 */
abstract class Loco_mvc_AdminController extends Loco_mvc_Controller {
    
    /**
     * @var Loco_mvc_View
     */
    private $view;
    
    /**
     * @var float
     */
    private $bench;


    /**
     * Pre-init call invoked by router
     * @return Loco_mvc_AdminController
     */    
    final public function _init( array $args ){
        if( loco_debugging() ){
            $this->bench = microtime( true );
        }
        $this->view = new Loco_mvc_View( $args );
        $this->auth();
        $this->init();
        return $this;
    }



    /**
     * "admin_title" filter, modifies HTML document title if we've set one
     */
    public function filter_admin_title( $admin_title, $title ){
        if( $view_title = $this->get('title') ){
            $admin_title = $view_title.' &lsaquo; '.$admin_title;
        }
        return $admin_title;
    }



    /**
     * {@inheritdoc}
     */
    public function init(){
        
        // add common admin page resources
        $this->enqueueStyle('admin', array('wp-jquery-ui-dialog') );

        // js translations
        if( ( $lang = get_locale() ) && 'en_US' !== $lang ){
            if( file_exists( loco_plugin_root().'/pub/js/lang/'.$lang.'.js' ) ){
                $this->enqueueScript('lang/'.$lang);
            }
        }
        
        // load colour scheme is user has non-default
        $skin = get_user_option('admin_color');
        if( $skin && 'fresh' !== $skin ){
            $this->enqueueStyle( 'skins/'.$skin );
        }
        
        // common js utils
        $this->enqueueScript('min/admin', array('jquery-ui-dialog') );
        
        // check all extensions on all pages so admin notices are shown
        foreach( array('iconv','json','mbstring','tokenizer') as $ext ){
            loco_check_extension($ext);
        }

        /*/ additional system checks
        if( 2147483647 === PHP_INT_MAX ){
            Loco_error_AdminNotices::warn( __("Your operating system is not 64 bit",'loco') );
        }*/
    }



    /**
     * {@inheritdoc}
     */
    public function get( $prop ){
        return $this->view->__get($prop);
    }


    /**
     * {@inheritdoc}
     */
    public function set( $prop, $value ){
        $this->view->set( $prop, $value );
        return $this;
    }


    /**
     * Shortcut for rending template from a simple array of arguments
     * @return string
     */
    public function view( $tpl, array $args = array() ){
        foreach( $args as $prop => $value ){
            $this->set( $prop, $value );
        }
        if( $this->bench ){
            $this->set('debug', new Loco_mvc_ViewParams( array( 
                'time' => microtime(true) - $this->bench,
            ) ) );
        }

        return $this->view->render( $tpl );
    }



    /**
     * Add CSS to head
     * @return Loco_mvc_Controller
     */
    public function enqueueStyle( $name, array $deps = array() ){
        $plugin = loco_plugin_self();
        $version = loco_debugging() ? time() : loco_plugin_version();
        $url = plugins_url( 'pub/css/'.$name.'.css', $plugin );
        wp_enqueue_style( 'loco-'.strtr($name,'/','-'), $url, $deps, $version, 'all' );
        
        return $this;
    }



    /**
     * Add JavaScript to footer
     * @return Loco_mvc_Controller
     */
    public function enqueueScript( $name, array $deps = array() ){
        $plugin = loco_plugin_self();
        $version = loco_debugging() ? time() : loco_plugin_version();
        $url = plugins_url( 'pub/js/'.$name.'.js', $plugin );
        wp_enqueue_script( 'loco-js-'.strtr($name,'/','-'), $url, $deps, $version, true );
        
        return $this;
    }


}