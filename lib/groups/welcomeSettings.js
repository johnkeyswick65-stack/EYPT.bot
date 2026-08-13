import fs from 'fs'

const file = './database/welcome.json'

function load() {
  try {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, '{}')
    }

    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return {}
  }
}

function save(data) {
  fs.writeFileSync(
    file,
    JSON.stringify(data, null, 2)
  )
}

export function isWelcomeEnabled(jid) {
  const data = load()

  return data[jid] !== false
}

export function setWelcome(jid, enabled) {
  const data = load()

  data[jid] = enabled

  save(data)

  return enabled
}
