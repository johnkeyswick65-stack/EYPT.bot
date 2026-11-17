import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import QRCode from 'qrcode'

import { connectionState } from '../connection/state.js'
import {
  connectToWhatsApp,
  restartConnection,
  pairWithPhone,
  logoutConnection
} from '../connection/whatsapp.js'
import { getCommands } from '../handlers/commandHandler.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PANEL_DIR = path.resolve(__dirname, '../../panel')
const SESSION_DIR = path.resolve('./session')
const PORT = Number(process.env.PANEL_PORT || process.env.PORT) || 3000
const HOST = process.env.PANEL_HOST || '0.0.0.0'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8'
}

let qrCache = { qr: null, dataUrl: null }

function sessionInfo() {
  try {
    if (!fs.existsSync(SESSION_DIR)) {
      return { exists: false, files: 0 }
    }

    const files = fs.readdirSync(SESSION_DIR)

    return { exists: files.length > 0, files: files.length }
  } catch {
    return { exists: false, files: 0 }
  }
}

async function qrDataUrl(qr) {
  if (!qr) return null
  if (qrCache.qr === qr) return qrCache.dataUrl

  const dataUrl = await QRCode.toDataURL(qr, {
    margin: 1,
    width: 320,
    errorCorrectionLevel: 'M',
    color: { dark: '#04120a', light: '#ffffff' }
  })

  qrCache = { qr, dataUrl }
  return dataUrl
}

function json(res, status, payload) {
  const body = JSON.stringify(payload)
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store'
  })
  res.end(body)
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''

    req.on('data', chunk => {
      data += chunk
      if (data.length > 100_000) {
        req.destroy()
        reject(new Error('Corpo do pedido demasiado grande.'))
      }
    })

    req.on('end', () => {
      if (!data) return resolve({})
      try {
        resolve(JSON.parse(data))
      } catch {
        reject(new Error('JSON inválido.'))
      }
    })

    req.on('error', reject)
  })
}

async function statusPayload() {
  const state = connectionState.snapshot()
  const session = sessionInfo()

  return {
    ...state,
    qr: await qrDataUrl(state.qr),
    session,
    commandsLoaded: getCommands().size,
    aiEnabled: Boolean(process.env.OPENROUTER_API_KEY),
    uptimeSeconds: state.connectedAt
      ? Math.floor((Date.now() - state.connectedAt) / 1000)
      : 0
  }
}

function serveStatic(req, res, pathname) {
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '')
  const filePath = path.resolve(PANEL_DIR, relative)

  if (!filePath.startsWith(PANEL_DIR + path.sep) && filePath !== PANEL_DIR) {
    return json(res, 403, { error: 'Acesso negado.' })
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
      return res.end('Não encontrado.')
    }

    res.writeHead(200, {
      'content-type': MIME[path.extname(filePath)] || 'application/octet-stream',
      'cache-control': 'no-cache'
    })
    res.end(content)
  })
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)
  const { pathname } = url

  try {
    if (pathname === '/api/status' && req.method === 'GET') {
      return json(res, 200, await statusPayload())
    }

    const action = req.method === 'POST'
    if (action && pathname.startsWith('/api/')) {
      // Impede pedidos vindos de outras origens (CSRF simples).
      if (req.headers['x-panel-action'] !== '1') {
        return json(res, 403, { error: 'Pedido não autorizado.' })
      }
    }

    if (pathname === '/api/reconnect' && action) {
      await restartConnection()

      return json(res, 200, {
        ok: true,
        message: 'A ligar ao WhatsApp...'
      })
    }

    if (pathname === '/api/pair' && action) {
      const body = await readBody(req)
      const phone = String(body.phone || '').replace(/\D/g, '')

      if (phone.length < 8) {
        return json(res, 400, {
          ok: false,
          error: 'Número inválido. Usa o formato 258840000000.'
        })
      }

      const code = await pairWithPhone(phone)

      return json(res, 200, {
        ok: true,
        code,
        message: `Código gerado: ${code}`
      })
    }

    if (pathname === '/api/logout' && action) {
      await logoutConnection()

      return json(res, 200, {
        ok: true,
        message: 'Sessão terminada. Gera um novo código para ligar de novo.'
      })
    }

    if (pathname.startsWith('/api/')) {
      return json(res, 404, { error: 'Rota não encontrada.' })
    }

    if (req.method !== 'GET') {
      return json(res, 405, { error: 'Método não permitido.' })
    }

    return serveStatic(req, res, pathname)
  } catch (error) {
    return json(res, 500, {
      ok: false,
      error: error.message || 'Erro desconhecido.'
    })
  }
})

export function startPanel() {
  return new Promise((resolve, reject) => {
    server.once('error', reject)

    server.listen(PORT, HOST, () => {
      console.log(`🖥️  Painel de conexão: http://localhost:${PORT}`)
      resolve(server)
    })
  })
}

export { server }
