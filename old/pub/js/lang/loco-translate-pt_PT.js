/**
 * Loco js export: JavaScript function
 * Project: loco.po conversion
 * Release: Working copy
 * Locale: pt-PT, Portuguese (Portugal)
 * Exported by: Unregistered user
 * Exported at: Wed, 06 Jul 2016 12:21:12 +0100
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
    "Error": "Erro",
    "Warning": "Aviso",
    "OK": "Ok",
    "Permission denied": "Permissão negada",
    "Settings saved": "Definições guardadas",
    "%s is not an official WordPress language": "%s não é um idioma oficial do WordPress",
    "New PO file": "Novo ficheiro PO",
    "PO file used as template. This will be renamed to %s on first save": "Ficheiro PO utilizado como modelo. Será renomeado para %s quando o guardar pela primeira vez.",
    "You must specify a valid locale for a new PO file": "Tem que especificar um código locale válido para o novo ficheiro PO",
    "No translatable strings found": "Não foram encontrados termos para tradução",
    "Cannot create a PO file.": "Não pode ser criado o ficheiro PO.",
    "PO file already exists with locale %s": "O ficheiro PO já existe com o código locale %s",
    "File cannot be created automatically. Fix the file permissions or use Download instead of Save": "Não foi possível criar o ficheiro automaticamente. Corrija as permissões do ficheiro ou use Descarregar em vez de Guardar.",
    "%s file is empty": "O ficheiro %s está vazio",
    "Run Sync to update from source code": "Clique em Sincronizar para actualizar a partir do código fonte",
    "No strings could be extracted from source code": "Nenhum termo pôde ser extraído a partir do código fonte",
    "Run Sync to update from %s": "Clique em Sincronizar para actualizar a partir de %s",
    "Source code has been modified, run Sync to update POT": "O código fonte foi modificado, clique em Sincronizar para actualizar o POT",
    "POT has been modified since PO file was saved, run Sync to update": "O ficheiro POT foi modificado depois do ficheiro PO ter sido guardado, clique em Sincronizar para actualizar",
    "Bad file path": "Caminho do ficheiro incorrecto",
    "Empty or invalid %s file": "O ficheiro %s está vazio ou é inválido",
    "%s file has no header": "O ficheiro %s não tem cabeçalho",
    "New template": "Novo modelo",
    "New language": "Novo idioma",
    "%s%% translated": "%s%% traduzido",
    "1 string": {
        "one": "1 termo",
        "other": "%s termos"
    },
    "%s fuzzy": "%s impreciso(s)",
    "%s untranslated": "%s não traduzido",
    "Failed to compile MO file with built-in compiler": "Falhou ao compilar o ficheiro MO com compilador incluído",
    "Loco, Translation Management": "Loco, Translation Management",
    "Manage translations": "Gerir traduções",
    "Translation options": "Opções de tradução",
    "Loco Translate": "Loco Translate",
    "Settings": "Definições",
    "File download failed": "Falhou ao descarregar o ficheiro",
    "WPLANG is deprecated and should be removed from wp-config.php": "O WPLANG está obsoleto e deve ser removido do wp-config.php",
    "Unknown language": "Idioma desconhecido",
    "Some files not writable": "Alguns ficheiros não são editáveis",
    "Some files missing": "Alguns ficheiros em falta",
    "\"%s\" folder not writable": "Pasta \"%s\" não é editável",
    "POT file not writable": "Ficheiro POT não editável",
    "PO file not writable": "Ficheiro PO não editável",
    "MO file not writable": "Ficheiro MO não editável",
    "MO file not found": "Ficheiro MO não encontrado",
    "Folder not writable": "Pasta não editável",
    "Folder not found": "Pasta não encontrada",
    "%s does not declare a \"Text Domain\"": "O %s não declara um \"Text Domain\"",
    "Loco has guessed \"%s\"": "O Loco adivinhou \"%s\"",
    "%s does not declare a \"Domain Path\"": "O %s não declara um \"Domain Path\"",
    "%s has no POT file. Create one at \"%s/%s.pot\" if you need one.": "O %s não tem ficheiro POT. Crie um em \"%s/%s.pot\" se precisar.",
    "%s has a strange POT file name (%s). A better name would be \"%s.pot\"": "O %s tem um ficheiro POT com um nome estranho (%s). Seria melhor um nome como \"%s.pot\".",
    "User does not have permission to manage translations": "O utilizador não tem permissões para gerir traduções",
    "Invalid data posted to server": "Dados inválidos enviados para o servidor",
    "Failed to compile MO file with %s, check your settings": "Falhou ao compilar ficheiro MO com %s, verifique as suas definições",
    "Package not found called %s": "Pacote com nome %s não encontrado",
    "Web server cannot create backups in \"%s\". Fix file permissions or disable backups in settings": "O servidor web não pode criar cópias de segurança em \"%s\". Corrija as permissões do ficheiro ou desactive as cópias de segurança nas definições.",
    "Web server cannot create \"%s\" directory in \"%s\". Fix file permissions or create it manually.": "O servidor web não pode criar o directório \"%s\" em \"%s\". Corrija permissões do ficheiro ou crie o directório manualmente.",
    "Web server cannot create files in the \"%s\" directory. Fix file permissions or use the download function.": "O servidor web não pode criar ficheiros no directório \"%s\". Corrija as permissões do ficheiro ou utilize a função Descarregar.",
    "%s file is not writable by the web server. Fix file permissions or download and copy to \"%s/%s\".": "O ficheiro %s não é editável pelo servidor web. Corrija as permissões do ficheiro ou descarregue e copie para \"%s/%s\".",
    "Cannot create MO file": "Não é possível criar ficheiro MO",
    "Cannot overwrite MO file": "Não é possível substituir ficheiro MO",
    "Failed to write MO file": "Falhou ao guardar ficheiro MO",
    "Packages": "Pacotes",
    "File check": "Verificação do ficheiro",
    "File system permissions for %s": "Permissões do sistema de ficheiros para %s",
    "Other potential issues with %s": "Outros problemas potenciais com %s",
    "Back": "Voltar",
    "Get help": "Obter ajuda",
    "Package details": "Detalhes do pacote",
    "Translations (PO)": "Traduções (PO)",
    "Template (POT)": "Modelo (POT)",
    "File permissions": "Permissões do ficheiro",
    "Extends: %s": "Estendido: %s",
    "1 language": {
        "one": "1 idioma",
        "other": "%u idiomas"
    },
    "Updated": "Actualizado",
    "Powered by": "Desenvolvido por",
    "Loco may not work as expected": "O Loco pode não funcionar como esperado",
    "Configure Loco Translate": "Configurar Loco Translate",
    "Compiling MO files": "A compilar ficheiros MO",
    "Use built-in MO compiler.": "Utilizar compilador MO incluído.",
    "Use external command:": "Utilizar comando externo:",
    "Enter path to msgfmt on server": "Introduza o caminho para o msgfmt no servidor",
    "Generate hash tables": "Gerar tabela hash",
    "Include Fuzzy strings": "Incluir termos imprecisos",
    "Backing up PO files": "A criar cópia de segurança dos ficheiros PO",
    "Number of backups to keep of each file:": "Número de cópias de segurança a manter de para cada ficheiro:",
    "Experimental features": "Recursos experimentais",
    "Enable WordPress core translations": "Activar traduções do core do WordPress",
    "Save settings": "Guardar definições",
    "Template file": "Ficheiro modelo",
    "Switch to...": "Mudar para...",
    "never": "nunca",
    "Save": "Guardar",
    "Download": "Descarregar",
    "Sync": "Sincronizar",
    "Revert": "Reverter",
    "Add": "Adicionar",
    "Del": "Apagar",
    "Fuzzy": "Impreciso",
    "Filter translations": "Filtrar traduções",
    "Help": "Ajuda",
    "Initialize new translations in %s": "Iniciar novas traduções em %s",
    "Select from common languages": "Selecionar a partir dos idiomas mais comuns",
    "or enter any language code": "ou introduza um código de idioma",
    "create in <code>%s</code>": "criar em <code>%s</code>",
    "create in global languages directory": "criar no directório global de idiomas",
    "Start translating": "Começar a traduzir",
    "New version available": "Novo atualização disponível",
    "Upgrade to version %s of Loco Translate": "Actualizar para a versão %s do Loco Translate",
    "Select a plugin or theme to translate": "Selecione um plugin ou tema para traduzir",
    "Themes": "Temas",
    "Plugins": "Plugins",
    "Core": "Core",
    "PHP extension \"%s\" is not installed. If you experience problems you should install it": "A extensão \"%s\" do PHP não está instalada. Se tiver algum problema deverá proceder à sua instalação.",
    "Unknown error": "Erro desconhecido",
    "PO file saved": "Ficheiro PO guardado",
    "and MO file compiled": "e ficheiro MO compilado",
    "Merged from %s": "Misturado a partir de %s",
    "Merged from source code": "Misturado a partir do código fonte",
    "Already up to date with %s": "Actualizado desde %s",
    "Already up to date with source code": "Já está actualizado a partir do código fonte",
    "1 new string added": {
        "one": "1 novo termo adicionado",
        "other": "%s novos termos adicionados"
    },
    "1 obsolete string removed": {
        "one": "1 um termo obsoleto removido",
        "other": "%s termos obsoletos removidos"
    },
    "Your changes will be lost if you continue without saving": "As suas alterações serão perdidas se continuar sem guardar",
    "Source text": "Texto fonte",
    "%s translation": "Tradução para %s",
    "Comments": "Comentários",
    "Context": "Contexto",
    "Translation": "Tradução",
    "No source files in this package, nothing to sync": "Não há ficheiros de origem neste pacote, não há nada para sincronizar.",
    "No strings could be extracted from source files": "Nenhum termo pôde ser extraído a partir dos ficheiros de origem",
    "Translate WordPress plugins and themes directly in your browser": "Traduza plugins e temas do WordPress directamente no seu browser",
    "http://wordpress.org/extend/plugins/loco-translate": "http://wordpress.org/extend/plugins/loco-translate",
    "Tim Whitlock": "Tim Whitlock",
    "https://localise.biz/help/wordpress/translate-plugin": "https://localise.biz/help/wordpress/translate-plugin"
} 
);
