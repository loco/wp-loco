=== Plugin Name ===
Contributors: timwhitlock
Tags: translation, translators, localization, localisation, l10n, i18n, Gettext, PO, MO, productivity
Requires at least: 3.5
Tested up to: 4.1
Stable tag: 1.5.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Translate Wordpress plugins and themes directly in your browser


== Description ==

The Loco Translate plugin provides in-browser editing of PO files used for localizing Wordpress plugins and themes.

Features include:

* Built-in translation editor within Wordpress admin
* Create and update language files directly in your theme or plugin
* Extraction of translatable strings from your source code
* Native MO file compilation without the need for Gettext on your system
* Support for PO features including comments, references and plural forms
* Configurable PO file backups
* Built-in Wordpress locale codes

Official [Loco](https://localise.biz/) WordPress plugin by <a href="//twitter.com/timwhitlock">@timwhitlock</a> / <a rel="author" href="https://plus.google.com/106703751121449519322">Tim Whitlock</a>



== Installation ==

1. Unzip all files to the `/wp-content/plugins/loco-translate` directory
2. Log into Wordpress admin and activate the 'Loco Translate' plugin through the 'Plugins' menu
3. Go to *Loco Translate > Manage Translations* in the left-hand menu to start translating


To translate your own theme or plugin, follow these steps:

1. Create a `languages` subdirectory in your plugin or theme's root directory
2. Ensure this directory writable by the web server
3. Find the theme or plugin in the list at *Loco Translate > Manage Translations*
4. Click `+ New language` and follow the on-screen prompts.


To translate someone else’s theme into your language, follow these steps:

1. Create the global languages directory exists at `wp-content/languages/themes`
2. Ensure this directory writable by the web server
3. Find the theme in the list at *Loco Translate > Manage Translations*
4. Click `+ New language` and follow the on-screen prompts.



A quick guide on using the plugin is [available here](https://localise.biz/help/wordpress/translate-plugin), but make sure you're familiar with the conventions of [Translating Wordpress](http://codex.wordpress.org/Translating_WordPress) before you start.

Please note that this plugin doesn’t support Windows servers and the editor doesn't fully support MSIE<=8.


== Frequently Asked Questions ==

= Does this automatically translate my project? =

No. It's for manually entering your own translations, but we do intend to be integrating some automatic translation services into the plugin soon.


= Why can't I see the translations appearing in my theme/plugin? =

All Loco Translate does is manage your translation process and organize your files, it does not run when people are visiting your site.

If you think Loco is saving invalid MO files or putting them in the wrong place, then open a [support ticket](http://wordpress.org/support/plugin/loco-translate), 
but please see [this extended FAQ](https://wordpress.org/support/topic/faq-why-arent-my-translations-showing-up) before posting.


= Why can't it extract any translatable strings from my code? =

The extraction process looks for Wordpress translation functions with string literal arguments, such as `__('Foo')`.

Using your own custom functions like `myTranslate('Foo')` won't work. Neither will using variables, such as `__( $foo )`.

See [more tips on localizing your theme](https://localise.biz/help/wordpress/theme-localization).


= Do I need to create a POT (template) file? =

If you’re not familiar with the [Gettext](https://www.gnu.org/software/gettext/) workflow and don’t plan to distribute your plugin then you might want to work without a POT file.

There are some good reasons to maintain a POT file, but Loco Translate doesn’t require it and can sync your translations directly with your source code.



= Why do I get file warnings when I try to save translations? =

To save PO files directly to your site some files and directories must be writable by the web server. If you're unsure how to manage file permissions on your server, ask your system administrator or hosting provider. 

If writable directories pose a security risk then restrict translation to a development server. The file permissions are only required for editing translations and not related to viewing them.


= How do I create MO files? =

Every time you save a PO file Loco Translate tries to compile a MO file in the same location. As above, ensure that the web server is able to write to disk, otherwise MO compilation will fail.


= Why do I get a syntax error when saving and syncing? =

This error means something has gone unexpectedly wrong on your server.
See [this extended FAQ](https://wordpress.org/support/topic/faq-what-is-causing-unexpected-tokencharacter-syntax-error) for some tips on what to do.


= Does it support Windows? =

You can access the interface on Windows using Internet Explorer, but version 9 or above is recommended.

Loco Translate does not support Windows versions of PHP, so if your server has a Windows operating system the plugin may not work properly.


= This is too technical; why doesn’t it just work? = 

In most cases it does, but Loco Translate is not a standalone application - it runs on your server and extraneous factors occasionally cause problems. If the plugin is unable to handle a particular situation automatically then you might have to intervene, and there isn’t always a *non-technical* solution to a technical problem. 

If you think there is a problem with Loco Translate you can open a [support ticket](https://wordpress.org/support/plugin/loco-translate) and provide as much relevant detail as possible.

If you have a suggestion on how to improve the experience of using Loco Translate then please [get in touch](https://localise.biz/contact).



== Screenshots ==

1. Translating strings in the browser with the Loco PO Editor
2. Listing of all available translation files installed



== Changelog ==

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
* Using Wordpress language codes
* Added polyfills for mbstring and iconv

= 1.4.7 =
* Added Polish translations
* Tested in WP 4.0
* Add support for Wordpress's regionless locales

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
* Last-Translator header added to PO files from Wordpress user
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

= 1.5.1 =
* Bug fixes and improvements.



== Coming soon ==

These features are on our todo list. There's no particular timeframe for any of them and they're in no particular order:

* Integration with Google and Bing for automatic translation
* Integration with Loco API for collaborative translation
* Support multiple message domains within a single package.


== Credits ==

* Dutch translations by [Niels Geryl](http://hetwittepaard.be)
* German translations by [Sebastian König](http://aykutmania.de)
* Turkish translations by [Abdullah Pazarbaşı](http://abdullahpazarbasi.com) and Abdullah Manaz
* Swedish translations by [Jimmy Malmqvist](http://jimmymalmqvist.com)
* Russian translations by [Alexey Tkachenko](http://atkachenko.ru)
* Indonesian translations by [Ivan Lanin](https://twitter.com/ivanlanin)
* Italian translations by [ElectricFeet](http://wordpress.org/support/profile/electricfeet)
* Polish translations by [Jerry1333](http://www.jerry1333.net)

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

