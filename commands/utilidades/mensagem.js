export default {
  name: 'mensagem',

  async execute(sock, message) {
    const mensagens = [
      '📖 Cada página lida hoje pode abrir uma nova oportunidade amanhã.',
      '💡 O conhecimento cresce quando é compartilhado.',
      '🚀 Pequenos passos todos os dias criam grandes resultados.',
      '🎯 Não espere o momento perfeito. Comece com o que você tem.',
      '📚 Invista no conhecimento: é um investimento que acompanha você.',
      '🌟 A disciplina transforma objetivos em resultados.'
    ]

    const mensagem =
      mensagens[Math.floor(Math.random() * mensagens.length)]

    await sock.sendMessage(message.key.remoteJid, {
      text: `╭━━━〔 🌅 MENSAGEM DO DIA 〕━━━╮
┃
┃ ${mensagem}
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
    })
  }
}
