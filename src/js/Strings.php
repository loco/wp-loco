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

        // translators: When text filtering reduces to an empty view
        __("Nothing matches the text filter",'loco-translate');

        //
        __("No API key",'loco-translate');

        /* translators: Where %s is the name of the POT template file. Message appears after sync
         * xgettext: javascript-format */
        __("Merged from %s",'loco-translate');

        // translators: Message appears after sync operation
        __("Merged from source code",'loco-translate');

        /* translators: Summary of new strings after running in-editor Sync
         * xgettext: javascript-format */
        _n("%s new string added","%s new strings added",0,'loco-translate');

        /* translators: Summary of existing strings that no longer exist after running in-editor Sync
         * xgettext: javascript-format */
        _n("%s obsolete string removed","%s obsolete strings removed",0,'loco-translate');

        /* translators: Summary of existing translations where the source text has changed slightly
         * xgettext: javascript-format */
        _n("%s string marked Fuzzy","%s strings marked Fuzzy",0,'loco-translate');

        /* translators: Summary of translations copied from a PO file during Sync
         * xgettext: javascript-format */
        _n("%s translation copied","%s translations copied",0,'loco-translate');

        /* translators: Message appears after sync operation, where %s refers to a POT file.
         * xgettext: javascript-format */
        __("Strings up to date with %s",'loco-translate');

        // translators: Message appears after sync operation.
        __("Strings up to date with source code",'loco-translate');

        // translators: Result of validation when all strings pass validation
        __("No formatting errors detected",'loco-translate');

        /* translators: %s refers to a non-zero amount of errors detected.
         * xgettext: javascript-format */
        _n("%s possible error detected","%s possible errors detected",0,'loco-translate');

        //
        __("Check the translations marked with a warning sign",'loco-translate');

        /* translators: %s: the number of strings to be sent for translation
         * xgettext: javascript-format */
        __("%s unique source strings.",'loco-translate');

        /* translators: characters meaning individual unicode characters of source text
         * xgettext: javascript-format */
        __("%s characters will be sent for translation.",'loco-translate');

        /* translators: %s%% is a percentage, e.g. 50%
         * xgettext: javascript-format */
        __("Translation progress %s%%",'loco-translate');

        /* translators: %s is the quantity of strings left unprocessed after a job was stopped prematurely
         * xgettext: javascript-format */
        _n("Translation job aborted with %s string remaining","Translation job aborted with %s strings remaining",0,'loco-translate');

        /* translators: 1: Number of strings; 2: Service provider; e.g. "50 strings translated via Google Translate"
         * xgettext: javascript-format */
        _n("%1\$s string translated via %2\$s","%1\$s strings translated via %2\$s",0,'loco-translate');

        /* translators: %s is the quantity of strings modified during a batch process
         * xgettext: javascript-format */
        _n("%s string updated","%s strings updated",0,'loco-translate');

        //
        __("Nothing needed updating",'loco-translate');

        //
        __("Use this translation",'loco-translate');

        //
        __("Suggested translations",'loco-translate');

        // translators: Label for the plural form of the original English text
        _x("Plural","Editor",'loco-translate');

        // translators: Label for the singular form of the original English text
        _x("Single","Editor",'loco-translate');

        //
        __("Loading suggestions",'loco-translate');

        //
        __("Keep this translation",'loco-translate');

        // translators: Warning appears when user tries to refresh or navigate away when editor work is unsaved
        __("Your changes will be lost if you continue without saving",'loco-translate');

        /* translators: Shows total string count at top of editor
         * xgettext: javascript-format */
        _n("%s string","%s strings",0,'loco-translate');

        /* translators: Shows percentage translated at top of editor
         * xgettext: javascript-format */
        __("%s%% translated",'loco-translate');

        /* translators: Shows number of fuzzy strings at top of editor
         * xgettext: javascript-format */
        __("%s fuzzy",'loco-translate');

        /* translators: Shows number of untranslated strings at top of editor
         * xgettext: javascript-format */
        __("%s untranslated",'loco-translate');

        //
        __("Error",'loco-translate');

        //
        __("Warning",'loco-translate');

        //
        __("Notice",'loco-translate');

        //
        __("OK",'loco-translate');

        // translators: Generic error when external process broke an Ajax request
        __("Server returned invalid data",'loco-translate');

        //
        __("Check console output for debugging information",'loco-translate');

        //
        __("Provide the following text when reporting a problem",'loco-translate');

        //
        __("Unknown error",'loco-translate');

        /* translators: Label for the window pane holding the original English text
         * translators: List heading showing preview of English text for each item */
        _x("Source text","Editor",'loco-translate');

        /* translators: Where %s is the name of the language, e.g. "French translation"
         * xgettext: javascript-format */
        _x("%s translation","Editor",'loco-translate');

        // translators: Label for the window pane holding message context
        _x("Context","Editor",'loco-translate');

        // translators: Label for the window pane for entering translator comments
        _x("Comments","Editor",'loco-translate');

        //
        _x("Untranslated","Editor",'loco-translate');

        //
        _x("Translated","Editor",'loco-translate');

        //
        _x("Toggle Fuzzy","Editor",'loco-translate');

        //
        _x("Suggest translation","Editor",'loco-translate');

        // translators: Label for the source text window when no translation selected
        _x("Source text not loaded","Editor",'loco-translate');

        // translators: Label for the context window when no translation selected
        _x("Context not loaded","Editor",'loco-translate');

        // translators: Label for the translation editing window when no translation selected
        _x("Translation not loaded","Editor",'loco-translate');

        // translators: List heading showing preview of translated text for each item
        _x("Translation","Editor",'loco-translate');

        //
        __("Possible syntax error in string formatting",'loco-translate');

        /* translators: %s is the number of formatting arguments accepted by the source text of a translation
         * xgettext: javascript-format */
        __("Too many placeholders; source text formatting suggests a maximum of %s",'loco-translate');

        /* translators: %s is the number of formatting arguments accepted by the source text of a translation
         * xgettext: javascript-format */
        __("Missing placeholders; source text formatting suggests at least %s",'loco-translate');

        //
        __("Mismatching placeholder type; check against source text formatting",'loco-translate');


        return $this->flush('loco-translate');
    }
}
