import { askAI } from './aiClient.js'
import { EYPT_SYSTEM_PROMPT } from './prompts.js'

export async function generateAIResponse(message, context = '') {
  const instructions = `${EYPT_SYSTEM_PROMPT}

Contexto adicional:
${context || 'Nenhum contexto adicional.'}`

  return await askAI({
    instructions,
    message
  })
}
