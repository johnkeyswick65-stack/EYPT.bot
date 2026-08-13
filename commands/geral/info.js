import { reply } from '../../lib/utils/reply.js'

export default {
  name: 'info',

  async execute(sock, message) {
    await reply(sock, message, `🤖 *EYPT.bot*

⚡ Assistente multifuncional da EYPT

🧠 IA e conversação
📚 World Library EYPT
💼 Ferramentas para negócios
👥 Ferramentas para grupos
🤝 Área de Sócios
💎 Sistemas VIP e Premium

📋 Digite *.menu* para explorar os comandos.

━━━━━━━━━━━━━━━━
🤖 *EYPT.bot*
⚡ Tecnologia EYPT`)
  }
}
