export default {
  name: 'audio',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    const text =
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text ||
      ''

    const title = text.trim().split(/\s+/).slice(1).join(' ')

    if (!title) {
      await sock.sendMessage(jid, {
        text: '🎵 Use:\n\n.audio <nome ou título>'
      })
      return
    }

    await sock.sendMessage(jid, {
      text: `🎵 *PESQUISA DE ÁUDIO*

🔎 Pesquisa:
${title}

⚙️ O módulo de áudio está preparado.
A próxima etapa será conectar uma fonte de áudio autorizada para pesquisa e reprodução.`
    })
  }
}
