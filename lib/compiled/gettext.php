<?php

/**
 * Downgraded for PHP 5.6 compatibility. Do not edit.
 * @noinspection ALL
 */
interface LocoArrayInterface extends ArrayAccess, Iterator, Countable, JsonSerializable {
    public function getArrayCopy();
}

class LocoHeaders extends ArrayIterator implements LocoArrayInterface {
    private $map = [];

    public function __construct( array $raw = [] ) {
        if ( $raw ) {
            $keys      = array_keys( $raw );
            $this->map = array_combine( array_map( 'strtolower', $keys ), $keys );
            parent::__construct( $raw );
        }
    }

    public function normalize( $k ) {
        $k = strtolower( $k );

        return array_key_exists( $k, $this->map ) ? $this->map[ $k ] : null;
    }

    public function add( $key, $val ) {
        $this->offsetSet( $key, $val );

        return $this;
    }

    public function __toString() {
        $pairs = [];
        foreach ( $this as $key => $val ) {
            $pairs[] = $key . ': ' . $val;
        }

        return implode( "\n", $pairs );
    }

    public function trimmed( $prop ) {
        return trim( $this->__get( $prop ) );
    }

    public function has( $key ) {
        return array_key_exists( strtolower( $key ), $this->map );
    }

    public function __get( $key ) {
        return $this->offsetGet( $key );
    }

    public function __set( $key, $val ) {
        $this->offsetSet( $key, $val );
    }

    #[ReturnTypeWillChange]
    public function offsetExists( $key ) {
        return $this->has( $key );
    }

    #[ReturnTypeWillChange]
    public function offsetGet( $key ) {
        $k = $this->normalize( $key );
        if ( is_null( $k ) ) {
            return '';
        }

        return parent::offsetGet( $k );
    }

    #[ReturnTypeWillChange]
    public function offsetSet( $key, $value ) {
        $k = strtolower( $key );
        if ( isset( $this->map[ $k ] ) && $key !== $this->map[ $k ] ) {
            parent::offsetUnset( $this->map[ $k ] );
        }
        $this->map[ $k ] = $key;
        parent::offsetSet( $key, $value );
    }

    #[ReturnTypeWillChange]
    public function offsetUnset( $key ) {
        $k = strtolower( $key );
        if ( isset( $this->map[ $k ] ) ) {
            parent::offsetUnset( $this->map[ $k ] );
            unset( $this->map[ $k ] );
        }
    }

    #[ReturnTypeWillChange]
    public function jsonSerialize() {
        return $this->getArrayCopy();
    }
}

function loco_normalize_charset( $cs ) {
    if ( preg_match( '/^UTF-?8$/i', $cs ) ) {
        return 'UTF-8';
    }
    try {
        $aliases = @mb_encoding_aliases( $cs );
    } catch ( ValueError $e ) {
        $aliases = false;
    }
    if ( false === $aliases ) {
        throw new InvalidArgumentException( 'Unsupported character encoding: ' . $cs );
    }
    if ( preg_grep( '/^ISO[-_]\\d+[-_]\\d+$/i', $aliases ) ) {
        $cs = current( $aliases );
        $cs = strtr( strtoupper( $cs ), '_', '-' );
    } else if ( in_array( 'US-ASCII', $aliases, true ) ) {
        $cs = 'US-ASCII';
    }

    return $cs;
}

class LocoPoHeaders extends LocoHeaders {
    private $cs = null;

    public function getCharset() {
        $cs = $this->cs;
        if ( is_null( $cs ) ) {
            $cs  = '';
            $raw = $this->offsetGet( 'content-type' );
            if ( $raw && preg_match( '!\\bcharset[= ]+([-\\w]+)!', $raw, $r ) ) {
                try {
                    $cs = loco_normalize_charset( $r[1] );
                } catch ( InvalidArgumentException $e ) {
                } catch ( Exception $e ) {
                    trigger_error( $e->getMessage(), E_USER_NOTICE );
                }
            }
            $this->cs = $cs;
        }

        return $cs;
    }

    public function setCharset( $to ) {
        $to                   = loco_normalize_charset( $to );
        $from                 = $this->getCharset();
        $this->cs             = $to;
        $this['Content-Type'] = 'text/plain; charset=' . $to;
        if ( '' !== $from && $from !== $to ) {
            foreach ( $this as $key => $val ) {
                $this[ $key ] = mb_convert_encoding( $val, $to, $from );
            }
        }

        return $to;
    }

    public static function fromMsgstr( $str ) {
        $headers = new LocoPoHeaders;
        $key     = '';
        foreach ( preg_split( '/[\\r\\n]+/', $str ) as $line ) {
            $i = strpos( $line, ':' );
            if ( is_int( $i ) ) {
                $key = trim( substr( $line, 0, $i ), " \t" );
                $headers->offsetSet( $key, ltrim( substr( $line, ++ $i ), " \t" ) );
            } else if ( '' !== $key ) {
                $headers->offsetSet( $key, $headers->offsetGet( $key ) . "\n" . $line );
            }
        }
        $cs = $headers->getCharset();
        if ( '' !== $cs && 'UTF-8' !== $cs && 'UTF-8' !== mb_detect_encoding( $str, [ 'UTF-8', $cs ], true ) ) {
            foreach ( $headers as $key => $val ) {
                $headers[ $key ] = mb_convert_encoding( $val, 'UTF-8', [ $cs ] );
            }
        }

        return $headers;
    }

    public static function fromSource( $raw ) {
        $po = new LocoPoParser( $raw );
        $po->parse( 0 );

        return $po->getHeader();
    }
}

function loco_convert_utf8( $str, $enc, $strict ) {
    if ( '' === $enc || 'UTF-8' === $enc || 'US-ASCII' === $enc ) {
        if ( false === preg_match( '//u', $str ) ) {
            if ( $strict ) {
                $e = new Loco_error_ParseException( $enc ? 'Invalid ' . $enc . ' encoding' : 'Unknown character encoding' );
                if ( preg_match( '/^(?:[\\x00-\\x7F]|[\\xC0-\\xDF][\\x80-\\xBF]|[\\xE0-\\xEF][\\x80-\\xBF]{2}|[\\xF0-\\xFF][\\x80-\\xBF]{3})*/', $str, $r ) && $str !== $r[0] ) {
                    $e->setOffsetContext( strlen( $r[0] ), $str );
                }
                throw $e;
            }
            $str = loco_fix_utf8( $str );
        }
    } else if ( 'ISO-8859-1' === $enc ) {
        $str = mb_convert_encoding( $str, 'UTF-8', 'cp1252' );
    } else {
        $str = mb_convert_encoding( $str, 'UTF-8', $enc );
    }

    return $str;
}

function loco_fix_utf8( $str ) {
    $fix = '';
    while ( is_string( $str ) && '' !== $str ) {
        if ( preg_match( '/^(?:[\\x00-\\x7F]|[\\xC0-\\xDF][\\x80-\\xBF]|[\\xE0-\\xEF][\\x80-\\xBF]{2}|[\\xF0-\\xFF][\\x80-\\xBF]{3})+/', $str, $r ) ) {
            $fix .= $r[0];
            $str = substr( $str, strlen( $r[0] ) );
        } else {
            $fix .= mb_convert_encoding( $str[0], 'UTF-8', 'cp1252' );
            $str = substr( $str, 1 );
        }
    }

    return loco_convert_utf8( $fix, '', true );
}

abstract class LocoGettextParser {
    private $head = null;
    private $cs = '';

    abstract public function parse( $limit = - 1 );

    protected function setHeader( LocoPoHeaders $head ) {
        $this->head = $head;
        $cs         = $head->getCharset();
        if ( '' !== $cs ) {
            if ( '' === $this->cs ) {
                $this->setCharset( $cs );
            }
        }

        return $head;
    }

    public function getHeader() {
        return $this->head;
    }

    protected function setCharset( $cs ) {
        $this->cs = $cs;
    }

    protected function getCharset() {
        return $this->cs;
    }

    protected function str( $str ) {
        if ( '' !== $str ) {
            $str = loco_convert_utf8( $str, $this->cs, false );
        }

        return $str;
    }

    protected function initMsgKey( $key ) {
        $r     = explode( "\4", $key );
        $value = [ 'source' => array_pop( $r ), 'target' => '', ];
        if ( isset( $r[0] ) ) {
            $value['context'] = $r[0];
        }

        return $value;
    }
}

function loco_remove_bom( $s, &$c ) {
    $bom = substr( $s, 0, 2 );
    if ( "\xFF\xFE" === $bom ) {
        $c = 'UTF-16LE';

        return substr( $s, 2 );
    }
    if ( "\xFE\xFF" === $bom ) {
        $c = 'UTF-16BE';

        return substr( $s, 2 );
    }
    if ( "\xEF\xBB" === $bom && "\xBF" === $s[2] ) {
        $c = 'UTF-8';

        return substr( $s, 3 );
    }
    $c = '';

    return $s;
}

function loco_parse_reference_id( $refs, &$_id ) {
    if ( false === ( $n = strpos( $refs, 'loco:' ) ) ) {
        $_id = '';

        return $refs;
    }
    $_id  = substr( $refs, $n + 5, 24 );
    $refs = substr_replace( $refs, '', $n, 29 );

    return trim( $refs );
}

class LocoPoParser extends LocoGettextParser implements Iterator {
    private $lines = [];
    private $i;
    private $k;
    private $m;

    public function __construct( $src ) {
        if ( '' !== $src ) {
            $src = loco_remove_bom( $src, $cs );
            if ( $cs && 'UTF-8' !== $cs ) {
                $src = mb_convert_encoding( $src, 'UTF-8', $cs );
                $cs  = 'UTF-8';
            }
            if ( 'UTF-8' === $cs ) {
                $this->setCharset( 'UTF-8' );
            }
            $this->lines = preg_split( '/(\\r\\n?|\\n)/', $src );
        }
    }

    #[ReturnTypeWillChange]
    public function rewind() {
        $this->i = - 1;
        $this->k = - 1;
        $this->next();
    }

    #[ReturnTypeWillChange]
    public function valid() {
        return is_int( $this->i );
    }

    #[ReturnTypeWillChange]
    public function key() {
        return $this->k;
    }

    #[ReturnTypeWillChange]
    public function current() {
        return $this->m;
    }

    #[ReturnTypeWillChange]
    public function next() {
        $valid = false;
        $entry = [ '#' => [], 'id' => [ null ], 'str' => [ null ] ];
        $i     = $this->i;
        while ( array_key_exists( ++ $i, $this->lines ) ) {
            $line = $this->lines[ $i ];
            try {
                if ( '' === $line ) {
                    if ( $valid ) {
                        break;
                    }
                    continue;
                }
                $c = $line[0];
                if ( '#' === $c ) {
                    if ( $valid ) {
                        $i --;
                        break;
                    }
                    if ( '#' === $line ) {
                        continue;
                    }
                    $f                  = $line[1];
                    $entry['#'][ $f ][] = trim( substr( $line, 1 + strlen( $f ) ), "/ \n\r\t" );
                } else if ( preg_match( '/^msg(id(?:_plural)?|ctxt|str(?:\\[(\\d+)])?)[ \\t]*/', $line, $r ) ) {
                    if ( isset( $r[2] ) ) {
                        $key = 'str';
                        $idx = (int) $r[2];
                    } else {
                        $key = $r[1];
                        $idx = 0;
                    }
                    if ( $valid && 'str' !== $key && null !== $entry['str'][0] ) {
                        $i --;
                        break;
                    }
                    $snip = strlen( $r[0] );
                    if ( '"' !== substr( $line, $snip, 1 ) ) {
                        throw new Exception( 'Expected " to follow msg' . $key );
                    }
                    $val  = '';
                    $line = substr( $line, $snip );
                    while ( true ) {
                        if ( '"' === $line || ! substr( $line, - 1 ) === '"' ) {
                            throw new Exception( 'Unterminated msg' . $key );
                        }
                        $val .= substr( $line, 1, - 1 );
                        $j   = $i + 1;
                        if ( array_key_exists( $j, $this->lines ) && ( $line = $this->lines[ $j ] ) && '"' === $line[0] ) {
                            $i = $j;
                        } else {
                            break;
                        }
                    }
                    if ( ! $valid ) {
                        $valid = true;
                    }
                    if ( 'id_plural' === $key ) {
                        $key = 'id';
                        $idx = 1;
                    }
                    $entry[ $key ][ $idx ] = stripcslashes( $val );
                } else if ( preg_match( '/^[ \\t]+$/', $line ) ) {
                    if ( $valid ) {
                        break;
                    }
                } else if ( '"' === $c ) {
                    throw new Exception( 'String encountered without keyword' );
                } else {
                    throw new Exception( 'Junk' );
                }
            } catch ( Exception $e ) {
            }
        }
        if ( $valid ) {
            ++ $this->k;
            $this->i = $i;
            $this->m = $entry;
        } else {
            $this->i = null;
            $this->k = null;
            $this->m = null;
        }
    }

    public function parse( $limit = - 1 ) {
        $this->rewind();
        if ( ! $this->valid() ) {
            throw new Loco_error_ParseException( 'Invalid PO file' );
        }
        $entry = $this->current();
        if ( '' !== $entry['id'][0] || isset( $entry['ctxt'] ) || is_null( $entry['str'][0] ) ) {
            $head = $this->setHeader( new LocoPoHeaders );
        } else {
            $head = $this->setHeader( LocoPoHeaders::fromMsgstr( $entry['str'][0] ) );
        }
        if ( 0 === $limit ) {
            return [];
        }
        $i      = - 1;
        $assets = [];
        $lk     = $head['X-Loco-Lookup'];
        while ( $this->valid() ) {
            $entry = $this->current();
            $msgid = $entry['id'][0];
            if ( is_null( $msgid ) ) {
                $this->next();
                continue;
            }
            if ( ++ $i === $limit ) {
                return $assets;
            }
            $asset      = [
                'source'  => $this->str( $msgid ),
                'target'  => $this->str( (string) $entry['str'][0] ),
                'context' => null,
            ];
            $prev_entry = null;
            if ( isset( $entry['ctxt'] ) ) {
                $asset['context'] = $this->str( $entry['ctxt'][0] );
            }
            $cmt = $entry['#'];
            if ( isset( $cmt[' '] ) ) {
                $asset['comment'] = $this->str( implode( "\n", $cmt[' '] ) );
            }
            if ( isset( $cmt['.'] ) ) {
                $asset['notes'] = $this->str( implode( "\n", $cmt['.'] ) );
            }
            if ( isset( $cmt[':'] ) ) {
                if ( $refs = implode( ' ', $cmt[':'] ) ) {
                    $refs = $this->str( $refs );
                    if ( $refs = loco_parse_reference_id( $refs, $_id ) ) {
                        $asset['refs'] = $refs;
                    }
                    if ( $_id ) {
                        $asset['_id'] = $_id;
                    }
                }
            }
            if ( isset( $cmt[','] ) ) {
                foreach ( $cmt[','] as $flags ) {
                    foreach ( explode( ',', $flags ) as $flag ) {
                        if ( $flag = trim( $flag, " \t" ) ) {
                            if ( preg_match( '/^((?:no-)?\w+)-format/', $flag, $r ) ) {
                                $asset['format'] = $r[1];
                            } else if ( 'fuzzy' === $flag ) {
                                $asset['flag'] = 4;
                            }
                        }
                    }
                }
            }
            if ( isset( $cmt['|'] ) ) {
                $p        = new LocoPoParser( '' );
                $p->lines = $cmt['|'];
                $p->setCharset( $this->getCharset() );
                try {
                    $prev_entry = $p->parse();
                } catch ( Loco_error_ParseException $e ) {
                }
                if ( $prev_entry ) {
                    $msgid = $prev_entry[0]['source'];
                    if ( $lk && 'text' !== $lk ) {
                        $asset[ $lk ]    = $asset['source'];
                        $asset['source'] = $msgid;
                    } else if ( substr( $msgid, 0, 5 ) === 'loco:' ) {
                        $asset['_id'] = substr( $msgid, 5 );
                    } else {
                        $asset['prev'] = $prev_entry;
                        $prev_entry    = null;
                    }
                }
            }
            $assets[] = $asset;
            if ( isset( $entry['id'][1] ) ) {
                $idx  = 0;
                $pidx = count( $assets ) - 1;
                $num  = max( 2, count( $entry['str'] ) );
                while ( ++ $idx < $num ) {
                    $plural = [
                        'source' => '',
                        'target' => isset( $entry['str'][ $idx ] ) ? $this->str( $entry['str'][ $idx ] ) : '',
                        'plural' => $idx,
                        'parent' => $pidx,
                    ];
                    if ( 1 === $idx ) {
                        $plural['source'] = $this->str( $entry['id'][1] );
                        if ( is_array( $prev_entry ) && isset( $prev_entry[1] ) ) {
                            if ( $lk && 'text' !== $lk ) {
                                $plural[ $lk ]    = $plural['source'];
                                $plural['source'] = $prev_entry[1]['source'];
                            }
                        }
                    }
                    if ( isset( $asset['flag'] ) ) {
                        $plural['flag'] = $asset['flag'];
                    }
                    $assets[] = $plural;
                }
            }
            $this->next();
        }
        if ( - 1 === $i ) {
            throw new Loco_error_ParseException( 'Invalid PO file' );
        } else if ( 0 === $i && '' === $assets[0]['source'] && '' === $assets[0]['target'] ) {
            throw new Loco_error_ParseException( 'Invalid PO file' );
        }

        return $assets;
    }
}

class LocoMoParser extends LocoGettextParser {
    private $bin;
    private $be = null;
    private $n = null;
    private $o = null;
    private $t = null;
    private $v = null;

    public function __construct( $bin ) {
        $this->bin = $bin;
    }

    public function getAt( $idx ) {
        $offset = $this->targetOffset();
        $offset += ( $idx * 8 );
        $len    = $this->integerAt( $offset );
        $idx    = $this->integerAt( $offset + 4 );
        $txt    = $this->bytes( $idx, $len );
        if ( false === strpos( $txt, "\0" ) ) {
            return $txt;
        }

        return explode( "\0", $txt );
    }

    public function parse( $limit = - 1 ) {
        $i            = - 1;
        $r            = [];
        $sourceOffset = $this->sourceOffset();
        $targetOffset = $this->targetOffset();
        $soffset      = $sourceOffset;
        $toffset      = $targetOffset;
        while ( $soffset < $targetOffset ) {
            $len = $this->integerAt( $soffset );
            $idx = $this->integerAt( $soffset + 4 );
            $src = $this->bytes( $idx, $len );
            $eot = strpos( $src, "\x04" );
            if ( false === $eot ) {
                $context = null;
            } else {
                $context = $this->str( substr( $src, 0, $eot ) );
                $src     = substr( $src, $eot + 1 );
            }
            $sources = explode( "\0", $src, 2 );
            $len     = $this->integerAt( $toffset );
            $idx     = $this->integerAt( $toffset + 4 );
            $targets = explode( "\0", $this->bytes( $idx, $len ) );
            if ( - 1 === $i && '' === $sources[0] && is_null( $context ) ) {
                $this->setHeader( LocoPoHeaders::fromMsgstr( $targets[0] ) );
            }
            if ( ++ $i > $limit && - 1 !== $limit ) {
                break;
            }
            $r[ $i ] = [
                'source'  => $this->str( $sources[0] ),
                'target'  => $this->str( $targets[0] ),
                'context' => $context,
            ];
            if ( isset( $sources[1] ) ) {
                $p      = count( $r ) - 1;
                $nforms = max( 2, count( $targets ) );
                for ( $n = 1; $n < $nforms; $n ++ ) {
                    $r[ ++ $i ] = [
                        'source' => isset( $sources[ $n ] ) ? $this->str( $sources[ $n ] ) : sprintf( '%s (plural %u)', $r[ $p ]['source'], $n ),
                        'target' => isset( $targets[ $n ] ) ? $this->str( $targets[ $n ] ) : '',
                        'parent' => $p,
                        'plural' => $n,
                    ];
                }
            }
            $soffset += 8;
            $toffset += 8;
        }

        return $r;
    }

    public function isBigendian() {
        if ( is_null( $this->be ) ) {
            $str = $this->words( 0, 1 );
            if ( "\xDE\x12\x04\x95" === $str ) {
                $this->be = false;
            } else if ( "\x95\x04\x12\xDE" === $str ) {
                $this->be = true;
            } else {
                throw new Loco_error_ParseException( 'Invalid MO format' );
            }
        }

        return $this->be;
    }

    public function version() {
        if ( is_null( $this->v ) ) {
            $this->v = $this->integerWord( 1 );
        }

        return $this->v;
    }

    #[ReturnTypeWillChange]
    public function count() {
        if ( is_null( $this->n ) ) {
            $this->n = $this->integerWord( 2 );
        }

        return $this->n;
    }

    public function sourceOffset() {
        if ( is_null( $this->o ) ) {
            $this->o = $this->integerWord( 3 );
        }

        return $this->o;
    }

    public function targetOffset() {
        if ( is_null( $this->t ) ) {
            $this->t = $this->integerWord( 4 );
        }

        return $this->t;
    }

    public function getHashTable() {
        $s = $this->integerWord( 5 );
        $h = $this->integerWord( 6 );

        return $this->bytes( $h, $s * 4 );
    }

    private function bytes( $offset, $length ) {
        $s = substr( $this->bin, $offset, $length );
        if ( strlen( $s ) !== $length ) {
            throw new Loco_error_ParseException( 'Failed to read ' . $length . ' bytes at [' . $offset . ']' );
        }

        return $s;
    }

    private function words( $offset, $length ) {
        return $this->bytes( $offset * 4, $length * 4 );
    }

    private function integerWord( $offset ) {
        return $this->integerAt( $offset * 4 );
    }

    private function integerAt( $offset ) {
        $str = $this->bytes( $offset, 4 );
        $fmt = $this->isBigendian() ? 'N' : 'V';
        $arr = unpack( $fmt, $str );
        if ( ! isset( $arr[1] ) || ! is_int( $arr[1] ) ) {
            throw new Loco_error_ParseException( 'Failed to read integer at byte ' . $offset );
        }

        return $arr[1];
    }
}

class LocoJedParser extends LocoGettextParser {
    private $ld;

    public function __construct( array $struct ) {
        $this->ld = $struct;
    }

    public function parse( $limit = - 1 ) {
        $values = [];
        foreach ( $this->ld as $messages ) {
            $msgid = key( $messages );
            if ( '' === $msgid ) {
                $this->setHeader( new LocoJedHeaders( $messages[''] ) );
                unset( $messages[''] );
            } else {
                $this->setHeader( new LocoJedHeaders );
            }
            $values[] = [ 'source' => '', 'target' => $this->getHeader(), ];
            $i        = - 1;
            foreach ( $messages as $key => $list ) {
                if ( ++ $i === $limit ) {
                    break;
                }
                $value = $this->initMsgKey( $key );
                $index = count( $values );
                foreach ( $list as $j => $msgstr ) {
                    if ( ! is_string( $msgstr ) ) {
                        throw new Loco_error_ParseException( 'msgstr must be scalar' );
                    }
                    $value['target'] = $msgstr;
                    if ( 0 < $j ) {
                        $value['plural'] = $j;
                        $value['parent'] = $index;
                        $value['source'] = '';
                    }
                    $values[] = $value;
                }
            }
        }

        return $values;
    }
}

class LocoJedHeaders extends LocoPoHeaders {
    public function __construct( array $raw = [] ) {
        foreach ( [ 'Language' => 'lang', 'plural_forms' => 'Plural-Forms' ] as $canonical => $alias ) {
            if ( array_key_exists( $alias, $raw ) && ! array_key_exists( $canonical, $raw ) ) {
                $raw[ $canonical ] = $raw[ $alias ];
            }
        }
        parent::__construct( $raw );
    }
}

class LocoMoPhpParser extends LocoGettextParser {
    private $msgs;

    public function __construct( array $struct ) {
        $this->msgs = $struct['messages'];
        unset( $struct['messages'] );
        $this->setHeader( new LocoPoHeaders( $struct ) );
    }

    public function parse( $limit = - 1 ) {
        $values = [ [ 'source' => '', 'target' => $this->getHeader(), ] ];
        $i      = - 1;
        foreach ( $this->msgs as $key => $bin ) {
            if ( ++ $i === $limit ) {
                break;
            }
            $value = $this->initMsgKey( $key );
            $index = count( $values );
            foreach ( explode( "\0", $bin ) as $i => $msgstr ) {
                $value['target'] = $msgstr;
                if ( 0 < $i ) {
                    $value['plural'] = $i;
                    $value['parent'] = $index;
                    $value['source'] = '';
                }
                $values[] = $value;
            }
        }

        return $values;
    }
}

abstract class LocoPo {
    public static function pair( $key, $text, $width = 79, $eol = "\n", $esc = '\\n' ) {
        if ( '' === $text ) {
            return $key . ' ""';
        }
        $text = addcslashes( $text, "\t\x0B\x0C\x07\x08\\\"" );
        if ( $esc ) {
            $text = preg_replace( '/\\r\\n?|\\n/', $esc . $eol, $text, - 1, $nbr );
        } else {
            $eol  = "\n";
            $text = preg_replace_callback( '/\\r\\n?|\\n/', [ __CLASS__, 'replace_br' ], $text, - 1, $nbr );
        }
        if ( $nbr ) {
        } else if ( $width && $width < mb_strlen( $text, 'UTF-8' ) + strlen( $key ) + 3 ) {
        } else {
            return $key . ' "' . $text . '"';
        }
        $lines = [ $key . ' "' ];
        if ( $width ) {
            $width -= 2;
            $a     = '/^.{0,' . ( $width - 1 ) . '}[-– .,:;?!)\\]}>]/u';
            $b     = '/^[^-– .,:;?!)\\]}>]+/u';
            foreach ( explode( $eol, $text ) as $unwrapped ) {
                $length = mb_strlen( $unwrapped, 'UTF-8' );
                while ( $length > $width ) {
                    if ( preg_match( $a, $unwrapped, $r ) ) {
                        $line = $r[0];
                    } else if ( preg_match( $b, $unwrapped, $r ) ) {
                        $line = $r[0];
                    } else {
                        throw new Exception( 'Wrapping error' );
                    }
                    $lines[]   = $line;
                    $trunc     = mb_strlen( $line, 'UTF-8' );
                    $length    -= $trunc;
                    $unwrapped = (string) substr( $unwrapped, strlen( $line ) );
                    if ( ( '' === $unwrapped && 0 !== $length ) || ( 0 === $length && '' !== $unwrapped ) ) {
                        throw new Exception( 'Truncation error' );
                    }
                }
                if ( 0 !== $length ) {
                    $lines[] = $unwrapped;
                }
            }
        } else {
            foreach ( explode( $eol, $text ) as $unwrapped ) {
                $lines[] = $unwrapped;
            }
        }

        return implode( '"' . $eol . '"', $lines ) . '"';
    }

    private static function replace_br( array $r ) {
        return addcslashes( $r[0], "\r\n" ) . "\n";
    }

    public static function refs( $text, $width = 76, $eol = "\n" ) {
        $text = preg_replace( '/\\s+/u', ' ', $text );
        if ( $width ) {
            $text = wordwrap( $text, $width, $eol . '#: ' );
        }

        return '#: ' . $text;
    }

    public static function prefix( $text, $prefix, $eol = "\n" ) {
        return $prefix . implode( $eol . $prefix, self::split( $text ) );
    }

    public static function split( $text ) {
        $lines = preg_split( '/\\R/u', $text );
        if ( false === $lines ) {
            if ( false === preg_match( '//u', $text ) ) {
                $text = mb_convert_encoding( $text, 'UTF-8', 'cp1252' );
            }
            $lines = preg_split( '/\\r?\\n+/', $text );
        }

        return $lines;
    }

    public static function trim( $text ) {
        $lines    = [];
        $deferred = null;
        foreach ( explode( "\n", $text ) as $line ) {
            if ( '' === $line ) {
                continue;
            }
            if ( preg_match( '/^msg[a-z]+(?:\\[\\d+])? ""/', $line ) ) {
                $deferred = $line;
                continue;
            }
            if ( $deferred && '"' === $line[0] ) {
                $lines[]  = $deferred;
                $deferred = null;
            }
            $lines[] = $line;
        }

        return implode( "\n", $lines );
    }
}

class LocoPoIndex extends ArrayIterator {
    public function compare( LocoPoMessage $a, LocoPoMessage $b ) {
        $h = $a->getHash();
        if ( ! isset( $this[ $h ] ) ) {
            return 1;
        }
        $j = $b->getHash();
        if ( ! isset( $this[ $j ] ) ) {
            return - 1;
        }

        return $this[ $h ] > $this[ $j ] ? 1 : - 1;
    }
}

class LocoPoMessage extends ArrayObject {
    public function __construct( array $r ) {
        $r['key'] = $r['source'];
        parent::__construct( $r );
    }

    public function __get( $prop ) {
        return $this->offsetExists( $prop ) ? $this->offsetGet( $prop ) : null;
    }

    public function isFuzzy() {
        return 4 === $this->__get( 'flag' );
    }

    public function getFormat() {
        $f = $this->__get( 'format' );
        if ( is_string( $f ) && '' !== $f ) {
            return $f;
        }

        return '';
    }

    private function getPoFlags() {
        $flags = [];
        foreach ( array_merge( [ $this ], $this->__get( 'plurals' ) ?: [] ) as $form ) {
            if ( $form->isFuzzy() ) {
                $flags[0] = 'fuzzy';
            }
            $f = $form->getFormat();
            if ( '' !== $f ) {
                $flags[1] = $f . '-format';
            }
        }

        return array_values( $flags );
    }

    public function getHash() {
        $hash = $this->getKey();
        if ( $this->offsetExists( 'plurals' ) ) {
            foreach ( $this->offsetGet( 'plurals' ) as $p ) {
                $hash .= "\0" . $p->getHash();
                break;
            }
        }

        return $hash;
    }

    public function getKey() {
        $msgid   = (string) $this['source'];
        $msgctxt = (string) $this->__get( 'context' );
        if ( '' !== $msgctxt ) {
            if ( '' === $msgid ) {
                $msgid = '(' . $msgctxt . ')';
            }
            $msgid = $msgctxt . "\4" . $msgid;
        }

        return $msgid;
    }

    public function exportSerial( $f = 'target' ) {
        $a = [ $this[ $f ] ];
        if ( $this->offsetExists( 'plurals' ) ) {
            $plurals = $this->offsetGet( 'plurals' );
            if ( is_array( $plurals ) ) {
                foreach ( $plurals as $p ) {
                    $a[] = $p[ $f ];
                }
            }
        }

        return $a;
    }

    public function __toString() {
        return $this->render( 79, 76 );
    }

    public function render( $width, $ref_width, $max_forms = 0 ) {
        $s = [];
        try {
            if ( $text = $this->__get( 'comment' ) ) {
                $s[] = LocoPo::prefix( $text, '# ' );
            }
            if ( $text = $this->__get( 'notes' ) ) {
                $s[] = LocoPo::prefix( $text, '#. ' );
            }
            if ( $text = $this->__get( 'refs' ) ) {
                $s[] = LocoPo::refs( $text, $ref_width );
            }
            if ( $texts = $this->getPoFlags() ) {
                $s[] = '#, ' . implode( ', ', $texts );
            }
            $prev = $this->__get( 'prev' );
            if ( is_array( $prev ) && $prev ) {
                foreach ( new LocoPoIterator( $prev ) as $p ) {
                    $text = $p->render( max( 0, $width - 3 ), 0 );
                    $s[]  = LocoPo::prefix( LocoPo::trim( $text ), '#| ' );
                    break;
                }
            }
            $text = $this->__get( 'context' );
            if ( is_string( $text ) && '' !== $text ) {
                $s[] = LocoPo::pair( 'msgctxt', $text, $width );
            }
            $s[]     = LocoPo::pair( 'msgid', $this['source'], $width );
            $target  = $this['target'];
            $plurals = $this->__get( 'plurals' );
            if ( is_array( $plurals ) ) {
                if ( array_key_exists( 0, $plurals ) ) {
                    $p   = $plurals[0];
                    $s[] = LocoPo::pair( 'msgid_plural', $p['source'], $width );
                    $s[] = LocoPo::pair( 'msgstr[0]', $target, $width );
                    $i   = 0;
                    while ( array_key_exists( $i, $plurals ) ) {
                        $p = $plurals[ $i ];
                        if ( ++ $i === $max_forms ) {
                            break;
                        }
                        $s[] = LocoPo::pair( 'msgstr[' . $i . ']', $p['target'], $width );
                    }
                } else if ( isset( $this['plural_key'] ) ) {
                    $s[] = LocoPo::pair( 'msgid_plural', $this['plural_key'], $width );
                    $s[] = LocoPo::pair( 'msgstr[0]', $target, $width );
                } else {
                    trigger_error( 'Missing plural_key in zero plural export' );
                    $s[] = LocoPo::pair( 'msgstr', $target, $width );
                }
            } else {
                $s[] = LocoPo::pair( 'msgstr', $target, $width );
            }
        } catch ( Exception $e ) {
            trigger_error( $e->getMessage(), E_USER_WARNING );
        }

        return implode( "\n", $s ) . "\n";
    }

    public function merge( LocoPoMessage $def, $translate = false ) {
        if ( $def->getHash() !== $this->getHash() ) {
            $prev         = [ 'source' => '', 'target' => '' ];
            $prev         = $this->diff( 'source', $def, $prev );
            $prev         = $this->diff( 'context', $def, $prev );
            $this['flag'] = 4;
            $this['prev'] = [ $prev ];
            $defPlural    = $def->getPlural( 0 );
            $ourPlural    = $this->getPlural( 0 );
            if ( $defPlural && $ourPlural ) {
                $ourPlural->merge( $defPlural );
                if ( $ourPlural->offsetExists( 'prev' ) ) {
                    $this['prev'][] = $ourPlural->prev[0] + [ 'parent' => 0, 'plural' => 1 ];
                    $ourPlural->offsetUnset( 'prev' );
                }
            } else if ( $defPlural ) {
                $this['plurals'] = [ clone $defPlural ];
            } else if ( $ourPlural ) {
                $this['prev'][] = $ourPlural->exportBasic() + [ 'parent' => 0, 'plural' => 1 ];
                $this->offsetUnset( 'plurals' );
            }
        }
        foreach ( [ 'notes', 'refs', 'format' ] as $f ) {
            if ( $def->offsetExists( $f ) ) {
                $this->offsetSet( $f, $def->offsetGet( $f ) );
            } else if ( $this->offsetExists( $f ) ) {
                $this->offsetUnset( $f );
            }
        }
        if ( $translate && '' === $this['target'] && '' !== $def['target'] ) {
            $this['target'] = $def['target'];
            if ( $def->offsetExists( 'comment' ) ) {
                $this['comment'] = $def['comment'];
            }
            if ( $this->offsetExists( 'plurals' ) ) {
                foreach ( $this['plurals'] as $i => $ourPlural ) {
                    if ( '' === $ourPlural['target'] ) {
                        $defPlural = $def->getPlural( $i );
                        if ( $defPlural ) {
                            $ourPlural['target'] = $defPlural['target'];
                        }
                    }
                }
            }
        }
    }

    private function diff( $key, LocoPoMessage $def, array $prev ) {
        $old = $this->__get( $key );
        $new = $def->__get( $key );
        if ( $new !== $old ) {
            $this->offsetSet( $key, $new );
            if ( is_string( $old ) && '' !== $old ) {
                $prev[ $key ] = $old;
            }
        }

        return $prev;
    }

    private function getPlural( $i ) {
        if ( $this->offsetExists( 'plurals' ) ) {
            $plurals = $this->offsetGet( 'plurals' );
            if ( is_array( $plurals ) && array_key_exists( $i, $plurals ) ) {
                return $plurals[ $i ];
            }
        }

        return null;
    }

    private function exportBasic() {
        return [ 'source' => $this['source'], 'context' => $this->context, 'target' => '', ];
    }

    public function export() {
        $a = $this->getArrayCopy();
        unset( $a['key'] );
        if ( array_key_exists( 'plurals', $a ) ) {
            foreach ( $a['plurals'] as $i => $p ) {
                if ( $p instanceof ArrayObject ) {
                    $a['plurals'][ $i ] = $p->getArrayCopy();
                }
            }
        }

        return $a;
    }

    public function strip() {
        $this['target'] = '';
        $plurals        = $this->plurals;
        if ( is_array( $plurals ) ) {
            foreach ( $plurals as $p ) {
                $p->strip();
            }
        }

        return $this;
    }

    public function translated() {
        $n = 0;
        if ( '' !== (string) $this['target'] ) {
            $n ++;
        }
        if ( $this->offsetExists( 'plurals' ) ) {
            foreach ( $this->offsetGet( 'plurals' ) as $plural ) {
                if ( '' !== (string) $plural['target'] ) {
                    $n ++;
                }
            }
        }

        return $n;
    }
}

class LocoPoIterator implements Iterator, Countable {
    private $po;
    private $headers = null;
    private $i;
    private $t;
    private $j;
    private $z = 0;
    private $w = 79;

    public function __construct( $po ) {
        if ( is_array( $po ) ) {
            $this->po = $po;
        } else if ( $po instanceof Traversable ) {
            $this->po = iterator_to_array( $po, false );
        } else {
            throw new InvalidArgumentException( 'PO data must be array or iterator' );
        }
        $this->t = count( $this->po );
        if ( 0 === $this->t ) {
            throw new InvalidArgumentException( 'Empty PO data' );
        }
        $h = $po[0];
        if ( '' !== $h['source'] || ( isset( $h['context'] ) && '' !== $h['context'] ) || ( isset( $po[1]['parent'] ) && 0 === $po[1]['parent'] ) ) {
            $this->z = - 1;
        }
    }

    public function push( LocoPoMessage $p ) {
        $raw     = $p->export();
        $plurals = $p->plurals;
        unset( $raw['plurals'] );
        $i              = count( $this->po );
        $this->po[ $i ] = $raw;
        $this->t ++;
        if ( is_array( $plurals ) ) {
            $j = 0;
            foreach ( $plurals as $p ) {
                $raw           = $p->export();
                $raw['parent'] = $i;
                $raw['plural'] = ++ $j;
                $this->po[]    = $raw;
                $this->t ++;
            }
        }
    }

    public function concat( LocoPoIterator $more ) {
        foreach ( $more as $message ) {
            $this->push( $message );
        }

        return $this;
    }

    public function __clone() {
        if ( $this->headers ) {
            $this->headers = new LocoPoHeaders( $this->headers->getArrayCopy() );
        }
    }

    #[ReturnTypeWillChange]
    public function count() {
        return $this->t - ( $this->z + 1 );
    }

    public function wrap( $width ) {
        if ( $width > 0 ) {
            $this->w = max( 15, $width );
        } else {
            $this->w = 0;
        }

        return $this;
    }

    #[ReturnTypeWillChange]
    public function rewind() {
        $this->i = $this->z;
        $this->j = - 1;
        $this->next();
    }

    #[ReturnTypeWillChange]
    public function key() {
        return $this->j;
    }

    #[ReturnTypeWillChange]
    public function valid() {
        return is_int( $this->i );
    }

    #[ReturnTypeWillChange]
    public function next() {
        $i = $this->i;
        while ( ++ $i < $this->t ) {
            if ( array_key_exists( 'parent', $this->po[ $i ] ) ) {
                continue;
            }
            $this->j ++;
            $this->i = $i;

            return;
        }
        $this->i = null;
        $this->j = null;
    }

    #[ReturnTypeWillChange]
    public function current() {
        return $this->item( $this->i );
    }

    private function item( $i ) {
        $po      = $this->po;
        $parent  = new LocoPoMessage( $po[ $i ] );
        $plurals = [];
        $nonseq  = $parent->offsetExists( 'child' );
        $j       = $nonseq ? $parent['child'] : $i + 1;
        while ( isset( $po[ $j ]['parent'] ) && $i === $po[ $j ]['parent'] ) {
            $plurals[] = new LocoPoMessage( $po[ $j ++ ] );
        }
        if ( $plurals ) {
            $parent['plurals'] = $plurals;
        }

        return $parent;
    }

    public function exportEntry( $i ) {
        return $this->item( $i + ( 1 - $this->z ) );
    }

    public function getArrayCopy() {
        $po = $this->po;
        if ( 0 === $this->z ) {
            $po[0]['target'] = (string) $this->getHeaders();
        }

        return $po;
    }

    public function clear() {
        if ( 0 === $this->z ) {
            $this->po = [ $this->po[0] ];
            $this->t  = 1;
        } else {
            $this->po = [];
            $this->t  = 0;
        }
    }

    public function getHeaders() {
        if ( is_null( $this->headers ) ) {
            $header = $this->po[0];
            if ( 0 === $this->z ) {
                $value = $header['target'];
                if ( is_string( $value ) ) {
                    $this->headers = LocoPoHeaders::fromMsgstr( $value );
                } else if ( $value instanceof LocoPoHeaders ) {
                    $this->headers = $value;
                } else if ( is_array( $value ) ) {
                    $this->headers = new LocoPoHeaders( $value );
                }
            } else {
                $this->headers = new LocoPoHeaders;
            }
        }

        return $this->headers;
    }

    public function setHeaders( LocoPoHeaders $head ) {
        $this->headers = $head;
        if ( 0 === $this->z ) {
            $this->po[0]['target'] = null;
        }

        return $this;
    }

    public function initPo() {
        if ( 0 === $this->z ) {
            unset( $this->po[0]['flag'] );
        }

        return $this;
    }

    public function initPot() {
        if ( 0 === $this->z ) {
            $this->po[0]['flag'] = 4;
        }

        return $this;
    }

    public function strip() {
        $po = $this->po;
        $i  = count( $po );
        $z  = $this->z;
        while ( -- $i > $z ) {
            $po[ $i ]['target'] = '';
        }
        $this->po = $po;

        return $this;
    }

    public function __toString() {
        try {
            return $this->render();
        } catch ( Exception $e ) {
            trigger_error( $e->getMessage(), E_USER_WARNING );

            return '';
        }
    }

    public function render( callable $sorter = null ) {
        $width     = $this->w;
        $ref_width = max( 0, $width - 3 );
        $h         = $this->exportHeader();
        $msg       = new LocoPoMessage( $h );
        $s         = $msg->render( $width, $ref_width );
        if ( $sorter ) {
            $msgs = [];
            foreach ( $this as $msg ) {
                $msgs[] = $msg;
            }
            usort( $msgs, $sorter );
        } else {
            $msgs = $this;
        }
        $h = $this->getHeaders()->offsetGet( 'Plural-Forms' );
        if ( is_string( $h ) && preg_match( '/nplurals\\s*=\\s*(\\d)/', $h, $r ) ) {
            $max_pl = (int) $r[1];
        } else {
            $max_pl = 0;
        }
        foreach ( $msgs as $msg ) {
            $s .= "\n" . $msg->render( $width, $ref_width, $max_pl );
        }

        return $s;
    }

    public function exportJed() {
        $head = $this->getHeaders();
        $a    = [
            '' => [
                'domain'       => $head['domain'],
                'lang'         => $head['language'],
                'plural-forms' => $head['plural-forms'],
            ]
        ];
        foreach ( $this as $message ) {
            if ( $message->translated() ) {
                $a[ $message->getKey() ] = $message->exportSerial();
            }
        }

        return $a;
    }

    private function exportHeader() {
        if ( 0 === $this->z ) {
            $h = $this->po[0];
        } else {
            $h = [ 'source' => '', 'target' => '' ];
        }
        if ( $this->headers ) {
            $h['target'] = (string) $this->headers;
        }

        return $h;
    }

    public function exportRefs( $grep = '' ) {
        $a = [];
        if ( '' === $grep ) {
            $grep = '/(\\S+):\\d+/';
        } else {
            $grep = '/(\\S*' . $grep . '):\\d+/';
        }
        $self = get_class( $this );
        $base = [ $this->exportHeader() ];
        foreach ( $this as $message ) {
            if ( preg_match_all( $grep, (string) $message->refs, $r ) ) {
                foreach ( $r[1] as $ref ) {
                    if ( array_key_exists( $ref, $a ) ) {
                        $po = $a[ $ref ];
                    } else {
                        $po        = new $self( $base );
                        $a[ $ref ] = $po;
                    }
                    $po->push( $message );
                }
            }
        }

        return $a;
    }

    public function splitRefs( array $map = null ) {
        $a    = [];
        $self = get_class( $this );
        $base = [ $this->exportHeader() ];
        if ( is_array( $map ) ) {
            $grep = implode( '|', array_keys( $map ) );
        } else {
            $grep = '[a-z]+';
        }
        foreach ( $this as $message ) {
            $refs = ltrim( (string) $message->refs );
            if ( '' !== $refs ) {
                if ( preg_match_all( '/\\S+\\.(' . $grep . '):\\d+/', $refs, $r, PREG_SET_ORDER ) ) {
                    $tmp = [];
                    foreach ( $r as $rr ) {
                        list( $ref, $ext ) = $rr;
                        $tmp[ $ext ][ $ref ] = true;
                    }
                    foreach ( $tmp as $ext => $refs ) {
                        if ( is_array( $map ) ) {
                            $ext = $map[ $ext ];
                        }
                        if ( array_key_exists( $ext, $a ) ) {
                            $po = $a[ $ext ];
                        } else {
                            $po        = new $self( $base );
                            $a[ $ext ] = $po;
                        }
                        $message         = clone $message;
                        $message['refs'] = implode( ' ', array_keys( $refs ) );
                        $po->push( $message );
                    }
                }
            }
        }

        return $a;
    }

    public function getHashes() {
        $a = [];
        foreach ( $this as $msg ) {
            $a[] = $msg->getHash();
        }
        sort( $a, SORT_STRING );

        return $a;
    }

    public function equalSource( LocoPoIterator $that ) {
        $a = $this->getHashes();
        $b = $that->getHashes();
        if ( count( $a ) !== count( $b ) ) {
            return false;
        }
        foreach ( $a as $i => $hash ) {
            if ( $hash !== $b[ $i ] ) {
                return false;
            }
        }

        return true;
    }

    public function equal( LocoPoIterator $that ) {
        if ( $this->t !== $that->t ) {
            return false;
        }
        $i      = $this->z;
        $fields = [ 'source', 'context', 'notes', 'refs', 'target', 'comment', 'flag', 'parent', 'plural' ];
        while ( ++ $i < $this->t ) {
            $a = $this->po[ $i ];
            $b = $that->po[ $i ];
            foreach ( $fields as $f ) {
                $af = isset( $a[ $f ] ) ? $a[ $f ] : '';
                $bf = isset( $b[ $f ] ) ? $b[ $f ] : '';
                if ( $af !== $bf ) {
                    return false;
                }
            }
        }

        return true;
    }

    public function sort( callable $func = null ) {
        $order = [];
        foreach ( $this as $msg ) {
            $order[] = $msg;
        }
        usort( $order, $func ?: [ __CLASS__, 'compare' ] );
        $this->clear();
        foreach ( $order as $p ) {
            $this->push( $p );
        }

        return $this;
    }

    public static function compare( LocoPoMessage $a, LocoPoMessage $b ) {
        $h = $a->getHash();
        $j = $b->getHash();
        $n = strcasecmp( $h, $j );
        if ( 0 === $n ) {
            $n = strcmp( $h, $j );
            if ( 0 === $n ) {
                return 0;
            }
        }

        return $n > 0 ? 1 : - 1;
    }

    public function createSorter() {
        $index = [];
        foreach ( $this as $i => $msg ) {
            $index[ $msg->getHash() ] = $i;
        }
        $obj = new LocoPoIndex( $index );

        return [ $obj, 'compare' ];
    }
}

class LocoMoTable {
    private $size = 0;
    private $bin = '';
    private $map = null;

    public function __construct( $data = '' ) {
        if ( is_array( $data ) ) {
            $this->compile( $data );
        } else if ( '' !== $data ) {
            $this->parse( $data );
        }
    }

    #[ReturnTypeWillChange]
    public function count() {
        if ( is_null( $this->size ) ) {
            if ( $this->bin ) {
                $this->size = (int) ( strlen( $this->bin ) / 4 );
            } else if ( is_array( $this->map ) ) {
                $this->size = count( $this->map );
            } else {
                return 0;
            }
            if ( ! self::is_prime( $this->size ) || $this->size < 3 ) {
                throw new Exception( 'Size expected to be prime number above 2, got ' . $this->size );
            }
        }

        return $this->size;
    }

    public function bytes() {
        return $this->count() * 4;
    }

    public function __toString() {
        return $this->bin;
    }

    public function export() {
        if ( is_null( $this->map ) ) {
            $this->parse( $this->bin );
        }

        return $this->map;
    }

    private function reset( $length ) {
        $this->size = max( 3, self::next_prime( $length * 4 / 3 ) );
        $this->bin  = '';
        $this->map  = [];

        return $this->size;
    }

    public function compile( array $msgids ) {
        $hash_tab_size = $this->reset( count( $msgids ) );
        $packed        = array_fill( 0, $hash_tab_size, "\0\0\0\0" );
        $j             = 0;
        foreach ( $msgids as $msgid ) {
            $hash_val = self::hashpjw( $msgid );
            $idx      = $hash_val % $hash_tab_size;
            if ( array_key_exists( $idx, $this->map ) ) {
                $incr = 1 + ( $hash_val % ( $hash_tab_size - 2 ) );
                do {
                    $idx += $incr;
                    if ( $hash_val === $idx ) {
                        throw new Exception( 'Unable to find empty slot in hash table' );
                    }
                    $idx %= $hash_tab_size;
                } while ( array_key_exists( $idx, $this->map ) );
            }
            $this->map[ $idx ] = $j;
            $packed[ $idx ]    = pack( 'V', ++ $j );
        }
        $this->bin = implode( '', $packed );
    }

    public function lookup( $msgid, array $msgids ) {
        $hash_val = self::hashpjw( $msgid );
        $idx      = $hash_val % $this->size;
        $incr     = 1 + ( $hash_val % ( $this->size - 2 ) );
        while ( true ) {
            if ( ! array_key_exists( $idx, $this->map ) ) {
                break;
            }
            $j = $this->map[ $idx ];
            if ( isset( $msgids[ $j ] ) && $msgid === $msgids[ $j ] ) {
                return $j;
            }
            $idx += $incr;
            if ( $idx === $hash_val ) {
                break;
            }
            $idx %= $this->size;
        }

        return - 1;
    }

    private function parse( $bin ) {
        $this->bin     = $bin;
        $this->size    = null;
        $hash_tab_size = $this->count();
        $this->map     = [];
        $idx           = - 1;
        $byte          = 0;
        while ( ++ $idx < $hash_tab_size ) {
            $word = substr( $this->bin, $byte, 4 );
            if ( "\0\0\0\0" !== $word ) {
                list( , $j ) = unpack( 'V', $word );
                $this->map[ $idx ] = $j - 1;
            }
            $byte += 4;
        }
    }

    public static function hashpjw( $str ) {
        $i    = - 1;
        $hval = 0;
        $len  = strlen( $str );
        while ( ++ $i < $len ) {
            $ord  = ord( substr( $str, $i, 1 ) );
            $hval = ( $hval << 4 ) + $ord;
            $g    = $hval & 0xf0000000;
            if ( $g !== 0 ) {
                $hval ^= $g >> 24;
                $hval ^= $g;
            }
        }

        return $hval;
    }

    private static function next_prime( $seed ) {
        $seed = (int) floor( $seed );
        $seed |= 1;
        while ( ! self::is_prime( $seed ) ) {
            $seed += 2;
        }

        return $seed;
    }

    private static function is_prime( $num ) {
        if ( 1 === $num ) {
            return false;
        }
        if ( 2 === $num ) {
            return true;
        }
        if ( $num % 2 == 0 ) {
            return false;
        }
        for ( $i = 3; $i <= ceil( sqrt( $num ) ); $i = $i + 2 ) {
            if ( $num % $i == 0 ) {
                return false;
            }
        }

        return true;
    }
}

class LocoMo {
    private $bin;
    private $msgs;
    private $head;
    private $hash = null;
    private $use_fuzzy = false;
    private $cs = null;

    public function __construct( Iterator $export, LocoPoHeaders $head = null ) {
        if ( $head ) {
            $this->head = $head;
        } else {
            $this->head = new LocoPoHeaders;
            $this->setHeader( 'Project-Id-Version', 'Loco' );
        }
        $this->msgs = $export;
        $this->bin  = '';
    }

    public function setCharset( $cs ) {
        $cs       = $this->head->setCharset( $cs );
        $this->cs = 'UTF-8' === $cs ? null : $cs;
    }

    public function enableHash() {
        $this->hash = new LocoMoTable;
    }

    public function useFuzzy() {
        $this->use_fuzzy = true;
    }

    public function setHeader( $key, $val ) {
        $this->head->add( $key, $val );

        return $this;
    }

    private function str( $s ) {
        if ( $cs = $this->cs ) {
            $s = mb_convert_encoding( $s, $cs, [ 'UTF-8' ] );
        }

        return $s;
    }

    public function compile() {
        $table      = [ '' ];
        $sources    = [ '' ];
        $targets    = [ (string) $this->head ];
        $fuzzy_flag = 4;
        $skip_fuzzy = ! $this->use_fuzzy;
        if ( $this->head->has( 'Plural-Forms' ) && preg_match( '/^nplurals=(\\d)/', $this->head->trimmed( 'Plural-Forms' ), $r ) ) {
            $nplurals  = (int) $r[1];
            $maxplural = max( 0, $nplurals - 1 );
        } else {
            $maxplural = 1;
        }
        foreach ( $this->msgs as $r ) {
            if ( $skip_fuzzy && isset( $r['flag'] ) && $fuzzy_flag === $r['flag'] ) {
                continue;
            }
            $msgid = $this->str( $r['key'] );
            if ( isset( $r['context'] ) ) {
                $msgctxt = $this->str( $r['context'] );
                if ( '' !== $msgctxt ) {
                    if ( '' === $msgid ) {
                        $msgid = '(' . $msgctxt . ')';
                    }
                    $msgid = $msgctxt . "\x04" . $msgid;
                }
            }
            if ( '' === $msgid ) {
                continue;
            }
            $msgstr = $this->str( $r['target'] );
            if ( '' === $msgstr ) {
                continue;
            }
            $table[] = $msgid;
            if ( isset( $r['plurals'] ) ) {
                if ( $r['plurals'] ) {
                    $i = 0;
                    foreach ( $r['plurals'] as $i => $p ) {
                        if ( $i === 0 ) {
                            $msgid .= "\0" . $this->str( $p['key'] );
                        }
                        $msgstr .= "\0" . $this->str( $p['target'] );
                    }
                    while ( $maxplural > ++ $i ) {
                        $msgstr .= "\0";
                    }
                } else if ( isset( $r['plural_key'] ) ) {
                    $msgid .= "\0" . $this->str( $r['plural_key'] );
                }
            }
            $sources[] = $msgid;
            $targets[] = $msgstr;
        }
        asort( $sources, SORT_STRING );
        $this->bin = "\xDE\x12\x04\x95\x00\x00\x00\x00";
        $n         = count( $sources );
        $this->writeInteger( $n );
        $offset = 28;
        $this->writeInteger( $offset );
        $offset += $n * 8;
        $this->writeInteger( $offset );
        if ( $this->hash ) {
            sort( $table, SORT_STRING );
            $this->hash->compile( $table );
            $s = $this->hash->count();
        } else {
            $s = 0;
        }
        $this->writeInteger( $s );
        $offset += $n * 8;
        $this->writeInteger( $offset );
        if ( $s ) {
            $offset += $s * 4;
        }
        $source = '';
        foreach ( $sources as $str ) {
            $source .= $str . "\0";
            $this->writeInteger( $strlen = strlen( $str ) );
            $this->writeInteger( $offset );
            $offset += $strlen + 1;
        }
        $target = '';
        foreach ( array_keys( $sources ) as $i ) {
            $str    = $targets[ $i ];
            $target .= $str . "\0";
            $this->writeInteger( $strlen = strlen( $str ) );
            $this->writeInteger( $offset );
            $offset += $strlen + 1;
        }
        if ( $this->hash ) {
            $this->bin .= $this->hash->__toString();
        }
        $this->bin .= $source;
        $this->bin .= $target;

        return $this->bin;
    }

    private function writeInteger( $num ) {
        $this->bin .= pack( 'V', $num );
    }
}

interface LocoTokensInterface extends Iterator {
    public function advance();

    public function ignore( ...$symbols );
}

class LocoTokenizer implements LocoTokensInterface {
    const T_LITERAL = 0;
    const T_UNKNOWN = - 1;
    private $src;
    private $pos;
    private $line;
    private $col;
    private $max;
    private $rules = [];
    private $skip = [];
    private $tok;
    private $len;

    public function __construct( $src = '' ) {
        $this->init( $src );
    }

    public function parse( $src ) {
        return iterator_to_array( $this->generate( $src ) );
    }

    public function generate( $src ) {
        $this->init( $src );
        while ( $this->valid() ) {
            yield $this->current();
            $this->next();
        }
    }

    public function init( $src ) {
        $this->src = $src;
        $this->rewind();

        return $this;
    }

    public function define( $grep, $t = 0 ) {
        if ( '^' !== $grep[1] ) {
            throw new InvalidArgumentException( 'Expression ' . $grep . ' isn\'t anchored' );
        }
        if ( ! is_int( $t ) && ! is_callable( $t ) ) {
            throw new InvalidArgumentException( 'Non-integer token must be valid callback' );
        }
        $sniff = $grep[2];
        if ( $sniff === preg_quote( $sniff, $grep[0] ) ) {
            $this->rules[ $sniff ][] = [ $grep, $t ];
        } else {
            $this->rules[''][] = [ $grep, $t ];
        }

        return $this;
    }

    public function ignore( ...$symbols ) {
        $this->skip += array_fill_keys( $symbols, true );

        return $this;
    }

    #[ReturnTypeWillChange]
    public function current() {
        return $this->tok;
    }

    public function advance() {
        $tok = $this->current();
        $this->next();

        return $tok;
    }

    #[ReturnTypeWillChange]
    public function next() {
        $tok    = null;
        $offset = $this->pos;
        $column = $this->col;
        $line   = $this->line;
        while ( $offset <= $this->max ) {
            $t    = null;
            $s    = '';
            $text = substr( $this->src, $offset );
            foreach ( [ $text[0], '' ] as $k ) {
                if ( isset( $this->rules[ $k ] ) ) {
                    foreach ( $this->rules[ $k ] as $rule ) {
                        if ( preg_match( $rule[0], $text, $match ) ) {
                            $s = $match[0];
                            $t = $rule[1];
                            if ( ! is_int( $t ) ) {
                                $t = call_user_func( $t, $s, $match );
                            }
                            break 2;
                        }
                    }
                }
            }
            if ( is_null( $t ) ) {
                $n = preg_match( '/^./u', $text, $match );
                if ( false === $n ) {
                    $s     = $text[0];
                    $match = [ mb_convert_encoding( $s, 'UTF-8', 'cp1252' ) ];
                }
                $s = (string) $match[0];
                $t = self::T_UNKNOWN;
            }
            $length = strlen( $s );
            if ( 0 === $length ) {
                throw new Loco_error_ParseException( 'Failed to match anything' );
            }
            $offset += $length;
            $lines  = preg_split( '/\\r?\\n/', $s );
            $nlines = count( $lines );
            if ( $nlines > 1 ) {
                $next_line   = $line + ( $nlines - 1 );
                $next_column = strlen( end( $lines ) );
            } else {
                $next_line   = $line;
                $next_column = $column + $length;
            }
            if ( array_key_exists( $t, $this->skip ) ) {
                $line   = $next_line;
                $column = $next_column;
                continue;
            }
            $tok    = self::T_LITERAL === $t ? $s : [ $t, $s, $line, $column ];
            $line   = $next_line;
            $column = $next_column;
            $this->len ++;
            break;
        }
        $this->tok  = $tok;
        $this->pos  = $offset;
        $this->col  = $column;
        $this->line = $line;
    }

    #[ReturnTypeWillChange]
    public function key() {
        return $this->len ? $this->len - 1 : null;
    }

    #[ReturnTypeWillChange]
    public function valid() {
        return null !== $this->tok;
    }

    #[ReturnTypeWillChange]
    public function rewind() {
        $this->len  = 0;
        $this->pos  = 0;
        $this->col  = 0;
        $this->line = 1;
        $this->max  = strlen( $this->src ) - 1;
        $this->next();
    }
}

function loco_utf8_chr( $u ) {
    if ( $u < 0x80 ) {
        if ( $u < 0 ) {
            throw new RangeException( sprintf( '%d is out of Unicode range', $u ) );
        }

        return chr( $u );
    }
    if ( $u < 0x800 ) {
        return chr( ( $u >> 6 ) & 0x1F | 0xC0 ) . chr( $u & 0x3F | 0x80 );
    }
    if ( $u < 0x10000 ) {
        return chr( $u >> 12 & 15 | 0xE0 ) . chr( $u >> 6 & 0x3F | 0x80 ) . chr( $u & 0x3F | 0x80 );
    }
    if ( $u < 0x110000 ) {
        return chr( $u >> 18 & 7 | 0xF0 ) . chr( $u >> 12 & 0x3F | 0x80 ) . chr( $u >> 6 & 0x3F | 0x80 ) . chr( $u & 0x3F | 0x80 );
    }
    throw new RangeException( sprintf( '\\x%X is out of Unicode range', $u ) );
}

function loco_resolve_surrogates( $s ) {
    return preg_replace_callback( '/\\xED([\\xA0-\\xAF])([\\x80-\\xBF])\\xED([\\xB0-\\xBF])([\\x80-\\xBF])/', '_loco_resolve_surrogates', $s );
}

function _loco_resolve_surrogates( array $r ) {
    return loco_utf8_chr( ( ( ( ( 832 | ( ord( $r[1] ) & 0x3F ) ) << 6 ) | ( ord( $r[2] ) & 0x3F ) ) - 0xD800 ) * 0x400 + ( ( ( ( 832 | ( ord( $r[3] ) & 0x3F ) ) << 6 ) | ( ord( $r[4] ) & 0x3F ) ) - 0xDC00 ) + 0x10000 );
}

class LocoEscapeParser {
    private $map;
    private $grep;

    public function __construct( array $map = [] ) {
        $this->map = $map;
        $rules     = [ '\\\\' ];
        if ( $map ) {
            $rules[] = '[' . implode( array_keys( $map ) ) . ']';
        }
        if ( ! isset( $map['U'] ) ) {
            $rules[] = 'U[0-9A-Fa-f]{5,8}';
        }
        if ( ! isset( $map['u'] ) ) {
            $rules[] = 'u(?:\\{[0-9A-Fa-f]+\\}|[0-9A-Fa-f]{1,4})(?:\\\\u(?:\\{[0-9A-Fa-f]+\\}|[0-9A-Fa-f]{1,4}))*';
        }
        $this->grep = '/\\\\(' . implode( '|', $rules ) . ')/';
    }

    final public function unescape( $s ) {
        if ( '' !== $s ) {
            return $this->stripSlashes( preg_replace_callback( $this->grep, [ $this, 'unescapeMatch' ], $s ) );
        }

        return '';
    }

    final public function unescapeMatch( array $r ) {
        $s = $r[0];
        $c = $s[1];
        if ( isset( $this->map[ $c ] ) ) {
            return $this->map[ $c ];
        }
        if ( 'u' === $c ) {
            $str        = '';
            $surrogates = false;
            foreach ( explode( '\\u', $s ) as $i => $h ) {
                if ( '' !== $h ) {
                    $h   = ltrim( trim( $h, '{}' ), '0' );
                    $u   = intval( $h, 16 );
                    $str .= loco_utf8_chr( $u );
                    if ( ! $surrogates ) {
                        $surrogates = $u >= 0xD800 && $u <= 0xDBFF;
                    }
                }
            }
            if ( $surrogates ) {
                $str = loco_resolve_surrogates( $str );
            }

            return $str;
        }
        if ( 'U' === $c ) {
            return loco_utf8_chr( intval( substr( $s, 2 ), 16 ) );
        }
        if ( 'x' === $c ) {
            return chr( intval( substr( $s, 2 ), 16 ) );
        }
        if ( ctype_digit( $c ) ) {
            return chr( intval( substr( $s, 1 ), 8 ) );
        }

        return $s;
    }

    protected function stripSlashes( $s ) {
        return stripcslashes( $s );
    }
}

class LocoJsTokens extends LocoTokenizer {
    const T_KWORD = 1;
    const T_REGEX = 2;
    private static $lex = null;
    protected static $words = [
        'true'       => 1,
        'false'      => 1,
        'null'       => 1,
        'break'      => T_BREAK,
        'else'       => T_ELSE,
        'new'        => T_NEW,
        'var'        => 1,
        'case'       => T_CASE,
        'finally'    => T_FINALLY,
        'return'     => T_RETURN,
        'void'       => 1,
        'catch'      => T_CATCH,
        'for'        => T_FOR,
        'switch'     => T_SWITCH,
        'while'      => T_WHILE,
        'continue'   => T_CONTINUE,
        'function'   => T_FUNCTION,
        'this'       => T_STRING,
        'with'       => 1,
        'default'    => T_DEFAULT,
        'if'         => T_IF,
        'throw'      => T_THROW,
        'delete'     => 1,
        'in'         => 1,
        'try'        => T_TRY,
        'do'         => T_DO,
        'instanceof' => 1,
        'typeof'     => 1,
    ];

    public static function decapse( $encapsed ) {
        $s = substr( $encapsed, 1, - 1 );
        $l = self::$lex;
        if ( is_null( $l ) ) {
            $l         = new LocoEscapeParser( [ 'U' => 'U', 'a' => 'a', ] );
            self::$lex = $l;
        }

        return $l->unescape( $s );
    }

    public function __construct( $src = '' ) {
        $this->ignore( T_WHITESPACE );
        $this->define( '/^(?:\\\\u[0-9A-F]{4,4}|[$_\\pL\\p{Nl}])(?:\\\\u[0-9A-F]{4}|[$_\\pL\\pN\\p{Mn}\\p{Mc}\\p{Pc}])*/ui', [
            $this,
            'matchWord'
        ] );
        $this->define( '/^\\s+/u', T_WHITESPACE );
        $this->define( '!^//.*!', T_COMMENT );
        $this->define( '!^/\\*.*\\*/!Us', [ $this, 'matchComment' ] );
        $this->define( '/^"(?:\\\\.|[^\\r\\n\\p{Zl}\\p{Zp}"\\\\])*"/u', T_CONSTANT_ENCAPSED_STRING );
        $this->define( '/^\'(?:\\\\.|[^\\r\\n\\p{Zl}\\p{Zp}\'\\\\])*\'/u', T_CONSTANT_ENCAPSED_STRING );
        $this->define( '/^[-+;,<>.=:|&^!?*%~(){}[\\]]/' );
        parent::__construct( $src );
    }

    public function matchWord( $s ) {
        if ( array_key_exists( $s, self::$words ) ) {
            return self::$words[ $s ];
        }

        return T_STRING;
    }

    public function matchComment( $s ) {
        if ( substr( $s, 0, 3 ) === '/**' ) {
            return T_DOC_COMMENT;
        }

        return T_COMMENT;
    }
}

interface LocoExtractorInterface {
    public function setDomain( $default );

    public function tokenize( $src );

    public function extract( LocoExtracted $strings, LocoTokensInterface $tokens, $fileref = '' );

    public function extractSource( $src, $fileref );
}

class LocoExtracted implements Countable {
    private $exp = [];
    private $reg = [];
    private $dom = [];
    private $dflt = '';

    public function extractSource( LocoExtractorInterface $ext, $src, $fileref = '' ) {
        $ext->extract( $this, $ext->tokenize( $src ), $fileref );

        return $this;
    }

    public function export() {
        return $this->exp;
    }

    #[ReturnTypeWillChange]
    public function count() {
        return count( $this->exp );
    }

    public function getDomainCounts() {
        return $this->dom;
    }

    public function setDomain( $default ) {
        $this->dflt = $default;

        return $this;
    }

    public function getDomain() {
        return $this->dflt;
    }

    private function key( array $entry ) {
        $key = (string) $entry['source'];
        foreach ( [ 'context', 'domain' ] as $i => $prop ) {
            if ( array_key_exists( $prop, $entry ) ) {
                $add = (string) $entry[ $prop ];
                if ( '' !== $add ) {
                    $key .= ord( $i ) . $add;
                }
            }
        }

        return $key;
    }

    public function pushEntry( array $entry, $domain ) {
        if ( '' === $domain || '*' === $domain ) {
            $domain = $this->dflt;
        }
        $entry['id']     = '';
        $entry['target'] = '';
        $entry['domain'] = $domain;
        $key             = $this->key( $entry );
        if ( isset( $this->reg[ $key ] ) ) {
            $index = $this->reg[ $key ];
            $clash = $this->exp[ $index ];
            if ( $value = $this->mergeField( $clash, $entry, 'refs', ' ' ) ) {
                $this->exp[ $index ]['refs'] = $value;
            }
            if ( $value = $this->mergeField( $clash, $entry, 'notes', "\n" ) ) {
                $this->exp[ $index ]['notes'] = $value;
            }
        } else {
            $index               = count( $this->exp );
            $this->reg[ $key ]   = $index;
            $this->exp[ $index ] = $entry;
            if ( isset( $this->dom[ $domain ] ) ) {
                $this->dom[ $domain ] ++;
            } else {
                $this->dom[ $domain ] = 1;
            }
        }

        return $index;
    }

    public function pushPlural( array $entry, $sindex ) {
        $parent = $this->exp[ $sindex ];
        $domain = $parent['domain'];
        $pkey   = $this->key( $parent ) . "\2";
        if ( ! array_key_exists( $pkey, $this->reg ) ) {
            $pindex               = count( $this->exp );
            $this->reg[ $pkey ]   = $pindex;
            $entry                += [
                'id'     => '',
                'target' => '',
                'plural' => 1,
                'parent' => $sindex,
                'domain' => $domain,
            ];
            $this->exp[ $pindex ] = $entry;
            if ( isset( $entry['format'] ) && ! isset( $parent['format'] ) ) {
                $this->exp[ $sindex ]['format'] = $entry['format'];
            }
            if ( $pindex !== $sindex + $entry['plural'] ) {
                $this->exp[ $sindex ]['child'] = $pindex;
            }
        }
    }

    public function mergeField( array $old, array $new, $field, $glue ) {
        $prev = isset( $old[ $field ] ) ? $old[ $field ] : '';
        if ( isset( $new[ $field ] ) ) {
            $text = $new[ $field ];
            if ( '' !== $prev && $prev !== $text ) {
                if ( 'notes' === $field && preg_match( '/^' . preg_quote( rtrim( $text, '. ' ), '/' ) . '[. ]*$/mu', $prev ) ) {
                    $text = $prev;
                } else {
                    $text = $prev . $glue . $text;
                }
            }

            return $text;
        }

        return $prev;
    }

    public function filter( $domain ) {
        if ( '' === $domain ) {
            $domain = $this->dflt;
        }
        $map       = [];
        $newOffset = 1;
        $matchAll  = '*' === $domain;
        $raw       = [ [ 'id' => '', 'source' => '', 'target' => '', 'domain' => $matchAll ? '' : $domain, ] ];
        foreach ( $this->exp as $oldOffset => $r ) {
            if ( isset( $r['parent'] ) ) {
                if ( isset( $map[ $r['parent'] ] ) ) {
                    $r['parent']          = $map[ $r['parent'] ];
                    $raw[ $newOffset ++ ] = $r;
                }
            } else {
                if ( $matchAll ) {
                    $match = true;
                } else if ( isset( $r['domain'] ) ) {
                    $match = $domain === $r['domain'];
                } else {
                    $match = $domain === '';
                }
                if ( $match ) {
                    $map[ $oldOffset ]    = $newOffset;
                    $raw[ $newOffset ++ ] = $r;
                }
            }
        }

        return $raw;
    }
}

abstract class LocoExtractor implements LocoExtractorInterface {
    private $rules;
    private $wp = [];
    private $domain = '';

    abstract protected function fsniff( $str );

    abstract protected function decapse( $raw );

    abstract protected function comment( $comment );

    public function __construct( array $rules ) {
        $this->rules = $rules;
    }

    public function setDomain( $default ) {
        $this->domain = $default;

        return $this;
    }

    public function headerize( array $tags, $domain = '' ) {
        if ( isset( $this->wp[ $domain ] ) ) {
            $this->wp[ $domain ] += $tags;
        } else {
            $this->wp[ $domain ] = $tags;
        }

        return $this;
    }

    protected function getHeaders() {
        return $this->wp;
    }

    final public function extractSource( $src, $fileref ) {
        $strings = new LocoExtracted;
        $this->extract( $strings, $this->tokenize( $src ), $fileref );

        return $strings;
    }

    public function rule( $keyword ) {
        return isset( $this->rules[ $keyword ] ) ? $this->rules[ $keyword ] : '';
    }

    protected function push( LocoExtracted $strings, $rule, array $args, $comment = '', $ref = '' ) {
        $s = strpos( $rule, 's' );
        $p = strpos( $rule, 'p' );
        $c = strpos( $rule, 'c' );
        $d = strpos( $rule, 'd' );
        if ( false === $s || ! isset( $args[ $s ] ) ) {
            return null;
        }
        $msgid = $args[ $s ];
        if ( ! is_string( $msgid ) ) {
            return null;
        }
        $entry = [ 'source' => $msgid, ];
        if ( is_int( $c ) && isset( $args[ $c ] ) ) {
            $entry['context'] = $args[ $c ];
        } else if ( '' === $msgid ) {
            return null;
        }
        if ( $ref ) {
            $entry['refs'] = $ref;
        }
        if ( is_int( $d ) && array_key_exists( $d, $args ) ) {
            $domain = $args[ $d ];
            if ( is_null( $domain ) ) {
                $domain = '';
            }
        } else if ( '' === $this->domain ) {
            $domain = $strings->getDomain();
        } else {
            $domain = $this->domain;
        }
        $format  = '';
        $comment = $this->comment( $comment );
        if ( '' !== $comment ) {
            if ( preg_match( '/^xgettext:\\s*([-a-z]+)-format\\s*/mi', $comment, $r, PREG_OFFSET_CAPTURE ) ) {
                $format          = $r[1][0];
                $entry['format'] = $format;
                $comment         = trim( substr_replace( $comment, '', $r[0][1], strlen( $r[0][0] ) ) );
            }
            if ( preg_match( '/^references?:( *.+:\\d+)*\\s*/mi', $comment, $r, PREG_OFFSET_CAPTURE ) ) {
                $entry['refs'] = trim( $r[1][0], ' ' );
                $comment       = trim( substr_replace( $comment, '', $r[0][1], strlen( $r[0][0] ) ) );
            }
            $entry['notes'] = $comment;
        }
        $msgid_plural = is_int( $p ) && isset( $args[ $p ] ) ? $args[ $p ] : '';
        if ( '' === $format ) {
            $format = $this->fsniff( $msgid );
            if ( '' !== $format ) {
                $entry['format'] = $format;
            } else if ( '' !== $msgid_plural ) {
                $format = $this->fsniff( $msgid_plural );
                if ( '' !== $format ) {
                    $entry['format'] = $format;
                }
            }
        }
        $index = $strings->pushEntry( $entry, $domain );
        if ( '' !== $msgid_plural ) {
            $entry = [ 'source' => $msgid_plural, ];
            if ( '' !== $format ) {
                $entry['format'] = $format;
            }
            $strings->pushPlural( $entry, $index );
        }

        return $index;
    }

    protected function utf8( $str ) {
        if ( false === preg_match( '//u', $str ) ) {
            $str = mb_convert_encoding( $str, 'UTF-8', 'cp1252' );
        }

        return $str;
    }
}

class LocoPHPTokens implements LocoTokensInterface, Countable {
    private $i = null;
    private $tokens;
    private $skip_tokens;
    private $literal_tokens;

    public function __construct( array $tokens ) {
        $this->tokens = $tokens;
        $this->reset();
    }

    public function reset() {
        $this->rewind();
        $this->literal_tokens = [];
        $this->skip_tokens    = [];
    }

    public function literal( ...$symbols ) {
        $this->literal_tokens += array_fill_keys( $symbols, true );

        return $this;
    }

    public function ignore( ...$symbols ) {
        $this->skip_tokens += array_fill_keys( $symbols, true );

        return $this;
    }

    public function export() {
        return array_values( iterator_to_array( $this ) );
    }

    public function advance() {
        if ( $this->valid() ) {
            $tok = $this->current();
            $this->next();

            return $tok;
        }

        return null;
    }

    #[ReturnTypeWillChange]
    public function rewind() {
        $this->i = ( false === reset( $this->tokens ) ? null : key( $this->tokens ) );
    }

    #[ReturnTypeWillChange]
    public function valid() {
        while ( is_int( $this->i ) ) {
            $tok = $this->tokens[ $this->i ];
            if ( array_key_exists( is_array( $tok ) ? $tok[0] : $tok, $this->skip_tokens ) ) {
                $this->next();
            } else {
                return true;
            }
        }

        return false;
    }

    #[ReturnTypeWillChange]
    public function key() {
        return $this->i;
    }

    #[ReturnTypeWillChange]
    public function next() {
        $this->i = ( false === next( $this->tokens ) ? null : key( $this->tokens ) );
    }

    #[ReturnTypeWillChange]
    public function current() {
        $tok = $this->tokens[ $this->i ];
        if ( is_array( $tok ) && isset( $this->literal_tokens[ $tok[0] ] ) ) {
            return $tok[1];
        }

        return $tok;
    }

    public function __toString() {
        $s = [];
        foreach ( $this as $token ) {
            $s[] = is_array( $token ) ? $token[1] : $token;
        }

        return implode( '', $s );
    }

    #[ReturnTypeWillChange]
    public function count() {
        return count( $this->tokens );
    }
}

class LocoPHPEscapeParser extends LocoEscapeParser {
    public function __construct() {
        parent::__construct( [
            'n'  => "\n",
            'r'  => "\r",
            't'  => "\t",
            'v'  => "\x0B",
            'f'  => "\x0C",
            'e'  => "\x1B",
            '$'  => '$',
            '\\' => '\\',
            '"'  => '"',
        ] );
    }

    protected function stripSlashes( $s ) {
        return preg_replace_callback( '/\\\\(x[0-9A-Fa-f]{1,2}|[0-3]?[0-7]{1,2})/', [
            $this,
            'unescapeMatch'
        ], $s, - 1, $n );
    }
}

function loco_unescape_php_string( $s ) {
    static $l;
    if ( is_null( $l ) ) {
        $l = new LocoPHPEscapeParser;
    }

    return $l->unescape( $s );
}

function loco_decapse_php_string( $s ) {
    if ( '' === $s ) {
        return '';
    }
    $q = $s[0];
    if ( "'" === $q ) {
        return str_replace( [ '\\' . $q, '\\\\' ], [ $q, '\\' ], substr( $s, 1, - 1 ) );
    }
    if ( '"' !== $q ) {
        return $s;
    }

    return loco_unescape_php_string( substr( $s, 1, - 1 ) );
}

function loco_parse_php_comment( $comment ) {
    $comment = trim( $comment, "/ \n\r\t" );
    if ( '' !== $comment && '*' === $comment[0] ) {
        $lines = [];
        $junk  = "\r\t/ *";
        foreach ( explode( "\n", $comment ) as $line ) {
            $line = trim( $line, $junk );
            if ( '' !== $line ) {
                $lines[] = $line;
            }
        }
        $comment = implode( "\n", $lines );
    }

    return $comment;
}

function loco_parse_wp_comment( $block ) {
    $header = [];
    if ( '/*' === substr( $block, 0, 2 ) ) {
        $junk = "\r\t/ *";
        foreach ( explode( "\n", $block ) as $line ) {
            if ( false !== ( $i = strpos( $line, ':' ) ) ) {
                $key                           = substr( $line, 0, $i );
                $val                           = substr( $line, ++ $i );
                $header[ trim( $key, $junk ) ] = trim( $val, $junk );
            }
        }
    }

    return $header;
}

class LocoPHPExtractor extends LocoExtractor {
    private $defs = [];

    public function tokenize( $src ) {
        return new LocoPHPTokens( token_get_all( $src ) );
    }

    public function decapse( $raw ) {
        return loco_decapse_php_string( $raw );
    }

    public function fsniff( $str ) {
        $format = '';
        $offset = 0;
        while ( preg_match( '/%(?:[1-9]\\d*\\$)?(?:\'.|[-+0 ])*\\d*(?:\\.\\d+)?(.|$)/', $str, $r, PREG_OFFSET_CAPTURE, $offset ) ) {
            $type = $r[1][0];
            list( $match, $offset ) = $r[0];
            if ( '%' === $type && '%%' !== $match ) {
                return '';
            }
            if ( '' === $type || ! preg_match( '/^[bcdeEfFgGosuxX%]/', $type ) ) {
                return '';
            }
            $offset += strlen( $match );
            if ( preg_match( '/^% +[a-z]/i', $match ) || preg_match( '/^%[b-ou-x]/i', $match ) ) {
                continue;
            }
            $format = 'php';
        }

        return $format;
    }

    protected function comment( $comment ) {
        return preg_replace( '/^translators:\\s+/mi', '', loco_parse_php_comment( $comment ) );
    }

    public function define( $name, $value ) {
        $this->defs[ $name ] = $value;

        return $this;
    }

    public function extract( LocoExtracted $strings, LocoTokensInterface $tokens, $fileref = '' ) {
        $tokens->ignore( T_WHITESPACE );
        $n       = 0;
        $depth   = 0;
        $comment = '';
        $narg    = 0;
        $args    = [];
        $ref     = '';
        $rule    = '';
        $wp      = $this->getHeaders();
        $tokens->rewind();
        while ( $tok = $tokens->advance() ) {
            if ( is_string( $tok ) ) {
                $s = $tok;
                $t = null;
            } else {
                $t = $tok[0];
                $s = $tok[1];
            }
            if ( $depth ) {
                if ( ')' === $s || ']' === $s ) {
                    if ( 0 === -- $depth ) {
                        if ( $this->push( $strings, $rule, $args, $comment, $ref ) ) {
                            $n ++;
                        }
                        $comment = '';
                    }
                } else if ( '(' === $s || '[' === $s ) {
                    $depth ++;
                    $args[ $narg ] = null;
                } else if ( 1 === $depth ) {
                    if ( ',' === $s ) {
                        $narg ++;
                    } else if ( T_CONSTANT_ENCAPSED_STRING === $t ) {
                        $s             = self::utf8( $s );
                        $args[ $narg ] = $this->decapse( $s );
                    } else if ( T_STRING === $t && array_key_exists( $s, $this->defs ) ) {
                        $args[ $narg ] = $this->defs[ $s ];
                    } else {
                        $args[ $narg ] = null;
                    }
                }
            } else if ( T_COMMENT === $t || T_DOC_COMMENT === $t ) {
                $was_header = false;
                $s          = self::utf8( $s );
                if ( 0 === $n ) {
                    if ( false !== strpos( $s, '* @package' ) ) {
                        $was_header = true;
                    }
                    if ( $wp && ( $header = loco_parse_wp_comment( $s ) ) ) {
                        foreach ( $wp as $domain => $tags ) {
                            foreach ( array_intersect_key( $header, $tags ) as $tag => $text ) {
                                $ref  = $fileref ? $fileref . ':' . $tok[2] : '';
                                $meta = $tags[ $tag ];
                                if ( is_string( $meta ) ) {
                                    $meta = [ 'notes' => $meta ];
                                    trigger_error( $tag . ' header defaulted to "notes"', E_USER_DEPRECATED );
                                }
                                $strings->pushEntry( [ 'source' => $text, 'refs' => $ref ] + $meta, (string) $domain );
                                $was_header = true;
                            }
                        }
                    }
                }
                if ( ! $was_header ) {
                    $comment = $s;
                }
            } else if ( T_STRING === $t && '(' === $tokens->advance() && ( $rule = $this->rule( $s ) ) ) {
                $ref   = $fileref ? $fileref . ':' . $tok[2] : '';
                $depth = 1;
                $args  = [];
                $narg  = 0;
            } else if ( '' !== $comment && ! preg_match( '!^[/* ]+(translators|xgettext):!im', $comment ) ) {
                $comment = '';
            }
        }
    }
}

class LocoJsExtractor extends LocoPHPExtractor {
    public function tokenize( $src ) {
        return new LocoJsTokens( $src );
    }

    public function fsniff( $str ) {
        return parent::fsniff( $str ) ? 'javascript' : '';
    }

    public function decapse( $raw ) {
        return LocoJsTokens::decapse( $raw );
    }
}

class LocoTwigExtractor extends LocoPHPExtractor {
    public function tokenize( $src ) {
        return parent::tokenize( '<?php ' . preg_replace( '/{#([^#]+)#}/su', '/*\\1*/', $src ) );
    }
}

class LocoBladeExtractor extends LocoPHPExtractor {
    public function tokenize( $src ) {
        return parent::tokenize( '<?php ' . preg_replace( '/{{--(.+)--}}/su', '/*\\1*/', $src ) );
    }
}

class LocoWpJsonExtractor implements LocoExtractorInterface {
    private static $types = [];
    private $base = '.';
    private $domain = '';

    public function __construct() {
        if ( defined( 'ABSPATH' ) ) {
            $this->setBase( rtrim( ABSPATH, '/' ) . '/wp-includes' );
        }
    }

    public function setBase( $path ) {
        $this->base = $path;
    }

    private function getType( $type ) {
        if ( array_key_exists( $type, self::$types ) ) {
            return self::$types[ $type ];
        }
        $path = $this->base . '/' . $type . '-i18n.json';
        if ( ! file_exists( $path ) ) {
            throw new Exception( basename( $path ) . ' not found in ' . $this->base );
        }

        return json_decode( file_get_contents( $path ) );
    }

    public function tokenize( $src ) {
        $raw = json_decode( $src, true );
        if ( ! is_array( $raw ) || ! array_key_exists( '$schema', $raw ) ) {
            throw new InvalidArgumentException( 'Invalid JSON' );
        }
        if ( ! preg_match( '!^https?://schemas.wp.org/trunk/(block|theme)\\.json!', $raw['$schema'], $r ) ) {
            throw new InvalidArgumentException( 'Unsupported schema' );
        }
        if ( '' === $this->domain && array_key_exists( 'textdomain', $raw ) ) {
            $this->domain = $raw['textdomain'];
        }

        return new LocoWpJsonStrings( $raw, $this->getType( $r[1] ) );
    }

    public function setDomain( $default ) {
        $this->domain = $default;

        return $this;
    }

    public function extract( LocoExtracted $strings, LocoTokensInterface $tokens, $fileref = '' ) {
        if ( ! preg_match( '/:\\d+$/', $fileref ) ) {
            $fileref .= ':1';
        }
        $tokens->rewind();
        while ( $tok = $tokens->advance() ) {
            $tok['refs'] = $fileref;
            $strings->pushEntry( $tok, $this->domain );
        }
    }

    final public function extractSource( $src, $fileref ) {
        $strings = new LocoExtracted;
        $this->extract( $strings, $this->tokenize( $src ), $fileref );

        return $strings;
    }
}

class LocoWpJsonStrings extends ArrayIterator implements LocoTokensInterface {
    public function __construct( array $raw, stdClass $tpl ) {
        parent::__construct();
        $this->walk( $tpl, $raw );
    }

    public function advance() {
        $tok = $this->current();
        $this->next();

        return $tok;
    }

    public function ignore( ...$symbols ) {
        return $this;
    }

    private function walk( $tpl, $raw ) {
        if ( is_string( $tpl ) && is_string( $raw ) ) {
            $this->offsetSet( null, [ 'context' => $tpl, 'source' => $raw, ] );

            return;
        }
        if ( is_array( $tpl ) && is_array( $raw ) ) {
            foreach ( $raw as $value ) {
                self::walk( $tpl[0], $value );
            }
        } else if ( is_object( $tpl ) && is_array( $raw ) ) {
            $group_key = '*';
            foreach ( $raw as $key => $value ) {
                if ( isset( $tpl->$key ) ) {
                    $this->walk( $tpl->$key, $value );
                } else if ( isset( $tpl->$group_key ) ) {
                    $this->walk( $tpl->$group_key, $value );
                }
            }
        }
    }
}

function loco_wp_extractor( $type = 'php', $ext = '' ) {
    if ( 'json' === $type ) {
        return new LocoWpJsonExtractor;
    }
    static $rules = [
        '__'              => 'sd',
        '_e'              => 'sd',
        '_c'              => 'sd',
        '_n'              => 'sp_d',
        '_n_noop'         => 'spd',
        '_nc'             => 'sp_d',
        '__ngettext'      => 'spd',
        '__ngettext_noop' => 'spd',
        '_x'              => 'scd',
        '_ex'             => 'scd',
        '_nx'             => 'sp_cd',
        '_nx_noop'        => 'spcd',
        'esc_attr__'      => 'sd',
        'esc_html__'      => 'sd',
        'esc_attr_e'      => 'sd',
        'esc_html_e'      => 'sd',
        'esc_attr_x'      => 'scd',
        'esc_html_x'      => 'scd',
    ];
    if ( 'php' === $type ) {
        return substr( $ext, - 9 ) === 'blade.php' ? new LocoBladeExtractor( $rules ) : new LocoPHPExtractor( $rules );
    }
    if ( 'js' === $type ) {
        return new LocoJsExtractor( $rules );
    }
    if ( 'twig' === $type ) {
        return new LocoTwigExtractor( $rules );
    }
    throw new InvalidArgumentException( 'No extractor for ' . $type );
}

function loco_string_percent( $n, $t ) {
    if ( ! $t || ! $n ) {
        return '0';
    }
    if ( $t === $n ) {
        return '100';
    }
    $dp = 0;
    $n  = 100 * $n / $t;
    if ( $n > 99 ) {
        return number_format( min( $n, 99.9 ), ++ $dp );
    }
    if ( $n < 0.5 ) {
        $n = max( $n, 0.0001 );
        do {
            $s = number_format( $n, ++ $dp );
        } while ( preg_match( '/^0\\.0+$/', $s ) && $dp < 4 );

        return substr( $s, 1 );
    }

    return number_format( $n, $dp );
}

function loco_print_progress( $translated, $untranslated, $flagged ) {
    $total    = $translated + $untranslated;
    $complete = loco_string_percent( $translated - $flagged, $total );
    $class    = 'progress';
    if ( ! $translated && ! $flagged ) {
        $class .= ' empty';
    } else if ( '100' === $complete ) {
        $class .= ' done';
    }
    echo '<div class="', $class, '"><div class="t">';
    if ( $flagged ) {
        $s = loco_string_percent( $flagged, $total );
        echo '<div class="bar f" style="width:', $s, '%">&nbsp;</div>';
    }
    if ( '0' === $complete ) {
        echo '&nbsp;';
    } else {
        $class = 'bar p';
        $p     = (int) $complete;
        $class .= sprintf( ' p-%u', 10 * floor( $p / 10 ) );
        $style = 'width:' . $complete . '%';
        if ( $flagged ) {
            $remain = 100.0 - (float) $s;
            $style  .= '; max-width: ' . sprintf( '%s', $remain ) . '%';
        }
        echo '<div class="', $class, '" style="' . $style . '">&nbsp;</div>';
    }
    echo '</div><div class="l">', $complete, '%</div></div>';
}

class LocoFuzzyMatcher implements Countable {
    private $pot = [];
    private $po = [];
    private $diff = [];
    private $dmax = .20;

    #[ReturnTypeWillChange]
    public function count() {
        return count( $this->pot );
    }

    public function unmatched() {
        return array_values( $this->pot );
    }

    public function redundant() {
        return array_values( $this->po );
    }

    public function setFuzziness( $s ) {
        if ( $this->po ) {
            throw new LogicException( 'Cannot setFuzziness() after calling match()' );
        }
        $this->dmax = (float) max( 0, min( (int) $s, 100 ) ) / 100;
    }

    public function add( $a ) {
        $source            = isset( $a['source'] ) ? (string) $a['source'] : '';
        $context           = isset( $a['context'] ) ? (string) $a['context'] : '';
        $key               = $source . "\4" . $context;
        $this->pot[ $key ] = $a;
    }

    private function key( $a ) {
        $source  = isset( $a['source'] ) ? (string) $a['source'] : '';
        $context = isset( $a['context'] ) ? (string) $a['context'] : '';

        return $source . "\4" . $context;
    }

    protected function getRef( $a ) {
        $key = $this->key( $a );

        return array_key_exists( $key, $this->pot ) ? $this->pot[ $key ] : null;
    }

    public function match( $a ) {
        $old = $this->key( $a );
        if ( isset( $this->pot[ $old ] ) ) {
            $new = $this->pot[ $old ];
            unset( $this->pot[ $old ] );

            return $new;
        }
        $this->po[ $old ] = $a;
        $target           = isset( $a['target'] ) ? (string) $a['target'] : '';
        $comment          = isset( $a['comment'] ) ? (string) $a['comment'] : '';
        if ( '' === $target && '' === $comment ) {
            return null;
        }
        if ( 0 < $this->dmax ) {
            foreach ( $this->pot as $new => $_ ) {
                $dist = $this->distance( $old, $new );
                if ( - 1 !== $dist ) {
                    $this->diff[] = [ $old, $new, $dist ];
                }
            }
        }

        return null;
    }

    private function distance( $a, $b ) {
        $a = strtolower( $a );
        $b = strtolower( $b );
        if ( $a === $b ) {
            return 0;
        }
        $lenA    = strlen( $a );
        $lenB    = strlen( $b );
        $lenDiff = abs( $lenA - $lenB );
        $max     = min( $lenA, $lenB ) + $lenDiff;
        $max     = (int) ceil( $this->dmax * $max );
        if ( $max < $lenDiff ) {
            return - 1;
        }
        $len = max( $lenA, $lenB );
        if ( $len < 256 ) {
            $d = levenshtein( $a, $b );

            return $d > $max ? - 1 : $d;
        }
        $d = 0;
        for ( $i = 0; $i < $len; $i += $max ) {
            $aa = substr( $a, $i, $max );
            $bb = substr( $b, $i, $max );
            $d  += levenshtein( $aa, $bb );
            if ( $d > $max ) {
                return - 1;
            }
        }

        return $d;
    }

    public function getFuzzyMatches() {
        $pairs = [];
        usort( $this->diff, [ __CLASS__, 'compareDistance' ] );
        foreach ( $this->diff as $pair ) {
            list( $old, $new ) = $pair;
            if ( ! array_key_exists( $new, $this->pot ) || ! array_key_exists( $old, $this->po ) ) {
                continue;
            }
            $pairs[] = [ $this->po[ $old ], $this->pot[ $new ], ];
            unset( $this->po[ $old ] );
            unset( $this->pot[ $new ] );
            if ( ! $this->po || ! $this->pot ) {
                break;
            }
        }
        $this->diff = [];

        return $pairs;
    }

    private static function compareDistance( array $a, array $b ) {
        return $a[2] - $b[2];
    }
}

defined( 'T_FINALLY' ) || define( 'T_FINALLY', 500 );
if ( function_exists( 'loco_check_extension' ) ) {
    loco_check_extension( 'mbstring' );
} 