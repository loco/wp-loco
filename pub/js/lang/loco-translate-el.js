/**
 * Loco js export: JavaScript function
 * Project: loco.po conversion
 * Release: Working copy
 * Locale: el-GR, Greek
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
    "Error": "Λάθος",
    "Warning": "Προειδοποίηση",
    "OK": "ΟΚ",
    "Permission denied": "Απαγορεύθηκε η πρόσβαση",
    "Settings saved": "Οι ρυθμίσεις αποθηκεύτηκαν",
    "%s is not an official WordPress language": "%s δεν είναι μια επίσημη γλώσσα του WordPress",
    "New PO file": "Νέο αρχείο PO",
    "PO file used as template. This will be renamed to %s on first save": "Το αρχείο PO χρησιμοποιήθηκε ως πρότυπο. Αυτό θα μετονομαστεί σε %s με την πρώτη αποθήκευση",
    "You must specify a valid locale for a new PO file": "Πρέπει να προσδιορίσετε μία έγκυρη τοποθεσία για το νέο αρχείο PO",
    "No translatable strings found": "Δε βρέθηκαν μεταφράσιμες φράσεις",
    "Cannot create a PO file.": "Δε μπορεί να δημιουργηθεί ένα αρχείο PO.",
    "PO file already exists with locale %s": "Το αρχείο PO υπάρχει ήδη με την τοποθεσία %s",
    "File cannot be created automatically. Fix the file permissions or use Download instead of Save": "Το αρχείο δε μπορεί να δημιουργηθεί αυτόματα. Διορθώστε τα δικαιώματα του αρχείου ή χρησιμοποιήστε τη Λήψη αντί για την Αποθήκευση",
    "%s file is empty": "Το αρχείο %s είναι άδειο",
    "Run Sync to update from source code": "Τρέξτε τον Συγχρονισμό για να γίνει ενημέρωση από τον πηγαίο κώδικα",
    "No strings could be extracted from source code": "Δεν μπορούν να εξαχθούν φράσεις από τον πηγαίο κώδικα",
    "Run Sync to update from %s": "Τρέξτε τον Συγχρονισμό για να γίνει ενημέρωση από το %s",
    "Source code has been modified, run Sync to update POT": "Ο πηγαίος κώδικας έχει τροποποιηθεί, τρέξτε τον Συγχρονισμό για να ενημερώσετε το POT",
    "POT has been modified since PO file was saved, run Sync to update": "Το POT έχει τροποποιηθεί μετά την αποθήκευση του αρχείου PO, τρέξτε τον Συγχρονισμό για να γίνει ενημέρωση",
    "Bad file path": "Λάθος διεύθυνση αρχείου",
    "Empty or invalid %s file": "Κενό ή μη έγκυρο αρχείο %s",
    "%s file has no header": "Το αρχείο %s δεν έχει κεφαλίδα",
    "New template": "Νέο πρότυπο",
    "New language": "Νέα γλώσσα",
    "%s%% translated": "%s%% μεταφράστηκε",
    "1 string": {
        "one": "1 φράση",
        "other": "%s φράσεις"
    },
    "%s fuzzy": "%s ασαφές",
    "%s untranslated": "%s αμετάφραστο",
    "Failed to compile MO file with built-in compiler": "Αποτυχία μεταγλώττισης του αρχείου MO με τον ενσωματωμένο μεταγλωττιστή",
    "Loco, Translation Management": "Loco, Διαχείριση Μετάφρασης",
    "Manage translations": "Διαχείριση μεταφράσεων",
    "Translation options": "Επιλογές μετάφρασης",
    "Loco Translate": "Loco Translate",
    "Settings": "Ρυθμίσεις",
    "File download failed": "Η λήψη του αρχείου απέτυχε",
    "WPLANG is deprecated and should be removed from wp-config.php": "Το WPLANG έχει καταργηθεί και θα πρέπει να αφαιρεθεί από το wp-config.php",
    "Unknown language": "Άγνωστη γλώσσα",
    "Some files not writable": "Κάποια αρχεία δεν είναι εγγράψιμα",
    "Some files missing": "Κάποια αρχεία λείπουν",
    "\"%s\" folder not writable": "Ο φάκελος \"%s\" δεν είναι εγγράψιμος",
    "POT file not writable": "Το αρχείο POT δεν είναι εγγράψιμο",
    "PO file not writable": "Το αρχείο PO δεν είναι εγγράψιμο",
    "MO file not writable": "Το αρχείο MO δεν είναι εγγράψιμο",
    "MO file not found": "Το αρχείο MO δε βρέθηκε",
    "Folder not writable": "Ο φάκελος δεν είναι εγγράψιμος",
    "Folder not found": "Ο φάκελος δε βρέθηκε",
    "%s does not declare a \"Text Domain\"": "Το %s δε δηλώνει κάποιο \"Πεδίο Κειμένου\"",
    "Loco has guessed \"%s\"": "Το Loco έχει μαντέξει \"%s\"",
    "%s does not declare a \"Domain Path\"": "Το %s δε δηλώνει κάποιο \"Πεδίο Διεύθυνσης\"",
    "%s has no POT file. Create one at \"%s/%s.pot\" if you need one.": "Το %s δεν έχει κάποιο αρχείο POT. Εάν χρειάζεστε ένα, δημιουργήστε το στο \"%s/%s.pot\"",
    "%s has a strange POT file name (%s). A better name would be \"%s.pot\"": "Το %s έχει ένα περίεργο όνομα αρχείου (%s). Ένα καλύτερο όνομα θα ήταν το \"%s.pot\"",
    "User does not have permission to manage translations": "Ο χρήστης δεν έχει δικαιώματα να διαχειριστεί μεταφράσεις",
    "Invalid data posted to server": "Δημοσιεύθηκαν μη έγκυρα δεδομένα στο διακομιστή",
    "Failed to compile MO file with %s, check your settings": "Αποτυχία μεταγλώττισης του αρχείου MO με το %s, ελέγξτε τις ρυθμίσεις σας",
    "Package not found called %s": "Το πακέτο %s δε βρέθηκε",
    "Web server cannot create backups in \"%s\". Fix file permissions or disable backups in settings": "Ο διακομιστής web δε μπορεί να δημιουργήσει αντίγραφα ασφαλείας στο \"%s\". Διορθώστε τα δικαιώματα αρχείου ή απενεργοποιήστε τα αντίγραφα ασφαλείας στις ρυθμίσεις",
    "Web server cannot create \"%s\" directory in \"%s\". Fix file permissions or create it manually.": "Ο διακομιστής web δε μπορεί να δημιουργήσει το φάκελο \"%s\" στο \"%s\". Διορθώστε τα δικαιώματα αρχείου ή δημιουργήστε το χειροκίνητα.",
    "Web server cannot create files in the \"%s\" directory. Fix file permissions or use the download function.": "Ο διακομιστής web δε μπορεί να δημιουργήσει αρχεία στο φάκελο \"%s\". Διορθώστε τα δικαιώματα αρχείου ή χρησιμοποιήστε τη λειτουργία Λήψη.",
    "%s file is not writable by the web server. Fix file permissions or download and copy to \"%s/%s\".": "Το αρχείο \"%s\" δεν είναι εγγράψιμο από το διακομιστή web. Διορθώστε τα δικαιώματα αρχείου ή κάντε λήψη και αντιγράψτε το στο \"%s/%s\".",
    "Cannot create MO file": "Δε μπόρεσε να δημιουργηθεί το αρχείο MO",
    "Cannot overwrite MO file": "Δε μπόρεσε να αντικατασταθεί το αρχείο MO",
    "Failed to write MO file": "Δε μπόρεσε να εγγραφεί να αρχείο MO",
    "Packages": "Πακέτα",
    "File check": "Έλεγχος αρχείου",
    "File system permissions for %s": "Δικαιώματα συστήματος αρχείων για το %s",
    "Other potential issues with %s": "Άλλα πιθανά θέματα με το %s",
    "Back": "Πίσω",
    "Get help": "Βοήθεια",
    "Package details": "Λεπτομέρειες πακέτου",
    "Translations (PO)": "Μεταφράσεις (PO)",
    "Template (POT)": "Πρότυπο (POT)",
    "File permissions": "Δικαιώματα αρχείου",
    "Extends: %s": "Επεκτείνεται σε: %s",
    "1 language": {
        "one": "1 γλώσσα",
        "other": "%u γλώσσες"
    },
    "Updated": "Ενημερώθηκε",
    "Powered by": "Παραγωγή",
    "Loco may not work as expected": "Το Loco μπορεί να μη δουλέψει όπως αναμένεται",
    "Configure Loco Translate": "Διαμόρφωση του Loco Translate",
    "Compiling MO files": "Μεταγλώττιση των αρχείων MO",
    "Use built-in MO compiler.": "Χρήση του ενσωματωμένου μεταγλωττιστή MO.",
    "Use external command:": "Χρήση εξωτερικής εντολής:",
    "Enter path to msgfmt on server": "Εισάγετε τη διεύθυνση για το msgfmt στο διακομιστή",
    "Generate hash tables": "Δημιουργία των hash tables",
    "Include Fuzzy strings": "Συμπερίληψη ασαφών χαρακτήρων",
    "Backing up PO files": "Δημιουργία αντιγράφων ασφαλείας των αρχείων PO",
    "Number of backups to keep of each file:": "Ποσότητα αντιγράφων ασφαλείας που θα διατηρηθούν για κάθε αρχείο:",
    "Experimental features": "Πειραματικά χαρακτηριστικά",
    "Enable WordPress core translations": "Ενεργοποίηση μεταφράσεων του πυρήνα του WordPress",
    "Save settings": "Αποθήκευση ρυθμίσεων",
    "Template file": "Πρότυπο αρχείο",
    "Switch to...": "Μετάβαση σε...",
    "never": "ποτέ",
    "Save": "Αποθήκευση",
    "Download": "Λήψη",
    "Sync": "Συγχρονισμός",
    "Revert": "Επαναφορά",
    "Add": "Προσθήκη",
    "Del": "Διαγραφή",
    "Fuzzy": "Ασαφή",
    "Filter translations": "Φιλτράρισμα μεταφράσεων",
    "Help": "Βοήθεια",
    "Initialize new translations in %s": "Προετοιμασία νέων μεταφράσεων στο %s",
    "Select from common languages": "Επιλέξτε από τις κοινές γλώσσες",
    "or enter any language code": "ή εισάγετε έναν κωδικό γλώσσας",
    "create in <code>%s</code>": "δημιουργία στο %s",
    "create in global languages directory": "δημιουργία στο φάκελο γενικών γλωσσών",
    "Start translating": "Έναρξη μετάφρασης",
    "New version available": "Διαθέσιμη νέα έκδοση",
    "Upgrade to version %s of Loco Translate": "Αναβάθμιση στην έκδοση %s του Loco Translate",
    "Select a plugin or theme to translate": "Επιλέξτε ένα πρόσθετο ή ένα θέμα για μετάφραση",
    "Themes": "Θέματα",
    "Plugins": "Πρόσθετα",
    "Core": "Πυρήνας",
    "PHP extension \"%s\" is not installed. If you experience problems you should install it": "Η επέκταση του PHP \"%s\" δεν είναι εγκατεστημένη. Εάν αντιμετωπίσετε προβλήματα θα πρέπει να την εκαταστήσετε.",
    "Unknown error": "Άγνωστο λάθος",
    "PO file saved": "Το αρχείο PO αποθηκεύτηκε",
    "and MO file compiled": "και το αρχείο MO μεταγλωττίστηκε",
    "Merged from %s": "Συγχώνευση από %s",
    "Merged from source code": "Συγχώνευση από τον πηγαίο κώδικα",
    "Already up to date with %s": "Ήδη ενημερωμένο με το %s",
    "Already up to date with source code": "Ήδη ενημερωμένο με τον πηγαίο κώδικα",
    "1 new string added": {
        "one": "Προστέθηκε 1 καινούργια φράση",
        "other": "Προστέθηκαν %s καινούργιες φράσεις"
    },
    "1 obsolete string removed": {
        "one": "Αφαιρέθηκε 1 απαρχαιωμένη φράση",
        "other": "Αφαιρέθηκαν %s απαρχαιωμένες φράσεις"
    },
    "Your changes will be lost if you continue without saving": "Οι αλλαγές που κάνατε θα χαθούν εάν συνεχίσετε χωρίς να κάνετε αποθήκευση",
    "Source text": "Κείμενο πηγής",
    "%s translation": "%s μετάφραση",
    "Comments": "Σχόλια",
    "Context": "Πλαίσιο",
    "Translation": "Μετάφραση",
    "No source files in this package, nothing to sync": "Δεν υπάρχουν αρχεία πηγής σε αυτό το πακέτο, δε μπορεί να συγχρονιστεί κάτι",
    "No strings could be extracted from source files": "Δε μπόρεσαν να εξαχθούν φράσεις από τα αρχεία πηγής",
    "Translate WordPress plugins and themes directly in your browser": "Μεταφράστε πρόσθετα ή θέματα του WordPress απευθείας στον browser σας",
    "http://wordpress.org/extend/plugins/loco-translate": "http://wordpress.org/extend/plugins/loco-translate",
    "Tim Whitlock": "Tim Whitlock",
    "https://localise.biz/help/wordpress/translate-plugin": "https://localise.biz/help/wordpress/translate-plugin"
} 
);
