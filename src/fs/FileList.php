<?php
/**
 * Simple list of file paths
 */
class Loco_fs_FileList extends ArrayIterator implements Loco_fs_FileListInterface {

    /**
     * Hash map for ensuring files only added once
     * @var array
     */
    private $unique = array();
    
    /**
     * Override to ensure original list is indexed
     */
    public function __construct( $a = array() ){
        parent::__construct( array() );
        foreach( $a as $file ){
            $this->add( $file );
        }
    }


    /**
     * Like getArrayCopy, but exports string paths
     * @return array
     */
    public function export(){
        $a = array();
        foreach( $this as $file ){
            $a[] = (string) $file;
        }
        return $a;
    }


    /**
     * @internal
     */
    public function __toString(){
        return implode( "\n", $this->getArrayCopy() );
    }


    /**
     * Generate a unique key for file
     * @return string
     */
    private function hash( Loco_fs_File $file ){
        $path = $file->normalize();
        // if file is real, we must resolve its real path
        if( $file->exists() && ( $real = realpath($path) ) ){
            $path = $real;
        }
        return $path;
    }


    /**
     * @codeCoverageIgnore
     */
    public function offsetSet( $index, $value ){
        throw new Exception('Use Loco_fs_FileList::add');
    }


    /**
     * Add a file uniquely collection
     * @return Loco_fs_FileList
     */
    public function add( Loco_fs_File $file ){
        $hash = $this->hash( $file );
        if( ! isset($this->unique[$hash]) ){
            $this->unique[$hash] = true;
            parent::offsetSet( null, $file );
        }
        
        return $this;
    }


    /**
     * Check if given file is already in list
     * @return bool
     */
    public function has( Loco_fs_File $file ){
        $hash = $this->hash( $file );
        return isset($this->unique[$hash]);
    }


    /**
     * Get a copy of list with only files not contained in passed list
     * @return Loco_fs_FileList
     */
    public function diff( Loco_fs_FileList $not_in ){
        $list = new Loco_fs_FileList;
        foreach( $this as $file ){
            $not_in->has($file) || $list->add( $file );
        }
        return $list;
    }



    /**
     * Merge another list of the SAME TYPE uniquely on top of current one
     * @return Loco_fs_FileList
     */
    public function augment( loco_fs_FileList $list ){
        foreach( $list as $file ){
            $this->add( $file );
        }
        return $this;
    }
    
}
