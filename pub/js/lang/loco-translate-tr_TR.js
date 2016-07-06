/**
 * Loco js export: JavaScript function
 * Project: loco.po conversion
 * Release: Working copy
 * Locale: tr-TR, Turkish
 * Exported by: Unregistered user
 * Exported at: Wed, 06 Jul 2016 12:21:13 +0100
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
    "Error": "Hata",
    "Warning": "Uyarı",
    "OK": "Tamam",
    "Permission denied": "İzin reddedildi",
    "Settings saved": "Ayarlar kaydedildi",
    "%s is not an official WordPress language": "%s resmi WordPress dillerinden biri değil",
    "New PO file": "Yeni PO Dosyası",
    "PO file used as template. This will be renamed to %s on first save": "PO dosyası şablon olarak kullanıldı. İlk kaydetmenizde %s olarak isimlendirilecek.",
    "You must specify a valid locale for a new PO file": "Yeni PO dosyası için geçerli bir yerel değer belirtmek zorundasınız",
    "No translatable strings found": "Çevrilebilecek satır bulunamadı",
    "Cannot create a PO file.": "Bir PO dosyası oluşturulamaz.",
    "PO file already exists with locale %s": "PO dosyası %s yerel değeri ile zaten var",
    "File cannot be created automatically. Fix the file permissions or use Download instead of Save": "Dosya otomatik olarak oluşturulamıyor. Dosya izinlerini düzenleyin ya da İndirilenler dizinine kaydedin.",
    "%s file is empty": "%s dosyası boş",
    "Run Sync to update from source code": "Kaynak kodundan güncelleştirmek için eşleştirme yapın",
    "No strings could be extracted from source code": "Kaynak kodundan herhangi satır çıkarılamadı",
    "Run Sync to update from %s": "%s kaynağından güncelleştirme için eşleştirme yapın",
    "Source code has been modified, run Sync to update POT": "Kaynak dosyası değiştirilmiş, POT güncellemesi için eşleştirme yapın",
    "POT has been modified since PO file was saved, run Sync to update": "PO dosyası en son kaydedildiğinden beri POT değişikliğe uğramış, güncelleme için eşleştirme yapın",
    "Bad file path": "Kötü dosya yolu",
    "Empty or invalid %s file": "%s dosyası boş veya geçersiz",
    "%s file has no header": "%s dosyasının başlığı yok",
    "New template": "Yeni Şablon",
    "New language": "Yeni Dil",
    "%s%% translated": "%s%% çevrildi",
    "1 string": {
        "one": "1 satır",
        "other": "%s cümle"
    },
    "%s fuzzy": "%s belirsiz",
    "%s untranslated": "%s çevrilmemiş",
    "Failed to compile MO file with built-in compiler": "Dahili derleyici ile MO dosyası derleme işlemi başarısız oldu",
    "Loco, Translation Management": "Loco, Çeviri Yönetimi",
    "Manage translations": "Çevirileri Yönet",
    "Translation options": "Çeviri Seçenekleri",
    "Loco Translate": "Loco Çeviri",
    "Settings": "Ayarlar",
    "File download failed": "Dosya indirme işlemi başarısız oldu",
    "WPLANG is deprecated and should be removed from wp-config.php": "WPLANG artık kullanılmıyor, bu nedenle wp-config.php dosyasından kaldırılması gerekmektedir",
    "Unknown language": "Bilinmeyen dil",
    "Some files not writable": "Bazı dosyalar yazılabilir değil",
    "Some files missing": "Bazı dosyalar yok",
    "\"%s\" folder not writable": "\"%s\" dizini yazılabilir değil",
    "POT file not writable": "POT dosyası yazılabilir değil",
    "PO file not writable": "PO dosyası yazılabilir değil",
    "MO file not writable": "MO dosyası yazılabilir değil",
    "MO file not found": "MO dosyası bulunamadı",
    "Folder not writable": "Dizin yazılabilir değil",
    "Folder not found": "Dizin bulunmadı",
    "%s does not declare a \"Text Domain\"": "%s bir \"Metin Etki Alanı\" beyan etmiyor",
    "Loco has guessed \"%s\"": "Loco tahmini: \"%s\"",
    "%s does not declare a \"Domain Path\"": "%s bir \"Etki Alanı Yolu\" beyan etmiyor",
    "%s has no POT file. Create one at \"%s/%s.pot\" if you need one.": "%s POT dosyası içermiyor. Eğer ihtiyacınız varsa \"%s/%s.pot\" yolunda bir tane oluşturabilirsiniz.",
    "%s has a strange POT file name (%s). A better name would be \"%s.pot\"": "%s alışılmadık bir POT dosya adına (%s) sahip. Daha iyi bir isim önerisi: \"%s.pot\"",
    "User does not have permission to manage translations": "Kullanıcı çevirileri yönetmek için gerekli izinlere sahip değil",
    "Invalid data posted to server": "Sunucuya gönderilen veri geçersiz",
    "Failed to compile MO file with %s, check your settings": "%s ile MO dosyası derleme işlemi başarısız oldu, ayarlarınızı tekrar kontrol edin",
    "Package not found called %s": "%s isimli paket bulunamadı",
    "Web server cannot create backups in \"%s\". Fix file permissions or disable backups in settings": "Web Sunucusu \"%s\" içinde yedek oluşturamıyor. Dosya izinlerini düzeltin veya ayarlarda bulunan yedekleme işlemini devre dışı bırakın.",
    "Web server cannot create \"%s\" directory in \"%s\". Fix file permissions or create it manually.": "Web sunucusu  \"%s\" dizinini \"%s\" içinde oluşturamıyor . Dosya izinlerini düzeltin veya elle oluşturun.",
    "Web server cannot create files in the \"%s\" directory. Fix file permissions or use the download function.": "Web sunucusu \"%s\" dizini içinde dosyaları oluşturamıyor. Dosya izinlerini düzeltin veya indirme fonksiyonunu kullanın.",
    "%s file is not writable by the web server. Fix file permissions or download and copy to \"%s/%s\".": "%s dosyası web sunucu tarafından yazılamaz durumda. Dosya izinlerini düzeltin veya dosyayı indirip \"%s/%s\" yoluna kopyalayın.",
    "Cannot create MO file": "MO dosyası oluşturulamıyor",
    "Cannot overwrite MO file": "MO dosyası üzerine yazılamıyor",
    "Failed to write MO file": "MO dosyasına yazma işlemi başarısız oldu",
    "Packages": "Paketler",
    "File check": "Dosya denetimi",
    "File system permissions for %s": "%s için dosya sistemi izinleri",
    "Other potential issues with %s": "%s ile\n \ndiğer\n \npotansiyel\n \nsorunlar",
    "Back": "Geri",
    "Get help": "Yardım",
    "Package details": "Paket Detayları",
    "Translations (PO)": "Çeviriler (PO)",
    "Template (POT)": "Şablon (POT)",
    "File permissions": "Dosya İzinleri",
    "Extends: %s": "Genişletmeler:  %s",
    "1 language": {
        "one": "1 Dil",
        "other": "%u Lisan"
    },
    "Updated": "Güncellendi",
    "Powered by": "Hazırlayan:",
    "Loco may not work as expected": "Loco beklendiği gibi çalışmayabilir",
    "Configure Loco Translate": "Loco Çeviri Yapılandırma",
    "Compiling MO files": "MO Dosyaları Derleme",
    "Use built-in MO compiler.": "Dahili MO derleyici kullan",
    "Use external command:": "Harici komut kullan:",
    "Enter path to msgfmt on server": "Sunucudaki msgfmt yolunu girin",
    "Generate hash tables": "Komut tabloları oluştur",
    "Include Fuzzy strings": "Belirsiz satırları dahil et",
    "Backing up PO files": "PO Dosyaları Yedekleme",
    "Number of backups to keep of each file:": "Her bir dosyanın saklanacak yedek sayısı:",
    "Experimental features": "Deneysel Özellikler",
    "Enable WordPress core translations": "WordPress çekirdek çevirilerini etkinleştir",
    "Save settings": "Ayarları Kaydet",
    "Template file": "Şablon dosyası",
    "Switch to...": "Geçiş Yap:",
    "never": "asla",
    "Save": "Kaydet",
    "Download": "İndir",
    "Sync": "Eşleştir",
    "Revert": "Geri Al",
    "Add": "Ekle",
    "Del": "Sil",
    "Fuzzy": "Belirsiz",
    "Filter translations": "Çevirileri filtrele",
    "Help": "Yardım",
    "Initialize new translations in %s": "%s için yeni çeviri başlat",
    "Select from common languages": "Yaygın diller arasından seçin",
    "or enter any language code": "veya herhangi bir dil kodu girin",
    "create in <code>%s</code>": "<code>%s</code> adresinde oluştur",
    "create in global languages directory": "Genel \"Language\" dizininde oluştur",
    "Start translating": "Çeviriye Başla",
    "New version available": "Yeni sürüm mevcut",
    "Upgrade to version %s of Loco Translate": "Loco Çeviri eklentisini %s sürümüne yükselt",
    "Select a plugin or theme to translate": "Çevirmek için bir eklenti veya tema seçin",
    "Themes": "Temalar",
    "Plugins": "Eklentiler",
    "Core": "Çekirdek",
    "PHP extension \"%s\" is not installed. If you experience problems you should install it": "\"%s\" PHP eklentisi yüklü değil. \nEğer\n \nsorun yaşarsanız\n \nbu eklentiyi\n \nyüklemeniz gerekir.",
    "Unknown error": "Bilinmeyen hata",
    "PO file saved": "PO dosyası kaydedildi",
    "and MO file compiled": "ve MO dosyası derlendi",
    "Merged from %s": "%s üzerinden birleştirildi",
    "Merged from source code": "Kaynak koddan birleştirildi",
    "Already up to date with %s": "%s zaten güncel",
    "Already up to date with source code": "Kaynak kod ile zaten güncel",
    "1 new string added": {
        "one": "1 yeni satır eklendi",
        "other": "%s yeni cümle eklendi"
    },
    "1 obsolete string removed": {
        "one": "1 adet kullanılmayan satır kaldırıldı",
        "other": "%s kullanımdışı cümle kaldırıldı"
    },
    "Your changes will be lost if you continue without saving": "Kaydetmeden devam ederseniz değişiklikleriniz kaybolacak",
    "Source text": "Kaynak Metin",
    "%s translation": "%s Çevirisi",
    "Comments": "Yorumlar",
    "Context": "Metin",
    "Translation": "Çeviri",
    "No source files in this package, nothing to sync": "Bu pakette eşleştirilecek kaynak dosyalar bulunmuyor",
    "No strings could be extracted from source files": "Kaynak dosyalardan herhangi satır çıkartılamadı",
    "Translate WordPress plugins and themes directly in your browser": "",
    "http://wordpress.org/extend/plugins/loco-translate": "http://wordpress.org/extend/plugins/loco-translate",
    "Tim Whitlock": "Tim Whitlock",
    "https://localise.biz/help/wordpress/translate-plugin": "https://localise.biz/help/wordpress/translate-plugin"
} 
);
