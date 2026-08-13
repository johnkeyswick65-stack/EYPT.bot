import {
  isBotAdmin,
  getGroupMetadata
} from '../../lib/utils/permissions.js'

import {
  getTargetJid,
  getTargetNumber,
  isSameUser
} from '../../lib/utils/groupTarget.js'

export default {
  name: 'kick',
  aliases: ['remove', 'expulsar'],
  permission: 'admin',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    if (!jid?.endsWith('@g.us')) {
      return sock.sendMessage(jid, {
        text: '❌ Este comando só funciona em grupos.'
      })
    }

    if (!await isBotAdmin(sock, jid)) {
      return sock.sendMessage(jid, {
        text: '🤖⚠️ *EYPT.bot não é administrador.*\n\nDê administrador ao bot para executar esta ação.'
      })
    }

    const target = getTargetJid(message)

    if (!target) {
      return sock.sendMessage(jid, {
        text: `⚠️ *Membro não identificado.*

Use uma destas formas:

🔹 Marque o membro:
*.kick @membro*

🔹 Ou responda à mensagem dele:
*.kick*`
      })
    }

    const metadata = await getGroupMetadata(sock, jid)

    if (!metadata) {
      return sock.sendMessage(jid, {
        text: '❌ Não consegui obter os dados do grupo.'
      })
    }

    const botId = sock.user?.id

    if (isSameUser(target, botId)) {
      return sock.sendMessage(jid, {
        text: '🤖 Não posso remover a mim mesmo do grupo.'
      })
    }

    const member = metadata.participants.find(
      p => isSameUser(p.id, target)
    )

    if (!member) {
      return sock.sendMessage(jid, {
        text: '❌ Esse membro não está no grupo.'
      })
    }

    if (member.admin) {
      return sock.sendMessage(jid, {
        text: '🛡️ Não posso remover um administrador usando este comando.'
      })
    }

    try {
      await sock.groupParticipantsUpdate(
        jid,
        [member.id],
        'remove'
      )

      const number = getTargetNumber(member.id)

      await sock.sendMessage(jid, {
        text: `╭━━━〔 🛡️ EYPT.bot 〕━━━╮
┃
┃ ✅ *MEMBRO REMOVIDO*
┃
┃ 👤 @${number}
┃
╰━━━━━━━━━━━━━━━━━━━━╯`,
        mentions: [member.id]
      })
    } catch (error) {
      console.error('❌ Erro no .kick:', error)

      await sock.sendMessage(jid, {
        text: '❌ Não foi possível remover este membro.'
      })
    }
  }
}
