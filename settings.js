require("./satanic")
const fs = require('fs')

global.owner = "6285196895485"
global.nobot = "6285196895485"
global.namaowner = "Satanic Haxor"
global.namaBot = "AQUA-MultiDevice"
global.title = "AQUA-MultiDevice"
global.wlcm = false
global.welcomeBg = 'https://i.ibb.co/4YBNyvP/mountain-sunset.jpg';
global.goodbyeBg = 'https://i.ibb.co/4YBNyvP/images-76.jpg';
global.domain = "https://free-restapi.biz.id/"
global.thumbnail = "https://c.termai.cc/i116/Km54h1.jpg" //// ganti thumbnail sesuaikan kalian
// Jangan Di ubah

global.welcomeImage = 'https://c.termai.cc/i191/zZjmX.png'
global.welcomeVideo = 'https://c.termai.cc/i191/zZjmX.png'
global.leftImage = 'https://c.termai.cc/i191/zZjmX.png'
global.leftVideo = 'https://c.termai.cc/i191/zZjmX.png'
global.thumbnailadzan = 'https://c.termai.cc/i108/XIc.png'

global.autogroup = global.autogroup || {};
global.lastAutoGroup = global.lastAutoGroup || {};
global.isExecuting = false;

global.creator = `${owner}@s.whatsapp.net` 
global.foother = `© ${namaBot}`
global.versi = "New"
global.pairing = "SATAGANZ" //PAIRING BISA DI UBAH////
//////NOTE TIDAK BERUBAH KODE PAIRING YANG ADA EROR///////////
global.idch = "120363422340494910@newsletter"
global.linkSaluran = "https://whatsapp.com/channel/0029VbBOXZ6AojZ23z5ieI3z"
global.onlygrup = false
global.autoshalat = false
global.onlygroup = false
global.onlypc = false
global.audio = "https://c.termai.cc/a177/h6b.opus"
global.sakey = "SK-5A6D0C0FB6D7B35A71B9A70F" //jika apikey habis silahkan register 
//// https://free-restapi.biz.id// ///
///ambil apikey di website itu//////
/////

///// BUAT NOTA STRUK CANVAS
global.namastore = 'SATANIC STORE'
global.sloganstore = 'Melayani Dengan Hati'
global.alamatstore = 'JL. RAYA JAKARTA NO. 123, JAKARTA'
global.nohpstore = '0812-3456-7890'
global.emailstore = 'cs@satanicstore.com'
global.npwpstore = '01.234.567.8-901.000'
global.websitestore = 'www.satanicstore.com'
global.footerstore = 'MELAYANI DENGAN HATI'


//// BUAT SURAT SAKIT CANVAS ///
global.namars = 'PUSKESMAS KECAMATAN MELATI'
global.alamatrs = 'Jl. Melati No. 100, Jakarta Timur'
global.telprs = '(021) 8765432'
global.emailrs = 'puskesmas.melati@jakarta.go.id'
global.websiters = 'www.puskesmasmelati.go.id'
global.npwprs = '01.234.567.8-901.000'
global.kotars = 'Jakarta'
global.provinsirs = 'DKI Jakarta'
global.kodeposrs = '13450'

global.namadokter = 'dr. Siti Rahayu, Sp.PD'
global.nipdokter = '19820315 201001 2 005'
global.sipdokter = 'SIP.446/5678/DU/2024'
global.spesialisdokter = 'Dokter Spesialis Penyakit Dalam'
global.ttddokter = 'https://example.com/ttd-dokter.png'


global.allowedGroupIds = global.allowedGroupIds || [""];

/* ========== GLOBAL PAYMENT (SEMUA PAKAI URL) ========== */

// IMAGE URL - E-WALLET
global.danaImage = 'https://c.termai.cc/i108/58xw.jpg';
global.gopayImage = 'https://c.termai.cc/i108/58xw.jpg';
global.shopeePayImage = 'https://c.termai.cc/i108/58xw.jpg';
global.qris = 'https://c.termai.cc/i108/58xw.jpg';
global.qrisImage = 'https://c.termai.cc/i102/M56AQ.jpg'

// IMAGE URL - BANK
global.bcaImage = 'https://c.termai.cc/i108/58xw.jpg';
global.briImage = 'https://c.termai.cc/i108/58xw.jpg';
global.mandiriImage = 'https://c.termai.cc/i108/58xw.jpg';

// E-WALLET - DANA
global.nodana = "083168758640";
global.andana = "Muhammad R";

// E-WALLET - GOPAY
global.nogopay = "083168758640";
global.angopay = "Nama Pemilik GOPAY";

// E-WALLET - SHOPEEPAY
global.noshopeepay = "083168758640";
global.anshoppepay = "Muhammad R";

// BANK BCA
global.nobca = "020-2283614";
global.anbca = "Muhammad R";

// BANK BRI
global.nobri = "1234567891";
global.anbri = "Nama Pemilik BRI";

// BANK MANDIRI
global.nomandiri = "1234567892";
global.anmandiri = "Nama Pemilik Mandiri";


/* ========== END GLOBAL PAYMENT ========== */

global.domainpanel = "https://panel.zacxstore.my.id" // Domain panel (tanpa slash di akhir)
global.apikey = 'ptla_' // API Key Application (harus Read & Write)
global.capikey = 'ptlc_' // Client API Key
global.nests = '5'
global.eggsnya = '15'
global.nodes = '1'
global.location3 = '1'
global.memory = '7050' // Memory 7GB
global.disk = '7050' // Disk 7GB
global.cpu = '210' // CPU 210%


global.banned = []
global.nama = namaBot 
global.namach = nama 
global.namafile = foother 
global.author = namaowner
global.welcome = false
global.leave = false
global.antitags = false
global.welcomeMsg = "awkawkwwk"
global.leaveMsg = "awkww yatim oit"
global.autoreadsw = false
global.autoreactsw = false
global.autoreactemoji = 'ðŸ˜‚'
global.tekspushkon = ""
global.tekspushkonv2 = ""
global.tekspushkonv3 = ""
global.tekspushkonv4 = ""

module.exports = {
  nobot: global.nobot,
  owner: global.owner,
  botName: global.botName
}


// Settings reply ~~~~~~~~~//
global.mess = {
    wait: "wait be processed",
    owner: "Khusus Owner",
    prem: "Khusus Premium",
    group: "Khusus di Group Chat",
    admin: "Khusus Admin",
    botadmin: "Bot Harus Jadi Admin",
    private: "Khusus di Private Chat",
    done: "Sukses"
}

global.packname = nama
global.author = namaBot

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})