/**
 * Loco js export: JavaScript function
 * Project: loco.po conversion
 * Release: Working copy
 * Locale: fr-FR, French (France)
 * Exported by: Unregistered user
 * Exported at: Mon, 14 Dec 2015 11:00:52 +0000
 */
loco = window.loco||{}, loco.t = function( pairs ){
    
    // named plural forms
    var pluralForms = [
    "one",
    "other"
];
    
    // calc numeric index of a plural form (0-1)
    function pluralIndex( n ){
        return Number( n > 1 );
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
    "Error": "Erreur",
    "Warning": "Avertissement",
    "OK": "Succès",
    "Permission denied": "Non autorisé",
    "Settings saved": "Paramètres enregistrés",
    "%s is not an official WordPress language": "",
    "New PO file": "Nouveau fichier de traduction (fichier PO)",
    "PO file used as template. This will be renamed to %s on first save": "Fichier de traduction (fichier PO) utilisé comme modèle. Ce fichier sera renommé en %s au premier enregistrement",
    "You must specify a valid locale for a new PO file": "Vous devez indiquer une région valide pour le nouveau fichier de traduction (fichier PO)",
    "No translatable strings found": "Aucune chaîne de caractères à traduire",
    "Cannot create a PO file.": "Impossible de créer le fichier de traduction (fichier PO).",
    "PO file already exists with locale %s": "Le fichier de traduction (fichier PO) existe déjà pour la région %s",
    "File cannot be created automatically. Fix the file permissions or use Download instead of Save": "Le fichier ne peut pas être créé automatiquement. Fixez les autorisations du fichier ou utilisez la fonction Télécharger au lieu de Sauvegarder",
    "%s file is empty": "Le fichier %s est vide",
    "Run Sync to update from source code": "Exécutez Synchro pour mettre à jour depuis le code source",
    "No strings could be extracted from source code": "Aucune chaîne de caractères n'a pu être extraire du code source",
    "Run Sync to update from %s": "Exécutez Synchro pour mettre à jour depuis %s",
    "Source code has been modified, run Sync to update POT": "Le code source a été modifié, exécutez Synchro pour mettre à jour le modèle (fichier POT)",
    "POT has been modified since PO file was saved, run Sync to update": "Le modèle (fichier POT) a été mis à jour depuis la dernière modification du fichier de traduction (fichier PO), exécutez Synchro pour mettre à jour ce dernier",
    "Bad file path": "Mauvais chemin de fichier",
    "Empty or invalid %s file": "Le fichier %s est vide ou non-valide",
    "%s file has no header": "Le fichier %s n'a pas d'en-têtes",
    "New template": "Nouveau modèle",
    "New language": "Nouvelle langue",
    "%s%% translated": "%s%% traduit",
    "1 string": {
        "one": "1 chaîne de caractères",
        "other": "%s chaînes de caractères"
    },
    "%s fuzzy": "%s floues",
    "%s untranslated": "%s non traduites",
    "Failed to compile MO file with built-in compiler": "Impossible de compiler le fichier binaire de traduction (fichier MO) avec le compilateur intégré",
    "Loco, Translation Management": "Loco, Gestionnaire de Traduction",
    "Manage translations": "Traductions",
    "Translation options": "Paramètres",
    "Loco Translate": "Loco Translate",
    "Settings": "Paramètres",
    "File download failed": "Le téléchargement du fichier a échoué",
    "WPLANG is deprecated and should be removed from wp-config.php": "La constante WPLANG est dépréciée et devrait être supprimée de wp-config.php",
    "Unknown language": "Région inconnue",
    "Some files not writable": "Certains fichiers ne sont pas accessibles en écriture",
    "Some files missing": "Certains fichiers sont manquants",
    "\"%s\" folder not writable": "Le répertoire \"%s\" n'est pas accessible en écriture",
    "POT file not writable": "Le modèle (fichier POT) n'est pas accessible en écriture",
    "PO file not writable": "Le fichier de traduction (fichier PO) n'est pas accessible en écriture",
    "MO file not writable": "Le fichier binaire de traduction (fichier MO) n'est pas accessible en écriture",
    "MO file not found": "Le fichier binaire de traduction (fichier MO) n'a pas été trouvé",
    "Folder not writable": "Répertoire non accessible en écriture",
    "Folder not found": "Répertoire non trouvé",
    "%s does not declare a \"Text Domain\"": "",
    "Loco has guessed \"%s\"": "",
    "%s does not declare a \"Domain Path\"": "",
    "%s has no POT file. Create one at \"%s/%s.pot\" if you need one.": "",
    "%s has a strange POT file name (%s). A better name would be \"%s.pot\"": "",
    "PHP extension \"%s\" is not installed. If you experience problems you should install it": "",
    "User does not have permission to manage translations": "L'utilisateur n'a pas les droits d'accès nécessaires pour gérer les traductions",
    "Invalid data posted to server": "Données non valides envoyées au serveur",
    "Failed to compile MO file with %s, check your settings": "Impossible de compiler le fichier binaire de traduction (fichier MO) avec %s, vérifiez vos paramètres",
    "Package not found called %s": "Le paquetage %s n'a pas été trouvé",
    "Web server cannot create backups in \"%s\". Fix file permissions or disable backups in settings": "Le serveur web ne peut pas créer de sauvegardes dans \"%s\". Résolvez les droits d'accès au fichier ou désactivez les sauvegardes dans les paramètres",
    "Web server cannot create \"%s\" directory in \"%s\". Fix file permissions or create it manually.": "Le serveur web ne peut pas créer \"%s\" dans \"%s\". Résolvez les droits d'accès au fichier ou créez le manuellement.",
    "Web server cannot create files in the \"%s\" directory. Fix file permissions or use the download function.": "Le serveur web ne peut pas créer de fichiers dans \"%s\". Résolvez les droits d'accès au fichier ou utilisez la fonction Télécharger",
    "%s file is not writable by the web server. Fix file permissions or download and copy to \"%s/%s\".": "Le fichier %s n'est pas accessible en écriture par le serveur web. Résolvez les droits d'accès au fichier ou téléchargez puis copiez dans \"%s/%s\".",
    "Cannot create MO file": "Impossible de créer le fichier binaire de traduction (fichier MO)",
    "Cannot overwrite MO file": "Impossible de réécrire le fichier binaire de traduction (fichier MO)",
    "Failed to write MO file": "Impossible d'écrire dans le fichier binaire de traduction (fichier MO)",
    "Unknown error": "Erreur inconnue",
    "PO file saved": "Fichier de traduction (fichier PO) sauvegardé",
    "and MO file compiled": "et fichier binaire de traduction (fichier MO) compilé",
    "Merged from %s": "Fusionné avec %s",
    "Merged from source code": "Fusionné depuis le code source",
    "Already up to date with %s": "Déjà à jour avec %s",
    "Already up to date with source code": "Déjà à jour avec le code source",
    "1 new string added": {
        "one": "1 nouvelle chaîne de caractères a été ajoutée",
        "other": "%s nouvelles chaînes de caractères ont été ajoutées"
    },
    "1 obsolete string removed": {
        "one": "1 chaîne de caractères obsolète a été supprimée",
        "other": "%s chaînes de caractères obsolètes ont été supprimées"
    },
    "Your changes will be lost if you continue without saving": "Vos modifications seront perdues si vous ne sauvegardez pas avant de continuer",
    "Source text": "Source",
    "%s translation": "%s traduction",
    "Comments": "Commentaires",
    "Context": "Contexte",
    "Translation": "Traduction",
    "No source files in this package, nothing to sync": "Aucun fichier source dans ce paquetage, il n'y a rien à synchroniser",
    "No strings could be extracted from source files": "Aucune chaîne de caractères n'a pu être extraite des fichiers sources",
    "create in <code>%s</code>": "créer dans <code>%s</code>",
    "Packages": "Paquetages",
    "File check": "Vérification de fichier",
    "File system permissions for %s": "Droits d'accès de %s",
    "Other potential issues with %s": "",
    "Back": "Retour",
    "Get help": "Demander de l'aide",
    "Package details": "Détails du paquetage",
    "Translations (PO)": "Traductions (PO)",
    "Template (POT)": "Modèles (POT)",
    "File permissions": "Droits d'accès",
    "Extends: %s": "Étend : %s",
    "1 language": {
        "one": "1 langue",
        "other": "%u langues"
    },
    "Updated": "Mise à jour",
    "Powered by": "Propulsé par",
    "Loco may not work as expected": "Loco peut ne pas fonctionner correctement",
    "Configure Loco Translate": "Paramétrez Loco Translate",
    "Compiling MO files": "Compilation des fichiers binaires de traduction (fichiers MO)",
    "Use built-in MO compiler.": "Utiliser le compilateur intégré.",
    "Use external command:": "Utiliser une commande personnalisée :",
    "Enter path to msgfmt on server": "Entrez le chemin d'accès à msgfmt sur le serveur",
    "Generate hash tables": "Générer les tables de hachage",
    "Include Fuzzy strings": "",
    "Backing up PO files": "Sauvegarde des fichiers de traduction (fichiers PO)",
    "Number of backups to keep of each file:": "Nombre de sauvegardes à conserver pour chaque fichier :",
    "Experimental features": "Fonctionnalités expérimentales",
    "Enable WordPress core translations": "Activer la traduction des fichiers principaux de WordPress",
    "Save settings": "Enregistrer les paramètres",
    "Template file": "Modèle",
    "Switch to...": "Permuter avec…",
    "never": "jamais",
    "Save": "Sauvegarder",
    "Download": "Télécharger",
    "Sync": "Synchro",
    "Revert": "Rétablir",
    "Add": "Ajouter",
    "Del": "Supprimer",
    "Fuzzy": "Flou",
    "Filter translations": "Filtrer les traductions",
    "Help": "Aide",
    "Initialize new translations in %s": "Créer une nouvelle traduction pour %s",
    "Select from common languages": "Choisir parmi les langues courantes",
    "or enter any language code": "ou choisir un code régional",
    "create in plugin directory": "",
    "create in global languages directory": "créer dans le répertoire global des langues",
    "Start translating": "Traduire",
    "New version available": "Nouvelle version disponible",
    "Upgrade to version %s of Loco Translate": "Passer à la version %s de Loco Translate",
    "Select a plugin or theme to translate": "Choisissez une extension ou un thème à traduire",
    "Themes": "Thèmes",
    "Plugins": "Extensions",
    "Core": "Fichiers principaux",
    "Translate WordPress plugins and themes directly in your browser": ""
} 
);
