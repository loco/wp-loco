<?php
/**
 * Called from Loco_cli_Commands::sync
 */
abstract class Loco_cli_SyncCommand {
   

    /**
     * @param Loco_package_Project[] project filter
     * @param Loco_Locale[] locale filter
     * @param bool whether dry run
     * @param bool whether to always update
     */
    public static function run( array $projects, array $locales, $noop = true, $force = false ){
        
        if( $force && $noop ){
            throw new Loco_error_Exception('--force makes no sense with --noop');
        }

        $content_dir = loco_constant('WP_CONTENT_DIR');
        $wp_locales = new Loco_api_WordPressTranslations;
        
        // track total number of PO files synced, plus MO and JSON files compiled
        $updated = 0;
        $compiled = 0;

        /* @var Loco_package_Project $project */
        foreach( $projects as $project ){
            $id = rtrim( $project->getId(), '.' );
            $base_dir = $project->getBundle()->getDirectoryPath();
            WP_CLI::log( sprintf('Syncing "%s" (%s)',$project->getName(),$id) );
            // Check if project has POT, which will be used as default template unless PO overrides
            $pot = null;
            $potfile = $project->getPot();
            if( $potfile && $potfile->exists() ){
                Loco_cli_Utils::debug('Parsing template: %s',$potfile->getRelativePath($content_dir));
                try {
                    $pot = Loco_gettext_Data::fromSource( $potfile->getContents() );
                }
                catch( Loco_error_ParseException $e ){
                    WP_CLI::error( $e->getMessage().' in '.$potfile->getRelativePath($content_dir), false );
                    $potfile = null;
                }
            }
            /* @var Loco_fs_LocaleFile $pofile */
            $pofiles = $project->findLocaleFiles('po');
            foreach( $pofiles as $pofile ){
                $locale = $pofile->getLocale();
                $tag = (string) $locale;
                if( $locales && ! array_key_exists($tag,$locales) ){
                    continue;
                }
                // Preempt write errors and print useful file mode info
                $mofile = $pofile->cloneExtension('mo');
                if( ! $pofile->writable() || $mofile->locked() ){
                    WP_CLI::warning('Skipping unwritable: '.self::fname($pofile) );
                    Loco_cli_Utils::tabulateFiles( $pofile->getParent(), $pofile, $mofile );
                    continue;
                }
                // Parsing candidate PO file (definitions)
                Loco_cli_Utils::debug('Parsing PO: %s',$pofile->getRelativePath($content_dir));
                try {
                    $def = Loco_gettext_Data::fromSource( $pofile->getContents() );
                }
                catch( Loco_error_ParseException $e ){
                    WP_CLI::error( $e->getMessage().' in '.$pofile->getRelativePath($content_dir), false );
                    continue;
                }
                // Check if PO defines alternative template (reference)
                $ref = $pot;
                $head = $def->getHeaders();
                $opts = new Loco_gettext_SyncOptions($head);
                $translate = $opts->mergeMsgstr();
                if( $opts->hasTemplate() ){
                    $ref = null;
                    $potfile = $opts->getTemplate();
                    $potfile->normalize( $base_dir );
                    if( $potfile->exists() ){
                        try {
                            Loco_cli_Utils::debug('> Parsing alternative template: %s',$potfile->getRelativePath($content_dir) );
                            $ref = Loco_gettext_Data::fromSource( $potfile->getContents() );
                        }
                        catch( Loco_error_ParseException $e ){
                            WP_CLI::error( $e->getMessage().' in '.$potfile->getRelativePath($content_dir), false );
                        }
                    }
                    else {
                        Loco_cli_Utils::debug('Template not found (%s)', $potfile->basename() );
                    }
                }
                if( ! $ref ){
                    WP_CLI::warning( sprintf('Skipping %s; no valid translation template',$pofile->getRelativePath($content_dir) ) );
                    continue;
                }
                // Perform merge if we have a reference file
                Loco_cli_Utils::debug('Merging %s <- %s', $pofile->basename(), $potfile->basename() );
                $matcher = new Loco_gettext_Matcher;
                $matcher->loadRefs($ref,$translate );
                // Merge jsons if configured and available
                if( $opts->mergeJson() ){
                    $siblings = new Loco_fs_Siblings($potfile);
                    $njson = $matcher->loadJsons( $siblings->getJsons() );
                    if( 0 !== $njson ){
                        Loco_cli_Utils::debug('> merged json files:%u', $njson );
                    }
                }
                // Get fuzzy matching tolerance from plugin settings, can be set temporarily in command line
                $fuzziness = Loco_data_Settings::get()->fuzziness;
                $matcher->setFuzziness( (string) $fuzziness );
                // update matches sources, deferring unmatched for deferred fuzzy match 
                $po = clone $def;
                $po->clear();
                $nvalid = count( $matcher->mergeValid($def,$po) );
                $nfuzzy = count( $matcher->mergeFuzzy($po) );
                $nadded = count( $matcher->mergeAdded($po) );
                $ndropped = count( $matcher->redundant() );
                // TODO Support --previous to keep old strings, or at least comment them out as #| msgid.....
                if( $nfuzzy || $nadded || $ndropped ){
                    Loco_cli_Utils::debug('> unchanged:%u added:%u fuzzy:%u dropped:%u', $nvalid, $nadded, $nfuzzy, $ndropped );
                }
                else {
                    Loco_cli_Utils::debug('> %u identical sources',$nvalid);
                }
                // File is synced, but may be identical
                $po->sort();
                if( ! $force && $po->equal($def) ){
                    WP_CLI::log( sprintf('No update required for %s', self::fname($pofile) ) );
                    continue;
                }
                if( $noop ){
                    WP_CLI::success( sprintf('**DRY RUN** would update %s', self::fname($pofile) ) );
                    continue;
                }
                try {
                    $locale->ensureName($wp_locales);
                    $po->localize($locale);
                    $compiler = new Loco_gettext_Compiler($pofile);
                    $bytes = $compiler->writePo($po);
                    Loco_cli_Utils::debug('+ %u bytes written to %s',$bytes, $pofile->basename());
                    $updated++;
                    // compile MO
                    $bytes = $compiler->writeMo($po);
                    if( $bytes ){
                        Loco_cli_Utils::debug('+ %u bytes written to %s',$bytes, $mofile->basename());
                        $compiled++;
                    }
                    // Done PO/MO pair, now generate JSON fragments as applicable
                    $jsons = $compiler->writeJson($project,$po);
                    foreach( $jsons as $file ){
                        $compiled++;
                        $param = new Loco_mvc_FileParams([],$file);
                        Loco_cli_Utils::debug('+ %u bytes written to %s',$param->size,$param->name);
                    }
                    // Done compile of this set
                    Loco_error_AdminNotices::get()->flush();
                    WP_CLI::success( sprintf('Updated %s', self::fname($pofile) ) );
                }
                catch( Loco_error_WriteException $e ){
                    WP_CLI::error( $e->getMessage(), false );
                }
            }
        }
        // sync summary
        if( 0 === $updated ){
            WP_CLI::log('Nothing updated');
        }
        else {
            WP_CLI::success( sprintf('%u PO files synced, %u files compiled',$updated,$compiled) );
        }
    }


    /**
     * Debug file name showing directory location 
     * @param Loco_fs_File
     * @return string
     */
    private static function fname( Loco_fs_File $file ){
        $dir = new Loco_fs_LocaleDirectory( $file->dirname() );
        return $file->filename().' ('.$dir->getTypeLabel( $dir->getTypeId() ).')';
    }

}