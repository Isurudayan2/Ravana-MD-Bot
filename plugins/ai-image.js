import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || fs.readFileSync("key.txt", "utf8").trim(),
});

export async function handleAIImage(sock, from, text) {
  try {
    // 🧠 Prompt eke "image:" kiyala patan gannawa da kiyala check karanawa
    if (!text.toLowerCase().startsWith("image:")) return;

    const prompt = text.replace(/^image:/i, "").trim();
    if (!prompt) {
      await sock.sendMessage(from, { text: "🖼️ කරුණාකර prompt එකක් දෙන්න (උදා: image: a lion in rain)" });
      return;
    }

    await sock.sendMessage(from, { text: `🎨 රූපය සාදමින් පවතී... (${prompt})` });

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024",
    });

    const imageUrl = result.data[0].url;
    await sock.sendMessage(from, { image: { url: imageUrl }, caption: `✅ ${prompt}` });

    console.log("🖼️ AI Image sent successfully!");
  } catch (err) {
    console.error("❌ AI Image Error:", err);
    await sock.sendMessage(from, { text: `😢 Image AI error: ${err.message}` });
  }
}
