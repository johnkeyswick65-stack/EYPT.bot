export default {
  name: 'botid',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    const info = {
      id: sock.user?.id || 'indisponível',
      lid: sock.user?.lid || 'indisponível',
      name: sock.user?.name || 'indisponível'
    }

    await sock.sendMessage(jid, {
      text: `🤖 *IDENTIDADE DO EYPT.bot*

🆔 ID: ${info.id}
🪪 LID: ${info.lid}
👤 Nome: ${info.name}`
    }, {
      quoted: message
    })
  }
}
