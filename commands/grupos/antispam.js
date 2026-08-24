import {
  isAntiSpamEnabled,
  setAntiSpam
} from '../../lib/groups/antiSpam.js'

export default {
  name: 'antispam',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    if (!jid.endsWith('@g.us')) {
      await sock.sendMessage(jid, {
        text: '⚠️ Este comando só pode ser usado em grupos.'
      })
      return
    }

    const metadata = await sock.groupMetadata(jid)

    const sender =
      message.key.participant ||
      message.participant

    const senderInfo = metadata.participants.find(
      p => p.id === sender
    )

    if (!senderInfo?.admin) {
      await sock.sendMessage(jid, {
        text: '🚫 Apenas administradores podem configurar o AntiSpam.'
      })
      return
    }

    const text =
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text ||
      ''

    const action = text.trim().split(/\s+/)[1]?.toLowerCase()

    if (!action || action === 'status') {
      const status = isAntiSpamEnabled(jid)
        ? '🟢 ATIVADO'
        : '🔴 DESATIVADO'

      await sock.sendMessage(jid, {
        text: `🛡️ *EYPT.bot — ANTISPAM*

Estado: ${status}

Use:
.antispam on
.antispam off
.antispam status`
      })

      return
    }

    if (action !== 'on' && action !== 'off') {
      await sock.sendMessage(jid, {
        text: '❌ Opção inválida.\n\nUse `.antispam on` ou `.antispam off`.'
      })
      return
    }

    const enabled = action === 'on'

    setAntiSpam(jid, enabled)

    await sock.sendMessage(jid, {
      text: enabled
        ? '🛡️ *ANTISPAM ATIVADO*\n\nO EYPT.bot vai controlar excesso de mensagens.'
        : '🔓 *ANTISPAM DESATIVADO*'
    })
  }
}
