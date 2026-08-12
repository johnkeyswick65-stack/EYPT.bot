export default {
  name: 'categorias',

  async execute(sock, message) {
    await sock.sendMessage(message.key.remoteJid, {
      text: `📚 *CATEGORIAS*

💰 Finanças
📈 Marketing Digital
🚀 Empreendedorismo
🧠 Desenvolvimento Pessoal
❤️ Romance
🧙 Fantasia
📖 Literatura
🎓 Educação
💼 Negócios`
    })
  }
}
