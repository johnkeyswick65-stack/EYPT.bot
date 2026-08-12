export default {
  name: 'comprar',

  async execute(sock, message) {
    await sock.sendMessage(message.key.remoteJid, {
      text: `🛒 *COMPRAR LIVRO*

Para comprar um livro:

1️⃣ Escolha o livro.
2️⃣ Confirme o preço.
3️⃣ Solicite as instruções de pagamento.
4️⃣ Envie o comprovativo ao atendimento.
5️⃣ Receba o seu livro digital.

📚 Use *.catalogo* para começar.`
    })
  }
}
