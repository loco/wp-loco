<?php

/**
 * Compiled from Loco core. Do not edit!
 * Mon, 04 Jul 2016 19:08:56 +0100
 */
loco_check_extension('iconv');
loco_check_extension('mbstring');
loco_check_extension('tokenizer');
interface LocoArrayInterface extends ArrayAccess, Iterator, Countable, JsonSerializable
{
    public function export();
    public function keys();
    public function toArray();
    public function getArrayCopy();
}
class LocoHeaders extends ArrayIterator implements LocoArrayInterface
{
    private $map = array();
    public function __construct(array $raw = array())
    {
        if ($raw) {
            $keys = array_keys($raw);
            $this->map = array_combine(array_map('strtolower', $keys), $keys);
            parent::__construct($raw);
        }
    }
    private function normalize($key)
    {
        $k = strtolower($key);
        return isset($this->map[$k]) ? $this->map[$k] : null;
    }
    public function add($key, $val)
    {
        $this->offsetSet($key, $val);
        return $this;
    }
    public function __toString()
    {
        $pairs = array();
        foreach ($this as $key => $val) {
            $pairs[] = trim($key) . ': ' . $val;
        }
        return implode('
', $pairs);
    }
    public function trimmed($prop)
    {
        return trim($this->__get($prop));
    }
    public function has($key)
    {
        return $this->offsetExists($key);
    }
    public function __get($key)
    {
        return $this->offsetGet($key);
    }
    public function __set($key, $val)
    {
        $this->offsetSet($key, $val);
    }
    public function offsetExists($k)
    {
        return !is_null($this->normalize($k));
    }
    public function offsetGet($k)
    {
        $k = $this->normalize($k);
        if (is_null($k)) {
            return '';
        }
        return parent::offsetGet($k);
    }
    public function offsetSet($key, $v)
    {
        $k = strtolower($key);
        if (isset($this->map[$k]) && $key !== $this->map[$k]) {
            parent::offsetUnset($this->map[$k]);
        }
        $this->map[$k] = $key;
        return parent::offsetSet($key, $v);
    }
    public function offsetUnset($key)
    {
        $k = strtolower($key);
        if (isset($this->map[$k])) {
            parent::offsetUnset($this->map[$k]);
            unset($this->map[$k]);
        }
    }
    public function export()
    {
        return $this->getArrayCopy();
    }
    public function jsonSerialize()
    {
        return $this->getArrayCopy();
    }
    public function toArray()
    {
        return $this->getArrayCopy();
    }
    public function keys()
    {
        return array_values($this->map);
    }
}
function loco_sniff_printf($str)
{
    return false !== strpos($str, '%') && preg_match('/%(?:(\\d)\\$)?([,\'\\+\\-#0 \\(]*)(\\d*)(\\.\\d+|\\.\\*)?([sScCuidoxXfFeEgGaAbBpn@])/', $str);
}
function loco_parse_reference_id($refs, &$_id)
{
    if (false === ($n = strpos($refs, 'loco:'))) {
        $_id = '';
        return $refs;
    }
    $_id = substr($refs, $n + 5, 24);
    $refs = substr_replace($refs, '', $n, 29);
    return trim($refs);
}
function loco_ensure_utf8($str, $enc = false, $prefix_bom = false)
{
    if (false === $enc) {
        $m = substr($str, 0, 3);
        if ('﻿' === $m) {
            $str = substr($str, 3);
        } else {
            if ('�' === $m[0] && '�' === $m[1]) {
                $str = substr($str, 2);
                $enc = 'UTF-16LE';
            } else {
                if ('�' === $m[0] && '�' === $m[1]) {
                    $str = substr($str, 2);
                    $enc = 'UTF-16BE';
                } else {
                    $enc = mb_detect_encoding($str, array('UTF-8', 'Windows-1252', 'ISO-8859-1'), false);
                    if (!$enc) {
                        throw new Exception('Unknown character encoding');
                    }
                }
            }
        }
    } else {
        if (!strcasecmp('ISO-8859-1', $enc) || !strcasecmp('CP-1252', $enc)) {
            $enc = 'Windows-1252';
        } else {
            if (!strcasecmp('UTF8', $enc)) {
                $enc = '';
            }
        }
    }
    if ($enc && $enc !== 'UTF-8') {
        $str = iconv($enc, 'UTF-8//TRANSLIT', $str);
        if (!$str) {
            throw new Exception('Failed to ensure UTF-8 from ' . $enc);
        }
    }
    if ($prefix_bom) {
        $str = '﻿' . $str;
    }
    return $str;
}
function loco_parse_po($src)
{
    $src = loco_ensure_utf8($src);
    $i = -1;
    $key = '';
    $entries = array();
    $template = array('#' => array(), 'id' => array(), 'str' => array(), 'ctxt' => array());
    foreach (preg_split('/[\\r\\n]+/', $src) as $_i => $line) {
        while ($line = trim($line, ' 	')) {
            $c = $line[0];
            if ('"' === $c) {
                if ($key && isset($entry)) {
                    if ('"' === substr($line, -1)) {
                        $line = substr($line, 1, -1);
                        $entry[$key][$idx][] = stripcslashes($line);
                    }
                }
            } else {
                if ('#' === $c) {
                    if (isset($entry['i'])) {
                        unset($entry);
                        $entry = $template;
                    }
                    $f = empty($line[1]) ? ' ' : $line[1];
                    $entry['#'][$f][] = trim(substr($line, 1 + strlen($f)), '/ 
	');
                } else {
                    if (preg_match('/^msg(id|str|ctxt|id_plural)(?:\\[(\\d+)\\])?[ \\t]+/', $line, $r)) {
                        $key = $r[1];
                        $idx = isset($r[2]) ? (int) $r[2] : 0;
                        if ('str' === $key) {
                            if (!isset($entry['i'])) {
                                $entry['i'] = ++$i;
                                $entries[$i] =& $entry;
                            }
                        } else {
                            if (!isset($entry) || isset($entry['i'])) {
                                unset($entry);
                                $entry = $template;
                            }
                        }
                        $line = substr($line, strlen($r[0]));
                        continue;
                    }
                }
            }
            continue 2;
        }
    }
    unset($entry);
    $assets = array();
    foreach ($entries as $i => $entry) {
        if (empty($entry['id'])) {
            continue;
        }
        if (empty($entry['str'])) {
            $entry['str'] = array(array(''));
        }
        $asset = array('id' => null, 'source' => implode('', $entry['id'][0]), 'target' => implode('', $entry['str'][0]));
        $parse_printf = true;
        if (isset($entry['ctxt'][0])) {
            $asset['context'] = implode('', $entry['ctxt'][0]);
        }
        if (isset($entry['#'][' '])) {
            $asset['comment'] = implode('
', $entry['#'][' ']);
        }
        if (isset($entry['#']['.'])) {
            $asset['notes'] = implode('
', $entry['#']['.']);
        }
        if (isset($entry['#'][':'])) {
            if ($refs = implode('
', $entry['#'][':'])) {
                if ($refs = loco_parse_reference_id($refs, $_id)) {
                    $asset['refs'] = $refs;
                }
                if ($_id) {
                    $asset['_id'] = $_id;
                }
            }
        }
        if (isset($entry['#'][','])) {
            foreach ($entry['#'][','] as $flag) {
                if (preg_match('/((?:no-)?\\w+)-format/', $flag, $r)) {
                    $parse_printf = false;
                    if ('no-' === substr($r[1], 0, 3)) {
                        $asset['format'] = false;
                    } else {
                        $asset['format'] = $r[1];
                    }
                } else {
                    if ($flag = loco_po_parse_flag($flag)) {
                        $asset['flag'] = $flag;
                        break;
                    }
                }
            }
        }
        if ($parse_printf) {
            if ($asset['source'] && loco_sniff_printf($asset['source'])) {
                $asset['format'] = 'c';
                $parse_printf = false;
            }
        }
        $pidx = count($assets);
        $assets[] = $asset;
        if (isset($entry['id_plural']) || isset($entry['str'][1])) {
            $idx = 0;
            $num = max(2, count($entry['str']));
            while (++$idx < $num) {
                $plural = array('id' => null, 'source' => '', 'target' => isset($entry['str'][$idx]) ? implode('', $entry['str'][$idx]) : '', 'plural' => $idx, 'parent' => $pidx);
                if (1 === $idx) {
                    $plural['source'] = isset($entry['id_plural'][0]) ? implode('', $entry['id_plural'][0]) : '';
                }
                if ($parse_printf) {
                    if ($plural['source'] && loco_sniff_printf($plural['source'])) {
                        $assets[$pidx]['format'] = 'c';
                        $parse_printf = false;
                    }
                }
                $assets[] = $plural;
            }
        }
    }
    if (isset($assets[0]) && '' === $assets[0]['source']) {
        $headers = loco_parse_po_headers($assets[0]['target']);
        $indexed = $headers['X-Loco-Lookup'];
        if ($indexed && 'text' !== $indexed) {
            foreach ($assets as $i => $asset) {
                if (isset($asset['notes'])) {
                    $notes = $texts = array();
                    foreach (explode('
', $asset['notes']) as $line) {
                        0 === strpos($line, 'Source text: ') ? $texts[] = substr($line, 13) : ($notes[] = $line);
                    }
                    $assets[$i]['notes'] = implode('
', $notes);
                    $assets[$i]['id'] = $asset['source'];
                    $assets[$i]['source'] = implode('
', $texts);
                }
            }
        }
    }
    return $assets;
}
function loco_po_parse_flag($text)
{
    static $map;
    $flag = 0;
    foreach (explode(',', $text) as $needle) {
        if ($needle = trim($needle)) {
            if (!isset($map)) {
                $map = unserialize('a:1:{i:4;s:8:"#, fuzzy";}');
            }
            foreach ($map as $loco_flag => $haystack) {
                if (false !== stripos($haystack, $needle)) {
                    $flag = $loco_flag;
                    break 2;
                }
            }
        }
    }
    return $flag;
}
function loco_parse_po_headers($str)
{
    $headers = new LocoHeaders();
    foreach (explode('
', $str) as $line) {
        $i = strpos($line, ':') and $key = trim(substr($line, 0, $i)) and $headers->add($key, trim(substr($line, ++$i)));
    }
    return $headers;
}
class LocoMoParser
{
    private $bin;
    private $be;
    private $n;
    private $o;
    private $t;
    private $v;
    private $cs;
    public function __construct($bin)
    {
        $this->bin = $bin;
    }
    public function getAt($idx)
    {
        $offset = $this->targetOffset();
        $offset += $idx * 8;
        $len = $this->integerAt($offset);
        $idx = $this->integerAt($offset + 4);
        $txt = $this->bytes($idx, $len);
        if (false === strpos($txt, ' ')) {
            return $txt;
        }
        return explode(' ', $txt);
    }
    public function parse()
    {
        $r = array();
        $sourceOffset = $this->sourceOffset();
        $targetOffset = $this->targetOffset();
        $soffset = $sourceOffset;
        $toffset = $targetOffset;
        while ($soffset < $targetOffset) {
            $len = $this->integerAt($soffset);
            $idx = $this->integerAt($soffset + 4);
            $src = $this->bytes($idx, $len);
            $eot = strpos($src, '');
            if (false === $eot) {
                $context = null;
            } else {
                $context = $this->decodeStr(substr($src, 0, $eot));
                $src = substr($src, $eot + 1);
            }
            $sources = explode(' ', $src, 2);
            $len = $this->integerAt($toffset);
            $idx = $this->integerAt($toffset + 4);
            $targets = explode(' ', $this->bytes($idx, $len));
            $r[] = array('id' => null, 'source' => $this->decodeStr($sources[0]), 'target' => $this->decodeStr($targets[0]), 'context' => $context);
            if (isset($sources[1])) {
                $p = count($r) - 1;
                $nforms = max(2, count($targets));
                for ($i = 1; $i < $nforms; $i++) {
                    $r[] = array('id' => null, 'source' => isset($sources[$i]) ? $this->decodeStr($sources[$i]) : sprintf('%s (plural %u)', $r[$p]['source'], $i), 'target' => isset($targets[$i]) ? $this->decodeStr($targets[$i]) : '', 'parent' => $p, 'plural' => $i);
                }
            }
            $soffset += 8;
            $toffset += 8;
        }
        return $r;
    }
    public function isBigendian()
    {
        while (is_null($this->be)) {
            $str = $this->words(0, 2);
            $arr = unpack('V', $str);
            if (2500072158 === $arr[1]) {
                $this->be = false;
                break;
            }
            if (3725722773 === $arr[1]) {
                $this->be = true;
                break;
            }
            throw new Loco_error_ParseException('Invalid MO format');
        }
        return $this->be;
    }
    public function version()
    {
        if (is_null($this->v)) {
            $this->v = $this->integerWord(1);
        }
        return $this->v;
    }
    public function count()
    {
        if (is_null($this->n)) {
            $this->n = $this->integerWord(2);
        }
        return $this->n;
    }
    public function sourceOffset()
    {
        if (is_null($this->o)) {
            $this->o = $this->integerWord(3);
        }
        return $this->o;
    }
    public function targetOffset()
    {
        if (is_null($this->t)) {
            $this->t = $this->integerWord(4);
        }
        return $this->t;
    }
    public function getHashTable()
    {
        $s = $this->integerWord(5);
        $h = $this->integerWord(6);
        return $this->bytes($h, $s * 4);
    }
    private function bytes($offset, $length)
    {
        return substr($this->bin, $offset, $length);
    }
    private function words($offset, $length)
    {
        return $this->bytes($offset * 4, $length * 4);
    }
    private function integerWord($offset)
    {
        return $this->integerAt($offset * 4);
    }
    private function integerAt($offset)
    {
        $str = $this->bytes($offset, 4);
        $fmt = $this->isBigendian() ? 'N' : 'V';
        $arr = unpack($fmt, $str);
        if (!isset($arr[1]) || !is_int($arr[1])) {
            throw new Loco_error_ParseException('Failed to read 32 bit integer at byte ' . $offset);
        }
        return $arr[1];
    }
    private function decodeStr($str)
    {
        if ($this->cs) {
            $enc = $this->cs;
        } else {
            $enc = mb_detect_encoding($str, array('ASCII', 'UTF-8', 'ISO-8859-1'), false);
            if ('ASCII' !== $enc) {
                $this->cs = $enc;
            }
        }
        if ('UTF-8' !== $enc) {
            $str = iconv($enc, 'UTF-8', $str);
        }
        return $str;
    }
}
function loco_parse_mo($src)
{
    $mo = new LocoMoParser($src);
    return $mo->parse();
}
class LocoPHPTokens implements Iterator
{
    private $tokens;
    private $i;
    private $skip_tokens = array();
    private $skip_strings = array();
    private $literal_tokens = array();
    public function __construct(array $tokens)
    {
        $this->tokens = $tokens;
        $this->rewind();
    }
    public function literal()
    {
        foreach (func_get_args() as $t) {
            $this->literal_tokens[$t] = 1;
        }
        return $this;
    }
    public function ignore()
    {
        foreach (func_get_args() as $t) {
            if (is_int($t)) {
                $this->skip_tokens[$t] = true;
            } else {
                $this->skip_strings[$t] = true;
            }
        }
        return $this;
    }
    public function export()
    {
        $arr = array();
        foreach ($this as $tok) {
            $arr[] = $tok;
        }
        return $arr;
    }
    public function advance()
    {
        $this->next();
        return $this->current();
    }
    public function pop()
    {
        $tok = array_pop($this->tokens);
        $this->rewind();
        return $tok;
    }
    public function shift()
    {
        $tok = array_shift($this->tokens);
        $this->rewind();
        return $tok;
    }
    public function rewind()
    {
        $this->i = false === reset($this->tokens) ? null : key($this->tokens);
    }
    public function valid()
    {
        while (isset($this->i)) {
            $tok = $this->tokens[$this->i];
            if (is_array($tok)) {
                if (isset($this->skip_tokens[$tok[0]])) {
                    $this->next();
                } else {
                    return true;
                }
            } else {
                if (isset($this->skip_strings[$tok])) {
                    $this->next();
                } else {
                    return true;
                }
            }
        }
        return false;
    }
    public function key()
    {
        return $this->i;
    }
    public function next()
    {
        $this->i = false === next($this->tokens) ? null : key($this->tokens);
    }
    public function current()
    {
        if (!$this->valid()) {
            return false;
        }
        $tok = $this->tokens[$this->i];
        if (is_array($tok) && isset($this->literal_tokens[$tok[0]])) {
            return $tok[1];
        }
        return $tok;
    }
    public function __toString()
    {
        $s = '';
        foreach ($this as $token) {
            $s .= is_array($token) ? $token[1] : $token;
        }
        return $s;
    }
}
function loco_parse_comment($comment)
{
    if ('*' === $comment[1]) {
        $lines = array();
        foreach (explode('
', $comment) as $line) {
            $line and $lines[] = trim($line, '/* 	');
        }
        $comment = implode('
', $lines);
    }
    return trim($comment, '/ 
	');
}
function loco_parse_wp_comment($block)
{
    $header = array();
    if ('*' === $block[1]) {
        foreach (explode('
', $block) as $line) {
            if (false !== ($i = strpos($line, ':'))) {
                $key = substr($line, 0, $i);
                $val = substr($line, ++$i);
                $header[trim($key, '/* 	')] = trim($val, '/* 	');
            }
        }
    }
    return $header;
}
function loco_decapse_php_string($s)
{
    if (!$s) {
        return '';
    }
    $q = $s[0];
    if ('\'' === $q) {
        return str_replace(array('\\' . $q, '\\\\'), array($q, '\\'), substr($s, 1, -1));
    }
    if ('"' !== $q) {
        return $s;
    }
    $s = substr($s, 1, -1);
    $a = '';
    $e = false;
    $symbols = array('n' => '
', 'r' => '', 't' => '	', 'v' => '', 'f' => '', 'e' => '', '$' => '$', '\\' => '\\', '"' => '"');
    foreach (explode('\\', $s) as $i => $t) {
        if ('' === $t) {
            if ($e) {
                $a .= '\\';
            }
            $e = !$e;
            continue;
        }
        if ($e) {
            $c = $t[0];
            while (true) {
                if ('x' === $c || 'X' === $c) {
                    if (preg_match('/^x([0-9a-f]{1,2})/i', $t, $n)) {
                        $c = chr(intval($n[1], 16));
                        $n = strlen($n[0]);
                        break;
                    }
                } else {
                    if (isset($symbols[$c])) {
                        $c = $symbols[$c];
                        $n = 1;
                        break;
                    } else {
                        if (is_numeric($c) && preg_match('/^[0-7]{1,3}/', $t, $n)) {
                            $c = chr(intval($n[0], 8));
                            $n = strlen($n[0]);
                            break;
                        }
                    }
                }
                $a .= '\\' . $t;
                continue 2;
            }
            $a .= substr_replace($t, $c, 0, $n);
            continue;
        }
        $a .= $t;
        $e = true;
    }
    return $a;
}
final class LocoPHPExtractor
{
    private $rules;
    private $exp = array();
    private $reg = array();
    private $dom = array();
    private $wp = array();
    public function __construct(array $rules)
    {
        $this->rules = $rules;
    }
    public function set_wp_theme()
    {
        return $this->headerize(array('Template Name' => 'Name of the template'));
    }
    public function set_wp_plugin()
    {
        return $this->headerize(array('Plugin Name' => 'Name of the plugin', 'Description' => 'Description of the plugin', 'Plugin URI' => 'URI of the plugin', 'Author' => 'Author of the plugin', 'Author URI' => 'Author URI of the plugin'));
    }
    public function headerize(array $tags)
    {
        $this->wp += $tags;
        return $this;
    }
    public function extract(array $tokens, $fileref = '')
    {
        $tokens = new LocoPHPTokens($tokens);
        $tokens->ignore(T_WHITESPACE);
        $n = 0;
        $comment = '';
        foreach ($tokens as $tok) {
            if (isset($args)) {
                if (')' === $tok) {
                    if (0 === --$depth) {
                        if (isset($arg)) {
                            $args[] = $arg;
                        }
                        $this->push($rule, $args, $comment, $ref);
                        unset($args, $arg);
                        $comment = '';
                        $n++;
                    }
                } else {
                    if ('(' === $tok) {
                        $depth++;
                    } else {
                        if (',' === $tok) {
                            isset($arg) and $arg and $args[] = $arg;
                            unset($arg);
                        } else {
                            if (isset($arg)) {
                                $arg[] = $tok;
                            } else {
                                $arg = array($tok);
                            }
                        }
                    }
                }
            } else {
                if (is_array($tok)) {
                    list($t, $s) = $tok;
                    if (T_COMMENT === $t || T_DOC_COMMENT === $t) {
                        if ($this->wp && 0 === $n && ($header = loco_parse_wp_comment($s))) {
                            foreach (array_intersect_key($header, $this->wp) as $tag => $source) {
                                $this->pushMeta($source, $this->wp[$tag]);
                            }
                        } else {
                            $comment = $s;
                        }
                    } else {
                        if (T_STRING === $t && isset($this->rules[$s]) && '(' === $tokens->advance()) {
                            $rule = $this->rules[$s];
                            $args = array();
                            $ref = $fileref ? $fileref . ':' . $tok[2] : '';
                            $depth = 1;
                        } else {
                            if ($comment) {
                                if (false === stripos($comment, 'translators')) {
                                    $comment = '';
                                }
                            }
                        }
                    }
                }
            }
        }
        return $this->exp;
    }
    public function pushMeta($source, $notes = '', $domain = null)
    {
        $entry = array('id' => '', 'source' => $source, 'target' => '', 'notes' => $notes, 'domain' => $domain);
        $this->pushMsgid($source, $entry, $domain);
        return $this;
    }
    private function pushMsgid($key, array $entry, $domain = null)
    {
        if (isset($this->reg[$key])) {
            $index = $this->reg[$key];
            $a = array();
            isset($this->exp[$index]['refs']) and $a[] = $this->exp[$index]['refs'];
            isset($entry['refs']) and $a[] = $entry['refs'];
            $a && ($this->exp[$index]['refs'] = implode(' ', $a));
            $a = array();
            isset($this->exp[$index]['notes']) and $a[] = $this->exp[$index]['notes'];
            isset($entry['notes']) and $a[] = $entry['notes'];
            $a && ($this->exp[$index]['notes'] = implode('
', $a));
        } else {
            $index = count($this->exp);
            $this->reg[$key] = $index;
            $this->exp[] = $entry;
            if (is_null($domain)) {
                $domain = '';
            }
            if (isset($this->dom[$domain])) {
                $this->dom[$domain]++;
            } else {
                $this->dom[$domain] = 1;
            }
        }
        return $index;
    }
    private function push($rule, array $args, $comment = '', $ref = '')
    {
        $s = strpos($rule, 's');
        $p = strpos($rule, 'p');
        $c = strpos($rule, 'c');
        $d = strpos($rule, 'd');
        foreach ($args as $i => $tokens) {
            if (1 === count($tokens) && is_array($tokens[0]) && T_CONSTANT_ENCAPSED_STRING === $tokens[0][0]) {
                $args[$i] = loco_decapse_php_string($tokens[0][1]);
            } else {
                $args[$i] = null;
            }
        }
        if (!isset($args[$s])) {
            return null;
        }
        $key = $msgid = $args[$s];
        if (!is_string($msgid)) {
            return null;
        }
        $entry = array('id' => '', 'source' => $msgid, 'target' => '');
        if (is_int($c) && isset($args[$c])) {
            $entry['context'] = $context = $args[$c];
            $key .= ' ' . $context;
        } else {
            if (!isset($msgid[0])) {
                return null;
            } else {
                $context = null;
            }
        }
        if ($ref) {
            $entry['refs'] = $ref;
        }
        if (is_int($d) && isset($args[$d])) {
            $entry['domain'] = $domain = $args[$d];
            $key .= '' . $domain;
        } else {
            $domain = null;
        }
        $parse_printf = true;
        if ($comment) {
            if (preg_match('/xgettext:\\s*((?:no-)?\\w+)-format/', $comment, $r)) {
                if ('no-' === substr($r[1], 0, 3)) {
                    $entry['format'] = false;
                } else {
                    $entry['format'] = $r[1];
                }
                $comment = str_replace($r[0], '', $comment);
                $parse_printf = false;
            }
            $entry['notes'] = loco_parse_comment($comment);
        }
        if ($parse_printf && loco_sniff_printf($msgid)) {
            $entry['format'] = 'php';
            $parse_printf = false;
        }
        $index = $this->pushMsgid($key, $entry, $domain);
        if (is_int($p) && isset($args[$p])) {
            $msgid_plural = $args[$p];
            $entry = array('id' => '', 'source' => $msgid_plural, 'target' => '', 'plural' => 1, 'parent' => $index);
            if ($parse_printf && loco_sniff_printf($msgid_plural)) {
                $this->exp[$index]['format'] = 'php';
            }
            $pkey = $key . '';
            if (isset($this->reg[$pkey])) {
                $plural_index = $this->reg[$pkey];
                $this->exp[$plural_index] = $entry;
            } else {
                $plural_index = count($this->exp);
                $this->reg[$pkey] = $plural_index;
                $this->exp[] = $entry;
            }
        }
        return $index;
    }
    public function filter($domain, $default = 'default')
    {
        $raw = array(array('id' => '', 'source' => '', 'target' => ''));
        $map = array();
        $newOffset = 1;
        foreach ($this->exp as $oldOffset => $r) {
            if (isset($r['parent'])) {
                if (isset($map[$r['parent']])) {
                    $r['parent'] = $map[$r['parent']];
                    $raw[$newOffset++] = $r;
                }
            } else {
                if (empty($r['domain'])) {
                    $d = $default;
                } else {
                    $d = $r['domain'];
                }
                if ($d === $domain) {
                    $map[$oldOffset] = $newOffset;
                    $raw[$newOffset++] = $r;
                }
            }
        }
        return $raw;
    }
    public function get_xgettext($input = '-')
    {
        $cmd = defined('WHICH_XGETTEXT') ? WHICH_XGETTEXT : 'xgettext';
        $cmd .= ' -LPHP -c -o-';
        if ($k = $this->get_xgettext_keywords()) {
            $cmd .= ' -k' . implode(' -k', $k);
        }
        return $cmd . ' ' . $input;
    }
    public function get_xgettext_keywords()
    {
        $ks = array();
        foreach ($this->rules as $word => $rule) {
            $s = strpos($rule, 's');
            $k = $word . ':' . ++$s;
            if (false !== ($p = strpos($rule, 'p'))) {
                $k .= ',' . ++$p;
            }
            if (false !== ($p = strpos($rule, 'c'))) {
                $k .= ',' . ++$p . 'c';
            }
            $ks[] = $k;
        }
        return $ks;
    }
    public function getDomainCounts($default = 'default')
    {
        $copy = $this->dom;
        if ($default && isset($copy[''])) {
            if (isset($copy[$default])) {
                $copy[$default] += $copy[''];
            } else {
                $copy[$default] = $copy[''];
            }
            unset($copy['']);
        }
        return $copy;
    }
}
function loco_wp_extractor()
{
    return new LocoPHPExtractor(array('__' => 'sd', '_e' => 'sd', '_c' => 'sd', '_n' => 'sp_d', '_n_noop' => 'spd', '_nc' => 'sp_d', '__ngettext' => 'spd', '__ngettext_noop' => 'spd', '_x' => 'scd', '_ex' => 'scd', '_nx' => 'sp_cd', '_nx_noop' => 'spcd', 'esc_attr__' => 'sd', 'esc_html__' => 'sd', 'esc_attr_e' => 'sd', 'esc_html_e' => 'sd', 'esc_attr_x' => 'scd', 'esc_html_x' => 'scd'));
}
abstract class LocoPo
{
    public static function pair($key, $text, $width = 79)
    {
        if (!$text) {
            return $key . ' ""';
        }
        $text = addcslashes($text, '	\\"');
        $text = preg_replace('/\\R/u', '\\n
', $text, -1, $nbr);
        if ($nbr) {
        } else {
            if ($width && $width < mb_strlen($text, 'UTF-8') + strlen($key) + 3) {
            } else {
                return $key . ' "' . $text . '"';
            }
        }
        $lines = array($key . ' "');
        if ($width) {
            $width -= 2;
            $a = '/^.{1,' . ($width - 1) . '}[-– \\.,:;\\?!\\)\\]\\}\\>]/u';
            $b = '/^[^-– \\.,:;\\?!\\)\\]\\}\\>]+/u';
            foreach (explode('
', $text) as $unwrapped) {
                $length = mb_strlen($unwrapped, 'UTF-8');
                while ($length > $width) {
                    if (preg_match($a, $unwrapped, $r)) {
                        $line = $r[0];
                    } else {
                        if (preg_match($b, $unwrapped, $r)) {
                            $line = $r[0];
                        } else {
                            throw new Exception('Wrapping error');
                        }
                    }
                    $lines[] = $line;
                    $trunc = mb_strlen($line, 'UTF-8');
                    $length -= $trunc;
                    $unwrapped = substr($unwrapped, strlen($line));
                    if (false === $unwrapped && 0 !== $length || 0 === $length && false !== $unwrapped) {
                        throw new Exception('Truncation error');
                    }
                }
                if (0 !== $length) {
                    $lines[] = $unwrapped;
                }
            }
        } else {
            foreach (explode('
', $text) as $unwrapped) {
                $lines[] = $unwrapped;
            }
        }
        return implode('"
"', $lines) . '"';
    }
    public static function refs($text, $width = 76)
    {
        $text = preg_replace('/[ \\r\\n]+/', ' ', $text);
        return '#: ' . wordwrap($text, $width, ' 
#: ', false);
    }
    public static function prefix($text, $prefix)
    {
        $lines = preg_split('/\\R/u', $text, -1);
        return $prefix . implode('
' . $prefix, $lines);
    }
}
class LocoPoIterator implements Iterator
{
    private $po;
    private $headers;
    private $i;
    private $t;
    private $j;
    private $m;
    public function __construct($po)
    {
        $this->po = $po;
        $this->t = count($po);
        if (!isset($po[0])) {
            throw new InvalidArgumentException('Empty PO data');
        }
    }
    public function rewind()
    {
        $this->i = 0;
        $this->j = -1;
        $this->next();
    }
    public function key()
    {
        return $this->j;
    }
    public function valid()
    {
        return is_int($this->i);
    }
    public function next()
    {
        $i = $this->i;
        while (++$i < $this->t) {
            $this->j++;
            $this->i = $i;
            return;
        }
        $this->i = null;
        $this->j = null;
    }
    public function current()
    {
        $i = $this->i;
        $raw = $this->po[$i];
        while (isset($this->po[++$i]['parent'])) {
            $this->i = $i;
            $raw['plurals'][] = new LocoPoMessage($this->po[$i]);
        }
        return new LocoPoMessage($raw);
    }
    public function getArrayCopy()
    {
        $po = $this->po;
        $po[0]['target'] = (string) $this->getHeaders();
        return $po;
    }
    public function getHeaders()
    {
        if (!$this->headers) {
            $header = $this->po[0];
            if ('' !== $header['source'] || !empty($header['context'])) {
                throw new InvalidArgumentException('Invalid PO header');
            }
            $this->headers = loco_parse_po_headers($header['target']);
        }
        return $this->headers;
    }
    public function initPo()
    {
        unset($this->po[0]['flag']);
        return $this;
    }
    public function initPot()
    {
        $this->po[0]['flag'] = 4;
        return $this;
    }
    public function strip()
    {
        $po = $this->po;
        $i = count($po);
        while (--$i > 0) {
            $po[$i]['target'] = '';
        }
        $this->po = $po;
        return $this;
    }
    public function __toString()
    {
        $h = $this->po[0];
        $h['target'] = (string) $this->getHeaders();
        $msg = new LocoPoMessage($h);
        $s = $msg->__toString();
        foreach ($this as $msg) {
            $s .= '
' . $msg->__toString();
        }
        return $s;
    }
}
class LocoPoMessage extends ArrayObject
{
    public function __construct(array $r)
    {
        $r['key'] = $r['source'];
        parent::__construct($r);
    }
    public function __get($prop)
    {
        return isset($this[$prop]) ? $this[$prop] : null;
    }
    private function getFlag()
    {
        if ($f = $this->__get('flag')) {
            static $flags;
            if (!isset($flags)) {
                $flags = unserialize('a:1:{i:4;s:8:"#, fuzzy";}');
            }
            return $flags[$f];
        }
    }
    public function __toString()
    {
        $s = '';
        if ($text = $this->__get('comment')) {
            $s .= LocoPo::prefix($text, '# ') . '
';
        }
        if ($text = $this->__get('notes')) {
            $s .= LocoPo::prefix($text, '#. ') . '
';
        }
        if ($text = $this->__get('refs')) {
            $s .= LocoPo::refs($text) . '
';
        }
        if ($text = $this->getFlag()) {
            $s .= $text . '
';
        }
        if ($text = $this->__get('context')) {
            $s .= LocoPo::pair('msgctxt', $text) . '
';
        }
        $s .= LocoPo::pair('msgid', $this['key']) . '
';
        $target = $this['target'];
        if (is_array($plurals = $this->__get('plurals'))) {
            if ($plurals) {
                foreach ($plurals as $i => $p) {
                    if (0 === $i) {
                        $s .= LocoPo::pair('msgid_plural', $p['key']) . '
';
                        $s .= LocoPo::pair('msgstr[0]', $target) . '
';
                    }
                    $s .= LocoPo::pair('msgstr[' . ++$i . ']', $p['target']) . '
';
                }
            } else {
                if (isset($this['plural_key'])) {
                    $s .= LocoPo::pair('msgid_plural', $this['plural_key']) . '
';
                    $s .= LocoPo::pair('msgstr[0]', $target) . '
';
                } else {
                    trigger_error('Missing plural_key in zero plural export');
                    $s .= LocoPo::pair('msgstr', $target) . '
';
                }
            }
        } else {
            $s .= LocoPo::pair('msgstr', $target) . '
';
        }
        return $s;
    }
}
class LocoMo
{
    private $bin;
    private $msgs;
    private $head;
    private $hash;
    private $use_fuzzy = false;
    public function __construct(Iterator $export, Iterator $head = null)
    {
        if ($head) {
            $this->head = $head;
        } else {
            $this->head = new LocoHeaders(array('Project-Id-Version' => 'Loco', 'Language' => 'English', 'Plural-Forms' => 'nplurals=2; plural=(n!=1);', 'MIME-Version' => '1.0', 'Content-Type' => 'text/plain; charset=UTF-8', 'Content-Transfer-Encoding' => '8bit', 'X-Generator' => 'Loco ' . PLUG_HTTP_ADDR));
        }
        $this->msgs = $export;
        $this->bin = '';
    }
    public function enableHash()
    {
        return $this->hash = new LocoMoTable();
    }
    public function useFuzzy()
    {
        $this->use_fuzzy = true;
    }
    public function setHeader($key, $val)
    {
        $this->head->add($key, $val);
        return $this;
    }
    public function setProject(LocoProject $Proj)
    {
        return $this->setHeader('Project-Id-Version', $Proj->proj_name)->setHeader($key, $val);
    }
    public function setLocale(LocoProjectLocale $Loc)
    {
        return $this->setHeader('Language', $Loc->label)->setHeader('Plural-Forms', (string) $Loc->getPlurals());
    }
    public function count()
    {
        return count($this->msgs);
    }
    public function compile()
    {
        $table = array('');
        $sources = array('');
        $targets = array((string) $this->head);
        $fuzzy_flag = 4;
        $skip_fuzzy = !$this->use_fuzzy;
        foreach ($this->msgs as $r) {
            if (isset($r['flag']) && $skip_fuzzy && $fuzzy_flag === $r['flag']) {
                continue;
            }
            $msgid = $r['key'];
            if (isset($r['context']) && $r['context']) {
                $msgid or $msgid = '(' . $r['context'] . ')';
                $msgid = $r['context'] . '' . $msgid;
            }
            if (!$msgid) {
                continue;
            }
            $msgstr = $r['target'];
            if (!$msgstr) {
                continue;
            }
            $table[] = $msgid;
            if (isset($r['plurals'])) {
                foreach ($r['plurals'] as $i => $p) {
                    if ($i === 0) {
                        $msgid .= ' ' . $p['key'];
                    }
                    $msgstr .= ' ' . $p['target'];
                }
            }
            $sources[] = $msgid;
            $targets[] = $msgstr;
        }
        asort($sources, SORT_STRING);
        $this->bin = '';
        $this->writeInteger(2500072158);
        $this->writeInteger(0);
        $n = count($sources);
        $this->writeInteger($n);
        $offset = 28;
        $this->writeInteger($offset);
        $offset += $n * 8;
        $this->writeInteger($offset);
        if ($this->hash) {
            sort($table, SORT_STRING);
            $this->hash->compile($table);
            $s = $this->hash->count();
        } else {
            $s = 0;
        }
        $this->writeInteger($s);
        $offset += $n * 8;
        $this->writeInteger($offset);
        if ($s) {
            $offset += $s * 4;
        }
        $source = '';
        foreach ($sources as $i => $str) {
            $source .= $str . ' ';
            $this->writeInteger($strlen = strlen($str));
            $this->writeInteger($offset);
            $offset += $strlen + 1;
        }
        $target = '';
        foreach (array_keys($sources) as $i) {
            $str = $targets[$i];
            $target .= $str . ' ';
            $this->writeInteger($strlen = strlen($str));
            $this->writeInteger($offset);
            $offset += $strlen + 1;
        }
        if ($this->hash) {
            $this->bin .= $this->hash->__toString();
        }
        $this->bin .= $source;
        $this->bin .= $target;
        return $this->bin;
    }
    private function writeInteger($num)
    {
        $this->bin .= pack('V', $num);
        return $this;
    }
}
function loco_print_percent($n, $t)
{
    $s = loco_string_percent((int) $n, (int) $t);
    echo $s, '%';
    return '';
}
function loco_print_progress($translated, $untranslated, $flagged)
{
    $total = $translated + $untranslated;
    $complete = loco_string_percent($translated - $flagged, $total);
    $class = 'progress';
    if (!$translated && !$flagged) {
        $class .= ' empty';
    }
    echo '<div class="', $class, '"><div class="t">';
    if ($flagged) {
        $s = loco_string_percent($flagged, $total);
        echo '<div class="bar f" style="width:', $s, '%">&nbsp;</div>';
    }
    if ('0' === $complete) {
        echo '&nbsp;';
    } else {
        $class = 'bar p';
        $p = (int) $complete;
        $class .= sprintf(' p-%u', 10 * floor($p / 10));
        $style = 'width:' . $complete . '%';
        if ($flagged) {
            $remain = 100.0 - (double) $s;
            $style .= '; max-width: ' . sprintf('%s', $remain) . '%';
        }
        echo '<div class="', $class, '" style="' . $style . '">&nbsp;</div>';
    }
    echo '</div><div class="l">', $complete, '%</div></div>';
    return '';
}
function loco_string_percent($n, $t)
{
    if (!$t || !$n) {
        $s = '0';
    } else {
        if ($t === $n) {
            $s = '100';
        } else {
            $dp = 0;
            $n = 100 * $n / $t;
            if ($n > 99) {
                $n = min($n, 99.98999999999999);
                do {
                    $s = number_format($n, ++$dp);
                } while ('100' === substr($s, 0, 3) && $dp < 2);
            } else {
                if ($n < 0.5) {
                    $n = max($n, 0.0001);
                    do {
                        $s = number_format($n, ++$dp);
                    } while (preg_match('/^0\\.0+$/', $s) && $dp < 4);
                } else {
                    $s = number_format($n, $dp);
                }
            }
        }
    }
    return $s;
}