<?php
/**
 * Auto-generated class, do not edit.
 * The purpose of this is to provide extractable strings that can be compiled at runtime into raw data for exporting to JavaScript.
 */
class Loco_js_Strings extends Loco_hooks_TranslateBuffer {

    /**
     * @return array
     */ 
    public function compile(){

        // Where %s is the name of the POT template file. Message appears after sync
        __("Merged from %s",'loco-translate');

        // Message appears after sync operation
        __("Merged from source code",'loco-translate');

        // Summary of new strings after running in-editor Sync
        _n("1 new string added","%s new strings added",0,'loco-translate');

        // Summary of existing strings that no longer exist after running in-editor Sync
        _n("1 obsolete string removed","%s obsolete strings removed",0,'loco-translate');

        // Message appears after sync operation when nothing has changed. %s refers to a POT file.
        __("Already up to date with %s",'loco-translate');

        // Message appears after sync operation when nothing has changed
        __("Already up to date with source code",'loco-translate');

        // Warning appears when user tries to refresh or navigate away when editor work is unsaved
        __("Your changes will be lost if you continue without saving",'loco-translate');

        // Shows total string count at top of editor
        _n("1 string","%s strings",0,'loco-translate');

        // Shows percentage translated at top of editor
        __("%s%% translated",'loco-translate');

        // Shows number of fuzzy strings at top of editor
        __("%s fuzzy",'loco-translate');

        // Shows number of untranslated strings at top of editor
        __("%s untranslated",'loco-translate');

        // When text filtering reduces to an empty view
        __("Nothing matches the text filter",'loco-translate');

        //
        __("Provide the following text when reporting a problem",'loco-translate');

        //
        __("Check console output for debugging information",'loco-translate');

        //
        __("Server returned invalid data",'loco-translate');

        //
        __("Unknown error",'loco-translate');

        //
        __("Error",'loco-translate');

        //
        __("Warning",'loco-translate');

        //
        __("Notice",'loco-translate');

        //
        __("OK",'loco-translate');

        /* Label for the window pane holding the original English text -and-
         * List heading showing preview of English text for each item */
        _x("Source text","Editor",'loco-translate');

        // Where %s is the name of the language, e.g. "French translation"
        _x("%s translation","Editor",'loco-translate');

        // Label for the window pane holding message context
        _x("Context","Editor",'loco-translate');

        // Label for the window pane for entering translator comments
        _x("Comments","Editor",'loco-translate');

        // Label for the singular form of the original English text
        _x("Single","Editor",'loco-translate');

        // Label for the plural form of the original English text
        _x("Plural","Editor",'loco-translate');

        // Label for the source text window when no translation selected
        _x("Source text not loaded","Editor",'loco-translate');

        // Label for the context window when no translation selected
        _x("Context not loaded","Editor",'loco-translate');

        // Label for the translation editing window when no translation selected
        _x("Translation not loaded","Editor",'loco-translate');

        // List heading showing preview of translated text for each item
        _x("Translation","Editor",'loco-translate');


        return $this->flush('loco-translate');
    }
}
