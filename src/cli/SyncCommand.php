<?php /** @noinspection DuplicatedCode */

/**
 * Called from Loco_cli_Commands::sync
 */
abstract class Loco_cli_SyncCommand {
   

    /**
     * @param Loco_package_Project[] project filter
     * @param Loco_Locale[] locale filter
     * @param bool whether dry run
     */
    public static function run( array $projects, array $locales, $noop = true ){

        // CLI runs all disk operations directly. No remote authorization here currently.
        $fs = new Loco_api_WordPressFileSystem;
        $content_dir = loco_constant('WP_CONTENT_DIR');
        
        // track total number of PO files synced
        $updated = 0;

        /* @var Loco_package_Project $project */
        foreach( $projects as $project ){
            $id = rtrim( $project->getId(), '.' );
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
                    WP_CLI::warning('Skipping unwritable: '.$pofile->filename() );
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
                $translate = true;
                $head = $def->getHeaders();
                if( $head->has('X-Loco-Template') ){
                    $ref = null;
                    $potfile = new Loco_fs_File( $head['X-Loco-Template'] );
                    $potfile->normalize( $project->getBundle()->getDirectoryPath() );
                    if( $potfile->exists() ){
                        try {
                            Loco_cli_Utils::debug('> Parsing alternative template: %s',$potfile->getRelativePath($content_dir) );
                            $ref = Loco_gettext_Data::fromSource( $potfile->getContents() );
                            // Default sync behaviour is to copy msgstr fields unless in POT mode
                            if( $head->has('X-Loco-Template-Mode') && 'POT' === $head['X-Loco-Template-Mode'] ){
                                $translate = false;
                            }
                        }
                        catch( Loco_error_ParseException $e ){
                            WP_CLI::error( $e->getMessage().' in '.$potfile->getRelativePath($content_dir), false );
                        }
                    }
                    else {
                        Loco_cli_Utils::debug('Template not found (%s)', $potfile->basename() );
                    }
                }
                // Perform merge if we have a reference file
                if( $ref ){
                    Loco_cli_Utils::debug('Merging %s <- %s', $pofile->basename(), $potfile->basename() );
                    $po = self::msgmerge( $def, $ref, $translate );
                }
                else {
                    WP_CLI::warning( sprintf('Skipping %s; no valid translation template',$pofile->getRelativePath($content_dir) ) );
                    continue;
                }
                // File is synced, but may be identical
                $po->sort();
                if( $po->equal($def) ){
                    WP_CLI::log( sprintf('No update required for %s', $pofile->filename() ) );
                    continue;
                }
                if( $noop ){
                    WP_CLI::success( sprintf('**DRY RUN** would update %s', $pofile->filename() ) );
                    continue;
                }
                try {
                    // file is different so make a backup before overwriting
                    $backups = new Loco_fs_Revisions($pofile);
                    if( $backups->rotate($fs) ){
                        Loco_cli_Utils::debug('+ saved backup file of %s',$pofile->basename() );
                    }
                    // write new PO
                    $po->localize($locale);
                    $bytes = $pofile->putContents( $po->msgcat() );
                    Loco_cli_Utils::debug('+ %u bytes written to %s',$bytes, $pofile->basename());
                    $updated++;
                    // compile MO
                    $bytes = $mofile->putContents( $po->msgfmt() );
                    Loco_cli_Utils::debug('+ %u bytes written to %s',$bytes, $mofile->basename());
                    // Done PO/MO pair
                    WP_CLI::success( sprintf('Updated %s', $pofile->filename() ) );
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
            WP_CLI::success( sprintf('%u PO files synced',$updated) );
        }
    }
    
    
    /**
     * @param Loco_gettext_Data Existing PO file to MODIFY (definitions)
     * @param Loco_gettext_Data Latest POT file, being synced in (reference)
     * @param bool whether to merge translations in addition to sources
     * @return Loco_gettext_Data Merged file replacing $po
     */
    private static function msgmerge( Loco_gettext_Data $po, Loco_gettext_Data $pot, $translate = false ){
        $ntotal = 0;
        $nmatched = 0;
        $nfuzzy = 0;
        $nadded = 0;
        // add latest valid sources to matching instance
        $matcher = new LocoFuzzyMatcher;
        /* @var LocoPoMessage $new */
        foreach( $pot as $new ){
            $ntotal++;
            $matcher->add($new);
        }
        // Get fuzzy matching tolerance from plugin settings, can be set temporarily in command line
        $fuzziness = Loco_data_Settings::get()->fuzziness;
        $matcher->setFuzziness( (string) $fuzziness );
        // update matches sources, deferring unmatched for deferred fuzzy match 
        $merged = clone $po;
        $merged->clear();
        /* @var LocoPoMessage $old */
        foreach( $po as $old ){
            $new = $matcher->match($old);
            // if existing source is still valid, merge any changes
            if( $new instanceof LocoPoMessage ){
                $p = clone $old;
                $p->merge($new,$translate);
                $merged->push($p);
                $nmatched += $p->countForms();
            }
        }
        // We can quit early if all strings were matched
        if( $nmatched === $ntotal ){
            Loco_cli_Utils::debug('> %u identical sources',$ntotal);
            return $merged;
        }
        // Attempt fuzzy matching after all exact matches have been processed
        foreach( $matcher->getFuzzyMatches() as $pair ){
            list($old,$new) = $pair;
            $p = clone $old;
            $p->merge($new);
            $merged->push($p);
            $nfuzzy += $p->countForms();
            Loco_cli_Utils::debug('~ %s', $p['source'] );
        }
        // Any unmatched strings remaining are NEW
        /* @var LocoPoMessage $new */
        foreach( $matcher->unmatched() as $new ){
            $p = clone $new;
            $translate or $p->strip();
            $merged->push($p);
            $nadded += $p->countForms();
            Loco_cli_Utils::debug('+ %s', $p['source'] );
        }
        // TODO Support --previous to keep old strings, or at least comment them out as #| msgid.....
        // number of strings dropped is previous total minus those matched
        $ndropped = $po->count() - ( $nmatched + $nfuzzy );
        Loco_cli_Utils::debug('> unchanged:%u added:%u fuzzy:%u dropped:%u', $nmatched, $nadded, $nfuzzy, $ndropped );
        return $merged;
    }

}