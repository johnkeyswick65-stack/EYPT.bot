import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { OWNER_ID } from '../../config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const USERS_DIR = path.resolve(__dirname, '../../database/users')

export default {
  name: 'users',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    if (jid !== OWNER_ID) {
      await sock.sendMessage(jid, {
        text: '🚫 Acesso negado.\n\nEste comando é exclusivo do Owner.'
      })
      return
    }

    if (!fs.existsSync(USERS_DIR)) {
      await sock.sendMessage(jid, {
        text: '👥 Nenhum utilizador registrado.'
      })
      return
    }

    const files = fs
      .readdirSync(USERS_DIR)
      .filter(file => file.endsWith('.json'))

    if (files.length === 0) {
      await sock.sendMessage(jid, {
        text: '👥 Nenhum utilizador registrado.'
      })
      return
    }

    let text = `╭━━━〔 👥 USUÁRIOS EYPT.bot 〕━━━╮\n┃\n`

    for (let i = 0; i < files.length; i++) {
      try {
        const user = JSON.parse(
          fs.readFileSync(
            path.join(USERS_DIR, files[i]),
            'utf8'
          )
        )

        const status = user.blocked
          ? '🚫 Bloqueado'
          : user.status === 'ativo'
            ? '🟢 Ativo'
            : `⚪ ${user.status}`

        text += `┃ ${i + 1}. ${user.id}\n`
        text += `┃    ${status}\n`
        text += `┃    💳 Plano: ${user.plan}\n`
        text += `┃    📊 Comandos: ${user.commandsUsed}/${user.commandLimit}\n`
        text += `┃\n`
      } catch {
        text += `┃ ⚠️ Erro ao ler ${files[i]}\n┃\n`
      }
    }

    text += `╰━━━━━━━━━━━━━━━━━━━━╯`

    await sock.sendMessage(jid, {
      text
    })
  }
}
