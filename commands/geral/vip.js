export default {
  name: 'vip',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    const menu = `╭━━━〔 💎 EYPT.bot VIP 〕━━━╮
┃
┃ ⭐ *ÁREA VIP*
┃
┃ 🚀 Benefícios e ferramentas
┃ para utilizadores VIP.
┃
┃ 💼 *NEGÓCIOS*
┃ ├ .empresa
┃ ├ .analise
┃ ├ .desempenho
┃ ├ .vendas
┃ └ .oportunidades
┃
┃ 📊 *GESTÃO*
┃ ├ .clientes
┃ ├ .produtos
┃ ├ .servicos
┃ └ .pedidos
┃
┃ 📚 *WORLD LIBRARY*
┃ ├ .livros
┃ └ .catalogo
┃
┃ 💬 .suporte
┃
╰━━━━━━━━━━━━━━━━━━━━╯

━━━━━━━━━━━━━━━━
💎 EYPT.bot VIP`

    await sock.sendMessage(jid, {
      text: menu
    })
  }
}
