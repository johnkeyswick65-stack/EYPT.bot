export default {
  name: 'version',

  async execute(sock, message) {
    await sock.sendMessage(message.key.remoteJid, {
      text: `🤖 *EYPT.bot*

📌 Versão: 1.0.0
🛠️ Sistema modular
🚀 Desenvolvimento ativo`
    })
  }
}
