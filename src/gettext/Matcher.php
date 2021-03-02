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
        // return to JavaScript with stats in the same form as old front end merge
        return array (
            'add' => $added,
            'fuz' => $fuzzy,
            'del' => $dropped,
        );
    }

}
