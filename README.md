
# 💀 Ravana-MD-Bot

Ravana-MD-Bot is a powerful WhatsApp bot built with Node.js and the Baileys library.  
It supports YouTube song downloads, TikTok/Facebook video downloads, and AI video generation.

---

## 🚀 Features
- 🎵 **YouTube Song Download**  
- 🎥 **TikTok / Facebook Video Download**  
- 🧠 **AI Video Generator (Text → Video)**  
- 🤖 **Auto Reply + Commands Support**

---

## ⚙️ Installation (GitHub Method)

1. **Fork** this repository.
2. Go to **Actions** tab → Enable workflows.
3. Go to **Code** tab → Click `Add file` → `Upload files` → Add:
   - `index.js`
   - `package.json`
   - `.github/workflows/deploy.yml`
   - All plugin files inside `plugins/` folder.
4. Commit all changes.

---

## 💬 How to Connect to WhatsApp

1. Add your number to `index.js` (inside the `ownerNumber` variable).  
2. The bot will auto-generate a **code (not QR)** in the console.
3. Copy the code → Send it to **your WhatsApp number** → You’re connected!

---

## 📁 Folder Structure
