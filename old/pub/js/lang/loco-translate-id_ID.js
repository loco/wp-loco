/**
 * Loco js export: JavaScript function
 * Project: loco.po conversion
 * Release: Working copy
 * Locale: id-ID, Indonesian
 * Exported by: Unregistered user
 * Exported at: Wed, 06 Jul 2016 12:21:08 +0100
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
    "Error": "Kesalahan",
    "Warning": "Peringatan",
    "OK": "Oke",
    "Permission denied": "Akses ditolak",
    "Settings saved": "Setelan disimpan",
    "%s is not an official WordPress language": "",
    "New PO file": "Berkas PO baru",
    "PO file used as template. This will be renamed to %s on first save": "Berkas PO digunakan sebagai template. Berkas ini akan diubah namanya menjadi %s saat disimpan",
    "You must specify a valid locale for a new PO file": "Anda harus menentukan locale valid untuk berkas PO baru",
    "No translatable strings found": "Tidak ada string yang dapat diterjemahkan",
    "Cannot create a PO file.": "Berkas PO tidak dapat dibuat",
    "PO file already exists with locale %s": "Berkas PO untuk locale %s  sudah ada",
    "File cannot be created automatically. Fix the file permissions or use Download instead of Save": "Berkas tidak dapat dibuat otomatis. Perbaiki hak akses atau gunakan Unduh alih-alih Simpan",
    "%s file is empty": "Berkas %s kosong",
    "Run Sync to update from source code": "Jalankan Sinkronisasi untuk memperbarui dari kode program",
    "No strings could be extracted from source code": "Tidak ada string yang dapat diambil dari kode program",
    "Run Sync to update from %s": "Jalankan Sinkronisasi untuk mengambil dari %s",
    "Source code has been modified, run Sync to update POT": "Kode program telah diubah; jalankan Sinkronisasi untuk memperbarui POT",
    "POT has been modified since PO file was saved, run Sync to update": "POT telah diubah sejak berkas PO terakhir disimpan; jalankan Sinkronisasi untuk memperbarui POT",
    "Bad file path": "Folder berkas salah",
    "Empty or invalid %s file": "Berkas %s kosong atau tidak valid",
    "%s file has no header": "%s berkas tidak memiliki header",
    "New template": "Template baru",
    "New language": "Bahasa baru",
    "%s%% translated": "%s%% diterjemahkan",
    "1 string": "1 string",
    "%s fuzzy": "%s fuzzy",
    "%s untranslated": "%s%% belum diterjemahkan",
    "Failed to compile MO file with built-in compiler": "Gagal mengompilasi berkas MO dengan kompilator bawaan",
    "Loco, Translation Management": "Loco, Pengelola Terjemahan",
    "Manage translations": "Kelola terjemahan",
    "Translation options": "Opsi terjemahan",
    "Loco Translate": "Loco Terjemahan",
    "Settings": "Setelan",
    "File download failed": "Gagal mengunduh berkas",
    "WPLANG is deprecated and should be removed from wp-config.php": "",
    "Unknown language": "Bahasa tidak dikenal",
    "Some files not writable": "Beberapa berkas tidak dapat ditulis",
    "Some files missing": "Beberapa berkas hilang",
    "\"%s\" folder not writable": "Folder \"%s\" tidak dapat ditulisi",
    "POT file not writable": "Berkas POT tidak dapat ditulis",
    "PO file not writable": "Berkas PO tidak dapat ditulis",
    "MO file not writable": "Berkas MO tidak dapat ditulis",
    "MO file not found": "Berkas MO tidak ditemukan",
    "Folder not writable": "Folder tidak dapat ditulisi",
    "Folder not found": "Folder tidak ditemukan",
    "%s does not declare a \"Text Domain\"": "",
    "Loco has guessed \"%s\"": "",
    "%s does not declare a \"Domain Path\"": "",
    "%s has no POT file. Create one at \"%s/%s.pot\" if you need one.": "",
    "%s has a strange POT file name (%s). A better name would be \"%s.pot\"": "",
    "User does not have permission to manage translations": "Pengguna tidak memiliki hak akses untuk mengelola terjemahan",
    "Invalid data posted to server": "Data yang dikirim ke server tidak valid",
    "Failed to compile MO file with %s, check your settings": "Gagal mengompilasi berkas MO dengan %s; periksa setelan Anda",
    "Package not found called %s": "Paket %s tidak ditemukan",
    "Web server cannot create backups in \"%s\". Fix file permissions or disable backups in settings": "Tidak dapat membuat cadangan di \"%s\". Perbaiki hak akses atau matikan pencadangan di setelan.",
    "Web server cannot create \"%s\" directory in \"%s\". Fix file permissions or create it manually.": "Tidak dapat membuat direktori \"%s\" di \"%s\". Perbaiki hak akses atau buat secara manual.",
    "Web server cannot create files in the \"%s\" directory. Fix file permissions or use the download function.": "Tidak dapat membuat berkas di direktori \"%s\". Perbaiki hak akses atau gunakan fungsi unduh.",
    "%s file is not writable by the web server. Fix file permissions or download and copy to \"%s/%s\".": "Berkas %s tidak dapat ditulis. Perbaiki hak akses atau unduh dan salin ke \"%s/%s\".",
    "Cannot create MO file": "Berkas MO tidak dapat dibuat",
    "Cannot overwrite MO file": "Berkas MO tidak dapat ditimpa",
    "Failed to write MO file": "Gagal menulis berkas MO",
    "Packages": "Paket",
    "File check": "Pemeriksaan berkas",
    "File system permissions for %s": "Hak akses sistem berkas untuk %s",
    "Other potential issues with %s": "",
    "Back": "Kembali",
    "Get help": "Dapatkan bantuan",
    "Package details": "Detail paket",
    "Translations (PO)": "Terjemahan (PO)",
    "Template (POT)": "Template (POT)",
    "File permissions": "Hak akses",
    "Extends: %s": "",
    "1 language": "1 bahasa",
    "Updated": "Diperbarui",
    "Powered by": "Didukung oleh",
    "Loco may not work as expected": "Loco mungkin tidak bekerja sesuai harapan",
    "Configure Loco Translate": "Konfigurasikan Loco Translate",
    "Compiling MO files": "Kompilasi berkas MO",
    "Use built-in MO compiler.": "Gunakan kompiler bawaan",
    "Use external command:": "Gunakan perintah eksternal:",
    "Enter path to msgfmt on server": "Masukkan folder msgfmt pada server",
    "Generate hash tables": "Buat tabel hash",
    "Include Fuzzy strings": "",
    "Backing up PO files": "Pencadangan berkas PO",
    "Number of backups to keep of each file:": "Jumlah cadangan untuk tiap berkas:",
    "Experimental features": "Fitur eksperimen",
    "Enable WordPress core translations": "Aktifkan penerjemahan inti WordPress",
    "Save settings": "Simpan setelan",
    "Template file": "Berkas template",
    "Switch to...": "Beralih ke...",
    "never": "tidak pernah",
    "Save": "Simpan",
    "Download": "Unduh",
    "Sync": "Sinkronisasi",
    "Revert": "Kembalikan",
    "Add": "Tambah",
    "Del": "Hapus",
    "Fuzzy": "Fuzzy",
    "Filter translations": "Saring terjemahan",
    "Help": "Bantuan",
    "Initialize new translations in %s": "Buat terjemahan baru di %s",
    "Select from common languages": "Pilih dari bahasa yang umum",
    "or enter any language code": "atau masukkan suatu kode bahasa",
    "create in <code>%s</code>": "buat di <code>%s</code>",
    "create in global languages directory": "buat di direktori bahasa global",
    "Start translating": "Mulai penerjemahan",
    "New version available": "Ada versi baru",
    "Upgrade to version %s of Loco Translate": "Tingkatkan Loco Translate kepada versi %s",
    "Select a plugin or theme to translate": "Pilih plugin atau tema untuk diterjemahkan",
    "Themes": "Tema",
    "Plugins": "Plugin",
    "Core": "Inti",
    "PHP extension \"%s\" is not installed. If you experience problems you should install it": "",
    "Unknown error": "Kesalahan ",
    "PO file saved": "Berkas PO disimpan",
    "and MO file compiled": "dan berkas MO dikompilasi",
    "Merged from %s": "Digabungkan dari %s",
    "Merged from source code": "Digabungkan dari kode program",
    "Already up to date with %s": "Sudah selaras dengan %s",
    "Already up to date with source code": "Sudah selaras dengan kode program",
    "1 new string added": "1 string baru ditambahkan",
    "1 obsolete string removed": "1 string usang dihapus",
    "Your changes will be lost if you continue without saving": "Perubahan akan dibuang bila melanjutkan tanpa menyimpan",
    "Source text": "Teks sumber",
    "%s translation": "%s terjemahan",
    "Comments": "Komentar",
    "Context": "Konteks",
    "Translation": "Terjemahan",
    "No source files in this package, nothing to sync": "Berkas sumber paket ini tidak ditemukan; tidak ada yang dapat disinkronisasikan",
    "No strings could be extracted from source files": "Tidak ada string yang dapat diekstrak dari berkas sumber",
    "Translate WordPress plugins and themes directly in your browser": "",
    "http://wordpress.org/extend/plugins/loco-translate": "http://wordpress.org/extend/plugins/loco-translate",
    "Tim Whitlock": "Tim Whitlock",
    "https://localise.biz/help/wordpress/translate-plugin": "https://localise.biz/help/wordpress/translate-plugin"
} 
);
