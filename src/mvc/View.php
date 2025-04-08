<?php

/**
 * View renderer
 * @property-read string $_content
 * @property-read string|null $_trash
 */
class Loco_mvc_View implements IteratorAggregate {

    /**
     * @var Loco_mvc_ViewParams
     */
    private $scope;
    
    /**
     * View that is decorating current view
     * @var self
     */
    private $parent;
    
    /**
     * Current template as full path to PHP file
     * @var string
     */
    private $template;
    
    /**
     * Current working directory for finding templates by relative path
     * @var string
     */
    private $cwd;

    /**
     * Name of current output buffer
     * @var string
     */
    private $block;


    /**
     * @internal
     */
    public function __construct( array $args = [] ){
        $this->scope = new Loco_mvc_ViewParams( $args );
        $this->cwd = loco_plugin_root().'/tpl';
    }
    
    
    /**
     * Change base path for template paths
     * @param string $path relative to current directory
     */
    public function cd( string $path ):self {
        if( $path && '/' === substr($path,0,1) ){
            $this->cwd = untrailingslashit( loco_plugin_root().'/tpl'.$path );
        }
        else {
            $this->cwd = untrailingslashit( $this->cwd.'/'.$path );
        }
        return $this;
    }    
    

    /**
     * @internal
     * Clean up if something abruptly stopped rendering before graceful end
     */
    public function __destruct(){
        if( $this->block ){
            ob_end_clean();
        }
    }


    /**
     * Render error screen HTML
     */
    public static function renderError( Loco_error_Exception $e ):string {
        $view = new Loco_mvc_View;
        try {
            $view->set( 'error', $e );
            return $view->render( $e->getTemplate() );
        }
        catch( Exception $e ){
            return '<h1>'.esc_html( $e->getMessage() ).'</h1>';
        }
    }


    /**
     * Make this view a child of another template. i.e. decorate this with that.
     * Parent will have access to original argument scope, but separate from now on
     * @return self the parent view
     */
    private function extend( string $tpl ):self {
        $this->parent = new Loco_mvc_View;
        $this->parent->cwd = $this->cwd;
        $this->parent->setTemplate( $tpl );
        return $this->parent;
    }


    /**
     * After start is called any captured output will be placed in the named variable
     */
    private function start( string $name ):void {
        $this->stop();
        $this->scope[$name] = null;
        $this->block = $name;
    }


    /**
     * When stop is called, buffered output is saved into current variable for output by parent template, or at end of script.
     * @return void
     */
    private function stop(){
        $content = ob_get_contents();
        ob_clean();
        if( $b = $this->block ){
            if( isset($this->scope[$b]) ){
                $content = $this->scope[$b].$content;
            }
            $this->scope[$b] = new _LocoViewBuffer($content);
        }
        $this->block = '_trash';
    }


    /**
     * {@inheritDoc}
     */
    #[ReturnTypeWillChange]
    public function getIterator(){
        return $this->scope;
    }


    /**
     * @internal
     * @return mixed
     */
    public function __get( string $prop ){
        return $this->has($prop) ? $this->get($prop) : null;
    }


    /**
     * @param string $prop
     * @return bool
     */
    public function has( string $prop ):bool {
        return $this->scope->offsetExists($prop);
    }


    /**
     * Get property after checking with self::has
     * @param string $prop
     * @return mixed
     */
    public function get( string $prop ){
        return $this->scope[$prop];
    }


    /**
     * Set a view argument
     * @param string $prop
     * @param mixed $value
     *
     * @return Loco_mvc_View
     */
    public function set( string $prop, $value ):self {
        $this->scope[$prop] = $value;
        return $this;
    }



    /**
     * Main entry to rendering complete template
     * @param string $tpl template name excluding extension
     * @param array|null $args extra arguments to set in view scope
     * @param self|null $parent parent view rendering this view
     */
    public function render( string $tpl, ?array $args = null, ?Loco_mvc_View $parent = null ):string {
        if( $this->block ){
            return $this->fork()->render( $tpl, $args, $this );
        }
        $this->setTemplate($tpl);
        if( $parent && $this->template === $parent->template ){
            throw new Loco_error_Exception('Avoiding infinite loop');
        }
        if( is_array($args) ){
            foreach( $args as $prop => $value ){
                $this->set($prop, $value);
            }
        }
        ob_start();
        $content = $this->buffer();
        ob_end_clean();
        return $content;
    }



    /**
     * Do actual render of currently validated template path
     * @return string content not captured in sub-blocks
     */
    private function buffer():string {
        $this->start('_trash');
        $this->execTemplate( $this->template );
        $this->stop();
        $this->block = null;
        // decorate via parent view if there is one
        if( $this->parent ){
            $this->parent->scope = clone $this->scope;
            $this->parent->set('_content', $this->_trash );
            return $this->parent->buffer();
        }
        // else at the root of view chain
        return (string) $this->_trash;
    }



    /**
     * Set current template
     * @param string $tpl Path to template, excluding file extension
     */
    public function setTemplate( string $tpl ):void {
        $file = new Loco_fs_File( $tpl.'.php' );
        $file->normalize( $this->cwd );
        if( ! $file->exists() ){
            $debug = str_replace( loco_plugin_root().'/', '', $file->getPath() );
            throw new Loco_error_Exception( 'Template not found: '.$debug );
        }
        $this->cwd = $file->dirname();
        $this->template = $file->getPath();
    }


    private function fork():self {
        $view = new Loco_mvc_View;
        $view->cwd = $this->cwd;
        $view->scope = clone $this->scope;
        
        return $view;
    }


    /**
     * Do actual runtime template include
     */
    private function execTemplate( string $template ):void {
        $params = $this->scope;
        extract( $params->getArrayCopy() );
        include $template;
    }


    /**
     * Link generator
     * @param string $route page route, e.g. "config"
     * @param array $args optional page arguments
     */
    public function route( string $route, array $args = [] ):Loco_mvc_ViewParams {
        return new Loco_mvc_ViewParams(  [
            'href' => Loco_mvc_AdminRouter::generate( $route, $args ),
        ] );
    }


    /**
     * Shorthand for `echo esc_html( sprintf( ...`
     */
    private static function e( string $text ):string {
        if( 1 < func_num_args() ){
            $args = func_get_args();
            $text = call_user_func_array( 'sprintf', $args );
        }
        echo htmlspecialchars( $text, ENT_COMPAT, 'UTF-8' );
        return '';
    }

}



/**
 * @internal
 */
class _LocoViewBuffer {
    
    private $s;

    public function __construct( $s ){
        $this->s = $s;
    }

    public function __toString(){
        return $this->s;
    }    
    
}
