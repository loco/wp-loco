<?php
/**
 * Compiled source built from Loco core. Do not edit!
 * Tue, 20 Jan 2015 18:13:29 +0000
 */
/**
 * Shell interaction for wordpress plugin
 */

/**
 * File containing function loco_compile_mo_file
 */

/**
 * Loco Gettext configuration
 * ** Wordpress plugin **
 */
 
 
// program for compiling *.po to *.mo files 
// defined('WHICH_MSGFMT') or define('WHICH_MSGFMT','/usr/bin/msgfmt'); 


/**
 * Compile a PO string into a MO file using msgfmt
 * 
 * @todo Java and csharp bundles
 * @param string raw PO source
 * @return string binary MO source
 */
function loco_compile_mo( $po ){
   $descriptorspec = array(
        0 => array('pipe', 'r'), // stdin is a pipe that the child will read from
        1 => array('pipe', 'w'), // stdout is a pipe that the child will write to
        2 => array('pipe', 'a'), // stderr
    );
    $cmd = WHICH_MSGFMT.' -o - -';
    $process = proc_open($cmd, $descriptorspec, $pipes );
    if( ! $process ){
        throw new Exception('Failed to open process to '.$cmd);
    }
    // Pipe in the PO source to STDIN
    fwrite($pipes[0], $po);
    fclose($pipes[0]);
    // Get response as it is piped out
    $err = stream_get_contents($pipes[2]);
    fclose($pipes[2]);
    $mo = stream_get_contents($pipes[1]);
    fclose($pipes[1]);
    // close and return binary captured data
    $e = proc_close($process);
    if( 0 !== $e ){
        $err and trigger_error( $err, E_USER_WARNING );
        throw new Exception( WHICH_MSGFMT.' exited with code '.sprintf('%d',$e).'; Got '.strlen($mo).' bytes from '.strlen($po).' bytes');
    }
    if( ! $mo ){
        throw new Exception('Empty file from '.WHICH_MSGFMT);
    }
    return $mo;    
}







/**
 * File containing function loco_compile_mo_file
 */



/**
 * Do as per loco_compile_mo, but to and from files instead of stdin/out
 */
function loco_compile_mo_file( $pofile, $mofile = '' ){
   $descriptorspec = array (
        0 => array('pipe', 'r'), // stdin not used
        1 => array('pipe', 'w'), // stdout not used
        2 => array('pipe', 'a'), // stderr
    );
    if( ! $mofile ){
        $mofile = $pofile.'.mo';
    }
    $cmd = WHICH_MSGFMT.' -o '.escapeshellarg($mofile).' '.escapeshellarg($pofile);
    $process = proc_open($cmd, $descriptorspec, $pipes );
    if( ! $process ){
        throw new Exception('Failed to open process to '.$cmd);
    }
    // Get error response only
    $err = stream_get_contents($pipes[0]);
    fclose($pipes[0]);
    // close and return binary captured data
    $e = proc_close($process);
    if( 0 !== $e ){
        $err and trigger_error( $err, E_USER_WARNING );
        throw new Exception('Gettext msgfmt exited with code '.sprintf('%d',$e).';');
    }
    if( ! file_exists($mofile) ){
        throw new Exception('Gettext msgfmt failed to create '.$mofile);
    }
    return $mofile;
}
 
  
/**
 * Find an executable msgfmt, or other program
 */
function loco_find_executable( $name ){
    $paths = array (
        '/usr/local/',
        '/usr/',
        '/',
        '~/'
    );
    $descriptorspec = array (
        0 => array('pipe', 'r'), // stdin not used
        1 => array('pipe', 'w'), // stdout not used
        2 => array('pipe', 'w'), // stderr not used
    );
    foreach( array('bin/','sbin/') as $dir ){
        foreach( $paths as $path ){
            $bin = $path.$dir.$name;
            $cmd = '[ -x '.escapeshellarg($bin).' ]';
            $process = proc_open( $cmd, $descriptorspec, $pipes );
            if( ! $process ){
                //throw new Exception('Failed to open process to '.$cmd);
                return '';
            }
            // close and simply check for zero exit code
            $e = proc_close($process);
            if( 0 === $e ){
                return $bin;
            }
        }
    }
    // failed to find program
    return '';
}
