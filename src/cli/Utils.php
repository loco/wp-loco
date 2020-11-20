<?php
/**
 * Utility functions for wp cli commands
 */
abstract class Loco_cli_Utils {


    /**
     * Collect translation sets according to type/domain filter
     * @param string Type of bundle (plugins|themes|core) or a specific Text Domain
     * @return Loco_package_Project[]
     */
    public static function collectProjects( $filter ){
        $projects = array();
        $filter = strtolower($filter);
        // bundle type filter
        if( 'plugins' === $filter ){
            $bundles = Loco_package_Plugin::getAll();
            $filter = null;
        }
        else if( 'themes' === $filter ){
            $bundles = Loco_package_Theme::getAll();
            $filter = null;
        }
        else if( 'core' === $filter ) {
            $bundles = array( Loco_package_Core::create() );
            $filter = null;
        }
        else {
            $bundles = array( Loco_package_Core::create() );
            $bundles = array_merge( $bundles, Loco_package_Plugin::getAll() );
            $bundles = array_merge( $bundles, Loco_package_Theme::getAll() );
        }
        /* @var Loco_package_Project $project */
        foreach( $bundles as $bundle ){
            foreach( $bundle as $project ){
                if( $filter && strtolower( $project->getDomain() ) !== $filter ){
                    continue;
                }
                $projects[] = $project;
            }
        }
        if( ! $projects ){
            throw new Loco_error_Exception('No translation sets found');
        }
        return $projects;
    }


    /**
     * Collect locales from one or more language tags
     * @param string zero or more language tags
     * @return Loco_Locale[]
     */
    public static function collectLocales( $tags ){
        $locales = array();
        if( '' !== $tags ){
            $api = new Loco_api_WordPressTranslations;
            foreach( preg_split('/[\\s,;]+/i',$tags,-1,PREG_SPLIT_NO_EMPTY) as $tag ){
                $locale = Loco_Locale::parse($tag);
                if( ! $locale->isValid() ){
                    throw new Loco_error_Exception('Invalid locale: '.json_encode($tag) );
                }
                // TODO could expand language-only tags to known WordPress locales e.g. fr -> fr_FR
                $locales[ (string) $locale ] = $locale;
                $locale->ensureName($api);
            }
            // empty locales means ALL locales, so refuse to return ALL when filter was non-empty
            if( 0 === count($locales) ){
                throw new Loco_error_Exception('No valid locales in: '.json_encode($tags) );
            }
        }
        return $locales;
    }


    /**
     * Simple space-padded table
     * @param string[][] data rows to print
     */
    public static function tabulate( array $t ){
        $w = array();
        foreach( $t as $y => $row ){
            foreach( $row as $x => $value ){
                $width = mb_strlen($value,'UTF-8');
                $w[$x] = isset($w[$x]) ? max($w[$x],$width) : $width;
            }
        }
        foreach( $t as $y => $row ){
            $line = array();
            foreach( $w as $x => $width ){
                $value = isset($row[$x]) ? $row[$x] : '';
                $value = str_pad($value,$width,' ',STR_PAD_RIGHT);
                $line[] = $value;
            }
            self::debug( implode(' ',$line) );
        }
    }


    /**
     * Prints file listing to stdout
     */
    public static function tabulateFiles(){
        $t = array();
        /* @var Loco_fs_File $file */
        foreach( func_get_args() as $file ){
            if( $file instanceof Loco_fs_File && $file->exists() ){
                $f = new Loco_mvc_FileParams(array(),$file);
                $t[] = array( $f->owner, $f->group, $f->smode, $f->relpath );
            }
        }
        self::tabulate($t);
    }


    /**
     * WP_CLI debug logger
     */
    public static function debug(){
        $args = func_get_args();
        $message = array_shift($args);
        if( $args ){
            $message = vsprintf($message,$args);
        }
        WP_CLI::debug( $message,'loco' );
    }
    
    
    /**
     * Parse boolean command line option. Absence is equal to false
     * @param string[]
     * @param string
     * @return bool
     */
    public static function bool( array $opts, $key ){
        $value = isset($opts[$key]) ? $opts[$key] : false;
        if( ! is_bool($value) ){
            $value = $value && 'false' !== $value & 'no' !== $value;
        }
        return $value;
    }

} 