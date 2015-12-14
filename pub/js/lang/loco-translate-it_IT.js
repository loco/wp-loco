/**
 * Loco js export: JavaScript function
 * Project: loco.po conversion
 * Release: Working copy
 * Locale: it-IT, Italian
 * Exported by: Unregistered user
 * Exported at: Mon, 14 Dec 2015 11:00:53 +0000
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
    "Error": "Errore",
    "Warning": "Attenzione",
    "OK": "OK",
    "Permission denied": "Permesso negato",
    "Settings saved": "Impostazioni salvate",
    "%s is not an official WordPress language": "",
    "New PO file": "Nuovo file PO",
    "PO file used as template. This will be renamed to %s on first save": "File PO usato come modello. Verrà rinominato in %s la prima volta che è salvato.",
    "You must specify a valid locale for a new PO file": "Devi specificare un locale valido per un nuovo file PO ",
    "No translatable strings found": "Nessuna stringa da tradurre trovata",
    "Cannot create a PO file.": "Il file PO non può essere creato.",
    "PO file already exists with locale %s": "Il file PO esiste già con un locale %s",
    "File cannot be created automatically. Fix the file permissions or use Download instead of Save": "Il file non può essere creato",
    "%s file is empty": "Il file %s è vuoto",
    "Run Sync to update from source code": "Utilizza Sync per sincronizzare con il codice sorgente",
    "No strings could be extracted from source code": "Impossibile estrarre le stringhe dal codice sorgente",
    "Run Sync to update from %s": "Utilizza Sync per aggiornare da %s",
    "Source code has been modified, run Sync to update POT": "Il codice sorgente è stato modificato, utilizza Sync per aggiornare il file POT",
    "POT has been modified since PO file was saved, run Sync to update": "Il file POT è stato modificato dopo che il file PO è stato salvato, utilizza Sync per aggiornare",
    "Bad file path": "Percorso errato",
    "Empty or invalid %s file": "File %s vuoto o invalido",
    "%s file has no header": "File %s senza l'intestazione",
    "New template": "Nuovo modello",
    "New language": "Nuova lingua",
    "%s%% translated": "%s%% tradotto",
    "1 string": {
        "one": "1 stringa",
        "other": "%s stringhe"
    },
    "%s fuzzy": "%s non verificata",
    "%s untranslated": "%s non tradotto",
    "Failed to compile MO file with built-in compiler": "Non è stato possibile compilare il file MO con il compilatore incorporato",
    "Loco, Translation Management": "Loco, Gestione di Traduzione",
    "Manage translations": "Gestire le traduzioni",
    "Translation options": "Opzioni di traduzione",
    "Loco Translate": "Tradurre con Loco",
    "Settings": "Impostazioni",
    "File download failed": "Download del file non riuscito",
    "WPLANG is deprecated and should be removed from wp-config.php": "WPLANG è deprecato e dovrebbe essere rimosso da wp-config.php",
    "Unknown language": "Lingua sconosciuta",
    "Some files not writable": "Alcuni file non scrivibili",
    "Some files missing": "Alcuni file mancanti",
    "\"%s\" folder not writable": "Cartella %s non scrivibile",
    "POT file not writable": "File POT non scrivibile",
    "PO file not writable": "File PO non scrivibile",
    "MO file not writable": "File MO non scrivibile",
    "MO file not found": "File MO non trovato",
    "Folder not writable": "Cartella non scrivibile",
    "Folder not found": "Cartella non trovata",
    "%s does not declare a \"Text Domain\"": "%s non dichiara un \"Text Domain\"",
    "Loco has guessed \"%s\"": "Loco ha ipotizzato \"%s\"",
    "%s does not declare a \"Domain Path\"": "%s non dichiara un \"Domain Path\"",
    "%s has no POT file. Create one at \"%s/%s.pot\" if you need one.": "%s non ha un file POT. Creane uno a \"%s/%s.pot\" se serve.",
    "%s has a strange POT file name (%s). A better name would be \"%s.pot\"": "%s ha uno strano nome del file POT (%s). Un nome migliore sarebbe \"%s.pot\"",
    "PHP extension \"%s\" is not installed. If you experience problems you should install it": "L'estensione PHP \"%s\" non è installata. Se riscontri dei problemi dovresti installarla",
    "User does not have permission to manage translations": "L'utente non ha il permesso di gestire le traduzioni",
    "Invalid data posted to server": "Dati invalidi mandati al server",
    "Failed to compile MO file with %s, check your settings": "Non è stato possibile compilare il file MO con %s, controlla le impostazioni",
    "Package not found called %s": "Nessun pacchetto trovato che si chiama %s",
    "Web server cannot create backups in \"%s\". Fix file permissions or disable backups in settings": "Il server web non può effettuare un backup in \"%s\". Devi aggiustare i permessi dei file or disattivare i backup nelle impostazioni",
    "Web server cannot create \"%s\" directory in \"%s\". Fix file permissions or create it manually.": "Il server web non può creare la cartella \"%s\" in \"%s\". Devi aggiustare i permessi dei file or crearla manualmente.",
    "Web server cannot create files in the \"%s\" directory. Fix file permissions or use the download function.": "Il server web non può creare i file nella cartella \"%s\". Devi aggiustare i permessi dei file or utilizzare la funzione download.",
    "%s file is not writable by the web server. Fix file permissions or download and copy to \"%s/%s\".": "File %s non è scrivibile dal server web. Devi aggiustare i permessi dei file or utilizzare la funzione download e copiarlo nel \"%s/%s\".",
    "Cannot create MO file": "Il file MO non può essere creato.",
    "Cannot overwrite MO file": "Il file MO non può essere sovrascritto.",
    "Failed to write MO file": "Impossibile scrivere il file MO",
    "Unknown error": "Errore sconosciuto",
    "PO file saved": "File PO salvato",
    "and MO file compiled": "e il file MO compilato",
    "Merged from %s": "Uniti da %s",
    "Merged from source code": "Uniti dal codice sorgente",
    "Already up to date with %s": "Già aggiornato con %s",
    "Already up to date with source code": "Già aggiornato con il codice sorgente",
    "1 new string added": {
        "one": "1 nuova stringa aggiunta",
        "other": "%s nuove stringhe aggiunte"
    },
    "1 obsolete string removed": {
        "one": "1 stringa obsoleta rimossa",
        "other": "%s stringhe obsolete rimosse"
    },
    "Your changes will be lost if you continue without saving": "Le modifiche saranno perse se continui senza salvarle",
    "Source text": "Testo sorgente",
    "%s translation": "Traduzione %s",
    "Comments": "Note",
    "Context": "Contesto",
    "Translation": "Traduzione",
    "No source files in this package, nothing to sync": "Nessun file sorgente in questo pacchetto, niente da sincronizzare",
    "No strings could be extracted from source files": "Impossibile estrarre le stringhe dai file sorgenti",
    "create in <code>%s</code>": "creare in <code>%s</code>",
    "Packages": "Pacchetti",
    "File check": "Controllo file",
    "File system permissions for %s": "Permessi del file system per %s",
    "Other potential issues with %s": "",
    "Back": "Indietro",
    "Get help": "Ottenere aiuto",
    "Package details": "Dettagli del pacchetto",
    "Translations (PO)": "Traduzioni (PO)",
    "Template (POT)": "Modello (POT)",
    "File permissions": "Permessi dei file",
    "Extends: %s": "Estende: %s",
    "1 language": {
        "one": "1 lingua",
        "other": "lingue"
    },
    "Updated": "Modificato",
    "Powered by": "Powered by",
    "Loco may not work as expected": "Loco potrebbe non funzionare come dovrebbe",
    "Configure Loco Translate": "Configurare Loco Translate",
    "Compiling MO files": "Compilando i file MO",
    "Use built-in MO compiler.": "Utilizza il compilatore di MO incorporato",
    "Use external command:": "Utilizza il comando esterno:",
    "Enter path to msgfmt on server": "Inserisci il percorso a msgfmt sul server",
    "Generate hash tables": "Generare tabelle hash",
    "Include Fuzzy strings": "Include stringhe ambigue",
    "Backing up PO files": "Effettuando un backup dei file PO",
    "Number of backups to keep of each file:": "Numero di backup da conservare per ogni file:",
    "Experimental features": "Funzioni sperimentali",
    "Enable WordPress core translations": "Abilita la traduzione del core di WordPress",
    "Save settings": "Salva le impostazioni",
    "Template file": "File modello",
    "Switch to...": "Passare al...",
    "never": "mai",
    "Save": "Salva",
    "Download": "Scarica",
    "Sync": "Sync",
    "Revert": "Ritornare",
    "Add": "Aggiungi",
    "Del": "Canc",
    "Fuzzy": "Non verificato",
    "Filter translations": "Filtra le traduzioni",
    "Help": "Aiuto",
    "Initialize new translations in %s": "Inizializza nuove traduzioni in %s ",
    "Select from common languages": "Seleziona una lingua predefinita",
    "or enter any language code": "o inserisci qualsiasi codice lingua",
    "create in plugin directory": "crea nella cartella del plugin",
    "create in global languages directory": "creare nella cartella globale di lingue",
    "Start translating": "Inizia a tradurre",
    "New version available": "Nuova versione disponibile",
    "Upgrade to version %s of Loco Translate": "Aggiorna alla versione %s di Loco Translate",
    "Select a plugin or theme to translate": "Seleziona un plugin o un tema da tradurre",
    "Themes": "Temi",
    "Plugins": "Plugin",
    "Core": "Core",
    "Translate WordPress plugins and themes directly in your browser": "Traduci plugin e temi di Wordpress direttamente nel tuo browser"
} 
);
