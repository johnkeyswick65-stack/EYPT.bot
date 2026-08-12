export default {
  name: 'members',

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

      const members = metadata.participants
      const mentions = members.map(member => member.id)

      const lista = members
        .map((member, index) => {
          const numero = member.id.split('@')[0]
          const admin =
            member.admin === 'admin' || member.admin === 'superadmin'
              ? ' 👑'
              : ''

          return `┃ ${index + 1}. @${numero}${admin}`
        })
        .join('\n')

      await sock.sendMessage(jid, {
        text: `╭━━━〔 👥 MEMBROS DO GRUPO 〕━━━╮
┃
┃ Total: ${members.length}
┃
${lista}
┃
╰━━━━━━━━━━━━━━━━━━━━╯`,
        mentions
      })
    } catch (error) {
      console.error('❌ Erro no .members:', error)

      await sock.sendMessage(jid, {
        text: '❌ Não consegui obter os membros do grupo.'
      })
    }
  }
}
