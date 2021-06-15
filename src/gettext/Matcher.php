<?php
/**
 * Sync/Merge utility akin to msgmerge
 */
class Loco_gettext_Matcher extends LocoFuzzyMatcher {

    /**
     * Whether copying translation from source references (normally for a POT we won't)
     * @var bool
     */
    private $translate = false;


    /**
     * Initialize matcher with current valid source strings (ref.pot)
     * @param Loco_gettext_Data POT reference
     * @param bool whether copying translations from reference data
     * @return int
     */
    public function loadRefs( Loco_gettext_Data $pot, $translate = false ){
        $ntotal = 0;
        $this->translate = (bool) $translate;
        /* @var LocoPoMessage $new */
        foreach( $pot as $new ){
            $ntotal++;
            $this->add($new);
        }
        return $ntotal;
    }


    /**
     * Add further source strings from JSON/JED file
     * @param Loco_fs_File json file
     * @return int
     */
    public function loadJson( Loco_fs_File $file ){
        $unique = 0;
        // TODO encapsulate a lot of this into a LocoJedMessage or LocoJedIterator class?
        $jed = json_decode( $file->getContents(), true );
        if( ! is_array($jed) || ! array_key_exists('locale_data',$jed) || ! is_array($jed['locale_data']) ){
            throw new Loco_error_Debug( $file->basename().' is not JED formatted');
        }
        // Without a file reference strings will never be compiled back to the correct JSON.
        // JSON files will not contain full line references, but we may know the file at least
        if( ! array_key_exists('source',$jed) || ! $jed['source'] ){
            throw new Loco_error_Debug( $file->basename().' has no "source" key');
        }
        $ref = $jed['source'].':1';
        // not checking domain key. Should be valid if passed here and should only be one.
        foreach( $jed['locale_data'] as $domain => $keys ){
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
                $new = array('source'=>$msgid,'context'=>$msgctxt,'refs'=>$ref);
                $old = $this->getArrayRef($new);
                if( $old ){
                    $refs = array_key_exists('refs',$old) ? (string) $old['refs'] : '';
                    if( '' === $refs ){
                        $old['refs'] = $ref;
                    }
                    else {
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
                // TODO handle plurals 
                // if( 1 < count($arr) ) ....
                $this->add( new LocoPoMessage($new) );
            }
        }
        return $unique;
    }


    /**
     * Shortcut for loading multiple jsons with error tolerance
     * @param Loco_fs_File[]
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
     * @param LocoPoIterator Existing definitions
     * @param LocoPoIterator Resultant definitions
     * @return string[] keys matched exactly
     */
    public function mergeValid( LocoPoIterator $original, LocoPoIterator $merged ){
        $valid = array();
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
            }
        }
        return $valid;
    }


    /**
     * Perform fuzzy matching after all exact matches have been attempted
     * @param LocoPoIterator Resultant definitions
     * @return string[] strings fuzzy-matched
     */
    public function mergeFuzzy( LocoPoIterator $merged ){
        $fuzzy = array();
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
     * @param LocoPoIterator Resultant definitions to accept new strings
     * @return string[] strings added
     */
    public function mergeAdded( LocoPoIterator $merged ){
        $added = array();
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
     * @param LocoPoIterator Existing definitions
     * @param LocoPoIterator Resultant definitions
     * @return array result
     */
    public function merge( LocoPoIterator $original, LocoPoIterator $merged ){
        $this->mergeValid($original,$merged);
        $fuzzy = $this->mergeFuzzy($merged);
        $added = $this->mergeAdded($merged);
        /* @var LocoPoMessage $old */
        $dropped = array();
        foreach( $this->redundant() as $old ){
            $dropped[] = $old->getKey();
        }
        /*/ TODO we need to detect if valid strings have been modified when copying msgstr values
        if( $this->translate ){
            
        }*/
        // return to JavaScript with stats in the same form as old front end merge
        return array (
            'add' => $added,
            'fuz' => $fuzzy,
            'del' => $dropped,
        );
    }
    
    
    
    /**
     * @param array
     * @return array
     */
    private function getArrayRef( array $new ){
        $old = $this->getRef($new);
        if( is_null($old) ){
            return array();
        }
        if( $old instanceof ArrayObject ){
            return $old->getArrayCopy();
        }
        if( is_array($old) ){
            return $old;
        }
        throw new Exception( (is_object($old)?get_class($old):gettype($old) ).' returned from '.get_class($this).'::getRef');
    }

}
