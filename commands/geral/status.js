export default {
  name: 'status',

  async execute(sock, message) {
    await sock.sendMessage(message.key.remoteJid, {
      text: `📊 *STATUS DO EYPT.bot*

🟢 Sistema: ONLINE
🟢 WhatsApp: CONECTADO
🟢 Comandos: ATIVOS
🤖 Modo: MULTIFUNCIONAL`
    })
  }
}
