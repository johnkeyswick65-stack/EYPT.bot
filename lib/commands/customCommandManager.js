import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const FILE = path.resolve(
  __dirname,
  '../../database/custom/commands.json'
)

function ensureFile() {
  const dir = path.dirname(FILE)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, '{}')
  }
}

export function loadCustomCommands() {
  ensureFile()

  try {
    return JSON.parse(
      fs.readFileSync(FILE, 'utf8')
    )
  } catch {
    return {}
  }
}

function save(commands) {
  ensureFile()

  fs.writeFileSync(
    FILE,
    JSON.stringify(commands, null, 2)
  )
}

export function addCustomCommand(name, response) {
  const commands = loadCustomCommands()

  const commandName = name
    .replace(/^\./, '')
    .trim()
    .toLowerCase()

  if (!/^[a-z0-9_-]+$/i.test(commandName)) {
    return {
      success: false,
      message: '❌ Nome de comando inválido.'
    }
  }

  if (!response?.trim()) {
    return {
      success: false,
      message: '❌ A resposta do comando está vazia.'
    }
  }

  commands[commandName] = {
    response: response.trim(),
    createdAt: new Date().toISOString()
  }

  save(commands)

  return {
    success: true,
    name: commandName
  }
}

export function removeCustomCommand(name) {
  const commands = loadCustomCommands()

  const commandName = name
    .replace(/^\./, '')
    .trim()
    .toLowerCase()

  if (!commands[commandName]) {
    return false
  }

  delete commands[commandName]
  save(commands)

  return true
}

export function getCustomCommand(name) {
  const commands = loadCustomCommands()

  return commands[
    name.replace(/^\./, '').toLowerCase()
  ] || null
}
