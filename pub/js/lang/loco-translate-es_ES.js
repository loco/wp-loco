/**
 * Loco js export: JavaScript function
 * Project: loco.po conversion
 * Release: Working copy
 * Locale: es-ES, Spanish (Spain)
 * Exported by: Unregistered user
 * Exported at: Mon, 14 Dec 2015 11:00:51 +0000
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
    "Error": "Error",
    "Warning": "Atención",
    "OK": "Correcto",
    "Permission denied": "Permiso denegado",
    "Settings saved": "Configuración guardada",
    "%s is not an official WordPress language": "%s no es un nombre oficial de idioma de WordPress",
    "New PO file": "Nuevo fichero PO",
    "PO file used as template. This will be renamed to %s on first save": "Fichero PO utilizado como plantilla. Se renombrará a %s la primera vez que lo guarde",
    "You must specify a valid locale for a new PO file": "Debe\n \nespecificar\n \nuna\n \nconfiguración regional\n \nválida\n \npara\n \nun\n \nnuevo\n \narchivo\n \nPO",
    "No translatable strings found": "Sin\n \nlas cadenas\n \ntraducibles\n \nencontradas",
    "Cannot create a PO file.": "No se puede crear una archivo PO.",
    "PO file already exists with locale %s": "El archivo PO ya existe con la configuración regional %s",
    "File cannot be created automatically. Fix the file permissions or use Download instead of Save": "El archivo no puede crearse automáticamente. \nFijar\n \nlos\n \npermisos\n de \narchivo\n \no\n \nutilice\n D\nescarga\nr \nen vez\n \nde\n G\nuardar",
    "%s file is empty": "El fichero %s está vacío",
    "Run Sync to update from source code": "Ejecutar Sinc para actualizar desde el código fuente",
    "No strings could be extracted from source code": "No se pueden extraer las cadenas del código fuente",
    "Run Sync to update from %s": "Ejecutar Sinc para actualizar desde %s",
    "Source code has been modified, run Sync to update POT": "El código fuente ha sido modificado, ejecute Sinc para actualizar POT",
    "POT has been modified since PO file was saved, run Sync to update": "POT ha sido modificado desde que el archivo PO fué guardado, ejecute Sync para actualizar",
    "Bad file path": "Ruta\n de \narchivo\n \nincorrecta",
    "Empty or invalid %s file": "Archivo %s vacío o no válido",
    "%s file has no header": "El archivo %s no tiene cabecera",
    "New template": "Nueva plantilla",
    "New language": "Nuevo idioma",
    "%s%% translated": "%s%% traducido",
    "1 string": {
        "one": "1 cadena",
        "other": "%s cadenas"
    },
    "%s fuzzy": "%s fuzzy",
    "%s untranslated": "%s no traducido",
    "Failed to compile MO file with built-in compiler": "Fallo al compilar el archivo PO con el compilador integrado",
    "Loco, Translation Management": "Loco, Gestión de Traducción",
    "Manage translations": "Gestionar traducciones",
    "Translation options": "Opciones de traducción",
    "Loco Translate": "Loco Translate",
    "Settings": "Configuración",
    "File download failed": "Descarga de archivo fallida",
    "WPLANG is deprecated and should be removed from wp-config.php": "WPLANG está obsoleto y debería de quitarse de wp-config.php",
    "Unknown language": "Idioma desconocido",
    "Some files not writable": "Algunos archivos no grabables",
    "Some files missing": "Faltan algunos archivos",
    "\"%s\" folder not writable": "La carpeta \"%s\" no es grabable",
    "POT file not writable": "Archivo POT no es grabable",
    "PO file not writable": "Archivo PO no es grabable",
    "MO file not writable": "Archivo MO no es grabable",
    "MO file not found": "Archivo MO no encontrado",
    "Folder not writable": "No se puede escribir en la carpeta",
    "Folder not found": "Carpeta no encontrada",
    "%s does not declare a \"Text Domain\"": "%s no declara un \"Text Domain\"",
    "Loco has guessed \"%s\"": "Loco ha adivinado \"%s\"",
    "%s does not declare a \"Domain Path\"": "%s no declara una \"Ruta de Dominio\"",
    "%s has no POT file. Create one at \"%s/%s.pot\" if you need one.": "%s no tiene un fichero POT. Crear uno en \"%s/%s.pot\" si lo necesita.",
    "%s has a strange POT file name (%s). A better name would be \"%s.pot\"": "%s tiene un nombre de archivo POT extraño. Un mejor nombre sería \"%s.pot\"",
    "PHP extension \"%s\" is not installed. If you experience problems you should install it": "La extensión PHP \"%s\" no está instalada. Si experimenta problemas debería instalarlo",
    "User does not have permission to manage translations": "El usuario no tiene permiso para gestionar traducciones",
    "Invalid data posted to server": "Datos no válidos publicados en el servidor",
    "Failed to compile MO file with %s, check your settings": "Fallo al compilar el archivo MO con %s, compruebe su configuración",
    "Package not found called %s": "Paquete llamado %s no encontrado",
    "Web server cannot create backups in \"%s\". Fix file permissions or disable backups in settings": "El servidor web no puede hacer copias de seguridad en \"%s\". Establezca los permisos de fichero o deshabilite las copias de seguridad en configuración",
    "Web server cannot create \"%s\" directory in \"%s\". Fix file permissions or create it manually.": "El servidor web no puede crear la carpeta \"%s\" en \"%s\". Establezca los permisos de fichero o créelo manualmente.",
    "Web server cannot create files in the \"%s\" directory. Fix file permissions or use the download function.": "El servidor web no puede crear archivos en la carpeta \"%s\". Establezca los permisos de archivo o utilice la función de descarga.",
    "%s file is not writable by the web server. Fix file permissions or download and copy to \"%s/%s\".": "El archivo %s no se puede escribir por el servidor web. Establezca los permisos o descargue y cópielo a \"%s/%s\".",
    "Cannot create MO file": "No se puede crear el archivo MO",
    "Cannot overwrite MO file": "No se puede sobreescribir el archivo MO",
    "Failed to write MO file": "Fallo al escribir el archivo MO",
    "Unknown error": "Error desconocido",
    "PO file saved": "Fichero PO guardado",
    "and MO file compiled": "y compilado el fichero MO",
    "Merged from %s": "Combinado desde %s",
    "Merged from source code": "Combinado desde el código fuente",
    "Already up to date with %s": "Ya actualizado con %s",
    "Already up to date with source code": "Actualizado ya con el código fuente",
    "1 new string added": {
        "one": "Añadido 1 nueva cadena",
        "other": "Añadidas %s nuevas cadenas"
    },
    "1 obsolete string removed": {
        "one": "1 cadena obsoleta eliminada",
        "other": "%s cadenas obsoletas eliminadas"
    },
    "Your changes will be lost if you continue without saving": "Los cambios se perderán si continúa sin guardarlos",
    "Source text": "Texto origen",
    "%s translation": "%s traducción",
    "Comments": "Comentarios",
    "Context": "Contexto",
    "Translation": "Traducción",
    "No source files in this package, nothing to sync": "",
    "No strings could be extracted from source files": "No se pueden extraer las cadenas de los archivos fuente",
    "create in <code>%s</code>": "crear en <code>%s</code>",
    "Packages": "Paquetes",
    "File check": "Comprobar archivo",
    "File system permissions for %s": "Permisos del sistema de archivos para %s",
    "Other potential issues with %s": "Otros posibles problemas con %s",
    "Back": "Volver",
    "Get help": "Obtener ayuda",
    "Package details": "Detalles\n del \npaquete",
    "Translations (PO)": "Traducciones (PO)",
    "Template (POT)": "Plantilla (POT)",
    "File permissions": "Permisos de archivo",
    "Extends: %s": "Extiende: %s",
    "1 language": {
        "one": "1 idioma",
        "other": "%u idiomas"
    },
    "Updated": "Actualizado",
    "Powered by": "Funciona con",
    "Loco may not work as expected": "Loco puede no funcionar como se esperaba",
    "Configure Loco Translate": "Configurar Loco Translate",
    "Compiling MO files": "Compilando archivo MO",
    "Use built-in MO compiler.": "Utilizar compilador MO integrado.",
    "Use external command:": "Utilice\n el \ncomando\n \nexterno\n:",
    "Enter path to msgfmt on server": "Introduzca la carpeta del servidor msgfmt",
    "Generate hash tables": "Generar\n \ntablas\n \nhash",
    "Include Fuzzy strings": "",
    "Backing up PO files": "Haciendo copia de seguridad de archivos PO",
    "Number of backups to keep of each file:": "Número de copias de seguridad para mantener de cada archivo:",
    "Experimental features": "Características experimentales",
    "Enable WordPress core translations": "Habilitar traducciones del núcleo de WordPress",
    "Save settings": "Guardar configuración",
    "Template file": "Archivo de plantilla",
    "Switch to...": "Cambiar a...",
    "never": "nunca",
    "Save": "Guardar",
    "Download": "Descargar",
    "Sync": "Sinc",
    "Revert": "Deshacer",
    "Add": "Añadir",
    "Del": "Eliminar",
    "Fuzzy": "Fuzzy",
    "Filter translations": "Filtrar traducciones",
    "Help": "Ayuda",
    "Initialize new translations in %s": "Comenzar nuevas traducciones en %s",
    "Select from common languages": "Seleccione de lenguajes comunes",
    "or enter any language code": "o introduzca cualquier código de idioma",
    "create in plugin directory": "",
    "create in global languages directory": "crear en la carpeta global de idiomas",
    "Start translating": "Comenzar la traducicción",
    "New version available": "Disponible nueva versión",
    "Upgrade to version %s of Loco Translate": "Actualizar a la versión %s de Loco Translate",
    "Select a plugin or theme to translate": "Seleccione un plugin o tema para traducir",
    "Themes": "Temas",
    "Plugins": "Plugins",
    "Core": "Núcleo",
    "Translate WordPress plugins and themes directly in your browser": ""
} 
);
