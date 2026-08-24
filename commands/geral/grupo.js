export default {
  name: 'grupo',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    if (!jid?.endsWith('@g.us')) {
      return sock.sendMessage(jid, {
        text: '❌ Este painel só pode ser usado dentro de grupos.'
      })
    }

    const menu = `╭───⊱❀⊰ 𝔾ℝ𝕌ℙ𝕆𝕊 ⊱❀⊰
│
├── 🍁 𝙜𝙧𝙤𝙪𝙥𝙞𝙣𝙛𝙤
├── 🍁 𝙢𝙚𝙢𝙗𝙚𝙧𝙨
├── 🍁 𝙖𝙙𝙢𝙞𝙣𝙨
├── 🍁 𝙞𝙨𝙖𝙙𝙢𝙞𝙣
├── 🍁 𝙗𝙤𝙩𝙖𝙙𝙢𝙞𝙣
├── 🍁 𝙥𝙧𝙤𝙢𝙤𝙩𝙚
├── 🍁 𝙙𝙚𝙢𝙤𝙩𝙚
├── 🍁 𝙠𝙞𝙘𝙠
├── 🍁 𝙩𝙖𝙜𝙖𝙡𝙡
╰── 🍁 𝙬𝙚𝙡𝙘𝙤𝙢𝙚`

    await sock.sendMessage(jid, {
      text: menu
    })
  }
}
