import { sendMenuWithProfile } from '../../lib/utils/menuProfile.js'

export default {
  name: 'vip',

  async execute(sock, message) {
    const menu = `╭───⊱❀⊰ 𝔼𝕐ℙ𝕋.𝔹𝕆𝕋 𝕍𝕀ℙ ⊱❀⊰
│
├── 🍁 𝙚𝙢𝙥𝙧𝙚𝙨𝙖
├── 🍁 𝙖𝙣𝙖𝙡𝙞𝙨𝙚
├── 🍁 𝙙𝙚𝙨𝙚𝙢𝙥𝙚𝙣𝙝𝙤
├── 🍁 𝙫𝙚𝙣𝙙𝙖𝙨
├── 🍁 𝙤𝙥𝙤𝙧𝙩𝙪𝙣𝙞𝙙𝙖𝙙𝙚𝙨
├── 🍁 𝙘𝙡𝙞𝙚𝙣𝙩𝙚𝙨
├── 🍁 𝙥𝙧𝙤𝙙𝙪𝙩𝙤𝙨
├── 🍁 𝙨𝙚𝙧𝙫𝙞𝙘𝙤𝙨
├── 🍁 𝙥𝙚𝙙𝙞𝙙𝙤𝙨
├── 🍁 𝙡𝙞𝙫𝙧𝙤𝙨
├── 🍁 𝙘𝙖𝙩𝙖𝙡𝙤𝙜𝙤
╰── 🍁 𝙨𝙪𝙥𝙤𝙧𝙩𝙚`

    await sendMenuWithProfile(sock, message, menu)
  }
}
