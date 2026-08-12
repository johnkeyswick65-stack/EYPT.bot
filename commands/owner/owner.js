import { getUser } from '../../lib/users/userManager.js'
import { OWNER_ID } from '../../config.js'

export default {
  name: 'owner',

  async execute(sock, message) {
    const jid = message.key.remoteJid
    const user = getUser(jid)

    if (!user || user.type !== 'owner' || jid !== OWNER_ID) {
      await sock.sendMessage(jid, {
        text: '🚫 Acesso negado.\n\nEste painel é exclusivo do Owner do EYPT.bot.'
      })
      return
    }

    const menu = `╭━━━〔 👑 EYPT.bot OWNER 〕━━━╮
┃
┃ 👤 *ADMINISTRAÇÃO*
┃ ├ .users
┃
┃ 💼 *NEGÓCIOS*
┃ ├ .empresa
┃ ├ .clientes
┃ ├ .vendas
┃ ├ .relatorios
┃ ├ .analise
┃ └ .painel
┃
┃ 📊 *SISTEMA*
┃ ├ .stats
┃ ├ .status
┃ ├ .runtime
┃ └ .version
┃
┃ 🧩 *COMANDOS*
┃ ├ .addcomando
┃ ├ .remcomando
┃ └ .listacomandos
┃
╰━━━━━━━━━━━━━━━━━━━━╯

━━━━━━━━━━━━━━━━
👑 EYPT.bot Owner
🔐 Painel restrito`

    await sock.sendMessage(jid, {
      text: menu
    })
  }
}
