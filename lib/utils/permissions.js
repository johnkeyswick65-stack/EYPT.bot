import {
  areJidsSameUser,
  jidNormalizedUser
} from '@whiskeysockets/baileys'

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

  if (!metadata || !userJid) return false

  const user = metadata.participants.find(
    participant =>
      areJidsSameUser(
        jidNormalizedUser(participant.id),
        jidNormalizedUser(userJid)
      )
  )

  return (
    user?.admin === 'admin' ||
    user?.admin === 'superadmin'
  )
}

export async function isBotAdmin(sock, jid) {
  const metadata = await getGroupMetadata(sock, jid)

  if (!metadata || !sock.user) return false

  const botIds = [
    sock.user.id,
    sock.user.lid
  ].filter(Boolean)

  const bot = metadata.participants.find(participant => {
    if (!participant?.id) return false

    return botIds.some(botId =>
      areJidsSameUser(
        jidNormalizedUser(participant.id),
        jidNormalizedUser(botId)
      )
    )
  })

  return (
    bot?.admin === 'admin' ||
    bot?.admin === 'superadmin'
  )
}
