console.clear();
console.log('© satanic Dev');
require('./settings');

const { 
    default: makeWASocket, 
    prepareWAMessageMedia, 
    useMultiFileAuthState, 
    DisconnectReason, 
    fetchLatestBaileysVersion, 
    generateWAMessageFromContent, 
    generateWAMessageContent, 
    generateWAMessage,
    jidDecode, 
    proto, 
    delay,
    relayWAMessage, 
    getContentType, 
    getAggregateVotesInPollMessage, 
    downloadContentFromMessage, 
    fetchLatestWaWebVersion, 
    InteractiveMessage, 
    makeCacheableSignalKeyStore, 
    Browsers, 
    generateForwardMessageContent, 
    MessageRetryMap 
} = require("@whiskeysockets/baileys");

const { makeInMemoryStore } = require('./lib/store');
const cfonts = require('cfonts');
const pino = require('pino');
const path = require("path");
const FileType = require('file-type');
const axios = require('axios');
const readline = require("readline");
const fs = require('fs');
const crypto = require("crypto");
const colors = require('colors');
const chalk = require('chalk');
const fetch = require('node-fetch');
const PhoneNumber = require('awesome-phonenumber');
const { handleConnection } = require('./lib/connection.js');
const { Boom } = require('@hapi/boom');
const { color } = require('./lib/color');
const { TelegraPh } = require('./lib/uploader');
const { smsg, sleep, getBuffer } = require('./lib/myfunction');
const { addSewaGroup, checkSewaGroup, getSewaPosition, msToDate, expiredCheck, remindSewa, getGcName } = require('./lib/sewa');
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid, addExif } = require('./lib/exif');

const ownerData = JSON.parse(fs.readFileSync('./database/owner.json', 'utf8'));



global.sewa = JSON.parse(fs.readFileSync('./database/sewa.json'));
global.db = JSON.parse(fs.readFileSync('./database/database.json'));

if (global.db) global.db = {
    sticker: {},
    database: {}, 
    groups: {}, 
    game: {},
    others: {},
    users: {},
    chats: {},
    settings: {},
    ...(global.db || {})
};

const usePairingCode = true;
const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => { rl.question(text, resolve) });
};

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

cfonts.say('satanic', { 
    font: 'block', 
    align: 'left', 
    colors: ['#ff00ff', 'white'], 
    background: 'transparent', 
    rawMode: false 
});

async function Starts() {
    const { state, saveCreds } = await useMultiFileAuthState("./session");
    const satanic = makeWASocket({
        printQRInTerminal: false,
        syncFullHistory: false,
        markOnlineOnConnect: true,
        emitOwnEvents: true,
        fireInitQueries: true,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 60000,
        keepAliveIntervalMs: 10000,
        shouldSyncHistoryMessage: () => false,
        generateHighQualityLinkPreview: true, 
        version: (await (await fetch('https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json')).json()).version,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        logger: pino({ level: 'silent' }),
        auth: state
    });

    if (usePairingCode && !satanic.authState.creds.registered) {
        const phoneNumber = await question(`
⣀⣤⣤⣶⣶⣶⣶⣦⣤⡀     
⢀⣀⣤⣤⣄⣶⣿⠟⠛⠉   ⢀⣹⣿⡇      
⢀⣤⣾⣿⡟⠛⠛⠛⠉    ⠒⠒⠛⠿⠿⠿⠶⣿⣷⣢⣄⡀ 
⢠⣿⡟⠉⠈⣻⣦  ⣠⡴⠶⢶⣄        ⠈⠙⠻⣮⣦
⢰⣿⠿⣿⡶⠾⢻⡿ ⠠⣿⣄⣠⣼⣿⡇ ⠈⠒⢶⣤⣤⣤⣤⣤⣴⣾⡿
⣾⣿ ⠉⠛⠒⠋   ⠻⢿⣉⣠⠟     ⠉⠻⣿⣋⠙⠉⠁ 
⣿⡿⠷⠲⢶⣄     ⣀⣤⣤⣀       ⠙⣷⣦   
⠛⠛⢿⣅⣀⣀⣀⣿⠶⠶⠶⢤⣾⠋  ⠙⣷⣄⣀⣀⣀⣀⡀ ⠘⣿⣆  
   ⠈⠉⠉⠉⠁    ⠈⠛⠛⠶⠾⠋⠉⠉⠉⠉⠉⠉⠉⠉⠛⠛⠛⠛ 
‹⧼ © AQUA- AI ⧽›
‹⧼ Version V2.0.0 ⧽›
=========================================
❖ Script by satanic ❖ 
Script premium only 65k 
jika ingin membeli script ini langsung hubungi kami: 083168758640
ada kendala silahkan hubungi nomor diatas
Jika kode pairing tidak muncul notifikasii, maka lansung input kode
ke perangkat tertaut yaa
KODE PAIRING : SATAGANZ 
BISA DI COSTUME DI SETTINGS JS
╭────────────────╼
╎Enter Your Number Here : 
╰────────────────╼`);
        const code = await satanic.requestPairingCode(phoneNumber, global.pairing);
        console.log(`
╭────────────────╼
╎ This Your Pairing Code : ${code}
╰────────────────╼`);
    }

    store.bind(satanic.ev);
    
    
    
    satanic.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && decode.user + '@' + decode.server || jid;
        } else return jid;
    };

    if (!store.presences) store.presences = {};

    satanic.ev.on('presence.update', (json) => {
        try {
            const participantId = json.id;
            if (participantId.includes('@g.us')) {
                if (!store.presences) store.presences = {};
                if (!store.presences[participantId]) store.presences[participantId] = {};
                if (json.presences && typeof json.presences === 'object') {
                    Object.entries(json.presences).forEach(([userJid, presence]) => {
                        store.presences[participantId][userJid] = presence;
                    });
                }
            }
        } catch (err) {}
    });

    satanic.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = satanic.decodeJid(contact.id);
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
        }
    });

    satanic.getName = async (jid) => {
        try {
            const id = satanic.decodeJid(jid);
            if (id.endsWith("@g.us")) {
                try {
                    const meta = await satanic.groupMetadata(id);
                    return meta.subject || meta.name || id.split('@')[0];
                } catch (e) {
                    return id.split('@')[0];
                }
            }
            let name = null;
            try {
                if (global.store?.contacts?.[id]) {
                    const contact = global.store.contacts[id];
                    name = contact.name || contact.pushname || contact.notify;
                }
            } catch (e) {}
            if (!name && satanic.contacts?.[id]) {
                const contact = satanic.contacts[id];
                name = contact.name || contact.pushname || contact.notify;
            }
            if (!name) {
                try {
                    const messages = await satanic.loadMessages(id, 5);
                    if (messages && messages.length > 0) {
                        for (let msg of messages) {
                            if (msg.pushName) { name = msg.pushName; break; }
                            if (msg.notifyName) { name = msg.notifyName; break; }
                            if (msg.verifiedName) { name = msg.verifiedName; break; }
                        }
                    }
                } catch (e) {}
            }
            if (!name && satanic.user) {
                const botId = satanic.decodeJid(satanic.user.id);
                if (id === botId) name = satanic.user.name || satanic.user.pushname;
            }
            if (!name) name = id.split('@')[0];
            return name;
        } catch (e) {
            console.error('Error in getName:', e);
            return jid.split('@')[0];
        }
    };

    setInterval(async () => {
        try {
            const now = Date.now();
            for (let x of sewa) {
                if (!x.id) continue;
                if (x.expired === "PERMANENT") continue;
                let timeLeft = x.expired - now;
                if (timeLeft <= 0) {
                    try {
                        await satanic.groupMetadata(x.id);
                        await satanic.sendMessage(x.id, { 
                            text: "⏳ *Masa Sewa Habis*\n\nWaktu sewa bot di grup ini telah berakhir. Bot akan keluar otomatis.\nTerima kasih telah menggunakan layanan kami! 🙏" 
                        });
                        await satanic.groupLeave(x.id);
                    } catch (e) {}
                } else if (timeLeft > 3000000 && timeLeft <= 3600000) {
                    try {
                        await satanic.groupMetadata(x.id);
                        await satanic.sendMessage(x.id, { 
                            text: "⚠️ *PERINGATAN MASA SEWA*\n\nMasa sewa bot di grup ini akan berakhir dalam waktu kurang dari *1 JAM*.\nSegera hubungi Owner jika ingin memperpanjang durasi." 
                        });
                    } catch (e) {}
                }
            }
            await remindSewa(satanic, sewa);
        } catch (e) {}
    }, 600000);

    function tanggal(date) {
        return date.toLocaleDateString('id-ID', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

 satanic.ev.on('group-participants.update', async (anu) => {
    console.log(anu);
    let chat = global.db.chats[anu.id] || {};
    try {
        let metadata = await satanic.groupMetadata(anu.id);
        let participants = anu.participants;
        let author = anu.author || (anu.participants && anu.participants[0]);
        for (let num of participants) {
            let mediaUrl, isVideo = false;
            
            if (anu.action == 'add') {
                if (chat.blacklist && global.db.blacklistUser && global.db.blacklistUser[anu.id] && global.db.blacklistUser[anu.id][num]) {
                    let data = global.db.blacklistUser[anu.id][num];
                    data.count = (data.count || 0) + 1;
                    let maxKick = chat.blacklistLimit || 3;
                    if (chat.blacklistWarn && data.count < maxKick) {
                        let teksWarn = `⚠️ *BLACKLIST WARNING* ⚠️\n\n@${num.split('@')[0]} terdeteksi keluar-masuk grup.\nKamu sudah keluar ${data.count}x dari grup ini.\nBatas maksimal: ${maxKick}x\n\nJika melebihi batas, kamu akan di-kick otomatis!`;
                        await satanic.sendMessage(anu.id, { text: teksWarn, mentions: [num] });
                    } else if (data.count >= maxKick) {
                        let teksKick = `*Kamu sudah pernah bergabung di dalam group dan berada di dalam data blacklist\n\n@${num.split('@')[0]} sudah keluar ${data.count}x dari grup.\nMelebihi batas maksimal (${maxKick}x), kamu di-kick!`;
                        await satanic.sendMessage(anu.id, { text: teksKick, mentions: [num] });
                        await satanic.groupParticipantsUpdate(anu.id, [num], 'remove');
                        delete global.db.blacklistUser[anu.id][num];
                        continue;
                    } else {
                        let teksKick = `🚫 *BLACKLIST KICK* 🚫\n\n@${num.split('@')[0]} terdeteksi keluar-masuk grup, langsung di-kick!`;
                        await satanic.sendMessage(anu.id, { text: teksKick, mentions: [num] });
                        await satanic.groupParticipantsUpdate(anu.id, [num], 'remove');
                        delete global.db.blacklistUser[anu.id][num];
                        continue;
                    }
                }
                
                if (!chat.welcome) continue;
                let setting = chat.welcomeSetting || {};
                if (setting.type === 'video') {
                    mediaUrl = setting.url || global.welcomeVideo || 'https://c.termai.cc/i191/zZjmX.png';
                    isVideo = true;
                } else {
                    mediaUrl = setting.url || global.welcomeImage || 'https://c.termai.cc/i191/zZjmX.png';
                    isVideo = false;
                }
                let teks = (chat.setWelcome || satanic.setWelcome || 'Welcome @user')
                    .replace(/@subject/g, `${metadata.subject}`)
                    .replace(/@admin/g, author ? `@${author.split('@')[0]}` : 'Admin')
                    .replace(/@user/g, `@${num.split('@')[0]}`)
                    .replace(/\u2068/g, '')
                    .replace(/\u2069/g, '')
                    .replace(/@date/g, `${tanggal(new Date())}`)
                    .replace(/@desc/g, `${metadata.desc ? metadata.desc.toString() : 'No description'}`);
                if (isVideo) {
                    satanic.sendMessage(anu.id, { video: { url: mediaUrl }, caption: teks, mentions: [num, author].filter(Boolean) });
                } else {
                    satanic.sendMessage(anu.id, { image: { url: mediaUrl }, caption: teks, mentions: [num, author].filter(Boolean) });
                }
                
            } else if (anu.action == 'remove') {
                if (chat.blacklist) {
                    let isSelfLeave = !anu.author || anu.author === num;
                    if (isSelfLeave) {
                        if (!global.db.blacklistUser) global.db.blacklistUser = {};
                        if (!global.db.blacklistUser[anu.id]) global.db.blacklistUser[anu.id] = {};
                        if (!global.db.blacklistUser[anu.id][num]) {
                            global.db.blacklistUser[anu.id][num] = { count: 1, firstLeave: Date.now() };
                        } else {
                            global.db.blacklistUser[anu.id][num].count = (global.db.blacklistUser[anu.id][num].count || 0) + 1;
                        }
                    }
                }
                
                if (!chat.left) continue;
                let setting = chat.leftSetting || {};
                if (setting.type === 'video') {
                    mediaUrl = setting.url || global.leftVideo || 'https://c.termai.cc/i191/zZjmX.png';
                    isVideo = true;
                } else {
                    mediaUrl = setting.url || global.leftImage || 'https://c.termai.cc/i191/zZjmX.png';
                    isVideo = false;
                }
                let teks = (chat.setLeft || satanic.setLeft || 'Goodbye @user')
                    .replace(/@subject/g, `${metadata.subject}`)
                    .replace(/@admin/g, author ? `@${author.split('@')[0]}` : 'Admin')
                    .replace(/@user/g, `@${num.split('@')[0]}`)
                    .replace(/@date/g, `${tanggal(new Date())}`)
                    .replace(/@desc/g, `${metadata.desc ? metadata.desc.toString() : 'No description'}`);
                if (isVideo) {
                    satanic.sendMessage(anu.id, { video: { url: mediaUrl }, caption: teks, mentions: [num, author].filter(Boolean) });
                } else {
                    satanic.sendMessage(anu.id, { image: { url: mediaUrl }, caption: teks, mentions: [num, author].filter(Boolean) });
                }
                
            } else if (anu.action == 'promote') {
                if (!chat.notifpromote) continue;
                let teks = (chat.setPromote || satanic.setPromote || 'Promote @user')
                    .replace(/@subject/g, `${metadata.subject}`)
                    .replace(/@admin/g, author ? `@${author.split('@')[0]}` : 'Admin')
                    .replace(/@user/g, `@${num.split('@')[0]}`)
                    .replace(/@date/g, `${tanggal(new Date())}`)
                    .replace(/@desc/g, `${metadata.desc ? metadata.desc.toString() : 'No description'}`);
                satanic.sendMessage(anu.id, { text: teks, mentions: [num, author].filter(Boolean) });
                
            } else if (anu.action == 'demote') {
                if (!chat.notifdemote) continue;
                let teks = (chat.setDemote || satanic.setDemote || 'Demote @user')
                    .replace(/@subject/g, `${metadata.subject}`)
                    .replace(/@admin/g, author ? `@${author.split('@')[0]}` : 'Admin')
                    .replace(/@user/g, `@${num.split('@')[0]}`)
                    .replace(/@date/g, `${tanggal(new Date())}`)
                    .replace(/@desc/g, `${metadata.desc ? metadata.desc.toString() : 'No description'}`);
                satanic.sendMessage(anu.id, { text: teks, mentions: [num, author].filter(Boolean) });
            }
        }
    } catch (err) {
        console.log(err);
    }
});


    satanic.setWelcome = '```Welcome To @subject```\n─────────────────\n```Name : @user```\n```Date : @date```\n```jangan lupa intro ya kak, ketik .intro untuk mengambil card intro```\n─────────────────\n@desc';
    satanic.setLeft = '```Goodbye ``` 👋\n─────────────────\n```Name : @user```\n```Date : @date```\n\nLeaving From @subject';
    satanic.setPromote = '```🎉 PROMOTE```\n─────────────────\n```Name : @user```\n```Date : @date```\n\nSelamat @user sekarang jadi admin di @subject 🎊\n─────────────────\n@desc';

satanic.setPromote = '```🎉 PROMOTE```\n─────────────────\n```Admin : @admin```\n```User  : @user```\n```Date  : @date```\n\n@admin telah mempromosikan @user jadi admin di @subject 🎊\n─────────────────\n@desc';

satanic.setDemote = '```📉 DEMOTE```\n─────────────────\n```Admin : @admin```\n```User  : @user```\n```Date  : @date```\n\n@admin telah mencabut admin @user di @subject\n─────────────────\n@desc';

    satanic.ev.on("messages.upsert", async (chatUpdate) => {
        try {
            const mek = chatUpdate.messages[0];
            if (!mek?.message) return;
            if (Object.keys(mek.message)[0] === 'ephemeralMessage') {
                mek.message = mek.message.ephemeralMessage.message;
            }
            if (mek.key?.remoteJid === 'status@broadcast') return;
            const sender = mek.key.fromMe ? 
                (satanic.user?.id ? (typeof satanic.user.id === 'string' ? satanic.user.id.split(":")[0] + "@s.whatsapp.net" : satanic.user.id) : "") : 
                (mek.key.participant || mek.key.remoteJid || "");

const isCreator = [...ownerData, global.owner, global.nobot]
    .filter(Boolean)
    .map(v => v.includes('@') 
        ? v 
        : v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
    .includes(sender);
            if (!satanic.public && !mek.key.fromMe && !isCreator && chatUpdate.type === 'notify') return;
            if (mek.key.id.startsWith('BAE5') || mek.key.id.startsWith('FatihArridho_')) return;
            try {
                const m = smsg(satanic, mek, store);
                await require("./satanic")(satanic, m, chatUpdate, store);
            } catch (err) {
                console.error(chalk.red('❌ Message processing error:'), err);
            }
        } catch (err) {
            console.error(chalk.red('❌ Messages.upsert error:'), err);
        }
    });

    satanic.public = true;
handleConnection(satanic);



    satanic.sendFile = async (jid, path, filename = '', caption = '', quoted = null, options = {}) => {
        try {
            let buffer;
            if (Buffer.isBuffer(path)) {
                buffer = path;
            } else if (typeof path === 'string') {
                if (/^data:.*?\/.*?;base64,/i.test(path)) {
                    buffer = Buffer.from(path.split`,`[1], 'base64');
                } else if (/^https?:\/\//.test(path)) {
                    buffer = await getBuffer(path);
                } else if (fs.existsSync(path)) {
                    buffer = fs.readFileSync(path);
                } else {
                    throw new Error('Invalid file path');
                }
            } else {
                throw new Error('Invalid input');
            }
            let fileType = await FileType.fromBuffer(buffer);
            let mime = fileType ? fileType.mime : 'application/octet-stream';
            let extension = fileType ? fileType.ext : 'bin';
            if (!filename) {
                if (typeof path === 'string' && !/^(data:|https?:\/\/)/.test(path)) {
                    filename = path.split('/').pop().split('\\').pop();
                } else {
                    filename = `file_${Date.now()}.${extension}`;
                }
            }
            let messageType, messageContent = {};
            if (mime.startsWith('image/')) {
                messageType = 'imageMessage';
                messageContent = { image: buffer, caption: caption || '', fileName: filename, mimetype: mime, ...options };
            } else if (mime.startsWith('video/')) {
                messageType = 'videoMessage';
                messageContent = { video: buffer, caption: caption || '', fileName: filename, mimetype: mime, ...options };
            } else if (mime.startsWith('audio/')) {
                messageType = 'audioMessage';
                messageContent = { audio: buffer, mimetype: mime, fileName: filename, ...options };
            } else {
                messageType = 'documentMessage';
                messageContent = { document: buffer, fileName: filename, mimetype: mime, caption: caption || '', ...options };
            }
            const media = await prepareWAMessageMedia(messageContent, {
                upload: satanic.waUploadToServer,
                mediaType: messageType.replace('Message', '').toLowerCase()
            });
            return await satanic.sendMessage(jid, media, { quoted });
        } catch (err) {
            console.error('Error in sendFile:', err);
            throw err;
        }
    };

    satanic.autoReadSW = async (m) => {
        if (!global.autoreadsw) return;
        try {
            if (m.key && m.key.remoteJid === 'status@broadcast') {
                await satanic.readMessages([m.key]);
                console.log('📱 Auto read status');
            }
        } catch (e) {}
    };

    satanic.autoReactSW = async (m) => {
        if (!global.autoreactsw) return;
        try {
            if (m.key && m.key.remoteJid === 'status@broadcast') {
                const reaction = { react: { text: global.autoreactemoji, key: m.key } };
                await satanic.sendMessage(m.key.remoteJid, reaction);
                console.log(`😀 Auto reacted to status with ${global.autoreactemoji}`);
            }
        } catch (e) {
            console.error('Auto react error:', e);
        }
    };

    async function getMessage(key) { return null; }

    satanic.ev.on('messages.update', async chatUpdate => {
        for (const { key, update } of chatUpdate) {
            if (update.pollUpdates && !key.fromMe) {
                const pollCreation = await getMessage(key);
                if (pollCreation) {
                    const pollUpdate = await getAggregateVotesInPollMessage({
                        message: pollCreation,
                        pollUpdates: update.pollUpdates,
                    });
                    var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name;
                    if (toCmd == undefined) return;
                    var prefCmd = prefix + toCmd;
                    satanic.appenTextMessage(prefCmd, chatUpdate);
                }
            }
        }
    });

    if (!satanic.chats) satanic.chats = {};

    satanic.ev.on('groups.update', async function groupUpdatePushToDb(groupsUpdates) {
        if (!Array.isArray(groupsUpdates)) return;
        for (const update of groupsUpdates) {
            try {
                if (!update || !update.id) continue;
                const id = satanic.decodeJid(update.id);
                if (!id || !id.endsWith('@g.us')) continue;
                if (!satanic.chats[id]) satanic.chats[id] = { id: id };
                let chats = satanic.chats[id];
                chats.isChats = true;
                const metadata = await satanic.groupMetadata(id).catch(() => null);
                if (metadata) {
                    chats.subject = metadata.subject;
                    chats.metadata = metadata;
                }
            } catch (error) {}
        }
    });

    satanic.sendStatusMention = async (content, jids = []) => {
        let users;
        for (let id of jids) {
            let userId = await satanic.groupMetadata(id);
            users = await userId.participants.map(u => satanic.decodeJid(u.id));
        }
        let message = await satanic.sendMessage("status@broadcast", content, {
            backgroundColor: "F54242",
            font: Math.floor(Math.random() * 9),
            statusJidList: users,
            additionalNodes: [
                { tag: "meta", attrs: {}, content: [{ tag: "mentioned_users", attrs: {}, content: jids.map((jid) => ({ tag: "to", attrs: { jid }, content: undefined })) }] }
            ]
        });
        jids.forEach(id => {
            satanic.relayMessage(id, {
                groupStatusMentionMessage: {
                    message: {
                        protocolMessage: {
                            key: message.key,
                            type: 25,
                        },
                    },
                },
            }, {
                userJid: satanic.user.jid,
                additionalNodes: [{ tag: "meta", attrs: { is_status_mention: "true" }, content: undefined }]
            });
            delay(2500);
        });
        return message;
    };

    satanic.getFile = async (message, returnBuffer = true, savePath = '') => {
        try {
            if (!message || (!message.msg && !message.message)) throw new Error('Invalid message');
            const m = message.msg || message.message;
            let mime, messageType, filename;
            if (m.imageMessage) {
                mime = m.imageMessage.mimetype;
                messageType = 'image';
                filename = m.imageMessage.fileName || `image_${Date.now()}`;
            } else if (m.videoMessage) {
                mime = m.videoMessage.mimetype;
                messageType = 'video';
                filename = m.videoMessage.fileName || `video_${Date.now()}`;
            } else if (m.audioMessage) {
                mime = m.audioMessage.mimetype;
                messageType = 'audio';
                filename = m.audioMessage.fileName || `audio_${Date.now()}`;
            } else if (m.documentMessage) {
                mime = m.documentMessage.mimetype;
                messageType = 'document';
                filename = m.documentMessage.fileName || `document_${Date.now()}`;
            } else if (m.stickerMessage) {
                mime = m.stickerMessage.mimetype;
                messageType = 'sticker';
                filename = `sticker_${Date.now()}`;
            } else {
                throw new Error('Unsupported message type');
            }
            const stream = await downloadContentFromMessage(m, messageType);
            let buffer = Buffer.from([]);
            for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
            const fileType = await FileType.fromBuffer(buffer);
            let extension = 'bin';
            if (fileType) extension = fileType.ext;
            else if (mime) extension = mime.split('/')[1]?.split(';')[0] || 'bin';
            if (filename && !filename.includes('.')) filename = `${filename}.${extension}`;
            if (savePath) {
                const fullPath = savePath.endsWith('/') ? savePath + filename : savePath;
                fs.writeFileSync(fullPath, buffer);
                console.log(`File saved to: ${fullPath}`);
            }
            if (returnBuffer) {
                return { buffer, filename, mime, extension, size: buffer.length };
            } else {
                return { path: savePath ? (savePath.endsWith('/') ? savePath + filename : savePath) : null, filename, mime, extension, size: buffer.length };
            }
        } catch (err) {
            console.error('Error in getFile:', err);
            throw err;
        }
    };

    satanic.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype;
        if (options.readViewOnce) {
            message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined);
            vtype = Object.keys(message.message.viewOnceMessage.message)[0];
            delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined));
            delete message.message.viewOnceMessage.message[vtype].viewOnce;
            message.message = { ...message.message.viewOnceMessage.message };
        }
        let mtype = Object.keys(message.message)[0];
        let content = await generateForwardMessageContent(message, forceForward);
        let ctype = Object.keys(content)[0];
        let context = {};
        if (mtype != "conversation") context = message.message[mtype].contextInfo;
        content[ctype].contextInfo = { ...context, ...content[ctype].contextInfo };
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? { contextInfo: { ...content[ctype].contextInfo, ...options.contextInfo } } : {})
        } : {});
        await satanic.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id });
        return waMessage;
    };

    satanic.sendTextWithMentions = async (jid, text, quoted, options = {}) => satanic.sendMessage(jid, {
        text: text,
        mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
        ...options
    }, { quoted });

    satanic.sendText = async (jid, text, quoted = '', options) => {
        satanic.sendMessage(jid, { text: text, ...options }, { quoted });
    };

    satanic.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || '';
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
        const stream = await downloadContentFromMessage(message, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
        return buffer;
    };

    satanic.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? 
            path : /^data:.*?\/.*?;base64,/i.test(path) ?
            Buffer.from(path.split`, `[1], 'base64') : /^https?:\/\//.test(path) ?
            await (await getBuffer(path)) : fs.existsSync(path) ? 
            fs.readFileSync(path) : Buffer.alloc(0);
        let buffer;
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options);
        } else {
            buffer = await addExif(buff);
        }
        await satanic.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted });
        return buffer;
    };

    satanic.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message;
        let mime = (message.msg || message).mimetype || "";
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, "") : mime.split("/")[0];
        const stream = await downloadContentFromMessage(quoted, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
        let type = await FileType.fromBuffer(buffer);
        let trueFileName = attachExtension ? filename + "." + type.ext : filename;
        await fs.writeFileSync(trueFileName, buffer);
        return trueFileName;
    };

    satanic.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? 
            path : /^data:.*?\/.*?;base64,/i.test(path) ?
            Buffer.from(path.split`, `[1], 'base64') : /^https?:\/\//.test(path) ?
            await (await getBuffer(path)) : fs.existsSync(path) ? 
            fs.readFileSync(path) : Buffer.alloc(0);
        let buffer;
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options);
        } else {
            buffer = await videoToWebp(buff);
        }
        await satanic.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted });
        return buffer;
    };
    
    satanic.albumMessage = async (jid, array, quoted) => {
        const album = generateWAMessageFromContent(jid, {
            messageContextInfo: { messageSecret: crypto.randomBytes(32) },
            albumMessage: {
                expectedImageCount: array.filter((a) => a.hasOwnProperty("image")).length,
                expectedVideoCount: array.filter((a) => a.hasOwnProperty("video")).length,
            },
        }, {
            userJid: satanic.user.jid,
            quoted,
            upload: satanic.waUploadToServer
        });
        await satanic.relayMessage(jid, album.message, { messageId: album.key.id });
        for (let content of array) {
            const img = await generateWAMessage(jid, content, { upload: satanic.waUploadToServer });
            img.message.messageContextInfo = {
                messageSecret: crypto.randomBytes(32),
                messageAssociation: {
                    associationType: 1,
                    parentMessageKey: album.key,
                },
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast",
                forwardingScore: 99999,
                isForwarded: true,
                mentionedJid: [jid],
                starred: true,
                labels: ["Y", "Important"],
                isHighlighted: true,
                businessMessageForwardInfo: { businessOwnerJid: jid },
                dataSharingContext: { showMmDisclosure: true },
            };
            img.message.forwardedNewsletterMessageInfo = {
                newsletterJid: "0@newsletter",
                serverMessageId: 1,
                newsletterName: `WhatsApp`,
                contentType: 1,
                timestamp: new Date().toISOString(),
                senderName: "✧ Dittsans",
                content: "Text Message",
                priority: "high",
                status: "sent",
            };
            img.message.disappearingMode = {
                initiator: 3,
                trigger: 4,
                initiatorDeviceJid: jid,
                initiatedByExternalService: true,
                initiatedByUserDevice: true,
                initiatedBySystem: true,
                initiatedByServer: true,
                initiatedByAdmin: true,
                initiatedByUser: true,
                initiatedByApp: true,
                initiatedByBot: true,
                initiatedByMe: true,
            };
            await satanic.relayMessage(jid, img.message, {
                messageId: img.key.id,
                quoted: {
                    key: {
                        remoteJid: album.key.remoteJid,
                        id: album.key.id,
                        fromMe: true,
                        participant: satanic.user.jid,
                    },
                    message: album.message,
                },
            });
        }
        return album;
    };

    satanic.sendStatusMention = async (content, jids = []) => {
        let users;
        for (let id of jids) {
            let userId = await satanic.groupMetadata(id);
            users = await userId.participants.map(u => satanic.decodeJid(u.id));
        }
        let message = await satanic.sendMessage("status@broadcast", content, {
            backgroundColor: "#000000",
            font: Math.floor(Math.random() * 9),
            statusJidList: users,
            additionalNodes: [
                { tag: "meta", attrs: {}, content: [{ tag: "mentioned_users", attrs: {}, content: jids.map((jid) => ({ tag: "to", attrs: { jid }, content: undefined })) }] }
            ]
        });
        jids.forEach(id => {
            satanic.relayMessage(id, {
                groupStatusMentionMessage: {
                    message: {
                        protocolMessage: {
                            key: message.key,
                            type: 25,
                        },
                    },
                },
            }, {
                userJid: satanic.user.jid,
                additionalNodes: [{ tag: "meta", attrs: { is_status_mention: "true" }, content: undefined }]
            });
            delay(2500);
        });
        return message;
    };

    satanic.ev.on('creds.update', saveCreds);
    return satanic;
}

Starts();

process.on('uncaughtException', (err) => {
    console.log('[FATAL] Uncaught Exception:', err.message);
    console.log(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('[FATAL] Unhandled Rejection:', reason);
});



let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
    require('fs').unwatchFile(file);
    console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
    delete require.cache[file];
    require(file);
});