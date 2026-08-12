export default {
  name: 'help',

  async execute(sock, message) {
    await sock.sendMessage(message.key.remoteJid, {
      text: `📚 *AJUDA — EYPT.bot*

🤖 GERAIS
.ping
.menu
.info
.help
.bot
.status
.version
.runtime

📚 WORLD LIBRARY
.livros
.catalogo
.categorias
.preco
.comprar
.suporte

Digite *.menu* para voltar ao menu.`
    })
  }
}
