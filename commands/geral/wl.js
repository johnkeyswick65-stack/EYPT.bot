export default {
  name: 'wl',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    const menu = `╭━━━〔 📚 WORLD LIBRARY EYPT 〕━━━╮
┃
┃ 👋 *BEM-VINDO À WORLD LIBRARY!*
┃
┃ 📖 *LIVROS*
┃ ├ .livros
┃ ├ .catalogo
┃ ├ .categorias
┃ ├ .preco
┃ └ .comprar
┃
┃ 💳 *PAGAMENTOS*
┃ ├ .pagamento
┃ ├ .confirmarpagamento
┃ └ .historico
┃
┃ 🌅 *UTILIDADES*
┃ ├ .mensagem
┃ ├ .hora
┃ └ .data
┃
┃ 🧩 *PERSONALIZAÇÃO*
┃ ├ .addcomando
┃ ├ .remcomando
┃ └ .listacomandos
┃
┃ 💬 *ATENDIMENTO*
┃ └ .suporte
┃
╰━━━━━━━━━━━━━━━━━━━━╯

━━━━━━━━━━━━━━━━
📚 World Library EYPT
🤖 EYPT.bot`

    await sock.sendMessage(jid, {
      text: menu
    })
  }
}
