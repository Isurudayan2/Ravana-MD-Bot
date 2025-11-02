/**
 * Ravana-MD-Bot AI Chat Plugin
 * Uses OpenAI API to reply to user messages in Sinhala/English.
 */

import OpenAI from "openai";
import fs from "fs";

const OPENAI_KEY = fs.readFileSync("key.txt", "utf8").trim();
const openai = new OpenAI({ apiKey: OPENAI_KEY });

export default async function ai(sock, msg, args) {
  try {
    const prompt = args.join(" ");
    if (!prompt)
      return await sock.sendMessage(msg.key.remoteJid, {
        text: "🧠 Please enter a prompt!\nExample: *!ai mata adare gena katha karapan* ❤️",
      });

    // Generate AI response
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Ravana-MD, a friendly Sinhala-English WhatsApp AI assistant. Reply naturally, short and emotional when needed.",
        },
        { role: "user", content: prompt },
      ],
    });

    const reply = response.choices[0].message.content;
    await sock.sendMessage(msg.key.remoteJid, { text: reply });
  } catch (err) {
    console.error("AI Plugin Error:", err);
    await sock.sendMessage(msg.key.remoteJid, {
      text: "⚠️ AI request failed. Check your key.txt or OpenAI status.",
    });
  }
}
