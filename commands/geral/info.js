export default {
  name: 'info',

  async execute(sock, message) {
    await sock.sendMessage(message.key.remoteJid, {
      text: `🤖 *EYPT.bot*

⚡ Assistente multifuncional
🛠️ Sistema em desenvolvimento
📚 World Library EYPT

Digite *.menu* para ver os comandos.`
    })
  }
}
