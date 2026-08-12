export default {
  name: 'empresa',

  async execute(sock, message) {
    await sock.sendMessage(message.key.remoteJid, {
      text: `╭━━━〔 🏢 EYPT® INVESTIMENT 〕━━━╮
┃
┃ 🌍 Empresa em desenvolvimento
┃
┃ 💼 Áreas:
┃ ├ 📚 World Library EYPT
┃ ├ 🤖 EYPT.bot
┃ ├ 📈 Negócios digitais
┃ └ 💡 Projetos e serviços
┃
┃ 🎯 Objetivo:
┃ Criar soluções digitais,
┃ oportunidades e serviços
┃ para nossa comunidade.
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
    })
  }
}
