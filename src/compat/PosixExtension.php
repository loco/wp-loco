<?php
/**
 * 
 */
abstract class Loco_compat_PosixExtension {
    

    private static $uid = null;

    private static $gid = null;
    
    
    public static function getuid(){
        if( is_null(self::$uid) ){
            // use posix function if extension available
            if( function_exists('posix_geteuid') ){
                self::$uid = posix_geteuid();
            }
            // else use temp file system to establish owner
            else {
                self::$uid = self::getuidViaTempDir();
            }
        }
        return self::$uid;
    }

    
    public static function getgid(){
        if( is_null(self::$gid) ){
            // use posix function if extension available
            if( function_exists('posix_getegid') ){
                self::$gid = posix_getegid();
            }
            // else use temp file system to establish group owner
            else {
                self::$gid = self::getgidViaTempDir();
            }
        }
        return self::$gid;
    }



    /**
     * @return int
     */
    public static function getuidViaTempDir(){
        $dir = get_temp_dir();
        if( 04000 & fileperms($dir) ){
            trigger_error( sprintf('%s directory has setuid bit, getuid may not be accurate'), E_USER_NOTICE );
        }
        $path = wp_tempnam( 'loco-sniff-'.time(), $dir );
        $uid = fileowner($path);
        unlink( $path );

        return $uid;
    }


    /**
     * @return int
     */
    public static function getgidViaTempDir(){
        $dir = get_temp_dir();
        if( 02000 & fileperms($dir) ){
            trigger_error( sprintf('%s directory has setgid bit, getgid may not be accurate'), E_USER_NOTICE );
        }
        $path = wp_tempnam( 'loco-sniff-'.time(), $dir );
        $gid = filegroup($path);
        unlink( $path );

        return $gid;
    }
    
    

}
