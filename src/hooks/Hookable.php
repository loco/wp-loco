<?php
/**
 * Hookable objects automatically bind Wordpress filters and actions instance methods.
 * - Filter methods take the form `public function filter_{hook}()`
 * - Actions methods take the form `public function on_{hook}`
 */
abstract class Loco_hooks_Hookable {

    /**
     * Registry of tags to be deregistered when object removed from memory
     * @var array
     */
    private $hooks;


    /**
     * Constructor register hooks immediately
     */
    public function __construct(){

        $ref = new ReflectionClass( $this );
        $this->hooks = [];
        foreach( $ref->getMethods( ReflectionMethod::IS_PUBLIC ) as $method ){
            $func = $method->name;
            // support filter_{filter_hook} methods
            if( 'filter_' === substr($func,0,7) ) {
                $hook = substr( $func, 7 );
            }
            // support on_{action_hook} methods
            else if( 'on_' === substr($func,0,3) ) {
                $hook = substr( $func, 3 );
            }
            // support debug_{filter|action_hook} methods only in debug mode
            else if( 'debug_' === substr($func,0,6) && loco_debugging() ) {
                $hook = substr( $func, 6 );
            }
            else {
                continue;
            }
            // this goes to 11 so we run after system defaults
            $priority = 11;
            // support @priority tag in comment block (uncomment if needed)
            /*if( ( $docblock = $method->getDocComment() ) && ( $offset = strpos($docblock,'@priority ') ) ){
                preg_match( '/^\d+/', substr($docblock,$offset+10), $r ) and
                $priority = (int) $r[0];
            }*/
            $num_args = $method->getNumberOfParameters();
            $this->addHook( $hook, $func, $num_args, $priority );
        }
    }



    /**
     * Manually append a hook, regardless of whether it's added already
     */
    protected function addHook( $hook, $func, $num_args = 0, $priority = 11  ){
        // call add_action or add_filter with required arguments and hook is registered
        add_filter( $hook, [ $this, $func ], $priority, $num_args );
        $this->hooks[] = [ $hook, $func, $priority, $num_args ];
    }


    /**
     * Ensure all hooks in memory are re-attached if they've been removed
     */
    protected function reHook(){
        if( is_array($this->hooks) ){
            foreach( $this->hooks as $r ){
                list( $hook, $func, $priority, $num_args ) = $r;
                if( ! has_filter($hook,[$this,$func]) ){
                    add_filter( $hook, [$this,$func], $priority, $num_args );
                }
            }
        }
    }


    /**
     * Deregister active hooks.
     * We can't use __destruct because instances persist in WordPress hook registry
     */
    public function unhook(){
        if( is_array($this->hooks) ){
            foreach( $this->hooks as $r ){
                remove_filter( $r[0], [$this,$r[1]], $r[2] );
            }
        }
        $this->hooks = null;
    }

}