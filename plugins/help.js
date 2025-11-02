/**
 * Ravana-MD-Bot Help / Menu Plugin
 * Shows available bot commands and features.
 */

export default async function help(sock, msg, args) {
  try {
    const helpText = `
🌀 *Ravana-MD Bot Menu* 🌀
───────────────────────────
🎥 *Video & Media Tools:*
• !yt <url> - Download YouTube video
• !tiktok <url> - Download TikTok video
• !fb <url> - Download Facebook video
• !song <name> - Download MP3 song

🤖 *AI Tools:*
• !ai <prompt> - Get AI response (Sinhala/English)
• !aivideo <prompt> - Generate AI video 🎬
• Auto Sinhala Reply - Chat naturally in Sinhala 🇱🇰

📜 *Bot Info:*
• !help - Show this menu
• Developer: *Isuru Dayan*
• Version: *1.0.0 Ravana-MD-Bot*

───────────────────────────
🛠️ Powered by: *Baileys + Node.js + OpenAI*
  `;

    await sock.sendMessage(msg.key.remoteJid, { text: helpText });
  } catch (err) {
    console.error("Help Plugin Error:", err);
  }
}
