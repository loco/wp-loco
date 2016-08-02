/**
 * Loco js export: JavaScript function
 * Project: loco.po conversion
 * Release: Working copy
 * Locale: cs-CZ, Czech
 * Exported by: Unregistered user
 * Exported at: Wed, 06 Jul 2016 12:21:05 +0100
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
        return Number( ( n == 1 ) ? 0 : ( n >= 2 && n <= 4 ) ? 1 : 2 );
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
    "Error": "Chyba",
    "Warning": "Varování",
    "OK": "OK",
    "Permission denied": "Přístup odepřen",
    "Settings saved": "Nastavení uloženo",
    "%s is not an official WordPress language": "%s není oficiálním jazykem WordPress",
    "New PO file": "Nový soubor PO",
    "PO file used as template. This will be renamed to %s on first save": "PO soubor používaný jako šablona. Toto bude přejmenováno na %s při prvním uložení",
    "You must specify a valid locale for a new PO file": "Musíte zadat platné národní prostředí pro nový PO soubor",
    "No translatable strings found": "Nebyly nalezeny žádné řetězce pro překlad",
    "Cannot create a PO file.": "Nelze vytvořit soubor PO.",
    "PO file already exists with locale %s": "Soubor PO již existuje s národním prostředím %s",
    "File cannot be created automatically. Fix the file permissions or use Download instead of Save": "Soubor nemůže být automaticky vytvořen. Opravte oprávnění k souboru nebo použijte Stáhnout namísto Uložit",
    "%s file is empty": "%s soubor je prázdný",
    "Run Sync to update from source code": "Spusťte Sync pro aktualizaci ze zdrojového kódu",
    "No strings could be extracted from source code": "Žádné řetězce by mohly být extrahovány ze zdrojového kódu",
    "Run Sync to update from %s": "Spusťte Sync pro aktualizaci ze %s",
    "Source code has been modified, run Sync to update POT": "Zdrojový kód byl změněn, spusťte Sync pro aktualizaci POT",
    "POT has been modified since PO file was saved, run Sync to update": "POT byl změněn od uložení PO souboru, spusťte Sync pro aktualizaci",
    "Bad file path": "Špatná cesta k souboru",
    "Empty or invalid %s file": "Prázdný nebo neplatný soubor %s",
    "%s file has no header": "Soubor %s nemá hlavičku",
    "New template": "Nová šablona",
    "New language": "Nový jazyk",
    "%s%% translated": "%s%% přeloženo",
    "1 string": {
        "one": "1 řetězec",
        "few": "%s řetězce",
        "other": "%s řetězců"
    },
    "%s fuzzy": "%s odhadnuto",
    "%s untranslated": "%s nepřeloženo",
    "Failed to compile MO file with built-in compiler": "Nepodařilo se zkompilovat soubor MO vestavěným kompilátorem",
    "Loco, Translation Management": "Loco, Správa překladů",
    "Manage translations": "Spravovat překlady",
    "Translation options": "Možnosti překladu",
    "Loco Translate": "Překladač Loco",
    "Settings": "Nastavení",
    "File download failed": "Stažení souboru selhalo",
    "WPLANG is deprecated and should be removed from wp-config.php": "WPLANG je zastaralý a měl by být odstraněn z wp-config.php",
    "Unknown language": "Neznámý jazyk",
    "Some files not writable": "Některé soubory nejsou zapisovatelné",
    "Some files missing": "Některé soubory chybí",
    "\"%s\" folder not writable": "Složka \"%s\" není zapisovatelná",
    "POT file not writable": "Soubor POT není zapisovatelný",
    "PO file not writable": "Soubor PO není zapisovatelný",
    "MO file not writable": "Soubor MO není zapisovatelný",
    "MO file not found": "Soubor MO nenalezen",
    "Folder not writable": "Složka není zapisovatelná",
    "Folder not found": "Složka nenalezena",
    "%s does not declare a \"Text Domain\"": "%s nedeklaruje \"Text Domain\"",
    "Loco has guessed \"%s\"": "Loco odhadnul \"%s\"",
    "%s does not declare a \"Domain Path\"": "%s nedeklaruje \"Domain Path\"",
    "%s has no POT file. Create one at \"%s/%s.pot\" if you need one.": "%s nemá žádný soubor POT. Vytvořte jej jako \"%s/%s.pot\", pokud jej potřebujete.",
    "%s has a strange POT file name (%s). A better name would be \"%s.pot\"": "%s má podivný název souboru POT (%s). Lepší jméno bylo by \"%s.pot\"",
    "User does not have permission to manage translations": "Uživatel nemá oprávnění ke správě překladů",
    "Invalid data posted to server": "Neplatná data zaslaná na server",
    "Failed to compile MO file with %s, check your settings": "Nepodařilo se zkompilovat soubor MO s %s, zkontrolujte vaše nastavení",
    "Package not found called %s": "Balíček s názvem %s nenalezen",
    "Web server cannot create backups in \"%s\". Fix file permissions or disable backups in settings": "Webový server nemůže vytvářet zálohy v \"%s\". Opravte oprávnění souborů nebo zakažte zálohy v nastavení",
    "Web server cannot create \"%s\" directory in \"%s\". Fix file permissions or create it manually.": "Webový server nemůže vytvořit adresář \"%s\" v \"%s\". Opravte oprávnění souborů nebo jej vytvořte ručně.",
    "Web server cannot create files in the \"%s\" directory. Fix file permissions or use the download function.": "Webový server nemůže vytvářet soubory v adresáři \"%s\". Opravte oprávnění souborů nebo použijte funkci stahování.",
    "%s file is not writable by the web server. Fix file permissions or download and copy to \"%s/%s\".": "Soubor %s není zapisovatelný webovým serverem. Opravte oprávnění souborů nebo stáhněte a zkopírujte do \"%s/%s\".",
    "Cannot create MO file": "Nelze vytvořit soubor MO",
    "Cannot overwrite MO file": "Nelze přepsat soubor MO",
    "Failed to write MO file": "Do souboru MO nelze zapisovat",
    "Packages": "Balíčky",
    "File check": "Kontrola souborů",
    "File system permissions for %s": "Oprávnění souborového systému pro %s",
    "Other potential issues with %s": "Další potenciální problémy s %s",
    "Back": "Zpět",
    "Get help": "Získat pomoc",
    "Package details": "Podrobnosti o balíčku",
    "Translations (PO)": "Překlady (PO)",
    "Template (POT)": "Šablona (POT)",
    "File permissions": "Oprávnění k souborům",
    "Extends: %s": "Rozšiřuje: %s",
    "1 language": {
        "one": "1 jazyk",
        "few": "%u jazyky",
        "other": "%u jazyků"
    },
    "Updated": "Aktualizováno",
    "Powered by": "Běží na",
    "Loco may not work as expected": "Loco nemusí fungovat podle očekávání",
    "Configure Loco Translate": "Konfigurace Překladače Loco",
    "Compiling MO files": "Kompilace MO souborů",
    "Use built-in MO compiler.": "Použít vestavěný MO kompilátor.",
    "Use external command:": "Použít externí příkaz:",
    "Enter path to msgfmt on server": "Vložte cestu k msgfmt na serveru",
    "Generate hash tables": "Generovat hash tabulky",
    "Include Fuzzy strings": "Zahrnout odhadnuté řetězce",
    "Backing up PO files": "Zálohování PO souborů",
    "Number of backups to keep of each file:": "Počet záloh pro zachování každého souboru:",
    "Experimental features": "Experimentální funkce",
    "Enable WordPress core translations": "Povolit překlady jádra WordPressu",
    "Save settings": "Uložit nastavení",
    "Template file": "Soubor šablony",
    "Switch to...": "Přepnout na...",
    "never": "nikdy",
    "Save": "Uložit",
    "Download": "Stáhnout",
    "Sync": "Sync",
    "Revert": "Vrátit",
    "Add": "Přidat",
    "Del": "Smaz",
    "Fuzzy": "Odhad",
    "Filter translations": "Filtrovat překlady",
    "Help": "Nápověda",
    "Initialize new translations in %s": "Inicializovat nové překlady v %s",
    "Select from common languages": "Vyberte z běžných jazyků",
    "or enter any language code": "nebo vložte libovolný kód jazyka",
    "create in <code>%s</code>": "vytvořit v <code>%s</code>",
    "create in global languages directory": "vytvořit v adresáři s globálními jazyky",
    "Start translating": "Začít překládat",
    "New version available": "Nová verze k dispozici",
    "Upgrade to version %s of Loco Translate": "Aktualizujte na verzi %s Překladače Loco",
    "Select a plugin or theme to translate": "Vyberte plugin nebo téma pro překlad",
    "Themes": "Šablony",
    "Plugins": "Pluginy",
    "Core": "Jádro",
    "PHP extension \"%s\" is not installed. If you experience problems you should install it": "PHP rozšíření \"%s\" není nainstalováno. Pokud dochází k problémům, měli byste jej nainstalovat",
    "Unknown error": "Neznámá chyba",
    "PO file saved": "Soubor PO uložen",
    "and MO file compiled": "a soubor MO zkompilován",
    "Merged from %s": "Sloučeno z %s",
    "Merged from source code": "Sloučeno ze zdrojového kódu",
    "Already up to date with %s": "Již v aktuálním stavu s %s",
    "Already up to date with source code": "Již v aktuálním stavu se zdrojovým kódem",
    "1 new string added": {
        "one": "1 nový řetězec přidán",
        "few": "%s nové řetězce přidány",
        "other": "%s nových řetězců přidáno"
    },
    "1 obsolete string removed": {
        "one": "1 zastaralý řetězec odstraněn",
        "few": "%s zastaralé řetězce odstraněny",
        "other": "%s zastaralých řetězců odstraněno"
    },
    "Your changes will be lost if you continue without saving": "Vaše změny budou ztraceny, pokud budete pokračovat bez uložení",
    "Source text": "Zdrojový text",
    "%s translation": "%s překlad",
    "Comments": "Komentáře",
    "Context": "Kontext",
    "Translation": "Překlad",
    "No source files in this package, nothing to sync": "Žádné zdrojové soubory v tomto balíčku, není nic k synchronizaci",
    "No strings could be extracted from source files": "Žádné řetězce nemohly být extrahovány ze zdrojových souborů",
    "Translate WordPress plugins and themes directly in your browser": "Překládejte WordPress pluginy a témata přímo ve vašem prohlížeči",
    "http://wordpress.org/extend/plugins/loco-translate": "http://wordpress.org/extend/plugins/loco-translate",
    "Tim Whitlock": "Tim Whitlock",
    "https://localise.biz/help/wordpress/translate-plugin": "https://localise.biz/help/wordpress/translate-plugin"
} 
);
