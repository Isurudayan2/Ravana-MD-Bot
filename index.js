
import makeWASocket, { useMultiFileAuthState, DisconnectReason } from "@whiskeysockets/baileys";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// plugin folder auto-load
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pluginsPath = path.join(__dirname, "plugins");

// plugin loader
let plugins = [];
fs.readdirSync(pluginsPath).forEach(file => {
  if (file.endsWith(".js")) {
    import(`./plugins/${file}`).then(module => {
      plugins.push(module.default);
      console.log(`✅ Plugin loaded: ${file}`);
    });
  }
});

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("session");
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false, // no QR print
    syncFullHistory: false,
  });

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "open") {
      console.log("✅ Ravana-MD-Bot Connected to WhatsApp!");
    } else if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log("❌ Connection closed. Reconnecting...", shouldReconnect);
      if (shouldReconnect) connectToWhatsApp();
    }
  });

  sock.ev.on("creds.update", saveCreds);

  // Message handler
  sock.ev.on("messages.upsert", async (m) => {
    const msg = m.messages[0];
    if (!msg.message || msg.key.fromMe) return;
    const from = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

    console.log("📩 Received:", text, "from", from);

    for (const plugin of plugins) {
      if (await plugin(sock, msg, text)) return;
    }
  });
}

connectToWhatsApp();
