import { isGroupAdmin } from '../../lib/utils/permissions.js'

export default {
  name: 'isadmin',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    if (!jid.endsWith('@g.us')) {
      return sock.sendMessage(jid, {
        text: '❌ Este comando só funciona em grupos.'
      })
    }

    const sender =
      message.key.participant ||
      message.participant

    const admin = await isGroupAdmin(
      sock,
      jid,
      sender
    )

    await sock.sendMessage(jid, {
      text: admin
        ? '🛡️ Você é administrador.'
        : '👤 Você não é administrador.'
    })
  }
}
