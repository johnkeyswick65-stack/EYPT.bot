import {
  PERSONAS,
  getPersonaInfo,
  setPersona
} from '../../lib/ai/persona.js'

export default {
  name: 'aipersona',

  async execute(sock, message) {
    const jid = message.key.remoteJid

    const text =
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text ||
      ''

    const args = text.trim().split(/\s+/)
    const action = args[1]?.toLowerCase()

    if (!action) {
      const current = getPersonaInfo(jid)

      let list = ''

      for (const [id, persona] of Object.entries(PERSONAS)) {
        list += `\n${id} — ${persona.description}`
      }

      await sock.sendMessage(jid, {
        text: `🧠 *EYPT AI — PERSONA*

🎭 Atual: *${current.name}*
📝 ${current.description}

*Personas disponíveis:*
${list}

Use:
.aipersona normal
.aipersona profissional
.aipersona divertida
.aipersona professor
.aipersona vendas`
      })

      return
    }

    if (!PERSONAS[action]) {
      await sock.sendMessage(jid, {
        text: `❌ Persona não encontrada.

Use:
.aipersona

para ver as personas disponíveis.`
      })

      return
    }

    setPersona(jid, action)

    const persona = PERSONAS[action]

    await sock.sendMessage(jid, {
      text: `✅ *PERSONA ALTERADA*

🎭 Persona: *${persona.name}*
📝 ${persona.description}

A EYPT AI usará essa personalidade neste chat.`
    })
  }
}
