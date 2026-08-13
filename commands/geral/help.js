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
          text: `╭━━━〔 ❓ EYPT.bot HELP 〕━━━╮
┃
┃ ❌ *Comando não encontrado*
┃
┃ Você pesquisou:
┃ • .${requested}
┃
┃ 💡 Use *.help* para ver todos
┃ os comandos disponíveis.
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯`
        })
      }

      const aliases =
        Array.isArray(command.aliases) &&
        command.aliases.length
          ? command.aliases
              .map(alias => `.${alias}`)
              .join(', ')
          : 'Nenhum'

      const permission =
        command.permission || 'user'

      const description =
        command.description ||
        'Este comando não possui uma descrição definida.'

      const usage =
        command.usage ||
        `.${command.name}`

      return sock.sendMessage(jid, {
        text: `╭━━━〔 📚 EYPT.bot HELP 〕━━━╮
┃
┃ 📌 *COMANDO*
┃ └ .${command.name}
┃
┃ 📂 *CATEGORIA*
┃ └ ${command.category || 'geral'}
┃
┃ 🔐 *PERMISSÃO*
┃ └ ${permission}
┃
┃ 📖 *DESCRIÇÃO*
┃ └ ${description}
┃
┃ ⚙️ *USO*
┃ └ ${usage}
┃
┃ 🔗 *ALIASES*
┃ └ ${aliases}
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯
🤖 EYPT.bot
© EYPT.bot`
      })
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // LISTA GERAL
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    const categorias = {}

    for (const [name, command] of commands) {
      const categoria =
        command.category || 'geral'

      if (!categorias[categoria]) {
        categorias[categoria] = []
      }

      categorias[categoria].push(name)
    }

    let menu = `╭━━━〔 📚 EYPT.bot 〕━━━╮
┃
┃ 🤖 *CENTRAL DE COMANDOS*
┃
┃ 📦 Total: *${commands.size} comandos*
┃
┃ 💡 Para detalhes:
┃ └ *.help nome*
┃`

    for (const categoria of Object.keys(categorias).sort()) {
      menu += `\n┃\n┃ 📂 *${categoria.toUpperCase()}*\n`

      for (const name of categorias[categoria].sort()) {
        const command = commands.get(name)

        const icon =
          command.permission === 'owner'
            ? '👑'
            : command.permission === 'admin'
              ? '🛡️'
              : command.permission === 'botadmin'
                ? '🤖'
                : '└'

        menu += `┃ ${icon} .${name}\n`
      }
    }

    menu += `
┃
┃ 🔎 Exemplo:
┃ *.help kick*
┃
┃ 🏠 *.menu* — Menu principal
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯
🤖 *EYPT.bot*
© EYPT.bot`

    await sock.sendMessage(jid, {
      text: menu
    })
  }
}
