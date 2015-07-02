/**
 * Loco js export: JavaScript function
 * Project: loco.po conversion
 * Release: Working copy
 * Locale: tr_TR, Turkish
 * Exported by: Unregistered user
 * Exported at: Thu, 02 Jul 2015 14:56:23 +0100 
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
    "Error": "Hata",
    "Warning": "Uyarı",
    "OK": "Tamam",
    "Permission denied": "İzin reddedildi",
    "Settings saved": "Ayarlar kaydedildi",
    "%s is not an official WordPress language": "",
    "New PO file": "Yeni PO Dosyası",
    "PO file used as template. This will be renamed to %s on first save": "PO dosyası şablon olarak kullanıldı. İlk kaydetmenizde %s olarak isimlendirilecek.",
    "You must specify a valid locale for a new PO file": "Yeni PO dosyası için geçerli bir Yerel Değer belirtmek zorundasınız",
    "No translatable strings found": "Çevrilebilecek herhangi bir dize bulunamadı",
    "Cannot create a PO file.": "PO dosyası oluşturulamaz.",
    "PO file already exists with locale %s": "PO dosyası %s dil koduyla zaten mevcut",
    "File cannot be created automatically. Fix the file permissions or use Download instead of Save": "Dosya otomatik olarak oluşturulamıyor. Dosya izinlerini düzenleyin veya kaydet butonu yerine indirme butonunu kullanın.",
    "%s file is empty": "%s dosyası boş",
    "Run Sync to update from source code": "Kaynak kodundan güncelleştirme yapmak için eşitleme yapın",
    "No strings could be extracted from source code": "Kaynak kodundan herhangi dize çıkarılamadı",
    "Run Sync to update from %s": "%s kaynağından güncelleştirme yapmak için eşitleme yapın",
    "Source code has been modified, run Sync to update POT": "Kaynak dosyası değiştirilmiş, POT doyasını güncellemek için eşitleme yapın",
    "POT has been modified since PO file was saved, run Sync to update": "PO dosyası en son kaydedildiğinden beri POT değişikliğe uğramış, güncellemek için eşitleme yapın",
    "Bad file path": "Geçersiz dosya yolu",
    "Empty or invalid %s file": "%s dosyası boş veya geçersiz",
    "%s file has no header": "%s dosyasının başlığı yok",
    "New template": "Yeni Şablon",
    "New language": "Yeni Dil",
    "%s%% translated": "%s%% çevrildi",
    "1 string": {
        "other": "1 dize"
    },
    "%s fuzzy": "%s bulanık",
    "%s untranslated": "%s çevrilmemiş",
    "Failed to compile MO file with built-in compiler": "Yerleşik derleyici vasıtasıyla MO dosyası derlenirken hata oluştu",
    "Loco, Translation Management": "Loco Çeviri Yönetimi",
    "Manage translations": "Çevirileri Yönet",
    "Translation options": "Çeviri Seçenekleri",
    "Loco Translate": "Loco Çeviri",
    "Settings": "Ayarlar",
    "File download failed": "Dosya indirme işlemi başarısız oldu",
    "WPLANG is deprecated and should be removed from wp-config.php": "WPLANG iartık kullanılmıyor bu nedenle wp-config.php dosyasından çıkarılması gerekiyor",
    "Unknown language": "Bilinmeyen dil",
    "Some files not writable": "Bazı dosyalar yazılabilir değil",
    "Some files missing": "Bazı dosyalar kayıp",
    "\"%s\" folder not writable": "\"%s\" dizini yazılabilir değil",
    "POT file not writable": "POT dosyası yazılabilir değil",
    "PO file not writable": "PO dosyası yazılabilir değil",
    "MO file not writable": "MO dosyası yazılabilir değil",
    "MO file not found": "MO dosyası bulunamadı",
    "Folder not writable": "Dizin yazılabilir değil",
    "Folder not found": "Dizin bulunmadı",
    "%s does not declare a \"Text Domain\"": "",
    "Loco has guessed \"%s\"": "",
    "%s does not declare a \"Domain Path\"": "",
    "%s has no POT file. Create one at \"%s/%s.pot\" if you need one.": "",
    "%s has a strange POT file name (%s). A better name would be \"%s.pot\"": "",
    "PHP extension \"%s\" is not installed. If you experience problems you should install it": "",
    "User does not have permission to manage translations": "Kullanıcının çevirileri yönetme izni yok",
    "Invalid data posted to server": "Sunucuya geçersiz veri gönderildi",
    "Failed to compile MO file with %s, check your settings": "%s vasıtasıyla MO dosyası derlenirken hata oluştu, ayarlarınızı tekrar kontrol edin",
    "Package not found called %s": "%s isimli paket bulunamadı",
    "Web server cannot create backups in \"%s\". Fix file permissions or disable backups in settings": "Web sunucusu \"%s\" içinde yedek oluşturamıyor. Dosya izinlerini düzeltin veya ayarlardan yedeklemeleri devre dışı bırakın.",
    "Web server cannot create \"%s\" directory in \"%s\". Fix file permissions or create it manually.": "Web sunucusu  \"%s\" dizinini \"%s\" içinde oluşturamıyor. Dosya izinlerini düzeltin veya el ile oluşturmayı deneyin.",
    "Web server cannot create files in the \"%s\" directory. Fix file permissions or use the download function.": "Web sunucusu \"%s\" dizini içinde dosya oluşturamıyor. Dosya izinlerini düzeltin veya indirme fonksiyonunu kullanın.",
    "%s file is not writable by the web server. Fix file permissions or download and copy to \"%s/%s\".": "%s dosyası web sunucusu tarafından yazılamıyor. Dosya izinlerini düzeltin veya dosyayı indirip \"%s/%s\" yoluna kopyalayın.",
    "Cannot create MO file": "MO dosyası oluşturulamıyor",
    "Cannot overwrite MO file": "MO dosyası üzerine yazılamıyor",
    "Failed to write MO file": "MO dosyasına yazma işlemi başarısız oldu",
    "Unknown error": "Bilinmeyen hata",
    "PO file saved": "PO dosyası kaydedildi",
    "and MO file compiled": "ve MO dosyası derlendi",
    "Merged from %s": "%s üzerinden birleştirildi",
    "Merged from source code": "Kaynak koddan birleştirildi",
    "Already up to date with %s": "%s zaten güncel",
    "Already up to date with source code": "Kaynak kod zaten güncel",
    "1 new string added": {
        "other": "1 adet yeni dize eklendi"
    },
    "1 obsolete string removed": {
        "other": "1 adet kullanılmayan dize kaldırıldı"
    },
    "Your changes will be lost if you continue without saving": "Kaydetmeden devam ederseniz yaptığınız değişiklikler kaybolacak",
    "Source text": "Kaynak Metin",
    "%s translation": "%s Çeviri",
    "Comments": "Yorumlar",
    "Context": "Genel Durum",
    "Translation": "Çeviri",
    "No source files in this package, nothing to sync": "Bu paket içinde eşitleme yapılacak herhangi bir kaynak dosya bulunmuyor",
    "No strings could be extracted from source files": "Kaynak dosyalarından herhangi bir dize çıkartılamadı",
    "create in <code>%s</code>": "<code>%s</code> yolunda oluştur",
    "Packages": "Paketler",
    "File check": "Dosya Denetimi",
    "File system permissions for %s": "%s için dosya sistemi izinleri",
    "Other potential issues with %s": "",
    "Back": "Geri",
    "Get help": "Yardım",
    "Package details": "Paket Bilgileri",
    "Translations (PO)": "Çeviriler (PO)",
    "Template (POT)": "Şablon (POT)",
    "File permissions": "Dosya İzinleri",
    "Extends: %s": "Genişletmeler: %s",
    "1 language": {
        "other": "1 Dil"
    },
    "Updated": "Güncellendi",
    "Powered by": "Hazırlayan:",
    "Loco may not work as expected": "Loco beklendiği gibi çalışmayabilir",
    "Configure Loco Translate": "Loco Çeviri Yapılandırma",
    "Compiling MO files": "MO Dosyaları Derleme",
    "Use built-in MO compiler.": "Yerleşik MO derleyiciyi kullan",
    "Use external command:": "Harici komut kullan:",
    "Enter path to msgfmt on server": "Sunucudaki msgfmt yolunu girin",
    "Generate hash tables": "Hash tabloları oluştur",
    "Backing up PO files": "PO Dosyaları Yedekleme",
    "Number of backups to keep of each file:": "Her bir dosya için tutulacak yedek sayısı:",
    "Experimental features": "Deneysel Özellikler",
    "Enable Wordpress core translations": "WordPress çekirdek çevirilerini etkinleştir",
    "Save settings": "Ayarları Kaydet",
    "Template file": "Şablon dosyası",
    "Switch to...": "Geçiş Yap:",
    "never": "hiçbir zaman",
    "Save": "Kaydet",
    "Download": "İndir",
    "Sync": "Eşitle",
    "Revert": "Geri Al",
    "Add": "Ekle",
    "Del": "Sil",
    "Fuzzy": "Bulanık",
    "Filter translations": "Çevirileri filtrele",
    "Help": "Yardım",
    "Initialize new translations in %s": "%s için yeni çeviri başlat",
    "Select from common languages": "Bilinen diller arasından seç",
    "or enter any language code": "veya herhangi bir dil kodu gir",
    "create in plugin directory": "",
    "create in global languages directory": "languages dizini içinde oluştur",
    "Start translating": "Çevirmeye Başla",
    "New version available": "Yeni versiyon mevcut",
    "Upgrade to version %s of Loco Translate": "Loco Çeviri eklentisini %s versiyonuna yükselt",
    "Select a plugin or theme to translate": "Çevirmek için bir eklenti veya tema seçin",
    "Themes": "Temalar",
    "Plugins": "Eklentiler",
    "Core": "Çekirdek"
} 
);
