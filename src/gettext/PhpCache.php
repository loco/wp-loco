<?php
/**
 * This saves the overhead of parsing a MO file when we already have it in memory,
 * but lets us use WordPress's compact var_export utility so its files are identical to ours.
 */
class Loco_gettext_PhpCache extends WP_Translation_File_PHP {

    /**
     * @return string
     */
    public static function render( Loco_gettext_Data $po ){
        $me = new Loco_gettext_PhpCache('');
        $me->headers = self::exportHeaders($po);
        $me->entries = self::exportEntries($po);
        // TODO support Loco_data_Settings::get()->php_pretty
        return $me->export();
    }


    private static function exportHeaders( Loco_gettext_Data $po ){
        $a = [];
        foreach( $po->getHeaders() as $key => $value ){
            $a[ strtolower($key) ] = (string) $value;
        }
        return $a;
    }


    private static function exportEntries( Loco_gettext_Data $po ){
        $a = [];
        $skip_fuzzy = ! Loco_data_Settings::get()->use_fuzzy;
        // $max = preg_match('/^nplurals=(\\d)/',$po->getHeaders()->offsetGet('plural-forms'),$r) ? $r[1] : 0;
        /* @var LocoPoMessage $message */
        foreach( $po as $message ){
            if( $skip_fuzzy && 4 === $message->__get('flag') ){
                continue;
            }
            // Like JED, we must follow MO sparseness. Else empty strings will be merged on top of translations.
            // TODO what should we do about partial completion of pluralized messages? 
            if( $message->translated() ) {
                $a[ $message->getKey() ] = implode( "\0", $message->exportSerial() );
            }
        }
        return $a;
    }


    /*private function prettyExport() {
        return '<?php' . PHP_EOL . 'return ' . var_export($this->headers + ['messages'=>$this->entries],true) . ';' . PHP_EOL;
    }*/
    
    
    
}
