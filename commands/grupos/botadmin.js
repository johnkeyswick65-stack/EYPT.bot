export default {
  name: 'botadmin',

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

      const botId = sock.user?.id?.split(':')[0]

      const bot = metadata.participants.find(member => {
        const memberId = member.id?.split(':')[0]
        return memberId === botId
      })

      const isAdmin =
        bot?.admin === 'admin' ||
        bot?.admin === 'superadmin'

      await sock.sendMessage(jid, {
        text: isAdmin
          ? '🤖👑 *EYPT.bot é administrador deste grupo.*'
          : '🤖⚠️ *EYPT.bot não é administrador deste grupo.*\n\nDê administrador ao bot para utilizar funções de gerenciamento.'
      })
    } catch (error) {
      console.error('❌ Erro no .botadmin:', error)

      await sock.sendMessage(jid, {
        text: '❌ Não consegui verificar a permissão do EYPT.bot.'
      })
    }
  }
}
