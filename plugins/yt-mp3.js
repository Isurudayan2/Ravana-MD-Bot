import ytdl from "ytdl-core";
import fs from "fs";
import { exec } from "child_process";

export async function handleYouTubeMP3(sock, from, text) {
  try {
    if (!text.toLowerCase().startsWith("song:")) return;

    const url = text.replace(/^song:/i, "").trim();
    if (!ytdl.validateURL(url)) {
      await sock.sendMessage(from, { text: "❌ කරුණාකර වලංගු YouTube ලින්ක් එකක් දෙන්න.\nඋදා: song: https://youtu.be/abc123" });
      return;
    }

    await sock.sendMessage(from, { text: "🎵 ගීතය බාගැනෙමින් පවතී... මිනිත්තු කිහිපයක් ගතවිය හැක" });

    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, "");
    const filePath = `/tmp/${title}.mp3`;

    const stream = ytdl(url, { filter: "audioonly", quality: "highestaudio" })
      .pipe(fs.createWriteStream(filePath));

    stream.on("finish", async () => {
      await sock.sendMessage(from, { audio: { url: filePath }, mimetype: "audio/mp4", ptt: false });
      await sock.sendMessage(from, { text: `✅ ${title} ගීතය සාර්ථකව බාගන්නා ලදි!` });

      fs.unlinkSync(filePath); // remove temp file
      console.log("🎶 Sent:", title);
    });
  } catch (err) {
    console.error("❌ YouTube MP3 Error:", err);
    await sock.sendMessage(from, { text: `😢 Error: ${err.message}` });
  }
}
