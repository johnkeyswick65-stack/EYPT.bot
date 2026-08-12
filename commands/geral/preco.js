export default {
  name: 'preco',

  async execute(sock, message) {
    await sock.sendMessage(message.key.remoteJid, {
      text: `💰 *PREÇOS — WORLD LIBRARY EYPT*

Os preços podem variar de acordo com o livro e a promoção.

📚 Consulte o catálogo ou fale com o suporte para saber o preço do livro desejado.

📱 Atendimento pelo WhatsApp.`
    })
  }
}
