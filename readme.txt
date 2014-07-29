=== Plugin Name ===
Contributors: timwhitlock
Tags: translation, translators, localization, localisation, l10n, i18n, Gettext, POEdit, productivity
Requires at least: 3.5
Tested up to: 3.9.1
Stable tag: 1.4.6
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Translate Wordpress plugins and themes directly in your browser


== Description ==

The Loco Translate plugin provides in-browser editing of PO files used for localizing Wordpress plugins and themes.

Features include:

* POEdit style translations editor within Wordpress admin
* Create and update language files directly in your theme or plugin
* Extraction of translatable strings from your source code
* Native MO file compilation without the need for Gettext on your system
* Support for PO features including comments, references and plural forms
* Configurable PO file backups

Official [Loco](https://localise.biz/) WordPress plugin by <a href="//twitter.com/timwhitlock">@timwhitlock</a> / <a rel="author" href="https://plus.google.com/106703751121449519322">Tim Whitlock</a>



== Installation ==

1. Unzip all files to the `/wp-content/plugins/loco-translate` directory
2. Log into Wordpress admin and activate the 'Loco Translate' plugin through the 'Plugins' menu
3. Go to *Loco Translate > Manage Translations* in the left-hand menu to start translating


If you want to create new translations for a theme or plugin, follow these steps:

1. Create a `languages` directory in your plugin or theme's root directory
2. Make the new directory writable by the web server
3. Find the theme or plugin in the list at *Loco Translate > Manage Translations*
4. Click `+ New language` and follow the on-screen prompts.

A quick guide on using the plugin is [available here](https://localise.biz/help/wordpress/translate-plugin), but make sure you're familiar with the conventions of [Translating Wordpress](http://codex.wordpress.org/Translating_WordPress) before you start.

Please note that this plugin doesn’t support Windows servers and the editor doesn't fully support MSIE<=8.


== Frequently Asked Questions ==

= Does this automatically translate my project? =

No. It's for manually entering your own translations, but we do intend to be integrating some automatic translation services into the plugin soon.


= Why can't it extract any translatable strings from my code? =

The extraction process looks for Wordpress translation functions with string literal arguments, such as `__('Foo')`.

Using your own custom functions like `myTranslate('Foo')` won't work. Neither will using variables, such as `__( $foo )`.

= Why can't I see the translations appearing in my theme/plugin? =

All Loco Translate does is manage your translation process and organize your files. There is more to localizing your theme or plugin than just creating the files. 

Make sure you're familiar with the conventions of [translating Wordpress](http://codex.wordpress.org/Translating_WordPress) and if you think Loco is saving invalid files or putting them in the wrong place, then open a [support ticket](http://wordpress.org/support/plugin/loco-translate).



= Do I need to create a POT file? =

There are some good reasons to do so, but you don't have to in order to use this plugin.

Loco Translate allows you to work purely with PO files and keep them up to date with the source code without the interim step of maintaining a POT file.


= Why do I get errors when I try to save translations? =

To save PO files directly to your project, the files must be writable by the web server. 

You shouldn't do this on a live server, only for developing your theme or plugin on a local server.

If you're unsure how to set file permission on your server, ask your system administrator.


= How do I create MO files? =

Every time you save a PO file, Loco tries to compile a MO file in the same location. As above, ensure that the web server is able to write to disk, otherwise MO compilation will fail.

If you have [Gettext](http://www.gnu.org/software/gettext/) installed on your server you can use this instead of Loco's built-in compiler. 
You can configure the path to the `msgfmt` program in the Settings tab.


= Does it support Windows? =

You can access the interface on Windows using Internet Explorer, but version 9 or above is recommended.  
Loco Translate does not support Windows versions of PHP, so if your server running Wordpress has a Windows operating system the back end may not work properly.



== Screenshots ==

1. Translating strings in the browser with the Loco PO Editor
2. Listing of all available translation files installed



== Changelog ==

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
* Better POEdit integration, including source headers and file refs
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

= 1.4.6 =
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

