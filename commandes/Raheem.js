const { zokou } = require(__dirname + "/../framework/zokou");
const conf = require(__dirname + "/../set");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou({
  nomCom: "menu",
  categorie: "General"
}, async (msg, sock, info) => {
  let { ms, repondre, prefixe } = info;
  let { cm } = require(__dirname + "/../framework/zokou");

  let mode = s.MODE.toLowerCase() === "yes" ? "Public" : "Private";
  let grouped = {};

  // Group commands by category
  for (const command of cm) {
    if (!grouped[command.categorie]) grouped[command.categorie] = [];
    grouped[command.categorie].push(command.nomCom);
  }

  moment.tz.setDefault("Africa/Dar_es_Salaam");
  const time = moment().format("HH:mm:ss");
  const date = moment().format("DD/MM/YYYY");

  // Header text
  let header = `╭─「 *RAHEEM XMD* 」
│👤 *User:* ${msg.pushName || "Guest"}
│📆 *Date:* ${date}
│⏰ *Time:* ${time}
│📟 *Mode:* ${mode}
│🔢 *Total Commands:* ${cm.length}
╰───────────────⬣\n\n`;

  // Command list
  let commandText = "";
  for (const category in grouped) {
    commandText += `┌─「 *${category.toUpperCase()}* 」\n`;
    for (const name of grouped[category]) {
      commandText += `│ ➤ ${prefixe}${name}\n`;
    }
    commandText += `└─────────────⬣\n\n`;
  }

  const menuText = header + readmore + commandText + "> 🤖 *RAHEEM XMD – Smart Assistant Ready to Help You!*";

  try {
    // Send video menu
    await sock.sendMessage(msg.from, {
      video: { url: "https://files.catbox.moe/bkovq3.mp4" },
      caption: menuText,
      gifPlayback: true,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "RAHEEM XMD",
          body: "Follow the official channel for updates",
          thumbnailUrl: null,
          sourceUrl: "https://whatsapp.com/channel/0029VbAffhD2ZjChG9DX922r",
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: ms });

    // Send PTT voice note
    await sock.sendMessage(msg.from, {
      audio: { url: "https://files.catbox.moe/imdqpy.mp3" },
      mimetype: "audio/mpeg",
      ptt: true,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "RAHEEM XMD",
          body: "Your smart WhatsApp assistant",
          mediaType: 1,
          thumbnailUrl: null,
          sourceUrl: "https://whatsapp.com/channel/0029VbAffhD2ZjChG9DX922r"
        }
      }
    }, { quoted: ms });

  } catch (err) {
    console.log("❌ Menu Error: " + err);
    repondre("❌ Failed to load menu. Error: " + err.message);
  }
});
