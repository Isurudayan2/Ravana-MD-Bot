import fetch from "node-fetch";

/**
 * Facebook Video Downloader Plugin
 * Command: !fb <Facebook video link>
 */
export default async function fbDownload(sock, msg, args) {
  try {
    if (!args[0]) {
      await sock.sendMessage(msg.key.remoteJid, { text: "❗ Use: !fb <Facebook video link>" });
      return;
    }

    const url = args[0];
    const api = `https://api.ssscrape.com/fb?url=${encodeURIComponent(url)}`;

    await sock.sendMessage(msg.key.remoteJid, { text: "⬇️ Downloading Facebook video..." });

    const res = await fetch(api);
    const data = await res.json();

    if (!data || !data.url) {
      await sock.sendMessage(msg.key.remoteJid, { text: "⚠️ Couldn't fetch Facebook video! Try another link." });
      return;
    }

    await sock.sendMessage(msg.key.remoteJid, {
      video: { url: data.url },
      caption: "✅ Facebook video download complete!",
    });
  } catch (err) {
    console.error("Facebook Error:", err);
    await sock.sendMessage(msg.key.remoteJid, { text: "❌ Failed to download Facebook video!" });
  }
}
