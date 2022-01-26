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
     * Debugging timestamp (microseconds)
     * @var float
     */
    private $bench;

    /**
     * Base url to plugin folder for web access
     * @var string
     */
    private $baseurl;

    /**
     * @var string[]
     */
    private $scripts = array();
    

    /**
     * Pre-init call invoked by router
     * @param array
     * @return static
     */    
    final public function _init( array $args ){
        if( loco_debugging() ){
            $this->bench = microtime( true );
        }
        $this->view = new Loco_mvc_View( $args );
        $this->auth();
        
        // check essential extensions on all pages so admin notices are shown
        loco_check_extension('json');
        loco_check_extension('mbstring');

        // add contextual help tabs to current screen if there are any
        if( $screen = get_current_screen() ){
            try {
                $this->view->cd('/admin/help');
                $tabs = $this->getHelpTabs();
                // always append common help tabs
                $tabs[ __('Help & support','loco-translate') ] = $this->view->render('tab-support');
                // set all tabs and common side bar
                $i = 0;
                foreach( $tabs as $title => $content ){
                    $id = sprintf('loco-help-%u', $i++ );
                    $screen->add_help_tab( compact('id','title','content') );
                }
                $screen->set_help_sidebar( $this->view->render('side-bar') );
                $this->view->cd('/');
            }
            // avoid critical errors rendering non-critical part of page
            catch( Loco_error_Exception $e ){
                $this->view->cd('/');
                Loco_error_AdminNotices::add( $e );
            }
        }
        
        // helper properties for loading static resources
        $this->baseurl = plugins_url( '', loco_plugin_self() );
        
        // add common admin page resources
        $this->enqueueStyle('admin', array('wp-jquery-ui-dialog') );

        // load colour scheme is user has non-default
        $skin = get_user_option('admin_color');
        if( $skin && 'fresh' !== $skin ){
            $this->enqueueStyle( 'skins/'.$skin );
        }
        
        // core minimized admin.js loaded on all pages before any other Loco scripts
        $this->enqueueScript('admin', array('jquery-ui-dialog') );
        
        $this->init();
        return $this;
    }



    /**
     * Post-construct initializer that may be overridden by child classes
     * @return void
     */
    public function init(){
        
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
        return '<span id="loco-credit">'.sprintf( '<span>%s</span> <a href="%s" target="_blank">Loco</a>', esc_html(__('Loco Translate is powered by','loco-translate')), esc_url($url) ).'</span>';
    }

    
    /**
     * "update_footer" filter, prints Loco version number in admin footer
     */
    public function filter_update_footer( /*$text*/ ){
        $html = sprintf( '<span>v%s</span>', loco_plugin_version() );
        if( $this->bench && ( $info = $this->get('_debug') ) ){
            $html .= sprintf('<span>%ss</span>', number_format_i18n($info['time'],2) );
        }
        return $html;
    }


    /**
     * "loco_external" filter callback, adds campaign identifier onto external links
     */
    public function filter_loco_external( $url ){
        $u = parse_url( $url );
        if( isset($u['host']) && 'localise.biz' === $u['host'] ){
            $query = http_build_query( array( 'utm_medium' => 'plugin', 'utm_campaign' => 'wp', 'utm_source' => 'admin', 'utm_content' => $this->get('_route') ) );
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
     * All admin screens must define help tabs, even if they return empty
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
     * Render template for echoing into admin screen
     * @param string template name
     * @param array template arguments
     * @return string
     */
    public function view( $tpl, array $args = array() ){
        /*if( ! $this->baseurl ){
            throw new Loco_error_Debug('Did you mean to call $this->viewSnippet('.json_encode($tpl,JSON_UNESCAPED_SLASHES).') in '.get_class($this).'?');
        }*/
        $view = $this->view;
        foreach( $args as $prop => $value ){
            $view->set( $prop, $value );
        }
        // ensure JavaScript config present if any scripts are loaded
        if( $view->has('js') ) {
            $jsConf = $view->get( 'js' );
        }
        else if( $this->scripts ){
            $jsConf = new Loco_mvc_ViewParams;
            $this->set('js',$jsConf);
        }
        else {
            $jsConf = null;
        }
        if( $jsConf instanceof Loco_mvc_ViewParams ){
            // ensure config has access to latest version information
            // we will use this to ensure scripts are not cached by browser, or hijacked by other plugins
            $jsConf->offsetSet('$v', array( loco_plugin_version(), $GLOBALS['wp_version']) );
            $jsConf->offsetSet('$js', array_keys($this->scripts) );
            $jsConf->offsetSet('WP_DEBUG', loco_debugging() );
            // localize script if translations in memory
            if( is_textdomain_loaded('loco-translate') ){
                $strings = new Loco_js_Strings;
                $jsConf->offsetSet('wpl10n',$strings->compile());
                $strings->unhook();
                unset( $strings );
                // add currently loaded locale for passing plural equation into js.
                // note that plural rules come from our data, because MO is not trusted.
                $tag = apply_filters( 'plugin_locale', get_locale(), 'loco-translate' );
                $jsConf->offsetSet('wplang', Loco_Locale::parse($tag) );
            }
            // localized formatting from core translations
            global $wp_locale;
            if( is_object($wp_locale) && property_exists($wp_locale,'number_format') ){
                $jsConf->offsetSet('wpnum', array_map(array($this,'filter_number_format_i18n'),$wp_locale->number_format) );
            }
        }
        // take benchmark for debugger to be rendered in footer
        if( $this->bench ){
            $this->set('_debug', new Loco_mvc_ViewParams( array( 
                'time' => microtime(true) - $this->bench,
            ) ) );
        }
        // add urgent deprecation warning. Next version of Loco Translate will not run below these versions.
        if( version_compare(PHP_VERSION,'5.6.20','<') || version_compare($GLOBALS['wp_version'],'5.2','<') ){
            $this->set('_deprecation', true );
        }
        
        return $view->render( $tpl );
    }


    /**
     * Shortcut to render template without full page arguments as per view
     * @param string
     * @return string
     */
    public function viewSnippet( $tpl ){
        return $this->view->render( $tpl );
    }


    /**
     * Add CSS to head
     * @param string stem name of file, e.g "editor"
     * @param string[] dependencies of this stylesheet
     * @return Loco_mvc_Controller
     */
    public function enqueueStyle( $name, array $deps = array() ){
        $base = $this->baseurl;
        if( ! $base ){
            throw new Loco_error_Exception('Too early to enqueueStyle('.var_export($name,1).')');
        }
        $id = 'loco-translate-'.strtr($name,'/','-');
        // css always minified. sass in build env only
        $href = $base.'/pub/css/'.$name.'.css';
        $vers = apply_filters( 'loco_static_version', loco_plugin_version(), $href );
        wp_enqueue_style( $id, $href, $deps, $vers, 'all' );
        return $this;
    }


    /**
     * Add JavaScript to footer
     * @param string stem name of file, e.g "editor"
     * @param string[] dependencies of this script
     * @return Loco_mvc_Controller
     */
    public function enqueueScript( $name, array $deps = array() ){
        $base = $this->baseurl;
        if( ! $base ){
            throw new Loco_error_Exception('Too early to enqueueScript('.json_encode($name).')');
        }
        // use minimized javascript file. hook into script_loader_src to point at development source
        $href = $base.'/pub/js/min/'.$name.'.js';
        $vers = apply_filters( 'loco_static_version', loco_plugin_version(), $href );
        $id = 'loco-translate-'.strtr($name,'/','-');
        wp_enqueue_script( $id, $href, $deps, $vers, true );
        $this->scripts[$id] = $href;
        return $this;
    }


    /**
     * @internal
     * @param string
     * @param string
     * @return string
     */
    public function filter_script_loader_tag( $tag, $id ) {
        if( array_key_exists($id,$this->scripts) ) {
            // Add element id for in-dom verification of expected scripts
            if( '<script ' === substr($tag,0,8) ){
                // WordPress has started adding their own ID since v5.5 which simply appends -js to the handle
                $id .= '-js';
                if( false === strpos($tag,$id) ){
                    $tag = '<script id="'.$id.'" '.substr($tag,8);
                }
            }
        }
        return $tag;
    }

}
