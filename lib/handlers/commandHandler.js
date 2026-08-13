import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

import { getCustomCommand } from '../commands/customCommandManager.js'
import { error, warning } from '../utils/reply.js'
import { OWNER_ID } from '../../config.js'
import {
  isGroupAdmin,
  isBotAdmin
} from '../utils/permissions.js'
import {
  getUser,
  createUser,
  canUseCommand,
  incrementCommands
} from '../users/userManager.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const commands = new Map()
const aliases = new Map()

export async function loadCommands() {
  const commandsPath = path.resolve(
    __dirname,
    '../../commands'
  )

  commands.clear()
  aliases.clear()

  const categories = fs.readdirSync(commandsPath)

  for (const category of categories) {
    const categoryPath = path.join(
      commandsPath,
      category
    )

    if (!fs.statSync(categoryPath).isDirectory()) {
      continue
    }

    const files = fs.readdirSync(categoryPath)

    for (const file of files) {
      if (
        !file.endsWith('.js') ||
        file.includes('.backup.') ||
        file.includes('.before-')
      ) {
        continue
      }

      const filePath = path.join(
        categoryPath,
        file
      )

      try {
        const module = await import(
          pathToFileURL(filePath).href
        )

        const data = module.default

        if (!data?.name) {
          continue
        }

        const name = data.name.toLowerCase()

        commands.set(name, {
          ...data,
          category
        })

        if (Array.isArray(data.aliases)) {
          for (const alias of data.aliases) {
            aliases.set(
              alias.toLowerCase(),
              name
            )
          }
        }

        console.log(
          `✅ Comando carregado: .${name}`
        )
      } catch (err) {
        console.error(
          `❌ Erro ao carregar ${file}:`,
          err.message
        )
      }
    }
  }

  console.log(
    `📦 Total de comandos: ${commands.size}`
  )

  console.log(
    `🔗 Total de aliases: ${aliases.size}`
  )

  return commands
}

export function getCommands() {
  return commands
}

export function getCommand(name) {
  const normalized = name.toLowerCase()

  const realName =
    aliases.get(normalized) || normalized

  return commands.get(realName)
}

export function getAliases() {
  return aliases
}

async function checkPermission(
  sock,
  message,
  command
) {
  const jid = message.key.remoteJid

  const sender =
    message.key.participant ||
    jid

  const permission =
    command.permission || 'user'

  if (permission === 'all') {
    return true
  }

  if (permission === 'owner') {
    return sender === OWNER_ID
  }

  if (permission === 'group') {
    return jid.endsWith('@g.us')
  }

  if (permission === 'admin') {
    if (!jid.endsWith('@g.us')) {
      return false
    }

    return await isGroupAdmin(
      sock,
      jid,
      sender
    )
  }

  if (permission === 'botadmin') {
    if (!jid.endsWith('@g.us')) {
      return false
    }

    return await isBotAdmin(
      sock,
      jid
    )
  }

  return true
}

export async function executeCommand(
  sock,
  message,
  text
) {
  const jid = message.key.remoteJid
  const input = text.trim()

  if (!input.startsWith('.')) {
    return
  }

  const parts = input
    .slice(1)
    .trim()
    .split(/\s+/)

  const typedName =
    parts.shift()?.toLowerCase()

  if (!typedName) {
    return
  }

  const args = parts
  const command = getCommand(typedName)

  if (command) {
    try {
      const allowed =
        await checkPermission(
          sock,
          message,
          command
        )

      if (!allowed) {
        await warning(
          sock,
          message,
          `🚫 *Acesso negado*

Você não possui permissão para usar:

*.${typedName}*

🔐 Permissão necessária:
*${command.permission || 'user'}*`
        )

        return
      }

      const sender =
        message.key.participant ||
        jid

      let user =
        getUser(sender)

      if (!user) {
        user = createUser(sender)
      }

      if (!canUseCommand(user)) {
        await warning(
          sock,
          message,
          `⛔ *Limite de comandos atingido*

Você não pode executar mais comandos neste momento.`
        )

        return
      }

      const start = Date.now()

      const replySock = new Proxy(sock, {
        get(target, prop) {
          if (prop === "sendMessage") {
            return async (jid, content, options = {}) => {
              return target.sendMessage(
                jid,
                content,
                {
                  ...options,
                  quoted: options.quoted || message
                }
              );
            };
          }

          const value = target[prop];

          if (typeof value === "function") {
            return value.bind(target);
          }

          return value;
        }
      });

      await command.execute(
        replySock,
        message,
        args
      )

      if (!(
        user.type === 'owner' ||
        user.plan === 'vip' ||
        user.plan === 'premium'
      )) {
        incrementCommands(user)
      }

      const elapsed =
        Date.now() - start

      console.log(
        `⚡ .${typedName} executado em ${elapsed}ms`
      )
    } catch (err) {
      console.error(
        `❌ Erro no comando .${typedName}:`,
        err
      )

      await error(
        sock,
        message,
        `Não foi possível executar *.${typedName}*.

🔧 ${err.message || 'Erro desconhecido'}`
      )
    }

    return
  }

  const customCommand =
    getCustomCommand(typedName)

  if (customCommand) {
    try {
      await sock.sendMessage(
        jid,
        {
          text: customCommand.response
        }
      )
    } catch (err) {
      console.error(
        `❌ Erro no comando personalizado .${typedName}:`,
        err
      )
    }

    return
  }

  await warning(
    sock,
    message,
    `❓ *Comando não encontrado*

Você digitou:

*.${typedName}*

Use *.menu* ou *.help* para consultar os comandos disponíveis.`
  )
}
