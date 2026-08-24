import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_DIR = path.resolve(__dirname, '../../database/groups')
const FILE = path.join(DATA_DIR, 'warnings.json')

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

export function addWarning(groupId, userId, reason = '') {
  const data = load()

  if (!data[groupId]) {
    data[groupId] = {}
  }

  if (!data[groupId][userId]) {
    data[groupId][userId] = {
      count: 0,
      warnings: []
    }
  }

  const user = data[groupId][userId]

  user.count += 1

  user.warnings.push({
    reason,
    date: new Date().toISOString()
  })

  save(data)

  return user
}

export function getWarnings(groupId, userId) {
  const data = load()

  return data[groupId]?.[userId] || {
    count: 0,
    warnings: []
  }
}

export function clearWarnings(groupId, userId) {
  const data = load()

  const existing = data[groupId]?.[userId]

  if (!existing) {
    return 0
  }

  const removed = existing.count

  delete data[groupId][userId]

  if (Object.keys(data[groupId]).length === 0) {
    delete data[groupId]
  }

  save(data)

  return removed
}
