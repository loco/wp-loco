/**
 * Loco js export: JavaScript function
 * Project: loco.po conversion
 * Release: Working copy
 * Locale: ko-KR, Korean
 * Exported by: Unregistered user
 * Exported at: Wed, 06 Jul 2016 12:21:10 +0100
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
    "Error": "오류",
    "Warning": "경고",
    "OK": "확인",
    "Permission denied": "권한이 거부됨",
    "Settings saved": "설정이 저장됨",
    "%s is not an official WordPress language": "%s은(는) 공식 워드프레스 언어가 아닙니다",
    "New PO file": "새로운 PO 파일",
    "PO file used as template. This will be renamed to %s on first save": "PO 파일이 양식으로 사용됨. 처음 저장 시 파일명이  %s(으)로 바뀝니다.",
    "You must specify a valid locale for a new PO file": "새로운 PO 파일에 대한 올바른 로케일을 지정해야 합니다",
    "No translatable strings found": "번역 가능한 스트링을 발견하지 못함",
    "Cannot create a PO file.": "PO 파일을 생성할 수 없음.",
    "PO file already exists with locale %s": "이미 로케일  %s에 대한 PO 파일이 존재함",
    "File cannot be created automatically. Fix the file permissions or use Download instead of Save": "파일을 자동으로 생성하지 못했습니다. 파일 권한을 수정하거나 저장 대신 다운로드를 사용하세요",
    "%s file is empty": "%s 파일이 비어있음",
    "Run Sync to update from source code": "소스 코드로부터 업데이트 하기 위해 동기화를 실행하세요",
    "No strings could be extracted from source code": "소스 코드로부터 스트링을 추출하지 못했음",
    "Run Sync to update from %s": "%s(으)로부터 업데이트 하기 위해 동기화를 실행하세요",
    "Source code has been modified, run Sync to update POT": "소스 코드가 변경되었음, POT를 업데이트 하기 위해 동기화를 실행하세요",
    "POT has been modified since PO file was saved, run Sync to update": "PO 파일이 저장된 이후로 POT가 변경됨, 업데이트 하기 위해 동기화를 실행하세요",
    "Bad file path": "잘못된 파일 경로",
    "Empty or invalid %s file": "비어있거나 잘못된 %s 파일",
    "%s file has no header": "%s 파일에 머리글이 없음",
    "New template": "새로운 양식",
    "New language": "새로운 언어",
    "%s%% translated": "%s%% 번역됨",
    "1 string": "%u개의 스트링",
    "%s fuzzy": "%s개가 모호함",
    "%s untranslated": "%s개가 번역되지 않음",
    "Failed to compile MO file with built-in compiler": "내장된 생성 도구로 MO 파일을 생성하는데 실패함",
    "Loco, Translation Management": "Loco, 번역 관리",
    "Manage translations": "번역 관리",
    "Translation options": "번역 옵션",
    "Loco Translate": "Loco 번역",
    "Settings": "설정",
    "File download failed": "파일 다운로드에 실패함",
    "WPLANG is deprecated and should be removed from wp-config.php": "WPLANG은 사용 중지되었으며 wp-config.php에서 제거되어야 합니다.",
    "Unknown language": "알 수 없는 언어",
    "Some files not writable": "일부 파일에 쓰기가 불가능함",
    "Some files missing": "일부 파일을 찾지 못함",
    "\"%s\" folder not writable": "\"%s\" 폴더에 쓰기가 불가능함",
    "POT file not writable": "POT 파일에 쓰기가 불가능함",
    "PO file not writable": "PO 파일에 쓰기가 불가능함",
    "MO file not writable": "MO 파일에 쓰기가 불가능함",
    "MO file not found": "MO 파일을 찾지 못함",
    "Folder not writable": "폴더에 쓰기가 불가능함",
    "Folder not found": "폴더를 찾지 못함",
    "%s does not declare a \"Text Domain\"": "%s 이(가) \"텍스트 도메인\"을 알려주지 않습니다",
    "Loco has guessed \"%s\"": "Loco가 \"%s\"로 추측했습니다",
    "%s does not declare a \"Domain Path\"": "%s 이(가) \"도메인 경로\"를 알려주지 않습니다",
    "%s has no POT file. Create one at \"%s/%s.pot\" if you need one.": "%s 은(는) POT 파일이 없습니다. 필요할 경우  \"%s/%s.pot\" 에서 생성하세요.",
    "%s has a strange POT file name (%s). A better name would be \"%s.pot\"": "%s의 POT 파일명(%s)이 이상합니다. \"%s.pot\"가 더 나은 것 같습니다.",
    "User does not have permission to manage translations": "사용자가 번역을 관리할 권한이 없음",
    "Invalid data posted to server": "서버에 잘못된 데이터가 게시됨",
    "Failed to compile MO file with %s, check your settings": "%s(으)로 MO 파일을 생성하는데 실패함, 설정을 확인하세요",
    "Package not found called %s": "%s 이라 불리우는 패키지를 찾지 못함",
    "Web server cannot create backups in \"%s\". Fix file permissions or disable backups in settings": "웹 서버가 \"%s\" 에 백업을 생성할 수 없음. 파일 권한을 수정하거나 설정에서 백업을 비활성화하세요",
    "Web server cannot create \"%s\" directory in \"%s\". Fix file permissions or create it manually.": "웹 서버가  \"%s\" 디렉터리를 \"%s\" 에 생성하지 못했습니다. 파일 권한을 수정하거나 수동으로 생성하세요.",
    "Web server cannot create files in the \"%s\" directory. Fix file permissions or use the download function.": "웹 서버가  \"%s\" 디렉터리를 \"%s\" 에 생성하지 못했습니다. 파일 권한을 수정하거나 다운로드 기능을 사용하세요.",
    "%s file is not writable by the web server. Fix file permissions or download and copy to \"%s/%s\".": "웹 서버가  %s 파일을 기록할 수 없습니다. 파일 권한을 수정하거나 \"%s/%s\" 에 다운로드 및 복사하세요.",
    "Cannot create MO file": "MO 파일을 생성할 수 없음",
    "Cannot overwrite MO file": "MO 파일을 덮어쓸 수 없음",
    "Failed to write MO file": "MO 파일에 기록하지 못함",
    "Packages": "패키지",
    "File check": "파일 확인",
    "File system permissions for %s": "%s 에 대한 파일 시스템 권한",
    "Other potential issues with %s": "%s 에 대한 기타 잠재적 문제점",
    "Back": "뒤로",
    "Get help": "도움 얻기",
    "Package details": "패키지 세부 사항",
    "Translations (PO)": "번역 (PO)",
    "Template (POT)": "양식 (POT)",
    "File permissions": "파일 권한",
    "Extends: %s": "다음으로부터 확장: %s",
    "1 language": "%u개의 언어",
    "Updated": "업데이트:",
    "Powered by": "다음에 의해 작동 중:",
    "Loco may not work as expected": "Loco가 예상대로 작동하지 않을 수 있음",
    "Configure Loco Translate": "Loco 번역 설정",
    "Compiling MO files": "MO 파일 생성 작업",
    "Use built-in MO compiler.": "내장된 MO 생성 도구 사용",
    "Use external command:": "외부 명령어 사용:",
    "Enter path to msgfmt on server": "서버의 msgfmt 에 대한 경로 입력",
    "Generate hash tables": "해시 테이블 생성",
    "Include Fuzzy strings": "모호한 스트링 포함",
    "Backing up PO files": "PO 파일 백업 작업",
    "Number of backups to keep of each file:": "각 파일 별 유지할 백업 개수",
    "Experimental features": "실험적인 기능",
    "Enable WordPress core translations": "워드프레스 핵심 번역 활성화",
    "Save settings": "설정 저장",
    "Template file": "양식 파일",
    "Switch to...": "다음으로 전환...",
    "never": "절대",
    "Save": "저장",
    "Download": "다운로드",
    "Sync": "동기화",
    "Revert": "되돌리기",
    "Add": "추가",
    "Del": "삭제",
    "Fuzzy": "모호함",
    "Filter translations": "필터 번역",
    "Help": "도움말",
    "Initialize new translations in %s": "%s 에 새로운 번역을 시작",
    "Select from common languages": "공통 언어에서 선택",
    "or enter any language code": "또는 원하는 언어 코드 입력",
    "create in <code>%s</code>": "<code>%s</code> 에 생성",
    "create in global languages directory": "범용 언어 디렉터리에 생성",
    "Start translating": "번역 시작",
    "New version available": "새로운 버전 사용 가능",
    "Upgrade to version %s of Loco Translate": "Loco 번역을 버전 %s(으)로 업그레이드",
    "Select a plugin or theme to translate": "번역할 플러그인 또는 테마를 선택하세요",
    "Themes": "테마",
    "Plugins": "플러그인",
    "Core": "핵심",
    "PHP extension \"%s\" is not installed. If you experience problems you should install it": "php 확장 기능 \"%s\"이(가) 설치되지 않았습니다. 문제가 발생할 경우 설치하세요",
    "Unknown error": "알 수없는 오류",
    "PO file saved": "PO 파일이 저장됨",
    "and MO file compiled": "그리고 MO 파일이 생성되었음",
    "Merged from %s": "%s (으)로부터 병합됨",
    "Merged from source code": "원본 코드에서 병합됨",
    "Already up to date with %s": "%s 와(과) 비교하여 최신 상태임",
    "Already up to date with source code": "원본 코드와 비교하여 최신 상태임",
    "1 new string added": "%u개의 새로운 스트링이 추가됨",
    "1 obsolete string removed": "%u개의 사용 중지된 스트링이 제거됨",
    "Your changes will be lost if you continue without saving": "저장하지 않고 계속할 경우 변경 사항을 잃게 됩니다.",
    "Source text": "원본 텍스트",
    "%s translation": "%s 번역",
    "Comments": "댓글",
    "Context": "문맥",
    "Translation": "번역",
    "No source files in this package, nothing to sync": "이 패키지에 소스 파일이 없습니다, 동기화 할 것이 없음",
    "No strings could be extracted from source files": "소스 파일로부터 스트링을 추출하지 못했음",
    "Translate WordPress plugins and themes directly in your browser": "브라우저에서 직접 워드프레스 플러그인 및 테마 번역",
    "http://wordpress.org/extend/plugins/loco-translate": "http://wordpress.org/extend/plugins/loco-translate",
    "Tim Whitlock": "Tim Whitlock",
    "https://localise.biz/help/wordpress/translate-plugin": "https://localise.biz/help/wordpress/translate-plugin"
} 
);
