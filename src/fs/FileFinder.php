<?php
/**
 * Lazy file iterator. Pulls directory listings when required.
 */
class Loco_fs_FileFinder implements Iterator, Countable, Loco_fs_FileListInterface {

    /**
     * Top-level search directories
     * @var Loco_fs_FileList
     */
    private $roots;

    /**
     * Directories to search, including those descended into
     * @var Loco_fs_FileList|null
     */
    private $subdir;
    
    /**
     * Whether directories all read into memory
     * @var bool
     */
    private $cached = false;

    /**
     * File listing already matched
     * @var Loco_fs_FileList|null
     */
    private $cache;
    
    /**
     * Internal array pointer for whole list of paths
     * @var int
     */
    private $i;
    
    /**
     * Internal pointer for directory being read
     * @var int|null
     */
    private $d;
    
    /**
     * Current directory being read
     * @var resource|null
     */
    private $dir;

    /**
     * Path of current directory being read
     * @var string
     */
    private $cwd;

    /**
     * Whether directories added to search will be recursive by default
     * @var bool
     */
    private $recursive = false;

    /**
     * Whether currently recursing into subdirectories
     * This is switched on and off as each directory is opened
     * @var bool|null
     */
    private $recursing;

    /**
     * Whether to follow symlinks when recursing into subdirectories
     * Root-level symlinks are always resolved when possible
     * @var bool
     */
    private $symlinks = true;

    /**
     * Registry of followed links by their original path
     * @var Loco_fs_FileList
     */
    private $linked;

    /**
     * List of file extensions to filter on and group by
     * @var null|Loco_fs_FileList[]
     */
    private $exts = null;

    /**
     * List of directory names to exclude from recursion
     * @var array
     */
    private $excluded = [];


    /**
     * Create initial list of directories to search
     * @param string $root default root to start
     */
    public function __construct( string $root = '' ){
        $this->roots = new Loco_fs_FileList;
        $this->linked = new Loco_fs_FileList;
        if( $root ){
            $this->addRoot( $root );
        }
    } 


    /**
     * Set recursive state of all defined roots
     */
    public function setRecursive( bool $bool ):self {
        $this->invalidate();
        $this->recursive = $bool;
        /* @var $dir Loco_fs_Directory */
        foreach( $this->roots as $dir ){
            $dir->setRecursive( $bool );
        }
        return $this;
    }


    /**
     * Whether to follow symlinks
     */
    public function followLinks( bool $bool ):self {
        $this->invalidate();
        $this->symlinks = $bool;
        return $this;
    }


    /**
     * Get the original symlink that was followed for a given file
     */
    public function getFollowed( string $path ):?Loco_fs_Link {
        /* @var Loco_fs_Link $link */
        foreach( $this->linked as $link ){
            $file = $link->resolve();
            $orig = $file->getPath();
            // exact match on followed path
            if( $orig === $path ){
                return $link;
            }
            // match further up the directory tree
            if( $file instanceof Loco_fs_Directory ){
                $orig = trailingslashit($orig);
                $snip = strlen($orig);
                if( $orig === substr($path,0,$snip) ){
                    return new Loco_fs_Link( $link->getPath().'/'.substr($path,$snip) );
                }
            }
        }
        return null;
    }


    private function invalidate():void {
        $this->cached = false;
        $this->cache = null;
        $this->subdir = null;
    }
    
    
    /**
     * Get all files found as a list object
     * @return Loco_fs_FileList <int,Loco_fs_File> 
     */    
    public function export():Loco_fs_FileList{
        if( ! $this->cached ){
            $this->rewind();
            while( $this->valid() ){
                $this->next();
            }
        }
        return $this->cache;
    }


    /**
     * @return Loco_fs_FileList[]
     */
    public function exportGroups():array {
        $this->cached || $this->export();
        return $this->exts;
    }


    /**
     * Add a directory root to search.
     */
    public function addRoot( string $root, ?bool $recursive = null ):self {
        $this->invalidate();
        $dir = new Loco_fs_Directory($root);
        $this->roots->add( $dir );
        // new directory inherits current global setting unless set explicitly
        $dir->setRecursive( is_bool($recursive) ? $recursive : $this->recursive );
        return $this;
    }


    /**
     * Get all root directories to be searched
     */
    public function getRootDirectories():Loco_fs_FileList {
        return $this->roots;
    }


    /**
     * Filter results by given file extensions
     */
    public function group( ...$exts ):self {
        return $this->filterExtensions($exts);
    }


    /**
     * Filter results by file extensions given in array
     * @param string[] $exts File extension strings
     */
    public function filterExtensions( array $exts ):self {
        $this->invalidate();
        $this->exts = [];
        foreach( $exts as $ext ){
            $this->exts[ ltrim($ext,'*.') ] = new Loco_fs_FileList;
        }
        return $this;
    }


    /**
     * Add one or more paths to exclude from listing
     */
    public function exclude( ...$paths ):self {
        $this->invalidate();
        foreach( $paths as $path ){
            $file = new Loco_fs_File($path);
            // if path is absolute, add straight onto list
            if( $file->isAbsolute() ){
                $file->normalize();
                $this->excluded[] = $file;
            }
            // else append to all defined roots
            else {
                foreach( $this->roots as $dir ) {
                    $file = new Loco_fs_File( $dir.'/'.$path );
                    $file->normalize();
                    $this->excluded[] = $file;
                }
            }
        }
        return $this;
    }


    /**
     * Export excluded paths as file objects
     * @return Loco_fs_File[]
     */
    public function getExcluded():array {
        return $this->excluded;
    }

    
    /**
     * @param Loco_fs_Directory $dir
     * @return void
     */    
    private function open( Loco_fs_Directory $dir ){
        $path = $dir->getPath();
        $recursive = $dir->isRecursive();
        if( is_link($path) ){
            $link = new Loco_fs_Link($path);
            if( $link->isDirectory() ){
                $path = $link->resolve()->getPath();
                $this->linked->add($link);
            }
        }
        $this->cwd = $path;
        $this->recursing = $recursive;
        $this->dir = opendir($path);
    }


    /**
     * @return void
     */
    private function close(){
        closedir( $this->dir );
        $this->dir = null;
        $this->recursing = null;
    }


    /**
     * Test if given path is matched by one of our exclude rules
     */
    public function isExcluded( string $path ):bool {
        /* @var Loco_fs_File $excl */
        foreach( $this->excluded as $excl ){
            if( $excl->equal($path) ){
                return true;
            }
        }
        return false;
    }


    /**
     * Read next valid file path from root directories
     */
    private function read():?Loco_fs_File {
        while( is_resource($this->dir) ){
            while( $f = readdir($this->dir) ){
                // dot-files always excluded
                if( '.' === substr($f,0,1) ){
                    continue;
                }
                $path = $this->cwd.'/'.$f;
                // early path exclusion check
                if( $this->isExcluded($path) ){
                    continue;
                }
                // early filter on file extension when grouping
                if( is_array($this->exts) ){
                    $ext = pathinfo($f,PATHINFO_EXTENSION);
                    // missing file extension only relevant for directories
                    if( '' === $ext ){
                        if( ! $this->recursing || ! is_dir($path) ){
                            continue;
                        }
                    }
                    // any other extension can be skipped
                    else if( ! array_key_exists($ext,$this->exts) ){
                        continue;
                    }
                }
                // follow symlinks (subdir hash ensures against loops)
                if( is_link($path) ){
                    if( ! $this->symlinks ){
                        continue;
                    }
                    $link = new Loco_fs_Link($path);
                    if( $file = $link->resolve() ){
                        $path = $file->getPath();
                        if( $this->isExcluded($path) ){
                            continue;
                        }
                        $this->linked->add($link);
                    }
                    else {
                        continue;
                    }
                }
                // add subdirectory to recursion list, or skip
                if( is_dir($path) ){
                    if( $this->recursing ){
                        $subdir = new Loco_fs_Directory($path);
                        $subdir->setRecursive(true);
                        $this->subdir->add( $subdir );
                    }
                    continue;
                }
                // file represented as object containing original path
                $file = new Loco_fs_File($path);
                $this->add($file);
                return $file;
            }
            $this->close();
            // Advance directory and continue outer loop
            $d = $this->d + 1;
            if( $this->subdir->offsetExists($d) ){
                $this->d = $d;
                $this->open( $this->subdir->offsetGet($d) );
            }
            // else no directories left to search
            else {
                break;
            }
        }
        // at end of all available files
        $this->cached = true;
        return null;
    }


    /**
     * {@inheritDoc}
     */
    public function add( Loco_fs_File $file ):bool {
        if( is_array($this->exts) ){
            $ext = $file->extension();
            if( array_key_exists($ext,$this->exts) ){
                $this->exts[$ext]->add($file);
            }
            // edge case where symlink has correct extension, but resolved path does not.
            else if( $this->symlinks && $this->linked->has($file) ){
                Loco_error_Debug::trace('Symbolic link resolves to a file excluded by filter (%s)',$file->basename());
            }
            else {
                $glob = implode(',',array_keys($this->exts));
                Loco_error_Debug::trace('Should have filtered out %s when grouping by *.{%s}', $file->basename(), $glob );
            }
        }
        if( $this->cache->add($file) ){
            $this->i++;
            return true;
        }
        return false;
    }


    /**
     * @return int
     */
    #[ReturnTypeWillChange]
    public function count():int {
        return count( $this->export() );
    }


    /**
     * @return Loco_fs_File|null
     */
    #[ReturnTypeWillChange]
    public function current(){
        $i = $this->i;
        if( is_int($i) && isset($this->cache[$i]) ){
            return $this->cache[$i];
        }
        return null;
    }


    /**
     * @return Loco_fs_File|null
     */
    #[ReturnTypeWillChange]
    public function next(){
        if( $this->cached ){
            $i = $this->i + 1;
            if( isset($this->cache[$i]) ){
                $this->i = $i;
                return $this->cache[$i];
            }
        }
        else {
            $file = $this->read();
            if( $file instanceof Loco_fs_File ) {
                return $file;
            }
        }
        // else at end of all directory listings
        $this->i = null;
        return null;
    }


    /**
     * @return int
     */
    #[ReturnTypeWillChange]
    public function key(){
        return $this->i;
    }


    /**
     * @return bool
     */
    #[ReturnTypeWillChange]
    public function valid(){
        // may be in lazy state after rewind
        // must do initial read now in case list is empty
        return is_int($this->i);
    }


    /**
     * @return void
     */
    #[ReturnTypeWillChange]
    public function rewind(){
        if( $this->cached ){
            $this->cache->rewind();
            $this->i = $this->cache->key();
        }
        else {
            $this->d = 0;
            $this->dir = null;
            $this->cache = new Loco_fs_FileList;
            // add only root directories that exist
            $this->subdir = new Loco_fs_FileList;
            /* @var Loco_fs_Directory $root */
            foreach( $this->roots as $root ){
                if( $root instanceof Loco_fs_Directory && $root->readable() && ! $this->isExcluded( $root->getPath() ) ){
                    $this->subdir->add($root);
                }
            }
            if( $this->subdir->offsetExists(0) ){
                $this->i = -1;
                $this->open( $this->subdir->offsetGet(0) );
                $this->next();
            }
            else {
                $this->i = null;
                $this->subdir = null;
                $this->cached = true;
            }
        }
    }


    /**
     * Test whether internal list has been fully cached in memory
     */
    public function isCached():bool {
        return $this->cached;
    }

}
