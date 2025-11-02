/**
 * Ravana-MD-Bot Auto Reply Plugin 💬
 * Smart Sinhala + English reply system for chats
 */

export async function handleAutoReply(sock, msg, text, from) {
  try {
    let reply = null;

    // 🩵 Simple English Responses
    if (/hi|hello|hey/i.test(text)) reply = "👋 Hello machan! Kohomada?";
    else if (/how are you/i.test(text)) reply = "😄 I'm fine machan, oyata kohomada?";
    else if (/bye|gn|good night/i.test(text)) reply = "👋 Hari machan, good night!";
    else if (/love/i.test(text)) reply = "❤️ Adare kiyanna hoda widihak neda?";
    else if (/thank/i.test(text)) reply = "😊 Hari machan, oyata saha!";
    else if (/good morning/i.test(text)) reply = "🌅 Subha udasanak machan!";
    else if (/good evening/i.test(text)) reply = "🌇 Subha sandhawe!";
    else if (/good afternoon/i.test(text)) reply = "☀️ Subha dawase!";
    else if (/who are you/i.test(text)) reply = "🤖 Mama Ravana-MD bot ekak machan — oyata udaw karanna hadanne!";

    // 💛 Sinhala Responses
    else if (/kohomada|කොහොමද/i.test(text)) reply = "මට හොඳයි 😄 ඔයාට කොහොමද?";
    else if (/ආදරේ|adare|love/i.test(text)) reply = "❤️ ආදරේ කියන්න ලස්සන විදියක්ද?";
    else if (/බායි|bye/i.test(text)) reply = "👋 බායි machan, පස්සේ හම්බවෙමු!";
    else if (/හෙලෝ|hello/i.test(text)) reply = "👋 හෙලෝ machan!";
    else if (/නමක්|name/i.test(text)) reply = "💡 මගේ නම Ravana-MD machan!";
    else if (/කවුද|who/i.test(text)) reply = "🤖 මම Ravana Bot ekak machan — AI power ekak!";
    else if (/බලන්න|see/i.test(text)) reply = "👀 බලන්න පුළුවන් machan!";
    else if (/සින්දු|song/i.test(text)) reply = "🎵 ඔයාට මට link ekak dapan, mama download karannam!";

    // If no match, random fallback reply
    if (!reply) {
      const fallbacks = [
        "🤔 මට තේරෙන්නෙ නෑ machan 😅",
        "💬 Hari machan, tikak vistharayak dapan?",
        "🤖 Mama hithanne oyāta udaw karanna puluwan!",
      ];
      reply = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    await sock.sendMessage(from, { text: reply });
    console.log("✅ Auto Replied:", reply);
  } catch (err) {
    console.error("❌ Auto Reply Error:", err);
  }
}
