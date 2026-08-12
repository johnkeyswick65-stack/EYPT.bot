export default {
  name: 'calcular',

  async execute(sock, message) {
    const text =
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text ||
      ''

    const expression = text.trim().split(/\s+/).slice(1).join(' ')

    if (!expression) {
      await sock.sendMessage(message.key.remoteJid, {
        text: '🧮 Use: .calcular 10 + 5'
      })
      return
    }

    if (!/^[0-9+\-*/().% ]+$/.test(expression)) {
      await sock.sendMessage(message.key.remoteJid, {
        text: '❌ Expressão inválida.'
      })
      return
    }

    try {
      const result = Function(`"use strict"; return (${expression})`)()

      await sock.sendMessage(message.key.remoteJid, {
        text: `🧮 *CALCULADORA*\n\n${expression} = *${result}*`
      })
    } catch {
      await sock.sendMessage(message.key.remoteJid, {
        text: '❌ Não consegui calcular essa expressão.'
      })
    }
  }
}
