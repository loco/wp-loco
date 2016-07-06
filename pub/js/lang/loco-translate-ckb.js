/**
 * Loco js export: JavaScript function
 * Project: loco.po conversion
 * Release: Working copy
 * Locale: ckb-GB, Central Kurdish
 * Exported by: Unregistered user
 * Exported at: Wed, 06 Jul 2016 12:21:05 +0100
 */
loco = window.loco||{}, loco.t = function( pairs ){
    
    // named plural forms
    var pluralForms = [
    "one",
    "other"
];
    
    // calc numeric index of a plural form (0-1)
    function pluralIndex( n ){
        return Number( n != 1 );
    }

    // expose public t() function
    return function( msgid1, msgid2, n ){
        var value = pairs[msgid1];
        // singular if no multiplier
        if( null == n ){
            n = 1;
        }
        // plurals stored as objects, e.g. { one: "" }
        if( value instanceof Object ){
            value = value[ pluralForms[ pluralIndex(n) ] || 'one' ];
        }
        return value || ( 1 === n ? msgid1 : msgid2 ) || msgid1 || '';
    };
}(
    {
    "Error": "هەڵە",
    "Warning": "ئاگاداری",
    "OK": "باشە",
    "Permission denied": "ڕێنەدراو",
    "Settings saved": "ڕێکخستنەکان پاشەکەوتکران",
    "%s is not an official WordPress language": "% زمانێکی فەڕمی وێردپرێس نیە",
    "New PO file": "دۆسیەیەکی (PO)ی نوێ",
    "PO file used as template. This will be renamed to %s on first save": "دۆسیەی (PO) وەکو داڕێژەیەک بەکارهاتووە، ئەمەش لە یەکەمین پاشەکەوتدا ناوی دەنێتەوە \n%s",
    "You must specify a valid locale for a new PO file": "دەبێ شوێنێکی ناوەکیی دروست دیاری بکەی بۆ دۆسیەی نوێی (PO)",
    "No translatable strings found": "هیچ زنجیرەوەرگێڕانێک نەدۆزرایەوە",
    "Cannot create a PO file.": "ناتوانی دۆسیەی (PO) دروست بکەی.",
    "PO file already exists with locale %s": "دۆسیەی (PO) ئامادەیە لەگەڵ %sی ناوەکی",
    "File cannot be created automatically. Fix the file permissions or use Download instead of Save": "لەخۆوە ناتوانرێ دۆسیە دروست بکرێ، ڕێدانەکانی دۆسیەکە چارەسەر بکە، یان داگرتن بەکار بێنە لەبری پاشەکەوتکردن",
    "%s file is empty": "دۆسیەی \n%s بەتاڵە",
    "Run Sync to update from source code": "هاوهەنگاوی بەکار بخە بۆ نوێکردنەوە لە کۆدی سەرچاوەوە",
    "No strings could be extracted from source code": "هیچ زنجیرەدەقێک نەتوانرا لە کۆدی سەرچاوەوە دەربهێنرێ",
    "Run Sync to update from %s": "هاوهەنگاوی بەکار بخە بۆ نوێکردنەوە لە \n%s\nەوە",
    "Source code has been modified, run Sync to update POT": "کۆدی سەرچاوە دەستکاریکرا، هاوهەنگاوی بەکار بخە بۆ نوێکردنەوەی (POT)",
    "POT has been modified since PO file was saved, run Sync to update": "(POT) دەستکاری کرا لەوەتەی دۆسیەی (PO) پاشەکەوتکراوە، هاوهەنگاوی بەکار بخە بۆ نوێکردنەوە",
    "Bad file path": "ڕێڕەوی دۆسیە خراپە",
    "Empty or invalid %s file": "بەتاڵە یان دۆسیەی \n%s نادروستە",
    "%s file has no header": "دۆسیەی \n%s هیچ سەرپەڕێکی نیە",
    "New template": "داڕێژەی نوێ",
    "New language": "زمانی نوێ",
    "%s%% translated": "%s%% وەرگێڕدراوە",
    "1 string": {
        "one": "زنجیرەدەقێک",
        "other": "%s زنجیرەدەق"
    },
    "%s fuzzy": "%s ناڕوونە",
    "%s untranslated": "%s وەرنەگێڕدراوە",
    "Failed to compile MO file with built-in compiler": "تێکخستنی دۆسیەی (MO) شکستی هێنا بە تێکخەری ناوخۆیی",
    "Loco, Translation Management": "لۆکۆ، بەڕێوەبەرایەتی وەرگێڕان",
    "Manage translations": "بەڕێوەبردنی وەرگێڕانەکان",
    "Translation options": "هەڵبژاردنەکانی وەرگێڕان",
    "Loco Translate": "لۆکۆ وەرگێڕ",
    "Settings": "ڕێکخستنەکان",
    "File download failed": "داگرتنی دۆسیە شکستی هێنا",
    "WPLANG is deprecated and should be removed from wp-config.php": "WPLANG بەباش دانانرێ و دەبێ لە \nwp-config.php ڕەش بکرێتەوە",
    "Unknown language": "زمانێکی نەزانراوە",
    "Some files not writable": "هەندێ دۆسیە بۆ نووسینەوە نیە",
    "Some files missing": "هەندێ دۆسیە دیار نین",
    "\"%s\" folder not writable": "بوخچەی \"%s\" بۆ نووسینەوە نیە",
    "POT file not writable": "دۆسیەی (POT) بۆ نووسینەوە نیە",
    "PO file not writable": "دۆسیەی (PO) بۆ نووسینەوە نیە",
    "MO file not writable": "دۆسیەی (MO) بۆ نووسینەوە نیە",
    "MO file not found": "دۆسیەی (MO) نەدۆزرایەوە",
    "Folder not writable": "بوخچە بۆ نووسینەوە نیە",
    "Folder not found": "بوخچە نەدۆزرایەوە",
    "%s does not declare a \"Text Domain\"": "%s هیچ دەقەپاوانێکی ڕانەگەیاندووە",
    "Loco has guessed \"%s\"": "لۆکۆ \"%s\"ی خەملاندووە.",
    "%s does not declare a \"Domain Path\"": "%s هیچ ڕێڕەوێکی پاوانی ڕانەگەیاندووە",
    "%s has no POT file. Create one at \"%s/%s.pot\" if you need one.": "%s هیچ دۆسیەیەکی (POT)ی نیە، ئەگەر دەتەوێ دانەیەک لە \"%s/%s.pot\" دروست بکە",
    "%s has a strange POT file name (%s). A better name would be \"%s.pot\"": "%s دۆسیەناوێکی (POT)ی نامۆی هەیە کە (%s) ناویەتی، \"%s.pot\" بە ناوێکی باش دادەنرێ.",
    "User does not have permission to manage translations": "بەکارهێنەر ڕێپێدراو نیە بۆ بەڕێوەبردنی وەرگێڕانەکان",
    "Invalid data posted to server": "دراوەی نادروست لە ڕاژەکە بڵاوکراوەتەوە",
    "Failed to compile MO file with %s, check your settings": "تێکخستنی دۆسیە (MO)کە لەگەڵ %s شکستی هێنا، بە ڕێکخستنەکاندا بچۆوە",
    "Package not found called %s": "هیچ پاکەتێک بە ناوی %s نەدۆزرایەوە",
    "Web server cannot create backups in \"%s\". Fix file permissions or disable backups in settings": "تۆڕەڕاژە ناتوانێ پاراستنەکان لە \"%s\" دروست بکات، ڕێپێدانەکانی دۆسیە چارەسەر بکە یان ڕێکخستنەکانی پاراستنەکان ناکارا بکە",
    "Web server cannot create \"%s\" directory in \"%s\". Fix file permissions or create it manually.": "تۆڕەڕاژە ناتوانێ بوخچەی \"%s\" لە \"%s\" دروست بکات، ڕێپێدانەکانی دۆسیە چارەسەر بکە یان دەستکردانە دروستی بکە.",
    "Web server cannot create files in the \"%s\" directory. Fix file permissions or use the download function.": "تۆڕەڕاژە ناتوانێ دۆسیە لە بوخچەی \"%s\" دروست بکات، ڕێپێدانەکانی دۆسیە چارەسەر بکە یان فەرمانی داگرتن بەکار بهێنە",
    "%s file is not writable by the web server. Fix file permissions or download and copy to \"%s/%s\".": "%s شیاوی دەستکاری نیە بەهۆی تۆڕەڕاژەوە، ڕێپێدانەکانی دۆسیە چارەسەر بکە یان دای بگرە و لەبەری بگرەوە بۆ \n\"%s/%s\".",
    "Cannot create MO file": "ناتوانرێ دۆسیەی (MO) دروستکرێ",
    "Cannot overwrite MO file": "ناتوانرێ دۆسیە (MO)کە لەسەری بنووسرێتەوە",
    "Failed to write MO file": "نووسینی دۆسیە (MO)کە شکستی هێنا",
    "Packages": "پاکەتەکان",
    "File check": "پشکنینی دۆسیە",
    "File system permissions for %s": "ڕێپێدانی سیستەم بۆ دۆسیەی %s",
    "Other potential issues with %s": "کێشە ناڕوونەکان لەگەڵ %s",
    "Back": "گەڕانەوە",
    "Get help": "داوای یارمەتی",
    "Package details": "وردەکارییەکانی پاکەت",
    "Translations (PO)": "وەرگێڕانەکان (PO)",
    "Template (POT)": "داڕێژە (POT)",
    "File permissions": "ڕێپێدراوی دۆسیە",
    "Extends: %s": "لقوپۆپەکان: %s",
    "1 language": {
        "one": "زمانێک",
        "other": "%s زمان"
    },
    "Updated": "نوێکراوەتەوە",
    "Powered by": "بە پشتگیریی",
    "Loco may not work as expected": "لۆکۆ ڕەنگە وەک ئەوەی چاوەڕێ دەکرێ کار نەکات",
    "Configure Loco Translate": "سازدانی لۆکۆ وەرگێڕ",
    "Compiling MO files": "تێکخستنی دۆسیە (MO)کان",
    "Use built-in MO compiler.": "بەکارهێنانی (MO) تێکخەری ناوخۆیی.",
    "Use external command:": "بەکارهێنانی فرمانە دەرەکیەکان:",
    "Enter path to msgfmt on server": "ڕێڕەوی (msgfmt)ی سەر ڕاژە لێبدە",
    "Generate hash tables": "دروستکردنی خشتە هاشیەکان",
    "Include Fuzzy strings": "لەخۆگرتنی دێرە ناڕوونەکان",
    "Backing up PO files": "پاراستنی دۆسیە (PO)کان",
    "Number of backups to keep of each file:": "ژمارەی پاراستنەکان بۆ هێشتنەوەی هەر دۆسیەیەک:",
    "Experimental features": "تایبەتمەندیە تاقیکاریەکان",
    "Enable WordPress core translations": "کاراکردنی وەرگێڕانەکانی کاکڵی وێردپرێس",
    "Save settings": "پاشەکەوتکردنی ڕێکخستنەکان",
    "Template file": "دۆسیەی داڕێژە",
    "Switch to...": "گۆڕین بۆ...",
    "never": "هەرگیز",
    "Save": "پاشەکەوتکردن",
    "Download": "داگرتن",
    "Sync": "هاوهەنگاوی",
    "Revert": "گەڕاندنەوە",
    "Add": "زیادکردن",
    "Del": "سڕینەوە",
    "Fuzzy": "ناڕوون",
    "Filter translations": "پاڵاوتنی وەرگێڕانەکان",
    "Help": "یارمەتی",
    "Initialize new translations in %s": "دەستپێکردنی وەرگێڕانی نوێ لە %s",
    "Select from common languages": "دیاریکردن لە زمانە باوەکانەوە",
    "or enter any language code": "یان کۆدی زمانێک لێبدە",
    "create in <code>%s</code>": "دروستکردن لە <code>%s</code>",
    "create in global languages directory": "دروستکردن لە بوخچەی زمانە جیهانیەکان",
    "Start translating": "دەستپێکردنی وەرگێڕان",
    "New version available": "وەشانی نوێ بەردەستە",
    "Upgrade to version %s of Loco Translate": "بەرزکردنەوە بۆ وەشانی %sی لۆکۆ وەرگێڕ",
    "Select a plugin or theme to translate": "پێوەکراوەیەک یان ڕووکارێک دیاری بکە بۆ وەرگێڕان.",
    "Themes": "ڕووکارەکان",
    "Plugins": "پێوەکراوەکان",
    "Core": "کاکڵ",
    "PHP extension \"%s\" is not installed. If you experience problems you should install it": "لقوپۆپەی پی ئێچ پی \"%s\" دانەمەزراوە، ئەگەر تووشی کێشە هاتی؛ دەبێ دای بمەزرێنیت",
    "Unknown error": "هەڵەی نەناسراو",
    "PO file saved": "دۆسیەی (PO)کە پاشەکەوتکرا",
    "and MO file compiled": "دۆسیە (MO)کەش تێکخرا",
    "Merged from %s": "لەگەڵ %s یەکخراون",
    "Merged from source code": "لەگەڵ کۆدی سەرچاوە یەکخراون",
    "Already up to date with %s": "هەتا ئێستا وەک %s وایە",
    "Already up to date with source code": "هەتا ئێستا وەک کۆدی سەرچاوەیە",
    "1 new string added": {
        "one": "دێرێکی نوێ زیادکرا",
        "other": "%s دێری نوێ زیادکرا"
    },
    "1 obsolete string removed": {
        "one": "دێرێکی بەسەرچوو سڕاوەتەوە",
        "other": "%s دێری بەسەرچوو سڕاوەتەوە"
    },
    "Your changes will be lost if you continue without saving": "گۆڕانکاریەکانت لەدەست دەدەیت؛ ئەگەر بەبێ پاشەکەوتکردن بەردەوام بیت!",
    "Source text": "دەقی سەرچاوە",
    "%s translation": "%s وەرگێڕان",
    "Comments": "لێدوانەکان",
    "Context": "پێکهاتە",
    "Translation": "وەرگێڕان",
    "No source files in this package, nothing to sync": "هیچ دۆسیەیەکی سەرچاوە لەم پاکەتەدا نیە، هیچ شتێکیش بۆ هاوهەنگاوی نیە",
    "No strings could be extracted from source files": "ناتوانرێ هیچ دێرێک لە دۆسیە سەرچاوەکان دەربهێنرێ",
    "Translate WordPress plugins and themes directly in your browser": "",
    "http://wordpress.org/extend/plugins/loco-translate": "http://wordpress.org/extend/plugins/loco-translate",
    "Tim Whitlock": "Tim Whitlock",
    "https://localise.biz/help/wordpress/translate-plugin": "https://localise.biz/help/wordpress/translate-plugin"
} 
);
