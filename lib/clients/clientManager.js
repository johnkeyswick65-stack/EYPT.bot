import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CLIENTS_DIR = path.resolve(
  __dirname,
  '../../database/clients'
)

function ensureDirectory() {
  if (!fs.existsSync(CLIENTS_DIR)) {
    fs.mkdirSync(CLIENTS_DIR, {
      recursive: true
    })
  }
}

function safeId(id) {
  return id.replace(
    /[^a-zA-Z0-9_-]/g,
    '_'
  )
}

function clientDirectory(id) {
  ensureDirectory()

  return path.join(
    CLIENTS_DIR,
    safeId(id)
  )
}

function filePath(id, file) {
  const dir = clientDirectory(id)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
      recursive: true
    })
  }

  return path.join(dir, file)
}

export function getClient(clientId) {
  const file = filePath(
    clientId,
    'profile.json'
  )

  if (!fs.existsSync(file)) {
    return null
  }

  try {
    return JSON.parse(
      fs.readFileSync(file, 'utf8')
    )
  } catch {
    return null
  }
}

export function createClient(clientId) {
  const existing = getClient(clientId)

  if (existing) {
    return existing
  }

  const client = {
    id: clientId,
    name: '',
    businessName: '',
    status: 'ativo',
    plan: 'basic',
    currency: 'MT',
    createdAt: new Date().toISOString()
  }

  saveClient(client)

  return client
}

export function saveClient(client) {
  const file = filePath(
    client.id,
    'profile.json'
  )

  fs.writeFileSync(
    file,
    JSON.stringify(client, null, 2)
  )
}

export function ensureClientData(clientId) {
  const dir = clientDirectory(clientId)

  const files = {
    'invoices.json': [],
    'sales.json': [],
    'products.json': [],
    'customers.json': [],
    'custom-commands.json': []
  }

  for (const [file, data] of Object.entries(files)) {
    const target = path.join(dir, file)

    if (!fs.existsSync(target)) {
      fs.writeFileSync(
        target,
        JSON.stringify(data, null, 2)
      )
    }
  }
}

export function getClientFile(
  clientId,
  file
) {
  const target = filePath(
    clientId,
    file
  )

  if (!fs.existsSync(target)) {
    return null
  }

  try {
    return JSON.parse(
      fs.readFileSync(target, 'utf8')
    )
  } catch {
    return null
  }
}

export function saveClientFile(
  clientId,
  file,
  data
) {
  const target = filePath(
    clientId,
    file
  )

  fs.writeFileSync(
    target,
    JSON.stringify(data, null, 2)
  )
}
