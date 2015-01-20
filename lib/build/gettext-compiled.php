<?php
/**
 * Compiled source built from Loco core. Do not edit!
 * Tue, 20 Jan 2015 18:13:29 +0000
 */
/**
 * Utils to be imported into wordpress at lib/loco-compiled.php
 */
/**
 * 
 */
/**
 * Array-like iterator object that allows case-insensitive access to assoc array
 */
class LocoArray implements Iterator, Countable {

    private $i;
    private $length;
    private $keys;
    private $vals;
    private $index;

    public function __construct( array $data = array() ){
        $this->keys = array_keys( $data );
        $this->vals = array_values( $data );
        $this->index = array_flip( array_map( 'strtolower', $this->keys ) );
        $this->length = count( $this->keys );
        $this->rewind();
    }
    
    /**
     * @return LocoArray
     */
    public function add( $key, $val ){
        $k = strtolower($key);
        if( isset($this->index[$k]) ){
            $this->keys[ $this->index[$k] ] = $key;
            $this->vals[ $this->index[$k] ] = $val;
        }
        else {
            $this->index[$k] = $this->length++;
            $this->keys[] = $key;
            $this->vals[] = $val;
        }
        return $this;
    }

    /**
     * @return array
     */
    public function to_array(){
        return array_combine( $this->keys, $this->vals );
    }
    
    function __toString(){
        $pairs = array();
        foreach( $this->keys as $i => $key ){
            $pairs[] = trim($key).': '.$this->vals[$i];
        }
        return implode("\n", $pairs ); 
    }
    
    
    /**
     * @return int
     */
    public function count(){
        return $this->length;
    }
    
    /**
     * @return string
     */
    public function trimmed( $prop ){
        return trim( $this->__get($prop) );
    }    
    
    /**
     * @return bool
     */
    public function has( $key ){
        return isset( $this->index[ strtolower($key) ] );
    }    

    public function __get( $key ){
        $key = strtolower( $key );
        return isset($this->index[$key]) ? $this->vals[ $this->index[$key] ] : null;
    }
    
    
    // implement Iterator
    

    public function rewind(){
        $this->i = reset( $this->index );
    }

    public function key(){
        return is_int($this->i) ? $this->keys[$this->i] : null;
    }

    public function current(){
        return is_int($this->i) ? $this->vals[$this->i] : null;
    }

    public function valid(){
        return is_int($this->i);
    }

    public function next(){
        $this->i = next( $this->index );
    }

}
/**
 * check if a string has at least one c-style printf formatting token present.
 * See loco_parse_printf for the full parser
 * @return bool
 */
function loco_sniff_printf( $str ){
    
    return (bool) preg_match('/%(?:\d\$)?(?:\+|-)?[ 0]?-?\d*(?:\.\d+)?[bcdeEfFgGosuxX]/', $str );
    
}
/**
 * 
 */
 
/**
 * Status flags
 * Not to be confused with country flags
 */

 
define( 'LOCO_FLAG_OK',      0 );
define( 'LOCO_FLAG_ERROR',   1 );
define( 'LOCO_FLAG_REVIEW',  2 );
define( 'LOCO_FLAG_PENDING', 3 );
define( 'LOCO_FLAG_FUZZY',   4 );
//define( 'LOCO_FLAG_DELETE',  5 );


/**
 * 
 */
function loco_flags(){
    static $flags = array (
        LOCO_FLAG_OK      => 'Translated',
        LOCO_FLAG_ERROR   => 'Incorrect',
        LOCO_FLAG_REVIEW  => 'Needs review',
        LOCO_FLAG_PENDING => 'Pending approval',
        LOCO_FLAG_FUZZY   => 'Fuzzy',
        //LOCO_FLAG_DELETE  => 'Redundant', // Obsolete?
    );
    return $flags;
}



/**
 * Resolve a flag constant to its named flag
 * @param int e.g. LOCO_FLAG_FUZZY
 * @return string, e.g. "Fuzzy"
 */
function loco_flag( $f ){
    if( -1 === $f ){
        return 'Untranslated';
    }
    $flags = loco_flags();
    if( ! isset($flags[$f]) ){
        throw new Exception('Invalid LOCO_FLAG_ constant ', var_export($f,1) );
    }
    return $flags[$f];
} 


/**
 * Resolve a flag name to constant
 * @param string e.g. "fuzzy"
 * @return int e.g. LOCO_FLAG_FUZZY
 */
function loco_flag_integer( $f ){
    if( is_numeric($f) ){
        $f = (int) $f;
    }
    else {
        $f = 'LOCO_FLAG_'.strtoupper($f);
        $f = defined($f) ? constant($f) : -1;
    }
    $flags = loco_flags();
    if( ! isset($flags[$f]) ){
        throw new InvalidArgumentException('Unknown flag, '.var_export(func_get_arg(0),1));
    }
    return $f;
}



/**
 * Compiled-in map of Loco translation flags to PO format metadata
 */
function loco_po_flags(){
    static $map = array (
        LOCO_FLAG_FUZZY => '#, fuzzy',
    );
    return $map;
}



/**
 * Parse a loco:{_id} reference out of any string, removing from string afterwards
 * @param string reference to string to hold found _id value
 * @return string reference with _id removed
 */
function loco_parse_reference_id( $refs, &$_id ){
    // (mongo Id is predictable 12 bytes/24 hex)
    // @todo this is slightly error-prone, but faster than preg_match - enable grep if errors reported.
    //if( preg_match('/(?:^|\s)loco:([0-9a-f]{24})(?:\s|$)/', $refs, $r ) ){
    //    $asset['_id'] = $r[1];
    //}
    if( false === ( $n = strpos($refs,'loco:') ) ){
        $_id = '';
        return $refs;
    }
    $_id = substr($refs, $n+5, 24 );
    $refs = substr_replace( $refs, '', $n, 29 );
    return trim( $refs );
}
/**
 * Ensure a string is UTF-8 and optionally remove bytemark
 * @todo should we pass into iconv with byte mark, or remove first? http://shreef.com/2010/08/iconv-misunderstands-utf-16-strings-with-no-bom/
 * @param string original string of any encoding
 * @param string optionally force a known chacter set from user input
 * @param bool optionally specify to prefix UTF-8 bytemark to final string
 * @return string UTF-8 encoded string
 */
function loco_ensure_utf8( $str, $enc = false, $prefix_bom = false ){
    if( false === $enc ){
        // Establish assumed encoding from bytemark
        $m = substr( $str, 0, 3 );
        // UTF-8
        if( "\xEF\xBB\xBF" === $m ){
            $str = substr( $str, 3 );
        }
        // UTF-16 Little Endian
        else if( "\xFF" === $m{0} && "\xFE" === $m{1} ){
            $str = substr( $str, 2 );
            $enc = 'UTF-16LE';
        }
        // UTF-16 Big Endian
        else if( "\xFE" === $m{0} && "\xFF" === $m{1} ){
            $str = substr( $str, 2 );
            $enc = 'UTF-16BE';
        }
        // Else attempt auto-detection.
        else {
            // Note that any ISO-8859-X in list will result in X and UTF-16 cannot be detected
            // See: http://uk.php.net/manual/en/function.mb-detect-order.php
            $enc = mb_detect_encoding( $str, array('ASCII','UTF-8','Windows-1252','ISO-8859-1'), false );
            if( ! $enc ){
                throw new Exception('Unknown character encoding');
            }
        }
    }
    // else alias some explicity encodings
    else if( ! strcasecmp('ISO-8859-1',$enc) || ! strcasecmp('CP-1252', $enc ) ){
        $enc = 'Windows-1252';
    }
    // fix UTF-8 hyphenlessness
    else if( ! strcasecmp('UTF8', $enc) ){
        $enc = '';
    }

    // Convert to UTF-8, if required
    if( $enc && $enc !== 'ASCII' && $enc !== 'UTF-8' ){
        $str = iconv( $enc, 'UTF-8//TRANSLIT', $str );
        if( ! $str ){
            throw new Exception('Failed to ensure UTF-8 from '.$enc);
        }
    }
    // Add bytemark if specified
    if( $prefix_bom ){
        $str = "\xEF\xBB\xBF".$str;
    }
    return $str;
} 


/**
 * Convert *.po or *.pot file into key value pairs
 * @param string PO source
 * @return array
 */
function loco_parse_po( $src ){
    
    // we're not examining encoding, so convert whole file to utf-8
    // otherwise we'll have to run iconv on every string extracted
    $src = loco_ensure_utf8( $src );
    
    $i = -1;
    $key = '';
    $entries = array(); 
    $template = array( '#' => array(), 'id' => array(), 'str' => array(), 'ctxt' => array() );
    // first pass collects raw message data
    foreach( preg_split('/[\r\n]+/', $src) as $line ){
        while( $line = trim($line) ){
            $c = $line{0};
            // encapsed string
            if( '"' === $c ){
                if( $key && isset($entry) ){
                    $entry[$key][$idx][] = loco_po_unquote( $line );
                }
            }
            // index comments by flag: (e.g. "#, fuzzy")
            else if( '#' === $c ){
                // allow a comment to start a new entry, but only if the first str has been encountered
                if( isset($entry['i']) ){
                    unset( $entry );
                    $entry = $template;
                }
                // add comment indexed by special symbol ":", "," etc..
                $f = empty($line{1}) ? ' ' : $line{1};
                $entry['#'][$f][] = trim( substr( $line, 1+strlen($f) ), "/ \n\r\t" );
            }
            else if( preg_match('/^msg(id|str|ctxt|id_plural)(?:\[(\d+)\])?[ \t]+/', $line, $r ) ){
                $key = $r[1];
                $idx = isset($r[2]) ? (int) $r[2] : 0;
                // stop collecting entries as late as possible to permit malformed line ordering:
                if( 'str' === $key ){
                    if( ! isset($entry['i']) ){
                        $entry['i'] = ++$i;
                        $entries[$i] = &$entry;
                    }
                } 
                // else start new entry if needed
                else if( ! isset($entry) || isset($entry['i']) ){
                    unset( $entry );
                    $entry = $template;
                }
                // next token expected to be encapsed string
                $line = substr( $line, strlen($r[0]) );
                continue;
            }
            // else ignore line
            // @todo support commom errors, such as using wrong quote character
            continue 2;
        }
    }
    unset( $entry );

    // second pass resolves plurals and adopts final Loco format
    $assets = array();
    foreach( $entries as $i => $entry ){
        // tolerate badly formed messages
        if( empty($entry['id']) ){
            continue;
        }
        if( empty($entry['str']) ){
            $entry['str'] = array( array('') );
        }
        // parent record:
        $asset = array (
            'id' => '',
            'source' => implode('',$entry['id'][0]),
            'target' => implode('',$entry['str'][0]),
        );
        // state for this loop
        $parse_printf = true;
        // $prev_entry = null; // <- disabled, see $prev_entry references below
        // optional context
        if( isset($entry['ctxt'][0]) ){
            $asset['context'] = implode('',$entry['ctxt'][0]);
        }
        // optional comments and protected/extracted comments
        if( isset($entry['#'][' ']) ){
            $asset['comment'] = implode("\n", $entry['#'][' '] );
        }
        if( isset($entry['#']['.']) ){
            $asset['notes'] = implode("\n", $entry['#']['.'] );
        }
        // #: references
        if( isset($entry['#'][':']) ){
            if( $refs = implode( "\n", $entry['#'][':'] ) ) {
                // parse out special loco _id reference
                if( $refs = loco_parse_reference_id( $refs, $_id ) ){
                    $asset['refs'] = $refs;
                }
                if( $_id ){
                    $asset['_id'] = $_id;
                }
            }
        }
        // #, flags...
        if( isset($entry['#'][',']) ){
            foreach( $entry['#'][','] as $flag ){
                // c-format and no-c-format
                if( preg_match('/((?:no-)?\w+)-format/', $flag, $r ) ){
                    $parse_printf = false;
                    if( 'no-' === substr($r[1],0,3) ){
                        $asset['format'] = false;
                    }
                    else {
                        $asset['format'] = $r[1];
                    }
                }
                // else fall back to naff flag parser which will only ever catch fuzzy unless we add unoffcial ones
                // @todo move this junk out of the util function if it's never going to be used.
                else if( $flag = loco_po_parse_flag($flag) ){
                    $asset['flag'] = $flag;
                    break;
                }
            }
        }
        /*/ #| previous... (disabled for now. not doing anything with it or preserving it)
        if( isset($entry['#']['|']) ){
            // attempt to parse single line as original loco asset_slug
            $prev_entry = implode("\n", $entry['#']['|'] );
            // to dub-parse the previous entry, we must make it a valid PO
            if( false === strpos('msgid ', $prev_entry ) ){
                $prev_entry = "msgid \"\"\n".$prev_entry;
            }
            if( false === strpos('msgstr ', $prev_entry ) ){
                $prev_entry.= "\nmsgstr \"\"";
            }
            if( $prev_entry = loco_parse_po( $prev_entry ) ){
                // taking previous msgid as original Loco asset slug
                $asset['id'] = $prev_entry[0]['source'];
            }
        }*/
        // auto-parse printf tokens
        if( $parse_printf ){
            if( $asset['source'] && loco_sniff_printf( $asset['source'] ) ){
                $asset['format'] = 'c';
                $parse_printf = false;
            }
            // @todo should we detect c-format in target if source is not formatted?
            //else if( $asset['target'] && loco_sniff_printf( $asset['target'] ) ){
        }
        
        $pidx = count($assets);
        $assets[] = $asset;
        // handle plural forms
        if( isset($entry['id_plural']) || isset($entry['str'][1]) ){
            $idx = 0;
            $num = max( 2, count($entry['str']) );
            while( ++$idx < $num ){
                $plural = array (
                    'id'     => '',
                    'source' => '',
                    'target' => isset($entry['str'][$idx]) ? implode('',$entry['str'][$idx]) : '',
                    'plural' => $idx,
                    'parent' => $pidx,
                );
                // it's possible that we have target with no source, because gettext supports only two source plurals
                if( 1 === $idx ){
                    $plural['source'] = isset($entry['id_plural'][0]) ? implode('',$entry['id_plural'][0]) : '';
                    /*/ #| msgid_plural (disabled, see above)
                    if( $prev_entry && isset($prev_entry[1]) && 0 === $prev_entry[1]['parent'] ){
                        $plural['id'] = $prev_entry[1]['source'];
                    }*/
                }
                // check plural for c-format, but apply to parent asset
                if( $parse_printf ){
                    if( $plural['source'] && loco_sniff_printf( $plural['source'] ) ){
                        $assets[$pidx]['format'] = 'c';
                        $parse_printf = false;
                    }
                }
                $assets[] = $plural;
            }
        }
    }


    // Do post-processing based on header values
    //
    if( $assets && '' === $assets[0]['source'] ){
        $headers = loco_parse_po_headers( $assets[0]['target'] );
        
        // @todo post-convert charset instead of doing ensure_utf8 at start?
        
        // Fix non-source key mapping from previous Loco export
        //
        $indexed = $headers->__get('X-Loco-Lookup');
        if( 'id' === $indexed || 'name' === $indexed ){
            foreach( $assets as $i => $asset ){
                if( isset($asset['notes']) ){
                    // collect source from special extracted comment
                    $notes = $texts = array();
                    foreach( explode("\n",$asset['notes']) as $line ){
                        0 === strpos($line,'Source text: ') ? $texts[] = substr($line,13) : $notes[] = $line;
                    }
                    $assets[$i]['notes'] = implode("\n",$notes);
                    $assets[$i]['id'] = $asset['source'];
                    $assets[$i]['source'] = implode("\n",$texts);
                }
            }
        }
        
    }



    //var_dump( $assets ); die();
    return $assets;
} 



/**
 * convert a PO flag string to a (currently single) Loco translation flag
 * currently only "fuzzy" maps to Loco flags, but this 
 */
function loco_po_parse_flag( $text, $flag = 0 ){
    $map = loco_po_flags();
    foreach( explode(',',$text) as $needle ){
        if( $needle = trim($needle) ){
            foreach( $map as $loco_flag => $haystack ){
                if( false !== stripos($haystack, $needle) ){
                    $flag |= $loco_flag;
                    break; // <- currently Loco flags are a single status code
                }
            }
        }
    }
    return $flag;
}




/**
 * Utility - decapse quoted PO string
 */
function loco_po_unquote( $str ){
    return substr( stripcslashes($str), 1, -1 );
}




/**
 * converts PO header message to indexed array
 * @return LocoArray
 */
function loco_parse_po_headers( $str ){
    $headers = new LocoArray( array() );
    foreach( explode("\n",$str) as $line ){
        $i = strpos($line,':') and
        $key = trim( substr($line,0,$i) ) and
        $headers->add( $key, trim( substr($line,++$i) ) );
    }
    return $headers;
} 
















/**
 * MO file parser
 * https://www.gnu.org/software/gettext/manual/html_node/MO-Files.html
 */
class LocoMoParser {
    
    /**
     * Complete binary source string
     * @var string
     */
    private $bin;
    
    /**
     * Whether Endian is Big, as opposed to little.
     * @var bool
     */    
    private $be;    
    
    /**
     * Number of strings
     * @var int
     */
    private $n;
    
    /**
     * Offset of table with original strings.
     * @var int
     */    
    private $o;
    
    /**
     * Offset of table with translation strings
     * @var int
     */
    private $t;
    
    /**
     * Version
     * @var int
     */        
    private $v;

         
    /**
     * @param string binary source 
     */
    public function __construct( $bin ){
        $this->bin = $bin;
    }
    

    
    /**
     * Get message at a given offset (as per hashing table)
     * @return string|array depending if plural or not
     */
    public function getAt( $idx ){
        // get pointer to given source item
        $offset = $this->targetOffset();
        $offset += ( $idx * 8 );
        $len = $this->integerAt( $offset );
        $idx = $this->integerAt( $offset + 4 );
        $txt = $this->bytes( $idx, $len );
        // split to plurals if need be
        if( false === strpos( $txt, "\0") ){
            return $txt;
        }
        // return as plurals
        return explode( "\0", $txt );
    }    

    
    
    /**
     * Run full parse
     * @return array 
     */
    public function parse(){
        $sourceOffset = $this->sourceOffset();
        $targetOffset = $this->targetOffset();
        $r = array(); // <- export array
        $p = array(); // <- plural registry
        // iterate over all source strings until start of translations
        $i = 0;
        $offset = $sourceOffset;
        while( $offset < $targetOffset ){
            $r[$i] = array( 'id' => '', 'source' => '', 'target' => '' );
            $len = $this->integerAt( $offset );
            $idx = $this->integerAt( $offset + 4 );
            $src = $this->bytes( $idx, $len );
            // source may have context separated by EOT byte (End-of-transmission)
            $eot = strpos( $src, "\x04" );
            if( false !== $eot ){
                $r[$i]['context'] = $this->decodeStr( substr($src, 0, $eot ) );
                $src = substr( $src, $eot+1 );
            }
            // source may have plural separated by NUL byte
            $nul = strpos( $src, "\0" );
            if( false !== $nul ){
                $p[$i][1] = array( 'id' => '', 'source' => substr($src, $nul+1 ), 'target' => '', 'parent' => $i, 'plural' => 1 );
                $src = substr( $src, 0, $nul );
            }
            // next source string
            $r[$i++]['source'] = $this->decodeStr($src);
            $offset += 8;
            //printf("%u: %s => %08x\n", $i, $src, $idx );
        }
        // iterate over target/translations until number of sources reached.
        $t = $i;
        $offset = $targetOffset;
        for( $i = 0; $i < $t; $i++ ){
            $len = $this->integerAt( $offset );
            $idx = $this->integerAt( $offset + 4 );
            $txt = $this->bytes( $idx, $len );
            // target may have any number of plurals
            if( false !== strpos( $txt, "\0" ) ){
                $arr = explode( "\0", $txt );
                $txt = array_shift( $arr );
                if( isset($p[$i][1]) ){
                    foreach( $arr as $_i => $plural_txt ){
                        $plural_idx = $_i + 1;
                        $p[$i][$plural_idx]['target'] = $this->decodeStr($plural_txt);
                    }
                }
                // tollerate situation where msgstr has empty plural forms when not needed
                else if( '' === implode('',$arr) ){
                    // fall through to collect leading text as singular msgstr
                }
                else {
                    throw new Exception('plural has no corresponding msgid_plural at '.$i);
                }
            }
            // next target string
            $r[$i]['target'] = $this->decodeStr($txt);
            $offset += 8;
        }
        // append collected plurals:
        foreach( $p as $parent_id => $plurals ){
            foreach( $plurals as $plural_idx => $msg ){
                //$src = $p[$parent_id][1]['source'];
                //$msg['source'] = $src.' (plural '.$plural_idx.')';
                if( 1 < $plural_idx ){
                    // no source for plurals outside germanic range
                    $msg['source'] = $plurals[1]['source'].' (plural '.$plural_idx.')';
                }
                $msg['parent'] = $parent_id;
                $msg['plural'] = $plural_idx;
                $r[] = $msg;
            }   
        }
        return $r;
    }
    
    
    
    /**
     * @return bool
     */
    public function isBigendian(){
        while( is_null($this->be) ){ 
            $str = $this->words( 0, 2 );
            // Magic number 0x950412de if Little endian
            $arr = unpack('V', $str);
            if( 0x950412de === $arr[1] ){
                $this->be = false;
                break;
            }
            // Magic number reversed if Big endian
            if( 0xde120495 === $arr[1] ){
                $this->be = true;
                break;
            }
            // else unknown endian encoding
            throw new Exception('Invalid MO format');
            //$str = str_replace( '%', '\\', rawurlencode($str) );
            //throw new Exception('Unknown endianness, magic number is '.$str ); 
        }
        return $this->be;
    }    
    
    
    
    /**
     * Get MO file format version
     */
    public function version(){
        if( is_null($this->v) ){
            // version at second word
            $this->v = $this->integerWord(1);
        }
        return $this->v;
    }    
     
     

    /**
     * Get number of strings
     */
    public function count(){
        if( is_null($this->n) ){
            // count at third word
            $this->n = $this->integerWord(2);
        }
        return $this->n;
    }     



    /**
     * Get original strings offset
     */
    public function sourceOffset(){
        if( is_null($this->o) ){
            $this->o = $this->integerWord(3);
        }
        return $this->o;
    }



    /**
     * Get translated strings offset
     */
    public function targetOffset(){
        if( is_null($this->t) ){
            $this->t = $this->integerWord(4);
        }
        return $this->t;
    }
    
    
    /**
     * Pull binary (unparsed) hash table
     * @return string
     */
    public function getHashTable(){
        $s = $this->integerWord(5);
        $h = $this->integerWord(6);
        return $this->bytes( $h, $s * 4 );
    }

    
    /**
     * Get arbitary bytes from source
     * @param int byte offset
     * @param int number of bytes to get
     * @return string
     */
    private function bytes( $offset, $length ){
        return substr( $this->bin, $offset, $length );
    }
    
    
    
    /**
     * Get 4 bytes (one word) from source
     * @param int word offset
     * @param int number of words to get
     * @return string
     */
    private function words( $offset, $length ){
        return $this->bytes( $offset * 4, $length * 4 );
    }    
    
    
    
    /**
     * Get 32 bit integer encoded as single word
     * @param int word offset
     */
    private function integerWord( $offset ){
        return $this->integerAt( $offset * 4 );
    }


    
    /**
     * Get 32 bit integer encoded at a specific byte offset
     */
    private function integerAt( $offset ){
        $str = $this->bytes( $offset, 4 );
        $fmt = $this->isBigendian() ? 'N' : 'V';
        $arr = unpack( $fmt, $str );
        if( ! isset($arr[1]) || ! is_int($arr[1]) ){
            throw new Exception('Failed to read 32 bit integer at byte '.$offset);
        }
        return $arr[1];
    }     
    
    
    /**
     * faster, more error tollerant than loco_ensure_utf8
     */    
    private function decodeStr( $str ){
        $enc = mb_detect_encoding( $str, array('ASCII','UTF-8','ISO-8859-1'), false );        
        if( $enc && $enc !== 'ASCII' && $enc !== 'UTF-8' ){
            $str = iconv( $enc, 'UTF-8', $str );
        }
        return $str;
    }    
    
} 




/**
 * @param string binary MO file source
 * @return array
 */
function loco_parse_mo( $src ){
    $mo = new LocoMoParser($src);
    return $mo->parse();
}

/**
 * 
 */

/**
 * Not a parser, just an interface to token iteration
 */
final class PHPTokens implements Iterator {
    
    private $tokens;
    private $i;
    private $skip_tokens = array();
    private $skip_strings = array();
    private $literal_tokens = array();
    
    
    public function __construct( array $tokens ){
        $this->tokens = $tokens;
        $this->rewind();
    }
    
    
    
    /**
     * @param int token to fall back to string literal. e.g. T_BOOLEAN_AND => "&&", T_STRING => <anything>
     * @param int ....
     * @return PHPTokens
     */
    public function literal(){
        foreach( func_get_args() as $t ){
            $this->literal_tokens[ $t ] = 1;    
        }
        return $this;
    }
    
    

    
    /**
     * Ignore passed tokens
     * @param int token constant
     * @param int ...
     * @return PHPTokens
     */
    public function ignore(){
        foreach( func_get_args() as $t ){
            if( is_int($t) ){
                $this->skip_tokens[$t] = true;
            }
            else {
                $this->skip_strings[$t] = true;
            }
        }
        return $this;
    }
    
    
    /**
     * Export tokens as transformed by settings
     */
    public function export(){
        $arr = array();
        foreach( $this as $tok ){
            $arr[] = $tok;
        }
        return $arr;
    }


    public function advance(){
        $this->next();
        return $this->current();
    }
    
    public function pop(){
        $tok = array_pop( $this->tokens );
        $this->rewind();
        return $tok;
    }

    public function shift(){
        $tok = array_shift( $this->tokens);
        $this->rewind();
        return $tok;
    }
    
    
    // implement Iterator

    public function rewind(){
        $this->i = ( false === reset($this->tokens) ? null : key($this->tokens) );
    }

    public function valid(){
        while( isset($this->i) ){
            $tok = $this->tokens[$this->i];
            if( is_array($tok) ){
                if( isset($this->skip_tokens[$tok[0]]) ){
                    $this->next();
                }
                else {
                    return true;
                }
            }
            else if( isset($this->skip_strings[$tok]) ){
                $this->next();
            }
            else {
                return true;
            }
        }
        return false;
    }
    

    public function key(){
        return $this->i;
    }


    public function next(){
        $this->i = ( false === next($this->tokens) ? null : key($this->tokens) );
    }


    public function current(){
        if( ! $this->valid() ){
            return false;
        }
        $tok = $this->tokens[$this->i];
        if( is_array($tok) && isset($this->literal_tokens[$tok[0]]) ){
            return $tok[1];
        }
        return $tok;
    }


    public function __toString(){
        $s = '';
        foreach( $this as $token ){
            $s .= is_array($token) ? $token[1] : $token;
        }
        return $s;
    }
        
    
    
}
 
/**
 * Parse a PHP/JS/iPS style comment into lines without comment syntax junk
 * @param string raw comment, e.g. "// stuff"
 * @return string neat comment lines, e.g. "stuff"
 */
function loco_parse_comment($comment){
    //  parse multiline comment
    if( '*' === $comment{1} ){
        $lines = array();
        foreach( explode("\n", $comment) as $line ){
            $line and $lines[] = trim($line,"/* \r\t");
        }
        $comment = implode("\n", $lines);
    }
    // else parse single line comment
    return trim( $comment,"/ \n\r\t" );
    
}

/**
 * Decapse an encapsed string, as per T_CONSTANT_ENCAPSED_STRING.
 * - Uses str_replace instead of stripslashes, so slashes are only removed from target quotes.
 * - Does not validate that string is correctly terminated
 * @example parsing/utils/decapse_string.php
 * @param string encapsed string, e.g. <code>'Tim\'s shoes are \'awesome\'!'</code>
 * @return string native decapsed string, e.g. <code>Tim's shoes are 'awesome'!</code>
 */
function decapse_string( $s ){
	if( empty($s) ){
		return '';
	}
	$q = $s{0};
	switch( $q ){
	case "'":
	case '"':
		$s = substr( $s, 1, -1 );
        // double quotes support various escape characters
        if( '"' === $q ){
            return stripcslashes($s);
        }
        // else just unescape any quotes
        return str_replace( array( '\\'.$q, '\\\\' ), array( $q, '\\' ), $s );
	default:
		return $s;	
	}
} 
 



/**
 * xgettext style extract that creates Loco's formatted raw asset array 
 * @param array PHP tokens from token_get_all
 * @param string optional file name if references are to be collected
 */
function loco_extract_php( array $tokens, $fileref = '' ){
    $extractor = new LocoPHPExtractor;
    return $extractor->extract( $tokens, $fileref );
}




/**
 * 
 */
final class LocoPHPExtractor {

    private static $rules = array (
        // Gettext: http://www.php.net/manual/en/ref.gettext.php
        '_' => 's',
        'gettext' => 's',
        'dgettext' => '_s',
        'ngettext' => 'sp',
        'dngettext' => '_sp',
        // Wordpress: See http://i18n.svn.wordpress.org/tools/trunk/makepot.php
        '__' => 's',
        '_e' => 's',
        '_c' => 's',
        '_n' => 'sp',
        '_n_noop' => 'sp',
        '_nc' => 'sp',
        '__ngettext' => 'sp',
        '__ngettext_noop' => 'sp',
        '_x' => 'sc',
        '_ex' => 'sc',
        '_nx' => 'sp_c',
        '_nx_noop' => 'spc',
        '_n_js' => 'sp',
        '_nx_js' => 'spc',
        'esc_attr__' => 's',
        'esc_html__' => 's',
        'esc_attr_e' => 's',
        'esc_html_e' => 's',
        'esc_attr_x' => 'sc',
        'esc_html_x' => 'sc',
        'comments_number_link' => '_sp',
        // Drupal: https://api.drupal.org/api/drupal/includes%21bootstrap.inc/function/t/7
        't' => 's',
        'st' => 's',
        // Symfony: http://symfony.com/doc/current/book/translation.html
        'trans' => 's',
        'transChoice' => 'sp',
        // todo: more common PHP translate functions
    );   
    
    /**
     * assets exytracted in Loco's internal format
     * @var array
     */
    private $exp = array();
    
    /**
     * registry of asset offsets to ensure uniquness
     * @var array
     */
    private $reg = array();
    
    
    /**
     * Create a template header as first message
     *    
    public function __construct(){
        static $header = '';
        if( ! $header ){
            $k = $this->get_xgettext_keywords();
            $h[] = 'X-Poedit-KeywordsList: '.implode(';',$k);
            $header = implode("\n", $h );
        }
        $this->exp[] = array (
            'id' => '',
            'source' => '',
            'target' => $header,
        );
    }*/    
    
    
    /**
     * @param array any token stream
     * @return array POT
     */
    public function extract( array $tokens, $fileref = '' ){

        $tokens = new PHPTokens( $tokens );
        $tokens->ignore( T_WHITESPACE );

        $comment = '';
        
        foreach( $tokens as $tok ){
            if( isset($args) ){
                if( ')' === $tok ){
                    isset($arg) and $arg and $args[] = $arg;
                    $this->push( $rule, $args, $comment, $ref );
                    unset($args,$arg);
                    $comment = '';
                }
                else if( ',' === $tok ){
                    isset($arg) and $arg and $args[] = $arg;
                    unset($arg);
                }
                else if( isset($arg) ){
                    $arg[] = $tok;
                }
                else {
                    $arg = array( $tok );
                }
            }
            else if( is_array($tok) ){
                list($t,$s) = $tok;
                if( T_COMMENT === $t || T_DOC_COMMENT === $t ){
                    $comment = $s;
                }
                // begin args as soon as function name encountered
                else if( T_STRING === $t && isset(self::$rules[$s]) && '(' === $tokens->advance() ){
                    $rule = self::$rules[$s];
                    $args = array();
                    $ref  = $fileref ? $fileref.':'.$tok[2]: '';
                }
                // scrub any comment not immediately preceding function call unless it contains keyword
                // @todo other keywords or cleverer matching here.
                else if( $comment && false === stripos($comment, 'translators') ){
                    $comment = '';
                }
            }
        }

        //var_dump( $this->exp );die();
        
        return $this->exp;
    }
    
    
    /**
     * @internal
     */
    private function push( $rule, array $args, $comment = '', $ref = '' ){
            
        $s = strpos( $rule, 's');  // <- singular argument
        $p = strpos( $rule, 'p');  // <- plural argument
        $c = strpos( $rule, 'c');  // <- context argument 
    
        // reduce arguments to either NULL or a single string literal
        foreach( $args as $i => $tokens ){
            if( 1 === count($tokens) && is_array($tokens[0]) && T_CONSTANT_ENCAPSED_STRING === $tokens[0][0] ){
                $args[$i] = decapse_string( $tokens[0][1] );
            }
            else {
                $args[$i] = null;
            }
        }
    
        // All functions expect at least an initial string argument
        $key = $msgid = $args[$s];
        if( ! $msgid ){
            return null;
        }
        
        $entry = array (
            'id' => '',
            'source' => $msgid,
            'target' => '',
        );

        // check for context and add to uniquness:
        if( $c && isset($args[$c]) ){
            $entry['context'] = $args[$c];
            $key .= "\0". $args[$c];
        }
        
        // create a unique ID - key could be far too long
        // $entry['id'] = md5( $key );
        
        // add asset reference if passed
        if( $ref ){
            $entry['refs'] = $ref;
        }
        
        // parse formatting tokens unless the next block preempts
        $parse_printf = true;
               
        // handle developer comment from source
        if( $comment ){
            // comment may contain xgettext hints, e.g. xgettext:c-format although should be xgettext:php-format
            if( preg_match('/xgettext:\s*((?:no-)?\w+)-format/', $comment, $r ) ){
                if( 'no-' === substr($r[1],0,3) ){
                    $entry['format'] = false;
                }
                else {
                    $entry['format'] = $r[1];
                }
                // @todo should found hint be removed from comment? could be messy 
                $comment = str_replace( $r[0], '', $comment );
                $parse_printf = false;
            }
            // Parse comment token values into single comment text block
            // code comments used for "extracted comments" notes field.
            $entry['notes'] = loco_parse_comment($comment);
        }
        
        // parse printf formatting tokens if possible for php-format flag
        if( $parse_printf && loco_sniff_printf( $msgid ) ){
            $entry['format'] = 'php';
            $parse_printf = false;
        }
        
        // check if already registered this asset:
        if( isset($this->reg[$key]) ){
            $index = $this->reg[$key];    
            // merge references
            $a = array();
            isset($this->exp[$index]['refs']) and $a[] = $this->exp[$index]['refs'];
            isset($entry['refs']) and $a[] = $entry['refs'];
            $a && $this->exp[$index]['refs'] = implode(" ", $a );
            // merge comments
            $a = array();
            isset($this->exp[$index]['notes']) and $a[] = $this->exp[$index]['notes'];
            isset($entry['notes']) and $a[] = $entry['notes'];
            $a && $this->exp[$index]['notes'] = implode("\n", $a );
            // @todo should be merge xgettext commands merged into flags?
        }
        // else add to registry as new asset
        else {
            $index = count($this->exp);
            $this->reg[$key] = $index;
            $this->exp[] = $entry;
        }
    
        // check for presense of plural
        if( $p && isset($args[$p]) ){
            $msgid_plural = $args[$p];
            $entry = array (
                'id'     => '', //md5($msgid_plural),
                'source' => $msgid_plural,
                'target' => '',
                'plural' => 1,
                'parent' => $index,
            );
            // plural may have php-format when child asset didn't, but we apply flag to parent asset
            if( $parse_printf && loco_sniff_printf( $msgid_plural ) ){
                $this->exp[$index]['format'] = 'php';
            }
            // ensure plural doesn't clash with an existing singular asset
            $key = $msgid_plural."\0\0";
            if( isset($this->reg[$key]) ){
                // @todo unsure what to do here, currently overriding
                $plural_index = $this->reg[$key];
                $this->exp[$plural_index] = $entry;
            }
            // else add plural to registry
            else {
                $plural_index = count($this->exp);
                $this->reg[$key] = $plural_index;
                $this->exp[] = $entry;
            }
        }
        
        return $index;
    }



    /**
     * Compile a `xgettext` command from our rules
     */
    public function get_xgettext( $input = '-' ){
        $cmd = defined('WHICH_XGETTEXT') ? WHICH_XGETTEXT : 'xgettext';
        $cmd.= ' -LPHP -c -o-';
        if( $k = $this->get_xgettext_keywords() ){
            $cmd.= ' -k'.implode(' -k', $k );
        }
        return $cmd.' '.$input;
    }
    
    
    /**
     * Compile a `xgettext` --keyword strings from our rules
     * return array
     */
    public function get_xgettext_keywords(){
        $ks = array();
        foreach( self::$rules as $word => $rule ){
            $s = strpos( $rule, 's');
            $k = $word.':'.++$s;
            if( false !== $p = strpos( $rule, 'p') ){
                $k.= ','.++$p;
            }
            if( false !== $p = strpos( $rule, 'c') ){
                $k.= ','.++$p.'c';
            }
            $ks[] = $k;
        }
        return $ks;
    }    


}













/**
 * Utility for generating relative paths from one location to another
 * 
 * @param string current location, e.g. "/a/b/c"
 * @param string target location, e.g. "/a/d"
 * @return string relative path, e.g. "../../d"
 */
function loco_relative_path( $source_path, $target_path ){
    $rel = '';
    $common = false; 
    $src = preg_split('!/+!', $source_path, -1, PREG_SPLIT_NO_EMPTY );
    $dst = preg_split('!/+!', $target_path, -1, PREG_SPLIT_NO_EMPTY );
    // shift directory names until we have a common base
    while( $src && $dst ){
        if( current($src) !== current($dst) ){
            // paths diverge
            break;
        }
        $common = true;
        array_shift($src);
        array_shift($dst);
    }
    // if nothing in common, return full path
    if( ! $common ){
        return $target_path;
    }
    // $src contains items to climb up
    if( $src ){
        $up = array_fill( 0, count($src), '..' );
        $rel = implode('/', $up );
    }
    // $dst contains items to drill down
    if( $dst ){
        $rel && $rel .= '/';
        $rel .= implode('/', $dst );
    }
    return $rel;
}
/**
 * File containing function loco_msgfmt
 */

/**
 * 
 */
 
 
 
/**
 * MO compiler
 * https://www.gnu.org/software/gettext/manual/html_node/MO-Files.html
 */
class LocoMo {
    
    private $bin;
    
    private $msgs;
    
    private $head;
    
    /**
     * @var LocoMoTable
     */
    private $hash;    
    
    /**
     * Construct with export data in format from LocoPack render operation
     */
    public function __construct( array $export, LocoArray $head = null ){
        if( ! $head ){
            $head = new LocoArray( array(
                'Project-Id-Version' => 'Loco',
                'Language' => 'English',
                'Plural-Forms' => 'nplurals=2; plural=(n!=1);',
                'MIME-Version' => '1.0',
                'Content-Type' => 'text/plain; charset=UTF-8',
                'Content-Transfer-Encoding' => '8bit',
                'X-Generator' => 'Loco '.PLUG_HTTP_ADDR,
            ) );
        }
        $this->head = $head;
        $this->msgs = $export;
        $this->bin = '';
    }
    
    
    
    /**
     * Enable hash table compilation
     * @return LocoMoTable
     */
    public function enableHash(){
        return $this->hash = new LocoMoTable;
    }
        
    
    /**
     * set any header value
     * @return LocoMo
     */
    public function setHeader( $key, $val ){
        $this->head->add($key, $val);
        return $this;
    }     
        
    
    /**
     * Set project metadata
     * @return LocoMo
     */
    public function setProject( LocoProject $Proj ){
        return $this
            ->setHeader( 'Project-Id-Version', $Proj->proj_name )
            ->setHeader($key, $val)
        ;
    } 
 

    /**
     * set target locale for header metadata
     */
    public function setLocale( LocoProjectLocale $Loc ){
        return $this
            ->setHeader( 'Language', $Loc->label )
            ->setHeader( 'Plural-Forms', 'nplurals='.$Loc->nplurals.'; plural='.$Loc->pluraleq.';' )
        ;
    }
    
    
    /**
     * Get number of messages, not including header
     * @return int
     */
    public function count(){
        return count($this->msgs);
    }
    

    /**
     * @return string binary MO file source
     */
    public function compile(){
        // start with header, not included in messages
        $table = array('');
        $sources = array('');
        $targets = array( $this->head->__toString() );
        
        // compile NUL terminated strings and collect byte offsets
        foreach( $this->msgs as $r ){
            // compile source string including context if present
            $msgid = $r['key'];
            if( isset($r['context']) && $r['context'] ){
                $msgid or $msgid = "(".$r['context'].')'; // <- this is what gettext msgfmt does!
                $msgid = $r['context']."\x04".$msgid;
            }
            if( ! $msgid ){
                // disallowing empty source even if it has a context
                continue;
            }
            // compile target string
            $msgstr = $r['translation'];
            if( ! $msgstr ){
                // empty translations should be missing from tables
                continue;
            }
            // include pre-pluralized msgid in hash table now we know it's included
            $table[] = $msgid;
            // append plural data separated by NULs
            if( isset($r['plurals']) ){
                foreach( $r['plurals'] as $i => $p ){
                    // single plural source only (germanic restriction in gettext)
                    if( $i === 0 ){
                        $msgid .= "\0".$p['key'];
                    }
                    // @todo will untranslated plurals be present, or will we need to pad them with known plural number in locale?
                    $msgstr .= "\0".$p['translation'];
                }
            }
            $sources[] = $msgid;
            $targets[] = $msgstr;
        }

        // lexical sorting after context resolved, keeping indexes.
        asort( $sources, SORT_STRING );
       
        // start string concatenation                
        $this->bin = '';
        // start with magic number, followed by version number 0
        $this->writeInteger( 0x950412de );
        $this->writeInteger( 0 );
        // N (number of strings) including msgid "" (header)
        $n = count($sources);
        $this->writeInteger( $n );
        // O (offset of table with original strings) starts after hash table info
        $offset = 28;
        $this->writeInteger( $offset );
        // T (offset of table with translation strings) starts after original string offsets
        // string offsets should take up one byte each
        $offset += $n * 8;
        $this->writeInteger( $offset );
        // S (size of hashing table) if used
        if( $this->hash ){
            sort( $table, SORT_STRING );
            $this->hash->compile( $table );
            $s = $this->hash->count();
        }
        else {
            $s = 0;
        }
        $this->writeInteger( $s );
        // H (offset of hashing table) starts after translation offsets table
        $offset += $n * 8;
        $this->writeInteger( $offset );
        // if hash table present, make room before source string offsets
        if( $s ){
            $offset += $s * 4;
        }
        // Write source offset values, starting at fourth word, requiring one byte each
        $source = '';
        foreach( $sources as $i => $str ){
            $source .= $str."\0";
            $this->writeInteger( $strlen = strlen($str) );
            $this->writeInteger( $offset );
            $offset += $strlen + 1;
        }
        // followed by target offsets, ensuring the same array indexes
        $target = '';
        foreach( array_keys($sources) as $i ){
            $str = $targets[$i];
            $target .= $str."\0";
            $this->writeInteger( $strlen = strlen($str) );
            $this->writeInteger( $offset );
            $offset += $strlen + 1;
        }
        // Write hash table
        if( $this->hash ){
            $this->bin .= $this->hash->__toString();
        }
        // Write actual sources and targets that we've collected and we're done
        $this->bin .= $source;
        $this->bin .= $target;
        return $this->bin;
    }
    
    
    /**
     * Write a 32 bit integer using 4 bytes (one word) in Little Endian byte order
     * @return LocoMo
     */
    private function writeInteger( $num ){
        $this->bin .= pack( 'V', $num );
        return $this;
    }    
    
    
}
/**
 * Hash table for MO files.
 * 
 * See algorithms in GNU Gettext Source code:
 * http://fossies.org/dox/gettext-0.18.3.1/write-mo_8c_source.html#l00384
 * 
 * See also my own testing on Gist:
 * https://gist.github.com/timwhitlock/8255619
 */
class LocoMoTable {
    
    /**
     * Byte size of hash table
     * @var int
     */
    private $size = 0;

    /**
     * Binary source of hash table
     * @var string
     */
    private $bin = ''; 
    
    /**
     * Cached array form of hash table
     * @var array
     */
    private $map;    
    
    
    /**
     * 
     */
    public function __construct( $data = null ){
        if( is_array($data) ){
            $this->compile( $data );
        }
        else if( $data ){
            $this->parse( $data );
        }
    }
    
    
    /**
     * Get number of available entries in table (NOT number of strings indexed)
     */
    public function count(){
        if( ! isset($this->size) ){
            if( $this->bin ){
                $this->size = (int) ( strlen( $this->bin ) / 4 );
            }
            else if( is_array($this->map) ){
                $this->size = count($this->map);
            }
            else {
                return 0;
            }
            // check valid table size
            if( ! self::is_prime($this->size) || $this->size < 3 ){
                throw new Exception('Size expected to be prime number above 2, got '.$this->size);
            }
        }
        return $this->size;
    }

    
    /**
     * Get byte size of table
     */
    public function bytes(){
        return $this->count() * 4;
    }        


    /**
     * Get current binary string
     */
    public function __toString(){
        return $this->bin;
    }
    
    
    /**
     * Get current index
     */
    public function export(){
        if( ! is_array($this->map) ){
            $this->parse( $this->bin );        
        }
        return $this->map;
    }    

    
    /**
     * Reset hash map with empty table of given size
     * @param int number of items to be indexed in table
     * @return int size of table (number of slots)
     */
    private function reset( $length ){
        $this->size = max( 3, self::next_prime ( $length * 4 / 3 ) );
        $this->bin = null;
        $this->map = array(); 
        return $this->size;
    }
    
    
    
    /**
     * Build hash table string from array of msgid strings. (From write-mo.c)
     * http://fossies.org/dox/gettext-0.18.3.1/write-mo_8c_source.html#l00550
     */
    public function compile( array $msgids ){
        $hash_tab_size = $this->reset( count($msgids) );
        $packed = array_fill( 0, $hash_tab_size, "\0\0\0\0" );
        $j = 0;
        foreach( $msgids as $msgid ){
            $hash_val = self::hashpjw( $msgid );
            $idx = $hash_val % $hash_tab_size;
            // double hash for conflicts until slot is found
            if( array_key_exists($idx, $this->map) ){
                $incr = 1 + ( $hash_val % ( $hash_tab_size - 2 ) );
                do {
                    $idx += $incr;
                    if( $hash_val === $idx ){
                        throw new Exception('Unable to find empty slot in hash table');
                    }
                    $idx %= $hash_tab_size;
                }
                /*do { // This works as per C code, but incorrect table size calculation would result in infinte loop
                    $diff = $hash_tab_size - $incr;
                    if ( $idx >= $diff ) {
                        $idx -= $diff;
                    }
                    else {
                        $idx += $incr;
                    }
                }*/ 
                while( array_key_exists($idx, $this->map ) );
            }
            // internally items are zero indexed
            $this->map[$idx] = $j;
            // packed items are +1 so that 0 indicates an empty slot
            $packed[$idx] = pack('V', ++$j );
        }
        // imploding packed bytes should be faster than substr_replace (I think)
        return $this->bin = implode('',$packed);
    }  


    
    /**
     * Lookup msgid within given array.
     * Note that array is required due to double hashing technique.
     * @return int offset within given array
     */
    public function lookup( $msgid, array $msgids ){
        $hash_val = self::hashpjw( $msgid );
        $idx = $hash_val % $this->size;
        $incr = 1 + ( $hash_val % ( $this->size - 2 ) );
        while( true ){
            if( ! array_key_exists($idx, $this->map) ){
                break;
            }
            $j = $this->map[$idx];
            if( isset($msgids[$j]) && $msgid === $msgids[$j] ){
                return $j;
            }
            // double hash for next loop
            $idx += $incr;
            if( $idx === $hash_val ){
                // full circle
                break; 
            }
            $idx %= $this->size;
        }
        return -1;
    }



    /**
     * Parse binary table string
     * @return array offsets indexes by hashes { hash => offset, ... }
     */
    public function parse( $bin ){
        $this->bin = (string) $bin;
        $this->size = null;
        $hash_tab_size = $this->count();
        $this->map = array();
        $idx = -1;
        $byte = 0;
        while( ++$idx < $hash_tab_size ){
            $word = substr( $this->bin, $byte, 4 );
            if( "\0\0\0\0" !== $word ){
                list(,$j) = unpack('V', $word );
                $this->map[$idx] = $j - 1;
            }
            $byte += 4;
        }
        return $this->map;
    }


 
    /**
     * hashpjw function by P.J. Weinberger. (From hash-string.c)
     * http://fossies.org/dox/gettext-0.18.3.1/hash-string_8c_source.html#l00031
     */     
    public static function hashpjw( $str ){
        $i = -1;
        $hval = 0;
        $len = strlen($str);
        while( ++$i < $len ){
            $ord = ord( $str{$i} );
            $hval = ( $hval << 4 ) + $ord;
            $g = $hval & 0xf0000000; // 0xf << 32-4
            if( $g !== 0 ){
                $hval ^= $g >> 24; // 32-8
                $hval ^= $g;
            }
        }
        return $hval;
    }
    
    
    
    /**
     * Get next prime number up from seed number. (From hash.c)
     * http://fossies.org/dox/gettext-0.18.3.1/gettext-tools_2gnulib-lib_2hash_8c_source.html#l00073
     */
     private static function next_prime( $seed ){
        $seed |= 1;
        while ( ! self::is_prime($seed) ){
            $seed += 2;
        }
        return $seed;
    }    
    
    
    
    /**
     * http://icdif.com/computing/2011/09/15/check-number-prime-number/
     */
    private static function is_prime( $num ) {
        // 1 is not prime. See: http://en.wikipedia.org/wiki/Prime_number#Primality_of_one
        if ($num === 1 ){
            return false;
        }
            
        //2 is prime (the only even number that is prime)
        if( $num === 2 ){
            return true;
        }
    
        /**
         * if the number is divisible by two, then it's not prime and it's no longer
         * needed to check other even numbers
         */
        if( $num % 2 == 0 ) {
            return false;
        }
    
        /**
         * Checks the odd numbers. If any of them is a factor, then it returns false.
         * The sqrt can be an aproximation, hence just for the sake of
         * security, one rounds it to the next highest integer value.
         */
        for( $i = 3; $i <= ceil(sqrt($num)); $i = $i + 2) {
            if($num % $i == 0 ){
                return false;
            }
        }
    
        return true;
    }
    
}

 
 
/**
 * Native PHP version of msgfmt.
 * @param string|array raw PO source or parsed array
 * @param bool whether to compile a hash table
 * @return string binary MO source
 */
function loco_msgfmt( $po, $withhash = false ){
    
    if( ! is_array($po) ){
        $po = loco_parse_po( $po );
    }

    // separate headers
    $head = null;
    if( isset($po[0]) && '' === $po[0]['source'] ){
        $head = loco_parse_po_headers( $po[0]['target'] );
        $po[0] = null;
    }

    // collate as per template renderers
    $export = array();
    foreach( $po as $i => $r ){
        if( ! $r ){
            continue;
        }
        $msg = array (
            'key' => $r['source'],
            'translation' => $r['target'],
        );
        if( isset($r['parent']) ){
            unset( $parent );
            $parent = &$export[ $r['parent'] ];
            isset($parent['plurals']) or $parent['plurals'] = array();
            $parent['plurals'][] = $msg;
        }
        else {
            isset($r['context']) and $msg['context'] = $r['context'];
            $export[$i] = $msg;
        }
    }
    
    // var_dump( $export ); die();
    
    $mo = new LocoMo( $export, $head );
    if( $withhash ){
        $mo->enableHash();
    }
    return $mo->compile();
}



/**
 * @todo, move this into core?
 */
function loco_po_stats( array $po ){
    $t = $n = $f = $u = 0;
    foreach( $po as $r ){
        if( ! isset($r['source']) || '' === $r['source'] ){
            // header
            continue;
        }
        if( isset($r['parent']) && is_int($r['parent']) ){
            // plural
            continue;
        }
        // parent string
        $t++;
        if( '' === $r['target'] ){
            $u++;
        }
        else if( isset($r['flag']) && LOCO_FLAG_FUZZY === $r['flag'] ){
            $f++;
        }
        else {
            $n++;
        }
    }
    // calc percentage
    $r = $t && $n ? $n / $t : 0;
    $p = (string) round( $r * 100 );
    return compact('t','p','f','u');
}




