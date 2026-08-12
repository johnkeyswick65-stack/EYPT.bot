export default {
  name: 'tagall',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    if (!jid?.endsWith('@g.us')) {
      await sock.sendMessage(jid, {
        text: '❌ Este comando só funciona em grupos.'
      })
      return
    }

    const metadata = await sock.groupMetadata(jid)

    const mentions = metadata.participants.map(p => p.id)

    const lista = metadata.participants
      .map(p => `@${p.id.split('@')[0]}`)
      .join(' ')

    await sock.sendMessage(jid, {
      text: `📢 *ATENÇÃO GRUPO!*\n\n${lista}`,
      mentions
    })
  }
}
