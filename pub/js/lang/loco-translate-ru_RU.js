/**
 * Loco js export: JavaScript function
 * Project: loco.po conversion
 * Release: Working copy
 * Locale: ru-RU, Russian
 * Exported by: Unregistered user
 * Exported at: Mon, 14 Dec 2015 11:00:56 +0000
 */
loco = window.loco||{}, loco.t = function( pairs ){
    
    // named plural forms
    var pluralForms = [
    "Form 0",
    "Form 1",
    "Form 2"
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
    "Error": "Ошибка",
    "Warning": "Предупреждение",
    "OK": "ОК",
    "Permission denied": "Доступ невозможен",
    "Settings saved": "Установки сохранены",
    "%s is not an official WordPress language": "",
    "New PO file": "Новый РО файл",
    "PO file used as template. This will be renamed to %s on first save": "PO файл используется как шаблон. Он будет переименован в %s при первом сохраннии.",
    "You must specify a valid locale for a new PO file": "Укажите правильную локаль для нового РО файла",
    "No translatable strings found": "Не обнаружено строк для перевода",
    "Cannot create a PO file.": "Невозможно создать РО файл",
    "PO file already exists with locale %s": "PO файл уже существует в локали %s",
    "File cannot be created automatically. Fix the file permissions or use Download instead of Save": "Файл не может быть создан автоматически. Исправьте права доступа, или используйте Загрузить вместо Сохранить",
    "%s file is empty": "%s файл пуст",
    "Run Sync to update from source code": "Выполните Синхронизацию для обновления из исходного кода",
    "No strings could be extracted from source code": "Нет строк для извлечения из исходного кода",
    "Run Sync to update from %s": "Выполните Синхронизацию для обновления из ",
    "Source code has been modified, run Sync to update POT": "Исходный код был изменён. Выполните Синхронизацию для обновления РОТ",
    "POT has been modified since PO file was saved, run Sync to update": "РОТ был изменён после сохранения РО. Выполните Синхронизацию для обновления",
    "Bad file path": "Неправильный путь к файлу",
    "Empty or invalid %s file": "Пустой, или поврежденный %s файл",
    "%s file has no header": "%s файл без заголовка",
    "New template": "Новый шаблон",
    "New language": "Новый язык",
    "%s%% translated": "%s%% переведено",
    "1 string": {
        "Form 0": "1 строка",
        "Form 1": "%s строк(и)",
        "Form 2": ""
    },
    "%s fuzzy": "неточный перевод",
    "%s untranslated": "%s не переведено",
    "Failed to compile MO file with built-in compiler": "Ошибка компиляции МО файла встроенным компилятором",
    "Loco, Translation Management": "Loco, управление переводами",
    "Manage translations": "Управление переводами",
    "Translation options": "Опции перевода",
    "Loco Translate": "Переводчик Loco",
    "Settings": "Установки",
    "File download failed": "Ошибка загрузки файла",
    "WPLANG is deprecated and should be removed from wp-config.php": "",
    "Unknown language": "Неизвестный язык",
    "Some files not writable": "Некоторые файлы недоступны для записи",
    "Some files missing": "Некоторые файлы с ошибками, или отсутствуют",
    "\"%s\" folder not writable": "\"%s\" каталог недоступен для записи",
    "POT file not writable": "РОТ файл недоступен для записи",
    "PO file not writable": "РО файл недоступен для записи",
    "MO file not writable": "МО файл недоступен для записи",
    "MO file not found": "МО файл не найден",
    "Folder not writable": "Каталог недоступен для записи",
    "Folder not found": "",
    "%s does not declare a \"Text Domain\"": "",
    "Loco has guessed \"%s\"": "",
    "%s does not declare a \"Domain Path\"": "",
    "%s has no POT file. Create one at \"%s/%s.pot\" if you need one.": "",
    "%s has a strange POT file name (%s). A better name would be \"%s.pot\"": "",
    "PHP extension \"%s\" is not installed. If you experience problems you should install it": "",
    "User does not have permission to manage translations": "У пользователя недостаточно прав для управления переводами",
    "Invalid data posted to server": "На сервер отправлены неверные данные",
    "Failed to compile MO file with %s, check your settings": "Ошибка компилирования МО файла с %s . Проверьте настройки",
    "Package not found called %s": "Не найден пакет  с именем ",
    "Web server cannot create backups in \"%s\". Fix file permissions or disable backups in settings": "Web сервер не может создать резервную копию в \"%s\". Исправьте права доступа, или отключите функцию резервирования в настройках",
    "Web server cannot create \"%s\" directory in \"%s\". Fix file permissions or create it manually.": "Web сервер не может создать \"%s\" каталог в \"%s\". Исправьте права доступа, или создайте каталог вручную",
    "Web server cannot create files in the \"%s\" directory. Fix file permissions or use the download function.": "Web сервер не может создать файлы в каталоге \"%s\" . Иправьте права доступа, или используйте функцию загрузки.",
    "%s file is not writable by the web server. Fix file permissions or download and copy to \"%s/%s\".": "%s файл не может быть записан на сервер. Исправьте права доступа или загрузите и скопируйте \"%s/%s\".",
    "Cannot create MO file": "Невозможно создать МО файл",
    "Cannot overwrite MO file": "Невозможно перезаписать МО файл",
    "Failed to write MO file": "Ошибка записи  МО файла",
    "Unknown error": "Неизвестная ошибка",
    "PO file saved": "РО файл сохранён",
    "and MO file compiled": "и МО файл скомпилирован",
    "Merged from %s": "Объединено с %s",
    "Merged from source code": "Объединено с исходным кодом",
    "Already up to date with %s": "",
    "Already up to date with source code": "",
    "1 new string added": {
        "Form 0": "1 новая строка добавлена",
        "Form 1": "%s новых строки добавлено",
        "Form 2": ""
    },
    "1 obsolete string removed": {
        "Form 0": "1строка удалена",
        "Form 1": "%s строки удалено",
        "Form 2": ""
    },
    "Your changes will be lost if you continue without saving": "Изменения будут потеряны, если Вы не сохранитесь",
    "Source text": "",
    "%s translation": "",
    "Comments": "",
    "Context": "",
    "Translation": "Перевод",
    "No source files in this package, nothing to sync": "",
    "No strings could be extracted from source files": "Нет строк для обработки из исходного кода",
    "create in <code>%s</code>": "",
    "Packages": "Пакеты переводов",
    "File check": "Проверка файла",
    "File system permissions for %s": "Права доступа файловой системы для ",
    "Other potential issues with %s": "",
    "Back": "Назад",
    "Get help": "Помощь",
    "Package details": "Детали пакета",
    "Translations (PO)": "Переводы (РО)",
    "Template (POT)": "Шаблоны (РОТ)",
    "File permissions": "Права доступа к файлу",
    "Extends: %s": "",
    "1 language": {
        "Form 0": "1 язык",
        "Form 1": "%u языка(ов)",
        "Form 2": ""
    },
    "Updated": "Обновлённый",
    "Powered by": "Представлено",
    "Loco may not work as expected": "Плагин Loco может не работать, как ожидалось",
    "Configure Loco Translate": "Настройка Loco",
    "Compiling MO files": "Комптляция МО файлов",
    "Use built-in MO compiler.": "Использовать встроенный МО компилятор",
    "Use external command:": "Использовать внешнюю программу:",
    "Enter path to msgfmt on server": "Путь к msgfmt на сервере",
    "Generate hash tables": "Генерировать hash таблицы",
    "Include Fuzzy strings": "",
    "Backing up PO files": "Резервное копирование РО файлов",
    "Number of backups to keep of each file:": "",
    "Experimental features": "",
    "Enable WordPress core translations": "",
    "Save settings": "Сохранить установки",
    "Template file": "Файл шаблона",
    "Switch to...": "Переключиться на...",
    "never": "никогда",
    "Save": "Сохранить",
    "Download": "Загрузить",
    "Sync": "Синхронизация",
    "Revert": "Вернуться",
    "Add": "Добавить",
    "Del": "Удалить",
    "Fuzzy": "отметить, как неточный перевод",
    "Filter translations": "Поиск фразы по фильтру",
    "Help": "Помощь",
    "Initialize new translations in %s": "Начать новый перевод %s",
    "Select from common languages": "Выбрать язык из списка",
    "or enter any language code": "или ввести код языка",
    "create in plugin directory": "",
    "create in global languages directory": "",
    "Start translating": "Начать перевод",
    "New version available": "Доступна новая версия",
    "Upgrade to version %s of Loco Translate": "Обновить Loco Translate до версии %s",
    "Select a plugin or theme to translate": "Выбрать плагин или тему для перевода ",
    "Themes": "Темы",
    "Plugins": "Плагины",
    "Core": "Ядро",
    "Translate WordPress plugins and themes directly in your browser": ""
} 
);
