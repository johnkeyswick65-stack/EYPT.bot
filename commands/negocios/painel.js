import {
  createClient,
  ensureClientData
} from '../../lib/clients/clientManager.js'

export default {
  name: 'painel',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    const client = createClient(jid)

    ensureClientData(jid)

    const nome =
      client.businessName ||
      'Sua empresa'

    await sock.sendMessage(jid, {
      text: `╭━━━〔 🏢 PAINEL DO CLIENTE 〕━━━╮
┃
┃ 👋 ${nome}
┃
┃ 📊 GESTÃO
┃ ├ .empresa
┃ ├ .vendas
┃ ├ .pedidos
┃ ├ .clientes
┃ ├ .produtos
┃ └ .relatorios
┃
┃ 💳 FATURA
┃ ├ .fatura
┃ ├ .faturas
┃ ├ .pagar
┃ └ .historico
┃
┃ ⚙️ PERSONALIZAÇÃO
┃ ├ .config
┃ ├ .nomeempresa
┃ └ .addcomando
┃
┃ 🆔 ID DO CLIENTE
┃ ${jid}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`
    })
  }
}
