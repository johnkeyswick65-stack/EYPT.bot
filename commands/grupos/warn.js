import { addWarning } from '../../lib/groups/warnings.js'

function getTarget(message) {
  const mentioned =
    message.message?.extendedTextMessage?.contextInfo?.mentionedJid

  return mentioned?.[0] || null
}

export default {
  name: 'warn',

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
        text: '⚠️ Marque o membro que deseja advertir.\n\nExemplo:\n.warn @utilizador'
      })
      return
    }

    const targetInfo = metadata.participants.find(
      p => p.id === target
    )

    if (!targetInfo) {
      await sock.sendMessage(groupId, {
        text: '❌ Não encontrei esse membro no grupo.'
      })
      return
    }

    if (targetInfo.admin) {
      await sock.sendMessage(groupId, {
        text: '⚠️ Não é possível advertir um administrador.'
      })
      return
    }

    const text =
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text ||
      ''

    const reason = text
      .replace(/^\.warn\s*/i, '')
      .replace(/@\d+/g, '')
      .trim()

    const result = addWarning(
      groupId,
      target,
      reason || 'Sem motivo informado'
    )

    await sock.sendMessage(groupId, {
      text: `⚠️ *ADVERTÊNCIA APLICADA*

👤 Membro: @${target.split('@')[0]}
📊 Advertências: ${result.count}

📝 Motivo: ${reason || 'Sem motivo informado'}`,
      mentions: [target]
    })
  }
}
