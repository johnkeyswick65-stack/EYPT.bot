import { ownerReply } from '../../lib/utils/reply.js'

export default {
  name: 'owner',

  aliases: ['dono'],

  permission: 'owner',

  async execute(sock, message) {
    const menu = `👑 *PAINEL DO OWNER*

━━━━━━━━━━━━━━━━━━━━

👤 *ADMINISTRAÇÃO*
├ .users

💼 *NEGÓCIOS*
├ .empresa
├ .clientes
├ .vendas
├ .relatorios
├ .analise
└ .painel

📊 *SISTEMA*
├ .stats
├ .status
├ .runtime
└ .version

🧩 *COMANDOS*
├ .addcomando
├ .remcomando
└ .listacomandos

━━━━━━━━━━━━━━━━━━━━

🔐 Acesso exclusivo do Owner
🤖 EYPT.bot`

    await ownerReply(
      sock,
      message,
      menu
    )
  }
}
