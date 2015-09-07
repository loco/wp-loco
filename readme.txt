=== Plugin Name ===
Contributors: timwhitlock
Tags: translation, translators, localization, localisation, l10n, i18n, Gettext, PO, MO, productivity
Requires at least: 3.5
Tested up to: 4.3
Stable tag: 1.5.3
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

1. Unzip all files to the `/wp-content/plugins/loco-translate` directory
2. Log into WordPress admin and activate the 'Loco Translate' plugin through the 'Plugins' menu
3. Go to *Loco Translate > Manage Translations* in the left-hand menu to start translating


To translate your own theme or plugin, follow these steps:

1. Create a `languages` subdirectory in your plugin or theme's root directory
2. Ensure this directory writable by the web server
3. Find the theme or plugin in the list at *Loco Translate > Manage Translations*
4. Click `+ New language` and follow the on-screen prompts.


To translate someone else’s theme into your language, follow these steps:

1. Create the global languages directory at `wp-content/languages/themes`
2. Ensure this directory writable by the web server
3. Find the theme in the list at *Loco Translate > Manage Translations*
4. Click `+ New language` and follow the on-screen prompts.


**Important**: Step 2 above is critical if you don’t want to lose your translations when your theme is updated. Translation files saved inside theme directories will be deleted by WordPress auto-update. The global languages directory is safe, but must be writable by your web server for Loco Translate to save files there.


A quick guide on using the plugin is [available here](https://localise.biz/help/wordpress/translate-plugin), but make sure you're familiar with the conventions of [Translating WordPress](http://codex.wordpress.org/Translating_WordPress) before you start.

Please note that this plugin doesn’t support Windows servers and the editor doesn't fully support MSIE<=8.


== Frequently Asked Questions ==

= Does this automatically translate my theme? =

No. It's for manually entering your own translations.

= Why can't I see the translations appearing on my site? =

If you’ve set your WordPress language correctly and your theme is loading translations correctly, then the most likely reason is that Loco Translate is not compatible with your theme or plugin. [See this extended FAQ](https://wordpress.org/support/topic/faq-why-arent-my-translations-showing-up-1)

= Why can't it find anything to translate? =

This would happen if it can’t find a translation template (POT file) and can’t find any WordPress translation functions in your source code either. If it’s not your theme, check with the author whether they provide a POT file. If it is your theme, try [these tips](https://localise.biz/help/wordpress/theme-localization).


= Do I need to create a POT (template) file? =

If you’re not familiar with [Gettext](https://www.gnu.org/software/gettext/) then you may find the workflow of maintaining a template rather complicated. Loco will work without a POT file, but if you plan to distribute your theme or plugin you should add one.



= Why do I get file warnings when I try to save translations? =

To save PO files directly to your site some files and directories must be writable by the web server. If you're unsure how to manage file permissions on your server, ask your system administrator or hosting provider. 

If writable directories pose a security risk then restrict translation to a development server. The file permissions are only required for editing translations and not related to viewing them.


= How do I create MO files? =

Every time you save a PO file Loco Translate compiles a MO file in the same location. As above, ensure that the web server is able to write to disk, otherwise MO compilation will fail.


= Why do I get a syntax error when saving and syncing? =

This error means something has gone unexpectedly wrong on your server.
See [this extended FAQ](https://wordpress.org/support/topic/faq-what-is-causing-unexpected-tokencharacter-syntax-error) for some tips on what to do.


= Does it support Windows? =

You can access the interface on Windows using Internet Explorer, but version 9 or above is required.

Loco Translate does not support Windows versions of PHP, so if your server has a Windows operating system the plugin may not work properly.


= Does it support Solaris? =

No. It requires some file system functionality which not available in PHP when running on Solaris.


= What support is there? =

If you think there is a problem with Loco Translate you can open a [support ticket](https://wordpress.org/support/plugin/loco-translate), but please provide as much relevant detail as possible. There is no personal support by email for this plugin. 

The majority of new questions in the support forum have been asked before. Please look for similar questions before posting.


== Screenshots ==

1. Translating strings in the browser with the Loco PO Editor
2. Listing of all available translation files installed



== Changelog ==

= 1.5.4 =
* Added theme/plugin metadata extraction to POT generation.
* POT extractor fix for function calls in argument lists.
* Fix for authors using unsuffixed PO files as templates.
* Updated translations, added pt_PT and Kurdish and amended typos.
* Added WordPress skin colours
* Workarounds for single-file plugins

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

