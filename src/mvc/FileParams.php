<?php
/**
 * Abstracts information about a file into a view parameter object.
 * 
 * @property string $name
 * @property string $path
 * @property string $relpath
 */
class Loco_mvc_FileParams extends Loco_mvc_ViewParams {
    
    /**
     * File reference from which to take live properties.
     * @var Loco_fs_File
     */
    private $file;
    
    
    /**
     * Print property as a number of bytes in larger denominations
     */
    public static function renderBytes( $n ){
        $i = 0;
        $dp = 0;
        while( $n >= 1024 ){
            $i++;
            $dp++;
            $n /= 1024;
        }
        $s = number_format( $n, $dp, '.', ',' );
        // trim trailing zeros from decimal places
        $a = explode('.',$s);
        if( isset($a[1]) ){
            $s = $a[0];
            $d = trim($a[1],'0') and $s .= '.'.$d;
        }
        $units = array( ' bytes', ' KB', ' MB', ' GB', ' TB' );
        $s .= $units[$i];
        
        return $s;
    }


    /**
     * @return Loco_mvc_FileParams 
     */
    public static function create( Loco_fs_File $file ) {
        return new Loco_mvc_FileParams( array(), $file );
    }


    /**
     * Override does lazy property initialization
     */
    public function __construct( array $props = array(), Loco_fs_File $file ){
        parent::__construct( array (
            'name' => '',
            'path' => '',
            'relpath' => '',
            'reltime' => '',
            'bytes' => 0,
            'size' => '',
            'imode' => '',
            'smode' => '',
            'owner' => '',
            'group' => '',
        ) + $props );
        $this->file = $file;
    }



    /**
     * {@inheritdoc}
     * Override to get live information from file object
     */
    public function offsetGet( $prop ){
        $getter = array( $this, '_get_'.$prop );
        if( is_callable($getter) ){
            return call_user_func( $getter );
        }
        return parent::offsetGet($prop);
    }



    /**
     * {@inheritdoc}
     * Override to ensure all properties populated
     */
    public function getArrayCopy(){
        $a = array();
        foreach( $this as $prop => $dflt ){
            $a[$prop] = $this[$prop];
        }
        return $a;
    }



    /**
     * @return string
     */    
    private function _get_name(){
        return  $this->file->basename();
    }


    /**
     * @return string
     */    
    private function _get_path(){
        return  $this->file->getPath();
    }


    /**
     * @return string
     */
    private function _get_relpath(){
        $base = loco_constant('WP_CONTENT_DIR');
        return $this->file->getRelativePath($base);
    }


    /**
     * Using slightly modified version of WordPress's Human time differencing
     * + Added "Just now" when in the last 30 seconds
     * TODO possibly replace with custom function that includes "Yesterday" etc..
     */
    private function _get_reltime(){
        $time = $this->has('mtime') ? $this['mtime'] : $this->file->modified();
        $time_diff = time() - $time;
        // use same time format as posts listing when in future or more than a day ago
        if( $time_diff < 0 || $time_diff >= 86400 ){
            return date_i18n( __('Y/m/d','default'), $time );
        }
        if( $time_diff < 30 ){
            // translators: relative time when something happened in the last 30 seconds
            return __('Just now','loco-translate');
        }
        return sprintf( __('%s ago','default'), human_time_diff($time) );
    }



    /**
     * @return int
     */
    private function _get_bytes(){
        return $this->file->size();
    }


    /**
     * @return string
     */
    private function _get_size(){
        return self::renderBytes( $this->_get_bytes() );
    }

 
    /**
     * Get octal file mode
     * @return string
     */
    private function _get_imode(){
        $mode = new Loco_fs_FileMode( $this->file->mode() );
        return (string) $mode;
    }

 
    /**
     * Get rwx file mode
     * @return string
     */
    private function _get_smode(){
        $mode = new Loco_fs_FileMode( $this->file->mode() );
        return $mode->format();
    }


    /**
     * Get file owner name
     * @return string
     */
    private function _get_owner(){
        if( ( $uid = $this->file->uid() ) && function_exists('posix_getpwuid') && ( $a = posix_getpwuid($uid) ) ){
            return $a['name'];
        }
        return sprintf('%u',$uid);
    }


    /**
     * Get group owner name
     * @return string
     */
    private function _get_group(){
        if( ( $gid = $this->file->gid() ) && function_exists('posix_getpwuid') && ( $a = posix_getgrgid($gid) ) ){
            return $a['name'];
        }
        return sprintf('%u',$gid);
    }
            

    /**
     * Print pseudo console line
     */
    public function ls(){
        $this->e('smode');
        echo '  ';
        $this->e('owner');
        echo ':';
        $this->e('group');
        echo '  ';
        $this->e('relpath');
        return '';
    }
    
}