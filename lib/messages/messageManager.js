const DEFAULT_BRAND = 'EYPT.bot'

export function watermark(text, brand = DEFAULT_BRAND) {
  if (!text || typeof text !== 'string') {
    return text
  }

  if (text.includes(`© ${brand}`)) {
    return text
  }

  return `${text}\n\n━━━━━━━━━━━━━━\n🤖 ${brand}\n© ${brand}`
}

export async function sendText(sock, jid, text, options = {}) {
  const brand = options.brand || DEFAULT_BRAND

  const finalText = watermark(text, brand)

  return sock.sendMessage(jid, {
    text: finalText,
    ...options
  })
}
