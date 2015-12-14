/**
 * Loco js export: JavaScript function
 * Project: loco.po conversion
 * Release: Working copy
 * Locale: pl-PL, Polish
 * Exported by: Unregistered user
 * Exported at: Mon, 14 Dec 2015 11:00:55 +0000
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
        return Number( (n==1 ? 0 : n%10 >= 2 && n%10<=4 &&(n%100<10||n%100 >= 20)? 1 : 2) );
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
    "Error": "Błąd",
    "Warning": "Ostrzeżenie",
    "OK": "OK",
    "Permission denied": "Odmowa dostępu",
    "Settings saved": "Ustawienia zapisane",
    "%s is not an official WordPress language": "",
    "New PO file": "Nowy plik PO",
    "PO file used as template. This will be renamed to %s on first save": "Plik PO użyty jako szablon. Nazwa zostanie zmieniona na % przy pierwszym zapisie",
    "You must specify a valid locale for a new PO file": "Musisz określić właściwy region dla nowego pliku PO",
    "No translatable strings found": "Brak dostępnych lini do tłumaczenia",
    "Cannot create a PO file.": "Nie można utworzyć pliku PO.",
    "PO file already exists with locale %s": "Plik PO już istnieje z regionu %s",
    "File cannot be created automatically. Fix the file permissions or use Download instead of Save": "Plik nie może być utworzony automatycznie. Napraw uprawnienia albo użyj Pobierz zamiast Zapisz",
    "%s file is empty": "Plik %s jest pusty",
    "Run Sync to update from source code": "Uruchom synchronizację aby zaktualizować z kodu źródłowego",
    "No strings could be extracted from source code": "Nie można wyciągnąć żadnych linii z kodu źródłowego",
    "Run Sync to update from %s": "Uruchom synchronizację aby zaktualizować z %s",
    "Source code has been modified, run Sync to update POT": "Kod źródłowy został zaktualizowany, uruchom synchronizację aby zaktualizować plik POT",
    "POT has been modified since PO file was saved, run Sync to update": "Plik POT został zmieniony od czasu zapisu pliku PO, uruchom synchronizację aby zaktualizować",
    "Bad file path": "Błędna ścieżka pliku",
    "Empty or invalid %s file": "Pusty lub błędny plik %s",
    "%s file has no header": "Plik %s nie ma nagłówka",
    "New template": "Nowy szablon",
    "New language": "Nowy język",
    "%s%% translated": "%s%% przetłumaczono",
    "1 string": {
        "Form 0": "1 linia",
        "Form 1": "%s linie",
        "Form 2": "%s linii"
    },
    "%s fuzzy": "%s niepewnych",
    "%s untranslated": "%s nie przetłumaczone",
    "Failed to compile MO file with built-in compiler": "Niepowodzenie kompilacji pliku MO używając wbudowanego kompilatora",
    "Loco, Translation Management": "Loco, Menadżer Tłumaczeń",
    "Manage translations": "Zarządzaj tłumaczeniami",
    "Translation options": "Opcje tłumaczeń",
    "Loco Translate": "Loco Translate",
    "Settings": "Ustawienia",
    "File download failed": "Błąd pobierania pliku",
    "WPLANG is deprecated and should be removed from wp-config.php": "",
    "Unknown language": "Nieznany język",
    "Some files not writable": "Niektóre pliki są tylko do odczytu",
    "Some files missing": "Brakujące niektóre pliki",
    "\"%s\" folder not writable": "\"%s\" katalog jest tylko do odczytu",
    "POT file not writable": "Plik POT jest tylko do odczytu",
    "PO file not writable": "Plik PO jest tylko do odczytu",
    "MO file not writable": "Plik MO jest tylko do odczytu",
    "MO file not found": "Nie znaleziono pliku MO",
    "Folder not writable": "Katalog jest tylko do odczytu",
    "Folder not found": "Nie znaleziono katalogu",
    "%s does not declare a \"Text Domain\"": "",
    "Loco has guessed \"%s\"": "",
    "%s does not declare a \"Domain Path\"": "",
    "%s has no POT file. Create one at \"%s/%s.pot\" if you need one.": "",
    "%s has a strange POT file name (%s). A better name would be \"%s.pot\"": "",
    "PHP extension \"%s\" is not installed. If you experience problems you should install it": "",
    "User does not have permission to manage translations": "Użytkownik nie ma uprawnień do zarządzania tłumaczeniami",
    "Invalid data posted to server": "Błędne dane wysłane do serwera",
    "Failed to compile MO file with %s, check your settings": "Nie udało się skompilować pliku MO używając %s, sprawdź ustawienia",
    "Package not found called %s": "Paczka o nazwie %s nie została znaleziona",
    "Web server cannot create backups in \"%s\". Fix file permissions or disable backups in settings": "Serwer www nie może utworzyć kopii w \"%s\". Popraw uprawnienia lub wyłącz kopie zapasowe w ustawieniach",
    "Web server cannot create \"%s\" directory in \"%s\". Fix file permissions or create it manually.": "Serwer www nie może utworzyć katalogu \"%s\". Popraw uprawnienia lub utwórz go ręcznie.",
    "Web server cannot create files in the \"%s\" directory. Fix file permissions or use the download function.": "Serwer www nie może utworzyć plików w katalogu \"%s\". Popraw uprawnienia lub użyj funkcji pobierania.",
    "%s file is not writable by the web server. Fix file permissions or download and copy to \"%s/%s\".": "%s jest tylko do odczytu dla serwera www. Popraw uprawnienia lub pobierz i skopiuj do \"%s/%s\".",
    "Cannot create MO file": "Nie można utworzyć pliku MO",
    "Cannot overwrite MO file": "Nie można nadpisać pliku MO",
    "Failed to write MO file": "Błąd zapisu pliku MO",
    "Unknown error": "Nieznany błąd",
    "PO file saved": "Plik PO zapisany",
    "and MO file compiled": "oraz plik MO skompilowany",
    "Merged from %s": "Połączono z %s",
    "Merged from source code": "Połączono z kodu źródłowego",
    "Already up to date with %s": "Już aktualne z %s",
    "Already up to date with source code": "Już aktualne z kodu źródłowego",
    "1 new string added": {
        "Form 0": "1 nowa linia dodana",
        "Form 1": "%s nowe linie dodano",
        "Form 2": "%s nowych linii dodano"
    },
    "1 obsolete string removed": {
        "Form 0": "1 zbędna linia usunięta",
        "Form 1": "%s zbędne linie usunięte",
        "Form 2": "%s zbędnych linii usunięto"
    },
    "Your changes will be lost if you continue without saving": "Utracisz aktualne zmiany jeśli będziesz kontynuował bez zapisywania",
    "Source text": "Tekst źródłowy",
    "%s translation": "%s tłumaczenie",
    "Comments": "Komentarze",
    "Context": "Kontekst",
    "Translation": "Tłumaczenie",
    "No source files in this package, nothing to sync": "Brak plików źródłowych w tej paczce, nic do synchronizacji",
    "No strings could be extracted from source files": "Żadne linie nie mogą być wyciągnięte z plików źródłowych",
    "create in <code>%s</code>": "stwórz w <code>%s</code>",
    "Packages": "Paczki",
    "File check": "Sprawdzenie plików",
    "File system permissions for %s": "Uprawnienia systemu plików dla %s",
    "Other potential issues with %s": "",
    "Back": "Wstecz",
    "Get help": "Pomoc",
    "Package details": "Detale paczki",
    "Translations (PO)": "Tłumaczenia (PO)",
    "Template (POT)": "Schemat (POT)",
    "File permissions": "Uprawnienia plików",
    "Extends: %s": "Rozszerza: %s",
    "1 language": {
        "Form 0": "1 język",
        "Form 1": "%u języki",
        "Form 2": "%u języków"
    },
    "Updated": "Zaktualizowano",
    "Powered by": "Napędzany przez",
    "Loco may not work as expected": "Loco może nie działać tak jak oczekujesz",
    "Configure Loco Translate": "Konfiguruj Loco Translate",
    "Compiling MO files": "Kompilowanie plików MO",
    "Use built-in MO compiler.": "Użyj wbudowanego kompilatora MO.",
    "Use external command:": "Użyj zewnętrznej komendy:",
    "Enter path to msgfmt on server": "Wpisz ścieżkę do msgfmt na serwerze",
    "Generate hash tables": "Generuj tablice hash",
    "Include Fuzzy strings": "",
    "Backing up PO files": "Zrób kopię zapasową plików PO",
    "Number of backups to keep of each file:": "Liczba kopii zapasowych każdego pliku do przechowania:",
    "Experimental features": "Funkcje eksperymentalne",
    "Enable WordPress core translations": "Włącz tłumaczenie silnika WordPress",
    "Save settings": "Zapisz ustawienia",
    "Template file": "Plik schematu",
    "Switch to...": "Zmień na...",
    "never": "nigdy",
    "Save": "Zapisz",
    "Download": "Pobierz",
    "Sync": "Synchronizuj",
    "Revert": "Przywróć",
    "Add": "Dodaj",
    "Del": "Usuń",
    "Fuzzy": "Niepewny",
    "Filter translations": "Filtruj tłumaczenia",
    "Help": "Pomoc",
    "Initialize new translations in %s": "Zainicjuj nowe tłumaczenie w %s",
    "Select from common languages": "Wybierz z częstych języków",
    "or enter any language code": "lub wpisz dowolny kod języka",
    "create in plugin directory": "",
    "create in global languages directory": "stwórz w globalny, katalogu języków",
    "Start translating": "Zacznij tłumaczyć",
    "New version available": "Nowa wersja jest dostępna",
    "Upgrade to version %s of Loco Translate": "Zaktualizuj Loco Translate do wersji %s",
    "Select a plugin or theme to translate": "Wybierz wtyczkę lub motyw do tłumaczenia",
    "Themes": "Motywy",
    "Plugins": "Wtyczki",
    "Core": "Silnik",
    "Translate WordPress plugins and themes directly in your browser": ""
} 
);
