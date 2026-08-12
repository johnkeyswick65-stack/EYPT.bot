import { addCustomCommand } from '../../lib/commands/customCommandManager.js'

export default {
  name: 'addcomando',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    const text =
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text ||
      ''

    const args = text
      .trim()
      .split(/\s+/)
      .slice(1)
      .join(' ')

    const separator = args.indexOf('|')

    if (separator === -1) {
      await sock.sendMessage(jid, {
        text: `🧩 *CRIAR COMANDO*

Use:

.addcomando nome | resposta

Exemplo:

.addcomando livros | 📚 Temos vários livros disponíveis!

Depois:

.livros`
      })

      return
    }

    const name = args.slice(0, separator).trim()
    const response = args.slice(separator + 1).trim()

    const result = addCustomCommand(
      name,
      response
    )

    if (!result.success) {
      await sock.sendMessage(jid, {
        text: result.message
      })

      return
    }

    await sock.sendMessage(jid, {
      text: `✅ *COMANDO CRIADO*

🔹 Comando: .${result.name}

Agora ele pode ser utilizado como um comando personalizado.`
    })
  }
}
