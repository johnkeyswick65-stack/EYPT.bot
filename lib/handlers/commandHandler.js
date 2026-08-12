import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import {
  getCustomCommand
} from '../commands/customCommandManager.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const commands = new Map()

export async function loadCommands() {
  const commandsPath = path.resolve(
    __dirname,
    '../../commands'
  )

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
      if (file.endsWith('.js') === false || file.includes('.backup.') || file.includes('.before-')) continue

      const filePath = path.join(
        categoryPath,
        file
      )

      try {
        const command = await import(
          pathToFileURL(filePath).href
        )

        if (command.default?.name) {
          const name =
            command.default.name.toLowerCase()

          commands.set(
            name,
            command.default
          )

          console.log(
            `✅ Comando carregado: .${name}`
          )
        }
      } catch (error) {
        console.error(
          `❌ Erro ao carregar ${file}:`,
          error
        )
      }
    }
  }

  console.log(
    `📦 Total de comandos: ${commands.size}`
  )

  return commands
}

export async function executeCommand(
  sock,
  message,
  text
) {
  const commandName = text
    .trim()
    .slice(1)
    .split(/\s+/)[0]
    .toLowerCase()

  /*
   * Primeiro procura um comando normal.
   * Assim, comandos oficiais do EYPT.bot
   * têm prioridade sobre comandos personalizados.
   */
  const command = commands.get(commandName)

  if (command) {
    try {
      await command.execute(sock, message)
    } catch (error) {
      console.error(
        `❌ Erro no comando .${commandName}:`,
        error
      )

      await sock.sendMessage(
        message.key.remoteJid,
        {
          text:
            '❌ Ocorreu um erro ao executar o comando.'
        }
      )
    }

    return
  }

  /*
   * Se não for comando oficial,
   * procura no banco de comandos personalizados.
   */
  const customCommand =
    getCustomCommand(commandName)

  if (!customCommand) {
    return
  }

  try {
    await sock.sendMessage(
      message.key.remoteJid,
      {
        text: customCommand.response
      }
    )
  } catch (error) {
    console.error(
      `❌ Erro no comando personalizado .${commandName}:`,
      error
    )
  }
}
