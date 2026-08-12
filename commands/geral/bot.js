export default {
  name: 'bot',

  async execute(sock, message) {
    await sock.sendMessage(message.key.remoteJid, {
      text: `🤖 *EYPT.bot*

⚡ Assistente multifuncional
📚 World Library EYPT
🛠️ Sistema modular
📱 WhatsApp Bot

Status: 🟢 ONLINE`
    })
  }
}
