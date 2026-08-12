export default {
  name: 'socio',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    const menu = `╭━━━〔 ⭐ EYPT.bot SÓCIOS 〕━━━╮
┃
┃ 👋 *BEM-VINDO À CENTRAL*
┃
┃ 💼 *NEGÓCIOS*
┃ ├ .empresa
┃ ├ .analise
┃ ├ .servicos
┃ └ .oportunidades
┃
┃ 📊 *ANÁLISE DA EMPRESA*
┃ ├ .desempenho
┃ ├ .vendas
┃ ├ .clientes
┃ └ .relatorio
┃
┃ ⭐ *SÓCIOS*
┃ ├ .beneficios
┃ ├ .planos
┃ └ .vantagens
┃
┃ 📚 *WORLD LIBRARY*
┃ ├ .livros
┃ └ .catalogo
┃
┃ 💬 *SUPORTE*
┃ └ .suporte
┃
╰━━━━━━━━━━━━━━━━━━━━╯`

    await sock.sendMessage(jid, {
      text: menu
    })
  }
}
