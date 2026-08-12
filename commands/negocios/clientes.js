import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const FILE = path.resolve(
  __dirname,
  '../../database/business/clients.json'
)

function loadClients() {
  if (!fs.existsSync(FILE)) return []

  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf8'))
  } catch {
    return []
  }
}

export default {
  name: 'clientes',

  async execute(sock, message) {
    const jid = message.key.remoteJid
    const clients = loadClients()

    await sock.sendMessage(jid, {
      text: `╭━━━〔 👥 CLIENTES EYPT 〕━━━╮
┃
┃ 📊 Total de clientes: ${clients.length}
┃
┃ 💾 Sistema de clientes
┃ └ Base de dados ativa
┃
┃ 🔐 Os dados dos clientes
┃ são armazenados pelo sistema.
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
    })
  }
}
