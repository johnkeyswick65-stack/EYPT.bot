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
  name: 'promote',
  aliases: ['addadmin'],
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
        text: '🤖⚠️ *EYPT.bot não é administrador.*'
      })
    }

    const target = getTargetJid(message)

    if (!target) {
      return sock.sendMessage(jid, {
        text: `⚠️ *Membro não identificado.*

Marque o membro ou responda à mensagem dele.

Exemplo:
*.promote @membro*`
      })
    }

    const metadata = await getGroupMetadata(sock, jid)

    if (!metadata) {
      return sock.sendMessage(jid, {
        text: '❌ Não consegui obter os dados do grupo.'
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
        text: '🛡️ Esse membro já é administrador.'
      })
    }

    try {
      await sock.groupParticipantsUpdate(
        jid,
        [member.id],
        'promote'
      )

      const number = getTargetNumber(member.id)

      await sock.sendMessage(jid, {
        text: `╭━━━〔 👑 EYPT.bot 〕━━━╮
┃
┃ ✅ *NOVO ADMINISTRADOR*
┃
┃ 👤 @${number}
┃
╰━━━━━━━━━━━━━━━━━━━━╯`,
        mentions: [member.id]
      })
    } catch (error) {
      console.error('❌ Erro no .promote:', error)

      await sock.sendMessage(jid, {
        text: '❌ Não foi possível promover este membro.'
      })
    }
  }
}
