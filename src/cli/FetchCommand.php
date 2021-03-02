<?php
/**
 * Called from Loco_cli_Commands::fetch
 */
abstract class Loco_cli_FetchCommand {

    /**
     * @param Loco_package_Project[] project filter
     * @param Loco_Locale[] locale filter
     */
    public static function run( array $projects, array $locales ){
        
        $wp = new Loco_api_WordPressTranslations;

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
        }

        /* @var Loco_package_Project $project */
        foreach( $projects as $project ){
            $type = strtolower( $project->getBundle()->getType() );
            $domain = $project->getDomain()->getName();
            $info = $project->getBundle()->getHeaderInfo();
            $version = $info->Version;
            // Currently only supporting WordPress community translation sources.
            $args = array( 'version' => $version );
            if( 'core' !== $type ){
                $type.= 's';
                if( $project->getSlug() !== $domain ){
                    WP_CLI::warning( sprintf('Skipping %s, only single text domain %s supported',$project->getId(),$type));
                    continue;
                }
                $args['slug'] = $domain;
            }
            Loco_cli_Utils::debug('Querying WordPress translations API for %s => %s..',$type,json_encode($args) );
            $result = $wp->apiGet($type,$args);

            // pre-index installable language packs
            $packages = array();
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
                    list($major,$minor) = explode('.',$version,3);
                    $slug = sprintf('%u.%u.x',$major,$minor);
                    // Core projects are sub projects. plugins and themes don't have this
                    $map = array (
                        'default.' => '',
                        'default.admin' => '/admin',
                        'default.admin-network' => '/admin/network',
                        'continents-cities' => '/cc',
                    );
                    $slug .= $map[ $project->getId() ];
                    $url = 'https://translate.wordpress.org/projects/wp/'.$slug.'/'.$team.'/'.$variant.'/export-translations/?format=po';
                }
                else {
                    $slug = $domain;
                    // plugins are either "stable" or "dev"; themes don't appear to have stability/version slug ??
                    if( 'plugins' === $type ) {
                        $slug .= '/stable';
                    }
                    $url = 'https://translate.wordpress.org/projects/wp-'.$type.'/'.$slug.'/'.$team.'/' . $variant . '/export-translations/?format=po';
                }
                // Note that this export URL is not a documented API and may change without notice
                // TODO We could pass If-Modified-Since with current PO file header, BUT that could not know if existing file is purged or not. Make configurable?
                WP_CLI::log( sprintf('Fetching PO from %s ...',$url));
                $response = wp_remote_get($url);
                $status = wp_remote_retrieve_response_code($response);
                if( 200 !== $status ){
                    WP_CLI::warning( sprintf('Status %u from translate.wordpress.org, skipping %s for %s',$status,$project,$locale) );
                    continue;
                }
                Loco_cli_Utils::debug('OK, last modified %s', wp_remote_retrieve_header($response,'last-modified') );

                /*/ TODO fallback to installable package
                if( $packages && ! array_key_exists($tag,$packages) ){
                    WP_ClI::warning( sprintf('%s is not installable in `%s` (probably not complete enough)',$project,$tag) );
                }*/
                
                // Parse PO data to check it's valid, and also because we're going to compile it.
                $podata = Loco_gettext_Data::fromSource( wp_remote_retrieve_body($response) );
                $response = null;    
                
                // keep translations if file already exists in this location.
                $pofile = $project->initLocaleFile($dir,$locale);
                if( $pofile->exists() ){
                    $info = new Loco_mvc_FileParams( array(), $pofile );
                    Loco_cli_Utils::debug('PO already exists at %s (%s), merging..',$info->relpath,$info->size);
                    $original = Loco_gettext_Data::load($pofile);
                    $matcher = new Loco_gettext_Matcher;
                    $matcher->loadRefs($podata,true);
                    // downloaded file is in memory can be replaced with merged version
                    $podata = clone $original;
                    $podata->clear();
                    $stats = $matcher->merge($original,$podata);
                    $original = null;
                    // any change?
                    if( $stats['add'] || $stats['del'] || $stats['fuz'] ){
                        Loco_cli_Utils::debug('OK: %u added, %u dropped, %u fuzzy', count($stats['add']), count($stats['del']), count($stats['fuz']) );
                        $podata->localize($locale); // <- ping modified headers
                    }
                    else {
                        WP_CLI::success( sprintf('%s unchanged in %s. Skipping %s', $project,$locale,$info->relpath) );
                        continue;
                    }
                }
                
                // write new PO and compiled file set
                $info = new Loco_mvc_FileParams( array(), $pofile );
                Loco_cli_Utils::debug('Compiling %s..', $info->relpath );
                $compiler = new Loco_gettext_Compiler($pofile);
                $compiler->writeAll($podata, $project);

                $pofile->clearStat();
                WP_CLI::success( sprintf('Fetched %s for %s: %s PO at %s', $project,$locale,$info->size,$info->relpath) );
                Loco_error_AdminNotices::get()->flush();
                
                // clean up memory and ready for next file
                $podata = null;
            }
        }

    }

}
