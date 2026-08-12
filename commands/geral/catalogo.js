export default {
  name: 'catalogo',

  async execute(sock, message) {
    await sock.sendMessage(message.key.remoteJid, {
      text: `📚 *CATÁLOGO — WORLD LIBRARY EYPT*

1️⃣ Finanças
2️⃣ Marketing Digital
3️⃣ Desenvolvimento Pessoal
4️⃣ Romance
5️⃣ Fantasia
6️⃣ Educação

🔎 Para consultar um livro específico, use o atendimento da World Library EYPT.

📞 Suporte: contacte o administrador.`
    })
  }
}
