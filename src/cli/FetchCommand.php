<?php
/**
 * Called from Loco_cli_Commands::fetch
 */
abstract class Loco_cli_FetchCommand {

    /**
     * @param Loco_package_Project[] project filter
     * @param Loco_Locale[] locale filter
     * @param bool[] switches
     */
    public static function run( array $projects, array $locales, array $opts ){
        
        $wp = new Loco_api_WordPressTranslations;
        $done = 0;

        // fetch for every "installed" locale if none specified
        if( ! $locales ){
            foreach( $wp->getInstalledCore() as $tag ){
                if( 'en_US' === $tag ){
                    continue;
                }
                $locale = Loco_Locale::parse($tag);
                if( $locale->isValid() ){
                    $locales[] = $locale;
                }
            }
            if( ! $locales ){
                throw new Loco_error_Exception('No installed languages, try with --locale=<code>');
            }
        }

        /* @var Loco_package_Project $project */
        foreach( $projects as $project ){
            $type = strtolower( $project->getBundle()->getType() );
            $domain = $project->getDomain()->getName();
            $info = $project->getBundle()->getHeaderInfo();
            $version = $info->Version;
            // Currently only supporting WordPress community translation sources.
            $args = [ 'version' => $version ];
            if( 'core' !== $type ){
                $type.= 's';
                if( $project->getSlug() !== $domain ){
                    WP_CLI::warning( sprintf('Skipping %s, only single text domain %s supported',$project->getId(),$type));
                    continue;
                }
                $args['slug'] = $domain;
            }
            WP_CLI::log( sprintf('Looking up %s v%s..',$project,$version) );
            Loco_cli_Utils::debug('Querying WordPress translations API for %s => %s..',$type,json_encode($args) );
            $result = $wp->apiGet($type,$args);

            // pre-index installable language packs
            $packages = [];
            foreach( $result['translations'] as $data ){
                $packages[$data['language']] = $data['package'];
            }
            // Translations API does not error when GlotPress project doesn't exist, it just returns empty.
            if( ! $packages ){
                Loco_cli_Utils::debug('No installable language packs available for %s. Checking if a GlotPress project exists..',$project);
                // Ping GlotPress project page. This is the only way we can know if an incomplete project exists
                $response = wp_remote_head( sprintf('https://translate.wordpress.org/projects/wp-%s/%s/',$type,$args['slug']) );
                $status = wp_remote_retrieve_response_code($response);
                if( 404 === $status ){
                    WP_CLI::warning( sprintf("Skipping %s: 404 from translate.wordpress.org. Probably no GlotPress project.",$project) );
                    continue;
                }
                else if( 200 !== $status ){
                    WP_CLI::warning( sprintf("Status %u from translate.wordpress.org. Skipping %s.",$status,$project) );
                }
                Loco_cli_Utils::debug('> Ok, looks like GlotPress project exists; probably no locales above the threshold for a package build');
            }

            // Save path is under "system" location because we are installing from GlotPress
            $dir = new Loco_fs_Directory( 'core' === $type ? '.' : $type );
            $dir->normalize( loco_constant('WP_LANG_DIR') );
            foreach( $locales as $locale ){
                $tag = (string) $locale;
                if( 'en_US' == $tag ){
                    WP_CLI::warning('There are no translations in en_US. It is the source locale.');
                    continue;
                }
                // Map WP locale codes to GlotPress teams. They differ, naturally.
                $team = $locale->lang;
                if( $locale->region ){
                    $team.= '-'.strtolower($locale->region);
                }
                $gp = Loco_data_CompiledData::get('gp');
                if( array_key_exists($team,$gp['aliases']) ){
                    $team = $gp['aliases'][$team];
                }
                // variant code (e.g. formal) is a sub-entity and not part of team language id
                $variant = $locale->variant;
                if( ! $variant ){
                    $variant = 'default';
                }
                if( 'core' === $type ){
                    // core projects are per-version. "dev" being upcoming. Then e.g. 5.6.x for stable
                    if( $opts['trunk'] || preg_match('/^\\d.\\d-(?:rc|dev|beta)/i',$version) ){
                        $slug = 'dev';
                    }
                    else {
                        list($major,$minor) = explode('.',$version,3);
                        $slug = sprintf('%u.%u.x',$major,$minor);
                    }
                    // Core projects are sub projects. plugins and themes don't have this
                    $map =  [
                        'default.' => '',
                        'default.admin' => '/admin',
                        'default.admin-network' => '/admin/network',
                        'continents-cities' => '/cc',
                    ];
                    $slug .= $map[ $project->getId() ];
                    $url = 'https://translate.wordpress.org/projects/wp/'.$slug.'/'.$team.'/'.$variant.'/export-translations/?format=po';
                }
                else {
                    $slug = $domain;
                    // plugins are either "stable" or "dev"; themes don't appear to have stability/version slug ??
                    if( 'plugins' === $type ) {
                        $slug .= $opts['trunk'] ? '/dev' : '/stable';
                    }
                    $url = 'https://translate.wordpress.org/projects/wp-'.$type.'/'.$slug.'/'.$team.'/' . $variant . '/export-translations/?format=po';
                }
                // Note that this export URL is not a documented API and may change without notice
                // TODO We could pass If-Modified-Since with current PO file header, BUT that could not know if existing file is purged or not. Make configurable?
                WP_CLI::log( sprintf('Fetching PO from %s..',$url));
                $response = wp_remote_get($url);
                $status = wp_remote_retrieve_response_code($response);
                if( 200 !== $status ){
                    WP_CLI::warning( sprintf('Status %u from translate.wordpress.org; skipping "%s". Probably no translation team',$status,$tag) );
                    continue;
                }
                Loco_cli_Utils::debug('OK, last modified %s', wp_remote_retrieve_header($response,'last-modified') );

                /*/ TODO fallback to installable package
                if( $packages && ! array_key_exists($tag,$packages) ){
                    WP_ClI::warning( sprintf('%s is not installable in `%s` (probably not complete enough)',$project,$tag) );
                }*/
                
                // Parse PO data to check it's valid, and also because we're going to compile it.
                $pobody = wp_remote_retrieve_body($response);
                $podata = Loco_gettext_Data::fromSource($pobody);
                $response = null;    
                
                // keep translations if file already exists in this location.
                $pofile = $project->initLocaleFile($dir,$locale);
                $info = new Loco_mvc_FileParams( [], $pofile );
                Loco_cli_Utils::debug('Saving %s..', $info->relpath );
                $compiler = new Loco_gettext_Compiler($pofile);
                if( $pofile->exists() ){
                    $info = new Loco_mvc_FileParams( [], $pofile );
                    Loco_cli_Utils::debug('PO already exists at %s (%s), merging..',$info->relpath,$info->size);
                    $original = Loco_gettext_Data::load($pofile);
                    $matcher = new Loco_gettext_Matcher;
                    $matcher->loadRefs($podata,true);
                    // downloaded file is in memory can be replaced with merged version
                    $podata = clone $original;
                    $podata->clear();
                    $stats = $matcher->merge($original,$podata);
                    $original = null;
                    if( ! $stats['add'] && ! $stats['del'] && ! $stats['fuz'] && ! $stats['str'] ){
                        WP_CLI::log( sprintf('%s unchanged in "%s". Skipping %s', $project,$locale,$info->relpath) );
                        continue;
                    }
                    // Overwrite merged PO, which will backup first if configured
                    Loco_cli_Utils::debug('OK: %u added, %u dropped, %u fuzzy', count($stats['add']), count($stats['del']), count($stats['fuz']) );
                    $podata->localize($locale);
                    $compiler->writePo($podata);
                }
                // Copy PO directly to disk as per remote source
                else {
                    $compiler->writeFile($pofile,$pobody);
                    $podata->inheritHeader( Loco_gettext_Data::dummy()->localize($locale)->getHeaders() );
                }

                // Compile new MO and JSON files..
                Loco_cli_Utils::debug('Compiling %s.{mo,json}',$pofile->filename() );
                $compiler->writeMo($podata);
                $compiler->writeJson($project,$podata);

                $pofile->clearStat();
                WP_CLI::success( sprintf('Fetched %s for "%s": %s PO at %s', $project,$locale,$info->size,$info->relpath) );
                Loco_error_AdminNotices::get()->flush();
                
                // clean up memory and ready for next file
                $podata = null;
                $pobody = null;
                $done++;
            }
        }
        if( 0 === $done ){
            WP_CLI::success('Completed OK, but no files were installed');
        }
    }

}
