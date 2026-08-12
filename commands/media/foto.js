export default {
  name: 'foto',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    const text =
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text ||
      ''

    const url = text.trim().split(/\s+/)[1]

    if (!url) {
      await sock.sendMessage(jid, {
        text: '🖼️ Use:\n\n.foto <link da imagem>'
      })
      return
    }

    try {
      const parsed = new URL(url)

      if (!['http:', 'https:'].includes(parsed.protocol)) {
        throw new Error('URL inválida')
      }

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const type = response.headers.get('content-type') || ''

      if (!type.startsWith('image/')) {
        throw new Error('O link não parece ser uma imagem')
      }

      const buffer = Buffer.from(await response.arrayBuffer())

      if (buffer.length > 10 * 1024 * 1024) {
        throw new Error('Imagem demasiado grande')
      }

      await sock.sendMessage(jid, {
        image: buffer,
        caption: '🖼️ Imagem enviada pelo EYPT.bot'
      })
    } catch (error) {
      console.error('❌ Erro no .foto:', error)

      await sock.sendMessage(jid, {
        text: '❌ Não consegui obter essa imagem. Verifique se o link é público e aponta diretamente para uma imagem.'
      })
    }
  }
}
