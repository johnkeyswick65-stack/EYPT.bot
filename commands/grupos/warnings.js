import { getWarnings } from '../../lib/groups/warnings.js'

function getTarget(message) {
  const mentioned =
    message.message?.extendedTextMessage?.contextInfo?.mentionedJid

  return mentioned?.[0] || null
}

export default {
  name: 'warnings',

  async execute(sock, message) {
    const groupId = message.key.remoteJid

    if (!groupId.endsWith('@g.us')) {
      await sock.sendMessage(groupId, {
        text: '⚠️ Este comando só pode ser usado em grupos.'
      })
      return
    }

    const target = getTarget(message)

    if (!target) {
      await sock.sendMessage(groupId, {
        text: '⚠️ Marque o membro que deseja consultar.\n\nExemplo:\n.warnings @utilizador'
      })
      return
    }

    const result = getWarnings(groupId, target)

    if (result.count === 0) {
      await sock.sendMessage(groupId, {
        text: `✅ @${target.split('@')[0]} não possui advertências.`,
        mentions: [target]
      })
      return
    }

    let list = ''

    result.warnings.forEach((warning, index) => {
      const date = new Date(warning.date).toLocaleString('pt-PT')

      list += `\n${index + 1}. ${warning.reason}\n   📅 ${date}`
    })

    await sock.sendMessage(groupId, {
      text: `⚠️ *EYPT.bot — ADVERTÊNCIAS*

👤 Utilizador: @${target.split('@')[0]}
📊 Total: *${result.count}*

${list}`,
      mentions: [target]
    })
  }
}
