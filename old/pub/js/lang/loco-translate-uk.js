/**
 * Loco js export: JavaScript function
 * Project: loco.po conversion
 * Release: Working copy
 * Locale: uk-UA, Ukrainian
 * Exported by: Unregistered user
 * Exported at: Wed, 06 Jul 2016 12:21:14 +0100
 */
loco = window.loco||{}, loco.t = function( pairs ){
    
    // named plural forms
    var pluralForms = [
    "one",
    "few",
    "other"
];
    
    // calc numeric index of a plural form (0-2)
    function pluralIndex( n ){
        return Number( (n%10==1 && n%100!=11 ? 0 : n%10 >= 2 && n%10<=4 &&(n%100<10||n%100 >= 20)? 1 : 2) );
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
    "Error": "Помилка",
    "Warning": "Попередження",
    "OK": "ОК",
    "Permission denied": "Доступ заборонено",
    "Settings saved": "Налаштування збережено",
    "%s is not an official WordPress language": "%s не є офіційною мовою WordPress",
    "New PO file": "Новий РО-файл",
    "PO file used as template. This will be renamed to %s on first save": "РО-файл використовується як шаблон. Його буде перейменовано до %s при першому збереженні",
    "You must specify a valid locale for a new PO file": "Ви маєте визначити правильну локаль для нового РО-файла",
    "No translatable strings found": "Не знайдено строк, які можна було б перекласти",
    "Cannot create a PO file.": "Не можу створити РО файл.",
    "PO file already exists with locale %s": "РО-файл вже існує для локалі %s",
    "File cannot be created automatically. Fix the file permissions or use Download instead of Save": "Файл не може бути створений автоматично. Виправте права доступу або використайте «Завантажити» замість «Зберегти»",
    "%s file is empty": "%s файл пустий",
    "Run Sync to update from source code": "Запустіть «Синхронізувати», щоб оновити з ісходного коду",
    "No strings could be extracted from source code": "Немає строк, які можуть бути витягнуті із ісходного коду",
    "Run Sync to update from %s": "Запустіть «Синхронізувати», щоб оновити з %s",
    "Source code has been modified, run Sync to update POT": "Ісходний код було модифіковано, запустіть «Синхронізувати», щоб оновити РОТ",
    "POT has been modified since PO file was saved, run Sync to update": "РОТ було модифіковано з моменту останнього збереження РО-файлу, запустіть «Синхронізувати» для оновлення",
    "Bad file path": "Невірний шлях до файлу",
    "Empty or invalid %s file": "Пустий або ушкоджений %s файл ",
    "%s file has no header": "%s файл не має заголовку",
    "New template": "Новий шаблон",
    "New language": "Нова мова",
    "%s%% translated": "%s%% перекладено",
    "1 string": {
        "one": "1 строка",
        "few": "%s строк",
        "other": ""
    },
    "%s fuzzy": "%s неясний",
    "%s untranslated": "%s неперекладено",
    "Failed to compile MO file with built-in compiler": "Не вдалося скомпілювати МО-файл за допомогою вбудованного компілятора",
    "Loco, Translation Management": "Керування перекладами Loco",
    "Manage translations": "Керувати перекладами",
    "Translation options": "Налаштування перекладів",
    "Loco Translate": "Перекладач Loco",
    "Settings": "Налаштування",
    "File download failed": "Скачування файлу не вдалося",
    "WPLANG is deprecated and should be removed from wp-config.php": "WPLANG застарів і його буде видалено з wp-config.php",
    "Unknown language": "Невідома мова",
    "Some files not writable": "Деякі файли неможливо записувати",
    "Some files missing": "Деякі файли відсутні",
    "\"%s\" folder not writable": "Папка \"%s\" не дозволяє записувати",
    "POT file not writable": "РОТ-файл не дозволяє записувати",
    "PO file not writable": "РО-файл не дозволяє записувати",
    "MO file not writable": "МО-файл не дозволяє записувати",
    "MO file not found": "МО-файл не знайдено",
    "Folder not writable": "Папка не дозволяє записувати",
    "Folder not found": "Папку не знайдено",
    "%s does not declare a \"Text Domain\"": "%s не декларує \"Text Domain\"",
    "Loco has guessed \"%s\"": "Loco припускає \"%s\"",
    "%s does not declare a \"Domain Path\"": "%s не декларує \"Domain Path\"",
    "%s has no POT file. Create one at \"%s/%s.pot\" if you need one.": "%s не має РОТ-файлу. Створіть його як \"%s/%s.pot\", якщо ви потребуєте.",
    "%s has a strange POT file name (%s). A better name would be \"%s.pot\"": "%s має дивну назву РОТ-файлу (%s). Кращою назвою була б \"%s.pot\"",
    "User does not have permission to manage translations": "Користувач немає доступу до керування перекладами",
    "Invalid data posted to server": "Невірна дата встановлена на сервері",
    "Failed to compile MO file with %s, check your settings": "Невдалося скомпілювати МО-файл за допомогою %s, перевірте ваші налаштування",
    "Package not found called %s": "Пакунок %s не знайдено",
    "Web server cannot create backups in \"%s\". Fix file permissions or disable backups in settings": "Сервер не може створити бекап у \"%s\". Виправте права доступу до файлів, або вимкніть створення бекапів у налаштуваннях.",
    "Web server cannot create \"%s\" directory in \"%s\". Fix file permissions or create it manually.": "Сервер не може створити папку \"%s\" у \"%s\". Виправте права доступу до папки або створіть її вручну.",
    "Web server cannot create files in the \"%s\" directory. Fix file permissions or use the download function.": "Сервер не може створити файл у папці \"%s\". Виправте права доступу або використовуйте функції «Скачати РО» та «Скачати МО».",
    "%s file is not writable by the web server. Fix file permissions or download and copy to \"%s/%s\".": "Сервер не дозволяє записувати у файл %s. Виправте права доступу або скачайте файл та скопіюйте його вручну до \"%s/%s\".",
    "Cannot create MO file": "Не можу створити МО-файл",
    "Cannot overwrite MO file": "Не можу переписати МО-файл",
    "Failed to write MO file": "Не вдалося записати МО-файл",
    "Packages": "Пакунки",
    "File check": "Перевірка файлу",
    "File system permissions for %s": "Налаштування файлової системи для %s",
    "Other potential issues with %s": "Інші потенційні проблеми з %s",
    "Back": "Повернутись назад",
    "Get help": "Отримати допомогу",
    "Package details": "Деталі пакунку",
    "Translations (PO)": "Переклади (РО)",
    "Template (POT)": "Шаблони (РОТ)",
    "File permissions": "Доступ до файлів",
    "Extends: %s": "Розширення: %s",
    "1 language": {
        "one": "1 мова",
        "few": "%u мов",
        "other": "%u мов"
    },
    "Updated": "Оновлено",
    "Powered by": "Запроваджено",
    "Loco may not work as expected": "Можливо, Loco працює не так, як планувалося",
    "Configure Loco Translate": "Налаштувати Перекладач Loco",
    "Compiling MO files": "Компіляція МО-файлів",
    "Use built-in MO compiler.": "Використовувати вбудований МО-компілятор.",
    "Use external command:": "Використовувати зовнішні команди:",
    "Enter path to msgfmt on server": "Введіть шлях до msgfmt на сервері",
    "Generate hash tables": "Генерувати таблицю хешів",
    "Include Fuzzy strings": "Включити нечітки строки",
    "Backing up PO files": "Збереження(бекап) РО-файлів",
    "Number of backups to keep of each file:": "Скільки бекапів зберегати для кожного файлу:",
    "Experimental features": "Експериментальні можливості",
    "Enable WordPress core translations": "Включити переклад ядра WordPress",
    "Save settings": "Зберегти налаштування",
    "Template file": "Файл шаблону",
    "Switch to...": "Переключитись до...",
    "never": "ніколи",
    "Save": "Зберегти",
    "Download": "Скачати",
    "Sync": "Синхронізувати",
    "Revert": "Повернути",
    "Add": "Додати",
    "Del": "Видалити",
    "Fuzzy": "Нечіткі",
    "Filter translations": "Фільтрувати переклади",
    "Help": "Справка",
    "Initialize new translations in %s": "Ініціалізувати нові переклади у %s",
    "Select from common languages": "Оберіть із доступних мов",
    "or enter any language code": "або введіть код будь-якої мови",
    "create in <code>%s</code>": "створено у <code>%s</code>",
    "create in global languages directory": "створити у глобальній папці для мов",
    "Start translating": "Розпочати переклад",
    "New version available": "Нова версія доступна",
    "Upgrade to version %s of Loco Translate": "Оновіться до версії %s Перекладача Loco",
    "Select a plugin or theme to translate": "Оберіть плагін або тему для перекладу",
    "Themes": "Теми",
    "Plugins": "Плагіни",
    "Core": "Ядро",
    "PHP extension \"%s\" is not installed. If you experience problems you should install it": "PHP-розширення \"%s\" не встановлене. Якщо ви досвічені у цих питаннях, встановіть його",
    "Unknown error": "Невідома помилка",
    "PO file saved": "РО-файл збережено",
    "and MO file compiled": "та МО-файл скомпільовано",
    "Merged from %s": "Об'єднано з %s",
    "Merged from source code": "Об'єднано з ісходним кодом",
    "Already up to date with %s": "Вже оновлено з %s",
    "Already up to date with source code": "Вже оновлено з ісходного коду",
    "1 new string added": {
        "one": "1 нову строку додано",
        "few": "%s нових строк додано",
        "other": "%s нових строк додано"
    },
    "1 obsolete string removed": {
        "one": "1 застарілу строку видалено",
        "few": "%s застарілих строк видалено",
        "other": "%s застарілих строк видалено"
    },
    "Your changes will be lost if you continue without saving": "Внесені зміни буде втрачено, якщо ви продовжите без збереження",
    "Source text": "Ісходний текст",
    "%s translation": "%s переклад",
    "Comments": "Коментарі",
    "Context": "Контекст",
    "Translation": "Переклад",
    "No source files in this package, nothing to sync": "Немає ісходних файлів у цьому пакунку, немає що синхронізувати",
    "No strings could be extracted from source files": "Немає строк, які б можна було витягнути із ісходних файлі",
    "Translate WordPress plugins and themes directly in your browser": "Переклад плагінів та тем WordPress прямо у вашому браузері",
    "http://wordpress.org/extend/plugins/loco-translate": "http://wordpress.org/extend/plugins/loco-translate",
    "Tim Whitlock": "Tim Whitlock",
    "https://localise.biz/help/wordpress/translate-plugin": "https://localise.biz/help/wordpress/translate-plugin"
} 
);
