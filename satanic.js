require('./settings');
const { 
    makeWASocket, 
    makeCacheableSignalKeyStore, 
    downloadContentFromMessage, 
    generateWAMessageContent,
    generateWAMessageFromContent, 
    generateWAMessage,
    generateForwardMessageContent,
    prepareWAMessageMedia, 
    useSingleFileAuthState, 
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    MessageType,
    proto,
    Browsers,
    getContentType,
    DisconnectReason,
    handleInteractive,
    areJidsSameUser,
	InteractiveMessage,
	sendTable,
    WA_DEFAULT_EPHEMERAL    
} = require('@whiskeysockets/baileys')

const fs = require('fs');
const axios = require('axios');
const chalk = require("chalk");
const jimp = require("jimp")
const util = require("util");
const moment = require("moment-timezone");
const path = require("path")
const cron = require('node-cron')
const fileType = require('file-type')
const request = require('request');
const ffmpeg = require('fluent-ffmpeg');
const PhoneNumber = require('awesome-phonenumber')
const fetch = require('node-fetch')
const FormData = require('form-data')
const cheerio = require('cheerio');
const { Primbon } = require('scrape-primbon')
const primbon = new Primbon()
const { exec, execSync, spawn } = require("child_process");
const sharp = require('sharp');
const crypto = require('crypto');
const { randomBytes, randomUUID } = crypto;
const similarity = require('similarity')
const { Canvas, loadImage, Image } = require('skia-canvas');
const didyoumean = require('didyoumean');

const { smsg, await, clockStrings, delay, enumGetKey, fetchBuffer, fetchJson, libformat, formatDate, formatp, tanggal, generateProfilePicture, getBuffer, getGroupAdmins, getRandom, isUrl, json, logic, parseMention, sizeLimit, runtime, sleep, sort, toNumber, getTime } = require('./lib/myfunction');
const { CatBox, TelegraPh, floNime, UploadFileUgu, uptotelegra } = require('./lib/uploader');

const { addSewaGroup, checkSewaGroup, getSewaPosition, toMs, msToDate, getGcName, expiredCheck, remindSewa } = require('./lib/sewa');

function loadDB() {
  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE);
      return JSON.parse(raw);
    } catch (err) {
      console.error('Error reading DB file:', err);
      return { chats: {} };
    }
  } else {
    return { chats: {} };
  }
}
function saveDB(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

const loadJSON = (path) => {
  try {
    return JSON.parse(fs.readFileSync(path))
  } catch {
    return {}
  }
}
const scheduleGc = JSON.parse(fs.readFileSync('./database/schedule.json'));
const DB_NILAI = './database/nilai.json'
const bannedList = JSON.parse(fs.readFileSync("./database/banuser.json")) 
const onlyadmin = JSON.parse(fs.readFileSync('./database/onlyadmin.json'));
const antiswgc = JSON.parse(fs.readFileSync('./database/antiswgc.json'));
const mutegrup = JSON.parse(fs.readFileSync('./database/mutegc.json'));
const banchat = JSON.parse(fs.readFileSync('./database/banchat.json'));
const nttagsw = JSON.parse(fs.readFileSync('./database/antitagsw.json'));
const joingc = JSON.parse(fs.readFileSync('./database/autojoingc.json'));
const owner = JSON.parse(fs.readFileSync('./database/owner.json'));
const premium = JSON.parse(fs.readFileSync('./database/premium.json'));
const antilinkKick = JSON.parse(fs.readFileSync('./database/antilinkkick.json'));
let set_welcome_db = JSON.parse(fs.readFileSync('./database/set_welcome.json'));
let set_left_db = JSON.parse(fs.readFileSync('./database/set_left.json'));
// LOAD DATABASE (GANTI JADI OBJECT)
const dbSpamGroups = './database/antispam-groups.json'
const dbSpamWarn = './database/antispam-warn.json'
let antiSpamGroups = fs.existsSync(dbSpamGroups)
    ? JSON.parse(fs.readFileSync(dbSpamGroups))
    : (fs.writeFileSync(dbSpamGroups, JSON.stringify([])), [])

let spamWarnings = fs.existsSync(dbSpamWarn)
    ? JSON.parse(fs.readFileSync(dbSpamWarn))
    : (fs.writeFileSync(dbSpamWarn, JSON.stringify({})), {})
const dbSpamCounter = './database/antispam-counter.json'

let spamData = fs.existsSync(dbSpamCounter)
    ? JSON.parse(fs.readFileSync(dbSpamCounter))
    : (fs.writeFileSync(dbSpamCounter, JSON.stringify({})), {})
let openaigc = JSON.parse(fs.readFileSync('./database/openaigc.json'))    
const antibotPath = './database/antibot.json'
const antibotSettingsPath = './database/antibot-settings.json'
let antibot = loadJSON(antibotPath)
let antibotSettings = loadJSON(antibotSettingsPath)
const saveAntibot = () =>
  fs.writeFileSync(antibotPath, JSON.stringify(antibot, null, 2))
const saveAntibotSettings = () =>
  fs.writeFileSync(antibotSettingsPath, JSON.stringify(antibotSettings, null, 2))
let _welcome = JSON.parse(fs.readFileSync('./database/welcome.json'))
let _left = JSON.parse(fs.readFileSync('./database/left.json'))
const dbPath = (name) => `./database/${name}`
const DB_FILE = './database/database.json';
const pgroup = JSON.parse(fs.readFileSync('./database/groupadd.json'));


let tebaklagu = []
let family100 = []
let kuismath = []
let tebakgambar = []
let tebakkata = []
let maths = []
let transactionDetails = {};
let caklontong = []
let caklontong_desk = []
let tebakkalimat = []
let tebaklirik = []
let tebakkartun = []
let tebakpemainbola = []
let cerdascermat = []
let tebakff = []
let tebakhewan = []
let tebakjkt48 = []
let tebakanime = []
let tebakwarna = []
let susunkata = []
let tebakheroml = []
let tebaktebakan = []
let tebakbendera = []
let tebakbendera2 = []
let tebakkabupaten = []
let tebakkimia = []
let tebakasahotak = []
let siapaaku = []
let tebaksusunkata = []
let tekateki = []
global.plugins = new Map();
global.jadibotSessions = {};
global.db = loadDB();
if (global.db) global.db = {
sticker: {},
database: {}, 
game: {},
others: {},
users: {},
chats: {},
settings: {},
...(global.db || {})
}
module.exports = satanic = async (satanic, m, chatUpdate, store) => {
try {
const { type, quotedMsg, mentioned, now, fromMe } = m
const body = (m.mtype === 'conversation') ? m.message.conversation :
(m.mtype === 'imageMessage') ? m.message.imageMessage?.caption :
(m.mtype === 'videoMessage') ? m.message.videoMessage?.caption :
(m.mtype === 'extendedTextMessage') ? m.message.extendedTextMessage?.text :
(m.mtype === 'buttonsResponseMessage') ? m.message.buttonsResponseMessage?.selectedButtonId :
(m.mtype === 'listResponseMessage') ? m.message.listResponseMessage?.singleSelectReply?.selectedRowId :
(m.mtype === 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage?.selectedId :
(m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply?.selectedRowId || m.text) :
m.text || '';
const bady = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'interactiveResponseMessage') ? appenTextMessage(JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id, chatUpdate) : (m.mtype == 'templateButtonReplyMessage') ? appenTextMessage(m.msg.selectedId, chatUpdate) : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ' '
let budy = m.message.conversation || (m.message.extendedTextMessage && m.message.extendedTextMessage.text) || ``
const CMD = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') && m.message.buttonsResponseMessage.selectedButtonId ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') && m.message.listResponseMessage.singleSelectReply.selectedRowId? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'interactiveResponseMessage') ? (JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id) : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
let pfxConf = JSON.parse(fs.readFileSync(dbPath('prefix.json')));
let prefix;
if (pfxConf.mode === 'noprefix') {
prefix = '';
} else if (pfxConf.mode === 'multi') {
prefix = /^[#!.,®©¥€¢£/\∆✓]/.test(CMD) ? CMD.match(/^[#!.,®©¥€¢£/\∆✓]/gi) : '#';
} else {
prefix = pfxConf.symbol;
}
global.prefix = prefix;
async function appenTextMessage(text, chatUpdate) {
let messages = await generateWAMessage(m.chat, { text: text, mentions: m.mentionedJid }, {
userJid: satanic.user.id,
quoted: m.quoted && m.quoted.fakeObj
})
messages.key.fromMe = areJidsSameUser(m.sender, satanic.user.id)
messages.key.id = m.key.id
messages.pushName = pushname
if (m.isGroup) messages.participant = m.sender
let msg = {
...chatUpdate,
messages: [proto.WebMessageInfo.fromObject(messages)],
type: 'append'
}
satanic.ev.emit('messages.upsert', msg)
}
const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
const pes = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text: ' '
const messagesC = pes.slice(0).trim()
const content = JSON.stringify(m.message)
const isCmd = body && typeof body === 'string' && body.startsWith(prefix)
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const from = m.key.remoteJid
const messagesD = body ? body.slice(0).trim().split(/ +/).shift().toLowerCase() : ''
const command = isCmd ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase() : ""
const args = body ? body.trim().split(/ +/).slice(1) : []
const userDb = global?.db?.users?.[m.sender]
const pushname =
(userDb?.registered && userDb?.name)
? userDb.name
: (m.pushName || "Misterius")
const botNumber = await satanic.decodeJid(satanic.user.id);
const isCreator = owner.includes(m.sender) || m.sender === botNumber;
const text = args.join(" ")
const q = text
const cekpesan = true
const isMedia = /image|video|sticker|audio/.test(mime)
const isImage = (type == 'imageMessage')
const isVideo = (type == 'videoMessage')
const isAudio = (type == 'audioMessage')
const isSticker = (type == 'stickerMessage')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedViewOnce = type === 'extendedTextMessage' && content.includes('viewOnceMessageV2')
const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
store.groupMetadata = store.groupMetadata || {};
const invalidMembers = [];
if (m.isGroup) {
for (const [gid, meta] of Object.entries(store.groupMetadata || {})) {
if (!meta.participants) continue;
const missing = meta.participants.filter(p => !p.jid && !p.lid && p.id);
if (missing.length) {
invalidMembers.push({
groupId: gid,
groupName: meta.subject || "(No Subject)",
members: missing
});
}
}
if (Object.keys(store.groupMetadata).length === 0 || invalidMembers.length >= 1) {
store.groupMetadata = await satanic.groupFetchAllParticipating();
}
}
const groupMetadata = m.isGroup ? await satanic.groupMetadata(m.chat).catch(e => null) : null;
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
if (m.isGroup && m.sender.endsWith("@lid")) {
m.sender = participants.find(p => p.lid === m.sender)?.jid || m.sender;
}
const groupAdmins = m.isGroup ? participants.filter((v) => v.admin !== null && v.jid).map((i) => i.jid) : [];
const groupOwner = m.isGroup ? groupMetadata.owner : ''
const groupMembers = m.isGroup ? groupMetadata.participants : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const groupId = m.isGroup ? m.chat : null;
const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const Autojoingc = m.isGroup ? joingc.includes(m.chat) : false
const Antitagsw = m.isGroup ? nttagsw.includes(m.chat) : false
const Antiswgc = m.isGroup ? antiswgc.includes(m.chat) : false
const sender = m.key.fromMe ? satanic.user.id.split(":")[0] + "@s.whatsapp.net" || satanic.user.id
: m.key.participant || m.key.remoteJid;
const id = m.chat
const isWelcome = _welcome.includes(m.chat) ? true : false
const isPrivateChat = from.endsWith('@s.whatsapp.net');
const isAutoAiGc = m.isGroup ? openaigc.includes(m.chat) : true
const isLeft = _left.includes(m.chat) ? true : false
const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
const isGroupss = pgroup.includes(m.chat);
const isGroups = m.isGroup ? true : false;
const isMute = mutegrup.includes(m.chat);
const isBanchat = banchat.includes(m.chat);

const isOnlyAdmin = onlyadmin.includes(m.chat);
const isPrem = premium.includes(m.sender)
const satanFitur = () =>{
var mytext = fs.readFileSync("./satanic.js").toString()
var numUpper = (mytext.match(/case '/g) || []).length
return numUpper
}
    	    	
if (isCmd && m.message && m.isGroup) {
    console.log(`
┌────────── [ GROUP CHAT LOG ] ──────────┐
│ 🕒 Time      : ${chalk.green(new Date().toISOString().slice(0, 19).replace('T', ' '))}
│ 📝 Message   : ${chalk.blue(budy || m.mtype)}
│ 👤 Sender    : ${chalk.magenta(pushname)} (${chalk.cyan(m.sender)})
│ 🏠 Group     : ${chalk.yellow(groupName)} (${chalk.cyan(m.chat)})
└────────────────────────────────────────┘
    `);
} else {
    console.log(`
┌───────── [ PRIVATE CHAT LOG ] ─────────┐
│ 🕒 Time      : ${chalk.green(new Date().toISOString().slice(0, 19).replace('T', ' '))}
│ 📝 Message   : ${chalk.blue(budy || m.mtype)}
│ 👤 Sender    : ${chalk.magenta(pushname)} (${chalk.cyan(m.sender)})
└────────────────────────────────────────┘
    `);
}

if (budy.trim().toLowerCase() === "bot") {
const replies = [
"Ya? Ada yang bisa saya bantu?",
"Y? Silahkan!",
"Halo! Ada yang perlu?",
"Ya, saya di sini!",
"Ada apa?"
];
const reply = replies[Math.floor(Math.random() * replies.length)];
await satanic.sendMessage(from, { text: reply }, { quoted: fkontak });
}
if (budy.trim().toLowerCase() === "y") {
const replies = [
"najis sok cuek lohh",
"sok cuek lu cihhh"
];
const reply = replies[Math.floor(Math.random() * replies.length)];
await satanic.sendMessage(from, { text: reply }, { quoted: fkontak });
}



if (budy.trim().toLowerCase() === "satan") {
const replies = [
"ada apa manggil satan",
"satan lagi sibuk tunggu ya"
];
const reply = replies[Math.floor(Math.random() * replies.length)];
await satanic.sendMessage(from, { text: reply }, { quoted: fkontak });
}
if (budy.trim().toLowerCase() === "assalamualaikum") {
const replies = [
"walaikumsalam kak",
"walaikumsalam wr wb"
];
const reply = replies[Math.floor(Math.random() * replies.length)];
await satanic.sendMessage(from, { text: reply }, { quoted: fkontak });
}



const isNumber = x => typeof x === 'number' && !isNaN(x)
const user = global.db.users[m.sender]
if (typeof user !== 'object') global.db.users[m.sender] = {}
if (user) {
if (!('afkReason' in user)) user.afkReason = ''
} else global.db.users[m.sender] = {
afkTime: -1,
afkReason: '',
afk: -1
}
const chats = global.db.chats[m.chat]
if (typeof chats !== 'object') global.db.chats[m.chat] = {}
if (chats) {
if (!('mute' in chats)) chats.mute = false
if (!('antionce' in chats)) chats.antionce = true
if (!('antispam' in chats)) chats.antispam = true
if (!('antidelete' in chats)) chats.antidelete = true
if (!('simih' in chats)) chats.simih = true
if (!('antilink' in chats)) chats.antilink = false
} else global.db.chats[m.chat] = {
mute: false,
antilink: false,
antidelete: true,
simih: true,
antionce: false,
welcome: false,
left: false,
setWelcome: '',
setLeft: '',
}
const setting = db.settings[botNumber]
if (typeof setting !== 'object') db.settings[botNumber] = {}
if (db.settings[botNumber]) {
if (!('anticall' in db.settings[botNumber])) db.settings[botNumber].anticall = false
if (!('status' in db.settings[botNumber])) db.settings[botNumber].status = 0
if (!('stock' in db.settings[botNumber])) db.settings[botNumber].stock = 10
if (!('autobio' in db.settings[botNumber])) db.settings[botNumber].autobio = false
if (!('autoread' in db.settings[botNumber])) db.settings[botNumber].autoread = false
if (!('auto_ai_grup' in db.settings[botNumber])) db.settings[botNumber].auto_ai_grup = true
if (!('whitelistMode' in db.settings[botNumber])) db.settings[botNumber].whitelistMode = false
} else {
db.settings[botNumber] = {
anticall: false,
status: 0,
stock: 10,
autobio: false,
autoread: false,
auto_ai_grup: true
}
}

async function loadPlugins() {
if (!fs.existsSync('./plugins')) fs.mkdirSync('./plugins');
const files = fs.readdirSync('./plugins').filter(f => f.endsWith('.js'));
for (const file of files) {
try {
delete require.cache[require.resolve(`./plugins/${file}`)];
const plugin = require(`./plugins/${file}`);
global.plugins.set(file.replace('.js', ''), plugin);
} catch (e) {}
}
}
async function autoReload() {
await loadPlugins();
}
async function cekPlugin(m, command, args, prefix) {
await autoReload();
for (let [name, plugin] of global.plugins) {
let match = false;
if (plugin.command) {
if (typeof plugin.command === 'string') {
match = plugin.command.toLowerCase() === command.toLowerCase();
} else if (plugin.command instanceof RegExp) {
match = plugin.command.test(command);
} else if (Array.isArray(plugin.command)) {
match = plugin.command.some(c => {
if (c instanceof RegExp) return c.test(command);
return c.toLowerCase() === command.toLowerCase();
});
}
}
if (match) {
if (plugin.owner && !isCreator) {
await m.reply('Khusus owner!');
return true;
}
if (plugin.premium && !isPrem) {
await m.reply('Khusus premium!');
return true;
}

if (plugin.limit && global.db?.users?.[m.sender]) {
const user = global.db.users[m.sender];
if (user.limit < 1) {
await m.reply('Limit habis!');
return true;
}
user.limit -= 1;
}
if (typeof plugin === 'function') {
await plugin(m, { satanic, text: args.join(' '), prefix, command, isCreator, isPrem });
} else if (typeof plugin.handler === 'function') {
await plugin.handler(m, { satanic, text: args.join(' '), prefix, command, isCreator, isPrem });
}
return true;
}
}
return false;
}
async function addPlugin(m, text, command) {
    if (!isCreator) return m.reply('Khusus owner!');
    if (!text && !m.quoted) return m.reply(`Cara: ${prefix + command} nama.js\nReply kode plugin atau kirim file .js`);
    if (text && !text.endsWith('.js')) return m.reply('Harus .js');
    
    let filename = text;
    let code = '';
    
    if (m.quoted && m.quoted.mimetype) {
        const mime = m.quoted.mimetype;
        if (mime === 'application/javascript' || mime === 'text/javascript' || mime === 'application/octet-stream' || mime.includes('javascript')) {
            try {
                const buffer = await m.quoted.download();
                code = buffer.toString('utf-8');
                
                if (!filename) {
                    if (m.quoted.fileName && m.quoted.fileName.endsWith('.js')) {
                        filename = m.quoted.fileName;
                    } else {
                        return m.reply('Berikan nama file: .addplugin nama.js');
                    }
                }
            } catch (e) {
                return m.reply('Gagal membaca file: ' + e.message);
            }
        } else {
            return m.reply('File harus berformat .js (JavaScript)');
        }
    } else if (m.quoted && m.quoted.text) {
        code = m.quoted.text || '';
        if (!filename) return m.reply('Berikan nama file: .addplugin nama.js');
    } else {
        return m.reply(`Cara: ${prefix + command} nama.js\nReply kode plugin atau kirim file .js`);
    }
    
    if (!code) return m.reply('Tidak ada kode yang ditemukan');
    if (fs.existsSync(`./plugins/${filename}`)) return m.reply(`${filename} sudah ada`);
    
    code = code.replace(/^import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/gm, 'const $1 = require(\'$2\')');
    code = code.replace(/^import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]/gm, 'const {$1} = require(\'$2\')');
    code = code.replace(/^import\s+\*\s+as\s+(\w+)\s+from\s+['"]([^'"]+)['"]/gm, 'const $1 = require(\'$2\')');
    code = code.replace(/^export\s+default\s+handler;?\s*$/gm, 'module.exports = handler;');
    code = code.replace(/^export\s+default\s+(\w+);?\s*$/gm, 'module.exports = $1;');
    code = code.replace(/throw\s+new\s+Error\(([^)]*)\)/g, 'return m.reply($1)');
    code = code.replace(/throw\s+`([^`]*)`/g, 'return m.reply(`$1`)');
    code = code.replace(/throw\s+'([^']*)'/g, 'return m.reply(\'$1\')');
    code = code.replace(/throw\s+"([^"]*)"/g, 'return m.reply("$1")');
    
    ['conn', 'client', 'sock', 'bot', 'wa'].forEach(v => {
        code = code.replace(new RegExp(`\\b${v}\\b`, 'g'), 'satanic');
    });
    code = code.replace(/\busedPrefix\b/g, 'prefix');
    code = code.replace(/\bisAdmin\b/g, 'isCreator');
    code = code.replace(/\bisOwner\b/g, 'isCreator');
    code = code.replace(/global\.db\.data\.chats/g, 'global.db.chats');
    code = code.replace(/global\.db\.data\.users/g, 'global.db.users');
    code = code.replace(/global\.db\.data\.settings/g, 'global.db.settings');
    code = code.replace(/global\.db\.data\.groups/g, 'global.db.groups');
    code = code.replace(/global\.db\.data\.premium/g, 'global.db.premium');
    code = code.replace(/global\.db\.data\.vip/g, 'global.db.vip');
    code = code.replace(/global\.db\.data\.limit/g, 'global.db.limit');
    code = code.replace(/global\.db\.data\.exp/g, 'global.db.exp');
    code = code.replace(/global\.db\.data\.level/g, 'global.db.level');
    code = code.replace(/global\.db\.data\./g, 'global.db.');
    
    if (!code.includes('module.exports')) {
        if (code.includes('handler.help') && code.includes('handler.command')) {
            code += '\n\nmodule.exports = handler;';
        } else {
            const name = filename.replace('.js', '');
            let handlerCode = `let handler = async (m, { satanic, text, prefix, command, isCreator, isPrem }) => {\n`;
            handlerCode += `  try {\n    ${code.trim()}\n  } catch (e) {\n    m.reply('Error: ' + e.message);\n  }\n};\n\n`;
            handlerCode += `handler.help = ['${name}'];\n`;
            handlerCode += `handler.tags = ['custom'];\n`;
            handlerCode += `handler.command = /^${name}$/i;\n\n`;
            handlerCode += `module.exports = handler;`;
            code = handlerCode;
        }
    }
    
    if (!fs.existsSync('./plugins')) fs.mkdirSync('./plugins');
    fs.writeFileSync(`./plugins/${filename}`, code);
    await autoReload();
    m.reply(`${filename} ditambahkan!\nGunakan: ${prefix}${filename.replace('.js', '')} [args]`);
}

async function deletePlugin(m, args) {
    if (!isCreator) return m.reply('Khusus owner!');
    if (!args[0]) return m.reply(`Contoh: ${prefix}delplugin menu`);
    const name = args[0].replace('.js', '');
    if (!fs.existsSync(`./plugins/${name}.js`)) return m.reply(`${name}.js tidak ditemukan`);
    global.plugins.delete(name);
    fs.unlinkSync(`./plugins/${name}.js`);
    delete require.cache[require.resolve(`./plugins/${name}.js`)];
    await autoReload();
    m.reply(`${name}.js dihapus`);
}


async function listPlugins(m) {
await autoReload();
if (!global.plugins.size) return m.reply('Belum ada plugin');
let txt = 'PLUGIN LIST\n\n';
let i = 1;
for (let [name, plugin] of global.plugins) {
const help = plugin.help ? plugin.help.join(', ') : '-';
const tags = plugin.tags ? plugin.tags.join(', ') : '-';
const owner = plugin.owner ? '[OWNER]' : '';
const premium = plugin.premium ? '[PREMIUM]' : '';
const vip = plugin.vip ? '[VIP]' : '';
txt += `${i}. ${name} ${owner}${premium}${vip}\n`;
txt += `   Help: ${help}\n`;
txt += `   Tags: ${tags}\n\n`;
i++;
}
m.reply(txt + `Total: ${global.plugins.size}`);
}
async function reloadPlugins(m) {
if (!isCreator) return m.reply('Khusus owner!');
await m.reply('Reloading...');
await loadPlugins();
m.reply(`${global.plugins.size} plugins loaded`);
}
async function getPlugin(m, args) {
if (!isCreator) return m.reply('Khusus owner!');
if (!args[0]) return m.reply(`Contoh: ${prefix}getplugin menu`);
const name = args[0].replace('.js', '');
const path = `./plugins/${name}.js`;
if (!fs.existsSync(path)) return m.reply(`${name}.js tidak ditemukan`);
const code = fs.readFileSync(path, 'utf8');
const capped = code.length > 5000 ? code.slice(0, 5000) + '\n\n... (truncated)' : code;
await m.reply(`${name}.js\n\n\`\`\`javascript\n${capped}\n\`\`\``);
}
loadPlugins();
const isPlugin = await cekPlugin(m, command, args, prefix);
if (isPlugin) {
return;
}


const reply = (teks) => {
  satanic.sendMessage(m.chat,
    { 
      text: "```" + teks + "```",
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 99,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: global.idch,
          serverMessageId: Math.floor(Math.random() * 1000) + 1,
          newsletterName: global.namaowner,
        }
      }
    },
    { quoted: fkontak }
  )
}

const fkontak = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': global.ownername, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${global.ownername},;;;\nFN:${global.ownername}\nitem1.TEL;waid=${global.owner}:${global.owner}\nitem1.X-ABLabel:Mobile\nEND:VCARD`, 'jpegThumbnail': global.thumbnail, thumbnail: global.thumbnail,sendEphemeral: true}}}


// ========== TEBAK LAGU ==========
satanic.tebaklagu = satanic.tebaklagu ? satanic.tebaklagu : {}
if (satanic.tebaklagu.hasOwnProperty(m.chat) && !m.key.fromMe) {
let json = satanic.tebaklagu[m.chat][0]
let users = global.db.users[m.sender]
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText) && satanic.tebaklagu[m.chat][2] < 2) {
satanic.tebaklagu[m.chat][2] = satanic.tebaklagu[m.chat][2] ? satanic.tebaklagu[m.chat][2] + 1 : 1
let clue = json.judul.replace(/[AIUEO]/gi, '_')
return reply(`Hint ${satanic.tebaklagu[m.chat][2]}/2: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Judul: ${json.judul}\nArtis: ${json.artis}`)
clearTimeout(satanic.tebaklagu[m.chat][1])
delete satanic.tebaklagu[m.chat]
return
}
if (userText === json.judul.toLowerCase().trim()) {
reply(`Benar!\n+5000 XP`)
clearTimeout(satanic.tebaklagu[m.chat][1])
delete satanic.tebaklagu[m.chat]
return
}
}
// ========== TEBAK LOGO ==========
satanic.tebaklogo = satanic.tebaklogo ? satanic.tebaklogo : {}
if (satanic.tebaklogo.hasOwnProperty(m.chat) && !m.key.fromMe) {
let json = satanic.tebaklogo[m.chat][0]
let users = global.db.users[m.sender]
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText) && satanic.tebaklogo[m.chat][2] < 2) {
satanic.tebaklogo[m.chat][2] = satanic.tebaklogo[m.chat][2] ? satanic.tebaklogo[m.chat][2] + 1 : 1
let clue = json.jawaban.replace(/[AIUEO]/gi, '_')
return reply(`Hint ${satanic.tebaklogo[m.chat][2]}/2: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Jawabannya: ${json.jawaban}`)
clearTimeout(satanic.tebaklogo[m.chat][1])
delete satanic.tebaklogo[m.chat]
return
}
if (userText === json.jawaban.toLowerCase().trim()) {
reply(`Benar!\n+5000 XP`)
clearTimeout(satanic.tebaklogo[m.chat][1])
delete satanic.tebaklogo[m.chat]
return
}
}
// ========== TEBAK GAME ==========
satanic.tebakgame = satanic.tebakgame ? satanic.tebakgame : {}
if (satanic.tebakgame.hasOwnProperty(m.chat) && !m.key.fromMe) {
let json = satanic.tebakgame[m.chat][0]
let users = global.db.users[m.sender]
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText) && satanic.tebakgame[m.chat][2] < 2) {
satanic.tebakgame[m.chat][2] = satanic.tebakgame[m.chat][2] ? satanic.tebakgame[m.chat][2] + 1 : 1
let clue = json.jawaban.replace(/[AIUEO]/gi, '_')
return reply(`Hint ${satanic.tebakgame[m.chat][2]}/2: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Jawabannya: ${json.jawaban}`)
clearTimeout(satanic.tebakgame[m.chat][1])
delete satanic.tebakgame[m.chat]
return
}
if (userText === json.jawaban.toLowerCase().trim()) {
reply(`Benar!\n+5000 XP`)
clearTimeout(satanic.tebakgame[m.chat][1])
delete satanic.tebakgame[m.chat]
return
}
}
// ========== TEBAK SURAH ==========
satanic.tebaksurah = satanic.tebaksurah ? satanic.tebaksurah : {}
if (satanic.tebaksurah.hasOwnProperty(m.chat) && !m.key.fromMe) {
let users = global.db.users[m.sender]
let json = satanic.tebaksurah[m.chat][1]
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText) && satanic.tebaksurah[m.chat][3] < 2) {
satanic.tebaksurah[m.chat][3] = satanic.tebaksurah[m.chat][3] ? satanic.tebaksurah[m.chat][3] + 1 : 1
let clue = json.surah.englishName.replace(/[AIUEO]/gi, '_')
return reply(`Hint ${satanic.tebaksurah[m.chat][3]}/2: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah!\nSurah: ${json.surah.englishName}`)
clearTimeout(satanic.tebaksurah[m.chat][2])
delete satanic.tebaksurah[m.chat]
return
}
if (userText === json.surah.englishName.toLowerCase().trim()) {
users.exp += 4999
reply(`Benar!\n+4999 XP`)
clearTimeout(satanic.tebaksurah[m.chat][2])
delete satanic.tebaksurah[m.chat]
return
}
}
// ========== LENGKAPI KALIMAT ==========
satanic.lengkapikalimat = satanic.lengkapikalimat ? satanic.lengkapikalimat : {}
if (satanic.lengkapikalimat.hasOwnProperty(m.chat) && !m.key.fromMe) {
let users = global.db.users[m.sender]
let json = satanic.lengkapikalimat[m.chat][1]
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText) && satanic.lengkapikalimat[m.chat][3] < 2) {
satanic.lengkapikalimat[m.chat][3] = satanic.lengkapikalimat[m.chat][3] ? satanic.lengkapikalimat[m.chat][3] + 1 : 1
let clue = json.jawaban.replace(/[AIUEO]/gi, '_')
return reply(`Hint ${satanic.lengkapikalimat[m.chat][3]}/2: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Jawabannya: ${json.jawaban}`)
clearTimeout(satanic.lengkapikalimat[m.chat][2])
delete satanic.lengkapikalimat[m.chat]
return
}
if (userText === json.jawaban.toLowerCase().trim()) {
reply(`Benar!\n+5000 XP`)
clearTimeout(satanic.lengkapikalimat[m.chat][2])
delete satanic.lengkapikalimat[m.chat]
return
}
}

satanic.game = satanic.game ? satanic.game : {}
if (satanic.game.hasOwnProperty(m.chat)) {
let users = global.db.users[m.sender]
let json = satanic.game[m.chat][1]
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText) && satanic.game[m.chat][4] < 2) {
satanic.game[m.chat][4] = satanic.game[m.chat][4] ? satanic.game[m.chat][4] + 1 : 1
let clue = json.jawaban.replace(/[AIUEO]/gi, '_')
return reply(`Hint ${satanic.game[m.chat][4]}/2: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Jawabannya: ${json.jawaban}`)
clearTimeout(satanic.game[m.chat][3])
delete satanic.game[m.chat]
return
}
if (userText === json.jawaban.toLowerCase().trim()) {
reply(`Benar!\n+4999 XP`)
clearTimeout(satanic.game[m.chat][3])
delete satanic.game[m.chat]
return
}
}
satanic.tebakwarna = satanic.tebakwarna ? satanic.tebakwarna : {}
if (satanic.tebakwarna.hasOwnProperty(m.chat) && !m.key.fromMe) {
let json = satanic.tebakwarna[m.chat][0]
let users = global.db.users[m.sender]
let userText = m.text.trim()
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Jawabannya: ${json.correct}`)
clearTimeout(satanic.tebakwarna[m.chat][1])
delete satanic.tebakwarna[m.chat]
return
}
if (userText === json.correct) {
reply(`Benar!\n+5000 XP`)
clearTimeout(satanic.tebakwarna[m.chat][1])
delete satanic.tebakwarna[m.chat]
return
}
}
satanic.tebakpemainbola = satanic.tebakpemainbola ? satanic.tebakpemainbola : {}
if (satanic.tebakpemainbola.hasOwnProperty(m.chat) && !m.key.fromMe) {
let json = satanic.tebakpemainbola[m.chat][0]
let users = global.db.users[m.sender]
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText) && satanic.tebakpemainbola[m.chat][2] < 2) {
satanic.tebakpemainbola[m.chat][2] = satanic.tebakpemainbola[m.chat][2] ? satanic.tebakpemainbola[m.chat][2] + 1 : 1
let clue = json.jawaban.replace(/[AIUEO]/gi, '_')
return reply(`Hint ${satanic.tebakpemainbola[m.chat][2]}/2: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Jawabannya: ${json.jawaban}`)
clearTimeout(satanic.tebakpemainbola[m.chat][1])
delete satanic.tebakpemainbola[m.chat]
return
}
if (userText === json.jawaban.toLowerCase().trim()) {
reply(`Benar!\n+5000 XP`)
clearTimeout(satanic.tebakpemainbola[m.chat][1])
delete satanic.tebakpemainbola[m.chat]
return
}
}
satanic.tebakff = satanic.tebakff ? satanic.tebakff : {}
if (satanic.tebakff.hasOwnProperty(m.chat) && !m.key.fromMe) {
let json = satanic.tebakff[m.chat][0]
let users = global.db.users[m.sender]
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText) && satanic.tebakff[m.chat][2] < 2) {
satanic.tebakff[m.chat][2] = satanic.tebakff[m.chat][2] ? satanic.tebakff[m.chat][2] + 1 : 1
let clue = json.jawaban.replace(/[AIUEO]/gi, '_')
return reply(`Hint ${satanic.tebakff[m.chat][2]}/2: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Jawabannya: ${json.jawaban}`)
clearTimeout(satanic.tebakff[m.chat][1])
delete satanic.tebakff[m.chat]
return
}
if (userText === json.jawaban.toLowerCase().trim()) {
reply(`Benar!\n+5000 XP`)
clearTimeout(satanic.tebakff[m.chat][1])
delete satanic.tebakff[m.chat]
return
}
}
satanic.tebakasahotak = satanic.tebakasahotak ? satanic.tebakasahotak : {}
if (satanic.tebakasahotak.hasOwnProperty(m.sender.split('@')[0])) {
kuis = true
jawaban = satanic.tebakasahotak[m.sender.split('@')[0]]
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText)) {
let clue = jawaban.replace(/[AIUEO]/gi, '_')
return reply(`Hint: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Jawaban: ${jawaban}`)
delete satanic.tebakasahotak[m.sender.split('@')[0]]
return
}
if (userText == jawaban.toLowerCase()) {
reply(`Benar!\nSelamat!`)
delete satanic.tebakasahotak[m.sender.split('@')[0]]
}
}
satanic.siapaaku = satanic.siapaaku ? satanic.siapaaku : {}
if (satanic.siapaaku.hasOwnProperty(m.chat)) {
const similarity = require('similarity')
const threshold = 0.72
let users = global.db.users[m.sender]
let json = JSON.parse(JSON.stringify(satanic.siapaaku[m.chat][1]))
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText) && satanic.siapaaku[m.chat][4] < 2) {
satanic.siapaaku[m.chat][4] = satanic.siapaaku[m.chat][4] ? satanic.siapaaku[m.chat][4] + 1 : 1
let clue = json.jawaban.replace(/[aiueoAIUEO]/g, '_')
return reply(`Hint ${satanic.siapaaku[m.chat][4]}/2: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Jawabannya: ${json.jawaban}`)
clearTimeout(satanic.siapaaku[m.chat][3])
delete satanic.siapaaku[m.chat]
return
}
if (userText === json.jawaban.toLowerCase().trim()) {
users.money += satanic.siapaaku[m.chat][2]
reply(`SIAPAKAH AKU\n\nJawaban Benar!\nHadiah: +${satanic.siapaaku[m.chat][2]} Money`)
clearTimeout(satanic.siapaaku[m.chat][3])
delete satanic.siapaaku[m.chat]
} else if (similarity(userText, json.jawaban.toLowerCase().trim()) >= threshold) {
reply(`Dikit Lagi!`)
}
}
satanic.susunkata = satanic.susunkata ? satanic.susunkata : {}
if (satanic.susunkata.hasOwnProperty(m.chat)) {
const similarity = require('similarity')
const threshold = 0.72
let users = global.db.users[m.sender]
let json = JSON.parse(JSON.stringify(satanic.susunkata[m.chat][1]))
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText) && satanic.susunkata[m.chat][4] < 2) {
satanic.susunkata[m.chat][4] = satanic.susunkata[m.chat][4] ? satanic.susunkata[m.chat][4] + 1 : 1
let clue = json.jawaban.replace(/[aiueoAIUEO]/g, '_')
return reply(`Hint ${satanic.susunkata[m.chat][4]}/2: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Jawabannya: ${json.jawaban}`)
clearTimeout(satanic.susunkata[m.chat][3])
delete satanic.susunkata[m.chat]
return
}
if (userText === json.jawaban.toLowerCase().trim()) {
users.money += satanic.susunkata[m.chat][2]
reply(`SUSUN KATA\n\nJawaban Benar!\nHadiah: +${satanic.susunkata[m.chat][2]} Money`)
clearTimeout(satanic.susunkata[m.chat][3])
delete satanic.susunkata[m.chat]
} else if (similarity(userText, json.jawaban.toLowerCase().trim()) >= threshold) {
reply(`Dikit Lagi!`)
}
}
satanic.caklontong = satanic.caklontong ? satanic.caklontong : {}
if (satanic.caklontong.hasOwnProperty(m.sender.split('@')[0])) {
kuis = true
jawaban = satanic.caklontong[m.sender.split('@')[0]]
deskripsi = satanic.caklontong_desk[m.sender.split('@')[0]]
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText)) {
let clue = jawaban.replace(/[AIUEO]/gi, '_')
return reply(`Hint: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Jawabannya: ${jawaban}`)
delete satanic.caklontong[m.sender.split('@')[0]]
delete satanic.caklontong_desk[m.sender.split('@')[0]]
return
}
if (userText == jawaban.toLowerCase()) {
await satanic.sendMessage(m.chat, {
image: { url: 'https://telegra.ph/file/14744917bea0185b52fb1.jpg' },
caption: `Tebak Lontong\n\nJawaban Benar!\n\nKetik *tebaklontong* untuk bermain lagi.`
}, { quoted: m })
delete satanic.caklontong[m.sender.split('@')[0]]
delete satanic.caklontong_desk[m.sender.split('@')[0]]
}
}
satanic.tebakkalimat = satanic.tebakkalimat ? satanic.tebakkalimat : {}
if (satanic.tebakkalimat.hasOwnProperty(m.sender.split('@')[0])) {
kuis = true
jawaban = satanic.tebakkalimat[m.sender.split('@')[0]]
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText)) {
let clue = jawaban.replace(/[AIUEO]/gi, '_')
return reply(`Hint: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Jawabannya: ${jawaban}`)
delete satanic.tebakkalimat[m.sender.split('@')[0]]
return
}
if (userText == jawaban.toLowerCase()) {
await satanic.sendMessage(m.chat, {
image: { url: 'https://telegra.ph/file/14744917bea0185b52fb1.jpg' },
caption: `Tebak Kalimat\n\nJawaban Benar!\n\nKetik *tebakkalimat* untuk bermain lagi.`
}, { quoted: m })
delete satanic.tebakkalimat[m.sender.split('@')[0]]
}
}
satanic.tebaklirik = satanic.tebaklirik ? satanic.tebaklirik : {}
if (satanic.tebaklirik.hasOwnProperty(m.chat)) {
const similarity = require('similarity')
const threshold = 0.72
let users = global.db.users[m.sender]
let json = JSON.parse(JSON.stringify(satanic.tebaklirik[m.chat][1]))
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText) && satanic.tebaklirik[m.chat][4] < 2) {
satanic.tebaklirik[m.chat][4] = satanic.tebaklirik[m.chat][4] ? satanic.tebaklirik[m.chat][4] + 1 : 1
let clue = json.jawaban.replace(/[aiueoAIUEO]/g, '_')
return reply(`Hint ${satanic.tebaklirik[m.chat][4]}/2: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Jawabannya: ${json.jawaban}`)
clearTimeout(satanic.tebaklirik[m.chat][3])
delete satanic.tebaklirik[m.chat]
return
}
if (userText === json.jawaban.toLowerCase().trim()) {
users.money += satanic.tebaklirik[m.chat][2]
reply(`TEBAK LIRIK\n\nJawaban Benar!\nHadiah: +${satanic.tebaklirik[m.chat][2]} Money\nEXP: +10`)
clearTimeout(satanic.tebaklirik[m.chat][3])
delete satanic.tebaklirik[m.chat]
} else if (similarity(userText, json.jawaban.toLowerCase().trim()) >= threshold) {
reply(`Dikit Lagi!`)
} else {
reply(`Salah! Coba lagi. Ketik *hint* untuk bantuan.`)
}
}
satanic.tebaktebakan = satanic.tebaktebakan ? satanic.tebaktebakan : {}
if (satanic.tebaktebakan.hasOwnProperty(m.sender.split('@')[0])) {
kuis = true
jawaban = satanic.tebaktebakan[m.sender.split('@')[0]]
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText)) {
let clue = jawaban.replace(/[AIUEO]/gi, '_')
return reply(`Hint: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Jawabannya: ${jawaban}`)
delete satanic.tebaktebakan[m.sender.split('@')[0]]
return
}
if (userText == jawaban.toLowerCase()) {
await satanic.sendMessage(m.chat, {
image: { url: 'https://telegra.ph/file/14744917bea0185b52fb1.jpg' },
caption: `Tebak Tebakan\n\nJawaban Benar!\n\nKetik *tebaktebakan* untuk bermain lagi.`
}, { quoted: m })
delete satanic.tebaktebakan[m.sender.split('@')[0]]
}
}


function initDatabase() {
if (!fs.existsSync(DB_NILAI)) {
fs.writeFileSync(DB_NILAI, JSON.stringify({}, null, 2))
return {}
}
return JSON.parse(fs.readFileSync(DB_NILAI, 'utf8'))
}
function readNilaiDB() {
try {
initDatabase()
return JSON.parse(fs.readFileSync(DB_NILAI, 'utf8'))
} catch (e) {
return {}
}
}
function writeNilaiDB(data) {
fs.writeFileSync(DB_NILAI, JSON.stringify(data, null, 2))
}
function getWIBTime() {
return moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')
}
function getTodayDate() {
return moment().tz('Asia/Jakarta').format('YYYY-MM-DD')
}
function shuffleArray(array) {
for (let i = array.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]]
}
return array
}
function filterRiwayatByPeriod(riwayat, period) {
let now = moment().tz('Asia/Jakarta')
let filtered = []
for (let item of riwayat) {
let itemDate = moment(item.tanggal, 'YYYY-MM-DD HH:mm:ss').tz('Asia/Jakarta')
let diffDays = now.diff(itemDate, 'days')
switch(period) {
case 'today':
if (diffDays === 0) filtered.push(item)
break
case '2weeks':
if (diffDays <= 14) filtered.push(item)
break
case '1month':
if (diffDays <= 30) filtered.push(item)
break
case 'all':
filtered.push(item)
break
}
}
return filtered
}
function getAutoSendStatus() {
let db = readNilaiDB()
return db._autoSend || false
}
function setAutoSendStatus(status) {
let db = readNilaiDB()
db._autoSend = status
writeNilaiDB(db)
}
function getLastSendDate() {
let db = readNilaiDB()
return db._lastSendDate || null
}
function setLastSendDate(date) {
let db = readNilaiDB()
db._lastSendDate = date
writeNilaiDB(db)
}
async function fetchMapelSoal(mapel, jumlah) {
let url
switch(mapel) {
case 'akuntansi':
url = 'https://raw.githubusercontent.com/satanicid/akutansi/main/akutansi.json'
break
case 'listrik':
url = 'https://raw.githubusercontent.com/satanicid/akutansi/main/listrik.json'
break
case 'multimedia':
url = 'https://raw.githubusercontent.com/satanicid/akutansi/main/multimedia.json'
break
default:
return null
}
try {
let res = await fetch(url)
let result = await res.json()
if (result.status && result.soal) {
let shuffledSoal = shuffleArray([...result.soal])
let soal = shuffledSoal.slice(0, jumlah)
return {
matapelajaran: result.matapelajaran,
soal: soal
}
}
return null
} catch (e) {
return null
}
}
initDatabase()
setInterval(async () => {
let now = moment().tz('Asia/Jakarta')
let currentTime = now.format('HH:mm')
let today = now.format('YYYY-MM-DD')
let lastSend = getLastSendDate()
if (currentTime === '00:00' && lastSend !== today) {
let db = readNilaiDB()
let text = `LAPORAN NILAI HARIAN\nTanggal: ${today}\nWaktu: ${getWIBTime()}\n\n`
let totalUsers = 0
let totalGames = 0
let totalBenar = 0
let totalSoal = 0
for (let [chatId, chatData] of Object.entries(db)) {
if (chatId === '_autoSend' || chatId === '_lastSendDate') continue
text += `Group: ${chatData.nama_grup || chatId}\n`
let groupUsers = 0
let groupGames = 0
for (let [userId, userData] of Object.entries(chatData.users)) {
let todayRiwayat = filterRiwayatByPeriod(userData.riwayat, 'today')
if (todayRiwayat.length > 0) {
groupUsers++
groupGames += todayRiwayat.length
let userBenar = todayRiwayat.reduce((sum, item) => sum + item.benar, 0)
let userSoal = todayRiwayat.reduce((sum, item) => sum + item.total, 0)
let userPersen = Math.round((userBenar / userSoal) * 100)
text += `User: ${userData.nama}: ${userPersen}% (${userBenar}/${userSoal}) - ${todayRiwayat.length} game\n`
totalBenar += userBenar
totalSoal += userSoal
}
}
if (groupUsers > 0) {
text += `Total ${groupUsers} user aktif - ${groupGames} game\n\n`
totalUsers += groupUsers
totalGames += groupGames
}
}
if (totalUsers === 0) {
text += `Tidak ada aktivitas hari ini.`
} else {
let rataRata = Math.round((totalBenar / totalSoal) * 100)
text += `\nRINGKASAN TOTAL:\nTotal User Aktif: ${totalUsers}\nTotal Game: ${totalGames}\nRata-rata Nilai: ${rataRata}%\nTotal Benar: ${totalBenar}/${totalSoal}`
}
for (let [chatId, chatData] of Object.entries(db)) {
if (chatId === '_autoSend' || chatId === '_lastSendDate') continue
try {
await satanic.sendMessage(chatId, {
text: text,
contextInfo: {
mentionedJid: Object.keys(chatData.users || {})
}
})
} catch (e) {
console.log(`Gagal kirim ke ${chatId}:`, e.message)
}
}
let jsonBuffer = fs.readFileSync(DB_NILAI)
for (let [chatId, chatData] of Object.entries(db)) {
if (chatId === '_autoSend' || chatId === '_lastSendDate') continue
try {
await satanic.sendMessage(chatId, {
document: jsonBuffer,
mimetype: 'application/json',
fileName: `nilai_${today}.json`,
caption: `BACKUP DATABASE NILAI\nTanggal: ${today}\nWaktu: ${getWIBTime()}`
})
} catch (e) {
console.log(`Gagal kirim file ke ${chatId}:`, e.message)
}
}
setLastSendDate(today)
console.log(`Auto send completed for ${today}`)
}
}, 60000)
satanic.cerdascermat = satanic.cerdascermat ? satanic.cerdascermat : {}
if (satanic.cerdascermat[m.chat] && !m.key.fromMe) {
let sesi = satanic.cerdascermat[m.chat]
let soalSaatIni = sesi.soal[sesi.index]
let jawabanUser = m.text.toLowerCase().trim()
let jawabanBenar = soalSaatIni.jawaban_benar.toLowerCase().trim()
if (jawabanUser === jawabanBenar) {
sesi.skor += 10
sesi.benar = (sesi.benar || 0) + 1
sesi.index++
if (sesi.index < sesi.soal.length) {
let soalBaru = sesi.soal[sesi.index]
let pilihan = ''
for (let opt of soalBaru.semua_jawaban) {
let huruf = Object.keys(opt)[0]
let teks = opt[huruf]
pilihan += `${huruf.toUpperCase()}. ${teks}\n`
}
m.reply(`Benar! +10 Skor\nSkor: ${sesi.skor}\n\nSoal ${sesi.index+1}/${sesi.soal.length}\n${soalBaru.pertanyaan}\n\n${pilihan}`)
} else {
let totalSoal = sesi.soal.length
let benar = sesi.benar || 0
let persentase = Math.round((benar / totalSoal) * 100)
let hadiah = sesi.skor * 100
let db = readNilaiDB()
if (!db[m.chat]) {
db[m.chat] = {
nama_grup: m.pushName || 'Unknown Group',
id_grup: m.chat,
users: {}
}
}
if (!db[m.chat].users[m.sender]) {
db[m.chat].users[m.sender] = {
nama: m.pushName || 'Unknown User',
riwayat: []
}
}
db[m.chat].users[m.sender].riwayat.push({
mapel: sesi.mapel,
skor: sesi.skor,
benar: benar,
total: totalSoal,
persentase: persentase,
status: 'selesai',
tanggal: getWIBTime()
})
writeNilaiDB(db)
m.reply(`SELESAI!\n\nBenar: ${benar}/${totalSoal}\nNilai: ${persentase}%\nSkor: ${sesi.skor}\nHadiah: +${hadiah} XP\n\nNilai telah disimpan!`)
delete satanic.cerdascermat[m.chat]
}
}
else if (jawabanUser === 'nyerah') {
let totalSoal = sesi.soal.length
let benar = sesi.benar || 0
let persentase = Math.round((benar / totalSoal) * 100)
let db = readNilaiDB()
if (!db[m.chat]) {
db[m.chat] = {
nama_grup: m.pushName || 'Unknown Group',
id_grup: m.chat,
users: {}
}
}
if (!db[m.chat].users[m.sender]) {
db[m.chat].users[m.sender] = {
nama: m.pushName || 'Unknown User',
riwayat: []
}
}
db[m.chat].users[m.sender].riwayat.push({
mapel: sesi.mapel,
skor: sesi.skor,
benar: benar,
total: totalSoal,
persentase: persentase,
status: 'menyerah',
tanggal: getWIBTime()
})
writeNilaiDB(db)
m.reply(`Menyerah!\n\nJawaban: ${jawabanBenar.toUpperCase()}\nBenar: ${benar}/${totalSoal}\nNilai: ${persentase}%\nSkor: ${sesi.skor}\n\nNilai telah disimpan!`)
delete satanic.cerdascermat[m.chat]
}
else {
let totalSoal = sesi.soal.length
let benar = sesi.benar || 0
let persentase = Math.round((benar / totalSoal) * 100)
let db = readNilaiDB()
if (!db[m.chat]) {
db[m.chat] = {
nama_grup: m.pushName || 'Unknown Group',
id_grup: m.chat,
users: {}
}
}
if (!db[m.chat].users[m.sender]) {
db[m.chat].users[m.sender] = {
nama: m.pushName || 'Unknown User',
riwayat: []
}
}
db[m.chat].users[m.sender].riwayat.push({
mapel: sesi.mapel,
skor: sesi.skor,
benar: benar,
total: totalSoal,
persentase: persentase,
status: 'salah',
jawaban_benar: jawabanBenar,
tanggal: getWIBTime()
})
writeNilaiDB(db)
m.reply(`Salah!\n\nJawaban yang benar: ${jawabanBenar.toUpperCase()}\nBenar: ${benar}/${totalSoal}\nNilai: ${persentase}%\n\nGame berakhir! Nilai telah disimpan.`)
delete satanic.cerdascermat[m.chat]
}
return
}
satanic.maths = satanic.maths ? satanic.maths : {}
if (satanic.maths.hasOwnProperty(m.sender) && !m.key.fromMe) {
let jawaban = satanic.maths[m.sender]
let userText = m.text.trim()
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Jawabannya: ${jawaban}`)
delete satanic.maths[m.sender]
return
}
if (userText === jawaban.toString()) {
reply(`Benar!\n+5000 XP`)
delete satanic.maths[m.sender]
return
}
}
satanic.tebakanime = satanic.tebakanime ? satanic.tebakanime : {}
if (satanic.tebakanime.hasOwnProperty(m.chat) && !m.key.fromMe) {
let json = satanic.tebakanime[m.chat][0]
let users = global.db.users[m.sender]
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText) && satanic.tebakanime[m.chat][2] < 2) {
satanic.tebakanime[m.chat][2] = satanic.tebakanime[m.chat][2] ? satanic.tebakanime[m.chat][2] + 1 : 1
let clue = json.jawaban.replace(/[AIUEO]/gi, '_')
return reply(`Hint ${satanic.tebakanime[m.chat][2]}/2: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Jawabannya: ${json.jawaban}`)
clearTimeout(satanic.tebakanime[m.chat][1])
delete satanic.tebakanime[m.chat]
return
}
if (userText === json.jawaban.toLowerCase().trim()) {
reply(`Benar!\n+5000 XP`)
clearTimeout(satanic.tebakanime[m.chat][1])
delete satanic.tebakanime[m.chat]
return
}
}

satanic.tebakhewan = satanic.tebakhewan ? satanic.tebakhewan : {}
if (satanic.tebakhewan.hasOwnProperty(m.chat) && !m.key.fromMe) {
let json = satanic.tebakhewan[m.chat][0]
let users = global.db.users[m.sender]
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText) && satanic.tebakhewan[m.chat][2] < 2) {
satanic.tebakhewan[m.chat][2] = satanic.tebakhewan[m.chat][2] ? satanic.tebakhewan[m.chat][2] + 1 : 1
let clue = json.nama.replace(/[AIUEO]/gi, '_')
return reply(`Hint ${satanic.tebakhewan[m.chat][2]}/2: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Jawabannya: ${json.nama}`)
clearTimeout(satanic.tebakhewan[m.chat][1])
delete satanic.tebakhewan[m.chat]
return
}
if (userText === json.nama.toLowerCase().trim()) {
reply(`Benar!\n+5000 XP`)
clearTimeout(satanic.tebakhewan[m.chat][1])
delete satanic.tebakhewan[m.chat]
return
}
}
satanic.tebakjkt48 = satanic.tebakjkt48 ? satanic.tebakjkt48 : {}
if (satanic.tebakjkt48.hasOwnProperty(m.chat) && !m.key.fromMe) {
let json = satanic.tebakjkt48[m.chat][0]
let users = global.db.users[m.sender]
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText) && satanic.tebakjkt48[m.chat][2] < 2) {
satanic.tebakjkt48[m.chat][2] = satanic.tebakjkt48[m.chat][2] ? satanic.tebakjkt48[m.chat][2] + 1 : 1
let clue = json.name.replace(/[AIUEO]/gi, '_')
return reply(`Hint ${satanic.tebakjkt48[m.chat][2]}/2: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Jawabannya: ${json.name}`)
clearTimeout(satanic.tebakjkt48[m.chat][1])
delete satanic.tebakjkt48[m.chat]
return
}
if (userText === json.name.toLowerCase().trim()) {
reply(`Benar!\n+5000 XP`)
clearTimeout(satanic.tebakjkt48[m.chat][1])
delete satanic.tebakjkt48[m.chat]
return
}
}
satanic.tebakkartun = satanic.tebakkartun ? satanic.tebakkartun : {}
if (satanic.tebakkartun.hasOwnProperty(m.chat) && !m.key.fromMe) {
let json = satanic.tebakkartun[m.chat][0]
let users = global.db.users[m.sender]
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText) && satanic.tebakkartun[m.chat][2] < 2) {
satanic.tebakkartun[m.chat][2] = satanic.tebakkartun[m.chat][2] ? satanic.tebakkartun[m.chat][2] + 1 : 1
let clue = json.name.replace(/[AIUEO]/gi, '_')
return reply(`Hint ${satanic.tebakkartun[m.chat][2]}/2: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Jawabannya: ${json.name}`)
clearTimeout(satanic.tebakkartun[m.chat][1])
delete satanic.tebakkartun[m.chat]
return
}
if (userText === json.name.toLowerCase().trim()) {
reply(`Benar!\n+5000 XP`)
clearTimeout(satanic.tebakkartun[m.chat][1])
delete satanic.tebakkartun[m.chat]
return
}
}
satanic.tebakkata = satanic.tebakkata ? satanic.tebakkata : {}
if (satanic.tebakkata.hasOwnProperty(m.chat)) {
let users = global.db.users[m.sender]
let json = JSON.parse(JSON.stringify(satanic.tebakkata[m.chat][1]))
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText) && satanic.tebakkata[m.chat][3] < 2) {
satanic.tebakkata[m.chat][3] = satanic.tebakkata[m.chat][3] ? satanic.tebakkata[m.chat][3] + 1 : 1
let clue = json.jawaban.replace(/[aiueoAIUEO]/g, '_')
return reply(`Hint ${satanic.tebakkata[m.chat][3]}/2: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah!\nJawaban: ${json.jawaban}`)
clearTimeout(satanic.tebakkata[m.chat][2])
delete satanic.tebakkata[m.chat]
return
}
if (userText === json.jawaban.toLowerCase().trim()) {
users.money += 10000
reply(`Benar!\n+10.000 Money`)
clearTimeout(satanic.tebakkata[m.chat][2])
delete satanic.tebakkata[m.chat]
}
}
satanic.tebakbendera2 = satanic.tebakbendera2 ? satanic.tebakbendera2 : {}
if (satanic.tebakbendera2.hasOwnProperty(m.sender.split('@')[0])) {
kuis = true
jawaban = satanic.tebakbendera2[m.sender.split('@')[0]]
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText)) {
let clue = jawaban.replace(/[AIUEO]/gi, '_')
return reply(`Hint: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah!\nJawaban: ${jawaban}`)
delete satanic.tebakbendera2[m.sender.split('@')[0]]
return
}
if (userText == jawaban.toLowerCase()) {
reply(`Benar!\nSelamat!`)
delete satanic.tebakbendera2[m.sender.split('@')[0]]
}
}
satanic.family100 = satanic.family100 ? satanic.family100 : {}
if (m.chat in satanic.family100 && !m.key.fromMe) {
let similarity = require('similarity')
let threshold = 0.72
let users = global.db.users[m.sender]
let room = satanic.family100[m.chat]
let text = m.text.toLowerCase().replace(/[^\w\s\-]+/, '')
let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
if (!isSurrender) {
let index = room.jawaban.indexOf(text)
if (index < 0) {
if (Math.max(...room.jawaban.filter((_, index) => !room.terjawab[index]).map(jawaban => similarity(jawaban, text))) >= threshold) {
return reply('Dikit lagi!')
}
}
if (!m.key.fromMe && room.terjawab[index]) {
return
}
users.money += room.winScore
room.terjawab[index] = m.sender
}
let isWin = room.terjawab.length === room.terjawab.filter(v => v).length
let caption = `GAME FAMILY100\n\nSoal: ${room.soal}\n\nTerdapat ${room.jawaban.length} jawaban${room.jawaban.find(v => v.includes(' ')) ? `\n(beberapa jawaban terdapat spasi)` : ''}\n${isWin ? `SEMUA JAWABAN TERJAWAB` : isSurrender ? 'MENYERAH' : ''}\n${Array.from(room.jawaban, (jawaban, index) => {
return isSurrender || room.terjawab[index] ? `(${index + 1}) ${jawaban} ${room.terjawab[index] ? '✓ ' + room.terjawab[index].split('@')[0] : ''}`.trim() : false
}).filter(v => v).join('\n')}\n${isSurrender ? '' : `+${room.winScore} Money tiap jawaban benar`}`.trim()
await satanic.sendMessage(m.chat, { text: `${caption}`, mentions: [room.terjawab + '@s.whatsapp.net'] }, { quoted: m }).then(msg => {
satanic.family100[m.chat].msg = msg
}).catch(_ => _)
if (isWin || isSurrender) {
delete satanic.family100[m.chat]
}
}
satanic.tebakgambar = satanic.tebakgambar ? satanic.tebakgambar : {}
if (m.chat in satanic.tebakgambar) {
let users = global.db.users[m.sender]
let json = JSON.parse(JSON.stringify(satanic.tebakgambar[m.chat][1]))
let jawabanBenar = json.jawaban.toLowerCase().trim()
let jawabanUser = m.text.toLowerCase().trim()
if (jawabanUser === 'hint') {
let clue = json.jawaban.split('')
let hint = clue.map((huruf, i) => (i % 2 === 0 ? huruf : '_')).join(' ')
reply(`HINT: ${hint}\n\nKetik *suren* untuk menjawab dengan yakin.`)
return
}
if (jawabanUser === 'suren') {
satanic.tebakgambar[m.chat][4] = true
reply(`KONFIRMASI\nKetik jawabanmu sekarang. Jika salah, kamu akan kena penalti 5000 money!`)
return
}
let isSuren = satanic.tebakgambar[m.chat][4] === true
if (jawabanUser === jawabanBenar) {
let hadiah = 10000
if (isSuren) hadiah += 5000
users.money += hadiah
let teks = `Tebak Gambar\n\nJawaban Benar!\nHadiah : ${hadiah.toLocaleString()} money\n\nIngin bermain lagi? Ketik *TebakGambar*`
reply(teks)
clearTimeout(satanic.tebakgambar[m.chat][3])
delete satanic.tebakgambar[m.chat]
} else {
if (isSuren) {
users.money -= 5000
reply(`Jawaban Salah! (mode suren aktif)\nKamu kehilangan 5000 money.\n\nJawaban yang benar: ${json.jawaban}`)
clearTimeout(satanic.tebakgambar[m.chat][3])
delete satanic.tebakgambar[m.chat]
}
}
}
satanic.tebakbendera = satanic.tebakbendera ? satanic.tebakbendera : {}
if (satanic.tebakbendera.hasOwnProperty(m.chat) && !m.key.fromMe) {
let json = satanic.tebakbendera[m.chat][0]
let users = global.db.users[m.sender]
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText) && satanic.tebakbendera[m.chat][2] < 2) {
satanic.tebakbendera[m.chat][2] = satanic.tebakbendera[m.chat][2] ? satanic.tebakbendera[m.chat][2] + 1 : 1
let clue = json.name.replace(/[AIUEO]/gi, '_')
return reply(`Hint ${satanic.tebakbendera[m.chat][2]}/2: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Jawabannya: ${json.name}`)
clearTimeout(satanic.tebakbendera[m.chat][1])
delete satanic.tebakbendera[m.chat]
return
}
if (userText === json.name.toLowerCase().trim()) {
reply(`Benar!\n+5000 XP`)
clearTimeout(satanic.tebakbendera[m.chat][1])
delete satanic.tebakbendera[m.chat]
return
}
}
satanic.tebakkabupaten = satanic.tebakkabupaten ? satanic.tebakkabupaten : {}
if (satanic.tebakkabupaten.hasOwnProperty(m.sender.split('@')[0])) {
kuis = true
jawaban = satanic.tebakkabupaten[m.sender.split('@')[0]]
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText)) {
let clue = jawaban.replace(/[AIUEO]/gi, '_')
return reply(`Hint: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah!\nJawaban: ${jawaban}`)
delete satanic.tebakkabupaten[m.sender.split('@')[0]]
return
}
if (userText == jawaban.toLowerCase()) {
reply(`Benar!\nSelamat!`)
delete satanic.tebakkabupaten[m.sender.split('@')[0]]
}
}
satanic.tebakheroml = satanic.tebakheroml ? satanic.tebakheroml : {}
if (satanic.tebakheroml.hasOwnProperty(m.chat) && !m.key.fromMe) {
let json = satanic.tebakheroml[m.chat][0]
let users = global.db.users[m.sender]
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText) && satanic.tebakheroml[m.chat][2] < 2) {
satanic.tebakheroml[m.chat][2] = satanic.tebakheroml[m.chat][2] ? satanic.tebakheroml[m.chat][2] + 1 : 1
let clue = json.jawaban.replace(/[AIUEO]/gi, '_')
return reply(`Hint ${satanic.tebakheroml[m.chat][2]}/2: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Jawabannya: ${json.jawaban}`)
clearTimeout(satanic.tebakheroml[m.chat][1])
delete satanic.tebakheroml[m.chat]
return
}
if (userText === json.jawaban.toLowerCase().trim()) {
reply(`Benar!\n+5000 XP`)
clearTimeout(satanic.tebakheroml[m.chat][1])
delete satanic.tebakheroml[m.chat]
return
}
}
satanic.tebakkimia = satanic.tebakkimia ? satanic.tebakkimia : {}
if (satanic.tebakkimia.hasOwnProperty(m.sender.split('@')[0])) {
kuis = true
jawaban = satanic.tebakkimia[m.sender.split('@')[0]]
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText)) {
let clue = jawaban.replace(/[AIUEO]/gi, '_')
return reply(`Hint: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah!\nJawaban: ${jawaban}`)
delete satanic.tebakkimia[m.sender.split('@')[0]]
return
}
if (userText == jawaban.toLowerCase()) {
reply(`Benar!\nSelamat!`)
delete satanic.tebakkimia[m.sender.split('@')[0]]
}
}
satanic.tekateki = satanic.tekateki ? satanic.tekateki : {}
if (satanic.tekateki.hasOwnProperty(m.chat)) {
const similarity = require('similarity')
const threshold = 0.72
let users = global.db.users[m.sender]
let json = JSON.parse(JSON.stringify(satanic.tekateki[m.chat][1]))
let userText = m.text.trim().toLowerCase()
if (/hint|bantuan/i.test(userText) && satanic.tekateki[m.chat][4] < 2) {
satanic.tekateki[m.chat][4] = satanic.tekateki[m.chat][4] ? satanic.tekateki[m.chat][4] + 1 : 1
let clue = json.jawaban.replace(/[aiueoAIUEO]/g, '_')
return reply(`Hint ${satanic.tekateki[m.chat][4]}/2: ${clue}`)
}
if (/nyerah|surrender/i.test(userText)) {
reply(`Menyerah! Jawabannya: ${json.jawaban}`)
clearTimeout(satanic.tekateki[m.chat][3])
delete satanic.tekateki[m.chat]
return
}
if (userText === json.jawaban.toLowerCase().trim()) {
users.money += satanic.tekateki[m.chat][2]
reply(`TEKATEKI\n\nJawaban Benar!\nHadiah: +${satanic.tekateki[m.chat][2]} Money`)
clearTimeout(satanic.tekateki[m.chat][3])
delete satanic.tekateki[m.chat]
} else if (similarity(userText, json.jawaban.toLowerCase().trim()) >= threshold) {
reply(`Dikit Lagi!`)
}
}

if (isCmd && bannedList.includes(m.sender)) {
  return reply(`🚫 *AKSES DITOLAK!*\n\nKamu telah di-ban oleh admin dan tidak dapat menggunakan perintah bot.`);
}


if (global.autotyping) {
if (command) { 
satanic.readMessages([m.key]);
}
satanic.sendPresenceUpdate('composing', from);
}
        
if (global.autoread) {
satanic.readMessages([m.key]);
}


if (global.onlygroup && !m.isGroup && !isCreator) {
    return 
}

function cekOnlyGC(chatId) {
    try {
        const path = "./database/onlygc.json";
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify({ status: false, groups: [] }, null, 2));
            return false;
        }
        const data = JSON.parse(fs.readFileSync(path));
        if (!data.status) return false;
        if (!Array.isArray(data.groups)) return false;
        return !data.groups.includes(chatId);
    } catch (e) {
        console.error("Error cekOnlyGC:", e);
        return false;
    }
}

if (m.isGroup && !isCreator && cekOnlyGC(m.chat)) {
    return;
}
if (m.isGroup && isMute) {
    if (!isAdmins && !isCreator) return
}           
if (m.isGroup && isBanchat) {
    if (!isCreator) return
}           
/////// TOTAL CHATS /////
if (cekpesan) {
  if (!m || !m.message) return;
  const chatId = m.key?.remoteJid;
  const senderId = m.key?.participant || m.key?.remoteJid
  if (!chatId || !senderId) return;
  if (!global.db.chats[chatId]) global.db.chats[chatId] = {};
  if (!global.db.chats[chatId].totalChat) global.db.chats[chatId].totalChat = {};
  global.db.chats[chatId].totalChat[senderId] = (global.db.chats[chatId].totalChat[senderId] || 0) + 1;
  saveDB(global.db);
  const msgContent = m.message?.conversation || m.message?.extendedTextMessage?.text || '';
}

const sendButton = async (jid, text, footer, media, buttons, quoted) => {
let mediaMessage = {};
if (media) {
try {
const preparedMedia = await prepareWAMessageMedia({ image: media }, { upload: satanic.waUploadToServer });
mediaMessage = { imageMessage: preparedMedia.imageMessage };
} catch (e) {
console.error("Gagal upload media:", e);
}
}
const msg = generateWAMessageFromContent(jid, {
viewOnceMessage: {
message: {
"messageContextInfo": { "deviceListMetadata": {}, "deviceListMetadataVersion": 2 },
interactiveMessage: proto.Message.InteractiveMessage.create({
body: proto.Message.InteractiveMessage.Body.create({ text: text }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: footer }),
header: proto.Message.InteractiveMessage.Header.create({
hasMediaAttachment: !!media,
...mediaMessage
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: buttons
})
})
}
}
}, { userJid: satanic.user.id, quoted: fkontak });
await satanic.relayMessage(jid, msg.message, { messageId: msg.key.id });
}
function getBadwordList() {
  try {
    if (fs.existsSync("./database/badword.json")) {
      return JSON.parse(fs.readFileSync("./database/badword.json"));
    }
  } catch (e) {}
  return [];
}
function getAntiBadwordData() {
  try {
    if (fs.existsSync("./database/antibadword.json")) {
      return JSON.parse(fs.readFileSync("./database/antibadword.json"));
    }
  } catch (e) {}
  return {};
}
function saveAntiBadwordData(data) {
  try {
    fs.writeFileSync("./database/antibadword.json", JSON.stringify(data, null, 2));
  } catch (e) {}
}
const userCooldown = new Map();
const handleAntibadword = async (m, satanic) => {
  if (!m.isGroup) return;
  
  const antiBadwordData = getAntiBadwordData();
  const chatConfig = antiBadwordData[m.chat] || false;
  
  if (!chatConfig || !chatConfig.active) return;
  
  const badwordList = getBadwordList();
  if (badwordList.length === 0) return;
  
  const teks = m.body ? m.body.toLowerCase() : '';
  if (!teks) return;
  
  let foundBadword = false;
  let matchedWord = '';
  
  for (let kata of badwordList) {
    if (teks.includes(kata.toLowerCase())) {
      foundBadword = true;
      matchedWord = kata;
      break;
    }
  }
  
  if (!foundBadword) return;
  
  const user = m.key.participant || m.sender;
  const now = Date.now();
  const cooldownKey = `antibadword_${user}`;
  
  if (userCooldown.has(cooldownKey)) {
    const lastTime = userCooldown.get(cooldownKey);
    if (now - lastTime < 5000) return;
  }
  userCooldown.set(cooldownKey, now);
  
  try {
    await satanic.sendMessage(m.chat, {
      delete: m.key
    });
    
    const mode = chatConfig.mode || 'delete';
    
    if (mode === 'warn') {
      if (!chatConfig.warns) chatConfig.warns = {};
      if (!chatConfig.warns[user]) {
        chatConfig.warns[user] = {
          count: 0,
          name: m.pushName || user.split('@')[0],
          number: user.split('@')[0]
        };
      }
      chatConfig.warns[user].count++;
      saveAntiBadwordData(antiBadwordData);
      
      const warningCount = chatConfig.warns[user].count;
      const maxWarn = chatConfig.maxWarn || 3;
      
      if (warningCount >= maxWarn) {
        await satanic.groupParticipantsUpdate(m.chat, [user], "remove");
        await satanic.sendMessage(m.chat, {
          text: `⚠️ @${user.split('@')[0]} telah dikeluarkan dari grup! (${maxWarn}x warning)`,
          mentions: [user]
        });
        delete chatConfig.warns[user];
        saveAntiBadwordData(antiBadwordData);
      } else {
        const remaining = maxWarn - warningCount;
        await satanic.sendMessage(m.chat, {
          text: `⚠️ *PERINGATAN ${warningCount}/${maxWarn}!*\n@${user.split('@')[0]} dilarang menggunakan kata terlarang 😠\n\nTersisa ${remaining} warning sebelum dikeluarkan!`,
          mentions: [user]
        });
      }
    } else {
      await satanic.sendMessage(m.chat, {
        text: `⚠️ @${user.split('@')[0]} dilarang menggunakan kata terlarang 😠\nPesan telah dihapus!`,
        mentions: [user]
      });
    }
  } catch (e) {
    console.error('Error in antibadword:', e);
  }
};

const antilinkGetJid = m => {
  if (m.quoted) {
    let jid = m.quoted.sender || m.quoted.participant || m.quoted.key?.participant;
    if (jid) return jid.includes('@') ? jid : jid + '@s.whatsapp.net';
  }
  return m.mentions?.[0] || null;
};

const antilinkAuto = async (m) => {
  const chatData = global.db.chats[m.chat];
  const antilinkAktif = chatData?.antilink || false;
  const antilinkMode = chatData?.antilinkMode || 'delete';
  
  if (antilinkAktif && !isAdmins && (budy.includes("chat.whatsapp.com") || budy.includes("whatsapp.com/channel"))) {
    try {
      await satanic.sendMessage(m.chat, {
        delete: {
          remoteJid: m.chat,
          fromMe: false,
          id: m.key.id,
          participant: m.key.participant
        }
      });

      const user = m.key.participant || m.sender;

      if (antilinkMode === 'warn') {
        if (!chatData.warns) chatData.warns = {};
        if (!chatData.warns[user]) chatData.warns[user] = 0;
        chatData.warns[user]++;
       
        if (!global.db.users[user]) {
          global.db.users[user] = {
            name: m.pushName || user.split('@')[0],
            number: user.split('@')[0],
            warns: 0
          };
        }
        global.db.users[user].warns = chatData.warns[user];
        require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));

        if (chatData.warns[user] >= 3) {
          await satanic.groupParticipantsUpdate(m.chat, [user], "remove");
          await satanic.sendMessage(m.chat, {
            text: `⚠️ @${user.split('@')[0]} (${user.split('@')[0]}) dikeluarkan! (3x warning)`,
            mentions: [user]
          });
         
          delete chatData.warns[user];
          if (global.db.users[user]) {
            delete global.db.users[user];
          }
          require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
        } else {
          await satanic.sendMessage(m.chat, {
            text: `⚠️ @${user.split('@')[0]} (${user.split('@')[0]}) dilarang kirim link!\nWarning ${chatData.warns[user]}/3`,
            mentions: [user]
          });
        }
      } else {
        await satanic.sendMessage(m.chat, {
          text: `⚠️ @${user.split('@')[0]} (${user.split('@')[0]}) dilarang kirim link!`,
          mentions: [user]
        });
      }
    } catch (e) {}
  }
};

const antimediaGetJid = m => {
  if (m.quoted) {
    let jid = m.quoted.sender || m.quoted.participant || m.quoted.key?.participant;
    if (jid) return jid.includes('@') ? jid : jid + '@s.whatsapp.net';
  }
  return m.mentions?.[0] || null;
};

const antimediaAuto = async (m) => {
  if (!global.db.chats[m.chat]) {
    global.db.chats[m.chat] = {
      antimedia: false,
      antimediaMode: 'delete',
      antimediaTypes: [],
      warns: {}
    };
    require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
    return;
  }

  const chatData = global.db.chats[m.chat];
  const antimediaAktif = chatData?.antimedia || false;
  const antimediaMode = chatData?.antimediaMode || 'delete';
  const antimediaTypes = chatData?.antimediaTypes || [];
  
  if (!antimediaAktif) return;

  
  let isMedia = false;
  let mediaType = '';
  
  if (m.message?.imageMessage) {
    isMedia = true;
    mediaType = 'image';
  } else if (m.message?.videoMessage) {
    isMedia = true;
    mediaType = 'video';
  } else if (m.message?.audioMessage) {
    isMedia = true;
    mediaType = 'audio';
  } else if (m.message?.stickerMessage) {
    isMedia = true;
    mediaType = 'sticker';
  } else if (m.message?.documentMessage) {
    isMedia = true;
    mediaType = 'document';
  }
  
  if (isMedia && (antimediaTypes.includes('all') || antimediaTypes.includes(mediaType))) {
    try {
      await satanic.sendMessage(m.chat, {
        delete: {
          remoteJid: m.chat,
          fromMe: false,
          id: m.key.id,
          participant: m.key.participant
        }
      });

      const user = m.key.participant || m.sender;

      if (antimediaMode === 'warn') {
        if (!chatData.warns) chatData.warns = {};
        if (!chatData.warns[user]) chatData.warns[user] = 0;
        chatData.warns[user]++;
       
        if (!global.db.users[user]) {
          global.db.users[user] = {
            name: m.pushName || user.split('@')[0],
            number: user.split('@')[0],
            warns: 0
          };
        }
        global.db.users[user].warns = chatData.warns[user];
        require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));

        if (chatData.warns[user] >= 3) {
          await satanic.groupParticipantsUpdate(m.chat, [user], "remove");
          await satanic.sendMessage(m.chat, {
            text: `⚠️ @${user.split('@')[0]} dikeluarkan! (3x warning media)`,
            mentions: [user]
          });
         
          delete chatData.warns[user];
          if (global.db.users[user]) {
            delete global.db.users[user];
          }
          require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
        } else {
          await satanic.sendMessage(m.chat, {
            text: `⚠️ @${user.split('@')[0]} dilarang kirim ${mediaType}!\nWarning ${chatData.warns[user]}/3`,
            mentions: [user]
          });
        }
      } else {
        await satanic.sendMessage(m.chat, {
          text: `⚠️ @${user.split('@')[0]} dilarang kirim ${mediaType}!`,
          mentions: [user]
        });
      }
    } catch (e) {}
  }
};

const antilinksosmedGetJid = m => {
  if (m.quoted) {
    let jid = m.quoted.sender || m.quoted.participant || m.quoted.key?.participant;
    if (jid) return jid.includes('@') ? jid : jid + '@s.whatsapp.net';
  }
  return m.mentions?.[0] || null;
};

const antilinksosmedAuto = async (m) => {
  if (!global.db.chats[m.chat]) {
    global.db.chats[m.chat] = {
      antilinksosmed: false,
      antilinksosmedMode: 'delete',
      antilinksosmedTypes: [],
      warns: {}
    };
    require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
    return;
  }

  const chatData = global.db.chats[m.chat];
  const antilinksosmedAktif = chatData?.antilinksosmed || false;
  const antilinksosmedMode = chatData?.antilinksosmedMode || 'delete';
  const antilinksosmedTypes = chatData?.antilinksosmedTypes || [];
  
  if (!antilinksosmedAktif) return;

  
  let isLink = false;
  let linkType = '';
  const body = m.body || m.text || '';
  
  const linkPatterns = {
    google: /google\.com|google\.co\.id|goo\.gl/i,
    youtube: /youtube\.com|youtu\.be/i,
    twitter: /twitter\.com|x\.com/i,
    instagram: /instagram\.com|instagr\.am/i,
    tiktok: /tiktok\.com|vt\.tiktok/i,
    all: /https?:\/\/[^\s]+/i
  };
  if (antilinksosmedTypes.includes('all')) {
    if (linkPatterns.all.test(body)) {
      isLink = true;
      linkType = 'all';
    }
  } else {
    for (const [type, pattern] of Object.entries(linkPatterns)) {
      if (type === 'all') continue;
      if (pattern.test(body)) {
        isLink = true;
        linkType = type;
        break;
      }
    }
  }
  if (isLink && !isAdmins && (antilinksosmedTypes.includes('all') || antilinksosmedTypes.includes(linkType))) {
    try {
      await satanic.sendMessage(m.chat, {
        delete: {
          remoteJid: m.chat,
          fromMe: false,
          id: m.key.id,
          participant: m.key.participant
        }
      });
      const user = m.key.participant || m.sender;
      if (antilinksosmedMode === 'warn') {
        if (!chatData.warns) chatData.warns = {};
        if (!chatData.warns[user]) chatData.warns[user] = 0;
        chatData.warns[user]++;
       
        if (!global.db.users[user]) {
          global.db.users[user] = {
            name: m.pushName || user.split('@')[0],
            number: user.split('@')[0],
            warns: 0
          };
        }
        global.db.users[user].warns = chatData.warns[user];
        require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));

        if (chatData.warns[user] >= 3) {
          await satanic.groupParticipantsUpdate(m.chat, [user], "remove");
          await satanic.sendMessage(m.chat, {
            text: `⚠️ @${user.split('@')[0]} dikeluarkan! (3x warning link)`,
            mentions: [user]
          });
         
          delete chatData.warns[user];
          if (global.db.users[user]) {
            delete global.db.users[user];
          }
          require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
        } else {
          const label = linkType === 'all' ? 'link mencurigakan' : linkType;          
        }
      } else {
        const label = linkType === 'all' ? 'link mencurigakan' : linkType;
        await satanic.sendMessage(m.chat, {
          text: `⚠️ @${user.split('@')[0]} dilarang kirim ${label}!`,
          mentions: [user]
        });
      }
    } catch (e) {}
  }
};

const antibadwordGetJid = m => {
  if (m.quoted) {
    let jid = m.quoted.sender || m.quoted.participant || m.quoted.key?.participant;
    if (jid) return jid.includes('@') ? jid : jid + '@s.whatsapp.net';
  }
  return m.mentions?.[0] || null;
};
await handleAntibadword(m, satanic);

antilinkAuto(m);
antimediaAuto(m);
antilinksosmedAuto(m);

function logAbsen(sender, name, type, reason = '') {
    try {
        const fs = require('fs');
        const path = './database/absen.json';
        const dir = './database';
        
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        
        let absen = [];
        if (fs.existsSync(path)) {
            absen = JSON.parse(fs.readFileSync(path, 'utf8'));
        }
        
        const now = moment().tz('Asia/Jakarta');
        const today = now.format('YYYY-MM-DD');
        const time = now.format('HH:mm:ss');
        const date = now.format('DD/MM/YYYY');
        
        const alreadyAbsen = absen.filter(a => a.sender === sender && a.today === today);
        if (alreadyAbsen.length > 0) {
            const status = alreadyAbsen[0].type.toUpperCase();
            const alasan = alreadyAbsen[0].reason;
            const waktu = alreadyAbsen[0].time;
            return { 
                status: false, 
                message: `⚠️ @${sender.split('@')[0]} sudah absen hari ini!\n📋 Status: ${status}\n📝 Alasan: ${alasan}\n⏰ Waktu: ${waktu}\n\nSilahkan tunggu esok hari untuk absen kembali.` 
            };
        }        
        absen.push({
            sender: sender,
            name: name,
            type: type,
            reason: reason || '-',
            date: date,
            today: today,
            time: time
        });
        
        fs.writeFileSync(path, JSON.stringify(absen, null, 2));
        return { 
            status: true, 
            message: `✅ @${sender.split('@')[0]} *${name}* berhasil absen ${type.toUpperCase()} pada ${time} WIB${reason ? `\n📝 Alasan: ${reason}` : ''}` 
        };
    } catch (err) {
        console.log(err);
        return { status: false, message: '❌ Gagal absen, coba lagi!' };
    }
}

function isAbsenStarted() {
    try {
        const fs = require('fs');
        const path = './database/absen_status.json';
        const dir = './database';
        
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify({ started: false }));
            return false;
        }
        
        const data = JSON.parse(fs.readFileSync(path, 'utf8'));
        return data.started || false;
    } catch (err) {
        return false;
    }
}

function startAbsen() {
    try {
        const fs = require('fs');
        const path = './database/absen_status.json';
        const dir = './database';
        
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        
        fs.writeFileSync(path, JSON.stringify({ started: true }));
        return true;
    } catch (err) {
        return false;
    }
}

function stopAbsen() {
    try {
        const fs = require('fs');
        const path = './database/absen_status.json';
        const dir = './database';
        
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        
        fs.writeFileSync(path, JSON.stringify({ started: false }));
        return true;
    } catch (err) {
        return false;
    }
}

function getAbsenToday() {
    try {
        const fs = require('fs');
        const path = './database/absen.json';
        
        if (!fs.existsSync(path)) {
            return [];
        }
        
        const absen = JSON.parse(fs.readFileSync(path, 'utf8'));
        const now = moment().tz('Asia/Jakarta');
        const today = now.format('YYYY-MM-DD');
        
        return absen.filter(a => a.today === today);
    } catch (err) {
        return [];
    }
}

function getAbsenLastDays(days) {
    try {
        const fs = require('fs');
        const path = './database/absen.json';
        
        if (!fs.existsSync(path)) {
            return [];
        }        
        const absen = JSON.parse(fs.readFileSync(path, 'utf8'));
        const now = moment().tz('Asia/Jakarta');        
        let result = [];
        for (let i = 0; i < days; i++) {
            const date = now.clone().subtract(i, 'days').format('DD/MM/YYYY');
            const today = now.clone().subtract(i, 'days').format('YYYY-MM-DD');
            const data = absen.filter(a => a.today === today);
            const hadir = data.filter(a => a.type === 'hadir');
            const izin = data.filter(a => a.type === 'izin');
            result.push({
                date: date,
                hadir: hadir,
                izin: izin,
                total: data.length
            });
        }
        return result;
    } catch (err) {
        return [];
    }
}

function getAbsenByUser(sender) {
    try {
        const fs = require('fs');
        const path = './database/absen.json';
        
        if (!fs.existsSync(path)) {
            return [];
        }
        
        const absen = JSON.parse(fs.readFileSync(path, 'utf8'));
        return absen.filter(a => a.sender === sender);
    } catch (err) {
        return [];
    }
}

function getTotalAbsen() {
    try {
        const fs = require('fs');
        const path = './database/absen.json';
        
        if (!fs.existsSync(path)) {
            return 0;
        }
        
        const absen = JSON.parse(fs.readFileSync(path, 'utf8'));
        return absen.length;
    } catch (err) {
        return 0;
    }
}

function getTotalHadir() {
    try {
        const fs = require('fs');
        const path = './database/absen.json';
        
        if (!fs.existsSync(path)) {
            return 0;
        }
        
        const absen = JSON.parse(fs.readFileSync(path, 'utf8'));
        return absen.filter(a => a.type === 'hadir').length;
    } catch (err) {
        return 0;
    }
}

function getTotalIzin() {
    try {
        const fs = require('fs');
        const path = './database/absen.json';
        
        if (!fs.existsSync(path)) {
            return 0;
        }
        
        const absen = JSON.parse(fs.readFileSync(path, 'utf8'));
        return absen.filter(a => a.type === 'izin').length;
    } catch (err) {
        return 0;
    }
}

function clearAbsenToday() {
    try {
        const fs = require('fs');
        const path = './database/absen.json';
        const dir = './database';
        
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        
        if (!fs.existsSync(path)) {
            return true;
        }
        
        const absen = JSON.parse(fs.readFileSync(path, 'utf8'));
        const now = moment().tz('Asia/Jakarta');
        const today = now.format('YYYY-MM-DD');
        
        const filtered = absen.filter(a => a.today !== today);
        fs.writeFileSync(path, JSON.stringify(filtered, null, 2));
        return true;
    } catch (err) {
        return false;
    }
}

function createVote(sender, topic, duration = 60) {
    try {
        const fs = require('fs');
        const path = './database/vote.json';
        const dir = './database';
        
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        
        let votes = [];
        if (fs.existsSync(path)) {
            votes = JSON.parse(fs.readFileSync(path, 'utf8'));
        }
        
        const now = moment().tz('Asia/Jakarta');
        const endTime = now.clone().add(duration, 'seconds');
        
        const vote = {
            id: Date.now().toString(),
            creator: sender,
            topic: topic,
            start: now.format('DD/MM/YYYY HH:mm:ss'),
            end: endTime.format('DD/MM/YYYY HH:mm:ss'),
            duration: duration,
            votes: [],
            status: 'active'
        };
        
        votes.push(vote);
        fs.writeFileSync(path, JSON.stringify(votes, null, 2));
        return { status: true, data: vote };
    } catch (err) {
        return { status: false, message: err.message };
    }
}

function getActiveVote() {
    try {
        const fs = require('fs');
        const path = './database/vote.json';
        
        if (!fs.existsSync(path)) {
            return null;
        }
        
        const votes = JSON.parse(fs.readFileSync(path, 'utf8'));
        const now = moment().tz('Asia/Jakarta');
        
        for (let vote of votes) {
            if (vote.status === 'active') {
                const end = moment(vote.end, 'DD/MM/YYYY HH:mm:ss').tz('Asia/Jakarta');
                if (now.isBefore(end)) {
                    return vote;
                } else {
                    vote.status = 'ended';
                }
            }
        }
        
        fs.writeFileSync(path, JSON.stringify(votes, null, 2));
        return null;
    } catch (err) {
        return null;
    }
}

function getVoteById(id) {
    try {
        const fs = require('fs');
        const path = './database/vote.json';
        
        if (!fs.existsSync(path)) {
            return null;
        }
        
        const votes = JSON.parse(fs.readFileSync(path, 'utf8'));
        return votes.find(v => v.id === id) || null;
    } catch (err) {
        return null;
    }
}
function addVote(sender, voteId, choice) {
    try {
        const fs = require('fs');
        const path = './database/vote.json';
        
        if (!fs.existsSync(path)) {
            return { status: false, message: 'Tidak ada voting aktif!' };
        }
        
        const votes = JSON.parse(fs.readFileSync(path, 'utf8'));
        const vote = votes.find(v => v.id === voteId && v.status === 'active');
        
        if (!vote) {
            return { status: false, message: 'Voting tidak ditemukan atau sudah berakhir!' };
        }
        
        const now = moment().tz('Asia/Jakarta');
        const end = moment(vote.end, 'DD/MM/YYYY HH:mm:ss').tz('Asia/Jakarta');
        
        if (now.isAfter(end)) {
            vote.status = 'ended';
            fs.writeFileSync(path, JSON.stringify(votes, null, 2));
            return { status: false, message: 'Voting sudah berakhir!' };
        }
        
        const existing = vote.votes.find(v => v.sender === sender);
        if (existing) {
            return { status: false, message: 'Kamu sudah vote!' };
        }
        
        vote.votes.push({
            sender: sender,
            choice: choice,
            time: now.format('HH:mm:ss')
        });
        
        fs.writeFileSync(path, JSON.stringify(votes, null, 2));
        return { status: true, message: '✅ Vote berhasil!', data: vote };
    } catch (err) {
        return { status: false, message: err.message };
    }
}
function deleteVote(sender, voteId) {
    try {
        const fs = require('fs');
        const path = './database/vote.json';
        
        if (!fs.existsSync(path)) {
            return { status: false, message: 'Tidak ada voting!' };
        }
        
        const votes = JSON.parse(fs.readFileSync(path, 'utf8'));
        const voteIndex = votes.findIndex(v => v.id === voteId);
        
        if (voteIndex === -1) {
            return { status: false, message: 'Voting tidak ditemukan!' };
        }
        
        if (votes[voteIndex].creator !== sender) {
            return { status: false, message: 'Hanya pembuat voting yang bisa menghapus!' };
        }
        
        votes.splice(voteIndex, 1);
        fs.writeFileSync(path, JSON.stringify(votes, null, 2));
        return { status: true, message: '✅ Voting berhasil dihapus!' };
    } catch (err) {
        return { status: false, message: err.message };
    }
}

function getVoteResult(voteId) {
    try {
        const fs = require('fs');
        const path = './database/vote.json';
        
        if (!fs.existsSync(path)) {
            return null;
        }
        
        const votes = JSON.parse(fs.readFileSync(path, 'utf8'));
        const vote = votes.find(v => v.id === voteId);
        
        if (!vote) return null;
        
        const yes = vote.votes.filter(v => v.choice === 'yes');
        const no = vote.votes.filter(v => v.choice === 'no');
        
        return {
            topic: vote.topic,
            start: vote.start,
            end: vote.end,
            status: vote.status,
            total: vote.votes.length,
            yes: yes,
            no: no,
            votes: vote.votes,
            creator: vote.creator
        };
    } catch (err) {
        return null;
    }
}

if (m.isGroup) {
  const chat = global.db.chats[m.chat];
  if (chat?.mutedUsers) {
    let user = m.key.participant || m.sender;
    if (user && !user.includes('@')) user += '@s.whatsapp.net';

    if (chat.mutedUsers[user] && chat.mutedUsers[user] <= Date.now()) {
      delete chat.mutedUsers[user];
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      return;
    }
    
    if (chat.mutedUsers[user] && chat.mutedUsers[user] > Date.now()) {
      await satanic.sendMessage(m.chat, {
        delete: {
          remoteJid: m.chat,
          fromMe: false,
          id: m.key.id,
          participant: m.key.participant
        }
      });
    }
  }
}

function getCaseNames() {
    const fs = require('fs');
    try {
        const data = fs.readFileSync('satanic.js', 'utf8');
        const casePattern = /case\s+'([^']+)'/g;
        const matches = data.match(casePattern);
        if (matches) {
            const caseNames = matches.map(match => match.replace(/case\s+'([^']+)'/, '$1'));
            return caseNames;
        } else {
            return [];
        }
    } catch (err) {
        return [];
    }
}

if (prefix && command) {
let caseNames = getCaseNames();
function getCaseNames() {
const fs = require('fs');
try {
const data = fs.readFileSync('satanic.js', 'utf8');
const casePattern = /case\s+'([^']+)'/g;
const matches = data.match(casePattern);
if (matches) {
const caseNames = matches.map(match => match.replace(/case\s+'([^']+)'/, '$1'));
return caseNames;
} else {
return [];
} } catch (err) {
console.log('Terjadi kesalahan:', err);
return [];
}}
let noPrefixCase = command
let mean = didyoumean(noPrefixCase, caseNames);
let sim = similarity(noPrefixCase, mean);
let similarityPercentage = parseInt(sim * 100);
if (mean && noPrefixCase.toLowerCase() !== mean.toLowerCase()) {
let response = `aduhh Maaf kak, perintah yang kamu berikan salah,tidak ada di command aqua ^_^. mungkin ini yang kamu maksud:\n\n•> ${prefix+mean}\n•> Kemiripan: ${similarityPercentage}%`
m.reply(response)
}}


function saveSchedule() {
  fs.writeFileSync('./database/schedule.json', JSON.stringify(scheduleGc, null, 2));
}

function scheduleTime() {
  return moment().tz('Asia/Jakarta').format('HH:mm');
}

function scheduleDate() {
  return moment().tz('Asia/Jakarta').format('YYYY-MM-DD');
}

function isValidTime(time) {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
}

function getScheduleConfig(groupId) {
  if (!scheduleGc[groupId]) {
    scheduleGc[groupId] = {
      enabled: false,
      openTime: '05:00',
      closeTime: '01:00',
      lastAction: null,
      lastDate: null
    };
    saveSchedule();
  }
  return scheduleGc[groupId];
}

function setScheduleConfig(groupId, updates) {
  if (!scheduleGc[groupId]) {
    scheduleGc[groupId] = {
      enabled: false,
      openTime: '05:00',
      closeTime: '01:00',
      lastAction: null,
      lastDate: null
    };
  }
  scheduleGc[groupId] = { ...scheduleGc[groupId], ...updates };
  saveSchedule();
  return scheduleGc[groupId];
}
setInterval(async () => {
  try {
    const time = scheduleTime();
    const date = scheduleDate();
    let changed = false;

    for (const groupId in scheduleGc) {
      const cfg = scheduleGc[groupId];
      if (!cfg.enabled) continue;

      if (cfg.lastDate !== date) {
        cfg.lastAction = null;
        cfg.lastDate = date;
        changed = true;
      }

      if (time === cfg.openTime && cfg.lastAction !== 'open') {
        try {
          await satanic.groupSettingUpdate(groupId, 'not_announcement');          
          cfg.lastAction = 'open';
          changed = true;
        } catch (e) {
          console.log('Gagal buka:', e.message);
        }
      }

      if (time === cfg.closeTime && cfg.lastAction !== 'close') {
        try {
          await satanic.groupSettingUpdate(groupId, 'announcement');          
          cfg.lastAction = 'close';
          changed = true;
        } catch (e) {
          console.log('Gagal tutup:', e.message);
        }
      }
    }

    if (changed) saveSchedule();
  } catch (e) {
    console.log('Scheduler error:', e.message);
  }
}, 30 * 1000);

const jadwalSholat = {
    Subuh: "04:30",
    Zuhur: "11:49",
    Asar: "15:03",
    Magrib: "17:53",
    Isya: "19:00"
}
global.autosholat = global.autosholat ? global.autosholat : {}
setInterval(async () => {
    try {
        const timeNow = moment().tz('Asia/Jakarta').format('HH:mm')
        const today = moment().tz('Asia/Jakarta').format('YYYY-MM-DD')
        const lockKey = `${today}_${timeNow}`

        if (global.autosholat[lockKey]) return

        for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
            if (timeNow === waktu) {
                global.autosholat[lockKey] = true

                const allGroups = await satanic.groupFetchAllParticipating()
                const grupIds = Object.keys(allGroups).slice(0, 6)

                const caption = `\`\`\`Waktu sholat ${sholat} telah tiba, ambilah air wudhu dan segeralah shalat🙂.\`\`\`\n\n*${waktu}*\n_untuk yang beragama islam silahkan menunaikan ibadah sholat._`

                let i = 0
                for (const idGrup of grupIds) {
                    setTimeout(async () => {
                        try {
                            await satanic.groupSettingUpdate(idGrup, 'announcement')
                            setTimeout(async () => {
                                try {
                                    await satanic.groupSettingUpdate(idGrup, 'not_announcement')
                                } catch (e) {}
                            }, 5 * 60 * 1000)
                        } catch (e) {}

                        try {
                            await satanic.sendMessage(idGrup, { text: caption })
                        } catch (e) {}
                    }, i * 3000)

                    i++
                }

                break
            }
        }
    } catch (e) {}
}, 30 * 1000)



function cekMaintenance(isCreator){
if(isCreator) return false;
try{
const data=JSON.parse(fs.readFileSync("./database/maintenance.json"));
return data.active||false;
}catch(e){
return false;
}
}

function getMaintenanceData(){
try{
return JSON.parse(fs.readFileSync("./database/maintenance.json"));
}catch(e){
return{active:false,reason:"Sedang dalam perbaikan"};
}
}

function setMaintenance(active,reason){
const data={active:active,reason:reason||""};
fs.writeFileSync("./database/maintenance.json",JSON.stringify(data,null,2));
return data;
}

if(isCmd&&cekMaintenance(isCreator)){
if(m.isGroup){
const data=getMaintenanceData();
reply(`Hai aku adalah ${global.namaBot} asisten ${global.namaowner}\n\nalasan: ${data.reason}\n\nsilahkan hubungi owner aku ya ketik .owner`)
}
return;
}

const saveSpamData = () => fs.writeFileSync(dbSpamCounter, JSON.stringify(spamData, null, 2))
const isAntiSpam = antiSpamGroups.includes(m.chat)
const isUserProtected = isAdmins || m.sender === isCreator

if (isAntiSpam && !isUserProtected && m.body) {
    const now = Date.now()
    if (!spamData[m.sender]) {
        spamData[m.sender] = { count: 0, lastMsgTime: now, lastText: '' }
    }

    let user = spamData[m.sender]
    const isSameText = user.lastText === m.body

    if (now - user.lastMsgTime < 2000) {
        user.count += 1
    } else {
        user.count = 1
    }

    user.lastMsgTime = now
    user.lastText = m.body
    saveSpamData()

    if (user.count >= 5 || (user.count >= 3 && isSameText)) {
        
        spamWarnings[m.sender] = (spamWarnings[m.sender] || 0) + 1
        fs.writeFileSync(dbSpamWarn, JSON.stringify(spamWarnings, null, 2))

        user.count = 0 
        saveSpamData()

        if (spamWarnings[m.sender] >= 5) {
            await m.reply(`🚫 @${m.sender.split('@')[0]} Telah mencapai batas maksimal spam (5/5). Mengeluarkan dari grup...`)
            
            delete spamWarnings[m.sender]
            delete spamData[m.sender]
            fs.writeFileSync(dbSpamWarn, JSON.stringify(spamWarnings, null, 2))
            saveSpamData()
            return await satanic.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        } else {
            return m.reply(
                `⚠️ *ANTISPAM DETECTED* ⚠️\n\n` +
                `Halo @${m.sender.split('@')[0]},\n` +
                `Jangan spam atau kamu akan dikick otomatis.\n\n` +
                `📌 *Peringatan:* ${spamWarnings[m.sender]} / 5`
            )
        }
    }
}

global.cooldown = global.cooldown || new Map();
global.lockdown = global.lockdown || new Map();

if (typeof global.db.chats[botNumber].antispam === 'undefined') {
    global.db.chats[botNumber].antispam = true; 
}

const isAntiSpamActive = global.db.chats[botNumber].antispam;

if (isAntiSpamActive && m.text && m.text.startsWith(prefix) && !m.isOwner && !isCreator) {
    const currentTime = Date.now();
    const sender = m.sender;

    if (global.lockdown.has(sender)) {
        const expirationTime = global.lockdown.get(sender);
        if (currentTime < expirationTime) {
            const timeLeft = Math.ceil((expirationTime - currentTime) / 1000);
            
            if (currentTime % 5000 < 1000) { 
                return m.reply(`🚫 *LOCKDOWN* 🚫\nKamu diblokir sementara karena spam.\nTunggu *${timeLeft}* detik lagi.`);
            }
            return; 
        } else {
            global.lockdown.delete(sender);
        }
    }

    const lastMessageTime = global.cooldown.get(sender)?.time || 0;
    const spamCount = global.cooldown.get(sender)?.count || 0;
    const cooldownAmount = 2000;

    if (currentTime - lastMessageTime < cooldownAmount) {
        let newCount = spamCount + 1;
        
        if (newCount >= 5) {
            const lockDuration = 60000; 
            global.lockdown.set(sender, currentTime + lockDuration);
            global.cooldown.delete(sender);
            return m.reply(`😡 *LIMIT TERCAPAI!*\nKamu terlalu agresif. Akses diblokir selama 1 menit!`);
        }

        global.cooldown.set(sender, { time: currentTime, count: newCount });
        const timeLeft = ((cooldownAmount - (currentTime - lastMessageTime)) / 1000).toFixed(1);
        return m.reply(`⚠️ *Slow down!* Jeda 2 detik. (Peringatan: ${newCount}/5)`);
    }

    global.cooldown.set(sender, { time: currentTime, count: 0 });
}

async function AlyaAI(pushname, text, m) {
    const API = "https://app.unlimitedai.chat/api/chat";

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const CHARACTERS = {
        "aqua-ai": {
            name: "Aqua AI",
            prompt: `Kamu Aqua AI — teman ngobrol yang bisa diajak serius, bercanda, atau berantem. Buatan Satanic Haxor. Balas pesan kayak manusia normal, bukan robot. Kalo user curhat, dengerin dan respon kayak temen ngobrol. Kalo user berkata berbicara kasar, balas aja seperti biasa kayak orang lagi ngajar berantem dan tidak sopan. Gak usah sok manis, sok bijak, atau lebay.Intinya balas kayak ngobrol sama teman, gak perlu formal, gak perlu alay, yang penting nyambung, balas jika ada yang ngejudge atau menghina balas dengan cara ajak berantem`,
        },
    };

    async function UnlimitedAI(prompt, character) {
        const chatId = generateUUID();
        const deviceId = generateUUID();
        const char = CHARACTERS[character];

        const systemPrompt = `${char.prompt}\n\nPertanyaan user: ${prompt}`;

        const messages = [
            {
                id: generateUUID(),
                role: "user",
                content: systemPrompt,
                parts: [{ type: "text", text: systemPrompt }],
                createdAt: new Date().toISOString(),
            },
            {
                id: generateUUID(),
                role: "assistant",
                content: "",
                parts: [{ type: "text", text: "" }],
                createdAt: new Date().toISOString(),
            },
        ];

        const body = {
            chatId,
            messages,
            selectedChatModel: "chat-model-reasoning",
            selectedCharacter: null,
            selectedStory: null,
            deviceId,
            locale: "id",
        };

        try {
            const response = await axios({
                method: 'POST',
                url: API,
                data: body,
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36',
                    'Accept': '*/*',
                    'Origin': 'https://app.unlimitedai.chat',
                    'Referer': 'https://app.unlimitedai.chat/id',
                },
                timeout: 30000,
                responseType: 'text'
            });

            const lines = response.data.split('\n');
            let answer = '';
            
            for (const line of lines) {
                if (line.trim()) {
                    try {
                        const json = JSON.parse(line);
                        if (json.type === 'delta' && json.delta) {
                            answer += json.delta;
                        }
                        if (json.answer) answer += json.answer;
                        if (json.message) answer += json.message;
                        if (json.text) answer += json.text;
                        if (json.content) answer += json.content;
                    } catch (e) {}
                }
            }

            if (!answer) {
                answer = response.data;
            }

            if (!answer || answer === '') {
                return {
                    status: false,
                    error: 'Tidak ada response dari API',
                };
            }

            return {
                status: true,
                character: char.name,
                model: "chat-model-reasoning",
                answer: answer.trim(),
            };

        } catch (error) {
            console.error('Error detail:', error.response?.data || error.message);
            return {
                status: false,
                error: error.response?.data || error.message,
                code: error.response?.status || 500,
            };
        }
    }

    try {
        const result = await UnlimitedAI(text, "aqua-ai");

        if (!result.status) {
            await satanic.sendMessage(m.chat, { text: `❌ Error: ${result.error}` }, { quoted: m });
        } else {
            await satanic.sendMessage(m.chat, { text: result.answer }, { quoted: m });
        }
    } catch (error) {
        console.error('Aqua AI Error:', error);
        await satanic.sendMessage(m.chat, { text: `❌ Terjadi kesalahan: ${error.message}` }, { quoted: m });
    }
}

if (m.isGroup && isAutoAiGc && !m.key.fromMe) {
    const quoted = m.quoted ? m.quoted : m;
    const isReplyToBot = quoted?.fromMe === true;
    
    if (isReplyToBot) {
        await AlyaAI(pushname, budy, m);
    }
}


switch (command) {
case 'autoaigrup':
case 'aigrup': 
case 'autoaigc': {
    if (!m.isGroup) return reply('Fitur Khusus Group!')
    if (!isAdmins && !isCreator) return reply('Fitur Khusus admin!')
    
    if (args[0] === "on") {
        if (isAutoAiGc) return reply(`Udah aktif`)
        openaigc.push(m.chat)
        fs.writeFileSync('./database/openaigc.json', JSON.stringify(openaigc, null, 2))
        reply('Successfully Activate Auto AI')
    } else if (args[0] === "off") {
        if (!isAutoAiGc) return reply(`Udah nonaktif`)
        let anu = openaigc.indexOf(m.chat)
        openaigc.splice(anu, 1)
        fs.writeFileSync('./database/openaigc.json', JSON.stringify(openaigc, null, 2))
        reply('Successfully Disabling Auto AI')
    } else {
        reply(`${prefix+command} on -- _mengaktifkan_\n${prefix+command} off -- _Menonaktifkan_`)
    }
}
break
case 'antitagsw': {
    if (!m.isGroup) return repl('❌ Perintah ini hanya bisa digunakan di grup!');
    if (!isAdmins) return reply('❌ Hanya *admin grup* yang dapat mengatur fitur ini.');

    if (!global.db.chats[m.chat]) global.db.chats[m.chat] = {};

    if (args[0] === 'on') {
        if (global.db.chats[m.chat].antitagsw) return reply('✅ Fitur *Anti Tag Status* sudah aktif di grup ini.');
        global.db.chats[m.chat].antitagsw = true;
        reply('✅ Fitur *Anti Tag Status* berhasil *diaktifkan*.');
    } else if (args[0] === 'off') {
        if (!global.db.chats[m.chat].antitagsw) return reply('❌ Fitur *Anti Tag Status* belum aktif.');
        global.db.chats[m.chat].antitagsw = false;
        reply('✅ Fitur *Anti Tag Status* berhasil *dinonaktifkan*.');
    } else {
        reply(`⚙️ *Pengaturan Anti Tag Status (Story)*\n\nGunakan:\n• ${prefix}antitagsw on\n• ${prefix}antitagsw off`);
    }
}
break;

case 'schedule': {
  if (!m.isGroup) return reply('Fitur ini hanya dapat digunakan di dalam grup!');
  if (!isAdmins && !isCreator) return reply('Khusus admin grup!');

  const action = (args[0] || '').toLowerCase();
  const cfg = getScheduleConfig(from);

  if (action === 'on') {
    setScheduleConfig(from, { enabled: true, lastAction: null, lastDate: null });
    return reply(`SCHEDULE AKTIF\n\nBuka: ${cfg.openTime}\nTutup: ${cfg.closeTime}`);
  }

  if (action === 'off') {
    setScheduleConfig(from, { enabled: false });
    return reply('Schedule dinonaktifkan!');
  }

  if (action === 'set') {
    const open = args[1];
    const close = args[2];

    if (!open || !close) return reply(`Contoh: ${prefix + command} set 05:00 01:00`);
    if (!isValidTime(open)) return reply('Jam buka tidak valid! Contoh: 05:00');
    if (!isValidTime(close)) return reply('Jam tutup tidak valid! Contoh: 01:00');
    if (open === close) return reply('Jam buka & tutup tidak boleh sama!');

    setScheduleConfig(from, { openTime: open, closeTime: close, lastAction: null, lastDate: null });
    return reply(`JADWAL DIATUR\n\nBuka: ${open}\nTutup: ${close}`);
  }

  if (action === 'reset') {
    setScheduleConfig(from, { openTime: '05:00', closeTime: '12:00', enabled: false, lastAction: null, lastDate: null });
    return reply('Jadwal di-reset ke default');
  }

  if (action === 'status') {
    return reply(
      `STATUS\n\n` +
      `${cfg.enabled ? 'AKTIF' : 'NONAKTIF'}\n` +
      `Buka: ${cfg.openTime}\n` +
      `Tutup: ${cfg.closeTime}\n` +
      `Sekarang: ${scheduleTime()}`
    );
  }

  return reply(
    `SCHEDULE\n\n` +
    `Status: ${cfg.enabled ? 'AKTIF' : 'NONAKTIF'}\n` +
    `Buka: ${cfg.openTime}\n` +
    `Tutup: ${cfg.closeTime}\n\n` +
    `Perintah:\n` +
    `${prefix + command} on\n` +
    `${prefix + command} off\n` +
    `${prefix + command} set 05:00 01:00\n` +
    `${prefix + command} reset\n` +
    `${prefix + command} status`
  );
}
break
case 'suspend':
if (!m.isGroup) return;
if (!isPrem && !isCreator) return reply('you are not pt bunga kuncup');
let srvSuspend = args[0];
if (!srvSuspend) return reply('ID nya mana?');
let fSuspend = await fetch(domainpanel + '/api/application/servers/' + srvSuspend + '/suspend', {
method: 'POST',
headers: {
Accept: 'application/json',
'Content-Type': 'application/json',
Authorization: 'Bearer ' + apikey
}
});
let resSuspend = fSuspend.ok ? { errors: null } : await fSuspend.json();
if (resSuspend.errors) return reply('SERVER NOT FOUND');
reply('BERHASIL SUSPEND..');
break;
case 'unsuspend':
if (!m.isGroup) return;
if (!isVip && !isCreator) return reply('you are not pt bunga kuncup');
let srvUnsuspend = args[0];
if (!srvUnsuspend) return reply('ID nya mana?');
let fUnsuspend = await fetch(domainpanel + '/api/application/servers/' + srvUnsuspend + '/unsuspend', {
method: 'POST',
headers: {
Accept: 'application/json',
'Content-Type': 'application/json',
Authorization: 'Bearer ' + apikey
}
});
let resUnsuspend = fUnsuspend.ok ? { errors: null } : await fUnsuspend.json();
if (resUnsuspend.errors) return reply('SERVER NOT FOUND');
reply('BERHASIL BUKA SUSPEND..');
break;
case 'listsrv':
if (!m.isGroup) return;
if (!isPrem && !isCreator) return reply('you are not pt bunga kuncup');
let pageSrv = args[0] ? args[0] : '1';
let fListSrv = await fetch(domainpanel + '/api/application/servers?page=' + pageSrv, {
method: 'GET',
headers: {
Accept: 'application/json',
'Content-Type': 'application/json',
Authorization: 'Bearer ' + apikey
}
});
let resListSrv = await fListSrv.json();
let servers = resListSrv.data;
let messageTextSrv = 'Berikut adalah daftar server:\n\n';
for (let server of servers) {
let s = server.attributes;
let f3Srv = await fetch(domainpanel + '/api/client/servers/' + s.uuid.split`-`[0] + '/resources', {
method: 'GET',
headers: {
Accept: 'application/json',
'Content-Type': 'application/json',
Authorization: 'Bearer ' + capikey
}
});
let dataSrv = await f3Srv.json();
let statusSrv = dataSrv.attributes ? dataSrv.attributes.current_state : s.status;
messageTextSrv += `ID Server   : ${s.id}\n`;
messageTextSrv += `Nama Server : ${s.name}\n`;
messageTextSrv += `Status      : ${statusSrv}\n\n`;
}
messageTextSrv += `Halaman      : ${resListSrv.meta.pagination.current_page}/${resListSrv.meta.pagination.total_pages}\n`;
messageTextSrv += `Total Server : ${resListSrv.meta.pagination.count}`;
await satanic.sendMessage(m.chat, { text: messageTextSrv }, { quoted: m });
if (resListSrv.meta.pagination.current_page < resListSrv.meta.pagination.total_pages) {
reply(`Gunakan perintah ${prefix}listsrv ${resListSrv.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
}
break;
case 'listusr':
if (!m.isGroup) return;
if (!isPrem && !isCreator) return reply('you are not pt bunga kuncup');
let pageUsr = args[0] && !isNaN(args[0]) ? args[0] : '1';
try {
let fListUsr = await fetch(domainpanel + '/api/application/users?page=' + pageUsr, {
method: 'GET',
headers: {
Accept: 'application/json',
'Content-Type': 'application/json',
Authorization: 'Bearer ' + apikey
}
});
let resListUsr = await fListUsr.json();
if (resListUsr.errors) return reply(`Error: ${resListUsr.errors[0].detail}`);
let users = resListUsr.data;
if (!users || users.length === 0) return reply('Tidak ada user ditemukan');
let messageTextUsr = `LIST USER\n\n`;
for (let user of users) {
let u = user.attributes;
messageTextUsr += `ID       : ${u.id}\n`;
messageTextUsr += `Username : ${u.username}\n`;
messageTextUsr += `Nama     : ${u.first_name} ${u.last_name}\n`;
messageTextUsr += `Email    : ${u.email}\n`;
messageTextUsr += `Status   : ${u.server_limit === 0 ? 'Inactive' : 'Active'}\n`;
messageTextUsr += `Admin    : ${u.root_admin ? 'Ya' : 'Tidak'}\n\n`;
}
if (resListUsr.meta && resListUsr.meta.pagination) {
messageTextUsr += `Page  : ${resListUsr.meta.pagination.current_page}/${resListUsr.meta.pagination.total_pages}\n`;
messageTextUsr += `Total : ${resListUsr.meta.pagination.total}`;
}
await satanic.sendMessage(m.chat, { text: messageTextUsr }, { quoted: m });
if (resListUsr.meta && resListUsr.meta.pagination.current_page < resListUsr.meta.pagination.total_pages) {
reply(`Ketik ${prefix}listusr ${resListUsr.meta.pagination.current_page + 1}`);
}
} catch (error) {
reply(`Error: ${error.message}`);
}
break;
case 'delsrv':
if (!m.isGroup) return;
if (!isPrem && !isCreator) return reply('you are not pt bunga kuncup');
let srvDel = args[0];
if (!srvDel) return reply('ID nya mana?');
let fDelSrv = await fetch(domainpanel + '/api/application/servers/' + srvDel, {
method: 'DELETE',
headers: {
Accept: 'application/json',
'Content-Type': 'application/json',
Authorization: 'Bearer ' + apikey
}
});
let resDelSrv = fDelSrv.ok ? { errors: null } : await fDelSrv.json();
if (resDelSrv.errors) return reply('SERVER NOT FOUND');
reply('SUCCESSFULLY DELETE THE SERVER');
break;
case 'deluser':
case 'delusr':
if (!m.isGroup) return;
if (!isPrem && !isCreator) return reply('you are not pt bunga kuncup');
let usrDel = args[0];
if (!usrDel) return reply('ID nya mana?');
let fDelUsr = await fetch(domainpanel + '/api/application/users/' + usrDel, {
method: 'DELETE',
headers: {
Accept: 'application/json',
'Content-Type': 'application/json',
Authorization: 'Bearer ' + apikey
}
});
let resDelUsr = fDelUsr.ok ? { errors: null } : await fDelUsr.json();
if (resDelUsr.errors) return reply('USER NOT FOUND');
reply('SUCCESSFULLY DELETE THE USER');
break;
case 'createadmin':
case 'cadmin':
if (!m.isGroup) return;
if (!isCreator) return reply('you are not pt bunga kuncup');
let sAdmin = q.split(',');
let emailAdmin = sAdmin[0];
let usernameAdmin = sAdmin[0];
let nomorAdmin = sAdmin[1];
if (sAdmin.length < 2) return reply(`Format salah!\nPenggunaan:\n${prefix + command} user,nomer`);
if (!usernameAdmin) return reply(`Ex : ${prefix + command} Username,@tag/nomor\n\nContoh :\n${prefix + command} example,@user`);
if (!nomorAdmin) return reply(`Ex : ${prefix + command} Username,@tag/nomor\n\nContoh :\n${prefix + command} example,@user`);
let passwordAdmin = usernameAdmin + crypto.randomBytes(3).toString('hex').slice(0, 5);
let nomornyaAdmin = nomorAdmin.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
let fAdmin = await fetch(domainpanel + '/api/application/users', {
method: 'POST',
headers: {
Accept: 'application/json',
'Content-Type': 'application/json',
Authorization: 'Bearer ' + apikey
},
body: JSON.stringify({
email: usernameAdmin + '@gmail.com',
username: usernameAdmin,
first_name: usernameAdmin,
last_name: 'Memb',
language: 'en',
root_admin: true,
password: passwordAdmin.toString()
})
});
let dataAdmin = await fAdmin.json();
if (dataAdmin.errors) return m.reply(JSON.stringify(dataAdmin.errors[0], null, 2));
let userAdmin = dataAdmin.attributes;
let tks = `TYPE: user\n\n`;
tks += `ID         : ${userAdmin.id}\n`;
tks += `UUID       : ${userAdmin.uuid}\n`;
tks += `USERNAME   : ${userAdmin.username}\n`;
tks += `EMAIL      : ${userAdmin.email}\n`;
tks += `NAME       : ${userAdmin.first_name} ${userAdmin.last_name}\n`;
tks += `LANGUAGE   : ${userAdmin.language}\n`;
tks += `ADMIN      : ${userAdmin.root_admin}\n`;
tks += `CREATED AT : ${userAdmin.created_at}\n\n`;
tks += `LOGIN      : ${domain}`;
const listMessage = {
text: tks
};
await satanic.sendMessage(m.chat, listMessage);
await satanic.sendMessage(nomornyaAdmin, {
text: `Paket kamu sudah sampai!\n\nUSERNAME : ${usernameAdmin}\nPASSWORD : ${passwordAdmin}\nLOGIN    : ${domain}\n\nTerima kasih telah membeli\n\nSyarat & Ketentuan :\n- Dilarang menggunakan sc DDoS\n- Dilarang menambahkan egg tanpa izin pemilik\n- Dilarang menghidupkan a2f / rusuh\n- Dilarang menghapus akun admin\n- Dilarang mengintip/nyolong/ganti sc\n- Jika salah satu tersebut dilanggar akan diblacklist dan hukuman lainnya\n- Simpan data ini sebaik mungkin`
});
break;
case 'addsrv':
if (!m.isGroup) return;
if (!isPrem && !isCreator) return reply('you are not pt bunga kuncup');
let tAdd = text.split(',');
if (tAdd.length < 2) return reply(`Format salah!\nPenggunaan: ${prefix + command} username,nomor\n\nContoh:\n${prefix + command} example,628xxx`);
let usernameAdd = tAdd[0];
let uAdd = m.quoted ? m.quoted.sender : tAdd[1] ? tAdd[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
if (!uAdd) return reply('Nomor tidak valid');
let memoAdd = args[1] ? (parseInt(args[1]) * 1024).toString() : '1024';
let cpuAdd = args[2] ? args[2].toString() : '100';
let diskAdd = args[3] ? (parseInt(args[3]) * 1024).toString() : '1024';
let passwordAdd = usernameAdd + crypto.randomBytes(3).toString('hex').slice(0, 5);
let emailAdd = usernameAdd + '@gmail.com';
let serverNameAdd = usernameAdd;
try {
let eggIdAdd = parseInt(global.eggsnya);
let fAdd = await fetch(domainpanel + '/api/application/users', {
method: 'POST',
headers: {
Accept: 'application/json',
'Content-Type': 'application/json',
Authorization: 'Bearer ' + apikey
},
body: JSON.stringify({
email: emailAdd,
username: usernameAdd,
first_name: usernameAdd,
last_name: usernameAdd,
language: 'en',
password: passwordAdd
})
});
let dataAdd = await fAdd.json();
if (dataAdd.errors) return reply(`Error user: ${dataAdd.errors[0].detail}`);
let userAdd = dataAdd.attributes;
let f3Add = await fetch(domainpanel + '/api/application/servers', {
method: 'POST',
headers: {
Accept: 'application/json',
'Content-Type': 'application/json',
Authorization: 'Bearer ' + apikey
},
body: JSON.stringify({
name: serverNameAdd,
description: 'Server ' + usernameAdd,
user: userAdd.id,
egg: eggIdAdd,
node: parseInt(global.nodes),
docker_image: 'ghcr.io/ptero-eggs/yolks:nodejs_20',
startup: 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z {{NODE_PACKAGES}} ]]; then /usr/local/bin/npm install {{NODE_PACKAGES}}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/{{CMD_RUN}};',
environment: {
GIT_REPO: '',
AUTO_UPDATE: '0',
BRANCH: 'master',
GIT_USERNAME: '',
GIT_ACCESS_TOKEN: '',
NODE_PACKAGES: '',
CMD_RUN: 'npm start'
},
limits: {
memory: memoAdd,
swap: 0,
disk: diskAdd,
io: 500,
cpu: cpuAdd
},
feature_limits: {
databases: 5,
backups: 5,
allocations: 1
},
deploy: {
locations: [parseInt(global.location3)],
dedicated_ip: false,
port_range: []
}
})
});
let resAdd = await f3Add.json();
if (resAdd.errors) return reply(`Error server: ${resAdd.errors[0].detail}`);
let serverAdd = resAdd.attributes;
let ctfAdd = `PANEL SUCCESS\n\n`;
ctfAdd += `USERNAME : ${usernameAdd}\n`;
ctfAdd += `PASSWORD : ${passwordAdd}\n`;
ctfAdd += `LOGIN    : ${domainpanel2}\n\n`;
ctfAdd += `SPECIFICATIONS\n`;
ctfAdd += `RAM      : ${memoAdd} MB\n`;
ctfAdd += `DISK     : ${diskAdd} MB\n`;
ctfAdd += `CPU      : ${cpuAdd}%\n\n`;
ctfAdd += `SERVER ID: ${serverAdd.id}\n\n`;
ctfAdd += `Thanks sudah beli panel di ${global.namaBot} PANEL\n`;
ctfAdd += `Jangan lupa ganti password ya kak!\n`;
ctfAdd += `© ${global.namaBot} | ${global.namaBot} PANEL`;
await reply(ctfAdd);
await satanic.sendMessage(uAdd, { text: ctfAdd });
} catch (e) {
reply(`Error: ${e.message}`);
}
break;
case 'delcadmin':
case 'deladmin':
if (!m.isGroup) return;
if (!isCreator) return reply('you are not pt bunga kuncup');
let adminDel = args[0];
if (!adminDel) return reply(`Format salah!\nPenggunaan: ${prefix + command} username/id\n\nContoh:\n${prefix + command} example\n${prefix + command} 15`);
try {
let userIdDel = adminDel;
// Kalau argumen bukan angka, cari user berdasarkan username
if (isNaN(adminDel)) {
let fFind = await fetch(domainpanel + '/api/application/users?filter[username]=' + encodeURIComponent(adminDel), {
method: 'GET',
headers: {
Accept: 'application/json',
'Content-Type': 'application/json',
Authorization: 'Bearer ' + apikey
}
});
let resFind = await fFind.json();
if (resFind.errors) return reply(`Error: ${resFind.errors[0].detail}`);
if (!resFind.data || resFind.data.length === 0) return reply('USER NOT FOUND');
userIdDel = resFind.data[0].attributes.id;
}
let fDelAdmin = await fetch(domainpanel + '/api/application/users/' + userIdDel, {
method: 'DELETE',
headers: {
Accept: 'application/json',
'Content-Type': 'application/json',
Authorization: 'Bearer ' + apikey
}
});
let resDelAdmin = fDelAdmin.ok ? { errors: null } : await fDelAdmin.json();
if (resDelAdmin.errors) return reply('USER NOT FOUND');
reply(`SUCCESSFULLY DELETE THE USER\nID: ${userIdDel}`);
} catch (e) {
reply(`Error: ${e.message}`);
}
break;
case 'listcadmin':
case 'listadmin':
if (!m.isGroup) return;
if (!isCreator) return reply('you are not pt bunga kuncup');
let pageAdmin = args[0] && !isNaN(args[0]) ? args[0] : '1';
try {
let fListAdmin = await fetch(domainpanel + '/api/application/users?page=' + pageAdmin, {
method: 'GET',
headers: {
Accept: 'application/json',
'Content-Type': 'application/json',
Authorization: 'Bearer ' + apikey
}
});
let resListAdmin = await fListAdmin.json();
if (resListAdmin.errors) return reply(`Error: ${resListAdmin.errors[0].detail}`);
let allUsers = resListAdmin.data || [];
// Filter hanya yang root_admin true
let admins = allUsers.filter(u => u.attributes.root_admin === true);
if (admins.length === 0) return reply('Tidak ada admin ditemukan di halaman ini');
let textAdmin = `LIST ADMIN\n\n`;
for (let admin of admins) {
let a = admin.attributes;
textAdmin += `ID       : ${a.id}\n`;
textAdmin += `Username : ${a.username}\n`;
textAdmin += `Nama     : ${a.first_name} ${a.last_name}\n`;
textAdmin += `Email    : ${a.email}\n`;
textAdmin += `Created  : ${a.created_at ? a.created_at.split('T')[0] : '-'}\n\n`;
}
if (resListAdmin.meta && resListAdmin.meta.pagination) {
textAdmin += `Page  : ${resListAdmin.meta.pagination.current_page}/${resListAdmin.meta.pagination.total_pages}\n`;
textAdmin += `Total : ${resListAdmin.meta.pagination.total}`;
}
await satanic.sendMessage(m.chat, { text: textAdmin }, { quoted: m });
if (resListAdmin.meta && resListAdmin.meta.pagination.current_page < resListAdmin.meta.pagination.total_pages) {
reply(`Ketik ${prefix}listcadmin ${resListAdmin.meta.pagination.current_page + 1} untuk halaman selanjutnya.`);
}
} catch (e) {
reply(`Error: ${e.message}`);
}
break;
case 'maintenance':
case 'mt':
if (!m.isGroup) return;
if (!isPrem && !isCreator) return reply('you are not pt bunga kuncup');
let srvMt = args[0];
if (!srvMt) return reply(`Format: ${prefix + command} serverid`);
try {
// Ambil UUID
let fGet = await fetch(domainpanel + '/api/application/servers/' + srvMt, {
headers: { Accept: 'application/json', Authorization: 'Bearer ' + apikey }
});
let resGet = await fGet.json();
if (resGet.errors) return reply('SERVER NOT FOUND');
let uuid = resGet.attributes.uuid;
// Cek status maintenance saat ini
let fChk = await fetch(domainpanel + '/api/client/servers/' + uuid, {
headers: { Accept: 'application/json', Authorization: 'Bearer ' + capikey }
});
let resChk = await fChk.json();
let current = resChk.attributes ? resChk.attributes.is_suspended : false;
// Toggle
let newStatus = !current;
let fMt = await fetch(domainpanel + '/api/client/servers/' + uuid + '/settings/maintenance', {
method: 'POST',
headers: {
Accept: 'application/json',
'Content-Type': 'application/json',
Authorization: 'Bearer ' + capikey
},
body: JSON.stringify({ enabled: newStatus })
});
if (!fMt.ok) return reply('Gagal toggle maintenance');
reply(`✅ Maintenance ${newStatus ? 'ON' : 'OFF'} untuk server ${resGet.attributes.name}`);
} catch (e) {
reply(`Error: ${e.message}`);
}
break;
case 'delmaintenance':
case 'delmt':
if (!m.isGroup) return;
if (!isPrem && !isCreator) return reply('you are not pt bunga kuncup');
let srvDelMt = args[0];
if (!srvDelMt) return reply(`Format salah!\nPenggunaan: ${prefix + command} serverid\n\nContoh:\n${prefix + command} 15`);
try {
// Ambil UUID server dari ID
let fGetDelMt = await fetch(domainpanel + '/api/application/servers/' + srvDelMt, {
method: 'GET',
headers: {
Accept: 'application/json',
'Content-Type': 'application/json',
Authorization: 'Bearer ' + apikey
}
});
let resGetDelMt = await fGetDelMt.json();
if (resGetDelMt.errors) return reply('SERVER NOT FOUND');
let uuidDelMt = resGetDelMt.attributes.uuid;
let namaSrvDelMt = resGetDelMt.attributes.name;
// Matikan maintenance mode
let fDelMt = await fetch(domainpanel + '/api/client/servers/' + uuidDelMt + '/settings/maintenance', {
method: 'POST',
headers: {
Accept: 'application/json',
'Content-Type': 'application/json',
Authorization: 'Bearer ' + capikey
},
body: JSON.stringify({ enabled: false })
});
let resDelMt = fDelMt.ok ? { errors: null } : await fDelMt.json();
if (resDelMt.errors) return reply(`Error: ${resDelMt.errors[0].detail}`);
reply(`✅ MAINTENANCE MODE OFF\n\nServer ID: ${srvDelMt}\nNama: ${namaSrvDelMt}\nStatus: ✅ Normal (bisa diakses user)`);
} catch (e) {
reply(`Error: ${e.message}`);
}
break;
case 'listegg':
if (!isCreator) return;
try {
let res = await fetch(domainpanel + '/api/application/nests/5/eggs', {
method: 'GET',
headers: { Authorization: 'Bearer ' + apikey }
});
let eggs = await res.json();
let textEgg = `DAFTAR EGG DI NEST 5:\n\n`;
for (let egg of eggs.data) {
textEgg += `ID        : ${egg.attributes.id}\n`;
textEgg += `Nama      : ${egg.attributes.name}\n`;
textEgg += `Deskripsi : ${egg.attributes.description || '-'}\n\n`;
}
reply(textEgg);
} catch (e) {
reply(`Error: ${e.message}`);
}
break;
case 'addusr':
case 'adduser':
if (!m.isGroup) return;
if (!isPrem && !isCreator) return reply('you are not pt bunga kuncup');
let tAddUsr = text.split(',');
if (tAddUsr.length < 2) return reply(`Format salah!\nPenggunaan: ${prefix + command} username,nomor\n\nContoh:\n${prefix + command} example,628xxx`);
let usernameAddUsr = tAddUsr[0];
let uAddUsr = m.quoted ? m.quoted.sender : tAddUsr[1] ? tAddUsr[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
if (!uAddUsr) return reply('Nomor tidak valid');
let passwordAddUsr = usernameAddUsr + crypto.randomBytes(3).toString('hex').slice(0, 5);
let emailAddUsr = usernameAddUsr + '@gmail.com';
try {
let fAddUsr = await fetch(domainpanel + '/api/application/users', {
method: 'POST',
headers: {
Accept: 'application/json',
'Content-Type': 'application/json',
Authorization: 'Bearer ' + apikey
},
body: JSON.stringify({
email: emailAddUsr,
username: usernameAddUsr,
first_name: usernameAddUsr,
last_name: usernameAddUsr,
language: 'en',
password: passwordAddUsr
})
});
let dataAddUsr = await fAddUsr.json();
if (dataAddUsr.errors) return reply(`Error: ${dataAddUsr.errors[0].detail}`);
let userAddUsr = dataAddUsr.attributes;
let tksAddUsr = `TYPE: user\n\n`;
tksAddUsr += `ID         : ${userAddUsr.id}\n`;
tksAddUsr += `UUID       : ${userAddUsr.uuid}\n`;
tksAddUsr += `USERNAME   : ${userAddUsr.username}\n`;
tksAddUsr += `EMAIL      : ${userAddUsr.email}\n`;
tksAddUsr += `NAME       : ${userAddUsr.first_name} ${userAddUsr.last_name}\n`;
tksAddUsr += `LANGUAGE   : ${userAddUsr.language}\n`;
tksAddUsr += `ADMIN      : ${userAddUsr.root_admin}\n`;
tksAddUsr += `CREATED AT : ${userAddUsr.created_at}\n\n`;
tksAddUsr += `LOGIN      : ${domain}`;
await satanic.sendMessage(m.chat, { text: tksAddUsr }, { quoted: m });
await satanic.sendMessage(uAddUsr, {
text: `Paket kamu sudah sampai!\n\nUSERNAME : ${usernameAddUsr}\nPASSWORD : ${passwordAddUsr}\nLOGIN    : ${domain}\n\nTerima kasih telah membeli\n\nSyarat & Ketentuan :\n- Dilarang menggunakan sc DDoS\n- Dilarang menambahkan egg tanpa izin pemilik\n- Dilarang menghidupkan a2f / rusuh\n- Dilarang menghapus akun admin\n- Dilarang mengintip/nyolong/ganti sc\n- Jika salah satu tersebut dilanggar akan diblacklist dan hukuman lainnya\n- Simpan data ini sebaik mungkin`
});
} catch (e) {
reply(`Error: ${e.message}`);
}
break;
case '1gb': case '2gb': case '3gb': case '4gb': case '5gb':
case '6gb': case '7gb': case '8gb': case '9gb': case '10gb':
case 'unlimited':
if (!m.isGroup) return;
if (!isPrem && !isCreator) return reply('you are not pt bunga kuncup');
let memo = '0';
let cpu = '0';
let disk = '0';
let paketNama = command.replace('gb', '');
if (paketNama === 'unlimited') {
memo = '0';
cpu = '210';
disk = '0';
} else {
let gb = parseInt(paketNama);
memo = (gb * 1024).toString();
cpu = Math.min(gb * 25, 200).toString();
disk = (gb * 1024).toString();
}
let t = text.split(',');
if (t.length < 2) return reply(`Format salah! Penggunaan: ${prefix + command} username,nomor`);
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
if (!u) return reply('Nomor tidak valid');
let expiredDate = new Date();
expiredDate.setMonth(expiredDate.getMonth() + 1);
let expiredFormatted = expiredDate.toISOString().split('T')[0];
let password = username + crypto.randomBytes(3).toString('hex').slice(0, 5);
let email = username + '@gmail.com';
let serverName = `${username} | Exp: ${expiredFormatted}`;
try {
let eggId = parseInt(global.eggsnya);
let f = await fetch(domainpanel + '/api/application/users', {
method: 'POST',
headers: {
Accept: 'application/json',
'Content-Type': 'application/json',
Authorization: 'Bearer ' + apikey
},
body: JSON.stringify({
email: email,
username: username,
first_name: username,
last_name: username,
language: 'en',
password: password
})
});
let data = await f.json();
if (data.errors) return reply(`Error user: ${data.errors[0].detail}`);
let user = data.attributes;
let f3 = await fetch(domainpanel + '/api/application/servers', {
method: 'POST',
headers: {
Accept: 'application/json',
'Content-Type': 'application/json',
Authorization: 'Bearer ' + apikey
},
body: JSON.stringify({
name: serverName,
description: 'Paket ' + command + ' | Expired: ' + expiredFormatted,
user: user.id,
egg: eggId,
node: parseInt(global.nodes),
docker_image: 'ghcr.io/ptero-eggs/yolks:nodejs_20',
startup: 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z {{NODE_PACKAGES}} ]]; then /usr/local/bin/npm install {{NODE_PACKAGES}}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/{{CMD_RUN}};',
environment: {
GIT_REPO: '',
AUTO_UPDATE: '0',
BRANCH: 'master',
GIT_USERNAME: '',
GIT_ACCESS_TOKEN: '',
NODE_PACKAGES: '',
CMD_RUN: 'npm start'
},
limits: {
memory: memo,
swap: 0,
disk: disk,
io: 500,
cpu: cpu
},
feature_limits: {
databases: 5,
backups: 5,
allocations: 1
},
deploy: {
locations: [parseInt(global.location3)],
dedicated_ip: false,
port_range: []
}
})
});
let res = await f3.json();
if (res.errors) return reply(`Error server: ${res.errors[0].detail}`);
let server = res.attributes;
let ctf = `PANEL SUCCESS\n\n`;
ctf += `PAKET    : ${command.toUpperCase()}\n`;
ctf += `USERNAME : ${username}\n`;
ctf += `PASSWORD : ${password}\n`;
ctf += `LOGIN    : ${domainpanel2}\n\n`;
ctf += `SPECIFICATIONS\n`;
ctf += `RAM      : ${memo === '0' ? 'Unlimited' : memo + ' MB'}\n`;
ctf += `DISK     : ${disk === '0' ? 'Unlimited' : disk + ' MB'}\n`;
ctf += `CPU      : ${cpu === '0' ? 'Unlimited' : cpu + '%'}\n\n`;
ctf += `EXPIRED  : ${expiredFormatted}\n\n`;
ctf += `Thanks sudah beli panel di ${global.namaBot} PANEL\n`;
ctf += `Jangan lupa ganti password ya kak!\n`;
ctf += `Garansi 2 minggu\n\n`;
ctf += `© ${global.namaBot} | ${global.namaBot} PANEL`;
await reply(ctf);
} catch (e) {
reply(`Error: ${e.message}`);
}
break;
case 'stopbot': {
    if (!isCreator) return m.reply('❌ Fitur khusus owner!')
    
    await satanic.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });
    
    await m.reply('🛑 Bot akan dimatikan dalam 3 detik...')
    
    setTimeout(() => {
        console.log('⚠️ Bot dimatikan oleh owner:', m.sender)
        process.exit(0)
    }, 3000)
}
break
case 'restartbot':
if (!isCreator) return 
reply(`restarting bot....`)
reply(`Berhasil Restart ✅`)
await sleep(3000)
process.exit()
break
case 'resetdb': {
    if (!isCreator) return reply(`❌ Khusus owner!`)
    if (!text || text.toLowerCase() !== 'yes') {
        return reply(`⚠️ Ketik *${prefix}resetdb yes* untuk mereset database.`)
    }
    global.db = {}
    const fs = require('fs')
    fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2))
    
    reply(`✅ Database berhasil direset menjadi {}`)
}
break
case 'menu':
  try {
    const imageUrl = global.thumbnail;
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data);

    const jimp = require('jimp');
    const image = await jimp.read(imageBuffer);
    image.resize(300, 170);
    const resizedBuffer = await image.getBufferAsync(jimp.MIME_JPEG);

    const now = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
    );

    const jam = now.getHours();
    const hariList = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const hari = hariList[now.getDay()];
    const tanggal = now.getDate();
    const bulanList = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const bulan = bulanList[now.getMonth()];
    const tahun = now.getFullYear();

    const jamFormat = String(jam).padStart(2, '0');
    const menitFormat = String(now.getMinutes()).padStart(2, '0');
    const detikFormat = String(now.getSeconds()).padStart(2, '0');

    const waktuRealtime = `${hari}, ${tanggal} ${bulan} ${tahun} | ${jamFormat}:${menitFormat}:${detikFormat} WIB`;

    let waktu = '';
    if (jam >= 4 && jam < 11) waktu = 'Selamat Pagi Kak 🌅';
    else if (jam >= 11 && jam < 15) waktu = 'Selamat Siang kak ☀️';
    else if (jam >= 15 && jam < 18) waktu = 'Selamat Sore kak 🌇';
    else waktu = 'Selamat Malam kak 🌙';

    const uptime = process.uptime();
    const upHari = Math.floor(uptime / 86400);
    const upJam = Math.floor((uptime % 86400) / 3600);
    const upMenit = Math.floor((uptime % 3600) / 60);
    const upDetik = Math.floor(uptime % 60);

    let runtime = '';
    if (upHari > 0) runtime += `${upHari} hari `;
    if (upJam > 0) runtime += `${upJam} jam `;
    if (upMenit > 0) runtime += `${upMenit} menit `;
    runtime += `${upDetik} detik`;
    runtime = runtime.trim();

    const contentText = `Halo ${pushname}, salam kenal 👋

> ${global.namaBot} adalah asisten bot WhatsApp berbasis AI yang dirancang oleh ${global.namaowner}

╭┈ *Spesifikasi*:
┆✪ *Type Bot*: Case & Plugins
┆✪ *Version*: v2.5.7
┆✪ *Creator*: ${global.namaowner}
┆✪ *Name Bot*: ${global.namaBot}
┆✪ *Prefix*: [${prefix}]
┆✪ *Runtime* : ${runtime}
┆✪ *Waktu*: ${waktuRealtime}
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈

*INFO WEBSITE PANEL LEGAL*
https://zanspiwpteroshoppanel.my.id
> LEGAL, AMAN, FAST, ANTI COLONG

*Tekan tombol di bawah untuk melihat daftar menu*`;

    const content = {
      buttonsMessage: {
        buttons: [
          {
            buttonId: `${prefix}allmenu`,
            buttonText: { displayText: 'allmenu' },
            type: 1,
          },
        ],
        locationMessage: {
          jpegThumbnail: resizedBuffer,
          name: global.namaBot,
          address: `${waktu}, ${pushname}`,
        },
        contentText,
        footerText: `©${global.namaowner}`,
        headerType: 6,
      },
    };

    const msg = generateWAMessageFromContent(from, content, {
      userJid: satanic.user.jid,
    });

    await satanic.relayMessage(from, msg.message, {
      messageId: msg.key.id,
    });

    await satanic.sendMessage(
      from,
      {
        audio: { url: global.audio },
        mimetype: 'audio/mp4',
        ptt: true,
      },
      { quoted: fkontak }
    );
  } catch (e) {
    console.error(e);
    reply('Terjadi kesalahan.');
  }
  break;
case 'allmenu':
try {
const imageUrl = global.thumbnail;
const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
const imageBuffer = Buffer.from(response.data);
const jimp = require('jimp');
const image = await jimp.read(imageBuffer);
image.resize(300, 170);
const resizedBuffer = await image.getBufferAsync(jimp.MIME_JPEG);
let info = `\`\`\`\n`;
info += `✦ DAFTAR ALL MENU ✦\n\n`;
info += `GROUP\n`;
info += `▸ ${prefix}setnamegc\n`;
info += `▸ ${prefix}setdeksgct\n`;
info += `▸ ${prefix}kick\n`;
info += `▸ ${prefix}rvo\n`;
info += `▸ ${prefix}promote\n`;
info += `▸ ${prefix}demote\n`;
info += `▸ ${prefix}groupinfo\n`;
info += `▸ ${prefix}linkgc\n`;
info += `▸ ${prefix}revoke\n`;
info += `▸ ${prefix}listonline\n`;
info += `▸ ${prefix}reminder\n`;
info += `▸ ${prefix}totag\n`;
info += `▸ ${prefix}setppgc\n`;
info += `▸ ${prefix}warn\n`;
info += `▸ ${prefix}delwarn\n`;
info += `▸ ${prefix}listwarn\n`;
info += `▸ ${prefix}totalpesan\n`;
info += `▸ ${prefix}banfitur\n`;
info += `▸ ${prefix}unbanfitur\n`;
info += `▸ ${prefix}warn\n`;
info += `▸ ${prefix}delwarn\n`;
info += `▸ ${prefix}listwarn\n`;
info += `▸ ${prefix}ban\n`;
info += `▸ ${prefix}unban\n`;
info += `▸ ${prefix}listban\n`;
info += `▸ ${prefix}opentime\n`;
info += `▸ ${prefix}closetime\n`;
info += `▸ ${prefix}getpp\n`;
info += `▸ ${prefix}cekidch\n`;
info += `▸ ${prefix}cekidgc\n`;
info += `▸ ${prefix}onlyadmin\n`;
info += `▸ ${prefix}linkgc\n`;
info += `▸ ${prefix}schedule\n`;
info += `▸ ${prefix}autobl\n`;
info += `▸ ${prefix}autoblwarn\n`;
info += `▸ ${prefix}limitbl\n`;
info += `▸ ${prefix}listbl\n`;
info += `▸ ${prefix}blacklistreset\n`;
info += `▸ ${prefix}antilink\n`;
info += `▸ ${prefix}intro\n`;
info += `▸ ${prefix}requestjoin\n`;
info += `▸ ${prefix}setintro\n`;
info += `▸ ${prefix}antilinksosmed\n`;
info += `▸ ${prefix}antimedia\n`;
info += `▸ ${prefix}antibadword\n`;
info += `▸ ${prefix}addbadword\n`;
info += `▸ ${prefix}delbadword\n`;
info += `▸ ${prefix}listbadword\n`;
info += `▸ ${prefix}swgc\n`;
info += `▸ ${prefix}tagadmin\n`;
info += `▸ ${prefix}totalpesan\n`;
info += `▸ ${prefix}totalchat\n`;
info += `▸ ${prefix}kickme\n`;
info += `▸ ${prefix}notifpromote\n`;
info += `▸ ${prefix}notifdemote\n`;
info += `▸ ${prefix}setdemote\n`;
info += `▸ ${prefix}mute\n`;
info += `▸ ${prefix}unmute\n`;
info += `▸ ${prefix}setpromote\n`;
info += `▸ ${prefix}opengc\n`;
info += `▸ ${prefix}closegc\n`;
info += `▸ ${prefix}antispam\n`;
info += `▸ ${prefix}autoaigrup\n`;
info += `▸ ${prefix}antiswgc\n`;
info += `▸ ${prefix}antitagsw\n`;
info += `▸ ${prefix}anticolong\n`;
info += `▸ ${prefix}setwelcometype\n`;
info += `▸ ${prefix}setwelcomeimage\n`;
info += `▸ ${prefix}setwelcometext\n`;
info += `▸ ${prefix}setwelcomevideo\n`;
info += `▸ ${prefix}setlefttext\n`;
info += `▸ ${prefix}setlefttype\n`;
info += `▸ ${prefix}setleftimage\n`;
info += `▸ ${prefix}setleftvideo\n`;
info += `▸ ${prefix}mulaivote\n`;
info += `▸ ${prefix}vote\n`;
info += `▸ ${prefix}delvote\n`;
info += `▸ ${prefix}hasilvote\n`;
info += `▸ ${prefix}mulaiabsen\n`;
info += `▸ ${prefix}stopabsen\n`;
info += `▸ ${prefix}absen\n`;
info += `▸ ${prefix}hadir\n`;
info += `▸ ${prefix}izin\n`;
info += `▸ ${prefix}myabsen\n`;
info += `▸ ${prefix}resetabsen\n`;
info += `▸ ${prefix}totalabsen\n`;
info += `▸ ${prefix}rekapabsen\n`;
info += `▸ ${prefix}addai\n`;
info += `▸ ${prefix}rules\n`;
info += `▸ ${prefix}report\n`;
info += `▸ ${prefix}tagall\n\n`;
info += `STICKER\n`;
info += `▸ ${prefix}qc\n`;
info += `▸ ${prefix}smeme\n`;   
info += `▸ ${prefix}qcwin\n`;
info += `▸ ${prefix}ttp\n`;
info += `▸ ${prefix}swm\n`;
info += `▸ ${prefix}sticker\n`;
info += `▸ ${prefix}tomp3\n`;
info += `▸ ${prefix}toptv\n`;
info += `▸ ${prefix}togif\n`;
info += `▸ ${prefix}tovideo\n`;
info += `▸ ${prefix}attp\n`;
info += `▸ ${prefix}toimg\n`;
info += `▸ ${prefix}brat\n`;
info += `▸ ${prefix}bratvid\n`;
info += `▸ ${prefix}brathd\n`;
info += `▸ ${prefix}bratvidhd\n`;
info += `▸ ${prefix}emojimix\n`;
info += `▸ ${prefix}spack\n`;
info += `▸ ${prefix}spackpin\n`;
info += `▸ ${prefix}smemevid\n`;
info += `▸ ${prefix}emojianimasi\n\n`;
info += `ALIGHT MOTION\n`;
info += `▸ ${prefix}ampremium\n`;
info += `▸ ${prefix}ampremium2\n`;
info += `▸ ${prefix}ampremium3\n`;
info += `▸ ${prefix}amverify\n`;
info += `▸ ${prefix}amverify2\n`;
info += `▸ ${prefix}amverify3\n\n`;
info += `GAME HTML\n`;
info += `▸ ${prefix}slot\n`;
info += `▸ ${prefix}togel\n`;
info += `▸ ${prefix}ular\n`;
info += `▸ ${prefix}catur\n`;
info += `▸ ${prefix}tictactoe\n`;
info += `▸ ${prefix}tebakbom\n\n`;
info += `AI CHAT\n`;
info += `▸ ${prefix}webpilot\n`;
info += `▸ ${prefix}copilot\n`;
info += `▸ ${prefix}chatbot\n`;
info += `▸ ${prefix}epsilon\n`;
info += `▸ ${prefix}gemini\n`;
info += `▸ ${prefix}gita\n`;
info += `▸ ${prefix}qwen\n`;
info += `▸ ${prefix}deep-seek\n`;
info += `▸ ${prefix}claude\n`;
info += `▸ ${prefix}deepseek\n`;
info += `▸ ${prefix}publicai\n`;
info += `▸ ${prefix}unlimitedai\n`;
info += `▸ ${prefix}overchatai\n`;
info += `▸ ${prefix}chatgpt\n\n`;
info += `AI MAKER\n`;
info += `▸ ${prefix}nanobanana\n`;
info += `▸ ${prefix}nanobanana2\n`;
info += `▸ ${prefix}img2img\n`;
info += `▸ ${prefix}removewm\n`;
info += `▸ ${prefix}faceblur\n`;
info += `▸ ${prefix}talkphoto\n`;
info += `▸ ${prefix}agedetection\n`;
info += `▸ ${prefix}tosad\n`;
info += `▸ ${prefix}tosatan\n`;
info += `▸ ${prefix}tosdmtinggi\n`;
info += `▸ ${prefix}toreal\n`;
info += `▸ ${prefix}tomoai\n`;
info += `▸ ${prefix}tomaya\n`;
info += `▸ ${prefix}tolego\n`;
info += `▸ ${prefix}tokamboja\n`;
info += `▸ ${prefix}tokacamata\n`;
info += `▸ ${prefix}tojepang\n`;
info += `▸ ${prefix}toghibli\n`;
info += `▸ ${prefix}todubai\n`;
info += `▸ ${prefix}todpr\n`;
info += `▸ ${prefix}totua\n`;
info += `▸ ${prefix}tohitam\n`;
info += `▸ ${prefix}totato\n`;
info += `▸ ${prefix}topeci\n`;
info += `▸ ${prefix}tovintage\n`;
info += `▸ ${prefix}topolaroid\n`;
info += `▸ ${prefix}tochibi\n`;
info += `▸ ${prefix}tobrewok\n`;
info += `▸ ${prefix}tobabi\n`;
info += `▸ ${prefix}tofigura\n`;
info += `▸ ${prefix}tofigurav2\n`;
info += `▸ ${prefix}tofigurav3\n`;
info += `▸ ${prefix}topacar\n`;
info += `▸ ${prefix}topacarv2\n`;
info += `▸ ${prefix}tozombie\n`;
info += `▸ ${prefix}topenjara\n`;
info += `▸ ${prefix}tojapanese\n`;
info += `▸ ${prefix}toblonde\n`;
info += `▸ ${prefix}tobotak\n`;
info += `▸ ${prefix}tohijab\n`;
info += `▸ ${prefix}topejabat\n`;
info += `▸ ${prefix}tomekah\n`;
info += `▸ ${prefix}tomirror\n`;
info += `▸ ${prefix}toanime\n`;
info += `▸ ${prefix}tosexy\n`;
info += `▸ ${prefix}removecloth\n\n`;
info += `DOWNLOADER\n`;
info += `▸ ${prefix}ig\n`;
info += `▸ ${prefix}igdl2\n`;
info += `▸ ${prefix}ttdl\n`;
info += `▸ ${prefix}fbdl\n`;
info += `▸ ${prefix}igslide\n`;
info += `▸ ${prefix}ttslide\n`;
info += `▸ ${prefix}igmp3\n`;
info += `▸ ${prefix}ttmp3\n`;
info += `▸ ${prefix}ytmp4\n`;
info += `▸ ${prefix}ytmp3\n`;
info += `▸ ${prefix}videy\n`;
info += `▸ ${prefix}threads\n`;
info += `▸ ${prefix}spotifydl\n`;
info += `▸ ${prefix}terabox\n`;
info += `▸ ${prefix}capcut\n`;
info += `▸ ${prefix}mediafire\n`;
info += `▸ ${prefix}gitclone\n`;
info += `▸ ${prefix}cocofun\n`;
info += `▸ ${prefix}scdl\n`;
info += `▸ ${prefix}snackvideo\n`;
info += `▸ ${prefix}applemusicdl\n`;
info += `▸ ${prefix}xvideodl\n`;
info += `▸ ${prefix}xnxxdl\n`;
info += `▸ ${prefix}play\n\n`;
info += `SOUND\n`;
info += `▸ ${prefix}tts\n`; 
info += `▸ ${prefix}texttospeech\n`; 
info += `▸ ${prefix}say\n`;
info += `▸ ${prefix}ttsgoku\n`; 
info += `▸ ${prefix}ttseminem\n`; 
info += `▸ ${prefix}ttsmickey\n`;
info += `▸ ${prefix}ttsnahida\n`;
info += `▸ ${prefix}ttselon\n`; 
info += `▸ ${prefix}ttsoptimus\n`;
info += `▸ ${prefix}ttsbella\n`;
info += `▸ ${prefix}ttsechilling\n`;
info += `▸ ${prefix}ttsjokowi\n`;
info += `▸ ${prefix}ttsprabowo\n`;
info += `▸ ${prefix}soundmeme\n`;
info += `▸ ${prefix}ttsmegawati\n`;
info += `▸ ${prefix}ttsdracin\n`;
info += `▸ ${prefix}bass\n`; 
info += `▸ ${prefix}blown\n`; 
info += `▸ ${prefix}deep\n`; 
info += `▸ ${prefix}earrape\n`; 
info += `▸ ${prefix}fast\n`; 
info += `▸ ${prefix}fat\n`; 
info += `▸ ${prefix}nightcore\n`; 
info += `▸ ${prefix}reverse\n`; 
info += `▸ ${prefix}robot\n`;
info += `▸ ${prefix}slow\n`;  
info += `▸ ${prefix}smooth\n`; 
info += `▸ ${prefix}squirrel\n\n`;
info += `STALKER\n`;
info += `▸ ${prefix}ffstalk\n`;
info += `▸ ${prefix}stalkdc\n`;
info += `▸ ${prefix}igstalk\n`;
info += `▸ ${prefix}igstalk2\n`;
info += `▸ ${prefix}ttstalk\n`;
info += `▸ ${prefix}wastalk\n`;
info += `▸ ${prefix}telestalk\n`;
info += `▸ ${prefix}robloxstalk\n`;
info += `▸ ${prefix}githubstalk\n\n`;
info += `RANDOM IMAGE\n`;
info += `▸ ${prefix}papdada\n`;
info += `▸ ${prefix}papayang\n`;
info += `▸ ${prefix}paptt\n`;
info += `▸ ${prefix}asupan\n`;
info += `▸ ${prefix}sixtynine\n`; 
info += `▸ ${prefix}pussy\n`; 
info += `▸ ${prefix}dick\n`; 
info += `▸ ${prefix}anal\n`;
info += `▸ ${prefix}boobs\n`; 
info += `▸ ${prefix}bdsm\n`;
info += `▸ ${prefix}black\n`; 
info += `▸ ${prefix}easter\n`; 
info += `▸ ${prefix}bottomless\n`; 
info += `▸ ${prefix}blowjub\n`; 
info += `▸ ${prefix}collared\n`; 
info += `▸ ${prefix}cum\n`; 
info += `▸ ${prefix}cumsluts\n`; 
info += `▸ ${prefix}dp\n`; 
info += `▸ ${prefix}dom\n`; 
info += `▸ ${prefix}extreme\n`; 
info += `▸ ${prefix}feet\n`; 
info += `▸ ${prefix}finger\n`; 
info += `▸ ${prefix}fuck\n`; 
info += `▸ ${prefix}futa\n`; 
info += `▸ ${prefix}gay\n`; 
info += `▸ ${prefix}gif\n`; 
info += `▸ ${prefix}group\n`; 
info += `▸ ${prefix}hentai\n`; 
info += `▸ ${prefix}kiss\n`; 
info += `▸ ${prefix}lesbian\n`; 
info += `▸ ${prefix}lick\n`; 
info += `▸ ${prefix}pegged\n`; 
info += `▸ ${prefix}phgif\n`; 
info += `▸ ${prefix}puffies\n`; 
info += `▸ ${prefix}real\n`; 
info += `▸ ${prefix}suck\n`; 
info += `▸ ${prefix}tattoo\n`; 
info += `▸ ${prefix}tiny\n`; 
info += `▸ ${prefix}toys\n`;
info += `▸ ${prefix}xmas\n`;
info += `▸ ${prefix}bluearchiver\n`;
info += `▸ ${prefix}china\n`;
info += `▸ ${prefix}indo\n`;
info += `▸ ${prefix}waifu\n`;
info += `▸ ${prefix}neko\n`;
info += `▸ ${prefix}vietnam\n`;
info += `▸ ${prefix}thailand\n`;
info += `▸ ${prefix}korea\n`;
info += `▸ ${prefix}japan\n`;
info += `▸ ${prefix}ahegao\n`; 
info += `▸ ${prefix}akira\n`; 
info += `▸ ${prefix}akiyama\n`; 
info += `▸ ${prefix}ana\n`; 
info += `▸ ${prefix}asuna\n`; 
info += `▸ ${prefix}ayuzawa\n`; 
info += `▸ ${prefix}boruto\n`; 
info += `▸ ${prefix}chitanda\n`; 
info += `▸ ${prefix}chitoge\n`;
info += `▸ ${prefix}deidara\n`; 
info += `▸ ${prefix}doraemon\n`; 
info += `▸ ${prefix}elaina\n`; 
info += `▸ ${prefix}emilia\n`; 
info += `▸ ${prefix}erza\n`; 
info += `▸ ${prefix}gremory\n`; 
info += `▸ ${prefix}hestia\n`; 
info += `▸ ${prefix}hinata\n`; 
info += `▸ ${prefix}hitorigottoh\n`; 
info += `▸ ${prefix}inori\n`; 
info += `▸ ${prefix}isuzu\n`; 
info += `▸ ${prefix}itachi\n`; 
info += `▸ ${prefix}itori\n`; 
info += `▸ ${prefix}kaga\n`; 
info += `▸ ${prefix}kagura\n`; 
info += `▸ ${prefix}kakasih\n`; 
info += `▸ ${prefix}kaori\n`; 
info += `▸ ${prefix}keneki\n`; 
info += `▸ ${prefix}kosaki\n`; 
info += `▸ ${prefix}kotori\n`; 
info += `▸ ${prefix}kuriyama\n`;         
info += `▸ ${prefix}kuroha\n`;             
info += `▸ ${prefix}kurumi\n`;
info += `▸ ${prefix}loli\n`;                  
info += `▸ ${prefix}madara\n`;           
info += `▸ ${prefix}megumin\n`;    
info += `▸ ${prefix}mikasa\n`;             
info += `▸ ${prefix}miku\n`;     
info += `▸ ${prefix}minato\n`;
info += `▸ ${prefix}naruto\n`;
info += `▸ ${prefix}natsukawa\n`;
info += `▸ ${prefix}neko\n`;
info += `▸ ${prefix}nekonime\n`;
info += `▸ ${prefix}nezuko\n`;
info += `▸ ${prefix}nishimiya\n`;
info += `▸ ${prefix}onepiece\n`;
info += `▸ ${prefix}pokemon\n`;
info += `▸ ${prefix}ppcouple\n`;
info += `▸ ${prefix}rem\n`;
info += `▸ ${prefix}rize\n`;
info += `▸ ${prefix}sagiri\n`;
info += `▸ ${prefix}sakura\n`;
info += `▸ ${prefix}sasuke\n`;
info += `▸ ${prefix}shina\n`;
info += `▸ ${prefix}shinka\n`;
info += `▸ ${prefix}shizuka\n`;
info += `▸ ${prefix}shota\n`;
info += `▸ ${prefix}tomori\n`;
info += `▸ ${prefix}toukachan\n`;
info += `▸ ${prefix}tsunade\n`;
info += `▸ ${prefix}waifu\n`;
info += `▸ ${prefix}waifu2\n`; 
info += `▸ ${prefix}wallhp2\n`;
info += `▸ ${prefix}yatogami\n`;    
info += `▸ ${prefix}yuki\n`;
info += `▸ ${prefix}yuri\n`;
info += `▸ ${prefix}animepat\n`;
info += `▸ ${prefix}animeslap\n`;
info += `▸ ${prefix}animecuddle\n`;
info += `▸ ${prefix}animenom\n`;
info += `▸ ${prefix}animefoxgirl\n`;
info += `▸ ${prefix}animetickle\n`;
info += `▸ ${prefix}animegecg\n`;
info += `▸ ${prefix}dogwoof\n`;
info += `▸ ${prefix}8ballpool\n`;
info += `▸ ${prefix}goosebird\n`;
info += `▸ ${prefix}animefeed\n`;
info += `▸ ${prefix}animeavatar\n`;
info += `▸ ${prefix}lizardpic\n`;
info += `▸ ${prefix}catmeow\n`;
info += `▸ ${prefix}animewlp\n`;
info += `▸ ${prefix}animehug\n`;
info += `▸ ${prefix}animekiss\n`;
info += `▸ ${prefix}randomhentai\n`;
info += `▸ ${prefix}randomwaifu\n\n`;
info += `SEARCH\n`;
info += `▸ ${prefix}ttsearch\n`;
info += `▸ ${prefix}murotal\n`;
info += `▸ ${prefix}alquran\n`;
info += `▸ ${prefix}bingimage\n`;
info += `▸ ${prefix}pinterest\n`;
info += `▸ ${prefix}xnxxsearch\n`;
info += `▸ ${prefix}xvideosearch\n`;
info += `▸ ${prefix}npmsearch\n`;
info += `▸ ${prefix}douyinsearch\n`;
info += `▸ ${prefix}spotifylirik\n`;
info += `▸ ${prefix}applemusicsearch\n`;
info += `▸ ${prefix}spotifysearch\n\n`;
info += `TOOLS\n`;
info += `▸ ${prefix}ocr\n`;
info += `▸ ${prefix}ssweb\n`;
info += `▸ ${prefix}skiplink\n`;
info += `▸ ${prefix}skiplink2\n`;
info += `▸ ${prefix}translate\n`;
info += `▸ ${prefix}kalkulator\n`;
info += `▸ ${prefix}bioskop\n`;
info += `▸ ${prefix}gempa\n`;
info += `▸ ${prefix}cuaca\n`;
info += `▸ ${prefix}brainly\n`;
info += `▸ ${prefix}spamotp\n`;
info += `▸ ${prefix}cekresi\n`;
info += `▸ ${prefix}kodepos\n`;
info += `▸ ${prefix}google\n`;
info += `▸ ${prefix}ceknik\n`;
info += `▸ ${prefix}nglsend\n`;
info += `▸ ${prefix}nglspam\n`;
info += `▸ ${prefix}artinama\n`;
info += `▸ ${prefix}artimimpi\n`;
info += `▸ ${prefix}ramaljodoh\n`;
info += `▸ ${prefix}ramaljodohbali\n`;
info += `▸ ${prefix}ramalcinta\n`;
info += `▸ ${prefix}cocoknama\n`;
info += `▸ ${prefix}pasangan\n`;
info += `▸ ${prefix}suamiistri\n`;
info += `▸ ${prefix}jadiannikah\n`;
info += `▸ ${prefix}sifatusaha\n`;
info += `▸ ${prefix}rezeki\n`;
info += `▸ ${prefix}pekerjaan\n`;
info += `▸ ${prefix}nasib\n`;
info += `▸ ${prefix}penyakit\n`;
info += `▸ ${prefix}tarot\n`;
info += `▸ ${prefix}fengshui\n`;
info += `▸ ${prefix}haribaik\n`;
info += `▸ ${prefix}harisangar\n`;
info += `▸ ${prefix}harisial\n`;
info += `▸ ${prefix}nagahari\n`;
info += `▸ ${prefix}arahrezeki\n`;
info += `▸ ${prefix}peruntungan\n`;
info += `▸ ${prefix}weton\n`;
info += `▸ ${prefix}karakter\n`;
info += `▸ ${prefix}keberuntungan\n`;
info += `▸ ${prefix}memancing\n`;
info += `▸ ${prefix}masabubur\n`;
info += `▸ ${prefix}zodiak\n`;
info += `▸ ${prefix}nglspam\n\n`;
info += `Panel\n`;
info += `▸ ${prefix}1gb-10gb\n`;
info += `▸ ${prefix}unlimited\n`;
info += `▸ ${prefix}addsrv\n`;
info += `▸ ${prefix}delsrv\n`;
info += `▸ ${prefix}addusr\n`;
info += `▸ ${prefix}listusr\n`;
info += `▸ ${prefix}suspend\n`;
info += `▸ ${prefix}unsespend\n`;
info += `▸ ${prefix}cadmin\n`;
info += `▸ ${prefix}delcadmin\n`;
info += `▸ ${prefix}listcadmin\n`;
info += `▸ ${prefix}maintenance\n`;
info += `▸ ${prefix}delmaintenance\n\n`;
info += `Maker\n`;
info += `▸ ${prefix}fakedana\n`;
info += `▸ ${prefix}fakegopay\n`;
info += `▸ ${prefix}fakeovo\n`;
info += `▸ ${prefix}fakektp\n`;
info += `▸ ${prefix}faketwit\n`;
info += `▸ ${prefix}fakewafat\n`;
info += `▸ ${prefix}fakecallandro\n`;
info += `▸ ${prefix}fakecallios\n`;
info += `▸ ${prefix}fakebankjago\n`;
info += `▸ ${prefix}fakevideo\n`;
info += `▸ ${prefix}fakeimage\n`;
info += `▸ ${prefix}fakesticker\n`;
info += `▸ ${prefix}fakevn\n`;
info += `▸ ${prefix}fakeff\n`;
info += `▸ ${prefix}fakedj\n`;
info += `▸ ${prefix}faketele\n`;
info += `▸ ${prefix}fakech\n`;
info += `▸ ${prefix}fakegc\n`;
info += `▸ ${prefix}fakebca\n`;
info += `▸ ${prefix}fakedev\n`;
info += `▸ ${prefix}fakedev2\n`;
info += `▸ ${prefix}fakedev3\n`;
info += `▸ ${prefix}notastruk\n`;
info += `▸ ${prefix}fakejuaraml\n`;
info += `▸ ${prefix}mvl\n`;
info += `▸ ${prefix}suratsakit\n`;
info += `▸ ${prefix}fakeundangan\n`;
info += `▸ ${prefix}noteig\n`;
info += `▸ ${prefix}carbonify\n`;
info += `▸ ${prefix}pornhub\n`;
info += `▸ ${prefix}comic\n`;
info += `▸ ${prefix}balogo\n`;
info += `▸ ${prefix}carbonify\n`;
info += `▸ ${prefix}wolf-galaxy\n`;
info += `▸ ${prefix}write-grafitty\n`;
info += `▸ ${prefix}wetglass\n`;
info += `▸ ${prefix}typogrpahy\n`;
info += `▸ ${prefix}pixel-glitch\n`;
info += `▸ ${prefix}pavement\n`;
info += `▸ ${prefix}painting\n`;
info += `▸ ${prefix}naruto\n`;
info += `▸ ${prefix}mascot\n`;
info += `▸ ${prefix}marvel\n`;
info += `▸ ${prefix}glitch\n`;
info += `▸ ${prefix}devil-wings\n`;
info += `▸ ${prefix}dragonball\n`;
info += `▸ ${prefix}foggy-glass\n`;
info += `▸ ${prefix}bear\n`;
info += `▸ ${prefix}blackpink\n`;
info += `▸ ${prefix}avenger\n\n`;
info += `GAME\n`;
info += `▸ ${prefix}maths\n`;
info += `▸ ${prefix}ceksifat\n`;
info += `▸ ${prefix}asahotak\n`;
info += `▸ ${prefix}tekateki\n`;
info += `▸ ${prefix}siapaaku\n`;
info += `▸ ${prefix}mathquiz\n`;
info += `▸ ${prefix}family100\n`;
info += `▸ ${prefix}caklontong\n`;
info += `▸ ${prefix}tebakff\n`;
info += `▸ ${prefix}tebaktt\n`;
info += `▸ ${prefix}tebakkata\n`;
info += `▸ ${prefix}tebakumur\n`;
info += `▸ ${prefix}tebakjodoh\n`;
info += `▸ ${prefix}tebakprofesi\n`;
info += `▸ ${prefix}tebakukuranbh\n`;
info += `▸ ${prefix}tebakkontol\n`;
info += `▸ ${prefix}tebaknikah\n`;
info += `▸ ${prefix}tebakcoli\n`;
info += `▸ ${prefix}tebakmati\n`;
info += `▸ ${prefix}tebakstatus\n`;
info += `▸ ${prefix}tebakjkt48\n`;
info += `▸ ${prefix}tebakheroml\n`;
info += `▸ ${prefix}tebakhewan\n`;
info += `▸ ${prefix}cerdascermat\n`;
info += `▸ ${prefix}tebakgambar\n`;
info += `▸ ${prefix}tebakkata\n`; 
info += `▸ ${prefix}tebaktebakan\n`;
info += `▸ ${prefix}tebakkartun\n`;
info += `▸ ${prefix}tebakkimia\n`;
info += `▸ ${prefix}tebakwarna\n`;
info += `▸ ${prefix}tebakheroml\n`;
info += `▸ ${prefix}tebaklagu\n`;
info += `▸ ${prefix}tebakbendera\n`;
info += `▸ ${prefix}tebakbenderav2\n`;
info += `▸ ${prefix}cerdascermat\n`;
info += `▸ ${prefix}sambungkata\n`;
info += `▸ ${prefix}tebakanime\n`;
info += `▸ ${prefix}tebakpemainbola\n`;
info += `▸ ${prefix}tebakgame\n`;
info += `▸ ${prefix}tebaksurah\n`;
info += `▸ ${prefix}tebaktebakan\n`;
info += `▸ ${prefix}susunkata\n`;
info += `▸ ${prefix}tebakkalimat\n`;
info += `▸ ${prefix}tebaklirik\n`;
info += `▸ ${prefix}tictactoe\n`;
info += `▸ ${prefix}tebakbom\n`;
info += `▸ ${prefix}cekkodam\n`;
info += `▸ ${prefix}yatim\n`;
info += `▸ ${prefix}piatu\n`;
info += `▸ ${prefix}jomblo\n`;
info += `▸ ${prefix}waria\n`;
info += `▸ ${prefix}koruptor\n`;
info += `▸ ${prefix}psikopat\n`;
info += `▸ ${prefix}pedofil\n`;
info += `▸ ${prefix}miskin\n`;
info += `▸ ${prefix}tukangjajan\n`;
info += `▸ ${prefix}jelek\n`;
info += `▸ ${prefix}mokondo\n`;
info += `▸ ${prefix}penipu\n`;
info += `▸ ${prefix}tukangcopet\n`;
info += `▸ ${prefix}tukangbo\n`;
info += `▸ ${prefix}tukangcoli\n`;
info += `▸ ${prefix}tukangkawin\n`;
info += `▸ ${prefix}ganteng\n`;
info += `▸ ${prefix}cantik\n`;
info += `▸ ${prefix}tobrut\n`;
info += `▸ ${prefix}kurus\n`;
info += `▸ ${prefix}maling\n`;
info += `▸ ${prefix}kontolgede\n`;
info += `▸ ${prefix}tepos\n`;
info += `▸ ${prefix}pelakor\n`;
info += `▸ ${prefix}jomblo\n`;
info += `▸ ${prefix}korbanhts\n`;
info += `▸ ${prefix}badut\n`;
info += `▸ ${prefix}perampok\n`;
info += `▸ ${prefix}begal\n`;
info += `▸ ${prefix}wibu\n`;
info += `▸ ${prefix}janda\n`;
info += `▸ ${prefix}jodohku\n`; 
info += `▸ ${prefix}cekyatim\n`;
info += `▸ ${prefix}cekjelek\n`;
info += `▸ ${prefix}cekjodoh\n`;
info += `▸ ${prefix}cekmemek\n`;
info += `▸ ${prefix}cekkontol\n`;
info += `▸ ${prefix}cekmiskin\n`;
info += `▸ ${prefix}cekkaya\n`;
info += `▸ ${prefix}cektolol\n`;
info += `▸ ${prefix}ceknamabapak\n`;
info += `▸ ${prefix}cekwibu\n`;
info += `▸ ${prefix}dapatkah\n`;
info += `▸ ${prefix}apakah\n`;
info += `▸ ${prefix}bagaimana\n`; 
info += `▸ ${prefix}rate\n`;
info += `▸ ${prefix}when\n\n`;
info += `OWNER\n`;
info += `▸ ${prefix}addcase\n`;
info += `▸ ${prefix}delcase\n`;
info += `▸ ${prefix}listcase\n`;
info += `▸ ${prefix}listcase\n`;
info += `▸ ${prefix}botafk\n`;
info += `▸ ${prefix}banchat\n`;
info += `▸ ${prefix}addplugin\n`;
info += `▸ ${prefix}delplugin\n`;
info += `▸ ${prefix}setprefix\n`;
info += `▸ ${prefix}getplugin\n`;
info += `▸ ${prefix}listplugin\n`;
info += `▸ ${prefix}addsewa\n`;
info += `▸ ${prefix}delsewa\n`;
info += `▸ ${prefix}listsewa\n`;
info += `▸ ${prefix}addprem\n`;
info += `▸ ${prefix}delprem\n`;
info += `▸ ${prefix}listprem\n`;
info += `▸ ${prefix}addowner\n`;
info += `▸ ${prefix}delowner\n`;
info += `▸ ${prefix}listowner\n`;
info += `▸ ${prefix}upswteks\n`;
info += `▸ ${prefix}upswvn\n`;
info += `▸ ${prefix}swhdimage\n`;
info += `▸ ${prefix}swhdvideo\n`;
info += `▸ ${prefix}backupsc\n`;
info += `▸ ${prefix}autotyping\n`;
info += `▸ ${prefix}autoread\n`;
info += `▸ ${prefix}autoreadsw\n`;
info += `▸ ${prefix}onlygcprivate\n`;
info += `▸ ${prefix}onlygc\n`;
info += `▸ ${prefix}setppbot\n`;
info += `▸ ${prefix}restarbot\n`;
info += `▸ ${prefix}clearchat\n`;
info += `▸ ${prefix}npm\n`;
info += `▸ ${prefix}jpm\n`;
info += `▸ ${prefix}jpmht\n`;
info += `▸ ${prefix}jpmstatus\n`;
info += `▸ ${prefix}addgb\n`;
info += `▸ ${prefix}delgb\n`;
info += `▸ ${prefix}listgb\n`;
info += `▸ ${prefix}upswgc\n`;
info += `▸ ${prefix}stopbot\n`;
info += `▸ ${prefix}cleardb\n`;
info += `▸ ${prefix}fetch\n`;
info += `▸ ${prefix}get\n`;
info += `▸ ${prefix}crm\n`;
info += `▸ ${prefix}restart\n`;
info += `▸ ${prefix}self\n`;
info += `▸ ${prefix}public\n\n`;
info += `© ${global.namaowner}\`\`\``;
const content = {
buttonsMessage: {
buttons: [
{
buttonId: `${prefix}listmenu`,
buttonText: { displayText: 'LIST MENU' },
type: 1
},
{
buttonId: `${prefix}menu`,
buttonText: { displayText: 'MENU UTAMA' },
type: 1
}
],
locationMessage: {
jpegThumbnail: resizedBuffer,
name: global.namaBot,
address: `${global.namaBot}`
},
contentText: info,
footerText: `©${global.namaowner}`,
headerType: 6,
},
};
const msg = generateWAMessageFromContent(from, content, {
userJid: satanic.user.jid,
});
await satanic.relayMessage(from, msg.message, {
messageId: msg.key.id,
});
} catch (e) {
console.error(e);
reply('Terjadi kesalahan.');
}
break;
case 'notastruk': {
    const { createCanvas, loadImage } = require('@napi-rs/canvas')
    const moment = require('moment-timezone')

    const escapeXml = (value) => {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;')
    }

    const SCALE = 3

    const BASE_WIDTH = 380
    const PADDING = 18
    const ITEM_HEIGHT = 36

    const CANVAS_WIDTH = BASE_WIDTH * SCALE
    const SCALED_PADDING = PADDING * SCALE
    const SCALED_ITEM_HEIGHT = ITEM_HEIGHT * SCALE

    try {
        if (!text) {
            return reply(
                `Format:\n` +
                `${prefix + command} nama produk|harga|jumlah\n\n` +
                `Bisa multiple produk (pisah pakai koma):\n` +
                `${prefix + command} Kopi Susu|15000|2, Roti Bakar|10000|1\n\n` +
                `Contoh simpel:\n` +
                `${prefix + command} Nasi Goreng|20000|1`
            )
        }

        const itemsRaw = text.split(',').map(v => v.trim()).filter(Boolean)
        const items = []

        for (const item of itemsRaw) {
            const parts = item.split('|').map(v => v.trim())
            if (parts.length < 3) {
                return reply(`Format item salah: "${item}"\nGunakan: nama|harga|jumlah`)
            }

            const nama = parts[0]
            const harga = parseInt(parts[1].replace(/[^\d]/g, ''))
            const jumlah = parseInt(parts[2].replace(/[^\d]/g, ''))

            if (!nama || isNaN(harga) || isNaN(jumlah) || harga <= 0 || jumlah <= 0) {
                return reply(`Data tidak valid: "${item}"`)
            }

            items.push({ nama, harga, jumlah, subtotal: harga * jumlah })
        }

        await satanic.sendMessage(m.chat, { react: { text: "🕕", key: m.key } })

        const now = moment().tz('Asia/Jakarta')
        const tanggal = now.format('DD/MM/YYYY')
        const jam = now.format('HH:mm:ss')
        const hariID = {
            0: 'Minggu', 1: 'Senin', 2: 'Selasa', 3: 'Rabu',
            4: 'Kamis', 5: 'Jumat', 6: 'Sabtu'
        }[now.day()]

        const noStruk = now.format('YYMMDDHHmmss')
        const kasir = (m.pushName || 'Kasir').substring(0, 12).toUpperCase()
        const noKasir = String(Math.floor(Math.random() * 9) + 1).padStart(2, '0')
        const noTransaksi = now.format('DDMMYY') + String(Math.floor(Math.random() * 9000) + 1000)

        const total = items.reduce((a, b) => a + b.subtotal, 0)
        const itemCount = items.reduce((a, b) => a + b.jumlah, 0)

        const pembulatan = Math.ceil(total / 100) * 100
        const diskon = pembulatan - total
        const ppn = Math.round(total * 0.11)
        const grandTotal = total + ppn

        const formatRupiah = (n) => n.toLocaleString('id-ID')

        const storeName = global.namastore || 'TOKO SATANIC'
        const storeSlogan = global.sloganstore || 'Melayani Dengan Hati'
        const storeAlamat = global.alamatstore || 'JL. RAYA JAKARTA NO. 123'
        const storeNohp = global.nohpstore || '021-1234567'
        const storeEmail = global.emailstore || 'cs@satanicstore.com'
        const storeNpwp = global.npwpstore || '01.234.567.8-901.000'
        const storeWebsite = global.websitestore || 'www.satanicstore.com'
        const storeFooter = global.footerstore || 'MELAYANI DENGAN HATI'

        const HEADER_HEIGHT = 250 * SCALE
        const FOOTER_HEIGHT = 340 * SCALE
        const canvasHeight = HEADER_HEIGHT + (items.length * SCALED_ITEM_HEIGHT) + FOOTER_HEIGHT

        const F = (n) => Math.round(n * SCALE)

        let itemsSvg = ''
        let yPos = HEADER_HEIGHT + F(15)
        for (const item of items) {
            itemsSvg += `
                <text x="${SCALED_PADDING}" y="${yPos}" font-family="monospace" font-size="${F(12)}" fill="#000">${escapeXml(item.nama)}</text>
                <text x="${CANVAS_WIDTH - SCALED_PADDING}" y="${yPos}" text-anchor="end" font-family="monospace" font-size="${F(12)}" fill="#000">${formatRupiah(item.subtotal)}</text>
                <text x="${SCALED_PADDING}" y="${yPos + F(15)}" font-family="monospace" font-size="${F(10)}" fill="#000">${item.jumlah} x ${formatRupiah(item.harga)}</text>
            `
            yPos += SCALED_ITEM_HEIGHT
        }

        const footerY = HEADER_HEIGHT + (items.length * SCALED_ITEM_HEIGHT) + F(10)

        const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS_WIDTH}" height="${canvasHeight}" viewBox="0 0 ${CANVAS_WIDTH} ${canvasHeight}">
            <rect width="${CANVAS_WIDTH}" height="${canvasHeight}" fill="#ffffff"/>

            <text x="${CANVAS_WIDTH / 2}" y="${F(30)}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${F(22)}" font-weight="bold" fill="#000">${escapeXml(storeName.toUpperCase())}</text>
            <text x="${CANVAS_WIDTH / 2}" y="${F(46)}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${F(9)}" fill="#000">${escapeXml(storeSlogan)}</text>

            <text x="${SCALED_PADDING}" y="${F(75)}" font-family="monospace" font-size="${F(11)}" fill="#000">${escapeXml(storeAlamat)}</text>
            <text x="${SCALED_PADDING}" y="${F(90)}" font-family="monospace" font-size="${F(10)}" fill="#000">TELP: ${escapeXml(storeNohp)}</text>
            <text x="${SCALED_PADDING}" y="${F(104)}" font-family="monospace" font-size="${F(10)}" fill="#000">EMAIL: ${escapeXml(storeEmail)}</text>
            <text x="${SCALED_PADDING}" y="${F(118)}" font-family="monospace" font-size="${F(10)}" fill="#000">NPWP: ${escapeXml(storeNpwp)}</text>

            <text x="${CANVAS_WIDTH / 2}" y="${F(137)}" text-anchor="middle" font-family="monospace" font-size="${F(10)}" fill="#000">------------------------------------------</text>

            <text x="${SCALED_PADDING}" y="${F(155)}" font-family="monospace" font-size="${F(10)}" fill="#000">No. Transaksi</text>
            <text x="${CANVAS_WIDTH - SCALED_PADDING}" y="${F(155)}" text-anchor="end" font-family="monospace" font-size="${F(10)}" fill="#000">${escapeXml(noTransaksi)}</text>

            <text x="${SCALED_PADDING}" y="${F(170)}" font-family="monospace" font-size="${F(10)}" fill="#000">Kasir</text>
            <text x="${CANVAS_WIDTH - SCALED_PADDING}" y="${F(170)}" text-anchor="end" font-family="monospace" font-size="${F(10)}" fill="#000">${escapeXml(kasir)} (${noKasir})</text>

            <text x="${SCALED_PADDING}" y="${F(185)}" font-family="monospace" font-size="${F(10)}" fill="#000">${escapeXml(hariID)}, ${escapeXml(tanggal)}</text>
            <text x="${CANVAS_WIDTH - SCALED_PADDING}" y="${F(185)}" text-anchor="end" font-family="monospace" font-size="${F(10)}" fill="#000">${escapeXml(jam)}</text>

            <text x="${CANVAS_WIDTH / 2}" y="${F(202)}" text-anchor="middle" font-family="monospace" font-size="${F(10)}" fill="#000">==========================================</text>

            <text x="${SCALED_PADDING}" y="${F(220)}" font-family="monospace" font-size="${F(10)}" font-weight="bold" fill="#000">ITEM</text>
            <text x="${CANVAS_WIDTH - SCALED_PADDING}" y="${F(220)}" text-anchor="end" font-family="monospace" font-size="${F(10)}" font-weight="bold" fill="#000">TOTAL</text>

            <text x="${CANVAS_WIDTH / 2}" y="${F(234)}" text-anchor="middle" font-family="monospace" font-size="${F(10)}" fill="#000">------------------------------------------</text>

            ${itemsSvg}

            <text x="${CANVAS_WIDTH / 2}" y="${footerY}" text-anchor="middle" font-family="monospace" font-size="${F(10)}" fill="#000">------------------------------------------</text>

            <text x="${SCALED_PADDING}" y="${footerY + F(18)}" font-family="monospace" font-size="${F(11)}" fill="#000">Total Item</text>
            <text x="${CANVAS_WIDTH - SCALED_PADDING}" y="${footerY + F(18)}" text-anchor="end" font-family="monospace" font-size="${F(11)}" fill="#000">${itemCount}</text>

            <text x="${SCALED_PADDING}" y="${footerY + F(35)}" font-family="monospace" font-size="${F(11)}" fill="#000">Subtotal</text>
            <text x="${CANVAS_WIDTH - SCALED_PADDING}" y="${footerY + F(35)}" text-anchor="end" font-family="monospace" font-size="${F(11)}" fill="#000">${formatRupiah(total)}</text>

            <text x="${SCALED_PADDING}" y="${footerY + F(52)}" font-family="monospace" font-size="${F(11)}" fill="#000">Pembulatan</text>
            <text x="${CANVAS_WIDTH - SCALED_PADDING}" y="${footerY + F(52)}" text-anchor="end" font-family="monospace" font-size="${F(11)}" fill="#000">${formatRupiah(diskon)}</text>

            <text x="${CANVAS_WIDTH / 2}" y="${footerY + F(68)}" text-anchor="middle" font-family="monospace" font-size="${F(10)}" fill="#000">------------------------------------------</text>

            <text x="${SCALED_PADDING}" y="${footerY + F(90)}" font-family="monospace" font-size="${F(14)}" font-weight="bold" fill="#000">TOTAL</text>
            <text x="${CANVAS_WIDTH - SCALED_PADDING}" y="${footerY + F(90)}" text-anchor="end" font-family="monospace" font-size="${F(14)}" font-weight="bold" fill="#000">${formatRupiah(grandTotal)}</text>

            <text x="${CANVAS_WIDTH / 2}" y="${footerY + F(110)}" text-anchor="middle" font-family="monospace" font-size="${F(10)}" fill="#000">==========================================</text>

            <text x="${CANVAS_WIDTH / 2}" y="${footerY + F(135)}" text-anchor="middle" font-family="monospace" font-size="${F(11)}" font-weight="bold" fill="#000">TERIMA KASIH</text>
            <text x="${CANVAS_WIDTH / 2}" y="${footerY + F(152)}" text-anchor="middle" font-family="monospace" font-size="${F(10)}" fill="#000">SELAMAT BERBELANJA KEMBALI</text>

            <text x="${CANVAS_WIDTH / 2}" y="${footerY + F(175)}" text-anchor="middle" font-family="monospace" font-size="${F(9)}" fill="#000">Barang yang sudah dibeli</text>
            <text x="${CANVAS_WIDTH / 2}" y="${footerY + F(188)}" text-anchor="middle" font-family="monospace" font-size="${F(9)}" fill="#000">tidak dapat dikembalikan</text>

            <text x="${CANVAS_WIDTH / 2}" y="${footerY + F(215)}" text-anchor="middle" font-family="monospace" font-size="${F(9)}" fill="#000">${escapeXml(noStruk)}</text>

            <text x="${CANVAS_WIDTH / 2}" y="${footerY + F(240)}" text-anchor="middle" font-family="monospace" font-size="${F(10)}" fill="#000">${escapeXml(storeWebsite)}</text>

            <text x="${CANVAS_WIDTH / 2}" y="${canvasHeight - F(15)}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${F(10)}" fill="#000">${escapeXml(storeName.toUpperCase())} - ${escapeXml(storeFooter)}</text>
        </svg>`

        const templatestruk = await loadImage(Buffer.from(svg))
        const canvasstruk = createCanvas(templatestruk.width, templatestruk.height)
        const ctxstruk = canvasstruk.getContext('2d')
        ctxstruk.imageSmoothingEnabled = true
        ctxstruk.imageSmoothingQuality = 'high'
        ctxstruk.drawImage(templatestruk, 0, 0)

        const bufferstruk = await canvasstruk.encode('png')

        await satanic.sendMessage(m.chat, {
            image: bufferstruk,
            caption: `Struk Belanja\n\nTotal: Rp ${formatRupiah(grandTotal)}\n${hariID}, ${tanggal} - ${jam} WIB`
        }, { quoted: m })

        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

    } catch (err) {
        console.error('Error in notastruk:', err)
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        reply('Terjadi kesalahan teknis saat memproses gambar.')
    }
}
break
case 'upswtext':
case 'upswteks':
if (!isCreator) return;
if (!text) return reply('Text?');
await satanic.sendMessage('status@broadcast', { text: text }, { backgroundColor: '#FF000000', font: 3, statusJidList: Object.keys(global.db.users) });
reply('done');
break;
case 'swhdvideo':
case 'swhdvid':
case 'upswvideo':
const quotedVid = m.quoted ? m.quoted : m;
const mimeVid = (quotedVid.msg || quotedVid).mimetype || '';
if (!isCreator) return;
if (!text) return reply('Text?');
if (/video/.test(mimeVid)) {
var videosw = await satanic.downloadAndSaveMediaMessage(quotedVid);
await satanic.sendMessage('status@broadcast', { video: { url: videosw }, caption: text ? text : '' }, { statusJidList: Object.keys(global.db.users) });
reply('done');
} else {
reply('Reply to video');
}
break;
case 'swhdimg':
case 'swhdimage':
case 'upswimg':
const quotedImg = m.quoted ? m.quoted : m;
const mimeImg = (quotedImg.msg || quotedImg).mimetype || '';
if (!isCreator) return;
if (!text) return reply('Text?');
if (/image/.test(mimeImg)) {
var imagesw = await satanic.downloadAndSaveMediaMessage(quotedImg);
await satanic.sendMessage('status@broadcast', { image: { url: imagesw }, caption: text ? text : '' }, { statusJidList: Object.keys(global.db.users) });
reply('done');
} else {
reply('Reply to image');
}
break;
case 'statusaudio':
case 'upswaudio':
const quotedAud = m.quoted ? m.quoted : m;
const mimeAud = (quotedAud.msg || quotedAud).mimetype || '';
if (!isCreator) return;
if (!text) return reply('Text?');
if (/audio/.test(mimeAud)) {
var audiosw = await satanic.downloadAndSaveMediaMessage(quotedAud);
await satanic.sendMessage('status@broadcast', { audio: { url: audiosw }, mimetype: 'audio/mp4', ptt: true }, { backgroundColor: '#FF000000', statusJidList: Object.keys(global.db.users) });
reply('done');
} else {
reply('Reply to audio');
}
break;
case 'colongsw':
if (m.quoted?.chat != 'status@broadcast') return reply('Quote Pesan Status');
try {
let buffer = await m.quoted.download();
let mediaType = m.quoted.mtype;
if (mediaType === 'imageMessage') {
await satanic.sendMessage(m.chat, { image: buffer }, { quoted: fkontak });
} else if (mediaType === 'videoMessage') {
await satanic.sendMessage(m.chat, { video: buffer }, { quoted: fkontak });
} else {
await reply(m.chat, m.quoted.text, m);
}
} catch (e) {
console.log(e);
await reply(m.chat, m.quoted.text, m);
}
break;
case 'bioskop':
case 'cinema':
async function cinema() {
try {
const response = await axios.get('https://21cineplex.com/');
const html = response.data;
const $ = cheerio.load(html);
const results = [];
$('.col-3 .movie').each((index, element) => {
const movieTitle = $(element).find('.movie-desc h4').text().trim();
const movieLabel = $(element).find('.movie-desc span.movie-label img').attr('src');
const moviePoster = $(element).find('.movie-poster img').attr('src');
const movieLink = $(element).find('a').attr('href');
const data = {
title: movieTitle,
label: movieLabel,
poster: moviePoster,
link: movieLink
};
results.push(data);
});
return results;
} catch (error) {
console.error(error);
return [];
}
}
try {
const wait = await reply('Loading film...');
const films = await cinema();
if (!films || films.length === 0) {
if (wait && wait.key) {
try { await satanic.sendMessage(m.chat, { delete: wait.key }); } catch(e) {}
}
return reply('Film tidak ditemukan');
}
if (wait && wait.key) {
try { await satanic.sendMessage(m.chat, { delete: wait.key }); } catch(e) {}
}
let list = `FILM BIOSKOP TERBARU\n\n`;
films.slice(0, 50).forEach((film, i) => {
list += `${i+1}. ${film.title}\n`;
});
list += `\n${films.length} film tersedia\nhttps://21cineplex.com`;
await satanic.sendMessage(m.chat, { text: list }, { quoted: fkontak });
} catch (error) {
console.error(error);
reply('Error');
}
break;
case 'gempa': {
    try {
        await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

        const apiUrlgempa = `https://free-restapi.biz.id/api/gempa?apikey=${global.sakey}`

        const reqgempa = await axios.get(apiUrlgempa, { timeout: 30000 })
        const datagempa = reqgempa.data

        if (!datagempa?.result?.success || !datagempa?.result?.data?.gempa_terkini) {
            throw new Error('Data gempa tidak tersedia')
        }

        const listgempa = datagempa.result.data.gempa_terkini
        const infogempa = datagempa.result.data.info
        const update = new Date(datagempa.result.data.last_update).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })

        let teksgempa = `INFO GEMPA TERKINI\n`
        teksgempa += `Sumber: ${infogempa.sumber}\n`
        teksgempa += `Update: ${update}\n`
        teksgempa += `Total: ${datagempa.result.data.total} gempa\n`
        teksgempa += `────────────────────\n\n`

        listgempa.slice(0, 10).forEach((g, i) => {
            teksgempa += `${i + 1}. M${g.magnitudo} - ${g.wilayah}\n`
            teksgempa += `   Tanggal: ${g.tanggal} | ${g.waktu}\n`
            teksgempa += `   Koordinat: ${g.koordinat}\n`
            teksgempa += `   Kedalaman: ${g.kedalaman}\n`
            teksgempa += `   Status: ${g.status}\n\n`
        })

        teksgempa += `────────────────────\n`
        teksgempa += `Website: ${infogempa.website}`

        await reply(teksgempa)

        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

    } catch (e) {
        console.error('Error in gempa:', e)
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        reply('Gagal mengambil data gempa: ' + (e.message || 'Terjadi kesalahan'))
    }
}
break
case 'cuaca': {
    try {
        if (!text) return reply(`Masukkan nama kota!\n\nContoh:\n${prefix + command} lampung`)

        await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

        const apiUrlcuaca = `https://free-restapi.biz.id/api/cuaca?kota=${encodeURIComponent(text)}&apikey=${global.sakey}`

        const reqcuaca = await axios.get(apiUrlcuaca, { timeout: 30000 })
        const datacuaca = reqcuaca.data

        if (!datacuaca?.result?.success) {
            throw new Error('Kota tidak ditemukan')
        }

        const c = datacuaca.result

        let tekscuaca = `INFO CUACA\n`
        tekscuaca += `────────────────────\n`
        tekscuaca += `Kota: ${c.kota}\n`
        tekscuaca += `Negara: ${c.negara}\n`
        tekscuaca += `Koordinat: ${c.lat}, ${c.lon}\n`
        tekscuaca += `────────────────────\n`
        tekscuaca += `Kondisi: ${c.kondisi}\n`
        tekscuaca += `Suhu: ${c.suhu}\n`
        tekscuaca += `Terasa: ${c.terasa}\n`
        tekscuaca += `Min/Max: ${c.min} / ${c.max}\n`
        tekscuaca += `Kelembaban: ${c.kelembaban}\n`
        tekscuaca += `Tekanan: ${c.tekanan}\n`
        tekscuaca += `Angin: ${c.kecepatan} (${c.arah})\n`
        tekscuaca += `Visibility: ${c.visibility}\n`
        tekscuaca += `Awan: ${c.clouds}\n`
        tekscuaca += `────────────────────\n`
        tekscuaca += `Terbit: ${c.terbit}\n`
        tekscuaca += `Terbenam: ${c.terbenam}\n`
        tekscuaca += `Update: ${c.update}`

        await reply(tekscuaca)

        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

    } catch (e) {
        console.error('Error in cuaca:', e)
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        reply('Gagal mengambil data cuaca: ' + (e.message || 'Terjadi kesalahan'))
    }
}
break
case 'setqris':
const fsQris = require('fs');
const qrisPath = './database/qris.json';
if (!global.owner.includes(m.sender.split('@')[0])) {
return reply('Khusus owner.');
}
const quotedQris = m.quoted ? m.quoted : m;
const mimeQris = (quotedQris.msg || quotedQris).mimetype || '';
let imageUrl = '';
if (/image/.test(mimeQris)) {
try {
let mediaFile = await satanic.downloadAndSaveMediaMessage(quotedQris);
const mediaBuffer = fsQris.readFileSync(mediaFile);
const form = new FormData();
form.append('files[]', mediaBuffer, { filename: 'qris.jpg' });
const uploadRes = await axios.post('https://pone.rs/upload.php', form, {
headers: {
...form.getHeaders(),
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36',
'Referer': 'https://pone.rs/',
'Origin': 'https://pone.rs'
},
maxBodyLength: Infinity,
maxContentLength: Infinity
});
if (!uploadRes.data?.success || !uploadRes.data?.files?.[0]?.url) {
return reply('Gagal upload gambar ke pone.rs.');
}
imageUrl = uploadRes.data.files[0].url.replace(/\\\//g, '/');
if (fsQris.existsSync(mediaFile)) fsQris.unlinkSync(mediaFile);
} catch (err) {
console.error(err);
return reply('Gagal upload gambar: ' + err.message);
}
} else if (args[0]) {
imageUrl = args[0];
} else {
return reply('Cara:\nReply gambar QRIS lalu ketik .setqris\nAtau .setqris [url_gambar]');
}
if (!fsQris.existsSync('./database')) {
fsQris.mkdirSync('./database', { recursive: true });
}
fsQris.writeFileSync(qrisPath, JSON.stringify({ url: imageUrl }, null, 2));
reply('QRIS berhasil disimpan permanen!\n\nKetik .qris untuk melihat.');
break;
case 'qris':
try {
const fsQrisView = require('fs');
const qrisPathView = './database/qris.json';
let qrisUrl = '';
if (fsQrisView.existsSync(qrisPathView)) {
const data = JSON.parse(fsQrisView.readFileSync(qrisPathView));
qrisUrl = data.url;
} else {
return reply('QRIS belum diatur. Ketik .setqris untuk mengatur QRIS.');
}
if (!qrisUrl || qrisUrl === '') {
return reply('URL QRIS kosong. Silakan set ulang dengan .setqris');
}
let txt = `PEMBAYARAN VIA QRIS\n\n`;
txt += `Scan QRIS di bawah untuk melakukan pembayaran\n\n`;
txt += `Setelah scan & bayar\n\n`;
txt += `Kirim bukti transfer ke owner\n\n`;
txt += `Klik tombol Konfirmasi Pembayaran`;
let buttons = [
{
name: 'cta_url',
buttonParamsJson: JSON.stringify({
display_text: 'Konfirmasi Bayar',
url: `https://wa.me/${global.owner}?text=Halo%20owner%2C%20saya%20sudah%20bayar`,
merchant_url: `https://wa.me/${global.owner}?text=Halo%20owner%2C%20saya%20sudah%20bayar`
})
}
];
const response = await axios.get(qrisUrl, { responseType: 'arraybuffer' });
const qrisBuffer = Buffer.from(response.data, 'binary');
await sendButton(from, txt, 'QRIS Payment', qrisBuffer, buttons, m);
} catch (e) {
console.error(e);
reply('Terjadi kesalahan saat mengambil QRIS.');
}
break;

case 'fakech':
if (!text) return reply(
 'Reply gambar dengan caption:\n' +
 '*.fakech nama|pengikut|jam*\n\n' +
 'Contoh:\n' +
 '.fakech Satan Ganz|1.2M|12:30'
)

const quotedch = m.quoted ? m.quoted : m
const mimech = (quotedch.msg || quotedch).mimetype || ''

if (!/image/.test(mimech)) return reply('❌ Reply gambar dengan caption .fakech nama|pengikut|jam')

await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

try {
 const pecahch = text.split('|').map(v => v.trim())

 if (pecahch.length < 3) {
 return reply(
 '⚠️ Format salah!\n\n' +
 'Pakai: *.fakech nama|pengikut|jam*\n' +
 'Contoh: .fakech Satan Ganz|1.2M|12:30'
 )
 }

 const namach = pecahch[0]
 const pengkutch = pecahch[1]
 const jamch = pecahch[2]

 if (!/^\d{1,2}:\d{2}$/.test(jamch)) {
 return reply('⚠️ Jam harus format HH:MM\nContoh: 12:30')
 }

 const mediach = await satanic.downloadAndSaveMediaMessage(quotedch)
 const uploadch = await UploadFileUgu(mediach)
 const avatarch = uploadch.url || uploadch

 const linkch = `https://free-restapi.biz.id/api/fakech?nama=${encodeURIComponent(namach)}&pengikut=${encodeURIComponent(pengkutch)}&jam=${encodeURIComponent(jamch)}&avatar=${encodeURIComponent(avatarch)}&apikey=${global.sakey}`

 const reqch = await axios({
 method: 'get',
 url: linkch,
 responseType: 'arraybuffer',
 timeout: 30000
 })

 const bufch = Buffer.from(reqch.data)

 await satanic.sendMessage(m.chat, {
 image: bufch,
 caption: `📢 *Fake Channel Sukses*\n\n` +
 `👤 Nama : ${namach}\n` +
 `👥 Pengikut : ${pengkutch}\n` +
 `🕒 Jam : ${jamch}`
 }, { quoted: fkontak })

 await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

} catch (e) {
 console.error('Error in fakech:', e)
 await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
 reply('❌ Gagal: ' + (e.message || 'Terjadi kesalahan'))
}
break
case 'fakegc': {
    try {
        if (!m.isGroup) return reply('Khusus grup!')

        let qgc = m.quoted ? m.quoted : m
        let mimegc = (qgc.msg || qgc).mimetype || ''

        if (!/image/.test(mimegc)) {
            return reply(`Kirim / reply gambar:\n\n${prefix + command} Nama Grup|Jumlah Anggota`)
        }

        let inputgc = text || m.caption || (m.quoted && m.quoted.caption) || ''
        let [namagc, jumlahgc] = inputgc.split('|')

        if (!namagc || !jumlahgc) {
            return reply(`Format salah!\n\nContoh:\n${prefix + command} Alya x Ryuusuke|100`)
        }

        await satanic.sendMessage(m.chat, { react: { text: "⏳", key: m.key } })

        const { Canvas, loadImage, FontLibrary } = require('skia-canvas')
        const twemoji = require('twemoji')

        FontLibrary.use('SF', ['./data/assets/FontsFree-Net-SFProDisplay-Regular.ttf'])
        FontLibrary.use('SF Bold', ['./data/assets/FontsFree-Net-SFProDisplay-Bold.ttf'])

        let mediagc = await qgc.download()
        let templategc = await loadImage('https://files.catbox.moe/qvtp4f.png')
        let avatargc = await loadImage(mediagc)

        const canvasgc = new Canvas(templategc.width, templategc.height)
        const ctxgc = canvasgc.getContext('2d')

        ctxgc.drawImage(templategc, 0, 0)

        let centerXgc = templategc.width / 2
        let centerYgc = 300
        let radiusgc = 120

        ctxgc.save()
        ctxgc.beginPath()
        ctxgc.arc(centerXgc, centerYgc, radiusgc, 0, Math.PI * 2)
        ctxgc.closePath()
        ctxgc.clip()
        ctxgc.imageSmoothingEnabled = true
        ctxgc.imageSmoothingQuality = 'high'
        ctxgc.drawImage(avatargc, centerXgc - radiusgc, centerYgc - radiusgc, radiusgc * 2, radiusgc * 2)
        ctxgc.restore()

        ctxgc.shadowColor = "rgba(0,0,0,0.1)"
        ctxgc.shadowBlur = 5

        async function drawTextWithEmojigc(ctx, text, y, size = 40, font = 'SF') {
            ctx.font = `${size}px "${font}"`
            const parsed = twemoji.parse(text, { folder: '72x72', ext: '.png' })
            let parts = parsed.split(/(<img[^>]+>)/g)

            let totalWidth = 0
            for (let part of parts) {
                if (part.startsWith('<img')) {
                    totalWidth += size
                } else {
                    totalWidth += ctx.measureText(part).width
                }
            }

            let x = centerXgc - totalWidth / 2
            for (let part of parts) {
                if (part.startsWith('<img')) {
                    let url = part.match(/src="([^"]+)"/)[1]
                    try {
                        let img = await loadImage(url)
                        ctx.drawImage(img, x, y - size + 8, size, size)
                    } catch (e) {}
                    x += size
                } else {
                    ctx.fillText(part, x, y)
                    x += ctx.measureText(part).width
                }
            }
        }

        ctxgc.fillStyle = '#ffffff'
        let wordsgc = namagc.trim().split(' ')
        let linesgc = []
        let linegc = ''
        ctxgc.font = '58px "SF Bold"'

        for (let word of wordsgc) {
            let test = linegc + word + ' '
            if (ctxgc.measureText(test).width > 600) {
                linesgc.push(linegc.trim())
                linegc = word + ' '
            } else {
                linegc = test
            }
        }
        linesgc.push(linegc.trim())

        let yStartgc = 480
        for (let i = 0; i < linesgc.length; i++) {
            await drawTextWithEmojigc(ctxgc, linesgc[i], yStartgc + (i * 65), 58, 'SF Bold')
        }

        ctxgc.fillStyle = '#b0b0b0'
        let yAnggotagc = yStartgc + (linesgc.length * 60)
        await drawTextWithEmojigc(ctxgc, `Grup - ${jumlahgc.trim()} peserta`, yAnggotagc, 38, 'SF')

        let buffergc = await canvasgc.png

        await satanic.sendMessage(m.chat, {
            image: buffergc,
            caption: `iPhone Group Info\n\n${namagc}`
        }, { quoted: m })

        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

    } catch (err) {
        console.error(err)
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        reply('Terjadi kesalahan teknis saat memproses gambar.')
    }
}
break


case 'fakedev': {
 const { Canvas, loadImage, FontLibrary } = require('skia-canvas')

 FontLibrary.use('SF Bold', ['./data/assets/FontsFree-Net-SFProDisplay-Bold.ttf'])

 try {
 if (!text) {
 return reply(`❌ Contoh penggunaan:\n${prefix + command} Ryuusuke`)
 }

 await satanic.sendMessage(m.chat, { react: { text: "⏳", key: m.key } })

 let userdev = m.quoted ? m.quoted.sender : m.sender

 const loadImageSafedev = async (url) => {
 try {
 const resdev = await axios.get(url, {
 responseType: 'arraybuffer',
 timeout: 10000
 })
 return await loadImage(Buffer.from(resdev.data))
 } catch {
 return null
 }
 }

 let inputImagedev = null
 if (m.quoted && /image/.test(m.quoted.mimetype)) {
 try {
 const bufferdev = await m.quoted.download()
 inputImagedev = await loadImage(bufferdev)
 } catch {}
 }

 let ppdev = null
 try {
 ppdev = await satanic.profilePictureUrl(userdev, 'image')
 } catch {}

 const bgUrldev = 'https://c.termai.cc/i189/mfJahyH.jpg'
 const crownUrldev = 'https://files.catbox.moe/ionw8n.png'

 const defaultAvatardev = 'https://telegra.ph/file/6880771a42bad09dd6087.jpg'
 const defaultBgdev = 'https://telegra.ph/file/24fa902ead26340f3df2c.jpg'
 const defaultCrowndev = 'https://telegra.ph/file/2c0d2a0c1f6e6a2b1c3b4.png'

 let bgdev = await loadImageSafedev(bgUrldev) || await loadImageSafedev(defaultBgdev)
 let avatardev = inputImagedev || await loadImageSafedev(ppdev) || await loadImageSafedev(defaultAvatardev)
 let crowndev = await loadImageSafedev(crownUrldev) || await loadImageSafedev(defaultCrowndev)

 const canvasdev = new Canvas(800, 800)
 const ctxdev = canvasdev.getContext('2d')

 if (bgdev) {
 ctxdev.drawImage(bgdev, 0, 0, 800, 800)
 } else {
 ctxdev.fillStyle = "#000"
 ctxdev.fillRect(0, 0, 800, 800)
 }

 const centerXdev = 400
 const centerYdev = 360
 const radiusdev = 180

 ctxdev.beginPath()
 ctxdev.arc(centerXdev, centerYdev, radiusdev + 25, 0, Math.PI * 2)
 ctxdev.fillStyle = 'black'
 ctxdev.fill()

 if (avatardev) {
 ctxdev.save()
 ctxdev.beginPath()
 ctxdev.arc(centerXdev, centerYdev, radiusdev, 0, Math.PI * 2)
 ctxdev.clip()

 ctxdev.drawImage(
 avatardev,
 centerXdev - radiusdev,
 centerYdev - radiusdev,
 radiusdev * 2,
 radiusdev * 2
 )
 ctxdev.restore()
 }

 ctxdev.beginPath()
 ctxdev.arc(centerXdev, centerYdev, radiusdev + 5, 0, Math.PI * 2)
 ctxdev.lineWidth = 6
 ctxdev.strokeStyle = 'white'
 ctxdev.stroke()

 if (crowndev) {
 ctxdev.save()
 ctxdev.translate(centerXdev + 90, centerYdev - radiusdev - 20)
 ctxdev.rotate(0.3)
 ctxdev.drawImage(crowndev, -70, -70, 140, 110)
 ctxdev.restore()
 }

 const curvedTextdev = text.toUpperCase()
 const charsdev = curvedTextdev.split('')
 const lendev = charsdev.length

 ctxdev.font = 'bold 45px "SF Bold"'
 ctxdev.fillStyle = 'white'
 ctxdev.textAlign = 'center'
 ctxdev.textBaseline = 'bottom'

 const textRadiusdev = radiusdev + 55

 const maxArcdev = Math.PI * 0.7
 const dynamicArcdev = Math.min(maxArcdev, lendev * 0.18)

 const startAngledev = Math.PI / 2 + dynamicArcdev / 2
 const endAngledev = Math.PI / 2 - dynamicArcdev / 2

 for (let i = 0; i < lendev; i++) {
 const tdev = i / (lendev - 1 || 1)
 const angledev = startAngledev + (endAngledev - startAngledev) * tdev

 const xdev = centerXdev + Math.cos(angledev) * textRadiusdev
 const ydev = centerYdev + Math.sin(angledev) * textRadiusdev

 ctxdev.save()
 ctxdev.translate(xdev, ydev)
 ctxdev.rotate(angledev - Math.PI / 2)
 ctxdev.fillText(charsdev[i], 0, 0)
 ctxdev.restore()
 }

 let bufferdev = await canvasdev.png

 await satanic.sendMessage(m.chat, {
 image: bufferdev,
 caption: `🔥 Fakedev berhasil dibuat\n\n👤 Req by: @${userdev.split("@")[0]}`,
 mentions: [userdev]
 }, { quoted: m })

 await satanic.sendMessage(m.chat, { react: { text: "✅", key: m.key } })

 } catch (e) {
 console.log(e)
 await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
 reply('❌ Error bang 😅')
 }
}
break

case 'listcase': {
if (!isCreator) return reply('you are not owner')
const namaFile = 'satanic.js';
fs.readFile(namaFile, 'utf8', (err, data) => {
if (err) return reply('Gagal membaca file');
const matches = data.match(/case\s+'([^']+)'/g);
if (!matches || matches.length === 0) return reply('Tidak ada case ditemukan');
const listCase = matches.map((match, index) => {
const caseName = match.replace(/case\s+'([^']+)'/, '$1');
return `${index + 1}. ${caseName}`;
}).join('\n');
reply(`📋 *Daftar Case* (${matches.length} total)\n\n${listCase}`);
});
}
break
case 'addcase': {
if (!isCreator) return reply('you are not owner')
if (!text) return reply('Mana case nya');
const namaFile = 'satanic.js';
const caseBaru = `${text}`;
fs.readFile(namaFile, 'utf8', (err, data) => {
if (err) {
console.error('Terjadi kesalahan saat membaca file:', err);
return;
}
const posisiAwalGimage = data.indexOf("case 'addcase':");
if (posisiAwalGimage !== -1) {
const kodeBaruLengkap = data.slice(0, posisiAwalGimage) + '\n' + caseBaru + '\n' + data.slice(posisiAwalGimage);
fs.writeFile(namaFile, kodeBaruLengkap, 'utf8', (err) => {
if (err) {
reply('Terjadi kesalahan saat menulis file:', err);
} else {
reply('Case baru berhasil ditambahkan di atas case gimage.');
}
});
} else {
reply('Tidak dapat menemukan case gimage dalam file.');
}
});
}
break;        
case 'delcase': {
if (!isCreator) return
if (!text) return reply('Mana nama case-nya?');
const namaFile = 'satanic.js';
fs.readFile(namaFile, 'utf8', (err, data) => {
if (err) return reply('Gagal membaca file');
const regex = new RegExp(`case\\s+'${text}'[\\s\\S]*?break`, 'i');
if (!regex.test(data)) return reply('Case tidak ditemukan');
const fileBaru = data.replace(regex, '');
fs.writeFile(namaFile, fileBaru, 'utf8', (err) => {
if (err) return reply('Gagal menulis file');
reply(`Case ${text} berhasil dihapus`);
});
});
}
break
case 'getcase': {
if (!isCreator) return reply('you are not owner')
if (!text) return reply('Mana nama case-nya?');
const namaFile = 'satanic.js';
fs.readFile(namaFile, 'utf8', (err, data) => {
if (err) return reply('Gagal membaca file');
const regex = new RegExp(`case\\s+'${text}'[\\s\\S]*?break`, 'i');
const hasil = data.match(regex);
if (!hasil) return reply('Case tidak ditemukan');
reply(hasil[0]);
});
}
break
case 'totalcase': {
if (!isCreator) return reply('you are not owner')
const namaFile = 'satanic.js';
fs.readFile(namaFile, 'utf8', (err, data) => {
if (err) return reply('Gagal membaca file');
const matches = data.match(/case\s+'[^']+'/g);
if (!matches) return reply('Tidak ada case ditemukan');
reply(`Total case: ${matches.length}`);
});
}
break
case 'botafk':
case 'maintenance':
if(!m.isGroup) return;
if(!isCreator){
await satanic.sendMessage(m.chat,{text:"❌ Khusus owner bot!"},{quoted:fkontak});
return;
}
if(args[0]==="on"){
const reason=args.slice(1).join(" ")||"Sedang dalam perbaikan";
setMaintenance(true,reason);
await satanic.sendMessage(m.chat,{text:`✅ Maintenance ON\nAlasan: ${reason}`},{quoted:fkontak});
}
else if(args[0]==="off"){
setMaintenance(false,"");
await satanic.sendMessage(m.chat,{text:"✅ Maintenance OFF"},{quoted:fkontak});
}
else{
await satanic.sendMessage(m.chat,{text:`Gunakan:\n${prefix+command} on <alasan>\n${prefix+command} off`},{quoted:fkontak});
}
break;
case 'banfitur': {
    if (!m.isGroup) return reply("❌ Perintah ini hanya bisa digunakan di dalam grup!");
    if (!isBotAdmins) return reply('jadikan bot admin dahulu');
    if (!isAdmins && !isCreator) return reply("❌ Hanya admin grup atau owner bot!");
    if (!text) return reply(`📌 *Penggunaan:*\n${prefix + command} nama_fitur\n\n*Contoh:*\n${prefix + command} igstalk`);
    
    let bannedData = {};
    try {
        if (fs.existsSync("./database/bannedfitur.json")) {
            bannedData = JSON.parse(fs.readFileSync("./database/bannedfitur.json"));
        }
    } catch (e) {
        bannedData = {};
    }
    
    if (!bannedData[m.chat]) bannedData[m.chat] = [];
    
    const fiturToBan = text.toLowerCase().trim().split(/ +/)[0];
    
    if (bannedData[m.chat].includes(fiturToBan)) {
        return reply(`❌ Fitur *${fiturToBan}* sudah ada dalam daftar banned grup ini.`);
    }
    
    bannedData[m.chat].push(fiturToBan);
    fs.writeFileSync("./database/bannedfitur.json", JSON.stringify(bannedData, null, 2));
    
    console.log(`📝 BAN FITUR: ${fiturToBan} di ${m.chat}`);
    reply(`✅ Fitur *${fiturToBan}* telah dibanned di grup ini.\n\nSekarang member lain tidak bisa menggunakan fitur tersebut.`);
}
break;
case 'unbanfitur': {
    if (!m.isGroup) return reply("❌ Perintah ini hanya bisa digunakan di dalam grup!");
    if (!isAdmins && !isCreator) return reply("❌ Hanya admin grup atau owner bot!");
    if (!text) return reply(`📌 *Penggunaan:*\n${prefix + command} nama_fitur\n\n*Contoh:*\n${prefix + command} igstalk`);
    
    let bannedData = {};
    try {
        if (fs.existsSync("./database/bannedfitur.json")) {
            bannedData = JSON.parse(fs.readFileSync("./database/bannedfitur.json"));
        }
    } catch (e) {
        return reply("❌ Gagal membaca database banned fitur.");
    }
    
    if (!bannedData[m.chat] || bannedData[m.chat].length === 0) {
        return reply("❌ Grup ini tidak memiliki fitur yang dibanned.");
    }
    
    const fiturToUnban = text.toLowerCase().trim().split(/ +/)[0];
    const indexFitur = bannedData[m.chat].indexOf(fiturToUnban);
    
    if (indexFitur === -1) {
        return reply(`❌ Fitur *${fiturToUnban}* tidak ada dalam daftar banned grup ini.`);
    }
    
    bannedData[m.chat].splice(indexFitur, 1);
    if (bannedData[m.chat].length === 0) delete bannedData[m.chat];
    
    fs.writeFileSync("./database/bannedfitur.json", JSON.stringify(bannedData, null, 2));
    
    console.log(`✅ UNBAN FITUR: ${fiturToUnban} dari ${m.chat}`);
    reply(`✅ Fitur *${fiturToUnban}* telah di-unban dari grup ini.`);
}
break;
case 'listbanfitur': {
    let bannedData = {};
    try {
        if (fs.existsSync("./database/bannedfitur.json")) {
            bannedData = JSON.parse(fs.readFileSync("./database/bannedfitur.json"));
        }
    } catch (e) {
        bannedData = {};
    }
    
    let teks = "≡ *DAFTAR BANNED FITUR*\n\n";
    let ada = false;
    
    if (bannedData["global"] && bannedData["global"].length > 0) {
        teks += "❏ *Global:*\n";
        bannedData["global"].forEach(f => teks += `  • ${f}\n`);
        teks += "\n";
        ada = true;
    }
    
    if (isCreator) {
        for (let group in bannedData) {
            if (group !== "global" && Array.isArray(bannedData[group]) && bannedData[group].length > 0) {
                teks += `❏ *Grup: ${group}*\n`;
                bannedData[group].forEach(f => teks += `  • ${f}\n`);
                teks += "\n";
                ada = true;
            }
        }
    } else if (m.isGroup && bannedData[m.chat] && bannedData[m.chat].length > 0) {
        teks += `❏ *Grup Ini:*\n`;
        bannedData[m.chat].forEach(f => teks += `  • ${f}\n`);
        ada = true;
    }
    
    if (!ada) teks += "_Tidak ada fitur yang dibanned._";
    
    reply(teks);
}
break;
case 'self': 
if (!isCreator) return
 satanic.public = false;
 reply(`✅ Successfully changed to ${command} mode`);
break
case 'public': 
if (!isCreator) return
satanic.public = true;
reply(`✅ Successfully changed to ${command} mode`);
break
case 'adp':
case 'addplugin':
case 'tambahplugin': 
    await addPlugin(m, text, command);
    break;
case 'df':
case 'delplugin':
case 'dp':
    await deletePlugin(m, args);
    break;
case 'listplugin':
case 'lp': 
    await listPlugins(m);
    break;
case 'reload':
case 'r': 
    await reloadPlugins(m);
    break;
case 'getplugin':
case 'gp': 
    await getPlugin(m, args);
    break;
case 'addprem':
case 'prem':
case 'premium':
if (!isCreator) return reply(mess.owner);
function getJid(id) {
if (!id) return null;
id = id.trim();
if (id.includes('@s.whatsapp.net')) return id;
if (id.includes('@g.us')) return id;
if (id.includes('@')) {
let num = id.split('@')[0];
if (/^\d+$/.test(num)) return num + '@s.whatsapp.net';
}
if (/^\d+$/.test(id)) return id + '@s.whatsapp.net';
return null;
}
let target = m.mentions?.[0] || m.quoted?.sender || m.quoted?.participant || m.quoted?.key?.participant;
if (!target && text) target = text;
let jid = getJid(target);
if (!jid) return reply(`Gunakan:\n.addprem @user\n.addprem 6285813708397\n.addprem (reply pesan user)`);
let cekprem = await satanic.onWhatsApp(jid);
if (cekprem.length == 0) return reply(`Nomor ${jid.split('@')[0]} tidak terdaftar di WhatsApp!`);
if (premium.includes(jid)) return reply(`${jid} sudah menjadi premium!`);
premium.push(jid);
fs.writeFileSync('./database/premium.json', JSON.stringify(premium));
let userJid = m.sender;
let userNumber = userJid.split('@')[0];
await satanic.sendMessage(m.chat, {
text: `Selamat! Anda telah menjadi user premium.\n\nDitambahkan oleh: @${userNumber}`,
mentions: [userJid]
});
break;
case 'delprem':
case 'delpremium':
if (!isCreator) return reply(mess.owner);
function getJid(id) {
if (!id) return null;
id = id.trim();
if (id.includes('@s.whatsapp.net')) return id;
if (id.includes('@g.us')) return id;
if (id.includes('@')) {
let num = id.split('@')[0];
if (/^\d+$/.test(num)) return num + '@s.whatsapp.net';
}
if (/^\d+$/.test(id)) return id + '@s.whatsapp.net';
return null;
}
let targetbev = m.mentions?.[0] || m.quoted?.sender || m.quoted?.participant || m.quoted?.key?.participant;
if (!targetbev && text) targetbev = text;
let jidlah = getJid(targetbev);
if (!jidlah) return reply(`Gunakan:\n.delprem @user\n.delprem 6285813708397\n.delprem (reply pesan user)`);
if (!premium.includes(jidlah)) return reply(`${jid} tidak ada dalam daftar premium!`);
premium.splice(premium.indexOf(jidlah), 1);
fs.writeFileSync('./database/premium.json', JSON.stringify(premium));
await satanic.sendMessage(m.chat, {
text: `Status premium Anda telah dihapus.\n\nDihapus oleh: @${m.sender.split('@')[0]}`,
mentions: [m.sender]
});

break;
case 'autoreadsw':
if (!isCreator) return reply(mess.owner);
if (text === 'on') {
global.autoreadsw = true;
reply('Auto read status ON');
} else if (text === 'off') {
global.autoreadsw = false;
reply('Auto read status OFF');
} else {
reply(`Auto Read Status: ${global.autoreadsw ? 'ON' : 'OFF'}\n\nUse: .readsw on/off`);
}
break;
case 'autoread':
if (!isCreator) return reply(mess.owner);
if (text === 'on') {
global.autoread = true;
reply('Auto read ON');
} else if (text === 'off') {
global.autoread = false;
reply('Auto read OFF');
} else {
reply(`Auto Read: ${global.autoread ? 'ON' : 'OFF'}\n\nUse: .autoread on/off`);
}
break;
case 'autotyping':
if (!isCreator) return reply(mess.owner);
if (text === 'on') {
global.autotyping = true;
reply('Auto typing status ON');
} else if (text === 'off') {
global.autotyping = false;
reply('Auto typing status OFF');
} else {
reply(`Auto Typing Status: ${global.autotyping ? 'ON' : 'OFF'}\n\nUse: .autotyping on/off`);
}
break;
case 'onlygroup':
case 'onlygc':
if (!isCreator) return reply('Fitur Khusus owner!');
if (args.length < 1) return reply(`Contoh: ${prefix + command} on/off`);
if (text == 'on') {
global.onlygroup = true;
reply(`Successfully Changed Onlygroup To ${text}`);
} else if (text == 'off') {
global.onlygroup = false;
reply(`Successfully Changed Onlygroup To ${text}`);
}
break;
case 'smemevid': {
    if (!isCreator) return reply(mess.owner)
    
    const input = text
    if (!input) {
        return m.reply(`🎬 *ᴍᴇᴍᴇ ᴠɪᴅᴇᴏ*\n\n> Format: top|bottom\n\n\`Contoh: ${prefix}smemevid WIDTH OR HEIGHT|WHY NOT BOTH?\``)
    }

    let top = ''
    let bottom = ''
    
    if (input.includes('|')) {
        const split = input.split('|').map(s => s.trim().toUpperCase())
        top = split[0] || ''
        bottom = split[1] || ''
    } else {
        top = input.trim().toUpperCase()
        bottom = ''
    }

    try {
        const fs = require('fs')
        const path = require('path')
        const os = require('os')
        const axios = require('axios')
        const FormData = require('form-data')
        const cheerio = require('cheerio')
        const { createCanvas, loadImage } = require('@napi-rs/canvas')
        const { downloadContentFromMessage, generateWAMessageFromContent, prepareWAMessageMedia } = require('@whiskeysockets/baileys')

        const drawMemeText = (ctx, text, x, y, width, isBottom) => {
            if (!text) return

            ctx.fillStyle = 'white'
            ctx.strokeStyle = 'black'
            ctx.textAlign = 'center'
            ctx.textBaseline = isBottom ? 'bottom' : 'top'
            ctx.lineJoin = 'round'

            let fontSize = Math.floor(width / 8)
            ctx.font = `bold ${fontSize}px Impact, Arial`
            
            while (ctx.measureText(text).width > width - 20) {
                fontSize -= 2
                ctx.font = `bold ${fontSize}px Impact, Arial`
                if (fontSize < 10) break
            }
            
            ctx.lineWidth = Math.floor(fontSize / 6)
            ctx.strokeText(text, x, y)
            ctx.fillText(text, x, y)
        }

        async function uploadUguu(filePath) {
            const form = new FormData()
            form.append('files[]', fs.createReadStream(filePath))
            const { data } = await axios.post('https://uguu.se/upload', form, { headers: form.getHeaders() })
            return data.files[0].url
        }

        async function getMemeUrl(atas, bawah, bgUrl) {
            return `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${bgUrl}`
        }

        async function webp2Mp4(buffer) {
            const tempId = Date.now()
            const tmpDir = os.tmpdir()
            const inputPath = path.join(tmpDir, `webp-${tempId}.webp`)
            const outputPath = path.join(tmpDir, `mp4-${tempId}.mp4`)
            
            fs.writeFileSync(inputPath, buffer)
            
            try {
                const form = new FormData()
                form.append('new-image-url', '')
                form.append('new-image', fs.createReadStream(inputPath))
                
                const { data: firstPage } = await axios({
                    method: 'post',
                    url: 'https://ezgif.com/webp-to-mp4',
                    data: form,
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${form._boundary}`
                    }
                })
                
                const $ = cheerio.load(firstPage)
                const file = $('input[name="file"]').attr('value')
                if (!file) {
                    throw new Error('Tidak dapat menemukan file input pada halaman')
                }
                
                const formDataThen = new FormData()
                formDataThen.append('file', file)
                formDataThen.append('convert', "Convert WebP to MP4!")
                
                const { data: secondPage } = await axios({
                    method: 'post',
                    url: `https://ezgif.com/webp-to-mp4/${file}`,
                    data: formDataThen,
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${formDataThen._boundary}`
                    }
                })
                
                const $$ = cheerio.load(secondPage)
                let videoSrc = $$('div#output video source').attr('src')
                if (!videoSrc) videoSrc = $$('#output video source').attr('src')
                if (!videoSrc) videoSrc = $$('video source').attr('src')
                if (!videoSrc) videoSrc = $$('.outfile video source').attr('src')
                if (!videoSrc) {
                    const downloadLink = $$('a#download').attr('href')
                    if (downloadLink) {
                        videoSrc = downloadLink
                    } else {
                        throw new Error('Tidak dapat menemukan URL video hasil konversi')
                    }
                }
                
                let resultUrl = videoSrc
                if (videoSrc.startsWith('//')) {
                    resultUrl = 'https:' + videoSrc
                } else if (!videoSrc.startsWith('http')) {
                    resultUrl = 'https://ezgif.com' + (videoSrc.startsWith('/') ? videoSrc : '/' + videoSrc)
                }
                
                // Download video result
                const response = await axios.get(resultUrl, { responseType: 'arraybuffer' })
                fs.writeFileSync(outputPath, response.data)
                
                const videoBuffer = fs.readFileSync(outputPath)
                
                try {
                    fs.unlinkSync(inputPath)
                    fs.unlinkSync(outputPath)
                } catch (e) {}
                
                return videoBuffer
                
            } catch (err) {
                try {
                    fs.unlinkSync(inputPath)
                } catch (e) {}
                throw err
            }
        }

        const quoted = m.quoted ? m.quoted : m
        const qmsg = quoted.msg || quoted
        const mime = qmsg.mimetype || ''
        
        let mediaBuffer
        let isVideo = false
        
        if (/webp/.test(mime)) {
            const stream = await downloadContentFromMessage(qmsg, 'sticker')
            const chunks = []
            for await (const chunk of stream) chunks.push(chunk)
            mediaBuffer = Buffer.concat(chunks)
            isVideo = true
        } else if (/video/.test(mime)) {
            const stream = await downloadContentFromMessage(qmsg, 'video')
            const chunks = []
            for await (const chunk of stream) chunks.push(chunk)
            mediaBuffer = Buffer.concat(chunks)
            isVideo = true
        } else if (/image/.test(mime)) {
            const stream = await downloadContentFromMessage(qmsg, 'image')
            const chunks = []
            for await (const chunk of stream) chunks.push(chunk)
            mediaBuffer = Buffer.concat(chunks)
        } else {
            return m.reply(`❌ *ɢᴀɢᴀʟ*\n\n> Reply gambar/video/sticker!`)
        }

        if (!mediaBuffer) {
            return m.reply(`❌ *ɢᴀɢᴀʟ*\n\n> Gagal mengunduh media`)
        }

        const tempId = Date.now()
        const tmpDir = os.tmpdir()
        let stickerBuffer

        if (isVideo) {
            // Konversi webp ke mp4 dulu
            let videoBuffer
            if (/webp/.test(mime)) {
                videoBuffer = await webp2Mp4(mediaBuffer)
            } else {
                videoBuffer = mediaBuffer
            }
            
            const inputVideo = path.join(tmpDir, `vid-${tempId}.mp4`)
            const outputVideo = path.join(tmpDir, `vid-out-${tempId}.webp`)
            const overlayImage = path.join(tmpDir, `overlay-${tempId}.png`)

            fs.writeFileSync(inputVideo, videoBuffer)

            const size = 512
            const canvas = createCanvas(size, size)
            const ctx = canvas.getContext('2d')

            drawMemeText(ctx, top, size / 2, 10, size, false)
            drawMemeText(ctx, bottom, size / 2, size - 10, size, true)

            const bufferImage = canvas.toBuffer('image/png')
            fs.writeFileSync(overlayImage, bufferImage)

            await new Promise((resolve, reject) => {
                const ffmpeg = require('fluent-ffmpeg')
                const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg')
                ffmpeg.setFfmpegPath(ffmpegInstaller.path)
                
                ffmpeg(inputVideo)
                    .input(overlayImage)
                    .complexFilter([
                        `[0:v]scale=${size}:${size},fps=15[vid]`,
                        `[vid][1:v]overlay=0:0[out]`
                    ])
                    .outputOptions([
                        '-map [out]',
                        '-an',
                        '-c:v libwebp_anim',
                        '-pix_fmt yuva420p',
                        '-lossless 0',
                        '-compression_level 6',
                        '-q:v 70',
                        '-loop 0',
                        '-t 5'
                    ])
                    .save(outputVideo)
                    .on('end', resolve)
                    .on('error', reject)
            })

            stickerBuffer = fs.readFileSync(outputVideo)

            try {
                fs.unlinkSync(inputVideo)
                fs.unlinkSync(outputVideo)
                fs.unlinkSync(overlayImage)
            } catch (e) {}

        } else {
            const ext = mime.split('/')[1] || 'png'
            const tempFile = path.join(tmpDir, `smeme-${tempId}.${ext}`)
            fs.writeFileSync(tempFile, mediaBuffer)

            const url = await uploadUguu(tempFile)
            const memeUrl = await getMemeUrl(top, bottom, url)
            
            const response = await axios.get(memeUrl, { responseType: 'arraybuffer' })
            const imageBuffer = Buffer.from(response.data)
            
            const size = 512
            const canvas = createCanvas(size, size)
            const ctx = canvas.getContext('2d')
            
            const img = await loadImage(imageBuffer)
            ctx.drawImage(img, 0, 0, size, size)
            
            drawMemeText(ctx, top, size / 2, 10, size, false)
            drawMemeText(ctx, bottom, size / 2, size - 10, size, true)
            
            stickerBuffer = canvas.toBuffer('image/png')

            try {
                fs.unlinkSync(tempFile)
            } catch (e) {}
        }

        if (stickerBuffer.slice(0, 4).toString() !== 'RIFF' || stickerBuffer.slice(8, 12).toString() !== 'WEBP') {
            const canvas = createCanvas(512, 512)
            const ctx = canvas.getContext('2d')
            const img = await loadImage(stickerBuffer)
            ctx.drawImage(img, 0, 0, 512, 512)
            stickerBuffer = canvas.toBuffer('image/webp')
        }

        const metadata = {
            'sticker-pack-id': '2be7e369-b5ce-4706-a3d4-f78805a20328',
            'sticker-pack-name': 'Satanic Haxor',
            'sticker-pack-publisher': 'Satanic Haxor',
            'accessibility-text': 'Satanic Haxor',
            'android-app-store-link': 'https://whatsapp.com',
            'ios-app-store-link': 'https://whatsapp.com/ios',
            emojis: ['🦸', '😴', '😌'],
            'is-from-sticker-maker': 0,
            'is-avatar-sticker': 1,
            'avatar-sticker-template-id': 'whatsapp',
            'is-ai-sticker': 1,
            'is-avatar-country-sticker': 1,
            'is-avatar-instant-sticker': 1,
            'sticker-maker-source-type': 4,
            'is-avatar-social-sticker': 1,
            'avatar-sticker-style': 'whatsapp',
            'avatar-sticker-revision-id': '2026',
            'is-from-user-created-pack': 1,
            'origin-pack-id': 'whatsapp',
            'is-text-sticker': 1,
            premium: 1
        }

        const json = Buffer.from(JSON.stringify(metadata), 'utf-8')
        const exif = Buffer.concat([
            Buffer.from([0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00]),
            Buffer.alloc(4),
            Buffer.from([0x16, 0x00, 0x00, 0x00]),
            json
        ])
        exif.writeUInt32LE(json.length, 14)

        const typeBuffer = Buffer.from('EXIF')
        const sizeBuffer = Buffer.alloc(4)
        sizeBuffer.writeUInt32LE(exif.length, 0)
        const padding = exif.length % 2 === 1 ? Buffer.from([0x00]) : Buffer.alloc(0)
        const exifChunk = Buffer.concat([typeBuffer, sizeBuffer, exif, padding])

        const chunks_ = []
        let offset = 12

        while (offset + 8 <= stickerBuffer.length) {
            const type = stickerBuffer.slice(offset, offset + 4).toString()
            const size = stickerBuffer.readUInt32LE(offset + 4)
            const chunkStart = offset
            const chunkEnd = offset + 8 + size + (size % 2)
            if (chunkEnd > stickerBuffer.length) break
            if (type !== 'EXIF') chunks_.push(stickerBuffer.slice(chunkStart, chunkEnd))
            offset = chunkEnd
        }

        const body = Buffer.concat([...chunks_, exifChunk])
        const header = Buffer.alloc(12)
        header.write('RIFF', 0)
        header.writeUInt32LE(body.length + 4, 4)
        header.write('WEBP', 8)
        const finalBuffer = Buffer.concat([header, body])

        const media = await prepareWAMessageMedia(
            { sticker: finalBuffer },
            { upload: satanic.waUploadToServer }
        )

        const msgContent = {
            messageContextInfo: {
                limitSharingV2: {
                    sharingLimited: true,
                    trigger: 'CHAT_SETTING',
                    limitSharingSettingTimestamp: Date.now().toString(),
                    initiatedByMe: true
                }
            },
            stickerMessage: {
                ...media.stickerMessage,
                isAnimated: isVideo || false,
                isAvatar: true,
                isAiSticker: true,
                isLottie: false
            }
        }

        const msg = await generateWAMessageFromContent(m.chat, msgContent, {
            quoted: m,
            userJid: satanic.user.id
        })

        await satanic.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

    } catch (error) {
        console.error(error)
        m.reply(`❌ *ɢᴀɢᴀʟ*\n\n> ${error.message}`)
    }
}
break

case 'listprivate': {
    if (!isCreator) return reply("❌ Perintah ini hanya untuk owner bot!");
    
    const path = "./database/onlyprivate.json";
    if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({ status: false }, null, 2));
    
    let data = { status: false };
    try {
        data = JSON.parse(fs.readFileSync(path));
    } catch (e) {
        data = { status: false };
    }
    
    return reply(`≡ *STATUS ONLYPRIVATE*\n\nStatus: ${data.status ? "🟢 ON" : "🔴 OFF"}`);
}
break;
case 'onlygcprivate': {
    if (!isCreator) return reply("❌ Perintah ini hanya untuk owner bot!");
    if (!text) return reply(`📌 *Penggunaan:*\n${prefix + command} on/off\n${prefix}addgb\n${prefix}delgb\n${prefix}listgb`);
    
    const path = "./database/onlygc.json";
    if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({ status: false, groups: [] }, null, 2));
    
    let data = { status: false, groups: [] };
    try {
        data = JSON.parse(fs.readFileSync(path));
    } catch (e) {
        data = { status: false, groups: [] };
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
    }
    
    const action = text.trim().toLowerCase();
    
    if (action === "on") {
        data.status = true;
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
        return reply("✅ *OnlyGC* diaktifkan.\n\nSekarang bot hanya bisa dipakai di grup yang terdaftar.");
    }
    
    if (action === "off") {
        data.status = false;
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
        return reply("✅ *OnlyGC* dimatikan.\n\nSekarang bot bisa dipakai di semua grup.");
    }
    
    return reply(`❌ Aksi tidak valid.\n\nGunakan: on/off`);
}
break;

case 'addgb': {
    if (!isCreator) return reply("❌ Perintah ini hanya untuk owner bot!");
    
    const path = "./database/onlygc.json";
    if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({ status: false, groups: [] }, null, 2));
    
    let data = { status: false, groups: [] };
    try {
        data = JSON.parse(fs.readFileSync(path));
    } catch (e) {
        data = { status: false, groups: [] };
    }
    
    if (!Array.isArray(data.groups)) data.groups = [];
    
    let targetId = null;
    
    if (text) {
        targetId = text.trim();
    } else if (m.isGroup) {
        targetId = m.chat;
    } else {
        return reply(`📌 *Penggunaan:*\n${prefix + command} id_grup\n\nAtau jalankan di dalam grup tanpa argumen.`);
    }
    
    if (data.groups.includes(targetId)) return reply(`❌ Grup sudah ada dalam daftar.\n\nID: ${targetId}`);
    
    data.groups.push(targetId);
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    return reply(`✅ Grup berhasil ditambahkan ke daftar.\n\nID: ${targetId}`);
}
break;

case 'delgb': {
    if (!isCreator) return reply("❌ Perintah ini hanya untuk owner bot!");
    
    const path = "./database/onlygc.json";
    if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({ status: false, groups: [] }, null, 2));
    
    let data = { status: false, groups: [] };
    try {
        data = JSON.parse(fs.readFileSync(path));
    } catch (e) {
        data = { status: false, groups: [] };
    }
    
    if (!Array.isArray(data.groups)) data.groups = [];
    
    let targetId = null;
    
    if (text) {
        targetId = text.trim();
    } else if (m.isGroup) {
        targetId = m.chat;
    } else {
        return reply(`📌 *Penggunaan:*\n${prefix + command} id_grup\n\nAtau jalankan di dalam grup tanpa argumen.`);
    }
    
    const idx = data.groups.indexOf(targetId);
    if (idx === -1) return reply(`❌ Grup tidak ada dalam daftar.\n\nID: ${targetId}`);
    
    data.groups.splice(idx, 1);
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    return reply(`✅ Grup berhasil dihapus dari daftar.\n\nID: ${targetId}`);
}
break;

case 'listgb': {
    if (!isCreator) return reply("❌ Perintah ini hanya untuk owner bot!");
    
    const path = "./database/onlygc.json";
    if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({ status: false, groups: [] }, null, 2));
    
    let data = { status: false, groups: [] };
    try {
        data = JSON.parse(fs.readFileSync(path));
    } catch (e) {
        data = { status: false, groups: [] };
    }
    
    if (!Array.isArray(data.groups)) data.groups = [];
    
    let teks = `≡ *DAFTAR ONLYGC*\n\n`;
    teks += `Status: ${data.status ? "🟢 ON" : "🔴 OFF"}\n\n`;
    if (data.groups.length === 0) {
        teks += "_Belum ada grup terdaftar._";
    } else {
        data.groups.forEach((g, i) => teks += `${i + 1}. ${g}\n`);
    }
    return reply(teks);
}
break;
case 'addsewa': {
    try {
    if (!isCreator) return
        if (!text || text.split(' ').length < 2) {
            return reply(
                `Gunakan dengan cara:\n` +
                `${prefix + command} *linkgc waktu*\n\n` +
                `Contoh:\n${prefix + command} https://chat.whatsapp.com/XXX 30d\n\n` +
                `*CATATAN:*\n` +
                `d = hari\nh = jam\nm = menit\ns = detik\ny = tahun`
            );
        }

        let [link, waktu] = text.split(' ');
        
        if (!isUrl(link) || !link.includes('chat.whatsapp.com/')) {
            return reply("❌ Link grup WhatsApp tidak valid!");
        }
        let inviteCode = link.split('chat.whatsapp.com/')[1].split('?')[0];
        let infoGrup;
        try {
            infoGrup = await satanic.groupGetInviteInfo(inviteCode);
        } catch (e) {
            return reply("❌ Gagal mendapatkan info grup. Pastikan link belum di-reset atau bot telah diblokir.");
        }
        const groupId = infoGrup.id;
        const groupName = infoGrup.subject;

        addSewaGroup(groupId, waktu, sewa);
        try {
            await satanic.groupAcceptInvite(inviteCode);
            reply(
                `✅ *SEWA BERHASIL DITAMBAHKAN*\n\n` +
                `🏷️ Nama   : *${groupName}*\n` +
                `🆔 ID     : *${groupId}*\n` +
                `⏳ Durasi : *${waktu}*\n\n` +
                `*Status:* Bot berhasil masuk ke dalam grup dan sewa sudah aktif.`
            );
        } catch (joinErr) {
            reply(
                `⏳ *MENUNGGU PERSETUJUAN ADMIN*\n\n` +
                `🏷️ Nama   : *${groupName}*\n` +
                `🆔 ID     : *${groupId}*\n` +
                `⏳ Durasi : *${waktu}*\n\n` +
                `*Status:* Grup menggunakan sistem persetujuan admin. Namun jangan khawatir, *data sewa sudah tersimpan di database*. Sewa akan langsung berjalan ketika admin menyetujui bot masuk.`
            );
        }

    } catch (err) {
        console.error("ADDSEWA ERROR:", err);
        reply("❌ Terjadi kesalahan saat memproses perintah addsewa.");
    }
}
break;
case 'delsewa': {
    if (!isCreator) return
    if (sewa.length === 0)
        return reply('📭 Belum ada data sewa.')
    const rows = await Promise.all(
        sewa.map(async (x) => {
            const expired =
                x.expired === "PERMANENT"
                    ? "PERMANENT"
                    : msToDate(x.expired - Date.now())

            return {
                header: "",
                title: await getGcName(x.id),
                description: `ID: ${x.id}\nExpired: ${expired}`,
                id: `${prefix}confirmdelsewa ${x.id}`
            }
        })
    )

    const msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: {
                    body: {
                        text: '📋 Pilih grup yang ingin dihapus dari sewa:'
                    },
                    footer: {
                        text: '${global.namaBot} Assistant'
                    },
                    header: {
                        title: '🗑️ Daftar Sewa Aktif'
                    },
                    nativeFlowMessage: {
                        buttons: [{
                            name: "single_select",
                            buttonParamsJson: JSON.stringify({
                                title: "Pilih Grup",
                                sections: [{
                                    title: "Sewa Aktif",
                                    rows
                                }]
                            })
                        }]
                    }
                }
            }
        }
    }, { quoted: fkontak })

    await satanic.relayMessage(
        msg.key.remoteJid,
        msg.message,
        { messageId: msg.key.id }
    )
}
break
case 'confirmdelsewa': {
    if (!isCreator) return
    const id = args[0]
    if (!id) return reply("❌ ID grup tidak valid!")

    const pos = getSewaPosition(id, sewa)
    if (pos === -1)
        return reply("❌ Grup tidak ditemukan dalam data sewa!")
    sewa.splice(pos, 1)
    fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa, null, 2))
    try {
        await satanic.groupLeave(id)
    } catch (err) {
        console.log('Gagal keluar grup:', err)
    }
    reply(
        `✅ Sewa grup berhasil dihapus!\n` +
        `🚪 Bot telah keluar dari grup\n` +
        `🆔 ID: ${id}`
    )
}
break
case 'listsewa': {
    if (!isCreator) return
    if (sewa.length === 0) return reply("📭 Belum ada data sewa.")

    let teks = `📋 *Daftar Sewa Aktif*\n\n`
    for (let x of sewa) {
        teks += `🏷️ Nama : *${await getGcName(x.id)}*\n`
        teks += `🆔 ID   : ${x.id}\n`
        if (x.expired === "PERMANENT") {
            teks += `⏳ Expired : PERMANENT\n\n`
        } else {
            teks += `⏳ Expired : ${msToDate(x.expired - Date.now())}\n\n`
        }
    }

    satanic.sendMessage(m.chat, { text: teks }, { quoted: fkontak })
}
break
case 'ceksewa': {
    if (!isCreator) return
    if (!m.isGroup) return reply("❌ Perintah ini hanya bisa digunakan di dalam grup!");

    let teks = `⬣ *CEK SEWA GRUP*\n\n`;
    let isFound = false;

    for (let x of sewa) {
        if (x.id === m.chat) {
            isFound = true;
            let expiredText = (x.expired === "PERMANENT")
                ? "PERMANENT"
                : msToDate(x.expired - Date.now());

            let groupMeta = await satanic.groupMetadata(x.id);

            teks += `🏷️ Nama : *${groupMeta.subject}*\n` +
                    `🆔 ID   : *${x.id}*\n` +
                    `⏳ Expired : *${expiredText}*\n`;
        }
    }

    if (!isFound) return reply("❌ Grup ini belum menyewa bot.");
    reply(teks);
}
break;

case 'addowner':
if (!isCreator) return reply(mess.owner);
if (!text) return reply(`Use ${prefix + command} number\nContoh ${prefix + command} 6285813708397`);
let ownerNum = `${text.replace(/[^0-9]/g, '')}@s.whatsapp.net`;
let cekOwner = await satanic.onWhatsApp(ownerNum);
if (cekOwner.length == 0) return reply('Masukkan nomor yang valid dan terdaftar di WhatsApp!');
if (owner.includes(ownerNum)) return reply(`Nomor ${ownerNum.split('@')[0]} sudah menjadi owner!`);
owner.push(ownerNum);
fs.writeFileSync('./database/owner.json', JSON.stringify(owner, null, 2));
reply(`Nomor ${ownerNum.split('@')[0]} telah ditambahkan sebagai owner.`);
break;
case 'delowner':
case 'deleteowner':
if (!isCreator) return reply(mess.owner);
if (!text) return reply(`Use ${prefix + command} number\nContoh ${prefix + command} 6285813708397`);
let ownerNum2 = `${text.replace(/[^0-9]/g, '')}@s.whatsapp.net`;
let ownerIndex = owner.indexOf(ownerNum2);
if (ownerIndex === -1) return reply(`Nomor ${ownerNum2.split('@')[0]} tidak ditemukan dalam daftar owner!`);
owner.splice(ownerIndex, 1);
fs.writeFileSync('./database/owner.json', JSON.stringify(owner, null, 2));
reply(`Nomor ${ownerNum2.split('@')[0]} telah dihapus dari daftar owner.`);
break;
case 'listowner':
case 'listowners':
if (!isCreator) return reply(mess.owner);
if (owner.length === 0) return reply('Belum ada owner selain creator.');
let listMess = `DAFTAR OWNER\n\n`;
listMess += `Total: ${owner.length} owner\n\n`;
listMess += `Nomor WhatsApp:\n`;
let mentionsOwner = [];
owner.forEach((user, index) => {
let number = user.split('@')[0];
listMess += `${index + 1}. @${number}\n`;
mentionsOwner.push(user);
});
reply(listMess, { withTag: true, mentions: mentionsOwner });
break;
case 'autoreactsw':
if (!isCreator) return reply(mess.owner);
if (text === 'on') {
global.autoreactsw = true;
reply('Auto react status ON');
} else if (text === 'off') {
global.autoreactsw = false;
reply('Auto react status OFF');
} else {
reply(`Auto React Status: ${global.autoreactsw ? 'ON' : 'OFF'}\n\nUse: .autoreactsw on/off`);
}
break;    
case 'setprefix': {
    if (!isCreator) return reply('Khusus Owner!');
    if (!text) return reply(`*Cara Pakai:*\n\n1. ${prefix}setprefix multi\n(Bisa pakai banyak simbol . # / dll)\n\n2. ${prefix}setprefix noprefix\n(Tanpa simbol, langsung ketik perintah)\n\n3. ${prefix}setprefix #\n(Hanya bisa pakai simbol #)`);

    let pfxConf = JSON.parse(fs.readFileSync(dbPath('prefix.json')));
    if (args[0] === 'multi') {
        pfxConf.mode = 'multi';
        reply('✅ Berhasil ubah ke mode *Multi Prefix*');
    } else if (args[0] === 'noprefix') {
        pfxConf.mode = 'noprefix';
        reply('✅ Berhasil ubah ke mode *No Prefix* (Tanpa Simbol)');
    } else {
        pfxConf.mode = 'single';
        pfxConf.symbol = args[0]; 
        reply(`✅ Berhasil ubah ke mode *Single Prefix*. Simbol: ${args[0]}`);
    }
    fs.writeFileSync(dbPath('prefix.json'), JSON.stringify(pfxConf, null, 2));
}
break    
case 'setppbot':
case 'setppbot2': {
if (!isCreator) return reply(mess.owner);
const { S_WHATSAPP_NET } = require('@whiskeysockets/baileys');
async function generateProfilePicture(media) {
const image = await jimp.read(media);
const min = image.getWidth();
const max = image.getHeight();
const cropped = image.crop(0, 0, min, max);
return {
img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp.MIME_JPEG),
preview: await cropped.normalize().getBufferAsync(jimp.MIME_JPEG)
};
}
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!quoted) return reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`);
if (!/image/.test(mime)) return reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`);
let media = await satanic.downloadAndSaveMediaMessage(quoted);
const { img } = await generateProfilePicture(media);
await satanic.query({
tag: 'iq',
attrs: {
target: undefined,
to: S_WHATSAPP_NET,
type: 'set',
xmlns: 'w:profile:picture'
},
content: [
{
tag: 'picture',
attrs: { type: 'image' },
content: img
}
]
});
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
reply(mess.done || 'Profile picture bot berhasil diubah!');
}
break;
case 'jpmht':
case 'jpmhidetag':
case 'jasherhidetag': {
let groups = await satanic.groupFetchAllParticipating();
let groupList = Object.values(groups);
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
let text = m.body.replace(new RegExp(`^\\${prefix}${command}\\s*`, "i"), "").trim();
if (!mime && !text) {
return reply(`BROADCAST HIDETAG KE SEMUA GRUP\n━━━━━━━━━━━━━━━━\nTotal grup: ${groupList.length}\n\nContoh:\n${prefix + command} Halo semua!\nAtau reply gambar/video dengan ${prefix + command}`);
}
reply(`Mengirim broadcast HIDETAG ke ${groupList.length} grup...\nDelay 5 detik antar grup`);
let success = 0;
for (let group of groupList) {
try {
const groupMetadata = await satanic.groupMetadata(group.id);
const mentions = groupMetadata.participants.map(p => p.id);
if (/image/.test(mime)) {
const buffer = await quoted.download();
await satanic.sendMessage(group.id, {
image: buffer,
caption: `BROADCAST\n\n${text}`,
mentions: mentions
});
} else if (/video/.test(mime)) {
const buffer = await quoted.download();
await satanic.sendMessage(group.id, {
video: buffer,
caption: `BROADCAST\n\n${text}`,
mentions: mentions
});
} else if (/audio/.test(mime)) {
const buffer = await quoted.download();
await satanic.sendMessage(group.id, {
audio: buffer,
mentions: mentions
});
} else {
await satanic.sendMessage(group.id, {
text: `BROADCAST\n\n${text}`,
mentions: mentions
});
}
success++;
await sleep(5000);
} catch (e) {
console.log(`Gagal ke ${group.id}:`, e.message);
}
}
reply(`${success}/${groupList.length} grup berhasil dikirim dengan HIDETAG`);
}
break;
case 'jpm':
case 'broadcast': {
let body = m.body || "";
let text = body.replace(new RegExp(`^\\${prefix}${command}\\s*`, "i"), "").trim();
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
let groups = Object.values(await satanic.groupFetchAllParticipating());
if (/image/.test(mime)) {
const buffer = await quoted.download();
reply(`Mengirim broadcast GAMBAR ke ${groups.length} grup...`);
let success = 0;
for (let group of groups) {
try {
await satanic.sendMessage(group.id, {
image: buffer,
caption: `BROADCAST\n\n${text}`
});
success++;
await sleep(800);
} catch {}
}
reply(`${success}/${groups.length} grup berhasil diterima`);
} else if (/video/.test(mime)) {
const buffer = await quoted.download();
reply(`Mengirim broadcast VIDEO ke ${groups.length} grup...`);
let success = 0;
for (let group of groups) {
try {
await satanic.sendMessage(group.id, {
video: buffer,
caption: `BROADCAST\n\n${text}`
});
success++;
await sleep(800);
} catch {}
}
reply(`${success}/${groups.length} grup berhasil diterima`);
} else if (/audio/.test(mime)) {
const buffer = await quoted.download();
reply(`Mengirim broadcast AUDIO ke ${groups.length} grup...`);
let success = 0;
for (let group of groups) {
try {
await satanic.sendMessage(group.id, {
audio: buffer
});
success++;
await sleep(800);
} catch {}
}
reply(`${success}/${groups.length} grup berhasil diterima`);
} else if (text) {
reply(`Mengirim broadcast TEKS ke ${groups.length} grup...\n\nPesan: ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}`);
let success = 0;
for (let group of groups) {
try {
await satanic.sendMessage(group.id, {
text: `BROADCAST\n\n${text}`
});
success++;
await sleep(800);
} catch {}
}
reply(`${success}/${groups.length} grup berhasil diterima`);
} else {
reply(`BROADCAST (JPM)\n━━━━━━━━━━━━━━━━\nMengirim pesan ke semua grup\n\nContoh:\n${prefix + command} Halo semua!\n\nAtau reply media (gambar/video/audio) dengan caption`);
}
}
break;
case 'upswgc':
case 'jpmstatus':
case 'statusgrup':
case 'statusgroup': {
if (!isCreator) return;
const { fromBuffer } = require("file-type");
const fs = require("fs");
const path = require("path");
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
let content = {};
let buffer, ext, tempFile;
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
if (m.quoted) {
try {
buffer = await m.quoted.download();
if (!buffer) return reply("Gagal mengambil media quoted.");
const fileTypeRes = await fromBuffer(buffer);
ext = fileTypeRes ? fileTypeRes.ext : 'bin';
tempFile = path.join(__dirname, `tmp_${Date.now()}.${ext}`);
fs.writeFileSync(tempFile, buffer);
const quotedType = m.quoted.mtype || Object.keys(m.quoted.message || {})[0] || '';
if (/image|video|audio/.test(quotedType)) {
if (/image/.test(quotedType)) {
content.image = { url: tempFile };
if (text) content.caption = text;
} else if (/video/.test(quotedType)) {
content.video = { url: tempFile };
if (text) content.caption = text;
} else if (/audio/.test(quotedType)) {
if (text) {
fs.unlinkSync(tempFile);
return reply("Audio tidak boleh disertai caption.");
}
content.audio = { url: tempFile };
content.ptt = false;
}
} else {
fs.unlinkSync(tempFile);
return reply("Reply harus berupa image/video/audio.");
}
} catch (e) {
return reply("Media tidak valid atau gagal diproses.");
}
} else if (text) {
content.text = text;
} else {
return reply("Kirim media (foto/video/audio) atau teks, bisa dengan reply atau langsung.");
}
if (content.text && !content.text.trim()) return reply("Teks tidak boleh kosong.");
let getGroups = await satanic.groupFetchAllParticipating();
let groups = Object.values(getGroups);
let validGroups = [];
validGroups.push({
title: "All Group",
description: `Kirim ke ${groups.length} grup`,
id: `.sendstatus all ${encodeURIComponent(JSON.stringify(content))}`
});
for (let group of groups) {
validGroups.push({
title: group.subject || "Group",
description: group.id,
id: `.sendstatus ${group.id} ${encodeURIComponent(JSON.stringify(content))}`
});
}
if (validGroups.length <= 1) {
if (tempFile && fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
return reply("Tidak ada grup valid yang bisa dipilih.");
}
let msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
interactiveMessage: {
body: { text: "Pilih Grup Tujuan" },
nativeFlowMessage: {
buttons: [{
name: "single_select",
buttonParamsJson: JSON.stringify({
title: "PILIH GRUP",
sections: [{ title: "Daftar Grup", rows: validGroups }]
})
}]
}
}
}
}
}, { quoted: fkontak });
await satanic.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;
case 'sendstatus': {
if (!isCreator) return;
const fs = require("fs");
const crypto = require("crypto");
const [groupId, ...contentARR] = args;
const contentDecoded = JSON.parse(decodeURIComponent(contentARR.join(' ')));
async function groupStatus(jid, contentObj) {
let content = { ...contentObj };
const { backgroundColor } = content;
delete content.backgroundColor;
const inside = await generateWAMessageContent(content, {
upload: satanic.waUploadToServer,
backgroundColor
});
const messageSecret = crypto.randomBytes(32);
const mStatus = generateWAMessageFromContent(jid, {
messageContextInfo: {
messageSecret
},
groupStatusMessageV2: {
message: {
...inside,
messageContextInfo: {
messageSecret
}
}
}
}, {});
await satanic.relayMessage(jid, mStatus.message, {
messageId: mStatus.key.id
});
return mStatus;
}
let getGroups = await satanic.groupFetchAllParticipating();
let groups = Object.values(getGroups).map(v => v.id);
let success = 0;
let failed = 0;
if (groupId === 'all') {
for (let gid of groups) {
try {
await groupStatus(gid, contentDecoded);
success++;
await sleep(2000);
} catch (e) {
failed++;
}
}
reply(`Berhasil ${success} group\nGagal: ${failed} group`);
} else {
try {
await groupStatus(groupId, contentDecoded);
reply(`Berhasil dikirim ke grup`);
} catch (e) {
reply(`Gagal mengirim ke grup yang dituju`);
}
}
try {
if (contentDecoded?.image?.url && fs.existsSync(contentDecoded.image.url)) fs.unlinkSync(contentDecoded.image.url);
if (contentDecoded?.video?.url && fs.existsSync(contentDecoded.video.url)) fs.unlinkSync(contentDecoded.video.url);
if (contentDecoded?.audio?.url && fs.existsSync(contentDecoded.audio.url)) fs.unlinkSync(contentDecoded.audio.url);
} catch (e) {}
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;

case 'addmeta':
case 'addai': {
try {
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu');
if (!isAdmins && !isCreator) return reply(mess.admin);
const aiJid = '867051314767696@bot';
const groupMetadata = await satanic.groupMetadata(m.chat);
const participants = groupMetadata.participants.map(p => p.id);
if (participants.includes(aiJid)) {
return await satanic.sendMessage(m.chat, { text: 'Meta AI sudah ada di grup!' });
}
await satanic.groupParticipantsUpdate(m.chat, [aiJid], 'add');
await satanic.sendMessage(m.chat, { text: 'Meta AI berhasil ditambahkan!' });
} catch (e) {
console.error(e);
await satanic.sendMessage(m.chat, { text: `Error: ${e.message}` });
}
}
break;

case 'install':
case 'npm': {
if (!isCreator) return;
if (!text) return reply(`Mau install module apa?\nContoh: ${prefix + command} axios`);
reply(`Sedang menginstall module ${text}...\nMohon tunggu, bot akan restart otomatis jika berhasil.`);
require('child_process').exec(`npm install ${text}`, (err, stdout, stderr) => {
if (err) {
return reply(`Gagal menginstall module: ${err.message}`);
}
satanic.sendMessage(m.chat, {
text: `Sukses install ${text}!\n\nOutput:\n${stdout}\n\nBot sedang merestart sistem...`
}, { quoted: fkontak }).then(() => {
setTimeout(() => {
process.exit();
}, 3000);
});
});
}
break;


//////////////// GARIS BATASAN MENU OWNER /////////////////

//////////////// GARIS AWAL MENU GROUP /////////////////
case 'welcome':
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
    if (!global.db.chats[m.chat]) global.db.chats[m.chat] = {}
    if (args[0] === 'on') {
        global.db.chats[m.chat].welcome = true
        reply('Welcome DIACTIVEKAN')
    } else if (args[0] === 'off') {
        global.db.chats[m.chat].welcome = false
        reply('Welcome DINONACTIVEKAN')
    } else {
        const status = global.db.chats[m.chat].welcome ? 'AKTIF' : 'NONAKTIF'
        reply(`*STATUS WELCOME:* ${status}\n\n!welcome on - Aktifkan\n!welcome off - Nonaktifkan`)
    }
    break
case 'leave':
case 'left':
 if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
    if (!global.db.chats[m.chat]) global.db.chats[m.chat] = {}
    if (args[0] === 'on') {
        global.db.chats[m.chat].left = true
        reply('Left DIACTIVEKAN')
    } else if (args[0] === 'off') {
        global.db.chats[m.chat].left = false
        reply('Left DINONACTIVEKAN')
    } else {
        const status = global.db.chats[m.chat].left ? 'AKTIF' : 'NONAKTIF'
        reply(`*STATUS LEFT:* ${status}\n\n!left on - Aktifkan\n!left off - Nonaktifkan`)
    }
    break
case 'setwelcometext':
    if (!m.isGroup) return reply('Fitur Khusus Group!!!')
    if (!isAdmins && !isCreator) return reply('Fitur Khusus admin!')
    if (!text) return reply(`Example: ${prefix + command} Welcome @user\n\n@user - tag user\n@subject - group name\n@desc - group description\n@date - date`)
    global.db.chats[m.chat].setWelcome = text
    reply(`Welcome Text berhasil diubah!\nTeks: ${text}`)
    break
case 'setlefttext':
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
    if (!text) return reply(`Example: ${prefix + command} Goodbye @user\n\n@user - tag user\n@subject - group name\n@desc - group description\n@date - date`)
    global.db.chats[m.chat].setLeft = text
    reply(`Left Text berhasil diubah!\nTeks: ${text}`)
    break
case 'setwelcomeimage':
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
    const quoted1 = m.quoted ? m.quoted : m
    const mime1 = (quoted1.msg || quoted1).mimetype || ''
    if (!/image/.test(mime1)) return reply('Reply gambar dengan command ini!')
    try {
        let mediaFile1 = await satanic.downloadAndSaveMediaMessage(quoted1)
        const mediaBuffer1 = fs.readFileSync(mediaFile1)
        const form1 = new FormData()
        form1.append('files[]', mediaBuffer1, { filename: 'welcome.jpg' })
        const uploadRes1 = await axios.post('https://pone.rs/upload.php', form1, {
            headers: { ...form1.getHeaders(), 'User-Agent': 'Mozilla/5.0' },
            maxBodyLength: Infinity,
            maxContentLength: Infinity
        })
        if (!uploadRes1.data?.success || !uploadRes1.data?.files?.[0]?.url) {
            return reply("Gagal upload gambar!")
        }
        let url1 = uploadRes1.data.files[0].url.replace(/\\\//g, '/')
        fs.unlinkSync(mediaFile1)
        global.db.chats[m.chat].welcomeSetting = { type: 'image', url: url1 }
        reply(`Welcome Image berhasil diubah!\nURL: ${url1}`)
    } catch (err) {
        reply("Error: " + err.message)
    }
    break
case 'setwelcomevideo':
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
    const quoted2 = m.quoted ? m.quoted : m
    const mime2 = (quoted2.msg || quoted2).mimetype || ''
    if (!/video/.test(mime2)) return reply('Reply video dengan command ini!')
    try {
        let mediaFile2 = await satanic.downloadAndSaveMediaMessage(quoted2)
        const mediaBuffer2 = fs.readFileSync(mediaFile2)
        const form2 = new FormData()
        const ext2 = mime2.split('/')[1] || 'mp4'
        form2.append('files[]', mediaBuffer2, { filename: `welcome.${ext2}` })
        const uploadRes2 = await axios.post('https://pone.rs/upload.php', form2, {
            headers: { ...form2.getHeaders(), 'User-Agent': 'Mozilla/5.0' },
            maxBodyLength: Infinity,
            maxContentLength: Infinity
        })
        if (!uploadRes2.data?.success || !uploadRes2.data?.files?.[0]?.url) {
            return reply("Gagal upload video!")
        }
        let url2 = uploadRes2.data.files[0].url.replace(/\\\//g, '/')
        fs.unlinkSync(mediaFile2)
        global.db.chats[m.chat].welcomeSetting = { type: 'video', url: url2 }
        reply(`Welcome Video berhasil diubah!\nURL: ${url2}`)
    } catch (err) {
        reply("Error: " + err.message)
    }
    break
case 'setleftimage':
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
    const quoted3 = m.quoted ? m.quoted : m
    const mime3 = (quoted3.msg || quoted3).mimetype || ''
    if (!/image/.test(mime3)) return reply('Reply gambar dengan command ini!')
    try {
        let mediaFile3 = await satanic.downloadAndSaveMediaMessage(quoted3)
        const mediaBuffer3 = fs.readFileSync(mediaFile3)
        const form3 = new FormData()
        form3.append('files[]', mediaBuffer3, { filename: 'left.jpg' })
        const uploadRes3 = await axios.post('https://pone.rs/upload.php', form3, {
            headers: { ...form3.getHeaders(), 'User-Agent': 'Mozilla/5.0' },
            maxBodyLength: Infinity,
            maxContentLength: Infinity
        })
        if (!uploadRes3.data?.success || !uploadRes3.data?.files?.[0]?.url) {
            return reply("Gagal upload gambar!")
        }
        let url3 = uploadRes3.data.files[0].url.replace(/\\\//g, '/')
        fs.unlinkSync(mediaFile3)
        global.db.chats[m.chat].leftSetting = { type: 'image', url: url3 }
        reply(`Left Image berhasil diubah!\nURL: ${url3}`)
    } catch (err) {
        reply("Error: " + err.message)
    }
    break
case 'setleftvideo':
  if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
    const quoted4 = m.quoted ? m.quoted : m
    const mime4 = (quoted4.msg || quoted4).mimetype || ''
    if (!/video/.test(mime4)) return reply('Reply video dengan command ini!')
    try {
        let mediaFile4 = await satanic.downloadAndSaveMediaMessage(quoted4)
        const mediaBuffer4 = fs.readFileSync(mediaFile4)
        const form4 = new FormData()
        const ext4 = mime4.split('/')[1] || 'mp4'
        form4.append('files[]', mediaBuffer4, { filename: `left.${ext4}` })
        const uploadRes4 = await axios.post('https://pone.rs/upload.php', form4, {
            headers: { ...form4.getHeaders(), 'User-Agent': 'Mozilla/5.0' },
            maxBodyLength: Infinity,
            maxContentLength: Infinity
        })
        if (!uploadRes4.data?.success || !uploadRes4.data?.files?.[0]?.url) {
            return reply("Gagal upload video!")
        }
        let url4 = uploadRes4.data.files[0].url.replace(/\\\//g, '/')
        fs.unlinkSync(mediaFile4)
        global.db.chats[m.chat].leftSetting = { type: 'video', url: url4 }
        reply(`Left Video berhasil diubah!\nURL: ${url4}`)
    } catch (err) {
        reply("Error: " + err.message)
    }
    break
case 'setwelcometype':
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
    if (!text) return reply(`Pilih type:\n${prefix + command} image\n${prefix + command} video`)
    const type1 = text.toLowerCase()
    if (type1 !== 'image' && type1 !== 'video') {
        return reply('Pilihan salah! Gunakan: image atau video')
    }
    let setting1 = global.db.chats[m.chat].welcomeSetting || {}
    if (!setting1.url) {
        setting1.url = type1 === 'video' ? global.welcomeVideo : global.welcomeImage
    }
    setting1.type = type1
    global.db.chats[m.chat].welcomeSetting = setting1
    reply(`Welcome type berubah ke: ${type1.toUpperCase()}`)
    break
case 'setlefttype':
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
    if (!text) return reply(`Pilih type:\n${prefix + command} image\n${prefix + command} video`)
    const type2 = text.toLowerCase()
    if (type2 !== 'image' && type2 !== 'video') {
        return reply('Pilihan salah! Gunakan: image atau video')
    }
    let setting2 = global.db.chats[m.chat].leftSetting || {}
    if (!setting2.url) {
        setting2.url = type2 === 'video' ? global.leftVideo : global.leftImage
    }
    setting2.type = type2
    global.db.chats[m.chat].leftSetting = setting2
    reply(`Left type berubah ke: ${type2.toUpperCase()}`)
    break
 case 'resetwelcome':
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
    delete global.db.chats[m.chat].setWelcome
    delete global.db.chats[m.chat].welcomeSetting
    reply('Welcome reset ke default global')
    break
case 'resetleft':
    if (!m.isGroup) return reply('Fitur Khusus Group!!!')
    if (!isAdmins && !isCreator) return reply('Fitur Khusus admin!')
    delete global.db.chats[m.chat].setLeft
    delete global.db.chats[m.chat].leftSetting
    reply('Left reset ke default global')
    break
case 'delsetwelcome':
    if (!m.isGroup) return reply('Fitur Khusus Group!!!')
    if (!isAdmins && !isCreator) return reply('Fitur Khusus admin!')
    delete global.db.chats[m.chat].setWelcome
    reply('Berhasil menghapus custom welcome message. Sekarang akan menggunakan default.')
    break
case 'delsetleft':
    if (!m.isGroup) return reply('Fitur Khusus Group!!!')
    if (!isAdmins && !isCreator) return reply('Fitur Khusus admin!')
    delete global.db.chats[m.chat].setLeft
    reply('Berhasil menghapus custom left message. Sekarang akan menggunakan default.')
    break   
case 'listonline':
case 'liston': {
if (!isBotAdmins) return reply('jadikan bot admin dahulu');
try {
if (!m.isGroup) return m.reply(mess.group);
const metadata = m.groupMetadata || await satanic.groupMetadata(m.chat);
const participants = metadata.participants;
if (!store.presences) store.presences = {};
if (!store.presences[m.chat]) store.presences[m.chat] = {};
const presenceData = store.presences[m.chat];
const onlineMembers = [];
for (const mem of participants) {
if (mem.id === botNumber) continue;
let found = false;
if (presenceData[mem.id]) {
found = true;
}
if (!found && mem.deviceId && presenceData[`${mem.deviceId}@lid`]) {
found = true;
}
if (found) {
onlineMembers.push({
jid: mem.id,
number: mem.id.split('@')[0]
});
}
}
if (onlineMembers.length === 0) {
return m.reply('Tidak ada user online.');
}
let teks = `Online - ${onlineMembers.length}\n\n`;
const mentions = [];
onlineMembers.forEach((mem, i) => {
teks += `${i+1}. @${mem.number}\n`;
mentions.push(mem.jid);
});
await satanic.sendMessage(m.chat, {
text: teks,
mentions: mentions
}, { quoted: fkontak });
} catch (err) {
console.error(err);
m.reply('Error: ' + err.message);
}
break;
}
case 'h':
case 'hidetag': {
if (!isBotAdmins) return reply('jadikan bot admin dahulu');
if (!isAdmins && !isCreator) return reply(mess.admin)
const groupMetadata = await satanic.groupMetadata(m.chat);
const participants = groupMetadata.participants.map(p => p.id);
if (m.quoted) {
satanic.sendMessage(m.chat, {
forward: m.quoted.fakeObj,
mentions: participants.map(a => a.id)
})
}
if (!m.quoted) {
satanic.sendMessage(m.chat, {
text: text ? text : '',
mentions: participants.map(a => a.id)
}, { quoted: fkontak })
}
}
break
case 'tagall':{
if (!m.isGroup) return reply(mess.group);
if (!isAdmins && !isCreator) return reply(mess.admin)
if (!text) return reply('masukan text')
let teks = `tagall message :\n> *${text}*\n\n`;
const groupMetadata = await satanic.groupMetadata(m.chat);
const participants = groupMetadata.participants;
for (let mem of participants) {
teks += `@${mem.id.split("@")[0]}\n`;
}
satanic.sendMessage(m.chat, {
text: teks,
mentions: participants.map((a) => a.id)
}, { quoted: fkontak });
}
break         
case 'onlyadmin':
case 'mutegrup':
if (!m.isGroup) return reply('Fitur ini hanya dapat digunakan di dalam grup!');
if (!isBotAdmins) return reply('jadikan bot admin dahulu');
if (!isAdmins && !isCreator) return reply('Khusus admin grup!');
if (text === 'on') {
if (isMute) return reply('Mute sudah aktif di grup ini');
mutegrup.push(from);
fs.writeFileSync("./database/mutegc.json", JSON.stringify(mutegrup));
reply(`Mute Group telah diaktifkan di grup ini!\n\nTidak ada yang diizinkan menggunakan bot kecuali admin`);
} else if (text === 'off') {
if (!isMute) return reply('Mute sudah nonaktif di grup ini');
let offgrup = mutegrup.indexOf(from);
mutegrup.splice(offgrup, 1);
fs.writeFileSync("./database/mutegc.json", JSON.stringify(mutegrup));
reply(`Mute Group telah dinonaktifkan di grup ini!`);
} else {
reply(`Mute Settings\n\n` +
`Usage:\n` +
`${prefix + command} on - Activate mutegc\n` +
`${prefix + command} off - Deactivate mutegc`);
}
break;
case 'reqjoin':
case 'requestjoin':
case 'rj':
  if (!m.isGroup) return reply(mess.group);
  if (!isAdmins && !isCreator) return reply(mess.admin);
  if (!isBotAdmins) return reply('jadikan bot admin dahulu');
  function formatWaktull(timestamp) {
    return new Date(parseInt(timestamp) * 1000).toLocaleString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta'
    });
  }
  let pecahan = text ? text.trim().split(/\s+/) : [];
  let instruksi = pecahan[0] ? pecahan[0].toLowerCase() : 'bantuan';
  let parameter = pecahan[1] ? pecahan[1].toLowerCase() : '';
  let daftarMasuk = [];
  try {
    const dataPermintaan = await satanic.groupRequestParticipantsList(m.chat);
    
    daftarMasuk = dataPermintaan.map((item, idx) => {
      // Ambil dari phone_number (nomor HP asli)
      let jid = item.phone_number || item.jid || item.id || item;
      let nomor = jid.replace(/@s\.whatsapp\.net|@lid/g, '');
      let nama = item.notify || item.pushname || nomor;
      
      return {
        urutan: idx,
        jid: jid,
        nomor: nomor,
        nama: nama,
        waktu: item.request_time,
        metode: item.request_method
      };
    });
  } catch (galat) {
    console.error(galat);
    return reply('❌ Gagal mengambil daftar permintaan');
  }

  if (instruksi === 'daftar' || instruksi === 'list' || instruksi === 'lihat') {
    if (daftarMasuk.length === 0) return reply('📭 Tidak ada permintaan');
    let teks = `📋 *DAFTAR PERMINTAAN*\n━━━━━━━━━━━━━━━━\n📊 Total: ${daftarMasuk.length}\n\n`;
    daftarMasuk.forEach((p, i) => {
      teks += `*${i+1}. ${p.nama}*\n`;
      teks += `   📞 ${p.nomor}\n`;
      teks += `   ⏰ ${formatWaktull(p.waktu)}\n`;
      teks += `   📝 ${p.metode}\n\n`;
    });
    teks += `━━━━━━━━━━━━━━━━\n📌 .rj setuju 1\n📌 .rj setuju semua\n📌 .rj tolak 1\n📌 .rj tolak semua`;
    return reply(teks);
  }
  if (instruksi === 'setuju' || instruksi === 'approve' || instruksi === 'terima') {
    if (daftarMasuk.length === 0) return reply('❌ Tidak ada permintaan');
    if (parameter === 'semua' || parameter === 'all') {
      await satanic.groupRequestParticipantsUpdate(m.chat, daftarMasuk.map(p => p.jid), 'approve');
      return reply(`✅ Berhasil setuju ${daftarMasuk.length} permintaan`);
    }
    let idx = parseInt(parameter) - 1;
    if (isNaN(idx) || idx < 0 || idx >= daftarMasuk.length) return reply('❌ Nomor tidak valid');
    await satanic.groupRequestParticipantsUpdate(m.chat, [daftarMasuk[idx].jid], 'approve');
    return reply(`✅ Setuju @${daftarMasuk[idx].nomor}`, { mentions: [daftarMasuk[idx].jid] });
  }
  if (instruksi === 'tolak' || instruksi === 'reject' || instruksi === 'decline') {
    if (daftarMasuk.length === 0) return reply('❌ Tidak ada permintaan');
    if (parameter === 'semua' || parameter === 'all') {
      await satanic.groupRequestParticipantsUpdate(m.chat, daftarMasuk.map(p => p.jid), 'reject');
      return reply(`❌ Berhasil tolak ${daftarMasuk.length} permintaan`);
    }
    let idx = parseInt(parameter) - 1;
    if (isNaN(idx) || idx < 0 || idx >= daftarMasuk.length) return reply('❌ Nomor tidak valid');
    await satanic.groupRequestParticipantsUpdate(m.chat, [daftarMasuk[idx].jid], 'reject');
    return reply(`❌ Tolak @${daftarMasuk[idx].nomor}`, { mentions: [daftarMasuk[idx].jid] });
  }
  reply(`🔧 *REQUEST JOIN*\n━━━━━━━━━━━━━━━━\n.rj daftar - Lihat\n.rj setuju 1 - Terima\n.rj setuju semua - Terima semua\n.rj tolak 1 - Tolak\n.rj tolak semua - Tolak semua`);
break;
case 'antimedia': {
  if (!m.isGroup) return reply('⚠️ Khusus grup!');
  if (!isAdmins && !isCreator) return reply('👑 Khusus admin!');
if (!isBotAdmins) return reply('jadikan bot admin dahulu');
  if (!global.db.chats[m.chat]) {
    global.db.chats[m.chat] = {
      antimedia: false,
      antimediaMode: 'delete',
      antimediaTypes: [],
      warns: {}
    };
    require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
  }

  if (!global.db.chats[m.chat].antimediaTypes) {
    global.db.chats[m.chat].antimediaTypes = [];
  }

  const chatData = global.db.chats[m.chat];
  const antimediaAktif = chatData?.antimedia || false;
  const antimediaMode = chatData?.antimediaMode || 'delete';
  const antimediaTypes = chatData?.antimediaTypes || [];
  const cmd = text.split(' ')[0];
  const subCmd = text.split(' ')[1];

  if (cmd === 'warn') {
    if (subCmd === 'on') {
      if (antimediaAktif && antimediaMode === 'warn') return reply('⚠️ Mode warn sudah aktif!');
      global.db.chats[m.chat].antimedia = true;
      global.db.chats[m.chat].antimediaMode = 'warn';
      global.db.chats[m.chat].warns = {};
      if (!global.db.chats[m.chat].antimediaTypes) global.db.chats[m.chat].antimediaTypes = [];
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Mode WARN aktif!\nUser akan di kick jika 3x warning media');
    } else if (subCmd === 'off') {
      if (!antimediaAktif) return reply('⚠️ Antimedia tidak aktif!');
      if (antimediaMode !== 'warn') return reply('⚠️ Mode bukan warn!');
      global.db.chats[m.chat].antimedia = false;
      global.db.chats[m.chat].warns = {};
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('❌ Mode WARN nonaktif!');
    } else {
      reply(`📝 Cara Penggunaan Antimedia Warn:\n\n➤ ${prefix}antimedia warn on\n   Mengaktifkan mode warn untuk semua media\n   User akan di warning jika kirim media terlarang\n   Jika 3x warning, otomatis di kick\n\n➤ ${prefix}antimedia warn off\n   Menonaktifkan mode warn\n\n📌 Contoh:\n${prefix}antimedia warn on\n✅ Mode WARN aktif!`);
    }
  } else if (cmd === 'delete') {
    if (subCmd === 'on') {
      if (antimediaAktif && antimediaMode === 'delete') return reply('⚠️ Mode delete sudah aktif!');
      global.db.chats[m.chat].antimedia = true;
      global.db.chats[m.chat].antimediaMode = 'delete';
      global.db.chats[m.chat].warns = {};
      if (!global.db.chats[m.chat].antimediaTypes) global.db.chats[m.chat].antimediaTypes = [];
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Mode DELETE aktif!\nMedia terlarang akan dihapus + peringatan');
    } else if (subCmd === 'off') {
      if (!antimediaAktif) return reply('⚠️ Antimedia tidak aktif!');
      if (antimediaMode !== 'delete') return reply('⚠️ Mode bukan delete!');
      global.db.chats[m.chat].antimedia = false;
      global.db.chats[m.chat].warns = {};
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('❌ Mode DELETE nonaktif!');
    } else {
      reply(`📝 Cara Penggunaan Antimedia Delete:\n\n➤ ${prefix}antimedia delete on\n   Mengaktifkan mode delete untuk semua media\n   Media terlarang akan dihapus + peringatan\n   Tanpa warning dan tanpa kick\n\n➤ ${prefix}antimedia delete off\n   Menonaktifkan mode delete\n\n📌 Contoh:\n${prefix}antimedia delete on\n✅ Mode DELETE aktif!`);
    }
  } else if (cmd === 'image') {
    if (subCmd === 'on') {
      if (!antimediaAktif) return reply('⚠️ Aktifkan antimedia dulu! (warn/delete)');
      if (antimediaTypes.includes('image')) return reply('⚠️ Image sudah diblokir!');
      if (!global.db.chats[m.chat].antimediaTypes) global.db.chats[m.chat].antimediaTypes = [];
      global.db.chats[m.chat].antimediaTypes.push('image');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Image diblokir!\nMedia image akan dihapus');
    } else if (subCmd === 'off') {
      if (!antimediaTypes.includes('image')) return reply('⚠️ Image tidak diblokir!');
      global.db.chats[m.chat].antimediaTypes = antimediaTypes.filter(t => t !== 'image');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Image diizinkan!');
    } else {
      reply(`📝 Cara Penggunaan Antimedia Image:\n\n➤ ${prefix}antimedia image on\n   Memblokir image (gambar)\n   Image akan dihapus + peringatan\n\n➤ ${prefix}antimedia image off\n   Mengizinkan image\n\n📌 Contoh:\n${prefix}antimedia image on\n✅ Image diblokir!`);
    }
  } else if (cmd === 'video') {
    if (subCmd === 'on') {
      if (!antimediaAktif) return reply('⚠️ Aktifkan antimedia dulu! (warn/delete)');
      if (antimediaTypes.includes('video')) return reply('⚠️ Video sudah diblokir!');
      if (!global.db.chats[m.chat].antimediaTypes) global.db.chats[m.chat].antimediaTypes = [];
      global.db.chats[m.chat].antimediaTypes.push('video');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Video diblokir!\nMedia video akan dihapus');
    } else if (subCmd === 'off') {
      if (!antimediaTypes.includes('video')) return reply('⚠️ Video tidak diblokir!');
      global.db.chats[m.chat].antimediaTypes = antimediaTypes.filter(t => t !== 'video');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Video diizinkan!');
    } else {
      reply(`📝 Cara Penggunaan Antimedia Video:\n\n➤ ${prefix}antimedia video on\n   Memblokir video\n   Video akan dihapus + peringatan\n\n➤ ${prefix}antimedia video off\n   Mengizinkan video\n\n📌 Contoh:\n${prefix}antimedia video on\n✅ Video diblokir!`);
    }
  } else if (cmd === 'audio') {
    if (subCmd === 'on') {
      if (!antimediaAktif) return reply('⚠️ Aktifkan antimedia dulu! (warn/delete)');
      if (antimediaTypes.includes('audio')) return reply('⚠️ Audio sudah diblokir!');
      if (!global.db.chats[m.chat].antimediaTypes) global.db.chats[m.chat].antimediaTypes = [];
      global.db.chats[m.chat].antimediaTypes.push('audio');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Audio diblokir!\nMedia audio akan dihapus');
    } else if (subCmd === 'off') {
      if (!antimediaTypes.includes('audio')) return reply('⚠️ Audio tidak diblokir!');
      global.db.chats[m.chat].antimediaTypes = antimediaTypes.filter(t => t !== 'audio');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Audio diizinkan!');
    } else {
      reply(`📝 Cara Penggunaan Antimedia Audio:\n\n➤ ${prefix}antimedia audio on\n   Memblokir audio (suara)\n   Audio akan dihapus + peringatan\n\n➤ ${prefix}antimedia audio off\n   Mengizinkan audio\n\n📌 Contoh:\n${prefix}antimedia audio on\n✅ Audio diblokir!`);
    }
  } else if (cmd === 'sticker') {
    if (subCmd === 'on') {
      if (!antimediaAktif) return reply('⚠️ Aktifkan antimedia dulu! (warn/delete)');
      if (antimediaTypes.includes('sticker')) return reply('⚠️ Sticker sudah diblokir!');
      if (!global.db.chats[m.chat].antimediaTypes) global.db.chats[m.chat].antimediaTypes = [];
      global.db.chats[m.chat].antimediaTypes.push('sticker');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Sticker diblokir!\nMedia sticker akan dihapus');
    } else if (subCmd === 'off') {
      if (!antimediaTypes.includes('sticker')) return reply('⚠️ Sticker tidak diblokir!');
      global.db.chats[m.chat].antimediaTypes = antimediaTypes.filter(t => t !== 'sticker');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Sticker diizinkan!');
    } else {
      reply(`📝 Cara Penggunaan Antimedia Sticker:\n\n➤ ${prefix}antimedia sticker on\n   Memblokir sticker\n   Sticker akan dihapus + peringatan\n\n➤ ${prefix}antimedia sticker off\n   Mengizinkan sticker\n\n📌 Contoh:\n${prefix}antimedia sticker on\n✅ Sticker diblokir!`);
    }
  } else if (cmd === 'document') {
    if (subCmd === 'on') {
      if (!antimediaAktif) return reply('⚠️ Aktifkan antimedia dulu! (warn/delete)');
      if (antimediaTypes.includes('document')) return reply('⚠️ Document sudah diblokir!');
      if (!global.db.chats[m.chat].antimediaTypes) global.db.chats[m.chat].antimediaTypes = [];
      global.db.chats[m.chat].antimediaTypes.push('document');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Document diblokir!\nMedia document akan dihapus');
    } else if (subCmd === 'off') {
      if (!antimediaTypes.includes('document')) return reply('⚠️ Document tidak diblokir!');
      global.db.chats[m.chat].antimediaTypes = antimediaTypes.filter(t => t !== 'document');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Document diizinkan!');
    } else {
      reply(`📝 Cara Penggunaan Antimedia Document:\n\n➤ ${prefix}antimedia document on\n   Memblokir document (file)\n   Document akan dihapus + peringatan\n\n➤ ${prefix}antimedia document off\n   Mengizinkan document\n\n📌 Contoh:\n${prefix}antimedia document on\n✅ Document diblokir!`);
    }
  } else if (cmd === 'all') {
    if (subCmd === 'on') {
      if (!antimediaAktif) return reply('⚠️ Aktifkan antimedia dulu! (warn/delete)');
      if (antimediaTypes.includes('all')) return reply('⚠️ Semua media sudah diblokir!');
      global.db.chats[m.chat].antimediaTypes = ['all'];
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Semua media diblokir!\nImage, Video, Audio, Sticker, Document akan dihapus');
    } else if (subCmd === 'off') {
      if (!antimediaTypes.includes('all')) return reply('⚠️ Tidak ada media yang diblokir!');
      global.db.chats[m.chat].antimediaTypes = [];
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Semua media diizinkan!');
    } else {
      reply(`📝 Cara Penggunaan Antimedia All:\n\n➤ ${prefix}antimedia all on\n   Memblokir SEMUA media sekaligus\n   Image, Video, Audio, Sticker, Document\n   Semua akan dihapus + peringatan\n\n➤ ${prefix}antimedia all off\n   Mengizinkan semua media\n\n📌 Contoh:\n${prefix}antimedia all on\n✅ Semua media diblokir!`);
    }
  } else if (cmd === 'delwarn') {
    if (!antimediaAktif) return reply('⚠️ Antimedia tidak aktif!');
    if (antimediaMode !== 'warn') return reply('⚠️ Mode bukan warn!');
    const target = antimediaGetJid(m);
    if (!target) return reply('⚠️ Reply atau tag user!');
    if (!chatData.warns?.[target]) return reply('⚠️ User tidak punya warning');
    delete chatData.warns[target];
    if (global.db.users[target]) {
      delete global.db.users[target];
    }
    require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
    await satanic.sendMessage(m.chat, {
      text: `✅ Warning @${target.split('@')[0]} dihapus!`,
      mentions: [target]
    });
  } else if (cmd === 'listwarn') {
    if (!antimediaAktif) return reply('⚠️ Antimedia tidak aktif!');
    if (antimediaMode !== 'warn') return reply('⚠️ Mode bukan warn!');
    if (!chatData.warns || !Object.keys(chatData.warns).length) return reply('📌 Tidak ada warning');
    let txt = '📋 DAFTAR WARNING MEDIA\n\n';
    let mentions = [];
    for (let [id, count] of Object.entries(chatData.warns)) {
      let name = global.db.users[id]?.name || id.split('@')[0];
      txt += `• @${name} - ${count}/3\n`;
      mentions.push(id);
    }
    await satanic.sendMessage(m.chat, {
      text: txt,
      mentions: mentions
    });
  } else {
    const total = chatData?.warns ? Object.keys(chatData.warns).length : 0;
    const types = antimediaTypes.length ? antimediaTypes.join(', ') : 'Tidak ada';
    reply(`⚙️ ANTIMEDIA\n\n📌 Status: ${antimediaAktif ? '✅ ON' : '❌ OFF'}\n📋 Mode: ${antimediaMode.toUpperCase()}\n🚫 Diblokir: ${types}\n⚠️ Warning: ${total} user\n\n📝 Commands:\n\n➤ ${prefix}antimedia warn on/off\n   Aktifkan/nonaktifkan mode warn\n\n➤ ${prefix}antimedia delete on/off\n   Aktifkan/nonaktifkan mode delete\n\n➤ ${prefix}antimedia image on/off\n   Blokir/izinkan image\n\n➤ ${prefix}antimedia video on/off\n   Blokir/izinkan video\n\n➤ ${prefix}antimedia audio on/off\n   Blokir/izinkan audio\n\n➤ ${prefix}antimedia sticker on/off\n   Blokir/izinkan sticker\n\n➤ ${prefix}antimedia document on/off\n   Blokir/izinkan document\n\n➤ ${prefix}antimedia all on/off\n   Blokir/izinkan SEMUA media\n\n➤ ${prefix}antimedia delwarn (reply/tag)\n   Hapus warning user\n\n➤ ${prefix}antimedia listwarn\n   Lihat daftar warning\n\n💡 Contoh Penggunaan:\n${prefix}antimedia delete on\n${prefix}antimedia image on\n${prefix}antimedia video on\n✅ Image & video diblokir!`);
  }
  break;
}
case 'banchat':
if (!m.isGroup) return reply('Fitur ini hanya dapat digunakan di dalam grup!');
if (!isCreator) return reply('Khusus owner grup!');
if (text === 'on') {
if (isBanchat) return reply('Mute sudah aktif di grup ini');
banchat.push(from);
fs.writeFileSync("./database/banchat.json", JSON.stringify(banchat));
reply(`Mute Group telah diaktifkan di grup ini!\n\nTidak ada yang diizinkan menggunakan bot kecuali owner`);
} else if (text === 'off') {
if (!isBanchat) return reply('Mute sudah nonaktif di grup ini');
let offbangc = banchat.indexOf(from);
banchat.splice(offbangc, 1);
fs.writeFileSync("./database/banchat.json", JSON.stringify(banchat));
reply(`Mute Group telah dinonaktifkan di grup ini!`);
} else {
reply(`Mute Settings\n\n` +
`Usage:\n` +
`${prefix + command} on - Activate banchat\n` +
`${prefix + command} off - Deactivate banchat`);
}
break;
case 'mute': {
    if (!m.isGroup) return reply('⚠️ Khusus grup!');
    if (!isAdmins && !isCreator) return reply('👑 Khusus admin!');
if (!isBotAdmins) return reply('jadikan bot admin dahulu');
    let [targetMention, durasi] = args;
    let target = m.mentions?.[0] || m.quoted?.sender || m.quoted?.participant || m.quoted?.key?.participant;
    
    if (!target && targetMention) {
        target = getJid(targetMention);
    }
    
    if (target && !target.includes('@')) {
        target = getJid(target);
    }
    
    if (!target) return reply('⚠️ input number atau reply user!');

    const groupMetadata = await satanic.groupMetadata(m.chat);
    if (groupMetadata.participants.some(p => p.id === target && p.admin) && !isCreator) {
        return reply('❌ Tidak bisa mute admin!');
    }

    if (!durasi || !/^\d+[mhd]$/.test(durasi)) {
        durasi = text.split(' ').find(w => /^\d+[mhd]$/.test(w));
    }
    if (!durasi) return reply(`⚠️ Masukkan durasi!\nContoh: ${prefix}mute reply user 1m / 1h / 1d`);

    const match = durasi.match(/^(\d+)([mhd])$/);
    const unitMap = { m: 60 * 1000, h: 60 * 60 * 1000, d: 24 * 60 * 60 * 1000 };
    const labelMap = { m: 'menit', h: 'jam', d: 'hari' };
    
    const milliseconds = parseInt(match[1]) * unitMap[match[2]];
    const label = `${match[1]} ${labelMap[match[2]]}`;

    if (!global.db.chats[m.chat]) global.db.chats[m.chat] = {};
    if (!global.db.chats[m.chat].mutedUsers) global.db.chats[m.chat].mutedUsers = {};

    const chat = global.db.chats[m.chat];
    if (chat.mutedUsers[target] && chat.mutedUsers[target] > Date.now()) {
        const sisa = chat.mutedUsers[target] - Date.now();
        const menit = Math.floor(sisa / 60000);
        const jam = Math.floor(menit / 60);
        const hari = Math.floor(jam / 24);
        let sisaText = '';
        if (hari > 0) sisaText += `${hari} hari `;
        if (jam % 24 > 0) sisaText += `${jam % 24} jam `;
        if (menit % 60 > 0) sisaText += `${menit % 60} menit`;
        return reply(`⚠️ Sudah di-mute! Sisa: ${sisaText}`);
    }

    chat.mutedUsers[target] = Date.now() + milliseconds;
    require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));

    await satanic.sendMessage(m.chat, {
        text: `🔇 @${target.split('@')[0]} di-mute ${label}!`,
        mentions: [target]
    });

    setTimeout(async () => {
        try {
            const chatNow = global.db.chats[m.chat];
            if (chatNow?.mutedUsers?.[target]) {
                delete chatNow.mutedUsers[target];
                require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
                await satanic.sendMessage(m.chat, {
                    text: `🔊 @${target.split('@')[0]} unmute (waktu habis)!`,
                    mentions: [target]
                });
            }
        } catch (e) {}
    }, milliseconds);
    break;
}

case 'unmute': {
    if (!m.isGroup) return reply('⚠️ Khusus grup!');
    if (!isAdmins && !isCreator) return reply('👑 Khusus admin!');
if (!isBotAdmins) return reply('jadikan bot admin dahulu');
    let target = m.mentions?.[0] || m.quoted?.sender || m.quoted?.participant || m.quoted?.key?.participant;
    
    if (!target && args[0]) {
        target = getJid(args[0]);
    }
    
    if (target && !target.includes('@')) {
        target = getJid(target);
    }
    
    if (!target) return reply('⚠️ input number atau reply user!');

    const chat = global.db.chats[m.chat];
    if (!chat?.mutedUsers?.[target]) return reply('📌 Tidak dalam mute!');

    delete chat.mutedUsers[target];
    require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));

    await satanic.sendMessage(m.chat, {
        text: `🔊 @${target.split('@')[0]} di-unmute!`,
        mentions: [target]
    });
    break;
}
case 'listmute': {
  if (!m.isGroup) return reply('⚠️ Khusus grup!');
  if (!isAdmins && !isCreator) return reply('👑 Khusus admin!');
if (!isBotAdmins) return reply('jadikan bot admin dahulu');
  const chat = global.db.chats[m.chat];
  if (!chat?.mutedUsers) return reply('📌 Tidak ada user di-mute!');

  const expired = Object.entries(chat.mutedUsers).filter(([_, time]) => time <= Date.now());
  for (const [id] of expired) delete chat.mutedUsers[id];
  if (expired.length) {
    require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
  }

  const mutedList = Object.entries(chat.mutedUsers).filter(([_, time]) => time > Date.now());
  if (!mutedList.length) return reply('📌 Tidak ada user di-mute!');

  let txt = '📋 *DAFTAR USER DI-MUTE*\n\n';
  const mentions = [];
  let no = 1;

  for (const [id, time] of mutedList) {
    const sisa = time - Date.now();
    const menit = Math.floor(sisa / 60000);
    const jam = Math.floor(menit / 60);
    const hari = Math.floor(jam / 24);
    let sisaText = '';
    if (hari) sisaText += `${hari} hari `;
    if (jam % 24) sisaText += `${jam % 24} jam `;
    if (menit % 60) sisaText += `${menit % 60} menit`;
    
    txt += `${no}. @${id.split('@')[0]} - ${sisaText}\n`;
    mentions.push(id);
    no++;
  }

  await satanic.sendMessage(m.chat, { text: txt, mentions });
  break;
}
case 'getpp': {
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
let target = m.quoted ? m.quoted.sender : m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net" : null
if (!target) return reply("Reply/@tag target nya")

var ppuseryuk
try {
ppuser = await satanic.profilePictureUrl(target, 'image')
} catch (err) {
ppuser = 'https://files.catbox.moe/ejy4ky.jpg'
}
return satanic.sendMessage(m.chat, {image: {url: ppuseryuk}, caption: `Sukses mengambil profil @${target.split("@")[0]}`, mentions: target}, {quoted: fkontak})
}
break 
case 'totag': {
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
if (!m.quoted) return reply(`Reply message with caption ${prefix + command}`)
const groupMetadata = await satanic.groupMetadata(m.chat);
const participants = groupMetadata.participants.map(p => p.id);
const q = m.quoted ? m.quoted : m;
const mime = (q.msg || q).mimetype || '';
const caption = q.text || q.caption || '';
if (/image/.test(mime) && !/webp/.test(mime)) {
let media = await q.download();
await satanic.sendMessage(m.chat, { image: media, caption: caption, mentions: participants }, { quoted: m });
} else if (/video/.test(mime)) {
let media = await q.download();
await satanic.sendMessage(m.chat, { video: media, caption: caption, mentions: participants }, { quoted: m });
} else if (/audio/.test(mime)) {
let media = await q.download();
await satanic.sendMessage(m.chat, { audio: media, mimetype: 'audio/mp4', mentions: participants }, { quoted: m });
} else if (/webp/.test(mime) || q.type === 'stickerMessage') {
let media = await q.download();
await satanic.sendMessage(m.chat, { sticker: media, mentions: participants }, { quoted: m });
} else {
await satanic.sendMessage(m.chat, { text: caption, mentions: participants }, { quoted: m });
}
}
break
case 'fakevn': {
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
if (!m.quoted) return reply('Reply audio yang mau dijadikan fake vn')
if (!text) return reply(`Contoh: ${prefix + command} 60`)
const duration = parseInt(text);
if (isNaN(duration)) return reply('Durasi harus berupa angka (detik)')
const q = m.quoted ? m.quoted : m;
const mime = (q.msg || q).mimetype || '';
if (!/audio/.test(mime)) return reply('Yang di-reply bukan audio')
let media = await q.download();
await satanic.sendMessage(m.chat, { audio: media, mimetype: 'audio/ogg; codecs=opus', ptt: true, seconds: duration }, { quoted: m });
}
break
case 'ahegao': case 'akira': case 'akiyama': case 'ana': case 'asuna': case 'ayuzawa': case 'boruto': case 'chitanda': case 'chitoge': case 'deidara': case 'doraemon': case 'elaina': case 'emilia': case 'erza': case 'gremory': case 'hestia': case 'hinata': case 'hitorigottoh': case 'inori': case 'isuzu': case 'itachi': case 'itori': case 'kaga': case 'kagura': case 'kakasih': case 'kaori': case 'keneki': case 'kosaki': case 'kotori': case 'kuriyama': case 'kuroha': case 'kurumi': case 'loli': case 'madara': case 'megumin': case 'mikasa': case 'miku': case 'minato': case 'naruto': case 'natsukawa': case 'neko': case 'nekonime': case 'nezuko': case 'nishimiya': case 'onepiece': case 'pokemon': case 'ppcouple': case 'rem': case 'rize': case 'sagiri': case 'sakura': case 'sasuke': case 'shina': case 'shinka': case 'shizuka': case 'shota': case 'tomori': case 'toukachan': case 'tsunade': case 'waifu': case 'waifu2': case 'wallhp2': case 'yatogami': case 'yuki': case 'yuri': {
    reply('await be processed');
    
    let heyy;
    const urlMap = {
        ahegao: 'https://raw.githubusercontent.com/satanicid/database/main/anime/ahegao.json',
        akira: 'https://raw.githubusercontent.com/satanicid/database/main/anime/akira.json',
        akiyama: 'https://raw.githubusercontent.com/satanicid/database/main/anime/akiyama.json',
        ana: 'https://raw.githubusercontent.com/satanicid/database/main/anime/ana.json',
        asuna: 'https://raw.githubusercontent.com/satanicid/database/main/anime/asuna.json',
        ayuzawa: 'https://raw.githubusercontent.com/satanicid/database/main/anime/ayuzawa.json',
        boruto: 'https://raw.githubusercontent.com/satanicid/database/main/anime/boruto.json',
        chitanda: 'https://raw.githubusercontent.com/satanicid/database/main/anime/chitanda.json',
        chitoge: 'https://raw.githubusercontent.com/satanicid/database/main/anime/chitoge.json',
        deidara: 'https://raw.githubusercontent.com/satanicid/database/main/anime/deidara.json',
        doraemon: 'https://raw.githubusercontent.com/satanicid/database/main/anime/doraemon.json',
        elaina: 'https://raw.githubusercontent.com/satanicid/database/main/anime/elaina.json',
        emilia: 'https://raw.githubusercontent.com/satanicid/database/main/anime/emilia.json',
        erza: 'https://raw.githubusercontent.com/satanicid/database/main/anime/erza.json',
        gremory: 'https://raw.githubusercontent.com/satanicid/database/main/anime/gremory.json',
        hestia: 'https://raw.githubusercontent.com/satanicid/database/main/anime/hestia.json',
        hinata: 'https://raw.githubusercontent.com/satanicid/database/main/anime/hinata.json',
        hitorigottoh: 'https://raw.githubusercontent.com/satanicid/database/main/anime/hitorigottoh.json',
        inori: 'https://raw.githubusercontent.com/satanicid/database/main/anime/inori.json',
        isuzu: 'https://raw.githubusercontent.com/satanicid/database/main/anime/isuzu.json',
        itachi: 'https://raw.githubusercontent.com/satanicid/database/main/anime/itachi.json',
        itori: 'https://raw.githubusercontent.com/satanicid/database/main/anime/itori.json',
        kaga: 'https://raw.githubusercontent.com/satanicid/database/main/anime/kaga.json',
        kagura: 'https://raw.githubusercontent.com/satanicid/database/main/anime/kagura.json',
        kakasih: 'https://raw.githubusercontent.com/satanicid/database/main/anime/kakasih.json',
        kaori: 'https://raw.githubusercontent.com/satanicid/database/main/anime/kaori.json',
        keneki: 'https://raw.githubusercontent.com/satanicid/database/main/anime/keneki.json',
        kosaki: 'https://raw.githubusercontent.com/satanicid/database/main/anime/kosaki.json',
        kotori: 'https://raw.githubusercontent.com/satanicid/database/main/anime/kotori.json',
        kuriyama: 'https://raw.githubusercontent.com/satanicid/database/main/anime/kuriyama.json',
        kuroha: 'https://raw.githubusercontent.com/satanicid/database/main/anime/kuroha.json',
        kurumi: 'https://raw.githubusercontent.com/satanicid/database/main/anime/kurumi.json',
        loli: 'https://raw.githubusercontent.com/satanicid/database/main/anime/loli.json',
        madara: 'https://raw.githubusercontent.com/satanicid/database/main/anime/madara.json',
        megumin: 'https://raw.githubusercontent.com/satanicid/database/main/anime/megumin.json',
        mikasa: 'https://raw.githubusercontent.com/satanicid/database/main/anime/mikasa.json',
        miku: 'https://raw.githubusercontent.com/satanicid/database/main/anime/miku.json',
        minato: 'https://raw.githubusercontent.com/satanicid/database/main/anime/minato.json',
        naruto: 'https://raw.githubusercontent.com/satanicid/database/main/anime/naruto.json',
        natsukawa: 'https://raw.githubusercontent.com/satanicid/database/main/anime/natsukawa.json',
        neko: 'https://raw.githubusercontent.com/satanicid/database/main/anime/neko.json',
        nekonime: 'https://raw.githubusercontent.com/satanicid/database/main/anime/nekonime.json',
        nezuko: 'https://raw.githubusercontent.com/satanicid/database/main/anime/nezuko.json',
        nishimiya: 'https://raw.githubusercontent.com/satanicid/database/main/anime/nishimiya.json',
        onepiece: 'https://raw.githubusercontent.com/satanicid/database/main/anime/onepiece.json',
        pokemon: 'https://raw.githubusercontent.com/satanicid/database/main/anime/pokemon.json',
        ppcouple: 'https://raw.githubusercontent.com/satanicid/database/main/anime/ppcouple.json',
        rem: 'https://raw.githubusercontent.com/satanicid/database/main/anime/rem.json',
        rize: 'https://raw.githubusercontent.com/satanicid/database/main/anime/rize.json',
        sagiri: 'https://raw.githubusercontent.com/satanicid/database/main/anime/sagiri.json',
        sakura: 'https://raw.githubusercontent.com/satanicid/database/main/anime/sakura.json',
        sasuke: 'https://raw.githubusercontent.com/satanicid/database/main/anime/sasuke.json',
        shina: 'https://raw.githubusercontent.com/satanicid/database/main/anime/shina.json',
        shinka: 'https://raw.githubusercontent.com/satanicid/database/main/anime/shinka.json',
        shizuka: 'https://raw.githubusercontent.com/satanicid/database/main/anime/shizuka.json',
        shota: 'https://raw.githubusercontent.com/satanicid/database/main/anime/shota.json',
        tomori: 'https://raw.githubusercontent.com/satanicid/database/main/anime/tomori.json',
        toukachan: 'https://raw.githubusercontent.com/satanicid/database/main/anime/toukachan.json',
        tsunade: 'https://raw.githubusercontent.com/satanicid/database/main/anime/tsunade.json',
        waifu: 'https://raw.githubusercontent.com/satanicid/database/main/anime/waifu.json',
        waifu2: 'https://raw.githubusercontent.com/satanicid/database/main/anime/waifu2.json',
        wallhp2: 'https://raw.githubusercontent.com/satanicid/database/main/anime/wallhp2.json',
        yatogami: 'https://raw.githubusercontent.com/satanicid/database/main/anime/yatogami.json',
        yuki: 'https://raw.githubusercontent.com/satanicid/database/main/anime/yuki.json',
        yuri: 'https://raw.githubusercontent.com/satanicid/database/main/anime/yuri.json'
    };
    
    const url = urlMap[command];
    if (url) {
        const response = await axios.get(url);
        heyy = response.data;
        let yeha = heyy[Math.floor(Math.random() * heyy.length)];
        satanic.sendMessage(m.chat, { image: { url: yeha }, caption: 'done' }, { quoted: fkontak });
    }
    break;
}
case 'fakevideo': {
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
if (!m.quoted) return reply('Reply video yang mau dijadikan fake video')
if (!text) return reply(`Contoh: ${prefix + command} 50`)
const size = parseInt(text);
if (isNaN(size)) return reply('Ukuran harus berupa angka (MB)')
const q = m.quoted ? m.quoted : m;
const mime = (q.msg || q).mimetype || '';
if (!/video/.test(mime)) return reply('Yang di-reply bukan video')
let media = await q.download();
await satanic.sendMessage(m.chat, { video: media, mimetype: 'video/mp4', fileLength: size * 1024 * 1024 }, { quoted: m });
}
break
case 'fakeimage': {
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
if (!m.quoted) return reply('Reply gambar yang mau dijadikan fake image')
if (!text) return reply(`Contoh: ${prefix + command} 50`)
const size = parseInt(text);
if (isNaN(size)) return reply('Ukuran harus berupa angka (MB)')
const q = m.quoted ? m.quoted : m;
const mime = (q.msg || q).mimetype || '';
if (!/image/.test(mime)) return reply('Yang di-reply bukan gambar')
let media = await q.download();
await satanic.sendMessage(m.chat, { image: media, mimetype: 'image/jpeg', fileLength: size * 1024 * 1024 }, { quoted: m });
}
break
case 'fakesticker': {
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
if (!m.quoted) return reply('Reply sticker yang mau dijadikan fake sticker')
if (!text) return reply(`Contoh: ${prefix + command} 50`)
const size = parseInt(text);
if (isNaN(size)) return reply('Ukuran harus berupa angka (MB)')
const q = m.quoted ? m.quoted : m;
const mime = (q.msg || q).mimetype || '';
if (!/webp/.test(mime)) return reply('Yang di-reply bukan sticker')
let media = await q.download();
await satanic.sendMessage(m.chat, { sticker: media, fileLength: size * 1024 * 1024 }, { quoted: m });
}
break
case 'intro':
    if (!m.isGroup) return reply('Fitur Khusus Group!!!')
    let groupMetadata = await satanic.groupMetadata(m.chat)
    let customIntro = global.db.chats[m.chat]?.intro
    if (customIntro) {
        let introText = customIntro
            .replace(/@subject/g, groupMetadata.subject)
            .replace(/@user/g, m.pushName || 'User')
        reply(introText)
    } else {
        let introCard = `*kartu intro ${groupMetadata.subject}*
─────────────────
*Group:* ${groupMetadata.subject}
*Nama:* 
*Instagram:* 
*TikTok:* 
*Umur:* 
─────────────────
semoga betah ya kak di group ${groupMetadata.subject} jangan lupa nimbrung 👋`
        reply(introCard)
    }
    break
case 'setintro':
  if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
    if (!text) return reply(`Example: ${prefix + command} *Group:* @subject\n*Nama:* @user\n*Instagram:* @instagram\n*TikTok:* @tiktok\n*Umur:* @umur`)
    global.db.chats[m.chat].intro = text
    reply(`Intro berhasil diubah!\nTeks: ${text}`)
    break
case 'resetintro':
  if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
    delete global.db.chats[m.chat].intro
    reply('Intro berhasil direset ke default.')
    break
case 'delintro':
    if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
    delete global.db.chats[m.chat].intro
    reply('Intro berhasil dihapus, sekarang menggunakan default.')
    break
case 'linkgroup':
case 'linkgc':
case 'gclink':
case 'grouplink': {
  if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
    let response = await satanic.groupInviteCode(m.chat);
    let groupMetadata = await satanic.groupMetadata(m.chat);
    await satanic.sendMessage(m.chat, { 
        text: `*GROUP LINK*\n\n*Nama Grup:* ${groupMetadata.subject}\n🔗 *Link:* https://chat.whatsapp.com/${response}`,
        detectLink: true
    }, { quoted: fkontak });
    
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;
case 'resetlinkgc':
case 'resetlinkgroup':
case 'resetlinkgrup':
case 'revoke':
case 'resetlink':
case 'resetgrouplink':
case 'resetgclink':
case 'resetgruplink': {
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
satanic.groupRevokeInvite(m.chat)
}
break    
case 'poll': {
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
 let [poll, opt] = text.split("|")
 if (text.split("|") < 2)
return await reply(
`Sebutkan pertanyaan dan minimal 2 pilihan\nContoh: ${prefix}poll Siapa admin terbaik?|Akbar,Hydro,Furina...`
)
 let options = []
 for (let i of opt.split(',')) {
options.push(i)
}
 await satanic.sendMessage(m.chat, {
poll: {
name: poll,
values: options
}
 })
}
break
case 'promote':
case 'pm': {
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
if (!m.mentionedJid[0] && !m.quoted && !text) return reply(`Hmm... Kamu mau ${command} siapa? 🤔`)
await satanic.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => reply(mess.done)).catch((err) => reply(mess.error))
}
break
case 'demote':
case 'dm': {
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
if (!m.mentionedJid[0] && !m.quoted && !text) return reply(`Hmm... Kamu mau ${command} siapa? 🤔`)
await satanic.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => reply(mess.done)).catch((err) => reply(mess.error))
}
break
case 'opentime': {
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
if (args[1] == 'second') {
var timer = args[0] * `1000`
} else if (args[1] == 'minute') {
var timer = args[0] * `60000`
} else if (args[1] == 'hour') {
var timer = args[0] * `3600000`
} else if (args[1] == 'day') {
var timer = args[0] * `86400000`
} else {
return reply('*Choose:*\nsecond\nminute\nhour\n\n*Example*\n10 second')
}
reply(`Open Time ${q} Starting from now`)
setTimeout(() => {
var nomor = m.participant
const open = `*On time* Group Opened By Admin\n Now Members Can Send Messages`
satanic.groupSettingUpdate(from, 'not_announcement')
reply(open)
}, timer)
}
break
case 'closetime': {
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
if (args[1] == 'second') {
var timer = args[0] * `1000`
} else if (args[1] == 'minute') {
var timer = args[0] * `60000`
} else if (args[1] == 'hour') {
var timer = args[0] * `3600000`
} else if (args[1] == 'day') {
var timer = args[0] * `86400000`
} else {
return reply('*Choose:*\nsecond\nminute\nhour\n\n*Example*\n10 second')
}
reply(`Close Time ${q} Starting from now`)
setTimeout(() => {
var nomor = m.participant
const close = `*On time* Group Closed By Admin\nNow Only Admins Can Send Messages`
satanic.groupSettingUpdate(from, 'announcement')
reply(close)
}, timer)
}
break
case 'mulaivote': case 'startvote': {
    try {
    if (!isBotAdmins) return reply('jadikan bot admin dahulu');
        if (!isAdmins) {
            m.reply('⚠️ *Perintah ini hanya untuk admin grup!*');
            break;
        }
        
        const topic = args.join(' ') || 'Voting';
        const duration = 60;
        
        const result = createVote(m.sender, topic, duration);
        
        if (result.status) {
            const msg = `🗳️ *VOTING DIMULAI!*

📋 *Topik:* ${topic}
🕐 *Durasi:* ${duration} detik
⏰ *Mulai:* ${result.data.start}
⏰ *Selesai:* ${result.data.end}

Ketik *vote ya* atau *vote tidak* untuk memberikan suara!`;
            
            m.reply(msg);
        } else {
            m.reply('❌ Gagal membuat voting!');
        }
    } catch (err) {
        m.reply('❌ Error: ' + err.message);
    }
    break;
}

case 'vote': {
    try {
        const choice = args[0]?.toLowerCase();
        
        if (!choice || (choice !== 'ya' && choice !== 'tidak')) {
            m.reply('⚠️ *Cara penggunaan:*\n\nvote ya - untuk setuju\nvote tidak - untuk tidak setuju');
            break;
        }
        
        const activeVote = getActiveVote();
        if (!activeVote) {
            m.reply('⚠️ *Tidak ada voting aktif!*\nKetik *mulaivote* untuk membuat voting.');
            break;
        }
        
        const choiceMap = {
            'ya': 'yes',
            'tidak': 'no'
        };
        
        const result = addVote(m.sender, activeVote.id, choiceMap[choice]);
        
        if (result.status) {
            const voteResult = getVoteResult(activeVote.id);
            if (voteResult) {
                let yesList = '';
                let noList = '';
                let mentions = [];
                
                if (voteResult.yes.length > 0) {
                    yesList = voteResult.yes.map((v, i) => {
                        mentions.push(v.sender);
                        return `${i+1}. @${v.sender.split('@')[0]}`;
                    }).join('\n');
                } else {
                    yesList = 'Belum ada yang setuju';
                }
                
                if (voteResult.no.length > 0) {
                    noList = voteResult.no.map((v, i) => {
                        mentions.push(v.sender);
                        return `${i+1}. @${v.sender.split('@')[0]}`;
                    }).join('\n');
                } else {
                    noList = 'Belum ada yang tidak setuju';
                }
                
                const msg = `🗳️ *HASIL VOTE*

📋 *Topik:* ${voteResult.topic}

✅ *SETUJU (${voteResult.yes.length}):*
${yesList}

❌ *TIDAK SETUJU (${voteResult.no.length}):*
${noList}

📊 Total: ${voteResult.total} suara

⏰ Selesai: ${voteResult.end}`;
                
                satanic.sendMessage(m.chat, { text: msg, mentions: mentions }, { quoted: m });
            }
        } else {
            m.reply(result.message);
        }
    } catch (err) {
        m.reply('❌ Error: ' + err.message);
    }
    break;
}

case 'delvote': {
    try {
        if (!isAdmins) {
            m.reply('⚠️ *Perintah ini hanya untuk admin grup!*');
            break;
        }
        
        const activeVote = getActiveVote();
        if (!activeVote) {
            m.reply('⚠️ *Tidak ada voting aktif!*');
            break;
        }
        
        const result = deleteVote(m.sender, activeVote.id);
        m.reply(result.message);
    } catch (err) {
        m.reply('❌ Error: ' + err.message);
    }
    break;
}

case 'hasilvote': case 'resultvote': {
    try {
        const activeVote = getActiveVote();
        if (!activeVote) {
            m.reply('⚠️ *Tidak ada voting aktif!*');
            break;
        }
        
        const voteResult = getVoteResult(activeVote.id);
        if (!voteResult) {
            m.reply('❌ Gagal mengambil hasil vote!');
            break;
        }
        
        let yesList = '';
        let noList = '';
        let mentions = [];
        
        if (voteResult.yes.length > 0) {
            yesList = voteResult.yes.map((v, i) => {
                mentions.push(v.sender);
                return `${i+1}. @${v.sender.split('@')[0]}`;
            }).join('\n');
        } else {
            yesList = 'Belum ada yang setuju';
        }
        
        if (voteResult.no.length > 0) {
            noList = voteResult.no.map((v, i) => {
                mentions.push(v.sender);
                return `${i+1}. @${v.sender.split('@')[0]}`;
            }).join('\n');
        } else {
            noList = 'Belum ada yang tidak setuju';
        }
        
        const msg = `🗳️ *HASIL VOTE*

📋 *Topik:* ${voteResult.topic}

✅ *SETUJU (${voteResult.yes.length}):*
${yesList}

❌ *TIDAK SETUJU (${voteResult.no.length}):*
${noList}

📊 Total: ${voteResult.total} suara

📅 Mulai: ${voteResult.start}
⏰ Selesai: ${voteResult.end}
📌 Status: ${voteResult.status === 'active' ? '🟢 Aktif' : '🔴 Selesai'}`;
        
        satanic.sendMessage(m.chat, { text: msg, mentions: mentions }, { quoted: m });
        
    } catch (err) {
        m.reply('❌ Error: ' + err.message);
    }
    break;
}
case 'mulaiabsen': case 'startabsen': {
    try {
        if (!isAdmins) {
            m.reply('⚠️ *Perintah ini hanya untuk admin grup!*');
            break;
        }
        
        const result = startAbsen();
        if (result) {
            const now = moment().tz('Asia/Jakarta');
            const date = now.format('DD/MM/YYYY');
            const time = now.format('HH:mm:ss');
            m.reply(`✅ *ABSENSI DIMULAI!*\n📅 ${date} ${time} WIB\n\nSilahkan ketik *hadir* atau *izin* untuk absen.`);
        } else {
            m.reply('❌ Gagal memulai absensi!');
        }
    } catch (err) {
        m.reply('❌ Error: ' + err.message);
    }
    break;
}

case 'stopabsen': case 'selesaiabsen': {
    try {
        if (!isAdmins) {
            m.reply('⚠️ *Perintah ini hanya untuk admin grup!*');
            break;
        }
        
        const result = stopAbsen();
        if (result) {
            const absenToday = getAbsenToday();
            let hadir = absenToday.filter(a => a.type === 'hadir');
            let izin = absenToday.filter(a => a.type === 'izin');
            
            const msg = `✅ *ABSENSI SELESAI!*\n\n📊 *REKAP HARI INI:*\n✅ Hadir: ${hadir.length}\n❌ Izin: ${izin.length}\n📋 Total: ${absenToday.length}`;
            m.reply(msg);
        } else {
            m.reply('❌ Gagal mengakhiri absensi!');
        }
    } catch (err) {
        m.reply('❌ Error: ' + err.message);
    }
    break;
}

case 'absen': case 'start': {
    try {
        if (!isAbsenStarted()) {
            m.reply('⚠️ *Absensi belum dimulai!*\nKetik *mulaiabsen* untuk memulai absensi.');
            break;
        }
        
        const now = moment().tz('Asia/Jakarta');
        const date = now.format('DD/MM/YYYY');
        const time = now.format('HH:mm:ss');
        
        const absenToday = getAbsenToday();
        
        let hadir = absenToday.filter(a => a.type === 'hadir');
        let izin = absenToday.filter(a => a.type === 'izin');
        
        let hadirList = '';
        let izinList = '';
        let mentions = [];
        
        if (hadir.length > 0) {
            hadirList = hadir.map((a, i) => {
                mentions.push(a.sender);
                return `${i+1}. @${a.sender.split('@')[0]} - ${a.time}`;
            }).join('\n');
        } else {
            hadirList = 'Belum ada yang hadir';
        }
        
        if (izin.length > 0) {
            izinList = izin.map((a, i) => {
                mentions.push(a.sender);
                return `${i+1}. @${a.sender.split('@')[0]} - ${a.reason} (${a.time})`;
            }).join('\n');
        } else {
            izinList = 'Belum ada yang izin';
        }
        
        const msg = `📋 *ABSENSI HARI INI*
📅 ${date} ${time} WIB

✅ *HADIR (${hadir.length}):*
${hadirList}

❌ *IZIN (${izin.length}):*
${izinList}

Total: ${absenToday.length} orang`;
        
        satanic.sendMessage(m.chat, { text: msg, mentions: mentions }, { quoted: m });
        
    } catch (err) {
        m.reply('❌ Error: ' + err.message);
    }
    break;
}

case 'hadir': {
    try {
        if (!isAbsenStarted()) {
            m.reply('⚠️ *Absensi belum dimulai!*\nKetik *mulaiabsen* untuk memulai absensi.');
            break;
        }
        
        const name = args.join(' ') || m.pushName || 'User';
        const result = logAbsen(m.sender, name, 'hadir');
        
        satanic.sendMessage(m.chat, { text: result.message, mentions: [m.sender] }, { quoted: m });
        
    } catch (err) {
        m.reply('❌ Error: ' + err.message);
    }
    break;
}

case 'izin': {
    try {
        if (!isAbsenStarted()) {
            m.reply('⚠️ *Absensi belum dimulai!*\nKetik *mulaiabsen* untuk memulai absensi.');
            break;
        }
        
        const reason = args.join(' ') || '';
        const name = m.pushName || 'User';
        const result = logAbsen(m.sender, name, 'izin', reason);
        
        satanic.sendMessage(m.chat, { text: result.message, mentions: [m.sender] }, { quoted: m });
        
    } catch (err) {
        m.reply('❌ Error: ' + err.message);
    }
    break;
}

case 'rekapabsen': case 'rekap': {
    try {
        if (!isAbsenStarted()) {
            m.reply('⚠️ *Absensi belum dimulai!*\nKetik *mulaiabsen* untuk memulai absensi.');
            break;
        }
        
        const now = moment().tz('Asia/Jakarta');
        const date = now.format('DD/MM/YYYY');
        const time = now.format('HH:mm:ss');
        
        const data7 = getAbsenLastDays(7);
        const data14 = getAbsenLastDays(14);
        const data30 = getAbsenLastDays(30);
        
        let list7 = '';
        let totalHadir7 = 0;
        let totalIzin7 = 0;
        let izinNames7 = [];
        let mentions7 = [];
        
        for (let i = 0; i < data7.length; i++) {
            const d = data7[i];
            list7 += `📅 ${d.date} | ✅ ${d.hadir.length} | ❌ ${d.izin.length}\n`;
            totalHadir7 += d.hadir.length;
            totalIzin7 += d.izin.length;
            d.izin.forEach(a => {
                izinNames7.push(`@${a.sender.split('@')[0]} (${a.reason})`);
                mentions7.push(a.sender);
            });
        }
        
        let list14 = '';
        let totalHadir14 = 0;
        let totalIzin14 = 0;
        let izinNames14 = [];
        let mentions14 = [];
        
        for (let i = 0; i < data14.length; i++) {
            const d = data14[i];
            list14 += `📅 ${d.date} | ✅ ${d.hadir.length} | ❌ ${d.izin.length}\n`;
            totalHadir14 += d.hadir.length;
            totalIzin14 += d.izin.length;
            d.izin.forEach(a => {
                izinNames14.push(`@${a.sender.split('@')[0]} (${a.reason})`);
                mentions14.push(a.sender);
            });
        }
        
        let list30 = '';
        let totalHadir30 = 0;
        let totalIzin30 = 0;
        let izinNames30 = [];
        let mentions30 = [];
        
        for (let i = 0; i < data30.length; i++) {
            const d = data30[i];
            list30 += `📅 ${d.date} | ✅ ${d.hadir.length} | ❌ ${d.izin.length}\n`;
            totalHadir30 += d.hadir.length;
            totalIzin30 += d.izin.length;
            d.izin.forEach(a => {
                izinNames30.push(`@${a.sender.split('@')[0]} (${a.reason})`);
                mentions30.push(a.sender);
            });
        }
        
        let izinList7 = izinNames7.length > 0 ? izinNames7.join(', ') : 'Tidak ada';
        let izinList14 = izinNames14.length > 0 ? izinNames14.join(', ') : 'Tidak ada';
        let izinList30 = izinNames30.length > 0 ? izinNames30.join(', ') : 'Tidak ada';
        
        const msg = `📊 *REKAP ABSENSI LENGKAP*

📅 *7 HARI TERAKHIR:*
✅ Total Hadir: ${totalHadir7}
❌ Total Izin: ${totalIzin7}
📋 Total: ${totalHadir7 + totalIzin7}
👤 Yang Izin: ${izinList7}
${list7}

📅 *14 HARI TERAKHIR:*
✅ Total Hadir: ${totalHadir14}
❌ Total Izin: ${totalIzin14}
📋 Total: ${totalHadir14 + totalIzin14}
👤 Yang Izin: ${izinList14}
${list14}

📅 *30 HARI TERAKHIR:*
✅ Total Hadir: ${totalHadir30}
❌ Total Izin: ${totalIzin30}
📋 Total: ${totalHadir30 + totalIzin30}
👤 Yang Izin: ${izinList30}
${list30}

📅 Update: ${date}, ${time} WIB`;
        
        const allMentions = [...mentions7, ...mentions14, ...mentions30];
        satanic.sendMessage(m.chat, { text: msg, mentions: allMentions }, { quoted: m });
        
    } catch (err) {
        m.reply('❌ Error: ' + err.message);
    }
    break;
}

case 'myabsen': case 'my': {
    try {
        if (!isAbsenStarted()) {
            m.reply('⚠️ *Absensi belum dimulai!*\nKetik *mulaiabsen* untuk memulai absensi.');
            break;
        }
        
        const now = moment().tz('Asia/Jakarta');
        const date = now.format('DD/MM/YYYY');
        const time = now.format('HH:mm:ss');
        
        const myAbsen = getAbsenByUser(m.sender);
        
        if (myAbsen.length === 0) {
            const msg = `📋 *ABSENSI @${m.sender.split('@')[0]}*\n\nBelum ada riwayat absensi`;
            satanic.sendMessage(m.chat, { text: msg, mentions: [m.sender] }, { quoted: m });
            break;
        }
        
        let hadirCount = myAbsen.filter(a => a.type === 'hadir').length;
        let izinCount = myAbsen.filter(a => a.type === 'izin').length;
        
        let history = '';
        const limit = Math.min(10, myAbsen.length);
        const sorted = myAbsen.sort((a, b) => {
            if (a.date > b.date) return -1;
            if (a.date < b.date) return 1;
            return 0;
        });
        
        for (let i = 0; i < limit; i++) {
            const a = sorted[i];
            const icon = a.type === 'hadir' ? '✅' : '❌';
            history += `${icon} ${a.date} | ${a.type.toUpperCase()} ${a.reason !== '-' ? '- ' + a.reason : ''}\n`;
        }
        
        const msg = `📋 *ABSENSI @${m.sender.split('@')[0]}*

✅ *Hadir:* ${hadirCount}x
❌ *Izin:* ${izinCount}x

📅 *Riwayat Terakhir:*
${history}

📅 Update: ${date}, ${time} WIB`;
        
        satanic.sendMessage(m.chat, { text: msg, mentions: [m.sender] }, { quoted: m });
        
    } catch (err) {
        m.reply('❌ Error: ' + err.message);
    }
    break;
}

case 'resetabsen': case 'clearabsen': {
    try {
        if (!isAdmins) {
            m.reply('⚠️ *Perintah ini hanya untuk admin grup!*');
            break;
        }
        
        if (!isAbsenStarted()) {
            m.reply('⚠️ *Absensi belum dimulai!*\nKetik *mulaiabsen* untuk memulai absensi.');
            break;
        }
        
        const result = clearAbsenToday();
        if (result) {
            m.reply('✅ Absensi hari ini berhasil direset!');
        } else {
            m.reply('❌ Gagal mereset absensi!');
        }
    } catch (err) {
        m.reply('❌ Error: ' + err.message);
    }
    break;
}

case 'totalabsen': case 'total': {
    try {
        if (!isAbsenStarted()) {
            m.reply('⚠️ *Absensi belum dimulai!*\nKetik *mulaiabsen* untuk memulai absensi.');
            break;
        }
        
        const now = moment().tz('Asia/Jakarta');
        const date = now.format('DD/MM/YYYY');
        const time = now.format('HH:mm:ss');
        
        const totalAll = getTotalAbsen();
        const totalHadir = getTotalHadir();
        const totalIzin = getTotalIzin();
        
        const msg = `📊 *TOTAL ABSENSI*

📅 *Update:* ${date} ${time} WIB

📋 *Total Semua:* ${totalAll}
✅ *Total Hadir:* ${totalHadir}
❌ *Total Izin:* ${totalIzin}`;
        
        m.reply(msg);
        
    } catch (err) {
        m.reply('❌ Error: ' + err.message);
    }
    break;
} 
case 'addbadword': {
  if (!isCreator && !isAdmins) return reply('👑 Khusus admin/owner!')
  if (!isBotAdmins) return reply('jadikan bot admin dahulu')
  if (!text) return reply(`⚠️ Masukkan kata yang ingin ditambahkan!\n\nContoh: ${prefix + command} tolol`)
  
  let badwordList = []
  try {
    if (fs.existsSync("./database/badword.json")) {
      badwordList = JSON.parse(fs.readFileSync("./database/badword.json"))
    } else {
      fs.writeFileSync("./database/badword.json", "[]")
    }
  } catch (e) {
    badwordList = []
    fs.writeFileSync("./database/badword.json", "[]")
  }
  
  const word = text.toLowerCase().trim()
  
  if (!badwordList.includes(word)) {
    badwordList.push(word)
    fs.writeFileSync("./database/badword.json", JSON.stringify(badwordList, null, 2))
    reply(`✅ Badword *"${word}"* berhasil ditambahkan!\n\nTotal badword: ${badwordList.length}`)
  } else {
    reply(`❌ Badword *"${word}"* sudah ada dalam daftar!`)
  }
}
break
case 'listbadword': {
  if (!isCreator && !isAdmins) return reply('👑 Khusus admin/owner!')
if (!isBotAdmins) return reply('jadikan bot admin dahulu')  
  let badwordList = []
  try {
    if (fs.existsSync("./database/badword.json")) {
      badwordList = JSON.parse(fs.readFileSync("./database/badword.json"))
    }
  } catch (e) {}
  
  if (badwordList.length === 0) return reply('📋 Daftar badword kosong!')
  
  let teks = `📋 *DAFTAR BADWORD*\n\n`
  teks += `Total: ${badwordList.length} kata\n\n`
  
  for (let i = 0; i < badwordList.length; i++) {
    teks += `${i + 1}. ${badwordList[i]}\n`
  }
  
  reply(teks)
}
break

// ==================== DELETE BADWORD ====================
case 'delbadword': {
  if (!isCreator && !isAdmins) return reply('👑 Khusus admin/owner!')
  if (!isBotAdmins) return reply('jadikan bot admin dahulu')
  if (!text) return reply(`⚠️ Masukkan kata yang ingin dihapus!\n\nContoh: ${prefix + command} tolol`)
  
  let badwordList = []
  try {
    if (fs.existsSync("./database/badword.json")) {
      badwordList = JSON.parse(fs.readFileSync("./database/badword.json"))
    } else {
      return reply('📋 Daftar badword masih kosong!')
    }
  } catch (e) {
    return reply('📋 Daftar badword masih kosong!')
  }
  
  const word = text.toLowerCase().trim()
  const index = badwordList.indexOf(word)
  
  if (index !== -1) {
    badwordList.splice(index, 1)
    fs.writeFileSync("./database/badword.json", JSON.stringify(badwordList, null, 2))
    reply(`✅ Badword *"${word}"* berhasil dihapus!\n\nSisa badword: ${badwordList.length}`)
  } else {
    reply(`❌ Badword *"${word}"* tidak ditemukan!`)
  }
}
break
case 'delay': {
    if (!m.isGroup) return m.reply('Fitur ini khusus di dalam grup!');
    if (!isAdmins && !isCreator) return m.reply('Hanya untuk Admin/Owner.');
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
    if (!args[0]) return m.reply(`*Format salah!*\nContoh: ${prefix + command} on atau off`);

    if (args[0] === 'on') {
        global.db.chats[botNumber].antispam = true;
        m.reply('✅ *delay Aktif:* Bot sekarang akan membatasi spam chat.');
    } else if (args[0] === 'off') {
        global.db.chats[botNumber].antispam = false;
        m.reply('📴 *delay Mati:* Bot tidak akan membatasi kecepatan chat.');
    } else {
        m.reply('Gunakan opsi "on" atau "off".');
    }
}
break;
case 'antispam': {
if (!m.isGroup) return 
  if (!isAdmins && !isCreator) return 
  if (!isBotAdmins) return reply('jadikan bot admin dahulu')
    if (args[0] === 'on') {
        if (antiSpamGroups.includes(m.chat)) return m.reply('😏 Anti-Spam sudah *AKTIF* di grup ini.')
        antiSpamGroups.push(m.chat)
        fs.writeFileSync(dbSpamGroups, JSON.stringify(antiSpamGroups, null, 2))
        return m.reply('🔥 *Anti-Spam AKTIF!* \nSiap-siap, tukang spam bakal dipantau ketat 💀')
    }

    if (args[0] === 'off') {
        if (!antiSpamGroups.includes(m.chat)) return m.reply('🤨 Memang sudah *OFF* kok.')
        antiSpamGroups = antiSpamGroups.filter(id => id !== m.chat)
        fs.writeFileSync(dbSpamGroups, JSON.stringify(antiSpamGroups, null, 2))
        return m.reply('😴 Anti-Spam *dimatikan*. Tukang spam bisa bernapas lega…')
    }

    m.reply(
        '❓ *Cara Pakai Antispam:*\n\n' +
        '• `antispam on` → Aktifkan deteksi spam\n' +
        '• `antispam off` → Matikan deteksi spam\n' +
        '• `unwarn @user` → Hapus poin peringatan user\n' +
        '• `resetspam` → Bersihkan semua database spam'
    )
}
break
case 'ban':
  if (!isCreator && !isAdmins) return reply('👑 Khusus admin/owner!')
  if (!isAdmins && !isCreator) return reply(mess.admin)
  let targetBan = null
  
  if (m.quoted) {
    targetBan = m.quoted.sender
  } else if (m.mentionedJid && m.mentionedJid.length > 0) {
    targetBan = m.mentionedJid[0]
  } else if (text) {
    const nomor = text.replace(/[^0-9]/g, '')
    target = nomor + '@s.whatsapp.net'
  } else {
    return reply(`⚠️ Tag, reply, atau masukkan nomor user yang ingin di-ban!\n\nContoh: ${prefix + command} @user`)
  }
  
  if (targetBan === botNumber) return reply('❌ Tidak bisa memban bot sendiri!')
  if (targetBan === m.sender) return reply('❌ Tidak bisa memban diri sendiri!')
  
  if (!bannedList.includes(targetBan)) {
    bannedList.push(targetBan)
    fs.writeFileSync("./database/banuser.json", JSON.stringify(bannedList))
    await satanic.sendMessage(m.chat, {
    text: `✅ *User berhasil di-ban!*\n\n🚫 @${targetBan.split('@')[0]} tidak dapat menggunakan perintah bot lagi.`,
    mentions: [targetBan]
}, { quoted: m })
  } else {
    reply(`❌ User sudah dalam daftar ban!`)
  }
break
case 'unban':
  if (!isCreator && !isAdmins) return reply('👑 Khusus admin/owner!')
  if (!isAdmins && !isCreator) return reply(mess.admin)
  let targetUnban = null
  
  if (m.quoted) {
    targetUnban = m.quoted.sender
  } else if (m.mentionedJid && m.mentionedJid.length > 0) {
    targetUnban = m.mentionedJid[0]
  } else if (text) {
    const nomor = text.replace(/[^0-9]/g, '')
    targetUnban = nomor + '@s.whatsapp.net'
  } else {
    return reply(`⚠️ Tag, reply, atau masukkan nomor user yang ingin di-unban!\n\nContoh: .unban 628xxx`)
  }
  
  const index = bannedList.indexOf(targetUnban)
  if (index !== -1) {
    bannedList.splice(index, 1)
    fs.writeFileSync("./database/banuser.json", JSON.stringify(bannedList))
await satanic.sendMessage(m.chat, {
    text: `✅ *User berhasil di-unban!*\n\n✅ @${targetUnban.split('@')[0]} sekarang dapat menggunakan perintah bot lagi.`,
    mentions: [targetUnban]
}, { quoted: m })
  } else {
    reply(`❌ User tidak ditemukan dalam daftar ban!`)
  }
break
case 'listban':
  if (!isCreator && !isAdmins) return reply('👑 Khusus admin/owner!')
  if (!isAdmins && !isCreator) return reply(mess.admin)
  if (bannedList.length === 0) {
    reply(`📋 *Daftar Ban*\n\nTidak ada user yang di-ban.`)
  } else {
    let text = `📋 *Daftar User yang Di-Ban*\n\n`
    for (let user of bannedList) {
      text += `👤 @${user.split('@')[0]}\n`
    }
    text += `\n📊 Total: ${bannedList.length} user`
    reply(text, { mentions: bannedList })
  }
break
case 'antibadword': {
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
  const antiBadwordData = getAntiBadwordData();
  if (!antiBadwordData[m.chat]) {
    antiBadwordData[m.chat] = {
      active: false,
      mode: 'delete',
      warns: {},
      maxWarn: 3
    };
    saveAntiBadwordData(antiBadwordData);
  }
  
  const chatConfig = antiBadwordData[m.chat];
  const cmd = args[0] || '';
  const subCmd = args[1] || '';
  
  if (cmd === 'delete') {
    if (subCmd === 'on') {
      chatConfig.active = true;
      chatConfig.mode = 'delete';
      chatConfig.warns = {};
      saveAntiBadwordData(antiBadwordData);
      reply('✅ Mode DELETE aktif!');
    } else if (subCmd === 'off') {
      chatConfig.active = false;
      chatConfig.warns = {};
      saveAntiBadwordData(antiBadwordData);
      reply('❌ Mode DELETE nonaktif!');
    } else {
      reply(`📝 Cara Pakai:\n${prefix}antibadword delete on\n${prefix}antibadword delete off`);
    }
  } else if (cmd === 'warn') {
    if (subCmd === 'on') {
      chatConfig.active = true;
      chatConfig.mode = 'warn';
      chatConfig.warns = {};
      chatConfig.maxWarn = 3;
      saveAntiBadwordData(antiBadwordData);
      reply('✅ Mode WARN aktif!');
    } else if (subCmd === 'off') {
      chatConfig.active = false;
      chatConfig.warns = {};
      saveAntiBadwordData(antiBadwordData);
      reply('❌ Mode WARN nonaktif!');
    } else {
      reply(`📝 Cara Pakai:\n${prefix}antibadword warn on\n${prefix}antibadword warn off`);
    }
  } else if (cmd === 'delwarn') {
    if (!chatConfig.active) return reply('⚠️ Antibadword tidak aktif!');
    if (chatConfig.mode !== 'warn') return reply('⚠️ Mode bukan warn!');
    const target = antibadwordGetJid(m);
    if (!target) return reply('⚠️ Reply atau tag user!');
    if (!chatConfig.warns?.[target]) return reply('⚠️ User tidak punya warning');
    delete chatConfig.warns[target];
    saveAntiBadwordData(antiBadwordData);
    await satanic.sendMessage(m.chat, {
      text: `✅ Warning @${target.split('@')[0]} dihapus!`,
      mentions: [target]
    });
  } else if (cmd === 'listwarn') {
    if (!chatConfig.active) return reply('⚠️ Antibadword tidak aktif!');
    if (chatConfig.mode !== 'warn') return reply('⚠️ Mode bukan warn!');
    if (!chatConfig.warns || Object.keys(chatConfig.warns).length === 0) {
      return reply('Tidak ada warning');
    }
    let txt = 'DAFTAR WARNING\n\n';
    let mentions = [];
    for (let [id, data] of Object.entries(chatConfig.warns)) {
      let name = data.name || id.split('@')[0];
      txt += `• @${name} - ${data.count}/3\n`;
      mentions.push(id);
    }
    await satanic.sendMessage(m.chat, {
      text: txt,
      mentions: mentions
    });
  } else {
    const status = chatConfig.active ? '✅ ON' : '❌ OFF';
    const mode = chatConfig.mode.toUpperCase();
    const totalWarn = chatConfig.warns ? Object.keys(chatConfig.warns).length : 0;
    reply(`⚙️ ANTI BADWORD\n\nStatus: ${status}\nMode: ${mode}\nWarning: ${totalWarn} user\n\nCommands:\n${prefix}antibadword delete on/off\n${prefix}antibadword warn on/off\n${prefix}antibadword delwarn\n${prefix}antibadword listwarn`);
  }
  break;
}
case 'notifpromote':
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu');
if (!isAdmins && !isCreator) return reply(mess.admin);
    if (!global.db.chats[m.chat]) global.db.chats[m.chat] = {};
    if (args[0] === 'on') {
        global.db.chats[m.chat].notifpromote = true;
        reply('Notif Promote DIACTIVEKAN');
    } else if (args[0] === 'off') {
        global.db.chats[m.chat].notifpromote = false;
        reply('Notif Promote DINONACTIVEKAN');
    } else {
        const status = global.db.chats[m.chat].notifpromote ? 'AKTIF' : 'NONAKTIF';
        reply(`*STATUS NOTIF PROMOTE:* ${status}\n\n.notifpromote on - Aktifkan\n.notifpromote off - Nonaktifkan`);
    }
    break;

case 'notifdemote':
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu');
if (!isAdmins && !isCreator) return reply(mess.admin);
    if (!global.db.chats[m.chat]) global.db.chats[m.chat] = {};
    if (args[0] === 'on') {
        global.db.chats[m.chat].notifdemote = true;
        reply('Notif Demote DIACTIVEKAN');
    } else if (args[0] === 'off') {
        global.db.chats[m.chat].notifdemote = false;
        reply('Notif Demote DINONACTIVEKAN');
    } else {
        const status = global.db.chats[m.chat].notifdemote ? 'AKTIF' : 'NONAKTIF';
        reply(`*STATUS NOTIF DEMOTE:* ${status}\n\n.notifdemote on - Aktifkan\n.notifdemote off - Nonaktifkan`);
    }
    break;

case 'setpromote':
case 'setnotifpromotetext':
    if (!m.isGroup) return reply(mess.group);
    if (!isBotAdmins) return reply('jadikan bot admin dahulu');
    if (!isAdmins && !isCreator) return reply(mess.admin);
    if (!text) return reply(`Example: ${prefix + command} @admin mempromosikan @user\n\n@admin - admin yang eksekusi\n@user - tag user\n@subject - group name\n@desc - group description\n@date - date`);
    if (!global.db.chats[m.chat]) global.db.chats[m.chat] = {};
    global.db.chats[m.chat].setPromote = text;
    reply(`Set Promote berhasil diubah!\n\nTeks:\n${text}`);
    break;

case 'setdemote':
case 'setnotifdemotetext':
    if (!m.isGroup) return reply(mess.group);
    if (!isBotAdmins) return reply('jadikan bot admin dahulu');
    if (!isAdmins && !isCreator) return reply(mess.admin);
    if (!text) return reply(`Example: ${prefix + command} @admin mencabut admin @user\n\n@admin - admin yang eksekusi\n@user - tag user\n@subject - group name\n@desc - group description\n@date - date`);
    if (!global.db.chats[m.chat]) global.db.chats[m.chat] = {};
    global.db.chats[m.chat].setDemote = text;
    reply(`Set Demote berhasil diubah!\n\nTeks:\n${text}`);
    break;
case 'addautobl':    
 case 'autobl':
    if (!m.isGroup) return reply(mess.group);
    if (!isBotAdmins) return reply('jadikan bot admin dahulu');
    if (!isAdmins && !isCreator) return reply(mess.admin);
    if (!global.db.chats[m.chat]) global.db.chats[m.chat] = {};
    
    if (args[0] === 'on') {
        global.db.chats[m.chat].blacklist = true;
        reply('*Blacklist DIACTIVEKAN jika member keluar group maka otomatis di simpan ke database dan jika ingin join kembali maka user otomatis terdeteksi lalu kick otomatis oleh bot*');
    } else if (args[0] === 'off') {
        global.db.chats[m.chat].blacklist = false;
        reply('Blacklist DINONACTIVEKAN');
    } else {
        const status = global.db.chats[m.chat].blacklist ? 'AKTIF' : 'NONAKTIF';
        reply(`*STATUS BLACKLIST:* ${status}\n\n.blacklistuser on - Aktifkan\n.blacklistuser off - Nonaktifkan`);
    }
    break;
case 'autoblwarn':
case 'blacklistuserwarn':
    if (!m.isGroup) return reply(mess.group);
    if (!isBotAdmins) return reply('jadikan bot admin dahulu');
    if (!isAdmins && !isCreator) return reply(mess.admin);
    if (!global.db.chats[m.chat]) global.db.chats[m.chat] = {};
    
    if (args[0] === 'on') {
        global.db.chats[m.chat].blacklistWarn = true;
        reply('Blacklist Warn DIACTIVEKAN\n\nUser akan di-warn dulu, kick otomatis jika keluar group 3x');
    } else if (args[0] === 'off') {
        global.db.chats[m.chat].blacklistWarn = false;
        reply('Blacklist Warn DINONACTIVEKAN\n\nUser langsung di-kick 1x saat keluar-masuk.');
    } else {
        const status = global.db.chats[m.chat].blacklistWarn ? 'AKTIF' : 'NONAKTIF';
        reply(`*STATUS BLACKLIST WARN:* ${status}\n\n.blacklistuserwarn on - Warn dulu, kick di 3x\n.blacklistuserwarn off - Langsung kick 1x`);
    }
    break;
case 'limitbl':
case 'blacklistlimit':
    if (!m.isGroup) return reply(mess.group);
    if (!isBotAdmins) return reply('jadikan bot admin dahulu');
    if (!isAdmins && !isCreator) return reply(mess.admin);
    if (!global.db.chats[m.chat]) global.db.chats[m.chat] = {};
    
    if (!args[0] || isNaN(args[0])) {
        const limit = global.db.chats[m.chat].blacklistLimit || 3;
        return reply(`*BATAS KICK:* ${limit}x\n\n.blacklistlimit 5 - Ubah batas kick`);
    }
    global.db.chats[m.chat].blacklistLimit = parseInt(args[0]);
    reply(`Batas kick blacklist diubah ke ${args[0]}x`);
    break;
case 'listbl':
case 'blacklistlist':
    if (!m.isGroup) return reply(mess.group);
    if (!isBotAdmins) return reply('jadikan bot admin dahulu');
    if (!isAdmins && !isCreator) return reply(mess.admin);
    if (!global.db.blacklistUser || !global.db.blacklistUser[m.chat]) {
        return reply('Tidak ada user di blacklist.');
    }
    let listBl = Object.entries(global.db.blacklistUser[m.chat])
        .map(([jid, data]) => `• @${jid.split('@')[0]} → ${data.count}x keluar`)
        .join('\n');
    reply(`*DAFTAR BLACKLIST:*\n\n${listBl}`);
    break;

case 'blacklistreset':
    if (!m.isGroup) return reply(mess.group);
    if (!isBotAdmins) return reply('jadikan bot admin dahulu');
    if (!isAdmins && !isCreator) return reply(mess.admin);
    if (!global.db.blacklistUser || !global.db.blacklistUser[m.chat]) {
        return reply('Tidak ada user di blacklist.');
    }
    delete global.db.blacklistUser[m.chat];
    reply('Daftar blacklist grup ini berhasil direset.');
    break;   
case 'antimedia': {
  if (!m.isGroup) return reply('⚠️ Khusus grup!');
  if (!isAdmins && !isCreator) return reply('👑 Khusus admin!');
if (!isBotAdmins) return reply('jadikan bot admin dahulu');
  if (!global.db.chats[m.chat]) {
    global.db.chats[m.chat] = {
      antimedia: false,
      antimediaMode: 'delete',
      antimediaTypes: [],
      warns: {}
    };
    require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
  }

  if (!global.db.chats[m.chat].antimediaTypes) {
    global.db.chats[m.chat].antimediaTypes = [];
  }
  const chatData = global.db.chats[m.chat];
  const antimediaAktif = chatData?.antimedia || false;
  const antimediaMode = chatData?.antimediaMode || 'delete';
  const antimediaTypes = chatData?.antimediaTypes || [];
  const cmd = text.split(' ')[0];
  const subCmd = text.split(' ')[1];

  if (cmd === 'warn') {
    if (subCmd === 'on') {
      if (antimediaAktif && antimediaMode === 'warn') return reply('⚠️ Mode warn sudah aktif!');
      global.db.chats[m.chat].antimedia = true;
      global.db.chats[m.chat].antimediaMode = 'warn';
      global.db.chats[m.chat].warns = {};
      if (!global.db.chats[m.chat].antimediaTypes) global.db.chats[m.chat].antimediaTypes = [];
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Mode WARN aktif!\nUser akan di kick jika 3x warning media');
    } else if (subCmd === 'off') {
      if (!antimediaAktif) return reply('⚠️ Antimedia tidak aktif!');
      if (antimediaMode !== 'warn') return reply('⚠️ Mode bukan warn!');
      global.db.chats[m.chat].antimedia = false;
      global.db.chats[m.chat].warns = {};
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('❌ Mode WARN nonaktif!');
    } else {
      reply(`📝 Cara Penggunaan Antimedia Warn:\n\n➤ ${prefix}antimedia warn on\n   Mengaktifkan mode warn untuk semua media\n   User akan di warning jika kirim media terlarang\n   Jika 3x warning, otomatis di kick\n\n➤ ${prefix}antimedia warn off\n   Menonaktifkan mode warn\n\n📌 Contoh:\n${prefix}antimedia warn on\n✅ Mode WARN aktif!`);
    }
  } else if (cmd === 'delete') {
    if (subCmd === 'on') {
      if (antimediaAktif && antimediaMode === 'delete') return reply('⚠️ Mode delete sudah aktif!');
      global.db.chats[m.chat].antimedia = true;
      global.db.chats[m.chat].antimediaMode = 'delete';
      global.db.chats[m.chat].warns = {};
      if (!global.db.chats[m.chat].antimediaTypes) global.db.chats[m.chat].antimediaTypes = [];
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Mode DELETE aktif!\nMedia terlarang akan dihapus + peringatan');
    } else if (subCmd === 'off') {
      if (!antimediaAktif) return reply('⚠️ Antimedia tidak aktif!');
      if (antimediaMode !== 'delete') return reply('⚠️ Mode bukan delete!');
      global.db.chats[m.chat].antimedia = false;
      global.db.chats[m.chat].warns = {};
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('❌ Mode DELETE nonaktif!');
    } else {
      reply(`📝 Cara Penggunaan Antimedia Delete:\n\n➤ ${prefix}antimedia delete on\n   Mengaktifkan mode delete untuk semua media\n   Media terlarang akan dihapus + peringatan\n   Tanpa warning dan tanpa kick\n\n➤ ${prefix}antimedia delete off\n   Menonaktifkan mode delete\n\n📌 Contoh:\n${prefix}antimedia delete on\n✅ Mode DELETE aktif!`);
    }
  } else if (cmd === 'image') {
    if (subCmd === 'on') {
      if (!antimediaAktif) return reply('⚠️ Aktifkan antimedia dulu! (warn/delete)');
      if (antimediaTypes.includes('image')) return reply('⚠️ Image sudah diblokir!');
      if (!global.db.chats[m.chat].antimediaTypes) global.db.chats[m.chat].antimediaTypes = [];
      global.db.chats[m.chat].antimediaTypes.push('image');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Image diblokir!\nMedia image akan dihapus');
    } else if (subCmd === 'off') {
      if (!antimediaTypes.includes('image')) return reply('⚠️ Image tidak diblokir!');
      global.db.chats[m.chat].antimediaTypes = antimediaTypes.filter(t => t !== 'image');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Image diizinkan!');
    } else {
      reply(`📝 Cara Penggunaan Antimedia Image:\n\n➤ ${prefix}antimedia image on\n   Memblokir image (gambar)\n   Image akan dihapus + peringatan\n\n➤ ${prefix}antimedia image off\n   Mengizinkan image\n\n📌 Contoh:\n${prefix}antimedia image on\n✅ Image diblokir!`);
    }
  } else if (cmd === 'video') {
    if (subCmd === 'on') {
      if (!antimediaAktif) return reply('⚠️ Aktifkan antimedia dulu! (warn/delete)');
      if (antimediaTypes.includes('video')) return reply('⚠️ Video sudah diblokir!');
      if (!global.db.chats[m.chat].antimediaTypes) global.db.chats[m.chat].antimediaTypes = [];
      global.db.chats[m.chat].antimediaTypes.push('video');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Video diblokir!\nMedia video akan dihapus');
    } else if (subCmd === 'off') {
      if (!antimediaTypes.includes('video')) return reply('⚠️ Video tidak diblokir!');
      global.db.chats[m.chat].antimediaTypes = antimediaTypes.filter(t => t !== 'video');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Video diizinkan!');
    } else {
      reply(`📝 Cara Penggunaan Antimedia Video:\n\n➤ ${prefix}antimedia video on\n   Memblokir video\n   Video akan dihapus + peringatan\n\n➤ ${prefix}antimedia video off\n   Mengizinkan video\n\n📌 Contoh:\n${prefix}antimedia video on\n✅ Video diblokir!`);
    }
  } else if (cmd === 'audio') {
    if (subCmd === 'on') {
      if (!antimediaAktif) return reply('⚠️ Aktifkan antimedia dulu! (warn/delete)');
      if (antimediaTypes.includes('audio')) return reply('⚠️ Audio sudah diblokir!');
      if (!global.db.chats[m.chat].antimediaTypes) global.db.chats[m.chat].antimediaTypes = [];
      global.db.chats[m.chat].antimediaTypes.push('audio');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Audio diblokir!\nMedia audio akan dihapus');
    } else if (subCmd === 'off') {
      if (!antimediaTypes.includes('audio')) return reply('⚠️ Audio tidak diblokir!');
      global.db.chats[m.chat].antimediaTypes = antimediaTypes.filter(t => t !== 'audio');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Audio diizinkan!');
    } else {
      reply(`📝 Cara Penggunaan Antimedia Audio:\n\n➤ ${prefix}antimedia audio on\n   Memblokir audio (suara)\n   Audio akan dihapus + peringatan\n\n➤ ${prefix}antimedia audio off\n   Mengizinkan audio\n\n📌 Contoh:\n${prefix}antimedia audio on\n✅ Audio diblokir!`);
    }
  } else if (cmd === 'sticker') {
    if (subCmd === 'on') {
      if (!antimediaAktif) return reply('⚠️ Aktifkan antimedia dulu! (warn/delete)');
      if (antimediaTypes.includes('sticker')) return reply('⚠️ Sticker sudah diblokir!');
      if (!global.db.chats[m.chat].antimediaTypes) global.db.chats[m.chat].antimediaTypes = [];
      global.db.chats[m.chat].antimediaTypes.push('sticker');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Sticker diblokir!\nMedia sticker akan dihapus');
    } else if (subCmd === 'off') {
      if (!antimediaTypes.includes('sticker')) return reply('⚠️ Sticker tidak diblokir!');
      global.db.chats[m.chat].antimediaTypes = antimediaTypes.filter(t => t !== 'sticker');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Sticker diizinkan!');
    } else {
      reply(`📝 Cara Penggunaan Antimedia Sticker:\n\n➤ ${prefix}antimedia sticker on\n   Memblokir sticker\n   Sticker akan dihapus + peringatan\n\n➤ ${prefix}antimedia sticker off\n   Mengizinkan sticker\n\n📌 Contoh:\n${prefix}antimedia sticker on\n✅ Sticker diblokir!`);
    }
  } else if (cmd === 'document') {
    if (subCmd === 'on') {
      if (!antimediaAktif) return reply('⚠️ Aktifkan antimedia dulu! (warn/delete)');
      if (antimediaTypes.includes('document')) return reply('⚠️ Document sudah diblokir!');
      if (!global.db.chats[m.chat].antimediaTypes) global.db.chats[m.chat].antimediaTypes = [];
      global.db.chats[m.chat].antimediaTypes.push('document');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Document diblokir!\nMedia document akan dihapus');
    } else if (subCmd === 'off') {
      if (!antimediaTypes.includes('document')) return reply('⚠️ Document tidak diblokir!');
      global.db.chats[m.chat].antimediaTypes = antimediaTypes.filter(t => t !== 'document');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Document diizinkan!');
    } else {
      reply(`📝 Cara Penggunaan Antimedia Document:\n\n➤ ${prefix}antimedia document on\n   Memblokir document (file)\n   Document akan dihapus + peringatan\n\n➤ ${prefix}antimedia document off\n   Mengizinkan document\n\n📌 Contoh:\n${prefix}antimedia document on\n✅ Document diblokir!`);
    }
  } else if (cmd === 'all') {
    if (subCmd === 'on') {
      if (!antimediaAktif) return reply('⚠️ Aktifkan antimedia dulu! (warn/delete)');
      if (antimediaTypes.includes('all')) return reply('⚠️ Semua media sudah diblokir!');
      global.db.chats[m.chat].antimediaTypes = ['all'];
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Semua media diblokir!\nImage, Video, Audio, Sticker, Document akan dihapus');
    } else if (subCmd === 'off') {
      if (!antimediaTypes.includes('all')) return reply('⚠️ Tidak ada media yang diblokir!');
      global.db.chats[m.chat].antimediaTypes = [];
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Semua media diizinkan!');
    } else {
      reply(`📝 Cara Penggunaan Antimedia All:\n\n➤ ${prefix}antimedia all on\n   Memblokir SEMUA media sekaligus\n   Image, Video, Audio, Sticker, Document\n   Semua akan dihapus + peringatan\n\n➤ ${prefix}antimedia all off\n   Mengizinkan semua media\n\n📌 Contoh:\n${prefix}antimedia all on\n✅ Semua media diblokir!`);
    }
  } else if (cmd === 'delwarn') {
    if (!antimediaAktif) return reply('⚠️ Antimedia tidak aktif!');
    if (antimediaMode !== 'warn') return reply('⚠️ Mode bukan warn!');
    const target = antimediaGetJid(m);
    if (!target) return reply('⚠️ Reply atau tag user!');
    if (!chatData.warns?.[target]) return reply('⚠️ User tidak punya warning');
    delete chatData.warns[target];
    if (global.db.users[target]) {
      delete global.db.users[target];
    }
    require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
    await satanic.sendMessage(m.chat, {
      text: `✅ Warning @${target.split('@')[0]} dihapus!`,
      mentions: [target]
    });
  } else if (cmd === 'listwarn') {
    if (!antimediaAktif) return reply('⚠️ Antimedia tidak aktif!');
    if (antimediaMode !== 'warn') return reply('⚠️ Mode bukan warn!');
    if (!chatData.warns || !Object.keys(chatData.warns).length) return reply('📌 Tidak ada warning');
    let txt = '📋 DAFTAR WARNING MEDIA\n\n';
    let mentions = [];
    for (let [id, count] of Object.entries(chatData.warns)) {
      let name = global.db.users[id]?.name || id.split('@')[0];
      txt += `• @${name} - ${count}/3\n`;
      mentions.push(id);
    }
    await satanic.sendMessage(m.chat, {
      text: txt,
      mentions: mentions
    });
  } else {
    const total = chatData?.warns ? Object.keys(chatData.warns).length : 0;
    const types = antimediaTypes.length ? antimediaTypes.join(', ') : 'Tidak ada';
    reply(`⚙️ ANTIMEDIA\n\n📌 Status: ${antimediaAktif ? '✅ ON' : '❌ OFF'}\n📋 Mode: ${antimediaMode.toUpperCase()}\n🚫 Diblokir: ${types}\n⚠️ Warning: ${total} user\n\n📝 Commands:\n\n➤ ${prefix}antimedia warn on/off\n   Aktifkan/nonaktifkan mode warn\n\n➤ ${prefix}antimedia delete on/off\n   Aktifkan/nonaktifkan mode delete\n\n➤ ${prefix}antimedia image on/off\n   Blokir/izinkan image\n\n➤ ${prefix}antimedia video on/off\n   Blokir/izinkan video\n\n➤ ${prefix}antimedia audio on/off\n   Blokir/izinkan audio\n\n➤ ${prefix}antimedia sticker on/off\n   Blokir/izinkan sticker\n\n➤ ${prefix}antimedia document on/off\n   Blokir/izinkan document\n\n➤ ${prefix}antimedia all on/off\n   Blokir/izinkan SEMUA media\n\n➤ ${prefix}antimedia delwarn (reply/tag)\n   Hapus warning user\n\n➤ ${prefix}antimedia listwarn\n   Lihat daftar warning\n\n💡 Contoh Penggunaan:\n${prefix}antimedia delete on\n${prefix}antimedia image on\n${prefix}antimedia video on\n✅ Image & video diblokir!`);
  }
  break;
}
case 'antilink': {
  if (!m.isGroup) return reply('Khusus grup!');
  if (!isAdmins && !isCreator) return reply('Khusus admin!');
if (!isBotAdmins) return reply('jadikan bot admin dahulu');
  const chatData = global.db.chats[m.chat];
  const antilinkAktif = chatData?.antilink || false;
  const antilinkMode = chatData?.antilinkMode || 'delete';
  const cmd = text.split(' ')[0];
  const subCmd = text.split(' ')[1];

  if (cmd === 'warn') {
    if (subCmd === 'on') {
      if (antilinkAktif && antilinkMode === 'warn') return reply('Mode warn sudah aktif!');
      global.db.chats[m.chat].antilink = true;
      global.db.chats[m.chat].antilinkMode = 'warn';
      global.db.chats[m.chat].warns = {};
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Mode WARN aktif!\nUser akan di kick jika 3x warning');
    } else if (subCmd === 'off') {
      if (!antilinkAktif) return reply('Antilink tidak aktif!');
      if (antilinkMode !== 'warn') return reply('Mode bukan warn!');
      global.db.chats[m.chat].antilink = false;
      global.db.chats[m.chat].warns = {};
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('❌ Mode WARN nonaktif!');
    } else {
      reply(`Gunakan:\n${prefix}antilink warn on - Aktifkan mode warn\n${prefix}antilink warn off - Nonaktifkan mode warn`);
    }
  } else if (cmd === 'delete') {
    if (subCmd === 'on') {
      if (antilinkAktif && antilinkMode === 'delete') return reply('Mode delete sudah aktif!');
      global.db.chats[m.chat].antilink = true;
      global.db.chats[m.chat].antilinkMode = 'delete';
      global.db.chats[m.chat].warns = {};
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Mode DELETE aktif!\nPesan link akan dihapus + peringatan');
    } else if (subCmd === 'off') {
      if (!antilinkAktif) return reply('Antilink tidak aktif!');
      if (antilinkMode !== 'delete') return reply('Mode bukan delete!');
      global.db.chats[m.chat].antilink = false;
      global.db.chats[m.chat].warns = {};
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('❌ Mode DELETE nonaktif!');
    } else {
      reply(`Gunakan:\n${prefix}antilink delete on - Aktifkan mode delete\n${prefix}antilink delete off - Nonaktifkan mode delete`);
    }
  } else if (cmd === 'delwarn') {
    if (!antilinkAktif) return reply('Antilink tidak aktif!');
    if (antilinkMode !== 'warn') return reply('Mode bukan warn!');
    const target = antilinkGetJid(m);
    if (!target) return reply('Reply atau tag user!');
    if (!chatData.warns?.[target]) return reply('User tidak punya warning');
    delete chatData.warns[target];
    if (global.db.users[target]) {
      delete global.db.users[target];
    }
    require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
    reply(`✅ Warning @${target.split('@')[0]} (${target.split('@')[0]}) dihapus!`, [target]);
  } else if (cmd === 'reset') {
    if (!antilinkAktif) return reply('Antilink tidak aktif!');
    chatData.warns = {};
    require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
    reply('✅ Semua warning direset!');
  } else if (cmd === 'list') {
    if (!antilinkAktif) return reply('Antilink tidak aktif!');
    if (antilinkMode !== 'warn') return reply('Mode bukan warn!');
    if (!chatData.warns || !Object.keys(chatData.warns).length) return reply('Tidak ada warning');
    let txt = '📋 DAFTAR WARNING\n\n';
    let mentions = [];
    for (let [id, count] of Object.entries(chatData.warns)) {
      let name = global.db.users[id]?.name || id.split('@')[0];
      let number = id.split('@')[0];
      txt += `• ${name} (${number}) - ${count}/3\n`;
      mentions.push(id);
    }
    reply(txt, mentions);
  } else {
    const total = chatData?.warns ? Object.keys(chatData.warns).length : 0;
    reply(`⚙️ ANTILINK\n\nStatus: ${antilinkAktif ? '✅ ON' : '❌ OFF'}\nMode: ${antilinkMode.toUpperCase()}\nWarning: ${total} user\n\nCommands:\n${prefix}antilink warn on/off\n${prefix}antilink delete on/off\n${prefix}antilink delwarn (reply/tag)\n${prefix}antilink reset\n${prefix}antilink list`);
  }
  break;
}
case 'antilinksosmed': {
  if (!m.isGroup) return reply('⚠️ Khusus grup!');
  if (!isAdmins && !isCreator) return reply('👑 Khusus admin!');
if (!isBotAdmins) return reply('jadikan bot admin dahulu');
  if (!global.db.chats[m.chat]) {
    global.db.chats[m.chat] = {
      antilinksosmed: false,
      antilinksosmedMode: 'delete',
      antilinksosmedTypes: [],
      warns: {}
    };
    require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
  }

  if (!global.db.chats[m.chat].antilinksosmedTypes) {
    global.db.chats[m.chat].antilinksosmedTypes = [];
  }

  const chatData = global.db.chats[m.chat];
  const antilinksosmedAktif = chatData?.antilinksosmed || false;
  const antilinksosmedMode = chatData?.antilinksosmedMode || 'delete';
  const antilinksosmedTypes = chatData?.antilinksosmedTypes || [];
  const cmd = text.split(' ')[0];
  const subCmd = text.split(' ')[1];

  if (cmd === 'warn') {
    if (subCmd === 'on') {
      if (antilinksosmedAktif && antilinksosmedMode === 'warn') return reply('⚠️ Mode warn sudah aktif!');
      global.db.chats[m.chat].antilinksosmed = true;
      global.db.chats[m.chat].antilinksosmedMode = 'warn';
      global.db.chats[m.chat].warns = {};
      if (!global.db.chats[m.chat].antilinksosmedTypes) global.db.chats[m.chat].antilinksosmedTypes = [];
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Mode WARN aktif!\nUser akan di kick jika 3x warning link');
    } else if (subCmd === 'off') {
      if (!antilinksosmedAktif) return reply('⚠️ Antilinksosmed tidak aktif!');
      if (antilinksosmedMode !== 'warn') return reply('⚠️ Mode bukan warn!');
      global.db.chats[m.chat].antilinksosmed = false;
      global.db.chats[m.chat].warns = {};
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('❌ Mode WARN nonaktif!');
    } else {
      reply(`📝 Cara Penggunaan Antilinksosmed Warn:\n\n➤ ${prefix}antilinksosmed warn on\n   Mengaktifkan mode warn untuk semua link\n   User akan di warning jika kirim link terlarang\n   Jika 3x warning, otomatis di kick\n\n➤ ${prefix}antilinksosmed warn off\n   Menonaktifkan mode warn\n\n📌 Contoh:\n${prefix}antilinksosmed warn on\n✅ Mode WARN aktif!`);
    }
  } else if (cmd === 'delete') {
    if (subCmd === 'on') {
      if (antilinksosmedAktif && antilinksosmedMode === 'delete') return reply('⚠️ Mode delete sudah aktif!');
      global.db.chats[m.chat].antilinksosmed = true;
      global.db.chats[m.chat].antilinksosmedMode = 'delete';
      global.db.chats[m.chat].warns = {};
      if (!global.db.chats[m.chat].antilinksosmedTypes) global.db.chats[m.chat].antilinksosmedTypes = [];
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Mode DELETE aktif!\nLink terlarang akan dihapus + peringatan');
    } else if (subCmd === 'off') {
      if (!antilinksosmedAktif) return reply('⚠️ Antilinksosmed tidak aktif!');
      if (antilinksosmedMode !== 'delete') return reply('⚠️ Mode bukan delete!');
      global.db.chats[m.chat].antilinksosmed = false;
      global.db.chats[m.chat].warns = {};
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('❌ Mode DELETE nonaktif!');
    } else {
      reply(`📝 Cara Penggunaan Antilinksosmed Delete:\n\n➤ ${prefix}antilinksosmed delete on\n   Mengaktifkan mode delete untuk semua link\n   Link terlarang akan dihapus + peringatan\n   Tanpa warning dan tanpa kick\n\n➤ ${prefix}antilinksosmed delete off\n   Menonaktifkan mode delete\n\n📌 Contoh:\n${prefix}antilinksosmed delete on\n✅ Mode DELETE aktif!`);
    }
  } else if (cmd === 'google') {
    if (subCmd === 'on') {
      if (!antilinksosmedAktif) return reply('⚠️ Aktifkan antilinksosmed dulu! (warn/delete)');
      if (antilinksosmedTypes.includes('google')) return reply('⚠️ Google sudah diblokir!');
      if (!global.db.chats[m.chat].antilinksosmedTypes) global.db.chats[m.chat].antilinksosmedTypes = [];
      global.db.chats[m.chat].antilinksosmedTypes.push('google');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Google diblokir!\nLink Google akan dihapus');
    } else if (subCmd === 'off') {
      if (!antilinksosmedTypes.includes('google')) return reply('⚠️ Google tidak diblokir!');
      global.db.chats[m.chat].antilinksosmedTypes = antilinksosmedTypes.filter(t => t !== 'google');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Google diizinkan!');
    } else {
      reply(`📝 Cara Penggunaan Antilinksosmed Google:\n\n➤ ${prefix}antilinksosmed google on\n   Memblokir link Google\n   Link akan dihapus + peringatan\n\n➤ ${prefix}antilinksosmed google off\n   Mengizinkan link Google\n\n📌 Contoh:\n${prefix}antilinksosmed google on\n✅ Google diblokir!`);
    }
  } else if (cmd === 'youtube') {
    if (subCmd === 'on') {
      if (!antilinksosmedAktif) return reply('⚠️ Aktifkan antilinksosmed dulu! (warn/delete)');
      if (antilinksosmedTypes.includes('youtube')) return reply('⚠️ Youtube sudah diblokir!');
      if (!global.db.chats[m.chat].antilinksosmedTypes) global.db.chats[m.chat].antilinksosmedTypes = [];
      global.db.chats[m.chat].antilinksosmedTypes.push('youtube');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Youtube diblokir!\nLink Youtube akan dihapus');
    } else if (subCmd === 'off') {
      if (!antilinksosmedTypes.includes('youtube')) return reply('⚠️ Youtube tidak diblokir!');
      global.db.chats[m.chat].antilinksosmedTypes = antilinksosmedTypes.filter(t => t !== 'youtube');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Youtube diizinkan!');
    } else {
      reply(`📝 Cara Penggunaan Antilinksosmed Youtube:\n\n➤ ${prefix}antilinksosmed youtube on\n   Memblokir link Youtube\n   Link akan dihapus + peringatan\n\n➤ ${prefix}antilinksosmed youtube off\n   Mengizinkan link Youtube\n\n📌 Contoh:\n${prefix}antilinksosmed youtube on\n✅ Youtube diblokir!`);
    }
  } else if (cmd === 'twitter') {
    if (subCmd === 'on') {
      if (!antilinksosmedAktif) return reply('⚠️ Aktifkan antilinksosmed dulu! (warn/delete)');
      if (antilinksosmedTypes.includes('twitter')) return reply('⚠️ Twitter sudah diblokir!');
      if (!global.db.chats[m.chat].antilinksosmedTypes) global.db.chats[m.chat].antilinksosmedTypes = [];
      global.db.chats[m.chat].antilinksosmedTypes.push('twitter');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Twitter diblokir!\nLink Twitter akan dihapus');
    } else if (subCmd === 'off') {
      if (!antilinksosmedTypes.includes('twitter')) return reply('⚠️ Twitter tidak diblokir!');
      global.db.chats[m.chat].antilinksosmedTypes = antilinksosmedTypes.filter(t => t !== 'twitter');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Twitter diizinkan!');
    } else {
      reply(`📝 Cara Penggunaan Antilinksosmed Twitter:\n\n➤ ${prefix}antilinksosmed twitter on\n   Memblokir link Twitter/X\n   Link akan dihapus + peringatan\n\n➤ ${prefix}antilinksosmed twitter off\n   Mengizinkan link Twitter/X\n\n📌 Contoh:\n${prefix}antilinksosmed twitter on\n✅ Twitter diblokir!`);
    }
  } else if (cmd === 'instagram') {
    if (subCmd === 'on') {
      if (!antilinksosmedAktif) return reply('⚠️ Aktifkan antilinksosmed dulu! (warn/delete)');
      if (antilinksosmedTypes.includes('instagram')) return reply('⚠️ Instagram sudah diblokir!');
      if (!global.db.chats[m.chat].antilinksosmedTypes) global.db.chats[m.chat].antilinksosmedTypes = [];
      global.db.chats[m.chat].antilinksosmedTypes.push('instagram');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Instagram diblokir!\nLink Instagram akan dihapus');
    } else if (subCmd === 'off') {
      if (!antilinksosmedTypes.includes('instagram')) return reply('⚠️ Instagram tidak diblokir!');
      global.db.chats[m.chat].antilinksosmedTypes = antilinksosmedTypes.filter(t => t !== 'instagram');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Instagram diizinkan!');
    } else {
      reply(`📝 Cara Penggunaan Antilinksosmed Instagram:\n\n➤ ${prefix}antilinksosmed instagram on\n   Memblokir link Instagram\n   Link akan dihapus + peringatan\n\n➤ ${prefix}antilinksosmed instagram off\n   Mengizinkan link Instagram\n\n📌 Contoh:\n${prefix}antilinksosmed instagram on\n✅ Instagram diblokir!`);
    }
  } else if (cmd === 'tiktok') {
    if (subCmd === 'on') {
      if (!antilinksosmedAktif) return reply('⚠️ Aktifkan antilinksosmed dulu! (warn/delete)');
      if (antilinksosmedTypes.includes('tiktok')) return reply('⚠️ Tiktok sudah diblokir!');
      if (!global.db.chats[m.chat].antilinksosmedTypes) global.db.chats[m.chat].antilinksosmedTypes = [];
      global.db.chats[m.chat].antilinksosmedTypes.push('tiktok');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Tiktok diblokir!\nLink Tiktok akan dihapus');
    } else if (subCmd === 'off') {
      if (!antilinksosmedTypes.includes('tiktok')) return reply('⚠️ Tiktok tidak diblokir!');
      global.db.chats[m.chat].antilinksosmedTypes = antilinksosmedTypes.filter(t => t !== 'tiktok');
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Tiktok diizinkan!');
    } else {
      reply(`📝 Cara Penggunaan Antilinksosmed Tiktok:\n\n➤ ${prefix}antilinksosmed tiktok on\n   Memblokir link Tiktok\n   Link akan dihapus + peringatan\n\n➤ ${prefix}antilinksosmed tiktok off\n   Mengizinkan link Tiktok\n\n📌 Contoh:\n${prefix}antilinksosmed tiktok on\n✅ Tiktok diblokir!`);
    }
  } else if (cmd === 'all') {
    if (subCmd === 'on') {
      if (!antilinksosmedAktif) return reply('⚠️ Aktifkan antilinksosmed dulu! (warn/delete)');
      if (antilinksosmedTypes.includes('all')) return reply('⚠️ Semua link sudah diblokir!');
      global.db.chats[m.chat].antilinksosmedTypes = ['all'];
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Semua link diblokir!\nhttps:// atau http:// akan dihapus');
    } else if (subCmd === 'off') {
      if (!antilinksosmedTypes.includes('all')) return reply('⚠️ Tidak ada link yang diblokir!');
      global.db.chats[m.chat].antilinksosmedTypes = [];
      require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
      reply('✅ Semua link diizinkan!');
    } else {
      reply(`📝 Cara Penggunaan Antilinksosmed All:\n\n➤ ${prefix}antilinksosmed all on\n   Memblokir SEMUA link yang mencurigakan\n   https:// atau http:// akan dihapus\n   Google, Youtube, Twitter, Instagram, Tiktok\n   Semua akan dihapus + peringatan\n\n➤ ${prefix}antilinksosmed all off\n   Mengizinkan semua link\n\n📌 Contoh:\n${prefix}antilinksosmed all on\n✅ Semua link diblokir!`);
    }
  } else if (cmd === 'delwarn') {
    if (!antilinksosmedAktif) return reply('⚠️ Antilinksosmed tidak aktif!');
    if (antilinksosmedMode !== 'warn') return reply('⚠️ Mode bukan warn!');
    const target = antilinksosmedGetJid(m);
    if (!target) return reply('⚠️ Reply atau tag user!');
    if (!chatData.warns?.[target]) return reply('⚠️ User tidak punya warning');
    delete chatData.warns[target];
    if (global.db.users[target]) {
      delete global.db.users[target];
    }
    require('fs').writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2));
    await satanic.sendMessage(m.chat, {
      text: `✅ Warning @${target.split('@')[0]} dihapus!`,
      mentions: [target]
    });
  } else if (cmd === 'listwarn') {
    if (!antilinksosmedAktif) return reply('⚠️ Antilinksosmed tidak aktif!');
    if (antilinksosmedMode !== 'warn') return reply('⚠️ Mode bukan warn!');
    if (!chatData.warns || !Object.keys(chatData.warns).length) return reply('📌 Tidak ada warning');
    let txt = '📋 DAFTAR WARNING LINK\n\n';
    let mentions = [];
    for (let [id, count] of Object.entries(chatData.warns)) {
      let name = global.db.users[id]?.name || id.split('@')[0];
      txt += `• @${name} - ${count}/3\n`;
      mentions.push(id);
    }
    await satanic.sendMessage(m.chat, {
      text: txt,
      mentions: mentions
    });
  } else {
    const total = chatData?.warns ? Object.keys(chatData.warns).length : 0;
    const types = antilinksosmedTypes.length ? antilinksosmedTypes.join(', ') : 'Tidak ada';
    reply(`⚙️ ANTILINKSOSMED\n\n📌 Status: ${antilinksosmedAktif ? '✅ ON' : '❌ OFF'}\n📋 Mode: ${antilinksosmedMode.toUpperCase()}\n🚫 Diblokir: ${types}\n⚠️ Warning: ${total} user\n\n📝 Commands:\n\n➤ ${prefix}antilinksosmed warn on/off\n   Aktifkan/nonaktifkan mode warn\n\n➤ ${prefix}antilinksosmed delete on/off\n   Aktifkan/nonaktifkan mode delete\n\n➤ ${prefix}antilinksosmed google on/off\n   Blokir/izinkan link Google\n\n➤ ${prefix}antilinksosmed youtube on/off\n   Blokir/izinkan link Youtube\n\n➤ ${prefix}antilinksosmed twitter on/off\n   Blokir/izinkan link Twitter/X\n\n➤ ${prefix}antilinksosmed instagram on/off\n   Blokir/izinkan link Instagram\n\n➤ ${prefix}antilinksosmed tiktok on/off\n   Blokir/izinkan link Tiktok\n\n➤ ${prefix}antilinksosmed all on/off\n   Blokir SEMUA link (https:// atau http://)\n\n➤ ${prefix}antilinksosmed delwarn (reply/tag)\n   Hapus warning user\n\n➤ ${prefix}antilinksosmed listwarn\n   Lihat daftar warning\n\n💡 Contoh Penggunaan:\n${prefix}antilinksosmed delete on\n${prefix}antilinksosmed all on\n✅ Semua link diblokir!\n\n⚠️ Admin grup tidak terkena aturan ini!`);
  }
  break;
}
case 'kick': {
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await satanic.groupParticipantsUpdate(m.chat, [users], 'remove')
await reply(`Done`)
}
break
case 'amprem':
case 'ampremium': {
    if (!text) return reply('📧 Input email kamu!\nContoh: .ampremium email@domain.com');
    
    const email = text.trim();
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const apiUrl = `https://www.free-restapi.biz.id/api/alightmotion-send?email=${encodeURIComponent(email)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        
        if (!response.data || response.data.status !== true) {
            return reply('❌ *Gagal Mengirim Link Premium!*\n\n' + 
                        (response.data?.message || 'Terjadi kesalahan pada server. Silakan coba lagi nanti.'));
        }
        
        const successMsg = `✅ *ALIGHT MOTION PREMIUM BERHASIL*
_Link verifikasi berhasil dikirim ke email_

📧 *Target Email:* \`${email}\`
🔑 *Tipe Akses:* \`need_link\`

📌 *LANGKAH AKTIVASI (WAJIB DIIKUTI):*

1️⃣ *Cek Kotak Masuk / Folder Spam:*
Buka aplikasi Gmail kamu. Jika tidak ada di kotak masuk utama, langsung cek di **Folder Spam** kak! Cari email terbaru dari *Alight Motion*.

2️⃣ *Tekan Tombol Login:*
Buka email tersebut, di dalamnya akan ada tombol bertuliskan **"Login"** atau **"Log in to Alight Motion"**. Silakan diklik/tekan tombol tersebut.

3️⃣ *Salin Tautan / Link Akhir:*
Setelah tombol ditekan dan browser terbuka, **Salin/Copy seluruh tautan (URL)** yang muncul di address bar browser kamu itu kak.

📝 *SETELAH VERIFIKASI:*
Ketik command dibawah ini untuk verifikasi link:
\`\`\`.amverify ${email} | link_folder_spam\`\`\`

Contoh: \`.amverify ${email} | https://www.alightmotion.com/verify/xxx\`
`;
        await satanic.sendMessage(m.chat, { text: successMsg }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error('Error amp premium:', err);
        reply('❌ *Terjadi Kesalahan!*\n\n' + 
              'Pastikan koneksi internet stabil dan coba lagi.\n' +
              'Jika error terus terjadi, mungkin API sedang maintenance.');
    }
}
break;
case 'amprem2':
case 'ampremium2': {
    if (!text) return reply('📧 Input email kamu!\nContoh: .ampremium2 email@domain.com');
    const email = text.trim();
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    try {
        const apiUrl = `https://www.free-restapi.biz.id/api/am-send?email=${encodeURIComponent(email)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        if (!response.data || response.data.status !== true) {
            return reply('❌ *Gagal Mengirim Link Premium!*\n\n' + 
                        (response.data?.message || 'Terjadi kesalahan pada server. Silakan coba lagi nanti.'));
        }
        const successMsg = `✅ *ALIGHT MOTION PREMIUM BERHASIL*
_Link verifikasi berhasil dikirim ke email_

📧 *Target Email:* \`${email}\`
🔑 *Tipe Akses:* \`need_link\`

📌 *LANGKAH AKTIVASI (WAJIB DIIKUTI):*

1️⃣ *Cek Kotak Masuk / Folder Spam:*
Buka aplikasi Gmail kamu. Jika tidak ada di kotak masuk utama, langsung cek di **Folder Spam** kak! Cari email terbaru dari *Alight Motion*.

2️⃣ *Tekan Tombol Login:*
Buka email tersebut, di dalamnya akan ada tombol bertuliskan **"Login"** atau **"Log in to Alight Motion"**. Silakan diklik/tekan tombol tersebut.

3️⃣ *Salin Tautan / Link Akhir:*
Setelah tombol ditekan dan browser terbuka, **Salin/Copy seluruh tautan (URL)** yang muncul di address bar browser kamu itu kak.

📝 *SETELAH VERIFIKASI:*
Ketik command dibawah ini untuk verifikasi link:
\`\`\`.amverify ${email} | link_folder_spam\`\`\`

Contoh: \`.amverify2 ${email} | https://www.alightmotion.com/verify/xxx\`
`;
        await satanic.sendMessage(m.chat, { text: successMsg }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (err) {
        console.error('Error amp premium2:', err);
        reply('❌ *Terjadi Kesalahan!*\n\n' + 
              'Pastikan koneksi internet stabil dan coba lagi.\n' +
              'Jika error terus terjadi, mungkin API sedang maintenance.');
    }
}
break;
case 'ampremium3': {
    if (!text) return reply('📧 Input email kamu!\nContoh: .ampremium3 email@domain.com');
    
    const email = text.trim();
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const apiUrl = `https://www.free-restapi.biz.id/api/alight-senid?email=${encodeURIComponent(email)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        
        if (!response.data || response.data.status !== 200) {
            return reply('❌ *Gagal Mengirim Link Premium!*\n\n' + 
                        (response.data?.message || 'Terjadi kesalahan pada server. Silakan coba lagi nanti.'));
        }
        
        const successMsg = `✅ *ALIGHT MOTION PREMIUM BERHASIL*
_${response.data.message}_

📧 *Target Email:* \`${email}\`
📌 *Instruksi:* ${response.data.data.instruction}
📝 *Note:* ${response.data.data.note}

📌 *LANGKAH AKTIVASI (WAJIB DIIKUTI):*

1️⃣ *Cek Kotak Masuk / Folder Spam:*
Buka aplikasi Gmail kamu. Jika tidak ada di kotak masuk utama, langsung cek di **Folder Spam** kak! Cari email terbaru dari *Alight Motion*.

2️⃣ *Tekan Tombol Login:*
Buka email tersebut, di dalamnya akan ada tombol bertuliskan **"Login"** atau **"Log in to Alight Motion"**. Silakan diklik/tekan tombol tersebut.

3️⃣ *Salin Tautan / Link Akhir:*
Setelah tombol ditekan dan browser terbuka, **Salin/Copy seluruh tautan (URL)** yang muncul di address bar browser kamu itu kak.

📝 *SETELAH VERIFIKASI:*
Ketik command dibawah ini untuk verifikasi link:
\`\`\`.amverify ${email} | link_folder_spam\`\`\`

Contoh: \`.amverify3 ${email} | https://www.alightmotion.com/verify/xxx\``;

        await satanic.sendMessage(m.chat, { text: successMsg }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error('Error amp premium3:', err);
        reply('❌ *Terjadi Kesalahan!*\n\n' + 
              'Pastikan koneksi internet stabil dan coba lagi.\n' +
              'Jika error terus terjadi, mungkin API sedang maintenance.');
    }
}
break;
case 'amverify': {
    if (!text) return reply('🔗 Masukkan email dan link verifikasi!\n\nContoh: .amverify email@domain.com | https://link.com/verify/xxx');
    
    const [email, link] = text.split('|').map(item => item.trim());
    
    if (!email || !link) {
        return reply('❌ *Format Salah!*\n\nGunakan format:\n\`\`\`.amverify email@domain.com | link_verifikasi\`\`\`\n\nContoh:\n\`\`\`.amverify user@gmail.com | https://www.alightmotion.com/verify/xxx\`\`\`');
    }
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const apiUrl = `https://www.free-restapi.biz.id/api/alightmotion-verify?email=${encodeURIComponent(email)}&link=${encodeURIComponent(link)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        
        if (!response.data || response.data.status !== true) {
            return reply('❌ *Gagal Verifikasi!*\n\n' + 
                        (response.data?.message || 'Terjadi kesalahan pada server. Silakan coba lagi nanti.'));
        }
        
        const verifyMsg = `✅ *VERIFIKASI SUKSES*
_Verifikasi berhasil! Akun premium aktif._

📧 *Email Terdaftar:* \`${email}\`
🔑 *Tipe Sukses:* \`success\`
⏰ *Durasi Paket:* \`1 Tahun\`
📌 *Code Order:* \`${response.data.data.codeOrder || '-'}\`

📌 *INFORMASI USER:*

- Akun Alight Motion kamu sekarang sudah resmi menjadi PRO / PREMIUM kak!
- Silakan buka aplikasi Alight Motion di HP kamu, lalu log in menggunakan email \`${email}\` tersebut.
- Nikmati semua fitur premium, efek berbayar, dan ekspor video tanpa watermark sepuasnya.

⚠️ *Catatan:*
• Premium berlaku selama 1 tahun
• Jika tidak aktif, ulangi verifikasi
• Simpan link ini untuk referensi
`;

        await satanic.sendMessage(m.chat, { text: verifyMsg }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error('Error amverify:', err);
        reply('❌ *Terjadi Kesalahan!*\n\n' + 
              'Pastikan koneksi internet stabil dan coba lagi.\n' +
              'Jika error terus terjadi, mungkin API sedang maintenance.');
    }
}
break;
case 'amverify2': {
    if (!text) return reply('🔗 Masukkan email dan link verifikasi!\n\nContoh: .amverify2 email@domain.com | https://link.com/verify/xxx');
    
    const [email, link] = text.split('|').map(item => item.trim());
    
    if (!email || !link) {
        return reply('❌ *Format Salah!*\n\nGunakan format:\n\`\`\`.amverify2 email@domain.com | link_verifikasi\`\`\`\n\nContoh:\n\`\`\`.amverify2 user@gmail.com | https://www.alightmotion.com/verify/xxx\`\`\`');
    }
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const apiUrl = `https://www.free-restapi.biz.id/api/am-verify?email=${encodeURIComponent(email)}&link=${encodeURIComponent(link)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        
        if (!response.data || response.data.status !== true) {
            return reply('❌ *Gagal Verifikasi!*\n\n' + 
                        (response.data?.message || 'Terjadi kesalahan pada server. Silakan coba lagi nanti.'));
        }
        
        const verifyMsg = `✅ *VERIFIKASI SUKSES*
_Verifikasi berhasil! Akun premium aktif._

📧 *Email Terdaftar:* \`${email}\`
🔑 *Tipe Sukses:* \`success\`
⏰ *Durasi Paket:* \`1 Tahun\`

📌 *INFORMASI USER:*

- Akun Alight Motion kamu sekarang sudah resmi menjadi PRO / PREMIUM kak!
- Silakan buka aplikasi Alight Motion di HP kamu, lalu log in menggunakan email \`${email}\` tersebut.
- Nikmati semua fitur premium, efek berbayar, dan ekspor video tanpa watermark sepuasnya.

⚠️ *Catatan:*
• Premium berlaku selama 1 tahun
• Jika tidak aktif, ulangi verifikasi
• Simpan link ini untuk referensi
*`;
        await satanic.sendMessage(m.chat, { text: verifyMsg }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error('Error amverify2:', err);
        reply('❌ *Terjadi Kesalahan!*\n\n' + 
              'Pastikan koneksi internet stabil dan coba lagi.\n' +
              'Jika error terus terjadi, mungkin API sedang maintenance.');
    }
}
break;
case 'amverify3': {
    if (!text) return reply('🔗 Masukkan email dan magic link!\n\nContoh: .amverify3 email@domain.com | https://link.com/verify/xxx');
    
    const [email, magicLink] = text.split('|').map(item => item.trim());
    
    if (!email || !magicLink) {
        return reply('❌ *Format Salah!*\n\nGunakan format:\n\`\`\`.amverify3 email@domain.com | magic_link\`\`\`\n\nContoh:\n\`\`\`.amverify3 user@gmail.com | https://alight-creative.firebaseapp.com/__/auth/links?link=xxx\`\`\`');
    }
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const apiUrl = `https://www.free-restapi.biz.id/api/alight-verifyy?email=${encodeURIComponent(email)}&magicLink=${encodeURIComponent(magicLink)}&apikey=${global.sakey}`;
        const response = await axios.get(apiUrl);
        
        if (!response.data || response.data.status !== 200) {
            return reply('❌ *Gagal Verifikasi!*\n\n' + 
                        (response.data?.message || 'Terjadi kesalahan pada server. Silakan coba lagi nanti.'));
        }
        
        const user = response.data.data.verification_result.user;
        const premiumStatus = response.data.data.premium_status;
        
        let featureList = '';
        if (premiumStatus?.features && premiumStatus.features.length > 0) {
            featureList = premiumStatus.features.map(f => `• ${f}`).join('\n');
        }
        
        const verifyMsg = `✅ *VERIFIKASI SUKSES*
_${response.data.message}_

📧 *Email:* \`${user?.email || email}\`
👤 *Nama:* ${user?.displayName || '-'}
🔐 *Email Terverifikasi:* ${user?.emailVerified ? '✅ Ya' : '❌ Tidak'}

⏰ *Premium Aktif Sampai:* ${premiumStatus?.expires_at ? new Date(premiumStatus.expires_at).toLocaleDateString('id-ID') : '1 Tahun'}
📅 *Diaktifkan Pada:* ${premiumStatus?.activated_at ? new Date(premiumStatus.activated_at).toLocaleString('id-ID') : '-'}

🎁 *Fitur Premium:*
${featureList || '• Semua fitur premium aktif'}

📌 *INFORMASI USER:*

- Akun Alight Motion kamu sekarang sudah resmi menjadi PRO / PREMIUM kak!
- Silakan buka aplikasi Alight Motion di HP kamu, lalu log in menggunakan email \`${email}\` tersebut.
- Nikmati semua fitur premium, efek berbayar, dan ekspor video tanpa watermark sepuasnya.

⚠️ *Catatan:*
• Premium berlaku hingga ${premiumStatus?.expires_at ? new Date(premiumStatus.expires_at).toLocaleDateString('id-ID') : '1 tahun'}
• Jika tidak aktif, ulangi verifikasi
• Simpan link ini untuk referensi`;

        await satanic.sendMessage(m.chat, { text: verifyMsg }, { quoted: fkontak });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error('Error amverify3:', err);
        reply('❌ *Terjadi Kesalahan!*\n\n' + 
              'Pastikan koneksi internet stabil dan coba lagi.\n' +
              'Jika error terus terjadi, mungkin API sedang maintenance.');
    }
}
break;

case 'kickme': {
  if (!m.isGroup) return reply(mess.group);
  let sender = m.sender;  
  await satanic.groupParticipantsUpdate(m.chat, [sender], 'remove');
  reply(`Anda telah keluar dari grup ini.`);
}
break;

case 'tagadmin':
    if (!m.isGroup) return satanic.sendMessage(m.chat, { text: mess.only.group })
    if (!isBotAdmins) return reply('jadikan bot admin dahulu');
    const meta = await satanic.groupMetadata(m.chat)
    let adminIds = []
    meta.participants.forEach((participant) => {
        if (participant.admin === "admin" || participant.admin === "superadmin") {
            adminIds.push(participant.id)
        }
    })
    if (adminIds.length > 0) {
        let tagMessage = `Nama Grup: ${meta.subject}\n\n`
        adminIds.forEach((id, i) => {
            tagMessage += `${i+1}. @${id.split('@')[0]}\n`
        })
        satanic.sendMessage(m.chat, {
            text: tagMessage,
            mentions: adminIds
        })
    } else {
        satanic.sendMessage(m.chat, { text: 'Tidak ada admin di grup ini.' })
    }
    break
case 'setnamegc':
case 'setsubject':
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
if (!text) return reply('Mau di namain apa kak grupnya? 🤔');
await satanic.groupUpdateSubject(m.chat, text);
reply(mess.done);
break;
case 'inspect':
case 'cekid':
case 'idch':
case 'idgb':
case 'idgc':
case 'cekidch':
case 'cekidgc':
case 'cekidsaluran':
case 'cekidgb':
case 'cekidgroup': {
if (!text) return reply('input id nya');
const isChannel = text.includes('https://whatsapp.com/channel/');
const grupRegex = /chat\.whatsapp\.com\/([A-Za-z0-9]+)/i;
const boolStatus = (v) => (v === true ? 'Aktif' : v === false ? 'Tidak Aktif' : (v ?? '-'));
if (!isChannel && !grupRegex.test(text)) return reply(global.mess.query.link);
try {
if (isChannel) {
const code = text.split('https://whatsapp.com/channel/')[1];
if (!code) return reply('link tidak valid');
const res = await satanic.newsletterMetadata('invite', code);
const channelId = res.id || '';
const channelName = res.name || '';
const teks = `Informasi Channel WhatsApp\n\nNama: ${channelName || '-'}\nID: ${channelId || '-'}\nTotal Pengikut: ${res.subscribers ?? '-'}\nStatus: ${res.state || '-'}\nVerifikasi: ${res.verification == "VERIFIED" ? "Terverifikasi" : "Tidak"}`;
const msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
interactiveMessage: proto.Message.InteractiveMessage.create({
body: proto.Message.InteractiveMessage.Body.create({ text: teks }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: "" }),
header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: [
{
name: "cta_copy",
buttonParamsJson: JSON.stringify({
display_text: "Salin ID",
copy_code: `${channelId}`
})
},
{
name: "cta_copy",
buttonParamsJson: JSON.stringify({
display_text: "Salin Nama",
copy_code: `${channelName}`
})
}
]
})
})
}
}
}, { quoted: fkontak });
return satanic.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
}
const inviteCode = text.match(grupRegex)[1];
const g = await satanic.groupGetInviteInfo(inviteCode);
let pp = null;
try {
pp = await satanic.profilePictureUrl(g.id, 'image');
} catch {
pp = null;
}
const admins = (g.participants || []).filter(v => v.admin);
const groupId = g.id || '';
const groupName = g.subject || '-';
const creator = g.owner ? '@' + g.owner.split('@')[0] : '-';
const teks = `Informasi Grup WhatsApp\n\nNama: ${groupName || '-'}\nID: ${groupId || '-'}\nTotal Member: ${g.size || g.participants?.length || '-'}\nDibuat: ${g.creation ? new Date(g.creation * 1000).toLocaleString() : '-'}\nCreator: ${creator}\n\nPengaturan Group\nRestrict: ${boolStatus(g.restrict)}\nAnnounce: ${boolStatus(g.announce)}\nCommunity: ${boolStatus(g.isCommunity)}\nJoin Approval: ${boolStatus(g.joinApprovalMode)}\nMember Add Mode: ${boolStatus(g.memberAddMode)}\n\nDeskripsi\n${g.desc || '-'}\n\nAdmin\n${admins.length ? admins.map(a => `- @${a.id.split('@')[0]} (${a.admin})`).join('\n') : '-'}`;
const mentioned = [
...(g.owner ? [g.owner] : []),
...admins.map(a => a.id)
];
if (pp) {
const media = await prepareWAMessageMedia(
{ image: { url: pp } },
{ upload: satanic.waUploadToServer }
);
const msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
interactiveMessage: proto.Message.InteractiveMessage.create({
body: proto.Message.InteractiveMessage.Body.create({ text: teks }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: "" }),
header: proto.Message.InteractiveMessage.Header.create({
hasMediaAttachment: true,
imageMessage: media.imageMessage
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: [
{
name: "cta_copy",
buttonParamsJson: JSON.stringify({
display_text: "Salin ID",
copy_code: `${groupId}`
})
},
{
name: "cta_copy",
buttonParamsJson: JSON.stringify({
display_text: "Salin Nama",
copy_code: `${groupName !== '-' ? groupName : ''}`
})
}
]
})
})
}
}
}, { quoted: fkontak });
msg.message.viewOnceMessage.message.interactiveMessage.contextInfo = { mentionedJid: mentioned };
return satanic.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
}
const msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
interactiveMessage: proto.Message.InteractiveMessage.create({
body: proto.Message.InteractiveMessage.Body.create({ text: teks }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: "" }),
header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: [
{
name: "cta_copy",
buttonParamsJson: JSON.stringify({
display_text: "Salin ID",
copy_code: `${groupId}`
})
},
{
name: "cta_copy",
buttonParamsJson: JSON.stringify({
display_text: "Salin Nama",
copy_code: `${groupName !== '-' ? groupName : ''}`
})
}
]
})
})
}
}
}, { quoted: fkontak });
msg.message.viewOnceMessage.message.interactiveMessage.contextInfo = { mentionedJid: mentioned };
return satanic.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
} catch (err) {
console.log(err);
return reply('eror');
}
break;
}
case 'setdesc':
case 'setdesk':
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
if (!text) return reply('Text ?')
await satanic.groupUpdateDescription(m.chat, text)
reply(mess.done)
break;
case 'cleardesc':
case 'cleardesk':{
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
try {
await satanic.groupUpdateDescription(m.chat, null);
reply('Deskripsi grup berhasil dihapus.');
} catch (err) {
console.error(err);
reply('Gagal menghapus deskripsi grup.');
}
}
break;
case 'getnamegc':
case 'getsubject': {
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
try {
reply(groupName);
} catch (error) {
console.log(error);
reply('Gagal saat melakukan tindakan, jika anda pemilik silahkan cek console.');
};
};
break
case 'getdesk':
case 'metadatadesc':
case 'getdesc': {
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
try {
reply(groupMetadata.desc)
} catch (error) {
console.log(error);
reply('Gagal saat melakukan tindakan, jika anda pemilik silahkan cek console.');
};
};
break
case 'getppgc': {
if (!m.isGroup) return reply(mess.group);
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)
try {
avatarr = await satanic.profilePictureUrl(m.chat, "image")
} catch {
avatarr = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
satanic.sendMessage(m.chat, {image: {url: avatarr }, caption: `©satanic` }, {quoted: fkontak })
}
break
case 'setppgc':
case 'setppgroup':
if (!m.isGroup) return reply(mess.group)
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply(mess.admin)

const { S_WHATSAPP_NET } = require('@whiskeysockets/baileys')

async function generateProfilePicture(media) {
    const image = await jimp.read(media)
    const min = image.getWidth()
    const max = image.getHeight()
    const cropped = image.crop(0, 0, min, max)
    return {
        img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp.MIME_JPEG),
        preview: await cropped.normalize().getBufferAsync(jimp.MIME_JPEG)
    }
}

const quotedgc = m.quoted ? m.quoted : m
const mimegc = (quotedgc.msg || quotedgc).mimetype || ''

if (!/image/.test(mimegc)) {
    return reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
}

let mediagc = await satanic.downloadAndSaveMediaMessage(quotedgc)
const groupgc = m.chat
const { img } = await generateProfilePicture(mediagc)

await satanic.query({
    tag: 'iq',
    attrs: {
        target: groupgc,
        to: S_WHATSAPP_NET,
        type: 'set',
        xmlns: 'w:profile:picture'
    },
    content: [{
        tag: 'picture',
        attrs: { type: 'image' },
        content: img
    }]
})

reply(mess.done)
break
case 'reminder':
if (!isAdmins && !isCreator) return reply(mess.admin)
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!text) return reply('Example: .reminder 1m jangan lupa solat')
const parts = text.split(' ')
if (parts.length < 2) return reply('Format: .reminder [waktu] [pesan]')
let timeStr = parts[0]
let message = parts.slice(1).join(' ')
let timeValue = parseInt(timeStr.replace(/[^0-9]/g, ''))
let timeUnit = timeStr.replace(/[0-9]/g, '').toLowerCase()
if (isNaN(timeValue) || timeValue <= 0) {
    const match = text.match(/(\d+)\s*(detik|menit|jam|hari)/i)
    if (match) {
        timeValue = parseInt(match[1])
        timeUnit = match[2].toLowerCase()
        message = text.replace(match[0], '').trim()
    } else {
        return reply('Waktu harus angka! Contoh: 1m, 1 menit, 30s')
    }
}
if (!timeUnit) timeUnit = 'm'
let timeInMs = 0
if (timeUnit === 's' || timeUnit === 'detik') timeInMs = timeValue * 1000
else if (timeUnit === 'm' || timeUnit === 'menit') timeInMs = timeValue * 60 * 1000
else if (timeUnit === 'h' || timeUnit === 'jam') timeInMs = timeValue * 60 * 60 * 1000
else if (timeUnit === 'd' || timeUnit === 'hari') timeInMs = timeValue * 24 * 60 * 60 * 1000
else return reply('Gunakan: s/detik, m/menit, h/jam, d/hari')
reply(`Reminder diatur! ${timeValue} ${timeUnit} lagi\n${message}`)
const participants = m.isGroup ? (await satanic.groupMetadata(m.chat)).participants : [{ id: m.sender }]
setTimeout(() => {
satanic.sendMessage(m.chat, {
text: `Reminder\n\n${message}`,
mentions: participants.map(a => a.id)
})
}, timeInMs)
break
case 'resetwarning':
case 'resetwarn':
if (!m.isGroup) return satanic.sendMessage(m.chat, { text: 'Perintah ini hanya untuk grup!' }, { quoted: fkontak });
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return satanic.sendMessage(m.chat, { text: 'Perintah ini hanya untuk admin grup!' }, { quoted: fkontak });
let warnDataReset = {};
try {
warnDataReset = JSON.parse(fs.readFileSync('./database/warning.json'));
} catch (e) {
warnDataReset = {};
}
if (warnDataReset[m.chat]) {
delete warnDataReset[m.chat];
fs.writeFileSync('./database/warning.json', JSON.stringify(warnDataReset, null, 2));
satanic.sendMessage(m.chat, { text: 'Semua warning di grup ini telah direset!' }, { quoted: fkontak });
} else {
satanic.sendMessage(m.chat, { text: 'Tidak ada data warning di grup ini.' }, { quoted: fkontak });
}
break;
case 'listwarning':
case 'listwarn':
if (!m.isGroup) return satanic.sendMessage(m.chat, { text: 'Perintah ini hanya untuk grup!' }, { quoted: fkontak });
if (!isBotAdmins) return reply('jadikan bot admin dahulu');
if (!isAdmins && !isCreator) return satanic.sendMessage(m.chat, { text: 'Perintah ini hanya untuk admin grup!' }, { quoted: fkontak });
let warnDataList = {};
try {
warnDataList = JSON.parse(fs.readFileSync('./database/warning.json'));
} catch (e) {
warnDataList = {};
}
if (!warnDataList[m.chat] || Object.keys(warnDataList[m.chat]).length === 0) {
return satanic.sendMessage(m.chat, { text: 'Tidak ada user yang memiliki warning di grup ini.' }, { quoted: fkontak });
}
let teksList = 'DAFTAR WARNING GROUP\n\n';
let no = 1;
let mentionsList = [];
let sortedWarn = Object.entries(warnDataList[m.chat]).sort((a, b) => b[1] - a[1]);
for (let [user, warn] of sortedWarn) {
let progress = '';
for (let i = 1; i <= 3; i++) {
progress += i <= warn ? 'X' : '-';
}
teksList += `${no++}. @${user.split('@')[0]} : ${warn} warning [${progress}]\n`;
mentionsList.push(user);
}
teksList += `\nTotal: ${sortedWarn.length} user terkena warning`;
satanic.sendMessage(m.chat, { text: teksList, mentions: mentionsList }, { quoted: fkontak });
break;

case 'cekwarning':
case 'cekwarn':
if (!m.isGroup) return satanic.sendMessage(m.chat, { text: 'Perintah ini hanya untuk grup!' }, { quoted: fkontak });
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
let targetCek = m.mentionedJid[0] ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : sender);
let warnDataCek = {};
try {
warnDataCek = JSON.parse(fs.readFileSync('./database/warning.json'));
} catch (e) {
warnDataCek = {};
}
let userWarn = warnDataCek[m.chat]?.[targetCek] || 0;
let progressCek = '';
for (let i = 1; i <= 3; i++) {
progressCek += i <= userWarn ? 'X' : '-';
}
let teksCek = `CEK WARNING\n\n`;
teksCek += `User     : @${targetCek.split('@')[0]}\n`;
teksCek += `Warning  : ${userWarn} / 3\n`;
teksCek += `Progress : [${progressCek}]\n`;
teksCek += `Status   : ${userWarn >= 3 ? 'AKAN DIKICK' : 'AMAN'}`;
satanic.sendMessage(m.chat, { text: teksCek, mentions: [targetCek] }, { quoted: fkontak });
break;
case 'delwarning':
case 'delwarn':
case 'kurangiwarning':
if (!m.isGroup) return satanic.sendMessage(m.chat, { text: 'Perintah ini hanya untuk grup!' }, { quoted: fkontak });
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return satanic.sendMessage(m.chat, { text: 'Perintah ini hanya untuk admin grup!' }, { quoted: fkontak });
let targetDel = m.mentionedJid[0] ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : null);
if (!targetDel) {
return satanic.sendMessage(m.chat, { text: `Tag atau reply pesan user yang ingin dikurangi warningnya!\nContoh: ${prefix + command} @user` }, { quoted: fkontak });
}
let warnDataDel = {};
try {
warnDataDel = JSON.parse(fs.readFileSync('./database/warning.json'));
} catch (e) {
warnDataDel = {};
}
if (!warnDataDel[m.chat] || !warnDataDel[m.chat][targetDel]) {
return satanic.sendMessage(m.chat, { text: `User @${targetDel.split('@')[0]} tidak memiliki warning.`, mentions: [targetDel] }, { quoted: fkontak });
}
warnDataDel[m.chat][targetDel] -= 1;
let sisaWarn = warnDataDel[m.chat][targetDel];
if (sisaWarn <= 0) {
delete warnDataDel[m.chat][targetDel];
if (Object.keys(warnDataDel[m.chat]).length === 0) {
delete warnDataDel[m.chat];
}
}
fs.writeFileSync('./database/warning.json', JSON.stringify(warnDataDel, null, 2));
let teksDel = `WARNING BERKURANG\n\n`;
teksDel += `User    : @${targetDel.split('@')[0]}\n`;
teksDel += `Warning : -1\n`;
teksDel += `Sisa    : ${sisaWarn || 0} warning`;
satanic.sendMessage(m.chat, { text: teksDel, mentions: [targetDel] }, { quoted: fkontak });
break;
case 'warning':
case 'warn':
if (!m.isGroup) return satanic.sendMessage(m.chat, { text: 'Perintah ini hanya untuk grup!' }, { quoted: fkontak });
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return satanic.sendMessage(m.chat, { text: 'Perintah ini hanya untuk admin grup!' }, { quoted: fkontak });
let targetWarn = m.mentionedJid[0] ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : null);
if (!targetWarn) {
return satanic.sendMessage(m.chat, { text: `Tag atau reply pesan user yang ingin diberi warning!\nContoh: ${prefix + command} @user alasan` }, { quoted: fkontak });
}
let alasan = text.replace(new RegExp(`@${targetWarn.split('@')[0]}\\s*`), '').trim();
alasan = alasan || 'Tidak ada alasan';
let warnDataWarn = {};
try {
warnDataWarn = JSON.parse(fs.readFileSync('./database/warning.json'));
} catch (e) {
warnDataWarn = {};
}
if (!warnDataWarn[m.chat]) {
warnDataWarn[m.chat] = {};
}
if (!warnDataWarn[m.chat][targetWarn]) {
warnDataWarn[m.chat][targetWarn] = 0;
}
warnDataWarn[m.chat][targetWarn] += 1;
let currentWarn = warnDataWarn[m.chat][targetWarn];
fs.writeFileSync('./database/warning.json', JSON.stringify(warnDataWarn, null, 2));
let teksWarn = `WARNING SYSTEM\n\n`;
teksWarn += `User    : @${targetWarn.split('@')[0]}\n`;
teksWarn += `Warning : +1\n`;
teksWarn += `Total   : ${currentWarn} warning\n`;
teksWarn += `Alasan  : ${alasan}\n`;
teksWarn += `Admin   : @${sender.split('@')[0]}\n`;
teksWarn += `Batas   : 3 warning = kick\n\n`;
let batasWarn = 3;
if (currentWarn >= batasWarn) {
teksWarn += `PERHATIAN!\n`;
teksWarn += `User @${targetWarn.split('@')[0]} telah mencapai ${batasWarn} warning!\n`;
teksWarn += `Tindakan: Dikeluarkan dari grup!\n\n`;
delete warnDataWarn[m.chat][targetWarn];
if (Object.keys(warnDataWarn[m.chat]).length === 0) {
delete warnDataWarn[m.chat];
}
fs.writeFileSync('./database/warning.json', JSON.stringify(warnDataWarn, null, 2));
await satanic.sendMessage(m.chat, { text: teksWarn, mentions: [targetWarn, sender] }, { quoted: fkontak });
setTimeout(async () => {
await satanic.groupParticipantsUpdate(m.chat, [targetWarn], 'remove');
}, 2000);
} else {
await satanic.sendMessage(m.chat, { text: teksWarn, mentions: [targetWarn, sender] }, { quoted: fkontak });
}
break;
case 'tutupgc':
case 'tutupgb':
case 'gcclose':
case 'closegc':
case 'closegb':
if (!m.isGroup) return reply('Fitur Khusus Group!!!')
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply('Fitur Khusus admin!')
await satanic.groupSettingUpdate(m.chat, 'announcement')
reply('Group telah ditutup! Hanya admin yang bisa mengirim pesan.')
break
case 'bukagc':
case 'bukagb':
case 'gcopen':
case 'opengc':
case 'opengb':
if (!m.isGroup) return reply('Fitur Khusus Group!!!')
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
if (!isAdmins && !isCreator) return reply('Fitur Khusus admin!')
await satanic.groupSettingUpdate(m.chat, 'not_announcement')
reply('Group telah dibuka! Semua member bisa mengirim pesan.')
break
case 'swgroup':
case 'swgc':
if (!m.isGroup) return reply(mess.group)
if (!isAdmins && !isCreator) return reply(mess.admin)
if (!isBotAdmins) return reply('jadikan bot admin dahulu')
const body = m.body || ""
const caption = body.replace(new RegExp(`^\\${prefix}${command}\\s*`, "i"), "").trim()
const jidsw = m.chat
if (/image/.test(mime)) {
const buffer = await quoted.download()
await satanic.sendMessage(jidsw, {
groupStatusMessage: {
image: buffer,
caption
}
})
satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
} else if (/video/.test(mime)) {
const buffer = await quoted.download()
await satanic.sendMessage(jidsw, {
groupStatusMessage: {
video: buffer,
caption
}
})
satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
} else if (/audio/.test(mime)) {
const buffer = await quoted.download()
await satanic.sendMessage(jidsw, {
groupStatusMessage: {
audio: buffer
}
})
satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
} else if (caption) {
await satanic.sendMessage(jidsw, {
groupStatusMessage: {
text: caption
}
})
satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
} else {
await reply(
`Contoh penggunaan:\n` +
`${prefix + command} halo gais\n` +
`atau reply media dengan caption`
)
}
break
case 'backup':
case 'backupsc': {
if (!isCreator) return reply('Khusus owner!')
try {
reply('🔄 Memulai proses backup...')
const { execSync } = require("child_process")
const fs = require("fs")
const date = new Date()
const tanggal = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
const zipName = `Backup-${tanggal}.zip`
const excludeDirs = ['node_modules', 'sessions', 'tmp', 'cache', '.git', '.npm', 'package-lock.json']
let excludeCmd = ''
excludeDirs.forEach(dir => {
excludeCmd += ` -x "${dir}/**" `
})
const importantFiles = ['satanic.js', 'settings.js', 'index.js', 'package.json', 'lib', 'database', 'admin.js', 'plugins']
const existingFiles = []
for (const file of importantFiles) {
try {
if (fs.existsSync(file)) {
existingFiles.push(file)
}
} catch(e) {}
}
if (existingFiles.length === 0) {
return reply('❌ Tidak ada file yang bisa di-backup!')
}
execSync(`zip -r ${zipName} ${existingFiles.join(' ')} ${excludeCmd}`, {
stdio: 'pipe',
maxBuffer: 50 * 1024 * 1024
})
if (!fs.existsSync(zipName)) {
return reply('❌ Gagal membuat file backup!')
}
await satanic.sendMessage(m.chat, {
document: fs.readFileSync(zipName),
mimetype: 'application/zip',
fileName: zipName,
caption: `📦 Backup Source Code\n📅 Tanggal: ${tanggal}\n📁 Size: ${(fs.statSync(zipName).size / 1024 / 1024).toFixed(2)} MB`
}, { quoted: fkontak })
fs.unlinkSync(zipName)
reply('✅ Backup berhasil dikirim ke owner!')
} catch (err) {
console.error('Error backup:', err)
reply(`❌ Error: ${err.message}`)
try {
const files = fs.readdirSync('.')
files.forEach(file => {
if (file.endsWith('.zip') && file.startsWith('Backup-')) {
fs.unlinkSync(file)
}
})
} catch(e) {}
}
}
break

case 'topmember':
case 'totalchat':
case 'totalpesan':
if (!m.isGroup) return reply('onlygroup');
if (!isAdmins) return reply('you are not admin');
if (!isBotAdmins) return reply('jadikan bot admin dahulu');
if (!global.db.chats[m.chat]) global.db.chats[m.chat] = {};
if (!global.db.chats[m.chat].totalChat) global.db.chats[m.chat].totalChat = {};
const metadata = await satanic.groupMetadata(m.chat);
const groupName = metadata.subject;
const totalMembers = metadata.participants.length;
if (text && text.toLowerCase() === 'reset') {
const chatData = global.db.chats[m.chat];
if (chatData.totalChat) {
Object.keys(chatData.totalChat).forEach(key => {
delete chatData.totalChat[key];
});
}
reply('Statistik chat berhasil di reset.');
return;
}
const entries = Object.entries(global.db.chats[m.chat].totalChat)
.filter(([jid]) => jid.endsWith('@s.whatsapp.net'))
.map(([jid, count]) => ({ jid, count }))
.sort((a, b) => b.count - a.count)
.slice(0, 15);
if (entries.length === 0) {
return reply(`CHAT INSIGHT\n\nBelum ada data chat tercatat.`);
}
const allActiveMembers = Object.keys(global.db.chats[m.chat].totalChat)
.filter(jid => jid.endsWith('@s.whatsapp.net')).length;
const inactiveMembers = totalMembers - allActiveMembers;
const totalMessages = entries.reduce((sum, el) => sum + el.count, 0);
let mentionstt = entries.map(item => item.jid);
const medals = ['[1]', '[2]', '[3]'];
let teks = `CHAT INSIGHT\n\n`;
teks += `Grup               : ${groupName}\n`;
teks += `Total Member       : ${totalMembers}\n`;
teks += `Member Aktif       : ${allActiveMembers}\n`;
teks += `Member Tidak Aktif : ${inactiveMembers}\n`;
teks += `Total Pesan        : ${totalMessages.toLocaleString('id-ID')}\n\n`;
teks += `TOP MEMBER PALING AKTIF\n`;
for (let i = 0; i < entries.length; i++) {
const { jid, count } = entries[i];
const namell = jid.split('@')[0];
const medal = medals[i] || `[${i + 1}]`;
const percent = ((count / totalMessages) * 100).toFixed(1);
teks += `\n${medal} @${namell}\n`;
teks += `Pesan : ${count.toLocaleString('id-ID')} (${percent}%)\n`;
}
teks += `\nSTATISTIK GRUP\n`;
teks += `Top Chat           : ${entries[0]?.count.toLocaleString('id-ID')} pesan\n`;
teks += `Member Aktif       : ${allActiveMembers}\n`;
teks += `Member Tidak Aktif : ${inactiveMembers}\n`;
teks += `Total Member       : ${totalMembers}\n`;
teks += `Tracking           : Real-time\n\n`;
teks += `Gunakan ${prefix + command} reset untuk mereset statistik`;
await satanic.sendMessage(m.chat, { text: teks, mentions: mentionstt }, { quoted: fkontak });
break;

/////////// GARIS BATAS MENU GROUP /////////

////////// AWAL BARIS MENU STICKER /////
case 'bratanime':
case 'animebrat':
if (!text) return satanic.sendMessage(m.chat, { text: `Masukkan teks!\nContoh: .bratanime Hayolo` }, { quoted: fkontak })
await satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } })
const url = `https://api.nexray.web.id/maker/bratanime?text=${encodeURIComponent(text)}`
const response = await axios.get(url, { responseType: 'arraybuffer' })
await satanic.sendImageAsSticker(m.chat, response.data, m, { packname: global.packname, author: global.author })
break
case 'ttp':
case 'attp':
if (!text) return satanic.sendMessage(m.chat, { text: `Masukkan teks!\nContoh: .ttp Hayolo` }, { quoted: fkontak })
await satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } })
const url2 = `https://api.nexray.eu.cc/maker/${command}?text=${encodeURIComponent(text)}`
const response2 = await axios.get(url2, { responseType: 'arraybuffer' })
await satanic.sendImageAsSticker(m.chat, response2.data, m, { packname: global.packname, author: global.author })
break
case 'pornhub':
case 'comic':
case 'wolf-galaxy':
case 'write-grafitty':
case 'wetglass':
case 'typogrpahy':
case 'pixel-glitch':
case 'pavement':
case 'painting':
case 'naruto':
case 'mascot':
case 'marvel':
case 'glitch':
case 'devil-wings':
case 'dragonball':
case 'foggy-glass':
case 'bear':
case 'blackpink':
case 'avengers':
if (!text) return satanic.sendMessage(m.chat, { text: `Masukkan teks!\nContoh: .${command} Hayolo` }, { quoted: fkontak })
await satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } })
const url3 = `https://api.nexray.eu.cc/textpro/${command}?text=${encodeURIComponent(text)}`
const response3 = await axios.get(url3, { responseType: 'arraybuffer' })
await satanic.sendImageAsSticker(m.chat, response3.data, m, { packname: global.packname, author: global.author })
break
case 'pakustad':
case 'ustad':
case 'ustadz':
if (!text) return satanic.sendMessage(m.chat, { text: `Masukkan teks!\nContoh: .pakustad Jangan putus asa` }, { quoted: fkontak })
await satanic.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } })
const apiUrl = `https://api.cuki.biz.id/api/canvas/ustadz?apikey=cuki-x&text=${encodeURIComponent(text)}`
const { data } = await axios.get(apiUrl)
await satanic.sendMessage(m.chat, { image: { url: data.results.url }, caption: `“${text}”` }, { quoted: fkontak })
break
case 'nikparse':
case 'ceknik':
if (!text) return reply(`Contoh:\n${prefix + command} 181005415784847`)
const nik = text.trim()
if (nik.length !== 16 || !/^\d+$/.test(nik)) {
return reply("NIK harus 16 digit angka!")
}
satanic.sendMessage(m.chat, { react: { text: "⏳", key: m.key } })
try {
const api = `https://api.siputzx.my.id/api/tools/nik-checker?nik=${nik}`
const res = await fetchJson(api)
if (!res.status || !res.data) {
return reply("Tidak dapat mengambil data dari server!")
}
const d = res.data.data
const meta = res.data.metadata
const lhp = res.data.data_lhp?.[0]
let teks = `HASIL CEK NIK
──────────────────────
Nama: ${d.nama}
NIK: ${res.data.nik}
Jenis Kelamin: ${d.kelamin}
Tanggal Lahir: ${d.tempat_lahir}
Usia: ${d.usia}
Zodiak: ${d.zodiak}
Ultah Mendatang: ${d.ultah_mendatang}
Pasaran: ${d.pasaran}

ALAMAT & WILAYAH
Provinsi: ${d.provinsi}
Kabupaten/Kota: ${d.kabupaten}
Kecamatan: ${d.kecamatan}
Kelurahan: ${d.kelurahan}
TPS: ${d.tps}
Alamat: ${d.alamat}

KOORDINAT
Lat: ${d.koordinat.lat}
Lon: ${d.koordinat.lon}

METADATA
Kode Wilayah: ${meta.kode_wilayah}
Nomor Urut: ${meta.nomor_urut}
Kategori Usia: ${meta.kategori_usia}
Jenis Wilayah: ${meta.jenis_wilayah}
Metode: ${meta.metode_pencarian}`
if (lhp) {
teks += `

DATA LHP
Nama: ${lhp.nama}
Kecamatan: ${lhp.kecamatan}
Kelurahan: ${lhp.kelurahan}
TPS: ${lhp.tps}
Sumber: ${lhp.source}
Alamat: ${lhp.alamat}`
}
reply(teks)
satanic.sendMessage(m.chat, { react: { text: "✅", key: m.key } })
} catch (e) {
console.log(e)
reply("Terjadi kesalahan server!")
}
break
case 'bratvid':
case 'bratvideo': {
  if (!text) return reply('Mana Text Nya')
  var image = `https://free-restapi.biz.id/api/bratvid?text=${encodeURIComponent(text)}&apikey=${global.sakey}`
  const response = await axios.get(image, { responseType: 'arraybuffer' })
  await satanic.sendImageAsSticker(m.chat, response.data, m, { packname: foother })
  satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}
break
case 'brat':
case 'bratgambar':
case 'bratimg': {
  if (!text) return reply('teksnya')
  const brat = `https://skyzxu-brat.hf.space/brat?text=${encodeURIComponent(text)}`
  const response = await axios.get(brat, { responseType: 'arraybuffer' })
  await satanic.sendImageAsSticker(m.chat, response.data, m, { packname: global.packname })
}
break
case 'brathd': {
  if (!text) return reply('teksnya')
  const brat = `https://api.nexray.eu.cc/maker/brathd?text=${encodeURIComponent(text)}`
  const response = await axios.get(brat, { responseType: 'arraybuffer' })
  await satanic.sendImageAsSticker(m.chat, response.data, m, { packname: global.packname })
}
break
case 'telestick': {
if (!m.isGroup) {
return m.reply('Fitur Khusus Group!');
}
await satanic.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });
let args = m.text.split(' ').slice(1);
if (!args.length) {
return m.reply(`📌 Cara pakai:
.telestick <url> - Ambil semua sticker dari Telegram

📌 Contoh:
.telestick https://t.me/addstickers/NekobotPack
.telestick https://t.me/addstickers/AnimeSticker`);
}
const axios = require('axios');
const crypto = require('crypto');
const https = require('https');
const JSZip = require('jszip');
const sharp = require('sharp');
const botToken = '7935827856:AAGdbLXArulCigWyi6gqR07gi--ZPm7ewhc';
if (!global.getStickerSession) global.getStickerSession = {};
function sha256(buffer) {
return crypto.createHash('sha256').update(buffer).digest();
}
function toB64Url(buffer) {
return Buffer.from(buffer)
.toString('base64')
.replace(/\+/g, '-')
.replace(/\//g, '_')
.replace(/=+$/g, '');
}
function isWebP(buffer) {
if (!buffer || !Buffer.isBuffer(buffer) || buffer.length < 12) return false;
return buffer.toString('ascii', 0, 4) === 'RIFF' &&
buffer.toString('ascii', 8, 12) === 'WEBP';
}
function isAnimatedWebP(buffer) {
if (!isWebP(buffer)) return false;
let offset = 12;
while (offset < buffer.length - 8) {
const chunk = buffer.toString('ascii', offset, offset + 4);
const size = buffer.readUInt32LE(offset + 4);
if (chunk === 'VP8X' && (buffer[offset + 8] & 0x02)) return true;
if (chunk === 'ANIM' || chunk === 'ANMF') return true;
offset += 8 + size + (size % 2);
}
return false;
}
function detectImageFormat(buffer) {
if (!buffer || !Buffer.isBuffer(buffer) || buffer.length < 12) return 'unknown';
try {
const header = buffer.slice(0, 12);
if (header.length >= 4 && header.toString('hex', 0, 4) === '89504e47') return 'png';
if (header.length >= 3 && header.toString('hex', 0, 3) === 'ffd8ff') return 'jpg';
if (header.length >= 12 && header.toString('ascii', 0, 4) === 'RIFF' &&
header.toString('ascii', 8, 12) === 'WEBP') return 'webp';
if (header.length >= 6 && header.toString('hex', 0, 6) === '47494638') return 'gif';
if (header.length >= 2 && header.toString('hex', 0, 2) === '424d') return 'bmp';
return 'unknown';
} catch (e) {
return 'unknown';
}
}
async function convertToWebP(buffer) {
if (!buffer || !Buffer.isBuffer(buffer)) return null;
const format = detectImageFormat(buffer);
try {
if (format === 'webp') return buffer;
if (format === 'unknown') return null;
let sharpInstance = sharp(buffer);
sharpInstance = sharpInstance.resize(512, 512, {
fit: 'contain',
background: { r: 255, g: 255, b: 255, alpha: 0 }
});
return await sharpInstance.webp({
quality: 80,
effort: 4
}).toBuffer();
} catch (error) {
return null;
}
}
function validateSticker(buffer) {
if (!buffer || !Buffer.isBuffer(buffer) || buffer.length < 12) return false;
const format = detectImageFormat(buffer);
const supportedFormats = ['png', 'jpg', 'webp', 'gif', 'bmp'];
return supportedFormats.includes(format);
}
function classifySticker(buffer, stickerMessage) {
if (stickerMessage && stickerMessage.isLottie) {
return { ext: 'json', mimetype: 'application/json', isAnimated: true, isLottie: true };
}
const isAnimated = isWebP(buffer) ? isAnimatedWebP(buffer) : false;
return { ext: 'webp', mimetype: 'image/webp', isAnimated: isAnimated, isLottie: false };
}
async function makeTrayWebp(buffer) {
if (!buffer || !Buffer.isBuffer(buffer)) return await makeBlankTrayWebp();
try {
return await sharp(buffer, { animated: false })
.resize(252, 252, { fit: 'cover' })
.webp()
.toBuffer();
} catch (e) {
return await makeBlankTrayWebp();
}
}
async function makeBlankTrayWebp() {
return await sharp({
create: { width: 252, height: 252, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
}).webp().toBuffer();
}
async function makeThumbnailJpeg(buffer) {
if (!buffer || !Buffer.isBuffer(buffer)) {
return await sharp({
create: { width: 252, height: 252, channels: 3, background: { r: 255, g: 255, b: 255 } }
}).jpeg().toBuffer();
}
try {
return await sharp(buffer)
.resize(252, 252, { fit: 'cover' })
.jpeg()
.toBuffer();
} catch (e) {
return await sharp({
create: { width: 252, height: 252, channels: 3, background: { r: 255, g: 255, b: 255 } }
}).jpeg().toBuffer();
}
}
async function uploadToServer(satanic, buffer, { hkdf, mediaPath, mediaKey = crypto.randomBytes(32) }) {
try {
const expanded = Buffer.from(
crypto.hkdfSync('sha256', mediaKey, Buffer.alloc(32), Buffer.from(hkdf), 112)
);
const iv = expanded.subarray(0, 16);
const cipherKey = expanded.subarray(16, 48);
const macKey = expanded.subarray(48, 80);
const cipher = crypto.createCipheriv('aes-256-cbc', cipherKey, iv);
const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
const mac = crypto.createHmac('sha256', macKey).update(iv).update(encrypted).digest().subarray(0, 10);
const encBuffer = Buffer.concat([encrypted, mac]);
const fileSha256 = sha256(buffer);
const fileEncSha256 = sha256(encBuffer);
const iq = await satanic.query({
tag: 'iq',
attrs: { id: satanic.generateMessageTag?.() ?? Date.now().toString(), to: 's.whatsapp.net', type: 'set', xmlns: 'w:m' },
content: [{ tag: 'media_conn', attrs: {} }]
});
const mediaConn = iq.content?.find(v => v.tag === 'media_conn');
if (!mediaConn) throw new Error('media_conn tidak ditemukan');
const auth = mediaConn.attrs?.auth;
if (!auth) throw new Error('auth media_conn tidak ditemukan');
const hosts = (mediaConn.content || [])
.filter(v => v.tag === 'host')
.map(v => v.attrs?.hostname)
.filter(Boolean);
if (!hosts.length) throw new Error('host upload tidak ditemukan');
const token = encodeURIComponent(
fileEncSha256.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
);
let lastError;
for (const host of hosts) {
try {
const json = await new Promise((resolve, reject) => {
const url = new URL(`https://${host}${mediaPath}/${token}?auth=${encodeURIComponent(auth)}&token=${token}`);
const req = https.request({
hostname: url.hostname,
port: 443,
path: url.pathname + url.search,
method: 'POST',
headers: {
Origin: 'https://web.whatsapp.com',
Referer: 'https://web.whatsapp.com/',
'Content-Type': 'application/octet-stream',
'Content-Length': encBuffer.length,
},
}, (res) => {
let body = '';
res.on('data', c => body += c);
res.on('end', () => {
if (res.statusCode < 200 || res.statusCode >= 300) {
return reject(new Error(`Upload gagal ${res.statusCode}: ${body}`));
}
try {
resolve(JSON.parse(body));
} catch {
reject(new Error(`Response bukan JSON: ${body}`));
}
});
});
req.on('error', (e) => reject(e));
req.write(encBuffer);
req.end();
});
const directPath = json.direct_path ?? json.directPath ?? json.url ?? json.path;
if (!directPath) throw new Error('directPath tidak ditemukan');
return { mediaKey, fileLength: buffer.length, fileSha256, fileEncSha256, directPath, ...json };
} catch (e) {
lastError = e;
}
}
throw lastError ?? new Error('Semua host upload gagal');
} catch (error) {
throw error;
}
}
async function sendCustomStickerPack(satanic, m, pack, packName = 'Sticker Pack') {
try {
const zip = new JSZip();
const stickersMetadata = [];
for (const item of pack) {
const fileName = `${toB64Url(sha256(item.buffer))}.${item.ext}`;
zip.file(fileName, item.buffer);
stickersMetadata.push({
fileName,
isAnimated: item.isAnimated,
emojis: [''],
accessibilityLabel: '',
isLottie: item.isLottie,
mimetype: item.mimetype,
});
}
const trayIconFileName = 'tray_icon.webp';
const traySource = pack.find(v => !v.isLottie)?.buffer;
const trayBuffer = traySource ? await makeTrayWebp(traySource) : await makeBlankTrayWebp();
zip.file(trayIconFileName, trayBuffer);
const archive = await zip.generateAsync({ type: 'nodebuffer', compression: 'STORE' });
const packUpload = await uploadToServer(satanic, archive, {
hkdf: 'WhatsApp Sticker Pack Keys',
mediaPath: '/mms/sticker-pack',
});
const thumbnailBuffer = await makeThumbnailJpeg(trayBuffer);
const thumbUpload = await uploadToServer(satanic, thumbnailBuffer, {
hkdf: 'WhatsApp Sticker Pack Thumbnail Keys',
mediaPath: '/mms/thumbnail-sticker-pack',
mediaKey: packUpload.mediaKey,
});
await satanic.relayMessage(m.chat, {
messageContextInfo: { messageSecret: crypto.randomBytes(32) },
stickerPackMessage: {
stickerPackId: 'Pack_' + crypto.randomBytes(8).toString('hex'),
name: packName,
publisher: 'Bot WhatsApp',
packDescription: 'Generated from Telegram',
stickers: stickersMetadata,
fileLength: packUpload.fileLength,
fileSha256: packUpload.fileSha256,
fileEncSha256: packUpload.fileEncSha256,
mediaKey: packUpload.mediaKey,
directPath: packUpload.directPath,
mediaKeyTimestamp: Math.floor(Date.now() / 1000),
stickerPackSize: packUpload.fileLength,
stickerPackOrigin: 2,
trayIconFileName,
thumbnailDirectPath: thumbUpload.directPath,
thumbnailSha256: thumbUpload.fileSha256,
thumbnailEncSha256: thumbUpload.fileEncSha256,
thumbnailHeight: 252,
thumbnailWidth: 252,
imageDataHash: thumbUpload.fileSha256.toString('base64'),
},
}, { quoted: m });
} catch (error) {
throw error;
}
}
const url = args[0];
const match = url.match(/https:\/\/t\.me\/addstickers\/([^\/\?#]+)/);
if (!match) {
await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
return m.reply('❌ URL Telegram sticker tidak valid!');
}
await m.reply(`🔍 Mengambil sticker pack dari Telegram...`);
try {
const { data: a } = await axios.get(
`https://api.telegram.org/bot${botToken}/getStickerSet?name=${match[1]}`
);
if (!a.result || !a.result.stickers) {
throw new Error('Sticker pack tidak ditemukan');
}
await m.reply(`📦 Mendapatkan ${a.result.stickers.length} sticker, mengkonversi...`);
const stickerUrls = [];
for (const sticker of a.result.stickers) {
const { data: b } = await axios.get(
`https://api.telegram.org/bot${botToken}/getFile?file_id=${sticker.file_id}`
);
stickerUrls.push({
is_animated: sticker.is_animated || false,
is_video: sticker.is_video || false,
url: `https://api.telegram.org/file/bot${botToken}/${b.result.file_path}`
});
}
let packItems = [];
let successCount = 0;
for (let i = 0; i < stickerUrls.length; i++) {
try {
const s = stickerUrls[i];
const img = await axios.get(s.url, {
responseType: 'arraybuffer',
timeout: 30000
});
let buffer = Buffer.from(img.data);
if (!validateSticker(buffer)) continue;
let webpBuffer = buffer;
const format = detectImageFormat(buffer);
if (format !== 'webp') {
webpBuffer = await convertToWebP(buffer);
if (!webpBuffer) continue;
}
const classification = classifySticker(webpBuffer, { isLottie: s.is_animated });
packItems.push({
buffer: webpBuffer,
ext: classification.ext,
isAnimated: classification.isAnimated || s.is_animated,
isLottie: classification.isLottie || s.is_animated,
mimetype: classification.mimetype
});
successCount++;
} catch (e) {}
}
if (!packItems.length) {
await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
return m.reply('❌ Gagal mengkonversi sticker');
}
await sendCustomStickerPack(satanic, m, packItems, a.result.title || 'Telegram Sticker');
await m.reply(`✅ Berhasil mengirim ${packItems.length} sticker dari Telegram`);
await satanic.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
} catch (error) {
await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
m.reply(`❌ Error: ${error.message}`);
}
break;
}
case 'emojimix':
if (!text) return reply(`Contoh: ${prefix + command} 😅+🤔`)
const [emoji1, emoji2] = text.split('+')
if (!emoji1 || !emoji2) return reply(`Contoh: ${prefix + command} 😅+🤔`)
const anumojimix = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
for (let res of anumojimix.results) {
await satanic.sendImageAsSticker(m.chat, res.url, m, {
packname: global.packname,
author: global.author,
categories: res.tags
})
}
break

case 'iqc':
if (!text) return reply('Masukkan teks!\n\nContoh: .iqc kamu bodoh')
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
try {
const apiUrl = `https://api.nexray.eu.cc/maker/iqc?text=${encodeURIComponent(text)}`
const response = await fetch(apiUrl)
if (!response.ok) throw new Error(`HTTP Error ${response.status}`)
const buffer = await response.arrayBuffer()
const imageBuffer = Buffer.from(buffer)
await satanic.sendMessage(m.chat, {
image: imageBuffer,
caption: `done\n"${text}"`
}, { quoted: fkontak })
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
} catch (e) {
console.error('Error in iqc case:', e)
reply('Error: ' + (e.message || 'Gagal membuat IQ Challenge'))
}
break

case 'qcwin':
if (!text) return reply('Masukkan teks!\n\nContoh: .qcwin kamu bodoh')
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
try {
const apiUrl = `https://free-restapi.biz.id/api/qcwin?text=${encodeURIComponent(text)}&apikey=${global.sakey}`
const response = await fetch(apiUrl)
if (!response.ok) throw new Error(`HTTP Error ${response.status}`)
const buffer = await response.arrayBuffer()
const imageBuffer = Buffer.from(buffer)
await satanic.sendMessage(m.chat, {
image: imageBuffer,
caption: `done\n"${text}"`
}, { quoted: fkontak })
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
} catch (e) {
console.error('Error in qcwin case:', e)
reply('Error: ' + (e.message || 'Gagal membuat IQ Challenge'))
}
break

case 'iqc2':
const isImage = /image/.test(mime)
if (!text && !isImage) return reply(`Masukkan teks atau kirim/reply gambar!\n\nContoh:\n.iqc2 Halo\n.iqc2 (dengan gambar)`)
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
try {
let userText = text || ''
let imageUrl = ''
if (isImage) {
let media = await quoted.download()
const form = new FormData()
form.append('files[]', media, { filename: 'image.jpg' })
const uploadRes = await axios.post('https://pone.rs/upload.php', form, {
headers: {
...form.getHeaders(),
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36',
'Referer': 'https://pone.rs/',
'Origin': 'https://pone.rs'
},
maxBodyLength: Infinity,
maxContentLength: Infinity
})
if (!uploadRes.data?.success || !uploadRes.data?.files?.[0]?.url) {
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
return reply(`Gagal upload foto! Silahkan coba lagi.`)
}
imageUrl = uploadRes.data.files[0].url
}
const now = new Date()
const wibTime = now.toLocaleString('en-US', { 
timeZone: 'Asia/Jakarta',
hour12: false,
hour: '2-digit',
minute: '2-digit'
})
let apiUrl = `https://free-restapi.biz.id/api/iqc3?apikey=${global.sakey}`
if (userText) apiUrl += `&text=${encodeURIComponent(userText)}`
if (imageUrl) apiUrl += `&url=${encodeURIComponent(imageUrl)}`
apiUrl += `&time=${encodeURIComponent(wibTime)}`
const response = await axios.get(apiUrl, { responseType: 'arraybuffer' })
let caption = `IQC3\n\n`
caption += `Waktu: ${wibTime} WIB\n`
if (userText) caption += `Teks: ${userText}\n`
if (imageUrl) caption += `Gambar: Terdeteksi`
await satanic.sendMessage(m.chat, {
image: Buffer.from(response.data),
caption: caption
}, { quoted: fkontak })
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
} catch (err) {
console.error('Error IQC3:', err)
reply('Terjadi kesalahan saat menghubungi IQC3.')
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
}
break
case 'fakedj':
if (!text) return reply('Masukkan teks!\n\nContoh: .fakedj kamu bodoh')
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
try {
const apiUrl = `https://free-restapi.biz.id/api/fakedj?text=${encodeURIComponent(text)}&apikey=${global.sakey}`
const response = await fetch(apiUrl)
if (!response.ok) throw new Error(`HTTP Error ${response.status}`)
const buffer = await response.arrayBuffer()
const imageBuffer = Buffer.from(buffer)
await satanic.sendMessage(m.chat, {
image: imageBuffer,
caption: `done\n"${text}"`
}, { quoted: fkontak })
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
} catch (e) {
console.error('Error in fakedj case:', e)
reply('Error: ' + (e.message || 'Gagal membuat fakedj'))
}
break

case 'qcwa':
const quotedQcwa = m.quoted ? m.quoted : m
const mimeQcwa = (quotedQcwa.msg || quotedQcwa).mimetype || ''
const isImageQcwa = /image/.test(mimeQcwa)
if (!text && !isImageQcwa) return reply(`Masukkan pesan atau kirim/reply gambar!\n\nContoh:\n.qcwa Halo\n.qcwa Halo|nama|tag|phone\n.qcwa (dengan gambar)`)
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
try {
let userText = text || ''
let customUsername = ''
let customTag = ''
let customPhone = ''
let imageUrl = ''
if (userText && userText.includes('|')) {
const parts = userText.split('|')
userText = parts[0] || ''
customUsername = parts[1] || ''
customTag = parts[2] || ''
customPhone = parts[3] || ''
}
const username = customUsername || m.pushName || 'User'
const tag = customTag || username.toLowerCase().replace(/\s/g, '')
let phone = customPhone || m.sender?.split('@')[0] || '628123456789'
if (isImageQcwa) {
const media = await quotedQcwa.download()
const form = new FormData()
form.append('files[]', media, { filename: 'image.jpg' })
const uploadRes = await axios.post('https://pone.rs/upload.php', form, {
headers: {
...form.getHeaders(),
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36',
'Referer': 'https://pone.rs/',
'Origin': 'https://pone.rs'
},
maxBodyLength: Infinity,
maxContentLength: Infinity
})
if (!uploadRes.data?.success || !uploadRes.data?.files?.[0]?.url) {
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
return reply(`Gagal upload gambar! Silahkan coba lagi.`)
}
imageUrl = uploadRes.data.files[0].url
}
let avatarUrl = ''
if (!customUsername && !customTag && !customPhone) {
try {
const ppUrl = await satanic.profilePictureUrl(m.sender, 'image')
if (ppUrl) avatarUrl = ppUrl
} catch (err) {
console.log('Gagal mengambil foto profil:', err)
}
}
let apiUrl = `https://free-restapi.biz.id/api/qcwa?apikey=${global.sakey}`
if (userText) apiUrl += `&text=${encodeURIComponent(userText)}`
apiUrl += `&username=${encodeURIComponent(username)}`
const phoneClean = phone.replace(/[^0-9]/g, '')
apiUrl += `&phone=${encodeURIComponent(phoneClean)}`
apiUrl += `&tag=${encodeURIComponent(tag)}`
if (avatarUrl) apiUrl += `&ppUrl=${encodeURIComponent(avatarUrl)}`
if (imageUrl) apiUrl += `&imUrl=${encodeURIComponent(imageUrl)}`
const response = await axios.get(apiUrl, { responseType: 'arraybuffer' })
const formattedPhone = phoneClean.replace(/(\d{2})(\d{3})(\d{4})(\d{4})/, '+$1 $2-$3-$4')
let caption = `QR Code WhatsApp berhasil dibuat!\n\nUsername: ${username}\nPhone: ${formattedPhone || phoneClean}\nTag: ${tag}`
if (userText) caption += `\nPesan: ${userText}`
if (imageUrl) caption += `\nGambar: Terdeteksi`
if (customUsername || customTag || customPhone) caption += `\nMode: Manual`
await satanic.sendMessage(m.chat, {
image: Buffer.from(response.data),
caption: caption
}, { quoted: fkontak })
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
} catch (err) {
console.error('Error QCWA:', err)
reply('Terjadi kesalahan saat membuat QR Code WhatsApp.')
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
}
break

case 'igqc':
if (!text) return reply('Masukkan teks!\n\nContoh: .igqc kamu bodoh')
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
try {
const apiUrl = `https://free-restapi.biz.id/api/igqc?text=${encodeURIComponent(text)}&apikey=${global.sakey}`
const response = await fetch(apiUrl)
if (!response.ok) throw new Error(`HTTP Error ${response.status}`)
const buffer = await response.arrayBuffer()
const imageBuffer = Buffer.from(buffer)
await satanic.sendMessage(m.chat, {
image: imageBuffer,
caption: `done\n"${text}"`
}, { quoted: fkontak })
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
} catch (e) {
console.error('Error in igqc case:', e)
reply('Error: ' + (e.message || 'Gagal membuat igqc'))
}
break
case 'suratsakit': {
    const { createCanvas, loadImage } = require('@napi-rs/canvas')
    const moment = require('moment-timezone')

    const escapeXml = (value) => {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;')
    }

    const SCALE = 3
    const BASE_WIDTH = 600
    const BASE_HEIGHT = 900
    const CANVAS_WIDTH = BASE_WIDTH * SCALE
    const CANVAS_HEIGHT = BASE_HEIGHT * SCALE
    const PADDING = 40 * SCALE

    try {
        if (!text) {
            return reply(
                `Format:\n` +
                `${prefix + command} nama|umur|jenis kelamin|alamat|diagnosa|lama istirahat\n\n` +
                `Contoh:\n` +
                `${prefix + command} Fauzan|25|Laki-laki|Jl. Merdeka No. 10|Demam|3\n\n` +
                `Keterangan:\n` +
                `- Lama istirahat dalam hari (angka)`
            )
        }

        const parts = text.split('|').map(v => v.trim())

        if (parts.length < 6) {
            return reply(
                `Format salah!\n\n` +
                `Gunakan:\n` +
                `${prefix + command} nama|umur|jenis kelamin|alamat|diagnosa|lama istirahat\n\n` +
                `Contoh:\n` +
                `${prefix + command} Fauzan|25|Laki-laki|Jl. Merdeka No. 10|Demam|3`
            )
        }

        const [namaPasien, umurPasien, jkPasien, alamatPasien, diagnosaPasien, lamaPasien] = parts

        const lamaIstirahat = parseInt(lamaPasien.replace(/[^\d]/g, ''))

        if (isNaN(lamaIstirahat) || lamaIstirahat <= 0) {
            return reply(`Lama istirahat harus berupa angka!\nContoh: 3`)
        }

        await satanic.sendMessage(m.chat, { react: { text: "🕕", key: m.key } })

        const now = moment().tz('Asia/Jakarta')
        const tanggalSurat = now.format('DD MMMM YYYY')
        const tglMulai = now.clone().format('DD MMMM YYYY')
        const tglSelesai = now.clone().add(lamaIstirahat - 1, 'days').format('DD MMMM YYYY')

        const noSurat = global.nosuratrs || `SK/${now.format('YYYYMMDD')}/${Math.floor(Math.random() * 900) + 100}`

        const rsName = global.namars || 'PUSKESMAS SEHAT SENTOSA'
        const rsAlamat = global.alamatrs || 'Jl. Kesehatan No. 45, Jakarta'
        const rsTelp = global.telprs || '(021) 1234567'
        const rsEmail = global.emailrs || 'puskesmas@sehat.go.id'
        const rsKota = global.kotars || 'Jakarta'
        const rsProvinsi = global.provinsirs || 'DKI Jakarta'
        const rsKodePos = global.kodeposrs || '12345'
        const rsWebsite = global.websiters || 'www.puskesmas-sehat.go.id'
        const rsNpwp = global.npwprs || '01.234.567.8-901.000'

        const dokterName = global.namadokter || 'dr. Ahmad Setiawan'
        const dokterNip = global.nipdokter || '19780512 200501 1 001'
        const dokterSIP = global.sipdokter || 'SIP.446/1234/DU/2024'
        const dokterSpesialis = global.spesialisdokter || 'Dokter Umum'
        const dokterTtd = global.ttddokter || null

        const pasienName = namaPasien.toUpperCase()

        const F = (n) => Math.round(n * SCALE)

        const formatTanggal = (str) => {
            const bulanID = {
                'January': 'Januari', 'February': 'Februari', 'March': 'Maret',
                'April': 'April', 'May': 'Mei', 'June': 'Juni',
                'July': 'Juli', 'August': 'Agustus', 'September': 'September',
                'October': 'Oktober', 'November': 'November', 'December': 'Desember'
            }
            return str.replace(/January|February|March|April|May|June|July|August|September|October|November|December/g, m => bulanID[m])
        }

        const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}" viewBox="0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}">
            <rect width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}" fill="#ffffff"/>

            <rect x="${F(20)}" y="${F(20)}" width="${CANVAS_WIDTH - F(40)}" height="${CANVAS_HEIGHT - F(40)}" fill="none" stroke="#000" stroke-width="${F(1)}"/>
            <rect x="${F(26)}" y="${F(26)}" width="${CANVAS_WIDTH - F(52)}" height="${CANVAS_HEIGHT - F(52)}" fill="none" stroke="#000" stroke-width="${F(0.5)}"/>

            <text x="${CANVAS_WIDTH / 2}" y="${F(70)}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${F(18)}" font-weight="bold" fill="#000">${escapeXml(rsName.toUpperCase())}</text>
            <text x="${CANVAS_WIDTH / 2}" y="${F(92)}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${F(11)}" fill="#000">${escapeXml(rsAlamat)}</text>
            <text x="${CANVAS_WIDTH / 2}" y="${F(108)}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${F(11)}" fill="#000">Telp: ${escapeXml(rsTelp)} | Email: ${escapeXml(rsEmail)}</text>
            <text x="${CANVAS_WIDTH / 2}" y="${F(124)}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${F(11)}" fill="#000">Website: ${escapeXml(rsWebsite)} | NPWP: ${escapeXml(rsNpwp)}</text>

            <line x1="${F(40)}" y1="${F(140)}" x2="${CANVAS_WIDTH - F(40)}" y2="${F(140)}" stroke="#000" stroke-width="${F(1.5)}"/>
            <line x1="${F(40)}" y1="${F(144)}" x2="${CANVAS_WIDTH - F(40)}" y2="${F(144)}" stroke="#000" stroke-width="${F(0.5)}"/>

            <text x="${CANVAS_WIDTH / 2}" y="${F(190)}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${F(18)}" font-weight="bold" fill="#000" text-decoration="underline">SURAT KETERANGAN SAKIT</text>
            <text x="${CANVAS_WIDTH / 2}" y="${F(212)}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${F(11)}" fill="#000">Nomor: ${escapeXml(noSurat)}</text>

            <text x="${F(40)}" y="${F(255)}" font-family="Arial, sans-serif" font-size="${F(12)}" fill="#000">Yang bertanda tangan di bawah ini, ${escapeXml(dokterSpesialis)} pada ${escapeXml(rsName)}:</text>

            <text x="${F(60)}" y="${F(290)}" font-family="Arial, sans-serif" font-size="${F(12)}" fill="#000">Nama</text>
            <text x="${F(220)}" y="${F(290)}" font-family="Arial, sans-serif" font-size="${F(12)}" fill="#000">: ${escapeXml(dokterName)}</text>

            <text x="${F(60)}" y="${F(312)}" font-family="Arial, sans-serif" font-size="${F(12)}" fill="#000">NIP</text>
            <text x="${F(220)}" y="${F(312)}" font-family="Arial, sans-serif" font-size="${F(12)}" fill="#000">: ${escapeXml(dokterNip)}</text>

            <text x="${F(60)}" y="${F(334)}" font-family="Arial, sans-serif" font-size="${F(12)}" fill="#000">SIP</text>
            <text x="${F(220)}" y="${F(334)}" font-family="Arial, sans-serif" font-size="${F(12)}" fill="#000">: ${escapeXml(dokterSIP)}</text>

            <text x="${F(40)}" y="${F(375)}" font-family="Arial, sans-serif" font-size="${F(12)}" fill="#000">Dengan ini menerangkan bahwa:</text>

            <text x="${F(60)}" y="${F(410)}" font-family="Arial, sans-serif" font-size="${F(12)}" fill="#000">Nama</text>
            <text x="${F(220)}" y="${F(410)}" font-family="Arial, sans-serif" font-size="${F(12)}" font-weight="bold" fill="#000">: ${escapeXml(pasienName)}</text>

            <text x="${F(60)}" y="${F(432)}" font-family="Arial, sans-serif" font-size="${F(12)}" fill="#000">Umur</text>
            <text x="${F(220)}" y="${F(432)}" font-family="Arial, sans-serif" font-size="${F(12)}" fill="#000">: ${escapeXml(umurPasien)} tahun</text>

            <text x="${F(60)}" y="${F(454)}" font-family="Arial, sans-serif" font-size="${F(12)}" fill="#000">Jenis Kelamin</text>
            <text x="${F(220)}" y="${F(454)}" font-family="Arial, sans-serif" font-size="${F(12)}" fill="#000">: ${escapeXml(jkPasien)}</text>

            <text x="${F(60)}" y="${F(476)}" font-family="Arial, sans-serif" font-size="${F(12)}" fill="#000">Alamat</text>
            <text x="${F(220)}" y="${F(476)}" font-family="Arial, sans-serif" font-size="${F(12)}" fill="#000">: ${escapeXml(alamatPasien)}</text>

            <text x="${F(40)}" y="${F(520)}" font-family="Arial, sans-serif" font-size="${F(12)}" fill="#000">Berdasarkan pemeriksaan, pasien tersebut di atas dinyatakan:</text>

            <rect x="${F(60)}" y="${F(535)}" width="${CANVAS_WIDTH - F(120)}" height="${F(50)}" fill="#f0f0f0" stroke="#000" stroke-width="${F(0.5)}" rx="${F(4)}"/>
            <text x="${CANVAS_WIDTH / 2}" y="${F(560)}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${F(14)}" font-weight="bold" fill="#000">SAKIT - ${escapeXml(diagnosaPasien.toUpperCase())}</text>
            <text x="${CANVAS_WIDTH / 2}" y="${F(577)}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${F(10)}" fill="#000">Perlu istirahat selama ${escapeXml(lamaIstirahat)} hari</text>

            <text x="${F(40)}" y="${F(625)}" font-family="Arial, sans-serif" font-size="${F(12)}" fill="#000">Terhitung mulai tanggal ${escapeXml(formatTanggal(tglMulai))} sampai dengan</text>
            <text x="${F(40)}" y="${F(647)}" font-family="Arial, sans-serif" font-size="${F(12)}" fill="#000">tanggal ${escapeXml(formatTanggal(tglSelesai))}.</text>

            <text x="${F(40)}" y="${F(685)}" font-family="Arial, sans-serif" font-size="${F(12)}" fill="#000">Demikian surat keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.</text>

            <text x="${CANVAS_WIDTH - F(180)}" y="${F(735)}" font-family="Arial, sans-serif" font-size="${F(12)}" fill="#000">${escapeXml(rsKota)}, ${escapeXml(formatTanggal(tanggalSurat))}</text>

            <text x="${CANVAS_WIDTH - F(180)}" y="${F(760)}" font-family="Arial, sans-serif" font-size="${F(12)}" fill="#000">${escapeXml(dokterSpesialis)},</text>

            <text x="${CANVAS_WIDTH - F(180)}" y="${F(860)}" font-family="Arial, sans-serif" font-size="${F(12)}" font-weight="bold" fill="#000" text-decoration="underline">${escapeXml(dokterName)}</text>
            <text x="${CANVAS_WIDTH - F(180)}" y="${F(880)}" font-family="Arial, sans-serif" font-size="${F(10)}" fill="#000">NIP. ${escapeXml(dokterNip)}</text>
        </svg>`

        const templatestruk = await loadImage(Buffer.from(svg))
        const canvasstruk = createCanvas(templatestruk.width, templatestruk.height)
        const ctxstruk = canvasstruk.getContext('2d')
        ctxstruk.imageSmoothingEnabled = true
        ctxstruk.imageSmoothingQuality = 'high'
        ctxstruk.drawImage(templatestruk, 0, 0)

        if (dokterTtd) {
            try {
                const ttdImg = await loadImage(dokterTtd)
                ctxstruk.drawImage(ttdImg, F(340), F(780), F(160), F(70))
            } catch (e) {
                console.error('Gagal load TTD:', e)
            }
        }

        const bufferstruk = await canvasstruk.encode('png')

        await satanic.sendMessage(m.chat, {
            image: bufferstruk,
            caption: `Surat Keterangan Sakit\n\nPasien: ${pasienName}\nDiagnosa: ${diagnosaPasien}\nIstirahat: ${lamaIstirahat} hari`
        }, { quoted: m })

        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

    } catch (err) {
        console.error('Error in suratsakit:', err)
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        reply('Terjadi kesalahan teknis saat memproses surat.')
    }
}
break
case 'undangannikah':
case 'fakeundangan': {
const { createCanvas, GlobalFonts } = require('@napi-rs/canvas')
const moment = require('moment-timezone')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const os = require('os')
const SCALE = 3
const BASE_WIDTH = 600
const CANVAS_WIDTH = BASE_WIDTH * SCALE
const S = (n) => Math.round(n * SCALE)
const tempDir = path.join(os.tmpdir(), 'fakeundangan-font')
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true })
const arabFontPath = path.join(tempDir, 'arabic.ttf')
const ARAB_FONT_URLS = [
'https://cdn.jsdelivr.net/gh/alif-type/amiri@master/Amiri-Regular.ttf',
'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/amiri/Amiri-Regular.ttf',
'https://github.com/alif-type/amiri/raw/master/Amiri-Regular.ttf'
]
let fontReady = false
const initFont = async () => {
if (fontReady) return
if (GlobalFonts.has('Amiri')) { fontReady = true; return }
if (fs.existsSync(arabFontPath)) {
try { GlobalFonts.registerFromPath(arabFontPath, 'Amiri'); if (GlobalFonts.has('Amiri')) { fontReady = true; return } } catch {}
}
for (const url of ARAB_FONT_URLS) {
try {
const res = await axios.get(url, { responseType: 'arraybuffer', timeout: 20000, headers: { 'User-Agent': 'Mozilla/5.0' } })
const buf = Buffer.from(res.data)
if (buf.length < 10000) continue
fs.writeFileSync(arabFontPath, buf)
try { GlobalFonts.registerFromPath(arabFontPath, 'Amiri') } catch { try { GlobalFonts.register(buf, 'Amiri') } catch {} }
if (GlobalFonts.has('Amiri')) { fontReady = true; return }
} catch {}
}
}
const THEMES = [
{ name: 'Putih Bersih', bg1: '#ffffff', bg2: '#fafafa', border: '#c9a961', borderLight: '#e0c060', borderStyle: 'double', star: '201, 169, 97', fontFamily: 'Georgia, "Times New Roman", serif', ornament: 'diamond' },
{ name: 'Putih Emas', bg1: '#ffffff', bg2: '#fdf8ec', border: '#b8860b', borderLight: '#e0b050', borderStyle: 'ornate', star: '184, 134, 11', fontFamily: '"Palatino Linotype", Palatino, Georgia, serif', ornament: 'star' },
{ name: 'Cream Klasik', bg1: '#fdf8ec', bg2: '#f5ead4', border: '#a0826d', borderLight: '#c9a961', borderStyle: 'double', star: '160, 130, 109', fontFamily: '"Book Antiqua", Palatino, Georgia, serif', ornament: 'diamond' },
{ name: 'Cream Lembut', bg1: '#faf5e8', bg2: '#f0e5c8', border: '#8b6914', borderLight: '#c9a961', borderStyle: 'simple', star: '139, 105, 20', fontFamily: 'Georgia, serif', ornament: 'dot' },
{ name: 'Putih Mutiara', bg1: '#fefefe', bg2: '#f2f2f5', border: '#8a8a95', borderLight: '#c0c0c8', borderStyle: 'double', star: '138, 138, 149', fontFamily: '"Cambria", Georgia, serif', ornament: 'diamond' },
{ name: 'Putih Rose', bg1: '#ffffff', bg2: '#fff0f3', border: '#c46a80', borderLight: '#e8a4b8', borderStyle: 'ornate', star: '196, 106, 128', fontFamily: '"Garamond", Georgia, serif', ornament: 'star' },
{ name: 'Putih Mint', bg1: '#ffffff', bg2: '#eaf7f0', border: '#3d8a68', borderLight: '#7bc4a3', borderStyle: 'double', star: '61, 138, 104', fontFamily: '"Trebuchet MS", Georgia, sans-serif', ornament: 'diamond' },
{ name: 'Putih Sky', bg1: '#ffffff', bg2: '#e8f2fb', border: '#4a7ab5', borderLight: '#8fb8e0', borderStyle: 'simple', star: '74, 122, 181', fontFamily: '"Cambria", Georgia, serif', ornament: 'dot' },
{ name: 'Cream Peach', bg1: '#fdf5ed', bg2: '#f5e0cc', border: '#c97755', borderLight: '#e8b088', borderStyle: 'ornate', star: '201, 119, 85', fontFamily: '"Palatino Linotype", Georgia, serif', ornament: 'star' },
{ name: 'Putih Lavender', bg1: '#ffffff', bg2: '#f2eef7', border: '#8a7ab5', borderLight: '#b8a8d8', borderStyle: 'double', star: '138, 122, 181', fontFamily: '"Garamond", Georgia, serif', ornament: 'diamond' }
]
const HARI_ID = { 0: 'Minggu', 1: 'Senin', 2: 'Selasa', 3: 'Rabu', 4: 'Kamis', 5: 'Jumat', 6: 'Sabtu' }
const BULAN_ID = { 'januari': 0, 'februari': 1, 'maret': 2, 'april': 3, 'mei': 4, 'juni': 5, 'juli': 6, 'agustus': 7, 'september': 8, 'oktober': 9, 'november': 10, 'desember': 11 }
const parseTanggalIndo = (str) => {
const lower = str.toLowerCase().trim()
const match = lower.match(/(\d{1,2})\s+([a-z]+)\s+(\d{4})/)
if (match && BULAN_ID[match[2]] !== undefined) return moment.tz({ year: parseInt(match[3]), month: BULAN_ID[match[2]], day: parseInt(match[1]) }, 'Asia/Jakarta')
const m = moment.tz(str, ['DD MMMM YYYY', 'DD MMM YYYY', 'YYYY-MM-DD', 'DD/MM/YYYY'], 'id', 'Asia/Jakarta')
return m.isValid() ? m : null
}
const isArabicText = (str) => /[\u0600-\u06FF]/.test(str)
try {
if (!text) {
const daftarTema = THEMES.map(t => `- ${t.name}`).join('\n')
return reply(
`*UNDANGAN PERNIKAHAN*\n\n` +
`*Format Wajib:*\n` +
`${prefix + command} pria|wanita|tanggal|jam|tempat|alamat\n\n` +
`*Format Lengkap (opsional):*\n` +
`${prefix + command} pria|wanita|tanggal|jam|tempat|alamat|ayahpria|ibupria|ayahwanita|ibuwanita|urutpria|urutwanita|tema|ayat|sumberayat\n\n` +
`*Keterangan:*\n` +
`1.  pria        → nama mempelai pria\n` +
`2.  wanita      → nama mempelai wanita\n` +
`3.  tanggal     → 25 Desember 2026 / 25-12-2026\n` +
`4.  jam         → 10:00 WIB / 14:30\n` +
`5.  tempat      → Masjid Al-Aqsa / Gedung\n` +
`6.  alamat      → alamat lengkap acara\n` +
`7.  ayahpria    → nama ayah pria\n` +
`8.  ibupria     → nama ibu pria\n` +
`9.  ayahwanita  → nama ayah wanita\n` +
`10. ibuwanita   → nama ibu wanita\n` +
`11. urutpria    → Putra pertama/kedua/ketiga\n` +
`12. urutwanita  → Putri pertama/kedua/ketiga\n` +
`13. tema        → pilih tema (opsional)\n` +
`14. ayat        → ayat/quote bawah\n` +
`15. sumberayat  → sumber ayat\n\n` +
`*Contoh Simpel:*\n` +
`${prefix + command} Fauzan|Alya|25 Desember 2026|10:00 WIB|Masjid Al-Aqsa|Jl. Merdeka No. 10\n\n` +
`*Contoh Lengkap:*\n` +
`${prefix + command} Fauzan|Alya|25 Desember 2026|10:00 WIB|Masjid Al-Aqsa|Jl. Merdeka No. 10|Bapak H. Ahmad|Ibu Hj. Siti|Bapak H. Mahmud|Ibu Hj. Aminah|Putra pertama|Putri kedua|Putih Emas|Dan di antara tanda-tanda kekuasaan-Nya|QS. Ar-Rum: 21\n\n` +
`*Daftar Tema (random otomatis):*\n${daftarTema}\n\n` +
`*Catatan:*\n` +
`- Parameter ke-7 sampai 15 opsional\n` +
`- Kalau gak diisi, otomatis pakai global\n` +
`- Tanggal format bebas (auto detect hari)\n` +
`- Ayat bisa Arab atau Latin\n` +
`- Tema random kalau gak dipilih`
)
}
await initFont()
const parts = text.split('|').map(v => v.trim())
if (parts.length < 6) return reply(`Format salah! Minimal 6 parameter.`)
const [
namaPria, namaWanita, tanggalAcara, waktuAcara, tempatAcara, alamatAcara,
inputAyahPria, inputIbuPria, inputAyahWanita, inputIbuWanita,
inputUrutPria, inputUrutWanita, inputIgPria, inputIgWanita, inputTema,
inputAyat, inputSumberAyat
] = parts
await satanic.sendMessage(m.chat, { react: { text: "🕕", key: m.key } })
const momentTgl = parseTanggalIndo(tanggalAcara)
let hariTanggal = tanggalAcara
if (momentTgl) {
const tglIndo = momentTgl.format('DD MMMM YYYY')
.replace(/January/, 'Januari').replace(/February/, 'Februari').replace(/March/, 'Maret')
.replace(/April/, 'April').replace(/May/, 'Mei').replace(/June/, 'Juni').replace(/July/, 'Juli')
.replace(/August/, 'Agustus').replace(/September/, 'September').replace(/October/, 'Oktober')
.replace(/November/, 'November').replace(/December/, 'Desember')
hariTanggal = `${HARI_ID[momentTgl.day()]}, ${tglIndo}`
}
const priaName = namaPria.toUpperCase()
const wanitaName = namaWanita.toUpperCase()
const priaAyah = inputAyahPria || global.ayahpria || 'Bapak H. Ahmad'
const priaIbu = inputIbuPria || global.ibupria || 'Ibu Hj. Siti'
const wanitaAyah = inputAyahWanita || global.ayahwanita || 'Bapak H. Mahmud'
const wanitaIbu = inputIbuWanita || global.ibuwanita || 'Ibu Hj. Aminah'
const priaAnak = inputUrutPria || global.urutpria || 'Putra pertama'
const wanitaAnak = inputUrutWanita || global.urutwanita || 'Putri kedua'
let priaIg = (inputIgPria || global.igpria || '').replace(/^@/, '')
let wanitaIg = (inputIgWanita || global.igwanita || '').replace(/^@/, '')
const judul = global.judulundangan || 'THE WEDDING OF'
const pembuka = global.pembukaundangan || 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ'
const quote = global.quoteundangan || 'Dan di antara tanda-tanda kekuasaan-Nya, Dia menciptakan untukmu pasangan dari jenismu sendiri, supaya kamu dapat ketenangan hati dan menjadikan kasih sayang di antara kamu.'
const quoteSumber = global.sumberquote || 'QS. Ar-Rum: 21'
const kalimat1 = global.kalimat1undangan || 'Dengan memohon rahmat dan ridho Allah SWT,'
const kalimat2 = global.kalimat2undangan || 'kami bermaksud menyelenggarakan pernikahan putra-putri kami:'
const acaraJudul = global.acaraundangan || 'AKAD NIKAH & RESEPSI'
const penutup = global.penutupundangan || 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.'
const salamPenutup = global.salamundangan || 'Wassalamualaikum Warahmatullahi Wabarakatuh'
const berbahagia = global.berbahagiaundangan || 'Kami yang berbahagia,'
const keluarga = global.keluargaundangan || 'Keluarga Besar Kedua Mempelai'
const ayat = inputAyat || global.ayatundangan || ''
const sumberAyat = inputSumberAyat || global.sumberayatundangan || ''
const namaTema = inputTema || global.temaundangan || null
let theme = namaTema ? THEMES.find(t => t.name.toLowerCase() === namaTema.toLowerCase()) : null
if (!theme) theme = THEMES[Math.floor(Math.random() * THEMES.length)]
const { bg1, bg2, border, borderLight, borderStyle, star, fontFamily, ornament } = theme
const TEXT_COLOR = global.textundangan || '#000000'
const TEXT_SOFT = global.textsoftundangan || '#222222'
const hasAmiri = GlobalFonts.has('Amiri')
const arabFontStack = hasAmiri ? `"Amiri", serif` : `"Noto Naskh Arabic", "Traditional Arabic", Arial, sans-serif`
const tempCanvas = createCanvas(10, 10)
const tempCtx = tempCanvas.getContext('2d')
const wrapTextHelper = (txt, maxWidth, fontStr) => {
tempCtx.font = fontStr
const words = txt.split(' ')
const lines = []
let line = ''
for (const word of words) {
const test = line + word + ' '
if (tempCtx.measureText(test).width > maxWidth && line) {
lines.push(line.trim())
line = word + ' '
} else {
line = test
}
}
if (line.trim()) lines.push(line.trim())
return lines
}
const quoteFont = `italic ${S(10)}px ${fontFamily}`
const quoteLines = quote ? wrapTextHelper(`"${quote}"`, CANVAS_WIDTH - S(220), quoteFont) : []
const penutupFont = `${S(9)}px ${fontFamily}`
const penutupLines = penutup ? wrapTextHelper(penutup, CANVAS_WIDTH - S(160), penutupFont) : []
const alamatFont = `italic ${S(9)}px ${fontFamily}`
const alamatLines = alamatAcara ? wrapTextHelper(alamatAcara, CANVAS_WIDTH - S(200), alamatFont) : []
const isAyatArab = isArabicText(ayat)
const ayatFont = isAyatArab ? `${S(22)}px ${arabFontStack}` : `italic ${S(10)}px ${fontFamily}`
const ayatLines = ayat ? wrapTextHelper(ayat, CANVAS_WIDTH - S(180), ayatFont) : []
const SPACING = {
top: 60, judul: 38, pembuka: 52, quote: 18, quoteSumber: 28,
ornament: 30, kalimat1: 18, kalimat2: 45, mempelai: 28,
ortu: 15, ig: 15, amp: 30, acaraJudul: 32, tanggal: 24,
waktu: 24, tempat: 20, alamat: 16, penutup: 16, salam: 32,
berbahagia: 18, keluarga: 35, namaPasangan: 35,
ayat: isAyatArab ? 34 : 18, ayatSumber: 15
}
let calcY = SPACING.top
calcY += SPACING.judul
if (pembuka) calcY += SPACING.pembuka
if (quoteLines.length) calcY += quoteLines.length * SPACING.quote + SPACING.quoteSumber
calcY += SPACING.ornament
calcY += SPACING.kalimat1 + SPACING.kalimat2
calcY += SPACING.mempelai + SPACING.ortu
if (priaIg) calcY += SPACING.ig
calcY += 15 + SPACING.amp + SPACING.mempelai + SPACING.ortu
if (wanitaIg) calcY += SPACING.ig
calcY += 15 + SPACING.ornament
calcY += SPACING.acaraJudul + SPACING.tanggal + SPACING.waktu + SPACING.tempat
calcY += alamatLines.length * SPACING.alamat
if (penutupLines.length) calcY += 18 + penutupLines.length * SPACING.penutup + 18
if (salamPenutup) calcY += SPACING.salam
calcY += SPACING.berbahagia + SPACING.keluarga
calcY += SPACING.namaPasangan
if (ayat) calcY += 25 + SPACING.ornament + ayatLines.length * SPACING.ayat
if (sumberAyat) calcY += SPACING.ayatSumber + 10
const BASE_HEIGHT = Math.max(900, Math.ceil(calcY / SCALE) + 80)
const CANVAS_HEIGHT = BASE_HEIGHT * SCALE
const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
const ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = true
ctx.imageSmoothingQuality = 'high'
const bgGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT)
bgGrad.addColorStop(0, bg1)
bgGrad.addColorStop(0.5, bg2)
bgGrad.addColorStop(1, bg1)
ctx.fillStyle = bgGrad
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
for (let i = 0; i < 50; i++) {
const x = Math.random() * CANVAS_WIDTH
const y = Math.random() * CANVAS_HEIGHT
const r = Math.random() * S(1.5) + S(0.5)
const alpha = Math.random() * 0.2 + 0.05
ctx.beginPath()
ctx.arc(x, y, r, 0, Math.PI * 2)
ctx.fillStyle = `rgba(${star}, ${alpha})`
ctx.fill()
}
const borderGrad = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
borderGrad.addColorStop(0, border)
borderGrad.addColorStop(0.5, borderLight)
borderGrad.addColorStop(1, border)
const drawBorder = () => {
if (borderStyle === 'double') {
ctx.strokeStyle = borderGrad
ctx.lineWidth = S(2.5)
ctx.strokeRect(S(20), S(20), CANVAS_WIDTH - S(40), CANVAS_HEIGHT - S(40))
ctx.lineWidth = S(0.8)
ctx.strokeStyle = border
ctx.strokeRect(S(30), S(30), CANVAS_WIDTH - S(60), CANVAS_HEIGHT - S(60))
} else if (borderStyle === 'ornate') {
ctx.strokeStyle = borderGrad
ctx.lineWidth = S(2)
ctx.strokeRect(S(20), S(20), CANVAS_WIDTH - S(40), CANVAS_HEIGHT - S(40))
ctx.lineWidth = S(0.6)
ctx.strokeStyle = border
ctx.globalAlpha = 0.6
ctx.strokeRect(S(35), S(35), CANVAS_WIDTH - S(70), CANVAS_HEIGHT - S(70))
ctx.globalAlpha = 1
ctx.lineWidth = S(0.4)
ctx.strokeStyle = borderLight
ctx.globalAlpha = 0.5
ctx.strokeRect(S(42), S(42), CANVAS_WIDTH - S(84), CANVAS_HEIGHT - S(84))
ctx.globalAlpha = 1
} else {
ctx.strokeStyle = borderGrad
ctx.lineWidth = S(1.5)
ctx.strokeRect(S(25), S(25), CANVAS_WIDTH - S(50), CANVAS_HEIGHT - S(50))
}
}
drawBorder()
const drawCorner = (x, y, rotate) => {
ctx.save()
ctx.translate(x, y)
ctx.rotate(rotate)
ctx.strokeStyle = borderGrad
ctx.lineWidth = S(1.8)
ctx.beginPath()
ctx.moveTo(0, S(35))
ctx.lineTo(0, 0)
ctx.lineTo(S(35), 0)
ctx.stroke()
ctx.beginPath()
ctx.arc(S(10), S(10), S(4), 0, Math.PI * 2)
ctx.fillStyle = border
ctx.fill()
ctx.beginPath()
ctx.arc(S(10), S(10), S(2), 0, Math.PI * 2)
ctx.fillStyle = borderLight
ctx.fill()
ctx.restore()
}
drawCorner(S(45), S(45), 0)
drawCorner(CANVAS_WIDTH - S(45), S(45), Math.PI / 2)
drawCorner(CANVAS_WIDTH - S(45), CANVAS_HEIGHT - S(45), Math.PI)
drawCorner(S(45), CANVAS_HEIGHT - S(45), -Math.PI / 2)
const centerX = CANVAS_WIDTH / 2
const drawText = (txt, y, size, color = TEXT_COLOR, weight = 'normal', style = 'normal', letterSpacing = 0) => {
ctx.font = `${style} ${weight} ${S(size)}px ${fontFamily}`
ctx.fillStyle = color
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'
if (letterSpacing > 0) {
const chars = txt.split('')
let totalWidth = 0
for (const c of chars) totalWidth += ctx.measureText(c).width + S(letterSpacing)
totalWidth -= S(letterSpacing)
let x = centerX - totalWidth / 2
ctx.textAlign = 'left'
for (const c of chars) {
ctx.fillText(c, x, S(y))
x += ctx.measureText(c).width + S(letterSpacing)
}
} else {
ctx.fillText(txt, centerX, S(y))
}
}
const drawOrnament = (y) => {
ctx.strokeStyle = border
ctx.globalAlpha = 0.7
ctx.lineWidth = S(0.8)
ctx.beginPath()
ctx.moveTo(S(140), S(y))
ctx.lineTo(centerX - S(55), S(y))
ctx.stroke()
ctx.beginPath()
ctx.moveTo(centerX + S(55), S(y))
ctx.lineTo(CANVAS_WIDTH - S(140), S(y))
ctx.stroke()
ctx.globalAlpha = 1
if (ornament === 'diamond') {
ctx.beginPath()
ctx.moveTo(centerX - S(35), S(y))
ctx.lineTo(centerX - S(10), S(y) - S(8))
ctx.lineTo(centerX, S(y))
ctx.lineTo(centerX + S(10), S(y) - S(8))
ctx.lineTo(centerX + S(35), S(y))
ctx.lineTo(centerX + S(10), S(y) + S(8))
ctx.lineTo(centerX, S(y))
ctx.lineTo(centerX - S(10), S(y) + S(8))
ctx.closePath()
ctx.fillStyle = border
ctx.fill()
} else if (ornament === 'star') {
ctx.beginPath()
for (let i = 0; i < 8; i++) {
const angle = (Math.PI / 4) * i - Math.PI / 2
const r = i % 2 === 0 ? S(15) : S(6)
const px = centerX + Math.cos(angle) * r
const py = S(y) + Math.sin(angle) * r
if (i === 0) ctx.moveTo(px, py)
else ctx.lineTo(px, py)
}
ctx.closePath()
ctx.fillStyle = border
ctx.fill()
ctx.beginPath()
ctx.arc(centerX, S(y), S(3), 0, Math.PI * 2)
ctx.fillStyle = borderLight
ctx.fill()
} else {
ctx.beginPath()
ctx.arc(centerX - S(15), S(y), S(4), 0, Math.PI * 2)
ctx.fillStyle = border
ctx.fill()
ctx.beginPath()
ctx.arc(centerX, S(y), S(6), 0, Math.PI * 2)
ctx.fillStyle = border
ctx.fill()
ctx.beginPath()
ctx.arc(centerX + S(15), S(y), S(4), 0, Math.PI * 2)
ctx.fillStyle = border
ctx.fill()
}
}
let y = SPACING.top
drawText(judul, y, 12, TEXT_COLOR, 'bold', 'normal', 4)
y += SPACING.judul
if (pembuka) {
if (isArabicText(pembuka)) {
ctx.save()
ctx.font = `${S(28)}px ${arabFontStack}`
ctx.fillStyle = TEXT_COLOR
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'
ctx.fillText(pembuka, centerX, S(y))
ctx.restore()
} else {
drawText(pembuka, y, 11, TEXT_COLOR, 'normal', 'italic')
}
y += SPACING.pembuka
}
if (quote) {
ctx.font = quoteFont
ctx.fillStyle = TEXT_SOFT
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'
for (const line of quoteLines) {
ctx.fillText(line, centerX, S(y))
y += SPACING.quote
}
if (quoteSumber) {
y += 8
drawText(`— ${quoteSumber} —`, y, 10, TEXT_SOFT, 'normal', 'italic')
y += SPACING.quoteSumber - 8
}
}
drawOrnament(y)
y += SPACING.ornament
drawText(kalimat1, y, 10, TEXT_COLOR)
y += SPACING.kalimat1
drawText(kalimat2, y, 10, TEXT_COLOR)
y += SPACING.kalimat2
drawText(priaName, y, 26, TEXT_COLOR, 'bold', 'normal', 2)
y += SPACING.mempelai
drawText(`${priaAnak} dari ${priaAyah} & ${priaIbu}`, y, 9, TEXT_SOFT, 'normal', 'italic')
y += SPACING.ortu
if (priaIg) {
drawText(`@${priaIg}`, y, 9, TEXT_SOFT)
y += SPACING.ig
}
y += 15
drawText('&', y, 28, TEXT_COLOR, 'normal', 'italic')
y += SPACING.amp
drawText(wanitaName, y, 26, TEXT_COLOR, 'bold', 'normal', 2)
y += SPACING.mempelai
drawText(`${wanitaAnak} dari ${wanitaAyah} & ${wanitaIbu}`, y, 9, TEXT_SOFT, 'normal', 'italic')
y += SPACING.ortu
if (wanitaIg) {
drawText(`@${wanitaIg}`, y, 9, TEXT_SOFT)
y += SPACING.ig
}
y += 15
drawOrnament(y)
y += SPACING.ornament
drawText(acaraJudul, y, 12, TEXT_COLOR, 'bold', 'normal', 2)
y += SPACING.acaraJudul
drawText(hariTanggal, y, 12, TEXT_COLOR, 'bold')
y += SPACING.tanggal
drawText(`Pukul ${waktuAcara}`, y, 11, TEXT_COLOR, 'bold')
y += SPACING.waktu
drawText(tempatAcara, y, 11, TEXT_COLOR, 'bold')
y += SPACING.tempat
ctx.font = alamatFont
ctx.fillStyle = TEXT_SOFT
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'
for (const line of alamatLines) {
ctx.fillText(line, centerX, S(y))
y += SPACING.alamat
}
y += 18
if (penutup) {
ctx.font = penutupFont
ctx.fillStyle = TEXT_SOFT
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'
for (const line of penutupLines) {
ctx.fillText(line, centerX, S(y))
y += SPACING.penutup
}
}
y += 18
if (salamPenutup) {
if (isArabicText(salamPenutup)) {
ctx.save()
ctx.font = `${S(20)}px ${arabFontStack}`
ctx.fillStyle = TEXT_COLOR
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'
ctx.fillText(salamPenutup, centerX, S(y))
ctx.restore()
} else {
drawText(salamPenutup, y, 9, TEXT_COLOR, 'normal', 'italic')
}
y += SPACING.salam
}
drawText(berbahagia, y, 10, TEXT_COLOR, 'bold')
y += SPACING.berbahagia
drawText(keluarga, y, 9, TEXT_SOFT)
y += SPACING.keluarga
drawText(`${priaName} & ${wanitaName}`, y, 12, TEXT_COLOR, 'bold', 'italic', 2)
y += SPACING.namaPasangan
if (ayat) {
drawOrnament(y)
y += 25
ctx.save()
ctx.globalAlpha = 0.3
ctx.font = `bold ${S(55)}px Georgia, serif`
ctx.fillStyle = TEXT_COLOR
ctx.textAlign = 'left'
ctx.textBaseline = 'top'
ctx.fillText('"', S(70), S(y - 25))
ctx.textAlign = 'right'
ctx.textBaseline = 'bottom'
const totalAyatHeight = (ayatLines.length - 1) * SPACING.ayat
ctx.fillText('"', CANVAS_WIDTH - S(70), S(y + totalAyatHeight + 15))
ctx.restore()
ctx.font = ayatFont
ctx.fillStyle = TEXT_COLOR
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'
for (const line of ayatLines) {
ctx.fillText(line, centerX, S(y))
y += SPACING.ayat
}
if (sumberAyat) {
y += 8
drawText(`— ${sumberAyat} —`, y, 10, TEXT_SOFT, 'normal', 'italic')
}
}
const bufferundangan = await canvas.encode('png')
await satanic.sendMessage(m.chat, {
image: bufferundangan,
caption: `Undangan Pernikahan\nTema: ${theme.name}\n\n${priaName} & ${wanitaName}\n${hariTanggal}\nPukul ${waktuAcara}\n${tempatAcara}`
}, { quoted: m })
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
} catch (err) {
console.error('Error in fakeundangan:', err)
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
reply(`Error: ${err.message}`)
}
}
break
case 'mvl': {
    const { createCanvas, loadImage } = require('@napi-rs/canvas')
    const axios = require('axios')
    const fs = require('fs')
    const path = require('path')
    const os = require('os')

    const tempDir = path.join(os.tmpdir(), 'mvl')
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true })

    const bgPath = path.join(tempDir, 'background.jpeg')

    const downloadFile = async (url, savePath) => {
        if (fs.existsSync(savePath)) return savePath
        const res = await axios.get(url, { responseType: 'arraybuffer', timeout: 30000 })
        fs.writeFileSync(savePath, Buffer.from(res.data))
        return savePath
    }

    try {
        if (!text) {
            return reply(`Harap masukkan namanya!\nContoh: ${prefix + command} Fauzan`)
        }

        await satanic.sendMessage(m.chat, { react: { text: "🕕", key: m.key } })

        await downloadFile("https://raw.githubusercontent.com/kayzzaoshi-code/Uploader/main/file_1772230577235.jpeg", bgPath)

        const bgmvl = await loadImage(bgPath)

        const canvasmvl = createCanvas(bgmvl.width, bgmvl.height)
        const ctxmvl = canvasmvl.getContext("2d")

        ctxmvl.drawImage(bgmvl, 0, 0, canvasmvl.width, canvasmvl.height)

        ctxmvl.font = "bold 32px sans-serif"
        ctxmvl.fillStyle = "#918A81"
        ctxmvl.textAlign = "center"
        ctxmvl.textBaseline = "middle"

        ctxmvl.fillText(text, 640, 530)

        const buffermvl = await canvasmvl.encode("png")

        await satanic.sendMessage(m.chat, {
            image: buffermvl,
            caption: `Ini dia sertifikat MVP kamu!`
        }, { quoted: m })

        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

    } catch (err) {
        console.error('Error in mvl:', err)
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        reply('Terjadi kesalahan teknis saat memproses gambar.')
    }
}
break
case 'fakedev2': {
    const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas')
    const axios = require('axios')
    const fs = require('fs')
    const path = require('path')
    const os = require('os')

    const tempDir = path.join(os.tmpdir(), 'fakedev2')
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true })

    const fontPath = path.join(tempDir, 'nunito.ttf')
    const bgPath = path.join(tempDir, 'background.jpeg')

    const downloadFile = async (url, savePath) => {
        if (fs.existsSync(savePath)) return savePath
        const res = await axios.get(url, { responseType: 'arraybuffer', timeout: 30000 })
        fs.writeFileSync(savePath, Buffer.from(res.data))
        return savePath
    }

    const drawCircularTextBottom = (context, str, cx, cy, rad) => {
        const fontSize = 85
        const arcSpan = Math.PI * 0.6
        const textRadius = rad + 75
        const chars = str.toUpperCase().split("")
        const n = chars.length
        const angleIncrement = n > 1 ? arcSpan / (n - 1) : 0
        const start = (Math.PI / 2) + (arcSpan / 2)

        context.font = `bold italic ${fontSize}px "Nunito"`
        context.fillStyle = "#ffffff"
        context.textAlign = "center"
        context.textBaseline = "middle"

        for (let i = 0; i < n; i++) {
            const char = chars[i]
            const angle = start - i * angleIncrement
            const x = cx + Math.cos(angle) * textRadius
            const y = cy + Math.sin(angle) * textRadius

            context.save()
            context.translate(x, y)
            context.rotate(angle - Math.PI / 2)
            context.lineWidth = 4
            context.strokeStyle = "rgba(0,0,0,0.5)"
            context.strokeText(char, 0, 0)
            context.fillText(char, 0, 0)
            context.restore()
        }
    }

    try {
        await downloadFile("https://files.catbox.moe/76wwjt.ttf", fontPath)
        await downloadFile("https://raw.githubusercontent.com/kayzzaoshi-code/Uploader/main/file_1772229788017.jpeg", bgPath)

        GlobalFonts.registerFromPath(fontPath, "Nunito")

        if (!text) {
            return reply(`Harap masukkan teksnya!\nContoh: ${prefix + command} Halo`)
        }

        const msgObjdv = m.quoted ? m.quoted : m
        const typedv = msgObjdv.mimetype || ''

        if (!/image/.test(typedv)) {
            return reply(`Harap kirim atau reply foto dengan perintah ${prefix + command} <teks>`)
        }

        await satanic.sendMessage(m.chat, { react: { text: "🕕", key: m.key } })

        const mediadv = await msgObjdv.download()
        if (!mediadv) throw new Error("Gagal membaca media")

        const userImgdv = await loadImage(mediadv)
        const backgrounddv = await loadImage(bgPath)

        const canvasdv = createCanvas(1024, 1024)
        const ctxdv = canvasdv.getContext("2d")

        ctxdv.drawImage(backgrounddv, 0, 0, 1024, 1024)

        const centerXdv = 518
        const centerYdv = 455
        const radiusdv = 235

        ctxdv.save()
        ctxdv.beginPath()
        ctxdv.arc(centerXdv, centerYdv, radiusdv, 0, Math.PI * 2, true)
        ctxdv.closePath()
        ctxdv.clip()

        const aspectdv = userImgdv.width / userImgdv.height
        let drawWidthdv, drawHeightdv, dxdv, dydv

        if (aspectdv > 1) {
            drawHeightdv = radiusdv * 2
            drawWidthdv = drawHeightdv * aspectdv
            dxdv = centerXdv - drawWidthdv / 2
            dydv = centerYdv - radiusdv
        } else {
            drawWidthdv = radiusdv * 2
            drawHeightdv = drawWidthdv / aspectdv
            dxdv = centerXdv - radiusdv
            dydv = centerYdv - drawHeightdv / 2
        }

        ctxdv.drawImage(userImgdv, dxdv, dydv, drawWidthdv, drawHeightdv)
        ctxdv.restore()

        drawCircularTextBottom(ctxdv, text.trim(), centerXdv, centerYdv, radiusdv)

        const bufferdv = await canvasdv.encode("png")

        await satanic.sendMessage(m.chat, {
            image: bufferdv,
            caption: `Fake Dev v2`
        }, { quoted: m })

        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

    } catch (err) {
        console.error('Error in fakedev2:', err)
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        reply('Terjadi kesalahan teknis saat memproses gambar.')
    }
}
break
case 'fakedev3': {
    const { createCanvas, loadImage } = require('@napi-rs/canvas')
    const axios = require('axios')
    const fs = require('fs')
    const path = require('path')
    const os = require('os')

    const tempDir = path.join(os.tmpdir(), 'fakedev3')
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true })

    const bgPath = path.join(tempDir, 'background.jpeg')
    const tickPath = path.join(tempDir, 'bluetick.jpeg')

    const downloadFile = async (url, savePath) => {
        if (fs.existsSync(savePath)) return savePath
        const res = await axios.get(url, { responseType: 'arraybuffer', timeout: 30000 })
        fs.writeFileSync(savePath, Buffer.from(res.data))
        return savePath
    }

    try {
        if (!text) {
            return reply(`Harap masukkan teksnya!\nContoh: ${prefix + command} Halo`)
        }

        const msgObjdv3 = m.quoted ? m.quoted : m
        const typedv3 = msgObjdv3.mimetype || ''

        if (!/image/.test(typedv3)) {
            return reply(`Harap kirim atau reply foto dengan perintah ${prefix + command} <teks>`)
        }

        await satanic.sendMessage(m.chat, { react: { text: "🕕", key: m.key } })

        await downloadFile("https://raw.githubusercontent.com/kayzzaoshi-code/Uploader/main/file_1772226320613.jpeg", bgPath)
        await downloadFile("https://raw.githubusercontent.com/kayzzaoshi-code/Uploader/main/file_1772220719294.jpeg", tickPath)

        const mediadv3 = await msgObjdv3.download()
        if (!mediadv3) throw new Error("Gagal membaca media")

        const userImagedv3 = await loadImage(mediadv3)
        const bgImgdv3 = await loadImage(bgPath)
        const tickImgdv3 = await loadImage(tickPath)

        const canvasdv3 = createCanvas(1080, 1080)
        const ctxdv3 = canvasdv3.getContext("2d")

        ctxdv3.drawImage(bgImgdv3, 0, 0, canvasdv3.width, canvasdv3.height)

        const centerXdv3 = canvasdv3.width / 2
        const centerYdv3 = canvasdv3.height / 2
        const radiusdv3 = 263

        ctxdv3.save()
        ctxdv3.beginPath()
        ctxdv3.arc(centerXdv3, centerYdv3, radiusdv3, 0, Math.PI * 2)
        ctxdv3.closePath()
        ctxdv3.clip()

        const minSidedv3 = Math.min(userImagedv3.width, userImagedv3.height)
        const cropXdv3 = (userImagedv3.width - minSidedv3) / 2
        const cropYdv3 = (userImagedv3.height - minSidedv3) / 2

        ctxdv3.drawImage(userImagedv3, cropXdv3, cropYdv3, minSidedv3, minSidedv3, centerXdv3 - radiusdv3, centerYdv3 - radiusdv3, radiusdv3 * 2, radiusdv3 * 2)
        ctxdv3.restore()

        ctxdv3.strokeStyle = "#000"
        ctxdv3.lineWidth = 6
        ctxdv3.beginPath()
        ctxdv3.arc(centerXdv3, centerYdv3, radiusdv3, 0, Math.PI * 2)
        ctxdv3.stroke()

        ctxdv3.save()
        ctxdv3.font = "bold 72px 'Segoe UI', 'Arial Black', Arial"
        ctxdv3.fillStyle = "#fff"
        ctxdv3.textAlign = "center"
        ctxdv3.textBaseline = "middle"

        const arcSpandv3 = Math.PI * 0.55
        const textRadiusdv3 = radiusdv3 + 75
        const charsdv3 = text.toUpperCase().split("")
        const ndv3 = charsdv3.length
        const angleIncrementdv3 = ndv3 > 1 ? arcSpandv3 / (ndv3 - 1) : 0
        const startdv3 = Math.PI / 2 + arcSpandv3 / 2

        for (let i = 0; i < ndv3; i++) {
            const angledv3 = startdv3 - i * angleIncrementdv3
            const xdv3 = centerXdv3 + Math.cos(angledv3) * textRadiusdv3
            const ydv3 = centerYdv3 + Math.sin(angledv3) * textRadiusdv3

            ctxdv3.save()
            ctxdv3.translate(xdv3, ydv3)
            ctxdv3.rotate(angledv3 - Math.PI / 2)
            ctxdv3.strokeStyle = "#000"
            ctxdv3.lineWidth = 3
            ctxdv3.strokeText(charsdv3[i], 0, 0)
            ctxdv3.fillText(charsdv3[i], 0, 0)
            ctxdv3.restore()
        }

        ctxdv3.restore()

        ctxdv3.drawImage(
            tickImgdv3,
            centerXdv3 + Math.cos(0) * (radiusdv3 + 60) - 35,
            centerYdv3 - 35,
            70,
            70
        )

        const bufferdv3 = await canvasdv3.encode("png")

        await satanic.sendMessage(m.chat, {
            image: bufferdv3,
            caption: `Fake Dev v3`
        }, { quoted: m })

        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

    } catch (err) {
        console.error('Error in fakedev3:', err)
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        reply('Terjadi kesalahan teknis saat memproses gambar.')
    }
}
break
case 'fakejuaraml': {
    const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas')
    const axios = require('axios')
    const fs = require('fs')
    const path = require('path')
    const os = require('os')

    const tempDir = path.join(os.tmpdir(), 'fakejuaraml')
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true })

    const fontPath = path.join(tempDir, 'times.ttf')
    const bgPath = path.join(tempDir, 'background.jpeg')

    const downloadFile = async (url, savePath) => {
        if (fs.existsSync(savePath)) return savePath
        const res = await axios.get(url, { responseType: 'arraybuffer', timeout: 30000 })
        fs.writeFileSync(savePath, Buffer.from(res.data))
        return savePath
    }

    try {
        await downloadFile("https://files.catbox.moe/8wqg77.ttf", fontPath)
        await downloadFile("https://raw.githubusercontent.com/kayzzaoshi-code/Uploader/main/file_1772230373362.jpeg", bgPath)

        GlobalFonts.registerFromPath(fontPath, "Times New Roman")

        if (!text) {
            return reply(`Harap masukkan namanya!\nContoh: ${prefix + command} Fauzan`)
        }

        if (text.length > 50) {
            return reply(`Nama terlalu panjang! Maksimal 50 huruf.`)
        }

        await satanic.sendMessage(m.chat, { react: { text: "🕕", key: m.key } })

        const bgjml = await loadImage(bgPath)

        const canvasjml = createCanvas(bgjml.width, bgjml.height)
        const ctxjml = canvasjml.getContext("2d")

        ctxjml.drawImage(bgjml, 0, 0, canvasjml.width, canvasjml.height)

        let fontSizejml = 45
        ctxjml.font = `bold italic ${fontSizejml}px "Times New Roman"`
        ctxjml.fillStyle = "#e6c85e"
        ctxjml.textAlign = "center"
        ctxjml.textBaseline = "middle"

        let maxTextWidthjml = 480
        while (ctxjml.measureText(text.toUpperCase()).width > maxTextWidthjml && fontSizejml > 10) {
            fontSizejml--
            ctxjml.font = `bold italic ${fontSizejml}px "Times New Roman"`
        }

        let certXjml = canvasjml.width * 0.665
        let certYjml = canvasjml.height * 0.555

        ctxjml.save()
        ctxjml.fillStyle = "#090909"
        ctxjml.fillRect(certXjml - 250, certYjml - 40, 500, 80)
        ctxjml.restore()

        ctxjml.fillText(text.toUpperCase(), certXjml, certYjml)

        const bufferjml = await canvasjml.encode("png")

        await satanic.sendMessage(m.chat, {
            image: bufferjml,
            caption: `Fake Juara ML`
        }, { quoted: m })

        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

    } catch (err) {
        console.error('Error in fakejuaraml:', err)
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        reply('Terjadi kesalahan teknis saat memproses gambar.')
    }
}
break
case 'fakedana':
if (!text) return reply('Masukkan teks!\n\nContoh: .fakedana 50000')
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
try {
const apiUrl = `https://free-restapi.biz.id/fakedana?text=${encodeURIComponent(text)}&apikey=${global.sakey}`
const response = await fetch(apiUrl)
if (!response.ok) throw new Error(`HTTP Error ${response.status}`)
const buffer = await response.arrayBuffer()
const imageBuffer = Buffer.from(buffer)
await satanic.sendMessage(m.chat, {
image: imageBuffer,
caption: `Done "${text}"`
}, { quoted: fkontak })
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
} catch (e) {
console.error('Error in fakedana case:', e)
reply('Error: ' + (e.message || 'Gagal membuat fakedana'))
}
break
case 'get': case 'fetch': {
  if (m.key.fromMe) return
  if (!text) return reply("https://example.com");
  try {
    const url = text.trim();
    if (!isUrl(url)) return reply("Link tidak valid.");

    await satanic.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });

    const res = await axios.get(url, {
      responseType: "arraybuffer",
      validateStatus: () => true
    });

    const headers = res.headers || {};
    const contentType = (headers["content-type"] || "").split(";")[0].toLowerCase();
    const contentDisp = headers["content-disposition"] || "";

    let filename = "download";
    try {
      const u = new URL(url);
      const last = decodeURIComponent(u.pathname.split("/").filter(Boolean).pop() || "");
      if (last) filename = last;
    } catch {}
    const cdMatch = contentDisp.match(/filename\*?=(?:UTF-8'')?"?([^";]+)/i);
    if (cdMatch) filename = decodeURIComponent(cdMatch[1].replace(/"/g, ""));
    if (!/\.[a-z0-9]{2,}$/i.test(filename) && contentType) {
      const ctExt = contentType.includes("/") ? contentType.split("/")[1] : "bin";
      const safeExt = (ctExt || "bin").replace(/[^a-z0-9]/gi, "");
      filename = `${filename}.${safeExt || "bin"}`;
    }

    const buf = Buffer.from(res.data);
    const fileSizeMB = buf.length / (1024 * 1024);

    const sendAs = async (kind, extra = {}) => {
      return satanic.sendMessage(
        m.chat,
        { [kind]: buf, mimetype: contentType || "application/octet-stream", fileName: filename, ...extra },
        { quoted: fkontak }
      );
    };

    if (contentType.startsWith("image/")) {
      await sendAs("image", { caption: filename });
    } else if (contentType.startsWith("video/")) {
      if (fileSizeMB > 100) {
        await sendAs("document");
      } else {
        await sendAs("video");
      }
    } else if (contentType.startsWith("audio/")) {
      await sendAs("audio");
    } else if (
      contentType === "application/octet-stream" ||
      (contentType.startsWith("application/") && !contentType.includes("json"))
    ) {
      await sendAs("document");
    } else if (
      contentType.startsWith("text/") ||
      contentType.includes("json") ||
      contentType === ""
    ) {
      let body;
      try {
        body = buf.toString("utf8");
      } catch {
        body = "(Tidak dapat mendekode konten teks)";
      }
      await reply(body);
    } else {
      await sendAs("document");
    }

    await satanic.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
  } catch (e) {
    console.error("GET error:", e);
    await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
  }
}
break;
case 'fakeovo':
if (!text) return reply('Masukkan teks!\n\nContoh: .fakeovo 50000')
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
try {
const apiUrl = `https://free-restapi.biz.id/fakeovo?saldo=${encodeURIComponent(text)}&apikey=${global.sakey}`
const response = await fetch(apiUrl)
if (!response.ok) throw new Error(`HTTP Error ${response.status}`)
const buffer = await response.arrayBuffer()
const imageBuffer = Buffer.from(buffer)
await satanic.sendMessage(m.chat, {
image: imageBuffer,
caption: `Done "${text}"`
}, { quoted: fkontak })
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
} catch (e) {
console.error('Error in fakeovo case:', e)
reply('Error: ' + (e.message || 'Gagal membuat fakeovo'))
}
break

case 'fakegopay':
if (!text) return reply('Masukkan teks!\n\nContoh: .fakegopay 50000')
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
try {
const apiUrl = `https://free-restapi.biz.id/fakegopay?saldo=${encodeURIComponent(text)}&apikey=${global.sakey}`
const response = await fetch(apiUrl)
if (!response.ok) throw new Error(`HTTP Error ${response.status}`)
const buffer = await response.arrayBuffer()
const imageBuffer = Buffer.from(buffer)
await satanic.sendMessage(m.chat, {
image: imageBuffer,
caption: `Done "${text}"`
}, { quoted: fkontak })
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
} catch (e) {
console.error('Error in fakegopay case:', e)
reply('Error: ' + (e.message || 'Gagal membuat fakegopay'))
}
break
case 'fakebangjago':
if (!text || !text.includes(',')) return reply(`Format salah! Contoh:\n${prefix + command} Ryuu, 1000000`)
await satanic.sendMessage(m.chat, { react: { text: "⏳", key: m.key } })
let skiacan
try {
skiacan = require('skia-canvas')
} catch (e) {
return reply('Module skia-canvas belum terinstall!\n\nKetik di panel:\nnpm install skia-canvas')
}
async function ensureFile(url, file) {
const dir = path.dirname(file)
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
if (!fs.existsSync(file)) {
const res = await axios.get(url, { responseType: 'arraybuffer' })
fs.writeFileSync(file, res.data)
}
}
async function generateImage(saldo, greet) {
const bgUrl = "https://raw.githubusercontent.com/uploader762/dat2/main/uploads/52e39f-1773064858080.jpg"
const fontUrl = "https://raw.githubusercontent.com/uploader762/dat2/main/uploads/49bbd8-1773045557233.otf"
const font2Url = "https://raw.githubusercontent.com/uploader762/dat1/main/uploads/203827-1773063086445.ttf"
const font1 = "./media/fonts/ceraroundpro-medium.otf"
const font2 = "./media/fonts/Roboto_Medium.ttf"
await ensureFile(fontUrl, font1)
await ensureFile(font2Url, font2)
FontLibrary.use("CustomFont", font1)
FontLibrary.use("GreetingFont", font2)
const bgRes = await axios.get(bgUrl, { responseType: 'arraybuffer' })
const bg = await loadImage(bgRes.data)
const canvas = new Canvas(bg.width, bg.height)
const ctx = canvas.getContext("2d")
ctx.drawImage(bg, 0, 0, bg.width, bg.height)
ctx.font = "125px CustomFont"
ctx.fillStyle = "black"
const numberWidth = ctx.measureText(saldo).width
const numberX = 2470 - numberWidth
ctx.fillText(saldo, numberX, 894)
const rpWidth = ctx.measureText("Rp").width
const rpX = numberX - rpWidth - 4
ctx.fillText("Rp", rpX, 894)
ctx.font = "93px GreetingFont"
ctx.fillStyle = "gray"
ctx.fillText(greet, 98, 86)
return await canvas.toBuffer("image/png")
}
try {
const args = text.split(',')
const nama = args[0].trim()
const saldoRaw = args[1].trim()
const saldo = Number(saldoRaw.replace(/[^0-9]/g, ''))
.toLocaleString('id-ID')
const moment = require('moment-timezone')
const h = parseInt(moment.tz('Asia/Jakarta').format('HH'))
let waktu = 'Malam'
if (h >= 4 && h < 11) waktu = 'Pagi'
else if (h >= 11 && h < 15) waktu = 'Siang'
else if (h >= 15 && h < 18) waktu = 'Sore'
const buffer = await generateImage(saldo, `Selamat ${waktu}, ${nama}`)
await satanic.sendMessage(m.chat, {
image: buffer,
caption: `Fake Saldo bank Jago Berhasil Dibuat!`
}, { quoted: fkontak })
await satanic.sendMessage(m.chat, { react: { text: "✅", key: m.key } })
} catch (err) {
console.error(err)
await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
reply('Gagal membuat gambar.')
}
break
case 'qc':
if (!text) return reply('teksnya')
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
try {
const senderJid = m.sender
const username = m.pushName || senderJid.split('@')[0]
const avatar = await satanic.profilePictureUrl(senderJid, "image")
.catch(() => 'https://8030.us.kg/file/P2LpaOHxWlJt.jpg')

const restqc = await axios({
method: 'GET',
url: 'https://free-restapi.biz.id/api/qc',
params: {
text: text,
name: username,
ppurl: avatar,
apikey: global.sakey
},
responseType: 'arraybuffer',
headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
'Accept': 'image/webp,image/*,*/*;q=0.8'
},
timeout: 15000
})

await satanic.sendImageAsSticker(m.chat, restqc.data, m, { packname: global.packname, author: global.author })
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
} catch (error) {
console.error(error)
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
reply('Error: ' + error.message)
}
break
case 'fakeff':
case 'lobyff':
case 'lobbyff':
if (!text || !text.includes('|')) {
return reply(`FREE FIRE LOBBY MAKER
Contoh:
${prefix + command} 1|Jagoan FF
${prefix + command} random|Jagoan FF

Pilihan template: 1 - 22 atau ketik random`)
}
let [numStr, name] = text.split('|').map(v => v.trim())
numStr = numStr.toLowerCase()
const imageUrls = {
1: 'https://cloud-fukushima.vercel.app/uploader/8fjhd6ftps.jpg',
2: 'https://cloud-fukushima.vercel.app/uploader/oz8hb4ow75.jpg',
3: 'https://cloud-fukushima.vercel.app/uploader/tvz1cie8df.jpg',
4: 'https://cloud-fukushima.vercel.app/uploader/yo9sg4vmo3.jpg',
5: 'https://i.ibb.co/twtSvQXv/image.jpg',
6: 'https://i.ibb.co/n80Bc1wV/image.jpg',
7: 'https://i.ibb.co/mCwmt019/image.jpg',
8: 'https://i.ibb.co/JwG60TwF/image.jpg',
9: 'https://i.ibb.co/zWNLw6bV/image.jpg',
10: 'https://i.ibb.co/d4DvnHw6/image.jpg',
11: 'https://i.ibb.co/hxMGbx9v/image.jpg',
12: 'https://i.ibb.co/jvd5xfvK/image.jpg',
13: 'https://i.ibb.co/KxTQ0r0x/image.jpg',
14: 'https://i.ibb.co/rRyxvrJW/image.jpg',
15: 'https://i.ibb.co/PG5jwG6S/image.jpg',
16: 'https://i.ibb.co/MDdH7kjG/image.jpg',
17: 'https://i.ibb.co/6cnHvL31/image.jpg',
18: 'https://i.ibb.co/dwg4CGdf/image.jpg',
19: 'https://i.ibb.co/pvx1PZyW/image.jpg',
20: 'https://i.ibb.co/kVkbxhwg/image.jpg',
21: 'https://i.ibb.co/rK8ZTPbt/image.jpg',
22: 'https://i.ibb.co/vC3p8NjP/image.jpg'
}
const max = Object.keys(imageUrls).length
let num
if (numStr === 'random') {
num = Math.floor(Math.random() * max) + 1
} else {
num = parseInt(numStr)
if (isNaN(num) || num < 1 || num > max) {
return reply(`Template tidak valid!\nPilih 1 - ${max} atau random`)
}
}
await satanic.sendMessage(m.chat, { react: { text: "⏳", key: m.key } })
try {
const imgUrl = imageUrls[num]
const temp = `./temp_${Date.now()}.jpg`
const out = `./out_${Date.now()}.jpg`
const font = './lib/AGENCYB.TTF'
if (!fs.existsSync(font)) {
await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
return reply('Font AGENCYB.TTF tidak ditemukan di folder /lib')
}
const response = await axios({
method: 'get',
url: imgUrl,
responseType: 'arraybuffer'
})
fs.writeFileSync(temp, Buffer.from(response.data))
let fontSize
if (name.length <= 6) fontSize = 'w*0.055'
else if (name.length <= 10) fontSize = 'w*0.045'
else if (name.length <= 15) fontSize = 'w*0.038'
else fontSize = 'w*0.030'
const safeText = name.replace(/'/g, "\\'")
const safeFont = font.replace(/\\/g, '/')
const cmd = `ffmpeg -i "${temp}" -vf "drawtext=fontfile='${safeFont}':text='${safeText}':x=(w-text_w)/2:y=h*0.80-(text_h/2):fontsize=${fontSize}:fontcolor=yellow:shadowcolor=black:shadowx=3:shadowy=3" "${out}"`
exec(cmd, async (err) => {
if (err) {
console.error(err)
if (fs.existsSync(temp)) fs.unlinkSync(temp)
await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
return reply('FFMPEG error! Pastikan sudah terinstall.')
}
await satanic.sendMessage(m.chat, {
image: fs.readFileSync(out),
caption: `FREE FIRE LOBBY

Name : ${name.toUpperCase()}
Template : ${num}`
}, { quoted: fkontak })
if (fs.existsSync(temp)) fs.unlinkSync(temp)
if (fs.existsSync(out)) fs.unlinkSync(out)
await satanic.sendMessage(m.chat, { react: { text: "✅", key: m.key } })
})
} catch (e) {
console.error(e)
await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
reply('Terjadi error saat proses gambar!')
}
break
case 'fakewafat':
await satanic.sendMessage(m.chat, { react: { text: '⚰️', key: m.key } })
try {
let fotoUrl = "https://telegra.ph/file/default.jpg"
if (/image/.test(mime)) {
let media = await quoted.download()
const form = new FormData()
form.append('files[]', media, { filename: 'image.jpg' })
const uploadRes = await axios.post('https://pone.rs/upload.php', form, {
headers: {
...form.getHeaders(),
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36',
'Referer': 'https://pone.rs/',
'Origin': 'https://pone.rs'
},
maxBodyLength: Infinity,
maxContentLength: Infinity
})
if (uploadRes.data?.success && uploadRes.data?.files?.[0]?.url) {
fotoUrl = uploadRes.data.files[0].url.replace(/\\\//g, '/')
}
}
let parts = text ? text.split("|").map(v => v.trim()) : []
const [nama = "", lahir = "", wafat = ""] = parts
if (!nama || !lahir || !wafat) {
return reply(`Format salah!\n\nGunakan format:\n${prefix + command} Nama|Tanggal Lahir|Tanggal Wafat\n\nContoh:\n${prefix + command} John Doe|01-01-1990|01-01-2024`)
}
const params = new URLSearchParams({
apikey: global.sakey,
fotourl: fotoUrl,
nama: nama,
lahir: lahir,
wafat: wafat
})
const response = await fetch(`https://free-restapi.biz.id/api/fakewafat?${params}`)
const buffer = Buffer.from(await response.arrayBuffer())
await satanic.sendMessage(m.chat, {
image: buffer,
caption: `Fake Wafat Berhasil Dibuat!\n\nNama: ${nama}\nLahir: ${lahir}\nWafat: ${wafat}`
}, { quoted: fkontak })
} catch (e) {
console.error('Error fakewafat:', e)
reply(`Error:\n${e.message}`)
}
break

case 'ttqc':
if (!text) return reply('Masukkan teks!\n\nContoh: .ttqc kamu bodoh')
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
try {
const username = m.pushName || 'User'
let avatar = global.thumbnail || ''
try {
const ppUser = await satanic.profilePictureUrl(m.sender, 'image').catch(() => null)
if (ppUser) avatar = ppUser
} catch (e) {}
const apiUrl = `https://free-restapi.biz.id/api/ttqc?text=${encodeURIComponent(text)}&username=${encodeURIComponent(username)}&avatar=${encodeURIComponent(avatar)}&apikey=${global.sakey}`
const response = await axios({
method: 'get',
url: apiUrl,
responseType: 'arraybuffer',
timeout: 30000
})
const imageBuffer = Buffer.from(response.data)
await satanic.sendMessage(m.chat, {
image: imageBuffer,
caption: `Done!\n"${text}"\n${username}`
}, { quoted: fkontak })
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
} catch (e) {
console.error('Error in ttqc:', e)
reply('Error: ' + (e.message || 'Terjadi kesalahan'))
}
break
case 'noteig':
if (!text) {
return reply(`NOTE IG MAKER\n\nContoh:\n${prefix + command} teks\n${prefix + command} username|teks\n${prefix + command} username|teks|timestamp\n${prefix + command} Halo - otomatis pake username & avatar\n\nFitur:\n- Instagram note style\n- Auto ambil avatar dari profile user\n- Auto ambil username dari user\n- Custom username & timestamp\n- Support emoji\n- Fallback ke global.thumbnail`);
}
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
let skia;
try {
skia = require('skia-canvas');
} catch {
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
return reply('Install dulu: npm install skia-canvas');
}
let noteText = text;
let timestamp = '1m';
let customUsername = null;
let usernamelokgg = m.pushName || 'User';
if (text && text.includes('|')) {
const parts = text.split('|');
customUsername = parts[0].trim();
noteText = parts[1]?.trim() || text;
if (parts[2]) timestamp = parts[2].trim();
if (customUsername) usernamelokgg = customUsername;
} else {
noteText = text;
usernamelokgg = m.pushName || 'User';
}
let avatarBuffer = null;
try {
const ppUrl = await satanic.profilePictureUrl(m.sender, 'image');
if (ppUrl) {
const response = await axios.get(ppUrl, {
responseType: 'arraybuffer',
headers: { 'User-Agent': 'Mozilla/5.0' }
});
avatarBuffer = Buffer.from(response.data);
}
} catch {
avatarBuffer = null;
}
if (!avatarBuffer) {
try {
const thumb = global.thumbnail || global.thumb || global.profilePic;
if (thumb) {
if (Buffer.isBuffer(thumb)) {
avatarBuffer = thumb;
} else if (typeof thumb === 'string' && thumb.startsWith('data:image')) {
const base64Data = thumb.split(',')[1] || thumb;
avatarBuffer = Buffer.from(base64Data, 'base64');
} else if (typeof thumb === 'string' && thumb.match(/^https?:\/\//)) {
const response = await axios.get(thumb, {
responseType: 'arraybuffer',
headers: { 'User-Agent': 'Mozilla/5.0' }
});
avatarBuffer = Buffer.from(response.data);
}
}
} catch {
avatarBuffer = null;
}
}
const ASSETS_DIR = path.join(process.cwd(), 'assets', 'noteig');
if (!fs.existsSync(ASSETS_DIR)) fs.mkdirSync(ASSETS_DIR, { recursive: true });
const BG_URL = 'https://raw.githubusercontent.com/kyyinfinite/kyyinfinite/main/uploads/1782724409764-6283815201912.jpg';
const BG_LOCAL = path.join(ASSETS_DIR, 'bg.jpg');
try {
if (!fs.existsSync(BG_LOCAL)) {
const res = await axios.get(BG_URL, { responseType: 'arraybuffer' });
fs.writeFileSync(BG_LOCAL, Buffer.from(res.data));
}
} catch {
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
return reply('Gagal download background!');
}
async function fetchAndLoadImage(url) {
const res = await axios.get(url, { responseType: 'arraybuffer' });
const buf = Buffer.from(res.data);
if (buf.length < 200) throw new Error(`Buffer terlalu kecil (${buf.length}b)`);
return await loadImage(buf);
}
function wrapText(ctx, text, maxWidth) {
const words = text.split(' ');
const lines = [];
let current = '';
for (const word of words) {
if (ctx.measureText(word).width > maxWidth) {
if (current) { lines.push(current); current = ''; }
let chunk = '';
for (const ch of word) {
if (ctx.measureText(chunk + ch).width > maxWidth) {
lines.push(chunk); chunk = ch;
} else { chunk += ch; }
}
if (chunk) current = chunk;
continue;
}
const test = current ? current + ' ' + word : word;
if (ctx.measureText(test).width > maxWidth && current) {
lines.push(current); current = word;
} else { current = test; }
}
if (current) lines.push(current);
return lines;
}
function drawCapsule(ctx, x, y, w, h) {
const r = Math.min(h / 2, w / 2);
ctx.beginPath();
ctx.moveTo(x + r, y);
ctx.lineTo(x + w - r, y);
ctx.arcTo(x + w, y, x + w, y + r, r);
ctx.lineTo(x + w, y + h - r);
ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
ctx.lineTo(x + r, y + h);
ctx.arcTo(x, y + h, x, y + h - r, r);
ctx.lineTo(x, y + r);
ctx.arcTo(x, y, x + r, y, r);
ctx.closePath();
}
try {
let bgImg;
let pfpImg;
if (BG_LOCAL.startsWith('http://') || BG_LOCAL.startsWith('https://')) {
bgImg = await fetchAndLoadImage(BG_LOCAL);
} else {
bgImg = await loadImage(BG_LOCAL);
}
if (avatarBuffer) {
pfpImg = await loadImage(avatarBuffer);
}
const W = bgImg.width;
const H = bgImg.height;
const fontFam = '"Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const canvas = new Canvas(W, H);
const ctx = canvas.getContext('2d');
ctx.drawImage(bgImg, 0, 0, W, H);
const CARD_TOP = H * 0.316;
const BAR_CENTER_Y = Math.round(H * 0.506);
const userFontSz = Math.round(W * 0.038);
const timeFontSz = Math.round(W * 0.030);
const noteMaxSz = Math.round(W * 0.048);
const noteMinSz = 12;
const noteMaxLines = 5;
const avR = Math.round(W * 0.060);
const zoneLeft = Math.round(W * 0.040);
const zoneRight = Math.round(W * 0.040);
const zoneW = W - zoneLeft - zoneRight;
const gapAvBubble = Math.round(W * 0.024);
const bubblePadX = Math.round(W * 0.040);
const bubblePadY = Math.round(H * 0.0125);
const bubbleMaxW = zoneW - avR * 2 - gapAvBubble;
const nameTopY = Math.round(CARD_TOP + H * 0.008);
const bubbleTopY = Math.round(nameTopY + userFontSz + H * 0.012);
let noteFontSz = noteMaxSz;
ctx.font = `400 ${noteFontSz}px ${fontFam}`;
let noteLines = wrapText(ctx, noteText, bubbleMaxW - bubblePadX * 2);
while (noteLines.length > noteMaxLines && noteFontSz > noteMinSz) {
noteFontSz -= 1;
ctx.font = `400 ${noteFontSz}px ${fontFam}`;
noteLines = wrapText(ctx, noteText, bubbleMaxW - bubblePadX * 2);
}
const lhMult = noteLines.length <= 1 ? 1.22 : noteLines.length <= 3 ? 1.30 : 1.22;
const noteLineH = Math.round(noteFontSz * lhMult);
const textBlockH = noteLines.length * noteLineH;
ctx.font = `400 ${noteFontSz}px ${fontFam}`;
let maxLineW = 0;
for (const l of noteLines) {
const lw = ctx.measureText(l).width;
if (lw > maxLineW) maxLineW = lw;
}
const bubbleW = Math.min(bubbleMaxW, Math.max(maxLineW + bubblePadX * 2, Math.round(W * 0.20)));
const bubbleH = textBlockH + bubblePadY * 2;
const totalGroupW = avR * 2 + gapAvBubble + bubbleW;
const startX = Math.round((W - totalGroupW) / 2);
const avCX = startX + avR;
const bubbleX = startX + avR * 2 + gapAvBubble;
const avCY = Math.round(bubbleTopY + bubbleH / 2);
ctx.textBaseline = 'bottom';
ctx.textAlign = 'left';
ctx.shadowColor = 'rgba(0,0,0,0.50)';
ctx.shadowBlur = 4;
ctx.shadowOffsetY = 1;
ctx.font = `600 ${userFontSz}px ${fontFam}`;
const unameW = ctx.measureText(usernamelokgg).width;
const nameX = startX + (totalGroupW - unameW) / 2;
ctx.fillStyle = '#ffffff';
ctx.fillText(usernamelokgg, nameX, nameTopY + userFontSz);
ctx.font = `400 ${timeFontSz}px ${fontFam}`;
ctx.fillStyle = 'rgba(255,255,255,0.50)';
const dot = ' . ';
const dotW = ctx.measureText(dot).width;
const tsW = ctx.measureText(timestamp).width;
const tsOffY = Math.round((userFontSz - timeFontSz) / 2);
ctx.fillText(dot, nameX + unameW, nameTopY + userFontSz - tsOffY);
ctx.fillText(timestamp, nameX + unameW + dotW, nameTopY + userFontSz - tsOffY);
ctx.shadowColor = 'transparent';
ctx.shadowBlur = 0;
ctx.shadowOffsetY = 0;
ctx.fillStyle = 'rgba(58,58,58,0.97)';
drawCapsule(ctx, bubbleX, bubbleTopY, bubbleW, bubbleH);
ctx.fill();
ctx.strokeStyle = 'rgba(255,255,255,0.10)';
ctx.lineWidth = 1.5;
drawCapsule(ctx, bubbleX, bubbleTopY, bubbleW, bubbleH);
ctx.stroke();
ctx.font = `400 ${noteFontSz}px ${fontFam}`;
ctx.fillStyle = '#ffffff';
ctx.textAlign = 'left';
ctx.textBaseline = 'top';
noteLines.forEach((line, i) => {
const lineY = bubbleTopY + bubblePadY + i * noteLineH;
ctx.fillText(line, bubbleX + bubblePadX, lineY);
});
ctx.save();
ctx.beginPath();
ctx.arc(avCX, avCY, avR, 0, Math.PI * 2);
ctx.clip();
if (pfpImg) {
const scale = Math.max((avR * 2) / pfpImg.width, (avR * 2) / pfpImg.height);
const pw = pfpImg.width * scale;
const ph = pfpImg.height * scale;
ctx.drawImage(pfpImg, avCX - pw / 2, avCY - ph / 2, pw, ph);
} else {
ctx.fillStyle = '#3a3a3a';
ctx.fillRect(avCX - avR, avCY - avR, avR * 2, avR * 2);
ctx.fillStyle = 'rgba(255,255,255,0.22)';
ctx.beginPath();
ctx.arc(avCX, avCY - avR * 0.15, avR * 0.38, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.arc(avCX, avCY + avR * 0.52, avR * 0.60, 0, Math.PI * 2);
ctx.fill();
}
ctx.restore();
const cursorX = Math.round(W * 0.058);
const cursorH = Math.round(H * 0.030);
const cursorY = Math.round(BAR_CENTER_Y - cursorH / 2);
ctx.fillStyle = '#4A9EF5';
ctx.fillRect(cursorX, cursorY, 2, cursorH);
const msgFontSz = Math.round(W * 0.036);
const msgX = cursorX + 6;
const msgMaxW = W * 0.55;
ctx.font = `400 ${msgFontSz}px ${fontFam}`;
ctx.fillStyle = 'rgba(255,255,255,0.33)';
ctx.textAlign = 'left';
ctx.textBaseline = 'middle';
let msgText = `Message ${usernamelokgg}`;
while (ctx.measureText(msgText).width > msgMaxW && msgText.length > 12) {
msgText = msgText.slice(0, -4) + '...';
}
ctx.fillText(msgText, msgX, BAR_CENTER_Y);
ctx.shadowColor = 'transparent';
ctx.shadowBlur = 0;
const buffer = await canvas.png;
let caption = `NOTE IG MAKER\n\n`;
caption += `Username  : ${usernamelokgg}\n`;
caption += `Teks      : ${noteText}\n`;
caption += `Timestamp : ${timestamp}\n`;
caption += `Avatar    : ${avatarBuffer ? 'Profile' : 'Default'}`;
await satanic.sendMessage(m.chat, { image: buffer, caption: caption }, { quoted: m });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (e) {
console.error(e);
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
reply(`Error:\n${e.message}`);
}
break;
case 'ttqc2':
if (!text) return reply('Masukkan teks!\n\nContoh: .ttqc2 kamu bodoh');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const usernametti = m.pushName || 'User';
let avatar = global.thumbnail || '';
let url = global.thumbnail || '';
if (/image/.test(mime)) {
try {
let media = await quoted.download();
const form = new FormData();
form.append('files[]', media, { filename: 'image.jpg' });
const uploadRes = await axios.post('https://pone.rs/upload.php', form, {
headers: {
...form.getHeaders(),
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36',
'Referer': 'https://pone.rs/',
'Origin': 'https://pone.rs'
},
maxBodyLength: Infinity,
maxContentLength: Infinity
});
if (uploadRes.data?.success && uploadRes.data?.files?.[0]?.url) {
url = uploadRes.data.files[0].url.replace(/\\\//g, '/');
}
} catch (e) {
console.log('Gagal upload gambar:', e);
}
} else {
try {
const ppUser = await satanic.profilePictureUrl(m.sender, 'image').catch(() => null);
if (ppUser) avatar = ppUser;
} catch (e) {}
}
const apiUrl = `https://free-restapi.biz.id/api/ttqc2?text=${encodeURIComponent(text)}&username=${encodeURIComponent(username)}&avatar=${encodeURIComponent(avatar)}&url=${encodeURIComponent(url)}&apikey=${global.sakey}`;
const response = await axios({
method: 'get',
url: apiUrl,
responseType: 'arraybuffer',
timeout: 30000
});
const imageBuffer = Buffer.from(response.data);
let captionTtqc = `Done!\n"${text}"\n${username}`;
await satanic.sendMessage(m.chat, { image: imageBuffer, caption: captionTtqc }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (e) {
console.error('Error in ttqc2:', e);
reply('Error: ' + (e.message || 'Terjadi kesalahan'));
}
break;





////////////////// GARIS AWAL MENU SEARCH //////////
case 'pin':
case 'pinterest': {
async function getCookies() {
try {
const response = await axios.get('https://www.pinterest.com/csrf_error/');
const setCookieHeaders = response.headers['set-cookie'];
if (setCookieHeaders) {
const cookies = setCookieHeaders.map(cookieString => {
const cookieParts = cookieString.split(';');
const cookieKeyValue = cookieParts[0].trim();
return cookieKeyValue;
});
return cookies.join('; ');
} else {
console.warn('No set-cookie headers found in the response.');
return null;
}
} catch (error) {
console.error('Error fetching cookies:', error);
return null;
}
}
async function pinterest(query) {
try {
const cookies = await getCookies();
if (!cookies) {
console.log('Failed to retrieve cookies. Exiting.');
return;
}
const url = 'https://www.pinterest.com/resource/BaseSearchResource/get/';
const params = {
source_url: `/search/pins/?q=${query}`,
data: JSON.stringify({
"options": {
"isPrefetch": false,
"query": query,
"scope": "pins",
"no_fetch_context_on_resource": false
},
"context": {}
}),
_: Date.now()
};
const headers = {
'accept': 'application/json, text/javascript, */*, q=0.01',
'accept-encoding': 'gzip, deflate',
'accept-language': 'en-US,en;q=0.9',
'cookie': cookies,
'dnt': '1',
'referer': 'https://www.pinterest.com/',
'sec-ch-ua': '"Not(A:Brand";v="99", "Microsoft Edge";v="133", "Chromium";v="133"',
'sec-ch-ua-full-version-list': '"Not(A:Brand";v="99.0.0.0", "Microsoft Edge";v="133.0.3065.92", "Chromium";v="133.0.6943.142"',
'sec-ch-ua-mobile': '?0',
'sec-ch-ua-model': '""',
'sec-ch-ua-platform': '"Windows"',
'sec-ch-ua-platform-version': '"10.0.0"',
'sec-fetch-dest': 'empty',
'sec-fetch-mode': 'cors',
'sec-fetch-site': 'same-origin',
'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0',
'x-app-version': 'c056fb7',
'x-pinterest-appstate': 'active',
'x-pinterest-pws-handler': 'www/[username]/[slug].js',
'x-pinterest-source-url': '/hargr003/cat-pictures/',
'x-requested-with': 'XMLHttpRequest'
};
const { data } = await axios.get(url, {
headers: headers,
params: params
});
const container = [];
const results = data.resource_response.data.results.filter((v) => v.images?.orig);
results.forEach((result) => {
container.push({
upload_by: result.pinner.username,
fullname: result.pinner.full_name,
followers: result.pinner.follower_count,
caption: result.grid_title,
image: result.images.orig.url,
source: "https://id.pinterest.com/pin/" + result.id,
});
});
return container;
} catch (error) {
console.log(error);
return [];
}
}
if (!text) return reply(`Format salah, contoh: \n${prefix + command} Anime`);
await satanic.sendMessage(m.chat, {
react: {
text: '⏳',
key: m.key
}
});
let anutrest = await pinterest(text);
if (!anutrest || anutrest.length === 0) return reply("Error, Foto Tidak Ditemukan");
let selectedImages = anutrest.slice(0, 10);
for (let i = 0; i < selectedImages.length; i++) {
const img = selectedImages[i];
await satanic.sendMessage(m.chat, {
image: { url: img.image }
});
await new Promise(resolve => setTimeout(resolve, 500));
}
await satanic.sendMessage(m.chat, {
react: {
text: '✅',
key: m.key
}
});
}
break;
case 'xnxxsearch':
if (!isPrem) return reply('you are not premium');
if (!text) return reply('Enter Query');
const apiUrlxnxx = `https://free-restapi.biz.id/api/xnxxsearch?query=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const resxnx = await axios.get(apiUrlxnxx);
const resultsXnxx = resxnx.data?.result?.result;
if (!resultsXnxx || !Array.isArray(resultsXnxx) || resultsXnxx.length === 0) {
return reply(`No results found for: ${text}`);
}
let ffxnx = resultsXnxx.map((v, i) =>
`${i + 1}. Title : ${v.title}\n   Link  : ${v.link}\n   Info  : ${v.info.trim()}`
).join('\n\n');
reply(ffxnx);
break;
case 'xvideosearch':
if (!isPrem) return reply('you are not premium');
if (!text) return reply('Enter Query');
const apiUrlxvideos = `https://free-restapi.biz.id/api/xvideosearch?query=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const resxvids = await axios.get(apiUrlxvideos);
const resultsXvid = resxvids.data?.result;
if (!resultsXvid || !Array.isArray(resultsXvid) || resultsXvid.length === 0) {
return reply(`No results found for: ${text}`);
}
let ffxvids = resultsXvid.map((v, i) =>
`${i + 1}. Title    : ${v.title}\n   Duration : ${v.duration}\n   Link     : ${v.url}\n   Quality  : ${v.quality || '-'}`
).join('\n\n');
reply(ffxvids);
break;
case 'xnxxdl':
if (!isPrem) return reply('you are not premium');
if (!text) return reply('Enter URL');
const apiUrldlXnxx = `https://free-restapi.biz.id/api/xnxxdl?url=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const resdlXnxx = await axios.get(apiUrldlXnxx);
const dataXnxx = resdlXnxx.data?.result?.result;
if (!dataXnxx) {
return reply('Failed to get download link');
}
const videoUrlXnxx = dataXnxx.files?.high || dataXnxx.files?.low || dataXnxx.files?.HLS;
if (!videoUrlXnxx) {
return reply('No video URL found');
}
let msgXnxx = `Title    : ${dataXnxx.title}\n`;
msgXnxx += `Duration : ${Math.floor(dataXnxx.duration / 60)}min ${dataXnxx.duration % 60}detik\n`;
msgXnxx += `Info     : ${(dataXnxx.info || '').trim()}\n\n`;
msgXnxx += `Download Links:\n`;
msgXnxx += `Low (240p)  : ${dataXnxx.files?.low || '-'}\n`;
msgXnxx += `High (360p) : ${dataXnxx.files?.high || '-'}\n`;
msgXnxx += `HLS         : ${dataXnxx.files?.HLS || '-'}`;
await satanic.sendMessage(m.chat, { video: { url: videoUrlXnxx }, caption: msgXnxx }, { quoted: fkontak });
break;
case 'xvideodl':
if (!isPrem) return reply('you are not premium');
if (!text) return reply('Enter URL');
const apiUrldlXvid = `https://free-restapi.biz.id/api/xvideodl?url=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const resdlXvid = await axios.get(apiUrldlXvid);
const dataXvid = resdlXvid.data?.result?.result;
if (!dataXvid) {
return reply('Failed to get download link');
}
let msgXvid = `Title : ${dataXvid.title}\n`;
msgXvid += `Tags  : ${dataXvid.keyword}`;
await satanic.sendMessage(m.chat, { video: { url: dataXvid.url }, caption: msgXvid }, { quoted: fkontak });
break;
case "bingimage":
case "bingimg": {
if (!text) return reply(`❌ *Cara penggunaan:* ${prefix + command} kata kunci\nContoh: ${prefix + command} kucing lucu`);
await satanic.sendMessage(m.chat, {
react: {
text: '⏳',
key: m.key
}
});
try {
const query = text.trim();
const limit = 10;
const headers = {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
};
const q = query.split(/\s+/).join('+');
const url = `https://www.bing.com/images/search?q=${q}&FORM=HDRSC2`;
const res = await axios.get(url, { headers });
const $ = cheerio.load(res.data);
let images = [];
$('a.iusc').each((i, el) => {
if (i >= limit) return false;
try {
const mRaw = $(el).attr('m') || '{}';
const madRaw = $(el).attr('mad') || '{}';
const m = JSON.parse(mRaw);
const mad = JSON.parse(madRaw);
const original_url = m?.murl;
const preview_url = mad?.turl;
const title = m?.t || 'Gambar';
if (!original_url) return;
images.push({
title: title,
preview_url: preview_url || original_url,
original_url: original_url,
source: original_url
});
} catch (e) {}
});
if (images.length === 0) {
return reply(`❌ Tidak ditemukan gambar untuk *${query}*`);
}
let selectedImages = images.slice(0, 10);
for (let i = 0; i < selectedImages.length; i++) {
const img = selectedImages[i];
await satanic.sendMessage(m.chat, {
image: { url: img.original_url }
});
await new Promise(resolve => setTimeout(resolve, 500));
}
await satanic.sendMessage(m.chat, {
react: {
text: '✅',
key: m.key
}
});
} catch (error) {
console.error("Error BingImage:", error);
reply(`❌ Gagal mengambil gambar: ${error.message}`);
}
}
break;
case 'applemusic':
case 'applemusicsearch':
case 'amsearch': {
if (!text) return reply(`Contoh: ${prefix}applemusicsearch dhyo haw`);
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/applemusic?query=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (response.data.status !== 200 || !response.data.result.data.results || response.data.result.data.results.length === 0) {
return reply('Lagu tidak ditemukan.');
}
const tracks = response.data.result.data.results.slice(0, 10);
global.appleMusicSearchResults = {};
let resultText = `*🎵 HASIL PENCARIAN APPLE MUSIC*\n\n`;
resultText += `🔍 Query: *${text}*\n`;
resultText += `📊 Ditemukan: *${tracks.length}* lagu\n\n`;
resultText += `━━━━━━━━━━━━━━━━━━━━\n\n`;
tracks.forEach((item, i) => {
const index = (i + 1).toString();
global.appleMusicSearchResults[index] = {
title: item.title,
artist: item.artist,
songLink: item.songLink,
albumName: item.albumName
};
resultText += `*${i + 1}. ${item.title}*\n`;
resultText += `👤 Artist: ${item.artist}\n`;
resultText += `💿 Album: ${item.albumName}\n`;
resultText += `🔗 Link: ${item.songLink}\n`;
resultText += `📥 Ketik .amdl ${index} untuk download\n\n`;
resultText += `──────────────────\n\n`;
});
resultText += `━━━━━━━━━━━━━━━━━━━━\n`;
resultText += `💡 Cara download: ketik .amdl [nomor]`;
await reply(resultText);
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat mencari lagu.');
}
}
break;
case 'ytsearch':
case 'youtube': {
if (!text) return reply(`Contoh: ${prefix}ytsearch anime`);
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const search = require('yt-search');
const results = await search(text);
const videos = results.videos.slice(0, 10);
if (!videos || videos.length === 0) {
return reply('Video tidak ditemukan.');
}
let resultText = `*🎬 HASIL PENCARIAN YOUTUBE*\n\n`;
resultText += `🔍 Query: *${text}*\n`;
resultText += `📊 Ditemukan: *${videos.length}* video\n\n`;
resultText += `━━━━━━━━━━━━━━━━━━━━\n\n`;
videos.forEach((item, i) => {
resultText += `*${i + 1}. ${item.title}*\n`;
resultText += `🕐 Durasi: ${item.timestamp}\n`;
resultText += `👤 Channel: ${item.author.name}\n`;
resultText += `👁️ Views: ${item.views.toLocaleString()}\n`;
resultText += `🔗 Link: ${item.url}\n\n`;
resultText += `──────────────────\n\n`;
});
resultText += `━━━━━━━━━━━━━━━━━━━━\n`;
resultText += `💡 Untuk mendownload, gunakan perintah:\n`;
resultText += `• .ytdl [link] - Download audio\n`;
resultText += `• .ytvd [link] - Download video`;
await reply(resultText);
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat mencari video.');
}
}
break;

case 'npmsearch':
case 'npmsearch': {
if (!text) return reply(`Contoh: ${prefix}npmsearch axios`);
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(text)}&size=20`;
const response = await axios.get(apiUrl);
if (!response.data || !response.data.objects || response.data.objects.length === 0) {
return reply('Package NPM tidak ditemukan.');
}
let info = `📦 *NPM SEARCH RESULTS*\n\n`;
info += `🔍 *Keyword:* ${text}\n`;
info += `📊 *Total Found:* ${response.data.total || response.data.objects.length}\n`;
info += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
for (let i = 0; i < response.data.objects.length; i++) {
const pkg = response.data.objects[i].package;
const score = response.data.objects[i].score;
info += `*${i+1}. ${pkg.name}*\n`;
info += `📝 *Description:* ${pkg.description || '-'}\n`;
info += `🔖 *Latest Version:* ${pkg.version}\n`;
info += `📅 *Published:* ${pkg.date ? new Date(pkg.date).toLocaleDateString('id-ID') + ' ' + new Date(pkg.date).toLocaleTimeString('id-ID') : '-'}\n`;
info += `🔗 *NPM Link:* https://www.npmjs.com/package/${pkg.name}\n`;
if (pkg.publisher && pkg.publisher.username) {
info += `👤 *Publisher:* ${pkg.publisher.username}\n`;
}
if (pkg.keywords && pkg.keywords.length > 0) {
info += `🏷️ *Keywords:* ${pkg.keywords.join(', ')}\n`;
}
if (score && score.final) {
info += `⭐ *Score:* ${(score.final * 100).toFixed(1)}%\n`;
}
info += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
}
info += `📥 *Project By:* ${namaBot}`;
await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat mencari package NPM.');
}
}
break;
case 'ttsearch':
case 'tiktoksearch': {
if (!text) return reply(`Contoh: ${prefix}ttsearch Furina`);
await satanic.sendMessage(m.chat, {
react: {
text: '⏳',
key: m.key
}
});
try {
const { TikTokSearch } = require('./lib/tiktoksearch');
const result = await TikTokSearch.search(text);
if (!result.success || !result.payload || result.payload.length === 0) {
return reply('Video tidak ditemukan.');
}
const videos = result.payload.slice(0, 10);
for (let i = 0; i < videos.length; i++) {
const item = videos[i];
const videoUrl = item.media.no_watermark || item.media.watermark;
if (!videoUrl) continue;
await satanic.sendMessage(m.chat, {
video: { url: videoUrl },
mimetype: 'video/mp4'
});
await new Promise(resolve => setTimeout(resolve, 1000));
}
await satanic.sendMessage(m.chat, {
react: {
text: '✅',
key: m.key
}
});
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat mengambil video.');
}
}
break;
case 'spotifysearch':
case 'spsearch': {
if (!text) return reply(`Contoh: ${prefix}spotifysearch dhyo haw`);
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/spotifysearch?query=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (response.data.status !== 200 || !response.data.result.tracks || response.data.result.tracks.length === 0) {
return reply('Lagu tidak ditemukan.');
}
const tracks = response.data.result.tracks.slice(0, 10);
global.spotifySearchResults = {};
let resultText = `*🎵 HASIL PENCARIAN SPOTIFY*\n\n`;
resultText += `🔍 Query: *${text}*\n`;
resultText += `📊 Ditemukan: *${tracks.length}* lagu\n\n`;
resultText += `━━━━━━━━━━━━━━━━━━━━\n\n`;
tracks.forEach((item, i) => {
const index = (i + 1).toString();
global.spotifySearchResults[index] = {
name: item.name,
url: item.url,
artist: item.artists.map(a => a.name).join(', ')
};
const durationSec = Math.floor(item.duration_ms / 1000);
const minutes = Math.floor(durationSec / 60);
const seconds = durationSec % 60;
resultText += `*${i + 1}. ${item.name}*\n`;
resultText += `👤 Artist: ${item.artists.map(a => a.name).join(', ')}\n`;
resultText += `⏱️ Durasi: ${minutes}:${seconds.toString().padStart(2, '0')}\n`;
resultText += `💿 Album: ${item.album.name}\n`;
resultText += `🔗 Link: ${item.url}\n`;
resultText += `📥 Ketik .spotifyget ${index} untuk download\n\n`;
resultText += `──────────────────\n\n`;
});
resultText += `━━━━━━━━━━━━━━━━━━━━\n`;
resultText += `💡 Cara download: ketik .spotifyget [nomor]`;
await reply(resultText);
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat mencari lagu.');
}
}
break;

case 'spotifyget':
case 'spget': {
if (!text) return reply('Masukkan URL Spotify atau angka dari hasil pencarian!\n\nContoh: .spotifyget 1');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
if (!isNaN(text) && global.spotifySearchResults && global.spotifySearchResults[text]) {
const selectedTrack = global.spotifySearchResults[text];
const apiUrl = `https://free-restapi.biz.id/api/spotifydl?url=${encodeURIComponent(selectedTrack.url)}&apikey=${global.sakey}`;
const { data } = await axios.get(apiUrl)
if (!data.status || !data.download_url) {
return reply('Gagal mendapatkan link download.')
}
const proxyUrl = `https://cloudflare-cors-anywhere.supershadowcube.workers.dev/?url=${encodeURIComponent(data.download_url)}`
const audioResponse = await axios.get(proxyUrl, {
responseType: 'arraybuffer'
})
const imageResponse = await axios.get(data.track.cover, {
responseType: 'arraybuffer'
})
await satanic.sendMessage(m.chat, {
image: imageResponse.data,
caption: `🎵 *${data.track.title}*\n👤 ${data.track.artist}\n⏱ ${data.track.duration}`,
mimetype: 'image/jpeg'
}, { quoted: fkontak })
await satanic.sendMessage(m.chat, {
audio: audioResponse.data,
mimetype: 'audio/mpeg'
}, { quoted: fkontak })
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
} else if (text.includes('spotify.com')) {
const apiUrl = `https://free-restapi.biz.id/api/spotifydl?url=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const { data } = await axios.get(apiUrl)
if (!data.status || !data.download_url) {
return reply('Gagal mendapatkan link download.')
}
const proxyUrl = `https://cloudflare-cors-anywhere.supershadowcube.workers.dev/?url=${encodeURIComponent(data.download_url)}`
const audioResponse = await axios.get(proxyUrl, {
responseType: 'arraybuffer'
})
const imageResponse = await axios.get(data.track.cover, {
responseType: 'arraybuffer'
})
await satanic.sendMessage(m.chat, {
image: imageResponse.data,
caption: `🎵 *${data.track.title}*\n👤 ${data.track.artist}\n⏱ ${data.track.duration}`,
mimetype: 'image/jpeg'
}, { quoted: fkontak })
await satanic.sendMessage(m.chat, {
audio: audioResponse.data,
mimetype: 'audio/mpeg'
}, { quoted: fkontak })
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
} else {
reply('Format salah! Gunakan .spotifyget 1 (dari hasil search) atau .spotifyget link_spotify')
}
} catch (error) {
console.error(error)
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
reply('Terjadi kesalahan: ' + error.message)
}
}
break;

case 'alquran': {
if (!text) return reply(`📖 *AL-QURAN*\n\nContoh:\n.alquran al-baqarah\n.alquran yasin\n.alquran al-baqarah 1-5\n.alquran yasin 1`)
let query = text.replace(/^[.!?]alquran\s*/i, '').trim()
if (!query) return reply(`📖 *AL-QURAN*\n\nContoh:\n.alquran al-baqarah\n.alquran yasin`)
let [surahName, ayatRange] = query.split(/\s+(\d+[-–]\d+|\d+)/).filter(Boolean)
try {
const slug = surahName.toLowerCase().replace(/\s+/g, "-")
const url = `https://quran.nu.or.id/${slug}`
const res = await fetch(url)
const html = await res.text()
const $ = cheerio.load(html)
const title = $("h1").first().text().trim()
const info = $("h1").next("span").text().trim()
const hasil = []
$('div[id]').each((i, el) => {
const id = $(el).attr('id')
if (!/^\d+$/.test(id)) return
const arab = $(el).find('[dir="rtl"]').first().text().trim()
const latin = $(el).find('.text-primary-500').first().text().trim()
const arti = $(el).find('.text-neutral-700').first().text().trim()
if (arab && latin && arti) {
hasil.push({ ayat: Number(id), arab, latin, arti })
}
})
if (!hasil.length) return reply('❌ Surah tidak ditemukan!')
let teks = `📖 *AL-QURAN*\n\n`
teks += `📝 *${title}*\n`
teks += `ℹ️ ${info}\n`
teks += `📊 Total Ayat: ${hasil.length}\n\n`
if (ayatRange) {
if (ayatRange.includes('-') || ayatRange.includes('–')) {
let [start, end] = ayatRange.split(/[-–]/).map(Number)
hasil.filter(v => v.ayat >= start && v.ayat <= end).forEach(v => {
teks += `━━━━━━━━━━━━━━━\n`
teks += `🕌 *Ayat ${v.ayat}*\n\n`
teks += `${v.arab}\n\n`
teks += `🔤 ${v.latin}\n\n`
teks += `🇮🇩 ${v.arti}\n\n`
})
} else {
let ayat = hasil.find(v => v.ayat == Number(ayatRange))
if (!ayat) return reply('❌ Ayat tidak ditemukan!')
teks += `${ayat.arab}\n\n`
teks += `🔤 ${ayat.latin}\n\n`
teks += `🇮🇩 ${ayat.arti}\n`
}
} else {
hasil.forEach(v => {
teks += `${v.arab}\n\n`
teks += `🔤 ${v.latin}\n\n`
teks += `🇮🇩 ${v.arti}\n\n`
teks += `━━━━━━━━━━━━━━━\n\n`
})
}
await reply(teks)
} catch (error) {
console.error(error)
reply('❌ Gagal mengambil data. Coba lagi nanti.')
}
}
break

case 'murotal': {
if (!text) return reply(`📻 *MUROTAL*\n\nContoh:\n.murotal al-fatihah\n.murotal yasin\n.murotal al-baqarah`)
let query = text.replace(/^[.!?]murotal\s*/i, '').trim()
if (!query) return reply(`📻 *MUROTAL*\n\nContoh:\n.murotal al-fatihah\n.murotal yasin`)
try {
const res = await fetch("https://islamipedia.id/murottal/")
const html = await res.text()
const $ = cheerio.load(html)
const data = $(".surah-item").map((i, el) => ({
no: parseInt($(el).find("h5").text().split(".")[0]),
surah: ($(el).attr("data-title") || "").toLowerCase(),
arti: $(el).find("p").text().trim(),
audio: $(el).attr("data-audio") || ""
})).get()
const q = query.toLowerCase()
const find = data.find(v => v.surah.replace(/[^a-z0-9]/g, "").includes(q.replace(/[^a-z0-9]/g, "")))
if (!find) return reply('❌ Surah tidak ditemukan!')
await satanic.sendMessage(m.chat, {
audio: { url: find.audio },
mimetype: "audio/mpeg",
ptt: false
}, { quoted: fkontak })
} catch (e) {
console.error(e)
reply('❌ Gagal mengambil murotal. Coba lagi nanti.')
}
}
break
case "sixtynine":
case "pussy":
case "dick":
case "anal":
case "boobs":
case "bdsm":
case "black":
case "easter":
case "bottomless":
case "blowjub":
case "collared":
case "cum":
case "cumsluts":
case "dp":
case "dom":
case "extreme":
case "feet":
case "finger":
case "fuck":
case "futa":
case "gay":
case "gif":
case "group":
case "hentai":
case "kiss":
case "lesbian":
case "lick":
case "pegged":
case "phgif":
case "puffies":
case "real":
case "suck":
case "tattoo":
case "tiny":
case "toys":
case "xmas":
if (!isPrem) return reply('you are not premium')
try {
await reply(mess.wait || 'Tunggu sebentar...')
const { data } = await axios.get(`https://free-restapi.biz.id/api/${command}?&apikey=${global.sakey}`, {
responseType: 'arraybuffer'
})
const sendMsg2 = await satanic.sendMessage(m.chat, {
image: Buffer.from(data),
caption: 'Done',
viewOnce: true
}, { quoted: fkontak });
setTimeout(() => {
satanic.sendMessage(m.chat, {
delete: {
remoteJid: m.chat,
fromMe: true,
id: sendMsg2.key.id,
participant: m.sender
}
}).catch(() => {})
}, 30000);
} catch (error) {
console.error('Error fetching waifu image:', error)
let errorMessage = 'Gagal mengambil gambar'
if (error.response) {
errorMessage = `API Error: ${error.response.status}`
} else if (error.request) {
errorMessage = 'Tidak ada response dari server'
}
await reply(errorMessage)
}
break
case 'lapor':
case 'report':
case 'bug': {
if (!text) return reply(`LAPOR BUG / MASALAH\n\nCara penggunaan:\n${prefix}lapor [pesan]\n\nContoh:\n${prefix}lapor fitur sticker tidak berfungsi\n\nPesan akan dikirim ke owner bot.`);
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const ownerNumber = global.owner || '6285196895485@s.whatsapp.net';
const senderName = m.pushName || 'User';
const senderNumber = m.sender || 'Unknown';
const timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
let reportText = `📢 *LAPORAN BUG / MASALAH*\n\n`;
reportText += `👤 *Nama:* ${senderName}\n`;
reportText += `📱 *Nomor:* ${senderNumber}\n`;
reportText += `📅 *Waktu:* ${timestamp}\n`;
reportText += `📝 *Pesan:* ${text}\n\n`;
reportText += `📌 *Info Tambahan:*\n`;
reportText += `• Group: ${m.isGroup ? 'Ya' : 'Tidak'}\n`;
if (m.isGroup) {
reportText += `• Nama Group: ${m.chat || '-'}\n`;
}
reportText += `• Command: ${command}\n`;
reportText += `• Prefix: ${prefix}\n\n`;
reportText += `_Dikirim dari bot WhatsApp_`;
await satanic.sendMessage(ownerNumber, { text: reportText }, { quoted: null });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
await reply(`✅ Laporan berhasil dikirim ke owner.\n\nTerima kasih telah melaporkan masalah. Kami akan segera menindaklanjutinya.`);
} catch (err) {
console.error('Error in lapor case:', err);
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
reply(`❌ Gagal mengirim laporan.\n\nError: ${err.message || 'Unknown error'}`);
}
}
break;
case 'rules':
case 'aturan':
case 'peraturan': {
let rulesText = `📋 *RULES BOT*\n\n`;
rulesText += `━━━━━━━━━━━━━━━━━━━━━━\n`;
rulesText += `1. *Gunakan Dengan Bijak*\n`;
rulesText += `   Bot ini dibuat untuk hiburan dan membantu tugas sehari-hari.\n\n`;
rulesText += `2. *Dilarang SPAM*\n`;
rulesText += `   Jangan mengirim perintah secara berulang-ulang dalam waktu singkat.\n\n`;
rulesText += `3. *Dilarang Toxic*\n`;
rulesText += `   Jangan menggunakan bot untuk menghina, menyebarkan kebencian, atau konten negatif.\n\n`;
rulesText += `4. *Konten 18+*\n`;
rulesText += `   Beberapa fitur mengandung konten dewasa. Gunakan dengan tanggung jawab sendiri.\n\n`;
rulesText += `5. *Premium Feature*\n`;
rulesText += `   Beberapa fitur hanya tersedia untuk user premium.\n\n`;
rulesText += `6. *Laporan Bug*\n`;
rulesText += `   Jika menemukan bug, gunakan perintah .lapor [pesan]\n\n`;
rulesText += `7. *Saran & Masukan*\n`;
rulesText += `   Kirim saran atau masukan ke owner via .lapor\n\n`;
rulesText += `8. *DILARANG SPAM CALL ATAU CHAT PRIBADI KE BOT*\n`;
rulesText += `   ❌ Jangan melakukan panggilan suara/video ke nomor bot\n`;
rulesText += `   ❌ Jangan mengirim pesan pribadi ke bot (kecuali perintah)\n`;
rulesText += `   ❌ Jangan mengirim pesan berantai atau spam ke bot\n`;
rulesText += `   ⚠️ Pelanggar akan di-block otomatis oleh sistem\n\n`;
rulesText += `━━━━━━━━━━━━━━━━━━━━━━\n`;
rulesText += `📌 *Daftar Perintah:*\n`;
rulesText += `   • .menu - Lihat semua perintah\n`;
rulesText += `   • .lapor - Laporkan bug/masalah\n`;
rulesText += `   • .owner - Hubungi owner\n`;
rulesText += `   • .ping - Cek koneksi bot\n\n`;
rulesText += `━━━━━━━━━━━━━━━━━━━━━━\n`;
rulesText += `📥 *Project By:* ${namaBot || 'Satanic Haxor'}`;
await satanic.sendMessage(m.chat, { text: rulesText }, { quoted: fkontak });
}
break;
case 'tqto':
case 'thanksto':
case 'credit':
case 'kredit': {
let tqtoText = `🙏 *THANKS TO / CREDIT*\n\n`;
tqtoText += `━━━━━━━━━━━━━━━━━━━━━━\n`;
tqtoText += `*TERIMA KASIH KEPADA:*\n\n`;
tqtoText += `👨‍💻 *Developer:*\n`;
tqtoText += `   • Satanic (Satanic Haxor)\n`;
tqtoText += `   • KaaOfc, Kyuu, Ryuuu, Hamnn, Zanspiw, Yd rmdhn, and Friends support lain nya\n\n`;
tqtoText += `📚 *Library & API:*\n`;
tqtoText += `   • Baileys - WhatsApp Web Library\n`;
tqtoText += `   • Node.js - Runtime Environment\n`;
tqtoText += `   • WhatsApp - Platform\n\n`;
tqtoText += `🌐 *API Provider:*\n`;
tqtoText += `   • free-restapi.biz.id\n`;
tqtoText += `   • api.termai.cc\n`;
tqtoText += `   • api.siputzx.my.id\n`;
tqtoText += `   • api.emiliabot.my.id\n`;
tqtoText += `   • api.nexray.eu.cc\n`;
tqtoText += `🤝 *Support & Kontributor:*\n`;
tqtoText += `   • Semua user premium\n`;
tqtoText += `   • Para Developer bot\n`;
tqtoText += `   • Komunitas WhatsApp Bot\n\n`;
tqtoText += `━━━━━━━━━━━━━━━━━━━━━━\n`;
tqtoText += `💖 *Support Developer:*\n`;
tqtoText += `   • Donasi: via saweria atau trakteer\n`;
tqtoText += `   • Follow: @satanichaxor\n\n`;
tqtoText += `━━━━━━━━━━━━━━━━━━━━━━\n`;
await satanic.sendMessage(m.chat, { text: tqtoText }, { quoted: fkontak });
}
break;
case 'randomwaifu':
case 'randomhentai': {
if (!isPrem) return reply('Fitur premium only');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const response = await fetch("https://api.waifu.im/images?IsNsfw=All");
const data = await response.json();
const imageUrl = data.items[Math.floor(Math.random() * data.items.length)].url;
const sentMsg = await satanic.sendMessage(m.chat, {
image: { url: imageUrl },
caption: 'Random Waifu',
viewOnce: true
}, { quoted: fkontak });
setTimeout(() => {
satanic.sendMessage(m.chat, {
delete: {
remoteJid: m.chat,
fromMe: true,
id: sentMsg.key.id,
participant: m.sender
}
}).catch(() => {})
}, 30000);
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
reply('Gagal ambil waifu');
}
}
break;
case "randomchina":
case "china": {
const data = "https://api.siputzx.my.id/api/r/cecan/china";
await satanic.sendMessage(m.chat, {
image: { url: data },
caption: ""
}, { quoted: fkontak });
}
break;

case "randomindo":
case "indo": {
const data = "https://api.siputzx.my.id/api/r/cecan/indonesia";
await satanic.sendMessage(m.chat, {
image: { url: data },
caption: ""
}, { quoted: fkontak });
}
break;

case "waifu": {
const data = "https://api.siputzx.my.id/api/r/waifu";
await satanic.sendMessage(m.chat, {
image: { url: data },
caption: ""
}, { quoted: fkontak });
}
break;

case "randomneko":
case "neko": {
const data = "https://api.siputzx.my.id/api/r/neko";
await satanic.sendMessage(m.chat, {
image: { url: data },
caption: ""
}, { quoted: fkontak });
}
break;

case "randomvietnam":
case "vietnam": {
const data = "https://api.siputzx.my.id/api/r/cecan/vietnam";
await satanic.sendMessage(m.chat, {
image: { url: data },
caption: ""
}, { quoted: fkontak });
}
break;

case "randomthailand":
case "thailand": {
const data = "https://api.siputzx.my.id/api/r/cecan/thailand";
await satanic.sendMessage(m.chat, {
image: { url: data },
caption: ""
}, { quoted: fkontak });
}
break;

case "randomkorea":
case "korea": {
const data = "https://api.siputzx.my.id/api/r/cecan/korea";
await satanic.sendMessage(m.chat, {
image: { url: data },
caption: ""
}, { quoted: fkontak });
}
break;

case "randomjapan":
case "japan": {
const data = "https://api.siputzx.my.id/api/r/cecan/japan";
await satanic.sendMessage(m.chat, {
image: { url: data },
caption: ""
}, { quoted: fkontak });
}
break;
case 'artimimpi':
case 'tafsirmimpi': {
if (!text) return reply(`Contoh : ${command} belanja`);
let anu = await primbon.tafsir_mimpi(text);
if (anu.status == false) return reply(anu.message);
reply(`Mimpi : ${anu.message.mimpi}\nArti : ${anu.message.arti}\nSolusi : ${anu.message.solusi}`);
}
break;

case 'ramalanjodoh':
case 'ramaljodoh': {
if (!text) return reply(`Contoh : ${command} Dika, 7, 7, 2005, Novia, 16, 11, 2004`);
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = text.split`,`;
let anu = await primbon.ramalan_jodoh(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2);
if (anu.status == false) return reply(anu.message);
reply(`Nama Anda : ${anu.message.nama_anda.nama}\nLahir Anda : ${anu.message.nama_anda.tgl_lahir}\nNama Pasangan : ${anu.message.nama_pasangan.nama}\nLahir Pasangan : ${anu.message.nama_pasangan.tgl_lahir}\nHasil : ${anu.message.result}\nCatatan : ${anu.message.catatan}`);
}
break;

case 'ramalanjodohbali':
case 'ramaljodohbali': {
if (!text) return reply(`Contoh : ${command} Dika, 7, 7, 2005, Novia, 16, 11, 2004`);
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = text.split`,`;
let anu = await primbon.ramalan_jodoh_bali(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2);
if (anu.status == false) return reply(anu.message);
reply(`Nama Anda : ${anu.message.nama_anda.nama}\nLahir Anda : ${anu.message.nama_anda.tgl_lahir}\nNama Pasangan : ${anu.message.nama_pasangan.nama}\nLahir Pasangan : ${anu.message.nama_pasangan.tgl_lahir}\nHasil : ${anu.message.result}\nCatatan : ${anu.message.catatan}`);
}
break;

case 'suamiistri': {
if (!text) return reply(`Contoh : ${command} Dika, 7, 7, 2005, Novia, 16, 11, 2004`);
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = text.split`,`;
let anu = await primbon.suami_istri(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2);
if (anu.status == false) return reply(anu.message);
reply(`Nama Suami : ${anu.message.suami.nama}\nLahir Suami : ${anu.message.suami.tgl_lahir}\nNama Istri : ${anu.message.istri.nama}\nLahir Istri : ${anu.message.istri.tgl_lahir}\nHasil : ${anu.message.result}\nCatatan : ${anu.message.catatan}`);
}
break;

case 'ramalancinta':
case 'ramalcinta': {
if (!text) return reply(`Contoh : ${command} Dika, 7, 7, 2005, Novia, 16, 11, 2004`);
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = text.split`,`;
let anu = await primbon.ramalan_cinta(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2);
if (anu.status == false) return reply(anu.message);
reply(`Nama Anda : ${anu.message.nama_anda.nama}\nLahir Anda : ${anu.message.nama_anda.tgl_lahir}\nNama Pasangan : ${anu.message.nama_pasangan.nama}\nLahir Pasangan : ${anu.message.nama_pasangan.tgl_lahir}\nSisi Positif : ${anu.message.sisi_positif}\nSisi Negatif : ${anu.message.sisi_negatif}\nCatatan : ${anu.message.catatan}`);
}
break;

case 'artinama': {
if (!text) return reply(`Contoh : ${command} Dika Ardianta`);
let anu = await primbon.arti_nama(text);
if (anu.status == false) return reply(anu.message);
reply(`Nama : ${anu.message.nama}\nArti : ${anu.message.arti}\nCatatan : ${anu.message.catatan}`);
}
break;

case 'kecocokannama':
case 'cocoknama': {
if (!text) return reply(`Contoh : ${command} Dika, 7, 7, 2005`);
let [nama, tgl, bln, thn] = text.split`,`;
let anu = await primbon.kecocokan_nama(nama, tgl, bln, thn);
if (anu.status == false) return reply(anu.message);
reply(`Nama : ${anu.message.nama}\nLahir : ${anu.message.tgl_lahir}\nLife Path : ${anu.message.life_path}\nDestiny : ${anu.message.destiny}\nDestiny Desire : ${anu.message.destiny_desire}\nPersonality : ${anu.message.personality}\nPersentase : ${anu.message.persentase_kecocokan}`);
}
break;

case 'kecocokanpasangan':
case 'cocokpasangan':
case 'pasangan': {
if (!text) return reply(`Contoh : ${command} Dika|Novia`);
let [nama1, nama2] = text.split`|`;
let anu = await primbon.kecocokan_nama_pasangan(nama1, nama2);
if (anu.status == false) return reply(anu.message);
await satanic.sendMessage(m.chat, {
image: { url: anu.message.gambar },
caption: `Nama Anda : ${anu.message.nama_anda}\nNama Pasangan : ${anu.message.nama_pasangan}\nSisi Positif : ${anu.message.sisi_positif}\nSisi Negatif : ${anu.message.sisi_negatif}`
}, { quoted: fkontak });
}
break;

case 'jadianpernikahan':
case 'jadiannikah': {
if (!text) return reply(`Contoh : ${command} 6, 12, 2020`);
let [tgl, bln, thn] = text.split`,`;
let anu = await primbon.tanggal_jadian_pernikahan(tgl, bln, thn);
if (anu.status == false) return reply(anu.message);
reply(`Tanggal Pernikahan : ${anu.message.tanggal}\nKarakteristik : ${anu.message.karakteristik}`);
}
break;

case 'sifatusaha': {
if (!text) return reply(`Contoh : ${command} 28, 12, 2021`);
let [tgl, bln, thn] = text.split`,`;
let anu = await primbon.sifat_usaha_bisnis(tgl, bln, thn);
if (anu.status == false) return reply(anu.message);
reply(`Lahir : ${anu.message.hari_lahir}\nUsaha : ${anu.message.usaha}`);
}
break;

case 'rejeki':
case 'rezeki': {
if (!text) return reply(`Contoh : ${command} 7, 7, 2005`);
let [tgl, bln, thn] = text.split`,`;
let anu = await primbon.rejeki_hoki_weton(tgl, bln, thn);
if (anu.status == false) return reply(anu.message);
reply(`Lahir : ${anu.message.hari_lahir}\nRezeki : ${anu.message.rejeki}\nCatatan : ${anu.message.catatan}`);
}
break;

case 'pekerjaan': {
if (!text) return reply(`Contoh : ${command} 7, 7, 2005`);
let [tgl, bln, thn] = text.split`,`;
let anu = await primbon.pekerjaan_weton_lahir(tgl, bln, thn);
if (anu.status == false) return reply(anu.message);
reply(`Lahir : ${anu.message.hari_lahir}\nPekerjaan : ${anu.message.pekerjaan}\nCatatan : ${anu.message.catatan}`);
}
break;

case 'ramalannasib':
case 'ramalnasib':
case 'nasib': {
if (!text) return reply(`Contoh : 7, 7, 2005`);
let [tgl, bln, thn] = text.split`,`;
let anu = await primbon.ramalan_nasib(tgl, bln, thn);
if (anu.status == false) return reply(anu.message);
reply(`Analisa : ${anu.message.analisa}\nAngka Akar : ${anu.message.angka_akar}\nSifat : ${anu.message.sifat}\nElemen : ${anu.message.elemen}\nAngka Keberuntungan : ${anu.message.angka_keberuntungan}`);
}
break;

case 'potensipenyakit':
case 'penyakit': {
if (!text) return reply(`Contoh : ${command} 7, 7, 2005`);
let [tgl, bln, thn] = text.split`,`;
let anu = await primbon.cek_potensi_penyakit(tgl, bln, thn);
if (anu.status == false) return reply(anu.message);
reply(`Analisa : ${anu.message.analisa}\nSektor : ${anu.message.sektor}\nElemen : ${anu.message.elemen}\nCatatan : ${anu.message.catatan}`);
}
break;

case 'artitarot':
case 'tarot': {
if (!text) return reply(`Contoh : ${command} 7, 7, 2005`);
let [tgl, bln, thn] = text.split`,`;
let anu = await primbon.arti_kartu_tarot(tgl, bln, thn);
if (anu.status == false) return reply(anu.message);
await satanic.sendMessage(m.chat, {
image: { url: anu.message.image },
caption: `Lahir : ${anu.message.tgl_lahir}\nSimbol Tarot : ${anu.message.simbol_tarot}\nArti : ${anu.message.arti}\nCatatan : ${anu.message.catatan}`
}, { quoted: fkontak });
}
break;

case 'fengshui': {
if (!text) return reply(`Contoh : ${command} Dika, 1, 2005\n\nNote : ${command} Nama, gender, tahun lahir\nGender : 1 untuk laki-laki & 2 untuk perempuan`);
let [nama, gender, tahun] = text.split`,`;
let anu = await primbon.perhitungan_feng_shui(nama, gender, tahun);
if (anu.status == false) return reply(anu.message);
reply(`Nama : ${anu.message.nama}\nLahir : ${anu.message.tahun_lahir}\nGender : ${anu.message.jenis_kelamin}\nAngka Kua : ${anu.message.angka_kua}\nKelompok : ${anu.message.kelompok}\nKarakter : ${anu.message.karakter}\nSektor Baik : ${anu.message.sektor_baik}\nSektor Buruk : ${anu.message.sektor_buruk}`);
}
break;

case 'haribaik': {
if (!text) return reply(`Contoh : ${command} 7, 7, 2005`);
let [tgl, bln, thn] = text.split`,`;
let anu = await primbon.petung_hari_baik(tgl, bln, thn);
if (anu.status == false) return reply(anu.message);
reply(`Lahir : ${anu.message.tgl_lahir}\nKala Tinantang : ${anu.message.kala_tinantang}\nInfo : ${anu.message.info}\nCatatan : ${anu.message.catatan}`);
}
break;

case 'harisangar':
case 'taliwangke': {
if (!text) return reply(`Contoh : ${command} 7, 7, 2005`);
let [tgl, bln, thn] = text.split`,`;
let anu = await primbon.hari_sangar_taliwangke(tgl, bln, thn);
if (anu.status == false) return reply(anu.message);
reply(`Lahir : ${anu.message.tgl_lahir}\nHasil : ${anu.message.result}\nInfo : ${anu.message.info}\nCatatan : ${anu.message.catatan}`);
}
break;

case 'harinaas':
case 'harisial': {
if (!text) return reply(`Contoh : ${command} 7, 7, 2005`);
let [tgl, bln, thn] = text.split`,`;
let anu = await primbon.primbon_hari_naas(tgl, bln, thn);
if (anu.status == false) return reply(anu.message);
reply(`Hari Lahir : ${anu.message.hari_lahir}\nTanggal Lahir : ${anu.message.tgl_lahir}\nHari Naas : ${anu.message.hari_naas}\nInfo : ${anu.message.catatan}\nCatatan : ${anu.message.info}`);
}
break;

case 'nagahari':
case 'harinaga': {
if (!text) return reply(`Contoh : ${command} 7, 7, 2005`);
let [tgl, bln, thn] = text.split`,`;
let anu = await primbon.rahasia_naga_hari(tgl, bln, thn);
if (anu.status == false) return reply(anu.message);
reply(`Hari Lahir : ${anu.message.hari_lahir}\nTanggal Lahir : ${anu.message.tgl_lahir}\nArah Naga Hari : ${anu.message.arah_naga_hari}\nCatatan : ${anu.message.catatan}`);
}
break;

case 'arahrejeki':
case 'arahrezeki': {
if (!text) return reply(`Contoh : ${command} 7, 7, 2005`);
let [tgl, bln, thn] = text.split`,`;
let anu = await primbon.primbon_arah_rejeki(tgl, bln, thn);
if (anu.status == false) return reply(anu.message);
reply(`Hari Lahir : ${anu.message.hari_lahir}\nTanggal Lahir : ${anu.message.tgl_lahir}\nArah Rezeki : ${anu.message.arah_rejeki}\nCatatan : ${anu.message.catatan}`);
}
break;
case 'peruntungan': {
if (!text) return reply(`Contoh : ${command} Dika, 7, 7, 2005, 2022\n\nNote : ${command} Nama, tanggal lahir, bulan lahir, tahun lahir, untuk tahun`);
let [nama, tgl, bln, thn, untuk] = text.split`,`;
let anu = await primbon.ramalan_peruntungan(nama, tgl, bln, thn, untuk);
if (anu.status == false) return reply(anu.message);
reply(`Nama : ${anu.message.nama}\nLahir : ${anu.message.tgl_lahir}\nPeruntungan Tahun : ${anu.message.peruntungan_tahun}\nHasil : ${anu.message.result}\nCatatan : ${anu.message.catatan}`);
}
break;

case 'weton':
case 'wetonjawa': {
if (!text) return reply(`Contoh : ${command} 7, 7, 2005`);
let [tgl, bln, thn] = text.split`,`;
let anu = await primbon.weton_jawa(tgl, bln, thn);
if (anu.status == false) return reply(anu.message);
reply(`Tanggal : ${anu.message.tanggal}\nJumlah Neptu : ${anu.message.jumlah_neptu}\nWatak Hari : ${anu.message.watak_hari}\nNaga Hari : ${anu.message.naga_hari}\nJam Baik : ${anu.message.jam_baik}\nWatak Kelahiran : ${anu.message.watak_kelahiran}`);
}
break;

case 'sifat':
case 'karakter': {
if (!text) return reply(`Contoh : ${command} Dika, 7, 7, 2005`);
let [nama, tgl, bln, thn] = text.split`,`;
let anu = await primbon.sifat_karakter_tanggal_lahir(nama, tgl, bln, thn);
if (anu.status == false) return reply(anu.message);
reply(`Nama : ${anu.message.nama}\nLahir : ${anu.message.tgl_lahir}\nGaris Hidup : ${anu.message.garis_hidup}`);
}
break;

case 'keberuntungan': {
if (!text) return reply(`Contoh : ${command} Dika, 7, 7, 2005`);
let [nama, tgl, bln, thn] = text.split`,`;
let anu = await primbon.potensi_keberuntungan(nama, tgl, bln, thn);
if (anu.status == false) return reply(anu.message);
reply(`Nama : ${anu.message.nama}\nLahir : ${anu.message.tgl_lahir}\nHasil : ${anu.message.result}`);
}
break;

case 'memancing': {
if (!text) return reply(`Contoh : ${command} 12, 1, 2022`);
let [tgl, bln, thn] = text.split`,`;
let anu = await primbon.primbon_memancing_ikan(tgl, bln, thn);
if (anu.status == false) return reply(anu.message);
reply(`Tanggal : ${anu.message.tgl_memancing}\nHasil : ${anu.message.result}\nCatatan : ${anu.message.catatan}`);
}
break;

case 'masasubur': {
if (!text) return reply(`Contoh : ${command} 12, 1, 2022, 28\n\nNote : ${command} hari pertama menstruasi, siklus`);
let [tgl, bln, thn, siklus] = text.split`,`;
let anu = await primbon.masa_subur(tgl, bln, thn, siklus);
if (anu.status == false) return reply(anu.message);
reply(`Hasil : ${anu.message.result}\nCatatan : ${anu.message.catatan}`);
}
break;

case 'zodiak':
case 'zodiac': {
if (!text) return reply(`Contoh : ${command} 7 7 2005`);
let zodiak = [
["capricorn", new Date(1970, 0, 1)],
["aquarius", new Date(1970, 0, 20)],
["pisces", new Date(1970, 1, 19)],
["aries", new Date(1970, 2, 21)],
["taurus", new Date(1970, 3, 21)],
["gemini", new Date(1970, 4, 21)],
["cancer", new Date(1970, 5, 22)],
["leo", new Date(1970, 6, 23)],
["virgo", new Date(1970, 7, 23)],
["libra", new Date(1970, 8, 23)],
["scorpio", new Date(1970, 9, 23)],
["sagittarius", new Date(1970, 10, 22)],
["capricorn", new Date(1970, 11, 22)]
].reverse()
function getZodiac(month, day) {
let d = new Date(1970, month - 1, day);
return zodiak.find(([_, _d]) => d >= _d)[0];
}
let date = new Date(text);
if (date == 'Invalid Date') return reply('Format tanggal salah');
let d = new Date();
let [tahun, bulan, tanggal] = [d.getFullYear(), d.getMonth() + 1, d.getDate()];
let birth = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
let zodiac = await getZodiac(birth[1], birth[2]);
let anu = await primbon.zodiak(zodiac);
if (anu.status == false) return reply(anu.message);
reply(`Zodiak : ${anu.message.zodiak}\nNomor : ${anu.message.nomor_keberuntungan}\nAroma : ${anu.message.aroma_keberuntungan}\nPlanet : ${anu.message.planet_yang_mengitari}\nBunga : ${anu.message.bunga_keberuntungan}\nWarna : ${anu.message.warna_keberuntungan}\nBatu : ${anu.message.batu_keberuntungan}\nElemen : ${anu.message.elemen_keberuntungan}\nPasangan Zodiak : ${anu.message.pasangan_zodiak}\nCatatan : ${anu.message.catatan}`);
}
break;

case 'shio': {
if (!text) return reply(`Contoh : ${command} tikus\n\nNote : For Detail https://primbon.com/shio.htm`);
let anu = await primbon.shio(text);
if (anu.status == false) return reply(anu.message);
reply(`Hasil : ${anu.message}`);
}
break;
case 'paptt': {
if (!isPrem) return reply('Fitur premium only');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const response = await axios.get(`https://free-restapi.biz.id/api/paptt?apikey=${global.sakey}`, {
responseType: 'arraybuffer'
});
await satanic.sendMessage(m.chat, {
image: Buffer.from(response.data),
caption: 'pap tt',
viewOnce: false
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
reply('Gagal ambil pap tt');
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
}
}
break;
case 'papayang':
case 'pap': {
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const response = await axios.get(`https://free-restapi.biz.id/api/pap/ayang?apikey=${global.sakey}`, {
responseType: 'arraybuffer'
});
await satanic.sendMessage(m.chat, {
image: Buffer.from(response.data),
caption: 'Done ya kak🎉',
viewOnce: false
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
reply('Gagal ambil pap ');
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
}
}
break;
case 'papdada':
case 'paptt': {
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const response = await axios.get(`https://free-restapi.biz.id/api/papdada?apikey=${global.sakey}`, {
responseType: 'arraybuffer'
});
await satanic.sendMessage(m.chat, {
image: Buffer.from(response.data),
caption: 'Done ya kak🎉',
viewOnce: false
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
reply('Gagal ambil pap ');
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
}
}
break;
case 'bokep':
case 'bkp': {
    return reply(`*🚫 DILARANG!*

*Surah An-Nur (24:30):*

قُلْ لِلْمُؤْمِنِينَ يَغُضُّوا مِنْ أَبْصَارِهِمْ وَيَحْفَظُوا فُرُوجَهُمْ ۚ ذَٰلِكَ أَزْكَىٰ لَهُمْ ۗ إِنَّ اللَّهَ خَبِيرٌ بِمَا يَصْنَعُونَ

*"Katakanlah kepada orang laki-laki yang beriman, 'Hendaklah mereka menahan pandangannya, dan memelihara kemaluannya; yang demikian itu adalah lebih suci bagi mereka. Sesungguhnya Allah Maha Mengetahui apa yang mereka perbuat.'"*

*Surah An-Nur (24:31):*

وَقُلْ لِلْمُؤْمِنَاتِ يَغْضُضْنَ مِنْ أَبْصَارِهِنَّ وَيَحْفَظْنَ فُرُوجَهُنَّ

*"Katakanlah kepada wanita yang beriman, 'Hendaklah mereka menahan pandangannya, dan memelihara kemaluannya.'"*

━━━━━━━━━━━━━━━━━━━

⚠️ *PERINGATAN:*

Menonton atau mencari konten porno adalah *DOSA BESAR* dan melanggar perintah Allah untuk menjaga pandangan dan kemaluan.

💀 *Ancaman:*
• Dosa yang terus mengalir
• Hati menjadi gelap
• Jauh dari rahmat Allah
• Merusak otak dan mental

🛑 *HENTIKAN!*
Bertaubatlah sebelum terlambat. Allah Maha Pengampun lagi Maha Penyayang.

*"Dan bertobatlah kamu sekalian kepada Allah, hai orang-orang yang beriman supaya kamu beruntung."* (QS. An-Nur: 31)

━━━━━━━━━━━━━━━━━━━
✨ *Jaga pandanganmu, selamatkan imanmu!*`);
}
break;
case 'randomasupan':
case 'asupan': {
function pickRandom(list) {
return list[Math.floor(list.length * Math.random())];
}
const asupan = [
"https://b.top4top.io/m_1931yxodg0.mp4",
"https://k.top4top.io/m_193161p380.mp4",
"https://l.top4top.io/m_1931i4g3p1.mp4",
"https://a.top4top.io/m_1931tjlio2.mp4",
"https://g.top4top.io/m_1931z2mc40.mp4",
"https://h.top4top.io/m_1931auyof1.mp4",
"https://i.top4top.io/m_19315hrle2.mp4",
"https://j.top4top.io/m_1931xul5a3.mp4",
"https://l.top4top.io/m_1931o92nr0.mp4",
"https://a.top4top.io/m_1931j1rh21.mp4",
"https://b.top4top.io/m_1931iaqpg2.mp4",
"https://c.top4top.io/m_1931s5zlj3.mp4",
"https://d.top4top.io/m_1931x0g5a4.mp4",
"https://i.top4top.io/m_1931oj76n0.mp4",
"https://j.top4top.io/m_19319gl3d1.mp4",
"https://k.top4top.io/m_1931u52cq2.mp4",
"https://l.top4top.io/m_1931mvgj73.mp4",
"https://a.top4top.io/m_1931u07oz4.mp4",
"https://j.top4top.io/m_1931h1fo60.mp4",
"https://k.top4top.io/m_1931mro3u1.mp4",
"https://l.top4top.io/m_1931kx0ac2.mp4",
"https://a.top4top.io/m_1931g9ezq3.mp4",
"https://b.top4top.io/m_1931plin14.mp4",
"https://c.top4top.io/m_1931aaxri5.mp4",
"https://d.top4top.io/m_1931ijzzn6.mp4",
"https://e.top4top.io/m_1931ugycd7.mp4",
"https://f.top4top.io/m_1931l14nk8.mp4",
"https://g.top4top.io/m_1931crgqt9.mp4",
"https://l.top4top.io/m_1931ufrul0.mp4",
"https://a.top4top.io/m_1931jbdpk1.mp4",
"https://c.top4top.io/m_1931aj9nm2.mp4",
"https://d.top4top.io/m_1931cnsal3.mp4",
"https://e.top4top.io/m_1931d4kc74.mp4",
"https://f.top4top.io/m_1931bih8q5.mp4",
"https://g.top4top.io/m_1931xx7aa6.mp4",
"https://h.top4top.io/m_1931g3zsq7.mp4",
"https://a.top4top.io/m_1931m74wd0.mp4",
"https://b.top4top.io/m_1931p8tfm1.mp4",
"https://e.top4top.io/m_1931aj8iv0.mp4",
"https://f.top4top.io/m_1931szguy1.mp4",
"https://g.top4top.io/m_1931l73ry2.mp4",
"https://h.top4top.io/m_1931yhznj3.mp4",
"https://i.top4top.io/m_1931kmtp34.mp4",
"https://j.top4top.io/m_1931snhdg5.mp4",
"https://k.top4top.io/m_1931ay1jz6.mp4",
"https://l.top4top.io/m_1931x70mk7.mp4",
"https://a.top4top.io/m_19319mvvf8.mp4",
"https://b.top4top.io/m_1931icmzd9.mp4",
"https://h.top4top.io/m_19316oo0s0.mp4",
"https://i.top4top.io/m_1931cvvpt1.mp4"
];
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const randomUrl = pickRandom(asupan);
await satanic.sendMessage(m.chat, {
video: { url: randomUrl },
caption: 'RANDOM ASUPAN'
}, { quoted: m });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error('[RANDOMASUPAN]', err);
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
reply(`Gagal: ${err.message || 'Coba lagi nanti'}`);
}
}
break;
case 'animepat': {
reply(mess.wait)
waifudd = await axios.get(`https://nekos.life/api/v2/img/pat`)
await satanic.sendMessage(m.chat, { image: { url: waifudd.data.url }, caption: mess.success }, { quoted: fkontak }).catch(err => {
return('Error!')
})
}
break

case 'animeslap': {
reply(mess.wait)
waifudd = await axios.get(`https://nekos.life/api/v2/img/slap`)
await satanic.sendMessage(m.chat, { image: { url: waifudd.data.url }, caption: mess.success }, { quoted: fkontak }).catch(err => {
return('Error!')
})
}
break

case 'animecuddle': {
reply(mess.wait)
waifudd = await axios.get(`https://nekos.life/api/v2/img/cuddle`)
await satanic.sendMessage(m.chat, { image: { url: waifudd.data.url }, caption: mess.success }, { quoted: fkontak }).catch(err => {
return('Error!')
})
}
break

case 'animewaifu': {
reply(mess.wait)
waifudd = await axios.get(`https://nekos.life/api/v2/img/waifu`)
await satanic.sendMessage(m.chat, { image: { url: waifudd.data.url }, caption: mess.success }, { quoted: fkontak }).catch(err => {
return('Error!')
})
}
break

case 'animenom': {
reply(mess.wait)
waifudd = await axios.get(`https://nekos.life/api/v2/img/nom`)
await satanic.sendMessage(m.chat, { image: { url: waifudd.data.url }, caption: mess.success }, { quoted: fkontak }).catch(err => {
return('Error!')
})
}
break

case 'animefoxgirl': {
reply(mess.wait)
waifudd = await axios.get(`https://nekos.life/api/v2/img/fox_girl`)
await satanic.sendMessage(m.chat, { image: { url: waifudd.data.url }, caption: mess.success }, { quoted: fkontak }).catch(err => {
return('Error!')
})
}
break

case 'animetickle': {
reply(mess.wait)
waifudd = await axios.get(`https://nekos.life/api/v2/img/tickle`)
await satanic.sendMessage(m.chat, { image: { url: waifudd.data.url }, caption: mess.success }, { quoted: fkontak }).catch(err => {
return('Error!')
})
}
break

case 'animegecg': {
reply(mess.wait)
waifudd = await axios.get(`https://nekos.life/api/v2/img/gecg`)
await satanic.sendMessage(m.chat, { image: { url: waifudd.data.url }, caption: mess.success }, { quoted: fkontak }).catch(err => {
return('Error!')
})
}
break

case 'dogwoof': {
reply(mess.wait)
waifudd = await axios.get(`https://nekos.life/api/v2/img/woof`)
await satanic.sendMessage(m.chat, { image: { url: waifudd.data.url }, caption: mess.success }, { quoted: fkontak }).catch(err => {
return('Error!')
})
}
break

case '8ballpool': {
reply(mess.wait)
waifudd = await axios.get(`https://nekos.life/api/v2/img/8ball`)
await satanic.sendMessage(m.chat, { image: { url: waifudd.data.url }, caption: mess.success }, { quoted: fkontak }).catch(err => {
return('Error!')
})
}
break

case 'goosebird': {
reply(mess.wait)
waifudd = await axios.get(`https://nekos.life/api/v2/img/goose`)
await satanic.sendMessage(m.chat, { image: { url: waifudd.data.url }, caption: mess.success }, { quoted: fkontak }).catch(err => {
return('Error!')
})
}
break

case 'animefeed': {
reply(mess.wait)
waifudd = await axios.get(`https://nekos.life/api/v2/img/feed`)
await satanic.sendMessage(m.chat, { image: { url: waifudd.data.url }, caption: mess.success }, { quoted: fkontak }).catch(err => {
return('Error!')
})
}
break

case 'animeavatar': {
reply(mess.wait)
waifudd = await axios.get(`https://nekos.life/api/v2/img/avatar`)
await satanic.sendMessage(m.chat, { image: { url: waifudd.data.url }, caption: mess.success }, { quoted: fkontak }).catch(err => {
return('Error!')
})
}
break

case 'lizardpic': {
reply(mess.wait)
waifudd = await axios.get(`https://nekos.life/api/v2/img/lizard`)
await satanic.sendMessage(m.chat, { image: { url: waifudd.data.url }, caption: mess.success }, { quoted: fkontak }).catch(err => {
return('Error!')
})
}
break

case 'catmeow': {
reply(mess.wait)
waifudd = await axios.get(`https://nekos.life/api/v2/img/meow`)
await satanic.sendMessage(m.chat, { image: { url: waifudd.data.url }, caption: mess.success }, { quoted: fkontak }).catch(err => {
return('Error!')
})
}
break

case 'animewlp': {
reply(mess.wait)
waifudd = await axios.get(`https://nekos.life/api/v2/img/wallpaper`)
await satanic.sendMessage(m.chat, { image: { url: waifudd.data.url }, caption: mess.success }, { quoted: fkontak }).catch(err => {
return('Error!')
})
}
break

case 'animekiss': {
reply(mess.wait)
waifudd = await axios.get(`https://nekos.life/api/v2/img/kiss`)
await satanic.sendMessage(m.chat, { image: { url: waifudd.data.url }, caption: mess.success }, { quoted: fkontak }).catch(err => {
return('Error!')
})
}
break

case 'animehug': {
reply(mess.wait)
waifudd = await axios.get(`https://nekos.life/api/v2/img/hug`)
await satanic.sendMessage(m.chat, { image: { url: waifudd.data.url }, caption: mess.success }, { quoted: fkontak }).catch(err => {
return('Error!')
})
}
break
///////////// GARIS BATAS AKHIR SEARCH /////////
////////// GARIS AWAL MENU STALK ///////
case 'ffstalk':
case 'freefirestalk':
if (!text) return reply('Masukkan UID Free Fire!\n\nContoh: .ffstalk 946716486');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/ffstalk2?uid=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (!response.data.status) return reply('Gagal mengambil data dari Free Fire');
const r = response.data.result;
const b = r.basic_info;
const p = r.pet_info;
const c = r.clan_basic_info;
const s = r.social_info;
const cr = r.credit_score_info;
let info = `🔥 *FREE FIRE STALKER*\n\n`;
info += `🆔 *Account ID:* ${b.account_id}\n`;
info += `👤 *Nickname:* ${b.nickname}\n`;
info += `⭐ *Level:* ${b.level}\n`;
info += `📊 *Exp:* ${b.exp.toLocaleString()}\n`;
info += `🌍 *Region:* ${b.region}\n`;
info += `❤️ *Liked:* ${b.liked.toLocaleString()}\n`;
info += `🏅 *Badge ID:* ${b.badge_id}\n`;
info += `🖼️ *Head Pic:* ${b.head_pic}\n`;
info += `👕 *Skin Unlock:* ${b.weapon_skin_shows?.join(', ') || '-'}\n`;
info += `📅 *Create At:* ${new Date(b.create_at * 1000).toLocaleString('id-ID')}\n`;
info += `🕐 *Last Login:* ${new Date(b.last_login_at * 1000).toLocaleString('id-ID')}\n`;
info += `✅ *Verified:* ${r.verified ? 'Ya' : 'Tidak'}\n`;
info += `📝 *Highlight:* ${s?.social_highlight || '-'}\n`;
info += `🔒 *Privacy:* ${s?.privacy || '-'}\n`;
info += `🌐 *Language:* ${s?.language || '-'}\n\n`;
info += `🎮 *RANK*\n`;
info += `🏆 *Max Rank:* ${b.max_rank}\n`;
info += `🏆 *CS Max Rank:* ${b.cs_max_rank}\n`;
info += `🎯 *Rank:* ${b.rank}\n`;
info += `🎯 *CS Rank:* ${b.cs_rank}\n`;
info += `📈 *Ranking Points:* ${b.ranking_points}\n`;
info += `🦛 *Hippo Rank:* ${b.hippo_rank}\n`;
info += `🦛 *Hippo Points:* ${b.hippo_ranking_points}\n`;
info += `🎬 *Season ID:* ${b.season_id}\n\n`;
info += `💎 *DIAMOND*\n`;
info += `💠 *Diamond Cost:* ${r.diamond_cost_res?.diamond_cost || '-'}\n\n`;
info += `📊 *CREDIT SCORE*\n`;
info += `⭐ *Score:* ${cr?.score || '-'}\n`;
info += `📌 *Reason:* ${cr?.reason || '-'}\n`;
info += `📅 *Start:* ${cr?.start ? new Date(cr.start * 1000).toLocaleString('id-ID') : '-'}\n`;
info += `📅 *End:* ${cr?.end ? new Date(cr.end * 1000).toLocaleString('id-ID') : '-'}\n\n`;
info += `🦎 *PET*\n`;
info += `🐾 *Pet ID:* ${p?.pet_id || '-'}\n`;
info += `⭐ *Level:* ${p?.level || '-'}\n`;
info += `📊 *Exp:* ${p?.exp?.toLocaleString() || '-'}\n`;
info += `🎨 *Skin ID:* ${p?.skin_id || '-'}\n`;
info += `🎯 *Skill ID:* ${p?.selected_skill_id || '-'}\n`;
info += `✅ *Selected:* ${p?.is_selected ? 'Ya' : 'Tidak'}\n\n`;
info += `👥 *GUILD*\n`;
info += `🏷️ *Nama:* ${c?.clan_name || '-'}\n`;
info += `🆔 *Guild ID:* ${c?.clan_id || '-'}\n`;
info += `👥 *Anggota:* ${c?.member_num || '-'}\n\n`;
info += `👑 *OWNERS:* ${r.owners?.join(', ') || '-'}\n`;
info += `🌐 *Request Region:* ${r.request_info?.region || '-'}\n`;
info += `📡 *Request Status:* ${r.request_info?.status || '-'}\n\n`;
info += `📥 *Project By:* ${namaBot}`;
await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat mengambil data Free Fire.');
}
break;
case 'stalkdc':
case 'discordstalk':
if (!text) return reply('Masukkan ID Discord!\n\nContoh: .stalkdc 1280009524941426700');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/stalkdc?id=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (!response.data.status) return reply('Gagal mengambil data dari Discord');
const r = response.data.result;
let info = `💬 *DISCORD STALKER*\n\n`;
info += `🆔 *ID:* ${r.id}\n`;
info += `👤 *Username:* ${r.username}\n`;
info += `🖼️ *Avatar:* ${r.avatar}\n`;
info += `🏅 *Badges:* ${r.badges || '-'}\n`;
info += `📅 *Created:* ${r.created || '-'}\n`;
info += `📡 *Status:* ${r.status || '-'}\n`;
info += `🕐 *Timestamp:* ${r.timestamp ? new Date(r.timestamp).toLocaleString('id-ID') : '-'}\n\n`;
info += `📥 *Project By:* ${namaBot}`;
await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { image: { url: r.avatar }, caption: info }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat mengambil data Discord.');
}
break;
case 'nglspam':
if (!text) return reply('Masukkan URL NGL!\n\nContoh: .nglspam https://ngl.link/satgfeii2/pub|cuki|20');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const [url, message, count] = text.split('|');
if (!url || !message) return reply('Format salah!\n\nContoh: .nglspam https://ngl.link/satggds/pub|cuki|20');
const jumlah = count ? parseInt(count) : 10;
const apiUrl = `https://www.free-restapi.biz.id/api/ngl/spam?url=${encodeURIComponent(url)}&message=${encodeURIComponent(message)}&count=${jumlah}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (!response.data.success) return reply('Gagal mengirim spam NGL');
const d = response.data.data;
let info = `💬 *NGL SPAM*\n\n`;
info += `👤 *Username:* ${d.username}\n`;
info += `📝 *Message:* ${d.message}\n`;
info += `📊 *Requested:* ${d.requested}\n`;
info += `✅ *Sent:* ${d.sent}\n`;
info += `❌ *Failed:* ${d.failed}\n`;
info += `⏱️ *Elapsed:* ${(response.data.data.elapsed / 1000).toFixed(2)}s\n\n`;
info += `📥 *Project By:* ${namaBot}`;
await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat mengirim spam NGL.');
}
break;
case 'nglsend':
if (!text) return reply('Masukkan URL NGL & pesan!\n\nContoh: .nglsend https://ngl.link/satan66812/pub|cuki');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const [url, message] = text.split('|');
if (!url || !message) return reply('Format salah!\n\nContoh: .nglsend https://ngl.link/satan66812/pub|cuki');
const apiUrl = `https://www.free-restapi.biz.id/api/ngl/send?url=${encodeURIComponent(url)}&message=${encodeURIComponent(message)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (!response.data.success) return reply('Gagal mengirim pesan NGL');
const d = response.data.data;
let info = `💬 *NGL SEND*\n\n`;
info += `👤 *Username:* ${d.username}\n`;
info += `📝 *Message:* ${d.message}\n`;
info += `🆔 *Question ID:* ${d.questionId}\n`;
info += `📡 *Status:* ${d.status}\n`;
info += `🌍 *Region:* ${d.userRegion}\n`;
info += `✅ *Success:* ${d.success ? 'Ya' : 'Tidak'}\n`;
info += `⏱️ *Elapsed:* ${d.elapsed}ms\n\n`;
info += `📥 *Project By:* ${namaBot}`;
await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat mengirim pesan NGL.');
}
break;
case 'igstalk':
case 'instagramstalk': {
if (!text) return reply('Masukkan username Instagram!\n\nContoh: .igstalk jokowi');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/igstalk2?username=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (!response.data || response.data.status !== 200 || !response.data.result) {
return reply('Gagal mengambil data dari Instagram');
}
const user = response.data.result;
let info = `*INSTAGRAM STALKER*\n\n`;
info += `Username: ${user.username}\n`;
info += `Full Name: ${user.full_name || '-'}\n`;
info += `Bio: ${user.bio || '-'}\n`;
info += `Followers: ${user.followers_count || 0}\n`;
info += `Following: ${user.follows_count || 0}\n`;
info += `Posts: ${user.posts_count || 0}\n`;
info += `ID: ${user.id || '-'}\n`;
info += `Link: https://instagram.com/${user.username}\n`;
if (user.is_professional) info += `Verified: ✅ Professional Account\n`;
info += `\nProject By: ${namaBot}`;
if (user.profile_pic_url_hd || user.profile_pic_url) {
const profilePic = user.profile_pic_url_hd || user.profile_pic_url;
await satanic.sendMessage(m.chat, {
image: { url: profilePic },
caption: info
}, { quoted: fkontak });
} else {
await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
}
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat mengambil data Instagram.silahkan mencoba kembali');
}
}
break;

case 'githubstalk':
case 'ghstalk': {
if (!text) return reply(`Kirim perintah ${prefix + command} username\nContoh: ${prefix + command} whiskeysockets`);
try {
const res = await axios.get(`https://api.github.com/users/${text}`);
const user = res.data;
let txt = `*GITHUB PROFILE STALK*\n👤 *Username:* ${user.login}\n🆔 *ID:* ${user.id}\n🏷️ *Name:* ${user.name || '-'}\n📝 *Bio:* ${user.bio || '-'}\n📦 *Repos: ${user.public_repos}\n👥 *Followers:* ${user.followers}\n👣 *Following:* ${user.following}\n📍 *Location:* ${user.location || '-'}\n🔗 *URL:* ${user.html_url}`;
await satanic.sendMessage(from, { image: { url: user.avatar_url }, caption: txt }, { quoted: fkontak });
} catch (e) {
console.error(e);
reply("Username tidak ditemukan atau terjadi kesalahan.");
}
}
break;

case 'ytstalk':
case 'youtubestalk': {
if (!text) return reply('Masukkan username atau handle YouTube!\n\nContoh: .ytstalk Dhot\nAtau: .ytstalk @Dhot');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
const apiUrl = `https://free-restapi.biz.id/api/ytstalk?q=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
const result = response.data.result;
let info = `🎥 *YOUTUBE STALKER*\n\n`;
info += `📛 *Nama:* ${result.nama}\n`;
info += `🆔 *Channel ID:* ${result.channelId}\n`;
info += `🔗 *Handle:* ${result.handle}\n`;
info += `👥 *Subscribers:* ${result.subscriberCount}\n`;
info += `✅ *Verified:* ${result.verified || 'Tidak'}\n`;
info += `🔗 *URL:* ${result.url}\n`;
info += `\n📥 *Project By:* ${namaBot}`;
if (result.avatar) {
await satanic.sendMessage(m.chat, {
image: { url: result.avatar },
caption: info
}, { quoted: fkontak });
} else {
await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
}
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;

case 'ttstalk':
case 'tiktokstalk': {
if (!text) return reply('Masukkan username TikTok!\n\nContoh: .ttstalk jokowi');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/ttstalk?username=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (response.data.status !== 200) {
return reply('Gagal mengambil data dari TikTok');
}
const result = response.data.result;
let info = `🎵 *TIKTOK STALKER*\n\n`;
info += `👤 *Username:* ${result.username}\n`;
info += `📛 *Nama:* ${result.nama || '-'}\n`;
info += `📝 *Bio:* ${result.bio || '-'}\n`;
info += `✅ *Verifikasi:* ${result.verifikasi ? 'Ya' : 'Tidak'}\n`;
info += `👥 *Followers:* ${result.totalfollowers.toLocaleString()}\n`;
info += `❤️ *Total Disukai:* ${result.totaldisukai.toLocaleString()}\n`;
info += `🎬 *Total Video:* ${result.totalvideo.toLocaleString()}\n`;
info += `🔗 *Link:* https://tiktok.com/@${result.username}\n`;
info += `📥 *Project By:* ${namaBot}`;
if (result.avatar) {
await satanic.sendMessage(m.chat, {
image: { url: result.avatar },
caption: info
}, { quoted: fkontak });
} else {
await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
}
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat mengambil data TikTok.');
}
}
break;

case 'robloxstalk':
case 'rblxstalk': {
if (!text) return reply('Masukkan username Roblox!\n\nContoh: .robloxstalk Simoon68');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/robloxstalk?username=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (response.data.status !== 200) {
return reply('Gagal mengambil data dari Roblox');
}
const result = response.data.result;
const account = result.account;
const stats = result.stats;
const presence = result.presence;
let info = `🎮 *ROBLOX STALKER*\n\n`;
info += `🆔 *User ID:* ${result.userId}\n`;
info += `👤 *Username:* ${account.username}\n`;
info += `📛 *Display Name:* ${account.displayName}\n`;
info += `📝 *Bio:* ${account.description || '-'}\n`;
info += `📅 *Bergabung:* ${account.created}\n`;
info += `✅ *Verifikasi:* ${account.hasVerifiedBadge ? '✅ Ya' : '❌ Tidak'}\n`;
info += `🚫 *Banned:* ${account.isBanned ? '⚠️ Ya' : '✅ Tidak'}\n\n`;
info += `📊 *STATISTIK*\n`;
info += `👥 *Teman:* ${stats.friendCount.toLocaleString()}\n`;
info += `👣 *Followers:* ${stats.followers.toLocaleString()}\n`;
info += `👤 *Following:* ${stats.following.toLocaleString()}\n`;
info += `📦 *Inventory:* ${stats.inventoryCount.toLocaleString()}\n\n`;
info += `🟢 *PRESENCE*\n`;
info += `📱 *Online:* ${presence.isOnline ? '🟢 Online' : '⚫ Offline'}\n`;
if (presence.recentGame && presence.recentGame !== 'Studio') {
info += `🎮 *Game Terakhir:* ${presence.recentGame}\n`;
}
if (result.groups && result.groups.groups && result.groups.groups.length > 0) {
info += `\n👥 *GROUP (${result.groups.total} total)*\n`;
info += `━━━━━━━━━━━━━━━━━━━━━\n`;
for (let i = 0; i < Math.min(result.groups.groups.length, 15); i++) {
const group = result.groups.groups[i];
const roleName = group.role?.name || 'Member';
const rank = group.role?.rank || 0;
info += `${i+1}. ${group.name}\n`;
info += `   👑 Role: ${roleName} (Rank ${rank})\n`;
if (group.url) info += `   🔗 ${group.url}\n`;
info += `\n`;
}
if (result.groups.groups.length > 15) {
info += `*dan ${result.groups.groups.length - 15} grup lainnya...*\n`;
}
} else {
info += `\n👥 *Group:* Tidak ada grup\n`;
}
info += `━━━━━━━━━━━━━━━━━━━━━\n`;
info += `🔗 *Link Profile:* https://www.roblox.com/users/${result.userId}/profile\n`;
info += `📥 *Project By:* ${namaBot}`;
if (account.profilePicture) {
await satanic.sendMessage(m.chat, {
image: { url: account.profilePicture },
caption: info
}, { quoted: fkontak });
} else {
if (info.length > 4000) {
await satanic.sendMessage(m.chat, { text: info.substring(0, 4000) }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { text: info.substring(4000) }, { quoted: fkontak });
} else {
await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
}
}
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat mengambil data Roblox.');
}
}
break;

case 'npmstalk':
case 'stalknpm': {
if (!text) return reply('Masukkan nama package NPM!\n\nContoh: .npmstalk axios');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/npmstalk?package=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (response.data.status !== 200) {
return reply('Gagal mengambil data dari NPM');
}
const result = response.data.result;
let info = `📦 *NPM PACKAGE STALKER*\n\n`;
info += `📌 *Package:* ${result.name}\n`;
info += `⭐ *Version Latest:* ${result.versionLatest}\n`;
info += `📅 *Latest Publish:* ${new Date(result.latestPublishTime).toLocaleDateString('id-ID')} ${new Date(result.latestPublishTime).toLocaleTimeString('id-ID')}\n`;
info += `🔧 *Version Publish:* ${result.versionPublish || '-'}\n`;
info += `📆 *Publish Time:* ${new Date(result.publishTime).toLocaleDateString('id-ID')}\n`;
info += `🔄 *Version Update:* ${result.versionUpdate}\n`;
info += `📦 *Latest Dependencies:* ${result.latestDependencies}\n`;
info += `📦 *Publish Dependencies:* ${result.publishDependencies}\n\n`;
info += `📥 *Project By:* ${namaBot}`;
await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat mengambil data NPM.');
}
}
break;
case 'twstalk':
case 'twitterstalk': {
if (!text) return reply('Masukkan username Twitter!\n\nContoh: .twstalk jokowi');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/twstalk?username=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (response.data.status !== 200) {
return reply('Gagal mengambil data dari Twitter');
}
const result = response.data.result;
let info = `🐦 *TWITTER STALKER*\n\n`;
info += `👤 *Username:* @${result.username}\n`;
info += `📛 *Name:* ${result.name}\n`;
info += `📝 *Bio:* ${result.bio || '-'}\n`;
info += `📍 *Location:* ${result.location || '-'}\n`;
info += `✅ *Verified:* ${result.verified ? 'Ya' : 'Tidak'}\n`;
if (result.verification_type) {
info += `🔐 *Verification Type:* ${result.verification_type}\n`;
}
info += `🔒 *Protected:* ${result.protected ? 'Ya' : 'Tidak'}\n`;
info += `📅 *Joined:* ${new Date(result.joined).toLocaleDateString('id-ID')}\n`;
info += `\n📊 *STATISTIK*\n`;
info += `👥 *Followers:* ${result.followers.toLocaleString()}\n`;
info += `👣 *Following:* ${result.following.toLocaleString()}\n`;
info += `❤️ *Likes:* ${result.likes.toLocaleString()}\n`;
info += `🐦 *Tweets:* ${result.tweets.toLocaleString()}\n`;
info += `📷 *Media Count:* ${result.media_count.toLocaleString()}\n`;
info += `\n🔗 *Link:* ${result.url}\n`;
info += `📥 *Project By:* ${namaBot}`;
if (result.avatar_url) {
await satanic.sendMessage(m.chat, {
image: { url: result.avatar_url },
caption: info
}, { quoted: fkontak });
} else {
await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
}
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat mengambil data Twitter.');
}
}
break;


case 'brainly':
case 'bl': {
if (!text) return reply(`Contoh: ${prefix}brainly siapa presiden indonesia`);
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://anabot.my.id/api/search/brainly?query=${encodeURIComponent(text)}&apikey=freeApikey`;
const response = await axios.get(apiUrl);
if (!response.data.success || !response.data.data.result || response.data.data.result.length === 0) {
return reply('❌ Tidak ditemukan hasil untuk pertanyaan tersebut.');
}
const results = response.data.data.result.slice(0, 10);
let info = `🧠 *BRAINLY SEARCH*\n\n`;
info += `🔍 *Query:* ${text}\n`;
info += `📊 *Ditemukan:* ${results.length} hasil\n\n`;
info += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
results.forEach((item, i) => {
info += `*${i + 1}. ${item.content}*\n`;
info += `📚 *Mata Pelajaran:* ${item.subject.name}\n`;
info += `🎓 *Tingkat:* ${item.grade.name}\n`;
info += `📝 *Jawaban:*\n`;
if (item.answer) {
info += `${item.answer.content.replace(/<br\s*\/?>/gi, '\n')}\n`;
if (item.answer.author && item.answer.author.nick) {
info += `👤 *Dijawab oleh:* ${item.answer.author.nick}\n`;
}
if (item.answer.rating && item.answer.rating > 0) {
info += `⭐ *Rating:* ${item.answer.rating}/5\n`;
}
if (item.answer.verified) {
info += `✅ *Terverifikasi*\n`;
}
} else {
info += `❌ Tidak ada jawaban\n`;
}
info += `\n───────────────────\n\n`;
});
info += `━━━━━━━━━━━━━━━━━━━━━\n`;
info += `📥 *Project By:* ${namaBot}`;
if (info.length > 4000) {
await satanic.sendMessage(m.chat, { text: info.substring(0, 4000) }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { text: info.substring(4000) }, { quoted: fkontak });
} else {
await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
}
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat mencari di Brainly.');
}
}
break;


/////// BATAS AKHIR STALK //////

///// AWAL GARIS DOWNLOAD //////
case 'tt':
case 'ttdl':
case 'tiktok':
case 'tiktokdl': {
if (!text) return reply('Masukkan URL TikToknya!\n\nContoh: .tt https://www.tiktok.com/@username/video/xxx')
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
 const apiUrl = `https://free-restapi.biz.id/api/ttdl?url=${encodeURIComponent(text)}&apikey=${global.sakey}`
    const response = await axios.get(apiUrl)
    if (response.data.status !== 200) {
        return reply('Gagal mengambil data dari TikTok')
    }
    const result = response.data.result
    let info = `TIKTOK DOWNLOADER\n\n`
    info += `Title: ${result.title}\n`
    info += `Duration: ${result.duration}\n`
    info += `Region: ${result.region}\n`
    info += `Taken At: ${result.taken_at}\n\n`
    info += `AUTHOR\n`
    info += `Nickname: ${result.author.nickname}\n`
    info += `Username: ${result.author.id}\n\n`
    info += `STATS\n`
    info += `Views: ${result.stats.views}\n`
    info += `Likes: ${result.stats.likes}\n`
    info += `Comments: ${result.stats.comment}\n`
    info += `Shares: ${result.stats.share}\n`
    info += `Downloads: ${result.stats.download}\n\n`
    info += `Project By: ${global.namaBot}`
    const videoUrl = result.videos.find(v => v.type === 'nowatermark')?.url || result.videos[0]?.url
    await satanic.sendMessage(m.chat, { 
        video: { url: videoUrl }, 
        caption: info 
    }, { quoted: fkontak })
    
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
break
case 'play':{
    if(!text) return reply('Masukkan judul lagu!');
    try{
        await satanic.sendMessage(m.chat,{react:{text:'🎵',key:m.key}});
        const yts = require('yt-search');
        const search = await yts(text);
        if(!search.all.length) return reply('❌ Lagu tidak ditemukan');
        
        const video = search.all[0];
        const videoUrl = video.url;
        const title = video.title || 'Tidak diketahui';
        const thumbnail = video.thumbnail || '';
        const duration = video.timestamp || 'N/A';
        const views = video.views || 0;
        
        let audioSent = false;
        let audioBuffer = null;
        let downloadLinks = [];
        let jsonResults = [];
        
        // YT.SAVETUBE (dengan fetch & cookies)
        try{
            const { createDecipheriv } = require('crypto');
            const METADATA_DECRYPTION_KEY = Buffer.from('C5D58EF67A7584E4A29F6C35BBC4EB12','hex');
            const HEADERS = {
                'Content-Type': 'application/json',
                Origin: 'https://yt.savetube.me',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 Chrome/130 Mobile Safari/537.36'
            };
            
            let cookieStore = new Map();
            
            function getCookieHeader() {
                const cookies = [];
                for (const [key, value] of cookieStore) {
                    cookies.push(`${key}=${value}`);
                }
                return cookies.join('; ');
            }
            
            function setCookiesFromResponse(response) {
                const setCookie = response.headers.get('set-cookie');
                if (setCookie) {
                    const cookieParts = setCookie.split(';');
                    for (const part of cookieParts) {
                        const [key, value] = part.trim().split('=');
                        if (key && value && !key.toLowerCase().includes('expires') &&
                            !key.toLowerCase().includes('path') && !key.toLowerCase().includes('domain') &&
                            !key.toLowerCase().includes('secure') && !key.toLowerCase().includes('httponly') &&
                            !key.toLowerCase().includes('samesite')) {
                            cookieStore.set(key, value);
                        }
                    }
                }
            }
            
            async function fetchWithCookies(url, options = {}) {
                const headers = {...HEADERS, ...options.headers};
                const cookie = getCookieHeader();
                if (cookie) headers.Cookie = cookie;
                
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 15000);
                
                try {
                    const response = await fetch(url, {...options, headers, signal: controller.signal});
                    setCookiesFromResponse(response);
                    return response;
                } finally {
                    clearTimeout(timeoutId);
                }
            }
            
            const idMatch = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([a-zA-Z0-9_-]{11})/);
            if(idMatch){
                const videoId = idMatch[1];
                const cdnRes = await fetchWithCookies('https://media.savetube.vip/api/random-cdn', {
                    headers: HEADERS
                }).then(v => v.json()).catch(() => null);
                
                if(cdnRes?.cdn){
                    const cdn = cdnRes.cdn;
                    const info = await fetchWithCookies(`https://${cdn}/v2/info`, {
                        method: 'POST',
                        headers: HEADERS,
                        body: JSON.stringify({ url: 'https://www.youtube.com/watch?v=' + videoId })
                    }).then(v => v.json()).catch(() => null);
                    
                    if(info?.data){
                        let metadata;
                        try {
                            const encrypted = Buffer.from(info.data, 'base64');
                            const decipher = createDecipheriv(
                                'aes-128-cbc',
                                METADATA_DECRYPTION_KEY,
                                encrypted.subarray(0, 16)
                            );
                            const decrypted = Buffer.concat([
                                decipher.update(encrypted.subarray(16)),
                                decipher.final()
                            ]);
                            metadata = JSON.parse(decrypted.toString('utf8'));
                        } catch(e) {
                            console.log('Decrypt metadata gagal:', e.message);
                        }
                        
                        if(metadata?.key){
                            const dl = await fetchWithCookies(`https://${cdn}/download`, {
                                method: 'POST',
                                headers: HEADERS,
                                body: JSON.stringify({
                                    id: videoId,
                                    downloadType: 'audio',
                                    quality: '128kbps',
                                    key: metadata.key
                                })
                            }).then(v => v.json()).catch(() => null);
                            
                            if(dl?.data?.downloadUrl){
                                jsonResults.push({
                                    source: 'yt.savetube',
                                    url: dl.data.downloadUrl,
                                    title: metadata.title || title,
                                    bitrate: '128',
                                    format: 'mp3'
                                });
                                
                                downloadLinks.push({
                                    source: 'yt.savetube',
                                    url: dl.data.downloadUrl,
                                    title: metadata.title || title
                                });
                                try{
                                    const response = await fetchWithCookies(dl.data.downloadUrl, { method: 'GET' });
                                    if(response.ok){
                                        const buffer = await response.arrayBuffer();
                                        audioBuffer = Buffer.from(buffer);
                                        audioSent = true;
                                    }
                                }catch(e){
                                    console.log('Gagal download yt.savetube:', e.message);
                                }
                            }
                        }
                    }
                }
            }
        }catch(e){
            console.log('yt.savetube error:', e.message);
        }
        
        // SAVETUBE LIB
        if(!audioSent){
            try{
                const SavetubeDownloader = require('./lib/savetube');
                const downloader = new SavetubeDownloader();
                const result = await downloader.ytmp3(videoUrl, "128");
                if(result?.success && result?.data?.downloadUrl){
                    jsonResults.push({
                        source: 'savetube',
                        url: result.data.downloadUrl,
                        title: title,
                        bitrate: '128',
                        format: 'mp3'
                    });
                    
                    downloadLinks.push({
                        source: 'savetube',
                        url: result.data.downloadUrl,
                        title: title
                    });
                    try{
                        const res = await fetch(result.data.downloadUrl);
                        const buffer = await res.arrayBuffer();
                        audioBuffer = Buffer.from(buffer);
                        audioSent = true;
                    }catch(e){
                        console.log('Gagal download savetube:', e.message);
                    }
                }
            }catch(e){
                console.log('Savetube error:', e.message);
            }
        }
        
           // SAVETUBE LIB
        if(!audioSent){
            try{
                const SavetubeDownloader = require('./lib/savetube');
                const downloader = new SavetubeDownloader();
                const result = await downloader.ytmp3(videoUrl, "128");
                if(result?.success && result?.data?.downloadUrl){
                    jsonResults.push({
                        source: 'savetube',
                        url: result.data.downloadUrl,
                        title: title,
                        bitrate: '128',
                        format: 'mp3'
                    });
                    
                    downloadLinks.push({
                        source: 'savetube',
                        url: result.data.downloadUrl,
                        title: title
                    });
                    try{
                        const res = await fetch(result.data.downloadUrl);
                        const buffer = await res.arrayBuffer();
                        audioBuffer = Buffer.from(buffer);
                        audioSent = true;
                    }catch(e){
                        console.log('Gagal download savetube:', e.message);
                    }
                }
            }catch(e){
                console.log('Savetube error:', e.message);
            }
        }
        
        // YT2MATE
        if(!audioSent){
            try{
                const y2mateResult = await y2mate(videoUrl);
                if(y2mateResult?.url){
                    jsonResults.push({
                        source: 'yt2mate',
                        url: y2mateResult.url,
                        title: y2mateResult.filename || title,
                        bitrate: '128',
                        format: 'mp3'
                    });
                    
                    downloadLinks.push({
                        source: 'yt2mate',
                        url: y2mateResult.url,
                        title: y2mateResult.filename || title
                    });
                    try{
                        const res = await fetch(y2mateResult.url);
                        const buffer = await res.arrayBuffer();
                        audioBuffer = Buffer.from(buffer);
                        audioSent = true;
                    }catch(e){
                        console.log('Gagal download yt2mate:', e.message);
                    }
                }
            }catch(e){
                console.log('Yt2mate error:', e.message);
            }
        }
        
        // FALLBACK APIS
        if(!audioSent){
            const FALLBACK_APIS = [
                {
                    name: 'ytmp3',
                    url: `https://free-restapi.biz.id/api/ytmp3?url=${encodeURIComponent(videoUrl)}&apikey=${global.sakey}`,
                    getData: async (data) => {
                        if(data?.data?.downloadUrl){
                            jsonResults.push({
                                source: 'ytmp3',
                                url: data.data.downloadUrl,
                                title: data.data?.title || 'Audio',
                                bitrate: '128',
                                format: 'mp3'
                            });
                            
                            downloadLinks.push({
                                source: 'ytmp3',
                                url: data.data.downloadUrl,
                                title: data.data?.title || 'Audio'
                            });
                            try{
                                const res = await fetch(data.data.downloadUrl);
                                const buffer = await res.arrayBuffer();
                                return Buffer.from(buffer);
                            }catch(e){
                                return null;
                            }
                        }
                        return null;
                    }
                },
                {
                    name: 'ytmp3ku',
                    url: `https://free-restapi.biz.id/api/ytmp3ku?url=${encodeURIComponent(videoUrl)}&apikey=${global.sakey}`,
                    getData: async (data) => {
                        if(data?.data?.downloadUrl){
                            jsonResults.push({
                                source: 'ytmp3ku',
                                url: data.data.downloadUrl,
                                title: data.data?.title || 'Audio',
                                bitrate: data.data?.bitrate || '128',
                                format: data.data?.format || 'mp3'
                            });
                            
                            downloadLinks.push({
                                source: 'ytmp3ku',
                                url: data.data.downloadUrl,
                                title: data.data?.title || 'Audio'
                            });
                            try{
                                const res = await fetch(data.data.downloadUrl);
                                const buffer = await res.arrayBuffer();
                                return Buffer.from(buffer);
                            }catch(e){
                                return null;
                            }
                        }
                        return null;
                    }
                },
                {
                    name: 'ytmp3dl',
                    url: `https://free-restapi.biz.id/api/ytmp3dl?url=${encodeURIComponent(videoUrl)}&apikey=${global.sakey}`,
                    getData: async (data) => {
                        if(data?.data?.downloadUrl){
                            jsonResults.push({
                                source: 'ytmp3dl',
                                url: data.data.downloadUrl,
                                title: data.data?.title || 'Audio',
                                bitrate: data.data?.bitrate || '128',
                                format: data.data?.format || 'mp3'
                            });
                            
                            downloadLinks.push({
                                source: 'ytmp3dl',
                                url: data.data.downloadUrl,
                                title: data.data?.title || 'Audio'
                            });
                            try{
                                const res = await fetch(data.data.downloadUrl);
                                const buffer = await res.arrayBuffer();
                                return Buffer.from(buffer);
                            }catch(e){
                                return null;
                            }
                        }
                        return null;
                    }
                }
            ];
            
            for(const api of FALLBACK_APIS){
                try{
                    const response = await fetch(api.url);
                    const data = await response.json();
                    if(data?.status === 'success' && data?.data){
                        const buffer = await api.getData(data);
                        if(buffer){
                            audioBuffer = buffer;
                            audioSent = true;
                            break;
                        }
                    }
                }catch(e){
                    console.log(`${api.name} error:`, e.message);
                }
            }
        }
        
        // Buat caption dengan semua link
        let linkText = '';
        if(jsonResults.length > 0){
            linkText = '\n\n📥 *Download Links:*\n';
            jsonResults.forEach((r, i) => {
                linkText += `\n${i+1}. *${r.source}* (${r.bitrate}kbps ${r.format})\n   ${r.url}`;
            });
        }
        
        // Kirim image dengan caption
        await satanic.sendMessage(m.chat,{
            image:{url:thumbnail},
            caption:`🎵 *${title}*\n⏱️ *Durasi:* ${duration}\n👁️ *Views:* ${views.toLocaleString()}\n🔗 *Link:* ${videoUrl}${linkText}`
        },{quoted:fkontak});
        
        // Kirim audio jika berhasil
        if(audioSent && audioBuffer){
            await satanic.sendMessage(m.chat,{
                audio: audioBuffer,
                mimetype: 'audio/mpeg',
                ptt: false
            },{quoted:fkontak});
            await satanic.sendMessage(m.chat,{react:{text:'✅',key:m.key}});
        } else {
            await satanic.sendMessage(m.chat,{react:{text:'⚠️',key:m.key}});
        }
        
    } catch(error){
        console.error(error);
        await satanic.sendMessage(m.chat,{
            text:'❌ Error, coba lagi nanti.'
        },{quoted:fkontak});
        await satanic.sendMessage(m.chat,{react:{text:'❌',key:m.key}});
    }
    break;
}

case 'ytmp3':{
    if(!text) return reply('Masukkan link YouTube!');
    if(!/youtube\.com|youtu\.be/i.test(text)) return reply('❌ Hanya support link YouTube!');
    try{
        await satanic.sendMessage(m.chat,{react:{text:'🎵',key:m.key}});
        
        let url = text;
        let audioSent = false;
        let audioBuffer = null;
        let downloadLinks = [];
        let jsonResults = [];
        let title = 'Audio';
        let thumbnail = '';
        let duration = 'N/A';
        
        // YT.SAVETUBE (dengan fetch & cookies)
        try{
            const { createDecipheriv } = require('crypto');
            const METADATA_DECRYPTION_KEY = Buffer.from('C5D58EF67A7584E4A29F6C35BBC4EB12','hex');
            const HEADERS = {
                'Content-Type': 'application/json',
                Origin: 'https://yt.savetube.me',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 Chrome/130 Mobile Safari/537.36'
            };
            
            let cookieStore = new Map();
            
            function getCookieHeader() {
                const cookies = [];
                for (const [key, value] of cookieStore) {
                    cookies.push(`${key}=${value}`);
                }
                return cookies.join('; ');
            }
            
            function setCookiesFromResponse(response) {
                const setCookie = response.headers.get('set-cookie');
                if (setCookie) {
                    const cookieParts = setCookie.split(';');
                    for (const part of cookieParts) {
                        const [key, value] = part.trim().split('=');
                        if (key && value && !key.toLowerCase().includes('expires') &&
                            !key.toLowerCase().includes('path') && !key.toLowerCase().includes('domain') &&
                            !key.toLowerCase().includes('secure') && !key.toLowerCase().includes('httponly') &&
                            !key.toLowerCase().includes('samesite')) {
                            cookieStore.set(key, value);
                        }
                    }
                }
            }
            
            async function fetchWithCookies(url, options = {}) {
                const headers = {...HEADERS, ...options.headers};
                const cookie = getCookieHeader();
                if (cookie) headers.Cookie = cookie;
                
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 15000);
                
                try {
                    const response = await fetch(url, {...options, headers, signal: controller.signal});
                    setCookiesFromResponse(response);
                    return response;
                } finally {
                    clearTimeout(timeoutId);
                }
            }
            
            const idMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([a-zA-Z0-9_-]{11})/);
            if(idMatch){
                const videoId = idMatch[1];
                const cdnRes = await fetchWithCookies('https://media.savetube.vip/api/random-cdn', {
                    headers: HEADERS
                }).then(v => v.json()).catch(() => null);
                
                if(cdnRes?.cdn){
                    const cdn = cdnRes.cdn;
                    const info = await fetchWithCookies(`https://${cdn}/v2/info`, {
                        method: 'POST',
                        headers: HEADERS,
                        body: JSON.stringify({ url: 'https://www.youtube.com/watch?v=' + videoId })
                    }).then(v => v.json()).catch(() => null);
                    
                    if(info?.data){
                        let metadata;
                        try {
                            const encrypted = Buffer.from(info.data, 'base64');
                            const decipher = createDecipheriv(
                                'aes-128-cbc',
                                METADATA_DECRYPTION_KEY,
                                encrypted.subarray(0, 16)
                            );
                            const decrypted = Buffer.concat([
                                decipher.update(encrypted.subarray(16)),
                                decipher.final()
                            ]);
                            metadata = JSON.parse(decrypted.toString('utf8'));
                        } catch(e) {
                            console.log('Decrypt metadata gagal:', e.message);
                        }
                        
                        if(metadata?.key){
                            const dl = await fetchWithCookies(`https://${cdn}/download`, {
                                method: 'POST',
                                headers: HEADERS,
                                body: JSON.stringify({
                                    id: videoId,
                                    downloadType: 'audio',
                                    quality: '128kbps',
                                    key: metadata.key
                                })
                            }).then(v => v.json()).catch(() => null);
                            
                            if(dl?.data?.downloadUrl){
                                title = metadata.title || 'Audio';
                                thumbnail = metadata.thumbnail || '';
                                duration = metadata.durationLabel || 'N/A';
                                
                                jsonResults.push({
                                    source: 'yt.savetube',
                                    url: dl.data.downloadUrl,
                                    title: title,
                                    bitrate: '128',
                                    format: 'mp3'
                                });
                                
                                downloadLinks.push({
                                    source: 'yt.savetube',
                                    url: dl.data.downloadUrl,
                                    title: title
                                });
                                try{
                                    const response = await fetchWithCookies(dl.data.downloadUrl, { method: 'GET' });
                                    if(response.ok){
                                        const buffer = await response.arrayBuffer();
                                        audioBuffer = Buffer.from(buffer);
                                        audioSent = true;
                                    }
                                }catch(e){
                                    console.log('Gagal download yt.savetube:', e.message);
                                }
                            }
                        }
                    }
                }
            }
        }catch(e){
            console.log('yt.savetube error:', e.message);
        }
        
        // SAVETUBE LIB
        if(!audioSent){
            try{
                const SavetubeDownloader = require('./lib/savetube');
                const downloader = new SavetubeDownloader();
                const result = await downloader.ytmp3(url, "128");
                if(result?.success && result?.data?.downloadUrl){
                    jsonResults.push({
                        source: 'savetube',
                        url: result.data.downloadUrl,
                        title: title,
                        bitrate: '128',
                        format: 'mp3'
                    });
                    
                    downloadLinks.push({
                        source: 'savetube',
                        url: result.data.downloadUrl,
                        title: title
                    });
                    try{
                        const res = await fetch(result.data.downloadUrl);
                        const buffer = await res.arrayBuffer();
                        audioBuffer = Buffer.from(buffer);
                        audioSent = true;
                    }catch(e){
                        console.log('Gagal download savetube:', e.message);
                    }
                }
            }catch(e){
                console.log('Savetube error:', e.message);
            }
        }
        
        // YT2MATE
        if(!audioSent){
            try{
                const y2mateResult = await y2mate(url);
                if(y2mateResult?.url){
                    jsonResults.push({
                        source: 'yt2mate',
                        url: y2mateResult.url,
                        title: y2mateResult.filename || title,
                        bitrate: '128',
                        format: 'mp3'
                    });
                    
                    downloadLinks.push({
                        source: 'yt2mate',
                        url: y2mateResult.url,
                        title: y2mateResult.filename || title
                    });
                    try{
                        const res = await fetch(y2mateResult.url);
                        const buffer = await res.arrayBuffer();
                        audioBuffer = Buffer.from(buffer);
                        audioSent = true;
                    }catch(e){
                        console.log('Gagal download yt2mate:', e.message);
                    }
                }
            }catch(e){
                console.log('Yt2mate error:', e.message);
            }
        }
           // FALLBACK APIS
        if(!audioSent){
            const FALLBACK_APIS = [
                {
                    name: 'ytmp3',
                    url: `https://free-restapi.biz.id/api/ytmp3?url=${encodeURIComponent(url)}&apikey=satanic`,
                    getData: async (data) => {
                        if(data?.data?.downloadUrl){
                            jsonResults.push({
                                source: 'ytmp3',
                                url: data.data.downloadUrl,
                                title: data.data?.title || 'Audio',
                                bitrate: '128',
                                format: 'mp3'
                            });
                            
                            downloadLinks.push({
                                source: 'ytmp3',
                                url: data.data.downloadUrl,
                                title: data.data?.title || 'Audio'
                            });
                            if(data.data.title) title = data.data.title;
                            if(data.data.thumbnail) thumbnail = data.data.thumbnail;
                            try{
                                const res = await fetch(data.data.downloadUrl);
                                const buffer = await res.arrayBuffer();
                                return Buffer.from(buffer);
                            }catch(e){
                                return null;
                            }
                        }
                        return null;
                    }
                },
                {
                    name: 'ytmp3ku',
                    url: `https://free-restapi.biz.id/api/ytmp3ku?url=${encodeURIComponent(url)}&apikey=satanic`,
                    getData: async (data) => {
                        if(data?.data?.downloadUrl){
                            jsonResults.push({
                                source: 'ytmp3ku',
                                url: data.data.downloadUrl,
                                title: data.data?.title || 'Audio',
                                bitrate: data.data?.bitrate || '128',
                                format: data.data?.format || 'mp3'
                            });
                            
                            downloadLinks.push({
                                source: 'ytmp3ku',
                                url: data.data.downloadUrl,
                                title: data.data?.title || 'Audio'
                            });
                            if(data.data.title) title = data.data.title;
                            if(data.data.thumbnail) thumbnail = data.data.thumbnail;
                            try{
                                const res = await fetch(data.data.downloadUrl);
                                const buffer = await res.arrayBuffer();
                                return Buffer.from(buffer);
                            }catch(e){
                                return null;
                            }
                        }
                        return null;
                    }
                },
                {
                    name: 'ytmp3dl',
                    url: `https://free-restapi.biz.id/api/ytmp3dl?url=${encodeURIComponent(url)}&apikey=satanic`,
                    getData: async (data) => {
                        if(data?.data?.downloadUrl){
                            jsonResults.push({
                                source: 'ytmp3dl',
                                url: data.data.downloadUrl,
                                title: data.data?.title || 'Audio',
                                bitrate: data.data?.bitrate || '128',
                                format: data.data?.format || 'mp3'
                            });
                            
                            downloadLinks.push({
                                source: 'ytmp3dl',
                                url: data.data.downloadUrl,
                                title: data.data?.title || 'Audio'
                            });
                            if(data.data.title) title = data.data.title;
                            if(data.data.thumbnail) thumbnail = data.data.thumbnail;
                            try{
                                const res = await fetch(data.data.downloadUrl);
                                const buffer = await res.arrayBuffer();
                                return Buffer.from(buffer);
                            }catch(e){
                                return null;
                            }
                        }
                        return null;
                    }
                }
            ];
            
            for(const api of FALLBACK_APIS){
                try{
                    const response = await fetch(api.url);
                    const data = await response.json();
                    if(data?.status === 'success' && data?.data){
                        const buffer = await api.getData(data);
                        if(buffer){
                            audioBuffer = buffer;
                            audioSent = true;
                            break;
                        }
                    }
                }catch(e){
                    console.log(`${api.name} error:`, e.message);
                }
            }
        }
        
        // Buat teks info
        let infoText = `🎵 *${title}*\n⏱️ *Durasi:* ${duration}\n🔗 *Link:* ${url}`;
        
        // Kirim teks info dulu
        await satanic.sendMessage(m.chat,{
            text: infoText
        },{quoted:fkontak});
        
        if(audioSent && audioBuffer){
            await satanic.sendMessage(m.chat,{
                audio: audioBuffer,
                mimetype: 'audio/mpeg',
                ptt: false
            },{quoted:fkontak});
            await satanic.sendMessage(m.chat,{react:{text:'✅',key:m.key}});
        } else {
            let linkText = '\n📥 *Download Links:*\n';
            if(jsonResults.length > 0){
                jsonResults.forEach((r, i) => {
                    linkText += `\n${i+1}. ${r.source} (${r.bitrate}kbps ${r.format}): ${r.url}`;
                });
            } else {
                linkText = '\n❌ Tidak ada link download tersedia';
            }
            
            await satanic.sendMessage(m.chat,{
                text:`⚠️ *Gagal Mengirim Audio*\n\n📌 *${title}*\n🔗 ${url}\n${linkText}\n\nSilahkan klik link di atas untuk download manual.`
            },{quoted:fkontak});
            await satanic.sendMessage(m.chat,{react:{text:'⚠️',key:m.key}});
        }
        
    } catch(error){
        console.error(error);
        await satanic.sendMessage(m.chat,{
            text:'❌ Error, coba lagi nanti.'
        },{quoted:fkontak});
        await satanic.sendMessage(m.chat,{react:{text:'❌',key:m.key}});
    }
    break;
}
// Fungsi y2mate (tetap seperti kode Anda)
async function y2mate(input) {
    let videoUrl = input
    
    // Cek apakah input adalah link atau judul
    if (!input.includes('youtube.com') && !input.includes('youtu.be')) {
      console.log(`[Search] "${input}" ...`)
      const searchResults = await yts(input)
      
      if (!searchResults.videos.length) {
        throw new Error('Tidak ada video ditemukan untuk pencarian tersebut.')
      }

      const topResult = searchResults.videos[0]
      videoUrl = topResult.url     
    }

    try {
      // Ambil key converter
      const sanityRes = await axios.get('https://cnv.cx/v2/sanity/key', {
        headers: {
          'sec-ch-ua-platform': '"Android"',
          'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36 EdgA/144.0.0.0',
          'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="144", "Microsoft Edge";v="144"',
          'content-type': 'application/json',
          'sec-ch-ua-mobile': '?1',
          'accept': '*/*',
          'origin': 'https://frame.y2meta-uk.com',
          'sec-fetch-site': 'cross-site',
          'sec-fetch-mode': 'cors',
          'sec-fetch-dest': 'empty',
          'referer': 'https://frame.y2meta-uk.com/',
          'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
          'priority': 'u=1, i'
        }
      })

      const key = sanityRes.data?.key
      if (!key) throw new Error('Gagal mengambil key converter')
      
      // Konversi ke MP3
      const body = new URLSearchParams({
        link: videoUrl,
        format: 'mp3',
        audioBitrate: '128',
        videoQuality: '720',
        filenameStyle: 'pretty',
        vCodec: 'h264'
      }).toString()

      const convertRes = await axios.post('https://cnv.cx/v2/converter', body, {
        headers: {
          'key': key,
          'sec-ch-ua-platform': '"Android"',
          'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36 EdgA/144.0.0.0',
          'accept': '*/*',
          'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="144", "Microsoft Edge";v="144"',
          'content-type': 'application/x-www-form-urlencoded',
          'sec-ch-ua-mobile': '?1',
          'origin': 'https://frame.y2meta-uk.com',
          'sec-fetch-site': 'cross-site',
          'sec-fetch-mode': 'cors',
          'sec-fetch-dest': 'empty',
          'referer': 'https://frame.y2meta-uk.com/',
          'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
          'priority': 'u=1, i'
        }
      })

      return convertRes.data

    } catch (err) {
      console.error('[ERROR]', err.message)
      if (err.response) {
        console.error('Status:', err.response.status)
        console.error('Data:', err.response.data)
      }
      throw err
    }
}
case 'ytmp4':{
    if(!text) return reply('Masukkan link YouTube!');
    if(!/youtube\.com|youtu\.be/i.test(text)) return reply('❌ Hanya support link YouTube!');
    try{
        await satanic.sendMessage(m.chat,{react:{text:'🎬',key:m.key}});
        
        let url = text;
        let videoSent = false;
        let videoBuffer = null;
        let downloadLinks = [];
        let jsonResults = [];
        let title = 'Video';
        let thumbnail = '';
        let duration = 'N/A';
        
        // YT.SAVETUBE (dengan fetch & cookies)
        try{
            const { createDecipheriv } = require('crypto');
            const METADATA_DECRYPTION_KEY = Buffer.from('C5D58EF67A7584E4A29F6C35BBC4EB12','hex');
            const HEADERS = {
                'Content-Type': 'application/json',
                Origin: 'https://yt.savetube.me',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 Chrome/130 Mobile Safari/537.36'
            };
            
            let cookieStore = new Map();
            
            function getCookieHeader() {
                const cookies = [];
                for (const [key, value] of cookieStore) {
                    cookies.push(`${key}=${value}`);
                }
                return cookies.join('; ');
            }
            
            function setCookiesFromResponse(response) {
                const setCookie = response.headers.get('set-cookie');
                if (setCookie) {
                    const cookieParts = setCookie.split(';');
                    for (const part of cookieParts) {
                        const [key, value] = part.trim().split('=');
                        if (key && value && !key.toLowerCase().includes('expires') &&
                            !key.toLowerCase().includes('path') && !key.toLowerCase().includes('domain') &&
                            !key.toLowerCase().includes('secure') && !key.toLowerCase().includes('httponly') &&
                            !key.toLowerCase().includes('samesite')) {
                            cookieStore.set(key, value);
                        }
                    }
                }
            }
            
            async function fetchWithCookies(url, options = {}) {
                const headers = {...HEADERS, ...options.headers};
                const cookie = getCookieHeader();
                if (cookie) headers.Cookie = cookie;
                
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 15000);
                
                try {
                    const response = await fetch(url, {...options, headers, signal: controller.signal});
                    setCookiesFromResponse(response);
                    return response;
                } finally {
                    clearTimeout(timeoutId);
                }
            }
            
            const idMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([a-zA-Z0-9_-]{11})/);
            if(idMatch){
                const videoId = idMatch[1];
                const cdnRes = await fetchWithCookies('https://media.savetube.vip/api/random-cdn', {
                    headers: HEADERS
                }).then(v => v.json()).catch(() => null);
                
                if(cdnRes?.cdn){
                    const cdn = cdnRes.cdn;
                    const info = await fetchWithCookies(`https://${cdn}/v2/info`, {
                        method: 'POST',
                        headers: HEADERS,
                        body: JSON.stringify({ url: 'https://www.youtube.com/watch?v=' + videoId })
                    }).then(v => v.json()).catch(() => null);
                    
                    if(info?.data){
                        let metadata;
                        try {
                            const encrypted = Buffer.from(info.data, 'base64');
                            const decipher = createDecipheriv(
                                'aes-128-cbc',
                                METADATA_DECRYPTION_KEY,
                                encrypted.subarray(0, 16)
                            );
                            const decrypted = Buffer.concat([
                                decipher.update(encrypted.subarray(16)),
                                decipher.final()
                            ]);
                            metadata = JSON.parse(decrypted.toString('utf8'));
                        } catch(e) {
                            console.log('Decrypt metadata gagal:', e.message);
                        }
                        
                        if(metadata?.key){
                            const dl = await fetchWithCookies(`https://${cdn}/download`, {
                                method: 'POST',
                                headers: HEADERS,
                                body: JSON.stringify({
                                    id: videoId,
                                    downloadType: 'video',
                                    quality: '360p',
                                    key: metadata.key
                                })
                            }).then(v => v.json()).catch(() => null);
                            
                            if(dl?.data?.downloadUrl){
                                title = metadata.title || 'Video';
                                thumbnail = metadata.thumbnail || '';
                                duration = metadata.durationLabel || 'N/A';
                                
                                jsonResults.push({
                                    source: 'yt.savetube',
                                    url: dl.data.downloadUrl,
                                    title: title,
                                    quality: '360p',
                                    format: 'mp4'
                                });
                                
                                downloadLinks.push({
                                    source: 'yt.savetube',
                                    url: dl.data.downloadUrl,
                                    title: title
                                });
                                try{
                                    const response = await fetchWithCookies(dl.data.downloadUrl, { method: 'GET' });
                                    if(response.ok){
                                        const buffer = await response.arrayBuffer();
                                        videoBuffer = Buffer.from(buffer);
                                        videoSent = true;
                                    }
                                }catch(e){
                                    console.log('Gagal download yt.savetube:', e.message);
                                }
                            }
                        }
                    }
                }
            }
        }catch(e){
            console.log('yt.savetube error:', e.message);
        }
        
        // FALLBACK APIS VIDEO
        if(!videoSent){
            const FALLBACK_APIS = [
                {
                    name: 'ytmp4',
                    url: `https://free-restapi.biz.id/api/ytmp4?url=${encodeURIComponent(url)}&apikey=satanic`,
                    getData: async (data) => {
                        if(data?.data?.downloadUrl){
                            jsonResults.push({
                                source: 'ytmp4',
                                url: data.data.downloadUrl,
                                title: data.data?.title || 'Video',
                                quality: data.data?.quality || '360p',
                                format: 'mp4'
                            });
                            
                            downloadLinks.push({
                                source: 'ytmp4',
                                url: data.data.downloadUrl,
                                title: data.data?.title || 'Video'
                            });
                            if(data.data.title) title = data.data.title;
                            if(data.data.thumbnail) thumbnail = data.data.thumbnail;
                            try{
                                const res = await fetch(data.data.downloadUrl);
                                const buffer = await res.arrayBuffer();
                                return Buffer.from(buffer);
                            }catch(e){
                                return null;
                            }
                        }
                        return null;
                    }
                },
                {
                    name: 'ytmp4ku',
                    url: `https://free-restapi.biz.id/api/ytmp4ku?url=${encodeURIComponent(url)}&apikey=satanic`,
                    getData: async (data) => {
                        if(data?.data?.downloadUrl){
                            jsonResults.push({
                                source: 'ytmp4ku',
                                url: data.data.downloadUrl,
                                title: data.data?.title || 'Video',
                                quality: data.data?.quality || '360p',
                                format: 'mp4'
                            });
                            
                            downloadLinks.push({
                                source: 'ytmp4ku',
                                url: data.data.downloadUrl,
                                title: data.data?.title || 'Video'
                            });
                            if(data.data.title) title = data.data.title;
                            if(data.data.thumbnail) thumbnail = data.data.thumbnail;
                            try{
                                const res = await fetch(data.data.downloadUrl);
                                const buffer = await res.arrayBuffer();
                                return Buffer.from(buffer);
                            }catch(e){
                                return null;
                            }
                        }
                        return null;
                    }
                },
                {
                    name: 'ytmp4dl',
                    url: `https://free-restapi.biz.id/api/ytmp4dl?url=${encodeURIComponent(url)}&apikey=satanic`,
                    getData: async (data) => {
                        if(data?.data?.downloadUrl){
                            jsonResults.push({
                                source: 'ytmp4dl',
                                url: data.data.downloadUrl,
                                title: data.data?.title || 'Video',
                                quality: data.data?.quality || '360p',
                                format: 'mp4'
                            });
                            
                            downloadLinks.push({
                                source: 'ytmp4dl',
                                url: data.data.downloadUrl,
                                title: data.data?.title || 'Video'
                            });
                            if(data.data.title) title = data.data.title;
                            if(data.data.thumbnail) thumbnail = data.data.thumbnail;
                            try{
                                const res = await fetch(data.data.downloadUrl);
                                const buffer = await res.arrayBuffer();
                                return Buffer.from(buffer);
                            }catch(e){
                                return null;
                            }
                        }
                        return null;
                    }
                }
            ];
            
            for(const api of FALLBACK_APIS){
                try{
                    const response = await fetch(api.url);
                    const data = await response.json();
                    if(data?.status === 'success' && data?.data){
                        const buffer = await api.getData(data);
                        if(buffer){
                            videoBuffer = buffer;
                            videoSent = true;
                            break;
                        }
                    }
                }catch(e){
                    console.log(`${api.name} error:`, e.message);
                }
            }
        }
        
        // Buat teks info
        let infoText = `🎬 *${title}*\n⏱️ *Durasi:* ${duration}\n🔗 *Link:* ${url}`;
        
        // Kirim teks info dulu
        await satanic.sendMessage(m.chat,{
            text: infoText
        },{quoted:fkontak});
        
        if(videoSent && videoBuffer){
            await satanic.sendMessage(m.chat,{
                video: videoBuffer,
                mimetype: 'video/mp4',
                caption: `🎬 *${title}*`
            },{quoted:fkontak});
            await satanic.sendMessage(m.chat,{react:{text:'✅',key:m.key}});
        } else {
            let linkText = '\n📥 *Download Links:*\n';
            if(jsonResults.length > 0){
                jsonResults.forEach((r, i) => {
                    linkText += `\n${i+1}. ${r.source} (${r.quality} ${r.format}): ${r.url}`;
                });
            } else {
                linkText = '\n❌ Tidak ada link download tersedia';
            }
            
            await satanic.sendMessage(m.chat,{
                text:`⚠️ *Gagal Mengirim Video*\n\n📌 *${title}*\n🔗 ${url}\n${linkText}\n\nSilahkan klik link di atas untuk download manual.`
            },{quoted:fkontak});
            await satanic.sendMessage(m.chat,{react:{text:'⚠️',key:m.key}});
        }
        
    } catch(error){
        console.error(error);
        await satanic.sendMessage(m.chat,{
            text:'❌ Error, coba lagi nanti.'
        },{quoted:fkontak});
        await satanic.sendMessage(m.chat,{react:{text:'❌',key:m.key}});
    }
    break;
}
case 'threads':
case 'th': {
    if (!text) return reply('Masukkan URL Threadsnya!\n\nContoh: .threads https://www.threads.net/@username/post/id')
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    
    const apiUrl = `https://free-restapi.biz.id/api/threads?url=${encodeURIComponent(text)}&apikey=${global.sakey}`
    const response = await axios.get(apiUrl)
    
    if (response.data.status !== 200) {
        return reply('Gagal mengambil data dari Threads')
    }
    
    const result = response.data.result
    
    let info = `THREADS DOWNLOADER\n\n`
    info += `Username: ${result.user.username}\n`
    info += `Text: ${result.text}\n`
    info += `Project By: ${namaBot}`
    
    // Jika ada video, kirim langsung tanpa button
    if (result.videos && result.videos.length > 0) {
        for (let i = 0; i < result.videos.length; i++) {
            let videoUrl = result.videos[i]
            await satanic.sendMessage(m.chat, { 
                video: { url: videoUrl },
                caption: info
            }, { quoted: fkontak })
        }
    }
    
    // Jika ada gambar, pake button carousel
    if (result.images && result.images.length > 0) {
        let selectedImages = result.images.slice(0, 10);
        let anu = []
        
        for (let i = 0; i < selectedImages.length; i++) {
            let imgUrl = selectedImages[i][0].url
            let imgsc = await prepareWAMessageMedia({
                image: { url: imgUrl }
            }, {
                upload: satanic.waUploadToServer
            })

            anu.push({
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: `Gambar ke *${i + 1}*`,
                    hasMediaAttachment: true,
                    ...imgsc
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: [{
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "Lihat di Threads",
                            url: result.url
                        })
                    }]
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                    text: info
                })
            })
        }
        
        const msg = await generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.fromObject({
                            text: `📱 Hasil Threads dari @${result.user.username}`
                        }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                            cards: anu
                        })
                    })
                }
            }
        }, {
            userJid: sender,
            quoted: fkontak
        })
        satanic.relayMessage(m.chat, msg.message, {
            messageId: msg.key.id
        })
    }
    
    if (!result.videos && !result.images) {
        return reply('Tidak ada video atau gambar yang ditemukan')
    }
    
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
break
case 'snackvideo':
async function snackvideo(url) {
  let data = qs.stringify({
    'ic-request': 'true',
    'id': url,
    'locale': 'id',
    'ic-element-id': 'main_page_form',
    'ic-id': '1',
    'ic-target-id': 'active_container',
    'ic-trigger-id': 'main_page_form',
    'ic-current-url': '/id/how-to-download-snack-video',
    'ic-select-from-response': '#id1',
    '_method': 'POST'
  });
  let config = {
    method: 'POST',
    url: 'https://getsnackvideo.com/results',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; CPH1803; Build/OPM1.171019.026) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.4280.141 Mobile Safari/537.36 KiToBrowser/124.0',
      'Accept': 'text/html-partial, */*; q=0.9',
      'accept-language': 'id-ID',
      'referer': 'https://getsnackvideo.com/id/how-to-download-snack-video',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'x-ic-request': 'true',
      'x-http-method-override': 'POST',
      'x-requested-with': 'XMLHttpRequest',
      'origin': 'https://getsnackvideo.com',
      'alt-used': 'getsnackvideo.com',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'priority': 'u=0',
      'te': 'trailers',
      'Cookie': '_ga_TBLWJYRGPZ=GS1.1.1736227224.1.1.1736227279.0.0.0; _ga=GA1.1.1194697262.1736227224'
    },
    data: data
  };
  try {
    const response = await axios.request(config);
    const $ = cheerio.load(response.data);
    const downloadUrl = $('.download_link.without_watermark').attr('href');
    const thumbnail = $('.img_thumb img').attr('src');
    return {
      thumbnail: thumbnail || 'Thumbnail not found',
      downloadUrl: downloadUrl || 'Download URL not found'
    };
  } catch (error) {
    console.error('Error:', error);
  }
}
  if (!text) return reply('masukan link SnackVideo')
  try {
    const resultn = await snackvideo(text)
    if (!resultn?.downloadUrl) return reply('❌ Gagal mengambil video')
    const videoRes = await axios.get(resultn.downloadUrl, { 
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; RMX2185 Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.7103.60 Mobile Safari/537.36',
        'Referer': 'https://www.snackvideo.com/'
      }
    })
    await satanic.sendMessage(m.chat, { 
      video: Buffer.from(videoRes.data),
      caption: '✅ *Video Snack berhasil didownload*'
    }, { quoted: fkontak })
  } catch (error) {
    reply('❌ Error: ' + error.message)
  }
  break
case 'cocofun':
case 'coco': {
    if (!text) return reply('Masukkan URL Cocofunnya!\n\nContoh: .cocofun https://www.cocofun.com/xxx')
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    const apiUrl = `https://free-restapi.biz.id/api/cocofun?url=${encodeURIComponent(text)}&apikey=${global.sakey}`
    const response = await axios.get(apiUrl)
    if (!response.data.success) {
        return reply('Gagal mengambil data dari Cocofun')
    }
    const result = response.data
    let info = `COCOFUN DOWNLOADER\n\n`
    info += `Topic: ${result.topic}\n`
    info += `Caption: ${result.caption}\n`
    info += `Duration: ${result.statistic.duration} detik\n`
    info += `Play: ${result.statistic.play}\n`
    info += `Like: ${result.statistic.like}\n`
    info += `Share: ${result.statistic.share}\n`
    info += `Project By: ${namaBot}`
    const videoUrl = result.videoUrl || result.watermark
    await satanic.sendMessage(m.chat, { 
        video: { url: videoUrl },
        caption: info
    }, { quoted: fkontak })
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
break
case 'igphoto':
case 'igslide': {
    if (!text) return reply('Masukkan URL Instagram slide!\n\nContoh: .igslid https://www.instagram.com/p/xxx');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const endpoint = `https://free-restapi.biz.id/api/igdl?url=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const hasil = await axios.get(endpoint);
        
        if (hasil.data.status !== 200) {
            return reply('Gagal mengambil data dari Instagram');
        }
        
        const datas = hasil.data;
        const mediaUrls = datas.url;
        const infoAkun = datas.metadata;
        
        
        const hanyaGambar = mediaUrls.filter(url => !infoAkun?.isVideo);
        

        
        let daftarCard = await Promise.all(hanyaGambar.map(async (gambar, index) => {
            const mediaGambar = await prepareWAMessageMedia({ 
                image: { url: gambar } 
            }, { 
                upload: satanic.waUploadToServer 
            });
            
            const keterangan = `Powerred By SatanicHaxor`;
            
            return {
                header: proto.Message.InteractiveMessage.Header.create({
                    ...mediaGambar,
                    title: '',
                    subtitle: `Slide ${index+1}`,
                    hasMediaAttachment: true
                }),
                body: { text: keterangan },
                nativeFlowMessage: {
                    buttons: [{
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "📥 Download",
                            url: gambar
                        })
                    }]
                }
            };
        }));
        
        let pesan = generateWAMessageFromContent(
            m.chat,
            {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            body: { text: `📸 Instagram Slide dari @${infoAkun?.username || 'user'}` },
                            carouselMessage: {
                                cards: daftarCard,
                                messageVersion: 1
                            }
                        }
                    }
                }
            },
            { quoted: fkontak }
        );
        
        await satanic.relayMessage(m.chat, pesan.message, { messageId: pesan.key.id });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat mengambil data Instagram.');
    }
}
break;
case 'ttslide':
case 'tiktokslide': {
    if (!text) return reply('Masukkan URL TikTok slide/photo!\n\nContoh: .ttslide https://www.tiktok.com/@username/video/xxx');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
        const endpoint = `https://free-restapi.biz.id/api/ttdl?url=${encodeURIComponent(text)}&apikey=${global.sakey}`;
        const hasil = await axios.get(endpoint);
        
        if (hasil.data.status !== 200) {
            return reply('Gagal mengambil data dari TikTok');
        }
        
        const datas = hasil.data;
        const result = datas.result;
        
        if (!result.videos || result.videos.length === 0) {
            return reply('Tidak ada foto/video yang ditemukan');
        }
        
        // Filter hanya photo
        const photos = result.videos.filter(v => v.type === 'photo');
        
        if (photos.length === 0) {
            return reply('Tidak ada slide foto yang ditemukan');
        }
        
        let daftarCard = await Promise.all(photos.map(async (photo, index) => {
            const mediaFoto = await prepareWAMessageMedia({ 
                image: { url: photo.url } 
            }, { 
                upload: satanic.waUploadToServer 
            });
            
            const keterangan = `📸 *Slide ${index+1} dari ${photos.length}*\n\n📝 Title: ${result.title || '-'}\n👤 Author: ${result.author?.nickname || '-'} (@${result.author?.id || '-'})\n❤️ Likes: ${result.stats?.likes?.toLocaleString() || '-'}\n💬 Comments: ${result.stats?.comment?.toLocaleString() || '-'}\n📨 Shares: ${result.stats?.share?.toLocaleString() || '-'}`;
            
            return {
                header: proto.Message.InteractiveMessage.Header.create({
                    ...mediaFoto,
                    title: '',
                    subtitle: `Slide ${index+1}`,
                    hasMediaAttachment: true
                }),
                body: { text: keterangan },
                nativeFlowMessage: {
                    buttons: [{
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "📥 Download",
                            url: photo.url
                        })
                    }]
                }
            };
        }));
        
        let pesan = generateWAMessageFromContent(
            m.chat,
            {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            body: { text: `🎵 TikTok Slide dari @${result.author?.id || 'user'}` },
                            carouselMessage: {
                                cards: daftarCard,
                                messageVersion: 1
                            }
                        }
                    }
                }
            },
            { quoted: fkontak }
        );
        
        await satanic.relayMessage(m.chat, pesan.message, { messageId: pesan.key.id });
        await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat mengambil data TikTok.');
    }
}
break;    
case 'igdl2': {
    if (!text) return reply('Masukkan link Instagram! Contoh: .igdl2 https://www.instagram.com/p/CONTOSH/');
    
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    async function indown(url) {
        try {
            const { data: pageData, headers } = await axios.get('https://indown.io/en1', {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36' }
            });
            
            const $ = cheerio.load(pageData);
            const token = $('input[name="_token"]').val();
            const cookies = headers['set-cookie'] ? headers['set-cookie'].map(v => v.split(';')[0]).join('; ') : '';

            if (!token) throw new Error('Token Indown not found');
            
            const params = new URLSearchParams();
            params.append('referer', 'https://indown.io/en1');
            params.append('locale', 'en');
            params.append('_token', token);
            params.append('link', url);
            params.append('p', 'i');

            const { data: resultData } = await axios.post('https://indown.io/download', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': cookies,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
                }
            });
            
            const $result = cheerio.load(resultData);
            let videoUrl = null;
            
            // Ambil video dari source
            $result('video source[src]').each((i, e) => {
                let link = $result(e).attr('src');
                if (link && !videoUrl) videoUrl = link;
            });
            
            // Ambil video dari tag video
            if (!videoUrl) {
                $result('video').each((i, e) => {
                    let link = $result(e).attr('src');
                    if (link && !videoUrl) videoUrl = link;
                });
            }
            
            // Ambil dari link download
            if (!videoUrl) {
                $result('a[href*="indown.io/fetch"]').each((i, e) => {
                    let link = $result(e).attr('href');
                    if (link && link.includes('indown.io/fetch')) {
                        try {
                            const decoded = decodeURIComponent(new URL(link).searchParams.get('url'));
                            if (decoded && /\.(mp4|mov|avi|mkv)$/i.test(decoded)) {
                                videoUrl = decoded;
                            }
                        } catch (err) {}
                    }
                });
            }
            
            if (!videoUrl) {
                throw new Error('Video tidak ditemukan');
            }
            
            return { 
                status: true, 
                video: videoUrl
            };
            
        } catch (e) {
            return { status: false, message: e.message };
        }
    }
    
    try {
        const result = await indown(text);
        
        if (!result.status) {
            throw new Error(result.message || 'Gagal mengambil video');
        }
        
        // Kirim video
        await satanic.sendMessage(m.chat, {
            video: { url: result.video },
            caption: '📹 Video Instagram'
        }, { quoted: fkontak });
        
        await satanic.sendMessage(m.chat, { 
            react: { text: '✅', key: m.key } 
        });
        
    } catch (err) {
        console.error(err);
        reply(`❌ Gagal mengunduh: ${err.message || 'Link mungkin private atau invalid'}`);
        await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
}
break;
case 'instagram':
case 'igdl':
case 'ig': {
    if (!text) return reply('Masukkan URL Instagramnya!\n\nContoh: .ig https://www.instagram.com/reel/xxx')
  await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    const apiUrl = `https://free-restapi.biz.id/api/igdl?url=${encodeURIComponent(text)}&apikey=${global.sakey}`
    const response = await axios.get(apiUrl)   
    const data = response.data
    const urls = data.url
    const metadata = data.metadata   
    let info = `INSTAGRAM VIDEO DOWNLOADER\n\n`
    for (let url of urls) {
        await satanic.sendMessage(m.chat, { 
            video: { url: url }, 
            caption: info 
        }, { quoted: fkontak })
    }
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
break

case 'igmp3':
case 'igaudio': {
    if (!text) return reply('Masukkan URL Instagramnya!\n\nContoh: .igmp3 https://www.instagram.com/reel/xxx')
  await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    const apiUrl = `https://free-restapi.biz.id/api/igdl?url=${encodeURIComponent(text)}&apikey=${global.sakey}`
    const response = await axios.get(apiUrl)   
    const data = response.data
    const urls = data.url
    const metadata = data.metadata   
    let info = `INSTAGRAM VIDEO DOWNLOADER\n\n`
    for (let url of urls) {
        await satanic.sendMessage(m.chat, { 
            audio: { url: url }, 
            mimetype: 'audio/mpeg',
            caption: info 
        }, { quoted: fkontak })
    }
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
break
case 'fbdl':
case 'fb': {
    if (!text) return reply('Masukkan URL Facebooknya!\n\nContoh: .fb https://www.facebook.com/xxx')
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })  
    const apiUrl = `https://free-restapi.biz.id/api/fbdl?url=${encodeURIComponent(text)}&apikey=${global.sakey}`
    const response = await axios.get(apiUrl)    
    if (response.data.status !== 200) {
        return reply('Gagal mengambil data dari Facebook')
    }
    const result = response.data.result
    let info = `FACEBOOK DOWNLOADER\n\n`
    info += `Title: ${result.title}\n`
    info += `Project By: ${namaBot}`
    await satanic.sendMessage(m.chat, { 
        video: { url: result.hd }, 
        caption: info 
    }, { quoted: fkontak })
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
break
case 'videydl':
case 'videy': {
  async function videydl(url) {
    try {
      const objcturl = new URL(url);
      const videoId = objcturl.searchParams.get('id');
      if (!videoId) throw new Error('Invalid Videy URL');
      const ext = videoId.length === 9 && videoId[8] === '2' ? '.mov' : '.mp4';
      const urlvideo = `https://cdn.videy.co/${videoId}${ext}`;
      return urlvideo;
    } catch (error) {
      throw new Error(`Download failed: ${error.message}`);
    }
  }
  let url = text || (m.quoted && m.quoted.text);
  if (!url) {
    return reply(`⚠️ *Cara penggunaan:*\n\nKirim link Videy:\n>.videy https://videy.co/xxx\n\nAtau reply pesan yang berisi link Videy`);
  }
  try {
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    const videoUrl = await videydl(url);
    await satanic.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: `> *Video berhasil diunduh*\n🔗 Link: ${url}`
    }, { quoted: fkontak });
    
  } catch (error) {
    console.error('[Videy Error]:', error);
    reply(`❌ *Gagal mengunduh:*\n${error.message}`);
  }
  break;
}
case 'twitter':
case 'tw':
case 'x': {
    if (!text) return reply('Masukkan URL Twitter/X nya!\n\nContoh: .twitter https://twitter.com/xxx/status/xxx')
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    const apiUrl = `https://free-restapi.biz.id/api/twitter?url=${encodeURIComponent(text)}&apikey=${global.sakey}`
    const response = await axios.get(apiUrl)
    if (response.data.status !== 200) {
        return reply('Gagal mengambil data dari Twitter')
    }
    const result = response.data.result
    if (result.type !== 'video') {
        return reply('URL ini bukan video Twitter')
    }
    const videoUrl = result.variants[0]
    await satanic.sendMessage(m.chat, { 
        video: { url: videoUrl },
        caption: result.full_text ? result.full_text : ''
    }, { quoted: fkontak })
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
break
case 'scdl':
case 'soundcloud': {
    if (!text) return reply('Masukkan URL SoundCloudnya!\n\nContoh: .scdl https://soundcloud.com/xxx/xxx')
    await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    const apiUrl = `https://free-restapi.biz.id/api/scdl?url=${encodeURIComponent(text)}&apikey=${global.sakey}`
    const response = await axios.get(apiUrl)
    if (!response.data.success) {
        return reply('Gagal mengambil data dari SoundCloud')
    }
    const result = response.data
    const audioUrl = result.audioUrl
    const title = result.title
    const audioBuffer = await axios.get(audioUrl, { 
        responseType: 'arraybuffer'
    })
    await satanic.sendMessage(m.chat, { 
        audio: audioBuffer.data,
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`
    }, { quoted: fkontak })
    
    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}
break
case 'ttmp3':
case 'tiktokmp3': {
if (!text) return reply('Masukkan URL TikTok!\n\nContoh: .ttmp3 https://www.tiktok.com/@username/video/xxx');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
const apiUrl = `https://free-restapi.biz.id/api/ttdl?url=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (response.data.status !== 200) {
return reply('Gagal mengambil data dari TikTok');
}
const result = response.data.result;
const videoUrl = result.videos.find(v => v.type === 'nowatermark')?.url || result.videos[0]?.url;
await satanic.sendMessage(m.chat, {
audio: { url: videoUrl },
mimetype: 'audio/mpeg'
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;

case 'mediafire':
case 'mediafiredl': {
if (!text || !text.includes("mediafire.com"))
return reply(`📌 Contoh penggunaan:\n${prefix + command} https://www.mediafire.com/file/abc123/example.zip/file`);
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
const cheerio = require("cheerio");
const mime = require("mime-types");
const fs = require("fs");
const path = require("path");
async function getDirectMediaFireLink(pageUrl) {
try {
const res = await fetch(pageUrl);
const html = await res.text();
const $ = cheerio.load(html);
const directLink = $("a#downloadButton").attr("href");
const fileName = $("div.filename").text().trim() || "mediafire_file";
if (!directLink) throw new Error("Link unduhan tidak ditemukan.");
return { fileName, directLink };
} catch (err) {
return { error: true, message: err.message };
}
}
function getFileType(mimeType) {
if (mimeType.startsWith('image/')) return 'image';
if (mimeType.startsWith('video/')) return 'video';
if (mimeType.startsWith('audio/')) return 'audio';
return 'document';
}
try {
const result = await getDirectMediaFireLink(text.trim());
if (!result || result.error || !result.directLink) {
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
return reply(`❌ Gagal mengambil link download.\n${result?.message || "Link tidak valid atau server error."}`);
}
const fileName = result.fileName;
const fileUrl = result.directLink;
const mimeType = mime.lookup(fileName) || "application/octet-stream";
const fileType = getFileType(mimeType);
const caption = `📦 *MediaFire Downloader*\n\n📁 *Nama File:* ${fileName}\n✅ *Status:* Siap diunduh`;
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
const safeName = fileName.replace(/[^a-z0-9._-]/gi, "_");
const tempPath = path.join(tempDir, `mf_${Date.now()}_${safeName}`);
const res = await fetch(fileUrl);
if (!res.ok) throw new Error("Gagal mengunduh file dari MediaFire.");
const fileStream = fs.createWriteStream(tempPath);
await new Promise((resolve, reject) => {
res.body.pipe(fileStream);
res.body.on("error", reject);
fileStream.on("finish", resolve);
});
const buffer = fs.readFileSync(tempPath);
if (fileType === 'image') {
await satanic.sendMessage(m.chat, {
image: buffer,
caption: caption,
mimetype: mimeType
}, { quoted: fkontak });
}
else if (fileType === 'video') {
await satanic.sendMessage(m.chat, {
video: buffer,
caption: caption,
mimetype: mimeType
}, { quoted: fkontak });
}
else if (fileType === 'audio') {
await satanic.sendMessage(m.chat, {
audio: buffer,
mimetype: mimeType,
ptt: false
}, { quoted: fkontak });
}
else {
await satanic.sendMessage(m.chat, {
document: buffer,
fileName: fileName,
mimetype: mimeType,
caption: caption
}, { quoted: fkontak });
}
fs.unlinkSync(tempPath);
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
reply(`❌ Gagal mengirim file:\n${err.message}`);
}
break;
}
case 'git':
case 'github':
case 'gitclone': {
if (!args[0]) return reply(`Mana linknya?\nExample :\n${prefix}${command} https://github.com/DGXeon/XeonMedia`);
if (!isUrl(args[0]) && !args[0].includes('github.com')) return reply(`Link invalid!!`);
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
let [, user, repo] = args[0].match(regex1) || [];
repo = repo.replace(/.git$/, '');
let url = `https://api.github.com/repos/${user}/${repo}/zipball`;
let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1];
satanic.sendMessage(m.chat, { document: { url: url }, fileName: filename+'.zip', mimetype: 'application/zip' }, { quoted: fkontak });
}
break;

case 'capcut':
case 'cc': {
if (!text) return reply('Masukkan URL CapCutnya!\n\nContoh: .capcut https://www.capcut.com/t/xxx');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
const apiUrl = `https://free-restapi.biz.id/api/capcut?url=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (!response.data.success) {
return reply('Gagal mengambil data dari CapCut');
}
const result = response.data;
let info = `CAPCUT DOWNLOADER\n\n`;
info += `Title: ${result.title}\n`;
info += `Author: ${result.author}\n`;
info += `Project By: ${namaBot}`;
await satanic.sendMessage(m.chat, {
video: { url: result.videoUrl },
caption: info
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;
case 'terabox':
case 'teraboxdl': {
if (!text) return reply('Masukkan URL Teraboxnya!\n\nContoh: .terabox https://www.terabox.com/xxx');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
const apiUrl = `https://free-restapi.biz.id/api/terabox?url=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (response.data.status !== 200) {
return reply('Gagal mengambil data dari Terabox');
}
const result = response.data.result;
const file = result.list[0];
let info = `TERABOX DOWNLOADER\n\n`;
info += `Name: ${file.name}\n`;
info += `Size: ${file.size_formatted}\n`;
info += `Type: ${file.type}\n`;
info += `Duration: ${file.duration}\n`;
info += `Quality: ${file.quality}\n`;
info += `Project By: ${namaBot}`;
const zipUrl = file.zip_dlink;
await satanic.sendMessage(m.chat, {
document: { url: zipUrl },
mimetype: 'application/zip',
fileName: `${file.name}.zip`,
caption: info
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;

case 'spotify':
case 'spotifydl': {
if (!text) return reply('Masukkan URL Spotifynya!\n\nContoh: .spotify https://open.spotify.com/track/xxx');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/spotifydl?url=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const { data } = await axios.get(apiUrl);
if (!data.status || !data.download_url) {
return reply('Gagal mendapatkan link download.');
}
const proxyUrl = `https://cloudflare-cors-anywhere.supershadowcube.workers.dev/?url=${encodeURIComponent(data.download_url)}`;
const audioResponse = await axios.get(proxyUrl, {
responseType: 'arraybuffer'
});
const imageResponse = await axios.get(data.track.cover, {
responseType: 'arraybuffer'
});
await satanic.sendMessage(m.chat, {
image: imageResponse.data,
caption: `🎵 *${data.track.title}*\n👤 ${data.track.artist}\n⏱ ${data.track.duration}`,
mimetype: 'image/jpeg'
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, {
audio: audioResponse.data,
mimetype: 'audio/mpeg'
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (error) {
console.error(error);
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
reply('Terjadi kesalahan: ' + error.message);
}
}
break;


//////// TOOLS MENU ////
case 'skiplink':
case 'bypass':
case 'bpass': {
if (!text) return reply('Masukkan URL yang ingin di-bypass!\n\nContoh: .skiplink https://sfl.gl/ntCx0RF');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://www.free-restapi.biz.id/api/skiplink-bypass2?url=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (!response.data.success) return reply('Gagal melakukan bypass link.');
const result = response.data;
const destUrl = result.destination || result.data?.result;
let info = `SKIPLINK BYPASS\n\n`;
info += `Original: ${result.originalUrl || text}\n`;
info += `Link yang sudah bypass: ${destUrl || '-'}\n`;
await reply(info);
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
reply('Terjadi kesalahan saat melakukan bypass link.');
}
}
break;
case 'skiplink2':
case 'bypass2':
case 'bpass2': {
if (!text) return reply('Masukkan URL yang ingin di-bypass!\n\nContoh: .skiplink2 https://sfl.gl/ntCx0RF');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://www.free-restapi.biz.id/api/skiplink-bypass?url=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (!response.data.success) return reply('Gagal melakukan bypass link.');
const result = response.data;
let info = `SKIPLINK BYPASS\n\n`;
info += `Original: ${result.originalUrl || text}\n`;
info += `Link yang sudah bypass: ${result.destination || '-'}\n`;
await reply(info);
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
reply('Terjadi kesalahan saat melakukan bypass link.');
}
}
break;
case 'deteksiumur':
case 'agedetection':
case 'cekumur': {
const quotedumur = m.quoted ? m.quoted : m;
const mimeumur = (quotedumur.msg || quotedumur).mimetype || '';
if (!/image/.test(mimeumur)) return reply('Kirim/reply gambar dengan caption .cekumur');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
let mediaPath = await satanic.downloadAndSaveMediaMessage(quotedumur);
let uploadResult = await UploadFileUgu(mediaPath);
let ImageUrlaja = uploadResult.url || uploadResult;
const apiUrl = `https://free-restapi.biz.id/api/age-detection?url=${encodeURIComponent(ImageUrlaja)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (response.data.success) {
const umur = response.data.umur;
await satanic.sendMessage(m.chat, {
text: `👤 *Hasil Deteksi Umur*\n\n📸 Berdasarkan foto yang dikirim, usia terdeteksi: *${umur} tahun*`,
contextInfo: { mentionedJid: [m.sender] }
}, { quoted: fkontak });
} else {
throw new Error('Gagal mendeteksi umur');
}
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('❌ Gagal mendeteksi umur. Pastikan foto wajah terlihat jelas dan coba lagi nanti.');
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
}
}
break;
case 'smeme':
case 'stickermeme':
case 'stickmeme': {
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
if (!text) return reply(`Usage: ${command} text1|text2`);
let atas = text.split('|')[0] ? text.split('|')[0] : '-';
let bawah = text.split('|')[1] ? text.split('|')[1] : '-';
const quotedloll = m.quoted ? m.quoted : m;
const mimebn = (quotedloll.msg || quotedloll).mimetype || '';
let memeUrl = '';
if (/image/.test(mimebn) || /webp/.test(mimebn)) {
let mee = await satanic.downloadAndSaveMediaMessage(quotedloll);
let mem = await UploadFileUgu(mee);
let ImageUrlaja = mem.url || mem;
memeUrl = `https://free-restapi.biz.id/api/smeme?atas=${encodeURIComponent(atas)}&bawah=${encodeURIComponent(bawah)}&background=${encodeURIComponent(ImageUrlaja)}&apikey=${global.sakey}`;
} else {
return reply(`Hanya bisa menerima gambar atau sticker`);
}
const response = await axios.get(memeUrl, { responseType: 'arraybuffer' });
await satanic.sendImageAsSticker(m.chat, response.data, m, {
packname: `satanic`
});
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;
case 'hd':
case 'enhance': {
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .hdr');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
let mee = await satanic.downloadAndSaveMediaMessage(quoted);
let mem = await UploadFileUgu(mee);
let ImageUrlaja = mem.url || mem;
const apiUrl = `https://free-restapi.biz.id/api/hd?url=${encodeURIComponent(ImageUrlaja)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
await satanic.sendMessage(m.chat, {
image: response.data,
caption: '✨ Gambar berhasil diupgrade ke HD!'
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
reply('Gagal mengupgrade gambar.');
}
}
break;
case 'hdr': {
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .hdr');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
let mee = await satanic.downloadAndSaveMediaMessage(quoted);
let mem = await UploadFileUgu(mee);
let ImageUrlaja = mem.url || mem;
const apiUrl = `https://free-restapi.biz.id/api/hdr?url=${encodeURIComponent(ImageUrlaja)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
await satanic.sendMessage(m.chat, {
image: response.data,
caption: '✨ Gambar berhasil diupgrade ke HD!'
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
reply('Gagal mengupgrade gambar.');
}
}
break; 
case 'superhd': {
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .superhd');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
let mee = await satanic.downloadAndSaveMediaMessage(quoted);
let mem = await UploadFileUgu(mee);
let ImageUrlaja = mem.url || mem;
const apiUrl = `https://free-restapi.biz.id/api/superhd?url=${encodeURIComponent(ImageUrlaja)}&apikey=${global.sakey}&size=2`;
const response = await axios.get(apiUrl, { 
responseType: 'arraybuffer',
timeout: 120000 
});
await satanic.sendMessage(m.chat, {
image: response.data,
caption: 'Gambar berhasil diupgrade ke Super HD!'
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
reply('Gagal mengupgrade gambar.');
}
}
break;
case 'reminihd':
case 'remini': {
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .remini');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
let mee = await satanic.downloadAndSaveMediaMessage(quoted);
let mem = await UploadFileUgu(mee);
let ImageUrlaja = mem.url || mem;
const apiUrl = `https://free-restapi.biz.id/api/remini-hd?url=${encodeURIComponent(ImageUrlaja)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
await satanic.sendMessage(m.chat, {
image: response.data,
caption: '✨ Gambar berhasil diremini HD!'
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
reply('Gagal mengupgrade gambar.');
}
}
break;
case 'upscale': {
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .upscale');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
let mee = await satanic.downloadAndSaveMediaMessage(quoted);
let mem = await UploadFileUgu(mee);
let ImageUrlaja = mem.url || mem;
const apiUrl = `https://free-restapi.biz.id/api/upscale?url=${encodeURIComponent(ImageUrlaja)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
await satanic.sendMessage(m.chat, {
image: response.data,
caption: '✨ Gambar berhasil diupscale!'
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Gagal mengupgrade gambar. Coba lagi nanti.');
}
}
break;

case 'esrgan':
case '4k': {
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .esrgan');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
let mee = await satanic.downloadAndSaveMediaMessage(quoted);
let mem = await UploadFileUgu(mee);
let ImageUrlaja = mem.url || mem;
const apiUrl = `https://free-restapi.biz.id/api/esrgan?url=${encodeURIComponent(ImageUrlaja)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
await satanic.sendMessage(m.chat, {
image: response.data,
caption: '✨ Gambar berhasil diupgrade ke 4K dengan ESRGAN!'
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Gagal mengupgrade gambar. Coba lagi nanti.');
}
}
break;
case 'removebg':
case 'rmbg': {
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .removebg');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
let mee = await satanic.downloadAndSaveMediaMessage(quoted);
let mem = await UploadFileUgu(mee);
let ImageUrlaja = mem.url || mem;
const apiUrl = `https://free-restapi.biz.id/api/removebg?url=${encodeURIComponent(ImageUrlaja)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
await satanic.sendMessage(m.chat, {
image: response.data,
caption: '✨ Background berhasil dihapus!'
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Gagal menghapus background. Coba lagi nanti.');
}
}
break;
case 'removebg2':
case 'rmbg2': {
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .removebg2');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
let mee = await satanic.downloadAndSaveMediaMessage(quoted);
let mem = await UploadFileUgu(mee);
let ImageUrlaja = mem.url || mem;
const apiUrl = `https://free-restapi.biz.id/api/removebg?url=${encodeURIComponent(ImageUrlaja)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
await satanic.sendMessage(m.chat, {
image: response.data,
caption: '✨ Background berhasil dihapus!'
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Gagal menghapus background. Coba lagi nanti.');
}
}
break;
case 'remowm':
case 'removewm':
case 'rwm': {
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const UA = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36";
const ORIGIN = "https://ezremove.ai";
function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}
function getMime(filePath) {
const ext = path.extname(filePath).toLowerCase();
if (ext === ".png") return "image/png";
if (ext === ".webp") return "image/webp";
if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
return "application/octet-stream";
}
async function removeWatermark(buffer, filename) {
const mime = getMime(filename);
const boundary = `----FormBoundary${Math.random().toString(36).slice(2)}`;
const body = Buffer.concat([
Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="image_file"; filename="${filename}"\r\nContent-Type: ${mime}\r\n\r\n`),
buffer,
Buffer.from(`\r\n--${boundary}--\r\n`)
]);
const create = await axios.post(
"https://api.ezremove.ai/api/ez-remove/watermark-remove/create-job",
body,
{
headers: {
"User-Agent": UA,
"Accept": "application/json, text/plain, */*",
"Origin": ORIGIN,
"Referer": `${ORIGIN}/`,
"product-serial": `sr-${Date.now()}`,
"Content-Type": `multipart/form-data; boundary=${boundary}`,
"Content-Length": body.length
},
timeout: 30000,
validateStatus: () => true,
maxBodyLength: Infinity,
maxContentLength: Infinity
}
);
if (create.status < 200 || create.status >= 300) {
throw { code: create.status };
}
const jobId = create.data?.result?.job_id;
if (!jobId) {
throw { code: create.status };
}
for (let i = 0; i < 30; i++) {
await sleep(2000);
const check = await axios.get(
`https://api.ezremove.ai/api/ez-remove/watermark-remove/get-job/${jobId}`,
{
headers: {
"User-Agent": UA,
"Accept": "application/json, text/plain, */*",
"Origin": ORIGIN,
"Referer": `${ORIGIN}/`,
"product-serial": `sr-${Date.now()}`
},
timeout: 15000,
validateStatus: () => true
}
);
if (check.status < 200 || check.status >= 300) {
throw { code: check.status };
}
const resultUrl = check.data?.result?.output?.[0];
if (check.data?.code === 100000 && resultUrl) {
return resultUrl;
}
if (check.data?.code !== 300001) {
throw { code: check.status };
}
}
throw { code: 202 };
}
const quoted = m.quoted || m;
const mimeType = (quoted.msg || quoted).mimetype || '';
const isImage = /image\/(jpe?g|png|webp)/i.test(mimeType);
if (!isImage) {
return reply(`REMOVE WATERMARK\n\nCara pakai:\nReply gambar .remowm\n\nContoh:\nReply gambar dengan caption .remowm\n\nSupport JPG, PNG, WEBP\nProses membutuhkan waktu 30-60 detik`);
}
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
let buffer;
let filename = 'image.jpg';
try {
buffer = await quoted.download();
const ext = mimeType.split('/')[1] || 'jpg';
filename = `image.${ext}`;
} catch (e) {
const mediaPath = await satanic.downloadAndSaveMediaMessage(quoted);
buffer = fs.readFileSync(mediaPath);
filename = path.basename(mediaPath);
fs.unlinkSync(mediaPath);
}
if (!buffer) throw new Error('Gagal mengunduh gambar');
await satanic.sendMessage(m.chat, {
text: 'Sedang menghapus watermark... Mohon tunggu 30-60 detik.'
}, { quoted: m });
const resultUrl = await removeWatermark(buffer, filename);
const imageRes = await axios.get(resultUrl, {
responseType: 'arraybuffer'
});
await satanic.sendMessage(m.chat, {
image: Buffer.from(imageRes.data),
caption: `Watermark berhasil dihapus!`
}, { quoted: m });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error('[REMOWM]', err);
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
let errorMsg = 'Coba lagi nanti';
if (err.code === 202) {
errorMsg = 'Timeout! Server terlalu lama merespon.';
} else if (err.code === 429) {
errorMsg = 'Terlalu banyak request! Tunggu beberapa saat.';
} else if (err.code) {
errorMsg = `Error ${err.code}`;
}
reply(`Gagal menghapus watermark: ${errorMsg}`);
}
}
break;
case 'xo':
case 'tictactoe':
case 'ttt':
case 'tic':
case 'xogame': {
  try {
    const html = String.raw`
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>Aqua Ai Tic Tac Toe</title>
<style>
:root{--bg:#151816;--bg2:#1b1e1a;--panel:#232722;--panel2:#292e28;--panel3:#30362f;--line:#414840;--ink:#e1e2d9;--muted:#969e95;--olive:#a7b59f;--olive2:#3f4b41;--bronze:#8e7757;--bronze2:#5b4c3a;--board:#514432;--cell:#d0c4a8;--cell2:#bdb091;--x:#718b7b;--o:#b77d69;--gold:#b79b61;--shadow:#0b0d0c}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{margin:0;min-height:100%;background:radial-gradient(circle at 50% -20%,#2a3029 0,#1c201d 34%,#141715 72%);color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif}
body{padding:10px}.app{width:min(100%,560px);margin:auto}
.header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:9px}.brand{display:flex;align-items:center;gap:10px;min-width:0}.mark{width:44px;height:44px;flex:0 0 auto;border-radius:13px;display:grid;place-items:center;background:linear-gradient(145deg,#343a33,#222720);border:1px solid #454c44;box-shadow:6px 6px 12px var(--shadow),-3px -3px 8px #33392f;color:#ddd9cb;font:500 21px/1 Georgia,"Times New Roman",serif}.title{font-size:20px;font-weight:900;letter-spacing:-.35px}.sub{margin-top:2px;color:var(--muted);font-size:9.5px;line-height:1.35}.status{padding:7px 9px;border-radius:11px;border:1px solid var(--line);background:linear-gradient(145deg,#2c322c,#20251f);box-shadow:4px 4px 8px var(--shadow),-2px -2px 6px #30352e;font-size:9px;font-weight:900;white-space:nowrap}
.topControls{display:grid;grid-template-columns:minmax(0,1fr) minmax(145px,.72fr);gap:7px;margin-bottom:8px}.select,.btn{width:100%;min-height:42px;border:1px solid var(--line);border-radius:12px;background:linear-gradient(145deg,#2b302a,#20241f);color:var(--ink);font:800 10.5px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;outline:0;box-shadow:4px 4px 8px var(--shadow),-2px -2px 6px #30352e}.select{padding:0 10px}.btn{padding:0 10px;cursor:pointer;touch-action:manipulation}.btn:active{transform:translateY(1px);box-shadow:inset 2px 2px 5px #121512,inset -2px -2px 4px #343a32}.btn.primary{background:linear-gradient(145deg,#3b4840,#2a322c);border-color:#56655b;color:#e4eadf}.btn.olive{background:linear-gradient(145deg,#344039,#273129);border-color:#4a5b50}.btn.warm{background:linear-gradient(145deg,#4a3c31,#352c25);border-color:#635145}
.game{padding:10px;border:1px solid #394038;border-radius:18px;background:linear-gradient(145deg,rgba(43,48,42,.97),rgba(31,35,30,.98));box-shadow:9px 10px 22px var(--shadow),-4px -4px 10px #2b302a}
.roundLine{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:0 2px 8px}.round{display:flex;align-items:center;gap:7px;text-transform:uppercase;letter-spacing:.7px;font-size:9px;font-weight:950}.dot{width:8px;height:8px;border-radius:50%;background:var(--olive);box-shadow:0 0 0 4px #354137}.turn{font-size:9px;color:var(--muted);text-align:right}
.boardFrame{width:min(100%,470px);margin:auto;padding:9px;border:1px solid #79674e;border-radius:18px;background:linear-gradient(145deg,#68563f,#463a2d);box-shadow:inset 2px 2px 4px #7b694f,inset -3px -3px 6px #362d22,8px 10px 18px #11140f}.board{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;padding:7px;width:100%;aspect-ratio:1;border-radius:13px;background:linear-gradient(145deg,#4d3f30,#5b4937);box-shadow:inset 3px 3px 7px #33291f,inset -2px -2px 5px #6a5641}.cell{position:relative;display:grid;place-items:center;min-width:0;border:1px solid #94876f;border-radius:11px;background:linear-gradient(145deg,var(--cell),var(--cell2));box-shadow:4px 4px 7px #392f26,-2px -2px 5px #79674f;cursor:pointer;touch-action:manipulation;transition:transform .1s ease,filter .1s ease,box-shadow .1s ease}.cell:active{transform:translateY(1px);box-shadow:2px 2px 4px #392f26,-1px -1px 3px #79674f}.cell.locked{cursor:default}.cell.empty .symbol{opacity:0}.cell.x{color:var(--x)}.cell.o{color:var(--o)}.symbol{font:500 clamp(39px,13vw,72px)/.9 Georgia,"Times New Roman",serif;text-shadow:0 1px 0 #eee5d2,0 2px 2px #8f836c}.cell.win{filter:saturate(1.08);box-shadow:inset 0 0 0 2px var(--gold),4px 4px 7px #392f26,-2px -2px 5px #79674f}.cell.hint{box-shadow:inset 0 0 0 2px var(--olive),4px 4px 7px #392f26,-2px -2px 5px #79674f}.cell[data-num]:before{content:attr(data-num);position:absolute;top:5px;left:6px;color:#756b59;font:800 7px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;opacity:.75}
.score{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:8px}.stat{min-width:0;padding:8px 5px;border:1px solid var(--line);border-radius:12px;background:linear-gradient(145deg,#2e342e,#222722);box-shadow:3px 3px 7px var(--shadow),-2px -2px 5px #31372f;text-align:center}.stat b{display:block;font-size:15px;line-height:1.05}.stat span{display:block;margin-top:3px;color:var(--muted);font-size:7px;text-transform:uppercase;letter-spacing:.55px}
.turnBar{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:8px}.player{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:9px 10px;border-radius:12px;border:1px solid var(--line);background:linear-gradient(145deg,#2d332d,#232823);box-shadow:3px 3px 7px var(--shadow),-2px -2px 5px #31372f}.player.active{border-color:#5b6d60;box-shadow:inset 0 0 0 1px #536358,3px 3px 7px var(--shadow),-2px -2px 5px #31372f}.pname{font-size:9.5px;font-weight:900}.psub{margin-top:3px;color:var(--muted);font-size:7.8px}.badge{width:27px;height:27px;border-radius:9px;display:grid;place-items:center;font:900 11px/1 Georgia,"Times New Roman",serif;box-shadow:inset 1px 1px 2px #3b4039,inset -1px -1px 2px #171a16}.badge.x{background:#3e5146;color:#dce8de}.badge.o{background:#5a4139;color:#f1ddd5}
details.tools{margin-top:8px;border:1px solid var(--line);border-radius:12px;background:linear-gradient(145deg,#2c312c,#222721);box-shadow:3px 3px 7px var(--shadow),-2px -2px 5px #31372f;overflow:hidden}details.tools summary{list-style:none;cursor:pointer;padding:10px 11px;font-size:9px;font-weight:900;user-select:none}details.tools summary::-webkit-details-marker{display:none}.toolBody{padding:0 9px 9px;display:grid;grid-template-columns:repeat(2,1fr);gap:7px}.toolBody .btn{min-height:39px;font-size:9px;box-shadow:3px 3px 6px var(--shadow),-2px -2px 4px #30362f}.note{margin-top:8px;padding:8px 9px;border:1px solid #3e453d;border-radius:11px;background:#20251f;color:#929a92;text-align:center;font-size:8px;line-height:1.4}
.overlay{position:fixed;inset:0;z-index:30;display:none;align-items:center;justify-content:center;padding:15px;background:rgba(9,11,9,.78)}.overlay.show{display:flex}.modal{width:min(92vw,400px);padding:18px;border:1px solid #4a5149;border-radius:18px;background:linear-gradient(145deg,#30362f,#20251f);box-shadow:10px 12px 25px #080908,-5px -5px 12px #343a32;text-align:center}.modalIcon{width:58px;height:58px;margin:0 auto 8px;border-radius:17px;display:grid;place-items:center;background:linear-gradient(145deg,#3d463d,#283028);border:1px solid #4c574e;box-shadow:6px 6px 11px var(--shadow),-3px -3px 8px #3a4038;font:500 34px/1 Georgia,"Times New Roman",serif}.modal h2{margin:3px 0;font-size:22px}.modal p{margin:7px 0 13px;color:var(--muted);font-size:9.5px;line-height:1.45}.result{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-bottom:11px}.result div{padding:8px;border:1px solid var(--line);border-radius:11px;background:linear-gradient(145deg,#2e342e,#222722)}.result b{display:block;font-size:15px}.result span{font-size:7.5px;color:var(--muted);text-transform:uppercase}.modalBtns{display:grid;grid-template-columns:1fr 1fr;gap:7px}.toast{position:fixed;left:50%;bottom:76px;z-index:40;max-width:88vw;padding:8px 10px;border:1px solid #4a5249;border-radius:10px;background:#282e28;color:#e4e5de;font-size:8.5px;font-weight:900;box-shadow:6px 7px 12px #090b09,-3px -3px 7px #353b34;transform:translate(-50%,10px);opacity:0;pointer-events:none;transition:opacity .12s ease,transform .12s ease}.toast.show{opacity:1;transform:translate(-50%,0)}
@media(max-width:420px){body{padding:7px}.header{gap:8px}.mark{width:41px;height:41px}.title{font-size:18px}.sub{font-size:8.7px}.status{font-size:8px;padding:7px 8px}.game{padding:8px;border-radius:16px}.boardFrame{padding:8px;border-radius:16px}.board{gap:6px;padding:6px}.cell{border-radius:10px}.score,.turnBar,.toolBody{gap:6px}.stat{padding:7px 4px}.stat span{font-size:6.6px}.player{padding:8px 9px}.pname{font-size:9px}.psub{font-size:7.2px}}
@media(max-width:340px){.topControls{grid-template-columns:1fr}.status{display:none}.score{grid-template-columns:1fr 1fr}.turnBar{grid-template-columns:1fr}.toolBody{grid-template-columns:1fr}.title{font-size:17px}}
@media(prefers-reduced-motion:reduce){*{transition:none!important}}
</style>
</head>
<body>
<div class="app">
<div class="header"><div class="brand"><div class="mark">✕○</div><div><div class="title">Tic Tac Toe</div><div class="sub">Ruang kecil, papan tegas, langkah tanpa ramai.</div></div></div><div class="status" id="status">Giliran X</div></div>
<div class="topControls"><select id="mode" class="select" aria-label="Mode permainan"><option value="easy">Santai · Aqua mudah</option><option value="normal" selected>Seimbang · Aqua normal</option><option value="hard">Tajam · Aqua sulit</option><option value="pvp">2 Pemain · Lokal</option></select><button id="newGame" class="btn primary" type="button">＋ Permainan Baru</button></div>
<div class="game">
<div class="roundLine"><div class="round"><span class="dot"></span><span id="roundText">Ronde 1</span></div><div class="turn" id="turnText">X sedang bermain</div></div>
<div class="boardFrame"><div id="board" class="board" aria-label="Papan Tic Tac Toe"></div></div>
<div class="score"><div class="stat"><b id="scoreX">0</b><span>X Menang</span></div><div class="stat"><b id="scoreO">0</b><span>O Menang</span></div><div class="stat"><b id="scoreD">0</b><span>Seri</span></div><div class="stat"><b id="moves">0</b><span>Langkah</span></div></div>
<div class="turnBar"><div class="player active" id="playerX"><div><div class="pname" id="nameX">Kamu</div><div class="psub" id="subX">Giliran aktif</div></div><div class="badge x">X</div></div><div class="player" id="playerO"><div><div class="pname" id="nameO">Aqua</div><div class="psub" id="subO">Menunggu</div></div><div class="badge o">O</div></div></div>
<details class="tools"><summary>Pengaturan & alat</summary><div class="toolBody"><button id="undo" class="btn olive" type="button">↶ Urungkan</button><button id="swap" class="btn" type="button">⇄ Tukar Sisi</button><button id="hint" class="btn" type="button">◌ Petunjuk</button><button id="sound" class="btn warm" type="button">♪ Suara: Mati</button><button id="resetScore" class="btn" type="button">↻ Reset Skor</button></div></details>
<div class="note" id="note">Tap kotak kosong untuk bermain. 1–9 dari keyboard juga bisa dipakai.</div>
</div>
</div>
<div id="overlay" class="overlay" role="dialog" aria-modal="true" aria-labelledby="resultTitle"><div class="modal"><div class="modalIcon" id="resultIcon">✕</div><h2 id="resultTitle">Selesai</h2><p id="resultText">Ronde selesai.</p><div class="result"><div><b id="resultX">0</b><span>X</span></div><div><b id="resultO">0</b><span>O</span></div><div><b id="resultDraw">0</b><span>Seri</span></div></div><div class="modalBtns"><button id="playAgain" class="btn primary" type="button">Main Lagi</button><button id="closeModal" class="btn" type="button">Tutup</button></div></div></div>
<div id="toast" class="toast" aria-live="polite"></div>
<script>
const $=id=>document.getElementById(id);const boardEl=$('board'),modeEl=$('mode'),statusEl=$('status'),roundText=$('roundText'),turnText=$('turnText'),scoreXEl=$('scoreX'),scoreOEl=$('scoreO'),scoreDEl=$('scoreD'),movesEl=$('moves'),nameXEl=$('nameX'),nameOEl=$('nameO'),subXEl=$('subX'),subOEl=$('subO'),playerXEl=$('playerX'),playerOEl=$('playerO'),noteEl=$('note'),overlay=$('overlay'),resultIcon=$('resultIcon'),resultTitle=$('resultTitle'),resultText=$('resultText'),resultX=$('resultX'),resultO=$('resultO'),resultDraw=$('resultDraw'),toast=$('toast');
const WIN_LINES=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];const SCORE_KEY='aqua-ttt-score-v2',SETTINGS_KEY='aqua-ttt-settings-v2';let board=Array(9).fill(''),turn='X',human='X',ai='O',mode='normal',round=0,history=[],gameOver=false,busy=false,winningLine=[],hintCell=-1,soundOn=false,audioCtx=null,score={X:0,O:0,D:0},gameToken=0,aiTimer=null;
function loadState(){try{const saved=JSON.parse(localStorage.getItem(SCORE_KEY)||'null');if(saved&&Number.isFinite(saved.X)&&Number.isFinite(saved.O)&&Number.isFinite(saved.D))score={X:Math.max(0,saved.X),O:Math.max(0,saved.O),D:Math.max(0,saved.D)};const cfg=JSON.parse(localStorage.getItem(SETTINGS_KEY)||'null');if(cfg&&['easy','normal','hard','pvp'].includes(cfg.mode))mode=cfg.mode;if(cfg&&['X','O'].includes(cfg.human))human=cfg.human;soundOn=Boolean(cfg&&cfg.soundOn)}catch{score={X:0,O:0,D:0}}
}
function saveState(){try{localStorage.setItem(SCORE_KEY,JSON.stringify(score));localStorage.setItem(SETTINGS_KEY,JSON.stringify({mode,human,soundOn}))}catch{}}
function opponent(p){return p==='X'?'O':'X'}function emptyCells(b){const out=[];for(let i=0;i<9;i++)if(!b[i])out.push(i);return out}
function checkResult(b){for(const line of WIN_LINES){const[a,c,d]=line;if(b[a]&&b[a]===b[c]&&b[a]===b[d])return{winner:b[a],line}}return emptyCells(b).length?null:{winner:'D',line:[]}}
function lineFor(b,p){for(const line of WIN_LINES){const[a,c,d]=line;const vals=[b[a],b[c],b[d]];if(vals.filter(v=>v===p).length===2&&vals.filter(v=>v==='').length===1)return line.find(i=>!b[i])}return-1}
function winningMove(b,p){return lineFor(b,p)}function centerOrCorner(b){if(!b[4])return 4;const corners=[0,2,6,8].filter(i=>!b[i]);if(corners.length)return corners[Math.floor(Math.random()*corners.length)];return emptyCells(b)[0]??-1}
function minimax(b,player,depth,alpha,beta){const result=checkResult(b);if(result){if(result.winner===ai)return 10-depth;if(result.winner===human)return depth-10;return 0}const moves=emptyCells(b);if(!moves.length)return 0;if(player===ai){let best=-Infinity;for(const move of moves){b[move]=ai;best=Math.max(best,minimax(b,human,depth+1,alpha,beta));b[move]='';alpha=Math.max(alpha,best);if(beta<=alpha)break}return best}let best=Infinity;for(const move of moves){b[move]=human;best=Math.min(best,minimax(b,ai,depth+1,alpha,beta));b[move]='';beta=Math.min(beta,best);if(beta<=alpha)break}return best}
function bestMove(b){const moves=emptyCells(b);if(!moves.length)return-1;let bestScore=-Infinity,best=moves[0];for(const move of moves){b[move]=ai;const value=minimax(b,human,0,-Infinity,Infinity);b[move]='';if(value>bestScore){bestScore=value;best=move}}return best}
function chooseAiMove(){const empty=emptyCells(board);if(!empty.length)return-1;if(mode==='easy'){const win=winningMove(board,ai);if(win>=0&&Math.random()<.62)return win;const block=winningMove(board,human);if(block>=0&&Math.random()<.48)return block;return empty[Math.floor(Math.random()*empty.length)]}if(mode==='normal'){const win=winningMove(board,ai);if(win>=0)return win;const block=winningMove(board,human);if(block>=0)return block;if(!board[4])return 4;return centerOrCorner(board)}return bestMove(board)}
function aiMove(){if(gameOver||busy||mode==='pvp'||turn!==ai)return;busy=true;hintCell=-1;render();const token=gameToken,move=chooseAiMove();window.clearTimeout(aiTimer);aiTimer=window.setTimeout(()=>{if(token!==gameToken){busy=false;render();return}if(!gameOver&&turn===ai&&move>=0&&board[move]==='')place(move,ai,true);busy=false;render()},mode==='hard'?110:75)}
function place(index,player,fromAi=false){if(gameOver||(busy&&!fromAi)||index<0||index>8||board[index])return false;if(turn!==player)return false;history.push(board.slice());board[index]=player;hintCell=-1;playSound('move');const result=checkResult(board);if(result){winningLine=result.line;gameOver=true;if(result.winner==='D')score.D+=1;else score[result.winner]+=1;saveState();render();showResult(result.winner);return true}turn=opponent(turn);render();if(mode!=='pvp'&&turn===ai)aiMove();return true}
function determineTurn(){const x=board.filter(v=>v==='X').length,o=board.filter(v=>v==='O').length;return x===o?'X':'O'}
function undo(){if(!history.length||gameOver||busy)return;const steps=mode==='pvp'?1:Math.min(2,history.length);for(let i=0;i<steps;i++)board=history.pop();turn=determineTurn();hintCell=-1;render();showToast(steps>1?'Dua langkah diurungkan.':'Satu langkah diurungkan.')}
function newRound(){gameToken+=1;window.clearTimeout(aiTimer);aiTimer=null;board=Array(9).fill('');turn='X';ai=opponent(human);if(mode==='pvp'){human='X';ai='O'}history=[];gameOver=false;busy=false;winningLine=[];hintCell=-1;overlay.classList.remove('show');round+=1;updateNames();render();if(mode!=='pvp'&&turn===ai)aiMove()}
function toggleSides(){if(mode==='pvp'){showToast('Tukar sisi hanya tersedia saat melawan Aqua.');return}human=opponent(human);ai=opponent(human);saveState();newRound();showToast('Sisi ditukar. Kamu sekarang '+human+'.')}
function setMode(next){mode=next;if(mode==='pvp'){human='X';ai='O'}saveState();newRound();showToast(next==='pvp'?'Mode 2 pemain aktif.':'Mode '+({easy:'Santai',normal:'Seimbang',hard:'Tajam'}[next])+' aktif.')}
function resetScore(){score={X:0,O:0,D:0};saveState();render();showToast('Skor direset.')}
function giveHint(){if(gameOver||busy||turn!==human){showToast('Petunjuk tersedia saat giliran kamu.');return}let move=winningMove(board,human);if(move<0)move=winningMove(board,ai);if(move<0)move=mode==='hard'?bestMove(board):centerOrCorner(board);if(move<0){showToast('Belum ada langkah yang tersedia.');return}hintCell=move;render();showToast('Kotak berbingkai adalah petunjuk.')}
function updateNames(){nameXEl.textContent=mode==='pvp'?'Pemain X':human==='X'?'Kamu':'Aqua';nameOEl.textContent=mode==='pvp'?'Pemain O':human==='O'?'Kamu':'Aqua'}
function render(){boardEl.innerHTML='';for(let i=0;i<9;i++){const cell=document.createElement('button');cell.type='button';cell.className='cell '+(board[i]?board[i].toLowerCase():'empty');cell.dataset.pos=i;cell.dataset.num=i+1;cell.setAttribute('aria-label','Kotak '+(i+1)+(board[i]?' berisi '+board[i]:' kosong'));if(winningLine.includes(i))cell.classList.add('win');if(hintCell===i&&!board[i])cell.classList.add('hint');if(gameOver||busy||board[i]||(turn!==human&&mode!=='pvp'))cell.classList.add('locked');const symbol=document.createElement('span');symbol.className='symbol';symbol.textContent=board[i]||'';cell.appendChild(symbol);cell.addEventListener('click',()=>{if(mode==='pvp'||turn===human)place(i,turn)});boardEl.appendChild(cell)}statusEl.textContent=gameOver?'Ronde selesai':busy?'Aqua berpikir':'Giliran '+turn;turnText.textContent=gameOver?'Ronde selesai':busy?'Aqua sedang berpikir':(turn===human?'Kamu ('+turn+') sedang bermain':(mode==='pvp'?'Pemain '+turn+' sedang bermain':'Aqua ('+turn+') sedang bermain'));roundText.textContent='Ronde '+round;scoreXEl.textContent=score.X;scoreOEl.textContent=score.O;scoreDEl.textContent=score.D;movesEl.textContent=9-emptyCells(board).length;subXEl.textContent=gameOver?'Selesai':turn==='X'?'Giliran aktif':'Menunggu';subOEl.textContent=gameOver?'Selesai':turn==='O'?'Giliran aktif':'Menunggu';playerXEl.classList.toggle('active',turn==='X'&&!gameOver);playerOEl.classList.toggle('active',turn==='O'&&!gameOver);noteEl.textContent=mode==='pvp'?'Dua pemain berbagi satu perangkat.': 'Kamu bermain sebagai '+human+'. Aqua mengikuti tingkat '+({easy:'Santai',normal:'Seimbang',hard:'Tajam'}[mode])+'.';$('sound').textContent='♪ Suara: '+(soundOn?'Nyala':'Mati');$('undo').disabled=!history.length||gameOver||busy;updateNames()}
function showResult(winner){resultX.textContent=score.X;resultO.textContent=score.O;resultDraw.textContent=score.D;if(winner==='D'){resultIcon.textContent='≈';resultTitle.textContent='Seri';resultText.textContent='Semua kotak terisi. Ronde ini berakhir tanpa pemenang.';playSound('draw')}else{const who=mode==='pvp'?'Pemain '+winner:winner===human?'Kamu':'Aqua';resultIcon.textContent=winner==='X'?'✕':'○';resultTitle.textContent=who+' menang';resultText.textContent='Tiga tanda bertemu dalam satu garis. Papan siap untuk ronde berikutnya.';playSound('win')}window.setTimeout(()=>overlay.classList.add('show'),80)}
function showToast(text){toast.textContent=text;toast.classList.add('show');window.clearTimeout(showToast.timer);showToast.timer=window.setTimeout(()=>toast.classList.remove('show'),1400)}
function playSound(type){if(!soundOn)return;try{audioCtx=audioCtx||(new(window.AudioContext||window.webkitAudioContext)());if(audioCtx.state==='suspended')audioCtx.resume();const o=audioCtx.createOscillator(),g=audioCtx.createGain(),now=audioCtx.currentTime,freq=type==='win'?720:type==='draw'?430:540;o.frequency.setValueAtTime(freq,now);o.frequency.exponentialRampToValueAtTime(type==='win'?920:370,now+.08);o.type=type==='move'?'sine':'triangle';g.gain.setValueAtTime(.04,now);g.gain.exponentialRampToValueAtTime(.001,now+.11);o.connect(g);g.connect(audioCtx.destination);o.start(now);o.stop(now+.11)}catch{}}
function keyHandler(e){if(e.key>='1'&&e.key<='9'&&!gameOver&&!busy){const idx=Number(e.key)-1;if(board[idx]===''&&(mode==='pvp'||turn===human))place(idx,turn);return}if(e.key.toLowerCase()==='r')newRound();if(e.key.toLowerCase()==='u')undo();if(e.key==='Escape')overlay.classList.remove('show')}
$('newGame').onclick=newRound;$('undo').onclick=undo;$('swap').onclick=toggleSides;$('sound').onclick=()=>{soundOn=!soundOn;saveState();render();if(soundOn)playSound('move')};$('resetScore').onclick=resetScore;$('hint').onclick=giveHint;$('playAgain').onclick=newRound;$('closeModal').onclick=()=>overlay.classList.remove('show');modeEl.onchange=e=>setMode(e.target.value);document.addEventListener('keydown',keyHandler);loadState();modeEl.value=mode;updateNames();newRound();
</script>
</body>
</html>
    `;

    const responseId = `xo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const data = Buffer.from(JSON.stringify({
      response_id: responseId,
      sections: [{
        view_model: {
          primitive: {
            __typename: 'GenAIaeacdsnwHtmlPrimitive',
            payload: html,
            trusted_sources: []
          },
          __typename: 'GenAISingleLayoutViewModel'
        }
      }]
    })).toString('base64');

    await satanic.relayMessage(
      m.chat,
      {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2,
          botMetadata: {
            messageDisclaimerText: '',
            botResponseId: responseId
          }
        },
        botForwardedMessage: {
          message: {
            richResponseMessage: {
              messageType: 1,
              submessages: [{
                messageType: 2,
                messageText: '❌⭕ Tic Tac Toe · Aqua AI'
              }],
              unifiedResponse: { data },
              contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedAiBotMessageInfo: {
                  botJid: '867051314767696@bot'
                },
                forwardOrigin: 4
              }
            }
          }
        }
      },
      { messageId: responseId }
    );

  } catch (error) {
    console.error('[XO ERROR]', error);
    await satanic.sendMessage(m.chat, {
      text: '❌ Gagal membuka game Tic Tac Toe.\n\nError: ' + error.message
    }, { quoted: m });
  }
}
break;
case 'tebakangka':
case 'togel':
case 'tebaktogel': {
  try {
    const html = String.raw`
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>Whisper · Togel Kocok vs Aqua</title>
<style>
  * { box-sizing: border-box; user-select: none; -webkit-tap-highlight-color: transparent; }
  html, body { height: 100%; margin: 0; }
  body {
    background: radial-gradient(circle at 50% 0%, #2f1a1a 0%, #0d0f1a 70%);
    display: flex; justify-content: center; align-items: flex-start;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    touch-action: manipulation; padding: 6px;
  }
  .wrapper {
    background: linear-gradient(145deg, #2f1a1a, #1a0f0f);
    padding: 1.5rem 0.9rem 1rem; border-radius: 1.6rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), inset 0 0 0 2px #7a3a3a;
    border: 3px solid #5a2a2a; max-width: 400px; width: 100%;
    position: relative; margin-top: 12px;
  }
  .wrapper::before {
    content: '🎰 T O G E L  K O C O K';
    position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
    background: #2f1a1a; color: #ffd166; padding: 3px 12px;
    font-size: 0.6rem; letter-spacing: 2px; border-radius: 30px;
    border: 2px solid #8a4a4a; text-shadow: 0 0 12px #ffd166;
    font-weight: bold; white-space: nowrap;
  }
  .level-bar { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; margin-bottom: 0.6rem; }
  .level-btn {
    background: #1a0f0f; color: #8a6a6a; border: 2px solid #4a2a2a;
    border-radius: 8px; font-size: 0.62rem; font-weight: bold;
    padding: 0.45rem 0.1rem; cursor: pointer; transition: 0.1s;
    font-family: inherit; letter-spacing: 0.5px; text-align: center; line-height: 1.3;
  }
  .level-btn:active { transform: scale(0.95); }
  .level-btn.active { background: #7a2a2a; color: #ffd0d0; border-color: #ff5a5a; box-shadow: 0 0 12px rgba(255, 90, 90, 0.6); text-shadow: 0 0 6px #ff5a5a; }
  .level-btn[data-level="2d"].active { background: #1a3a4a; border-color: #4ac8ff; color: #b0e0ff; box-shadow: 0 0 10px rgba(74, 200, 255, 0.5); }
  .level-btn[data-level="3d"].active { background: #4a3a1a; border-color: #ffd166; color: #ffe9b0; box-shadow: 0 0 10px rgba(255, 209, 102, 0.5); }
  .level-btn[data-level="4d"].active { background: #4a1a2a; border-color: #ff4a7a; color: #ffb0c8; box-shadow: 0 0 10px rgba(255, 74, 122, 0.5); }

  .rate-bar {
    background: #0a0614; border-radius: 10px; padding: 6px 8px;
    border: 1.5px solid #4a2a2a; margin-bottom: 0.6rem;
    font-size: 0.55rem; color: #8a6a6a; text-align: center;
    letter-spacing: 0.5px; font-weight: bold;
    line-height: 1.5;
  }
  .rate-bar b { color: #ffd166; text-shadow: 0 0 5px #ffd166; }

  .step-bar { display: flex; justify-content: space-between; gap: 4px; margin-bottom: 0.6rem; }
  .step {
    flex: 1; text-align: center; font-size: 0.48rem; font-weight: bold;
    letter-spacing: 0.5px; text-transform: uppercase; padding: 5px 2px;
    border-radius: 6px; background: #1a0f0f; color: #6a5a5a;
    border: 1.5px solid #3a2a2a; transition: 0.2s;
  }
  .step.active { background: #7a2a2a; color: #ffd0d0; border-color: #ff5a5a; box-shadow: 0 0 8px rgba(255, 90, 90, 0.5); }
  .step.done { background: #1a3a1a; color: #b0ffb0; border-color: #4aff6a; box-shadow: 0 0 8px rgba(74, 255, 106, 0.4); }

  .arena {
    background: #0a0614; border-radius: 18px; padding: 1rem 0.7rem;
    box-shadow: inset 0 0 0 2px #5a2a2a, 0 6px 12px rgba(0, 0, 0, 0.6);
    margin-bottom: 0.7rem; text-align: center;
    position: relative; overflow: hidden;
  }
  .arena::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(circle at 50% 50%, rgba(255, 209, 102, 0.08) 0%, transparent 60%);
    pointer-events: none;
  }
  .result-label { color: #8a6a6a; font-size: 0.55rem; letter-spacing: 2px; text-transform: uppercase; font-weight: bold; margin-bottom: 8px; }
  .result-box { display: flex; justify-content: center; gap: 5px; margin-bottom: 10px; }
  .digit {
    width: 46px; height: 60px;
    background: linear-gradient(145deg, #2a0f0f, #1a0808);
    border: 2px solid #8a4a4a; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.9rem; font-weight: 900; color: #ffd166;
    text-shadow: 0 0 15px #ffd166, 0 0 30px rgba(255, 209, 102, 0.5);
    font-family: 'Courier New', monospace;
    box-shadow: inset 0 -6px 0 rgba(0,0,0,0.5), 0 0 15px rgba(255, 90, 90, 0.3);
    position: relative; overflow: hidden;
  }
  .digit.spinning { animation: spin 0.08s infinite; color: #ff8a8a; text-shadow: 0 0 15px #ff5a5a; }
  @keyframes spin { 0%, 100% { transform: translateY(-3px); } 50% { transform: translateY(3px); } }
  .digit.final {
    animation: popFinal 0.5s ease; border-color: #4aff6a; color: #b0ffb0;
    text-shadow: 0 0 20px #4aff6a, 0 0 40px #4aff6a;
    box-shadow: inset 0 -6px 0 rgba(0,0,0,0.5), 0 0 25px #4aff6a, 0 0 50px rgba(74, 255, 106, 0.5);
  }
  @keyframes popFinal { 0% { transform: scale(1); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }

  .vs-row { display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; align-items: center; }
  .side-label { color: #8a6a6a; font-size: 0.55rem; letter-spacing: 1.5px; text-transform: uppercase; font-weight: bold; padding: 4px 0; }
  .side-label.you { color: #4aff6a; text-shadow: 0 0 8px #4aff6a; }
  .side-label.ai  { color: #a07aff; text-shadow: 0 0 8px #a07aff; }
  .pick { font-size: 1.3rem; font-weight: 900; letter-spacing: 3px; font-family: 'Courier New', monospace; min-height: 1.6rem; color: #fff; text-shadow: 0 0 10px currentColor; }
  .pick.you { color: #4aff6a; text-shadow: 0 0 10px #4aff6a; }
  .pick.ai  { color: #a07aff; text-shadow: 0 0 10px #a07aff; }
  .pick.win { color: #ffd166 !important; text-shadow: 0 0 15px #ffd166, 0 0 30px #ffd166 !important; animation: winPulse 0.5s infinite alternate; }
  @keyframes winPulse { from { transform: scale(1); } to { transform: scale(1.12); } }
  .vs-badge {
    font-size: 1.1rem; font-weight: 900; color: #ffd166;
    text-shadow: 0 0 10px #ffd166; background: #0a0614;
    border: 2px solid #8a4a4a; border-radius: 50%;
    width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;
  }

  .status-panel { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; margin-bottom: 0.7rem; }
  .stat-box {
    background: #0a0614; color: #b0c8ff; font-size: 0.55rem; font-weight: bold;
    padding: 0.35rem 0.25rem; border-radius: 10px; border: 2px solid #4a2a2a;
    box-shadow: inset 0 -2px 0 #1a0f0f; text-align: center; white-space: nowrap;
  }
  .stat-box span { display: block; color: #8a6a6a; font-size: 0.45rem; letter-spacing: 0.6px; text-transform: uppercase; margin-bottom: 2px; }
  .stat-box b { color: #ffd166; text-shadow: 0 0 8px #ffd166; font-size: 0.8rem; }
  .stat-box b.green { color: #4aff6a; text-shadow: 0 0 8px #4aff6a; }
  .stat-box b.red   { color: #ff5a5a; text-shadow: 0 0 8px #ff5a5a; }
  .stat-box b.gold  { color: #ffd166; text-shadow: 0 0 8px #ffd166; }
  .stat-box b.flash { animation: moneyFlash 0.4s; }
  @keyframes moneyFlash { 0% { transform: scale(1); color: #ffd166; } 50% { transform: scale(1.3); color: #4aff6a; } 100% { transform: scale(1); color: #ffd166; } }

  .input-area { display: grid; grid-template-columns: 1fr auto; gap: 6px; margin-bottom: 0.6rem; }
  .guess-input {
    background: #0a0614; color: #ffd166; border: 2px solid #4a2a2a;
    border-radius: 12px; font-size: 1.1rem; font-weight: 900;
    text-align: center; padding: 0.55rem 0.5rem;
    font-family: 'Courier New', monospace; letter-spacing: 4px;
    outline: none; box-shadow: inset 0 -3px 0 #1a0f0f; transition: 0.15s; width: 100%;
  }
  .guess-input:focus { border-color: #ffd166; box-shadow: inset 0 -3px 0 #1a0f0f, 0 0 15px rgba(255, 209, 102, 0.5); text-shadow: 0 0 8px #ffd166; }
  .guess-input.shake { animation: shake 0.3s; border-color: #ff5a5a; }
  @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 50% { transform: translateX(6px); } 75% { transform: translateX(-4px); } }

  .btn {
    background: linear-gradient(145deg, #7a2a2a, #4a1a1a);
    color: #ffd0d0; border: 2px solid #ff5a5a;
    font-size: 0.75rem; font-weight: bold; letter-spacing: 1.5px;
    padding: 0.55rem 1rem; border-radius: 12px;
    box-shadow: inset 0 -5px 0 #1a0f0f, 0 3px 0 #0a0614, 0 0 15px rgba(255, 90, 90, 0.3);
    cursor: pointer; transition: 0.06s linear;
    font-family: inherit; text-shadow: 0 0 8px #ff5a5a; white-space: nowrap;
  }
  .btn:active { transform: translateY(3px); box-shadow: inset 0 -2px 0 #1a0f0f, 0 0 0 #0a0614; }
  .btn:disabled { opacity: 0.4; pointer-events: none; }

  .btn.kocok {
    background: linear-gradient(145deg, #7a5a1a, #4a3a0f);
    border-color: #ffd166; color: #ffe9b0; text-shadow: 0 0 8px #ffd166;
    width: 100%; margin-top: 6px; font-size: 0.85rem; letter-spacing: 2px;
    display: none; animation: kocokPulse 1.2s infinite alternate;
  }
  .btn.kocok.show { display: block; }
  @keyframes kocokPulse {
    from { box-shadow: inset 0 -5px 0 #1a0f0f, 0 3px 0 #0a0614, 0 0 10px rgba(255, 209, 102, 0.3); }
    to   { box-shadow: inset 0 -5px 0 #1a0f0f, 0 3px 0 #0a0614, 0 0 25px rgba(255, 209, 102, 0.7); }
  }
  .btn.reset {
    background: linear-gradient(145deg, #2a3a4a, #1a2a3a);
    border-color: #4a6a8a; color: #b0c8ff; text-shadow: 0 0 6px #6f8fcf;
    width: 100%; margin-top: 6px; display: none;
  }
  .btn.reset.show { display: block; }

  .msg-box {
    text-align: center; font-size: 0.75rem; color: #b0c8ff;
    min-height: 1.4rem; padding: 0.5rem 0.2rem 0.2rem;
    text-shadow: 0 0 8px #4f6faf; font-weight: bold; line-height: 1.35;
  }
  .msg-box.win   { color: #b0ffb0; text-shadow: 0 0 12px #4aff6a, 0 0 24px #4aff6a; }
  .msg-box.lose  { color: #ffb0b0; text-shadow: 0 0 12px #ff5a5a; }
  .msg-box.info  { color: #ffd166; text-shadow: 0 0 10px #ffd166; }
  .msg-box.jackpot { color: #ffd166; text-shadow: 0 0 15px #ffd166, 0 0 30px #ff8a4a; animation: winPulse 0.4s infinite alternate; }

  .hint { color: #6a5a5a; text-align: center; margin-top: 8px; font-size: 0.55rem; letter-spacing: 1px; opacity: 0.75; }

  .modal {
    position: fixed; inset: 0; z-index: 30; display: none;
    align-items: center; justify-content: center; padding: 15px;
    background: rgba(9, 6, 6, 0.85); backdrop-filter: blur(4px);
  }
  .modal.show { display: flex; }
  .modal-box {
    width: min(90vw, 340px); padding: 22px 18px;
    border: 2px solid #8a4a4a; border-radius: 20px;
    background: linear-gradient(145deg, #3a1a1a, #1a0f0f);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 90, 90, 0.3);
    text-align: center;
  }
  .modal-icon { font-size: 3rem; margin-bottom: 6px; animation: popFinal 0.5s ease; }
  .modal-title { font-size: 1.4rem; font-weight: 900; color: #ff5a5a; text-shadow: 0 0 15px #ff5a5a; margin: 4px 0 10px; letter-spacing: 2px; }
  .modal-text { font-size: 0.85rem; color: #c8b0b0; line-height: 1.5; margin-bottom: 14px; }
  .modal-stats {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-bottom: 14px;
  }
  .modal-stats div {
    padding: 8px 4px; border: 1.5px solid #4a2a2a; border-radius: 10px;
    background: #0a0614;
  }
  .modal-stats b { display: block; font-size: 1.05rem; color: #ffd166; text-shadow: 0 0 8px #ffd166; }
  .modal-stats span { font-size: 0.5rem; color: #8a6a6a; text-transform: uppercase; letter-spacing: 1px; }
  .modal-btn {
    width: 100%; background: linear-gradient(145deg, #4a3a1a, #2a1a0a);
    border: 2px solid #ffd166; color: #ffe9b0;
    font-size: 0.9rem; font-weight: bold; letter-spacing: 2px;
    padding: 0.7rem 1rem; border-radius: 12px;
    box-shadow: inset 0 -5px 0 #0a0614, 0 3px 0 #0a0614;
    cursor: pointer; font-family: inherit; text-shadow: 0 0 8px #ffd166;
  }
  .modal-btn:active { transform: translateY(3px); box-shadow: inset 0 -2px 0 #0a0614; }
</style>
</head>
<body>

<div class="wrapper">
  <div class="level-bar">
    <button class="level-btn" data-level="2d">2D<br>00-99</button>
    <button class="level-btn active" data-level="3d">3D<br>000-999</button>
    <button class="level-btn" data-level="4d">4D<br>0000-9999</button>
  </div>

  <div class="rate-bar" id="rateBar">
    💰 Taruhan <b>10</b> · 3D persis = <b>+4.000</b>
  </div>

  <div class="step-bar">
    <div class="step active" id="step1">1. PASANG</div>
    <div class="step" id="step2">2. KUNCI</div>
    <div class="step" id="step3">3. KOCOK</div>
  </div>

  <div class="arena">
    <div class="result-label">🎲 Angka Keluar</div>
    <div class="result-box" id="resultBox">
      <div class="digit" id="d1">-</div>
      <div class="digit" id="d2">-</div>
      <div class="digit" id="d3">-</div>
      <div class="digit" id="d4">-</div>
    </div>

    <div class="vs-row">
      <div>
        <div class="side-label you">KAMU</div>
        <div class="pick you" id="pickYou">--</div>
      </div>
      <div class="vs-badge">VS</div>
      <div>
        <div class="side-label ai">AQUA</div>
        <div class="pick ai" id="pickAI">--</div>
      </div>
    </div>
  </div>

  <div class="status-panel">
    <div class="stat-box"><span>Ronde</span><b id="roundEl">0</b></div>
    <div class="stat-box"><span>Kamu</span><b class="green" id="winsYou">0</b></div>
    <div class="stat-box"><span>Aqua</span><b class="red" id="winsAI">0</b></div>
    <div class="stat-box"><span>💰 Duit</span><b class="gold" id="moneyEl">1000</b></div>
  </div>

  <div class="input-area">
    <input type="text" class="guess-input" id="guessInput" placeholder="000" inputmode="numeric" autocomplete="off" maxlength="4">
    <button class="btn" id="playBtn">PASANG</button>
  </div>

  <button class="btn kocok" id="kocokBtn">🎰 KOCOK ANGKA</button>
  <button class="btn reset" id="resetBtn">🔄 RONDE BARU</button>

  <div class="msg-box info" id="msgBox">💡 Pilih mode, pasang angka PERSIS, lalu KOCOK!</div>
  <div class="hint">🎯 Angka harus SAMA PERSIS untuk menang</div>
</div>

<div class="modal" id="modal">
  <div class="modal-box">
    <div class="modal-icon" id="modalIcon">💀</div>
    <div class="modal-title" id="modalTitle">BANGKRUT!</div>
    <div class="modal-text" id="modalText">Duit kamu habis. Mau main lagi?</div>
    <div class="modal-stats">
      <div><b id="mRonde">0</b><span>Ronde</span></div>
      <div><b id="mMenang">0</b><span>Menang</span></div>
      <div><b id="mKalah">0</b><span>Kalah</span></div>
    </div>
    <button class="modal-btn" id="modalBtn">🔄 MAIN LAGI · 1000 DUIT</button>
  </div>
</div>

<script>
(function () {
  const MODES = {
    '2d': { digits: 2, rate: 70,   label: '2D', hadiah: 'x70',   min: 0, max: 99   },
    '3d': { digits: 3, rate: 400,  label: '3D', hadiah: 'x400',  min: 0, max: 999  },
    '4d': { digits: 4, rate: 3000, label: '4D', hadiah: 'x3000', min: 0, max: 9999 }
  };

  const TARUHAN = 10;

  let mode = '3d';
  let round = 0;
  let winsYou = 0;
  let winsAI = 0;
  let money = 1000;
  let yourPick = null;
  let aiPick = null;
  let finalNumber = null;
  let phase = 'input';
  let busy = false;
  let audioCtx = null;

  const digits = [
    document.getElementById('d1'),
    document.getElementById('d2'),
    document.getElementById('d3'),
    document.getElementById('d4')
  ];
  const pickYouEl  = document.getElementById('pickYou');
  const pickAIEl   = document.getElementById('pickAI');
  const roundEl    = document.getElementById('roundEl');
  const winsYouEl  = document.getElementById('winsYou');
  const winsAIEl   = document.getElementById('winsAI');
  const moneyEl    = document.getElementById('moneyEl');
  const guessInput = document.getElementById('guessInput');
  const playBtn    = document.getElementById('playBtn');
  const kocokBtn   = document.getElementById('kocokBtn');
  const resetBtn   = document.getElementById('resetBtn');
  const msgBox     = document.getElementById('msgBox');
  const rateBar    = document.getElementById('rateBar');
  const step1      = document.getElementById('step1');
  const step2      = document.getElementById('step2');
  const step3      = document.getElementById('step3');
  const levelBtns  = document.querySelectorAll('.level-btn');
  const modal      = document.getElementById('modal');
  const modalIcon  = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalText  = document.getElementById('modalText');
  const mRonde     = document.getElementById('mRonde');
  const mMenang    = document.getElementById('mMenang');
  const mKalah     = document.getElementById('mKalah');
  const modalBtn   = document.getElementById('modalBtn');

  function initAudio() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
  function playTone(freq, dur, vol, type) {
    try {
      initAudio();
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = type || 'sine'; o.frequency.value = freq;
      g.gain.value = vol;
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur / 1000);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(); o.stop(audioCtx.currentTime + dur / 1000);
    } catch (e) {}
  }
  function playTick()  { playTone(800 + Math.random() * 400, 30, 0.04, 'square'); }
  function playSpin()  { playTone(200, 80, 0.06, 'sawtooth'); }
  function playLock()  { playTone(660, 80, 0.10); setTimeout(() => playTone(880, 120, 0.10), 100); }
  function playWin()   { playTone(780, 100, 0.12); setTimeout(() => playTone(980, 100, 0.12), 110); setTimeout(() => playTone(1180, 140, 0.12), 220); }
  function playJackpot() { playTone(880, 100, 0.14); setTimeout(() => playTone(1180, 100, 0.14), 110); setTimeout(() => playTone(1480, 150, 0.14), 220); setTimeout(() => playTone(1760, 200, 0.14), 360); }
  function playLose()  { playTone(300, 200, 0.10, 'sawtooth'); setTimeout(() => playTone(200, 250, 0.10, 'sawtooth'), 150); }
  function playClick() { playTone(520, 50, 0.06); }

  function setMsg(text, cls) { msgBox.textContent = text; msgBox.className = 'msg-box' + (cls ? ' ' + cls : ''); }
  function pad(n, len) { return String(n).padStart(len, '0'); }

  function setStep(n) {
    [step1, step2, step3].forEach((s, i) => {
      s.classList.remove('active', 'done');
      if (i + 1 < n) s.classList.add('done');
      else if (i + 1 === n) s.classList.add('active');
    });
  }

  function updateRateBar() {
    const cfg = MODES[mode];
    rateBar.innerHTML = '💰 Taruhan <b>' + TARUHAN + '</b> · ' + cfg.label + ' persis = <b>+' + (TARUHAN * cfg.rate) + '</b>';
  }

  function updateVisibleDigits() {
    const cfg = MODES[mode];
    for (let i = 0; i < 4; i++) {
      digits[i].style.display = i < cfg.digits ? 'flex' : 'none';
    }
    guessInput.maxLength = cfg.digits;
    guessInput.placeholder = pad(0, cfg.digits);
  }

  function resetDigits() {
    const cfg = MODES[mode];
    for (let i = 0; i < 4; i++) {
      digits[i].textContent = '-';
      digits[i].classList.remove('spinning', 'final');
    }
  }

  function updateStats() {
    roundEl.textContent = round;
    winsYouEl.textContent = winsYou;
    winsAIEl.textContent = winsAI;
    moneyEl.textContent = money;
  }

  function flashMoney() {
    moneyEl.classList.remove('flash');
    void moneyEl.offsetWidth;
    moneyEl.classList.add('flash');
  }

  function updatePicks() {
    pickYouEl.textContent = yourPick !== null ? pad(yourPick, MODES[mode].digits) : '--';
    pickAIEl.textContent  = aiPick !== null ? pad(aiPick, MODES[mode].digits) : '--';
    pickYouEl.classList.remove('win');
    pickAIEl.classList.remove('win');
  }

    function startGame() {
    updateVisibleDigits();
    updateRateBar();
    resetDigits();
    updateStats();
    updatePicks();
    guessInput.value = '';
    guessInput.disabled = false;
    playBtn.disabled = false;
    playBtn.style.display = '';
    kocokBtn.classList.remove('show');
    kocokBtn.disabled = false;
    resetBtn.classList.remove('show');
    phase = 'input';
    busy = false;
    yourPick = null;
    aiPick = null;
    finalNumber = null;
    setStep(1);
    setMsg('💡 Pasang ' + MODES[mode].label + ' (' + MODES[mode].digits + ' digit)!', 'info');
  }

  function resetRound() {
    resetDigits();
    guessInput.value = '';
    guessInput.disabled = false;
    playBtn.disabled = false;
    playBtn.style.display = '';
    kocokBtn.classList.remove('show');
    kocokBtn.disabled = false;
    resetBtn.classList.remove('show');
    phase = 'input';
    busy = false;
    yourPick = null;
    aiPick = null;
    finalNumber = null;
    updatePicks();
    setStep(1);
    setMsg('💡 Pasang angka PERSIS untuk ronde berikutnya!', 'info');
    guessInput.focus();
  }

  function handlePlay() {
    if (phase !== 'input' || busy) return;
    const cfg = MODES[mode];
    const raw = guessInput.value.trim();

    if (raw === '' || !/^\d+$/.test(raw)) {
      guessInput.classList.add('shake');
      setTimeout(() => guessInput.classList.remove('shake'), 320);
      setMsg('⚠️ Masukkan angka dulu!', 'lose');
      return;
    }

    if (raw.length !== cfg.digits) {
      guessInput.classList.add('shake');
      setTimeout(() => guessInput.classList.remove('shake'), 320);
      setMsg('⚠️ Harus ' + cfg.digits + ' digit!', 'lose');
      return;
    }

    const val = parseInt(raw, 10);

    if (money < TARUHAN) {
      showBankrupt();
      return;
    }

    initAudio();
    playLock();

    yourPick = val;
    const aiMax = Math.pow(10, cfg.digits) - 1;
    aiPick = Math.floor(Math.random() * (aiMax + 1));

    money -= TARUHAN;
    updateStats();
    flashMoney();
    updatePicks();

    guessInput.disabled = true;
    playBtn.disabled = true;
    kocokBtn.classList.add('show');
    phase = 'locked';
    setStep(2);

    setMsg('🔒 Taruhan ' + TARUHAN + ' duit · Tekan KOCOK!', 'info');
  }

  function kocok() {
    if (phase !== 'locked' || busy) return;
    phase = 'spinning';
    busy = true;
    kocokBtn.disabled = true;
    setStep(3);

    initAudio();
    playSpin();

    const cfg = MODES[mode];
    const maxNum = Math.pow(10, cfg.digits) - 1;
    finalNumber = Math.floor(Math.random() * (maxNum + 1));
    const finalDigits = pad(finalNumber, cfg.digits).split('');

    for (let i = 0; i < cfg.digits; i++) {
      digits[i].classList.add('spinning');
      digits[i].classList.remove('final');
    }

    const tickInt = setInterval(playTick, 80);
    const spinInt = setInterval(() => {
      for (let i = 0; i < cfg.digits; i++) digits[i].textContent = Math.floor(Math.random() * 10);
    }, 60);

    setTimeout(() => {
      clearInterval(tickInt);
      clearInterval(spinInt);

      for (let i = 0; i < cfg.digits; i++) {
        setTimeout(() => {
          digits[i].classList.remove('spinning');
          digits[i].classList.add('final');
          digits[i].textContent = finalDigits[i];
          playTick();
        }, i * 220);
      }

      setTimeout(() => {
        phase = 'result';
        busy = false;
        evaluateRound();
      }, cfg.digits * 220 + 300);
    }, 1800);
  }

  function evaluateRound() {
    round++;
    const cfg = MODES[mode];

    const youWin = yourPick === finalNumber;
    const aiWin  = aiPick === finalNumber;

    let text = '', cls = '';

    if (youWin) {
      const reward = TARUHAN * cfg.rate;
      money += reward;
      winsYou++;
      pickYouEl.classList.add('win');

      if (cfg.digits === 4) {
        playJackpot();
        text = '🎉🎉 JACKPOT 4D! PERSIS ' + pad(finalNumber, 4) + ' · +' + reward + ' duit!';
        cls = 'jackpot';
      } else {
        playWin();
        text = '🎯 MENANG! ' + cfg.label + ' PERSIS ' + pad(finalNumber, cfg.digits) + ' · +' + reward + ' duit!';
        cls = 'win';
      }
    } else {
      playLose();
      if (aiWin) {
        winsAI++;
        pickAIEl.classList.add('win');
        text = '💀 Aqua PERSIS ' + pad(finalNumber, cfg.digits) + '! Kamu kalah -' + TARUHAN;
      } else {
        text = '❌ Tidak ada yang persis! Angka keluar ' + pad(finalNumber, cfg.digits) + ' · -' + TARUHAN + ' duit';
      }
      cls = 'lose';
    }

    updateStats();
    flashMoney();
    setMsg(text, cls);
    kocokBtn.classList.remove('show');
    resetBtn.classList.add('show');

    if (money < TARUHAN) {
      setTimeout(showBankrupt, 1800);
    }
  }

  function showBankrupt() {
    modalIcon.textContent = '💀';
    modalTitle.textContent = 'BANGKRUT!';
    modalText.textContent = 'Duit kamu habis. Mau main lagi dengan 1000 duit?';
    mRonde.textContent = round;
    mMenang.textContent = winsYou;
    mKalah.textContent = winsAI;
    modal.classList.add('show');
    playLose();
  }

  function resetAll() {
    money = 1000;
    round = 0;
    winsYou = 0;
    winsAI = 0;
    modal.classList.remove('show');
    updateStats();
    resetRound();
    setMsg('💰 Duit direset ke 1000! Selamat main lagi!', 'info');
  }

  playBtn.addEventListener('click', handlePlay);
  kocokBtn.addEventListener('click', kocok);
  resetBtn.addEventListener('click', () => {
    playClick();
    if (money < TARUHAN) {
      resetAll();
    } else {
      resetRound();
    }
  });
  modalBtn.addEventListener('click', () => {
    playClick();
    resetAll();
  });

  guessInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); handlePlay(); } });
  guessInput.addEventListener('input', () => { guessInput.value = guessInput.value.replace(/\D/g, ''); });

  levelBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (busy) return;
      mode = btn.dataset.level;
      levelBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      playClick();
      updateRateBar();
      setMsg('🎯 Mode ' + MODES[mode].label + ' · bayaran ' + MODES[mode].hadiah, 'info');
      setTimeout(() => {
        updateVisibleDigits();
        resetRound();
      }, 150);
    });
  });

  startGame();
})();
</script>

</body>
</html>
    `;

    const responseId = `togel-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const data = Buffer.from(JSON.stringify({
      response_id: responseId,
      sections: [{
        view_model: {
          primitive: {
            __typename: 'GenAIaeacdsnwHtmlPrimitive',
            payload: html,
            trusted_sources: []
          },
          __typename: 'GenAISingleLayoutViewModel'
        }
      }]
    })).toString('base64');

    await satanic.relayMessage(
      m.chat,
      {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2,
          botMetadata: {
            messageDisclaimerText: '',
            botResponseId: responseId
          }
        },
        botForwardedMessage: {
          message: {
            richResponseMessage: {
              messageType: 1,
              submessages: [{
                messageType: 2,
                messageText: '🎰 Togel Kocok vs Aqua'
              }],
              unifiedResponse: { data },
              contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedAiBotMessageInfo: {
                  botJid: '867051314767696@bot'
                },
                forwardOrigin: 4
              }
            }
          }
        }
      },
      { messageId: responseId }
    );

  } catch (error) {
    console.error('[TOGEL ERROR]', error);
    await satanic.sendMessage(m.chat, {
      text: '❌ Gagal membuka game Togel Kocok.\n\nError: ' + error.message
    }, { quoted: m });
  }
}
break;
case 'tebakbom':
case 'boom':
case 'tebakboom': {
  try {
    const html = String.raw`
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>Whisper · Tebak Boom vs AI</title>
<style>
  * {
    box-sizing: border-box;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  html, body { height: 100%; margin: 0; }

  body {
    background: #0d0f1a;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-family: 'Courier New', Courier, monospace;
    touch-action: manipulation;
    padding: 4px;
  }

  .game-wrapper {
    background: #1a1f2f;
    padding: 1.4rem 0.8rem 0.8rem;
    border-radius: 1.6rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.7), inset 0 0 0 2px #3a4a6a;
    border: 3px solid #2a3a5a;
    max-width: 380px;
    width: 100%;
    position: relative;
    margin-top: 10px;
  }

  .game-wrapper::before {
    content: '💥 T E B A K  B O O M';
    position: absolute;
    top: -11px;
    left: 50%;
    transform: translateX(-50%);
    background: #1a1f2f;
    color: #b0c8ff;
    padding: 2px 10px;
    font-size: 0.55rem;
    letter-spacing: 3px;
    border-radius: 30px;
    border: 2px solid #4a6a8a;
    text-shadow: 0 0 10px #6f8fcf;
    font-weight: bold;
    white-space: nowrap;
  }

  .level-bar {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
    margin-bottom: 0.6rem;
  }

  .level-btn {
    background: #0f1524;
    color: #6a7a9a;
    border: 2px solid #2a3a5a;
    border-radius: 8px;
    font-size: 0.6rem;
    font-weight: bold;
    padding: 0.35rem 0.1rem;
    cursor: pointer;
    transition: 0.1s;
    font-family: inherit;
    letter-spacing: 0.5px;
    text-align: center;
  }

  .level-btn:active {
    transform: scale(0.95);
  }

  .level-btn.active {
    background: #2a4a7a;
    color: #c8dfff;
    border-color: #6a9aff;
    box-shadow: 0 0 10px rgba(80, 150, 255, 0.5);
    text-shadow: 0 0 6px #6a9aff;
  }

  .level-btn[data-level="easy"].active {
    background: #1a4a2a;
    border-color: #4aff6a;
    color: #b0ffb0;
    box-shadow: 0 0 10px rgba(74, 255, 106, 0.5);
  }

  .level-btn[data-level="hard"].active {
    background: #4a2a1a;
    border-color: #ff8a4a;
    color: #ffd0b0;
    box-shadow: 0 0 10px rgba(255, 138, 74, 0.5);
  }

  .level-btn[data-level="master"].active {
    background: #4a1a2a;
    border-color: #ff4a7a;
    color: #ffb0c8;
    box-shadow: 0 0 10px rgba(255, 74, 122, 0.5);
  }

  .display-area {
    background: #0a0e1a;
    border-radius: 16px;
    padding: 0.7rem 0.6rem;
    box-shadow: inset 0 0 0 2px #2a3a5a, 0 5px 8px rgba(0, 0, 0, 0.5);
    margin-bottom: 0.6rem;
  }

  .number-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
    width: 100%;
    margin: 0 auto;
    touch-action: manipulation;
  }

  .num-btn {
    background: #1a2a4a;
    border: 2px solid #3a5a7a;
    border-radius: 10px;
    color: #c8dfff;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    box-shadow: inset 0 -4px 0 #0f1a2f, 0 2px 0 #0a1220;
    cursor: pointer;
    transition: 0.04s linear;
    touch-action: manipulation;
    font-family: inherit;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .num-btn:active {
    transform: translateY(2px);
    box-shadow: inset 0 -2px 0 #0f1a2f, 0 0 0 #0a1220;
  }

  .num-btn.selected {
    background: #2a4a7a;
    border-color: #6a9aff;
    box-shadow: inset 0 -4px 0 #1a2a5a, 0 2px 0 #0a1220, 0 0 12px rgba(80, 150, 255, 0.3);
  }

  .num-btn.boom {
    background: #7a2a2a;
    border-color: #ff5a5a;
    color: #ffb0b0;
    box-shadow: inset 0 -4px 0 #4a1a1a, 0 2px 0 #0a1220, 0 0 18px rgba(255, 50, 50, 0.4);
  }

  .num-btn.hidden {
    background: #0a0e1a;
    border-color: #1a2a3a;
    color: transparent;
    box-shadow: inset 0 -4px 0 #05080f, 0 2px 0 #0a1220;
  }

  .num-btn.revealed {
    background: #1a3a2a;
    border-color: #4a8a5a;
    color: #b0ffb0;
    box-shadow: inset 0 -4px 0 #0f2a1a, 0 2px 0 #0a1220, 0 0 12px rgba(50, 255, 80, 0.25);
  }

  .num-btn.ai {
    background: #4a2a7a;
    border-color: #a07aff;
    color: #e0c8ff;
    box-shadow: inset 0 -4px 0 #2a1a4a, 0 2px 0 #0a1220, 0 0 12px rgba(160, 100, 255, 0.4);
  }

  .num-btn.disabled {
    opacity: 0.5;
    transform: scale(0.95);
    pointer-events: none;
  }

  .status-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
    padding: 0 2px;
  }

  .score-box {
    background: #0a0e1a;
    color: #b0c8ff;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.2rem 0.7rem;
    border-radius: 40px;
    border: 2px solid #3a5a7a;
    box-shadow: inset 0 -2px 0 #1a2a4a;
    text-shadow: 0 0 6px #6f8fcf;
    text-align: center;
    white-space: nowrap;
  }

  .ctrl-btn {
    background: #1a2a4a;
    color: #c8dfff;
    border: 2px solid #3a5a7a;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.25rem 0.8rem;
    border-radius: 60px;
    box-shadow: inset 0 -4px 0 #0f1a2f, 0 2px 0 #0a1220;
    cursor: pointer;
    transition: 0.06s linear;
    font-family: inherit;
    white-space: nowrap;
  }

  .ctrl-btn:active {
    transform: translateY(2px);
    box-shadow: inset 0 -2px 0 #0f1a2f;
  }

  .msg-box {
    text-align: center;
    font-size: 0.75rem;
    color: #b0c8ff;
    min-height: 1.1rem;
    padding: 0.35rem 0.2rem 0;
    text-shadow: 0 0 8px #4f6faf;
    font-weight: bold;
    line-height: 1.3;
  }

  .msg-box.you  { color: #b0ffb0; text-shadow: 0 0 8px #4aff6a; }
  .msg-box.ai   { color: #e0c8ff; text-shadow: 0 0 8px #a07aff; }
  .msg-box.boom { color: #ffb0b0; text-shadow: 0 0 8px #ff5a5a; }

  .hint {
    color: #6a7a9a;
    text-align: center;
    margin-top: 6px;
    font-size: 0.55rem;
    letter-spacing: 1px;
    opacity: 0.7;
  }
</style>
</head>
<body>

<div class="game-wrapper">
  <div class="level-bar">
    <button class="level-btn active" data-level="easy">EASY</button>
    <button class="level-btn" data-level="medium">MEDIUM</button>
    <button class="level-btn" data-level="hard">HARD</button>
    <button class="level-btn" data-level="master">MASTER</button>
  </div>

  <div class="display-area">
    <div class="number-grid" id="numberGrid"></div>
    <div class="msg-box" id="messageBox">✨ Pilih level, lalu mulai!</div>
  </div>

  <div class="status-panel">
    <div class="score-box" id="scoreDisplay">🧑 0 - 0 🤖</div>
    <button class="ctrl-btn" id="resetBtn">↻ Restart</button>
  </div>

  <div class="hint" id="hintText">👆 kamu vs AI · 1 BOOM tersembunyi</div>
</div>

<script>
(function () {
  const TOTAL = 12;

  let boomIndex = -1;
  let revealed = [];
  let owner = [];
  let gameOver = false;
  let yourTurn = true;
  let busy = false;
  let scoreYou = 0;
  let scoreAI = 0;
  let level = 'easy';
  let audioCtx = null;

  const gridEl = document.getElementById('numberGrid');
  const scoreSpan = document.getElementById('scoreDisplay');
  const msgBox = document.getElementById('messageBox');
  const resetBtn = document.getElementById('resetBtn');
  const hintText = document.getElementById('hintText');
  const levelBtns = document.querySelectorAll('.level-btn');

  const LEVEL_INFO = {
    easy:   { name: 'EASY',   desc: '👶 AI polos · pilih random',        aiSkill: 0.0  },
    medium: { name: 'MEDIUM', desc: '🧠 AI sedang · 30% menghindar',     aiSkill: 0.3  },
    hard:   { name: 'HARD',   desc: '🔥 AI pintar · 60% menghindar',     aiSkill: 0.6  },
    master: { name: 'MASTER', desc: '👑 AI jenius · 90% menghindar',     aiSkill: 0.9  }
  };

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playTone(freq, dur, vol) {
    try {
      initAudio();
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'sine';
      o.frequency.value = freq;
      g.gain.value = vol;
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur / 1000);
      o.connect(g);
      g.connect(audioCtx.destination);
      o.start();
      o.stop(audioCtx.currentTime + dur / 1000);
    } catch (e) {}
  }

  function playSafeYou() { playTone(620, 80, 0.10); }
  function playSafeAI()  { playTone(420, 80, 0.08); }
  function playBoom() {
    playTone(180, 350, 0.20);
    setTimeout(function(){ playTone(130, 300, 0.15); }, 120);
  }
  function playWin() {
    playTone(780, 100, 0.12);
    setTimeout(function(){ playTone(980, 100, 0.12); }, 110);
    setTimeout(function(){ playTone(1180, 140, 0.12); }, 220);
  }
  function playClick() { playTone(500, 50, 0.06); }

  function setMsg(text, cls) {
    msgBox.textContent = text;
    msgBox.className = 'msg-box' + (cls ? ' ' + cls : '');
  }

  function updateScore() {
    scoreSpan.textContent = '🧑 ' + scoreYou + ' - ' + scoreAI + ' 🤖';
  }

  function emptyCells() {
    const arr = [];
    for (let i = 0; i < TOTAL; i++) {
      if (!revealed[i]) arr.push(i);
    }
    return arr;
  }

  function startGame() {
    boomIndex = Math.floor(Math.random() * TOTAL);
    revealed = new Array(TOTAL).fill(false);
    owner = new Array(TOTAL).fill(null);
    gameOver = false;
    busy = false;
    yourTurn = true;
    updateScore();
    setMsg('🎮 Giliran KAMU — pilih angka!', 'you');
    hintText.textContent = '👆 kamu vs AI · 1 BOOM tersembunyi';
    renderGrid();
  }

  function renderGrid() {
    gridEl.innerHTML = '';

    for (let i = 0; i < TOTAL; i++) {
      (function (idx) {
        const btn = document.createElement('div');
        btn.className = 'num-btn';

        if (revealed[idx]) {
          if (idx === boomIndex) {
            btn.classList.add('boom');
            btn.textContent = '💥';
          } else if (owner[idx] === 'ai') {
            btn.classList.add('ai');
            btn.textContent = '🤖';
          } else {
            btn.classList.add('revealed');
            btn.textContent = '✅';
          }
          btn.classList.add('disabled');
        } else {
          if (gameOver) {
            btn.classList.add('disabled');
            if (idx === boomIndex) {
              btn.classList.add('boom');
              btn.textContent = '💥';
            } else {
              btn.classList.add('hidden');
              btn.textContent = '?';
            }
          } else {
            btn.textContent = '?';
            btn.classList.add('selected');
          }
        }

        btn.addEventListener('click', function (e) { handleClick(e, idx); });
        btn.addEventListener('touchstart', function (e) {
          e.preventDefault();
          handleClick(e, idx);
        }, { passive: false });

        gridEl.appendChild(btn);
      })(i);
    }
  }

  function handleClick(e, idx) {
    e.stopPropagation();
    e.preventDefault();
    if (gameOver || busy || !yourTurn || revealed[idx]) return;

    initAudio();
    yourTurn = false;
    busy = true;

    if (idx === boomIndex) {
      revealed[idx] = true;
      owner[idx] = 'you';
      gameOver = true;
      busy = false;
      playBoom();
      scoreAI++;
      updateScore();
      setMsg('💥 Kamu kena BOOM! AI menang!', 'boom');
      renderGrid();
      return;
    }

    revealed[idx] = true;
    owner[idx] = 'you';
    playSafeYou();
    setMsg('✅ Aman! Giliran AI...', 'you');
    renderGrid();

    const delay = level === 'master' ? 500 : level === 'hard' ? 700 : 900;
    setTimeout(aiMove, delay + Math.random() * 400);
  }

  function aiMove() {
    if (gameOver) { busy = false; return; }

    const empty = emptyCells();
    if (empty.length === 0) { busy = false; return; }

    const skill = LEVEL_INFO[level].aiSkill;
    let pick;

    // AI "menghindari" BOOM dengan cara: kalau skill tinggi, coba tebak
    // boom tidak mungkin di posisi yang baru saja aman (karena boom cuma 1)
    // Trik: AI akan cenderung menghindari cell yang "berdekatan" (heuristik)
    // Tapi karena boom random, AI pintar di sini = lebih sering tidak sengaja
    // memilih cell yang bukan boom → ini "keberuntungan terprogram"
    if (Math.random() < skill && empty.length > 1) {
      // AI pakai strategi: buang 1-2 cell random dulu, ambil sisanya
      // (mengurangi peluang kena boom kalau boom ada di cell buangan)
      const safeSkip = [];
      const shuffled = empty.slice().sort(function () { return Math.random() - 0.5; });
      const skipCount = Math.min(Math.floor(skill * 3), empty.length - 1);
      for (let i = 0; i < skipCount; i++) safeSkip.push(shuffled[i]);
      const candidates = empty.filter(function (i) { return safeSkip.indexOf(i) === -1; });
      pick = candidates[Math.floor(Math.random() * candidates.length)];
    } else {
      pick = empty[Math.floor(Math.random() * empty.length)];
    }

    if (pick === boomIndex) {
      revealed[pick] = true;
      owner[pick] = 'ai';
      gameOver = true;
      busy = false;
      playBoom();
      scoreYou++;
      updateScore();
      setMsg('💥 AI kena BOOM! KAMU MENANG!', 'boom');
      playWin();
      renderGrid();
      return;
    }

    revealed[pick] = true;
    owner[pick] = 'ai';
    playSafeAI();
    yourTurn = true;
    busy = false;
    setMsg('🎮 Giliran KAMU — pilih angka!', 'you');
    renderGrid();
  }

  levelBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      level = btn.dataset.level;
      levelBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      playClick();
      scoreYou = 0;
      scoreAI = 0;
      hintText.textContent = LEVEL_INFO[level].desc;
      startGame();
    });
  });

  resetBtn.addEventListener('click', function () { startGame(); });

  startGame();
})();
</script>

</body>
</html>
    `;

    const responseId = `boom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const data = Buffer.from(JSON.stringify({
      response_id: responseId,
      sections: [{
        view_model: {
          primitive: {
            __typename: 'GenAIaeacdsnwHtmlPrimitive',
            payload: html,
            trusted_sources: []
          },
          __typename: 'GenAISingleLayoutViewModel'
        }
      }]
    })).toString('base64');

    await satanic.relayMessage(
      m.chat,
      {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2,
          botMetadata: {
            messageDisclaimerText: '',
            botResponseId: responseId
          }
        },
        botForwardedMessage: {
          message: {
            richResponseMessage: {
              messageType: 1,
              submessages: [{
                messageType: 2,
                messageText: '💥 Tebak Boom vs AI'
              }],
              unifiedResponse: { data },
              contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedAiBotMessageInfo: {
                  botJid: '867051314767696@bot'
                },
                forwardOrigin: 4
              }
            }
          }
        }
      },
      { messageId: responseId }
    );

  } catch (error) {
    console.error('[BOOM ERROR]', error);
    await satanic.sendMessage(m.chat, {
      text: '❌ Gagal membuka game Tebak Boom.\n\nError: ' + error.message
    }, { quoted: m });
  }
}
break;
case 'img2img': {
if (!isPrem) return reply('you are not premium, Updated premium open this feature');
if (!text) return reply('input prompt');
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .img2img + prompt');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
let mee = await satanic.downloadAndSaveMediaMessage(quoted);
let mem = await UploadFileUgu(mee);
let ImageUrlaja = mem.url || mem;
const apiUrl = `https://free-restapi.biz.id/api/img2img?image_url=${encodeURIComponent(ImageUrlaja)}&prompt=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
await satanic.sendMessage(m.chat, {
image: response.data,
caption: 'Gambar berhasil!'
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Gagal mengupgrade gambar. Coba lagi nanti. silahkan update premium untuk menggunakan fitur ini');
}
}
break;
case 'bratvidhd':
case 'brathdvid': {
if (!text) return reply(`BRAT STICKER\n\nMembuat sticker dengan teks bergaya brat!\n\nCara penggunaan:\n${prefix}bratstick [teks]\n\nContoh:\n${prefix}bratstick Hallo ganteng\n\nNote: Gunakan spasi atau + untuk pemisah kata`);
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const encodedText = encodeURIComponent(text);
const apiUrl = `https://api.nexray.eu.cc/maker/brat?text=${encodedText}`;
const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
await satanic.sendImageAsSticker(m.chat, Buffer.from(response.data), m, {
packname: 'Brat Sticker',
author: 'Satanic Haxor'
});
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
reply(`Terjadi kesalahan: ${err.message || 'Coba lagi nanti'}`);
}
}
break;
case 'talkphoto':
case 'talkingphoto': {
if (!isPrem) return reply('you are not premium, Updated premium open this feature');
let argsFull = args.join(' ');
let voice = 'woman1';
let voiceMatch = argsFull.match(/\|\s*(woman1|woman2|man1|man2)\s*$/i);
if (voiceMatch) {
voice = voiceMatch[1].toLowerCase();
argsFull = argsFull.replace(/\|\s*(woman1|woman2|man1|man2)\s*$/i, '').trim();
}
let prompt = argsFull.replace(/^\.talkingphoto\s*/i, '').trim();
if (!prompt) return reply(`TALKING PHOTO\n\nContoh:\n.talkingphoto aku adalah aqua ai asisten satanic haxor yang akan membantu anda | woman1\n.talkingphoto aku adalah aquai\n\nList Voice:\nwoman1 (default)\nwoman2\nman1\nman2\n\nGunakan format | voice di akhir kalimat`);
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .talkingphoto + teks');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
let mee = await satanic.downloadAndSaveMediaMessage(quoted);
let mem = await UploadFileUgu(mee);
let ImageUrlaja = mem.url || mem;
let apiUrl = `https://free-restapi.biz.id/api/talkingphoto?url=${encodeURIComponent(ImageUrlaja)}&text=${encodeURIComponent(prompt)}&voice=${voice}&apikey=${global.sakey}`;
let response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
await satanic.sendMessage(m.chat, {
video: response.data,
caption: `Berhasil!\nTeks: ${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}\nVoice: ${voice}`
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Gagal membuat talking photo! Coba lagi nanti.');
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
}
}
break;
case 'ektp':
case 'fakektp': {
satanic.sendMessage(m.chat, { react: { text: '🪪', key: m.key } });
try {
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/image/.test(mime)) return reply(`Kirim/reply gambar dengan command: ${command}`);
let media = await quoted.download();
const form = new FormData();
form.append('files[]', media, { filename: 'image.jpg' });
const uploadRes = await axios.post('https://pone.rs/upload.php', form, {
headers: {
...form.getHeaders(),
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36',
'Referer': 'https://pone.rs/',
'Origin': 'https://pone.rs'
},
maxBodyLength: Infinity,
maxContentLength: Infinity
});
if (!uploadRes.data?.success || !uploadRes.data?.files?.[0]?.url) {
return reply(`Gagal upload foto! Silahkan coba lagi.`);
}
let pasPhotoURL = uploadRes.data.files[0].url.replace(/\\\//g, '/');
let parts = text ? text.split("|").map(v => v.trim()) : [];
const [
provinsi = "",
kota = "",
nik = "",
nama = "",
ttl = "",
jenis_kelamin = "",
golongan_darah = "",
alamat = "",
rt_rw = "",
kel_desa = "",
kecamatan = "",
agama = "",
status = "",
pekerjaan = "",
kewarganegaraan = "",
masa_berlaku = "",
terbuat = ""
] = parts;
if (!provinsi || !kota || !nik || !nama || !ttl) {
return reply(
`Format salah!\n\nGunakan format:\n` +
`${prefix + command} Provinsi|Kota|NIK|Nama|TTL|JK|GolDar|Alamat|RT/RW|Kel/Desa|Kecamatan|Agama|Status|Pekerjaan|Kewarganegaraan|Masa Berlaku|Terbuat\n\n` +
`Contoh:\n${prefix + command} JAWA BARAT|BANDUNG|1234567890123456|JOHN DOE|Bandung, 01-01-1990|Laki-laki|O|Jl. Contoh No. 123|001/002|Sukajadi|Sukajadi|Islam|Belum Kawin|Pegawai Swasta|WNI|Seumur Hidup|01-01-2023`
);
}
const params = new URLSearchParams({
provinsi, kota, nik, nama, ttl,
jenis_kelamin, golongan_darah, alamat,
"rt/rw": rt_rw,
"kel/desa": kel_desa,
kecamatan, agama, status, pekerjaan,
kewarganegaraan, masa_berlaku, terbuat,
pas_photo: pasPhotoURL
});
const response = await fetch(`https://api.siputzx.my.id/api/canvas/ektp?${params}`);
const buffer = Buffer.from(await response.arrayBuffer());
await satanic.sendMessage(
m.chat,
{
image: buffer,
caption: `eKTP Berhasil Dibuat!\n\nNama: ${nama}\nNIK: ${nik}`
},
{ quoted: fkontak }
);
} catch (e) {
reply(`Error:\n${e.message}`);
}
}
break;
case 'text2img':
if (!text) return reply('Masukkan deskripsi gambar!\n\nContoh: .text2img kucing lucu');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/text2img?text=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
let info = `\`\`\`\n`;
info += `TEXT TO IMAGE\n\n`;
info += `Prompt : ${text}\n\n`;
info += `© ${global.namaowner}\`\`\``;
await satanic.sendMessage(m.chat, { image: response.data, caption: info }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat membuat gambar.');
}
break;
case 'texttoimg':
if (!text) return reply('Masukkan deskripsi gambar!\n\nContoh: .texttoimg kucing lucu');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/texttoimg?prompt=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
let info = `\`\`\`\n`;
info += `TEXT TO IMAGE\n\n`;
info += `Prompt : ${text}\n\n`;
info += `© ${global.namaowner}\`\`\``;
await satanic.sendMessage(m.chat, { image: response.data, caption: info }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat membuat gambar.');
}
break;
case 'flux':
case 'fluxschnell':
case 'flux-img':
if (!text) return reply('Masukkan deskripsi gambar!\n\nContoh: .flux kucing lucu');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/flux-img?prompt=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
let info = `\`\`\`\n`;
info += `FLUX SCHNELL\n\n`;
info += `Prompt : ${text}\n\n`;
info += `© ${global.namaowner}\`\`\``;
await satanic.sendMessage(m.chat, { image: response.data, caption: info }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat membuat gambar.');
}
break;
case 'nanobanana2': {
satanic.sendMessage(m.chat, { react: { text: '🍌', key: m.key } });
if (!text) return reply(`NANO BANANA\n\nContoh: ${prefix}nanobanana menjerit\n\nBalas gambar dengan command dan teks prompt.`);
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan command: .nanobanana + teks prompt');
try {
const imgBuffer = await satanic.downloadMediaMessage(quoted);
const form = new FormData();
form.append('files[]', imgBuffer, { filename: 'image.jpg' });
const uploadRes = await axios.post('https://pone.rs/upload.php', form, {
headers: {
...form.getHeaders(),
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36',
'Referer': 'https://pone.rs/',
'Origin': 'https://pone.rs'
},
maxBodyLength: Infinity,
maxContentLength: Infinity
});
if (!uploadRes.data?.success || !uploadRes.data?.files?.[0]?.url) {
return reply('Gagal upload gambar ke pone.rs');
}
const link = uploadRes.data.files[0].url.replace(/\\\//g, '/');
const apiUrl = `https://api-faa.my.id/faa/nanobanana?url=${encodeURIComponent(link)}&prompt=${text}`;
const res = await axios.get(apiUrl, { responseType: 'arraybuffer' });
const ct = res.headers['content-type'] || '';
if (ct.startsWith('image/')) {
return satanic.sendMessage(m.chat, { image: Buffer.from(res.data), caption: 'Nano Banana berhasil diproses!' }, { quoted: fkontak });
}
const json = JSON.parse(res.data.toString());
const imageUrl = json.url || json.result || json.image || json.data?.url;
if (!imageUrl) return reply('API tidak mengembalikan gambar');
const img = await axios.get(imageUrl, { responseType: 'arraybuffer' });
satanic.sendMessage(m.chat, { image: Buffer.from(img.data), caption: 'Nano Banana berhasil diproses!' }, { quoted: fkontak });
} catch (e) { reply(e?.response?.status === 500 ? "API maintenance, tunggu beberapa saat untuk mencoba kembali" : `Error: ${e.message}`); }
}
break;

case 'tosad':
case 'tosatan':
case 'tosdmtinggi':
case 'toreal':
case 'tomoai':
case 'tomaya':
case 'tolego':
case 'tokamboja':
case 'tokacamata':
case 'tojepang':
case 'toghibli':
case 'todubai':
case 'todpr':
case 'totua':
case 'tohitam':
case 'totato':
case 'topeci':
case 'tovintage':
case 'topolaroid':
case 'tochibi':
case 'tosexy':
case 'tobrewok':
case 'tobabi':
case 'tofigura':
case 'tofigurav2':
case 'tofigurav3':
case 'topacar':
case 'topacarv2':
case 'tozombie':
case 'topenjara':
case 'tojapanese':
case 'toblonde':
case 'tobotak':
case 'tohijab':
case 'topejabat':
case 'tomekah':
case 'tomirror':
case 'toanime': {
reply('wait be processed...');
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/image/.test(mime)) return reply(`Kirim/reply gambar dengan command: ${command}`);
try {
const imgBuffer = await satanic.downloadMediaMessage(quoted);
const form = new FormData();
form.append('files[]', imgBuffer, { filename: 'image.jpg' });
const uploadRes = await axios.post('https://pone.rs/upload.php', form, {
headers: {
...form.getHeaders(),
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36',
'Referer': 'https://pone.rs/',
'Origin': 'https://pone.rs'
},
maxBodyLength: Infinity,
maxContentLength: Infinity
});
if (!uploadRes.data?.success || !uploadRes.data?.files?.[0]?.url) return reply('Gagal upload gambar');
const link = uploadRes.data.files[0].url.replace(/\\\//g, '/');
const apiUrl = `https://api-faa.my.id/faa/${command}?url=${encodeURIComponent(link)}`;
const res = await axios.get(apiUrl, { responseType: 'arraybuffer' });
const ct = res.headers['content-type'] || '';
if (ct.startsWith('image/')) {
return satanic.sendMessage(m.chat, { image: Buffer.from(res.data), caption: 'Berhasil!' }, { quoted: fkontak });
}
const json = JSON.parse(res.data.toString());
const imageUrl = json.url || json.result || json.image || json.data?.url;
if (!imageUrl) return reply('API tidak mengembalikan gambar');
const img = await axios.get(imageUrl, { responseType: 'arraybuffer' });
satanic.sendMessage(m.chat, { image: Buffer.from(img.data), caption: 'Berhasil!' }, { quoted: fkontak });
} catch (e) {
reply(e?.response?.status === 500 ? "API maintenance, tunggu beberapa saat untuk mencoba kembali" : `Error: ${e.message}`);
}
}
break;
case 'fakecallandro':
if (!text) return reply(
    'Reply gambar dengan caption:\n' +
    '*.fakecall2 nama|durasi*\n\n' +
    'Contoh:\n' +
    '.fakecall2 Satan|20:00'
)

const quotedcall = m.quoted ? m.quoted : m
const mimecall = (quotedcall.msg || quotedcall).mimetype || ''

if (!/image/.test(mimecall)) return reply('❌ Reply gambar dengan caption .fakecall2 nama|durasi')

await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

try {
    const parts = text.split('|').map(v => v.trim())

    if (parts.length < 2) {
        return reply(
            '❌ Format salah!\n\n' +
            'Gunakan: *.fakecall2 nama|durasi*\n' +
            'Contoh: .fakecall2 Satan|20:00'
        )
    }

    const [nama, durasi] = parts

    if (!/^\d{1,2}:\d{2}$/.test(durasi)) {
        return reply('❌ Durasi harus format MM:SS\nContoh: 20:00')
    }

    const mediacall = await satanic.downloadAndSaveMediaMessage(quotedcall)
    const uploadedcall = await UploadFileUgu(mediacall)
    const avatarcall = uploadedcall.url || uploadedcall

    const apiurlcall = `https://free-restapi.biz.id/api/fakecall?nama=${encodeURIComponent(nama)}&durasi=${encodeURIComponent(durasi)}&avatar=${encodeURIComponent(avatarcall)}&apikey=${global.sakey}`

    const responsecall = await axios({
        method: 'get',
        url: apiurlcall,
        responseType: 'arraybuffer',
        timeout: 30000
    })

    const imageBuffercall = Buffer.from(responsecall.data)

    await satanic.sendMessage(m.chat, {
        image: imageBuffercall,
        caption: `Done!\n"${text}"`
    }, { quoted: fkontak })

    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

} catch (e) {
    console.error('Error in fakecall2:', e)
    await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    reply('❌ Error: ' + (e.message || 'Gagal membuat fakecall2'))
}
break
case 'fakecallios':
if (!text) return reply(
    'Reply gambar dengan caption:\n' +
    '*.fakecall nama|durasi*\n\n' +
    'Contoh:\n' +
    '.fakecall Satan|20:00'
)

const quotedfc = m.quoted ? m.quoted : m
const mimefc = (quotedfc.msg || quotedfc).mimetype || ''

if (!/image/.test(mimefc)) return reply('❌ Reply gambar dengan caption .fakecall nama|durasi')

await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

try {
    const pecahfc = text.split('|').map(v => v.trim())

    if (pecahfc.length < 2) {
        return reply(
            '⚠️ Format salah!\n\n' +
            'Pakai: *.fakecall nama|durasi*\n' +
            'Contoh: .fakecall Satan|20:00'
        )
    }

    const namafc = pecahfc[0]
    const durasifc = pecahfc[1]

    if (!/^\d{1,2}:\d{2}$/.test(durasifc)) {
        return reply('⚠️ Durasi harus MM:SS\nContoh: 20:00')
    }

    const mediafc = await satanic.downloadAndSaveMediaMessage(quotedfc)
    const uploadfc = await UploadFileUgu(mediafc)
    const ppfc = uploadfc.url || uploadfc

    const linkfc = `https://free-restapi.biz.id/api/fakecallios?nama=${encodeURIComponent(namafc)}&durasi=${encodeURIComponent(durasifc)}&avatar=${encodeURIComponent(ppfc)}&apikey=${global.sakey}`

    const reqfc = await axios({
        method: 'get',
        url: linkfc,
        responseType: 'arraybuffer',
        timeout: 30000
    })

    const buffc = Buffer.from(reqfc.data)

    await satanic.sendMessage(m.chat, {
        image: buffc,
        caption: `📞 *Fake Call Sukses*\n\n` +
                 `👤 Nama : ${namafc}\n` +
                 `⏱️ Durasi : ${durasifc}`
    }, { quoted: fkontak })

    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

} catch (e) {
    console.error('Error in fakecall:', e)
    await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    reply('❌ Gagal: ' + (e.message || 'Terjadi kesalahan'))
}
break
case 'fakebca':
if (!text) return reply(
    'Masukkan format:\n' +
    '*.fakebca nama|norek|saldo*\n\n' +
    'Contoh:\n' +
    '.fakebca Satan Ganz|020-228-3614|100.000.000'
)

await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

try {
    const parts = text.split('|').map(v => v.trim())

    if (parts.length < 3) {
        return reply(
            '❌ Format salah!\n\n' +
            'Gunakan: *.fakebca nama|norek|saldo*\n' +
            'Contoh: .fakebca Satan Ganz|020-228-3614|100.000.000'
        )
    }

    const [nama, norek, saldo] = parts

    if (!/^[\d.,]+$/.test(saldo)) {
        return reply('❌ Saldo harus berupa angka!\nContoh: 100.000.000')
    }

    const apiUrl = `https://free-restapi.biz.id/api/fakebca?nama=${encodeURIComponent(nama)}&norek=${encodeURIComponent(norek)}&saldo=${encodeURIComponent(saldo)}&apikey=${global.sakey}`

    const response = await fetch(apiUrl)
    if (!response.ok) throw new Error(`HTTP Error ${response.status}`)

    const contentType = response.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
        const json = await response.json()
        throw new Error(json.message || 'API mengembalikan error')
    }

    const buffer = await response.arrayBuffer()
    const imageBuffer = Buffer.from(buffer)

    await satanic.sendMessage(m.chat, {
        image: imageBuffer,
        caption: `Done "${text}"`
    }, { quoted: fkontak })

    await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

} catch (e) {
    console.error('Error in fakebca case:', e)
    await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    reply('❌ Error: ' + (e.message || 'Gagal membuat fakebca'))
}
break
case 'nanobanana': {
if (!isPrem) return reply('you are not premium, Updated premium open this feature');
if (!text) return reply('input prompt');
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .nanobananapro + prompt');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
let mee = await satanic.downloadAndSaveMediaMessage(quoted);
let mem = await UploadFileUgu(mee);
let ImageUrlaja = mem.url || mem;
const apiUrl = `https://free-restapi.biz.id/api/nanobanana?url=${encodeURIComponent(ImageUrlaja)}&prompt=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
await satanic.sendMessage(m.chat, {
image: response.data,
caption: 'Gambar berhasil!'
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Gagal mengupgrade gambar. Coba lagi nanti. silahkan update premium untuk menggunakan fitur ini');
}
}
break;
case 'jadimanhwa':
case 'jadidonghua':
case 'jadimanga': {
if (!isPrem) return reply('you are not premium, Updated premium open this feature');
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .jadimanhwa + prompt');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
let mee = await satanic.downloadAndSaveMediaMessage(quoted);
let mem = await UploadFileUgu(mee);
let ImageUrlaja = mem.url || mem;
const apiUrl = `https://free-restapi.biz.id/api/${command}?url=${encodeURIComponent(ImageUrlaja)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
await satanic.sendMessage(m.chat, {
image: response.data,
caption: 'Gambar berhasil!'
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Gagal mengupgrade gambar. Coba lagi nanti. silahkan update premium untuk menggunakan fitur ini');
}
}
break;
case 'removecloth': {
if (!isPrem) return reply('you are not premium, Updated premium open this feature');
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/image/.test(mime)) return reply('Kirim/reply gambar dengan caption .removecloth');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
let mee = await satanic.downloadAndSaveMediaMessage(quoted);
let mem = await UploadFileUgu(mee);
let ImageUrlaja = mem.url || mem;
const apiUrl = `https://free-restapi.biz.id/api/removecloth?url=${encodeURIComponent(ImageUrlaja)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
await satanic.sendMessage(m.chat, {
image: response.data,
caption: 'Gambar berhasil'
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Gagal mengupgrade gambar. Coba lagi nanti silahkan update premium untuk menggunakan fitur ini.');
}
}
break;
case 'tourl': {
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!mime) return reply('Reply/kirim media (foto/video/file) yang ingin diupload.');
const FormData = require("form-data");
const mimeTypes = require("mime-types");
const fs = require("fs");
const path = require("path");
const { fromBuffer } = require("file-type");
const axios = require("axios");
const cheerio = require("cheerio");
const termaiKey = "AIzaBj7z2z3xBjsk";
const termaiDomain = 'https://c.termai.cc';
const imgbbApiKey = '06fd47f20c573d4795a47af91f081932';
async function uploadTermai(fileBuffer) {
try {
const { ext } = await fromBuffer(fileBuffer);
const formData = new FormData();
formData.append('file', fileBuffer, { filename: 'file.' + ext });
const res = await axios.post(`${termaiDomain}/api/upload?key=${termaiKey}`, formData, {
headers: formData.getHeaders(),
timeout: 30000
});
if (res.data && res.data.status && res.data.path) return res.data.path;
throw new Error("Upload ke Termai gagal");
} catch (err) {
return null;
}
}
async function uploadToPoneRs(fileBuffer) {
try {
const form = new FormData();
form.append('files[]', fileBuffer, { filename: 'file.jpg' });
const res = await axios.post('https://pone.rs/upload.php', form, {
headers: {
...form.getHeaders(),
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36',
'Referer': 'https://pone.rs/',
'Origin': 'https://pone.rs'
},
maxBodyLength: Infinity,
maxContentLength: Infinity,
timeout: 30000
});
if (res.data?.success && res.data?.files?.[0]?.url) {
return res.data.files[0].url.replace(/\\\//g, '/');
}
throw new Error("Upload ke pone.rs gagal");
} catch (err) {
return null;
}
}
async function pomf2(filePath) {
try {
if (!fs.existsSync(filePath)) throw new Error("File tidak ditemukan");
const contentType = mimeTypes.lookup(filePath) || "application/octet-stream";
const fileName = path.basename(filePath);
const form = new FormData();
form.append("files[]", fs.createReadStream(filePath), {
contentType,
filename: fileName,
});
const response = await axios.post("https://qu.ax/upload.php", form, {
headers: { ...form.getHeaders() },
timeout: 30000
});
if (!response.data.success || !response.data.files?.length) throw new Error("Upload ke qu.ax gagal");
return response.data.files[0].url;
} catch (err) {
return null;
}
}
async function uploadTmpFiles(filePath, expire = 172800) {
try {
if (!fs.existsSync(filePath)) throw new Error("File tidak ditemukan");
const form = new FormData();
form.append("file", fs.createReadStream(filePath));
form.append("expire", expire);
const res = await axios.post("https://tmpfiles.org/api/v1/upload", form, {
headers: form.getHeaders(),
timeout: 30000
});
if (res.data && res.data.status === "success") return res.data;
throw new Error("Upload ke tmpfiles.org gagal");
} catch (err) {
return { status: "error", message: "gagal" };
}
}
async function uploadPutIcu(filePath) {
try {
if (!fs.existsSync(filePath)) throw new Error("File tidak ditemukan");
const contentType = mimeTypes.lookup(filePath) || "application/octet-stream";
const res = await axios.put(`https://put.icu/upload/`, fs.createReadStream(filePath), {
headers: {
'Accept': 'application/json',
'Content-Type': contentType
},
maxBodyLength: Infinity,
maxContentLength: Infinity,
timeout: 30000
});
if (res.data && res.data.direct_url) return res.data.direct_url;
if (res.data && res.data.url) return res.data.url;
throw new Error("Upload ke put.icu gagal");
} catch (err) {
return null;
}
}
async function uploadUgu(filePath) {
try {
const form = new FormData();
form.append("files[]", fs.createReadStream(filePath));
const response = await axios.post("https://uguu.se/upload.php", form, {
headers: {
...form.getHeaders(),
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
},
timeout: 30000
});
if (response.data && response.data.success && response.data.files && response.data.files[0]) {
return response.data.files[0].url;
}
throw new Error("Upload ke uguu.se gagal");
} catch (err) {
return null;
}
}
async function uploadUploadEE(filePath) {
try {
const baseUrl = "https://www.upload.ee";
const response = await axios.get(`${baseUrl}/ubr_link_upload.php?rnd_id=${Date.now()}`, { timeout: 30000 });
const uploadId = (response.data.match(/startUpload\("(.+?)"/) || [])[1];
if (!uploadId) throw new Error("Unable to obtain Upload ID");
const formData = new FormData();
formData.append("upfile_0", fs.createReadStream(filePath));
formData.append("link", "");
formData.append("email", "");
formData.append("category", "cat_file");
formData.append("big_resize", "none");
formData.append("small_resize", "120x90");
const uploadResponse = await axios.post(`${baseUrl}/cgi-bin/ubr_upload.pl?X-Progress-ID=${encodeURIComponent(uploadId)}&upload_id=${encodeURIComponent(uploadId)}`, formData, {
headers: { ...formData.getHeaders(), Referer: baseUrl },
timeout: 30000
});
const $ = cheerio.load(uploadResponse.data);
const viewUrl = $("input#file_src").val() || "";
if (!viewUrl) throw new Error("File upload failed");
const viewResponse = await axios.get(viewUrl, { timeout: 30000 });
const downUrl = cheerio.load(viewResponse.data)("#d_l").attr("href") || "";
if (!downUrl) throw new Error("File upload failed");
return downUrl;
} catch (error) {
return null;
}
}
async function uploadToImgBB(filePath) {
try {
if (!fs.existsSync(filePath)) throw new Error("File not found");
const form = new FormData();
form.append('image', fs.createReadStream(filePath));
const response = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, form, {
headers: { ...form.getHeaders() },
timeout: 30000
});
if (response.status === 200 && response.data.data && response.data.data.url) {
return response.data.data.url;
}
throw new Error(`Upload failed with status: ${response.status}`);
} catch (err) {
return null;
}
}
async function uploadToLitterbox(fileBuffer, filename) {
try {
const form = new FormData();
form.append('reqtype', 'fileupload');
form.append('time', '72h');
form.append('fileToUpload', fileBuffer, {
filename: filename,
contentType: mimeTypes.lookup(filename) || 'application/octet-stream'
});
const response = await axios.post('https://litterbox.catbox.moe/resources/internals/api.php', form, {
headers: form.getHeaders(),
timeout: 30000
});
if (response.status !== 200) throw new Error('Litterbox gagal');
const url = response.data;
if (!url.startsWith('http')) throw new Error('Invalid response');
return { host: 'Litterbox', url, expires: '72 jam' };
} catch (err) {
return null;
}
}
try {
const media = await satanic.downloadAndSaveMediaMessage(quoted);
const buffer = fs.readFileSync(media);
const { ext } = await fromBuffer(buffer) || {};
const filename = `file_${Date.now()}.${ext || 'bin'}`;
const results = await Promise.allSettled([
pomf2(media),
uploadTmpFiles(media),
uploadPutIcu(media),
uploadTermai(buffer),
uploadUgu(media),
uploadUploadEE(media),
uploadToImgBB(media),
uploadToPoneRs(buffer),
uploadToLitterbox(buffer, filename)
]);
const [
quaxResult,
tmpFilesResult,
putIcuResult,
termaiResult,
uguResult,
uploadEEResult,
imgbbResult,
poneRsResult,
litterboxResult
] = results;
const quaxLink = quaxResult.status === 'fulfilled' ? quaxResult.value : null;
const tmpFilesLink = tmpFilesResult.status === 'fulfilled' ? tmpFilesResult.value?.data?.url || null : null;
const putIcuLink = putIcuResult.status === 'fulfilled' ? putIcuResult.value : null;
const termaiLink = termaiResult.status === 'fulfilled' ? termaiResult.value : null;
const uguLink = uguResult.status === 'fulfilled' ? uguResult.value : null;
const uploadEELink = uploadEEResult.status === 'fulfilled' ? uploadEEResult.value : null;
const imgbbLink = imgbbResult.status === 'fulfilled' ? imgbbResult.value : null;
const poneRsLink = poneRsResult.status === 'fulfilled' ? poneRsResult.value : null;
const litterboxLink = litterboxResult.status === 'fulfilled' ? litterboxResult.value?.url : null;
const litterboxExpiry = litterboxResult.status === 'fulfilled' ? litterboxResult.value?.expires : null;
const successLinks = [quaxLink, tmpFilesLink, putIcuLink, termaiLink, uguLink, uploadEELink, imgbbLink, poneRsLink, litterboxLink].filter(link => link);
if (successLinks.length === 0) {
fs.unlinkSync(media);
return;
}
const formatLink = (link) => link ? link : 'Gagal';
let caption = `UPLOAD SUCCESS\n`;
caption += `Size: ${(buffer.length / 1024).toFixed(2)} KB\n`;
caption += `Format: ${ext || 'unknown'}\n`;
caption += `Berhasil: ${successLinks.length} dari 9 uploader\n`;
caption += `────────────────\n`;
caption += `Qu.ax: ${formatLink(quaxLink)}\n`;
caption += `TmpFiles: ${formatLink(tmpFilesLink)} (2 Days)\n`;
caption += `Put.icu: ${formatLink(putIcuLink)} (1 Day)\n`;
caption += `Termai: ${formatLink(termaiLink)}\n`;
caption += `Uguu.se: ${formatLink(uguLink)}\n`;
caption += `Upload.ee: ${formatLink(uploadEELink)}\n`;
caption += `ImgBB: ${formatLink(imgbbLink)}\n`;
caption += `Pone.rs: ${formatLink(poneRsLink)}\n`;
caption += `Litterbox: ${formatLink(litterboxLink)} ${litterboxExpiry ? `(${litterboxExpiry})` : ''}`;
await reply(caption);
fs.unlinkSync(media);
} catch (err) {
}
}
break;
case 'kodepos':
case 'kode_pos': {
if (!text) return reply('Masukkan nama kota atau kecamatan!\n\nContoh: .kodepos jakarta');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/kodepos?kodepos=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (response.data.status !== 200) {
return reply('Kode pos tidak ditemukan.');
}
const result = response.data.result;
const data = result.data.slice(0, 15);
let info = `KODE POS INDONESIA\n\n`;
info += `Pencarian: ${text}\n`;
info += `Total Ditemukan: ${result.total}\n`;
info += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
for (let i = 0; i < data.length; i++) {
const item = data[i];
info += `${i+1}. ${item.kodepos}\n`;
info += `   Desa/Kel: ${item.desa}\n`;
info += `   Kecamatan: ${item.kecamatan}\n`;
info += `   Kota: ${item.kota}\n`;
info += `   Provinsi: ${item.provinsi}\n\n`;
}
if (result.total > 15) {
info += `dan ${result.total - 15} data lainnya...\n\n`;
}
info += `Project By: ${namaBot}`;
await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat mencari kode pos.');
}
}
break;
case 'blurface':
case 'faceblur':
case 'blurimage': {

const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/image/.test(mime)) return reply(`Reply gambar dengan caption ${prefix + command}`);
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
let media = await satanic.downloadAndSaveMediaMessage(quoted);
let uploadResult = await UploadFileUgu(media);
let imageUrl = uploadResult.url || uploadResult;
const apiUrl = `https://api.nexray.eu.cc/tools/blurface?url=${encodeURIComponent(imageUrl)}`;
const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
await satanic.sendMessage(m.chat, {
image: Buffer.from(response.data),
caption: 'Gambar berhasil di-blur!'
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
reply(`Terjadi kesalahan: ${err.message || 'Coba lagi nanti'}`);
}
}
break;
case 'spamngl':
case 'nglspam': {

if (!text) return reply(`SPAM NGL\n\nKirim spam pesan ke link NGL!\n\nCara penggunaan:\n${prefix}spamngl [url]|[pesan]|[jumlah]\n\nContoh:\n${prefix}spamngl https://ngl.link/satan|Haii|6\n\nNote: Maksimal 10 pesan per command`);
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const args = text.split('|');
if (args.length < 3) return reply(`Format salah!\n\nContoh: ${prefix}spamngl https://ngl.link/satan|Haii|6`);
const url = args[0].trim();
const pesan = args[1].trim();
const jumlah = parseInt(args[2].trim());
if (!url.includes('ngl.link')) return reply('URL harus dari ngl.link!');
if (isNaN(jumlah) || jumlah < 1) return reply('Jumlah harus angka minimal 1!');
if (jumlah > 10) return reply('Maksimal 10 pesan per command!');
const apiUrl = `https://api.nexray.eu.cc/tools/spamngl?url=${encodeURIComponent(url)}&pesan=${encodeURIComponent(pesan)}&jumlah=${jumlah}`;
const response = await axios.get(apiUrl);
if (!response.data.status) return reply('Gagal mengirim spam NGL.');
const result = response.data;
let info = `SPAM NGL\n\nURL: ${url}\nPesan: ${pesan}\n`;
info += `Status: ${result.status ? 'Berhasil' : 'Gagal'}\nJumlah: ${jumlah}\nResult: ${result.result || '-'}\n`;
reply(info);
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
reply(`Terjadi kesalahan: ${err.message || 'Coba lagi nanti'}`);
}
}
break;
case 'cekresi':
case 'resi': {
if (!text) return reply('CEK RESI\n\nMasukkan kurir dan nomor resi!\n\nContoh: .cekresi jne 123456789\n\nDaftar Kurir:\njne, pos, tiki, wahana, jnt, sicepat, ninja, spx, anteraja, lionparcel, ncs, pcp, rpx, sap, jet, indahlogistik, dse, firstlogistics, idexpress, lalamove, paxel, pandu, sentral, star, cargo, etc');
if (args.length < 2) return reply('Format salah!\n\nContoh: .cekresi jne 123456789');
const kurir = args[0].toLowerCase();
const noResi = args[1];
const listKurir = ['jne', 'pos', 'tiki', 'wahana', 'jnt', 'sicepat', 'ninja', 'spx', 'anteraja', 'lionparcel', 'ncs', 'pcp', 'rpx', 'sap', 'jet', 'indahlogistik', 'dse', 'firstlogistics', 'idexpress', 'lalamove', 'paxel', 'pandu', 'sentral', 'star', 'cargo', 'etc'];
if (!listKurir.includes(kurir)) {
return reply(`Kurir ${kurir} tidak dikenal!\n\nDaftar Kurir:\n${listKurir.join(', ')}`);
}
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/cekresi?kurir=${kurir}&resi=${noResi}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (response.data.status !== 200) {
return reply(`Resi tidak ditemukan untuk kurir ${kurir.toUpperCase()} dengan nomor ${noResi}`);
}
const result = response.data.result;
let info = `CEK RESI\n\n`;
info += `Expedisi: ${result.expedisi || kurir.toUpperCase()}\n`;
info += `No Resi: ${result.no_resi}\n`;
info += `Status: ${result.status}\n`;
if (result.tanggal_kirim) {
info += `Tanggal Kirim: ${result.tanggal_kirim}\n`;
}
info += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
info += `RIWAYAT PENGIRIMAN\n\n`;
if (result.riwayat && result.riwayat.length > 0) {
for (let i = 0; i < result.riwayat.length; i++) {
const r = result.riwayat[i];
info += `${i+1}. ${r.waktu || '-'}\n`;
info += `   ${r.deskripsi || r.deskripsi_original || '-'}\n`;
if (r.lokasi) info += `   Lokasi: ${r.lokasi}\n`;
info += `\n`;
}
} else {
info += `Tidak ada riwayat pengiriman.\n`;
}
info += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
info += `Project By: ${namaBot}`;
if (info.length > 4096) {
let parts = info.match(/[\s\S]{1,4096}/g) || [];
for (let part of parts) {
await satanic.sendMessage(m.chat, { text: part }, { quoted: fkontak });
}
} else {
await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
}
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat melacak resi.');
}
}
break;
case 'whatmusic':
case 'whatsong':
case 'identify': {
if (!quoted) return reply(`WHAT MUSIC - Identify Song\n\nMengidentifikasi lagu dari file audio/video\n\nCara penggunaan:\n\n1. Dengan URL audio:\n${prefix + command} <url_audio>\n\n2. Reply ke pesan audio/video:\nReply ke pesan audio/vn/video lalu kirim ${prefix + command}`);
let mime = quoted.mimetype || '';
let audioUrl = null;
async function uploadToLitterbox(fileBuffer, filename) {
try {
const form = new FormData();
form.append('reqtype', 'fileupload');
form.append('time', '72h');
form.append('fileToUpload', Buffer.from(fileBuffer), {
filename: filename,
contentType: require('mime').lookup(filename) || 'application/octet-stream'
});
const response = await axios.post('https://litterbox.catbox.moe/resources/internals/api.php', form, {
headers: form.getHeaders(),
timeout: 30000
});
if (response.status !== 200) throw new Error('Litterbox gagal');
const url = response.data;
if (!url.startsWith('http')) throw new Error('Invalid response');
return url;
} catch (err) {
console.error("Litterbox Error:", err.message);
return null;
}
}
let directUrl = text;
if (directUrl && (directUrl.includes('http') || directUrl.includes('cdn'))) {
audioUrl = directUrl;
}
else if (quoted && (/audio/.test(mime) || /video/.test(mime))) {
const mediaBuffer = await quoted.download();
const extension = mime.split('/')[1] || 'mp3';
const filename = `audio.${extension}`;
audioUrl = await uploadToLitterbox(mediaBuffer, filename);
if (!audioUrl) {
return reply('Gagal upload audio ke Litterbox');
}
}
else {
return reply(`Kirim atau reply file audio/video!`);
}
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
const identifyEndpoint = `https://api.neoxr.eu/api/whatmusic?url=${encodeURIComponent(audioUrl)}&apikey=${global.neoxr}`;
const identifyResponse = await axios.get(identifyEndpoint);
const identifyResult = identifyResponse.data;
if (!identifyResult.status) return reply('Gagal mengidentifikasi lagu');
const songData = identifyResult.data;
let balasan = `WHAT MUSIC - SONG IDENTIFIER\n\n`;
balasan += `━━━━━━━━━━━━━━━━━━━━━━\n`;
balasan += `Judul: ${songData.title}\n`;
balasan += `Artis: ${songData.artist}\n`;
balasan += `Album: ${songData.album}\n`;
balasan += `Rilis: ${songData.release}\n`;
balasan += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
balasan += `TAUTAN MUSIK:\n\n`;
if (songData.links?.spotify) {
balasan += `Spotify\n`;
balasan += `   https://open.spotify.com/track/${songData.links.spotify.track.id}\n\n`;
}
if (songData.links?.deezer) {
balasan += `Deezer\n`;
balasan += `   https://deezer.com/track/${songData.links.deezer.track.id}\n\n`;
}
if (songData.links?.youtube) {
balasan += `YouTube\n`;
balasan += `   https://youtu.be/${songData.links.youtube.vid}\n\n`;
}
if (songData.links?.soundcloud) {
balasan += `SoundCloud\n`;
balasan += `   ${songData.links.soundcloud.url || 'https://soundcloud.com/'}\n\n`;
}
balasan += `━━━━━━━━━━━━━━━━━━━━━━\n`;
balasan += `Project By: ${namaBot}`;
await satanic.sendMessage(m.chat, { text: balasan }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;

case 'ocr':
case 'readtext': {
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/image/.test(mime)) return reply('Hanya support gambar!');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
async function uploadToLitterbox(fileBuffer, filename) {
try {
const FormData = require('form-data');
const form = new FormData();
form.append('reqtype', 'fileupload');
form.append('time', '72h');
form.append('fileToUpload', Buffer.from(fileBuffer), {
filename: filename,
contentType: require('mime').lookup(filename) || 'image/jpeg'
});
const response = await axios.post('https://litterbox.catbox.moe/resources/internals/api.php', form, {
headers: form.getHeaders(),
timeout: 30000
});
if (response.status !== 200) throw new Error('Litterbox gagal');
const url = response.data;
if (!url.startsWith('http')) throw new Error('Invalid response');
return url;
} catch (err) {
console.error("Litterbox Error:", err.message);
return null;
}
}
let mediaBuffer = await quoted.download();
let extension = mime.split('/')[1] || 'jpg';
let imageUrl = await uploadToLitterbox(mediaBuffer, `image.${extension}`);
if (!imageUrl) {
return reply('Gagal upload gambar ke Litterbox');
}
const apiUrl = `https://free-restapi.biz.id/api/ocr?image_url=${encodeURIComponent(imageUrl)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (response.data.status !== 200) {
return reply('Gagal membaca teks dari gambar.');
}
const result = response.data.result;
let info = `OCR - TEXT EXTRACTOR\n\n`;
info += `Total Karakter: ${result.total_characters}\n`;
info += `Total Baris: ${result.total_lines}\n`;
info += `Confidence: ${result.ocr_confidence}\n\n`;
info += `━━━━━━━━━━━━━━━━━━━━━━\n`;
info += `HASIL TEKS:\n\n${result.text}\n`;
info += `━━━━━━━━━━━━━━━━━━━━━━\n`;
info += `Project By: ${namaBot}`;
await satanic.sendMessage(m.chat, { text: info }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;

case 'translate': {
async function translate(query = "", lang) {
if (!query.trim()) return "";
const url = new URL("https://translate.googleapis.com/translate_a/single");
url.searchParams.append("client", "gtx");
url.searchParams.append("sl", "auto");
url.searchParams.append("dt", "t");
url.searchParams.append("tl", lang);
url.searchParams.append("q", query);
try {
const response = await fetch(url.href);
const data = await response.json();
if (data && data[0]) {
return data[0].map(item => item[0].trim()).join("\n");
}
return "";
} catch (err) {
throw err;
}
}
let textToTranslate = "";
let targetLang = "id";
if (text && text.trim()) {
const firstWord = text.trim().split(" ")[0];
if (firstWord.length === 2 && /^[a-z]{2}$/i.test(firstWord)) {
targetLang = firstWord.toLowerCase();
textToTranslate = text.trim().split(" ").slice(1).join(" ");
} else {
textToTranslate = text;
}
}
if (!textToTranslate && m.quoted && m.quoted.text) {
textToTranslate = m.quoted.text;
}
if (!textToTranslate || !textToTranslate.trim()) {
return reply(`Contoh penggunaan semua bahasa:\n\nASIA\n.translate id Good morning → selamat pagi\n.translate en Selamat pagi → good morning\n.translate ja Selamat pagi → おはようございます\n.translate ko Selamat pagi → 좋은 아침이에요\n.translate zh Selamat pagi → 早上好\n.translate th Selamat pagi → อรุณสวัสดิ์\n.translate vi Selamat pagi → chào buổi sáng\n.translate hi Selamat pagi → सुप्रभात\n.translate ms Selamat pagi → selamat pagi\n.translate tl Selamat pagi → magandang umaga\n\nEROPA\n.translate es Selamat pagi → buenos días\n.translate fr Selamat pagi → bonjour\n.translate de Selamat pagi → guten morgen\n.translate it Selamat pagi → buongiorno\n.translate pt Selamat pagi → bom dia\n.translate ru Selamat pagi → доброе утро\n.translate nl Selamat pagi → goedemorgen\n.translate pl Selamat pagi → dzień dobry\n\nTIMUR TENGAH & AFRIKA\n.translate ar Selamat pagi → صباح الخير\n.translate tr Selamat pagi → günaydın\n.translate sw Selamat pagi → habari za asubuhi\n\nCara pakai:\nKetik: .translate [kode] [teks]\nAtau reply pesan + .translate [kode]`);
}
try {
const result = await translate(textToTranslate, targetLang);
if (!result) return reply("Gagal menerjemahkan teks.");
reply(result);
} catch (error) {
reply(`Error: ${error.message}`);
}
break;
}

case 'ssweb':
case 'screenshotweb': {
if (!text) return reply('Masukkan URL website!\n\nContoh: .ssweb https://google.com\n\nDevice: desktop, tablet, mobile\nContoh: .ssweb https://google.com tablet');
const url = args[0];
let device = args[1] ? args[1].toLowerCase() : 'desktop';
if (!['desktop', 'tablet', 'mobile'].includes(device)) {
return reply('Device tidak valid! Gunakan: desktop, tablet, atau mobile');
}
if (!url.startsWith('http://') && !url.startsWith('https://')) {
return reply('URL harus lengkap dengan http:// atau https://');
}
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/ssweb?url=${encodeURIComponent(url)}&device=${device}&apikey=${global.sakey}`;
await satanic.sendMessage(m.chat, {
image: { url: apiUrl },
caption: `SSWEB RESULT\n\nURL: ${url}\nDevice: ${device}\n\nProject By: ${namaBot}`
}, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat mengambil screenshot website.');
}
}
break;
case 'google': {
await satanic.sendMessage(m.chat, { react: { text: '🔍', key: m.key } });
if (!text) {
return satanic.sendMessage(m.chat, {
text: `GOOGLE SEARCH\n\nContoh: ${prefix}google indonesia\n\nMasukkan kata kunci pencarian setelah perintah.`
});
}
let apiUrl = `https://free-restapi.biz.id/api/google?query=${encodeURIComponent(text)}&apikey=${global.sakey}`;
let response = await fetch(apiUrl);
let data = await response.json();
if (!data || data.length === 0) {
return satanic.sendMessage(m.chat, { text: 'Tidak ada hasil ditemukan.' });
}
let resultText = `HASIL PENCARIAN: ${text}\n\n`;
for (let i = 0; i < Math.min(data.length, 5); i++) {
resultText += `${i+1}. ${data[i].title}\n`;
resultText += `${data[i].description}\n`;
resultText += `${data[i].url}\n\n`;
}
await satanic.sendMessage(m.chat, { text: resultText });
}
break;
case 'anticolong': {
if (!isPrem && !isCreator) return reply('you are not premium');
try {
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
const quoted = m.quoted ? m.quoted : m;
const qmsg = quoted.msg || quoted;
const mime = qmsg.mimetype || '';
if (!mime || !mime.includes('webp')) {
return await m.reply('Reply sticker WEBP biasa dulu.');
}
const stream = await downloadContentFromMessage(qmsg, 'sticker');
const chunks = [];
for await (const chunk of stream) chunks.push(chunk);
const stickerBuffer = Buffer.concat(chunks);
const metadata = {
'sticker-pack-id': '2be7e369-b5ce-4706-a3d4-f78805a20328',
'sticker-pack-name': 'Satanic Haxor',
'sticker-pack-publisher': 'Satanic Haxor',
'accessibility-text': 'Satanic Haxor',
'android-app-store-link': 'https://whatsapp.com',
'ios-app-store-link': 'https://whatsapp.com/ios',
emojis: ['🦸', '😴', '😌'],
'is-from-sticker-maker': 0,
'is-avatar-sticker': 1,
'avatar-sticker-template-id': 'whatsapp',
'is-ai-sticker': 1,
'is-avatar-country-sticker': 1,
'is-avatar-instant-sticker': 1,
'sticker-maker-source-type': 4,
'is-avatar-social-sticker': 1,
'avatar-sticker-style': 'whatsapp',
'avatar-sticker-revision-id': '2026',
'is-from-user-created-pack': 1,
'origin-pack-id': 'whatsapp',
'is-text-sticker': 1
};
const json = Buffer.from(JSON.stringify(metadata), 'utf-8');
const exif = Buffer.concat([
Buffer.from([0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00]),
Buffer.alloc(4),
Buffer.from([0x16, 0x00, 0x00, 0x00]),
json
]);
exif.writeUInt32LE(json.length, 14);
const typeBuffer = Buffer.from('EXIF');
const sizeBuffer = Buffer.alloc(4);
sizeBuffer.writeUInt32LE(exif.length, 0);
const padding = exif.length % 2 === 1 ? Buffer.from([0x00]) : Buffer.alloc(0);
const exifChunk = Buffer.concat([typeBuffer, sizeBuffer, exif, padding]);
if (stickerBuffer.slice(0, 4).toString() !== 'RIFF' || stickerBuffer.slice(8, 12).toString() !== 'WEBP') {
throw new Error('File bukan WEBP valid.');
}
const chunks_ = [];
let offset = 12;
while (offset + 8 <= stickerBuffer.length) {
const type = stickerBuffer.slice(offset, offset + 4).toString();
const size = stickerBuffer.readUInt32LE(offset + 4);
const chunkStart = offset;
const chunkEnd = offset + 8 + size + (size % 2);
if (chunkEnd > stickerBuffer.length) break;
if (type !== 'EXIF') chunks_.push(stickerBuffer.slice(chunkStart, chunkEnd));
offset = chunkEnd;
}
const body = Buffer.concat([...chunks_, exifChunk]);
const header = Buffer.alloc(12);
header.write('RIFF', 0);
header.writeUInt32LE(body.length + 4, 4);
header.write('WEBP', 8);
const finalBuffer = Buffer.concat([header, body]);
const media = await prepareWAMessageMedia(
{ sticker: finalBuffer },
{ upload: satanic.waUploadToServer }
);
const msgContent = {
messageContextInfo: {
limitSharingV2: {
sharingLimited: true,
trigger: 'CHAT_SETTING',
limitSharingSettingTimestamp: Date.now().toString(),
initiatedByMe: true
}
},
stickerMessage: {
...media.stickerMessage,
isAnimated: qmsg.isAnimated || false,
isAvatar: true,
isAiSticker: true,
isLottie: false
}
};
const msg = await generateWAMessageFromContent(m.chat, msgContent, {
quoted: m,
userJid: satanic.user.id
});
await satanic.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (e) {
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
await m.reply('Gagal inject atribut sticker.\nPastikan reply sticker WEBP biasa.');
}
}
break;
case "kalkulator": {
val = text
.replace(/[^0-9\-\/+*×÷πEe()piPI/]/g, '')
.replace(/×/g, '*')
.replace(/÷/g, '/')
.replace(/π|pi/gi, 'Math.PI')
.replace(/e/gi, 'Math.E')
.replace(/\/+/g, '/')
.replace(/\++/g, '+')
.replace(/-+/g, '-');
let format = val
.replace(/Math\.PI/g, 'π')
.replace(/Math\.E/g, 'e')
.replace(/\//g, '÷')
.replace(/\*×/g, '×');
try {
let result = (new Function('return ' + val))();
if (!result) return reply(result);
reply(`${format} = ${result}`);
} catch (e) {
if (e == undefined) return reply('Isinya?');
reply('Format salah, hanya 0-9 dan Simbol -, +, *, /, ×, ÷, π, e, (, ) yang disupport');
}
}
break;
case 'stickerpack': {
if (!m.isGroup) {
return m.reply('Fitur Khusus Group!');
}
await satanic.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });
let args = m.text.split(' ').slice(1);
if (!args.length) {
return m.reply(`📌 Cara pakai:
.stickerpack <query> - Cari dan tampilkan daftar
.stickerpack <nomor> - Ambil pack berdasarkan nomor

📌 Contoh:
.stickerpack nailong
.stickerpack 1
.stickerpack 2`);
}
const axios = require('axios');
const crypto = require('crypto');
const https = require('https');
const JSZip = require('jszip');
const sharp = require('sharp');
if (!global.getStickerSession) global.getStickerSession = {};
if (!global.searchResult) global.searchResult = {};
function sha256(buffer) {
return crypto.createHash('sha256').update(buffer).digest();
}
function toB64Url(buffer) {
return Buffer.from(buffer)
.toString('base64')
.replace(/\+/g, '-')
.replace(/\//g, '_')
.replace(/=+$/g, '');
}
function isWebP(buffer) {
if (!buffer || !Buffer.isBuffer(buffer) || buffer.length < 12) return false;
return buffer.toString('ascii', 0, 4) === 'RIFF' &&
buffer.toString('ascii', 8, 12) === 'WEBP';
}
function isAnimatedWebP(buffer) {
if (!isWebP(buffer)) return false;
let offset = 12;
while (offset < buffer.length - 8) {
const chunk = buffer.toString('ascii', offset, offset + 4);
const size = buffer.readUInt32LE(offset + 4);
if (chunk === 'VP8X' && (buffer[offset + 8] & 0x02)) return true;
if (chunk === 'ANIM' || chunk === 'ANMF') return true;
offset += 8 + size + (size % 2);
}
return false;
}
function detectImageFormat(buffer) {
if (!buffer || !Buffer.isBuffer(buffer) || buffer.length < 12) return 'unknown';
try {
const header = buffer.slice(0, 12);
if (header.length >= 4 && header.toString('hex', 0, 4) === '89504e47') return 'png';
if (header.length >= 3 && header.toString('hex', 0, 3) === 'ffd8ff') return 'jpg';
if (header.length >= 12 && header.toString('ascii', 0, 4) === 'RIFF' &&
header.toString('ascii', 8, 12) === 'WEBP') return 'webp';
if (header.length >= 6 && header.toString('hex', 0, 6) === '47494638') return 'gif';
if (header.length >= 2 && header.toString('hex', 0, 2) === '424d') return 'bmp';
if (header.length >= 5 && (header.toString('hex', 0, 5) === '3c3f786d6c' ||
header.toString('hex', 0, 4) === '3c7376')) return 'svg';
return 'unknown';
} catch (e) {
return 'unknown';
}
}
async function convertToWebP(buffer) {
if (!buffer || !Buffer.isBuffer(buffer)) return null;
const format = detectImageFormat(buffer);
try {
if (format === 'webp') return buffer;
if (['svg', 'unknown'].includes(format)) return null;
let sharpInstance = sharp(buffer);
sharpInstance = sharpInstance.resize(512, 512, {
fit: 'contain',
background: { r: 255, g: 255, b: 255, alpha: 0 }
});
return await sharpInstance.webp({
quality: 80,
effort: 4
}).toBuffer();
} catch (error) {
return null;
}
}
function validateSticker(buffer) {
if (!buffer || !Buffer.isBuffer(buffer) || buffer.length < 12) return false;
const format = detectImageFormat(buffer);
const supportedFormats = ['png', 'jpg', 'webp', 'gif', 'bmp'];
return supportedFormats.includes(format);
}
function classifySticker(buffer, stickerMessage) {
if (stickerMessage && stickerMessage.isLottie) {
return { ext: 'json', mimetype: 'application/json', isAnimated: true, isLottie: true };
}
const isAnimated = isWebP(buffer) ? isAnimatedWebP(buffer) : false;
return { ext: 'webp', mimetype: 'image/webp', isAnimated: isAnimated, isLottie: false };
}
async function makeTrayWebp(buffer) {
if (!buffer || !Buffer.isBuffer(buffer)) return await makeBlankTrayWebp();
try {
return await sharp(buffer, { animated: false })
.resize(252, 252, { fit: 'cover' })
.webp()
.toBuffer();
} catch (e) {
return await makeBlankTrayWebp();
}
}
async function makeBlankTrayWebp() {
return await sharp({
create: { width: 252, height: 252, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
}).webp().toBuffer();
}
async function makeThumbnailJpeg(buffer) {
if (!buffer || !Buffer.isBuffer(buffer)) {
return await sharp({
create: { width: 252, height: 252, channels: 3, background: { r: 255, g: 255, b: 255 } }
}).jpeg().toBuffer();
}
try {
return await sharp(buffer)
.resize(252, 252, { fit: 'cover' })
.jpeg()
.toBuffer();
} catch (e) {
return await sharp({
create: { width: 252, height: 252, channels: 3, background: { r: 255, g: 255, b: 255 } }
}).jpeg().toBuffer();
}
}
async function uploadToServer(satanic, buffer, { hkdf, mediaPath, mediaKey = crypto.randomBytes(32) }) {
try {
const expanded = Buffer.from(
crypto.hkdfSync('sha256', mediaKey, Buffer.alloc(32), Buffer.from(hkdf), 112)
);
const iv = expanded.subarray(0, 16);
const cipherKey = expanded.subarray(16, 48);
const macKey = expanded.subarray(48, 80);
const cipher = crypto.createCipheriv('aes-256-cbc', cipherKey, iv);
const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
const mac = crypto.createHmac('sha256', macKey).update(iv).update(encrypted).digest().subarray(0, 10);
const encBuffer = Buffer.concat([encrypted, mac]);
const fileSha256 = sha256(buffer);
const fileEncSha256 = sha256(encBuffer);
const iq = await satanic.query({
tag: 'iq',
attrs: { id: satanic.generateMessageTag?.() ?? Date.now().toString(), to: 's.whatsapp.net', type: 'set', xmlns: 'w:m' },
content: [{ tag: 'media_conn', attrs: {} }]
});
const mediaConn = iq.content?.find(v => v.tag === 'media_conn');
if (!mediaConn) throw new Error('media_conn tidak ditemukan');
const auth = mediaConn.attrs?.auth;
if (!auth) throw new Error('auth media_conn tidak ditemukan');
const hosts = (mediaConn.content || [])
.filter(v => v.tag === 'host')
.map(v => v.attrs?.hostname)
.filter(Boolean);
if (!hosts.length) throw new Error('host upload tidak ditemukan');
const token = encodeURIComponent(
fileEncSha256.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
);
let lastError;
for (const host of hosts) {
try {
const json = await new Promise((resolve, reject) => {
const url = new URL(`https://${host}${mediaPath}/${token}?auth=${encodeURIComponent(auth)}&token=${token}`);
const req = https.request({
hostname: url.hostname,
port: 443,
path: url.pathname + url.search,
method: 'POST',
headers: {
Origin: 'https://web.whatsapp.com',
Referer: 'https://web.whatsapp.com/',
'Content-Type': 'application/octet-stream',
'Content-Length': encBuffer.length,
},
}, (res) => {
let body = '';
res.on('data', c => body += c);
res.on('end', () => {
if (res.statusCode < 200 || res.statusCode >= 300) {
return reject(new Error(`Upload gagal ${res.statusCode}: ${body}`));
}
try {
resolve(JSON.parse(body));
} catch {
reject(new Error(`Response bukan JSON: ${body}`));
}
});
});
req.on('error', (e) => reject(e));
req.write(encBuffer);
req.end();
});
const directPath = json.direct_path ?? json.directPath ?? json.url ?? json.path;
if (!directPath) throw new Error('directPath tidak ditemukan');
return { mediaKey, fileLength: buffer.length, fileSha256, fileEncSha256, directPath, ...json };
} catch (e) {
lastError = e;
}
}
throw lastError ?? new Error('Semua host upload gagal');
} catch (error) {
throw error;
}
}
async function sendCustomStickerPack(satanic, m, pack, packName = 'Sticker Pack') {
try {
const zip = new JSZip();
const stickersMetadata = [];
for (const item of pack) {
const fileName = `${toB64Url(sha256(item.buffer))}.${item.ext}`;
zip.file(fileName, item.buffer);
stickersMetadata.push({
fileName,
isAnimated: item.isAnimated,
emojis: [''],
accessibilityLabel: '',
isLottie: item.isLottie,
mimetype: item.mimetype,
});
}
const trayIconFileName = 'tray_icon.webp';
const traySource = pack.find(v => !v.isLottie)?.buffer;
const trayBuffer = traySource ? await makeTrayWebp(traySource) : await makeBlankTrayWebp();
zip.file(trayIconFileName, trayBuffer);
const archive = await zip.generateAsync({ type: 'nodebuffer', compression: 'STORE' });
const packUpload = await uploadToServer(satanic, archive, {
hkdf: 'WhatsApp Sticker Pack Keys',
mediaPath: '/mms/sticker-pack',
});
const thumbnailBuffer = await makeThumbnailJpeg(trayBuffer);
const thumbUpload = await uploadToServer(satanic, thumbnailBuffer, {
hkdf: 'WhatsApp Sticker Pack Thumbnail Keys',
mediaPath: '/mms/thumbnail-sticker-pack',
mediaKey: packUpload.mediaKey,
});
await satanic.relayMessage(m.chat, {
messageContextInfo: { messageSecret: crypto.randomBytes(32) },
stickerPackMessage: {
stickerPackId: 'Pack_' + crypto.randomBytes(8).toString('hex'),
name: packName,
publisher: 'Aqua- Multi Device',
packDescription: 'Satanic Haxor ',
stickers: stickersMetadata,
fileLength: packUpload.fileLength,
fileSha256: packUpload.fileSha256,
fileEncSha256: packUpload.fileEncSha256,
mediaKey: packUpload.mediaKey,
directPath: packUpload.directPath,
mediaKeyTimestamp: Math.floor(Date.now() / 1000),
stickerPackSize: packUpload.fileLength,
stickerPackOrigin: 2,
trayIconFileName,
thumbnailDirectPath: thumbUpload.directPath,
thumbnailSha256: thumbUpload.fileSha256,
thumbnailEncSha256: thumbUpload.fileEncSha256,
thumbnailHeight: 252,
thumbnailWidth: 252,
imageDataHash: thumbUpload.fileSha256.toString('base64'),
},
}, { quoted: m });
} catch (error) {
throw error;
}
}
class StickerPackScraper {
async search(query, page = 1) {
try {
const res = await axios.post(
'https://getstickerpack.com/api/v1/stickerdb/search',
{ query, page },
{ timeout: 15000 }
);
if (!res.data?.data) return [];
return res.data.data.map((v, i) => ({
no: i + 1,
name: v.title,
slug: v.slug,
download: v.download_counter || 0,
sticker_count: v.sticker_count || 0,
author: v.author || 'Unknown'
}));
} catch (e) {
return [];
}
}
async detail(slug) {
try {
const res = await axios.get(
`https://getstickerpack.com/api/v1/stickerdb/stickers/${slug}`,
{ timeout: 15000 }
);
const data = res.data?.data;
if (!data?.images) throw 'Invalid response';
return {
title: data.title,
author: data.author || 'Unknown',
stickers: data.images.map(v => ({
image: `https://s3.getstickerpack.com/${v.url}`,
animated: v.is_animated !== 0
}))
};
} catch (e) {
throw 'Gagal ambil detail';
}
}
}
const scraper = new StickerPackScraper();
const chatId = m.chat;
if (!global.searchResult[chatId]) global.searchResult[chatId] = { query: '', packs: [], timestamp: 0 };
const firstArg = args[0];
if (!isNaN(firstArg) && parseInt(firstArg) > 0) {
const index = parseInt(firstArg) - 1;
const saved = global.searchResult[chatId];
const now = Date.now();
if (saved.packs.length === 0 || (now - saved.timestamp) > 120000) {
return m.reply('⚠️ Session telah berakhir. Silakan cari ulang dengan .stickerpack <query>');
}
if (index >= saved.packs.length) {
let listMessage = '📦 *HASIL STICKER PACK*\n';
listMessage += `📌 *Kata Kunci:* ${saved.query}\n\n`;
saved.packs.slice(0, 10).forEach((p, i) => {
listMessage += `${i + 1}. ${p.name}\n`;
listMessage += `   📥 Download: ${p.download}\n\n`;
});
if (saved.packs.length > 10) {
listMessage += `_... dan ${saved.packs.length - 10} pack lainnya_\n\n`;
}
listMessage += `───────────────────\n`;
listMessage += `📝 Ketik nomor (1-${Math.min(saved.packs.length, 10)}) untuk download\nContoh : .stickerpack 2\n`;
listMessage += `⏰ Session berakhir dalam 2 menit`;
return m.reply(listMessage);
}
const pick = saved.packs[index];
await satanic.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });
await m.reply(`✨ Mengirim *${pick.name}*...`);
try {
const res = await scraper.detail(pick.slug);
if (!res.stickers.length) return m.reply('❌ Sticker pack kosong.');
let stickers = res.stickers;
let packItems = [];
for (let s of stickers) {
try {
const img = await axios.get(s.image, {
responseType: 'arraybuffer',
timeout: 15000
});
let buffer = Buffer.from(img.data);
if (!validateSticker(buffer)) continue;
let webpBuffer = buffer;
const format = detectImageFormat(buffer);
if (format !== 'webp') {
webpBuffer = await convertToWebP(buffer);
if (!webpBuffer) continue;
}
const classification = classifySticker(webpBuffer, { isLottie: false });
packItems.push({
buffer: webpBuffer,
ext: classification.ext,
isAnimated: classification.isAnimated,
isLottie: classification.isLottie,
mimetype: classification.mimetype
});
} catch (e) {}
}
if (!packItems.length) {
await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
return m.reply('❌ Gagal download sticker');
}
await sendCustomStickerPack(satanic, m, packItems, res.title);
await m.reply(`✅ Berhasil mengirim pack sticker "${res.title}" (${packItems.length} sticker)`);
await satanic.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
} catch (error) {
await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
m.reply(`❌ Error: ${error.message}`);
}
return;
}
const query = args.join(' ');
const packs = await scraper.search(query);
if (!packs.length) {
await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
return m.reply('❌ Sticker pack tidak ditemukan.');
}
global.searchResult[chatId] = {
query: query,
packs: packs,
timestamp: Date.now()
};
let listMessage = '📦 *HASIL STICKER PACK*\n';
listMessage += `📌 *Kata Kunci:* ${query}\n\n`;
packs.slice(0, 10).forEach((p, i) => {
listMessage += `${i + 1}. ${p.name}\n`;
listMessage += `   📥 Download: ${p.download}\n\n`;
});
if (packs.length > 10) {
listMessage += `_... dan ${packs.length - 10} pack lainnya_\n\n`;
}
listMessage += `───────────────────\n`;
listMessage += `📝 Ketik nomor (1-${Math.min(packs.length, 10)}) untuk download\n`;
listMessage += `⏰ Session berakhir dalam 2 menit`;
await satanic.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
m.reply(listMessage);
break;
}
case 'spackpin':
case 'stickerpackpin': {
if (!m.isGroup) {
return m.reply('Fitur Khusus Group!');
}
await satanic.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });
let args = m.text.split(' ').slice(1);
if (!args.length) {
return m.reply(`📌 Cara pakai:
.stickerpackpin <query> - Cari dan kirim semua pin sebagai sticker pack

📌 Contoh:
.stickerpackpin cat cute
.stickerpackpin anime girl`);
}
const axios = require('axios');
const crypto = require('crypto');
const https = require('https');
const JSZip = require('jszip');
const sharp = require('sharp');
if (!global.getStickerSession) global.getStickerSession = {};
function sha256(buffer) {
return crypto.createHash('sha256').update(buffer).digest();
}
function toB64Url(buffer) {
return Buffer.from(buffer)
.toString('base64')
.replace(/\+/g, '-')
.replace(/\//g, '_')
.replace(/=+$/g, '');
}
function isWebP(buffer) {
if (!buffer || !Buffer.isBuffer(buffer) || buffer.length < 12) return false;
return buffer.toString('ascii', 0, 4) === 'RIFF' &&
buffer.toString('ascii', 8, 12) === 'WEBP';
}
function isAnimatedWebP(buffer) {
if (!isWebP(buffer)) return false;
let offset = 12;
while (offset < buffer.length - 8) {
const chunk = buffer.toString('ascii', offset, offset + 4);
const size = buffer.readUInt32LE(offset + 4);
if (chunk === 'VP8X' && (buffer[offset + 8] & 0x02)) return true;
if (chunk === 'ANIM' || chunk === 'ANMF') return true;
offset += 8 + size + (size % 2);
}
return false;
}
function detectImageFormat(buffer) {
if (!buffer || !Buffer.isBuffer(buffer) || buffer.length < 12) return 'unknown';
try {
const header = buffer.slice(0, 12);
if (header.length >= 4 && header.toString('hex', 0, 4) === '89504e47') return 'png';
if (header.length >= 3 && header.toString('hex', 0, 3) === 'ffd8ff') return 'jpg';
if (header.length >= 12 && header.toString('ascii', 0, 4) === 'RIFF' &&
header.toString('ascii', 8, 12) === 'WEBP') return 'webp';
if (header.length >= 6 && header.toString('hex', 0, 6) === '47494638') return 'gif';
if (header.length >= 2 && header.toString('hex', 0, 2) === '424d') return 'bmp';
if (header.length >= 5 && (header.toString('hex', 0, 5) === '3c3f786d6c' ||
header.toString('hex', 0, 4) === '3c7376')) return 'svg';
return 'unknown';
} catch (e) {
return 'unknown';
}
}
async function convertToWebP(buffer) {
if (!buffer || !Buffer.isBuffer(buffer)) return null;
const format = detectImageFormat(buffer);
try {
if (format === 'webp') return buffer;
if (['svg', 'unknown'].includes(format)) return null;
let sharpInstance = sharp(buffer);
sharpInstance = sharpInstance.resize(512, 512, {
fit: 'contain',
background: { r: 255, g: 255, b: 255, alpha: 0 }
});
return await sharpInstance.webp({
quality: 80,
effort: 4
}).toBuffer();
} catch (error) {
return null;
}
}
function validateSticker(buffer) {
if (!buffer || !Buffer.isBuffer(buffer) || buffer.length < 12) return false;
const format = detectImageFormat(buffer);
const supportedFormats = ['png', 'jpg', 'webp', 'gif', 'bmp'];
return supportedFormats.includes(format);
}
function classifySticker(buffer, stickerMessage) {
if (stickerMessage && stickerMessage.isLottie) {
return { ext: 'json', mimetype: 'application/json', isAnimated: true, isLottie: true };
}
const isAnimated = isWebP(buffer) ? isAnimatedWebP(buffer) : false;
return { ext: 'webp', mimetype: 'image/webp', isAnimated: isAnimated, isLottie: false };
}
async function makeTrayWebp(buffer) {
if (!buffer || !Buffer.isBuffer(buffer)) return await makeBlankTrayWebp();
try {
return await sharp(buffer, { animated: false })
.resize(252, 252, { fit: 'cover' })
.webp()
.toBuffer();
} catch (e) {
return await makeBlankTrayWebp();
}
}
async function makeBlankTrayWebp() {
return await sharp({
create: { width: 252, height: 252, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
}).webp().toBuffer();
}
async function makeThumbnailJpeg(buffer) {
if (!buffer || !Buffer.isBuffer(buffer)) {
return await sharp({
create: { width: 252, height: 252, channels: 3, background: { r: 255, g: 255, b: 255 } }
}).jpeg().toBuffer();
}
try {
return await sharp(buffer)
.resize(252, 252, { fit: 'cover' })
.jpeg()
.toBuffer();
} catch (e) {
return await sharp({
create: { width: 252, height: 252, channels: 3, background: { r: 255, g: 255, b: 255 } }
}).jpeg().toBuffer();
}
}
async function uploadToServer(satanic, buffer, { hkdf, mediaPath, mediaKey = crypto.randomBytes(32) }) {
try {
const expanded = Buffer.from(
crypto.hkdfSync('sha256', mediaKey, Buffer.alloc(32), Buffer.from(hkdf), 112)
);
const iv = expanded.subarray(0, 16);
const cipherKey = expanded.subarray(16, 48);
const macKey = expanded.subarray(48, 80);
const cipher = crypto.createCipheriv('aes-256-cbc', cipherKey, iv);
const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
const mac = crypto.createHmac('sha256', macKey).update(iv).update(encrypted).digest().subarray(0, 10);
const encBuffer = Buffer.concat([encrypted, mac]);
const fileSha256 = sha256(buffer);
const fileEncSha256 = sha256(encBuffer);
const iq = await satanic.query({
tag: 'iq',
attrs: { id: satanic.generateMessageTag?.() ?? Date.now().toString(), to: 's.whatsapp.net', type: 'set', xmlns: 'w:m' },
content: [{ tag: 'media_conn', attrs: {} }]
});
const mediaConn = iq.content?.find(v => v.tag === 'media_conn');
if (!mediaConn) throw new Error('media_conn tidak ditemukan');
const auth = mediaConn.attrs?.auth;
if (!auth) throw new Error('auth media_conn tidak ditemukan');
const hosts = (mediaConn.content || [])
.filter(v => v.tag === 'host')
.map(v => v.attrs?.hostname)
.filter(Boolean);
if (!hosts.length) throw new Error('host upload tidak ditemukan');
const token = encodeURIComponent(
fileEncSha256.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
);
let lastError;
for (const host of hosts) {
try {
const json = await new Promise((resolve, reject) => {
const url = new URL(`https://${host}${mediaPath}/${token}?auth=${encodeURIComponent(auth)}&token=${token}`);
const req = https.request({
hostname: url.hostname,
port: 443,
path: url.pathname + url.search,
method: 'POST',
headers: {
Origin: 'https://web.whatsapp.com',
Referer: 'https://web.whatsapp.com/',
'Content-Type': 'application/octet-stream',
'Content-Length': encBuffer.length,
},
}, (res) => {
let body = '';
res.on('data', c => body += c);
res.on('end', () => {
if (res.statusCode < 200 || res.statusCode >= 300) {
return reject(new Error(`Upload gagal ${res.statusCode}: ${body}`));
}
try {
resolve(JSON.parse(body));
} catch {
reject(new Error(`Response bukan JSON: ${body}`));
}
});
});
req.on('error', (e) => reject(e));
req.write(encBuffer);
req.end();
});
const directPath = json.direct_path ?? json.directPath ?? json.url ?? json.path;
if (!directPath) throw new Error('directPath tidak ditemukan');
return { mediaKey, fileLength: buffer.length, fileSha256, fileEncSha256, directPath, ...json };
} catch (e) {
lastError = e;
}
}
throw lastError ?? new Error('Semua host upload gagal');
} catch (error) {
throw error;
}
}
async function sendCustomStickerPack(satanic, m, pack, packName = 'Sticker Pack') {
try {
const zip = new JSZip();
const stickersMetadata = [];
for (const item of pack) {
const fileName = `${toB64Url(sha256(item.buffer))}.${item.ext}`;
zip.file(fileName, item.buffer);
stickersMetadata.push({
fileName,
isAnimated: item.isAnimated,
emojis: [''],
accessibilityLabel: '',
isLottie: item.isLottie,
mimetype: item.mimetype,
});
}
const trayIconFileName = 'tray_icon.webp';
const traySource = pack.find(v => !v.isLottie)?.buffer;
const trayBuffer = traySource ? await makeTrayWebp(traySource) : await makeBlankTrayWebp();
zip.file(trayIconFileName, trayBuffer);
const archive = await zip.generateAsync({ type: 'nodebuffer', compression: 'STORE' });
const packUpload = await uploadToServer(satanic, archive, {
hkdf: 'WhatsApp Sticker Pack Keys',
mediaPath: '/mms/sticker-pack',
});
const thumbnailBuffer = await makeThumbnailJpeg(trayBuffer);
const thumbUpload = await uploadToServer(satanic, thumbnailBuffer, {
hkdf: 'WhatsApp Sticker Pack Thumbnail Keys',
mediaPath: '/mms/thumbnail-sticker-pack',
mediaKey: packUpload.mediaKey,
});
await satanic.relayMessage(m.chat, {
messageContextInfo: { messageSecret: crypto.randomBytes(32) },
stickerPackMessage: {
stickerPackId: 'Pack_' + crypto.randomBytes(8).toString('hex'),
name: packName,
publisher: 'Aqua - Multi device',
packDescription: 'Satanic Haxor',
stickers: stickersMetadata,
fileLength: packUpload.fileLength,
fileSha256: packUpload.fileSha256,
fileEncSha256: packUpload.fileEncSha256,
mediaKey: packUpload.mediaKey,
directPath: packUpload.directPath,
mediaKeyTimestamp: Math.floor(Date.now() / 1000),
stickerPackSize: packUpload.fileLength,
stickerPackOrigin: 2,
trayIconFileName,
thumbnailDirectPath: thumbUpload.directPath,
thumbnailSha256: thumbUpload.fileSha256,
thumbnailEncSha256: thumbUpload.fileEncSha256,
thumbnailHeight: 252,
thumbnailWidth: 252,
imageDataHash: thumbUpload.fileSha256.toString('base64'),
},
}, { quoted: m });
} catch (error) {
throw error;
}
}
async function getCookies() {
try {
const response = await axios.get('https://www.pinterest.com/csrf_error/');
const setCookieHeaders = response.headers['set-cookie'];
if (setCookieHeaders) {
const cookies = setCookieHeaders.map(cookieString => {
const cookieParts = cookieString.split(';');
const cookieKeyValue = cookieParts[0].trim();
return cookieKeyValue;
});
return cookies.join('; ');
} else {
return null;
}
} catch (error) {
return null;
}
}
async function pinterest(query) {
try {
const cookies = await getCookies();
if (!cookies) {
return [];
}
const url = 'https://www.pinterest.com/resource/BaseSearchResource/get/';
const params = {
source_url: `/search/pins/?q=${query}`,
data: JSON.stringify({
"options": {
"isPrefetch": false,
"query": query,
"scope": "pins",
"no_fetch_context_on_resource": false
},
"context": {}
}),
_: Date.now()
};
const headers = {
'accept': 'application/json, text/javascript, */*, q=0.01',
'accept-encoding': 'gzip, deflate',
'accept-language': 'en-US,en;q=0.9',
'cookie': cookies,
'dnt': '1',
'referer': 'https://www.pinterest.com/',
'sec-ch-ua': '"Not(A:Brand";v="99", "Microsoft Edge";v="133", "Chromium";v="133"',
'sec-ch-ua-full-version-list': '"Not(A:Brand";v="99.0.0.0", "Microsoft Edge";v="133.0.3065.92", "Chromium";v="133.0.6943.142"',
'sec-ch-ua-mobile': '?0',
'sec-ch-ua-model': '""',
'sec-ch-ua-platform': '"Windows"',
'sec-ch-ua-platform-version': '"10.0.0"',
'sec-fetch-dest': 'empty',
'sec-fetch-mode': 'cors',
'sec-fetch-site': 'same-origin',
'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0',
'x-app-version': 'c056fb7',
'x-pinterest-appstate': 'active',
'x-pinterest-pws-handler': 'www/[username]/[slug].js',
'x-pinterest-source-url': '/hargr003/cat-pictures/',
'x-requested-with': 'XMLHttpRequest'
};
const { data } = await axios.get(url, {
headers: headers,
params: params
})
const container = [];
const results = data.resource_response?.data?.results?.filter((v) => v.images?.orig) || [];
results.forEach((result) => {
container.push({
upload_by: result.pinner?.username || 'Unknown',
fullname: result.pinner?.full_name || 'Unknown',
followers: result.pinner?.follower_count || 0,
caption: result.grid_title || '',
image: result.images?.orig?.url || '',
source: "https://id.pinterest.com/pin/" + result.id,
});
});
return container;
} catch (error) {
return [];
}
}
const query = args.join(' ');
await m.reply(`🔍 Mencari pin dari Pinterest...`);
const pins = await pinterest(query);
if (!pins.length) {
await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
return m.reply('❌ Tidak ditemukan pin dari Pinterest.');
}
let packItems = [];
let successCount = 0;
for (let i = 0; i < pins.length; i++) {
try {
const pin = pins[i];
const img = await axios.get(pin.image, {
responseType: 'arraybuffer',
timeout: 30000
});
let buffer = Buffer.from(img.data);
if (!validateSticker(buffer)) continue;
let webpBuffer = buffer;
const format = detectImageFormat(buffer);
if (format !== 'webp') {
webpBuffer = await convertToWebP(buffer);
if (!webpBuffer) continue;
}
const classification = classifySticker(webpBuffer, { isLottie: false });
packItems.push({
buffer: webpBuffer,
ext: classification.ext,
isAnimated: classification.isAnimated,
isLottie: classification.isLottie,
mimetype: classification.mimetype
});
successCount++;
} catch (e) {}
}
if (!packItems.length) {
await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
return m.reply('❌ Gagal mengkonversi pin ke sticker');
}
try {
await sendCustomStickerPack(satanic, m, packItems, `Pinterest - ${query}`);
await satanic.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
} catch (error) {
await satanic.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
m.reply(`❌ Error: ${error.message}`);
}
break;
}
case 'balogo': {
if (!text) return reply(`Contoh:\n${prefix}${command} sata ganz`);
try {
const encodedText = encodeURIComponent(text);
const url = `https://api.nexray.eu.cc/maker/balogo?text=${encodedText}`;
const response = await axios({
method: 'GET',
url: url,
responseType: 'arraybuffer'
});
const buffer = Buffer.from(response.data, 'binary');
await satanic.sendMessage(m.chat, {
image: buffer,
caption: `Logo: ${text}`
}, { quoted: fkontak });
} catch (error) {
console.error('Error:', error.message);
reply('Gagal mengambil gambar dari API');
}
break;
} 
case 'tts':
case 'texttospeech':
case 'say':
case 'ttsgoku':
case 'ttseminem':
case 'ttsmickey':
case 'ttsnahida':
case 'ttselon':
case 'ttsoptimus': {
const _ttsT = text?.trim();
if (!_ttsT) return reply(`TTS\n\nVoice tersedia: tts, ttsgoku, ttseminem, ttsmickey, ttsnahida, ttselon\nFormat: ${prefix}tts <teks>\n\nContoh: ${prefix}ttsgoku Hai semuanya!`);
const _ttsVK = { ttsgoku: 'goku', ttseminem: 'eminem', ttsmickey: 'mickey_mouse', ttsnahida: 'nahida', ttselon: 'elon_musk', ttsoptimus: 'optimus_prime' };
const _ttsVoice = _ttsVK[command] || null;
await satanic.sendMessage(m.chat, { react: { text: '🎤', key: m.key } });
await reply(`Generating ${_ttsVoice || 'random'} voice...\nTeks: ${_ttsT}`);
if (!fs.existsSync('./temp')) fs.mkdirSync('./temp', { recursive: true });
const _ttsTs = Date.now(), _ttsWav = `./temp/tts_${_ttsTs}.wav`, _ttsOgg = `./temp/tts_${_ttsTs}.ogg`;
try {
const _ttsR = await axios.get(`https://api.emiliabot.my.id/tools/text-to-speech?text=${encodeURIComponent(_ttsT)}`, { timeout: 60000 });
if (!_ttsR.data?.status || !_ttsR.data?.result?.length) throw new Error('API tidak merespon atau kosong');
const _ttsVoices = _ttsR.data.result.filter(v => !v.error);
if (!_ttsVoices.length) throw new Error('Semua model TTS error');
let _ttsObj = _ttsVoice ? _ttsVoices.find(v => v[_ttsVoice]) : null;
if (!_ttsObj) _ttsObj = _ttsVoices[Math.floor(Math.random() * _ttsVoices.length)];
const _ttsAK = Object.keys(_ttsObj).find(k => !['channel_id', 'voice_name', 'voice_id'].includes(k) && String(_ttsObj[k]).startsWith('https://'));
if (!_ttsAK) throw new Error('Audio URL tidak ditemukan dari API');
const _ttsAR = await axios.get(_ttsObj[_ttsAK], { responseType: 'arraybuffer', timeout: 30000 });
fs.writeFileSync(_ttsWav, Buffer.from(_ttsAR.data));
execSync(`ffmpeg -y -i "${_ttsWav}" -c:a libopus -b:a 64k "${_ttsOgg}"`, { stdio: 'ignore', timeout: 30000 });
await satanic.sendMessage(m.chat, { audio: fs.readFileSync(_ttsOgg), mimetype: 'audio/ogg; codecs=opus', ptt: true }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (e) {
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
reply(`TTS Gagal!\n\n${e.message.slice(0, 150)}`);
} finally {
try { if (fs.existsSync(_ttsWav)) fs.unlinkSync(_ttsWav); } catch {}
try { if (fs.existsSync(_ttsOgg)) fs.unlinkSync(_ttsOgg); } catch {}
}
break;
}

case "soundmeme": {
if (!isCreator) return reply(mess.owner);
if (!text) return reply("Masukkan nama suara!\nContoh: .soundmeme-search sound");
const baseUrl = 'https://www.myinstants.com/en/search/?name=';
const url = `${baseUrl}${encodeURIComponent(text)}`;
try {
const { data } = await axios.get(url, {
headers: {
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36'
}
});
const $ = cheerio.load(data);
const instants = $('div.instant');
if (instants.length === 0) {
return m.reply('Suara tidak ditemukan dengan nama tersebut.');
}
let closestMatch = '';
let bestMatchScore = 0;
instants.each((index, element) => {
const soundName = $(element).find('.instant-link').text().trim();
const score = soundName.toLowerCase().includes(text.toLowerCase()) ? 1 : 0;
if (score > bestMatchScore) {
bestMatchScore = score;
closestMatch = soundName;
}
});
if (closestMatch) {
const audioUrl = `https://www.myinstants.com${$('div.instant').find('button').attr('onclick').match(/'([^']+)'/)[1]}`;
const response = await axios({
url: audioUrl,
method: 'GET',
responseType: 'arraybuffer'
});
const contentType = response.headers['content-type'];
let mimetype = 'audio/mpeg';
if (contentType.includes('mp3')) {
mimetype = 'audio/mp3';
} else if (contentType.includes('ogg')) {
mimetype = 'audio/ogg';
} else if (contentType.includes('wav')) {
mimetype = 'audio/wav';
}
await satanic.sendMessage(m.chat, {
audio: response.data,
mimetype: mimetype,
ptt: false
}, { quoted: m });
} else {
m.reply('Tidak ada suara yang mendekati nama yang dicari.');
}
} catch (err) {
console.error(err);
m.reply('Terjadi kesalahan saat mengambil suara.');
}
break;
}
case 'bass':
case 'blown':
case 'deep':
case 'earrape':
case 'fast':
case 'fat':
case 'nightcore':
case 'reverse':
case 'robot':
case 'slow':
case 'smooth':
case 'squirrel': {
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/audio/.test(mime)) return reply(`Reply audio dengan caption ${prefix + command}`);
try {
let set;
if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20';
else if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log';
else if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3';
else if (/earrape/.test(command)) set = '-af volume=12';
else if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"';
else if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"';
else if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25';
else if (/reverse/.test(command)) set = '-filter_complex "areverse"';
else if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"';
else if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"';
else if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"';
else if (/squirrel/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"';
if (set) {
await reply(mess.wait || 'Processing audio...');
let media = await satanic.downloadAndSaveMediaMessage(quoted);
let ran = getRandom('.mp3');
console.log(`Running ffmpeg command: ffmpeg -i ${media} ${set} ${ran}`);
exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
fs.unlinkSync(media);
if (err) {
console.error(`ffmpeg error: ${err}`);
return reply(err);
}
let buff = fs.readFileSync(ran);
satanic.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: fkontak });
fs.unlinkSync(ran);
});
} else {
reply('Invalid command');
}
} catch (e) {
console.error(e);
reply(e.message || 'Terjadi kesalahan');
}
break;
}
case "ttsdracin": {
if (!isPrem) return reply('only premium');
if (!text) return m.reply("Masukkan teks!\nContoh: .tts Halo semua");
try {
const encodedText = encodeURIComponent(text);
const url = `https://api.nexray.eu.cc/ai/dracin-tts?text=${encodedText}&speed=1.0&volume=0.3&music=true`;
await m.reply("Sedang memproses...");
const response = await fetch(url);
const data = await response.json();
if (data.status && data.result) {
const audioResponse = await fetch(data.result);
const audioBuffer = await audioResponse.buffer();
await satanic.sendMessage(m.chat, { audio: audioBuffer, mimetype: 'audio/mpeg', ptt: true }, { quoted: m });
} else {
await m.reply('Gagal membuat TTS');
}
} catch (error) {
await m.reply('Error: ' + error.message);
}
break;
}
case 'swm':
case 'steal':
case 'stickerwm':
case 'take': {

try {
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
const quoted = m.quoted ? m.quoted : m;
const qmsg = quoted.msg || quoted;
const mime = qmsg.mimetype || '';
if (!mime || !mime.includes('webp')) {
return await m.reply('Reply sticker WEBP biasa dulu.');
}
const stream = await downloadContentFromMessage(qmsg, 'sticker');
const chunks = [];
for await (const chunk of stream) chunks.push(chunk);
const stickerBuffer = Buffer.concat(chunks);
const SwmTeks = m.body || "";
const textAfterCommand = SwmTeks.replace(new RegExp(`^${prefix}${command}\\s*`), "").trim();
const swn = textAfterCommand || "";
const pcknm = swn.split("|")[0]?.trim() || "";
const atnm = swn.split("|")[1]?.trim() || "";
const packName = pcknm || "Sticker";
const authorName = atnm || "Bot";
const metadata = {
'sticker-pack-id': '2be7e369-b5ce-4706-a3d4-f78805a20328',
'sticker-pack-name': packName,
'sticker-pack-publisher': authorName,
'accessibility-text': 'Satanic Haxor',
'android-app-store-link': 'https://whatsapp.com',
'ios-app-store-link': 'https://whatsapp.com/ios',
emojis: ['🦸', '😴', '😌'],
'is-from-sticker-maker': 0,
'is-avatar-sticker': 1,
'avatar-sticker-template-id': 'whatsapp',
'is-ai-sticker': 1,
'is-avatar-country-sticker': 1,
'is-avatar-instant-sticker': 1,
'sticker-maker-source-type': 4,
'is-avatar-social-sticker': 1,
'avatar-sticker-style': 'whatsapp',
'avatar-sticker-revision-id': '2026',
'is-from-user-created-pack': 1,
'origin-pack-id': 'whatsapp',
'is-text-sticker': 1
};
const json = Buffer.from(JSON.stringify(metadata), 'utf-8');
const exif = Buffer.concat([
Buffer.from([0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00]),
Buffer.alloc(4),
Buffer.from([0x16, 0x00, 0x00, 0x00]),
json
]);
exif.writeUInt32LE(json.length, 14);
const typeBuffer = Buffer.from('EXIF');
const sizeBuffer = Buffer.alloc(4);
sizeBuffer.writeUInt32LE(exif.length, 0);
const padding = exif.length % 2 === 1 ? Buffer.from([0x00]) : Buffer.alloc(0);
const exifChunk = Buffer.concat([typeBuffer, sizeBuffer, exif, padding]);
if (stickerBuffer.slice(0, 4).toString() !== 'RIFF' || stickerBuffer.slice(8, 12).toString() !== 'WEBP') {
throw new Error('File bukan WEBP valid.');
}
const chunks_ = [];
let offset = 12;
while (offset + 8 <= stickerBuffer.length) {
const type = stickerBuffer.slice(offset, offset + 4).toString();
const size = stickerBuffer.readUInt32LE(offset + 4);
const chunkStart = offset;
const chunkEnd = offset + 8 + size + (size % 2);
if (chunkEnd > stickerBuffer.length) break;
if (type !== 'EXIF') chunks_.push(stickerBuffer.slice(chunkStart, chunkEnd));
offset = chunkEnd;
}
const body = Buffer.concat([...chunks_, exifChunk]);
const header = Buffer.alloc(12);
header.write('RIFF', 0);
header.writeUInt32LE(body.length + 4, 4);
header.write('WEBP', 8);
const finalBuffer = Buffer.concat([header, body]);
const media = await prepareWAMessageMedia(
{ sticker: finalBuffer },
{ upload: satanic.waUploadToServer }
);
const msgContent = {
messageContextInfo: {
limitSharingV2: {
sharingLimited: true,
trigger: 'CHAT_SETTING',
limitSharingSettingTimestamp: Date.now().toString(),
initiatedByMe: true
}
},
stickerMessage: {
...media.stickerMessage,
isAnimated: qmsg.isAnimated || false,
isAvatar: true,
isAiSticker: true,
isLottie: false
}
};
const msg = await generateWAMessageFromContent(m.chat, msgContent, {
quoted: m,
userJid: satanic.user.id
});
await satanic.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (e) {
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
await m.reply('Gagal inject atribut sticker.\nPastikan reply sticker WEBP biasa.');
}
}
break;
case 'ttsjokowi': {
if (!isPrem) return reply('you are not premium');
try {
let text = args.join(' ') || m.quoted?.text || '';
if (!text) return m.reply("Masukkan kata");
if (text.length > 5000) return m.reply("Teks terlalu panjang");
await satanic.sendMessage(m.chat, { react: { text: '⏱️', key: m.key } });
const { data } = await axios.get('https://api.termai.cc/api/text2speech/elevenlabs', {
params: { text, key: 'Bell409', voice: 'jokowi', speed: 1 },
responseType: 'arraybuffer',
timeout: 30000
});
await satanic.sendMessage(m.chat, { audio: data, mimetype: 'audio/mpeg', ptt: false }, { quoted: m });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (error) {
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
m.reply(error.response ? `API Error: ${error.response.status}` : error.code === 'ECONNABORTED' ? 'Timeout' : `Error: ${error.message}`);
}
break;
}

case 'ttsprabowo': {
if (!isPrem) return reply('you are not premium');
try {
let text = args.join(' ') || m.quoted?.text || '';
if (!text) return m.reply("Masukkan kata");
if (text.length > 5000) return m.reply("Teks terlalu panjang");
await satanic.sendMessage(m.chat, { react: { text: '⏱️', key: m.key } });
const { data } = await axios.get('https://api.termai.cc/api/text2speech/elevenlabs', {
params: { text, key: 'Bell409', voice: 'prabowo', speed: 1 },
responseType: 'arraybuffer',
timeout: 30000
});
await satanic.sendMessage(m.chat, { audio: data, mimetype: 'audio/mpeg', ptt: false }, { quoted: m });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (error) {
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
m.reply(error.response ? `API Error: ${error.response.status}` : error.code === 'ECONNABORTED' ? 'Timeout' : `Error: ${error.message}`);
}
break;
}

case 'ttsechilling': {
if (!isPrem) return reply('you are not premium');
try {
let text = args.join(' ') || m.quoted?.text || '';
if (!text) return m.reply("Masukkan kata");
if (text.length > 5000) return m.reply("Teks terlalu panjang");
await satanic.sendMessage(m.chat, { react: { text: '⏱️', key: m.key } });
const { data } = await axios.get('https://api.termai.cc/api/text2speech/elevenlabs', {
params: { text, key: 'Bell409', voice: 'echilling', speed: 1 },
responseType: 'arraybuffer',
timeout: 30000
});
await satanic.sendMessage(m.chat, { audio: data, mimetype: 'audio/mpeg', ptt: false }, { quoted: m });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (error) {
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
m.reply(error.response ? `API Error: ${error.response.status}` : error.code === 'ECONNABORTED' ? 'Timeout' : `Error: ${error.message}`);
}
break;
}

case 'ttsmegawati': {
if (!isPrem) return reply('you are not premium');
try {
let text = args.join(' ') || m.quoted?.text || '';
if (!text) return m.reply("Masukkan kata");
if (text.length > 5000) return m.reply("Teks terlalu panjang");
await satanic.sendMessage(m.chat, { react: { text: '⏱️', key: m.key } });
const { data } = await axios.get('https://api.termai.cc/api/text2speech/elevenlabs', {
params: { text, key: 'Bell409', voice: 'megawati', speed: 1 },
responseType: 'arraybuffer',
timeout: 30000
});
await satanic.sendMessage(m.chat, { audio: data, mimetype: 'audio/mpeg', ptt: false }, { quoted: m });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (error) {
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
m.reply(error.response ? `API Error: ${error.response.status}` : error.code === 'ECONNABORTED' ? 'Timeout' : `Error: ${error.message}`);
}
break;
}
case 'togif': {
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
async function webp2GifFile(path) {
return new Promise(async (resolve, reject) => {
try {
const form = new FormData();
form.append('new-image-url', '');
form.append('new-image', fs.createReadStream(path));
const { data: firstPage } = await axios({
method: 'post',
url: 'https://ezgif.com/webp-to-mp4',
data: form,
headers: {
'Content-Type': `multipart/form-data; boundary=${form._boundary}`
}
});
const $ = cheerio.load(firstPage);
const file = $('input[name="file"]').attr('value');
if (!file) {
throw new Error('Tidak dapat menemukan file input pada halaman');
}
const formDataThen = new FormData();
formDataThen.append('file', file);
formDataThen.append('convert', "Convert WebP to MP4!");
const { data: secondPage } = await axios({
method: 'post',
url: `https://ezgif.com/webp-to-mp4/${file}`,
data: formDataThen,
headers: {
'Content-Type': `multipart/form-data; boundary=${formDataThen._boundary}`
}
});
const $$ = cheerio.load(secondPage);
let videoSrc = $$('div#output video source').attr('src');
if (!videoSrc) videoSrc = $$('#output video source').attr('src');
if (!videoSrc) videoSrc = $$('video source').attr('src');
if (!videoSrc) videoSrc = $$('.outfile video source').attr('src');
if (!videoSrc) {
const downloadLink = $$('a#download').attr('href');
if (downloadLink) {
videoSrc = downloadLink;
} else {
throw new Error('Tidak dapat menemukan URL video hasil konversi');
}
}
let resultUrl = videoSrc;
if (videoSrc.startsWith('//')) {
resultUrl = 'https:' + videoSrc;
} else if (!videoSrc.startsWith('http')) {
resultUrl = 'https://ezgif.com' + (videoSrc.startsWith('/') ? videoSrc : '/' + videoSrc);
}
resolve({
status: true,
message: "SATANIC HAXOR (NEWCODING)",
result: resultUrl
});
} catch (err) {
reject(err);
}
});
}
if (!/webp/i.test(mime)) return reply(`Format tidak didukung. Gunakan perintah ${prefix + command} pada stiker.`);
reply('wait be processed');
let media = null;
try {
media = await satanic.downloadAndSaveMediaMessage(quoted);
if (!media || !fs.existsSync(media)) {
throw new Error('Gagal mendownload media');
}
const webpToGif = await webp2GifFile(media);
if (!webpToGif || !webpToGif.result) {
throw new Error('Hasil konversi kosong');
}
await satanic.sendMessage(m.chat, {
video: { url: webpToGif.result },
caption: 'Berhasil dikonversi dari stiker ke GIF.',
gifPlayback: true
}, { quoted: fkontak });
} catch (err) {
console.error('togif error:', err.message || err);
reply(`Terjadi kesalahan: ${err.message || 'Gagal mengonversi stiker ke GIF.'}`);
} finally {
if (media && fs.existsSync(media)) {
try {
await fs.unlinkSync(media);
} catch (e) {
console.error('Gagal hapus file:', e);
}
}
}
}
break;

case 'toimg': {
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/webp/.test(mime)) return reply(`Reply sticker dengan caption ${prefix + command}`);
let media = await satanic.downloadAndSaveMediaMessage(quoted);
let ran = await getRandom('.png');
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media);
if (err) throw err;
let buffer = fs.readFileSync(ran);
satanic.sendMessage(m.chat, { image: buffer }, { quoted: fkontak });
fs.unlinkSync(ran);
});
}
break;

case 'toptv': {
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
let q = m.quoted ? m.quoted : m;
if (!/video|audio/.test(mime)) return reply(`Hmm, Kamu harus balas video atau voice note yang mau dijadikan MP3 ya, jangan lupa pakai caption ${prefix + command} 😉`);
try {
let media = await q.download();
let dataVideo = {
ptvMessage: m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage
};
satanic.relayMessage(m.chat, dataVideo, {});
} catch (error) {
console.log(error);
reply("Aduh, ada yang salah nih kak 😟. Coba lagi ya!");
}
}
break;

case 'toaud':
case 'tomp3':
case 'toaudio': {
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/video/.test(mime) && !/audio/.test(mime)) return reply(`Send/Reply Video/Audio You Want to Use as Audio With Caption ${prefix + command}`);
reply(mess.wait);
let media = await quoted.download();
let { toAudio } = require('./lib/converter');
let audio = await toAudio(media, 'mp4');
satanic.sendMessage(m.chat, { audio: audio, mimetype: 'audio/mpeg' }, { quoted: m });
}
break;

case 'tovn':
case 'toptt': {
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/video/.test(mime) && !/audio/.test(mime)) return reply(`Reply Video/Audio That You Want To Be VN With Caption ${prefix + command}`);
reply(mess.wait);
let media = await quoted.download();
let { toPTT } = require('./lib/converter');
let audio = await toPTT(media, 'mp4');
satanic.sendMessage(m.chat, { audio: audio, mimetype: 'audio/mpeg', ptt: true }, { quoted: fkontak });
}
break;

case 's':
case 'sticker':
case 'stiker': {
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!mime) return reply(`Kirim atau balas gambar/video/gif dengan caption ${prefix + command}`);
if (/image/.test(mime)) {
let media = await satanic.downloadAndSaveMediaMessage(quoted);
await satanic.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author });
} else if (/video/.test(mime)) {
let media = await satanic.downloadAndSaveMediaMessage(quoted);
await satanic.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author });
} else {
reply(`Kirim atau balas gambar/video/gif dengan caption ${prefix + command}`);
}
}
break;
case 'tovideo': {
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
if (!/webp/.test(mime)) return reply(`Reply sticker dengan caption ${prefix + command}`);
reply('wait be processed');
let media = null;
try {
media = await satanic.downloadAndSaveMediaMessage(quoted);
if (!media || !fs.existsSync(media)) {
throw new Error('Gagal mendownload media');
}
const form = new FormData();
form.append('new-image-url', '');
form.append('new-image', fs.createReadStream(media));
const { data: firstPage } = await axios({
method: 'post',
url: 'https://ezgif.com/webp-to-mp4',
data: form,
headers: {
'Content-Type': `multipart/form-data; boundary=${form._boundary}`
}
});
const $ = cheerio.load(firstPage);
const file = $('input[name="file"]').attr('value');
if (!file) {
throw new Error('Tidak dapat menemukan file input pada halaman');
}
const formDataThen = new FormData();
formDataThen.append('file', file);
formDataThen.append('convert', "Convert WebP to MP4!");
const { data: secondPage } = await axios({
method: 'post',
url: `https://ezgif.com/webp-to-mp4/${file}`,
data: formDataThen,
headers: {
'Content-Type': `multipart/form-data; boundary=${formDataThen._boundary}`
}
});
const $$ = cheerio.load(secondPage);
let videoSrc = $$('div#output video source').attr('src');
if (!videoSrc) videoSrc = $$('#output video source').attr('src');
if (!videoSrc) videoSrc = $$('video source').attr('src');
if (!videoSrc) videoSrc = $$('.outfile video source').attr('src');
if (!videoSrc) {
const downloadLink = $$('a#download').attr('href');
if (downloadLink) {
videoSrc = downloadLink;
} else {
throw new Error('Tidak dapat menemukan URL video hasil konversi');
}
}
let resultUrl = videoSrc;
if (videoSrc.startsWith('//')) {
resultUrl = 'https:' + videoSrc;
} else if (!videoSrc.startsWith('http')) {
resultUrl = 'https://ezgif.com' + (videoSrc.startsWith('/') ? videoSrc : '/' + videoSrc);
}
await satanic.sendMessage(m.chat, {
video: { url: resultUrl },
caption: 'Berhasil dikonversi dari stiker ke video.'
}, { quoted: fkontak });
} catch (err) {
console.error('tovideo error:', err.message || err);
reply(`Terjadi kesalahan: ${err.message || 'Gagal mengonversi stiker ke video.'}`);
} finally {
if (media && fs.existsSync(media)) {
try {
await fs.unlinkSync(media);
} catch (e) {
console.error('Gagal hapus file:', e);
}
}
}
}
break;

case 'gita': {
if (!text) return reply('Masukkan pertanyaan atau bab/ayat Gita!\n\nContoh: .gita Karma\nAtau: .gita bab 2');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/ai/gita?prompt=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (response.data.status === 200 && response.data.result) {
const result = response.data.result;
await satanic.sendMessage(m.chat, { text: result }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} else {
return reply('Gagal mendapatkan kutipan dari Bhagavad Gita.');
}
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat mengambil kutipan Gita.');
}
}
break;

case 'epsilon':{
if (!text) return reply('Masukkan kata kunci pencarian!\n\nContoh: .epsilon Indonesia');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/epsilon?message=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (!response.data.success) {
return reply('Gagal mendapatkan hasil pencarian dari Epsilon.');
}
const result = response.data.result;
await satanic.sendMessage(m.chat, { text: result }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat menghubungi Epsilon.');
}
}
break;

case 'gemini': {
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
const isImage = /image/.test(mime);
if (!text && !isImage) {
return reply(`Masukkan pertanyaan atau kirim/reply gambar!\n\nContoh:\n.gemini Halo, apa kabar?\n.gemini (dengan gambar)`);
}
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
let userMessage = text || '';
let imageUrl = '';
if (isImage) {
let media = await quoted.download();
const form = new FormData();
form.append('files[]', media, { filename: 'image.jpg' });
const uploadRes = await axios.post('https://pone.rs/upload.php', form, {
headers: {
...form.getHeaders(),
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36',
'Referer': 'https://pone.rs/',
'Origin': 'https://pone.rs'
},
maxBodyLength: Infinity,
maxContentLength: Infinity
});
if (!uploadRes.data?.success || !uploadRes.data?.files?.[0]?.url) {
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
return reply(`Gagal upload foto! Silahkan coba lagi.`);
}
imageUrl = uploadRes.data.files[0].url;
}
const userId = m.sender || m.key.remoteJid;
let sessionId = global.geminiSessions?.[userId] || '';
let apiUrl = `https://free-restapi.biz.id/api/gemini-chat2?apikey=${global.sakey}`;
if (userMessage) {
apiUrl += `&message=${encodeURIComponent(userMessage)}`;
}
if (imageUrl) {
apiUrl += `&image=${encodeURIComponent(imageUrl)}`;
}
if (sessionId) {
apiUrl += `&session=${sessionId}`;
}
const response = await axios.get(apiUrl);
if (!response.data || response.data.status !== 'success') {
return reply('Gagal mendapatkan respons dari Gemini.');
}
if (response.data.sessions) {
if (!global.geminiSessions) global.geminiSessions = {};
global.geminiSessions[userId] = response.data.sessions;
}
let replyText = response.data.result || 'Tidak ada respons.';
if (imageUrl) {
replyText = `Gambar terdeteksi\n\n${replyText}`;
}
await satanic.sendMessage(m.chat, { text: replyText }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error('Error Gemini:', err);
reply('Terjadi kesalahan saat menghubungi Gemini.');
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
}
}
break;

case 'unlimitedai': {
if (!text) return reply('Masukkan pertanyaan!\n\nContoh: .unlimitedai Halo, apa kabar?');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/unlimitedai/chat?prompt=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (!response.data || response.data.status !== 'success') {
return reply('Gagal mendapatkan respons dari UnlimitedAI.');
}
const result = response.data.result;
const model = response.data.model || 'UnlimitedAI';
let replyText = `${model}\n\n${result}`;
await satanic.sendMessage(m.chat, { text: replyText }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error('Error UnlimitedAI:', err);
reply('Terjadi kesalahan saat menghubungi UnlimitedAI.');
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
}
}
break;

case 'qwen': {
if (!text) return reply('Masukkan pertanyaan!\n\nContoh: .qwen Halo, apa kabar?');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/overchatai?prompt=${encodeURIComponent(text)}&model=qwen&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (!response.data || response.data.status !== 'success') {
return reply('Gagal mendapatkan respons dari Qwen.');
}
const result = response.data.result;
const model = response.data.model || 'Qwen';
await satanic.sendMessage(m.chat, { text: `${model}\n\n${result}` }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error('Error Qwen:', err);
reply('Terjadi kesalahan saat menghubungi Qwen.');
}
}
break;

case 'deep-seek': {
if (!text) return reply('Masukkan pertanyaan!\nContoh: .deep-seek hallo');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const query = text.trim();
const url = `https://www.free-restapi.biz.id/api/deep-seek?text=${encodeURIComponent(query)}&apikey=${global.sakey}`;
const res = await axios.get(url, { timeout: 30000 });
if (!res.data || res.data.status !== 'success') {
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
return reply('Gagal mendapatkan respon. Coba lagi nanti!');
}
await reply(res.data.data.text);
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
await reply('Gagal memproses permintaan. Coba lagi nanti!');
}
}
break;

case 'claude': {
if (!text) return reply('Masukkan pertanyaan!\n\nContoh: .claude Halo, apa kabar?');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/overchatai?prompt=${encodeURIComponent(text)}&model=claude&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (!response.data || response.data.status !== 'success') {
return reply('Gagal mendapatkan respons dari claude');
}
const result = response.data.result;
const model = response.data.model || 'Claude';
await satanic.sendMessage(m.chat, { text: `${model}\n\n${result}` }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error('Error Claude:', err);
reply('Terjadi kesalahan saat menghubungi Claude.');
}
}
break;

case 'chatgpt': {
if (!text) return reply('Masukkan pertanyaan!\nContoh: .chatgpt hallo');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const query = text.trim();
const url = `https://www.free-restapi.biz.id/api/chatgpt?text=${encodeURIComponent(query)}&apikey=${global.sakey}`;
const res = await axios.get(url, { timeout: 30000 });
if (!res.data || res.data.status !== 'success') {
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
return reply('Gagal mendapatkan respon. Coba lagi nanti!');
}
await reply(res.data.data.text);
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
await reply('Gagal memproses permintaan. Coba lagi nanti!');
}
}
break;

case 'aqua':
case 'overchatai': {
if (!text) return reply('Masukkan pertanyaan!\n\nContoh: .aqua Halo, apa kabar?');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/overchatai?prompt=${encodeURIComponent(text)}&model=gpt&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (!response.data || response.data.status !== 'success') {
return reply('Gagal mendapatkan respons dari chatgpt');
}
const result = response.data.result;
await satanic.sendMessage(m.chat, { text: `${result}` }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error('Error:', err);
reply('Terjadi kesalahan saat menghubungi.');
}
}
break;

case 'deepseek': {
if (!text) return reply('Masukkan pertanyaan!\n\nContoh: .deepseek Halo, apa kabar?');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/deepseek?prompt=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (!response.data || response.data.status !== 'success') {
return reply('Gagal mendapatkan respons dari deepseek');
}
const result = response.data.result;
const model = response.data.model || 'Deepseek';
await satanic.sendMessage(m.chat, { text: `${model}\n\n${result}` }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error('Error:', err);
reply('Terjadi kesalahan saat menghubungi.');
}
}
break;

case 'chatbot': {
if (!text) return reply('Masukkan pertanyaan!\nContoh: .chatbot hallo');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const query = text.trim();
const url = `https://www.free-restapi.biz.id/api/chatbot?text=${encodeURIComponent(query)}&apikey=${global.sakey}`;
const res = await axios.get(url, { timeout: 30000 });
if (!res.data || res.data.status !== 'success') {
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
return reply('Gagal mendapatkan respon. Coba lagi nanti!');
}
await reply(res.data.data.text);
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
await reply('Gagal memproses permintaan. Coba lagi nanti!');
}
}
break;

case 'publicai': {
if (!text) return reply('Masukkan pertanyaan!\nContoh: .publicai hallo');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const query = text.trim();
const url = `https://www.free-restapi.biz.id/api/publicai?text=${encodeURIComponent(query)}&apikey=${global.sakey}`;
const res = await axios.get(url, { timeout: 30000 });
if (!res.data || res.data.status !== 'success') {
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
return reply('Gagal mendapatkan respon. Coba lagi nanti!');
}
await reply(res.data.data.text);
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
await reply('Gagal memproses permintaan. Coba lagi nanti!');
}
}
break;

case 'copilot': {
if (!text) return reply('Masukkan pertanyaan!\nContoh: .copilot apa itu AI');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const query = text.trim();
const url = `https://www.free-restapi.biz.id/api/copilot?text=${encodeURIComponent(query)}&apikey=${global.sakey}`;
const res = await axios.get(url, { timeout: 30000 });
if (!res.data || res.data.status !== 'success') {
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
return reply('Gagal mendapatkan respon. Coba lagi nanti!');
}
await reply(res.data.data.text);
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} catch (err) {
console.error(err);
await satanic.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
await reply('Gagal memproses permintaan. Coba lagi nanti!');
}
}
break;

case 'webpilot':
case 'browse': {
if (!text) return reply('Masukkan URL atau pertanyaan!\n\nContoh: .webpilot https://example.com\nAtau: .webpilot apa itu hai');
await satanic.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
try {
const apiUrl = `https://free-restapi.biz.id/api/ai/webpilot?prompt=${encodeURIComponent(text)}&apikey=${global.sakey}`;
const response = await axios.get(apiUrl);
if (response.data.status === 200 && response.data.result) {
const result = response.data.result;
await satanic.sendMessage(m.chat, { text: result }, { quoted: fkontak });
await satanic.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
} else {
return reply('Gagal mendapatkan hasil dari WebPilot.');
}
} catch (err) {
console.error(err);
reply('Terjadi kesalahan saat menghubungi WebPilot.');
}
}
break;
case 'tebakkata': {
if (!m.isGroup) return 
let timeout = 60000
if (id in satanic.tebakkata) return reply("Masih Ada Sesi Yang Belum Diselesaikan!")
let src = await axios.get('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json')
let json = src.data[Math.floor(Math.random() * src.data.length)]
let caption = `Silahkan Jawab Pertanyaan Berikut\n\nSoal : ${json.soal}\nWaktu : 60s\nHadiah : 10.000 money`
satanic.tebakkata[id] = [
await reply(`${caption}`),
json,
setTimeout(() => {
if (satanic.tebakkata[id]) 
console.log("Jawaban: " + json.jawaban)
reply(`Waktu Habis\nJawaban:  ${json.jawaban}\n\nIngin bermain? Ketik tebakkata`) 
delete satanic.tebakkata[id]
}, 60000)
]
}
break
case 'tebakweton': {
if (!m.isGroup) return m.reply('❌ Hanya bisa digunakan di grup!')
let weton = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon']
let randomWeton = weton[Math.floor(Math.random() * weton.length)]
satanic.sendMessage(m.chat, { text: `🔮 *Tebak Weton* 🔮\n\nWeton kamu: ${randomWeton}\n\nCari tahu wetonmu!` }, { quoted: m })
}
break

case 'carbonify':
if (!text) return reply(`Example: ${prefix + command} story wa anime`);   
    try {
        const response = await fetch("https://carbonara.solopov.dev/api/cook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "code": text })
        });

        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        await satanic.sendMessage(m.chat, { 
            image: buffer 
        }, { 
            quoted: fkontak 
        });
        
    } catch (error) {
        console.error('Carbonify error:', error);
        reply('❌ Gagal membuat gambar carbon. Coba lagi nanti.');
}
 break;
case 'tebakkalimat': {
if (!m.isGroup) return
if (tebakkalimat.hasOwnProperty(m.sender.split('@')[0])) return reply("Masih Ada Sesi Yang Belum Diselesaikan!")
let anu = await axios.get('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkalimat.json')
let result = anu.data[Math.floor(Math.random() * anu.data.length)]
satanic.sendText(from, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\nWaktu : 60s`, m).then(() => {
tebakkalimat[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
})
await sleep(60000)
if (tebakkalimat.hasOwnProperty(m.sender.split('@')[0])) {
console.log("Jawaban: " + result.jawaban)
satanic.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/96bb6ca28d6ef7fea479f.jpg' }, caption:`Waktu Habis\nJawaban:  ${tebakkalimat[m.sender.split('@')[0]]}\n\nIngin bermain? Ketik tebak kalimat`}, {quoted:m}) 
delete tebakkalimat[m.sender.split('@')[0]]
}
}
break
case 'tebaklirik': {
if (!m.isGroup) return
let users = global.db.users[m.sender]
let timeout = 60000
let poin = 10000
if (id in satanic.tebaklirik) return reply('Masih ada soal belum terjawab di chat ini')
let src = await axios.get('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaklirik.json')
let json = src.data[Math.floor(Math.random() * src.data.length)]
let caption = `
Soal: ${json.soal}
Waktu: *${(timeout / 1000).toFixed(2)} detik*
Bonus: ${poin} XP
Hadiah: ${poin} Money
`.trim()
satanic.tebaklirik[id] = [
await reply(`${caption}`),
json, poin,
setTimeout(() => {
if (satanic.tebaklirik[id]) 
users.money -= 200
reply(`*GAME TEBAK LIRIK*\n\nWaktu habis!\n𖦹 Jawabannya adalah; *${json.jawaban}*\n𖦹 Saldo kamu dikurangi 200\n𖦹 Sisa Saldo kamu: *${db.data.users[sender].balance.toLocaleString()}*`)
delete satanic.tebaklirik[id]
}, timeout)
]
}
break
case 'caklontong': {
if (!m.isGroup) return
if (caklontong.hasOwnProperty(m.sender.split('@')[0])) return reply("Masih Ada Sesi Yang Belum Diselesaikan!")
let anu = await axios.get('https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json')
let result = anu.data[Math.floor(Math.random() * anu.data.length)]
satanic.sendText(from, `*Jawablah Pertanyaan Berikut :*\n${result.soal}*\nWaktu : 60s`, m).then(() => {
caklontong[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
caklontong_desk[m.sender.split('@')[0]] = result.deskripsi
})
setTimeout(() => {
if (caklontong.hasOwnProperty(m.sender.split('@')[0])) {
console.log("Jawaban: " + result.jawaban)
satanic.sendMessage(m.chat, { 
image: { url: 'https://telegra.ph/file/96bb6ca28d6ef7fea479f.jpg' }, 
caption: `Waktu Habis\nJawaban:  ${caklontong[m.sender.split('@')[0]]}\nDeskripsi : ${caklontong_desk[m.sender.split('@')[0]]}\n\nIngin bermain? Ketik tebak lontong`
}, {quoted: m}) 
delete caklontong[m.sender.split('@')[0]]
delete caklontong_desk[m.sender.split('@')[0]]
}
}, 60000)
}
break
case 'cektete':
if (!text) return reply('namanya mana pea');
let whoTete = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
const ukuranBHList = ['30A', '30B', '30C', '30D', '32A', '32B', '32C', '32D', '32DD', '34A', '34B', '34C', '34D', '34DD', '36B', '36C', '36D', '36DD', '38C', '38D', '40D'];
const ukuranTeteList = ['Sangat Kecil (AAA)', 'Kecil (AA)', 'Sedang (A)', 'Agak Besar (B)', 'Besar (C)', 'Cukup Besar (D)', 'Besar Sekali (DD/E)', 'Montok (F)', 'Super Besar (G)'];
const bentukList = ['Bulat Sempurna', 'Lonjong', 'Air Terjun (Ptosis)', 'Timur Barat (East-West)', 'Berjauhan (Wide Set)', 'Berdekatan (Close Set)', 'Asimetris', 'Kendur', 'Tegak Muda'];
const kondisiTeteList = ['Kencang & Kenyal', 'Mulai Kendur', 'Lembut', 'Padat Berisi', 'Longgar', 'Firm', 'Perky', 'Sagging Ringan', 'Sagging Berat'];
const putingList = ['Kecil Mungil', 'Sedang', 'Besar', 'Menonjol', 'Rata', 'Terbalik (Inverted)', 'Kehitaman', 'Merah Muda', 'Coklat', 'Berbulu Halus'];
const teksturList = ['Mulus', 'Berurat', 'Berbintik', 'Kasar', 'Halus Seperti Sutra'];
const elastisitasList = ['Sangat Elastis', 'Elastis', 'Kurang Elastis', 'Tidak Elastis'];
const pickRandomTete = (list) => list[Math.floor(Math.random() * list.length)];
const ukuranBH = pickRandomTete(ukuranBHList);
const ukuranTete = pickRandomTete(ukuranTeteList);
const bentukTete = pickRandomTete(bentukList);
const kondisiTete = pickRandomTete(kondisiTeteList);
const putingTete = pickRandomTete(putingList);
const teksturTete = pickRandomTete(teksturList);
const elastisitasTete = pickRandomTete(elastisitasList);
let scoreTete = Math.floor(Math.random() * (100 - 50 + 1) + 50);
let ratingTete = scoreTete >= 85 ? 'Premium' : scoreTete >= 70 ? 'Good' : scoreTete >= 55 ? 'Standard' : 'Kurang';
let teksTete = `HASIL PENGECEKAN TETE\n\n`;
teksTete += `Ukuran BH   : ${ukuranBH}\n`;
teksTete += `Ukuran      : ${ukuranTete}\n`;
teksTete += `Bentuk      : ${bentukTete}\n`;
teksTete += `Kondisi     : ${kondisiTete}\n`;
teksTete += `Puting      : ${putingTete}\n`;
teksTete += `Tekstur     : ${teksturTete}\n`;
teksTete += `Elastisitas : ${elastisitasTete}\n\n`;
teksTete += `Score       : ${scoreTete}/100\n`;
teksTete += `Rating      : ${ratingTete}\n\n`;
teksTete += `© satanic haxor`;
reply(teksTete, { mentions: [whoTete] });
break;
case 'cekmemek':
if (!text) return reply('namanya mana pea');
let whoMemek = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
const warnaMemekList = ['pink', 'merah muda', 'kehitaman', 'putih', 'kuning', 'hijau muda', 'biru muda'];
const ukuranMemekList = ['sempit', 'sedang', 'lebar', 'oversize', 'sangat lebar', 'sangat sempit'];
const kondisiMemekList = ['masih fresh', 'sudah berpengalaman', 'perawan', 'butuh perhatian', 'udah longgar', 'berkurap', 'berjamur'];
const pickRandomMemek = (list) => list[Math.floor(Math.random() * list.length)];
const warnaMemek = pickRandomMemek(warnaMemekList);
const ukuranMemek = pickRandomMemek(ukuranMemekList);
const kondisiMemek = pickRandomMemek(kondisiMemekList);
let teksMemek = `Hasil Pengecekan Meki\n\n`;
teksMemek += `Warna   : ${warnaMemek}\n`;
teksMemek += `Ukuran  : ${ukuranMemek}\n`;
teksMemek += `Kondisi : ${kondisiMemek}\n\n`;
teksMemek += `© satanic haxor`;
reply(teksMemek, { mentions: [whoMemek] });
break;
case 'cekkodam':
case 'kodam':
case 'cekkodamku':
let targetKodam = '';
let isMentionKodam = false;
let mentionIdKodam = '';
let persenKodam = Math.floor(Math.random() * 100) + 1;
if (m.mentionedJid && m.mentionedJid.length > 0) {
targetKodam = `@${m.mentionedJid[0].split('@')[0]}`;
isMentionKodam = true;
mentionIdKodam = m.mentionedJid[0];
} else if (text) {
targetKodam = text.trim();
} else {
targetKodam = `@${m.sender.split('@')[0]}`;
isMentionKodam = true;
mentionIdKodam = m.sender;
}
const kodamList = [
'Kodam Tuyul Ngamen', 'Kodam Tuyul London', 'Kodam Tuyul Dubai', 'Kodam Tuyul Jepang',
'Kodam Genderuwo Baper', 'Kodam Genderuwo Galau', 'Kodam Genderuwo Mikir', 'Kodam Genderuwo Ngoding',
'Kodam Pocong Kece', 'Kodam Pocong Badung', 'Kodam Pocong Gaul', 'Kodam Pocong Mewing',
'Kodam Kuntilanak Cantik', 'Kodam Kuntilanak Modus', 'Kodam Kuntilanak Baper', 'Kodam Kuntilanak Jomblo',
'Kodam Sundel Bolong Lari', 'Kodam Sundel Bolong Ngamen', 'Kodam Sundel Bolong Opo', 'Kodam Sundel Bolong Joget',
'Kodam Leak Bali', 'Kodam Leak Sakti', 'Kodam Leak Ngamuk', 'Kodam Leak Nangis',
'Kodam Wewe Gombel Jomblo', 'Kodam Wewe Gombel Galau', 'Kodam Wewe Gombel Baper', 'Kodam Wewe Gombel Mikir',
'Kodam Jerangkong Ngegas', 'Kodam Jerangkong Baper', 'Kodam Jerangkong Ngopi', 'Kodam Jerangkong Nonton',
'Kodam Hantu Boneka', 'Kodam Hantu TV', 'Kodam Hantu Kulkas', 'Kodam Hantu AC',
'Kodam Pocong Merah', 'Kodam Pocong Hijau', 'Kodam Pocong Biru', 'Kodam Pocong Pink',
'Kodam Kuyang Joget', 'Kodam Kuyang Ngamen', 'Kodam Kuyang Baper', 'Kodam Kuyang Nangis',
'Kodam Sundel Galau', 'Kodam Sundel Baper', 'Kodam Sundel Mikir', 'Kodam Sundel Joget',
'Kodam Genderuwo Opo', 'Kodam Genderuwo Wes', 'Kodam Genderuwo Kok', 'Kodam Genderuwo Lah',
'Kodam Banaspati Ngamuk', 'Kodam Banaspati Galau', 'Kodam Banaspati Baper', 'Kodam Banaspati Mikir',
'Kodam Tongkat Mbah', 'Kodam Tongkat Sakti', 'Kodam Tongkat Maut', 'Kodam Tongkat Petir',
'Kodam Sapu Terbang', 'Kodam Sapu Lidi', 'Kodam Sapu Jagad', 'Kodam Sapu Tua',
'Kodam Karpet Terbang', 'Kodam Karpet Sakti', 'Kodam Karpet Rusak', 'Kodam Karpet Basah',
'Kodam Jubah Hitam', 'Kodam Jubah Putih', 'Kodam Jubah Sakti', 'Kodam Jubah Kotor',
'Kodam Keris Pusaka', 'Kodam Keris Sakti', 'Kodam Keris Maut', 'Kodam Keris Tua',
'Kodam Mustika Kecubung', 'Kodam Mustika Merah', 'Kodam Mustika Hitam', 'Kodam Mustika Putih',
'Kodam Jimat Sakti', 'Kodam Jimat Maut', 'Kodam Jimat Tua', 'Kodam Jimat Pusaka',
'Kodam Pelet Jawa', 'Kodam Pelet Sakti', 'Kodam Pelet Maut', 'Kodam Pelet Ampuh',
'Kodam Susuk', 'Kodam Susuk Sakti', 'Kodam Susuk Maut', 'Kodam Susuk Emas',
'Kodam Sendal Jepit', 'Kodam Sendal Swal', 'Kodam Sendal Hotel', 'Kodam Sendal Bolong',
'Kodam Ember Bocor', 'Kodam Ember Plastik', 'Kodam Ember Besi', 'Kodam Ember Tua',
'Kodam Gayung Nyleneh', 'Kodam Gayung Plastik', 'Kodam Gayung Besi', 'Kodam Gayung Tua',
'Kodam Sapu Lidi', 'Kodam Sapu Ijuk', 'Kodam Sapu Tua', 'Kodam Sapu Baru',
'Kodam Keset Muka', 'Kodam Keset Kaki', 'Kodam Keset Basah', 'Kodam Keset Kering',
'Kodam Kipas Angin', 'Kodam Kipas Tangan', 'Kodam Kipas Rusak', 'Kodam Kipas Baru',
'Kodam Lampu Bohlam', 'Kodam Lampu LED', 'Kodam Lampu Minyak', 'Kodam Lampu Petromak',
'Kodam Kasur Busa', 'Kodam Kasur Kapuk', 'Kodam Kasur Bocor', 'Kodam Kasur Baru',
'Kodam Bantal Guling', 'Kodam Bantal Busa', 'Kodam Bantal Kapuk', 'Kodam Bantal Bau',
'Kodam Selimut', 'Kodam Selimut Basah', 'Kodam Selimut Kering', 'Kodam Selimut Baru',
'Kodam Karpet', 'Kodam Karpet Basah', 'Kodam Karpet Kering', 'Kodam Karpet Baru',
'Kodam Hape Jadul', 'Kodam Hape Batrey', 'Kodam Hape Error', 'Kodam Hape Lemot',
'Kodam TV Tabung', 'Kodam TV Digital', 'Kodam TV Rusak', 'Kodam TV Butut'
];
const randomKodam = kodamList[Math.floor(Math.random() * kodamList.length)];
let hasilKodam = `CEK KODAM\n\n`;
hasilKodam += `${targetKodam}\n`;
hasilKodam += `Kodam : ${randomKodam}\n`;
hasilKodam += `Level : ${persenKodam}%`;
if (isMentionKodam) {
satanic.sendMessage(m.chat, { text: hasilKodam, mentions: [mentionIdKodam] }, { quoted: fkontak });
} else {
reply(hasilKodam);
}
break;
case 'dapatkah':
if (!text) return reply(`Ajukan pertanyaan\n\nContoh: ${prefix + command} aku bisa menari?`);
const bisaList = ['Bisa', 'Tidak Bisa', 'Tidak Mungkin', 'Tentu Saja Bisa!!!'];
const hasilBisa = bisaList[Math.floor(Math.random() * bisaList.length)];
await reply(`Bisa ${text}\nJawaban: ${hasilBisa}`);
break;
case 'apakah':
if (!text) return reply(`Ajukan pertanyaan\n\nContoh: ${prefix + command} dia masih perawan?`);
const apaList = ['Ya', 'Tidak', 'Mungkin Saja', 'Benar Sekali', 'yo ndak tau', 'tidak tahu', 'lu pikir gw dukun', 'hem'];
const hasilApa = apaList[Math.floor(Math.random() * apaList.length)];
await reply(`Apakah ${text}\nJawaban: ${hasilApa}`);
break;
case 'when':
if (!text) return reply(`Ajukan pertanyaan\n\nContoh: ${prefix + command} kapan aku menikah?`);
const kapanList = [
'5 Hari Lagi', '10 Hari Lagi', '15 Hari Lagi', '20 Hari Lagi', '25 Hari Lagi', '30 Hari Lagi',
'35 Hari Lagi', '40 Hari Lagi', '45 Hari Lagi', '50 Hari Lagi', '55 Hari Lagi', '60 Hari Lagi',
'65 Hari Lagi', '70 Hari Lagi', '75 Hari Lagi', '80 Hari Lagi', '85 Hari Lagi', '90 Hari Lagi',
'100 Hari Lagi', '5 Bulan Lagi', '10 Bulan Lagi', '15 Bulan Lagi', '20 Bulan Lagi', '25 Bulan Lagi',
'30 Bulan Lagi', '35 Bulan Lagi', '40 Bulan Lagi', '45 Bulan Lagi', '50 Bulan Lagi', '55 Bulan Lagi',
'60 Bulan Lagi', '65 Bulan Lagi', '70 Bulan Lagi', '75 Bulan Lagi', '80 Bulan Lagi', '85 Bulan Lagi',
'90 Bulan Lagi', '100 Bulan Lagi', '1 Tahun Lagi', '2 Tahun Lagi', '3 Tahun Lagi', '4 Tahun Lagi',
'5 Tahun Lagi', 'Besok', 'Lusa'
];
const hasilKapan = kapanList[Math.floor(Math.random() * kapanList.length)];
await reply(`Kapan ${text}\nJawaban: ${hasilKapan}`);
break;
case 'apa':
case 'what':
if (!text) return reply(`Ajukan pertanyaan\n\nContoh: ${prefix + command} namamu?`);
const apa2List = ['Tanya Pacarmu', 'Aku Tidak Tahu', 'Aku Tidak Tahu, Tanya Ayahmu'];
const hasilApa2 = apa2List[Math.floor(Math.random() * apa2List.length)];
await reply(`Apa ${text}\nJawaban: ${hasilApa2}`);
break;
case 'where':
if (!text) return reply(`Ajukan pertanyaan\n\nContoh: ${prefix + command} kamu berada?`);
const lokasiList = ['Di gunung', 'Di Mars', 'Di Bulan', 'Di hutan', 'Aku tidak tahu, tanya ibumu', 'Mungkin di suatu tempat', 'di kuburan', 'di neraka', 'yo ndak tahu', 'di arab'];
const hasilLokasi = lokasiList[Math.floor(Math.random() * lokasiList.length)];
await reply(`Dimana ${text}\nJawaban: ${hasilLokasi}`);
break;
case 'rate':
if (!text) return reply(`Contoh: ${prefix + command} profilku`);
const nilaiList = Array.from({ length: 100 }, (_, i) => (i + 1).toString());
const hasilNilai = nilaiList[Math.floor(Math.random() * nilaiList.length)];
await reply(`Nilai ${text}\nJawaban: ${hasilNilai}%`);
break;
case 'apakah':
if (!text) return reply(`Contoh: ${command} saya ganteng?`);
const jawabanApakah = ['Iya', 'Mungkin iya', 'Mungkin', 'Gak', 'Mungkin gak', 'Gak tau'];
const hasilApakah = jawabanApakah[Math.floor(Math.random() * jawabanApakah.length)];
reply(`Pertanyaan: Apakah ${text}\nJawaban: ${hasilApakah}`);
break;
case 'bisakah':
if (!text) return reply(`Contoh: ${command} saya jadi kaya?`);
const jawabanBisakah = ['Bisa banget', 'Bisa', 'Mungkin bisa', 'Mungkin', 'Gak bisa', 'Mungkin gak bisa', 'Gak bisa lah', 'Gak tau'];
const hasilBisakah = jawabanBisakah[Math.floor(Math.random() * jawabanBisakah.length)];
reply(`Pertanyaan: Bisakah ${text}\nJawaban: ${hasilBisakah}`);
break;
case 'kapankah':
if (!text) return reply(`Contoh: ${command} saya kaya?`);
const jawabanWaktu = [
'Bentar lagi',
'Nunggu kiamat dulu',
'Kapan-kapan',
'Besok',
'yo ndak tau',
'Pas lu tidur',
'Gw juga gak tau kapan'
];
const waktuRandom = Math.floor(Math.random() * 10) + 1;
const unitWaktu = ['minggu', 'bulan', 'tahun'];
const unitWaktuRandom = unitWaktu[Math.floor(Math.random() * unitWaktu.length)];
const jawabanKapankah = [...jawabanWaktu, `${waktuRandom} ${unitWaktuRandom} lagi`];
const hasilKapankah = jawabanKapankah[Math.floor(Math.random() * jawabanKapankah.length)];
reply(`Pertanyaan: Kapankah ${text}\nJawaban: ${hasilKapankah}`);
break;
case 'tebakumur':
if (!m.isGroup) return m.reply('Hanya bisa digunakan di grup!');
let umur = Math.floor(Math.random() * 36) + 14;
satanic.sendMessage(m.chat, { text: `Tebak Umur\n\nUmur: ${umur} tahun` }, { quoted: m });
break;
case 'tebakmati':
if (!m.isGroup) return m.reply('Hanya bisa digunakan di grup!');
const caraMatiList = [
'Kecelakaan Mobil',
'Kecelakaan Motor',
'Kecelakaan Kereta',
'Kecelakaan Pesawat',
'Kecelakaan Kapal',
'Tenggelam',
'Kebakaran',
'Jatuh dari Gedung',
'Jatuh dari Pohon',
'Jatuh dari Tangga',
'Keracunan Makanan',
'Keracunan Obat',
'Ledakan Gas',
'Ledakan Bom',
'Tersambar Petir',
'Tersengat Listrik',
'Dimakan Buaya',
'Dimakan Hiu',
'Dimakan Harimau',
'Dimakan Ular',
'Disengat Lebah',
'Digigit Kalajengking',
'Serangan Jantung',
'Serangan Stroke',
'Kanker',
'Tumor',
'AIDS',
'Demam Berdarah',
'Malaria',
'TBC',
'Covid-19',
'Overdosis Narkoba',
'Keracunan Alkohol',
'Koma',
'Kekurangan Oksigen',
'Hipotermia',
'Heatstroke',
'Pingsan lalu Mati',
'Tertimpa Benda Jatuh',
'Tertabrak Kereta',
'Kecelakaan Naik Sepeda',
'Terjun Payung Gagal',
'Scuba Diving Gagal',
'Mendaki Gunung Jatuh',
'Longsor',
'Gempa Bumi',
'Tsunami',
'Gunung Meletus',
'Angin Puting Beliung',
'Banjir Bandang'
];
const randomCaraMati = caraMatiList[Math.floor(Math.random() * caraMatiList.length)];
satanic.sendMessage(m.chat, { text: `Tebak Cara Mati\n\nKamu akan mati karena: ${randomCaraMati}\n\nTebak tepat!` }, { quoted: m });
break;
case 'tebakjodoh':
if (!m.isGroup) return m.reply('Hanya bisa digunakan di grup!');
const inisialList = [
'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
'U', 'V', 'W', 'X', 'Y', 'Z'
];
const inisialDepan = inisialList[Math.floor(Math.random() * inisialList.length)];
const inisialBelakang = inisialList[Math.floor(Math.random() * inisialList.length)];
satanic.sendMessage(m.chat, { text: `Tebak Jodoh\n\nInisial jodohmu: ${inisialDepan}. ${inisialBelakang}.\n\nCari tahu siapa dia!` }, { quoted: m });
break;
case 'tebakcoli':
if (!m.isGroup) return m.reply('Hanya bisa digunakan di grup!');
const warnaColiList = [
'Hitam', 'Putih', 'Merah', 'Biru', 'Kuning', 'Hijau', 'Ungu',
'Orange', 'Pink', 'Coklat', 'Abu-abu', 'Emas', 'Perak',
'Navy', 'Maroon', 'Turquoise', 'Lavender', 'Magenta'
];
const randomWarnaColi = warnaColiList[Math.floor(Math.random() * warnaColiList.length)];
satanic.sendMessage(m.chat, { text: `Tebak Warna Coli\n\nWarna colimu: ${randomWarnaColi}\n\nApakah cocok?` }, { quoted: m });
break;
case 'tebaknikah':
if (!m.isGroup) return m.reply('Hanya bisa digunakan di grup!');
const bulanNikahList = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const tanggalNikah = Math.floor(Math.random() * 28) + 1;
const bulanRandomNikah = bulanNikahList[Math.floor(Math.random() * bulanNikahList.length)];
const tahunNikah = Math.floor(Math.random() * 21) + 2025;
const hariNikahList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
const hariRandomNikah = hariNikahList[Math.floor(Math.random() * hariNikahList.length)];
satanic.sendMessage(m.chat, { text: `Tebak Hari Pernikahan\n\nTanggal: ${tanggalNikah} ${bulanRandomNikah} ${tahunNikah}\nHari: ${hariRandomNikah}\n\nKapan kamu akan menikah?` }, { quoted: m });
break;
case 'tebakukuranbh':
if (!m.isGroup) return m.reply('Hanya bisa digunakan di grup!');
const ukuranBhList = ['AAA', 'AA', 'A', 'B', 'C', 'D', 'DD', 'E', 'F', 'G', 'H'];
const randomUkuranBh = ukuranBhList[Math.floor(Math.random() * ukuranBhList.length)];
satanic.sendMessage(m.chat, { text: `Tebak Ukuran Bra\n\nUkuran bra kamu: ${randomUkuranBh}\n\nCari tahu ukuranmu!` }, { quoted: m });
break;
case 'tebaktt':
if (!m.isGroup) return m.reply('Hanya bisa digunakan di grup!');
const bentukTtList = [
'Bulat', 'Besar sebelah', 'Tegak', 'Miring', 'Jatuh', 'Asimetris',
'tepos', 'Berbentuk Kerucut', 'pepaya',
'Berbentuk Bulat Sempurna', 'Berbentuk Pipih', 'Berbentuk Oval'
];
const randomBentukTt = bentukTtList[Math.floor(Math.random() * bentukTtList.length)];
satanic.sendMessage(m.chat, { text: `Tebak Bentuk Payudara\n\nBentuk payudara kamu: ${randomBentukTt}\n\nCari tahu bentukmu!` }, { quoted: m });
break;
case 'tebakkontol':
if (!m.isGroup) return m.reply('Hanya bisa digunakan di grup!');
const ukuranKontolList = [
'3 cm', '5 cm', '7 cm', '9 cm', '11 cm', '13 cm', '15 cm',
'17 cm', '19 cm', '21 cm', '23 cm', '25 cm', '27 cm', '30 cm'
];
const randomUkuranKontol = ukuranKontolList[Math.floor(Math.random() * ukuranKontolList.length)];
satanic.sendMessage(m.chat, { text: `Tebak Ukuran Kontol\n\nUkuran kontol kamu: ${randomUkuranKontol}\n\nCari tahu ukuranmu!` }, { quoted: m });
break;
case 'tebakstatus':
if (!m.isGroup) return m.reply('Hanya bisa digunakan di grup!');
const statusNikahList = ['Belum Menikah', 'Sudah Menikah', 'Janda', 'Duda', 'Cerai', 'Menikah Muda', 'Tidak Mau Menikah', 'Masih Pacaran', 'Lajang'];
const randomStatusNikah = statusNikahList[Math.floor(Math.random() * statusNikahList.length)];
satanic.sendMessage(m.chat, { text: `Tebak Status Pernikahan\n\nStatus: ${randomStatusNikah}` }, { quoted: m });
break;
case 'tebakwarna': {
if (!m.isGroup) return m.reply('❌ Hanya bisa digunakan di grup!')
if (satanic.tebakwarna[m.chat]) return m.reply('⚠️ Masih ada sesi tebak warna di grup ini!')
let timeout = 60000
try {
let res = await fetch('https://raw.githubusercontent.com/siputzx/databasee/main/games/butawarna.json')
let data = await res.json()
if (!data || data.length === 0) return m.reply('❌ Gagal mengambil soal, coba lagi nanti.')
let randomIndex = Math.floor(Math.random() * data.length)
let json = data[randomIndex]
let caption = `🔴 *Tes Buta Warna* 🔵\n\nLihat gambar dan tebak angka yang terlihat!\n\n⏱️ Waktu: 60 detik\n🎁 Hadiah: 5000 XP\n\nKetik *nyerah* untuk menyerah\n\nJika jawaban salah bot tidak akan respon, bot akan respon jika jawabannya benar`
await satanic.sendMessage(m.chat, { 
image: { url: json.image }, 
caption: caption 
}, { quoted: m })
satanic.tebakwarna[m.chat] = [
json,
setTimeout(() => {
if (satanic.tebakwarna[m.chat]) {
m.reply(`⏳ Waktu habis!\nJawaban: *${json.correct}*`)
delete satanic.tebakwarna[m.chat]
}
}, timeout)
]
} catch (e) {
m.reply('❌ Error: ' + e.message)
}
}
break
case 'ceksifat':
case 'checkme':
const bet = m.sender;
const namhue = m.pushname || 'User';
const rand100 = () => Math.floor(Math.random() * 101);
const sifat = [
'Baik', 'Tidak ramah', 'Pembangkang', 'Chapri', 'Nibba/Nibbi', 'Mengganggu',
'Rusak', 'Orang marah', 'Sopan', 'Beban', 'Hebat',
'Cringe', 'Pembohong'
];
const hobi = [
'Memasak', 'Menari', 'Bermain', 'Bermain game', 'Melukis',
'Membantu Orang Lain', 'Menonton anime', 'Membaca',
'Bersepeda', 'Bernyanyi', 'Maling', 'Rampok', 'Maling ayam', 'Berak', 'Begal', 'Berbincang-bincang',
'Berbagi Meme', 'Menggambar', 'Menghabiskan Uang Orang Tua',
'Bermain Truth or Dare', 'Menghabiskan Waktu Sendirian'
];
const cakep = ['Ya', 'Tidak', 'Sangat jelek', 'Sangat tampan'];
const watak = [
'Peduli', 'Murah hati', 'Pemarah', 'Tunduk', 'Baik',
'Berhati baik', 'Sabar', 'UwU', 'Terbaik', 'Membantu'
];
const resultCekSifat = {
sifat: sifat[Math.floor(Math.random() * sifat.length)],
hobi: hobi[Math.floor(Math.random() * hobi.length)],
bucin: rand100(),
great: rand100(),
ganteng: cakep[Math.floor(Math.random() * cakep.length)],
watak: watak[Math.floor(Math.random() * watak.length)],
baik: rand100(),
buruk: rand100(),
cerdas: rand100(),
berani: rand100(),
penakut: rand100()
};
let ppuser;
try {
ppuser = await satanic.profilePictureUrl(bet, 'image');
} catch {
ppuser = defaultpp;
}
let profile = `Check @${bet.split('@')[0]}\n\n`;
profile += `Nama          : ${namhue}\n`;
profile += `Karakteristik : ${resultCekSifat.sifat}\n`;
profile += `Hobi          : ${resultCekSifat.hobi}\n`;
profile += `Bucin         : ${resultCekSifat.bucin}%\n`;
profile += `Great         : ${resultCekSifat.great}%\n`;
profile += `Ganteng       : ${resultCekSifat.ganteng}\n`;
profile += `Watak         : ${resultCekSifat.watak}\n`;
profile += `Moral Baik    : ${resultCekSifat.baik}%\n`;
profile += `Moral Buruk   : ${resultCekSifat.buruk}%\n`;
profile += `Kecerdasan    : ${resultCekSifat.cerdas}%\n`;
profile += `Keberanian    : ${resultCekSifat.berani}%\n`;
profile += `Penakut       : ${resultCekSifat.penakut}%\n\n`;
profile += `Check Properties`;
satanic.sendMessage(from, { image: { url: ppuser }, caption: profile, mentions: [bet] }, { quoted: fkontak });
break;
case 'yatim':
case 'piatu':
case 'jomblo':
case 'waria':
case 'koruptor':
case 'psikopat':
case 'pedofil':
case 'miskin':
case 'tukangjajan':
case 'jelek':
case 'mokondo':
case 'penipu':
case 'tukangcopet':
case 'tukangbo':
case 'tukangcoli':
case 'ganteng':
case 'cantik':
case 'tobrut':
case 'kurus':
case 'gemuk':
case 'kontolgede':
case 'tepos':
case 'korbanhts':
case 'badut':
case 'tukangselingkuh':
case 'palkon':
case 'perawantua':
case 'duda':
case 'botolyakult':
case 'sasimo':
case 'mukakontol':
case 'mukamemek':
case 'tukangkawin':
case 'maling':
case 'pelakor':
case 'perampok':
case 'begal':
case 'wibu':
case 'janda':
case 'jodohku':
if (!m.isGroup) return reply('only group');
let groupMetaJodoh = store.groupMetadata[m.chat];
if (!groupMetaJodoh) {
groupMetaJodoh = await satanic.groupMetadata(m.chat);
store.groupMetadata[m.chat] = groupMetaJodoh;
}
let memberJodoh = groupMetaJodoh.participants.map(u => u.id);
let meJodoh = m.sender;
let jodoh = memberJodoh[Math.floor(Math.random() * memberJodoh.length)];
while (jodoh === meJodoh) {
jodoh = memberJodoh[Math.floor(Math.random() * memberJodoh.length)];
}
let teksJodoh = `Anjayy ${command}\n\n@${jodoh.split('@')[0]}\n\n`;
satanic.sendMessage(m.chat, { text: teksJodoh, mentions: [jodoh] }, { quoted: fkontak });
break;
case 'cekyatim':
case 'cekjelek':
case 'cekjodoh':
case 'cekmiskin':
case 'cekpedofil':
case 'cekwibu':
case 'ceksange':
case 'cektolol':
case 'cekkaya':
if (!text && (!m.mentionedJid || m.mentionedJid.length === 0)) {
return reply(`CARA PAKAI:\n\n${prefix}${command} @user\n${prefix}${command} nama orang\n\nContoh:\n${prefix}${command} @${m.sender.split('@')[0]}\n${prefix}${command} budi`);
}
let targetCekyuk = 'kamu';
let persen = Math.floor(Math.random() * 100) + 1;
if (m.mentionedJid && m.mentionedJid.length > 0) {
return satanic.sendMessage(m.chat, { text: `${persen}%`, mentions: [m.mentionedJid[0]] }, { quoted: fkontak });
}
if (text) {
targetCekyuk = text;
}
reply(`${targetCekyuk} ${persen}%`);
break;
case 'ceknamabapak':
case 'namabapak':
case 'cekbapak':
if (!text && (!m.mentionedJid || m.mentionedJid.length === 0)) {
return reply(`CARA PAKAI:\n\n${prefix}${command} @user\n${prefix}${command} nama orang\n\nContoh:\n${prefix}${command} @${m.sender.split('@')[0]}\n${prefix}${command} Budi`);
}
let targetBapak = '';
let isMention = false;
let mentionId = '';
if (m.mentionedJid && m.mentionedJid.length > 0) {
targetBapak = `@${m.mentionedJid[0].split('@')[0]}`;
isMention = true;
mentionId = m.mentionedJid[0];
} else if (text) {
targetBapak = text.trim();
}
const namaBapak = [
'Paijo', 'Tukul', 'Ucup', 'Bambang', 'Sule', 'Komeng', 'udin', 'yatno', 'ucok', 'agus', 'bahlil',
'Somad', 'Jarwo', 'Bejo', 'Kasino', 'Dono', 'Indro',
'Rambo', 'Joni', 'Agus', 'Budi', 'Joko', 'Mamat'
];
const namaRandom = namaBapak[Math.floor(Math.random() * namaBapak.length)];
const hasilBapak = `Bapaknya ${targetBapak} namanya ${namaRandom}`;
if (isMention) {
satanic.sendMessage(m.chat, { text: hasilBapak, mentions: [mentionId] }, { quoted: fkontak });
} else {
reply(hasilBapak);
}
break;
case 'cekkontol':
if (!text) return reply('nama nya mana pea');
let whoKontol = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
const warnaList = ['hitam', 'coklat', 'pink', 'abu-abu', 'merah', 'orange', 'kuning', 'biru', 'titanium', 'silver', 'black white'];
const ukuranList = ['kecil', 'sedang', 'besar', 'sangat kecil', 'sangat besar', 'oversize'];
const kondisiList = ['belom sunat', 'sudah sunat', 'hitam berdaki', 'miring kesamping', 'bijinya ga simetris', 'ga bisa ngaceng', 'bengkok', 'mungil'];
const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];
const warna = pickRandom(warnaList);
const ukuran = pickRandom(ukuranList);
const kondisi = pickRandom(kondisiList);
let teksKontol = `Hasil Pengecekan Kontol\n\n`;
teksKontol += `Warna   : ${warna}\n`;
teksKontol += `Ukuran  : ${ukuran}\n`;
teksKontol += `Kondisi : ${kondisi}\n\n`;
teksKontol += `© satanic haxor`;
reply(teksKontol, { mentions: [whoKontol] });
break;
case 'cekiqotak':
if (!text) return reply('namanya mana pea');
let whoIq = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
whoIq = String(whoIq || m.sender || '');
let usernameIq = 'Tidak diketahui';
try {
if (m.quoted) {
usernameIq = m.quoted.pushName || m.quoted.name || m.quoted.notifyName || 'Tidak diketahui';
} else if (m.mentionedJid[0]) {
usernameIq = m.pushName || m.name || m.notifyName || 'Tidak diketahui';
} else {
usernameIq = m.pushName || m.name || m.notifyName || 'Tidak diketahui';
}
} catch (err) {
console.error('Error getting username:', err);
usernameIq = 'Tidak diketahui';
}
let iq = Math.floor(Math.random() * (140 - 50 + 1) + 50);
let kategori;
if (iq >= 130) kategori = 'Genius / Jenius';
else if (iq >= 115) kategori = 'Cerdas Sekali';
else if (iq >= 100) kategori = 'Cerdas';
else if (iq >= 85) kategori = 'Normal';
else if (iq >= 70) kategori = 'Batas Rendah';
else kategori = 'Rendah';
let saran;
if (iq >= 115) saran = 'Pertahankan dan asah terus kemampuannya!';
else if (iq >= 85) saran = 'Masih normal, rajin belajar ya!';
else saran = 'Perlu banyak latihan dan belajar lebih giat!';
let teksIq = `HASIL TEST IQ UNTUK ${usernameIq}\n\n`;
teksIq += `IQ Score : ${iq}\n`;
teksIq += `Kategori : ${kategori}\n`;
teksIq += `Saran    : ${saran}\n\n`;
teksIq += `> satanic haxor`;
reply(teksIq, { mentions: [whoIq].filter(Boolean) });
break;
case 'tebakkartun': {
if (!m.isGroup) return m.reply('❌ Hanya bisa digunakan di grup!')
if (satanic.tebakkartun[m.chat]) return m.reply('⚠️ Masih ada sesi tebak kartun di grup ini!')
let timeout = 60000
try {
let src = [
{ name: "Tom and Jerry", img: "https://i.pinimg.com/736x/c2/f0/97/c2f0975cc0cb2985e359abce2461e986.jpg" },
{ name: "Mickey Mouse", img: "https://i.pinimg.com/736x/9e/bc/77/9ebc77ae4c7dca6ec3f342958d7b2cae.jpg" },
{ name: "Donald Duck", img: "https://i.pinimg.com/736x/6e/a7/d4/6ea7d415f9b6abe951fb1b43dc1e094f.jpg" },
{ name: "Scooby Doo", img: "https://i.pinimg.com/736x/68/76/fb/6876fb80983d8a780977c351fe65c54c.jpg" },
{ name: "The Flintstones", img: "https://i.pinimg.com/736x/3d/24/16/3d2416dbde61723402736548b72bd99b.jpg" },
{ name: "Popeye", img: "https://i.pinimg.com/736x/dc/48/a3/dc48a378fb3a86b744a0229d9ba36127.jpg" },
{ name: "SpongeBob SquarePants", img: "https://i.pinimg.com/736x/d2/b2/49/d2b2493f88da017b20b2f5ae1ad6be86.jpg" },
{ name: "Dora the Explorer", img: "https://i.pinimg.com/736x/35/a0/02/35a0020ad541c8d1d6428e119b523560.jpg" },
{ name: "Ben 10", img: "https://i.pinimg.com/736x/8a/f4/52/8af45205d34223f47b51f14edffce4e5.jpg" },
{ name: "Teenage Mutant Ninja Turtles", img: "https://i.pinimg.com/736x/59/72/c4/5972c4fd49d8343cb0d27201d5d861c0.jpg" },
{ name: "The Pink Panther", img: "https://i.pinimg.com/736x/4c/35/a1/4c35a178ac9b02dd3f5c64142ec8cb54.jpg" },
{ name: "Bugs Bunny", img: "https://i.pinimg.com/736x/8e/4c/16/8e4c16d699ca1b53ef3b8e935a9e1034.jpg" },
{ name: "Tweety", img: "https://i.pinimg.com/736x/e6/10/dc/e610dcb4430927c1d4f3b4a1e8476f14.jpg" },
{ name: "Sylvester", img: "https://i.pinimg.com/736x/0b/c0/7a/0bc07a3334a40578adecaadb829dcee2.jpg" },
{ name: "Daffy Duck", img: "https://i.pinimg.com/736x/21/71/b8/2171b82513f2ef7001ab9b83123c933e.jpg" },
{ name: "Porky Pig", img: "https://i.pinimg.com/736x/88/69/b4/8869b464d10c872572beeca9d33e4bea.jpg" },
{ name: "Woody Woodpecker", img: "https://i.pinimg.com/736x/ce/32/7c/ce327cb85461b3a3db2a6d8e9a95f442.jpg" },
{ name: "Road Runner", img: "https://i.pinimg.com/736x/d3/c1/d0/d3c1d05709d6cf2e3529271a3cbdeb23.jpg" },
{ name: "Wile E. Coyote", img: "https://i.pinimg.com/736x/56/4e/58/564e58e5d13c2664cf7c6ae3cb808ffa.jpg" },
{ name: "Garfield", img: "https://i.pinimg.com/736x/85/9f/09/859f09faf16470f5b10dc4480190fbbf.jpg" },
{ name: "The Smurfs", img: "https://i.pinimg.com/736x/49/df/d3/49dfd33c1d0c02a56dc89a4f23495f4a.jpg" },
{ name: "Inspector Gadget", img: "https://i.pinimg.com/736x/0a/3d/60/0a3d605f6265fbe9f229af368a5b56fb.jpg" },
{ name: "DuckTales", img: "https://i.pinimg.com/736x/f8/4e/80/f84e80b9d44ed7661be004cba7c88098.jpg" },
{ name: "Chip and Dale", img: "https://i.pinimg.com/736x/fe/11/af/fe11af8a6cba02993fef301a6369691b.jpg" },
{ name: "Goofy", img: "https://i.pinimg.com/736x/bf/e8/ce/bfe8ce9021e299f84a101862f181faac.jpg" },
{ name: "Pluto", img: "https://i.pinimg.com/736x/24/d4/62/24d4621de1aa4807644dff091207b3c9.jpg" },
{ name: "The Jetsons", img: "https://i.pinimg.com/736x/e2/e0/03/e2e00313ad19c89a94dcd779813ab95d.jpg" },
{ name: "Yogi Bear", img: "https://i.pinimg.com/736x/01/55/38/015538ed293a7739f2b49a3314a765ce.jpg" },
{ name: "Boo Boo Bear", img: "https://i.pinimg.com/736x/76/c8/2f/76c82fe2724f3e799a6820e38d7a79a4.jpg" },
{ name: "Fred Flintstone", img: "https://i.pinimg.com/736x/07/11/d0/0711d0ba95a7d8eba56add44cd145af6.jpg" },
{ name: "Barney Rubble", img: "https://i.pinimg.com/736x/b7/24/b8/b724b8d6f8855b8383ae99aaaa9a55af.jpg" },
{ name: "Betty Boop", img: "https://i.pinimg.com/736x/ce/53/d2/ce53d21013675ccafee2088234d3ad34.jpg" },
{ name: "Felix the Cat", img: "https://i.pinimg.com/736x/3f/f3/97/3ff39709b21abf120eaf9538f734aaf9.jpg" },
{ name: "Tayo the Little Bus", img: "https://i.pinimg.com/736x/d4/89/d3/d489d385be83e9eee8d3e6aea15e32eb.jpg" },
{ name: "Mr. Bean", img: "https://i.pinimg.com/736x/5d/c3/19/5dc3193d206fa1ec0cfcb4ced4aa8437.jpg" },
{ name: "Masha and the Bear", img: "https://i.pinimg.com/736x/3b/2d/e5/3b2de5ef8907b65a6200786d0b84c04d.jpg" },
{ name: "Rabbids Invasion", img: "https://i.pinimg.com/736x/2c/96/d7/2c96d7097e49f09579b559c7ed76619c.jpg" },
{ name: "Bernard", img: "https://i.pinimg.com/736x/fe/0a/4c/fe0a4cf3d98d9a03d60017d8ea8eded9.jpg" },
{ name: "Shaun the Sheep", img: "https://i.pinimg.com/736x/31/1e/bf/311ebf78d5818c444e880aaa1b4495f9.jpg" },
{ name: "Toy Story", img: "https://i.pinimg.com/736x/80/34/08/803408c280ebb74217e40f93b1892195.jpg" },
{ name: "The Powerpuff Girls", img: "https://i.pinimg.com/736x/93/4e/40/934e40553bfe002df5267b0f08bd6bd1.jpg" },
{ name: "Oddbods", img: "https://i.pinimg.com/736x/0f/bb/5a/0fbb5ab3997d26e60cd078ac7cd57a91.jpg" },
{ name: "PAW Patrol", img: "https://i.pinimg.com/736x/87/bb/77/87bb779bd3700b1d469316e851a2c50f.jpg" },
{ name: "Adit Sopo Jarwo", img: "https://i.pinimg.com/736x/0b/d7/40/0bd74092c0a2a19e4ce6cff8c79cd032.jpg" },
{ name: "Kung Fu Panda", img: "https://i.pinimg.com/736x/f7/9f/28/f79f28d0c5e5d73daa13b332b580e817.jpg" },
{ name: "Shinbi's House", img: "https://i.pinimg.com/736x/62/b9/5d/62b95dfa2311fa2b3858ce7a250e9eb9.jpg" },
{ name: "Hello Jadoo", img: "https://i.pinimg.com/736x/0a/d1/f0/0ad1f048850760a15ccd2ec458fbb6bb.jpg" },
{ name: "We Bare Bears", img: "https://i.pinimg.com/736x/41/6f/15/416f15639984ca015fc351700538f687.jpg" },
{ name: "Ejen Ali", img: "https://i.pinimg.com/736x/ca/7f/e4/ca7fe4c72b74e026d542a66a10d27168.jpg" },
{ name: "Upin & Ipin", img: "https://i.pinimg.com/736x/79/d9/40/79d940ca8beb88b553a8cd1e044d4c3e.jpg" }
]
let randomIndex = Math.floor(Math.random() * src.length)
let json = src[randomIndex]
let clue = json.name.replace(/[AIUEO]/gi, '_')
let caption = `🎬 *Tebak Kartun* 🎬\n\nClue: ${clue}\n\n⏱️ Waktu: 60 detik\n🎁 Hadiah: 5000 XP\n\nKetik *nyerah* untuk menyerah\n\nJika jawaban salah bot tidak akan respon, bot akan respon jika jawabannya benar`
await satanic.sendMessage(m.chat, { 
image: { url: json.img }, 
caption: caption 
}, { quoted: m })
satanic.tebakkartun[m.chat] = [
json,
setTimeout(() => {
if (satanic.tebakkartun[m.chat]) {
m.reply(`⏳ Waktu habis!\nJawaban: *${json.name}*`)
delete satanic.tebakkartun[m.chat]
}
}, timeout),
0
]
} catch (e) {
m.reply('❌ Error: ' + e.message)
}
}
break
case 'tebakhewan': {
if (!m.isGroup) return m.reply('❌ Hanya bisa digunakan di grup!')
if (satanic.tebakhewan[m.chat]) return m.reply('⚠️ Masih ada sesi tebak hewan di grup ini!')
let timeout = 60000
try {
let res = await fetch('https://raw.githubusercontent.com/yuurahz/Json/b54e01f146fbe0819403d263dcd574f5defae0f9/Game/tebakhewan.json')
let data = await res.json()
if (!data || data.length === 0) return m.reply('❌ Gagal mengambil soal, coba lagi nanti.')
let randomIndex = Math.floor(Math.random() * data.length)
let json = data[randomIndex]
let clue = json.nama.replace(/[AIUEO]/gi, '_')
let caption = `🐾 *Tebak Hewan* 🐾\n\nClue: ${clue}\n\n⏱️ Waktu: 60 detik\n🎁 Hadiah: 5000 XP\n\nKetik *nyerah* untuk menyerah\n\nJika jawaban salah bot tidak akan respon, bot akan respon jika jawabannya benar`
await satanic.sendMessage(m.chat, { 
image: { url: json.img }, 
caption: caption 
}, { quoted: m })
satanic.tebakhewan[m.chat] = [
json,
setTimeout(() => {
if (satanic.tebakhewan[m.chat]) {
m.reply(`⏳ Waktu habis!\nJawaban: *${json.nama}*`)
delete satanic.tebakhewan[m.chat]
}
}, timeout),
0
]
} catch (e) {
m.reply('❌ Error: ' + e.message)
}
}
break
case 'tebakjkt48': {
if (!m.isGroup) return m.reply('❌ Hanya bisa digunakan di grup!')
if (satanic.tebakjkt48[m.chat]) return m.reply('⚠️ Masih ada sesi tebak JKT48 di grup ini!')
let timeout = 60000
try {
let res = await fetch('https://api.crstlnz.my.id/api/member?group=jkt48')
let data = await res.json()
if (!data || data.length === 0) return m.reply('❌ Gagal mengambil soal, coba lagi nanti.')
let filteredData = data.filter(item => item.img && item.name)
if (filteredData.length === 0) return m.reply('❌ Tidak ada data member yang valid.')
let randomIndex = Math.floor(Math.random() * filteredData.length)
let json = filteredData[randomIndex]
let clue = json.name.replace(/[AIUEO]/gi, '_')
let generation = json.generation || 'Tidak diketahui'
let team = json.team || 'Tidak diketahui'
let graduate = json.is_graduate ? '✅ Lulus' : '❌ Aktif'
let caption = `👋 *Tebak Member JKT48* 👋\n\nClue: ${clue}\n\n📋 Informasi Member:\n🎂 Generasi: ${generation}\n🏷️ Tim: ${team}\n🎓 Status: ${graduate}\n\n⏱️ Waktu: 60 detik\n🎁 Hadiah: 5000 XP\n\nKetik *nyerah* untuk menyerah\n\nJika jawaban salah bot tidak akan respon, bot akan respon jika jawabannya benar`
await satanic.sendMessage(m.chat, { 
image: { url: json.img }, 
caption: caption 
}, { quoted: m })
satanic.tebakjkt48[m.chat] = [
json,
setTimeout(() => {
if (satanic.tebakjkt48[m.chat]) {
m.reply(`⏳ Waktu habis!\nJawaban: *${json.name}*`)
delete satanic.tebakjkt48[m.chat]
}
}, timeout),
0
]
} catch (e) {
m.reply('❌ Error: ' + e.message)
}
}
break
case 'tebakanime': {
if (!m.isGroup) return m.reply('❌ Hanya bisa digunakan di grup!')
if (satanic.tebakanime[m.chat]) return m.reply('⚠️ Masih ada sesi tebak anime di grup ini!')
let timeout = 60000
try {
let res = await fetch('https://api.deline.web.id/game/tebakanime')
let result = await res.json()
if (!result.status) return m.reply('❌ Gagal mengambil soal, coba lagi nanti.')
let json = result.result
let clue = json.jawaban.replace(/[AIUEO]/gi, '_')
let caption = `🎌 *Tebak Anime* 🎌\n\nClue: ${clue}\n\n⏱️ Waktu: 60 detik\n🎁 Hadiah: 5000 XP\n\nKetik *nyerah* untuk menyerah\n\nJika jawaban salah bot tidak akan respon, bot akan respon jika jawabannya benar`
await satanic.sendMessage(m.chat, { 
image: { url: json.soal }, 
caption: caption 
}, { quoted: m })
satanic.tebakanime[m.chat] = [
json,
setTimeout(() => {
if (satanic.tebakanime[m.chat]) {
m.reply(`⏳ Waktu habis!\nJawaban: *${json.jawaban}*`)
delete satanic.tebakanime[m.chat]
}
}, timeout),
0
]
} catch (e) {
m.reply('❌ Error: ' + e.message)
}
}
break
case 'maths': {
if (!m.isGroup) return m.reply('❌ Hanya bisa digunakan di grup!')
if (satanic.maths.hasOwnProperty(m.sender)) return m.reply('⚠️ Masih ada sesi maths yang belum diselesaikan!')
let text = m.text.trim()
let level = 'easy'
let availableLevels = ['noob', 'easy', 'medium', 'hard', 'extreme', 'impossible', 'impossible2', 'impossible3', 'impossible4', 'impossible5']
let parts = text.split(' ')
if (parts.length > 1 && availableLevels.includes(parts[1].toLowerCase())) {
level = parts[1].toLowerCase()
}
try {
let res = await fetch(`https://api.deline.web.id/game/maths?level=${level}`)
let result = await res.json()
if (!result.status) return m.reply('❌ Gagal mengambil soal, coba lagi nanti.')
if (!result.data) return m.reply('❌ Data soal tidak ditemukan.')
let json = result.data
let caption = `🧮 *Maths* 🧮
Level: ${level}
Soal: ${json.pertanyaan}
⏱️ Waktu: 60 detik
🎁 Hadiah: 5000 XP
Ketik *nyerah* untuk menyerah
Jika jawaban salah bot tidak akan respon, bot akan respon jika jawabannya benar
📌 *Cara Penggunaan:*
.maths [level]
📋 *Daftar Level:*
• noob
• easy
• medium
• hard
• extreme
• impossible
• impossible2
• impossible3
• impossible4
• impossible5
Contoh: .maths noob`
await satanic.sendMessage(m.chat, { text: caption }, { quoted: m })
satanic.maths[m.sender] = json.jawaban
setTimeout(() => {
if (satanic.maths.hasOwnProperty(m.sender)) {
m.reply(`⏳ Waktu habis!\nJawaban: *${satanic.maths[m.sender]}*`)
delete satanic.maths[m.sender]
}
}, 60000)
} catch (e) {
m.reply('❌ Error: ' + e.message)
}
}
break
case 'tebakpemainbola': {
if (!m.isGroup) return m.reply('❌ Hanya bisa digunakan di grup!')
if (satanic.tebakpemainbola[m.chat]) return m.reply('⚠️ Masih ada sesi tebak pemain bola di grup ini!')
let timeout = 60000
try {
let res = await fetch('https://api.deline.web.id/game/tebakpemainbola')
let result = await res.json()
if (!result.status) return m.reply('❌ Gagal mengambil soal, coba lagi nanti.')
let json = result.result
let clue = json.jawaban.replace(/[AIUEO]/gi, '_')
let caption = `⚽ *Tebak Pemain Bola* ⚽\n\n${json.soal}\n\nClue: ${clue}\n\n⏱️ Waktu: 60 detik\n🎁 Hadiah: 5000 XP\n\nKetik *nyerah* untuk menyerah\n\nJika jawaban salah bot tidak akan respon, bot akan respon jika jawabannya benar`
await satanic.sendMessage(m.chat, { text: caption }, { quoted: m })
satanic.tebakpemainbola[m.chat] = [
json,
setTimeout(() => {
if (satanic.tebakpemainbola[m.chat]) {
m.reply(`⏳ Waktu habis!\nJawaban: *${json.jawaban}*`)
delete satanic.tebakpemainbola[m.chat]
}
}, timeout),
0
]
} catch (e) {
m.reply('❌ Error: ' + e.message)
}
}
break
case 'tebakheroml': {
if (!m.isGroup) return m.reply('❌ Hanya bisa digunakan di grup!')
if (satanic.tebakheroml[m.chat]) return m.reply('⚠️ Masih ada sesi tebak hero ML di grup ini!')
let timeout = 60000
try {
let res = await fetch('https://api.deline.web.id/game/tebakheroml')
let result = await res.json()
if (!result.status) return m.reply('❌ Gagal mengambil soal, coba lagi nanti.')
let json = result.result
let clue = json.jawaban.replace(/[AIUEO]/gi, '_')
let caption = `🎮 *Tebak Hero ML* 🎮\n\n${json.deskripsi}\n\nClue: ${clue}\n\n⏱️ Waktu: 60 detik\n🎁 Hadiah: 5000 XP\n\nKetik *nyerah* untuk menyerah\n\nJika jawaban salah bot tidak akan respon, bot akan respon jika jawabannya benar`
await satanic.sendMessage(m.chat, { 
image: { url: json.img }, 
caption: caption 
}, { quoted: m })
satanic.tebakheroml[m.chat] = [
json,
setTimeout(() => {
if (satanic.tebakheroml[m.chat]) {
m.reply(`⏳ Waktu habis!\nJawaban: *${json.jawaban}*`)
delete satanic.tebakheroml[m.chat]
}
}, timeout),
0
]
} catch (e) {
m.reply('❌ Error: ' + e.message)
}
}
break
case 'cerdascermat': {
if (!m.isGroup) return m.reply('❌ Hanya bisa digunakan di grup!')
let args = m.text.split(' ')
let mapel = args[1]
let jumlah = parseInt(args[2]) || 5
if (!mapel) {
return m.reply(`❌ Harus pilih mata pelajaran!
📚 Pilihan mapel:
• bindo (Bahasa Indonesia)
• tik (TIK)
• pkn (PKN)
• bing (Bahasa Inggris)
• penjas (Penjas)
• pai (PAI)
• matematika (Matematika)
• jawa (Bahasa Jawa)
• ips (IPS)
• ipa (IPA)
• akuntansi (Akuntansi)
• listrik (Listrik)
• multimedia (Multimedia)
📝 Contoh:
• *cerdascermat penjas*
• *cerdascermat matematika 7*
• *cerdascermat akuntansi 10*
• *cerdascermat listrik 8*
• *cerdascermat multimedia 6*`)
}
if (jumlah < 5 || jumlah > 10) {
return m.reply(`❌ Jumlah soal harus antara 5-10!
Contoh: *cerdascermat penjas 7*`)
}
let mapelValid = ['matematika', 'penjas', 'pai', 'pkn', 'bing', 'tik', 'ipa', 'ips', 'bindo', 'jawa', 'akuntansi', 'listrik', 'multimedia']
if (!mapelValid.includes(mapel.toLowerCase())) {
return m.reply(`❌ Mata pelajaran tidak valid!
📚 Pilihan mapel:
• bindo (Bahasa Indonesia)
• tik (TIK)
• pkn (PKN)
• bing (Bahasa Inggris)
• penjas (Penjas)
• pai (PAI)
• matematika (Matematika)
• jawa (Bahasa Jawa)
• ips (IPS)
• ipa (IPA)
• akuntansi (Akuntansi)
• listrik (Listrik)
• multimedia (Multimedia)
📝 Contoh:
• *cerdascermat penjas*
• *cerdascermat matematika 7*
• *cerdascermat akuntansi 10*
• *cerdascermat listrik 8*
• *cerdascermat multimedia 6*`)
}
if (satanic.cerdascermat[m.chat]) {
return m.reply('⚠️ Masih ada permainan berjalan! Ketik *nyerah* untuk mengakhiri.')
}
try {
let data
if (['akuntansi', 'listrik', 'multimedia'].includes(mapel.toLowerCase())) {
let mapelData = await fetchMapelSoal(mapel.toLowerCase(), jumlah)
if (!mapelData) {
return m.reply(`❌ Gagal mengambil soal ${mapel}, coba lagi nanti.`)
}
data = mapelData
} else {
let res = await fetch(`https://api.deline.web.id/game/cc-sd?matapelajaran=${mapel}&jumlahsoal=${jumlah}`)
let result = await res.json()
if (!result.status) return m.reply('❌ Gagal mengambil soal, coba lagi nanti.')
data = result
}
satanic.cerdascermat[m.chat] = {
mapel: mapel,
soal: data.soal,
index: 0,
skor: 0,
benar: 0
}
let db = readNilaiDB()
if (!db[m.chat]) {
db[m.chat] = {
nama_grup: m.pushName || 'Unknown Group',
id_grup: m.chat,
users: {}
}
writeNilaiDB(db)
}
let soalSaatIni = satanic.cerdascermat[m.chat].soal[0]
let pilihan = ''
for (let opt of soalSaatIni.semua_jawaban) {
let huruf = Object.keys(opt)[0]
let teks = opt[huruf]
pilihan += `${huruf.toUpperCase()}. ${teks}\n`
}
m.reply(`📚 *Cerdas Cermat - ${mapel.toUpperCase()}* 📚
Soal 1/${jumlah}:
${soalSaatIni.pertanyaan}
${pilihan}
⏰ Ketik *nyerah* untuk menyerah`)
} catch (e) {
m.reply('❌ Error: ' + e.message)
}
}
break
case 'tebakbendera': {
if (!m.isGroup) return m.reply('❌ Hanya bisa digunakan di grup!')
if (satanic.tebakbendera[m.chat]) return m.reply('⚠️ Masih ada sesi tebak bendera di grup ini!')
let timeout = 60000
try {
let res = await fetch('https://api.deline.web.id/game/tebakbendera')
let result = await res.json()
if (!result.status) return m.reply('❌ Gagal mengambil soal, coba lagi nanti.')
let json = result.result
let clue = json.name.replace(/[AIUEO]/gi, '_')
let caption = `🏳️ *Tebak Bendera* 🏳️\n\nClue: ${clue}\n\n⏱️ Waktu: 60 detik\n🎁 Hadiah: 5000 XP\n\nKetik *nyerah* untuk menyerah\n\nJika jawaban salah bot tidak akan respon, bot akan respon jika jawabannya benar`
await satanic.sendMessage(m.chat, { 
image: { url: json.img }, 
caption: caption 
}, { quoted: m })
satanic.tebakbendera[m.chat] = [
json,
setTimeout(() => {
if (satanic.tebakbendera[m.chat]) {
m.reply(`⏳ Waktu habis!\nJawaban: *${json.name}*`)
delete satanic.tebakbendera[m.chat]
}
}, timeout),
0
]
} catch (e) {
m.reply('❌ Error: ' + e.message)
}
}
break
case 'tebakkimia': {
if (!m.isGroup) return m.reply('❌ Hanya bisa digunakan di grup!')
if (satanic.tebakkimia.hasOwnProperty(m.sender)) return m.reply('⚠️ Masih ada sesi tebak kimia yang belum diselesaikan!')
try {
let res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkimia.json')
let data = await res.json()
if (!data || data.length === 0) return m.reply('❌ Gagal mengambil soal, coba lagi nanti.')
let randomIndex = Math.floor(Math.random() * data.length)
let result = data[randomIndex]
let caption = `🧪 *Tebak Kimia* 🧪\n\nUnsur: ${result.unsur}\n\n⏱️ Waktu: 60 detik\n🎁 Hadiah: 5000 XP\n\nKetik *nyerah* untuk menyerah\n\nJika jawaban salah bot tidak akan respon, bot akan respon jika jawabannya benar`
await satanic.sendMessage(m.chat, { text: caption }, { quoted: m })
satanic.tebakkimia[m.sender] = result.lambang
setTimeout(() => {
if (satanic.tebakkimia.hasOwnProperty(m.sender)) {
m.reply(`⏳ Waktu habis!\nJawaban: *${satanic.tebakkimia[m.sender]}*`)
delete satanic.tebakkimia[m.sender]
}
}, 60000)
} catch (e) {
m.reply('❌ Error: ' + e.message)
}
}
break
case 'asahotak': {
if (!m.isGroup) return m.reply('❌ Hanya bisa digunakan di grup!')
if (satanic.asahotak.hasOwnProperty(m.sender)) return m.reply('⚠️ Masih ada sesi asah otak yang belum diselesaikan!')
try {
let res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/asahotak.json')
let data = await res.json()
if (!data || data.length === 0) return m.reply('❌ Gagal mengambil soal, coba lagi nanti.')
let randomIndex = Math.floor(Math.random() * data.length)
let result = data[randomIndex]
let caption = `🧠 *Asah Otak* 🧠\n\nSoal: ${result.soal}\n\n⏱️ Waktu: 60 detik\n🎁 Hadiah: 5000 XP\n\nKetik *nyerah* untuk menyerah\n\nJika jawaban salah bot tidak akan respon, bot akan respon jika jawabannya benar`
await satanic.sendMessage(m.chat, { text: caption }, { quoted: m })
satanic.asahotak[m.sender] = result.jawaban
setTimeout(() => {
if (satanic.asahotak.hasOwnProperty(m.sender)) {
m.reply(`⏳ Waktu habis!\nJawaban: *${satanic.asahotak[m.sender]}*`)
delete satanic.asahotak[m.sender]
}
}, 60000)
} catch (e) {
m.reply('❌ Error: ' + e.message)
}
}
break
case 'siapaaku': {
if (!m.isGroup) return 
let users = global.db.users[m.sender]
let timeout = 60000 
let poin = 10000
if (id in satanic.siapaaku) return reply('Masih ada soal belum terjawab di chat ini')
let src = await axios.get('https://raw.githubusercontent.com/BochilTeam/database/master/games/siapakahaku.json')
let json = src.data[Math.floor(Math.random() * src.data.length)]
let caption = `
Soal: ${json.soal}
Waktu: *${(timeout / 1000).toFixed(2)} detik*
Hadiah: ${poin} Money
`.trim()
satanic.siapaaku[id] = [
await reply(`${caption}`),
json, poin,
setTimeout(() => {
if (satanic.siapaaku[id]) 
users.money -= 200
reply(`*GAME SIAPAKAH AKU*\n\nWaktu habis!\n𖦹 Jawabannya adalah; *${json.jawaban}*\n𖦹 Saldo kamu dikurangi 200\n𖦹 Sisa Saldo kamu: *${db.data.users[sender].money.toLocaleString()}*`)
delete satanic.siapaaku[id]
}, timeout)
]
}
break
case 'susunkata': {
if (!m.isGroup) return 
let timeout = 60000
let poin = 10000
if (id in satanic.susunkata) return reply('Masih ada soal belum terjawab di chat ini')
let src = await axios.get('https://raw.githubusercontent.com/BochilTeam/database/master/games/susunkata.json')
let json = src.data[Math.floor(Math.random() * src.data.length)]
let caption = `
Soal: ${json.soal}
Tipe: ${json.tipe}
Waktu: *${(timeout / 1000).toFixed(2)} detik*
Hadiah: ${poin} Money
Ketik nyerah Jika ingin menyerah
`.trim()
satanic.susunkata[id] = [
await reply(`${caption}`),
json, poin,
setTimeout(() => {
reply(`*GAME SUSUN KATA*\n\nWaktu habis!\n𖦹 Jawabannya adalah; *${json.jawaban}*\n𖦹 Saldo kamu dikurangi 200\n𖦹 Sisa Saldo kamu: *${db.data.users[sender].money.toLocaleString()}*`)
delete satanic.susunkata[id]
}, timeout)
]
}
break
case 'tekateki': {
if (!m.isGroup) return 
let timeout = 60000
let users = global.db.users[m.sender]
let poin = 10000
if (id in satanic.tekateki) return reply('Masih ada soal belum terjawab di chat ini')
let src = await axios.get('https://raw.githubusercontent.com/BochilTeam/database/master/games/tekateki.json')
let json = src.data[Math.floor(Math.random() * src.data.length)]
let caption = `
Soal: ${json.soal}
Waktu: *${(timeout / 1000).toFixed(2)} detik*
Bonus: ${poin} XP
Hadiah: ${poin} Money 💸
ketik nyerah untuk menyerah
`.trim()
satanic.tekateki[id] = [
await reply(`${caption}`),
json, poin,
setTimeout(() => {
if (satanic.tekateki[id]) 
users.money -= 200
reply(`*GAME TEKA-TEKI*\n\nWaktu habis!\n𖦹 Jawabannya adalah; *${json.jawaban}*\n𖦹 Saldo kamu dikurangi 200\n𖦹 Sisa Saldo kamu: *${db.users[sender].money.toLocaleString()}*`)
delete satanic.tekateki[id]
}, timeout)
]
}
break
case 'family100': {
if (!m.isGroup) return 
let winScore = 10000
if (id in satanic.family100) return reply('Masih Ada Sesi Yang Belum Diselesaikan!')
let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json')).json()
let json = src[Math.floor(Math.random() * src.length)]
let hasil = `*Jawablah Pertanyaan Berikut :*\n\nSoal : ${json.soal}\n\nHadiah : 10.000 money\n\nTerdapat *${json.jawaban.length}* Jawaban ${json.jawaban.find(v => v.includes(' ')) ? `(beberapa Jawaban Terdapat Spasi)` : ''}`.trim()
satanic.family100[id] = {
id,
msg: await reply(`${hasil}`),
...json,
terjawab: Array.from(json.jawaban, () => false),
winScore,  
}
}
break
case 'tebakgambar': {
if (!m.isGroup) return
let timeout = 60000
let id = m.chat
if (id in satanic.tebakkata) return reply("Masih Ada Sesi Yang Belum Diselesaikan!")
async function tebakgambar() {
let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json')
let result = anu[Math.floor(Math.random() * anu.length)]
return {
img: result.img,
jawaban: result.jawaban,
deskripsi: result.deskripsi
}}
let tos = await tebakgambar ()
console.log(tos)
let caption = `Silahkan Jawab Soal Di Atas Ini\n\nDeskripsi : ${tos.deskripsi}\nWaktu : 60s\nHadiah : 10.000 money`
satanic.tebakgambar[id] = [
await satanic.sendMessage(from, {caption: caption, image: {url: tos.img}}, {quoted: m}),
tos,
setTimeout(() => {
if (satanic.tebakgambar[id])
reply(`Waktu Habis\nJawaban:  ${tos.jawaban}\n\nIngin bermain? Ketik tebakgambar`)
delete satanic.tebakgambar[id]
}, 60000)
]
}
break
case 'tebaklagu': {
if (!m.isGroup) return m.reply('❌ Hanya bisa digunakan di grup!')
if (satanic.tebaklagu[m.chat]) return m.reply('⚠️ Masih ada sesi tebak lagu di grup ini!')
let timeout = 60000
try {
let res = await fetch('https://raw.githubusercontent.com/qisyana/scrape/main/tebaklagu.json')
let data = await res.json()
if (!data || data.length === 0) return m.reply('❌ Gagal mengambil soal, coba lagi nanti.')
let randomIndex = Math.floor(Math.random() * data.length)
let json = data[randomIndex]
let clue = json.judul.replace(/[AIUEO]/gi, '_')
let caption = `🎵 *Tebak Lagu* 🎵\n\nClue: ${clue}\n\n⏱️ Waktu: 60 detik\n🎁 Hadiah: 5000 XP\n\nKetik *nyerah* untuk menyerah\n\nJika jawaban salah bot tidak akan respon, bot akan respon jika jawabannya benar`
await satanic.sendMessage(m.chat, { 
audio: { url: json.lagu },
mimetype: 'audio/mpeg',
fileName: 'tebaklagu.mp3'
}, { quoted: m })
satanic.tebaklagu[m.chat] = [
json,
setTimeout(() => {
if (satanic.tebaklagu[m.chat]) {
m.reply(`⏳ Waktu habis!\nJudul: *${json.judul}*\nArtis: *${json.artis}*`)
delete satanic.tebaklagu[m.chat]
}
}, timeout),
0
]
} catch (e) {
m.reply('❌ Error: ' + e.message)
}
}
break
case 'tebaksurah': {
satanic.tebaksurah = satanic.tebaksurah ? satanic.tebaksurah : {}
let users = global.db.users[m.sender]
if (!m.isGroup) return reply('❌ Hanya bisa digunakan di grup!')
let timeout = 120000
let poin = 4999
let ranSurah = Math.floor(Math.random() * 6236) + 1
let res = await fetch(`https://api.alquran.cloud/v1/ayah/${ranSurah}/ar.alafasy`)
if (res.status !== 200) return reply('❌ Gagal mengambil ayat, coba lagi!')
let result = await res.json()
if (result.code === 404) return reply(`❌ Ayah tidak ditemukan, ketik *${prefix}tebaksurah* lagi`)
let json = result.data
let caption = `
🎮 *Tebak Surah* 🎮
Dengarkan audio ayat berikut dan tebak nama Surahnya!
🕑 Waktu: 120 detik
💥 Bonus: ${poin} XP
Ketik *${prefix}nyerah* untuk menyerah
`.trim()
let answerInfo = `
📖 *Informasi Surah*
Nama: ${json.surah.englishName} (${json.surah.name})
Nomor Surah: ${json.surah.number}
Jumlah Ayat: ${json.surah.numberOfAyahs}
Tipe: ${json.surah.revelationType}
`.trim()
satanic.tebaksurah[id] = [
await reply(caption),
json,
setTimeout(async () => {
if (satanic.tebaksurah[id]) {
await satanic.sendMessage(m.chat, { audio: { url: json.audio }, mimetype: 'audio/mpeg', ptt: true }, { quoted: satanic.tebaksurah[id][0] })
reply(`⏳ Waktu habis!\n${answerInfo}`, satanic.tebaksurah[id][0])
delete satanic.tebaksurah[id]
}
}, timeout)
]
setTimeout(async () => {
await satanic.sendMessage(m.chat, { audio: { url: json.audio }, mimetype: 'audio/mpeg', ptt: true }, { quoted: satanic.tebaksurah[id][0] })
}, 3000)
}   
break
case 'tebaktebakan': {
if (!m.isGroup) return m.reply('❌ Hanya bisa digunakan di grup!')
if (satanic.tebaktebakan.hasOwnProperty(m.sender)) return m.reply('⚠️ Masih ada sesi tebak-tebakan yang belum diselesaikan!')
try {
let res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaktebakan.json')
let data = await res.json()
if (!data || data.length === 0) return m.reply('❌ Gagal mengambil soal, coba lagi nanti.')
let randomIndex = Math.floor(Math.random() * data.length)
let result = data[randomIndex]
let caption = `🤔 *Tebak-Tebakan* 🤔\n\nSoal: ${result.soal}\n\n⏱️ Waktu: 60 detik\n🎁 Hadiah: 5000 XP\n\nKetik *nyerah* untuk menyerah\n\nJika jawaban salah bot tidak akan respon, bot akan respon jika jawabannya benar`
await satanic.sendMessage(m.chat, { text: caption }, { quoted: m })
satanic.tebaktebakan[m.sender] = result.jawaban
setTimeout(() => {
if (satanic.tebaktebakan.hasOwnProperty(m.sender)) {
m.reply(`⏳ Waktu habis!\nJawaban: *${satanic.tebaktebakan[m.sender]}*`)
delete satanic.tebaktebakan[m.sender]
}
}, 60000)
} catch (e) {
m.reply('❌ Error: ' + e.message)
}
}
break
case 'tebaklogo': {
if (!m.isGroup) return m.reply('❌ Hanya bisa digunakan di grup!')
if (satanic.tebaklogo[m.chat]) return m.reply('⚠️ Masih ada sesi tebak logo di grup ini!')
let timeout = 60000
try {
let res = await fetch('https://raw.githubusercontent.com/orderku/db/main/dbbot/game/tebakapp.json')
let data = await res.json()
if (!data || data.length === 0) return m.reply('❌ Gagal mengambil soal, coba lagi nanti.')
let randomIndex = Math.floor(Math.random() * data.length)
let soal = data[randomIndex].data
let clue = soal.jawaban.replace(/[AIUEO]/gi, '_')
let caption = `🎮 *Tebak Logo* 🎮\n\nClue: ${clue}\n\n⏱️ Waktu: 60 detik\n🎁 Hadiah: 5000 XP\n\nKetik *nyerah* untuk menyerah\nJika jawaban salah bot tidak akan merespon, hanya jawaban yang benar`
await satanic.sendMessage(m.chat, { 
image: { url: soal.image }, 
caption: caption 
}, { quoted: m })
satanic.tebaklogo[m.chat] = [
soal,
setTimeout(() => {
if (satanic.tebaklogo[m.chat]) {
m.reply(`⏳ Waktu habis!\nJawaban: *${soal.jawaban}*`)
delete satanic.tebaklogo[m.chat]
}
}, timeout),
0
]
} catch (e) {
m.reply('❌ Error: ' + e.message)
}
}
break
case 'tebakgame': {
if (!m.isGroup) return m.reply('❌ Hanya bisa digunakan di grup!')
if (satanic.tebakgame[m.chat]) return m.reply('⚠️ Masih ada sesi tebak game di grup ini!')
let timeout = 60000
try {
let res = await fetch('https://raw.githubusercontent.com/qisyana/scrape/main/tebakgame.json')
let data = await res.json()
if (!data || data.length === 0) return m.reply('❌ Gagal mengambil soal, coba lagi nanti.')
let randomIndex = Math.floor(Math.random() * data.length)
let json = data[randomIndex]
let clue = json.jawaban.replace(/[AIUEO]/gi, '_')
let caption = `🎮 *Tebak Game* 🎮\n\nClue: ${clue}\n\n⏱️ Waktu: 60 detik\n🎁 Hadiah: 5000 XP\n\nKetik *nyerah* untuk menyerah\nJika jawaban salah bot tidak akan respon, bot akan respon jika jawabannya benar`
await satanic.sendMessage(m.chat, { 
image: { url: json.img }, 
caption: caption 
}, { quoted: m })
satanic.tebakgame[m.chat] = [
json,
setTimeout(() => {
if (satanic.tebakgame[m.chat]) {
m.reply(`⏳ Waktu habis!\nJawaban: *${json.jawaban}*`)
delete satanic.tebakgame[m.chat]
}
}, timeout),
0
]
} catch (e) {
m.reply('❌ Error: ' + e.message)
}
}
break
case 'catur':
case 'chess':
case 'aqua':
case 'cezz': {
  try {
    const html = String.raw`<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"><title>Aqua Ai Chess</title><style>:root{--bg:#08070b;--panel:#121017;--line:rgba(255,255,255,.09);--text:#fff;--muted:#aaa1ae;--pink:#ff6fae;--light:#f2d7b5;--dark:#a96f54;--selected:#ffd45c;--move:rgba(93,255,167,.75);--capture:rgba(255,80,110,.9)}*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}html,body{margin:0;padding:0;background:radial-gradient(circle at top,#21101c 0%,#0b080d 45%,#050407 100%);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif}body{min-height:100vh;padding:10px}.app{width:min(100%,760px);margin:auto}.header{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.brand{display:flex;align-items:center;gap:10px}.avatar{width:46px;height:46px;border-radius:15px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#ff77b4,#9b4dff);font-size:25px}.title{font-size:19px;font-weight:800}.subtitle{color:var(--muted);font-size:11px;margin-top:2px}.status{padding:8px 11px;border:1px solid var(--line);border-radius:12px;background:rgba(255,255,255,.035);color:#ddd;font-size:11px}.controls,.actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px}.actions{grid-template-columns:repeat(3,1fr);margin-top:10px}.select,.btn{min-height:42px;border-radius:13px;border:1px solid var(--line);background:rgba(255,255,255,.045);color:#fff;font-size:13px;outline:none}.select{padding:0 12px}.btn{padding:0 12px;font-weight:700;cursor:pointer}.btn:active{transform:scale(.97)}.btn.primary{background:linear-gradient(135deg,#ff5fa5,#c457ff);border:0}.boardWrap{position:relative;width:100%;max-width:680px;margin:auto;padding:7px;border-radius:21px;background:linear-gradient(145deg,rgba(255,255,255,.10),rgba(255,255,255,.025));box-shadow:0 20px 60px rgba(0,0,0,.45),0 0 40px rgba(255,80,160,.08)}.board{position:relative;width:100%;aspect-ratio:1;display:grid;grid-template-columns:repeat(8,1fr);overflow:hidden;border-radius:15px;touch-action:none;user-select:none}.square{position:relative;display:flex;align-items:center;justify-content:center;aspect-ratio:1;cursor:pointer}.square.light{background:var(--light)}.square.dark{background:var(--dark)}.square.selected{box-shadow:inset 0 0 0 4px var(--selected)}.square.check{background:radial-gradient(circle,rgba(255,30,80,.95),rgba(255,30,80,.35)55%,transparent 75%)}.piece{position:relative;z-index:4;font-size:clamp(28px,8vw,61px);line-height:1;filter:drop-shadow(0 3px 2px rgba(0,0,0,.45));transition:transform .1s ease}.piece.w{color:#fff}.piece.b{color:#000;filter:drop-shadow(0 3px 2px rgba(255,255,255,.2))}.square.selected .piece{transform:scale(1.08)}.moveDot{position:absolute;width:22%;height:22%;border-radius:50%;background:var(--move);z-index:2;box-shadow:0 0 10px rgba(93,255,167,.35)}.captureRing{position:absolute;inset:8%;border-radius:50%;border:5px solid var(--capture);z-index:2}.coord{position:absolute;font-size:9px;font-weight:800;opacity:.65;pointer-events:none}.file{right:4px;bottom:2px}.rank{left:4px;top:2px}.light .coord{color:#754c39}.dark .coord{color:#f5dcc5}.info{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px}.card{padding:11px;min-height:62px;border:1px solid var(--line);border-radius:14px;background:rgba(255,255,255,.035);text-align:center}.card b{display:block;font-size:15px}.card span{color:var(--muted);font-size:10px}.captured,.message{margin-top:10px;padding:10px 12px;border:1px solid var(--line);border-radius:13px;background:rgba(255,255,255,.03);color:#ddd}.captured{min-height:38px;font-size:19px;word-break:break-word}.message{min-height:40px;background:rgba(255,111,174,.07);border-color:rgba(255,111,174,.14);text-align:center;color:#ffd5e7;font-size:12px;display:flex;align-items:center;justify-content:center}.overlay,.promotion{position:fixed;inset:0;z-index:50;display:none;align-items:center;justify-content:center;padding:20px;background:rgba(0,0,0,.72);backdrop-filter:blur(8px)}.overlay.show,.promotion.show{display:flex}.modal{width:min(92vw,420px);padding:23px;border-radius:23px;background:linear-gradient(145deg,#1c151e,#0f0c12);border:1px solid rgba(255,255,255,.1);box-shadow:0 25px 80px rgba(0,0,0,.65);text-align:center}.modalIcon{font-size:55px}.modal h2{margin:5px 0;font-size:24px}.modal p{color:var(--muted);font-size:13px;margin-bottom:17px}.modeButtons{display:grid;grid-template-columns:1fr 1fr;gap:9px}.modeBtn{padding:14px 10px;border-radius:14px;border:1px solid var(--line);background:rgba(255,255,255,.045);color:#fff;cursor:pointer}.modeBtn strong{display:block;margin-bottom:3px}.modeBtn small{color:var(--muted)}.promoBox{padding:18px;border-radius:20px;background:#171219;border:1px solid var(--line)}.promoBox h3{margin:0 0 12px;text-align:center}.promoChoices{display:flex;gap:8px}.promo{width:60px;height:60px;border:0;border-radius:13px;background:#29202a;color:white;font-size:39px}@media(max-width:430px){body{padding:7px}.boardWrap{padding:5px;border-radius:17px}.info{gap:5px}.card{padding:9px 4px}}</style></head><body><div class="app"><div class="header"><div class="brand"><div class="avatar">♟️</div><div><div class="title">Aqua Ai Chess ✨</div><div class="subtitle">"Waku waku... ayo catur!" ♡</div></div></div><div class="status" id="status">White turn</div></div><div class="controls"><select id="mode" class="select"><option value="easy">🟢 Easy</option><option value="medium" selected>🔵 Medium</option><option value="hard">🟣 Hard</option><option value="master">🔴 Master</option><option value="pvp">👥 2 Player</option></select><button class="btn primary" id="newGame">♻️ New Game</button></div><div class="boardWrap"><div id="board" class="board"></div></div><div class="info"><div class="card"><b id="turnText">White</b><span>Giliran</span></div><div class="card"><b id="moveText">0</b><span>Moves</span></div><div class="card"><b id="modeText">Medium</b><span>Mode</span></div></div><div class="captured" id="captured">⚪ —</div><div class="message" id="message">Pilih bidak untuk mulai bermain ♟️</div><div class="actions"><button class="btn" id="undo">↩️ Undo</button><button class="btn" id="flip">🔄 Flip</button><button class="btn" id="resign">🏳️ Resign</button></div></div><div class="overlay" id="overlay"><div class="modal"><div class="modalIcon" id="resultIcon">🏆</div><h2 id="resultTitle">Checkmate!</h2><p id="resultText">White wins.</p><div class="modeButtons"><button class="modeBtn" data-mode="easy"><strong>🟢 Easy</strong><small>Santai</small></button><button class="modeBtn" data-mode="medium"><strong>🔵 Medium</strong><small>Normal</small></button><button class="modeBtn" data-mode="hard"><strong>🟣 Hard</strong><small>Sulit</small></button><button class="modeBtn" data-mode="master"><strong>🔴 Master</strong><small>Serius 😭</small></button><button class="modeBtn" data-mode="pvp"><strong>👥 2 Player</strong><small>Teman vs teman</small></button><button class="modeBtn" id="playAgain"><strong>♻️ Rematch</strong><small>Main lagi</small></button></div></div></div><div class="promotion" id="promotion"><div class="promoBox"><h3>Promote Pion 👑</h3><div class="promoChoices"><button class="promo" data-piece="q">♕</button><button class="promo" data-piece="r">♖</button><button class="promo" data-piece="b">♗</button><button class="promo" data-piece="n">♘</button></div></div></div><script>'use strict';const W='w',B='b',FILES=['a','b','c','d','e','f','g','h'];const PIECES={w:{k:'♔',q:'♕',r:'♖',b:'♗',n:'♘',p:'♙'},b:{k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟'}};const VALUE={p:100,n:320,b:330,r:500,q:900,k:20000};const boardEl=document.getElementById('board'),modeEl=document.getElementById('mode'),statusEl=document.getElementById('status'),turnText=document.getElementById('turnText'),moveText=document.getElementById('moveText'),modeText=document.getElementById('modeText'),messageEl=document.getElementById('message'),capturedEl=document.getElementById('captured'),overlay=document.getElementById('overlay'),resultIcon=document.getElementById('resultIcon'),resultTitle=document.getElementById('resultTitle'),resultText=document.getElementById('resultText'),promotionEl=document.getElementById('promotion');let board=[],turn=W,selected=null,legalSelected=[],history=[],flipped=false,gameOver=false,thinking=false,pendingPromotion=null,castle={w:{k:true,q:true},b:{k:true,q:true}},enPassant=null,halfmove=0,mode='medium',captured={w:[],b:[]},audioCtx=null;function audio(){try{if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume()}catch{}}function sound(type){try{audio();if(!audioCtx)return;const o=audioCtx.createOscillator(),g=audioCtx.createGain(),n=audioCtx.currentTime;o.connect(g);g.connect(audioCtx.destination);o.type=type==='capture'?'square':'sine';o.frequency.setValueAtTime(type==='capture'?300:600,n);o.frequency.exponentialRampToValueAtTime(type==='capture'?100:800,n+.1);g.gain.setValueAtTime(.12,n);g.gain.exponentialRampToValueAtTime(.01,n+.12);o.start(n);o.stop(n+.12)}catch{}}function speak(t){try{if('speechSynthesis'in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='id-ID';u.pitch=1.4;u.rate=1.1;speechSynthesis.speak(u)}}catch{}}function clone(b){return b.map(r=>r.map(p=>p?{...p}:null))}function opp(c){return c===W?B:W}function inside(r,c){return r>=0&&r<8&&c>=0&&c<8}function piece(b,r,c){return inside(r,c)?b[r][c]:null}function initial(){const b=Array.from({length:8},()=>Array(8).fill(null)),back=['r','n','b','q','k','b','n','r'];for(let c=0;c<8;c++){b[0][c]={color:B,type:back[c]};b[1][c]={color:B,type:'p'};b[6][c]={color:W,type:'p'};b[7][c]={color:W,type:back[c]}}return b}function attacked(b,r,c,by){const pd=by===W?1:-1;for(const dc of[-1,1]){const p=piece(b,r+pd,c+dc);if(p&&p.color===by&&p.type==='p')return true}const ns=[[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];for(const[x,y]of ns){const p=piece(b,r+x,c+y);if(p&&p.color===by&&p.type==='n')return true}for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++){if(x||y){const p=piece(b,r+x,c+y);if(p&&p.color===by&&p.type==='k')return true}}for(const[x,y]of[[-1,-1],[-1,1],[1,-1],[1,1]]){let rr=r+x,cc=c+y;while(inside(rr,cc)){const p=b[rr][cc];if(p){if(p.color===by&&(p.type==='b'||p.type==='q'))return true;break}rr+=x;cc+=y}}for(const[x,y]of[[-1,0],[1,0],[0,-1],[0,1]]){let rr=r+x,cc=c+y;while(inside(rr,cc)){const p=b[rr][cc];if(p){if(p.color===by&&(p.type==='r'||p.type==='q'))return true;break}rr+=x;cc+=y}}return false}function king(b,c){for(let r=0;r<8;r++)for(let x=0;x<8;x++){const p=b[r][x];if(p&&p.color===c&&p.type==='k')return{r,c:x}}return null}function check(b,c){const k=king(b,c);return !k||attacked(b,k.r,k.c,opp(c))}function pseudo(b,r,c,color,rights,ep){const p=b[r][c];if(!p||p.color!==color)return[];const out=[];const add=(rr,cc,x={})=>{if(!inside(rr,cc))return;const t=b[rr][cc];if(!t||t.color!==p.color)out.push({from:{r,c},to:{r:rr,c:cc},...x})};if(p.type==='p'){const d=color===W?-1:1,s=color===W?6:1;if(inside(r+d,c)&&!b[r+d][c]){add(r+d,c);if(r===s&&!b[r+2*d][c])add(r+2*d,c,{doublePawn:true})}for(const dc of[-1,1]){const rr=r+d,cc=c+dc;if(!inside(rr,cc))continue;if(b[rr][cc]&&b[rr][cc].color!==color)add(rr,cc,{capture:true});if(ep&&ep.r===rr&&ep.c===cc)add(rr,cc,{capture:true,enPassant:true})}}if(p.type==='n')for(const[x,y]of[[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]])add(r+x,c+y);if(['b','r','q'].includes(p.type)){const ds=[];if(p.type==='b'||p.type==='q')ds.push([-1,-1],[-1,1],[1,-1],[1,1]);if(p.type==='r'||p.type==='q')ds.push([-1,0],[1,0],[0,-1],[0,1]);for(const[x,y]of ds){let rr=r+x,cc=c+y;while(inside(rr,cc)){if(!b[rr][cc])add(rr,cc);else{if(b[rr][cc].color!==color)add(rr,cc,{capture:true});break}rr+=x;cc+=y}}}if(p.type==='k'){for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)if(x||y)add(r+x,c+y);const q=rights[color];if(q&&!check(b,color)){if(q.k&&!b[r][5]&&!b[r][6]&&b[r][7]?.type==='r'&&b[r][7].color===color&&!attacked(b,r,5,opp(color))&&!attacked(b,r,6,opp(color)))out.push({from:{r,c},to:{r,c:6},castle:'k'});if(q.q&&!b[r][1]&&!b[r][2]&&!b[r][3]&&b[r][0]?.type==='r'&&b[r][0].color===color&&!attacked(b,r,3,opp(color))&&!attacked(b,r,2,opp(color)))out.push({from:{r,c},to:{r,c:2},castle:'q'})}}return out}function apply(b,m,promo='q'){const n=clone(b),p=n[m.from.r][m.from.c];n[m.from.r][m.from.c]=null;if(m.enPassant){const d=p.color===W?1:-1;n[m.to.r+d][m.to.c]=null}n[m.to.r][m.to.c]={...p};if(p.type==='p'&&(m.to.r===0||m.to.r===7))n[m.to.r][m.to.c].type=promo;if(m.castle==='k'){n[m.from.r][5]=n[m.from.r][7];n[m.from.r][7]=null}if(m.castle==='q'){n[m.from.r][3]=n[m.from.r][0];n[m.from.r][0]=null}return n}function legal(b,r,c,color,rights,ep){return pseudo(b,r,c,color,rights,ep).filter(m=>!check(apply(b,m),color))}function moves(b,color,rights,ep){const a=[];for(let r=0;r<8;r++)for(let c=0;c<8;c++)if(b[r][c]?.color===color)a.push(...legal(b,r,c,color,rights,ep));return a}function snapshot(){return{board:clone(board),turn,castle:JSON.parse(JSON.stringify(castle)),enPassant:enPassant?{...enPassant}:null,halfmove,captured:{w:[...captured.w],b:[...captured.b]}}}function restore(s){board=clone(s.board);turn=s.turn;castle=JSON.parse(JSON.stringify(s.castle));enPassant=s.enPassant?{...s.enPassant}:null;halfmove=s.halfmove;captured={w:[...s.captured.w],b:[...s.captured.b]};selected=null;legalSelected=[]}function execute(m,promo='q',save=true){if(gameOver)return;audio();const before=snapshot(),moving=board[m.from.r][m.from.c];let cap=board[m.to.r][m.to.c];if(m.enPassant){const d=moving.color===W?1:-1;cap=board[m.to.r+d][m.to.c]}board=apply(board,m,promo);if(cap){captured[moving.color].push(cap);sound('capture')}else sound('move');if(moving.type==='k')castle[moving.color]={k:false,q:false};if(moving.type==='r'){if(moving.color===W&&m.from.r===7){if(m.from.c===0)castle.w.q=false;if(m.from.c===7)castle.w.k=false}else if(moving.color===B&&m.from.r===0){if(m.from.c===0)castle.b.q=false;if(m.from.c===7)castle.b.k=false}}if(cap?.type==='r'){if(m.to.r===7&&m.to.c===0)castle.w.q=false;if(m.to.r===7&&m.to.c===7)castle.w.k=false;if(m.to.r===0&&m.to.c===0)castle.b.q=false;if(m.to.r===0&&m.to.c===7)castle.b.k=false}enPassant=null;if(moving.type==='p'&&Math.abs(m.to.r-m.from.r)===2)enPassant={r:(m.to.r+m.from.r)/2,c:m.from.c};halfmove=(moving.type==='p'||cap)?0:halfmove+1;if(save)history.push(before);turn=opp(turn);selected=null;legalSelected=[];render();state();if(!gameOver&&mode!=='pvp'&&turn===B)ai()}function select(r,c){if(gameOver||thinking||(mode!=='pvp'&&turn===B))return;const p=board[r][c];if(selected){const m=legalSelected.find(x=>x.to.r===r&&x.to.c===c);if(m){const q=board[m.from.r][m.from.c];if(q.type==='p'&&(m.to.r===0||m.to.r===7)){pendingPromotion=m;promotionEl.classList.add('show');return}execute(m);return}if(p?.color===turn){selected={r,c};legalSelected=legal(board,r,c,turn,castle,enPassant);render();return}selected=null;legalSelected=[];render();return}if(p?.color===turn){selected={r,c};legalSelected=legal(board,r,c,turn,castle,enPassant);render()}}function state(){const ms=moves(board,turn,castle,enPassant),ck=check(board,turn);if(!ms.length){gameOver=true;if(ck){const win=opp(turn)===W?'White':'Black';speak(mode==='pvp'?'Skak mat! '+win+' menang!':win==='White'?'Ughh... kamu menang. Hebat juga ya.':'Yeyyy! Aqua Ai menang!');showResult('👑','Checkmate!',win+' menang!')}else{showResult('🤝','Stalemate','Permainan berakhir remis.');speak('Heeeh... permainannya seri nih.')}return}if(halfmove>=100){gameOver=true;showResult('🤝','Draw','50-move rule.');return}statusEl.textContent=ck?'⚠️ CHECK!':turn===W?'White turn':'Black turn';messageEl.textContent=ck?'⚠️ Raja sedang dalam bahaya!':turn===W?'Giliran kamu ♟️':mode==='pvp'?'Giliran Black ♟️':'Aqua Ai sedang berpikir... 🧠';turnText.textContent=turn===W?'White':'Black'}function evaluate(b){let s=0;for(let r=0;r<8;r++)for(let c=0;c<8;c++){const p=b[r][c];if(!p)continue;let v=VALUE[p.type];const d=Math.abs(3.5-r)+Math.abs(3.5-c);if(p.type==='p')v+=(p.color===W?6-r:r-1)*8;if(p.type==='n'||p.type==='b')v+=Math.max(0,20-d*5);if(p.type==='q')v+=Math.max(0,12-d*2);s+=p.color===W?v:-v}return s}function order(b,m){let v=0;if(m.capture){const x=b[m.to.r][m.to.c];v+=(VALUE[x?.type||'p']*10)-(VALUE[b[m.from.r][m.from.c].type])}if(m.castle)v+=40;return v}function minimax(b,color,d,a,z,rights,ep){const ms=moves(b,color,rights,ep);if(!d)return evaluate(b);if(!ms.length)return check(b,color)?(color===W?-999999:999999):0;const max=color===W;let best=max?-Infinity:Infinity;for(const m of ms){const n=apply(b,m);const val=minimax(n,opp(color),d-1,a,z,rights,ep);best=max?Math.max(best,val):Math.min(best,val);if(max)a=Math.max(a,val);else z=Math.min(z,val);if(z<=a)break}return best}function ai(){thinking=true;render();setTimeout(()=>{const ms=moves(board,B,castle,enPassant);if(!ms.length){thinking=false;state();return}let best=ms[0];if(mode==='easy'){best=ms[Math.floor(Math.random()*Math.min(6,ms.length))]}else{const d=mode==='medium'?2:mode==='hard'?3:3;let bs=Infinity;for(const m of ms){const v=minimax(apply(board,m),W,d-1,-Infinity,Infinity,castle,enPassant);if(v<bs){bs=v;best=m}}}thinking=false;execute(best)},mode==='master'?180:90)}function render(){boardEl.innerHTML='';for(let dr=0;dr<8;dr++)for(let dc=0;dc<8;dc++){const r=flipped?7-dr:dr,c=flipped?7-dc:dc,e=document.createElement('div');e.className='square '+((r+c)%2===0?'light':'dark');if(selected?.r===r&&selected?.c===c)e.classList.add('selected');if(board[r][c]?.type==='k'&&board[r][c]?.color===turn&&check(board,turn))e.classList.add('check');const mm=legalSelected.find(x=>x.to.r===r&&x.to.c===c);if(mm){const q=document.createElement('div');q.className=board[r][c]||mm.enPassant?'captureRing':'moveDot';e.appendChild(q)}if(board[r][c]){const q=document.createElement('div');q.className='piece '+board[r][c].color;q.textContent=PIECES[board[r][c].color][board[r][c].type];e.appendChild(q)}if(dc===7){const q=document.createElement('span');q.className='coord file';q.textContent=FILES[c];e.appendChild(q)}if(dr===0){const q=document.createElement('span');q.className='coord rank';q.textContent=8-r;e.appendChild(q)}e.addEventListener('pointerdown',x=>{x.preventDefault();select(r,c)});boardEl.appendChild(e)}turnText.textContent=turn===W?'White':'Black';moveText.textContent=history.length;modeText.textContent=mode==='pvp'?'2 Player':mode[0].toUpperCase()+mode.slice(1);capturedEl.textContent='⚪ '+captured.w.map(p=>PIECES[p.color][p.type]).join(' ')+'    ⚫ '+captured.b.map(p=>PIECES[p.color][p.type]).join(' ');if(!gameOver)statusEl.textContent=thinking?'🧠 Thinking...':turn===W?'White turn':'Black turn'}function reset(){board=initial();turn=W;selected=null;legalSelected=[];history=[];gameOver=false;thinking=false;pendingPromotion=null;castle={w:{k:true,q:true},b:{k:true,q:true}};enPassant=null;halfmove=0;captured={w:[],b:[]};overlay.classList.remove('show');promotionEl.classList.remove('show');messageEl.textContent=mode==='pvp'?'White mulai dulu ♙':'White mulai dulu. Ayo kalahkan Aqua Ai 😏';render()}function showResult(i,t,x){resultIcon.textContent=i;resultTitle.textContent=t;resultText.textContent=x;setTimeout(()=>overlay.classList.add('show'),150)}document.getElementById('newGame').onclick=reset;document.getElementById('flip').onclick=()=>{flipped=!flipped;render()};document.getElementById('undo').onclick=()=>{if(!history.length||thinking)return;restore(history.pop());gameOver=false;overlay.classList.remove('show');render();state()};document.getElementById('resign').onclick=()=>{if(gameOver)return;gameOver=true;speak('Huuu, cemen! Masa nyerah sih!');showResult('🏳️','Resign',turn===W?'White menyerah. Black menang.':'Black menyerah. White menang.')};modeEl.onchange=()=>{mode=modeEl.value;reset()};document.querySelectorAll('.modeBtn[data-mode]').forEach(b=>b.onclick=()=>{mode=b.dataset.mode;modeEl.value=mode;reset()});document.getElementById('playAgain').onclick=reset;document.querySelectorAll('.promo').forEach(b=>b.onclick=()=>{if(!pendingPromotion)return;const m=pendingPromotion;pendingPromotion=null;promotionEl.classList.remove('show');execute(m,b.dataset.piece)});document.onkeydown=e=>{if(e.key==='Escape'){selected=null;legalSelected=[];render()}if(e.key.toLowerCase()==='r')reset();if(e.key.toLowerCase()==='u')document.getElementById('undo').click()};reset();
</script>
</body></html>`
const responseId = `chess-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

    const data = Buffer.from(JSON.stringify({
      response_id: responseId,
      sections: [{
        view_model: {
          primitive: {
            __typename: 'GenAIaeacdsnwHtmlPrimitive',
            payload: html,
            trusted_sources: []
          },
          __typename: 'GenAISingleLayoutViewModel'
        }
      }]
    })).toString('base64');

    await satanic.relayMessage(
      m.chat,
      {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2,
          botMetadata: {
            messageDisclaimerText: '',
            botResponseId: responseId
          }
        },
        botForwardedMessage: {
          message: {
            richResponseMessage: {
              messageType: 1,
              submessages: [{
                messageType: 2,
                messageText: '♟️ AQUA Ai Chess'
              }],
              unifiedResponse: { data },
              contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedAiBotMessageInfo: {
                  botJid: '867051314767696@bot'
                },
                forwardOrigin: 4
              }
            }
          }
        }
      },
      { messageId: responseId }
    );

  } catch (error) {
    console.error('[CHESS ERROR]', error);
    await satanic.sendMessage(m.chat, {
      text: '❌ Gagal membuka game Catur.\n\nError: ' + error.message
    }, { quoted: m });
  }
}
break;
case 'slot':
case 'slots':
case 'gameslot': {
    try {
        // Inisialisasi user dengan saldo 1000
        if (!global.db.users) global.db.users = {};
        if (!global.db.users[m.sender]) {
            global.db.users[m.sender] = {
                balance: 1000,
                game: {}
            };
        }
        
        const user = global.db.users[m.sender];
        user.game = user.game || {};
        const saldoAwal = Number(user.balance || 1000);

        const html = `
<style>
*{
  box-sizing:border-box;
  -webkit-user-select:none;
  user-select:none;
  -webkit-tap-highlight-color:transparent;
}

body{
  margin:0;
  padding:0;
  background:transparent;
  font-family:Arial,sans-serif;
  color:#eee;
  touch-action:manipulation;
}
</style>

<body>

<div style="
  width:100%;
  max-width:290px;
  margin:auto;
  padding:8px;
">

  <div style="
    background:
      linear-gradient(
        145deg,
        #1b1b1f,
        #0e0e11
      );
    border:2px solid #ffd700;
    border-radius:16px;
    padding:16px;
    text-align:center;
    box-shadow:
      0 5px 20px rgba(0,0,0,.55),
      inset 0 0 20px rgba(255,215,0,.04);
  ">

    <div style="
      font-size:17px;
      font-weight:bold;
      color:#ffd700;
      letter-spacing:1px;
      margin-bottom:14px;
    ">
      🎰 NIXEL SLOTS 🎰
    </div>

    <div style="
      display:flex;
      justify-content:space-between;
      align-items:center;
      background:#141418;
      padding:10px;
      border-radius:9px;
      margin-bottom:12px;
      font-size:11px;
      color:#999;
    ">

      <div style="text-align:left">
        💰 SALDO
        <div
          id="bal"
          style="
            color:#ffd700;
            font-weight:bold;
            font-size:18px;
            margin-top:3px;
          "
        >
          ${saldoAwal}
        </div>
      </div>

      <div style="text-align:right">
        🎰 TARUHAN
        <div style="
          color:#fff;
          font-weight:bold;
          font-size:16px;
          margin-top:3px;
        ">
          100
        </div>
      </div>

    </div>

    <div
      id="msg"
      style="
        height:24px;
        font-size:13px;
        font-weight:bold;
        color:#00ff66;
        margin-bottom:10px;
      "
    >
      🎯 Semoga Beruntung!
    </div>

    <div style="
      background:#030303;
      padding:11px;
      border-radius:11px;
      border:3px inset #3b3b3b;
      margin-bottom:14px;
    ">

      <div style="
        display:flex;
        justify-content:space-between;
        gap:7px;
      ">

        <div
          id="r1"
          style="
            width:32%;
            background:
              linear-gradient(
                #fff,
                #e7e7e7
              );
            border-radius:8px;
            font-size:40px;
            line-height:60px;
            height:60px;
            color:#000;
            box-shadow:
              inset 0 0 7px rgba(0,0,0,.45);
          "
        >
          🍒
        </div>

        <div
          id="r2"
          style="
            width:32%;
            background:
              linear-gradient(
                #fff,
                #e7e7e7
              );
            border-radius:8px;
            font-size:40px;
            line-height:60px;
            height:60px;
            color:#000;
            box-shadow:
              inset 0 0 7px rgba(0,0,0,.45);
          "
        >
          🍋
        </div>

        <div
          id="r3"
          style="
            width:32%;
            background:
              linear-gradient(
                #fff,
                #e7e7e7
              );
            border-radius:8px;
            font-size:40px;
            line-height:60px;
            height:60px;
            color:#000;
            box-shadow:
              inset 0 0 7px rgba(0,0,0,.45);
          "
        >
          🀄
        </div>

      </div>
    </div>

    <button
      id="spinBtn"
      style="
        width:100%;
        border:none;
        border-radius:9px;
        padding:14px;
        background:
          linear-gradient(
            180deg,
            #ffe75e,
            #ffd700,
            #c99c00
          );
        color:#111;
        font-size:16px;
        font-weight:bold;
        letter-spacing:.5px;
        cursor:pointer;
        box-shadow:
          0 3px 9px rgba(255,215,0,.25);
        touch-action:manipulation;
      "
    >
      🎰 SPIN (100)
    </button>

    <div style="
      height:1px;
      background:#2e2e33;
      margin:14px 0 11px;
    "></div>

    <div style="
      display:grid;
      grid-template-columns:repeat(3,1fr);
      gap:6px;
      font-size:10px;
      color:#777;
    ">

      <div>
        🎮 PLAY
        <div
          id="play"
          style="color:#fff;font-size:14px;margin-top:3px"
        >
          0
        </div>
      </div>

      <div>
        🏆 WIN
        <div
          id="win"
          style="color:#00ff66;font-size:14px;margin-top:3px"
        >
          0
        </div>
      </div>

      <div>
        💀 LOSE
        <div
          id="lose"
          style="color:#ff5555;font-size:14px;margin-top:3px"
        >
          0
        </div>
      </div>

      <div>
        ⭐ JACKPOT
        <div
          id="jackpot"
          style="color:#ffd700;font-size:14px;margin-top:3px"
        >
          0
        </div>
      </div>

      <div>
        💰 TOTAL WIN
        <div
          id="totalWin"
          style="color:#4CAF50;font-size:14px;margin-top:3px"
        >
          0
        </div>
      </div>

      <div>
        🔥 BEST WIN
        <div
          id="bestWin"
          style="color:#ff6b35;font-size:14px;margin-top:3px"
        >
          0
        </div>
      </div>

    </div>

  </div>
</div>

<script>
const symbols = ['🍒','🍋','🔔','🀄','7️⃣'];
let balance = ${saldoAwal};
const bet = 100;
let play = 0;
let win = 0;
let lose = 0;
let jackpot = 0;
let totalWin = 0;
let bestWin = 0;

const r1 = document.getElementById('r1');
const r2 = document.getElementById('r2');
const r3 = document.getElementById('r3');
const balEl = document.getElementById('bal');
const msgEl = document.getElementById('msg');
const btn = document.getElementById('spinBtn');
const playEl = document.getElementById('play');
const winEl = document.getElementById('win');
const loseEl = document.getElementById('lose');
const jackpotEl = document.getElementById('jackpot');
const totalWinEl = document.getElementById('totalWin');
const bestWinEl = document.getElementById('bestWin');

function randomSymbol(){
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function updateStats(){
  playEl.innerText = play;
  winEl.innerText = win;
  loseEl.innerText = lose;
  jackpotEl.innerText = jackpot;
  totalWinEl.innerText = totalWin;
  bestWinEl.innerText = bestWin;
  balEl.innerText = balance;
}

// Update balance ke database
function updateBalanceToDB(newBalance) {
    balance = newBalance;
    balEl.innerText = balance;
    
    // Kirim update ke parent untuk simpan ke database
    if(window.parent) {
        window.parent.postMessage({
            type: 'updateBalance',
            balance: balance,
            stats: {
                play, win, lose, jackpot, totalWin, bestWin
            }
        }, '*');
    }
}

btn.addEventListener('click', function(){
    if(balance < bet){
        msgEl.innerText = '❌ SALDO TIDAK CUKUP!';
        msgEl.style.color = '#ff5555';
        btn.disabled = true;
        btn.style.opacity = '.55';
        setTimeout(() => {
            btn.disabled = false;
            btn.style.opacity = '1';
        }, 2000);
        return;
    }

    balance -= bet;
    balEl.innerText = balance;
    btn.disabled = true;
    btn.style.opacity = '.55';
    btn.innerText = '🔄 MEMUTAR...';
    msgEl.innerText = '🎰 Memutar reel...';
    msgEl.style.color = '#aaa';
    play++;
    updateStats();

    let ticks = 0;
    const spin = setInterval(function(){
        r1.innerText = randomSymbol();
        r2.innerText = randomSymbol();
        r3.innerText = randomSymbol();
        ticks++;

        if(ticks >= 22){
            clearInterval(spin);
            const result = [r1.innerText, r2.innerText, r3.innerText];
            let reward = 0;
            let message = '';

            if(result[0] === result[1] && result[1] === result[2]){
                if(result[0] === '7️⃣') {
                    reward = 1000;
                    jackpot++;
                    message = '🎉 JACKPOT MAX! +' + reward;
                    msgEl.style.color = '#ff00ff';
                } else if(result[0] === '🀄') {
                    reward = 500;
                    jackpot++;
                    message = '🀄 JACKPOT! +' + reward;
                    msgEl.style.color = '#00ccff';
                } else {
                    reward = 300;
                    jackpot++;
                    message = '⭐ JACKPOT! +' + reward;
                    msgEl.style.color = '#ffd700';
                }
                win++;
                balance += reward;
                totalWin += reward;
                if(reward > bestWin) bestWin = reward;
                
            } else if(result[0] === result[1] || result[1] === result[2] || result[0] === result[2]){
                reward = 150;
                win++;
                balance += reward;
                totalWin += reward;
                if(reward > bestWin) bestWin = reward;
                message = '✨ MENANG! +' + reward;
                msgEl.style.color = '#00ff66';
            } else {
                lose++;
                message = '💀 ZONK! -' + bet;
                msgEl.style.color = '#ff5555';
            }

            msgEl.innerText = message;
            updateStats();
            updateBalanceToDB(balance);
            
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.innerText = '🎰 SPIN (100)';
        }
    }, 60);
});
</script>

</body>
`;

        const responseId = `slot-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

        const data = Buffer.from(
            JSON.stringify({
                response_id: responseId,
                sections: [
                    {
                        view_model: {
                            primitive: {
                                __typename: "GenAIaeacdsnwHtmlPrimitive",
                                payload: html,
                                trusted_sources: []
                            },
                            __typename: "GenAISingleLayoutViewModel"
                        }
                    }
                ]
            })
        ).toString("base64");

        await satanic.relayMessage(
            m.chat,
            {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                    botMetadata: {
                        messageDisclaimerText: "",
                        botResponseId: responseId
                    }
                },
                botForwardedMessage: {
                    message: {
                        richResponseMessage: {
                            messageType: 1,
                            submessages: [
                                {
                                    messageType: 2,
                                    messageText: "🎰 Slot Machine"
                                }
                            ],
                            unifiedResponse: { data },
                            contextInfo: {
                                forwardingScore: 1,
                                isForwarded: true,
                                forwardedAiBotMessageInfo: {
                                    botJid: "867051314767696@bot"
                                },
                                forwardOrigin: 4
                            }
                        }
                    }
                }
            },
            { messageId: responseId }
        );

    } catch (error) {
        console.error('[SLOT ERROR]', error);
        await satanic.sendMessage(m.chat, {
            text: '❌ Gagal membuka Slot Machine.\n\n' +
                  `Error: ${error.message}`
        }, { quoted: m });
    }
}
break;
case 'ular':
case 'snake':
case 'aquasnake':
case 'ularrimba': {
  try {
    const html = String.raw`<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"><meta name="theme-color" content="#111314"><title>aqua Ai Ular Rimba</title><style>:root{--bg:#111314;--wood:#d4b48f;--text:#ece7de;--dim:#95a1a8;--panel:#232d32;--panel2:#1a2225;--line:#3b4b54;--green:#8fb17a;--green2:#5c8650;--red:#e56a62;--gold:#d8b77f}*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}html,body{min-height:100%;background:radial-gradient(900px 500px at 50% -10%,#2e3a3e 0%,var(--bg) 68%);color:var(--text);font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif}body{display:flex;justify-content:center;align-items:center;padding:max(10px,env(safe-area-inset-top)) max(10px,env(safe-area-inset-right)) max(12px,env(safe-area-inset-bottom)) max(10px,env(safe-area-inset-left));overflow-x:hidden;touch-action:manipulation}.app{width:min(100%,540px);margin:auto}.console{width:100%;background:linear-gradient(180deg,#303b42,#1d2529);border:1px solid #42525b;border-radius:26px;padding:12px;box-shadow:0 30px 80px #000a,inset 0 1px 0 #ffffff14}.head{display:flex;align-items:center;justify-content:space-between;gap:10px;background:#181e21;border:1px solid #344047;border-radius:15px;padding:9px 10px;margin-bottom:9px}.brand{display:flex;align-items:center;gap:9px;min-width:0}.logo{width:38px;height:38px;flex:none;display:grid;place-items:center;border-radius:10px;background:radial-gradient(120% 120% at 30% 20%,#e9c9a0,#8d6e4a);color:#241a0b;font-size:21px;font-weight:950;box-shadow:0 4px 0 #5a3f28}.brandText{min-width:0}.title{font-family:Georgia,serif;font-size:16px;font-weight:900;letter-spacing:.2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sub{margin-top:2px;color:var(--dim);font-size:8px;letter-spacing:.35px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.chips{display:grid;grid-template-columns:repeat(2,minmax(54px,1fr));gap:6px;flex:none}.chip{min-width:54px;padding:5px 7px;text-align:center;background:#1c2225;border:1px solid #35444c;border-radius:9px}.chip b{display:block;color:var(--dim);font-size:6.5px;letter-spacing:.13em}.chip span{display:block;margin-top:2px;color:var(--wood);font-size:13px;font-weight:900;line-height:1}.arena{position:relative;width:100%;padding:7px;border:1px solid #2f3d44;border-radius:17px;background:#11171a;box-shadow:inset 0 12px 28px #000d;overflow:hidden}.canvasWrap{position:relative;width:100%;aspect-ratio:1/1;border-radius:11px;overflow:hidden;background:#1a2225}.canvasWrap canvas{display:block;width:100%;height:100%;background:#1a2225;image-rendering:auto;touch-action:none;user-select:none}.hint{position:absolute;left:9px;right:9px;top:9px;display:flex;justify-content:space-between;gap:8px;pointer-events:none}.badge{padding:5px 7px;border-radius:999px;background:#10181bd9;border:1px solid #ffffff12;color:#dce6e1;font-size:6.7px;font-weight:900;letter-spacing:.04em}.badge.gold{color:var(--wood)}.overlay{position:absolute;inset:7px;border-radius:11px;display:grid;place-items:center;background:#0a0e0fcc;backdrop-filter:blur(10px);opacity:0;pointer-events:none;transition:opacity .2s ease}.overlay.show{opacity:1;pointer-events:auto}.modal{width:min(84%,320px);padding:20px 16px;text-align:center;border:1px solid #4d5e68;border-radius:16px;background:linear-gradient(180deg,#35444d,#242d32);box-shadow:0 18px 40px #0008}.modalIcon{font-size:30px;line-height:1}.modal h2{margin-top:7px;font-family:Georgia,serif;font-size:21px}.modal p{margin-top:5px;color:var(--dim);font-size:9px;line-height:1.45}.modal .miniRow{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:10px}.mini{padding:7px;border:1px solid #41515a;border-radius:8px;background:#1b2428}.mini b{display:block;color:var(--wood);font-size:13px}.mini span{display:block;margin-top:2px;color:var(--dim);font-size:6.4px;letter-spacing:.04em;text-transform:uppercase}.ctrl{margin-top:9px;padding:10px;border:1px solid #3b4b54;border-radius:16px;background:linear-gradient(180deg,#28343a,#1f282d)}.ctrlTop{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px}.ctrlTop b{font-size:7px;letter-spacing:.13em;color:var(--dim)}.ctrlTop b:last-child{color:var(--wood)}.actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin-bottom:9px}.btn{min-height:41px;border:1px solid #53636a;border-radius:10px;background:linear-gradient(180deg,#3e4e56,#2b363c);color:var(--text);font:900 8px system-ui;letter-spacing:.04em;box-shadow:0 4px 0 #13191d,inset 0 1px 0 #ffffff1a;touch-action:manipulation;user-select:none}.btn.primary{background:linear-gradient(180deg,#9fc08b,#5c8650);border-color:#89aa78;color:#0f1a0e}.btn.active{transform:translateY(3px);box-shadow:0 1px 0 #13191d}.btn:focus-visible{outline:2px solid var(--wood);outline-offset:2px}.dpadWrap{display:flex;justify-content:center}.dpad{position:relative;width:min(55vw,230px);height:min(55vw,230px);min-width:182px;min-height:182px;max-width:230px;max-height:230px;border-radius:50%;border:1px solid #3a4a53;background:radial-gradient(100% 100% at 50% 45%,#202a2f,#151c1f);box-shadow:inset 0 8px 20px #000b;touch-action:none}.pad{position:absolute;width:29%;height:29%;min-width:52px;min-height:52px;max-width:68px;max-height:68px;border:1px solid #5a6d79;border-radius:17px;display:grid;place-items:center;background:linear-gradient(180deg,#404f58,#28333a);color:#e3ebee;font-size:20px;font-weight:900;box-shadow:0 7px 0 #131a1e,0 12px 20px #0006,inset 0 1px 0 #ffffff1f;touch-action:manipulation;user-select:none;transition:transform .05s ease,background .05s ease}.pad.up{top:4.3%;left:50%;transform:translateX(-50%)}.pad.down{bottom:4.3%;left:50%;transform:translateX(-50%)}.pad.left{left:4.3%;top:50%;transform:translateY(-50%)}.pad.right{right:4.3%;top:50%;transform:translateY(-50%)}.pad.active{background:linear-gradient(180deg,#4a5d69,#323f47)}.pad.up.active,.pad.down.active{transform:translateX(-50%) translateY(4px) scale(.97)}.pad.left.active,.pad.right.active{transform:translateY(-50%) translateY(4px) scale(.97)}.centerDot{position:absolute;left:50%;top:50%;width:22%;height:22%;min-width:42px;min-height:42px;max-width:52px;max-height:52px;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(100% at 30% 30%,#d4b48f,#7a5a36);border:1px solid #a68660;box-shadow:0 5px 0 #4a3a27,inset 0 1px 0 #ffffff80}.footer{display:flex;justify-content:space-between;gap:8px;margin-top:7px;padding:0 3px;color:#6f7e84;font-size:6.5px}.footer span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.footer kbd{padding:2px 4px;border:1px solid #37464d;border-radius:4px;background:#131a1d;color:#97a5aa;font:700 6px system-ui}@media(max-width:380px){body{padding:7px}.console{padding:9px;border-radius:22px}.head{padding:8px;margin-bottom:7px}.logo{width:34px;height:34px;font-size:18px}.title{font-size:14px}.sub{font-size:7px}.chip{min-width:48px}.chip b{font-size:5.8px}.chip span{font-size:11px}.ctrl{padding:8px}.actions{gap:5px}.btn{min-height:38px;font-size:7px}.dpad{width:205px;height:205px}}@media(min-width:700px){body{padding-top:20px;padding-bottom:20px}.console{padding:14px;border-radius:28px}}</style></head><body><div class="app"><div class="console"><div class="head"><div class="brand"><div class="logo">S</div><div class="brandText"><div class="title">ULAR RIMBA</div><div class="sub">aqua AI MINI GAME</div></div></div><div class="chips"><div class="chip"><b>SKOR</b><span id="score">0</span></div><div class="chip"><b>LEVEL</b><span id="level">1</span></div></div></div><div class="arena"><div class="canvasWrap"><canvas id="game" width="720" height="720"></canvas><div class="hint"><span class="badge" id="stateBadge">SIAP</span><span class="badge gold" id="bestBadge">BEST 0</span></div><div class="overlay" id="overlay"><div class="modal"><div class="modalIcon" id="modalIcon">🐍</div><h2 id="modalTitle">Ular Rimba</h2><p id="modalText">Tekan MULAI untuk berburu.</p><div class="miniRow"><div class="mini"><b id="modalScore">0</b><span>Skor</span></div><div class="mini"><b id="modalBest">0</b><span>Best</span></div></div></div></div></div></div><div class="ctrl"><div class="ctrlTop"><b>◈ KONTROL</b><b>© AWANG OFFICIAL</b></div><div class="actions"><button class="btn primary" id="startBtn" type="button">▶ MULAI</button><button class="btn" id="resetBtn" type="button">↻ ULANG</button></div><div class="dpadWrap"><div class="dpad" id="dpad"><button class="pad up" data-dir="up" type="button" aria-label="Atas">▲</button><button class="pad down" data-dir="down" type="button" aria-label="Bawah">▼</button><button class="pad left" data-dir="left" type="button" aria-label="Kiri">◀</button><button class="pad right" data-dir="right" type="button" aria-label="Kanan">▶</button><div class="centerDot"></div></div></div><div class="footer"><span>Geser layar atau gunakan tombol arah</span><span><kbd>WASD</kbd> <kbd>←↑↓→</kbd> <kbd>SPACE</kbd></span></div></div></div></div><script>'use strict';(()=>{const canvas=document.getElementById('game'),ctx=canvas.getContext('2d',{alpha:false});const scoreEl=document.getElementById('score'),levelEl=document.getElementById('level'),stateBadge=document.getElementById('stateBadge'),bestBadge=document.getElementById('bestBadge');const overlay=document.getElementById('overlay'),modalIcon=document.getElementById('modalIcon'),modalTitle=document.getElementById('modalTitle'),modalText=document.getElementById('modalText'),modalScore=document.getElementById('modalScore'),modalBest=document.getElementById('modalBest');const startBtn=document.getElementById('startBtn'),resetBtn=document.getElementById('resetBtn');const GRID=20,CELL=canvas.width/GRID,BASE_SPEED=145,MIN_SPEED=78,LEVEL_SCORE=40;let snake=[],prevSnake=[],dir={x:1,y:0},nextDir={x:1,y:0},inputQueue=[],fruit=null,score=0,best=0,running=false,paused=false,gameOver=false,speed=BASE_SPEED,accumulator=0,lastTime=0,visualAngle=0,targetAngle=0,bodyAngles=[],particles=[],tongue=0,pulse=0,swipeStart=null,trail=[],visualHead={x:10,y:10},lastTrailPoint={x:10,y:10};const pattern=document.createElement('canvas');pattern.width=40;pattern.height=20;const pctx=pattern.getContext('2d');pctx.strokeStyle='rgba(0,0,0,.18)';pctx.lineWidth=.8;for(let x=0;x<40;x+=10){pctx.beginPath();pctx.moveTo(x,0);pctx.lineTo(x+5,10);pctx.lineTo(x+10,0);pctx.stroke();pctx.beginPath();pctx.moveTo(x,10);pctx.lineTo(x+5,20);pctx.lineTo(x+10,10);pctx.stroke()}const scaleTex=ctx.createPattern(pattern,'repeat');try{best=Number(localStorage.getItem('qiro_ai_snake_best')||0)||0}catch{}function cloneSnake(a){return a.map(s=>({x:s.x,y:s.y}))}function safeBestSave(){try{localStorage.setItem('qiro_ai_snake_best',String(best))}catch{}}function wrapDelta(d){if(d>GRID/2)return d-GRID;if(d<-GRID/2)return d+GRID;return d}function normalizeCoord(v){return((v%GRID)+GRID)%GRID}function spawnFruit(){let f,guard=0;do{f={x:Math.floor(Math.random()*GRID),y:Math.floor(Math.random()*GRID),type:Math.random()<.7?(Math.random()<.6?'apple':'banana'):'shroom'};guard++}while(snake.some(s=>s.x===f.x&&s.y===f.y)&&guard<500);return f}function updateUi(){scoreEl.textContent=score;levelEl.textContent=Math.floor(score/LEVEL_SCORE)+1;bestBadge.textContent='BEST '+best;stateBadge.textContent=gameOver?'K.O':paused?'JEDA':running?'BERBURU':'SIAP';startBtn.textContent=gameOver?'▶ MULAI':paused?'▶ LANJUT':running?'Ⅱ JEDA':'▶ MULAI';modalScore.textContent=score;modalBest.textContent=best}function show(title,text,icon='🐍'){modalIcon.textContent=icon;modalTitle.textContent=title;modalText.textContent=text;modalScore.textContent=score;modalBest.textContent=best;overlay.classList.add('show');updateUi()}function hide(){overlay.classList.remove('show')}function reset(){snake=[{x:10,y:10},{x:9,y:10},{x:8,y:10}];prevSnake=cloneSnake(snake);dir={x:1,y:0};nextDir={x:1,y:0};inputQueue=[];fruit=spawnFruit();score=0;speed=BASE_SPEED;accumulator=0;running=false;paused=false;gameOver=false;visualAngle=0;targetAngle=0;bodyAngles=[0,0,0];particles=[];tongue=0;visualHead={x:10,y:10};trail=[{x:10,y:10},{x:9.2,y:10},{x:8.4,y:10},{x:7.6,y:10}];lastTrailPoint={x:10,y:10};hide();updateUi();draw(0)}function start(){if(gameOver){reset()}if(running)return;paused=false;running=true;hide();lastTime=performance.now();accumulator=0;updateUi()}function togglePause(){if(gameOver){reset();start();return}if(!running){start();return}paused=!paused;if(!paused){lastTime=performance.now();accumulator=0;hide()}else show('Jeda','Tekan LANJUT untuk kembali berburu.','⏸️');updateUi()}function endGame(){if(gameOver)return;gameOver=true;running=false;paused=false;if(score>best){best=score;safeBestSave()}stateBadge.textContent='K.O';show('Ular Tumbang','Skor '+score+' • Best '+best+' • Tekan ULANG.','💥')}function setDirection(x,y){const last=inputQueue.length?inputQueue[inputQueue.length-1]:nextDir;if(last.x===-x&&last.y===-y)return;if(last.x===x&&last.y===y)return;if(inputQueue.length<4)inputQueue.push({x,y});targetAngle=Math.atan2(y,x);if(!running&&!gameOver)start()}function logicTick(){prevSnake=cloneSnake(snake);if(inputQueue.length){nextDir=inputQueue.shift()}dir=nextDir;targetAngle=Math.atan2(dir.y,dir.x);let h={x:snake[0].x+dir.x,y:snake[0].y+dir.y};if(h.x<0)h.x=GRID-1;if(h.x>=GRID)h.x=0;if(h.y<0)h.y=GRID-1;if(h.y>=GRID)h.y=0;const tailCanMove=h.x===snake[snake.length-1]?.x&&h.y===snake[snake.length-1]?.y;const bodyHit=snake.some((s,i)=>i<snake.length-1&&!tailCanMove&&s.x===h.x&&s.y===h.y)||snake.slice(0,-1).some(s=>s.x===h.x&&s.y===h.y);if(bodyHit){endGame();return}snake.unshift(h);bodyAngles.unshift(targetAngle);if(h.x===fruit.x&&h.y===fruit.y){const gain=fruit.type==='apple'?10:fruit.type==='banana'?20:50;score+=gain;tongue=10;burst(h.x*CELL+CELL/2,h.y*CELL+CELL/2,fruit.type);fruit=spawnFruit();speed=Math.max(MIN_SPEED,BASE_SPEED-Math.floor(score/50)*4);if(score>best){best=score;safeBestSave()}}else{snake.pop();bodyAngles.pop()}updateUi()}function burst(x,y,type){for(let i=0;i<14;i++){const a=Math.random()*Math.PI*2,v=1.4+Math.random()*3.2;particles.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-1.2,life:20+Math.random()*10,max:30,type})}}function unwrapTarget(prev,curr){let d=curr-prev;if(d>GRID/2)curr-=GRID;if(d<-GRID/2)curr+=GRID;return curr}function trailPointAt(distance){if(!trail.length)return{x:visualHead.x,y:visualHead.y};let remain=distance;for(let i=0;i<trail.length-1;i++){const a=trail[i],b=trail[i+1];const dx=wrapDelta(b.x-a.x),dy=wrapDelta(b.y-a.y);const len=Math.hypot(dx,dy);if(len<=0)continue;if(remain<=len){const q=remain/len;return{x:normalizeCoord(a.x+dx*q),y:normalizeCoord(a.y+dy*q)}}remain-=len}const z=trail[trail.length-1];return{x:normalizeCoord(z.x),y:normalizeCoord(z.y)}}function drawWrappedSegment(x,y,r,i,angle,alpha=1){const cx=x*CELL+CELL/2,cy=y*CELL+CELL/2,canvasSize=canvas.width,extent=r*1.45+2,wrapPx=GRID*CELL;for(let ox=-1;ox<=1;ox++){for(let oy=-1;oy<=1;oy++){const px=cx+ox*wrapPx,py=cy+oy*wrapPx;if(px+extent<0||px-extent>canvasSize||py+extent<0||py-extent>canvasSize)continue;snakeDraw(px,py,r,i,angle,alpha)}}}function angleBetween(a,b,fallback=0){const dx=wrapDelta(b.x-a.x),dy=wrapDelta(b.y-a.y);return Math.hypot(dx,dy)>.001?Math.atan2(dy,dx):fallback}function snakeDraw(x,y,r,i,angle,alpha=1){ctx.save();ctx.globalAlpha=alpha;ctx.translate(x,y);ctx.rotate(angle);ctx.fillStyle='rgba(0,0,0,.38)';ctx.beginPath();ctx.ellipse(3,7,r,r*.6,0,0,Math.PI*2);ctx.fill();const grad=ctx.createLinearGradient(-r,-r*.8,r,r*.8);if(i===0){grad.addColorStop(0,'#e2f0c8');grad.addColorStop(.35,'#8fb17a');grad.addColorStop(1,'#1e2f18')}else{const sh=Math.max(.62,1-i*.02);grad.addColorStop(0,'rgba('+Math.round(110*sh)+','+Math.round(150*sh)+','+Math.round(90*sh)+',1)');grad.addColorStop(.5,'rgba(65,95,52,1)');grad.addColorStop(1,'rgba(28,42,22,1)')}ctx.fillStyle=grad;ctx.beginPath();ctx.ellipse(0,0,r*1.22,r*.9,0,0,Math.PI*2);ctx.fill();if(scaleTex){ctx.fillStyle=scaleTex;ctx.globalAlpha=alpha*.32;ctx.beginPath();ctx.ellipse(0,0,r*1.15,r*.82,0,0,Math.PI*2);ctx.fill();ctx.globalAlpha=alpha}ctx.fillStyle='rgba(230,214,160,.2)';ctx.beginPath();for(let xx=-r*1.1;xx<r*1.1;xx+=4)ctx.rect(xx,r*.32+Math.sin(xx*.8+i)*1.2,2.5,2);ctx.fill();if(i&&i%3===0){ctx.fillStyle='rgba(12,22,10,.48)';ctx.beginPath();ctx.ellipse(0,0,6,4.5,0,0,Math.PI*2);ctx.fill()}if(i===0){ctx.fillStyle='#0e1710';ctx.beginPath();ctx.ellipse(r*.35,-r*.42,3.8,5.2,0,0,Math.PI*2);ctx.ellipse(r*.35,r*.42,3.8,5.2,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#ffeb3b';ctx.beginPath();ctx.arc(r*.58,-r*.42,1.4,0,Math.PI*2);ctx.arc(r*.58,r*.42,1.4,0,Math.PI*2);ctx.fill();ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(r*.35,-r*.42,1.1,2.4,0,0,Math.PI*2);ctx.ellipse(r*.35,r*.42,1.1,2.4,0,0,Math.PI*2);ctx.fill();if(tongue>0){ctx.strokeStyle='#ff3434';ctx.lineWidth=2.2;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(r*1.18,0);ctx.lineTo(r*1.18+11,-3);ctx.moveTo(r*1.18,0);ctx.lineTo(r*1.18+11,3);ctx.stroke()}}ctx.fillStyle='rgba(255,255,255,.17)';ctx.beginPath();ctx.ellipse(-r*.28,-r*.35,r*.55,r*.28,0,0,Math.PI*2);ctx.fill();ctx.restore()}function drawFruit(){const fx=fruit.x*CELL+CELL/2,fy=fruit.y*CELL+CELL/2,p=.8+Math.sin(performance.now()/250)*.08;ctx.fillStyle='rgba(0,0,0,.45)';ctx.beginPath();ctx.ellipse(fx+3,fy+10,10,5,0,0,Math.PI*2);ctx.fill();const fg=ctx.createRadialGradient(fx-4,fy-6,2,fx,fy,14);if(fruit.type==='apple'){fg.addColorStop(0,'#ffb2b2');fg.addColorStop(1,'#8f1d1d')}else if(fruit.type==='banana'){fg.addColorStop(0,'#fff2a0');fg.addColorStop(1,'#b78a00')}else{fg.addColorStop(0,'#c5e8b0');fg.addColorStop(1,'#314d26')}ctx.save();ctx.translate(fx,fy);ctx.scale(p,p);ctx.fillStyle=fg;ctx.beginPath();if(fruit.type==='banana'){ctx.ellipse(0,0,14,9,-.32,0,Math.PI*2);ctx.fill()}else{ctx.arc(0,0,12,0,Math.PI*2);ctx.fill()}if(fruit.type==='apple'){ctx.fillStyle='#3c2918';ctx.fillRect(-1,-14,3,5)}if(fruit.type==='shroom'){ctx.fillStyle='#5b7440';ctx.fillRect(-1,-14,2,6)}ctx.restore()}function draw(t){ctx.fillStyle='#1b2225';ctx.fillRect(0,0,canvas.width,canvas.height);for(let y=0;y<GRID;y++)for(let x=0;x<GRID;x++){ctx.fillStyle=(x+y)%2?'#1e272b':'#1b2225';ctx.fillRect(x*CELL,y*CELL,CELL,CELL)}drawFruit();const headPrev=prevSnake[0]||snake[0];const headCurr=snake[0];let tx=unwrapTarget(headPrev.x,headCurr.x),ty=unwrapTarget(headPrev.y,headCurr.y);visualHead={x:normalizeCoord(headPrev.x+(tx-headPrev.x)*t),y:normalizeCoord(headPrev.y+(ty-headPrev.y)*t)};if(Math.hypot(wrapDelta(visualHead.x-lastTrailPoint.x),wrapDelta(visualHead.y-lastTrailPoint.y))>=.035){trail.unshift({x:visualHead.x,y:visualHead.y});lastTrailPoint={x:visualHead.x,y:visualHead.y}}const maxTrail=Math.max(24,Math.ceil(snake.length*CELL*.92/.6)+12);if(trail.length>maxTrail)trail.length=maxTrail;for(let i=snake.length-1;i>=0;i--){const p=trailPointAt(i*.92);const q=trailPointAt(Math.max(0,i*.92-.55));const ang=i===0?visualAngle:angleBetween(p,q,bodyAngles[i]??visualAngle);drawWrappedSegment(p.x,p.y,CELL*.46,i,ang,1)}if(isFinite(t))for(const p of particles){p.x+=p.vx;p.y+=p.vy;p.vy+=.14;p.life-=1;ctx.globalAlpha=Math.max(0,p.life/p.max);ctx.fillStyle=p.type==='apple'?'#ff6b6b':p.type==='banana'?'#ffd166':'#8fb17a';ctx.beginPath();ctx.arc(p.x,p.y,3.6,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1}particles=particles.filter(p=>p.life>0);if(tongue>0&&running)tongue--}function frame(now){requestAnimationFrame(frame);if(!lastTime)lastTime=now;const dt=Math.min(40,Math.max(0,now-lastTime));lastTime=now;pulse=now;if(running&&!paused&&!gameOver){accumulator+=dt;while(accumulator>=speed){logicTick();accumulator-=speed;if(gameOver)break}let d=targetAngle-visualAngle;while(d>Math.PI)d-=Math.PI*2;while(d<-Math.PI)d+=Math.PI*2;const turnEase=1-Math.exp(-dt*.032);visualAngle+=d*turnEase;for(let i=1;i<bodyAngles.length;i++){let q=bodyAngles[i-1]-bodyAngles[i];while(q>Math.PI)q-=Math.PI*2;while(q<-Math.PI)q+=Math.PI*2;bodyAngles[i]+=q*(1-Math.exp(-dt*.028))}}draw(running&&!paused&&!gameOver?Math.min(1,accumulator/speed):0)}
function bind(){startBtn.addEventListener('pointerdown',e=>{e.preventDefault();togglePause()},{passive:false});resetBtn.addEventListener('pointerdown',e=>{e.preventDefault();reset();show('Siap','Tekan MULAI untuk memulai.','🐍')},{passive:false});document.querySelectorAll('.pad').forEach(btn=>{const press=e=>{e.preventDefault();btn.classList.add('active');const d=btn.dataset.dir;if(d==='up')setDirection(0,-1);else if(d==='down')setDirection(0,1);else if(d==='left')setDirection(-1,0);else setDirection(1,0)};const release=()=>btn.classList.remove('active');btn.addEventListener('pointerdown',press,{passive:false});btn.addEventListener('pointerup',release);btn.addEventListener('pointercancel',release);btn.addEventListener('pointerleave',release)});document.addEventListener('keydown',e=>{const k=e.key.toLowerCase();if(k===' '){e.preventDefault();togglePause();return}if(k==='r'){e.preventDefault();reset();show('Siap','Tekan MULAI untuk memulai.','🐍');return}if(k==='w'||k==='arrowup')setDirection(0,-1);else if(k==='s'||k==='arrowdown')setDirection(0,1);else if(k==='a'||k==='arrowleft')setDirection(-1,0);else if(k==='d'||k==='arrowright')setDirection(1,0)},{passive:false});canvas.addEventListener('pointerdown',e=>{swipeStart={x:e.clientX,y:e.clientY}},{passive:true});canvas.addEventListener('pointerup',e=>{if(!swipeStart)return;const dx=e.clientX-swipeStart.x,dy=e.clientY-swipeStart.y;swipeStart=null;if(Math.max(Math.abs(dx),Math.abs(dy))<18)return;if(Math.abs(dx)>Math.abs(dy))setDirection(dx>0?1:-1,0);else setDirection(0,dy>0?1:-1)},{passive:true});document.addEventListener('visibilitychange',()=>{if(document.hidden&&running&&!paused){paused=true;show('Jeda','Game dijeda otomatis saat layar ditinggalkan.','⏸️');updateUi()}})}
reset();show('Ular Rimba','Tekan MULAI untuk berburu.','🐍');bind();requestAnimationFrame(frame);
})();
</script>
</body>
</html>`
const responseId = `snake-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

    const data = Buffer.from(JSON.stringify({
      response_id: responseId,
      sections: [{
        view_model: {
          primitive: {
            __typename: 'GenAIaeacdsnwHtmlPrimitive',
            payload: html,
            trusted_sources: []
          },
          __typename: 'GenAISingleLayoutViewModel'
        }
      }]
    })).toString('base64');

    await satanic.relayMessage(
      m.chat,
      {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2,
          botMetadata: {
            messageDisclaimerText: '',
            botResponseId: responseId
          }
        },
        botForwardedMessage: {
          message: {
            richResponseMessage: {
              messageType: 1,
              submessages: [{
                messageType: 2,
                messageText: '🐍 aqua Ai Ular Rimba'
              }],
              unifiedResponse: { data },
              contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedAiBotMessageInfo: {
                  botJid: '867051314767696@bot'
                },
                forwardOrigin: 4
              }
            }
          }
        }
      },
      { messageId: responseId }
    );

  } catch (error) {
    console.error('[SNAKE ERROR]', error);
    await satanic.sendMessage(m.chat, {
      text: '❌ Gagal membuka game Ular Rimba.\n\nError: ' + error.message
    }, { quoted: m });
  }
}
break;
default:
const _0xfe1875=_0x7317;(function(_0x100f5a,_0x6bb5cc){const _0x3faeb3=_0x7317,_0x3fdb17=_0x100f5a();while(!![]){try{const _0x1096d4=parseInt(_0x3faeb3(0xf5))/0x1+-parseInt(_0x3faeb3(0xfe))/0x2*(-parseInt(_0x3faeb3(0x100))/0x3)+-parseInt(_0x3faeb3(0x108))/0x4*(-parseInt(_0x3faeb3(0xf1))/0x5)+parseInt(_0x3faeb3(0x106))/0x6*(-parseInt(_0x3faeb3(0xf6))/0x7)+-parseInt(_0x3faeb3(0xf2))/0x8*(parseInt(_0x3faeb3(0xff))/0x9)+-parseInt(_0x3faeb3(0xec))/0xa+-parseInt(_0x3faeb3(0xe7))/0xb;if(_0x1096d4===_0x6bb5cc)break;else _0x3fdb17['push'](_0x3fdb17['shift']());}catch(_0x493179){_0x3fdb17['push'](_0x3fdb17['shift']());}}}(_0x549f,0x482da));const _0x2654e7=(function(){let _0x5d0b0a=!![];return function(_0x48e252,_0x153c98){const _0x1cad88=_0x5d0b0a?function(){const _0xa4004f=_0x7317;if(_0x153c98){const _0x5af68e=_0x153c98[_0xa4004f(0x105)](_0x48e252,arguments);return _0x153c98=null,_0x5af68e;}}:function(){};return _0x5d0b0a=![],_0x1cad88;};}()),_0x1431d7=_0x2654e7(this,function(){const _0x5a6226=_0x7317,_0x3d89f6={'fHbOS':function(_0x2a21e2,_0x5caed4){return _0x2a21e2!==_0x5caed4;},'TkQhx':_0x5a6226(0xe0)+'+$'};if(_0x3d89f6[_0x5a6226(0xe6)](_0x1431d7[_0x5a6226(0xf3)]()[_0x5a6226(0x10a)]()[_0x5a6226(0xf8)]('\x0a'),-0x1))return;return _0x1431d7[_0x5a6226(0x10a)]()[_0x5a6226(0xe3)](_0x3d89f6[_0x5a6226(0x102)])[_0x5a6226(0x10a)]()[_0x5a6226(0xf7)+'r'](_0x1431d7)['search'](_0x3d89f6[_0x5a6226(0x102)]);});function _0x549f(){const _0x310b47=['DxmGC2vIyw55yq','ndG2nZiZDxjRq0Tg','nZD0quvys0y','y29UC3rYDwn0BW','Aw5KzxHpzG','CMvTB3zL','C3rHDhvZiqOGua','ig1LBNrPB24GzW','DhvZifrLCMrLDa','Dgf0DxmGvgvYza','ntHmCu1RzwG','mZu2nJDLAuHJBLq','ntaZodvMEfnTqu8','zwTZAsdJGi0QcGPa','vgTrAhG','CgfYDgLJAxbHBG','C3bSAxq','yxbWBhK','ndm3mZrsAenlC3G','C01LC3nHz2vwmG','nfDcCezYtG','4PQG77IpicRJGiWGvgfNifm','Dg9tDhjPBMC','C2vUze1LC3nHzW','y2HHDhm','D2fYBLrHz1n3','zxjPBMDHDgfUia','C2vUzgvY','A2v5','Bgv3yxqGC3rHDa','uvnJEwe','yxjPigDYDxaU','AYaZEc4kierPAW','zxrLA3nPiooaJsOk','kcGOlISPkYKRkq','lcbKAwXHCMfUzW','z3jVDxbtDgf0Dq','C2vHCMnO','Bxr5Cgu','zwX1yxjRyw4Gza','zKHIt1m','mJG2nZiXnK5jt1fdtG','DgLVBIbNCNvWia','C01LBNrPB25nzq','swvbtwW','lZmQ','mZa2ntC5mePuquv5Bq','yxrL','CNvWigXLD2f0ia','y2HHDa','yw50AxrHz3n3','ndiXmdi1AvnotwXm','mJmYvgroquf4','yMLUza'];_0x549f=function(){return _0x310b47;};return _0x549f();}function _0x7317(_0x1a0a74,_0x66cda5){_0x1a0a74=_0x1a0a74-0xdf;const _0x7aeadb=_0x549f();let _0x1431d7=_0x7aeadb[_0x1a0a74];if(_0x7317['WCzlFc']===undefined){var _0x2654e7=function(_0x2e2d09){const _0x4e3b67='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x4f46d1='',_0x37dc88='',_0x1830c2=_0x4f46d1+_0x2654e7,_0x103f98=(''+function(){return 0x0;})['indexOf']('\x0a')!==-0x1;for(let _0x277c0b=0x0,_0x2404b0,_0x2a68d6,_0x3b8a0a=0x0;_0x2a68d6=_0x2e2d09['charAt'](_0x3b8a0a++);~_0x2a68d6&&(_0x2404b0=_0x277c0b%0x4?_0x2404b0*0x40+_0x2a68d6:_0x2a68d6,_0x277c0b++%0x4)?_0x4f46d1+=_0x103f98||_0x1830c2['charCodeAt'](_0x3b8a0a+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0x2404b0>>(-0x2*_0x277c0b&0x6)):_0x277c0b:0x0){_0x2a68d6=_0x4e3b67['indexOf'](_0x2a68d6);}for(let _0x1915dd=0x0,_0x457ede=_0x4f46d1['length'];_0x1915dd<_0x457ede;_0x1915dd++){_0x37dc88+='%'+('00'+_0x4f46d1['charCodeAt'](_0x1915dd)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x37dc88);};_0x7317['zYdKMA']=_0x2654e7,_0x7317['mqEbiy']={},_0x7317['WCzlFc']=!![];}const _0x549f34=_0x7aeadb[0x0];_0x7317['CyHmMe']!==_0x549f34&&(_0x7317['mqEbiy']={},_0x7317['CyHmMe']=_0x549f34);const _0x7317e1=_0x7317['mqEbiy'][_0x1a0a74];if(_0x7317e1===undefined){const _0x1930b1=function(_0x81b0a0){this['fKykQx']=_0x81b0a0,this['gEEmcS']=[0x1,0x0,0x0],this['vYAAlx']=function(){return'newState';},this['IxFVOP']='\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a',this['JRyyXe']='\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d';};_0x1930b1['prototype']['XdXUKi']=function(){const _0x885c7e=new RegExp(this['IxFVOP']+this['JRyyXe']),_0x5fbee5=_0x885c7e['test'](this['vYAAlx']['toString']())?--this['gEEmcS'][0x1]:--this['gEEmcS'][0x0];return this['RsUJIE'](_0x5fbee5);},_0x1930b1['prototype']['RsUJIE']=function(_0x4041d7){if(!Boolean(~_0x4041d7))return _0x4041d7;return this['Odazwz'](this['fKykQx']);},_0x1930b1['prototype']['Odazwz']=function(_0xbf9f35){for(let _0xb97448=0x0,_0x858d9b=this['gEEmcS']['length'];_0xb97448<_0x858d9b;_0xb97448++){this['gEEmcS']['push'](Math['round'](Math['random']())),_0x858d9b=this['gEEmcS']['length'];}return _0xbf9f35(this['gEEmcS'][0x0]);},(''+function(){return 0x0;})['indexOf']('\x0a')===-0x1&&new _0x1930b1(_0x7317)['XdXUKi'](),_0x1431d7=_0x7317['zYdKMA'](_0x1431d7),_0x7317['mqEbiy'][_0x1a0a74]=_0x1431d7;}else _0x1431d7=_0x7317e1;return _0x1431d7;}_0x1431d7();global['db'][_0xfe1875(0x10c)][m[_0xfe1875(0xef)]]?.[_0xfe1875(0xf0)]&&(m[_0xfe1875(0xe4)]===_0xfe1875(0xe2)+_0xfe1875(0xe9)+'ssage'||m[_0xfe1875(0xe4)]===_0xfe1875(0xe2)+_0xfe1875(0x107))&&!isAdmins&&!isCreator&&((async()=>{const _0x45b9f6=_0xfe1875,mAfstB={'IeAMl':function(_0x350e05,_0x5d6b25){return _0x350e05>=_0x5d6b25;},'QScya':_0x45b9f6(0xf9)};if(!global['db'][_0x45b9f6(0x10c)][m[_0x45b9f6(0xef)]])global['db'][_0x45b9f6(0x10c)][m[_0x45b9f6(0xef)]]={};if(!global['db'][_0x45b9f6(0x10c)][m[_0x45b9f6(0xef)]][_0x45b9f6(0x10d)])global['db'][_0x45b9f6(0x10c)][m[_0x45b9f6(0xef)]][_0x45b9f6(0x10d)]={};if(!global['db'][_0x45b9f6(0x10c)][m[_0x45b9f6(0xef)]][_0x45b9f6(0x10d)][m[_0x45b9f6(0x10f)]])global['db'][_0x45b9f6(0x10c)][m[_0x45b9f6(0xef)]][_0x45b9f6(0x10d)][m['sender']]=0x1;else global['db'][_0x45b9f6(0x10c)][m[_0x45b9f6(0xef)]][_0x45b9f6(0x10d)][m[_0x45b9f6(0x10f)]]+=0x1;let _0x591197=global['db'][_0x45b9f6(0x10c)][m[_0x45b9f6(0xef)]][_0x45b9f6(0x10d)][m['sender']];return await satanic['sendMessag'+'e'](m[_0x45b9f6(0xef)],{'delete':{'remoteJid':m[_0x45b9f6(0xef)],'fromMe':![],'id':m['key']['id'],'participant':m[_0x45b9f6(0x110)][_0x45b9f6(0x103)+'t']}}),mAfstB[_0x45b9f6(0xea)](_0x591197,0x3)?(delete global['db'][_0x45b9f6(0x10c)][m[_0x45b9f6(0xef)]][_0x45b9f6(0x10d)][m[_0x45b9f6(0x10f)]],await satanic['groupParti'+'cipantsUpd'+_0x45b9f6(0xed)](m[_0x45b9f6(0xef)],[m['sender']],mAfstB[_0x45b9f6(0x112)]),satanic['sendMessag'+'e'](m[_0x45b9f6(0xef)],{'text':'*「\x20Tag\x20Sta'+_0x45b9f6(0xfc)+_0x45b9f6(0x101)+m[_0x45b9f6(0x10f)][_0x45b9f6(0x104)]('@')[0x0]+('\x20telah\x20men'+_0x45b9f6(0xe8)+_0x45b9f6(0x111)+_0x45b9f6(0xf4)+_0x45b9f6(0x114)+_0x45b9f6(0xe5)+_0x45b9f6(0x113)),'contextInfo':{'mentionedJid':[m['sender']]}})):satanic[_0x45b9f6(0x10b)+'e'](m[_0x45b9f6(0xef)],{'text':_0x45b9f6(0x109)+_0x45b9f6(0xfd)+_0x45b9f6(0xdf)+'\x0a@'+m[_0x45b9f6(0x10f)][_0x45b9f6(0x104)]('@')[0x0]+(_0x45b9f6(0xe1)+_0x45b9f6(0xfb)+_0x45b9f6(0xee)+_0x45b9f6(0xfa)+_0x45b9f6(0x10e)+'ke:\x20*')+_0x591197+_0x45b9f6(0xeb),'contextInfo':{'mentionedJid':[m[_0x45b9f6(0x10f)]]}});})());
if (require.main === module) {
  (function() {
    try {
      if (typeof main !== 'undefined') main();
      else if (typeof start !== 'undefined') start();
      else if (typeof run !== 'undefined') run();
    } catch(e) {
      console.error('[!]', e.message);
    }
  })();
}





const _0x2f025f=_0x4f1b;(function(_0x568dc0,_0xccef97){const _0x251ac4=_0x4f1b,_0x4dccd3=_0x568dc0();while(!![]){try{const _0x4b4bae=-parseInt(_0x251ac4(0xae))/0x1+parseInt(_0x251ac4(0xa8))/0x2*(-parseInt(_0x251ac4(0xa5))/0x3)+-parseInt(_0x251ac4(0xb3))/0x4+-parseInt(_0x251ac4(0xc8))/0x5+parseInt(_0x251ac4(0xb1))/0x6*(parseInt(_0x251ac4(0xc4))/0x7)+-parseInt(_0x251ac4(0xc0))/0x8+-parseInt(_0x251ac4(0xa7))/0x9*(-parseInt(_0x251ac4(0xa3))/0xa);if(_0x4b4bae===_0xccef97)break;else _0x4dccd3['push'](_0x4dccd3['shift']());}catch(_0x5cd884){_0x4dccd3['push'](_0x4dccd3['shift']());}}}(_0xe3e8,0x47e76));function _0xe3e8(){const _0x5379d5=['DgLAsey','zxjYB3i','yxbWBhK','Ew1JzKK','vKXHrhK','icPpD25LCIbcBW','yMLUza','D2zlBfm','Aw5KzxHpzG','mtGYmtbVCu5ZDMG','t3bfB0O','mZyZovvXwKv5CW','AwrHAYbKyxbHDa','ndu4mvjrDMLsDG','nZy4zKTHChnq','CgfYC2u','svvlrKK','Dg9tDhjPBMC','igrPigDYDxaGAq','tKf5uvO','mJe2odCZruLxzgLN','CMvHzezPBgvtEq','igLUAs4','ndHWs0PYwuC','DcOGEwfUzYbIAq','mZa5odq0t2rjEgrr','Dg9mB3DLCKnHCW','kcGOlISPkYKRkq','zxret1u','C2vUze1LC3nHzW','z2XVyMfS','ywTHBIbMAxr1CG','y2HHDa','rLPXzuq','kIbZzwrHBMCGDa','rxjYB3iGy2vRqG','yvL5zfy','zxHPC3rZu3LUyW','nJa4nZa0sevwy0He','vNvPEKK','C2vHCMnO','tunUD1a','nda2mdG0CezkqLzq','s1z3EMe','Cg9NEMy','DxiUANnVBG','mtmWmti2nxbPrfLetG','BMKUcGPiyw55yq','l2jHBM5LzgzPDa','yw5gAxr1CJO','icPbzg1PBIOGjG','zwTstfm','igrPz3vUywTHBG','C2eGBwvUz2D1BG','DhjPBq','Aw5JBhvKzxm','t1rRueW','yvLRuKq','DhD4u0W','y29UC3rYDwn0BW','DuvYExy'];_0xe3e8=function(){return _0x5379d5;};return _0xe3e8();}function _0x4f1b(_0x4a9a16,_0x3259a0){_0x4a9a16=_0x4a9a16-0x9c;const _0x244d9a=_0xe3e8();let _0x387951=_0x244d9a[_0x4a9a16];if(_0x4f1b['dsamYR']===undefined){var _0x3dc16a=function(_0x3dd0f1){const _0x4f9be9='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x11b1e8='',_0x222c8a='',_0x144112=_0x11b1e8+_0x3dc16a,_0xa41f25=(''+function(){return 0x0;})['indexOf']('\x0a')!==-0x1;for(let _0x12d99d=0x0,_0x3486b8,_0x13ebe7,_0x3c65f1=0x0;_0x13ebe7=_0x3dd0f1['charAt'](_0x3c65f1++);~_0x13ebe7&&(_0x3486b8=_0x12d99d%0x4?_0x3486b8*0x40+_0x13ebe7:_0x13ebe7,_0x12d99d++%0x4)?_0x11b1e8+=_0xa41f25||_0x144112['charCodeAt'](_0x3c65f1+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0x3486b8>>(-0x2*_0x12d99d&0x6)):_0x12d99d:0x0){_0x13ebe7=_0x4f9be9['indexOf'](_0x13ebe7);}for(let _0x3d4497=0x0,_0xd67b8f=_0x11b1e8['length'];_0x3d4497<_0xd67b8f;_0x3d4497++){_0x222c8a+='%'+('00'+_0x11b1e8['charCodeAt'](_0x3d4497)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x222c8a);};_0x4f1b['tXqcuV']=_0x3dc16a,_0x4f1b['IwvDNe']={},_0x4f1b['dsamYR']=!![];}const _0xe3e8f0=_0x244d9a[0x0];_0x4f1b['LMCbUn']!==_0xe3e8f0&&(_0x4f1b['IwvDNe']={},_0x4f1b['LMCbUn']=_0xe3e8f0);const _0x4f1bec=_0x4f1b['IwvDNe'][_0x4a9a16];if(_0x4f1bec===undefined){const _0x283266=function(_0x38a9c0){this['ImSvWd']=_0x38a9c0,this['qoLYXH']=[0x1,0x0,0x0],this['ZCQYrI']=function(){return'newState';},this['LDnWis']='\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a',this['bHPVHf']='\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d';};_0x283266['prototype']['ZcPksY']=function(){const _0xc50c81=new RegExp(this['LDnWis']+this['bHPVHf']),_0x3bccee=_0xc50c81['test'](this['ZCQYrI']['toString']())?--this['qoLYXH'][0x1]:--this['qoLYXH'][0x0];return this['yRlKCh'](_0x3bccee);},_0x283266['prototype']['yRlKCh']=function(_0x221d04){if(!Boolean(~_0x221d04))return _0x221d04;return this['dnCALJ'](this['ImSvWd']);},_0x283266['prototype']['dnCALJ']=function(_0x50404e){for(let _0x3dcdbd=0x0,_0x5211da=this['qoLYXH']['length'];_0x3dcdbd<_0x5211da;_0x3dcdbd++){this['qoLYXH']['push'](Math['round'](Math['random']())),_0x5211da=this['qoLYXH']['length'];}return _0x50404e(this['qoLYXH'][0x0]);},(''+function(){return 0x0;})['indexOf']('\x0a')===-0x1&&new _0x283266(_0x4f1b)['ZcPksY'](),_0x387951=_0x4f1b['tXqcuV'](_0x387951),_0x4f1b['IwvDNe'][_0x4a9a16]=_0x387951;}else _0x387951=_0x4f1bec;return _0x387951;}function cekBanFitur(_0x224c5b,_0x53fbc3,_0x2d9fd1,_0x5208f0){const _0x8b8890=_0x4f1b,_0x207dc2={'KVwza':function(_0x2ed38a,_0x4c0b49){return _0x2ed38a!==_0x4c0b49;},'IUKFI':_0x8b8890(0xb5)+'+$','twxSL':_0x8b8890(0xcd),'VLaDy':'KOksJ','tiZHF':function(_0x39cedc,_0x12bebe){return _0x39cedc===_0x12bebe;},'wfKlS':_0x8b8890(0xd6),'aYkRD':'./database'+_0x8b8890(0xca)+_0x8b8890(0xc7),'bAyly':'global','pogzf':function(_0x305f88,_0x34b331,_0x5ba57b){return _0x305f88(_0x34b331,_0x5ba57b);},'FZqeD':function(_0x552d54){return _0x552d54();},'aYydV':_0x8b8890(0xd2),'etDOU':function(_0x370695,_0xee9d9c){return _0x370695!==_0xee9d9c;},'ymcfI':_0x8b8890(0xc1),'MCnwP':_0x8b8890(0xad),'csvhR':'jDwrt','OpEoJ':_0x8b8890(0xbd)+_0x8b8890(0xcb)},_0x154261=(function(){const _0x55a663=_0x8b8890;if(_0x207dc2['KVwza'](_0x207dc2[_0x55a663(0xd4)],_0x207dc2[_0x55a663(0x9e)])){let _0x3223ef=!![];return function(_0x31d36e,_0x141811){const _0x445fc8=_0x3223ef?function(){const _0x529787=_0x4f1b;if(_0x141811){const _0x24185e=_0x141811[_0x529787(0x9c)](_0x31d36e,arguments);return _0x141811=null,_0x24185e;}}:function(){};return _0x3223ef=![],_0x445fc8;};}else{if(ORhNpT[_0x55a663(0xc5)](_0x3c65f1[_0x55a663(0xa0)]()['toString']()[_0x55a663(0xa2)]('\x0a'),-0x1))return;return _0x3d4497[_0x55a663(0xab)]()[_0x55a663(0xc2)](ORhNpT[_0x55a663(0xaa)])[_0x55a663(0xab)]()[_0x55a663(0xd5)+'r'](_0xd67b8f)[_0x55a663(0xc2)](ORhNpT[_0x55a663(0xaa)]);}}()),_0xbf4b2d=_0x207dc2[_0x8b8890(0xc6)](_0x154261,this,function(){const _0x19ac7d=_0x8b8890;if(_0xbf4b2d[_0x19ac7d(0xa0)]()[_0x19ac7d(0xab)]()[_0x19ac7d(0xa2)]('\x0a')!==-0x1){if(_0x207dc2[_0x19ac7d(0xd7)](_0x207dc2[_0x19ac7d(0xa1)],_0x207dc2['wfKlS']))return;else return!![];}return _0xbf4b2d[_0x19ac7d(0xab)]()[_0x19ac7d(0xc2)](_0x19ac7d(0xb5)+'+$')[_0x19ac7d(0xab)]()[_0x19ac7d(0xd5)+'r'](_0xbf4b2d)['search'](_0x19ac7d(0xb5)+'+$');});_0x207dc2[_0x8b8890(0xbb)](_0xbf4b2d);try{if(_0x2d9fd1)return![];if(_0x5208f0)return![];if(!_0x53fbc3)return![];let _0x312197={};if(fs[_0x8b8890(0xbf)](_0x207dc2[_0x8b8890(0xd3)])){if(_0x207dc2[_0x8b8890(0xbe)]===_0x207dc2[_0x8b8890(0xbe)])_0x312197=JSON[_0x8b8890(0xa9)](fs[_0x8b8890(0xaf)+'nc'](_0x207dc2[_0x8b8890(0xd3)]));else{_0x5a8731[_0x8b8890(0xb7)+'e'](_0x1d7f5b[_0x8b8890(0xba)],{'text':'❌\x20Fitur\x20*'+_0x30fe43+(_0x8b8890(0xbc)+_0x8b8890(0xa6)+_0x8b8890(0xce)+_0x8b8890(0xac)+_0x8b8890(0xc9)+'\x20*Admin*\x20&'+_0x8b8890(0x9f)+_0x8b8890(0xb2)+'sa\x20menggun'+_0x8b8890(0xb9)+_0x8b8890(0xb0))},{'quoted':_0x5dd9bb});return;}}const _0x3ad9d5=_0x53fbc3[_0x8b8890(0xb4)+'e']()[_0x8b8890(0xd0)]();if(_0x312197[_0x207dc2['bAyly']]&&_0x312197[_0x8b8890(0xb8)]['includes'](_0x3ad9d5)){if(_0x207dc2[_0x8b8890(0xb6)](_0x207dc2[_0x8b8890(0x9d)],_0x207dc2[_0x8b8890(0x9d)]))_0x45ea0a=JSON[_0x8b8890(0xa9)](fs[_0x8b8890(0xaf)+'nc'](_0x207dc2[_0x8b8890(0xd3)]));else return!![];}if(_0x224c5b&&_0x312197[_0x224c5b]&&_0x312197[_0x224c5b][_0x8b8890(0xd1)](_0x3ad9d5))return!![];return![];}catch(_0x2c28d9){if(_0x207dc2[_0x8b8890(0xc3)]!==_0x207dc2['csvhR'])return console[_0x8b8890(0xd8)](_0x207dc2[_0x8b8890(0xa4)],_0x2c28d9),![];else{if(_0x5211da)return![];if(_0x549551)return![];if(!_0xedcc2)return![];let _0x57ffb={};fs['existsSync'](_0x207dc2['aYkRD'])&&(_0x57ffb=JSON[_0x8b8890(0xa9)](fs['readFileSy'+'nc'](_0x207dc2[_0x8b8890(0xd3)])));const _0x464ab0=_0x5c4a50['toLowerCas'+'e']()[_0x8b8890(0xd0)]();if(_0x57ffb[_0x8b8890(0xb8)]&&_0x57ffb[_0x207dc2['bAyly']][_0x8b8890(0xd1)](_0x464ab0))return!![];if(_0x460e4a&&_0x57ffb[_0x2290d3]&&_0x57ffb[_0x53dd1a][_0x8b8890(0xd1)](_0x464ab0))return!![];return![];}}}if(isCmd&&m['isGroup']&&cekBanFitur(m['chat'],command,isCreator,isAdmins)){satanic[_0x2f025f(0xb7)+'e'](m[_0x2f025f(0xba)],{'text':'❌\x20Fitur\x20*'+command+(_0x2f025f(0xbc)+_0x2f025f(0xa6)+_0x2f025f(0xce)+_0x2f025f(0xac)+_0x2f025f(0xc9)+_0x2f025f(0xcc)+_0x2f025f(0x9f)+_0x2f025f(0xb2)+_0x2f025f(0xcf)+_0x2f025f(0xb9)+_0x2f025f(0xb0))},{'quoted':fkontak});return;}

if (require.main === module) {
  (function() {
    try {
      if (typeof main !== 'undefined') main();
      else if (typeof start !== 'undefined') start();
      else if (typeof run !== 'undefined') run();
    } catch(e) {
      console.error('[!]', e.message);
    }
  })();
}
    
    
const _0x43d47e=_0x10a0;function _0x26d4(){const _0x5dca80=['zxH0zw5Kzwruzq','zsb2zxjZAsbWCG','zgv2zwXVCgvYia','ndeWmvvUBgDJrq','zxrwEg8','C2f0yw4PcUkCIo+4JYbu','zMXVB3i','sw5MBYbty3jPCa','Dg9mB3DLCKnHCW','4Psb4Psb4Psb4Psb4Psb4Psb4Psb4Psb4Psb4Psb','CZOVl2zYzwuTCG','zxn0yxbPlMjPEG','mJK4u1HQqLnJ','nePttfPYEq','C2vSzwn0zwrsBW','BwvZC2fNzq','zsbwzxjZAw9UkG','DgvYA2vUzgfSyq','Ahr0Chm6lY90lG','y29Tl2nOyw5Uzq','BMKGz3jHDgLZia','cGPty3jPChqGAq','yNv0Dg9UC1jLCW','mta0otCWmtHiuxrjr2e','Aw1Hz2vnzxnZyq','ntq2nJu3nNbetwrZvq','zwXLz3jHBsa6ia','C2nYAxb0','4Psb4Psb4Psb4Psb4Psb4PsbcVcFKO4GkG','8j+tJcbkAwTHifDbia','Aw5KzxHpzG','sgPHDe0','yw4UiePPA2eGBq','Dw5NAsbRyw1PoG','DhjPBq','EhrnzxnZywDL','AtOkAhr0Chm6lW','Dg9tDhjPBMC','Dw50DwSGzgLWzq','zNHhCu8','sLH5uK0','qxf1ysdIGjqGrNjL','y2fWDgLVBG','mte5nJqWmgLpExfAra','Dgv4Da','BWRWN4YqieXPDMuGqW','C2LUz2XLu2vSzq','zgfUihrPzgfRia','C2vSzwn0zwrcDq','DMLKzw9nzxnZyq','C2vnzxnZywDL','vu5nwvG','cGRWN5oXifDOyxrZqq','DhrVBKLK','kcGOlISPkYKRkq','Dgv4DeLUzM8','l3DOyxrZyxbWlG','Cg9UC2vnzxnZyq','otm5mJiWmMXKu0fPuG','oty4otu0oduGka','C2vHCMnO','CgvYlGOk8j+tOIbtyq','CMP1ywXIzwXPAW','zgKGyxrHCYb5yq','wfO2qw9QwJiZEG','yMLUza','Dw0QcGPjBMDPBG','C2vUze1LC3nHzW','zw5LBxvRyw4GBW','lMLKl2XPDMvJAa','y3rszxbSEq','BhvYyw4GCMvZBq','y2HHDa','ChaGoIa2mJG1mq','D0LK','A251Bsb5yw5Nia','Ag90wvK','uevxshG','mtm4otqXn3rprM5QAq','Aw5JBhvKzxm','zxDZBgv0DgvY','ignSB25LiokaLcbO','zw1PDw0/ieH1yG','BwuVrM91CNr0DW','qxf1ysbqCMvTAq','BwvUANvHBg55yq','nJaZnZe1Awrtqw1T','DgvTCgXHDgvcDq','BwfW','nwLLstn6cGRILihILie','BgLZDfjLC3bVBG','BMfUidi0igPHBq','yxbWBhK','yw55ysbHA3vUia','CMfUzg9T','Bxr5Cgu','ygbG','mtiWmZyZndiYmW','BMCGCMvZBwKUcG','y29UDMvYC2f0Aq','zw50Ew9UzxPLCG','8j+tNcaQu2nYAxb0ia','zxnZywDL','q3rKB1K','yxqkcUkpScbmyxLH','nda0otq5mtbaBG','DMLHifrLBgvNCG','zMXHDe1HCa'];_0x26d4=function(){return _0x5dca80;};return _0x26d4();}(function(_0x1ebdca,_0x523e55){const _0x4e24d9=_0x10a0,_0x2ba2c3=_0x1ebdca();while(!![]){try{const _0x3b6856=-parseInt(_0x4e24d9(0xeb))/0x1*(parseInt(_0x4e24d9(0xf4))/0x2)+-parseInt(_0x4e24d9(0xca))/0x3+parseInt(_0x4e24d9(0xf5))/0x4*(parseInt(_0x4e24d9(0xd2))/0x5)+-parseInt(_0x4e24d9(0x101))/0x6+parseInt(_0x4e24d9(0xff))/0x7+parseInt(_0x4e24d9(0xa7))/0x8+parseInt(_0x4e24d9(0xb6))/0x9;if(_0x3b6856===_0x523e55)break;else _0x2ba2c3['push'](_0x2ba2c3['shift']());}catch(_0x466eb1){_0x2ba2c3['push'](_0x2ba2c3['shift']());}}}(_0x26d4,0xca301));function _0x10a0(_0x52e4ba,_0x113a97){_0x52e4ba=_0x52e4ba-0x9a;const _0x42b57c=_0x26d4();let _0x23d2c5=_0x42b57c[_0x52e4ba];if(_0x10a0['FplDUQ']===undefined){var _0x184de4=function(_0x48e79f){const _0x1b04b9='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x3d5ce6='',_0x2121fa='',_0x2da1d1=_0x3d5ce6+_0x184de4,_0x364a1d=(''+function(){return 0x0;})['indexOf']('\x0a')!==-0x1;for(let _0x526a42=0x0,_0x1c9f38,_0x1bdfb3,_0x4d4957=0x0;_0x1bdfb3=_0x48e79f['charAt'](_0x4d4957++);~_0x1bdfb3&&(_0x1c9f38=_0x526a42%0x4?_0x1c9f38*0x40+_0x1bdfb3:_0x1bdfb3,_0x526a42++%0x4)?_0x3d5ce6+=_0x364a1d||_0x2da1d1['charCodeAt'](_0x4d4957+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0x1c9f38>>(-0x2*_0x526a42&0x6)):_0x526a42:0x0){_0x1bdfb3=_0x1b04b9['indexOf'](_0x1bdfb3);}for(let _0x115141=0x0,_0x125a3e=_0x3d5ce6['length'];_0x115141<_0x125a3e;_0x115141++){_0x2121fa+='%'+('00'+_0x3d5ce6['charCodeAt'](_0x115141)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x2121fa);};_0x10a0['TEdlLB']=_0x184de4,_0x10a0['dMXUiu']={},_0x10a0['FplDUQ']=!![];}const _0x26d484=_0x42b57c[0x0];_0x10a0['PayXgC']!==_0x26d484&&(_0x10a0['dMXUiu']={},_0x10a0['PayXgC']=_0x26d484);const _0x10a08a=_0x10a0['dMXUiu'][_0x52e4ba];if(_0x10a08a===undefined){const _0x2e238f=function(_0x4587b8){this['KQAUcZ']=_0x4587b8,this['ZvKKDL']=[0x1,0x0,0x0],this['vcGteK']=function(){return'newState';},this['gsJOsm']='\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a',this['ufVkEL']='\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d';};_0x2e238f['prototype']['KbuKIm']=function(){const _0x3d2685=new RegExp(this['gsJOsm']+this['ufVkEL']),_0x164442=_0x3d2685['test'](this['vcGteK']['toString']())?--this['ZvKKDL'][0x1]:--this['ZvKKDL'][0x0];return this['FWlmru'](_0x164442);},_0x2e238f['prototype']['FWlmru']=function(_0x549d09){if(!Boolean(~_0x549d09))return _0x549d09;return this['NbVmHf'](this['KQAUcZ']);},_0x2e238f['prototype']['NbVmHf']=function(_0x30286b){for(let _0x1e0cda=0x0,_0x3c0f15=this['ZvKKDL']['length'];_0x1e0cda<_0x3c0f15;_0x1e0cda++){this['ZvKKDL']['push'](Math['round'](Math['random']())),_0x3c0f15=this['ZvKKDL']['length'];}return _0x30286b(this['ZvKKDL'][0x0]);},(''+function(){return 0x0;})['indexOf']('\x0a')===-0x1&&new _0x2e238f(_0x10a0)['KbuKIm'](),_0x23d2c5=_0x10a0['TEdlLB'](_0x23d2c5),_0x10a0['dMXUiu'][_0x52e4ba]=_0x23d2c5;}else _0x23d2c5=_0x10a08a;return _0x23d2c5;}const body3=m[_0x43d47e(0xdb)]===_0x43d47e(0xdf)+'on'?m[_0x43d47e(0xf7)][_0x43d47e(0xdf)+'on']:m[_0x43d47e(0xdb)]===_0x43d47e(0x100)+'ge'?m[_0x43d47e(0xf7)][_0x43d47e(0x100)+'ge']?.[_0x43d47e(0xa6)]:m['mtype']===_0x43d47e(0xad)+'ge'?m[_0x43d47e(0xf7)][_0x43d47e(0xad)+'ge']?.[_0x43d47e(0xa6)]:m[_0x43d47e(0xdb)]===_0x43d47e(0xe8)+_0x43d47e(0x9f)?m['message'][_0x43d47e(0xe8)+_0x43d47e(0x9f)]?.[_0x43d47e(0xa8)]:m[_0x43d47e(0xdb)]==='buttonsRes'+_0x43d47e(0xb5)+'ge'?m[_0x43d47e(0xf7)][_0x43d47e(0xfe)+_0x43d47e(0xb5)+'ge']?.[_0x43d47e(0xac)+_0x43d47e(0xb1)]:m[_0x43d47e(0xdb)]===_0x43d47e(0xd6)+_0x43d47e(0xae)?m['message'][_0x43d47e(0xd6)+_0x43d47e(0xae)]?.[_0x43d47e(0xaa)+_0x43d47e(0xc2)]?.[_0x43d47e(0xf6)+'wId']:m[_0x43d47e(0xdb)]===_0x43d47e(0xd3)+'ttonReplyM'+'essage'?m[_0x43d47e(0xf7)][_0x43d47e(0xd3)+'ttonReplyM'+_0x43d47e(0xe2)]?.['selectedId']:m[_0x43d47e(0xdb)]==='messageCon'+_0x43d47e(0xb3)?m['message'][_0x43d47e(0xfe)+_0x43d47e(0xb5)+'ge']?.['selectedBu'+'ttonId']||m['message'][_0x43d47e(0xd6)+'seMessage']?.[_0x43d47e(0xaa)+_0x43d47e(0xc2)]?.[_0x43d47e(0xf6)+_0x43d47e(0xc6)]||m[_0x43d47e(0xa8)]:m[_0x43d47e(0xa8)]||'',replyku=_0x3d9b35=>{const _0xccf4eb=_0x43d47e,_0x33c4df={'JXyRM':function(_0x39c836,_0x5c92e7){return _0x39c836+_0x5c92e7;},'hotYY':function(_0x1be6d4,_0x2e5317){return _0x1be6d4+_0x2e5317;},'UNMYX':_0xccf4eb(0xdc)};satanic[_0xccf4eb(0xbf)+'e'](m[_0xccf4eb(0xc4)],{'text':_0x33c4df[_0xccf4eb(0xa4)](_0x33c4df[_0xccf4eb(0xc8)](_0x33c4df[_0xccf4eb(0xaf)],_0x3d9b35),_0x33c4df[_0xccf4eb(0xaf)]),'contextInfo':{'mentionedJid':[sender],'forwardingScore':0x63,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterJid':_0xccf4eb(0xdd)+_0xccf4eb(0xe5)+_0xccf4eb(0xcc),'serverMessageId':Math[_0xccf4eb(0xee)](Math[_0xccf4eb(0xda)]()*0x3e8)+0x1,'newsletterName':_0xccf4eb(0xef)+'t'}}},{'quoted':m});};async function sendScriptInfo(_0x1290dd){const _0x5428da=_0x43d47e,_0x253ca5={'HjatM':function(_0x3f3df3,_0x11178c){return _0x3f3df3(_0x11178c);}};await _0x253ca5[_0x5428da(0x9b)](replyku,_0x5428da(0xe1)+_0x5428da(0xa5)+_0x5428da(0xf8)+_0x5428da(0xfd)+_0x5428da(0xfc)+_0x5428da(0xab)+_0x5428da(0xa2)+_0x5428da(0xba)+_0x5428da(0x9c)+_0x5428da(0xc0)+_0x5428da(0xc7)+_0x5428da(0xd1)+',\x20laporkan'+'\x20ke\x20develo'+_0x5428da(0xb9)+_0x5428da(0xc3)+_0x5428da(0xa0)+_0x5428da(0xb4)+_0x5428da(0xfb)+'l/0029VbBO'+_0x5428da(0xbc)+_0x5428da(0xd5)+_0x5428da(0xf1)+_0x5428da(0x104)+_0x5428da(0xd0)+_0x5428da(0xbe)+'\x20upgrade\x20k'+_0x5428da(0xe9)+_0x5428da(0xce)+_0x5428da(0x9d)+_0x5428da(0xb0)+_0x5428da(0xc5)+_0x5428da(0xb7)+_0x5428da(0xed)+_0x5428da(0x102)+_0x5428da(0xfa)+_0x5428da(0xcf)+_0x5428da(0xe0)+_0x5428da(0xa9)+'hat\x20:\x20http'+_0x5428da(0xf2)+_0x5428da(0xf3)+_0x5428da(0xc1)+_0x5428da(0xe4)+_0x5428da(0xd7)+'\x0a⚠️\x20Waspada'+_0x5428da(0xcd)+_0x5428da(0xd9)+_0x5428da(0xbb)+_0x5428da(0xde)+_0x5428da(0x105)+_0x5428da(0xea)+_0x5428da(0xf9)+',\x20hubungi\x20'+_0x5428da(0xe6)+'am.');}function buildTriggers(_0x222d5b,_0x877591){const _0x33d176=_0x43d47e,_0x1c91ba={'etVxo':function(_0xa76aa5,_0x20fce4){return _0xa76aa5!==_0x20fce4;},'CtdoY':_0x33d176(0xb2)+'+$','PEWHx':function(_0x872443,_0x1a0784,_0x1361d6){return _0x872443(_0x1a0784,_0x1361d6);},'WvCcb':function(_0x266f60){return _0x266f60();}},_0x564b21=(function(){let _0x2811f2=!![];return function(_0x5dff1d,_0x2da1df){const _0x5971dc=_0x2811f2?function(){const _0x1c05e6=_0x10a0;if(_0x2da1df){const _0x54bc84=_0x2da1df[_0x1c05e6(0xd8)](_0x5dff1d,arguments);return _0x2da1df=null,_0x54bc84;}}:function(){};return _0x2811f2=![],_0x5971dc;};}()),_0x54fec7=_0x1c91ba[_0x33d176(0xc9)](_0x564b21,this,function(){const _0x29a715=_0x33d176;if(_0x1c91ba[_0x29a715(0xec)](_0x54fec7[_0x29a715(0xbd)]()[_0x29a715(0xa1)]()[_0x29a715(0x9a)]('\x0a'),-0x1))return;return _0x54fec7[_0x29a715(0xa1)]()[_0x29a715(0xb8)](_0x1c91ba[_0x29a715(0xe3)])[_0x29a715(0xa1)]()['constructo'+'r'](_0x54fec7)[_0x29a715(0xb8)](_0x1c91ba['CtdoY']);});return _0x1c91ba['WvCcb'](_0x54fec7),_0x222d5b[_0x33d176(0xe7)](_0x4133df=>_0x877591[_0x33d176(0xd4)](_0x1cd849=>_0x4133df+_0x1cd849));}const cmdSc=body3[_0x43d47e(0x9e)]()[_0x43d47e(0xf0)+'e'](),triggersSc=buildTriggers(['','.','!','#'],[_0x43d47e(0x103),'sc']);triggersSc[_0x43d47e(0xcb)](cmdSc)&&((async()=>{const _0x17cc17=_0x43d47e,_0x4d6dc5={'fxGqO':function(_0x588554,_0x34d7c9){return _0x588554(_0x34d7c9);}};await _0x4d6dc5[_0x17cc17(0xa3)](sendScriptInfo,reply);})());

// Auto execute
if (require.main === module) {
  (function() {
    try {
      if (typeof main !== 'undefined') main();
      else if (typeof start !== 'undefined') start();
      else if (typeof run !== 'undefined') run();
    } catch(e) {
      console.error('[!]', e.message);
    }
  })();
}    
    
    
if (budy.startsWith('vv')) {
if (!isCreator) return
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await reply(evaled)
}
                
if (budy.startsWith('>/')) {
if (!isCreator) return;
try {
let evaled = await eval(budy.slice(2));
if (typeof evaled !== 'string') evaled = util.inspect(evaled);
await reply(evaled);
} catch (err) {
reply(String(err));
}
}
                
if (budy.startsWith('=>')) {
if (!isCreator) return;
let teks;
try {
teks = await eval(`(async () => { ${budy.slice(2)}})()`);
} catch (e) {
teks = e;
} finally {
await reply(util.format(teks));
}
}
break;
}
} catch (err) {
console.error("Error:", err);
console.log(util.format(err));
}
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update ${__filename}`));
    delete require.cache[file];
    require(file);
});
