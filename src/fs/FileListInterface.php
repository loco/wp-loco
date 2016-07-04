<?php

interface Loco_fs_FileListInterface extends Countable, Iterator {
    
    public function add( Loco_fs_File $file );
    
}