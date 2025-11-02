import fetch from "node-fetch";

/**
 * TikTok Downloader Plugin
 * Command: !tiktok <TikTok URL>
 */
export default async function tiktokDownload(sock, msg, args) {
  try {
    if (!args[0]) {
      await sock.sendMessage(msg.key.remoteJid, { text: "❗ Use: !tiktok <TikTok video link>" });
      return;
    }

    const url = args[0];
    const api = `https://api.douyin.wtf/api?url=${encodeURIComponent(url)}`;

    const res = await fetch(api);
    const data = await res.json();

    if (!data || !data.video_data || !data.video_data.url_list) {
      await sock.sendMessage(msg.key.remoteJid, { text: "⚠️ Couldn't fetch video. Try another link!" });
      return;
    }

    const videoUrl = data.video_data.url_list[0];
    await sock.sendMessage(msg.key.remoteJid, { text: "⬇️ Downloading TikTok video..." });

    await sock.sendMessage(msg.key.remoteJid, {
      video: { url: videoUrl },
      caption: "✅ Here's your TikTok video!",
    });
  } catch (err) {
    console.error("TikTok Error:", err);
    await sock.sendMessage(msg.key.remoteJid, { text: "❌ Failed to download TikTok video!" });
  }
}
