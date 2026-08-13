export function getTargetJid(message) {
  const context =
    message.message?.extendedTextMessage?.contextInfo

  const mentioned =
    context?.mentionedJid?.[0]

  if (mentioned) {
    return mentioned
  }

  const quoted =
    context?.participant

  if (quoted) {
    return quoted
  }

  return null
}

export function getTargetNumber(jid) {
  if (!jid) return null

  return jid
    .split('@')[0]
    .split(':')[0]
}

export function isSameUser(a, b) {
  if (!a || !b) return false

  return (
    a.split(':')[0] ===
    b.split(':')[0]
  )
}
