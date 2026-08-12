export default {
  name: 'analise',

  async execute(sock, message) {
    await sock.sendMessage(message.key.remoteJid, {
      text: `╭━━━〔 📊 ANÁLISE EYPT 〕━━━╮
┃
┃ 🏢 EMPRESA
┃ └ EYPT® INVESTIMENT
┃
┃ 📚 PROJETO PRINCIPAL
┃ └ World Library EYPT
┃
┃ 🤖 TECNOLOGIA
┃ └ EYPT.bot
┃
┃ 📈 ÁREAS DE ATUAÇÃO
┃ ├ 📚 Livros digitais
┃ ├ 💻 Negócios digitais
┃ ├ 🤖 Automação
┃ └ 💡 Projetos digitais
┃
┃ 🎯 FOCO
┃ └ Crescimento, inovação e
┃   criação de oportunidades.
┃
┃ ℹ️ Os indicadores financeiros
┃ reais serão adicionados ao
┃ sistema de relatórios.
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
    })
  }
}
