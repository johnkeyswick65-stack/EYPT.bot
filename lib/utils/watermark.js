const WATERMARK = '\n\n━━━━━━━━━━━━━━\n🤖 EYPT.bot\n© EYPT.bot'

export function addWatermark(content) {
  if (!content || typeof content !== 'string') {
    return content
  }

  if (content.includes('© EYPT.bot')) {
    return content
  }

  return content + WATERMARK
}
