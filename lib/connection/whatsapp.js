import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from '@whiskeysockets/baileys'

import fs from 'fs'
import pino from 'pino'
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
import { connectionState } from './state.js'

const SESSION_DIR = './session'

let activeSock = null
let reconnecting = false
let pairingPhone = null
let pairingRequested = false
let pairingAttempts = 0
let pendingPairing = null
let authFailures = 0
let manuallyClosed = false

function log(level, message) {
  connectionState.log(level, message)

  if (level === 'error') {
    console.error(message)
  } else {
    console.log(message)
  }
}

function closeActiveSocket() {
  if (!activeSock) return

  try {
    activeSock.ev.removeAllListeners('connection.update')
  } catch {}

  try {
    activeSock.end(undefined)
  } catch {}

  activeSock = null
}

export async function connectToWhatsApp(options = {}) {
  if (options.phone) {
    pairingPhone = String(options.phone).replace(/\D/g, '')
  }

  manuallyClosed = false

  closeActiveSocket()

  connectionState.clearError()
  connectionState.setStatus('connecting', {
    phoneNumber: pairingPhone,
    connectedAt: null
  })

  const { state, saveCreds } =
    await useMultiFileAuthState(SESSION_DIR)

  const commands = await loadCommands()
  connectionState.setCommandsCount(commands.size)

  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
    browser: ['EYPT.bot', 'Chrome', '1.0.0']
  })

  activeSock = sock

  const originalSendMessage = sock.sendMessage.bind(sock)

  sock.sendMessage = async (jid, content, options = {}) => {
    if (content?.text) {
      content = { ...content, text: addWatermark(content.text) }
    }
    return originalSendMessage(jid, content, options)
  }

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on(
    'connection.update',
    ({ connection, lastDisconnect, qr }) => {
      if (qr) {
        connectionState.setQr(qr)
        log('info', '📷 Novo QR Code gerado.')

        // Só depois do handshake (primeiro QR) o servidor aceita
        // pedidos de código de emparelhamento.
        if (
          !state.creds.registered &&
          pairingPhone &&
          !pairingRequested
        ) {
          pairingRequested = true
          requestPairing(sock)
        }
      }

      if (connection === 'open') {
        pairingPhone = null
        pairingRequested = false
        pairingAttempts = 0
        authFailures = 0
        reconnecting = false

        connectionState.setQr(null)
        connectionState.setPairingCode(null)
        connectionState.setStatus('connected', {
          phoneNumber: sock.user?.id || null,
          connectedAt: Date.now()
        })

        log('success', '✅ EYPT.bot conectado ao WhatsApp!')
      }

      if (connection === 'close') {
        const statusCode =
          lastDisconnect?.error?.output?.statusCode

        const loggedOut =
          statusCode === DisconnectReason.loggedOut

        if (manuallyClosed) return

        if (loggedOut) {
          const registered = Boolean(state.creds.registered)

          pairingRequested = false
          pairingPhone = null

          connectionState.setStatus('disconnected')
          connectionState.setQr(null)

          const removed = wipeSession()

          if (pendingPairing) {
            pendingPairing.reject(
              new Error('A ligação fechou antes de o código ser gerado.')
            )
            pendingPairing = null
          }

          // Credenciais de um pareamento incompleto são rejeitadas pelo
          // WhatsApp (401). Limpar e abrir uma sessão nova resolve.
          if (!registered && removed && authFailures < 2) {
            authFailures += 1
            log(
              'warning',
              '⚠️ Credenciais incompletas removidas. A abrir uma nova sessão...'
            )

            setTimeout(() => {
              connectToWhatsApp().catch(() => {})
            }, 1500)

            return
          }

          log(
            'error',
            '❌ Sessão terminada. Gere um novo QR ou código de emparelhamento.'
          )
          return
        }

        connectionState.setStatus('reconnecting')
        log('warning', '🔌 Conexão encerrada. A reconectar...')

        if (!reconnecting) {
          reconnecting = true

          setTimeout(async () => {
            try {
              await connectToWhatsApp()
            } catch (error) {
              connectionState.setError(
                `Erro na reconexão: ${error.message}`
              )
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
      log('error', `❌ Erro nas boas-vindas: ${error.message}`)
    }
  })

  const processedMessages = new Set()

  sock.ev.on('messages.upsert', async args => {
    try {
      await handleUpsert(args)
    } catch (error) {
      log('error', `❌ Erro ao processar mensagem: ${error.message}`)
    }
  })

  async function handleUpsert({ messages, type }) {
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

    const text =
      message.message.conversation ||
      message.message.extendedTextMessage?.text ||
      ''

    if (!text.trim()) return

    connectionState.increment('messagesReceived')

    const command = text
      .trim()
      .replace(/^(\.[^\s]+)/, (_, cmd) => cmd.toLowerCase())

    if (!command.startsWith('.')) {
      const jid = message.key.remoteJid

      if (jid.endsWith('@g.us') && isAntiSpamEnabled(jid)) {
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
              text: `🛡️ *EYPT.bot — ANTISPAM*\n⚠️ @${sender.split('@')[0]}, foram detectadas mensagens em excesso.\n\n⏳ Aguarde ${spam.cooldown}s antes de continuar.`,
              mentions: [sender]
            })
            return
          }
        }
      }

      if (!isChatAIActive(jid)) return

      const aiAccess = checkAILimit(message)

      if (!aiAccess.allowed) {
        if (aiAccess.reason === 'limit') {
          await sock.sendMessage(jid, {
            text: '🧠 *EYPT AI — LIMITE ATINGIDO*\n\nVocê utilizou todas as 10 mensagens de IA disponíveis hoje.\n\n⏰ O limite será renovado amanhã.\n💎 Planos VIP/Premium podem ter acesso ilimitado.'
          })
        } else if (aiAccess.reason === 'cooldown') {
          await sock.sendMessage(jid, {
            text: `⏳ Aguarde ${aiAccess.cooldown}s antes de enviar outra mensagem para a EYPT AI.`
          })
        }
        return
      }

      const humanResponse = getHumanResponse(text)

      if (humanResponse) {
        await new Promise(resolve =>
          setTimeout(resolve, humanDelay())
        )

        await sock.sendMessage(jid, { text: humanResponse })
        connectionState.increment('aiReplies')
        return
      }

      try {
        log('info', '🧠 EYPT AI processando...')

        const response = await generateAIResponse(text)

        if (response) {
          await sock.sendMessage(jid, { text: response })
          connectionState.increment('aiReplies')
        }
      } catch (error) {
        log('error', `❌ Erro da EYPT AI: ${error.message}`)
      }

      return
    }

    const jid = message.key.remoteJid

    // VERIFICAÇÃO DE BLOQUEIO
    const sender = message.key.participant || message.key.remoteJid

    if (isUserBlocked(sender)) {
      await sock.sendMessage(jid, {
        text: '🚫 *USUÁRIO BLOQUEADO*\n\nVocê está bloqueado de usar o EYPT.bot.\n\n📝 Entre em contato com o Owner para mais informações.\n\n©powered by EYPT tech.'
      })
      return
    }

    const access = await checkCommandLimit(sock, message)
    if (!access.allowed) return

    await executeCommand(sock, message, command)
    connectionState.increment('commandsExecuted')
  }

  return sock
}

/**
 * Apaga as credenciais guardadas.
 */
function wipeSession() {
  try {
    fs.rmSync(SESSION_DIR, { recursive: true, force: true })
    return true
  } catch {
    return false
  }
}

/**
 * Pede o código de emparelhamento quando o socket já está pronto.
 */
async function requestPairing(sock) {
  const phone = pairingPhone

  try {
    const code = await sock.requestPairingCode(phone)

    connectionState.setPairingCode(code)
    connectionState.setQr(null)
    pairingPhone = null

    log('info', `🔐 Código de emparelhamento: ${code}`)

    if (pendingPairing) {
      pendingPairing.resolve(code)
      pendingPairing = null
    }
  } catch (error) {
    const registered = Boolean(sock.authState?.creds?.registered)
    const message = `Não foi possível gerar o código: ${error.message}`

    pairingRequested = false
    connectionState.setError(message)

    // O pedido falhou antes do pareamento terminar: as credenciais
    // parciais não servem. Limpar e tentar uma vez com sessão nova.
    if (!registered && pairingAttempts < 1) {
      pairingAttempts += 1
      pairingPhone = phone

      log('warning', '🔁 Sessão limpa. A tentar gerar o código novamente...')

      try {
        sock.end(undefined)
      } catch {}

      wipeSession()

      setTimeout(() => {
        connectToWhatsApp({ phone }).catch(() => {})
      }, 1500)

      return
    }

    pairingPhone = null

    if (pendingPairing) {
      pendingPairing.reject(new Error(message))
      pendingPairing = null
    }
  }
}

/**
 * Pede um código de emparelhamento para um número.
 * Resolve só quando o WhatsApp devolve o código.
 */
export async function pairWithPhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '')

  if (digits.length < 8) {
    throw new Error('Número inválido. Usa o formato 258840000000.')
  }

  if (connectionState.status === 'connected') {
    throw new Error(
      'Este WhatsApp já está ligado. Termina a sessão antes de parear outro número.'
    )
  }

  if (pendingPairing) {
    pendingPairing.reject(new Error('Novo pedido de código iniciado.'))
    pendingPairing = null
  }

  pairingPhone = digits
  pairingRequested = false
  pairingAttempts = 0
  authFailures = 0

  connectionState.setPairingCode(null)
  connectionState.setQr(null)
  connectionState.clearError()

  const code = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pendingPairing = null
      reject(
        new Error(
          'O WhatsApp não respondeu a tempo. Tenta novamente ou usa o QR Code.'
        )
      )
    }, 25000)

    pendingPairing = {
      resolve: value => {
        clearTimeout(timer)
        resolve(value)
      },
      reject: error => {
        clearTimeout(timer)
        reject(error)
      }
    }
  })

  await connectToWhatsApp({ phone: digits })

  return code
}

/**
 * Reinicia a ligação usando a sessão existente.
 */
export async function restartConnection() {
  pairingPhone = null
  await connectToWhatsApp()

  return { ok: true }
}

/**
 * Termina a sessão e apaga as credenciais guardadas.
 */
export async function logoutConnection() {
  manuallyClosed = true
  reconnecting = false
  pairingPhone = null
  pairingRequested = false
  pairingAttempts = 0
  authFailures = 0

  if (pendingPairing) {
    pendingPairing.reject(new Error('Sessão terminada antes de gerar o código.'))
    pendingPairing = null
  }

  const sock = activeSock
  activeSock = null

  try {
    await sock?.logout()
  } catch (error) {
    log('warning', `⚠️ Falha ao terminar sessão: ${error.message}`)
  }

  wipeSession()

  connectionState.reset()
  connectionState.setError(null)
  connectionState.log('info', '🚪 Sessão terminada.')

  return { ok: true }
}

export function getActiveSocket() {
  return activeSock
}
