export default {
  name: 'pedido',

  async execute(sock, message) {
    await sock.sendMessage(message.key.remoteJid, {
      text: `╭━━━〔 🛒 NOVO PEDIDO 〕━━━╮
┃
┃ Para registrar um pedido,
┃ use o formato:
┃
┃ .pedido produto quantidade
┃
┃ Exemplo:
┃ .pedido livro 1
┃
┃ 📦 O sistema de pedidos
┃ será integrado à base de vendas.
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
    })
  }
}
