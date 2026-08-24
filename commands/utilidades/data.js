import { info } from '../../lib/utils/reply.js'

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

    await info(
      sock,
      message,
      `📅 *DATA DE HOJE*

🇲🇿 ${data}

🤖 EYPT.bot`
    )
  }
}
