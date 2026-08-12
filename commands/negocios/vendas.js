import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const FILE = path.resolve(
  __dirname,
  '../../database/business/sales.json'
)

function loadSales() {
  if (!fs.existsSync(FILE)) return []

  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf8'))
  } catch {
    return []
  }
}

export default {
  name: 'vendas',

  async execute(sock, message) {
    const jid = message.key.remoteJid
    const sales = loadSales()

    const total = sales.reduce(
      (sum, sale) => sum + Number(sale.amount || 0),
      0
    )

    await sock.sendMessage(jid, {
      text: `╭━━━〔 💰 VENDAS EYPT 〕━━━╮
┃
┃ 🛒 Total de vendas: ${sales.length}
┃ 💵 Receita registrada: ${total} MT
┃
┃ 💾 Sistema de vendas
┃ └ Base de dados ativa
┃
┃ 📊 Os valores apresentados
┃ correspondem apenas às vendas
┃ registradas no sistema.
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
    })
  }
}
