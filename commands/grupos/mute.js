import { isBotAdmin } from '../../lib/utils/permissions.js'

export default {
  name: 'mute',
  aliases: ['fechargrupo'],
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
        'announcement'
      )

      await sock.sendMessage(jid, {
        text: '🔒 *GRUPO FECHADO*\n\nApenas administradores podem enviar mensagens.'
      })
    } catch (error) {
      console.error('❌ Erro no .mute:', error)

      await sock.sendMessage(jid, {
        text: '❌ Não consegui fechar o grupo.'
      })
    }
  }
}
