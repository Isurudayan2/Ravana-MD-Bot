import ytdl from "@distube/ytdl-core";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function ytDownload(sock, m, args) {
  try {
    if (!args[0]) {
      await sock.sendMessage(m.key.remoteJid, { text: "🎥 *Please provide a YouTube link!*" });
      return;
    }

    const url = args[0];
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, "");
    const outputPath = path.join(__dirname, `${title}.mp4`);

    await sock.sendMessage(m.key.remoteJid, { text: `⬇️ Downloading *${title}*...` });

    const stream = ytdl(url, { quality: "highestvideo" }).pipe(fs.createWriteStream(outputPath));

    stream.on("finish", async () => {
      const fileBuffer = fs.readFileSync(outputPath);

      await sock.sendMessage(m.key.remoteJid, {
        video: fileBuffer,
        caption: `✅ *Download Complete!*\n🎬 ${title}`,
      });

      fs.unlinkSync(outputPath);
    });

    stream.on("error", async (err) => {
      console.error(err);
      await sock.sendMessage(m.key.remoteJid, { text: "❌ Error downloading video!" });
    });
  } catch (err) {
    console.error(err);
    await sock.sendMessage(m.key.remoteJid, { text: "⚠️ Invalid YouTube link or error occurred." });
  }
}
