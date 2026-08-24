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
import { checkAILimit } from '../limits/aiLimit.js'
import { isAntiSpamEnabled, checkSpam } from '../groups/antiSpam.js'
import { isUserBlocked } from '../utils/blockManager.js'

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
    console.log("📥 messages.upsert RECEBIDO:", type, messages?.length)

    if (!messages?.length) return
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

    const command = text.trim().replace(/^(\.[^\s]+)/, (_, cmd) => cmd.toLowerCase())
    console.log(`📨 Mensagem recebida: ${text}`)

    if (!command.startsWith(".")) {
      const jid = message.key.remoteJid

      if (jid.endsWith("@g.us") && isAntiSpamEnabled(jid)) {
        const sender =
          message.key.participant ||
          message.participant ||
          jid

        const metadata = await sock.groupMetadata(jid)
        const senderInfo = metadata.participants.find(
          p => p.id === sender
        )

        if (senderInfo?.admin) {
          // Administradores não entram no AntiSpam.
        } else {
          const spam = checkSpam(jid, sender)
          if (spam.spam) {
            await sock.sendMessage(jid, {
              text: `🛡️ *EYPT.bot — ANTISPAM*
⚠️ @${sender.split("@")[0]}, foram detectadas mensagens em excesso.

⏳ Aguarde ${spam.cooldown}s antes de continuar.`,
              mentions: [sender]
            })
            return
          }
        }
      }

      if (!isChatAIActive(jid)) return

      const aiAccess = checkAILimit(message)
      if (!aiAccess.allowed) {
        if (aiAccess.reason === "limit") {
          await sock.sendMessage(jid, {
            text: "🧠 *EYPT AI — LIMITE ATINGIDO*\n\nVocê utilizou todas as 10 mensagens de IA disponíveis hoje.\n\n⏰ O limite será renovado amanhã.\n💎 Planos VIP/Premium podem ter acesso ilimitado."
          })
        } else if (aiAccess.reason === "cooldown") {
          await sock.sendMessage(jid, {
            text: `⏳ Aguarde ${aiAccess.cooldown}s antes de enviar outra mensagem para a EYPT AI.`
          })
        }
        return
      }

      const humanResponse = getHumanResponse(text)
      if (humanResponse) {
        await new Promise(resolve => setTimeout(resolve, humanDelay()))
        await sock.sendMessage(jid, {
          text: humanResponse
        })
        return
      }

      try {
        console.log("🧠 EYPT AI processando...")
        const response = await generateAIResponse(text)
        if (response) {
          await sock.sendMessage(jid, {
            text: response
          })
        }
      } catch (error) {
        console.error("❌ Erro da EYPT AI:", error.message)
      }
      return
    }

    const jid = message.key.remoteJid

    // VERIFICAÇÃO DE BLOQUEIO
    const sender = message.key.participant || message.key.remoteJid;
    if (isUserBlocked(sender)) {
      await sock.sendMessage(jid, {
        text: "🚫 *USUÁRIO BLOQUEADO*\n\nVocê está bloqueado de usar o EYPT.bot.\n\n📝 Entre em contato com o Owner para mais informações.\n\n©powered by EYPT tech."
      });
      return;
    }

    if (command.startsWith(".")) {
      const access = await checkCommandLimit(sock, message)
      if (!access.allowed) return
      await executeCommand(sock, message, command)
    }
  })
}
