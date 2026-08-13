import OpenAI from 'openai'

const apiKey = process.env.OPENROUTER_API_KEY

if (!apiKey) {
  console.warn('⚠️ OPENROUTER_API_KEY não configurada.')
}

const client = apiKey
  ? new OpenAI({
      apiKey,
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': 'https://eypt.bot',
        'X-Title': 'EYPT.bot'
      }
    })
  : null

export async function askAI(input) {
  if (!client) {
    throw new Error('OPENROUTER_API_KEY não configurada.')
  }

  const response = await client.chat.completions.create({
    model: 'openrouter/free',
    messages: [
      {
        role: 'system',
        content: input.instructions
      },
      {
        role: 'user',
        content: input.message
      }
    ]
  })

  return response.choices?.[0]?.message?.content || 'Não consegui gerar uma resposta.'
}
