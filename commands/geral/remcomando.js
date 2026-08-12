import { removeCustomCommand } from '../../lib/commands/customCommandManager.js'

export default {
  name: 'remcomando',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    const text =
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text ||
      ''

    const name = text.trim().split(/\s+/)[1]

    if (!name) {
      await sock.sendMessage(jid, {
        text: '🗑️ Use:\n\n.remcomando nome'
      })

      return
    }

    const removed = removeCustomCommand(name)

    await sock.sendMessage(jid, {
      text: removed
        ? `✅ Comando .${name.replace(/^\./, '')} removido.`
        : `❌ O comando .${name.replace(/^\./, '')} não existe.`
    })
  }
}
