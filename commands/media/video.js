export default {
  name: 'video',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    const text =
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text ||
      ''

    const url = text.trim().split(/\s+/)[1]

    if (!url) {
      await sock.sendMessage(jid, {
        text: '🎬 Use:\n\n.video <link do vídeo>'
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

      if (!type.startsWith('video/')) {
        throw new Error('O link não parece ser um vídeo direto')
      }

      const length = Number(
        response.headers.get('content-length') || 0
      )

      if (length > 50 * 1024 * 1024) {
        throw new Error('Vídeo demasiado grande')
      }

      const buffer = Buffer.from(await response.arrayBuffer())

      if (buffer.length > 50 * 1024 * 1024) {
        throw new Error('Vídeo demasiado grande')
      }

      await sock.sendMessage(jid, {
        video: buffer,
        caption: '🎬 Vídeo enviado pelo EYPT.bot'
      })
    } catch (error) {
      console.error('❌ Erro no .video:', error)

      await sock.sendMessage(jid, {
        text: '❌ Não consegui obter esse vídeo. Use um link público que aponte diretamente para um ficheiro de vídeo.'
      })
    }
  }
}
