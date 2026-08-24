import {
  areJidsSameUser,
  jidNormalizedUser
} from '@whiskeysockets/baileys'

export default {
  name: 'admins',

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
        p =>
          p.admin === 'admin' ||
          p.admin === 'superadmin'
      )

      if (!admins.length) {
        await sock.sendMessage(jid, {
          text: '❌ Não encontrei administradores neste grupo.'
        })
        return
      }

      const mentions = admins
        .map(admin => admin.id)
        .filter(Boolean)

      const lista = admins
        .map((admin, index) => {
          const normalized = jidNormalizedUser(admin.id)
          const numero = normalized.split('@')[0]

          const tipo =
            admin.admin === 'superadmin'
              ? '👑 Dono'
              : '🛡️ Admin'

          return `┃ ${index + 1}. ${tipo} @${numero}`
        })
        .join('\n')

      await sock.sendMessage(
        jid,
        {
          text: `╭━━━〔 👑 ADMINISTRADORES 〕━━━╮
┃
${lista}
┃
╰━━━━━━━━━━━━━━━━━━━━╯`,
          mentions
        },
        {
          quoted: message
        }
      )
    } catch (error) {
      console.error('❌ Erro no .admins:', error)

      await sock.sendMessage(jid, {
        text: '❌ Não consegui obter os administradores.'
      })
    }
  }
}
