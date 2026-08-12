export default {
  name: 'hora',

  async execute(sock, message) {
    const agora = new Date()

    const hora = agora.toLocaleTimeString('pt-MZ', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Africa/Maputo'
    })

    await sock.sendMessage(message.key.remoteJid, {
      text: `🕐 *HORA ATUAL*

🇲🇿 Maputo: ${hora}

🤖 EYPT.bot`
    })
  }
}
