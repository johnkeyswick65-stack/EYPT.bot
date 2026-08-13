import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from '@whiskeysockets/baileys'

import pino from 'pino'
import readline from 'readline'
import {
  loadCommands,
  executeCommand
} from '../handlers/commandHandler.js'
import { checkCommandLimit } from '../limits/commandLimit.js'
import { addWatermark } from '../utils/watermark.js'
import { handleGroupParticipantsUpdate } from '../groups/welcome.js'
import { getHumanResponse, humanDelay } from '../ai/humanBehavior.js'
import { generateAIResponse } from '../ai/aiCore.js'
import { isChatAIActive } from '../ai/chatMode.js'

function perguntar(pergunta) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise(resolve => {
    rl.question(pergunta, resposta => {
      rl.close()
      resolve(resposta.trim())
    })
  })
}

let reconnecting = false
export async function connectToWhatsApp() {
  const { state, saveCreds } =
    await useMultiFileAuthState('./session')

  await loadCommands()

  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' })
  })

  const originalSendMessage = sock.sendMessage.bind(sock)

  sock.sendMessage = async (jid, content, options = {}) => {
    if (content?.text) {
      content = { ...content, text: addWatermark(content.text) }
    }
    return originalSendMessage(jid, content, options)
  }

  sock.ev.on('creds.update', saveCreds)

  if (!state.creds.registered) {
    const phoneNumber = await perguntar(
      '📱 Número do WhatsApp com código do país: '
    )


    try {
      const code = await sock.requestPairingCode(phoneNumber)

      console.log('')
      console.log('🔐 CÓDIGO DE LIGAÇÃO:')
      console.log(code)
      console.log('')
    } catch (error) {
      console.error('❌ Erro ao gerar código:', error)
    }
  }

  sock.ev.on(
    'connection.update',
    ({ connection, lastDisconnect }) => {

      if (connection === 'open') {
        console.log('✅ EYPT.bot conectado ao WhatsApp!')
      }

      if (connection === 'close') {
        console.log('❌ Conexão encerrada.')

        const shouldReconnect =
          lastDisconnect?.error?.output?.statusCode !==
          DisconnectReason.loggedOut

        if (shouldReconnect && !reconnecting) {
          reconnecting = true
          console.log('🔄 Tentando conectar novamente...')

          setTimeout(async () => {
            try {
              await connectToWhatsApp()
            } catch (error) {
              console.error('❌ Erro na reconexão:', error)
            } finally {
              reconnecting = false
            }
          }, 3000)
        }
      }
    }
  )

  sock.ev.on('group-participants.update', async update => {

    try {
      await handleGroupParticipantsUpdate(sock, update)
    } catch (error) {
      console.error('❌ Erro nas boas-vindas:', error)
    }
  })


const processedMessages = new Set()
sock.ev.on('messages.upsert', async ({ messages, type }) => {
  if (type !== 'notify') return

  const message = messages[0]

  if (!message?.message) return
  if (message.key.fromMe) return

  const messageId = message.key.id

  if (!messageId) return
  if (processedMessages.has(messageId)) return

  processedMessages.add(messageId)

  if (processedMessages.size > 500) {
    const first = processedMessages.values().next().value
    processedMessages.delete(first)
  }
  console.log('👤 REMETENTE:', message.key.remoteJid)

  const text =
    message.message.conversation ||
    message.message.extendedTextMessage?.text ||
    ''

  if (!text.trim()) return

  const command = text.trim().toLowerCase()

  console.log(`📨 Mensagem recebida: ${text}`)

    if (!command.startsWith(".")) {
      const humanResponse = getHumanResponse(text)

      if (humanResponse) {
        await new Promise(resolve => setTimeout(resolve, humanDelay()))
        await sock.sendMessage(message.key.remoteJid, {
          text: humanResponse
        })
        return
      }


      try {
        console.log("🧠 EYPT AI processando...")

        const response = await generateAIResponse(text)

        if (response) {
          await sock.sendMessage(message.key.remoteJid, {
            text: response
          })
        }
      } catch (error) {
        console.error("❌ Erro da EYPT AI:", error.message)
      }

      return
    }

  if (command.startsWith(".")) {
    const access = await checkCommandLimit(sock, message)
    if (!access.allowed) return
    await executeCommand(sock, message, command)
  }
})

}


