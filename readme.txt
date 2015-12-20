=== Plugin Name ===
Contributors: timwhitlock
Tags: translation, translators, localization, localisation, l10n, i18n, Gettext, PO, MO, productivity
Requires at least: 3.5
Tested up to: 4.4
Stable tag: 1.5.5
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Translate WordPress plugins and themes directly in your browser


== Description ==

The Loco Translate plugin provides in-browser editing of PO files used for localizing WordPress plugins and themes.

Features include:

* Built-in translation editor within WordPress admin
* Create and update language files directly in your theme or plugin
* Extraction of translatable strings from your source code
* Native MO file compilation without the need for Gettext on your system
* Support for PO features including comments, references and plural forms
* Configurable PO file backups
* Built-in WordPress locale codes

Official [Loco](https://localise.biz/) WordPress plugin by <a href="//twitter.com/timwhitlock">@timwhitlock</a> / <a rel="author" href="https://plus.google.com/106703751121449519322">Tim Whitlock</a>



== Installation ==

= Installing manually: =

1. Unzip all files to the `/wp-content/plugins/loco-translate` directory
2. Log into WordPress admin and activate the 'Loco Translate' plugin through the 'Plugins' menu
3. Go to *Loco Translate > Manage Translations* in the left-hand menu to start translating

= Basic usage: =

To translate a theme into your language, follow these steps:

1. Create the global languages directory at `wp-content/languages/themes`
2. Ensure this directory writeable by the web server
3. Find the theme in the list at *Loco Translate > Manage Translations*
4. Click `+ New language` and follow the on-screen prompts.

**Important**: Step 2 above is critical if you don’t want to lose your translations when your theme is updated. Translation files saved inside theme directories will be deleted by WordPress auto-update. The global languages directory is safe, but must be writeable by your web server for Loco Translate to save files in it.


To translate your own theme or plugin for distribution, follow these steps:

1. Create a `languages` subdirectory in your plugin or theme's root directory
2. Ensure this directory writeable by the web server
3. Find the theme or plugin in the list at *Loco Translate > Manage Translations*
4. Click `+ New language` and follow the on-screen prompts.


More information on using the plugin is [available here](https://localise.biz/help/wordpress/translate-plugin).


== Frequently Asked Questions ==

See our [most common support questions](https://localise.biz/help/wordpress/translate-plugin/faqs).

= How do I use it? = 

Try our [beginner's guide](https://localise.biz/help/wordpress/translate-plugin/beginners) and a more advanced [technical overview](https://localise.biz/help/wordpress/translate-plugin/overview).


== Screenshots ==

1. Translating strings in the browser with the Loco PO Editor
2. Listing of all available translation files installed



== Changelog ==

= 1.5.5 =
* Added Korean and Ukrainian translations
* Fixed hard-coding of dirname in symlink workaround
* Changed help links to point to Loco site
* Added Solaris incompatibility warning

= 1.5.4 =
* Added theme/plugin metadata extraction to POT generation
* POT extractor fix for function calls in argument lists
* Fix for authors using unsuffixed PO files as templates
* Updated translations, added pt_PT and Kurdish and amended typos
* Added WordPress skin colours
* Workarounds for single-file plugins
* Fixed reordering bug after sync

= 1.5.3 =
* Critical PHP < 5.4 compatibility bug fix
* Added option to exclude Fuzzy strings from MO files

= 1.5.2 =
* Handle locale codes used wrongly in POT file names
* Added French, Brazilian Portuguese, Persian, Japanese and Spanish translations. Updated Turkish and German
* Note that this release is broken for PHP < 5.4

= 1.5.1 =
* Better handling of incorrectly named POT files
* Appended potential issue warnings on existing "file check" page
* Added loco_admin_capability filter for all plugin access
* Fixed editor shortcuts to avoid blocking alt-commands

= 1.5 =
* Added PO Editor keyboard shortcuts
* Added WPLANG warning for WP4 deprecation
* Added some FAQs
* Removed SORT_NATURAL for PHP 5.3 compat
* Fixed dummy msginit bug when default locale exists
* POT/domain matching fix
* Using WordPress language codes
* Added polyfills for mbstring and iconv

= 1.4.7 =
* Added Polish translations
* Tested in WP 4.0
* Add support for WordPress's regionless locales

= 1.4.6 =
* Updated Swedish and Turkish translations
* Added Indonesian translations
* Added Italian translations
* Template bug fix for child theme inheritance
* Form action bug fix - affected Firefox

= 1.4.5 =
* Support for Domain Path tag
* Added choice of location when language and package folders both writable
* Fixed bug extracting domain from file names
* Child themes always have their own text domain and don't duplicate parent files
* Better plural support in PO file editor
* Added experimental support for core packages
* Tested in WP 3.9.1
* Added Swedish translations
* Added Russian translations
* Added text filter clear button

= 1.4.4 =
* Fixed bug in prefixing new PO files with text domain based on existing files
* Language file updates
* Tested in WP 3.9
* Added loco_cache_enabled filter

= 1.4.3 =
* Child themes use parent text domains
* MO files parsed when PO files missing
* Handle incorrect usage of PO files as templates
* Nicer top-level menu with dashicons icon
* Added IE<=8 warning

= 1.4.2 =
* Added backup feature
* Removed utm domain
* Added Turkish translations
* Fixed file naming for new theme files

= 1.4.1 =
* Cache invalidation
* Magic quotes stripping from po save

= 1.4 =
* Added native MO compiler
* Added hash generation config option
* Added direct MO download from editor
* Fixed some translations and added German

= 1.3.1 =
* style tweak for wp 3.8
* suppressing exception when proc_open fails

= 1.3 =
* Support for files under WP_LANG_DIR
* Last-Translator header added to PO files from WordPress user
* Disabling cache when WP_DEBUG = true
* Better editor integration, including source headers and file refs
* Added editor dropdown for switching between files
* Guessing of msgfmt path when not in settings

= 1.2.2 =
* Fixed incorrect plural equation offset
* Compacted pre-compiled locale data
* Added settings link from plugin meta row

= 1.2.1 =
* Fixed incorrect version update message
* Added note about Windows support in readme.txt

= 1.2 =
* Added settings screen with gettext config
* Fixed msgfmt hanging bug

= 1.1.3 =
* Improved PHP strings extraction
* Fixed strict warning

= 1.1.2 =
* Added dutch translations
* Better persistence of PO headers

= 1.1.1 =
* Added country flag icons
* Fixed major IE8 bug in editor search
* Reduced size of icon font file

= 1.1.0 =
* Added translation search filter in editor
* Added percentage completion in list and edit views


= 1.0.0 =
* First version published


== Upgrade Notice ==

= 1.5.4 =
* Bug fixes and improvements.



== More info ==

* [About the plugin](https://localise.biz/help/wordpress/translate-plugin/beginners)
* [Beginner's guide to translating a theme](https://localise.biz/help/wordpress/translate-plugin/beginners)
* [Technical overview](https://localise.biz/help/wordpress/translate-plugin/overview)
* [Getting help](https://localise.biz/help/wordpress/translate-plugin/support)

== Coming soon ==

These features are on our todo list. There's no particular timeframe for any of them and they're in no particular order:

* Integration with Google and Bing for automatic translation
* Integration with Loco API for collaborative translation
* Support multiple message domains within a single package.
* Sort order in editor list


== Credits ==

* Dutch translations by [Niels Geryl](http://hetwittepaard.be)
* German translations by [Sebastian König](http://aykutmania.de) and [Arno Welzel](https://wordpress.org/support/profile/awelzel)
* Turkish translations by [Abdullah Pazarbaşı](http://abdullahpazarbasi.com), Abdullah Manaz and [WordCommerce](http://www.wordcommerce.com/wordcommerce-iletisim/)
* Swedish translations by [Jimmy Malmqvist](http://jimmymalmqvist.com)
* Russian translations by [Alexey Tkachenko](http://atkachenko.ru)
* Indonesian translations by [Ivan Lanin](https://twitter.com/ivanlanin)
* Italian translations by [ElectricFeet](http://wordpress.org/support/profile/electricfeet)
* Polish translations by [Jerry1333](http://www.jerry1333.net)
* Persian translations by [Araz Rad](http://fa.araz.id.ir)
* Japanese translations by [Agarthe LLC](https://agarthe.com)
* Spanish translations by [temesis1234](https://wordpress.org/support/profile/temesis1234)
* Brazilian Portuguese translations by [pamcabezas](https://github.com/pamcabezas) and [Marcelo Saldanha](http://www.associadosweb.com/)
* European Portuguese translations by [Pedro Mendonça](https://github.com/pedro-mendonca)
* French translations by [Borjan Tchakaloff](https://github.com/bibz)
* Korean translations by [Josh Kim](mailto:joshkkim@gmail.com)
* Ukrainian translations by [Dmitriy Malyuta](https://www.facebook.com/malyuta)

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

Mac users can use ⌘ Cmd instead of Ctrl.

