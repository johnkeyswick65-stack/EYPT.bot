export default {
  name: 'produto',

  async execute(sock, message) {
    await sock.sendMessage(message.key.remoteJid, {
      text: `📦 *PRODUTO*

Use:

.produto nome

Exemplo:

.produto Psicologia Financeira

O sistema poderá retornar preço,
descrição e disponibilidade.`
    })
  }
}
