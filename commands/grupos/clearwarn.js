import { clearWarnings } from '../../lib/groups/warnings.js'

function getTarget(message) {
  return (
    message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
    null
  )
}

export default {
  name: 'clearwarn',

  async execute(sock, message) {
    const groupId = message.key.remoteJid

    if (!groupId.endsWith('@g.us')) {
      await sock.sendMessage(groupId, {
        text: '⚠️ Este comando só pode ser usado em grupos.'
      })
      return
    }

    const metadata = await sock.groupMetadata(groupId)

    const sender =
      message.key.participant ||
      message.participant

    const senderInfo = metadata.participants.find(
      p => p.id === sender
    )

    if (!senderInfo?.admin) {
      await sock.sendMessage(groupId, {
        text: '🚫 Apenas administradores podem usar este comando.'
      })
      return
    }

    const target = getTarget(message)

    if (!target) {
      await sock.sendMessage(groupId, {
        text: '⚠️ Marque o membro.\n\nExemplo:\n.clearwarn @utilizador'
      })
      return
    }

    const removed = clearWarnings(groupId, target)

    if (removed === 0) {
      await sock.sendMessage(groupId, {
        text: `ℹ️ @${target.split('@')[0]} não possui advertências.`,
        mentions: [target]
      })
      return
    }

    await sock.sendMessage(groupId, {
      text: `✅ *ADVERTÊNCIAS REMOVIDAS*

👤 Utilizador: @${target.split('@')[0]}
🗑️ Total removido: ${removed}`,
      mentions: [target]
    })
  }
}
