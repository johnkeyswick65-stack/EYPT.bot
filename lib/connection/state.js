import { EventEmitter } from 'node:events'

/**
 * Estado central da ligação ao WhatsApp.
 * O bot atualiza este estado e o painel lê-o através da API.
 */
class ConnectionState extends EventEmitter {
  constructor() {
    super()

    this.status = 'idle'
    this.qr = null
    this.pairingCode = null
    this.phoneNumber = null
    this.connectedAt = null
    this.lastError = null
    this.commandsCount = 0

    this.stats = {
      messagesReceived: 0,
      commandsExecuted: 0,
      aiReplies: 0
    }

    this.logs = []
  }

  setStatus(status, patch = {}) {
    this.status = status

    if (patch.phoneNumber !== undefined) this.phoneNumber = patch.phoneNumber
    if (patch.connectedAt !== undefined) this.connectedAt = patch.connectedAt

    this.emit('change')
  }

  setQr(qr) {
    this.qr = qr || null
    if (qr) this.pairingCode = null
    this.emit('change')
  }

  setPairingCode(code) {
    this.pairingCode = code || null
    this.emit('change')
  }

  setCommandsCount(total) {
    this.commandsCount = total || 0
    this.emit('change')
  }

  setError(message) {
    this.lastError = message || null
    this.log('error', message)
    this.emit('change')
  }

  clearError() {
    this.lastError = null
  }

  increment(key) {
    if (key in this.stats) this.stats[key] += 1
    this.emit('change')
  }

  log(level, message) {
    if (!message) return

    this.logs.push({
      level,
      message: String(message),
      at: new Date().toISOString()
    })

    if (this.logs.length > 80) this.logs.shift()
    this.emit('change')
  }

  reset() {
    this.status = 'idle'
    this.qr = null
    this.pairingCode = null
    this.phoneNumber = null
    this.connectedAt = null
    this.emit('change')
  }

  snapshot() {
    return {
      status: this.status,
      qr: this.qr,
      pairingCode: this.pairingCode,
      phoneNumber: this.phoneNumber,
      connectedAt: this.connectedAt,
      lastError: this.lastError,
      commandsCount: this.commandsCount,
      stats: { ...this.stats },
      logs: [...this.logs]
    }
  }
}

export const connectionState = new ConnectionState()
