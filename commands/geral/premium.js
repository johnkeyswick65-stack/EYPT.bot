import { sendMenuWithProfile } from '../../lib/utils/menuProfile.js'

export default {
  name: 'premium',

  async execute(sock, message) {
    const menu = `╭───⊱❀⊰ 𝔼𝕐ℙ𝕋.𝔹𝕆𝕋 ℙℝ𝔼𝕄𝕀𝕌𝕄 ⊱❀⊰
│
├── 🍁 𝙚𝙢𝙥𝙧𝙚𝙨𝙖
├── 🍁 𝙥𝙖𝙞𝙣𝙚𝙡
├── 🍁 𝙖𝙣𝙖𝙡𝙞𝙨𝙚
├── 🍁 𝙙𝙚𝙨𝙚𝙢𝙥𝙚𝙣𝙝𝙤
├── 🍁 𝙧𝙚𝙡𝙖𝙩𝙤𝙧𝙞𝙤𝙨
├── 🍁 𝙘𝙡𝙞𝙚𝙣𝙩𝙚𝙨
├── 🍁 𝙣𝙤𝙫𝙤𝙘𝙡𝙞𝙚𝙣𝙩𝙚
├── 🍁 𝙥𝙧𝙤𝙙𝙪𝙩𝙤𝙨
├── 🍁 𝙥𝙚𝙙𝙞𝙙𝙤𝙨
├── 🍁 𝙫𝙚𝙣𝙙𝙖𝙨
├── 🍁 𝙢𝙚𝙩𝙖𝙨
├── 🍁 𝙨𝙩𝙖𝙩𝙨
├── 🍁 𝙝𝙞𝙨𝙩𝙤𝙧𝙞𝙘𝙤
├── 🍁 𝙤𝙥𝙤𝙧𝙩𝙪𝙣𝙞𝙙𝙖𝙙𝙚𝙨
├── 🍁 𝙡𝙞𝙫𝙧𝙤𝙨
├── 🍁 𝙘𝙖𝙩𝙖𝙡𝙤𝙜𝙤
╰── 🍁 𝙨𝙪𝙥𝙤𝙧𝙩𝙚`

    await sendMenuWithProfile(sock, message, menu)
  }
}
