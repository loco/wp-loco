<?php
/**
 * Ajax service that returns source code for a given file system reference
 * Currently this is only PHP, but could theoretically be any file type.
 */
class Loco_ajax_FsReferenceController extends Loco_ajax_common_BundleController {


    /**
     * @return Loco_fs_File
     */
    private function findSourceFile( $refpath ){
        
        // absolute file path means no search paths required
        // TODO ensure impossible to request files outside ABSPATH
        if( '/' === $refpath{0} ){
            $srcfile = new Loco_fs_File( $refpath );
            if( $srcfile->exists() ){
                return $srcfile;
            }
        }

        // reference may be relative to the PO file it came from
        // plus, PO file may contain search path information.
        $pofile = new Loco_fs_File( $this->get('path') );
        $pofile->normalize( loco_constant('WP_CONTENT_DIR') );
        if( ! $pofile->exists() ){
            throw new InvalidArgumentException('PO/POT file required to resolve reference');
        }

        // observe proprietary search path headers as priority
        // TODO avoid full parse when we only need the header, implement cap in loco_parse_po? or add separate loco_parse_po_head
        // $data = Loco_gettext_Data::load($pofile);
        // $head = $data->getHeaders();
        // TODO Poedit-Basepath and Podit-Searchpath-N headers ...........................
        
        $bundle = $this->getBundle();

        // Loco extractions will always be relative to bundle root
        $srcfile = new Loco_fs_File( $refpath );
        $srcfile->normalize( $bundle->getDirectoryPath() );
        if( $srcfile->exists() ){
            return $srcfile;
        }
        
        // check relative to parent theme root
        if( $bundle->isTheme() && ( $parent = $bundle->getParentTheme() ) ){
            $srcfile = new Loco_fs_File( $refpath );
            $srcfile->normalize( $parent->getDirectoryPath() );
            if( $srcfile->exists() ){
                return $srcfile;
            }
        }
        
        // if manual extraction was done from the target directory, references will be relative to PO
        $srcfile = new Loco_fs_File( $refpath );
        $srcfile->normalize( $pofile->dirname() );
        if( $srcfile->exists() ){
            return $srcfile;
        }
        

        // last attempt - search all project source roots
        // TODO is there too large a risk of false positives? especially with files like index.php
        /* @var $root Loco_fs_Directory */
        foreach( $this->getProject($bundle)->getConfiguredSources() as $root ){
            if( $root->isDirectory() ){
                $srcfile = new Loco_fs_File( $refpath );
                $srcfile->normalize( $root->getPath() );
                if( $srcfile->exists() ){
                    return $srcfile;
                }
            }
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
        $ref = $post->ref;
        if( ! preg_match('/^(.+):(\d+)$/', $ref, $r ) ){
            throw new InvalidArgumentException('Invalid file reference, '.$ref );
        }
        
        // find file or fail
        list( , $refpath, $refline ) = $r;
        $srcfile = $this->findSourceFile($refpath);
        $type = strtolower( $srcfile->extension() );
        $this->set('type', $type );
        $this->set('path', $srcfile->getRelativePath( loco_constant('WP_CONTENT_DIR') ) );

        // snip X lines either side of target line
        $extra = 2;
        $minline = max( 1, $refline - $extra );
        $maxline = $minline + ( 2 * $extra );
        $this->set('line', (int) $refline );
        $this->set('start', $minline );
        
        // tokenize source lines into code blocks of required lines only
        $code = array();
        // Currently only tokenizing PHP files, so anything else just rip the line out
        if( 'php' !== $type ){
            $lines = preg_split( '/\\R/', $srcfile->getContents() );
            if( ! isset($lines[$refline-1]) ){
                throw new Loco_error_Exception( sprintf('Line %u not in source file', $refline) );
            }
            foreach( array_slice( $lines, $minline-1, $maxline-$minline ) as $line ){
                $code[] = '<code>'.htmlentities($line,ENT_COMPAT,'UTF-8').'</code>';
            }
        }
        // PHP requires parsing from start, because of PHP/HTML switching
        else {
            $thisline = 1;
            foreach( token_get_all( $srcfile->getContents() ) as $tok ){
                if( is_array($tok) ){
                    // line numbers added in PHP 5.2.2 - WordPress minimum is 5.2.4
                    list( $t, $str, $startline ) = $tok;
                    // discard lines beyond reference
                    if( $startline > $maxline ){
                        break;
                    }
                    // tokens can span multiple lines (whitespace/html/comments)
                    $lines = preg_split('/\\R/', $str );
                }
                else {
                    // scalar symbol will always start on the line that the previous token ended on
                    $t = 0;
                    $lines = array( $tok );
                    $startline = $thisline;
                }
                // token can span multiple lines, so include only bytes on required line[s]
                foreach( $lines as $i => $line ){
                    $thisline = $startline + $i;
                    if( $thisline > $maxline ){
                        break;
                    }
                    if( $thisline < $minline ){
                        continue;
                    }
                    // block is on required line
                    $clss = $t ? token_name($t) : 'T_NONE';
                    $html = '<code class="'.$clss.'">'.htmlentities($line,ENT_COMPAT,'UTF-8').'</code>';
                    // apppend at zero-based local offset from start line
                    $_idx = $thisline - $minline;
                    if( isset($code[$_idx]) ){
                        $code[$_idx] .= $html;
                    }
                    else {
                        $code[$_idx] = $html;
                    }
                }
                // quit if overshot reference range
                if( $thisline > $maxline ){
                    break;
                }
            }
        }
 
        $this->set( 'code', $code );

        return parent::render();
    }
    
    
}
