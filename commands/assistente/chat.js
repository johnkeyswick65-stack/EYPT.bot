import { setChatAI, isChatAIActive } from '../../lib/ai/chatMode.js'

export default {
  name: 'chat',

  async execute(sock, message) {
    const jid = message.key.remoteJid
    const text =
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text ||
      ''

    const args = text.trim().split(/\s+/)
    const action = args[1]?.toLowerCase()

    if (action === 'on') {
      setChatAI(jid, true)

      await sock.sendMessage(jid, {
        text: '🧠 *EYPT AI ativada!*\n\nAgora posso conversar naturalmente neste chat.'
      })

      return
    }

    if (action === 'off') {
      setChatAI(jid, false)

      await sock.sendMessage(jid, {
        text: '🔕 *EYPT AI desativada.*\n\nA conversa automática foi desligada neste chat.'
      })

      return
    }

    const status = isChatAIActive(jid) ? '🟢 ATIVADA' : '🔴 DESATIVADA'

    await sock.sendMessage(jid, {
      text: `🧠 *EYPT AI — CHAT*\n\nEstado: ${status}\n\nUse:\n.chat on — ativar\n.chat off — desativar`
    })
  }
}
