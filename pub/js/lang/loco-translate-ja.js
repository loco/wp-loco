/**
 * Loco js export: JavaScript function
 * Project: loco.po conversion
 * Release: Working copy
 * Locale: ja-JP, Japanese
 * Exported by: Unregistered user
 * Exported at: Mon, 14 Dec 2015 11:00:53 +0000
 */
loco = window.loco||{}, loco.t = function( pairs ){
    
    // named plural forms
    var pluralForms = [
    "other"
];
    
    // calc numeric index of a plural form (0-0)
    function pluralIndex( n ){
        return Number( 0 );
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
    "Error": "エラー",
    "Warning": "警告",
    "OK": "OK",
    "Permission denied": "アクセスが拒否されました",
    "Settings saved": "設定を保存しました",
    "%s is not an official WordPress language": "",
    "New PO file": "新しいPOファイル",
    "PO file used as template. This will be renamed to %s on first save": "POファイルをテンプレートとして使用しました。これは最初に%sとして保存されます。",
    "You must specify a valid locale for a new PO file": "新しいPOファイルのための有効なロケールを指定する必要があります",
    "No translatable strings found": "翻訳できる文字列が見つかりませんでした",
    "Cannot create a PO file.": "POファイルを作成できません。",
    "PO file already exists with locale %s": "ロケール%sのPOファイルはすでに存在します",
    "File cannot be created automatically. Fix the file permissions or use Download instead of Save": "ファイルを自動的に作成できません。ファイルのパーミッションを変更するか、ダウンロードして保存したものを使用して下さい。",
    "%s file is empty": "ファイル %s は空です",
    "Run Sync to update from source code": "ソースコードの更新の同期を実行",
    "No strings could be extracted from source code": "ソースファイルから文字列が見つかりませんでした",
    "Run Sync to update from %s": "%sの更新の同期を実行",
    "Source code has been modified, run Sync to update POT": "ソースコードを変更し、POTの同期と更新を行いました",
    "POT has been modified since PO file was saved, run Sync to update": "POファイルの保存後にPOTが変更されたため、同期と更新を行いました",
    "Bad file path": "間違ったファイルパス",
    "Empty or invalid %s file": "ファイル%sは空または壊れています",
    "%s file has no header": "ファイル%sにヘッダがありません",
    "New template": "新しいテンプレート",
    "New language": "新しい言語",
    "%s%% translated": "%s%%件翻訳済み",
    "1 string": {
        "other": "%s件の文字列"
    },
    "%s fuzzy": "%s件のファジー",
    "%s untranslated": "%s件の未翻訳",
    "Failed to compile MO file with built-in compiler": "内蔵コンパイラーでのMOファイルのコンパイルができませんでした",
    "Loco, Translation Management": "Loco - 翻訳管理",
    "Manage translations": "管理",
    "Translation options": "設定",
    "Loco Translate": "Loco Translate",
    "Settings": "設定",
    "File download failed": "ファイルのダウンロードができませんでした",
    "WPLANG is deprecated and should be removed from wp-config.php": "WPLANG は廃止されたため、wp-config.php から削除する必要があります。",
    "Unknown language": "不明な言語",
    "Some files not writable": "いくつかのファイルに書き込めません",
    "Some files missing": "いくつかのファイルが不明",
    "\"%s\" folder not writable": "\"%s\" フォルダに書き込めません",
    "POT file not writable": "POTファイルに書き込めません",
    "PO file not writable": "POファイルに書き込めません",
    "MO file not writable": "MOファイルに書き込めません",
    "MO file not found": "MOファイルが見つかりません",
    "Folder not writable": "フォルダに書き込めません",
    "Folder not found": "フォルダが見つかりません",
    "%s does not declare a \"Text Domain\"": "",
    "Loco has guessed \"%s\"": "",
    "%s does not declare a \"Domain Path\"": "",
    "%s has no POT file. Create one at \"%s/%s.pot\" if you need one.": "",
    "%s has a strange POT file name (%s). A better name would be \"%s.pot\"": "",
    "PHP extension \"%s\" is not installed. If you experience problems you should install it": "",
    "User does not have permission to manage translations": "ユーザーは翻訳管理を行う権限を持っていません",
    "Invalid data posted to server": "サーバーへの無効なデータ送信",
    "Failed to compile MO file with %s, check your settings": "%sのMOファイルのコンパイルに失敗しました。設定を確認して下さい。",
    "Package not found called %s": "パッケージが見つからず%sを呼び出せません",
    "Web server cannot create backups in \"%s\". Fix file permissions or disable backups in settings": "ウェブサーバーで\"%s\"のバックアップを作成できません。ファイルのパーミッションを変更するか、設定のバックアップを無効にして下さい。",
    "Web server cannot create \"%s\" directory in \"%s\". Fix file permissions or create it manually.": "ウェブサーバーは\"%s\"を\"%s\"に作成できません。ファイルのパーミッションを変更するか、手で作成して下さい。",
    "Web server cannot create files in the \"%s\" directory. Fix file permissions or use the download function.": "ウェブサーバーは\"%s\"ディレクトリにファイルを作成できません。ファイルのパーミッションを変更するか、ダウンロード機能を使用して下さい。",
    "%s file is not writable by the web server. Fix file permissions or download and copy to \"%s/%s\".": "%sファイルはウェブサーバーから書き込みできません。ファイルの権限を変更するか、 ダウンロードして\"%s/%s\"へコピーして下さい。",
    "Cannot create MO file": "MOファイルを作成できません",
    "Cannot overwrite MO file": "MOファイルを上書きできません",
    "Failed to write MO file": "MOファイルへ書き込みできません",
    "Unknown error": "不明なエラー",
    "PO file saved": "POファイルを保存しました",
    "and MO file compiled": "またMOファイルをコンパイルしました",
    "Merged from %s": "%sから結合",
    "Merged from source code": "ソースコードから結合",
    "Already up to date with %s": "%sはすでに最新です",
    "Already up to date with source code": "ソースコードはすでに最新です",
    "1 new string added": {
        "other": "%s件の新しい文字列を追加しました"
    },
    "1 obsolete string removed": {
        "other": "%s件の文字列を削除しました"
    },
    "Your changes will be lost if you continue without saving": "保存せずに続けると変更内容は反映されません",
    "Source text": "原文",
    "%s translation": "%sの翻訳",
    "Comments": "コメント",
    "Context": "属性",
    "Translation": "訳文",
    "No source files in this package, nothing to sync": "このパッケージにはソースファイルがないため、同期していません",
    "No strings could be extracted from source files": "ソースファイルから文字列が見つかりませんでした",
    "create in <code>%s</code>": "<code>%s</code>に作成する",
    "Packages": "パッケージ",
    "File check": "ファイルチェック",
    "File system permissions for %s": "%sのファイルシステム権限",
    "Other potential issues with %s": "",
    "Back": "戻る",
    "Get help": "ヘルプ",
    "Package details": "パッケージ詳細",
    "Translations (PO)": "翻訳 (PO)",
    "Template (POT)": "テンプレート (POT)               ",
    "File permissions": "ファイル権限",
    "Extends: %s": "拡張: %s",
    "1 language": {
        "other": "%u言語"
    },
    "Updated": "更新日時",
    "Powered by": "　",
    "Loco may not work as expected": "Loco が期待通りに動作しない可能性があります",
    "Configure Loco Translate": "Loco Translate の設定",
    "Compiling MO files": "MOファイルのコンパイル",
    "Use built-in MO compiler.": "内蔵のMOコンパイラーを使用する",
    "Use external command:": "外部コマンドを使用する:",
    "Enter path to msgfmt on server": "サーバのmsgfmtへのパスを入力",
    "Generate hash tables": "ハッシュテーブルを生成する",
    "Include Fuzzy strings": "",
    "Backing up PO files": "POファイルのバックアップ",
    "Number of backups to keep of each file:": "ファイルごとに保存するバックアップ数:",
    "Experimental features": "実験的な機能",
    "Enable WordPress core translations": "WordPressコアの翻訳を行う",
    "Save settings": "設定を保存",
    "Template file": "テンプレートファイル",
    "Switch to...": "切り替え…",
    "never": "常に",
    "Save": "保存",
    "Download": "ダウンロード",
    "Sync": "同期",
    "Revert": "元に戻す",
    "Add": "追加",
    "Del": "削除",
    "Fuzzy": "ファジー",
    "Filter translations": "翻訳を絞り込み",
    "Help": "ヘルプ",
    "Initialize new translations in %s": "%sの新しい言語の初期化",
    "Select from common languages": "定義済みの言語から選択",
    "or enter any language code": "または他の言語コードを入力",
    "create in plugin directory": "",
    "create in global languages directory": "全体の言語ディレクトリに作成する",
    "Start translating": "翻訳を開始する",
    "New version available": "利用可能な新しいバージョン",
    "Upgrade to version %s of Loco Translate": "Loco Translate のバージョンを%sへ更新します",
    "Select a plugin or theme to translate": "翻訳するテーマまたはプラグインを選択して下さい",
    "Themes": "テーマ",
    "Plugins": "プラグイン",
    "Core": "コア",
    "Translate WordPress plugins and themes directly in your browser": ""
} 
);
