import { reply } from '../../lib/utils/reply.js'

export default {
  name: 'menu',

  async execute(sock, message) {
    const menu = `👋 *BEM-VINDO!*

⚡ Assistente multifuncional
💼 Assistente para negócios
👥 Ferramentas para grupos
📚 World Library EYPT

📋 *GERAIS*
├ .ping
├ .info
├ .help
├ .bot
├ .status
├ .version
├ .runtime
├ .hora
└ .data

🌅 *UTILIDADES*
└ .mensagem

👥 *GRUPOS*
├ .groupinfo
├ .members
├ .admins
├ .isadmin
└ .botadmin

📚 *WORLD LIBRARY*
├ .livros
├ .catalogo
├ .categorias
├ .preco
├ .comprar
└ .suporte

⭐ *ÁREA DOS SÓCIOS*
└ .socio`

    await reply(sock, message, menu)
  }
}
