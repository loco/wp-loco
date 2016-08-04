<?php
/**
 * Recently items to display on home page
 */
class Loco_data_RecentItems extends Loco_data_Option {

    /**
     * Global instance of recent items
     * @var Loco_data_RecentItems
     */
    private static $current;

    
    /**
     * {@inheritdoc}
     */
    public function getKey(){
        return 'recent';
    }


    /**
     * @return Loco_data_RecentItems
     */
    public static function get(){
        if( ! self::$current ){
            self::$current = new Loco_data_RecentItems;
            self::$current->fetch();
        }
        return self::$current;
    }



    /**
     * Trash data and remove from memory
     */
    public static function destroy(){
        $tmp = new Loco_data_RecentItems;
        $tmp->remove();
        self::$current = null;
    }



    /**
     * @internal
     * @return Loco_data_RecentItems 
     */
    private function push( $object, array $indexes ){
        foreach( $indexes as $key => $id ){
            $stack = isset($this[$key]) ? $this[$key] : array();
            // remove before add ensures latest item appended to hashmap
            unset($stack[$id]);
            $stack[$id] = time();
            // TODO implement pruning by max length or oldest item... 
            $this[$key] = $stack;
        }
        return $this;
    }



    /**
     * @return array
     */
    private function getItems( $key, $offset, $count ){
        $stack = isset($this[$key]) ? $this[$key] : array();
        // hash map should automatically be in "push" order but sorting to be sure.
        asort( $stack, SORT_NUMERIC );
        $stack = array_keys( $stack );
        if( is_null($count) && 0 === $offset ){
            return $stack;
        }
        return array_slice( $stack, $offset, $count, false );
    }



    /**
     * Push bundle to the front of recent bundles stack
     * @return Loco_data_RecentItems 
     */
    public function pushBundle( Loco_package_Bundle $bundle ){
        return $this->push( $bundle, array( 'bundle' => $bundle->getId() ) );
    }
    
    
    /**
     * Get bundle IDs
     * @return array
     */
    public function getBundles( $offset = 0, $count = null ){
        return $this->getItems('bundle', $offset, $count );
    }


    /**
     * Push project to the front of recent bundles stack
     * @return Loco_data_RecentItems
     */
    public function pushProject( Loco_package_Project $bundle ){
        return $this;
    }
    

}
