<?php
/**
 * Sync/Merge utility akin to msgmerge
 */
class Loco_gettext_Matcher extends LocoFuzzyMatcher {

    /**
     * Whether copying translation from source references (normally for a POT we won't)
     * @var bool
     */
    private $translate;

    /**
     * Number of translations pulled from source (when source is PO)
     * @var int
     */
    private $translated;

    /**
     * @var Loco_package_Project
     */
    private $project;

    /**
     * @var array[]|null
     */
    private $hashes;
    
    

    public function __construct( Loco_package_Project $project ){
        $this->project = $project;
    }


    /**
     * Initialize matcher with current valid source strings (ref.pot)
     * @param Loco_gettext_Data $pot POT reference
     * @param bool $translate Whether copying translations from reference data
     * @return int
     */
    public function loadRefs( Loco_gettext_Data $pot, $translate = false ){
        $ntotal = 0;
        $this->translate = (bool) $translate;
        $this->translated = 0;
        /* @var LocoPoMessage $new */
        foreach( $pot as $new ){
            $ntotal++;
            $this->add($new);
        }
        return $ntotal;
    }


    /**
     * Perform a reverse lookup for a file reference from its pre-computed hash
     */
    private function findScript( $hash ){
        $map = $this->hashes;
        // build full index of all script hashes under configured source locations.
        if( is_null($map) ){
            $map = [];
            $scripts = clone $this->project->getSourceFinder();
            $scripts->filterExtensions(['js']);
            $basepath = $this->project->getBundle()->getDirectoryPath();
            /* @var Loco_fs_File $jsfile */
            foreach( $scripts->export() as $jsfile ){
                $ref = $jsfile->getRelativePath($basepath);
                if( substr($ref,-7) === '.min.js' ) {
                    $ref = substr($ref,0,-7).'.js';
                }
                $map[ md5($ref) ] = $ref;
            }
            $this->hashes = $map;
        }
        return array_key_exists($hash,$map) ? $map[$hash] : '';
    }


    /**
     * Add further source strings from JSON/JED file
     * @param Loco_fs_File $file json file
     * @return int
     */
    private function loadJson( Loco_fs_File $file ){
        $unique = 0;
        $jed = json_decode( $file->getContents(), true );
        if( ! is_array($jed) || ! array_key_exists('locale_data',$jed) || ! is_array($jed['locale_data']) ){
            throw new Loco_error_Debug( $file->basename().' is not JED formatted');
        }
        // without a file reference, strings will never be compiled back to the correct JSON.
        // if missing from JED, we'll attempt reverse match from scripts found on disk. 
        $ref = array_key_exists('source',$jed) ? $jed['source'] : '';
        if( '' === $ref || ! is_string($ref) ){
            $name = $file->basename();
            $ref = preg_match('/-([0-9a-f]{32})\\.json$/',$name,$r) ? $this->findScript($r[1]) : '';
            if( '' === $ref ){
                throw new Loco_error_Debug($name.' has no "source" key; script is unknown');
            }
            // The hash is pre-computed and .js file is known to exist, so we'll skip filters here.
            // The compiler will still filter this reference, so it could potentially yield a different hash. 
            Loco_error_AdminNotices::debug($name.' has no "source" key; reverse matched '.$ref);
        }
        // file reference most likely won't have a line number, as it applies to all strings in the JSON
        // As most deployed JavaScript will be minified, we probably only have one line anyway.
        // $ref .= ':1';
        // not checking domain key. Should be valid if passed here and should only be one.
        foreach( $jed['locale_data'] as /*$domain =>*/ $keys ){
            foreach( $keys as $msgid => $arr ){
                if( '' === $msgid || ! is_array($arr) || ! isset($arr[0]) ){
                    continue;
                }
                $msgctxt = '';
                // Unglue "msgctxt\4msgid" unique key
                $parts = explode("\4",$msgid,2);
                if( array_key_exists(1,$parts) ){
                    list($msgctxt,$msgid) = $parts;
                    // TODO handle empty msgid case that uses weird "msgctxt\4(msgctxt)" format?
                }
                // string may exist in original template, and also in multiple JSONs.
                $new = ['source'=>$msgid,'context'=>$msgctxt,'refs'=>$ref ];
                $old = $this->getArrayRef($new);
                if( $old ){
                    $refs = array_key_exists('refs',$old) ? (string) $old['refs'] : '';
                    if( '' === $refs ){
                        $old['refs'] = $ref;
                    }
                    else if( 0 === preg_match('/\\b'.preg_quote($ref,'/').'\\b/',$refs) ){
                        $old['refs'].= ' '.$ref;
                    }
                    $new = $old;
                }
                else {
                    $unique++;
                }
                // Add translation from JSON only if not present in merged PO already
                if( $this->translate && ( ! array_key_exists('target',$new) || '' === $new['target'] ) ){
                    $new['target'] = $arr[0];
                }
                $message = new LocoPoMessage($new);
                $this->add($message);
                // handle plurals, noting that msgid_plural is not stored in JED structure
                if( 1 < count($arr) ){
                    $index = 0;
                    $plurals = $old && array_key_exists('plurals',$old) ? $old['plurals'] : [];
                    while( array_key_exists(++$index,$arr) ){
                        if( array_key_exists($index,$plurals) ){
                            $raw = $plurals[$index];
                            if( $raw instanceof ArrayObject ){
                                $raw = $raw->getArrayCopy();
                            }
                        }
                        else {
                            $raw = ['source'=>'','target'=>''];
                        }
                        if( $this->translate && ( ! array_key_exists('target',$raw) || '' === $raw['target'] ) ){
                            $raw['target'] = $arr[$index];
                        }
                        // use translation as missing msgid_plural only if msgid matches msgstr (English file)
                        if( 1 === $index && '' === $raw['source'] ){
                            if( $arr[0] === $msgid ){
                                $raw['source'] = $arr[1];
                            }
                            /*else {
                                Loco_error_AdminNotices::debug('msgid_plural missing for msgid '.json_encode($msgid) );
                            }*/
                        }
                        $plurals[$index] = new LocoPoMessage($raw);
                    }
                    $message['plurals'] = $plurals;
                }
            }
        }
        return $unique;
    }


    /**
     * Shortcut for loading multiple jsons with error tolerance
     * @param Loco_fs_File[] $jsons
     * @return int
     */
    public function loadJsons( array $jsons ){
        $n = 0;
        foreach( $jsons as $jsonfile ){
            try {
                $n += $this->loadJson($jsonfile);
            }
            catch( Loco_error_Exception $e ){
                Loco_error_AdminNotices::add($e);
            }
        }
        return $n;
    }


    /**
     * Update still-valid sources, deferring unmatched (new strings) for deferred fuzzy match
     * @param LocoPoIterator $original Existing definitions
     * @param LocoPoIterator $merged Resultant definitions
     * @return string[] keys matched exactly
     */
    public function mergeValid( LocoPoIterator $original, LocoPoIterator $merged ){
        $valid = [];
        $translate = $this->translate;
        /* @var LocoPoMessage $old */
        foreach( $original as $old ){
            $new = $this->match($old);
            // if existing source is still valid, merge any changes
            if( $new instanceof LocoPoMessage ){
                $p = clone $old;
                $p->merge($new,$translate);
                $merged->push($p);
                $valid[] = $p->getKey();
                // increment counter if translation was merged
                if( $translate && ! $old->translated() ){
                    $this->translated += $new->translated();
                }
            }
        }
        return $valid;
    }


    /**
     * Perform fuzzy matching after all exact matches have been attempted
     * @param LocoPoIterator $merged Resultant definitions 
     * @return string[] strings fuzzy-matched
     */
    public function mergeFuzzy( LocoPoIterator $merged ){
        $fuzzy = [];
        foreach( $this->getFuzzyMatches() as $pair ){
            list($old,$new) = $pair;
            $p = clone $old;
            $p->merge($new);
            $merged->push($p);
            $fuzzy[] = $p->getKey();
        }
        return $fuzzy;
    }


    /**
     * Add unmatched strings remaining as NEW source strings
     * @param LocoPoIterator $merged Resultant definitions to accept new strings
     * @return string[] strings added
     */
    public function mergeAdded( LocoPoIterator $merged ){
        $added = [];
        $translate = $this->translate;
        /* @var LocoPoMessage $new */
        foreach( $this->unmatched() as $new ){
            $p = clone $new;
            // remove translations unless configured to keep
            if( $p->translated() && ! $translate ){
                $p->strip();
            }
            $merged->push($p);
            $added[] = $p->getKey();
        }
        return $added;
    }


    /**
     * Perform full merge and return result suitable from front end.
     * @param LocoPoIterator $original Existing definitions
     * @param LocoPoIterator $merged Resultant definitions
     * @return array result
     */
    public function merge( LocoPoIterator $original, LocoPoIterator $merged ){
        $this->mergeValid($original,$merged);
        $fuzzy = $this->mergeFuzzy($merged);
        $added = $this->mergeAdded($merged);
        /* @var LocoPoMessage $old */
        $dropped = [];
        foreach( $this->redundant() as $old ){
            $dropped[] = $old->getKey();
        }
        // return to JavaScript with stats in the same form as old front end merge
        return  [
            'add' => $added,
            'fuz' => $fuzzy,
            'del' => $dropped,
            'trn' => $this->translated,
        ];
    }


    /**
     * @param array $a
     * @return array
     */
    private function getArrayRef( array $a ){
        $r = $this->getRef($a);
        if( is_null($r) ){
            return [];
        }
        if( $r instanceof ArrayObject ){
            return $r->getArrayCopy();
        }
        throw new Exception( (is_object($r)?get_class($r):gettype($r) ).' returned from '.get_class($this).'::getRef');
    }

}
