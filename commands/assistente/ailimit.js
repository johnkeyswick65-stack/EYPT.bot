import { getAILimitInfo } from '../../lib/limits/aiLimit.js'
import { isUnlimited } from '../../lib/users/userManager.js'
import { createUser } from '../../lib/users/userManager.js'

export default {
  name: 'ailimit',

  async execute(sock, message) {
    const jid =
      message.key.participant ||
      message.key.remoteJid

    const user = createUser(jid)

    if (isUnlimited(user)) {
      await sock.sendMessage(message.key.remoteJid, {
        text: `🧠 *EYPT AI — LIMITE*

👤 Utilizador: ${jid.split('@')[0]}

♾️ Limite: ILIMITADO
👑 Plano: ${user.type === 'owner' ? 'OWNER' : user.plan.toUpperCase()}`
      })

      return
    }

    const info = getAILimitInfo(message)

    await sock.sendMessage(message.key.remoteJid, {
      text: `🧠 *EYPT AI — LIMITE*

📊 Uso hoje: ${info.used}/${info.limit}
🔋 Restantes: ${info.remaining}

⏳ Cooldown: 8 segundos
🔄 O limite é renovado diariamente.`
    })
  }
}
