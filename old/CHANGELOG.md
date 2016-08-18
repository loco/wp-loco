# Legacy version changelog


= 1.5.6 =
* Added Czech and Greek translations
* Updated Russian and Polish translations
* No longer using glob functions

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