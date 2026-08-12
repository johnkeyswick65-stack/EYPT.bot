export default {
  name: 'grupo',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    const menu = `╭━━━〔 👥 EYPT.bot GRUPOS 〕━━━╮
┃
┃ 🛡️ *ADMINISTRAÇÃO*
┃ ├ .admins
┃ ├ .botadmin
┃ ├ .isadmin
┃ └ .tagall
┃
┃ 👥 *MEMBROS*
┃ ├ .members
┃ └ .groupinfo
┃
┃ 🤖 *AUTOMAÇÃO*
┃ └ Boas-vindas automáticas
┃
╰━━━━━━━━━━━━━━━━━━━━╯

━━━━━━━━━━━━━━━━
🤖 EYPT.bot
© EYPT.bot`

    await sock.sendMessage(jid, {
      text: menu
    })
  }
}
