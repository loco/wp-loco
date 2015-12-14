/**
 * Loco js export: JavaScript function
 * Project: loco.po conversion
 * Release: Working copy
 * Locale: fa-IR, Persian
 * Exported by: Unregistered user
 * Exported at: Mon, 14 Dec 2015 11:00:52 +0000
 */
loco = window.loco||{}, loco.t = function( pairs ){
    
    // named plural forms
    var pluralForms = [
    "other"
];
    
    // calc numeric index of a plural form (0-0)
    function pluralIndex( n ){
        return Number( 0 );
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
    "Error": "خطا",
    "Warning": "اخطار",
    "OK": "اوکی",
    "Permission denied": "دسترسی امکان پذیر نیست",
    "Settings saved": "تنظیمات ذخیره شد",
    "%s is not an official WordPress language": "",
    "New PO file": "فایل PO جدید",
    "PO file used as template. This will be renamed to %s on first save": "فایل PO به جای قالب استفاده شد. در ذخیره اول، فایل به نام %s تغییر نام خواهد داد",
    "You must specify a valid locale for a new PO file": "شما باید یک مسیر قابل قبول برای فایل PO مشخص کنید",
    "No translatable strings found": "هیچ سطری برای ترجمه پیدا نشد",
    "Cannot create a PO file.": "ساخت فایل PO امکان پذیر نیست",
    "PO file already exists with locale %s": "فایل PO قبلا برای زبان %s وجیو دارد",
    "File cannot be created automatically. Fix the file permissions or use Download instead of Save": "فایل قایل دخیره شدن نیست. اجازه دسترسی فایل ها را درست کنید یا از دریافت به جای دخیره استفاده کنید",
    "%s file is empty": "فایل %s خالی است",
    "Run Sync to update from source code": "اجرای هماهنگ سازی برای به روز رسانی سورس کد",
    "No strings could be extracted from source code": "هیچ سطری از سورس کد پیدا نشد",
    "Run Sync to update from %s": "اجرای هماهنگ سازی برای به روز رسانی از %s",
    "Source code has been modified, run Sync to update POT": "سورس کد ویرایش شده است؛ برای به روز رسانی، هماهنگ سازی را اجرا کنید",
    "POT has been modified since PO file was saved, run Sync to update": "از زمانی که فایل PO ذخیره شده بود، فایل POT ویرایش شده است. هماهنگ سازی را اجرا کنید",
    "Bad file path": "مسیر قایل قبول نیست",
    "Empty or invalid %s file": "فایل %s خالی یا غیر قابل قبول می باشد",
    "%s file has no header": "فایل %s دارای سربرگ نمی باشد",
    "New template": "فرم جدید",
    "New language": "زبان جدید",
    "%s%% translated": "%s%% ترجمه شده",
    "1 string": {
        "other": "%s سطر"
    },
    "%s fuzzy": "%s مبهم",
    "%s untranslated": "%s ترجمه نشده",
    "Failed to compile MO file with built-in compiler": "فایل MO با کامپایلر توکار، کامپایل نشد",
    "Loco, Translation Management": "لوکو، مدریت ترجمه",
    "Manage translations": "مدریت ترجمه ها",
    "Translation options": "تنظیمات ترجمه ها",
    "Loco Translate": "مترجم لوکو",
    "Settings": "تنظیمات",
    "File download failed": "خطا در دریافت فایل",
    "WPLANG is deprecated and should be removed from wp-config.php": "WPLANG منسوخ شده و باید از wp-config.php پاک شود",
    "Unknown language": "زبان نا آشنا",
    "Some files not writable": "تعدادی از فایل قابل نوشتن نیستند",
    "Some files missing": "تعدادی از فایل ها موجود نیستند",
    "\"%s\" folder not writable": "پوشه %s قابل نوشتن نیست",
    "POT file not writable": "فایل POT قایل نوشتن نیست",
    "PO file not writable": "فایل PO فابل نوشتن نیست",
    "MO file not writable": "فایل MO فابل نوشتن نیست",
    "MO file not found": "فایل MO پیدا نشد",
    "Folder not writable": "پوشه قایل نوشتن نیست",
    "Folder not found": "پوشه پیدا نشد",
    "%s does not declare a \"Text Domain\"": "",
    "Loco has guessed \"%s\"": "",
    "%s does not declare a \"Domain Path\"": "",
    "%s has no POT file. Create one at \"%s/%s.pot\" if you need one.": "",
    "%s has a strange POT file name (%s). A better name would be \"%s.pot\"": "",
    "PHP extension \"%s\" is not installed. If you experience problems you should install it": "",
    "User does not have permission to manage translations": "کاربر دسترسی لازم برای مدریت ترجمه ها را ندارد",
    "Invalid data posted to server": "داده نادرست به سرور ارسال شده",
    "Failed to compile MO file with %s, check your settings": "خطای کامپایل فایل MO با %s. تنظیمات خود را برسی کنید",
    "Package not found called %s": "بسته ای با نام %s پیدا نشد",
    "Web server cannot create backups in \"%s\". Fix file permissions or disable backups in settings": "سرور نمی تواند در %s پشتیبان تهیه کند. اجازه دسترسی را درست کنید یا پشتیبان گیری را غیر فعال کنید",
    "Web server cannot create \"%s\" directory in \"%s\". Fix file permissions or create it manually.": "سرور نمی تواند پوشه %s را در %s یسازد. اجازه دسترسی بدهید و یا پوشه را به صورت دستی بسازید",
    "Web server cannot create files in the \"%s\" directory. Fix file permissions or use the download function.": "سرور نمی تواند فایلی در %s بسازد. اجازه دسترسی بدهید و یا از امکان دریافت استفاده کنید",
    "%s file is not writable by the web server. Fix file permissions or download and copy to \"%s/%s\".": "فایل %s قابل نوشتن نیست. اجازه دسترسی بدهید و یا یک نسخه به %s/%s کپی کنید",
    "Cannot create MO file": "فایل MO ساخته نشد",
    "Cannot overwrite MO file": "فایل MO دوباره نویسی نشد",
    "Failed to write MO file": "فایل MO نوشته نشد",
    "Unknown error": "خطای نا آشنا",
    "PO file saved": "فایل PO ذخیره شد",
    "and MO file compiled": "و فایل MO کامپایل شد",
    "Merged from %s": "از %s یکی سازی شد",
    "Merged from source code": "یکی سازی از سورس کد",
    "Already up to date with %s": "قبلا با %s به روز است",
    "Already up to date with source code": "قبلا با سورس کد به روز است",
    "1 new string added": {
        "other": "%s سطر اضافه شد"
    },
    "1 obsolete string removed": {
        "other": "%s سطر قدیمی پاک شد"
    },
    "Your changes will be lost if you continue without saving": "اگر بدون ذخیره کردن ادامه دهید، تنظیمات شما پاک خواهد شد",
    "Source text": "متن",
    "%s translation": "ترجمه %s",
    "Comments": "یادداشت",
    "Context": "متن",
    "Translation": "ترجمه",
    "No source files in this package, nothing to sync": "هیج فایل سورسی در این بسته پیدا نشد؛ چیزی برای هماهنگ سازی نیست",
    "No strings could be extracted from source files": "هیچ سطری از سورس کد وارد نشد",
    "create in <code>%s</code>": "در <code>%s</code> ساخته شود",
    "Packages": "بسته ها",
    "File check": "چک فایل",
    "File system permissions for %s": "اجازه دسترسی برای %s",
    "Other potential issues with %s": "",
    "Back": "فبلی",
    "Get help": "کمک بگیرید",
    "Package details": "جزئیات بسته",
    "Translations (PO)": "ترجمه (PO)",
    "Template (POT)": "قالب (POT)",
    "File permissions": "دسترسی فایل",
    "Extends: %s": "اضافه شد: %s",
    "1 language": {
        "other": "%u زبان"
    },
    "Updated": "به روز رسانی شد",
    "Powered by": "قدرت گرفته توسط",
    "Loco may not work as expected": "لوکو ممکن است درست کار نکند",
    "Configure Loco Translate": "تنظیم مترجم لوکو",
    "Compiling MO files": "در حال کامپایل فایل MO",
    "Use built-in MO compiler.": "استفاده از کامپایر توکار MO.",
    "Use external command:": "استفاده از دستور خارجی:",
    "Enter path to msgfmt on server": "وارد کردن مسیر msgfmt  در سرور",
    "Generate hash tables": "ساختن جدول hash",
    "Include Fuzzy strings": "",
    "Backing up PO files": "پشتیبان گیری از فایل های PO",
    "Number of backups to keep of each file:": "تعداد پشتیبان های گرفته شده از هر فایل:",
    "Experimental features": "قابلیت های آزمایشی",
    "Enable WordPress core translations": "فعال سازی ترجمه هسته وردپرس",
    "Save settings": "دخیره تنظیمات",
    "Template file": "قالب فایل",
    "Switch to...": "تعویض به",
    "never": "هرگز",
    "Save": "ذخیره",
    "Download": "دریافت",
    "Sync": "هماهنگ سازی",
    "Revert": "برگرداندن",
    "Add": "اضافه کردن",
    "Del": "پاک کردن",
    "Fuzzy": "مبهم",
    "Filter translations": "فیلتر ترجمه",
    "Help": "کمک",
    "Initialize new translations in %s": "ایجاد فایل ترجمه برای %s",
    "Select from common languages": "یکی از زبان های متداول رو انتخاب کنید",
    "or enter any language code": "یا کد زبان را وارد کنید",
    "create in plugin directory": "",
    "create in global languages directory": "در پوشه ترجمه های سراسری ساخته شود",
    "Start translating": "شروع ترجمه",
    "New version available": "نسخه جدید آماده است",
    "Upgrade to version %s of Loco Translate": "به نسخه %s مترجم لوکو به روز رسانی شد",
    "Select a plugin or theme to translate": "یک افزونه یا پوسته را برای ترجمه انتخاب کنید",
    "Themes": "پوسته ها",
    "Plugins": "افزونه ها",
    "Core": "هسته",
    "Translate WordPress plugins and themes directly in your browser": ""
} 
);
