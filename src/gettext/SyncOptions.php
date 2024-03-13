<?php
/**
 * Abstracts PO sync options held in custom headers
 */
class Loco_gettext_SyncOptions {

    /**
     * @var LocoPoHeaders
     */
    private $head;


    public function __construct( LocoPoHeaders $head ){
        $this->head = $head;
    }


    /**
     * Test if PO file has alternative template path
     * @return bool
     */
    public function hasTemplate(){
        return '' !== $this->head->trimmed('X-Loco-Template');
    }


    /**
     * Get *relative* path to alternative template path.
     * @return Loco_fs_LocaleFile
     */
    public function getTemplate(){
        return new Loco_fs_LocaleFile( $this->head['X-Loco-Template'] );
    }


    /**
     * Set *relative* path to alternative template path. 
     * @param string $path
     */
    public function setTemplate( $path ){
        $this->head['X-Loco-Template'] = (string) $path;
    }


    /**
     * Test if translations (msgstr fields) are to be merged.
     * @return bool true if NOT in pot mode
     */
    public function mergeMsgstr(){
        return 0 === preg_match( '/\\bpot\\b/', $this->getSyncMode() );
    }


    /**
     * Test if JSON files are to be merged.
     * @return bool
     */
    public function mergeJson(){
        return 1 === preg_match( '/\\bjson\\b/', $this->getSyncMode() );
    }


    /**
     * @return string
     */
    public function getSyncMode(){
        $mode = strtolower( $this->head->trimmed('X-Loco-Template-Mode') );
        // Default sync mode when undefined is to honour the type of source.
        // i.e. for legacy compatibility, copy msgstr fields if source is a PO file.
        if( '' === $mode ){
            $mode = $this->hasTemplate() ? strtolower( $this->getTemplate()->extension() ) : 'pot';
        }
        return $mode;
    }


    /**
     * @param string $mode
     */
    public function setSyncMode( $mode ){
        $this->head['X-Loco-Template-Mode'] = (string) $mode;
    }
    
    
    /**
     * Remove redundant headers
     * @return LocoPoHeaders
     */
    public function getHeaders(){
        if( ! $this->hasTemplate() ){
            $this->head->offsetUnset('X-Loco-Template');
            if( 'pot' === $this->getSyncMode() ){
                $this->head->offsetUnset('X-Loco-Template-Mode');
            }
        }
        return $this->head;
    }

}
