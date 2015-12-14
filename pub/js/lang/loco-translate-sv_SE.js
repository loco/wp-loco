/**
 * Loco js export: JavaScript function
 * Project: loco.po conversion
 * Release: Working copy
 * Locale: sv-SE, Swedish
 * Exported by: Unregistered user
 * Exported at: Mon, 14 Dec 2015 11:00:57 +0000
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
    "Error": "Fel",
    "Warning": "Varning",
    "OK": "OK",
    "Permission denied": "Behörighet saknas",
    "Settings saved": "Inställningar sparade",
    "%s is not an official WordPress language": "%s är inte ett officiellt språk i WordPress",
    "New PO file": "Ny PO-fil",
    "PO file used as template. This will be renamed to %s on first save": "PO-fil används som mall. Den kommer att byta namn till %s när du väljer att spara",
    "You must specify a valid locale for a new PO file": "Du måste ange en giltig landskod för en ny PO-fil",
    "No translatable strings found": "Inga översättbara strängar hittades",
    "Cannot create a PO file.": "Kunde ej skapa en PO-fil.",
    "PO file already exists with locale %s": "PO-fil finns redan med landskod %s",
    "File cannot be created automatically. Fix the file permissions or use Download instead of Save": "Fil kunde ej skapas automatiskt. Ändra filrättigheter eller använd Ladda ner istället för Spara",
    "%s file is empty": "%s-filen är tom",
    "Run Sync to update from source code": "Använd Synka för att uppdatera från källkoden",
    "No strings could be extracted from source code": "Inga strängar kunde hittas från källkoden",
    "Run Sync to update from %s": "Använd Synka för att uppdatera från %s",
    "Source code has been modified, run Sync to update POT": "Källkod har ändrats, använd Synka för att uppdatera POT",
    "POT has been modified since PO file was saved, run Sync to update": "POT har ändrats sedan PO-filen sparades, använd Synka för att uppdatera",
    "Bad file path": "Ogiltig sökväg",
    "Empty or invalid %s file": "Tom eller ogiltigt %s-fil",
    "%s file has no header": "%s-filen saknar header",
    "New template": "Ny mall",
    "New language": "Nytt språk",
    "%s%% translated": "%s%% översatt",
    "1 string": {
        "one": "1 sträng",
        "other": "%s strängar"
    },
    "%s fuzzy": "%s oklar",
    "%s untranslated": "%s ej översatta",
    "Failed to compile MO file with built-in compiler": "Det gick ej att sammanställa MO-fil med inbyggd kompilator",
    "Loco, Translation Management": "Loco, Translation Management",
    "Manage translations": "Språkfiler",
    "Translation options": "Inställningar",
    "Loco Translate": "Loco Translate",
    "Settings": "Inställningar",
    "File download failed": "Nedladdning misslyckades",
    "WPLANG is deprecated and should be removed from wp-config.php": "WPLANG är inaktuell och bör tas bort från wp-config.php",
    "Unknown language": "Okänt språk",
    "Some files not writable": "Vissa filer är ej skrivbara",
    "Some files missing": "Vissa filer saknas",
    "\"%s\" folder not writable": "Mappen \"%s\" är ej skrivbar",
    "POT file not writable": "POT-filen är ej skrivbar",
    "PO file not writable": "PO-filen är ej skrivbar",
    "MO file not writable": "MO-filen är ej skrivbar",
    "MO file not found": "MO-fil hittades ej",
    "Folder not writable": "Mappen är ej skrivbar",
    "Folder not found": "Mappen hittades ej",
    "%s does not declare a \"Text Domain\"": "%s har inte angivit \"Text Domain\"",
    "Loco has guessed \"%s\"": "Loco har gissat på \"%s\"",
    "%s does not declare a \"Domain Path\"": "%s har inte angivit \"Domain Path\"",
    "%s has no POT file. Create one at \"%s/%s.pot\" if you need one.": "%s har ingen POT-fil. Skapa en i \"%s/%s.pot\" om du behöver en.",
    "%s has a strange POT file name (%s). A better name would be \"%s.pot\"": "%s har ett konstigt POT-filnamn (%s). Ett bättre filnamn hade varit \"%s.pot\"",
    "PHP extension \"%s\" is not installed. If you experience problems you should install it": "PHP tillägg \"%s\" är inte installerat. Om du upplever problem bör du installera det",
    "User does not have permission to manage translations": "Användaren saknar behörighet att hantera översättningar",
    "Invalid data posted to server": "Ogiltig data skickades till servern",
    "Failed to compile MO file with %s, check your settings": "Det gick ej sammanställa MO-filen med %s , kontrollera dina inställningar",
    "Package not found called %s": "Paket %s ej hittat",
    "Web server cannot create backups in \"%s\". Fix file permissions or disable backups in settings": "Webbservern kunde ej skapa säkerhetskopior i \"%s\". Ändra filrättigheter eller inaktivera säkerhetskopior i inställningarna",
    "Web server cannot create \"%s\" directory in \"%s\". Fix file permissions or create it manually.": "Webbservern kunde ej skapa mappen \"%s\" i \"%s\". Ändra filrättigheter eller skapa den manuellt.",
    "Web server cannot create files in the \"%s\" directory. Fix file permissions or use the download function.": "Webbservern kunde ej skapa filer i mappen \"%s\". Ändra filrättigheter eller använd nedladdningsfunktionen.",
    "%s file is not writable by the web server. Fix file permissions or download and copy to \"%s/%s\".": "%s-filen är ej skrivbar av webbservern. Ändra filrättigheter eller ladda ner och kopiera till \"%s/%s\".",
    "Cannot create MO file": "Kunde ej skapa MO-fil",
    "Cannot overwrite MO file": "Kunde ej skriva över MO-fil",
    "Failed to write MO file": "Kunde ej skapa MO-fil",
    "Unknown error": "Okänt fel",
    "PO file saved": "PO-fil sparad",
    "and MO file compiled": "och MO-fil sammanställd",
    "Merged from %s": "Sammanslagen från %s",
    "Merged from source code": "Sammanslagen från källkod",
    "Already up to date with %s": "Redan aktuell med %s",
    "Already up to date with source code": "Redan aktuell med källkod",
    "1 new string added": {
        "one": "1 ny sträng tillagd",
        "other": "%s nya strängar tillagda"
    },
    "1 obsolete string removed": {
        "one": "1 föråldrad sträng togs bort",
        "other": "%s föråldrade strängar togs bort"
    },
    "Your changes will be lost if you continue without saving": "Dina ändringar kommer att gå förlorade om du fortsätter utan att spara",
    "Source text": "Källtext",
    "%s translation": "%s översättning",
    "Comments": "Kommentarer",
    "Context": "Innehåll",
    "Translation": "Översättning",
    "No source files in this package, nothing to sync": "Inga källfiler finns i detta paket, inget att synka",
    "No strings could be extracted from source files": "Inga strängar kunde hittas från källfiler",
    "create in <code>%s</code>": "skapa i <code>%s</code>",
    "Packages": "Språkfiler",
    "File check": "Filrättigheter",
    "File system permissions for %s": "Filsystem rättigheter för %s",
    "Other potential issues with %s": "Andra potentiella problem med %s",
    "Back": "Tillbaka",
    "Get help": "Hjälp",
    "Package details": "Beskrivning",
    "Translations (PO)": "Översättningar (PO)",
    "Template (POT)": "Mall (POT)",
    "File permissions": "Filrättigheter",
    "Extends: %s": "Utökar: %s",
    "1 language": {
        "one": "1 språk",
        "other": "%u språk"
    },
    "Updated": "Senast sparad",
    "Powered by": "Drivs av",
    "Loco may not work as expected": "Loco kanske ej fungerar som väntat",
    "Configure Loco Translate": "Konfigurera Loco Translate",
    "Compiling MO files": "Sammanställa MO-filer",
    "Use built-in MO compiler.": "Använd inbyggd MO-kompilator.",
    "Use external command:": "Använd externt kommando:",
    "Enter path to msgfmt on server": "Skriv in sökväg till msgfmt på servern",
    "Generate hash tables": "Generera hashtabeller",
    "Include Fuzzy strings": "Inkludera luddiga översättningar",
    "Backing up PO files": "Säkerhetskopiera PO-filer",
    "Number of backups to keep of each file:": "Antal säkerhetskopior att behålla för varje fil:",
    "Experimental features": "Experimentella funktioner",
    "Enable WordPress core translations": "Aktivera WordPress översättningar",
    "Save settings": "Spara inställningar",
    "Template file": "Mallfil",
    "Switch to...": "Växla till...",
    "never": "aldrig",
    "Save": "Spara",
    "Download": "Ladda ner",
    "Sync": "Synka",
    "Revert": "Återgå",
    "Add": "Lägg till",
    "Del": "Radera",
    "Fuzzy": "Oklar",
    "Filter translations": "Sök översättningar",
    "Help": "Hjälp",
    "Initialize new translations in %s": "Skapa nya översättningar i %s",
    "Select from common languages": "Välj bland vanliga språk",
    "or enter any language code": "eller skriv valfri landskod",
    "create in plugin directory": "skapa direkt i tillägg mappen",
    "create in global languages directory": "skapa i den globala språk mappen",
    "Start translating": "Börja översätta",
    "New version available": "Ny version tillgänglig",
    "Upgrade to version %s of Loco Translate": "Uppdatera till version %s av Loco Translate",
    "Select a plugin or theme to translate": "Välj ett tillägg eller tema att översätta",
    "Themes": "Teman",
    "Plugins": "Tillägg",
    "Core": "WordPress",
    "Translate WordPress plugins and themes directly in your browser": ""
} 
);
