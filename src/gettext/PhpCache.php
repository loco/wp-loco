<?php
/**
 * This saves the overhead of parsing a MO file when we already have it in memory,
 * but lets us use WordPress's compact var_export utility so its files are identical.
 */
class Loco_gettext_PhpCache extends WP_Translation_File_PHP {


    /**
     * @return string
     */
    public static function convert( Loco_gettext_Data $po ){
        $me = new Loco_gettext_PhpCache('');
        $me->headers = self::exportHeaders($po);
        $me->entries = self::exportEntries($po);
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
        // $max = preg_match('/^nplurals=(\\d)/',$po->getHeaders()->offsetGet('plural-forms'),$r) ? $r[1] : 0;
        /* @var LocoPoMessage $message */
        foreach( $po as $message ){
            $a[ $message->getKey() ] = implode("\0", $message->exportSerial() );
        }
        return $a;
    }
    
}
