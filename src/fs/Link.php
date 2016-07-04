<?php
/**
 * 
 */
class Loco_fs_Link extends Loco_fs_File {
    
    
    /**
     * @return Loco_fs_File
     */
    public function resolve(){

        $path = $this->getPath();

        if( $real = realpath($path) ){
            if( is_dir($path) ){
                return new Loco_fs_Directory($real);
            }
            return new Loco_fs_File($real);
        }
        
        // else fail
        return null;
    }    
    
}