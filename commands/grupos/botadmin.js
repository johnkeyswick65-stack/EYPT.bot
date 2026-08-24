import { isBotAdmin } from '../../lib/utils/permissions.js'

export default {
  name: 'botadmin',
  permission: 'admin',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    if (!jid?.endsWith('@g.us')) {
      await sock.sendMessage(jid, {
        text: '❌ Este comando só pode ser usado em grupos.'
      })
      return
    }

    try {
      const admin = await isBotAdmin(sock, jid)

      await sock.sendMessage(
        jid,
        {
          text: admin
            ? `🤖👑 *EYPT.bot é administrador deste grupo.*\n\n✅ O bot pode utilizar funções de gerenciamento.`
            : `🤖⚠️ *EYPT.bot não é administrador deste grupo.*\n\nDê administrador ao bot para utilizar funções de gerenciamento.`
        },
        {
          quoted: message
        }
      )
    } catch (error) {
      console.error('❌ Erro no .botadmin:', error)

      await sock.sendMessage(jid, {
        text: '❌ Não consegui verificar a permissão do EYPT.bot.'
      })
    }
  }
}
