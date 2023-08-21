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
    private $cached;

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
     * This is switched on and off as each directories is opened
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
     * @var Loco_fs_FileList|null
     */
    private $linked;

    /**
     * List of file extensions to filter on and group by
     * @var null|Loco_fs_FileList[]
     */
    private $exts;

    /**
     * List of directory names to exclude from recursion
     * @var null|Loco_fs_File[]
     */
    private $excluded;     
              

    /**
     * Create initial list of directories to search
     * @param string $root default root to start
     */
    public function __construct( $root = '' ){
        $this->roots = new Loco_fs_FileList;
        $this->linked = new Loco_fs_FileList;
        $this->excluded = [];
        if( $root ){
            $this->addRoot( $root );
        }
    } 


    /**
     * Set recursive state of all defined roots
     * @param bool $bool
     * @return Loco_fs_FileFinder
     */
    public function setRecursive( $bool ){
        $this->invalidate();
        $this->recursive = $bool;
        /* @var $dir Loco_fs_Directory */
        foreach( $this->roots as $dir ){
            $dir->setRecursive( $bool );
        }
        return $this;
    }


    /**
     * @param bool $bool
     * @return Loco_fs_FileFinder
     */
    public function followLinks( $bool ){
        $this->invalidate();
        $this->symlinks = (bool) $bool;
        return $this;
    }


    /**
     * @param string $path
     * @return Loco_fs_Link
     */
    public function getFollowed( $path ){
        $path = (string) $path;
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
    


    /**
     * @return void
     */
    private function invalidate(){
        $this->cached = false;
        $this->cache = null;
        $this->subdir = null;
    }
    
    
    /**
     * @return Loco_fs_FileList
     */    
    public function export(){
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
    public function exportGroups(){
        $this->cached || $this->export();
        return $this->exts;
    }


    /**
     * Add a directory root to search.
     * @param string $root
     * @param bool|null $recursive
     * @return Loco_fs_FileFinder 
     */
    public function addRoot( $root, $recursive = null ){
        $this->invalidate();
        $dir = new Loco_fs_Directory($root);
        $this->roots->add( $dir );
        // new directory inherits current global setting unless set explicitly
        $dir->setRecursive( is_bool($recursive) ? $recursive : $this->recursive );
        return $this;
    }


    /**
     * Get all root directories to be searched
     * @return Loco_fs_FileList
     */
    public function getRootDirectories(){
        return $this->roots;
    }


    /**
     * Filter results by given file extensions
     * @return Loco_fs_FileFinder
     */
    public function group( ...$exts ){
        return $this->filterExtensions($exts);
    }


    /**
     * Filter results by file extensions given in array
     * @param string[] $exts File extension strings
     * @return Loco_fs_FileFinder
     */
    public function filterExtensions( array $exts ){
        $this->invalidate();
        $this->exts = [];
        foreach( $exts as $ext ){
            $this->exts[ ltrim($ext,'*.') ] = new Loco_fs_FileList;
        }
        return $this;
    }


    /**
     * Add one or more paths to exclude from listing
     * @return Loco_fs_FileFinder
     */
    public function exclude( ...$paths ){
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
    public function getExcluded(){
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
     * @param string $path
     * @return bool
     */
    public function isExcluded( $path ){
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
     * @return Loco_fs_File|null
     */
    private function read(){
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
    public function add( Loco_fs_File $file ){
        if( is_array($this->exts) ){
            $ext = $file->extension();
            /*if( '' === $ext || ! array_key_exists($ext,$this->exts) ){
                throw new LogicException('Should have filtered out '.$file->basename().' when grouping by *.{'.implode(',',array_keys($this->exts)).'}' );
            }*/
            $this->exts[$ext]->add($file);
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
    public function count(){
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
     * @return bool
     */
    public function isCached(){
        return $this->cached;
    }

}
