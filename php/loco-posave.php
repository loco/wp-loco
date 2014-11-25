<?php
/**
 * Admin ajax include that saves PO file from editor to disk
 * Included by loco-ajax.php during Ajax action
 */
 
    DOING_AJAX or die();

    if( empty($path) || empty($po) || ! isset($name) || empty($type) ){
        throw new Exception( Loco::__('Invalid data posted to server'), 422 );
    }
  
    // path is allowed to not exist yet
    if( '/' !== $path{0} ){
        $path = WP_CONTENT_DIR.'/'.$path;
    }

    // but package must exist so we can get POT or source
    /* @var $package LocoPackage */
    loco_require('loco-packages','loco-locales');
    $package = LocoPackage::get( $name, $type );
    if( ! $package ){
        throw new Exception( sprintf( Loco::__('Package not found called %s'), $name ), 404 );
    }

    $fname = basename($path);
    $podir = dirname( $path );
    $dname = basename( $podir );
    $ispot = LocoAdmin::is_pot( $fname );
    $ftype = $ispot ? 'POT' : 'PO';


    // handle file backups if file exists and enabled
    if( file_exists($path) ){
        $conf = Loco::config();
        $num = (int) $conf['num_backups'];
        if( is_writable($podir) ){
            $dest = preg_replace('/\.(pot?)$/i', '-backup-', $path );
            // delete oldest backups until we have $num-1 remaining
            if( $prev = glob( $dest.'*' ) ){
                function _loco_sort_backups( $f1, $f2 ){
                    $t1 = filemtime($f1);
                    $t2 = filemtime($f2);
                    return $t1 < $t2 ? -1 : ( $t2 < $t1 ? 1 : 0 );
                }
                usort( $prev, '_loco_sort_backups' );
                foreach( array_slice( $prev, max(0,$num-1) ) as $oldpath ){
                    register_shutdown_function( 'unlink', $oldpath );
                }
            }
            // write new backup
            if( $num ){
                $dest .= date('YmdHis').'.'.strtolower($ftype).'~';
                copy( $path, $dest );
            }
        }
        else if( $num ){
            throw new Exception( sprintf(Loco::__('Web server cannot create backups in "%s". Fix file permissions or disable backups in settings'), basename($podir) ) );
        }
    }

    
    // else construct directory tree if file does not exist
    else if( ! file_exists($podir) && ! mkdir( $path, 0775, true ) ){
        $pname = basename( dirname($podir) );
        throw new Exception( sprintf(Loco::__('Web server cannot create "%s" directory in "%s". Fix file permissions or create it manually.'), $dname, $pname ) );
    }
    else if( ! is_dir($podir) || ! is_writable($podir) ){
        throw new Exception( sprintf(Loco::__('Web server cannot create files in the "%s" directory. Fix file permissions or use the download function.'), basename($podir) ) );
    }

    
    // Undo magic quotes if enabled
    if( get_magic_quotes_gpc() ){
        $po = stripslashes( $po );
    }
    
    // attempt to write PO file
    $bytes = file_put_contents( $path, $po );
    if( false === $bytes ){
        throw new Exception( sprintf(Loco::__('%s file is not writable by the web server. Fix file permissions or download and copy to "%s/%s".'), $ftype, $dname, $fname ) );
    }
    
    // primary action ok
    $response = array (
        'bytes'    => $bytes,
        'filename' => basename($path),
        'modified' => LocoAdmin::format_datetime( filemtime($path) ),
    );
    
    // flush package from cache, so it's regenerated next list view with new stats
    $package->uncache();

   
    // attempt to write MO file also, but may fail for numerous reasons.
    while( ! $ispot ){
        try {

            // check target MO path before compiling
            $mopath = preg_replace( '/\.po$/', '.mo', $path );
            if( ! file_exists($mopath) && ! is_writable( dirname($mopath) ) ){
                throw new Exception( Loco::__('Cannot create MO file') );
            }
            else if( file_exists($mopath) && ! is_writable($mopath) ){
                throw new Exception( Loco::__('Cannot overwrite MO file') );
            }

            // attempt to compile MO direct to file via shell
            if( $msgfmt = LocoAdmin::msgfmt_command() ){
                try {
                    $bytes = 0;
                    loco_require('build/shell-compiled');
                    define( 'WHICH_MSGFMT', $msgfmt );
                    $mopath = loco_compile_mo_file( $path, $mopath );
                    $bytes  = $mopath && file_exists($mopath) ? filesize($mopath) : 0;
                }
                catch( Exception $Ex ){
                    error_log( $Ex->getMessage(), 0 );
                }
                if( ! $bytes ){
                    throw new Exception( sprintf( Loco::__('Failed to compile MO file with %s, check your settings'), WHICH_MSGFMT ) );
                }
                $response['compiled'] = $bytes;
                break;
            }
            
            // Fall back to in-built MO compiler - requires PO is parsed too
            $mo = LocoAdmin::msgfmt_native($po);
            $bytes = file_put_contents( $mopath, $mo );
            if( ! $bytes ){
                throw new Exception( Loco::__('Failed to write MO file') );
            }
            $response['compiled'] = $bytes;
            break;

        }
        catch( Exception $e ){
            $response['compiled'] = $e->getMessage();
            break;
        }
    }
    
    
    
    return $response;
