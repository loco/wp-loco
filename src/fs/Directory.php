<?php
/**
 * 
 */
class Loco_fs_Directory extends Loco_fs_File {
    
    /**
     * Recursive flag for internal use
     */
    private bool $r = false;


    /**
     * {@inheritDoc}
     */
    public function isDirectory():bool {
        return true;
    }


    /**
     * Set recursive flag for use when traversing directory trees
     */
    public function setRecursive( bool $bool ):self {
        $this->r = $bool;
        return $this;
    }


    /**
     * @return bool
     */
    public function isRecursive():bool {
        return $this->r;
    }


    /**
     * Create this directory for real.
     * 
     * @throws Loco_error_WriteException
     * @return Loco_fs_Directory
     */
     public function mkdir():self {
         $this->getWriteContext()->mkdir();
         return $this;
     }

}
