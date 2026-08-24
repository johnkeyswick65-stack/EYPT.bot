import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_DIR = path.resolve(__dirname, '../../database/groups')
const FILE = path.join(DATA_DIR, 'settings.json')

function ensureData() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }

  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify({}, null, 2))
  }
}

function load() {
  ensureData()

  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf8'))
  } catch {
    return {}
  }
}

function save(data) {
  ensureData()

  fs.writeFileSync(
    FILE,
    JSON.stringify(data, null, 2)
  )
}

export function isAntiLinkEnabled(groupId) {
  const data = load()

  return data[groupId]?.antilink === true
}

export function setAntiLink(groupId, enabled) {
  const data = load()

  if (!data[groupId]) {
    data[groupId] = {}
  }

  data[groupId].antilink = enabled

  save(data)

  return enabled
}
