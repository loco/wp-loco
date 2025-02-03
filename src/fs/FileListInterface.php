<?php

interface Loco_fs_FileListInterface extends Countable, Iterator {

    /**
     * Add a file uniquely
     * @return bool whether file was added (and didn't already exist)
     */
    public function add( Loco_fs_File $file ):bool;
    
}