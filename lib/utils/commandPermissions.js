import { OWNER_ID } from '../../config.js'
import {
  isGroupAdmin,
  isBotAdmin
} from './permissions.js'

export async function getPermissionLevel(sock, message) {
  const jid = message.key.remoteJid

  // Owner
  if (jid === OWNER_ID) {
    return 'owner'
  }

  // Conversa privada
  if (!jid?.endsWith('@g.us')) {
    return 'user'
  }

  const sender =
    message.key.participant ||
    message.participant

  const senderIsAdmin = await isGroupAdmin(
    sock,
    jid,
    sender
  )

  const botIsAdmin = await isBotAdmin(
    sock,
    jid
  )

  if (senderIsAdmin && botIsAdmin) {
    return 'admin_botadmin'
  }

  if (senderIsAdmin) {
    return 'admin'
  }

  if (botIsAdmin) {
    return 'botadmin'
  }

  return 'user'
}

export function canUsePermission(level, required) {
  if (!required || required === 'user') {
    return true
  }

  if (level === 'owner') {
    return true
  }

  if (required === 'admin') {
    return (
      level === 'admin' ||
      level === 'admin_botadmin'
    )
  }

  if (required === 'botadmin') {
    return (
      level === 'botadmin' ||
      level === 'admin_botadmin'
    )
  }

  if (required === 'admin_botadmin') {
    return level === 'admin_botadmin'
  }

  return false
}
