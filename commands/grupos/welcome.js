import {
  isGroupAdmin
} from '../../lib/utils/permissions.js'

import {
  isWelcomeEnabled,
  setWelcome
} from '../../lib/groups/welcomeSettings.js'

export default {
  name: 'welcome',
  permission: 'admin',

  async execute(sock, message, args) {
    const jid = message.key.remoteJid

    if (!jid?.endsWith('@g.us')) {
      return sock.sendMessage(jid, {
        text: '❌ Este comando só funciona em grupos.'
      })
    }

    const sender =
      message.key.participant ||
      message.participant

    const admin = await isGroupAdmin(
      sock,
      jid,
      sender
    )

    if (!admin) {
      return sock.sendMessage(jid, {
        text: '❌ Apenas administradores podem configurar as boas-vindas.'
      })
    }

    const action = args?.[0]?.toLowerCase()

    if (!action || !['on', 'off', 'status'].includes(action)) {
      return sock.sendMessage(jid, {
        text: `╭━━━〔 👋 BOAS-VINDAS 〕━━━╮
┃
┃ .welcome on
┃ .welcome off
┃ .welcome status
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯`
      })
    }

    if (action === 'status') {
      const enabled = isWelcomeEnabled(jid)

      return sock.sendMessage(jid, {
        text: enabled
          ? '👋 *Boas-vindas estão ATIVADAS* neste grupo.'
          : '🔕 *Boas-vindas estão DESATIVADAS* neste grupo.'
      })
    }

    if (action === 'on') {
      setWelcome(jid, true)

      return sock.sendMessage(jid, {
        text: '✅ *Boas-vindas ativadas!* 👋\n\nO EYPT.bot dará as boas-vindas aos novos membros.'
      })
    }

    setWelcome(jid, false)

    return sock.sendMessage(jid, {
      text: '🔕 *Boas-vindas desativadas.*\n\nO EYPT.bot não enviará mais mensagens automáticas de entrada neste grupo.'
    })
  }
}
