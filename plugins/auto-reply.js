import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Sinhala AI Auto-Reply Plugin
 * Automatically replies in Sinhala to user messages.
 */
export default async function autoReply(sock, msg, args) {
  try {
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text;
    if (!text) return;

    // Avoid infinite loops (bot replying to itself)
    if (msg.key.fromMe) return;

    // Show typing status
    await sock.sendPresenceUpdate("composing", msg.key.remoteJid);

    // Generate Sinhala AI reply
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a friendly Sinhala AI assistant who replies in pure Sinhala only." },
        { role: "user", content: text },
      ],
    });

    const aiReply = response.choices[0].message.content;

    // Send reply
    await sock.sendMessage(msg.key.remoteJid, { text: aiReply });

  } catch (err) {
    console.error("Auto-Reply Error:", err);
    await sock.sendMessage(msg.key.remoteJid, {
      text: "⚠️ Sinhala AI auto-reply failed. Check your OpenAI key!",
    });
  }
}
