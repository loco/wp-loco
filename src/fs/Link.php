<?php
/**
 * 
 */
class Loco_fs_Link extends Loco_fs_File {

    /**
     * @var Loco_fs_File
     */
    private ?Loco_fs_File $real = null;

    /**
     * {@inheritdoc}
     */
    public function __construct( $path ){
        parent::__construct($path);
        $real = realpath( $this->getPath() );
        if( is_string($real) ){
            if( is_dir($real) ){
                $this->real = new Loco_fs_Directory($real);
            }
            else {
                $this->real = new Loco_fs_File($real);
            }
        }
    }
    
    
    /**
     * @return Loco_fs_File|null
     */
    public function resolve():?Loco_fs_File {
        return $this->real;
    }


    /**
     * {@inheritdoc}
     */
    public function isDirectory():bool {
        return $this->real instanceof Loco_fs_Directory;
    }
    
}