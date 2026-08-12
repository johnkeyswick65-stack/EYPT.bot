export default {
  name: 'suporte',

  async execute(sock, message) {
    await sock.sendMessage(message.key.remoteJid, {
      text: `🛠️ *SUPORTE*

Bem-vindo ao atendimento da World Library EYPT.

📚 Livros
💰 Pagamentos
📥 Entrega digital
❓ Dúvidas

Envie a sua questão e aguarde o atendimento.`
    })
  }
}
