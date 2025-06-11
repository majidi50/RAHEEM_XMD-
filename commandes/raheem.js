const { zokou } = require(__dirname + "/../framework/zokou");
const conf = require(__dirname + "/../set");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou({
  nomCom: "menu",
  categorie: "General"
}, async (_msg, sock, data) => {
  let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = data;
  let { cm } = require(__dirname + "/../framework/zokou");

  let mode = s.MODE.toLowerCase() === "yes" ? "Public" : "Private";
  let grouped = {};

  for (const command of cm) {
    if (!grouped[command.categorie]) grouped[command.categorie] = [];
    grouped[command.categorie].push(command.nomCom);
  }

  moment.tz.setDefault("Africa/Dar_es_Salaam");
  const time = moment().format("HH:mm:ss");
  const date = moment().format("DD/MM/YYYY");

  let header = `╭─「 *RAHEEM XMD* 」
│👤 *User:* ${nomAuteurMessage || "Guest"}
│📆 *Date:* ${date}
│⏰ *Time:* ${time}
│📟 *Mode:* ${mode}
│🔢 *Total Commands:* ${cm.length}
╰───────────────⬣\n\n`;

  let commandText = "";
  for (const category in grouped) {
    commandText += `┌─「 *${category.toUpperCase()}* 」\n`;
    for (const name of grouped[category]) {
      commandText += `│ ➤ ${prefixe}${name}\n`;
    }
    commandText += `└─────────────⬣\n\n`;
  }

  const fullMenu = header + readmore + commandText + "> 🤖 *RAHEEM XMD – Smart Assistant Ready to Help You!*";

  const chatId = ms.key.remoteJid; // Safely use remoteJid

  try {
    await sock.sendMessage(chatId, {
      video: { url: "https://files.catbox.moe/bkovq3.mp4" },
      caption: fullMenu,
      gifPlayback: true,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "RAHEEM XMD",
          body: "Follow the official channel for updates",
          sourceUrl: "https://whatsapp.com/channel/0029VbAffhD2ZjChG9DX922r",
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: ms });

    await sock.sendMessage(chatId, {
      audio: { url: "https://files.catbox.moe/imdqpy.mp3" },
      mimetype: "audio/mpeg",
      ptt: true,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "RAHEEM XMD",
          body: "Your smart WhatsApp assistant",
          sourceUrl: "https://whatsapp.com/channel/0029VbAffhD2ZjChG9DX922r",
          mediaType: 1
        }
      }
    }, { quoted: ms });

  } catch (err) {
    console.log("❌ Menu Error: " + err);
    repondre("❌ Failed to load menu. Error: " + err.message);
  }
});
