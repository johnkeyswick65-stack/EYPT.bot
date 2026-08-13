import { success } from '../../lib/utils/reply.js'

export default {
  name: 'ping',

  aliases: ['p'],

  async execute(sock, message, args) {
    const start = Date.now()

    await success(
      sock,
      message,
      `🏓 *PONG!*

🤖 EYPT.bot está online!
⚡ Latência: ${Date.now() - start} ms`
    )
  }
}
