import fs from "fs";
import OpenAI from "openai";

/**
 * AI Video Generation Plugin
 * Command: !aivideo <prompt>
 * Example: !aivideo A Sri Lankan girl walking in the rain
 */

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function aiVideo(sock, msg, args) {
  try {
    const prompt = args.join(" ");
    if (!prompt) {
      await sock.sendMessage(msg.key.remoteJid, { text: "❗ Use: !aivideo <prompt>" });
      return;
    }

    await sock.sendMessage(msg.key.remoteJid, {
      text: `🎬 Generating AI video for: *${prompt}* ... (This may take 1–2 minutes)`,
    });

    const video = await openai.videos.generate({
      model: "gpt-4o-mini",
      prompt,
      duration: "short",
    });

    const buffer = Buffer.from(video.data, "base64");
    const filename = "./temp/aivideo.mp4";
    fs.writeFileSync(filename, buffer);

    await sock.sendMessage(msg.key.remoteJid, {
      video: { url: filename },
      caption: `✨ AI Video generated for: ${prompt}`,
    });
  } catch (err) {
    console.error("AI Video Error:", err);
    await sock.sendMessage(msg.key.remoteJid, {
      text: "❌ Failed to generate AI video! Check your OpenAI key.",
    });
  }
}
