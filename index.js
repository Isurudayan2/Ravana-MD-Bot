import { 
  default: makeWASocket,
  useSingleFileAuthState,
  DisconnectReason
} from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import fs from "fs";

const { state, saveState } = useSingleFileAuthState("./auth_info.json");

async function connectToWhatsApp() {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on('creds.update', saveState);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
            if(shouldReconnect) connectToWhatsApp();
        } else if(connection === 'open') {
            console.log('Connected to WhatsApp');
        }
    });

    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        console.log('New message:', messages[0].message);
        // Call your plugin logic here
    });
}

connectToWhatsApp();
