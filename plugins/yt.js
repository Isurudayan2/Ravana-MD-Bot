import ytdl from "ytdl-core";

export default async function yt(message, from, sock) {
    try {
        const url = message.split(" ")[1]; // message format: "!yt <url>"
        if (!url) return sock.sendMessage(from, { text: "Please send YouTube link: !yt <url>" });

        // Download video as buffer
        const stream = ytdl(url, { quality: "highestvideo" });
        const chunks = [];
        for await (const chunk of stream) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        // Send video to user
        await sock.sendMessage(from, {
            video: buffer,
            caption: "Here is your video!"
        });
    } catch (err) {
        console.log(err);
        sock.sendMessage(from, { text: "Error downloading video 😅" });
    }
}
