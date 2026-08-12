export function createSimpleCommand(name, title, body) {
  return {
    name,

    async execute(sock, message) {
      await sock.sendMessage(message.key.remoteJid, {
        text: `╭━━━〔 ${title} 〕━━━╮
┃
${body}
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
      })
    }
  }
}
