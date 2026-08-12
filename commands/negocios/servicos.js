export default {
  name: 'servicos',

  async execute(sock, message) {
    await sock.sendMessage(message.key.remoteJid, {
      text: `╭━━━〔 💼 SERVIÇOS EYPT 〕━━━╮
┃
┃ 📚 WORLD LIBRARY EYPT
┃ └ Livros e conteúdos digitais
┃
┃ 🤖 EYPT.bot
┃ └ Automação e ferramentas
┃
┃ 💻 NEGÓCIOS DIGITAIS
┃ └ Soluções e projetos digitais
┃
┃ 📢 DIVULGAÇÃO
┃ └ Promoção de produtos e projetos
┃
┃ 💬 SUPORTE
┃ └ Atendimento aos utilizadores
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
    })
  }
}
