<?php
/**
 * Sync/Merge utility akin to msgmerge
 */
class Loco_gettext_Matcher extends LocoFuzzyMatcher {

    /**
     * @var bool Whether copying translation from source references (normally for a POT we won't)
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
     * Pull script translations that were purged from PO but sitting in JSON files
     * @param Loco_fs_File PO file being merged which may have been purged
     * @param LocoPoIterator Resultant definitions
     * @return string[]
     * TODO filter json as per compiler
     */
    public function mergePurged( Loco_fs_File $pofile, LocoPoIterator $merged ){
        $found = array();
        $jsons = array();
        /* @var LocoPoMessage $new */
        foreach( $this->unmatched() as $new ){
            if( $new->translated() ){
                continue;
            }
            foreach( $this->parseScriptRefs($new) as $ref ){
                if( ! array_key_exists($ref,$jsons) ){
                    $name = $pofile->filename().'-'.md5($ref).'.json';
                    $data = json_decode( $pofile->cloneBasename($name)->getContents(),true);
                    $jsons[$ref] = $data['locale_data'][ $data['domain'] ];
                }
                $data = $jsons[$ref];
                $key = $new->getKey();
                if( ! array_key_exists($key,$data) ){
                    continue; // key not in locale_data 
                }
                $translations = $data[$key];
                if( ! $translations || ! is_array($translations) || '' === $translations[0] ) {
                    continue; // no translation under key
                }
                // translation should be usable and must be removed from new  (unmatched) queue via parent 
                if( $new !== $this->match($new) ){
                    throw new LogicException('Unexpectedly failed to match new string to itself'); // @codeCoverageIgnore
                }
                $p = clone $new;
                $p['target'] = $translations[0];
                // plural forms may also be translatable
                $plurals = $p->plurals;
                if( is_array($plurals) ){
                    foreach( $plurals as $i => $pp ){
                        if( $pp instanceof LocoPoMessage && ! $pp->translated() ){
                            $j = $i+1;
                            if( array_key_exists($j,$translations) ){
                                $pp['target'] = (string) $translations[$j];
                            }
                        }
                    }
                }
                // no need to open other JSONs. No way to know which is correct if they differ
                $found[] = $key;
                $merged->push($p);
                break;
            }
        }
        return $found;
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
     * Extract unique unminified script references from message.
     * Note that this doesn't filter on load_script_textdomain_relative_path or loco_compile_single_json. Data not in scope.
     * @param LocoPoMessage
     * @return string[]
     */
    private function parseScriptRefs( LocoPoMessage $p ){
        $refs = (string) $p->refs;
        $unique = array();
        if( $refs && preg_match_all('/(\\S*\\.jsx?):\\d+/',$refs,$jsrefs) ){
            foreach( $jsrefs[1] as $ref ){
                if( substr($ref,-7) === '.min.js' ) {
                    $ref = substr($ref,-7).'.js';
                }
                $unique[$ref] = null;
            }
        }
        return array_keys($unique);
    }

}