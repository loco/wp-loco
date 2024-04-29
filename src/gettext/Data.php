<?php

loco_require_lib('compiled/gettext.php');

/**
 * Wrapper for array forms of parsed PO data
 */
class Loco_gettext_Data extends LocoPoIterator implements JsonSerializable {

    /**
     * Normalize file extension to internal type.
     * @return string Normalized file extension "po", "pot", "mo", "json" or "php"
     * @throws Loco_error_Exception
     */
    public static function ext( Loco_fs_File $file ){
        $ext = rtrim( strtolower( $file->extension() ), '~' );
        if( 'po' === $ext || 'pot' === $ext || 'mo' === $ext || 'json' === $ext ){
            return $ext;
        }
        // only observing the full `.l10n.php` extension as a translation format.
        if( 'php' === $ext && '.l10n.php' === substr($file->getPath(),-9) ){
            return 'php';
        }
        // translators: Error thrown when attempting to parse a file that is not a supported translation file format
        throw new Loco_error_Exception( sprintf( __('%s is not a Gettext file','loco-translate'), $file->basename() ) );
    }


    /**
     * @return Loco_gettext_Data
     */
    public static function load( Loco_fs_File $file, $type = null ){
        if( is_null($type) ) {
            $type = self::ext($file);
        }
        $type = strtolower($type);
        // catch parse errors, so we can inform user of which file is bad
        try {
            if( 'po' === $type || 'pot' === $type ){
                return self::fromSource( $file->getContents() );
            }
            if( 'mo' === $type ){
                return self::fromBinary( $file->getContents() );
            }
            if( 'json' === $type ){
                return self::fromJson( $file->getContents() );
            }
            if( 'php' === $type ){
                return self::fromPhp( $file->getPath() );
            }
            throw new InvalidArgumentException('No parser for '.$type.' files');
        }
        catch( Loco_error_ParseException $e ){
            $path = $file->getRelativePath( loco_constant('WP_CONTENT_DIR') );
            Loco_error_AdminNotices::debug( sprintf('Failed to parse %s as a %s file; %s',$path,strtoupper($type),$e->getMessage()) );
            throw new Loco_error_ParseException( sprintf('Invalid %s file: %s',$type,basename($path)) );
        }
    }


    /**
     * Like load but just pulls header, saving a full parse
     * @return LocoPoHeaders
     * @throws InvalidArgumentException
     */
    public static function head( Loco_fs_File $file ){
        $p = new LocoPoParser( $file->getContents() );
        $p->parse(0);
        return $p->getHeader();
    }


    /**
     * @param string $src PO source
     * @return Loco_gettext_Data
     */
    public static function fromSource( $src ){
        $p = new LocoPoParser($src);
        return new Loco_gettext_Data( $p->parse() );
    }


    /**
     * @param string $bin MO bytes
     * @return Loco_gettext_Data
     */
    public static function fromBinary( $bin ){
        $p = new LocoMoParser($bin);
        return new Loco_gettext_Data( $p->parse() );
    }


    /**
     * @param string $json Jed source
     * @return Loco_gettext_Data
     */
    public static function fromJson( $json ){
        $blob = json_decode( $json, true );
        $p = new LocoJedParser( $blob['locale_data'] );
        // note that headers outside of locale_data are won't be parsed out. we don't currently need them.
        return new Loco_gettext_Data( $p->parse() );
    }


    /**
     * @param string $path PHP file path
     * @return Loco_gettext_Data
     */
    public static function fromPhp( $path ){
        $blob = include $path;
        if( ! is_array($blob) || ! array_key_exists('messages',$blob) ){
            throw new Loco_error_ParseException('Invalid PHP translation file');
        }
        // refactor PHP structure into JED format
        $p = new LocoMoPhpParser($blob);
        return new Loco_gettext_Data( $p->parse() );
    }


    /**
     * Create a dummy/empty instance with minimum content to be a valid PO file.
     * @return Loco_gettext_Data
     */
    public static function dummy(){
        return new Loco_gettext_Data( [ ['source'=>'','target'=>'Language:'] ] );
    }


    /**
     * Ensure PO source is UTF-8. 
     * Required if we want PO code when we're not parsing it. e.g. source view
     * @param string $src PO source
     * @return string
     */
    public static function ensureUtf8( $src ){
        $src = loco_remove_bom($src,$cs);
        if( ! $cs ){
            // read PO header, requiring partial parse
            try {
                $cs = LocoPoHeaders::fromSource($src)->getCharset();
            }
            catch( Loco_error_ParseException $e ){
                Loco_error_AdminNotices::debug( $e->getMessage() );
            }
        }
        return loco_convert_utf8($src,$cs,false);
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
        /*/ TODO optionally exclude .js strings
        if( $opts->purge_js ){
            $mo->filter....
        }*/
        return $mo->compile();
    }


    /**
     * Get final UTF-8 string for writing to file
     * @param bool $sort Whether to sort output, generally only for extracting strings
     * @return string
     */
    public function msgcat( $sort = false ){
        // set maximum line width, zero or >= 15
        $this->wrap( Loco_data_Settings::get()->po_width );
        // concat with default text sorting if specified
        $po = $this->render( $sort ? [ 'LocoPoIterator', 'compare' ] : null );
        // Prepend byte order mark only if configured
        if( Loco_data_Settings::get()->po_utf8_bom ){
            $po = "\xEF\xBB\xBF".$po;
        }
        return $po;
    }


    /**
     * Compile JED flavour JSON
     * @param string $domain text domain for JED metadata
     * @param string $source reference to file that uses included strings
     * @return string JSON source, or empty if JED file has no entries
     */
    public function msgjed( $domain = 'messages', $source = '' ){
        // note that JED is sparse, like MO. We won't write empty files.
        $data = $this->exportJed();
        if( 1 >= count($data) ){
            return '';
        }
        $head = $this->getHeaders();
        $head['domain'] = $domain;
        // Pretty formatting for debugging. Doing as per WordPress and always escaping Unicode.
        $json_options = 0;
        if( Loco_data_Settings::get()->jed_pretty ){
            $json_options |= loco_constant('JSON_PRETTY_PRINT') | loco_constant('JSON_UNESCAPED_SLASHES'); // | loco_constant('JSON_UNESCAPED_UNICODE');
        }
        // PO should have a date if localised properly
        return json_encode(  [
            'translation-revision-date' => $head['PO-Revision-Date'],
            'generator' => $head['X-Generator'],
            'source' => $source,
            'domain' => $domain,
            'locale_data' =>  [
                $domain => $data,
            ],
        ], $json_options );
    }


    /**
     * @return array
     */
    #[ReturnTypeWillChange]
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
     * Create a signature for use in comparing source strings between documents
     * @return string
     */
    public function getSourceDigest(){
        $data = $this->getHashes();
        return md5( implode("\1",$data) );
    }

    
    /**
     * @param Loco_Locale $locale
     * @param string[] $custom custom headers
     * @return Loco_gettext_Data
     */
    public function localize( Loco_Locale $locale, array $custom = [] ){
        $date = gmdate('Y-m-d H:i').'+0000';
        // headers that must always be set if absent
        $defaults =  [
            'Project-Id-Version' => '',
            'Report-Msgid-Bugs-To' => '',
            'POT-Creation-Date' => $date,
        ];
        // headers that must always override when localizing
        $required =  [
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
        ];
        // Allow some existing headers to remain if PO was previously localized to the same language
        $headers = $this->getHeaders();
        $previous = Loco_Locale::parse( $headers->trimmed('Language') );
        if( $previous->lang === $locale->lang ){
            $header = $headers->trimmed('Plural-Forms');
            if( preg_match('/^\\s*nplurals\\s*=\\s*\\d+\\s*;\\s*plural\\s*=/', $header) ) {
                $required['Plural-Forms'] = $header;
            }
            if( $previous->region === $locale->region && $previous->variant === $locale->variant ){
                unset( $required['Language-Team'] );
            }
        }
        // set user's preferred Last-Translator credit if configured
        if( function_exists('get_current_user_id') && get_current_user_id() ){
            $prefs = Loco_data_Preferences::get();
            $credit = (string) $prefs->credit;
            if( '' === $credit ){
                $credit = $prefs->default_credit();
            }
            // filter credit with current username and email
            $user = wp_get_current_user();
            $credit = apply_filters( 'loco_current_translator', $credit, $user->get('display_name'), $user->get('email') );
            if( '' !== $credit ){
                $required['Last-Translator'] = $credit;
            }
        }
        $headers = $this->applyHeaders($required,$defaults,$custom);
        // avoid non-empty POT placeholders that won't have been set from $defaults
        if( 'PACKAGE VERSION' === $headers['Project-Id-Version'] ){
            $headers['Project-Id-Version'] = '';
        }
        // finally allow headers to be modified via filter
        $replaced = apply_filters( 'loco_po_headers', $headers );
        if( $replaced instanceof LocoPoHeaders && $replaced !== $headers ){
            $this->setHeaders($replaced);
        }
        return $this->initPo();
    }


    /**
     * @param string $domain
     * @return Loco_gettext_Data
     */
    public function templatize( $domain = '' ){
        $date = gmdate('Y-m-d H:i').'+0000'; // <- forcing UCT
        $defaults =  [
            'Project-Id-Version' => 'PACKAGE VERSION',
            'Report-Msgid-Bugs-To' => '',
        ];
        $required =  [
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
            'X-Domain' => $domain,
        ];
        $headers = $this->applyHeaders($required,$defaults);
        // finally allow headers to be modified via filter
        $replaced = apply_filters( 'loco_pot_headers', $headers );
        if( $replaced instanceof LocoPoHeaders && $replaced !== $headers ){
            $this->setHeaders($replaced);
        }
        return $this->initPot();
    }


    /**
     * @return LocoPoHeaders
     */
    private function applyHeaders( array $required = [], array $defaults = [], array $custom = [] ){
        $headers = $this->getHeaders();
        // only set absent or empty headers from default list
        foreach( $defaults as $key => $value ){
            if( ! $headers[$key] ){
                $headers[$key] = $value;
            }
        }
        // add required headers with custom ones overriding
        if( $custom ){
            $required = array_merge( $required, $custom );
        }
        // TODO fix ordering weirdness here. required headers seem to get appended wrongly
        foreach( $required as $key => $value ){
            $headers[$key] = $value;
        }
        return $headers;
    }


    /**
     * Remap proprietary base path when PO file is moving to another location.
     * 
     * @param Loco_fs_File $origin the file that was originally extracted to (POT)
     * @param Loco_fs_File $target the file that must now target references relative to itself
     * @param string $vendor name used in header keys
     * @return bool whether base header was altered
     */
    public function rebaseHeader( Loco_fs_File $origin, Loco_fs_File $target, $vendor ){
        $base = $target->getParent();
        $head = $this->getHeaders();
        $key = $head->normalize('X-'.$vendor.'-Basepath');
        if( $key ){
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
     * Inherit meta values from header given, but leave standard headers intact.
     */
    public function inheritHeader( LocoPoHeaders $source ){
        $target = $this->getHeaders();
        foreach( $source as $key => $value ){
            if( 'X-' === substr($key,0,2) ) {
                $target[$key] = $value;
            }
        }
    }


    /**
     * @param string $podate Gettext data formatted "YEAR-MO-DA HO:MI+ZONE"
     * @return int
     */
    public static function parseDate( $podate ){
        if( method_exists('DateTime','createFromFormat') ){
            $objdate = DateTime::createFromFormat('Y-m-d H:iO', $podate);
            if( $objdate instanceof DateTime ){
                return $objdate->getTimestamp();
            }
        }
        return strtotime($podate);
    }

} 
