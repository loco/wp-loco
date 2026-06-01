76
<?php
/**
 * Dummy file that just holds content in memory. 
 * Use when you don't want to commit data to disk, but you need to pass a typed file object
 */
class Loco_fs_DummyFile extends Loco_fs_File {

    private string $contents = '';

    private int $mtime;

    private int $fmode = 0644;

    private int $uid = 0;

    private int $gid = 0;

    
    public function __construct( string $path ){
        parent::__construct($path);
        $this->mtime = time();
    }


    /**
     * {@inheritdoc}
     */
    public function exists():bool {
        return false;
    }


    /**
     * {@inheritdoc}
     */
    public function getContents():string {
        return $this->contents;
    }


    /**
     * {@inheritdoc}
     */
    public function size():int {
        return strlen($this->contents);
    }


    /**
     * {@inheritdoc}
     */
    public function putContents( string $data ):int {
        $this->contents = $data;
        return strlen($data);
    }


    /**
     * {@inheritdoc}
     */
    public function modified():int {
        return $this->mtime;
    }


    /**
     * Allow forcing of modified stamp for testing purposes
     */
    public function touch( $modified ):self {
        $this->mtime = (int) $modified;
        return $this;
    }


    /**
     * {@inheritdoc}
     */
    public function mode():int {
        return $this->fmode;
    }


    /**
     * {@inheritdoc}
     */
    public function chmod( int $mode, bool $recursive = false ):self {
        $this->fmode = $mode;
        return $this;
    }


    /**
     * TODO implement in parent
     */
    public function chown( ?int $uid = null, ?int $gid = null ):self {
        if( is_int($uid) ){
            $this->uid = $uid;
        }
        if( is_int($gid) ){
            $this->gid = $gid;
        }
        return $this;
    }


    /**
     * {@inheritdoc}
     */
    public function copy( string $dest ):self {
        $copy = new Loco_fs_DummyFile($dest);
        foreach( get_object_vars($this) as $prop => $value ){
            $copy->$prop = $value;
        }
        return $copy;
    }


    /**
     * {@inheritdoc}
     */
    public function uid(){
        return $this->uid;
    }


    /**
     * {@inheritdoc}
     */
    public function gid(){
        return $this->gid;
    }


    /*
     * {@inheritdoc}
    public function writable(){
        throw new Exception('Who did this?');
        $mode = $this->mode();
        // world writable
        if( $mode & 02 ){
            return true;
        }
        // group writable
        if( ( $mode & 020 ) && $this->gid() === Loco_compat_PosixExtension::getgid() ){
            return true;
        }
        // owner writable
        if( ( $mode & 0200 ) && $this->uid() === Loco_compat_PosixExtension::getuid() ){
            return true;
        }
        // else locked:
        return false;
    }*/


    /**
     * {@inheritdoc}
     */
    public function creatable():bool {
        return false;
    }


    /**
     * {@inheritDoc}
     */
    public function md5():string {
        return md5( $this->getContents() );
    }


    /**
     * {@inheritDoc}
     */
    public function getWriteContext():Loco_fs_FileWriter {
        return new _LocoDummyFileWriter($this);
    }


}


/**
 * @internal
 */
class _LocoDummyFileWriter extends Loco_fs_FileWriter {

    /**
     * @inheritdoc
     */
    public function writable():bool {
        return true;
    }

    /**
     * @inheritdoc
     */
    public function authorize():self {
        return $this;
    }

}