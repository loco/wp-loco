=== Plugin Name ===
Contributors: timwhitlock
Tags: translation, translators, localization, localisation, l10n, i18n, Gettext, PO, MO, productivity, multilingual, internationalization
Requires at least: 4.1
Requires PHP: 5.2.4
Tested up to: 4.9.4
Stable tag: 2.1.2
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Translate WordPress plugins and themes directly in your browser


== Description ==

Loco Translate provides in-browser editing of WordPress translation files.

It also provides localization tools for developers, such as extracting strings and generating templates.

Features include:

* Built-in translation editor within WordPress admin
* Create and update language files directly in your theme or plugin
* Extraction of translatable strings from your source code
* Native MO file compilation without the need for Gettext on your system
* Support for PO features including comments, references and plural forms
* PO source view with clickable source code references
* Protected language directory for saving custom translations
* Configurable PO file backups with diff and restore capability
* Built-in WordPress locale codes


Official [Loco](https://localise.biz/) WordPress plugin by <a href="//twitter.com/timwhitlock">@timwhitlock</a> / <a rel="author" href="https://plus.google.com/106703751121449519322">Tim Whitlock</a>


== Installation ==

= Installing manually: =

1. Unzip all files to the `/wp-content/plugins/loco-translate` directory
2. Log into WordPress admin and activate the 'Loco Translate' plugin through the 'Plugins' menu
3. Go to *Loco Translate > Home* in the left-hand menu to start translating

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



More information on using the plugin is [available here](https://localise.biz/wordpress/plugin).


== Frequently Asked Questions ==

= How do I use it? = 

Try our [Guides and Tutorials](https://localise.biz/wordpress/plugin#guides) and be sure to check the [Most asked questions](https://localise.biz/wordpress/plugin/faqs) if you have a problem.

= How do I get help? =

Please see [getting help with Loco Translate](https://localise.biz/wordpress/plugin/support) and note that personal support by email is not available for this plugin. 
Help is provided via the [plugin support forum](https://wordpress.org/support/plugin/loco-translate) only.



== Screenshots ==

1. Translating strings in the browser with the Loco PO Editor
2. Showing translation progress for theme language files
3. PO source view with text filter and clickable file references
4. Restore tab showing PO diff view with revert function
5. Showing access to translations by installed language



== Changelog ==

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

= 2.1.2 =
* Various bug fixes and improvements


== More info ==

* [About the plugin](https://localise.biz/wordpress/plugin)
* [User manual](https://localise.biz/wordpress/plugin/manual)
* [Beginner's guide](https://localise.biz/wordpress/plugin/beginners)
* [Customizing translations](https://localise.biz/wordpress/plugin/custom-translations)
* [Translating child themes](https://localise.biz/wordpress/plugin/child-themes)
* [Getting help](https://localise.biz/wordpress/plugin/support)

== Coming soon ==

These features are on our todo list. There's no particular timeframe for any of them and they're in no particular order:

* Integration with automatic translation services
* Integration with Loco API for cloud storage and collaboration
* Global search for finding strings across all bundles
* Advanced Merge/Sync screen to replace the basic in-editor sync
* Starred/Favourited bundles for quicker dashboard access


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

Mac users can use ⌘ Cmd instead of Ctrl.
