import {
  createUser,
  incrementCommands,
  canUseCommand,
  isUnlimited
} from '../users/userManager.js'

export async function checkCommandLimit(
  sock,
  message
) {
  const jid = message.key.remoteJid

  // Grupos não entram no limite de 15 comandos.
  if (jid.endsWith('@g.us')) {
    return {
      allowed: true,
      user: null
    }
  }

  const userId = jid

  const user = createUser(userId)

  if (!canUseCommand(user)) {
    await sock.sendMessage(jid, {
      text: `🚫 *ACESSO BLOQUEADO*

Você atingiu o limite de utilização deste bot.

📊 Limite: ${user.commandLimit}
📊 Utilizados: ${user.commandsUsed}

💎 Consulte os planos disponíveis para continuar utilizando o EYPT.bot.`
    })

    return {
      allowed: false,
      user
    }
  }

  if (!isUnlimited(user)) {
    incrementCommands(user)
  }

  return {
    allowed: true,
    user
  }
}
