=== Loco Translate ===
Contributors: timwhitlock
Tags: translation, language, multilingual, l10n, i18n
Requires at least: 6.6
Requires PHP: 7.4
Tested up to: 6.8.1
Stable tag: 2.8.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Translate WordPress plugins and themes directly in your browser. Versatile PO file editor with integrated AI translation providers.


== Description ==

Loco Translate provides in-browser editing of WordPress translation files and integration with automatic translation services.

It also provides Gettext/localization tools for developers, such as extracting strings and generating templates.

Features include:

* Built-in translation editor within WordPress admin
* Integration with translation APIs including DeepL, Google, Lecto, Microsoft and OpenAI.
* Create and update language files directly in your theme or plugin
* Extraction of translatable strings from your source code
* Native MO file compilation without the need for Gettext on your system
* JSON (Jed) file compilation compatible with WordPress script localization
* Support for standard PO features including comments, references and plural forms
* PO source view with clickable source code references
* Protected language directory for saving custom translations
* Configurable PO file backups with diff and restore capability
* Built-in WordPress locale codes


Official [Loco](https://localise.biz/) WordPress plugin by Tim Whitlock. 
For more information please visit our [plugin page](https://localise.biz/wordpress/plugin).


== Installation ==

= Basic usage: =

Translators: To translate a theme into your language, follow these steps:

1. Create the protected languages directory at `wp-content/languages/loco/themes`
2. Ensure this directory writeable by the web server
3. Find your theme in the list at *Loco Translate > Themes*
4. Click `+ New language` and follow the on-screen prompts.


Developers: To translate your own theme or plugin for distribution, follow these steps:

1. Create a `languages` subdirectory in your bundle’s root directory
2. Ensure this directory writeable by the web server
3. Find the bundle at either *Loco Translate > Themes* or *Loco Translate > Plugins*
4. Click `+ Create template` and follow the on-screen prompts to extract your strings.
5. Click `+ New language` and follow the on-screen prompts to add your own translations.


= Installing manually: =

1. Unzip all files to the `wp-content/plugins/loco-translate` directory
2. Log into WordPress admin and activate the 'Loco Translate' plugin through the 'Plugins' menu
3. Go to *Loco Translate > Home* in the left-hand menu to start translating


More information on using the plugin is [available here](https://localise.biz/wordpress/plugin).


== Frequently Asked Questions ==

Please visit the [FAQs page](https://localise.biz/wordpress/plugin/faqs) on our website for the most common issues.

= How do I use Loco Translate? = 

Try our [Guides and Tutorials](https://localise.biz/wordpress/plugin#guides).

= How do I get more help? =

If you have a problem using Loco Translate, please try our [help pages](https://localise.biz/wordpress/plugin).
There's a lot of information there to help you understand how it works and the most common pitfalls to avoid.

To report a bug please start a new topic in the [support forum](https://wordpress.org/support/plugin/loco-translate),
but please check the [FAQs](https://localise.biz/wordpress/plugin/faqs) for similar issues first.
If you decide to submit a bug report please post enough [relevant detail](https://localise.biz/wordpress/plugin/faqs/debug-info) for us to reproduce your issue.

= Is my data protected? =

We don't collect your data or track you. See the [plugin privacy notice](https://localise.biz/wordpress/plugin/privacy).


== Screenshots ==

1. Translating strings in the browser with the Loco PO Editor
2. Showing translation progress for theme language files
3. PO source view with text filter and clickable file references
4. Restore tab showing PO diff view with revert function
5. Showing access to translations by installed language
6. Suggestion feature showing results from several providers


== Changelog ==

= 2.8.1 =
* DeepL uses `quality_optimized` with `loco_deepl_model` filter
* `http_request_timeout` filter returns maximum value. 
* Bumped WordPress compatibility to 6.8.2

= 2.8.0 =
* Bugfix for PHP 8.0 compatibility
* Dropped support for PHP < 7.4

= 2.7.3 =
* PHP 8.4 compatibility
* Bumped WordPress compatibility to 6.8.1

= 2.7.2 =
* DeepL client moved to back end, because CORS 
* Rolled in support for OpenAI / ChatGPT translation
* Workaround for JSON file references with no line number
* Bumped WordPress compatibility to 6.7.2

= 2.7.1 =
* Debug logging of unloaded domains reduced to a summary

= 2.7.0 =
* Raised minimum requirements to WordPress 6.6
* Minimum PHP version becomes 7.2.24 as per WordPress 6.6
* Locale-filtered bundle list now searches for base language
* Loading helper forcefully removes prematurely loaded text domains
* Machine translation hooks now have access to message context
* Persistent UI state for code view and invisible character modes

= 2.6.14 =
* Critical fix: A relative path passed to `load_textdomain` no longer throws exception.

= 2.6.13 =
* Fix for direct calls to load_textdomain with custom paths
* This resolves a regression in 2.6.12

= 2.6.12 =
* Major fix to custom load_textdomain loader. Works when original file is absent
* Fixed bug in template comparison when JSON files need to be merged
* CSS fixes including reinstating of unsaved "star" icon
* Domain listener fixed for JIT loading
* Bumped WordPress compatibility to 6.7

= 2.6.11 =
* Removed accidental console trace
* Bumped WordPress compatibility to 6.6.0
* Added lang_dir_for_domain fix to handle system file absence

= 2.6.10 =
* Added loco_api_provider_{id} filter
* JSON compiler observes configured .js aliases
* Fixed a missing security check - thanks Nosa Shandy
* Added .blade.php tokenizer hack
* Bumped WordPress compatibility to 6.5.4

= 2.6.9 =
* Rolled back load helper changes
* Moved debug messages to action hooks
* String debugger improvements

= 2.6.8 =
* Added string debugger
* Added Zip download button instead of MO
* Added debug messages about premature domain loading
* Added warning when system translations not installed
* Compiler avoids writing empty JSON translation files
* UI promotes PO copy over msginit/xgettext routes
* Populating msginit fields when copying a PO
* Bumped WordPress compatibility to 6.5.3

= 2.6.7 =
* WordPress 6.5.0 compatible
* Support for performant translation files in PHP format
* Added block.json and theme.json extraction
* Added theme pattern files to php string extractor
* Fixed a bug where unused plural forms were counted as untranslated
* Replaced CSS .notice with .panel to mitigate nag-blocker problems
* Removed bundle debug screen (deprecated since 2.6.5)
* Workaround for absent "source" references in JED files
* Extension polyfills now restricted to Loco admin screens.

= 2.6.6 =
* Replaced open_basedir check with error capturing

= 2.6.5 =
* Added syntax checking function
* Removed deepl_api_url config. Free API detected from :fx key suffix.
* Fixed bug in relative path calculations
* Fixed API suggestions for plural forms
* Fixed bug clearing unsaved state icons
* Added total strings count to PO file tables
* Sharper flags and spinners (@x2 pixel support)
* Handling upload_tmp_dir values outside of open_basedir
* Suppressing E_WARNING when testing file is_readable
* Bundle debug screen is deprecated (moving into Setup)
* Showing System Diagnostics when debug is off
* Bumped WordPress compatibility to 6.3.1

= 2.6.4 =
* Bumped WordPress version to 6.1.1
* Dropped support for Internet Explorer
* Updated JavaScript to ECMAScript 6
* Added `loco_bundle_configured` hook
* Fixed error icon not clearing after correction

= 2.6.3 =
* Fixed bug in plural forms comparison
* Fixed bug generating author theme jsons
* Fixed errors in bundle debugger
* Extended cli type argument to filter specific bundle
* Bumped WordPress version to 6.0.3

= 2.6.2 =
* Bumped WordPress version to 6.0.0
* Better labelling of reverse-engineered plural forms
* Removed undocumented loco_locale_plurals filter; use loco_po_headers
* Added PO folder location indicator in breadcrumb
* Added syntax validation for formatted strings

= 2.6.1 =
* Bumped WordPress version to 5.9.2
* Fix for CVE-2022-0765 reported by Taurus Omar via wpscan

= 2.6.0 =
* Dropped support for WordPress < 5.2
* Code upgrades for >= PHP 5.6.20
* Bumped WordPress version to 5.9.1
* Removed Yandex API integration
* Added loco_compile_script_reference filter
* Plural-Forms retained when copying PO to same language

= 2.5.8 =
* Compatible with PHP 8.1
* Bumped WordPress version to 5.9
* Added deprecation warning prior to v2.6

= 2.5.7 = 
* Fixed bug in 2.5.6 where remote APIs could not be used in batch mode
* Enforcing 10k character limit per request for Microsoft and Yandex Translators
* Style fix for revision/diff table under restore tab

= 2.5.6 =
* Added loco_api_provider_source filter
* Fixed bug loading user preferences saved in older version
* Refactored file finder to avoid recursive function calls
* Fixed bug displaying two forms for zero plural languages
* Added Lecto AI to translation API providers
* Bumped WordPress version to 5.8.3

= 2.5.5 =
* Fixed double file extension vulnerability reported by WordFence
* Better performance when scanning directories for file types

= 2.5.4 =
* Fixed vulnerability reported by Tomi Ashari via wpscan
* Added filters loco_po_headers and loco_pot_headers
* Bumped WordPress version to 5.8.1

= 2.5.3 =
* Adds option to merge JSON translations when syncing from PO
* Adds screen for editing file headers and sync options
* Fix for missing responseText in failed Ajax responses
* Fix for HTML entities returned from `number_format_i18n`
* Localized number formatting in JavaScript
* Replaced usage of date_i18n with wp_date
* Added configurable API endpoint for DeepL
* Bumped WordPress version to 5.7.2

= 2.5.2 =
* Added implied formality and loco_locale_formality filter
* Added cli fetch command (experimental)
* Bumped WordPress version to 5.7

= 2.5.1 =
* Support for new Yandex translate API
* Support for DeepL formality parameter
* Removed literal "1" and "one" instances from singular strings
* Buffering compiled JSON to support strings from multiple sources
* Added `loco_compile_single_json` filter for specifying custom JSON
* Added `loco_extracted_template` hook for adding custom strings
* Sync no longer removes the editor's current text filter
* Bumped WordPress version to 5.6.2

= 2.5.0 =
* PHP 8.0.0 compatibility
* Bumped WordPress version to 5.6.0
* Added JSON translation file generation
* Added custom JSON loading to LoadHelper
* Disabled emoji image replacement on our admin screens

= 2.4.6 =
* Fixed critical bug syncing PO directly to source code
* Added plugin setting for allowing/disallowing missing POT
* Fixed WP5.5 issue with multiple ID attributes on script tags

= 2.4.5 =
* Added WP-CLI sync and extract commands
* Fixed {locale} placeholder bug introduced in 2.4.4
* Improved handling of invalid character encodings
* Sync (msgmerge) moved to back end 
* New fuzzy matching with fuzziness setting
* Bumped WordPress version to 5.5.3

= 2.4.4 =
* Added PO file upload feature
* Added download button to file info page
* Fix for extracting plurals also used as singulars
* Updating API keys no longer require editor page reload
* Catching fatal startup errors in loco.php
* Supporting max_php_size=0 to mean no size restriction
* Auto-update detection now checks new site options
* Bumped WordPress version to 5.5.1

= 2.4.3 =
* Improved fix for default syncing of msgstr fields
* Reverted accidental removal of js debug flag
* Minor fixes to API error messages
* Removed use of jQuery.browser
* Bugfix for new preferences in usermeta

= 2.4.2 =
* Added loco_file_written hook
* Improved script tampering warning
* Added keypress for selecting auto-suggestion
* Sync no longer copies msgstr fields by default
* Style tweaks for WordPress 5.5

= 2.4.1 =
* Fixed mapping of some API languages
* Added locale filter to user preferences
* Added debugging for credential form failures
* Fixed deprecated use of array_key_exists
* Added DeepL API service provider
* Improved script tampering detection
* Bumped WordPress version to 5.5
* Added "modern" skin styles

= 2.4.0 =
* Added support for third party translation APIs
* Added file references to editor source pane in code view
* Added fuzzy matching during editor Sync operation
* Style changes including rearrangement of editor buttons
* Elevated warnings when scripts are tampered with
* Removed remnants of legacy version 1.x

= 2.3.4 =
* Updated translatable strings
* Added missing template recommendation
* Alerting in debug mode when scripts are tampered with
* Fix for Hello Dolly being installed into a folder
* Removed translation column in POT edit mode
* Added setting to prevent 'translating' of POT files
* Enabled some linkable translations using wp_kses
* Bumped WordPress version to 5.4.1

= 2.3.3 =
* Fixed fatal error when class not found

= 2.3.2 =
* Removed login/email from default Last-Translator credit
* Bumped WP compatibility to 5.4
* Fixed PHP 7.4 deprecations

= 2.3.1 =
* Default POT getter now looks in "lang" directory
* Not calling deprecated magic quotes functions under PHP 7.4
* Fixed issue with conflicting page hooks
* Ajax file uploads now enabled by default
* Removed legacy option migrations from 1.x branch
* Bumped WP compatibility to 5.2.4

= 2.3.0 =
* Added experimental support for multipart uploads
* Added relocation tab for moving translation sets
* Creation of missing directories when writing new files
* Fixed duplicate file addition when iterating over symlink
* Bumped WP compatibility to 5.2.1

= 2.2.2 =
* Security fixes as per [exploit-db 46619](https://www.exploit-db.com/exploits/46619) 
* Fixed old PHP version error in data files
* Bumped WP compatibility to 5.1.1

= 2.2.1 =
* Fixed bug where plural tabs not displaying RTL
* Various improvements to PO parser incl. better charset handling
* Excluding node_modules and vendor directories by default
* Transients now have maximum lifespan of 10 days, refreshed after 24h
* Symlink fix for followed theme paths detected outside theme
* Deprecated config repository lookup
* Bumped WP compatibility to 5.1

= 2.2.0 =
* Fix for empty language code when getting plural rules
* Added X-Loco-Version header to generated Gettext files
* Added sanity check for mbstring.func_overload madness
* Added "Assign template" link on missing template page
* Added JavaScript string extraction (experimental)
* Editor supports sprintf-js when javascript-format tag present
* Fix for duplicate comments when end punctuation differs
* Marking msgctxt more clearly in editor views
* Added `loco_admin_shutdown` action hook
* Bumped WP compatibility to 5.0 (beta)

= 2.1.5 =
* Updated locale data
* Minor fix to file reference resolution
* Fixed windows paths with trailing backslash
* Fixed ssh-keys toggling issue
* Rejigged buffer handling during Ajax
* Bumped WP compatibility to 4.9.8

= 2.1.4 =
* Bumped WP compatibility to 4.9.6
* Hooked in privacy policy suggestion

= 2.1.3 =
* Added loco_locale_name filter and updated locale data
* Fixed editor column sorting to update as values change
* Supporting RTL text in editor preview rows
* Minor refactor of debug mode routing check 
* Minor PO parser improvements
* Bumped WP compatibility to 4.9.5

= 2.1.2 =
* Fixed undeclared property in admin hook
* Fixed incompatibility with older WordPress
* Fixed incorrect millisecond reporting in footer
* Removed locale progress column for en_US locale
* Tweaks to debugging and error logging

= 2.1.1 =
* Setting `Project-Id-Version` on new POT files
* Added source view to quick links in file tables
* Supporting only WordPress style locale codes
* Editor screen tolerates missing PO headers
* Ajax debugging improvements for issue reporting
* Added loco_parse_locale action callback

= 2.1.0 =
* Add `fs_protect` setting to avoid overwriting system files
* Fixed bug in connect dialogue where errors not redisplayed
* Minor improvements to inline notices
* Removed downgrade notice under version tab
* Fixed extraction bug where file header confused with comment
* Resolved some inconsistencies between PHP and JS utilities
* Added Restore tab with diff display
* Added `loco_settings` hook
* Prevented editor from changing PO document order
* Added default string sorting to extracted strings
* Added "Languages" section for grouping files by locale
* Fixed bug where translations loaded before user profile language set
* Added loco_locale_plurals filter for customising plural rules
* Allowing PO files to enforce their own Plural-Forms rules
* Added `loco_allow_remote` filter for debugging remote problems
* Updated plural forms from Unicode CLDR
* PHP extractor avoids repeated comments
* Bumped WP compatibility to 4.9.4

= 2.0.17 =
* Unofficial languages showing in “Installed” dropdown
* Fixed extraction bug where comment confused with file header
* Fixed issue where src attributes requested from server during HTML strip
* Added loco_admin_init hook into ajax router for consistency
* Added warning on file info page when file is managed by WordPress 
* Minor help link and layout tweaks
* Bumped WP compatibility to 4.9.1

= 2.0.16 =
* File writer observes wp_is_file_mod_allowed
* Fixed progress bug in editor for locales with nplurals=1
* Made plural form categories translatable for editor UI
* Sync-from-source raises warning when files are skipped
* Added hack for extracting from .twig as per .php
* Added warning when child themes declare parent text domain
* Added option to control PO line wrapping
* Bumped WP compatibility to 4.8.2

= 2.0.15 =
* Permanently removed legacy version 1.x
* Fixed bug where editor code view was not redrawn on resize
* Fixed bug where fuzzy flag caused format flag to be ignored
* Fixed bug where autoloader responded to very long class names
* Purging WP object cache when active plugin list changes
* Added experimental source word count into POT info tab
* Bumped WP compatibility to 4.8.1

= 2.0.14 =
* Editor improvements inc. column sorting
* Added warnings that legacy version will be removed
* Added PO source view text filtering
* Added _fs_nonce for 4.7.5 compatibility
* Migrated to canonical text domain 
* Removed wp class autoloading

= 2.0.13 =
* CSS conflict fixes
* Added option for UTF-8 byte order mark
* Printf highlighting observes no-php-format flag
* Fixed issue with translator role losing “read” permission

= 2.0.12 =
* Minor fix for root path configs
* Added alternative PHP extensions setting
* Bumped WP version to 4.7.3
* LoadHelper fix for core files
* Allow revoking of permissions from translator role
* Allow network admins to deny access to site admins

= 2.0.11 =
* Extra debug logging and error diagnostics
* Forcefully clear output buffers before Ajax flush
* Bumped WordPress version to 4.7
* Experimental wildcard text domain support

= 2.0.10 =
* Allows missing domain argument in plugin_locale filter
* Reverted editor changes that disabled readonly text
* Added invisibles and coding editor switches
* Added table filtering via text query
* Added Last-Translator user preference

= 2.0.9 =
* Bumped minimum WordPress version to 4.1
* Some optimisation of transient caching
* Fixed hash table settings bug

= 2.0.8 =
* Source refs fix for files in unknown subsets
* Downgrades PO formatting exceptions to PHP warnings
* Renamed function prefixes to avoid PHP 7 warnings
* Better support for php-format and no-php-format flag
* PO source and editor UI tweaks
* Localised strings and implemented in js

= 2.0.7 =
* Fixed prototype.js conflict
* More Windows file path fixes
* Added loco_current_translator filter
* Fixed false positive in extra files test

= 2.0.6 =
* PO wrapping bugfix
* Downgraded source code bugfix
* Tolerating headerless POT files
* Core bundle metadata tweaks

= 2.0.5 =
* Deferred missing tokenizer warning
* Allows editing of files in unconfigured sets
* Added maximum PHP file size for string extraction
* Display of PHP fatal errors during Ajax

= 2.0.4 =
* Reduced session failures to debug notices
* Added wp_roles support for WP < 4.3
* Fixed domain listener bugs

= 2.0.3 =
* Added support for Windows servers
* Removed incomplete config warning on bundle overview

= 2.0.2 =
* Fixed bug when absolute path used to get plugins
* Added loco_plugins_data filter
* Added theme Template Name header extraction
* Minor copy amends

= 2.0.1 =
* Added help link in settings page
* Fixed opendir warnings in legacy code
* Catching session errors during init
* Removing meta row link when plugin not found

= 2.0.0 =
* First release of completely rebuilt version 2


== Upgrade Notice ==

= 2.8.1 =
* Various improvements and bug fixes



== Keyboard shortcuts ==

The PO file editor supports the following keyboard shortcuts for faster translating:

* Done and Next: `Ctrl ↵`
* Next string: `Ctrl ↓`
* Previous string: `Ctrl ↑`
* Next untranslated: `Shift Ctrl ↓`
* Previous untranslated: `Shift Ctrl ↑`
* Copy from source text: `Ctrl B`
* Clear translation: `Ctrl K`
* Toggle Fuzzy: `Ctrl U`
* Save PO / compile MO: `Ctrl S`
* Toggle invisibles: `Shift Ctrl I`
* Suggest translation: `Ctrl J`

Mac users can use ⌘ Cmd instead of Ctrl.
