import { OWNER_ID } from '../../config.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const USERS_DIR = path.resolve(__dirname, '../../database/users')

const DEFAULT_LIMIT = 15

function ensureDirectory() {
  if (!fs.existsSync(USERS_DIR)) {
    fs.mkdirSync(USERS_DIR, { recursive: true })
  }
}

function fileFor(userId) {
  ensureDirectory()

  const safeId = userId.replace(/[^a-zA-Z0-9_-]/g, '_')

  return path.join(USERS_DIR, `${safeId}.json`)
}

export function getUser(userId) {
  const file = fileFor(userId)

  if (!fs.existsSync(file)) {
    return null
  }

  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return null
  }
}

export function createUser(userId) {
  const existing = getUser(userId)

  if (existing) {
    return existing
  }

  const user = {
    id: userId,
    type: userId === OWNER_ID ? 'owner' : 'user',
    status: 'ativo',
    commandsUsed: 0,
    commandLimit: DEFAULT_LIMIT,
    blocked: false,
    plan: 'none',
    createdAt: new Date().toISOString()
  }

  saveUser(user)

  return user
}

export function saveUser(user) {
  const file = fileFor(user.id)

  fs.writeFileSync(
    file,
    JSON.stringify(user, null, 2)
  )
}

export function incrementCommands(user) {
  user.commandsUsed += 1

  if (user.commandsUsed >= user.commandLimit) {
    user.status = 'bloqueado'
    user.blocked = true
  }

  saveUser(user)

  return user
}

export function canUseCommand(user) {
  if (!user) return false

  if (user.blocked) return false

  if (user.status !== 'ativo') return false

  if (user.type === 'owner') return true

  if (user.plan === 'vip') return true

  if (user.plan === 'premium') return true

  return user.commandsUsed < user.commandLimit
}

export function isUnlimited(user) {
  return (
    user.type === 'owner' ||
    user.plan === 'vip' ||
    user.plan === 'premium'
  )
}
