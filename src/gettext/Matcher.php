<?php
/**
 * 
 */
class Loco_gettext_Matcher extends LocoFuzzyMatcher {


    /**
     * Cache of unique JS source file references mapped to hashed file name
     * @var string[]
     *
    private $js = array();*/


    /**
     * Initialize matcher with current valid source strings (ref.pot)
     * @param Loco_gettext_Data
     * @return int
     */
    public function loadRefs( Loco_gettext_Data $pot ){
        $ntotal = 0;
        /* @var LocoPoMessage $new */
        foreach( $pot as $new ){
            $ntotal++;
            $this->add($new);
            /*/ Log JS references as they may need resolving if PO was purged??
            $refs = (string) $new->refs;
            if( $refs && preg_match_all('/(\\S*\\.js):\\d+/',$refs,$jsrefs) ){
                foreach( $jsrefs[1] as $ref ){
                    if( substr($ref,-7) === '.min.js' ) {
                        $ref = substr($ref,-7).'.js';
                    }
                    $this->js[$ref] = null;
                }
            }*/
        }
        return $ntotal;
    }

}