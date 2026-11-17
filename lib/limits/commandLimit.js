import {
  createUser,
  canUseCommand
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

  // O incremento acontece em commandHandler.executeCommand,
  // apenas depois de o comando ser executado com sucesso.
  // Contar aqui também duplicava o consumo do limite.
  return {
    allowed: true,
    user
  }
}
