<?php
/**
 * Manages revisions (backups) of a file.
 * Revision file names have form "<filename>-backup-<date>.<ext>~"
 */
class Loco_fs_Revisions implements Countable/*, IteratorAggregate*/ {
    
    private Loco_fs_File $master;
    
    /**
     * Sortable list of backed-up file paths (not including master)
     */
    private ?array $paths = null;
    
    /**
     * Cached regular expression for matching backup file paths
     */
    private ?string $regex = null;

    /**
     * Cached count of backups + 1
     */
    private ?int $length = null;

    /**
     * Paths to delete when object removed from memory
     */
    private array $trash = [];
    

    /**
     * Construct from the master file (current version)
     */
    public function __construct( Loco_fs_File $file ){
        $this->master = $file;
    }


    /**
     * @internal
     * Executes deferred deletions with silent errors
     */
    public function __destruct(){
        if( $trash = $this->trash ){
            $writer = clone $this->master->getWriteContext();
            foreach( $trash as $file ){
                if( $file->exists() ){
                    try {
                        $writer->setFile($file);
                        $writer->delete(false);
                    }
                    catch( Loco_error_WriteException $e ){
                        // avoiding fatal error because pruning is non-critical operation
                        Loco_error_AdminNotices::debug( $e->getMessage() );
                    }
                }
            }
        }
    }



    /**
     * Check that file permissions allow a new backup to be created
     */
    public function writable():bool {
        return $this->master->exists() && $this->master->getParent()->writable();
    }



    /**
     * Create a new backup of current version
     */
    public function create():Loco_fs_File {
        $vers = 0;
        $date = date('YmdHis');
        $ext = $this->master->extension();
        $base = $this->master->dirname().'/'.$this->master->filename();
        do {
            $path = sprintf( '%s-backup-%s%u.%s~', $base, $date, $vers++, $ext);
        }
        while ( 
            file_exists($path)
        );

        $copy = $this->master->copy( $path );
        
        // invalidate cache so next access reads disk
        $this->paths = null;
        $this->length = null;
        
        return $copy;
    }


    /**
     * Delete the oldest backups until we have maximum of $num_backups remaining
     */
    public function prune( int $num_backups ):self {
        $paths = $this->getPaths();
        if( isset($paths[$num_backups]) ){
            foreach( array_slice( $paths, $num_backups ) as $path ){
                $this->unlinkLater($path);
            }
            $this->paths = array_slice( $paths, 0, $num_backups );
            $this->length = null;
        }
        return $this;
    }


    /**
     * build regex for matching backed-up revisions of master
     */
    private function getRegExp():string {
        $regex = $this->regex;
        if( is_null($regex) ){
            $regex = preg_quote( $this->master->filename(), '/' ).'-backup-(\\d{14,})';
            if( $ext = $this->master->extension() ){
                $regex .= preg_quote('.'.$ext,'/');
            }
            $regex = '/^'.$regex.'~/';
            $this->regex = $regex;
        }
        return $regex;
    }


    public function getPaths():array {
        if( is_null($this->paths) ){
            $this->paths = [];
            $regex = $this->getRegExp();
            $finder = new Loco_fs_FileFinder( $this->master->dirname() );
            $finder->setRecursive(false);
            /* @var $file Loco_fs_File */
            foreach( $finder as $file ){
                if( preg_match( $regex, $file->basename() ) ){
                    $this->paths[] = $file->getPath();
                }
            }
            // time sort order descending
            rsort( $this->paths );
        }
        return $this->paths;
    }


    /**
     * Parse a file path into a timestamp.
     */
    public function getTimestamp( string $path ):int {
        $name = basename($path);
        if( preg_match( $this->getRegExp(), $name, $r ) ){
            $ymdhis = substr( $r[1], 0, 14 );
            return strtotime( $ymdhis );
        }
        throw new Loco_error_Exception('Invalid revision file: '.$name);
    }


    /**
     * Get number of backups plus master
     */
    #[ReturnTypeWillChange]
    public function count(){
        if( ! $this->length ){
            $this->length = 1 + count( $this->getPaths() );
        }
        return $this->length;
    }


    /**
     * Delete file when object removed from memory.
     * Previously unlinked on shutdown, but doesn't work with WordPress file system abstraction
     */
    public function unlinkLater( string $path):void {
        $this->trash[] = new Loco_fs_File($path);
    }


    /**
     * Execute backup of the current file if enabled in settings.
     * @param Loco_api_WordPressFileSystem $api Authorized file system
     * @return Loco_fs_File|null backup file if saved
     */
    public function rotate( Loco_api_WordPressFileSystem $api ):?Loco_fs_File {
        $backup = null;
        $pofile = $this->master;
        $num_backups = Loco_data_Settings::get()->num_backups;
        if( $num_backups ){
            // Attempt backup, but return null on failure
            try {
                $api->authorizeCopy($pofile);
                $backup = $this->create();
            }
            catch( Exception $e ){
                Loco_error_AdminNotices::debug( $e->getMessage() );
                // translators: %s refers to a directory where a backup file could not be created due to file permissions
                $message = __('Failed to create backup file in "%s". Check file permissions or disable backups','loco-translate');
                Loco_error_AdminNotices::warn( sprintf( $message, $pofile->getParent()->basename() ) );
            }
            // prune operation in separate catch block as error would be misleading
            try {
                $this->prune($num_backups);
            }
            catch( Exception $e ){
                Loco_error_AdminNotices::debug('Failed to prune backup files: '.$e->getMessage() );
            }
        }
        return $backup;
    }

}
