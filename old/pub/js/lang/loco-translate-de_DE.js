/**
 * Loco js export: JavaScript function
 * Project: loco.po conversion
 * Release: Working copy
 * Locale: de-DE, German
 * Exported by: Unregistered user
 * Exported at: Wed, 06 Jul 2016 12:21:06 +0100
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
    "Error": "Fehler",
    "Warning": "Warnung",
    "OK": "OK",
    "Permission denied": "Zugriff verweigert",
    "Settings saved": "Einstellungen gespeichert",
    "%s is not an official WordPress language": "",
    "New PO file": "Neue PO-Datei",
    "PO file used as template. This will be renamed to %s on first save": "PO-Datei wird als Template verwendet. Dies wird in %s beim ersten Speichern umbenannt.",
    "You must specify a valid locale for a new PO file": "Du musst einen gültigen Pfad für die PO-Datei angeben",
    "No translatable strings found": "Keine übersetzbaren Zeichenketten gefunden",
    "Cannot create a PO file.": "Erstellen der PO-Datei fehlgeschlagen.",
    "PO file already exists with locale %s": "PO-Datei existiert schon unter %s",
    "File cannot be created automatically. Fix the file permissions or use Download instead of Save": "Datei kann nicht automatisch erstellt werden. Setze die Datei-Zugriffsrechte oder benutze Download anstatt Speichern",
    "%s file is empty": "Datei (%s) ist leer",
    "Run Sync to update from source code": "Benutze Sync, um von der Quelle zu aktualisieren",
    "No strings could be extracted from source code": "Es konnten keine Zeichenketten vom Quellcode extrahiert werden",
    "Run Sync to update from %s": "Benutze Sync, um aus %s zu aktualisieren",
    "Source code has been modified, run Sync to update POT": "Quellcode wurde geändert, benutze Sync um POT zu aktualisieren",
    "POT has been modified since PO file was saved, run Sync to update": "POT wurde aktualisiert bevor die PO-Datei gespeichert wurde. Benutze Sync zum Aktualisieren.",
    "Bad file path": "Falscher Dateipfad",
    "Empty or invalid %s file": "Leere oder ungültige %s-Datei",
    "%s file has no header": "%s-Datei hat keinen Header",
    "New template": "Neues Template",
    "New language": "Neue Sprache",
    "%s%% translated": "%s%% übersetzt",
    "1 string": {
        "one": "1 Zeichenkette",
        "other": "%s Zeichenketten"
    },
    "%s fuzzy": "%s undeutlich",
    "%s untranslated": "%s nicht übersetzt",
    "Failed to compile MO file with built-in compiler": "Kompilieren der MO-Datei mit dem internen Kompilierer fehlgeschlagen.",
    "Loco, Translation Management": "Loco, Translation Management",
    "Manage translations": "Übersetzungen verwalten",
    "Translation options": "Übersetzungsoptionen",
    "Loco Translate": "Loco Translate",
    "Settings": "Einstellungen",
    "File download failed": "Dateidownload ist fehlgeschlagen",
    "WPLANG is deprecated and should be removed from wp-config.php": "",
    "Unknown language": "Unbekannte Sprache",
    "Some files not writable": "Einige Dateien nicht schreibbar",
    "Some files missing": "Einige Dateien fehlen",
    "\"%s\" folder not writable": "Ordner \"%s\" nicht schreibbar",
    "POT file not writable": "POT-Datei nicht schreibbar",
    "PO file not writable": "PO-Datei nicht schreibbar",
    "MO file not writable": "MO-Datei nicht schreibbar",
    "MO file not found": "MO-Datei nicht gefunden",
    "Folder not writable": "Ordner nicht schreibbar",
    "Folder not found": "Ordner nicht gefunden",
    "%s does not declare a \"Text Domain\"": "",
    "Loco has guessed \"%s\"": "",
    "%s does not declare a \"Domain Path\"": "",
    "%s has no POT file. Create one at \"%s/%s.pot\" if you need one.": "",
    "%s has a strange POT file name (%s). A better name would be \"%s.pot\"": "",
    "User does not have permission to manage translations": "Benutzer hat keine Rechte die Übersetzungen zu verwalten",
    "Invalid data posted to server": "Ungültige Daten zum Server gesendet",
    "Failed to compile MO file with %s, check your settings": "Kompilieren der MO-Datei fehlgeschlagen. Bitte prüfe Deine Einstellungen",
    "Package not found called %s": "Paket %s nicht gefunden",
    "Web server cannot create backups in \"%s\". Fix file permissions or disable backups in settings": "Webserver kann keine Sicherungen in \"%s\" anlegen. Setze die Datei-Zugriffrechte oder deaktiviere die Sicherungen in den Einstellungen",
    "Web server cannot create \"%s\" directory in \"%s\". Fix file permissions or create it manually.": "Webserver kann Ordner \"%s\" nicht in \"%s\" erstellen. Setze die Zugriffsrechte oder erstelle den Ordner selbst.",
    "Web server cannot create files in the \"%s\" directory. Fix file permissions or use the download function.": "Webserver kann keine Dateien im Ordner \"%s\" erstellen. Setze die Datei-Zugriffsrechte oder benutze Download anstatt Speichern.",
    "%s file is not writable by the web server. Fix file permissions or download and copy to \"%s/%s\".": "Datei %s ist vom Webserver nicht schreibbar. Setze die Datei-Zugriffsrechte oder benutze Download anstatt Speichern und speichere die Datei auf dem Server unter \"%s/%s\" ab.",
    "Cannot create MO file": "Erstellen der MO-Datei fehlgeschlagen.",
    "Cannot overwrite MO file": "Überschreiben der MO-Datei fehlgeschlagen",
    "Failed to write MO file": "Fehler beim Schreiben der MO-Datei",
    "Packages": "Pakete",
    "File check": "Dateiprüfung",
    "File system permissions for %s": "Dateisystem-Rechte für %s",
    "Other potential issues with %s": "",
    "Back": "Zurück",
    "Get help": "Hilfe erhalten",
    "Package details": "Paketdetails",
    "Translations (PO)": "Übersetzungen (PO)",
    "Template (POT)": "Template (POT)",
    "File permissions": "Dateizugriffsrechte",
    "Extends: %s": "Erweiterung: %s",
    "1 language": {
        "one": "1 Sprache",
        "other": "%u Sprachen"
    },
    "Updated": "Aktualisiert",
    "Powered by": "Präsentiert von",
    "Loco may not work as expected": "Loco scheint nicht, wie erwartet, zu arbeiten",
    "Configure Loco Translate": "Konfiguriere Loco Translate",
    "Compiling MO files": "MO-Dateien kompilieren",
    "Use built-in MO compiler.": "Benutze internen MO-Kompilierer",
    "Use external command:": "Benutze externes Befehlsprogramm:",
    "Enter path to msgfmt on server": "Pfad zum msgfmt-Programm",
    "Generate hash tables": "Erzeuge Hashtabellen",
    "Include Fuzzy strings": "",
    "Backing up PO files": "PO-Datei sichern",
    "Number of backups to keep of each file:": "Anzahl der Sicherungen pro Datei",
    "Experimental features": "Experimentelle Funktionen",
    "Enable WordPress core translations": "WordPress Core Übersetzung aktivieren",
    "Save settings": "Einstellungen speichern",
    "Template file": "Templatedatei",
    "Switch to...": "Wechsle zu...",
    "never": "niemals",
    "Save": "Speichern",
    "Download": "Download",
    "Sync": "Sync",
    "Revert": "zurücksetzen",
    "Add": "Hinzufügen",
    "Del": "Löschen",
    "Fuzzy": "Undeutlich",
    "Filter translations": "Übersetzungen filtern",
    "Help": "Hilfe",
    "Initialize new translations in %s": "Initialisiere neue Übersetzung in %s",
    "Select from common languages": "Wähle aus den Standardsprachen",
    "or enter any language code": "oder trage den Sprach-Code ein",
    "create in <code>%s</code>": "erstellen in <code>%s</code>",
    "create in global languages directory": "in globalem Sprachverzeichnis erstellen",
    "Start translating": "Starte Übersetzung",
    "New version available": "Neue Version verfügbar",
    "Upgrade to version %s of Loco Translate": "Bitte upgrade Loco Translate auf Version %s",
    "Select a plugin or theme to translate": "Wähle ein Plugin oder Theme zum Übersetzen",
    "Themes": "Themes",
    "Plugins": "Plugins",
    "Core": "Core",
    "PHP extension \"%s\" is not installed. If you experience problems you should install it": "",
    "Unknown error": "Unbekannter Fehler",
    "PO file saved": "PO-Datei gespeichert",
    "and MO file compiled": "und MO-Datei kompiliert",
    "Merged from %s": "Aus %s zusammengeführt",
    "Merged from source code": "Aus Quelle zusammengeführt",
    "Already up to date with %s": "Bereits auf dem aktuellen Stand mit %s",
    "Already up to date with source code": "Bereits mit der Quelle auf dem aktuellen Stand",
    "1 new string added": {
        "one": "1 neue Zeichenkette hinzugefügt",
        "other": "%s neue Zeichenketten hinzugefügt"
    },
    "1 obsolete string removed": {
        "one": "1 veraltete Zeichenkette entfernt",
        "other": "%s veraltete Zeichenketten entfernt"
    },
    "Your changes will be lost if you continue without saving": "Deine Änderungen gehen verloren, wenn du fortsetzt ohne zu Speichern",
    "Source text": "Quelltext",
    "%s translation": "%s Übersetzung",
    "Comments": "Kommentare",
    "Context": "Kontext",
    "Translation": "Übersetzung",
    "No source files in this package, nothing to sync": "Keine Quelldateien in diesem Paket gefunden, nichts zu synchronisieren",
    "No strings could be extracted from source files": "Es konnten keine Zeichenketten aus der Quelle extrahiert werden",
    "Translate WordPress plugins and themes directly in your browser": "",
    "http://wordpress.org/extend/plugins/loco-translate": "http://wordpress.org/extend/plugins/loco-translate",
    "Tim Whitlock": "Tim Whitlock",
    "https://localise.biz/help/wordpress/translate-plugin": "https://localise.biz/help/wordpress/translate-plugin"
} 
);
