import fs from 'fs'
import { downloadVideo } from '../../lib/download/downloadManager.js'
import { addWatermark } from '../../lib/utils/watermark.js'

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
        text: addWatermark(
          '🎬 Use:\n\n.video <link do vídeo>'
        )
      })
      return
    }

    let filePath = null

    try {
      const parsed = new URL(url)

      if (!['http:', 'https:'].includes(parsed.protocol)) {
        throw new Error('URL inválida')
      }

      console.log(`🎬 EYPT.bot: baixando vídeo ${url}`)

      const result = await downloadVideo(url)
      filePath = result.path

      if (!fs.existsSync(filePath)) {
        throw new Error('Arquivo de vídeo não encontrado')
      }

      const stats = fs.statSync(filePath)
      const maxSize = 50 * 1024 * 1024

      if (stats.size > maxSize) {
        throw new Error('Vídeo demasiado grande para enviar')
      }

      console.log(`📤 Enviando vídeo: ${result.filename}`)

      await sock.sendMessage(jid, {
        video: fs.readFileSync(filePath),
        mimetype: 'video/mp4',
        caption: addWatermark(
          `🎬 ${result.title || 'Vídeo'}`
        )
      })

      console.log('✅ Vídeo enviado com sucesso')

    } catch (error) {
      console.error('❌ Erro no .video:', error)

      await sock.sendMessage(jid, {
        text: addWatermark(
          '❌ Não consegui baixar esse vídeo.\n\n' +
          'Verifique se o link é público e tente novamente.'
        )
      })

    } finally {
      if (filePath && fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath)
          console.log(`🗑️ Arquivo temporário removido: ${filePath}`)
        } catch (cleanupError) {
          console.error(
            '⚠️ Não consegui remover o arquivo temporário:',
            cleanupError.message
          )
        }
      }
    }
  }
}
