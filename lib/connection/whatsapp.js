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

        if (shouldReconnect) {
          console.log('🔄 Tentando conectar novamente...')
          connectToWhatsApp()
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


sock.ev.on('messages.upsert', async ({ messages }) => {
  const message = messages[0]

  if (!message?.message) return
  if (message.key.fromMe) return
  console.log('👤 REMETENTE:', message.key.remoteJid)

  const text =
    message.message.conversation ||
    message.message.extendedTextMessage?.text ||
    ''

  const command = text.trim().toLowerCase()

  console.log(`📨 Mensagem recebida: ${text}`)

    if (!command.startsWith(".")) {
      const humanResponse = getHumanResponse(text)

      if (humanResponse) {
        await new Promise(resolve => setTimeout(resolve, humanDelay()))
        await sock.sendMessage(message.key.remoteJid, {
          text: humanResponse
        })
      }

      return
    }

  if (command.startsWith('.')) {
    const access = await checkCommandLimit(sock, message)
    if (!access.allowed) return
    await executeCommand(sock, message, command)
  }
})

}


