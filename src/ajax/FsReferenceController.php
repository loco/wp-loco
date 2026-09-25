<?php
/**
 * Ajax service that returns source code for a given file system reference
 * Currently this is only PHP, but could theoretically be any file type.
 */
class Loco_ajax_FsReferenceController extends Loco_ajax_common_BundleController {

    /**
     * {@inheritdoc}
     */
    public function allowedParams():array {
        return parent::allowedParams() + [
            'path' => '',
        ];
    }

    
    
    private function getReferringFile():Loco_fs_File {
        $popath = $this->get('path');
        if( is_string($popath) && '' !== $popath ){
            $pofile = new Loco_fs_File($popath);
            $pofile->normalize( loco_constant('WP_CONTENT_DIR') );
            if( $pofile->exists() ){
                Loco_gettext_Data::check($pofile);
                return $pofile;
            }
        }
        throw new InvalidArgumentException('Existent referring file required to resolve reference');
    }


    /**
     * Test if a source file is within a bundle's configured source locations, including a parent theme's.
     */
    private function isBundleSource( Loco_package_Bundle $bundle, Loco_fs_File $file ):bool {
        $bundles = [ $bundle ];
        // child theme may share a text domain with its parent, in which case parent projects aren't inherited
        if( $bundle->isTheme() && ( $parent = $bundle->getParent() ) ){
            $bundles[] = $parent;
        }
        foreach( $bundles as $b ){
            /* @var Loco_package_Project $project */
            foreach( $b as $project ){
                if( $project->isSourceLocation($file) ){
                    return true;
                }
            }
        }
        return false;
    }


    /**
     * Resolve reference to an existing source file permitted by the posted bundle.
     * Candidates outside the bundle's source locations are indistinguishable from non-existent ones.
     */
    private function findSourceFile( string $refpath ):Loco_fs_File {

        // Bundle is required to establish where source files may be read from
        $bundle = $this->getBundle();

        // Reference may be resolvable via referencing PO file's location
        // This also results in validation of referring file, so "path" must be real.
        $pofile = $this->getReferringFile();
        $search = new Loco_gettext_SearchPaths;
        $search->init($pofile);
        $candidates = [];
        if( $srcfile = $search->match($refpath) ){
            $candidates[] = $srcfile;
        }

        // check against PO file location when no search paths or search paths failed
        $bases = [ $pofile->dirname() ];

        // Loco extractions will always be relative to bundle root
        $bases[] = $bundle->getDirectoryPath();

        // check relative to parent theme root
        if( $bundle->isTheme() && ( $parent = $bundle->getParent() ) ){
            $bases[] = $parent->getDirectoryPath();
        }

        foreach( $bases as $base ){
            $srcfile = new Loco_fs_File($refpath);
            $srcfile->normalize($base);
            $candidates[] = $srcfile;
        }

        /* @var Loco_fs_File $srcfile */
        foreach( $candidates as $srcfile ){
            if( $srcfile->exists() && $this->isBundleSource($bundle,$srcfile) ){
                return $srcfile;
            }
        }

        throw new Loco_error_Exception( sprintf('Failed to find source file matching "%s"',$refpath) );
    }



    /**
     * {@inheritdoc}
     */
    public function render(){
        $post = $this->validate();

        // enforce code_view access setting before doing anything else
        $conf = Loco_data_Settings::get();
        $code_view = $conf->code_view;
        if( 0 === $code_view ){
            throw new InvalidArgumentException('Source code viewer is disabled');
        }
        if( 1 === $code_view && ! current_user_can('manage_options') ){
            throw new InvalidArgumentException('Source code viewer requires administrator privileges');
        }

        // at the very least we need a reference to examine
        if( ! $post->has('ref') ){
            throw new InvalidArgumentException('ref parameter required');
        }
        
        // reference must parse as <path>:<line>
        $refpath = $post->ref;
        if( preg_match('/^(.+):(\\d+)$/', $refpath, $r ) ){
            $refpath = $r[1];
            $refline = (int) $r[2];
        }
        else {
            $refline = 0;
        }
        
        // find file or fail
        $srcfile = $this->findSourceFile($refpath);
        
        // Search utility only checks that reference exists, not whether it's actually a file
        if( $srcfile->isDirectory() ){
            throw new InvalidArgumentException('File is a directory');
        }
        
        // validate allowed source file types, including custom aliases
        $ext = strtolower( $srcfile->extension() );
        $type = $conf->ext2type($ext,'none');
        if( 'none' === $type ){
            throw new InvalidArgumentException('File extension disallowed, '.$ext );
        }

        // Deny access to files outside wp-content and WordPress root, plus sensitive files in the root
        if( 'wp-config.php' === $srcfile->basename() || ! ( $srcfile->underContentDirectory() || $srcfile->underWordPressDirectory() ) ){
            throw new InvalidArgumentException('File access disallowed');
        }

        // source code will be HTML-tokenized into multiple lines
        $code = [];

        // tokenizers require gettext utilities, easiest just to ping the extraction library
        if( ! class_exists('Loco_gettext_Extraction') ){
            throw new RuntimeException('Failed to load tokenizers'); // @codeCoverageIgnore
        }
        
        
        $extractor = loco_wp_extractor($type,$ext);

        // JSON is supported, but only if it parses as a valid i18n schema (e.g. blocks.json)
        if( $extractor instanceof LocoWpJsonExtractor ){
            $source = $srcfile->getContents();
            $extractor->tokenize($source);
            // No point highlighting this as blocks|theme.json usually have no line number. 
            foreach( preg_split( '/\\R/u',$source) as $line ){
                $code[] = '<code>'.htmlentities($line,ENT_COMPAT,'UTF-8').'</code>';
            }
        }
        // Else the file will be tokenized as JavaScript or PHP (including Twig and Blade) 
        // Explicit zero means no limit, as per Loco_gettext_Extraction
        else if( 0 !== ( $max = wp_convert_hr_to_bytes($conf->max_php_size) ) && $srcfile->size() > $max ){
            throw new Loco_error_Exception('File exceeds maximum setting of '.$conf->max_php_size);
        }
        else if( ! loco_check_extension('tokenizer') ){
            throw new Loco_error_Exception('Cannot validate '.$type.' file without tokenizer extension');
        }
        // Else always validate that PHP/JS have translatable strings. Other code will be disallowed.
        else {
            $tokens = $extractor->tokenize( $srcfile->getContents() );
            $strings = new LocoExtracted;
            $strings->limit(1);
            $extractor->extract( $strings, $tokens );
            if( 0 === $strings->count() ){
                throw new Loco_error_Exception('File access disallowed: No translatable strings found');
            }
            $thisline = 1;
            $tokens->rewind();
            $tokens->allow(T_WHITESPACE);
            while( $tok = $tokens->advance() ){
                if( is_array($tok) ){
                    [ $t, $str, $startline ] = $tok;
                    $clss = token_name($t);
                    // tokens can span multiple lines (whitespace/html/comments)
                    $lines = preg_split('/\\R/', $str );
                }
                else {
                    // scalar symbol will always start on the line that the previous token ended on
                    $clss = 'T_NONE';
                    $lines = [ $tok ];
                    $startline = $thisline;
                }
                // token can span multiple lines, so include only bytes on required line[s]
                foreach( $lines as $i => $line ){
                    // pad missing lines. $code must be contiguous
                    $thisline = $startline + $i;
                    $j = $thisline - 1;
                    while( count($code) < $j ){
                        $code[] = '<code class="T_NONE"> </code>';
                    }
                    // append highlighted token to current line
                    $html = '<code class="'.$clss.'">'.htmlentities($line,ENT_COMPAT,'UTF-8').'</code>';
                    if( isset($code[$j]) ){
                        $code[$j] .= $html;
                    }
                    else {
                        $code[$j] = $html;
                    }
                }
            }
        }
        
        // empty source line is either an empty file, or a parsing error
        if( [] === $code ){
            throw new Loco_error_Exception( sprintf('Failed to produce any lines from %d bytes of %s source', $srcfile->size(), $type) );
        }
        // allow 0 line reference when line is unknown (e.g. block.json) else it must exist
        if( $refline && ! isset($code[$refline-1]) ){
            Loco_error_AdminNotices::debug( sprintf('Line %u not in source file', $refline) );
            $refline = 1;
        }

        $this->set('type', $type );
        $this->set('line', $refline );
        $this->set('path', $srcfile->getRelativePath( loco_constant('WP_CONTENT_DIR') ) );
        $this->set('code', $code );

        return parent::render();
    }

    
}
