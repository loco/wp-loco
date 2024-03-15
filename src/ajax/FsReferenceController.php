<?php
/**
 * Ajax service that returns source code for a given file system reference
 * Currently this is only PHP, but could theoretically be any file type.
 */
class Loco_ajax_FsReferenceController extends Loco_ajax_common_BundleController {


    /**
     * @param string $refpath
     * @return Loco_fs_File
     */
    private function findSourceFile( $refpath ){

        // reference may be resolvable via referencing PO file's location
        $pofile = new Loco_fs_File( $this->get('path') );
        $pofile->normalize( loco_constant('WP_CONTENT_DIR') );
        if( ! $pofile->exists() ){
            throw new InvalidArgumentException('PO/POT file required to resolve reference');
        }
        $search = new Loco_gettext_SearchPaths;
        $search->init($pofile);
        if( $srcfile = $search->match($refpath) ){
            return $srcfile;
        }

        // check against PO file location when no search paths or search paths failed
        $srcfile = new Loco_fs_File($refpath);
        $srcfile->normalize( $pofile->dirname() );
        if( $srcfile->exists() ){
        	return $srcfile;
        }

        // reference may be resolvable via known project roots
        try {
            $bundle = $this->getBundle();
            // Loco extractions will always be relative to bundle root
            $srcfile = new Loco_fs_File( $refpath );
            $srcfile->normalize( $bundle->getDirectoryPath() );
            if( $srcfile->exists() ){
                return $srcfile;
            }
            
            // check relative to parent theme root
            if( $bundle->isTheme() && ( $parent = $bundle->getParent() ) ){
                $srcfile = new Loco_fs_File( $refpath );
                $srcfile->normalize( $parent->getDirectoryPath() );
                if( $srcfile->exists() ){
                    return $srcfile;
                }
            }
    
            // final attempt - search all project source roots
            // TODO is there too large a risk of false positives? especially with files like index.php
            /* @var $root Loco_fs_Directory */
            /*foreach( $this->getProject($bundle)->getConfiguredSources() as $root ){
                if( $root->isDirectory() ){
                    $srcfile = new Loco_fs_File( $refpath );
                    $srcfile->normalize( $root->getPath() );
                    if( $srcfile->exists() ){
                        return $srcfile;
                    }
                }
            }*/
        }
        catch( Loco_error_Exception $e ){
            // permitted for there to be no bundle or project when viewing orphaned file
        }
        
        throw new Loco_error_Exception( sprintf('Failed to find source file matching "%s"',$refpath) );
    }



    /**
     * {@inheritdoc}
     */
    public function render(){
        $post = $this->validate();
        
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
            $refline = 1;
        }
        
        // find file or fail
        $srcfile = $this->findSourceFile($refpath);
        
        // deny access to sensitive files
        if( 'wp-config.php' === $srcfile->basename() ){
            throw new InvalidArgumentException('File access disallowed');
        }
        
        // validate allowed source file types, including custom aliases
        $conf = Loco_data_Settings::get();
        $ext = strtolower( $srcfile->extension() );
        $type = $conf->ext2type($ext,'none');
        if( 'none' === $type ){
            throw new InvalidArgumentException('File extension disallowed, '.$ext );
        }

        $this->set('type', $type );
        $this->set('line', $refline );
        $this->set('path', $srcfile->getRelativePath( loco_constant('WP_CONTENT_DIR') ) );
        
        // source code will be HTML-tokenized into multiple lines
        $code = [];
        
        // observe the same size limits for source highlighting as for string extraction as tokenizing will use the same amount of juice
        $maxbytes = wp_convert_hr_to_bytes( $conf->max_php_size );
        
        // tokenizers require gettext utilities, easiest just to ping the extraction library
        if( ! class_exists('Loco_gettext_Extraction',true) ){
            throw new RuntimeException('Failed to load tokenizers'); // @codeCoverageIgnore
        }
        
        // PHP is the most likely format. 
        if( 'php' === $type && ( $srcfile->size() <= $maxbytes ) && loco_check_extension('tokenizer') ) {
            $tokens = new LocoPHPTokens( token_get_all( $srcfile->getContents() ) );
        }
        else if( 'js' === $type ){
            $tokens = new LocoJsTokens( $srcfile->getContents() );
        }
        else {
            $tokens = null;
        }

        // highlighting on back end because tokenizer provides more control than highlight.js
        if( $tokens instanceof LocoTokensInterface ){
            $thisline = 1;
            while( $tok = $tokens->advance() ){
                if( is_array($tok) ){
                    // line numbers added in PHP 5.2.2 - WordPress minimum is 5.2.4
                    list( $t, $str, $startline ) = $tok;
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
                    $thisline = $startline + $i;
                    $html = '<code class="'.$clss.'">'.htmlentities($line,ENT_COMPAT,'UTF-8').'</code>';
                    // append highlighted token to current line
                    $j = $thisline - 1;
                    if( isset($code[$j]) ){
                        $code[$j] .= $html;
                    }
                    else {
                        $code[$j] = $html;
                    }
                }
            }
        }
        // permit limited other file types, but without back end highlighting
        else {
            foreach( preg_split( '/\\R/u', $srcfile->getContents() ) as $line ){
                $code[] = '<code>'.htmlentities($line,ENT_COMPAT,'UTF-8').'</code>';
            }
        }

        if( ! isset($code[$refline-1]) ){
            throw new Loco_error_Exception( sprintf('Line %u not in source file', $refline) );
        }
 
        $this->set( 'code', $code );

        return parent::render();
    }
    
    
}
