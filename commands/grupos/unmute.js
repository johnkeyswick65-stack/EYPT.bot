import { isBotAdmin } from '../../lib/utils/permissions.js'

export default {
  name: 'unmute',
  aliases: ['abrirgrupo'],
  permission: 'admin',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    if (!jid?.endsWith('@g.us')) {
      return sock.sendMessage(jid, {
        text: '❌ Este comando só funciona em grupos.'
      })
    }

    try {
      if (!await isBotAdmin(sock, jid)) {
        return sock.sendMessage(jid, {
          text: '🤖⚠️ *EYPT.bot não é administrador.*'
        })
      }

      await sock.groupSettingUpdate(
        jid,
        'not_announcement'
      )

      await sock.sendMessage(jid, {
        text: '🔓 *GRUPO ABERTO*\n\nTodos os membros podem enviar mensagens novamente.'
      })
    } catch (error) {
      console.error('❌ Erro no .unmute:', error)

      await sock.sendMessage(jid, {
        text: '❌ Não consegui abrir o grupo.'
      })
    }
  }
}
