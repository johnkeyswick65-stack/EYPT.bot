export default {
  name: 'mz',
  description: 'Informações sobre Moçambique',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    const texto = `🇲🇿 *MOÇAMBIQUE — EYPT.bot*

┃ 💰 Moeda: Metical (MT)
┃ 📱 M-Pesa | E-Mola
┃ 🌐 Código telefónico: +258
┃ 🗺️ País: Moçambique

📌 *Comandos relacionados*
┃ .mz
┃ .dinheiro

🇲🇿 EYPT.bot — desenvolvido para Moçambique.`

    await sock.sendMessage(jid, {
      text: texto
    })
  }
}
