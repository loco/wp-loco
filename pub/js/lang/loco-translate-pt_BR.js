/**
 * Loco js export: JavaScript function
 * Project: loco.po conversion
 * Release: Working copy
 * Locale: pt-BR, Portuguese (Brazil)
 * Exported by: Unregistered user
 * Exported at: Mon, 14 Dec 2015 11:00:55 +0000
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
    "Warning": "Alerta",
    "OK": "Ok",
    "Permission denied": "Permissão negada",
    "Settings saved": "Configurações salvas",
    "%s is not an official WordPress language": "%s não é uma linguagem oficial do Wordpress",
    "New PO file": "Novo arquivo PO",
    "PO file used as template. This will be renamed to %s on first save": "Arquivo PO usado como template. Isto vai ser renomeado para %s no primeiro salvamento",
    "You must specify a valid locale for a new PO file": "Você tem que especificar um local válido para o novo arquivo PO",
    "No translatable strings found": "Não foram encontrados termos traduzíveis",
    "Cannot create a PO file.": "Não pode ser criado o arquivo PO.",
    "PO file already exists with locale %s": "Arquivo PO já existe com a localização %s",
    "File cannot be created automatically. Fix the file permissions or use Download instead of Save": "Arquivo não pode ser criado automaticamente. Corrija as permissões do arquivo ou use Baixar em vez de Salvar.",
    "%s file is empty": "O arquivo %s está vazio",
    "Run Sync to update from source code": "Clique em Sincronizar para atualizar a partir do código fonte",
    "No strings could be extracted from source code": "Nenhum termo pode ser extraído a partir do código fonte",
    "Run Sync to update from %s": "Clique em Sincronizar para atualizar a partir de %s",
    "Source code has been modified, run Sync to update POT": "O código fonte foi modificado, clique em Sincronizar para o POT atualizado",
    "POT has been modified since PO file was saved, run Sync to update": "O arquivo POT não foi atualizado desde que o arquivo PO foi salvo, clique em Sincronizar para atualizar",
    "Bad file path": "Endereço de arquivo ruim",
    "Empty or invalid %s file": "O arquivo %s está vazio ou é inválido",
    "%s file has no header": "O arquivo %s não tem cabeçalho",
    "New template": "Novo modelo",
    "New language": "Novo idioma",
    "%s%% translated": "%s%% traduzido",
    "1 string": {
        "one": "1 termo",
        "other": "%s termos"
    },
    "%s fuzzy": "%s incerto",
    "%s untranslated": "%s não traduzido",
    "Failed to compile MO file with built-in compiler": "Falha ao compilar arquivo MO com compilador embutido",
    "Loco, Translation Management": "Loco, Gerenciador de Tradução",
    "Manage translations": "Gerenciar traduções",
    "Translation options": "Opções de traduções",
    "Loco Translate": "Tradução (Loco)",
    "Settings": "Configurações",
    "File download failed": "Download do arquivo falhou",
    "WPLANG is deprecated and should be removed from wp-config.php": "WPLANG é obsoleto e deve ser removido do wp-config.php",
    "Unknown language": "Idioma desconhecido",
    "Some files not writable": "Alguns arquivos não são editáveis",
    "Some files missing": "Alguns arquivos estão ausentes",
    "\"%s\" folder not writable": "Pasta \"%s\" não editável",
    "POT file not writable": "Arquivo POT não editável",
    "PO file not writable": "Arquivo PO não editável",
    "MO file not writable": "Arquivo MO não editável",
    "MO file not found": "Arquivo MO ausente",
    "Folder not writable": "Pasta não editável",
    "Folder not found": "Pasta não encontrada",
    "%s does not declare a \"Text Domain\"": "%s não declara um \"Text Domain\"",
    "Loco has guessed \"%s\"": "Loco adivinhou \"%s\"",
    "%s does not declare a \"Domain Path\"": "%s não declara um \"Domain Path\"",
    "%s has no POT file. Create one at \"%s/%s.pot\" if you need one.": "%s não possui um arquivo POT. Crie um em \"%s/%s.pot\" se você precisar.",
    "%s has a strange POT file name (%s). A better name would be \"%s.pot\"": "%s possui um nome estranho para o arquivo POT (%s). Um nome melhor seria \"%s.pot\"",
    "PHP extension \"%s\" is not installed. If you experience problems you should install it": "A extensão PHP \"%s\" não está instalada. Se você encontrar problemas, tente instalá-la.",
    "User does not have permission to manage translations": "O usuário não tem permissões para gerenciar traduções",
    "Invalid data posted to server": "Dados inválidos enviados para servidor",
    "Failed to compile MO file with %s, check your settings": "Falha ao compilar arquivo MO com %s, verifique suas configurações",
    "Package not found called %s": "Pacote chamado %s não encontrado",
    "Web server cannot create backups in \"%s\". Fix file permissions or disable backups in settings": "Servidor Web não pode criar backups em \"%s\". Corrija as permissões do arquivo ou desabilite backups nas configurações.",
    "Web server cannot create \"%s\" directory in \"%s\". Fix file permissions or create it manually.": "Servidor Web não pode criar o diretório \"%s\" em \"%s\". Corrija permissões do arquivo ou crie manualmente.",
    "Web server cannot create files in the \"%s\" directory. Fix file permissions or use the download function.": "O servidor web não pode criar arquivos no diretório \"%s\". Resolva as permissões do arquivo ou use a função de download.",
    "%s file is not writable by the web server. Fix file permissions or download and copy to \"%s/%s\".": "Arquivo %s não é editável pelo servidor web. Corrija as permissões do arquivo ou baixe e copie para \"%s/%s\".",
    "Cannot create MO file": "Arquivo MO não pode ser criado",
    "Cannot overwrite MO file": "Arquivo MO não pode ser sobrescrito",
    "Failed to write MO file": "Arquivo MO falho em ser editado",
    "Unknown error": "Erro desconhecido",
    "PO file saved": "Arquivo PO salvo",
    "and MO file compiled": "e MO compilado",
    "Merged from %s": "Combinado a partir de %s",
    "Merged from source code": "Combinado a partir do código fonte",
    "Already up to date with %s": "Atualizado desde %s",
    "Already up to date with source code": "Já está atualizado a partir do código fonte",
    "1 new string added": {
        "one": "1 novo termo adicionado",
        "other": "%s novos termos adicionados"
    },
    "1 obsolete string removed": {
        "one": "1 um termo obsoleto removido",
        "other": "%s termos obsoletos removidos"
    },
    "Your changes will be lost if you continue without saving": "Suas alterações serão perdidas se você continuar sem salvar",
    "Source text": "Texto fonte",
    "%s translation": "tradução %s",
    "Comments": "Comentários",
    "Context": "Contexto",
    "Translation": "Tradução",
    "No source files in this package, nothing to sync": "Não há arquivos fontes neste pacote, nada a sincronizar",
    "No strings could be extracted from source files": "Nenhum termo não pode ser extraído a partir dos arquivos de origem",
    "create in <code>%s</code>": "criar em <code>%s</code>",
    "Packages": "Pacotes",
    "File check": "Conferência",
    "File system permissions for %s": "Permissões do sistema de arquivo para %s",
    "Other potential issues with %s": "Outros problemas em potencial com %s",
    "Back": "Voltar",
    "Get help": "Pedir ajudar",
    "Package details": "Detalhes do pacote",
    "Translations (PO)": "Traduções (PO)",
    "Template (POT)": "Modelo (POT)",
    "File permissions": "Permissões do arquivo",
    "Extends: %s": "Extendido: %s",
    "1 language": {
        "one": "1 idioma",
        "other": "%u idiomas"
    },
    "Updated": "Atualizado",
    "Powered by": "Desenvolvido por",
    "Loco may not work as expected": "Loco pode não funcionar como esperado",
    "Configure Loco Translate": "Configure Tradução Loco",
    "Compiling MO files": "Compilando arquivos MO",
    "Use built-in MO compiler.": "Usar compilador MO interno.",
    "Use external command:": "Usar comando externo:",
    "Enter path to msgfmt on server": "Digite caminho para msgfmt no servidor",
    "Generate hash tables": "Gerar tabela de dispersão",
    "Include Fuzzy strings": "Incluir Fuzzy strings",
    "Backing up PO files": "Criando cópia de segurança dos arquivos PO",
    "Number of backups to keep of each file:": "Número de backups para manter de cada arquivo:",
    "Experimental features": "Funcionalidades experimentais",
    "Enable WordPress core translations": "Ativar traduções da core do WordPress",
    "Save settings": "Configurações de salvamento",
    "Template file": "Arquivo modelo",
    "Switch to...": "Mudar para...",
    "never": "nunca",
    "Save": "Salvar",
    "Download": "Baixar",
    "Sync": "Sincronizar",
    "Revert": "Reverter",
    "Add": "Adicionar",
    "Del": "Apagar",
    "Fuzzy": "Incerto",
    "Filter translations": "Filtrar traduções",
    "Help": "Ajuda",
    "Initialize new translations in %s": "Iniciar novas traduções em %s",
    "Select from common languages": "Selecionar a partir dos idiomas mais comuns",
    "or enter any language code": "ou adicione novo código de linguagem",
    "create in plugin directory": "criar no diretório do plugin",
    "create in global languages directory": "criar no diretório de idiomas global",
    "Start translating": "Começar a traduzir",
    "New version available": "Novo atualização disponível",
    "Upgrade to version %s of Loco Translate": "Atualizar para a versão %s do Tradução (Loco)",
    "Select a plugin or theme to translate": "Selecione um plugin ou tema para traduzir",
    "Themes": "Temas",
    "Plugins": "Plugins",
    "Core": "Núcleo",
    "Translate WordPress plugins and themes directly in your browser": ""
} 
);
