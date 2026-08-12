export default {
  name: 'groupinfo',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    if (!jid?.endsWith('@g.us')) {
      await sock.sendMessage(jid, {
        text: '❌ Este comando só pode ser usado em grupos.'
      })
      return
    }

    try {
      const metadata = await sock.groupMetadata(jid)

      const admins = metadata.participants.filter(
        p => p.admin === 'admin' || p.admin === 'superadmin'
      )

      await sock.sendMessage(jid, {
        text: `╭━━━〔 👥 INFORMAÇÕES DO GRUPO 〕━━━╮
┃
┃ 🏷️ Nome: ${metadata.subject}
┃ 👥 Membros: ${metadata.participants.length}
┃ 👑 Administradores: ${admins.length}
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
      })
    } catch (error) {
      console.error('❌ Erro no .groupinfo:', error)

      await sock.sendMessage(jid, {
        text: '❌ Não consegui obter as informações deste grupo.'
      })
    }
  }
}
