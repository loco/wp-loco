<?php /** @noinspection DuplicatedCode */

/**
 * Ajax "sync" route.
 * Extracts strings from source (POT or code) and returns to the browser for in-editor merge.
 */
class Loco_ajax_SyncController extends Loco_mvc_AjaxController {

    /**
     * {@inheritdoc}
     */
    public function render(){
        
        $post = $this->validate();
        
        $bundle = Loco_package_Bundle::fromId( $post->bundle );
        $project = $bundle->getProjectById( $post->domain );
        if( ! $project instanceof Loco_package_Project ){
            throw new Loco_error_Exception('No such project '.$post->domain);
        }

        // Merging on back end is only required if existing target file exists.
        // Currently it always will and the editor is not permitted to contain unsaved changes when syncing.
        if( ! $post->has('path') ){
            throw new Loco_error_Exception('path argument required');
        }
        $file = new Loco_fs_File( $post->path );
        $base = loco_constant('WP_CONTENT_DIR');
        $file->normalize($base);
        $target = Loco_gettext_Data::load($file);

        // POT file always synced with source code
        $type = $post->type;
        if( 'pot' === $type ){
            $potfile = null;
        }
        // allow front end to configure source file. (will have come from $target headers)
        else if( $post->sync ){
            $potfile = new Loco_fs_File( $post->sync );
            $potfile->normalize($base);
        }
        // else use project-configured template path (must return a file)
        else {
            $potfile = $project->getPot();
        }
        
        // keep existing behaviour when template is missing, but add warning according to settings.
        if( $potfile && ! $potfile->exists() ){
            $conf = Loco_data_Settings::get()->pot_expected;
            if( 2 === $conf ){
                throw new Loco_error_Exception('Plugin settings disallow missing templates');
            }
            if( 1 === $conf ){
                // Translators: %s will be replaced with the name of a missing POT file
                Loco_error_AdminNotices::warn( sprintf( __('Falling back to source extraction because %s is missing','loco-translate'), $potfile->basename() ) );
            }
            $potfile = null;
        }
        
        // Parse existing POT for source
        if( $potfile ){
            $this->set('pot', $potfile->basename() );
            try {
                $source = Loco_gettext_Data::load($potfile);
            }
            catch( Exception $e ){
                // translators: Where %s is the name of the invalid POT file
                throw new Loco_error_ParseException( sprintf( __('Translation template is invalid (%s)','loco-translate'), $potfile->basename() ) );
            }
            // Only copy msgstr fields from source if it's a user-defined PO template and "copy translations" was selected.
            $strip = (bool) $post->strip;
            $translate = 'pot' !== $potfile->extension() && ! $strip;
        }
        // else extract POT from source code
        else {
            $this->set('pot', '' );
            $domain = (string) $project->getDomain();
            $extr = new Loco_gettext_Extraction($bundle);
            $extr->addProject($project);
            // bail if any files were skipped
            if( $list = $extr->getSkipped() ){
                $n = count($list);
                $maximum = Loco_mvc_FileParams::renderBytes( wp_convert_hr_to_bytes( Loco_data_Settings::get()->max_php_size ) );
                $largest = Loco_mvc_FileParams::renderBytes( $extr->getMaxPhpSize() );
                // Translators: (1) Number of files (2) Maximum size of file that will be included (3) Size of the largest encountered
                $text = _n('%1$s file has been skipped because it\'s %3$s. (Max is %2$s). Check all strings are present before saving.','%1$s files over %2$s have been skipped. (Largest is %3$s). Check all strings are present before saving.',$n,'loco-translate');
                $text = sprintf( $text, number_format($n), $maximum, $largest );
                // not failing, just warning. Nothing will be saved until user saves editor state
                Loco_error_AdminNotices::warn( $text );
            }
            // Have source strings. These cannot contain any translations.
            $source = $extr->includeMeta()->getTemplate($domain);
            $translate = false;
        }
        
        // establish on back end what strings will be added, removed, and which could be fuzzy-matches
        $matcher = new Loco_gettext_Matcher;
        $matcher->loadRefs($source,$translate);
        // Fuzzy matching only applies to syncing PO files. POT files will always do hard sync (add/remove)
        if( 'po' === $type ){
            $fuzziness = Loco_data_Settings::get()->fuzziness;
            $matcher->setFuzziness( (string) $fuzziness );
        }
        else {
            $matcher->setFuzziness('0');
        }
        // update matches sources, deferring unmatched for deferred fuzzy match 
        $merged = clone $target;
        $merged->clear();
        $this->set( 'done', $matcher->merge($target,$merged) );
        $merged->sort();
        $this->set( 'po', $merged->jsonSerialize() );
        
        return parent::render();
    }
    
    
}