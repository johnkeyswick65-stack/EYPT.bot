export default {
  name: 'data',

  async execute(sock, message) {
    const agora = new Date()

    const data = agora.toLocaleDateString('pt-MZ', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'Africa/Maputo'
    })

    await sock.sendMessage(message.key.remoteJid, {
      text: `📅 *DATA DE HOJE*

🇲🇿 ${data}

🤖 EYPT.bot`
    })
  }
}
