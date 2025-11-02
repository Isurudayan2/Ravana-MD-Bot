import axios from "axios";
import fs from "fs";
import path from "path";

export async function handleFacebook(sock, from, text) {
  try {
    if (!text.toLowerCase().startsWith("fb:")) return;

    const url = text.replace(/^fb:/i, "").trim();
    if (!url.includes("facebook.com") && !url.includes("fb.watch")) {
      await sock.sendMessage(from, { text: "❌ කරුණාකර වලංගු Facebook ලින්ක් එකක් දෙන්න.\nඋදා: fb: https://fb.watch/xyz123" });
      return;
    }

    await sock.sendMessage(from, { text: "📥 Facebook වීඩියෝව බාගැනෙමින් පවතී..." });

    const apiURL = `https://api.vreden.my.id/api/facebook?url=${encodeURIComponent(url)}`;
    const res = await axios.get(apiURL);
    if (!res.data || !res.data.result?.hd) {
      await sock.sendMessage(from, { text: "⚠️ වීඩියෝව බාගන්න නොහැකි විය. වෙනත් ලින්ක් එකක් උත්සහ කරන්න." });
      return;
    }

    const videoUrl = res.data.result.hd;
    const filename = path.join("/tmp", `fb_${Date.now()}.mp4`);
    const video = await axios.get(videoUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(filename, video.data);

    await sock.sendMessage(from, { video: { url: filename }, caption: "✅ Facebook වීඩියෝව සාර්ථකව බාගන්නා ලදි!" });

    fs.unlinkSync(filename);
  } catch (err) {
    console.error("❌ Facebook Error:", err);
    await sock.sendMessage(from, { text: `😢 Error: ${err.message}` });
  }
}
