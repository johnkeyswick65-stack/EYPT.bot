export default {
  name: 'livros',

  async execute(sock, message) {
    await sock.sendMessage(message.key.remoteJid, {
      text: `📚 *WORLD LIBRARY EYPT*

📖 Livros digitais
💰 Preços acessíveis
📱 Entrega em formato digital

Categorias disponíveis:

💰 Finanças
📈 Marketing
🧠 Desenvolvimento pessoal
❤️ Romance
🧙 Fantasia
📚 Educação

Digite *.catalogo* para ver as opções.`
    })
  }
}
