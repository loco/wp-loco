<?php
/**
 * Called from Loco_cli_Commands::extract
 */
abstract class Loco_cli_ExtractCommand {

    /**
     * @param Loco_package_Project[] project filter
     * @param bool whether dry run
     */
    public static function run( array $projects, $noop = true ){

        // track total number of POT files synced
        $updated = 0;
        $content_dir = loco_constant('WP_CONTENT_DIR');

        /* @var Loco_package_Project $project */
        foreach( $projects as $project ){
            $id = rtrim( $project->getId(), '.' );
            WP_CLI::log( sprintf('Extracting "%s" (%s)',$project->getName(),$id) );
            // POT file may or may not exist currently
            $potfile = $project->getPot();
            if( ! $potfile ){
                WP_CLI::warning('Skipping undefined POT');
                continue;
            }
            if( $potfile->locked() ){
                WP_CLI::warning('Skipping unwritable POT');
                Loco_cli_Utils::tabulateFiles( $potfile->getParent(), $potfile );
                continue;
            }
            // Do extraction and grab only given domain's strings
            $ext = new Loco_gettext_Extraction( $project->getBundle() );
            $domain = $project->getDomain()->getName();
            $data = $ext->addProject($project)->includeMeta()->getTemplate( $domain );
            Loco_cli_Utils::debug('Extraction OK, %u strings', count($data) );
            $list = $ext->getSkipped();
            if( $list ){
                $current = Loco_data_Settings::get()->max_php_size;
                $suggest = ceil( $ext->getMaxPhpSize() / 1024 );
                WP_CLI::warning(sprintf('%u source files skipped over %s. Consider running with --maxsize=%uK',count($list),$current,$suggest) );
                foreach( $list as $file ) {
                    $f = new Loco_mvc_FileParams(array(),$file);
                    Loco_cli_Utils::debug('%s (%s)', $f->relpath, $f->size );
                }
            }
            // if POT exists check if update is necessary.
            $data->sort();
            if( $potfile->exists() ){
                try {
                    Loco_cli_Utils::debug('Checking if sources have changed since '.date('c',$potfile->modified()) );
                    $prev = Loco_gettext_Data::fromSource( $potfile->getContents() );
                    if( $prev->equal($data) ){
                        WP_CLI::log('No update required for '.$potfile->basename() );
                        continue;
                    }
                }
                catch( Loco_error_ParseException $e ){
                    Loco_cli_Utils::debug( $e->getMessage().' in '.$potfile->basename() );
                }
            }

            if( $noop ){
                WP_CLI::success( sprintf('**DRY RUN** would update %s', $potfile->basename() ) );
                continue;
            }

            // additional headers to set in new POT file
            $head = $data->getHeaders();
            $head['Project-Id-Version'] = $project->getName();

            // write POT file to disk returning byte length
            Loco_cli_Utils::debug('Writing POT file...');
            $bytes = $potfile->putContents( $data->msgcat(false) );
            Loco_cli_Utils::debug(' %u bytes written to %s',$bytes, $potfile->getRelativePath($content_dir) );
            WP_CLI::success( sprintf('Updated %s', $potfile->basename() ) );
            $updated++;
        }

        // sync summary
        if( 0 === $updated ){
            WP_CLI::log('Nothing updated');
        }
        else {
            WP_CLI::success( sprintf('%u POT files written',$updated) );
        }

    }
    
}