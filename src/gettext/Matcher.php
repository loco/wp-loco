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
     * JSON file paths that have been processed, indexed by their unminified relative PO file reference
     * @var int[]
     */
    private $jsons;

    /**
     * Base path[s] for merged PO file siblings e.g. "/path/to/folder/my-domain-en_GB"
     * @var string[]
     */
    private $basepaths;

    /**
     * Text domain of current merge operation
     * @var string
     */
    private $domain;

    /**
     * Cache of translations found in compiled files (JSON/MO)
     * @var array[]
     */
    private $compiled;

    
    /**
     * @param Loco_package_Project
     */
    public function __construct( Loco_package_Project $project ){
        $this->domain = (string) $project->getDomain();
    }


    /**
     * Set a base path for file siblings being operated on
     * @param Loco_fs_File
     * @return self
     */
    public function setPath( Loco_fs_File $po ){
        $this->jsons = array();
        $this->compiled = array();
        $this->basepaths = array();
        return $this->addPath($po);
    }


    /**
     * Add an additional base bath to try when looking for siblings
     * @param Loco_fs_File
     * @return self
     */
    public function addPath( Loco_fs_File $po ){
        $this->basepaths[] = $po->dirname().'/'.$po->filename();
        return $this;
    }


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
                // allow untranslated script translation to pick up from compiled siblings, regardless of "translate" setting.
                if( ! $p->translated() ){
                    $this->inheritCompiled($p);
                }
                $merged->push($p);
                $valid[] = $p->getKey();
            }
        }
        return $valid;
    }


    /**
     * Pull script translations that were purged from PO but sitting in JSON files.
     * This is separate from mergeAdded because it should be run before mergeFuzzy
     * @param LocoPoIterator Resultant definitions
     * @return string[]
     */
    public function mergePurged( LocoPoIterator $merged ){
        $found = array();
        /* @var LocoPoMessage $new */
        foreach( $this->unmatched() as $new ){
            // a new string could be translated if we were copying from PO source instead of POT
            if( $new->translated() ){
                continue;
            }
            // message will be added as new/empty later unless we can find an existing JSON translation
            $p = clone $new;
            if( $this->inheritCompiled($p) ){
                $merged->push($p);
                $found[] = $p->getKey();
                // ensure missing string is not added as a new string later on.
                if( $new !== $this->match($new) ){
                    throw new LogicException('Unexpected condition'); // @codeCoverageIgnore
                }
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
     * Attempt to translate message from a compiled source.
     * TODO Search MO file as well as JSON files
     * @param LocoPoMessage untranslated message
     * @return bool whether modified
     */
    public function inheritCompiled( LocoPoMessage $p ){
        $key = $p->getKey();
        // all translated strings will be added to this, so each compiled file is only ever parsed once
        while( ! array_key_exists($key,$this->compiled) ){
            // find in first matching script translation file
            foreach( $this->parseScriptRefs($p) as $ref ){
                if( $this->cacheJed($ref) && array_key_exists($key,$this->compiled) ){
                    break 2;
                }
            }
            // not found
            return false;
        }
        // key is cached and can be added to copy of this message
        $translations = $this->compiled[$key];
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
        return true;
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


    /**
     * Add translations for this script to our cache of compiled keys
     * @param string script reference
     * @return int number of new translations cached
     */
    public function cacheJed( $ref ){
        $found = 0;
        // TODO allow loco_compile_single_json filter to specify path
        if( array_key_exists($ref,$this->jsons) ){
            return $found; // already processed this
        }
        // base path is required for locating JSONs related to current PO.
        $basepaths = $this->basepaths;
        if( is_null($basepaths) ){
            throw new RuntimeException('Cannot resolve JSON files without a base path');
        }
        // TODO allow load_script_textdomain_relative_path to modify the relative path
        foreach( array_unique($basepaths) as $basepath ){
            $file = new Loco_fs_File( $basepath.'-'.md5($ref).'.json' );
            if( $file->exists() ){
                foreach( $this->parseJed($file->getContents()) as $key => $translations ){
                    if( array_key_exists($key,$this->compiled) ){
                        /*if( $this->compiled[$key] !== $translations ){
                            trigger_error('Duplicate key has different translations in JSON',E_USER_WARNING);
                        }*/
                        continue;
                    }
                    if( is_array($translations) && array_key_exists(0,$translations) ) {
                        $target = (string) $translations[0];
                        if( '' !== $target ){
                            $this->compiled[$key] = $translations;
                            $found++;
                        }
                    }
                }
            }
        }
        // mark JSON as processed, whether exists or otherwise
        $this->jsons[$ref] = $found;
        return $found;
    }


    /**
     * @param string JED file contents
     * @return array [locale_data][messages]
     */
    private function parseJed($json){
        $data = json_decode($json,true);
        if( is_array($data) ){
            $domains = array();
            // priority to specified domain in envelope
            if( array_key_exists('domain',$data) ){
                $domains[ $data['domain'] ] = null;
            }
            // fall back to configured domain
            if( $this->domain ){
                $domains[ $this->domain ] = null;
            }
            // final fall back to "messages" domain
            $domains['messages'] = null;
            foreach( $domains as $domain => $null ){
                if( isset($data['locale_data'][$domain]) ){
                    $locale_data = $data['locale_data'][$domain];
                    // only returning first text domain. multiple domains unexpected.
                    if( is_array($locale_data) ){
                        return $locale_data;
                    }
                }
            }
        }
        return array();
    }

}
