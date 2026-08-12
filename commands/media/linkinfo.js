export default {
  name: 'linkinfo',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    const text =
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text ||
      ''

    const url = text.trim().split(/\s+/)[1]

    if (!url) {
      await sock.sendMessage(jid, {
        text: 'ℹ️ Use:\n\n.info <link>'
      })
      return
    }

    try {
      const parsed = new URL(url)

      await sock.sendMessage(jid, {
        text: `╭━━━〔 ℹ️ LINK INFO 〕━━━╮
┃
┃ 🌐 Protocolo: ${parsed.protocol.replace(':', '')}
┃ 🔗 Host: ${parsed.hostname}
┃
┃ 📍 URL recebida:
┃ ${url}
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
      })
    } catch {
      await sock.sendMessage(jid, {
        text: '❌ Link inválido.'
      })
    }
  }
}
