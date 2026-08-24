import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_DIR = path.resolve(__dirname, '../../database/groups')
const FILE = path.join(DATA_DIR, 'antispam.json')

const WINDOW = 10000
const MAX_MESSAGES = 5
const cooldowns = new Map()
const messages = new Map()

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }

  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify({}, null, 2))
  }
}

function load() {
  ensureFile()

  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf8'))
  } catch {
    return {}
  }
}

function save(data) {
  ensureFile()
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2))
}

export function isAntiSpamEnabled(groupId) {
  return load()[groupId]?.antispam === true
}

export function setAntiSpam(groupId, enabled) {
  const data = load()

  if (!data[groupId]) {
    data[groupId] = {}
  }

  data[groupId].antispam = enabled
  save(data)

  return enabled
}

export function checkSpam(groupId, userId) {
  const key = `${groupId}:${userId}`
  const now = Date.now()

  const cooldownUntil = cooldowns.get(key) || 0

  if (cooldownUntil > now) {
    return {
      spam: true,
      cooldown: Math.ceil((cooldownUntil - now) / 1000)
    }
  }

  let history = messages.get(key) || []

  history = history.filter(time => now - time < WINDOW)
  history.push(now)

  messages.set(key, history)

  if (history.length >= MAX_MESSAGES) {
    cooldowns.set(key, now + 30000)
    messages.delete(key)

    return {
      spam: true,
      cooldown: 30
    }
  }

  return {
    spam: false,
    cooldown: 0
  }
}
