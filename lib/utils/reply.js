import { formatMessage } from './watermark.js'

export async function reply(sock, message, content, theme = 'default') {
  const jid = message.key.remoteJid

  return sock.sendMessage(jid, {
    text: formatMessage(content, theme)
  }, {
    quoted: message
  
  })
}

export async function success(sock, message, content) {
  return reply(sock, message, content, 'success')
}

export async function error(sock, message, content) {
  return reply(sock, message, content, 'error')
}

export async function warning(sock, message, content) {
  return reply(sock, message, content, 'warning')
}

export async function info(sock, message, content) {
  return reply(sock, message, content, 'default')
}

export async function aiReply(sock, message, content) {
  return reply(sock, message, content, 'ai')
}

export async function ownerReply(sock, message, content) {
  return reply(sock, message, content, 'owner')
}

export async function groupReply(sock, message, content) {
  return reply(sock, message, content, 'group')
}

export async function libraryReply(sock, message, content) {
  return reply(sock, message, content, 'library')
}

export async function salesReply(sock, message, content) {
  return reply(sock, message, content, 'sales')
}
