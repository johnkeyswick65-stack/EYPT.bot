import { jidNormalizedUser } from '@whiskeysockets/baileys'
import { formatMessage } from './watermark.js'

export async function sendMenuWithProfile(sock, message, text, theme = 'default') {
  const jid =
    message.key.addressingMode === 'lid' && message.key.remoteJidAlt
      ? message.key.remoteJidAlt
      : message.key.remoteJid

  const formattedText = formatMessage(text, theme)

  const candidates = [
    sock.user?.id,
    sock.user?.lid
  ].filter(Boolean)

  for (const raw of candidates) {
    try {
      const profileJid = jidNormalizedUser(raw)

      console.log('🖼️ FOTO DO BOT - ID:', raw)
      console.log('🖼️ FOTO DO BOT - JID:', profileJid)

      const imageUrl = await sock.profilePictureUrl(
        profileJid,
        'image'
      )

      if (!imageUrl) continue

      console.log('✅ FOTO DO BOT ENCONTRADA')

      await sock.sendMessage(
        jid,
        {
          image: { url: imageUrl },
          caption: formattedText
        },
        {
          quoted: message
        }
      )

      return
    } catch (error) {
      console.log(
        '⚠️ Foto não disponível para',
        raw,
        '-',
        error.message
      )
    }
  }

  console.log('⚠️ Nenhuma foto do perfil do bot encontrada.')

  await sock.sendMessage(
    jid,
    {
      text: formattedText
    },
    {
      quoted: message
    }
  )
}
