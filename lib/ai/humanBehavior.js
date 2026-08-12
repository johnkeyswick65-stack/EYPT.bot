const greetings = [
  'Olá! 👋 Como posso ajudar?',
  'Oi! 😄 Tudo bem?',
  'Olá! 👋 Estou por aqui.',
  'Olá! 🤖 Em que posso ajudar?'
]

const goodMorning = [
  'Bom dia! 🌅 Que o seu dia seja excelente!',
  'Bom dia! ☀️ Como posso ajudar hoje?',
  'Bom dia! 📚 Vamos começar o dia com conhecimento?'
]

export function getHumanResponse(text) {
  const input = text.trim().toLowerCase()

  if (/^(oi|olá|ola|hey|hello)\b/.test(input)) {
    return greetings[
      Math.floor(Math.random() * greetings.length)
    ]
  }

  if (input.includes('bom dia')) {
    return goodMorning[
      Math.floor(Math.random() * goodMorning.length)
    ]
  }

  if (
    input.includes('quem é você') ||
    input.includes('quem e voce') ||
    input.includes('quem és tu')
  ) {
    return `🤖 Sou o EYPT.bot.

Um assistente multifuncional da EYPT, com ferramentas para grupos, negócios e World Library EYPT.`
  }

  return null
}

export function humanDelay() {
  return 800 + Math.floor(Math.random() * 1800)
}
