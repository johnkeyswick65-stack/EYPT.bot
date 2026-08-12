export default {
  name: 'precoproduto',

  async execute(sock, message) {
    await sock.sendMessage(message.key.remoteJid, {
      text: `🏷️ *CONSULTA DE PREÇO*

Use:

.preco nome-do-produto

Exemplo:

.preco livro

📚 A consulta será ligada ao catálogo de produtos.`
    })
  }
}
