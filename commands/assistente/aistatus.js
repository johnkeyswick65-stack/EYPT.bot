import { isChatAIActive } from '../../lib/ai/chatMode.js'
import { createUser, isUnlimited } from '../../lib/users/userManager.js'

export default {
  name: 'aistatus',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    const active = isChatAIActive(jid)
    const userId =
      message.key.participant ||
      message.key.remoteJid

    const user = createUser(userId)

    const status = active
      ? '🟢 ATIVADA'
      : '🔴 DESATIVADA'

    const limit = isUnlimited(user)
      ? '♾️ ILIMITADO'
      : '🔟 10 mensagens/dia'

    await sock.sendMessage(jid, {
      text: `🧠 *EYPT AI — STATUS*

📡 Estado: ${status}
💬 Modo: Conversação automática
⏳ Cooldown: 8 segundos
📊 Limite: ${limit}

Use:
.chat on — ativar
.chat off — desativar`
    })
  }
}
