export async function getGroupMetadata(sock, jid) {
  if (!jid || !jid.endsWith('@g.us')) return null

  try {
    return await sock.groupMetadata(jid)
  } catch {
    return null
  }
}

export async function isGroupAdmin(sock, jid, userJid) {
  const metadata = await getGroupMetadata(sock, jid)

  if (!metadata) return false

  const user = metadata.participants.find(
    participant => participant.id === userJid
  )

  return (
    user?.admin === 'admin' ||
    user?.admin === 'superadmin'
  )
}

export async function isBotAdmin(sock, jid) {
  const metadata = await getGroupMetadata(sock, jid)

  if (!metadata) return false

  const botJid = sock.user?.id

  const bot = metadata.participants.find(
    participant => participant.id === botJid
  )

  return (
    bot?.admin === 'admin' ||
    bot?.admin === 'superadmin'
  )
}
