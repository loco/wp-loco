<?php
/**
 * File list indexed by locale codes
 */
class Loco_fs_LocaleFileList extends Loco_fs_FileList {
    
    /**
     * Look up locale entries by their tag
     * @var array
     */
    private $index = array();
    
    
    /**
     * @return Loco_fs_LocaleFileList
     */
    public function addLocalized( Loco_fs_LocaleFile $file ){
        $i = count($this);
        $this->add( $file );
        if( count($this) !== $i ){
            $key = $file->getSuffix();
            $this->index[$key][] = $i;
        }
        
        return $this;
    }
    


    /**
     * Get a new list containing just files for a given locale (exactly)
     * @return Loco_fs_LocaleFileList
     */
    public function filter( $tag ){
        $list = new Loco_fs_LocaleFileList;
        if( isset($this->index[$tag]) ){
            foreach( $this->index[$tag] as $i ){
                $list->addLocalized( $this[$i] );
            }
        }
        return $list;
    }    



    /**
     * Get a unique list of locales for which there are files
     * @return array<Loco_Locale>
     */
    public function getLocales(){
        $list = array();
        foreach( array_keys($this->index) as $tag ){
            $list[$tag] = Loco_Locale::parse($tag);
        }
        return $list;
    }



    /**
     * Merge another list of the same type into this one
     * @return Loco_fs_LocaleFileList
     */
    public function augment( Loco_fs_LocaleFileList $list ){
        foreach( $list as $file ){
            $this->addLocalized( $file );
        }
        return $this;
    }
    
}