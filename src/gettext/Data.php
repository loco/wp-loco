<?php

loco_require_lib('compiled/gettext.php');

/**
 * Wrapper for array forms of parsed PO data
 */
class Loco_gettext_Data extends LocoPoIterator implements JsonSerializable {

    /**
     * Normalize file extension to internal type
     * @param Loco_fs_File
     * @return string "po", "pot" or "mo"
     * @throws Loco_error_Exception
     */
    private static function ext( Loco_fs_File $file ){
        $ext = rtrim( strtolower( $file->extension() ), '~' );
        if( 'po' === $ext || 'pot' === $ext || 'mo' === $ext ){
            return $ext;
        }
        // translators: Error thrown when attempting to parse a file that is not PO, POT or MO
        throw new Loco_error_Exception( sprintf( __('%s is not a Gettext file'), $file->basename() ) );
    }


    /**
     * @param Loco_fs_File
     * @return Loco_gettext_Data
     */
    public static function load( Loco_fs_File $file ){
        if( 'mo' === self::ext($file) ){
            return self::fromBinary( $file->getContents() );
        }
        return self::fromSource( $file->getContents() );
    }


    /**
     * Like load but just pulls header, saving a full parse. PO only
     * @param Loco_fs_File
     * @return Loco_gettext_Data
     * @throws InvalidArgumentException
     */
    public static function head( Loco_fs_File $file ){
        if( 'mo' === self::ext($file) ){
            throw new InvalidArgumentException('PO only');
        }
        return new Loco_gettext_Data( array(
            array( 'source' => '', 'target' => LocoPoHeaders::snip( $file->getContents() ) )
        ) );
    }


    /**
     * @param string assumed PO source
     * @return Loco_gettext_Data
     */
    public static function fromSource( $src ){
        return new Loco_gettext_Data( loco_parse_po($src) );
    }


    /**
     * @param string assumed MO bytes
     * @return Loco_gettext_Data
     */
    public static function fromBinary( $bin ){
        return new Loco_gettext_Data( loco_parse_mo($bin) );
    }


    /**
     * Create a dummy/empty instance 
     * @return Loco_gettext_Data
     */
    public static function dummy(){      
        return new Loco_gettext_Data( array( array('source'=>'','target'=>'') ) );
    }


    /**
     * Compile messages to binary MO format
     * @return string MO file source
     * @throws Loco_error_Exception
     */
    public function msgfmt(){
        if( 2 !== strlen("\xC2\xA3") ){
            throw new Loco_error_Exception('Refusing to compile MO file. Please disable mbstring.func_overload'); // @codeCoverageIgnore
        }
        $mo = new LocoMo( $this, $this->getHeaders() );
        $opts = Loco_data_Settings::get();
        if( $opts->gen_hash ){
            $mo->enableHash();
        }
        if( $opts->use_fuzzy ){
            $mo->useFuzzy();
        }
        return $mo->compile();
    }


    /**
     * Get final UTF-8 string for writing to file
     * @param bool whether to sort output, generally only for extracting strings
     * @return string
     */
    public function msgcat( $sort = false ){
        // set maximum line width, zero or >= 15
        $this->wrap( Loco_data_Settings::get()->po_width );
        // concat with default text sorting if specified
        $po = $this->render( $sort ? array( 'LocoPoIterator', 'compare' ) : null );
        // Prepend byte order mark only if configured
        if( Loco_data_Settings::get()->po_utf8_bom ){
            $po = "\xEF\xBB\xBF".$po;
        }
        return $po;
    }


    /**
     * @return array
     */
    public function jsonSerialize(){
        $po = $this->getArrayCopy();
        // exporting headers non-scalar so js doesn't have to parse them
        try {
            $headers = $this->getHeaders();
            if( count($headers) && '' === $po[0]['source'] ){
                $po[0]['target'] = $headers->getArrayCopy();
            }
        }
        // suppress header errors when serializing
        // @codeCoverageIgnoreStart
        catch( Exception $e ){ }
        // @codeCoverageIgnoreEnd
        return $po;
    }


    /**
     * Export to JSON for JavaScript editor
     * @return string
     */
    public function exportJson(){
        return json_encode( $this->jsonSerialize() );
    }


    /**
     * Create a signature for use in comparing source strings between documents
     * @return string
     */
    public function getSourceDigest(){
        $data = $this->getHashes();
        return md5( implode("\1",$data) );
    }

    
    /**
     * @param Loco_Locale
     * @param array custom headers
     * @return Loco_gettext_Data
     */
    public function localize( Loco_Locale $locale, array $custom = null ){
        $date = gmdate('Y-m-d H:i').'+0000'; // <- forcing UCT
        $headers = $this->getHeaders();
        // headers that must always be set if absent
        $defaults = array (
            'Project-Id-Version' => '',
            'Report-Msgid-Bugs-To' => '',
            'POT-Creation-Date' => $date,
        );
        // headers that must always override when localizing
        $required = array (
            'PO-Revision-Date' => $date,
            'Last-Translator' => '',
            'Language-Team' => $locale->getName(),
            'Language' => (string) $locale,
            'Plural-Forms' => $locale->getPluralFormsHeader(),
            'MIME-Version' => '1.0',
            'Content-Type' => 'text/plain; charset=UTF-8',
            'Content-Transfer-Encoding' => '8bit',
            'X-Generator' => 'Loco https://localise.biz/',
            'X-Loco-Version' => sprintf('%s; wp-%s', loco_plugin_version(), $GLOBALS['wp_version'] ),
        );
        // set actual last translator from WordPress login when possible
        if( function_exists('get_current_user_id') && get_current_user_id() ){
            $user = wp_get_current_user();
            $name = $user->get('display_name') or $name = 'nobody';
            $email = $user->get('user_email') or $email = 'nobody@localhost';
            // set user's preferred last translator credit if configured
            $prefs = Loco_data_Preferences::get();
            $credit = $prefs->credit;
            if( ! $credit ){
                $credit = sprintf('%s <%s>', $name, $email );
            }
            $required['Last-Translator'] = apply_filters( 'loco_current_translator', $credit, $name, $email );
        }
        // only set absent or empty headers from default list
        foreach( $defaults as $key => $value ){
            if( ! $headers[$key] ){
                $headers[$key] = $value;
            }
        }
        // add required headers with custom ones overriding
        if( is_array($custom) ){
            $required = array_merge( $required, $custom );
        }
        foreach( $required as $key => $value ){
            $headers[$key] = $value;
        }
        // avoid non-empty POT placeholders that won't have been set from $defaults
        if( 'PACKAGE VERSION' === $headers['Project-Id-Version'] ){
            $headers['Project-Id-Version'] = '';
        }
        // header message must be un-fuzzied if it was formerly a POT file
        return $this->initPo();
    }


    /**
     * @return Loco_gettext_Data
     */
    public function templatize(){
        $date = gmdate('Y-m-d H:i').'+0000'; // <- forcing UCT
        $headers = $this->getHeaders();
        $required = array (
            'Project-Id-Version' => 'PACKAGE VERSION',
            'Report-Msgid-Bugs-To' => '',
            'POT-Creation-Date' => $date,
            'PO-Revision-Date' => 'YEAR-MO-DA HO:MI+ZONE',
            'Last-Translator' => 'FULL NAME <EMAIL@ADDRESS>',
            'Language-Team' => '',
            'Language' => '',
            'Plural-Forms' => 'nplurals=INTEGER; plural=EXPRESSION;',
            'MIME-Version' => '1.0',
            'Content-Type' => 'text/plain; charset=UTF-8',
            'Content-Transfer-Encoding' => '8bit',
            'X-Generator' => 'Loco https://localise.biz/',
            'X-Loco-Version' => sprintf('%s; wp-%s', loco_plugin_version(), $GLOBALS['wp_version'] ),
        );
        foreach( $required as $key => $value ){
            $headers[$key] = $value;
        }

        return $this->initPot();
    }


    /**
     * Remap proprietary base path when PO file is moving to another location.
     * 
     * @param Loco_fs_File the file that was originally extracted to (POT)
     * @param Loco_fs_File the file that must now target references relative to itself
     * @param string vendor name used in header keys
     * @return bool whether base header was alterered
     */
    public function rebaseHeader( Loco_fs_File $origin, Loco_fs_File $target, $vendor ){
        $base = $target->getParent();
        $head = $this->getHeaders();
        $key = 'X-'.$vendor.'-Basepath';
        if( $key = $head->normalize($key) ){
            $oldRelBase = $head[$key];    
            $oldAbsBase = new Loco_fs_Directory($oldRelBase);
            $oldAbsBase->normalize( $origin->getParent() );
            $newRelBase = $oldAbsBase->getRelativePath($base);
            // new base path is relative to $target location 
            $head[$key] = $newRelBase;
            return true;
        }
        return false;
    }


    /**
     * @param string date format as Gettext states "YEAR-MO-DA HO:MI+ZONE"
     * @return int
     */
    public static function parseDate( $podate ){
        if( method_exists('DateTime', 'createFromFormat') ){
            $objdate = DateTime::createFromFormat('Y-m-d H:iO', $podate);
            if( $objdate instanceof DateTime ){
                return $objdate->getTimestamp();
            }
        }
        return strtotime($podate);
    }

} 
