export default {
  name: 'desempenho',

  async execute(sock, message) {
    await sock.sendMessage(message.key.remoteJid, {
      text: `╭━━━〔 📊 DESEMPENHO EYPT 〕━━━╮
┃
┃ 🏢 EMPRESA
┃ └ EYPT® INVESTIMENT
┃
┃ 📚 World Library EYPT
┃ └ Projeto ativo
┃
┃ 🤖 EYPT.bot
┃ └ Sistema em expansão
┃
┃ 📈 INDICADORES
┃ ├ 👥 Clientes: dados em desenvolvimento
┃ ├ 🛒 Vendas: dados em desenvolvimento
┃ ├ 💰 Receita: dados em desenvolvimento
┃ └ 📦 Produtos: dados em desenvolvimento
┃
┃ 🎯 PRÓXIMO PASSO
┃ └ Integrar os dados reais
┃   ao sistema de relatórios.
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
    })
  }
}
