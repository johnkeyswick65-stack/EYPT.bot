import {
  getCommands,
  getCommand
} from '../../lib/handlers/commandHandler.js'

export default {
  name: 'help',
  aliases: ['ajuda', '?'],
  permission: 'all',

  async execute(sock, message, args = []) {
    const jid = message.key.remoteJid
    const commands = getCommands()

    const requested = args[0]?.toLowerCase()

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // AJUDA INDIVIDUAL
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    if (requested) {
      const command = getCommand(requested)

      if (!command) {
        return sock.sendMessage(jid, {
          text: `╭───⊱❀⊰ 𝔼𝕐ℙ𝕋.𝔹𝕆𝕋 ⊱❀⊰
│
├── 🍁 *COMANDO NÃO ENCONTRADO*
│
├── 🍁 Você digitou:
├── 🍁 .${requested}
│
╰── 🍁 Use .help para consultar os comandos`
        })
      }

      const aliases =
        Array.isArray(command.aliases) && command.aliases.length
          ? command.aliases.map(alias => `.${alias}`).join(', ')
          : 'Nenhum'

      const permission = command.permission || 'user'
      const description =
        command.description ||
        'Este comando não possui uma descrição definida.'

      const usage =
        command.usage ||
        `.${command.name}`

      return sock.sendMessage(jid, {
        text: `╭───⊱❀⊰ 𝕀ℕ𝔽𝕆ℝ𝕄𝔸ℂ̧𝔸̃𝕆 ⊱❀⊰
│
├── 🍁 𝘾𝙊𝙈𝘼𝙉𝘿𝙊
├── 🍁 .${command.name}
│
├── 🍁 𝘾𝘼𝙏𝙀𝙂𝙊𝙍𝙄𝘼
├── 🍁 ${command.category || 'geral'}
│
├── 🍁 𝙋𝙀𝙍𝙈𝙄𝙎𝙎𝘼̃𝙊
├── 🍁 ${permission}
│
├── 🍁 𝘿𝙀𝙎𝘾𝙍𝙄𝘾̧𝘼̃𝙊
├── 🍁 ${description}
│
├── 🍁 𝙐𝙎𝙊
├── 🍁 ${usage}
│
├── 🍁 𝘼𝙇𝙄𝘼𝙎𝙀𝙎
╰── 🍁 ${aliases}

©ᴇʏᴘᴛ.ʙᴏᴛ`
      })
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // ORGANIZAR CATEGORIAS
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    const categorias = {}

    for (const [name, command] of commands) {
      const categoria = command.category || 'geral'

      if (!categorias[categoria]) {
        categorias[categoria] = []
      }

      categorias[categoria].push(name)
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // MENU HELP
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    let menu = `𝕄𝔼ℕ𝕌 𝔼𝕐ℙ𝕋.𝔹𝕆𝕋

𝐁𝐞𝐦-𝐯𝐢𝐧𝐝𝐨 𝐚𝐨 𝐄𝐘𝐏𝐓.𝐛𝐨𝐭
`

    for (const categoria of Object.keys(categorias).sort()) {
      menu += `
╭───⊱❀⊰ ${categoria.toUpperCase()} ⊱❀⊰
│
`

      const lista = categorias[categoria].sort()

      lista.forEach((name, index) => {
        const command = commands.get(name)

        const icon =
          command.permission === 'owner'
            ? '👑'
            : command.permission === 'admin'
              ? '🛡️'
              : '🍁'

        const prefix = index === lista.length - 1
          ? '╰──'
          : '├──'

        menu += `${prefix} ${icon} .${name}
`
      })
    }

    menu += `
©ᴇʏᴘᴛ.ʙᴏᴛ`

    await sock.sendMessage(jid, {
      text: menu
    })
  }
}
