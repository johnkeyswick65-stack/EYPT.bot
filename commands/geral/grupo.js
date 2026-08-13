export default {
  name: 'grupo',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    if (!jid?.endsWith('@g.us')) {
      return sock.sendMessage(jid, {
        text: '❌ Este painel só pode ser usado dentro de grupos.'
      })
    }

    const menu = `╭━━━〔 👥 EYPT.bot 〕━━━╮
┃
┃       🛡️ *CENTRAL DE GRUPOS*
┃
┃ ⚙️ *ADMINISTRAÇÃO*
┃ ├ .admins
┃ ├ .botadmin
┃ ├ .isadmin
┃ ├ .promote @membro
┃ ├ .demote @admin
┃ └ .kick @membro
┃
┃ 👥 *MEMBROS*
┃ ├ .members
┃ ├ .groupinfo
┃ └ .tagall
┃
┃ 🤖 *AUTOMAÇÃO*
┃ └ .welcome
┃
┃ 💡 *DICA*
┃ Use os comandos de administração
┃ somente quando o EYPT.bot tiver
┃ privilégios de administrador.
┃
╰━━━━━━━━━━━━━━━━━━━━╯
     ⚡ *EYPT.bot GROUP SYSTEM*
     🔐 Controle • Gestão • Automação`

    await sock.sendMessage(jid, {
      text: menu
    })
  }
}
