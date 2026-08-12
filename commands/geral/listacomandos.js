import { loadCustomCommands } from '../../lib/commands/customCommandManager.js'

export default {
  name: 'listacomandos',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    const commands = loadCustomCommands()
    const names = Object.keys(commands)

    if (!names.length) {
      await sock.sendMessage(jid, {
        text: '📋 Ainda não existem comandos personalizados.'
      })

      return
    }

    const list = names
      .map((name, index) => `┃ ${index + 1}. .${name}`)
      .join('\n')

    await sock.sendMessage(jid, {
      text: `╭━━━〔 🧩 COMANDOS PERSONALIZADOS 〕━━━╮
┃
${list}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`
    })
  }
}
