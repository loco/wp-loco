<?php
/**
 * A file with metadata about the locale it relates to
 */
class Loco_fs_LocaleFile extends Loco_fs_File {
    
    private ?Loco_Locale $locale = null;
    
    private ?string $suffix = null;
    
    private string $prefix = '';

    private string $hash = '';


    /**
     * Lazy handling of localized path info
     * @return array [ prefix, suffix, hash ]
     */
    public function split():array {
        if( is_null($this->suffix) ){
            // note that `filename` isn't used here because of double extensions (.l10n.php)
            $parts = explode('-',$this->basename() );
            $tail = array_pop($parts);
            $this->suffix = explode('.',$tail,2)[0];
            // handle script hashes for JSONs only
            if( '.json' === substr($tail,-5) && preg_match('/^[0-9a-f]{32}$/',$this->suffix) ){
                $this->hash = $this->suffix;
                $this->suffix = array_pop($parts);
            }
            $this->prefix = implode('-',$parts);
            // handle situations where unsuffixed name is wrongly taken as the prefix
            // e.g. "de.po" is valid but "hello.po" is not. 
            // There are still some ambiguous situations, e.g. "foo-bar.po" is valid, but nonsense
            if( ! $this->prefix && ! $this->getLocale()->isValid() ){
                $this->prefix = $this->suffix;
                $this->suffix = '';
                $this->locale = null;
            }
        }
        return [ $this->prefix, $this->suffix, $this->hash ];
    }
    
    
    public function getLocale():Loco_Locale {
        if( ! $this->locale ){
            if( $tag = $this->getSuffix() ){
                $this->locale = Loco_Locale::parse($tag);
            }
            else {
                $this->locale = new Loco_Locale('');
            }
        }
        return $this->locale;
    }


    /**
     * Create a clone of this file reference for another locale
     */
    public function cloneLocale( Loco_locale $locale ):Loco_fs_LocaleFile {
        $this->split();
        $path = (string) $locale;
        if( $str = $this->prefix ){
            $path = $str.'-'.$path;
        }
        if( $str = $this->extension() ){
            $path .= '.'.$str;
        }
        if( $dir = $this->getParent() ){
            $path = $dir->getPath().'/'.$path;
        }
        return new Loco_fs_LocaleFile($path);
    }


    /**
     * Get prefix (or stem) from name that comes before locale suffix.
     */
    public function getPrefix():string {
        $info = $this->split();
        return $info[0];
    }
    

    /**
     * Get suffix (or locale code) from name that comes after "-" separator
     */
    public function getSuffix():string {
        $info = $this->split();
        return $info[1];
    }

    /**
     * Get .json hash that follows locale suffix, if any
     */
    public function getHash():string {
        $info = $this->split();
        return $info[2];
    }

    /**
     * Test if file is suffix only, e.g. "en_US.po"
     */
    public function hasSuffixOnly():bool {
        $info = $this->split();
        return $info[1] && ! $info[0];
    }


    /**
     * Test if file is prefix only, e.g. "incorrect.po"
     */
    public function hasPrefixOnly():bool {
        $info = $this->split();
        return $info[0] && ! $info[1];
    }

}
