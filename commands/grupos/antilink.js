import {
  isAntiLinkEnabled,
  setAntiLink
} from '../../lib/groups/antiLink.js'

export default {
  name: 'antilink',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    if (!jid.endsWith('@g.us')) {
      await sock.sendMessage(jid, {
        text: '⚠️ Este comando só pode ser usado em grupos.'
      })

      return
    }

    const text =
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text ||
      ''

    const args = text.trim().split(/\s+/)
    const action = args[1]?.toLowerCase()

    if (!action) {
      const status = isAntiLinkEnabled(jid)
        ? '🟢 ATIVADO'
        : '🔴 DESATIVADO'

      await sock.sendMessage(jid, {
        text: `🛡️ *ANTILINK*

Estado: ${status}

Use:
.antilink on
.antilink off`
      })

      return
    }

    if (!['on', 'off'].includes(action)) {
      await sock.sendMessage(jid, {
        text: '❌ Opção inválida.\n\nUse `.antilink on` ou `.antilink off`.'
      })

      return
    }

    const enabled = action === 'on'

    setAntiLink(jid, enabled)

    await sock.sendMessage(jid, {
      text: enabled
        ? '🛡️ *ANTILINK ATIVADO*\n\nLinks enviados no grupo serão controlados pelo EYPT.bot.'
        : '🔓 *ANTILINK DESATIVADO*\n\nO controle de links foi desligado.'
    })
  }
}
