export default {
  name: 'premium',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    const menu = `╭━━━〔 👑 EYPT.bot PREMIUM 〕━━━╮
┃
┃ 🔥 *ÁREA PREMIUM*
┃
┃ 🚀 Ferramentas avançadas
┃ para utilizadores Premium.
┃
┃ 🏢 *EMPRESA*
┃ ├ .empresa
┃ ├ .painel
┃ ├ .analise
┃ ├ .desempenho
┃ └ .relatorios
┃
┃ 💼 *NEGÓCIOS*
┃ ├ .clientes
┃ ├ .novocliente
┃ ├ .produtos
┃ ├ .pedidos
┃ ├ .vendas
┃ └ .metas
┃
┃ 📈 *ANÁLISE*
┃ ├ .stats
┃ ├ .historico
┃ └ .oportunidades
┃
┃ 📚 *WORLD LIBRARY*
┃ ├ .livros
┃ └ .catalogo
┃
┃ 💬 .suporte
┃
╰━━━━━━━━━━━━━━━━━━━━╯

━━━━━━━━━━━━━━━━
👑 EYPT.bot Premium`

    await sock.sendMessage(jid, {
      text: menu
    })
  }
}
