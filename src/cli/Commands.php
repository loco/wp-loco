<?php
/**
 * Loco Translate commands
 */
class Loco_cli_Commands {


    /**
     * Sync translation files with the available source strings
     * 
     * ## OPTIONS
     * 
     * [<filter>]
     * : Restrict to a type of bundle (plugins|themes|core) or a specific Text Domain
     * 
     * [--locale=<code>]
     * : Restrict to one or more locales. Separate multiple codes with commas.
     * 
     * [--fuzziness=<percent>]
     * : Override plugin settings for fuzzy matching tolerance (0-100).
     * 
     * [--noop]
     * : Specify dry run. Makes no changes on disk.
     * 
     * ## EXAMPLES
     * 
     * wp loco sync plugins
     * 
     * 
     * @param string[]
     * @param string[]
     * @codeCoverageIgnore
     */
    public function sync( $args, $opts ){
        if( array_key_exists('fuzziness',$opts) ){
            Loco_data_Settings::get()->fuzziness = (int) $opts['fuzziness'];
        }
        try {
            Loco_cli_SyncCommand::run (
                Loco_cli_Utils::collectProjects( isset($args[0]) ? $args[0] : '' ),
                Loco_cli_Utils::collectLocales( isset($opts['locale']) ? $opts['locale'] : '' ),
                Loco_cli_Utils::bool($opts,'noop')
            );
        }
        catch( Loco_error_Exception $e ){
            WP_CLI::error( $e->getMessage() );
        }
    }


    /**
     * Extract available source strings
     * 
     * ## OPTIONS
     * 
     * [<filter>]
     * : Restrict to a type of bundle (plugins|themes|core) or a specific Text Domain
     * 
     * [--maxsize=<size>]
     * : Override plugin settings for maximum PHP file size
     * 
     * [--noop]
     * : Specify dry run. Makes no changes on disk.
     * 
     * ## EXAMPLES
     *
     * wp loco extract core --maxsize=400K
     *
     * @param string[]
     * @param string[]
     * @codeCoverageIgnore
     */
    public function extract( $args, $opts ){
        try {
            if( array_key_exists('maxsize',$opts) ){
                Loco_data_Settings::get()->max_php_size = $opts['maxsize'];
            }
            Loco_cli_ExtractCommand::run (
                Loco_cli_Utils::collectProjects( isset($args[0]) ? $args[0] : '' ),
                Loco_cli_Utils::bool($opts,'noop')
            );
        }
        catch( Loco_error_Exception $e ){
            WP_CLI::error( $e->getMessage() );
        }
    }
    

}
    