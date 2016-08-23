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
     * "admin_footer_text" filter, modifies admin footer only on Loco pages
     */
    public function filter_admin_footer_text(){
        $url = apply_filters('loco_external', 'https://localise.biz/');
        return '<span id="loco-credit">'.sprintf( '<span>%s</span> <a href="%s" target="_blank">Loco</a>', esc_html(__('Loco Translate is powered by','loco')), esc_url($url) ).'</span>';
    }

    
    /**
     * "update_footer" filter, prints Loco version number in admin footer
     */
    public function filter_update_footer( $text ){
        $html = sprintf( '<span>v%s</span>', loco_plugin_version() );
        if( $this->bench ){
            $info = $this->get('debug');
            $html .= sprintf('<span>%sms</span>', number_format($info->time,2) );
        }
        return $html;
    }


    /**
     * "loco_external" filter callback, campaignizes external links
     */
    public function filter_loco_external( $url ){
        static $query;
        if( ! isset($query) ){
            $query = http_build_query( array( 'utm_campaign' => 'wp', 'utm_source' => 'admin', 'utm_content' => $this->get('_route') ), null, '&' );
        }
        $u = parse_url( $url );
        if( isset($u['host']) && 'localise.biz' === $u['host'] ){
            $url = 'https://localise.biz'.$u['path'];
            if( isset($u['query']) ){
                $url .= '?'. $u['query'].'&'.$query;
            }
            else {
                $url .= '?'.$query;
            }
            if( isset($u['fragment']) ){
                $url .= '#'.$u['fragment'];
            }
        }
        return $url;
    }


    /**
     * {@inheritdoc}
     */
    public function init(){

        // add contextual help tabs to current screen if there are any
        if( $screen = get_current_screen() ){
            $this->view->cd('/admin/help');
            $tabs = $this->getHelpTabs();
            // always append common help tabs
            $tabs[ __('Help & support','loco') ] = $this->view->render('tab-support');
            // set all tabs and common side bar
            $i = 0;
            foreach( $tabs as $title => $content ){
                $id = sprintf('loco-help-%u', $i++ );
                $screen->add_help_tab( compact('id','title','content') );
            }
            $screen->set_help_sidebar( $this->view->render('side-bar') );
            $this->view->cd('/');
        }
        
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
        
        // check essential extensions on all pages so admin notices are shown
        foreach( array('json','mbstring') as $ext ){
            loco_check_extension($ext);
        }
    }


    /**
     * All admin screens must define help tabs, eve if they return empty
     * @return array
     */
    public function getHelpTabs(){
        return array();
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