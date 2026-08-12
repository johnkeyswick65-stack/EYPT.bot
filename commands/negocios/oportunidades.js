export default {
  name: 'oportunidades',

  async execute(sock, message) {
    await sock.sendMessage(message.key.remoteJid, {
      text: `╭━━━〔 🚀 OPORTUNIDADES EYPT 〕━━━╮
┃
┃ 💼 NEGÓCIOS
┃ └ Descubra projetos e serviços
┃
┃ ⭐ SÓCIOS
┃ └ Conheça o programa de sócios
┃
┃ 📚 WORLD LIBRARY
┃ └ Explore oportunidades ligadas
┃   ao mercado de livros digitais
┃
┃ 🤖 TECNOLOGIA
┃ └ Novos recursos do EYPT.bot
┃
┃ 📢 NOVIDADES
┃ └ Novas oportunidades serão
┃   adicionadas ao sistema.
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
    })
  }
}
